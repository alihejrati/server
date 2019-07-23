import init from './controllers/init/controller';
import service from './controllers/service/controller';
import error from './controllers/error/controller';

async function router(options: options) {
    const controller = new npm.asyncWare();
    
    const [initController, serviceController, errorController] = await Promise.all([
        init(controller),
        service(controller),
        error(controller)
    ]);
    return (socket: SocketIO.Socket, event: string, message) => {
        errorController.run(socket, event, message);
    }
}

export default callback(router);