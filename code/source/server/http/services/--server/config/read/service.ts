async function service(req, res, next, options: options) {
    const limit       = Tools.cast2Number(req.body.limit);
    const skip        = Tools.cast2Number(req.body.offset);
    const sort        = Tools.cast2mongooseSort(Tools.isString(req.body.order_by));

    const tag      = Tools.isArray(req.body.tag);
    const tagRegex = Tools.vector2regex(tag);
    
    try {
        const Query = tag.length == 0 ? {} : {
            tag: {$elemMatch: {$regex: tagRegex, $options: 'i'}}
        };
        const query = await mongodb.find('config', Query, {database: 'db', limit: limit, skip: skip, sort: sort, errorHandler: error => options['service'].error = error});
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