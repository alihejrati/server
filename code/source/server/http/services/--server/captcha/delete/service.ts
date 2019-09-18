async function service(req, res, next, options: options) {
    const _id = Tools.isString(req.body._id);
    try {
        const query = await mongodb.findOneAndUpdate('captcha', {_id: _id}, {
            'flag.delete': true
        }, {database: 'db', options: {runValidators: true}, errorHandler: error => options['service'].error = error});

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