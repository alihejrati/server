async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    const username = req.body.username || '';
    const password = req.body.password ? npm.objectHash(req.body.password) : '';
    
    if (!req['_'].user.login) {
        if (username && password) {
            const user = await mongodb.findOne('user', {
                username: username,
                password: password
            });
            if (user) {
                const token = npm.objectHash(user._id);
                const key = npm.objectHash(token);
                const usr = await redis.set(`auth:null:${key}`, {_id: user._id});
                if (usr) {
                    req['_'].user.login = true;
                    req['_'].user.who = user;
                    await cookie.set('token', token, req, res);
                    await response.attach({
                        token: token
                    }, req, res);
                } else {
                    options['service'].code(status.notModified);
                    await response.attach(null, req, res);
                }
            } else {
                options['service'].code(status.notAcceptable);
                await response.attach(null, req, res);
            }            
        } else {
            options['service'].code(status.noContent);
            await response.attach(null, req, res);
        }
    } else {
        options['service'].code(status.alreadyReported);
        await response.attach({
            token: await cookie.get('token', req, res) || req.body.token || req.query.token
        }, req, res);
    }
}

export default service;