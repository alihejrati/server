import router from './router';

async function connection(options: options) {
    const Connect = await router({
        connect: Import('/code/source/server/socket/controllers/connect/controller.ts')
    });
    const Router = await router({
        service: Import('/code/source/server/socket/controllers/service/controller.ts')
    });
    const Disconnect = await router({
        disconnect: Import('/code/source/server/socket/controllers/disconnect/controller.ts')
    });
    
    semaphore.on('/server/socket/ready', () => {
        const io = npm.socketIo(npm.server);
        
        io.use(npm.socketioWildcard());

        io.on('connection', (socket) => {
            Connect(socket, 'connection', null);
            socket.on('*', (event) => {
                if (event.data[0] && typeof event.data[0] === 'string' && /^\/service\//g.test(event.data[0])) {
                    const message = {head: event.data[0], tail: event.data.slice(1)};
                    const last = message.tail[message.tail.length - 1];
                    last && typeof last === 'object' && npm.isPlainObject(last) ? true : message.tail.push({});
                    Router(socket, event, message);
                }
            });
            socket.on('disconnect', (event) => {
                Disconnect(socket, event || 'disconnect', null)
            });
        });
    });
}

export default callback(connection);