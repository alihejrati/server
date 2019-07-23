import router from './router';

async function connection(options: options) {
    const Router = await router();
    
    semaphore.on('/server/socket/ready', () => {
        const io = npm.socketIo(npm.server);
        
        io.use(npm.socketioWildcard());

        io.on('connection', (socket) => {
            Router(socket, 'connection', null);
            socket.on('*', (event, message) => {
                Router(socket, event, message);
            });
            socket.on('disconnect', (event) => {
                Router(socket, event || 'disconnect', null)
            });
        });
    });
}

export default callback(connection);