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

    await mongodb.findOneAndUpdate('socket', {socketId: socket['_'].socketId.toString()}, {state: 'connect', _: socket['_']});
    socket.emit('/response/connection', null);
}

export default callback(authentication);