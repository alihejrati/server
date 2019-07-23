async function controller(controller, options: options) {

    controller.use(async (socket: SocketIO.Socket, event, message, next) => {
        console.log['fatal']('socket hooooooooooooooo!! 2');
        next();
    });

    return controller;
}

export default callback(controller);