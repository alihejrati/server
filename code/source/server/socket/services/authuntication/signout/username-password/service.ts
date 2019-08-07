async function service(socket: SocketIO.Socket, event, message, next, options: options) {
    const status = socket['_'].carry.config.statusCode;
    const msg = message.tail[message.tail.length - 1];

    if (socket['_'].user.login) {
        const hash = socket['_'].cookie;
        await redis.del(`cookie:null:${hash}`);
        await redis.del(`auth:null:${npm.objectHash(npm.objectHash(socket['_'].user.who._id))}`);
        socket['_'].user.login = false;
        socket['_'].user.who = {};
        await response.attach(null, socket);
    } else {
        options['service'].code(status.unauthorized);
        await response.attach(null, socket);
    }
}

export default service;