async function service(req, res, next, options: options) {
    const title = Tools.isString(req.body.title);
    const description = Tools.isString(req.body.description);
    const level = Tools.isString(req.body.level);
    const url = Tools.isString(req.body.url);
    const imgs = Tools.isArray(req.body.imgs);
    const suggest = Tools.isString(req.body.suggest);
    const requiredsupplies = Tools.isArray(req.body.requiredsupplies);
    const Kind = Tools.isArray(req.body.Kind);
    const primarysubstance = Tools.isArray(req.body.primarysubstance);
    const time = Tools.isJson(req.body.time);
    const tag = Tools.isArray(req.body.tag);

    try {
        const query = await mongodb.insert('manualwork', {
            title: title,
            description: description,
            level: level,
            url: url,
            imgs: imgs,
            suggest: suggest,
            requiredsupplies: requiredsupplies,
            Kind: Kind,
            primarysubstance: primarysubstance,
            time: time,
            tag: tag
        }, { database: 'baran', errorHandler: error => options['service'].error = error });

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