async function service(socket: SocketIO.Socket, event, message, next, options: options) {
    const status = socket['_'].carry.config.statusCode;
    const msg = message.tail[message.tail.length - 1];
    options['service'].code(600);
    await response.attach({
        name: 'mmd!'
    }, socket);
    options['service'].code(601);
    await response.attach('OOk!!!!', socket);
}

export default service;