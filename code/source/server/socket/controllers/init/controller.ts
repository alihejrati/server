async function controller(controller, options: options) {
    
    controller.use(async (socket: SocketIO.Socket, event, message, next) => {
        console.log['fatal']('socket hooooooooooooooo!!');
        next();
    });
    
    return controller;
}

export default callback(controller);