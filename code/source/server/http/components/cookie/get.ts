async function get(key: string | null, req, res, options: options) {
    const jwt = req['_'].carry.config.npm.jwt;
    const hash = req['_'].cookie;

    let cookieVAR = {};
    let unique;
    try {
        const encode = await redis.get(`cookie:null:${hash}`) || '';
        const decode = npm.jwtSimple.decode(encode, jwt.secret);
        const parse = JSON.parse(decode);
        cookieVAR = parse.cookie;
        unique = parse.unique;
        if (unique == req['_'].unique) {
            // ok!!
        } else {
            cookieVAR = {};
        }
    } catch (error) {
        cookieVAR = {};
    }

    return key == null ? cookieVAR : cookieVAR[key];
}

export default callback(get);