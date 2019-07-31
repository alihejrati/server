async function hell(socket: SocketIO.Socket, event, message, next, options: options) {
    await mongodb.findOneAndUpdate('socket', {socketId: socket['_'].socketId.toString()}, {state: 'disconnect', _: socket['_']});
    console.log['fatal']('socket disconnect!! hell');
}

export default hell;