async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    
    const type = typeof req.body.type == 'string' ? req.body.type : '';
    const title = typeof req.body.title == 'string' ? req.body.title : '';
    const url = typeof req.body.url == 'string' ? req.body.url : '';
    const tag = Array.isArray(req.body.tag) ? req.body.tag : []; 
    let error = null;

    try {
        const query = await mongodb.findOneAndUpdate('game', {title: title}, {
            type: type,
            url: url,
            $addToSet: {tag: {$each: tag}}
        }, {database: 'baran', errorHandler: err => error = err});
    
        if (query) {
            await response.attach(null, req, res);
        } else {
            options['service'].code(status.notModified);
            await response.attach(error, req, res);
        }
    } catch (error) {
        options['service'].code(status.notModified);
        await response.attach(error, req, res);
    }
}

export default service;