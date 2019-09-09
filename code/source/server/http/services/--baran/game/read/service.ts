async function service(req, res, next, options: options) {
    const limit       = Tools.cast2Number(req.body.limit);
    const skip        = Tools.cast2Number(req.body.offset);
    const sort        = Tools.cast2mongooseSort(Tools.isString(req.body.order_by));

    const title       = Tools.isString(req.body.title);
    const description = Tools.isString(req.body.description);
    const url         = Tools.isString(req.body.url);
    const imgs        = Tools.isArray(req.body.imgs);
    const suggest     = Tools.isString(req.body.suggest);
    const players     = Tools.isString(req.body.players);
    const age         = Tools.isString(req.body.age);
    const all         = Tools.isBoolean(req.body.all) || true;
    const hasBall     = Tools.isBoolean(req.body.hasBall);
    const type        = Tools.isString(req.body.type);
    const tag         = Tools.isArray(req.body.tag);
    const tagRegex    = Tools.vector2regex(tag);

    console.debug('--------------------------------->', limit, skip, sort);

    try {
        const Query = all ? {} : {
            $or: [
                {
                    tag: {$elemMatch: {$regex: tagRegex, $options: 'i'}}
                },
                {
                    type: type,
                    'flag.hasBall': {$exists: true, $eq: hasBall}
                }
            ]
        };
        const query = await mongodb.find('game', Query, {database: 'baran', limit: limit, skip: skip, sort: sort,  errorHandler: error => options['service'].error = error});
    
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