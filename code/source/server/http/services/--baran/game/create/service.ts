async function service(req, res, next, options: options) {
    const hasBall     = Tools.isBoolean(req.body.hasBall);
    const title       = Tools.isString(req.body.title);
    const description = Tools.isString(req.body.description);
    const type        = Tools.isString(req.body.type);
    const url         = Tools.isString(req.body.url);
    const imgs        = Tools.isArray(req.body.imgs);
    const suggest     = Tools.isString(req.body.suggest);
    const players     = Tools.isString(req.body.players);
    const age         = Tools.isString(req.body.age);
    const tag         = Tools.isArray(req.body.tag);

    try {
        const query = await mongodb.insert('game', {
            title: title,
            description: description,
            type: type,
            imgs: imgs,
            url: url,
            suggest: suggest,
            players: players,
            age: age,
            tag: tag,
            'flag.hasBall': hasBall
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