async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;

    const type = typeof req.body.type == 'string' ? req.body.type : '';
    const title = typeof req.body.title == 'string' ? req.body.title : '';
    const tag = Array.isArray(req.body.tag) ? req.body.tag : []; 
    const regex = tag.reduce((filtered, element) => { typeof element == 'string' && element ? filtered.push(`\.*${element}\.*`) : null; return filtered; }, []).join('|') || '^$';
    let error = null;

    try {
        const Query = tag.length == 0 && !type && !title ? {} : {
            $or: [
                {
                    tag: {
                        $elemMatch: {$regex: regex, $options: 'i'}
                    }
                },
                {
                    type: type
                }, 
                {
                    title: title
                }
            ]
        };
        const query = await mongodb.find('game', Query, {database: 'baran', errorHandler: err => error = err});
    
        if (query) {
            await response.attach(query, req, res);
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