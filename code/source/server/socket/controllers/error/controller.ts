async function controller(controller, options: options) {

    controller.use(async (socket: SocketIO.Socket, event, message, next) => {
        console.log['fatal']('socket hooooooooooooooo!! 3');
        socket.emit('res', {
            name: 'mmd!'
        });
    });

    return controller;
}

export default callback(controller);