import prerequisite from '../../../services/_/prerequisite';

async function serve(socket: SocketIO.Socket, event, message, next, options: options) {
    const discovery = socket['_'].service.discovery;
    const status = socket['_'].carry.config.statusCode;
    
    for (const service of discovery) {
        socket['_'].temporary.service.serve = service;
        const file = await Import(`/code/source/server/socket/services/${service}/service.ts`);
        const flag = file ? true : false;
        const serviceModule = file || {
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
        const opt = {
            service: {
                name: service,
                code: code => socket['_'].service.code[socket['_'].service.discovery.indexOf(service)] = code,
            }
        };
        const KILL = flag ? await prerequisite(socket, opt.service) : null
        if (KILL !== 'KILL') {
            await serviceModule.default(socket, event, message, next, opt);
        }
    }
    socket['_'].temporary.service.serve = null;
    await response.send(socket, {event: event, message: message});
}

export default serve;