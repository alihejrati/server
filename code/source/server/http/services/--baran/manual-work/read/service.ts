async function service(req, res, next, options: options) {
    const limit       = Tools.cast2Number(req.body.limit);
    const skip        = Tools.cast2Number(req.body.offset);
    const sort        = Tools.cast2mongooseSort(Tools.isString(req.body.order_by));

    const title                 = Tools.isString(req.body.title);
    const description           = Tools.isString(req.body.description);
    const level                 = Tools.isString(req.body.level);
    const url                   = Tools.isString(req.body.url);
    const imgs                  = Tools.isArray(req.body.imgs);
    const suggest               = Tools.isString(req.body.suggest);
    const requiredsupplies      = Tools.isArray(req.body.requiredsupplies);
    const time                  = Tools.isJson(req.body.time);
    const all                   = Tools.isBoolean(req.body.all) || true;
    const Kind                  = Tools.isArray(req.body.Kind);
    const primarysubstance      = Tools.isArray(req.body.primarysubstance);
    const tag                   = Tools.isArray(req.body.tag); 
    const tagRegex              = Tools.vector2regex(tag);
    const kindRegex             = Tools.vector2regex(Kind);
    const primarysubstanceRegex = Tools.vector2regex(primarysubstance);

    try {
        const Query = all ? {} : {
            $or: [
                {
                    tag: {$elemMatch: {$regex: tagRegex, $options: 'i'}}
                },
                {
                    Kind: {$elemMatch: {$regex: kindRegex, $options: 'i'}}
                },
                {
                    primarysubstance: {$elemMatch: {$regex: primarysubstanceRegex, $options: 'i'}}
                }
            ]
        };
        const query = await mongodb.find('manualwork', Query, {database: 'baran', limit: limit, skip: skip, sort: sort, errorHandler: error => options['service'].error = error});
    
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