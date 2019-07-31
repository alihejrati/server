async function set(key: string, value, req, res, options: options) {
    const jwt = req['_'].carry.config.npm.jwt;
    let cookieVAR = await cookie.get(null, req, res) || {};

    cookieVAR = Object.assign(cookieVAR, { [`${key}`]: value });
    const cookieObj = {
        unique: req['_'].unique,
        cookie: cookieVAR
    };
    const encode = npm.jwtSimple.encode(JSON.stringify(cookieObj), jwt.secret);
    const hash = req['_'].cookie || `${npm.uniqid()}${npm.uniqid()}`;
    if (
        (req['_'].cookie)
        ||
        (!req['_'].cookie && !(await redis.get(hash)))
        ) {
        const code = await redis.set(`cookie:null:${hash}`, encode);
        if (code) {
            res.cookie(req['_'].carry.config.cookies.name, hash);
            req['_'].cookie = hash;
        }        
    }
}

export default callback(set);