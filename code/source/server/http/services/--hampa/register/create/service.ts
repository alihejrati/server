async function service(req, res, next, options: options) {
    const name     = Tools.isString(req.body.name);
    const fullname = Tools.isString(req.body.fullname);
    const email    = Tools.isString(req.body.email);

    try {
        const query = await mongodb.insert('ngobikereg', {
            name: name,
            fullname: fullname,
            email: email
        }, {database: 'hampa', errorHandler: error => options['service'].error = error});
    
        if (query) {
            await response.attach(null, req, res);
        } else {
            options['service'].code(options['service'].status.notModified);
            await response.attach(options['service'].error, req, res);
        }
    } catch (error) {
        options['service'].code(options['service'].status.conflict);
        await response.attach(options['service'].error, req, res);
    }
}

export default service;