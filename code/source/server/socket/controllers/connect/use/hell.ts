async function hell(socket: SocketIO.Socket, event, message, next, options: options) {
    await mongodb.findOneAndUpdate('socket', {socketId: socket['_'].socketId.toString()}, {state: 'connect', _: socket['_']});
    console.log['fatal']('socket connect!! hell');
}

export default hell;