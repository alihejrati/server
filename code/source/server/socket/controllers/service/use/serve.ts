async function serve(socket: SocketIO.Socket, event, message, next, options: options) {
    const discovery = socket['_'].service.discovery;
    const status = socket['_'].carry.config.statusCode;
    
    for (const service of discovery) {
        socket['_'].temporary.service.serve = service;
        const serviceModule = await Import(`/code/source/server/socket/services/${service}/service.ts`) || {
            default: async function (socket, event, message, next) {
                const serviceIndex = socket['_'].service.discovery.indexOf(service);
                socket['_'].service.code[serviceIndex] = status.serviceUnavailable;
                console.log['warn']({
                    tag: 'service/unavailable',
                    socket: {
                        _: socket['_']
                    },
                    event: event,
                    message: message
                });
                await response.attach(null, socket);
            }
        };
        await serviceModule.default(socket, event, message, next, {
            service: {
                name: service,
                code: code => socket['_'].service.code[socket['_'].service.discovery.indexOf(service)] = code,
            }
        });
    }
    socket['_'].temporary.service.serve = null;
    await response.send(socket, {event: event, message: message});
}

export default serve;