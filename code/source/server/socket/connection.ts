import router from './router';

async function connection(options: options) {
    const Connect = await router({
        connect: Import('/code/source/server/socket/controllers/connect/controller.ts')
    });
    const Router = await router({
        init: Import('/code/source/server/socket/controllers/init/controller.ts'),
        service: Import('/code/source/server/socket/controllers/service/controller.ts'),
        error: Import('/code/source/server/socket/controllers/error/controller.ts')
    });
    const Disconnect = await router({
        disconnect: Import('/code/source/server/socket/controllers/disconnect/controller.ts')
    });
    
    semaphore.on('/server/socket/ready', () => {
        const io = npm.socketIo(npm.server);
        
        io.use(npm.socketioWildcard());

        io.on('connection', (socket) => {
            Connect(socket, 'connection', null);
            socket.on('*', (event, message) => {
                Router(socket, event, message);
            });
            socket.on('disconnect', (event) => {
                Disconnect(socket, event || 'disconnect', null)
            });
        });
    });
}

export default callback(connection);