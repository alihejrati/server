async function service(req, res, next, options: options) {
    try {
        const query = await mongodb.count('permission', {database: 'db', errorHandler: error => options['service'].error = error});
    
        if (query) {
            await response.attach(query, req, res);
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