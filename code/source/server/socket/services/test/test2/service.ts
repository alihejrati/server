async function service(socket: SocketIO.Socket, event, message, next, options: options) {
    options['service'].code(600);
    await response.attach({
        name: 'mmd!'
    }, socket);
    options['service'].code(601);
    await response.attach('OOk!!!!', socket);
}

export default service;