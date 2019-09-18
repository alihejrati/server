async function service(req, res, next, options: options) {
    const title = Tools.isString(req.body.title);
    const description = Tools.isString(req.body.description);
    const tag = Tools.isArray(req.body.tag);

    try {
        const query = await mongodb.insert('teachingpoint', {
            title: title,
            description: description,
            tag: tag
        }, {database: 'baran', errorHandler: error => options['service'].error = error});
    
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