async function router(controllers, options: options) {
    const controller = new npm.asyncWare();
    let lastController;

    for (const controllerName of Object.keys(controllers)) {
        const controllerFunction = await controllers[controllerName];
        lastController = await controllerFunction.default(controller);
    }

    return (socket: SocketIO.Socket, event: string, message) => {
        lastController.run(socket, event, message);
    }
}

export default callback(router);