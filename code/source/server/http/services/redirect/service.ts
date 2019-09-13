async function service(req, res, next, options: options) {
    const url = Tools.isString(req.body.url || req.query.url);
    res.redirect(303, url);
}

export default service;