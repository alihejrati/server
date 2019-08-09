async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    
    options['service'].code(291);
    await response.attach({
        name: 'mmd!'
    }, req, res);
    options['service'].code(296);
    await response.attach('OOk!!!!', req, res);
}

export default service;