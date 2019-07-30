async function extraction(socket: SocketIO.Socket, event, message, next, options: options) {
    console.log['fatal']('socket connect!! extraction');
    next();
}

export default extraction;