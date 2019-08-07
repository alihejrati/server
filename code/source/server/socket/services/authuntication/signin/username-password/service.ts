async function service(socket: SocketIO.Socket, event, message, next, options: options) {
    const status = socket['_'].carry.config.statusCode;
    const msg = message.tail[message.tail.length - 1];
    const username = msg.username || '';
    const password = msg.password ? npm.objectHash(msg.password) : '';

    if (!socket['_'].user.login) {
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
                    socket['_'].user.login = true;
                    socket['_'].user.who = user;
                    await cookie.set('token', token, socket);
                    await response.attach({
                        token: token
                    }, socket);
                } else {
                    options['service'].code(status.notModified);
                    await response.attach(null, socket);
                }
            } else {
                options['service'].code(status.notAcceptable);
                await response.attach(null, socket);
            }            
        } else {
            options['service'].code(status.noContent);
            await response.attach(null, socket);
        }
    } else {
        options['service'].code(status.alreadyReported);
        await response.attach({
            token: await cookie.get('token', socket) || msg.token
        }, socket);
    }
}

export default service;