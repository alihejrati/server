async function service(req, res, next, options: options) {
    const tag      = Tools.isArray(req.body.tag);
    const tagRegex = Tools.vector2regex(tag);

    try {
        const Query = tag.length == 0 ? {} : {
            tag: {$elemMatch: {$regex: tagRegex, $options: 'i'}}
        };
        const query = await mongodb.find('faq', Query, {database: 'baran', errorHandler: error => options['service'].error = error});
    
        if (query) {
            await response.attach(query, req, res);
        } else {
            options['service'].code(options['service'].status.notFound);
            await response.attach(options['service'].error, req, res);
        }
    } catch (error) {
        options['service'].code(options['service'].status.conflict);
        await response.attach(options['service'].error, req, res);
    }
}

export default service;