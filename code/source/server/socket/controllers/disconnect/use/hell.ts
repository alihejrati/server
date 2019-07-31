async function hell(socket: SocketIO.Socket, event, message, next, options: options) {
    socket['_'].temporary.watchdog.layer = '/disconnect/**';
    await mongodb.findOneAndUpdate('socket', {socketId: socket['_'].socketId.toString()}, {state: 'disconnect', _: socket['_']});
}

export default hell;