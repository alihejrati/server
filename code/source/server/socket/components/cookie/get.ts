async function get(key: string | null, socket, options: options) {
    const jwt = socket['_'].carry.config.npm.jwt;
    const hash = socket['_'].cookie;

    let cookieVAR = {};
    let unique;
    try {
        const encode = await redis.get(`cookie:null:${hash}`) || '';
        const decode = npm.jwtSimple.decode(encode, jwt.secret);
        const parse = JSON.parse(decode);
        cookieVAR = parse.cookie;
        unique = parse.unique;
        if (unique == socket['_'].unique) {
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