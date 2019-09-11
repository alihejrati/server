async function service(req, res, next, options: options) {
    const limit       = Tools.cast2Number(req.body.limit);
    const skip        = Tools.cast2Number(req.body.offset);
    const sort        = Tools.cast2mongooseSort(Tools.isString(req.body.order_by));

    try {
        const Query = {'flag.emailVerification': true};
        const query = await mongodb.find('ngobikereg', Query, {database: 'hampa', limit: limit, skip: skip, sort: sort, errorHandler: error => options['service'].error = error});
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