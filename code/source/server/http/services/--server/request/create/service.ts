async function service(req, res, next, options: options) {
    const tag      = Tools.isArray(req.body.tag);

    try {
        const query = await mongodb.insert('request', {
            tag: tag
        }, {database: 'db', errorHandler: error => options['service'].error = error});
    
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