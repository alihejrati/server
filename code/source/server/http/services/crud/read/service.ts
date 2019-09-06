async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    console.debug('-------------------------------------->', req.body)
    const tables = await mongodb.find('table', {});    
    await response.attach(tables, req, res);
}

export default service;