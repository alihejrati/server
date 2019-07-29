async function serve(req, res, next, options: options) {
    const discovery = req['_'].service.discovery;
    const status = req['_'].carry.config.statusCode;
    
    for (const service of discovery) {
        req['_'].temporary.service.serve = service;
        const serviceModule = await Import(`/code/source/server/http/services/${service}/service.ts`) || {
            default: async function (req, res, next) {
                const serviceIndex = req['_'].service.discovery.indexOf(service);
                req['_'].service.code[serviceIndex] = status.serviceUnavailable;
                console.log['warn']({
                    tag: 'service/unavailable',
                    req: {
                        _: req['_']
                    }
                });
                await response.attach(null, req, res);
            }
        };
        await serviceModule.default(req, res, next, {
            service: {
                name: service,
                code: code => req['_'].service.code[req['_'].service.discovery.indexOf(service)] = code,
            }
        });
    }
    req['_'].temporary.service.serve = null;
    req['_'].flag.response.attach ? await response.send(req, res) : next();
}

export default callback(serve);