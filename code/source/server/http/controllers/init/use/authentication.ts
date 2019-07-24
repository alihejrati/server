async function authentication(req, res, next, options: options) {
    const token = await cookie.get('token', req, res) || req.body.token || req.query.token;  

    if (token) {
        const usr = await redis.get(`auth:null:${npm.objectHash(token)}`);
        if (usr && usr._id) {
            const user = await mongodb.findOne('user', {
                _id: usr._id
            });
            if (user) {
                req['_'].user.login = true;
                req['_'].user.who = user;
            }
        }
    }

    next();
}

export default callback(authentication, Promise.all([
    import('../../_/watchdog')
]));