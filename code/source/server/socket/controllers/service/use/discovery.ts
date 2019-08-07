async function discovery(socket: SocketIO.Socket, event, message, next, options: options) {
    socket['_'].timestamp = new Date();
    socket['_'].captcha = await captcha.check(socket['_'].unique, message.tail[message.tail.length - 1].captcha || '', socket['_'].carry.config.components.captcha.check.expire) || await captcha.check(`server/http:${socket['_'].ip.value.split(':').pop()}`, message.tail[message.tail.length - 1].captcha  || '', socket['_'].carry.config.components.captcha.check.expire);
    socket['_'].service.discovery = [];
    socket['_'].service.code = [];
    socket['_'].temporary.watchdog.layer = '/service/**';
    socket['_'].temporary.service.serve = null;
    socket['_'].flag.response.attach = false;
    socket['_'].response = [];
    socket['_'].cookie = typeof npm.cookie.parse(socket.handshake.headers.cookie || '')[socket['_'].carry.config.cookies.name] === 'string' ? npm.cookie.parse(socket.handshake.headers.cookie || '')[socket['_'].carry.config.cookies.name] : '';


    console.debug('------------------------------------------------------------> cap: ', socket['_'].captcha);

    const msg = message.tail[message.tail.length - 1];
    const token = await cookie.get('token', socket) || msg.token;  

    if (token) {
        const usr = await redis.get(`auth:null:${npm.objectHash(token)}`);
        if (usr && usr._id) {
            const user = await mongodb.findOne('user', {
                _id: usr._id
            });
            if (user) {
                socket['_'].user.login = true;
                socket['_'].user.who = user;
            }
        }
    }
    
    const services: string[] = message.head.replace(/^.*\/service\//g, '').split(':');
    const discovery: string[] = [];
    for (let index = 0; index < services.length; index++) {
        services[index] = services[index].replace(/[\:]+/g, ':').replace(/[\.]+/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/').trim();
        services[index] = services[index][0] != '/' ? `/${services[index]}` : services[index];
        services[index] == '' || services[index] == '/' ? null : discovery.push(services[index]);
    }
    socket['_'].service.discovery = discovery;
    
    next();
}

export default discovery;