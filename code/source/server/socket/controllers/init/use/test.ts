async function test(socket: SocketIO.Socket, event, message, next, options: options) {
    console.log['fatal']('socket init!! test');
    next();
}

export default test;