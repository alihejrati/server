async function authentication(socket: SocketIO.Socket, event, message, next, options: options) {
    const token = await cookie.get('token', socket);  

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

    const _ = Object.assign({}, socket['_']);
    delete _['carry'];
    delete _['temporary'];
    delete _['flag'];
    delete _['captcha'];
    delete _['ip'];
    _.captcha = socket['_'].captcha ? true : false;
    _.ip = socket['_'].ip.value;
    await mongodb.insert('socket', {state: 'connect', socketId: socket['_'].socketId.toString(), event: event, message: message, _: _});

    socket.emit(`/response/${event}`, {
        captcha: await captcha.create(socket['_'].unique)
    });
}

export default authentication;