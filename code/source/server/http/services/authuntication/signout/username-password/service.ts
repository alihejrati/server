async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;

    if (req['_'].user.login) {
        const hash = req['_'].cookie;
        await redis.del(`cookie:null:${hash}`);
        await redis.del(`auth:null:${npm.objectHash(npm.objectHash(req['_'].user.who._id))}`);
        req['_'].user.login = false;
        await response.attach(null, req, res);
    } else {
        options['service'].code(status.unauthorized);
        await response.attach(null, req, res);
    }
}

export default callback(service, Promise.all([
    import('../../../_/prerequisite')
]));