async function prerequisite(specification: Specification, options: options) {
    const req = specification.function.parameters[specification.function.arguments.indexOf('req')];
    const service = specification.function.parameters[specification.function.arguments.indexOf('options')].service;
    const conf = await config(`\\code\\source\\server\\http\\service${service.name.replace(/\//g, '\\')}\\service.conf.json`) || {};
    const status = req['_'].carry.config.statusCode;
    const serviceIndex = req['_'].service.discovery.indexOf(service.name);
    req['_'].service.code[serviceIndex] = status.successful;
    conf.method = Array.isArray(conf.method) ? conf.method : ['*']; 
    conf.permission = Array.isArray(conf.permission) ? conf.permission : []; 

    if (true) {
        for (let index = 0; index < conf.method.length; index++) {
            conf.method[index] = conf.method[index].toLowerCase()
        }
        if (conf.method.indexOf(req['_'].route.method) >= 0 || conf.method.indexOf('*') >= 0 ) {
            // ok!
        } else {
            req['_'].service.code[serviceIndex] = status.methodNotAllowed;
            console.log['warn']({
                tag: 'service/methodNotAllowed',
                req: {
                    _: req['_']
                }
            });
            return 'KILL';
        }
    }

    if (true) {
        if (conf.permission.length != 0) {
            if (req['_'].user.login) {
                const permissions = await mongodb.find('permission', {
                    name: {
                        $in: conf.permission
                    }
                }, {select: {_id: 1}});
                if (permissions && permissions.length == conf.permission.length) {
                    const role = await mongodb.findOne('role', {
                        _id: req['_'].user.who.role,
                        permission: {
                            $all: permissions
                        }
                    }, {select: {_id: 1}});
                    if (role && role._id == req['_'].user.who.role) {
                        // ok!
                    } else {
                        req['_'].service.code[serviceIndex] = status.forbidden;
                        console.log['warn']({
                            tag: 'service/forbidden',
                            req: {
                                _: req['_']
                            }
                        });
                        return 'KILL';
                    }
                } else {
                    const repair: any[] = [];
                    for (const name of conf.permission) {
                        repair.push({
                            name: name
                        });
                    }
                    mongodb.insertMany('permission', repair); /* async */
                    req['_'].service.code[serviceIndex] = status.forbidden;
                    console.log['warn']({
                        tag: 'service/forbidden',
                        req: {
                            _: req['_']
                        }
                    });
                    return 'KILL';
                } 
            } else {
                req['_'].service.code[serviceIndex] = status.unauthorized;
                console.log['warn']({
                    tag: 'service/unauthorized',
                    req: {
                        _: req['_']
                    }
                });
                return 'KILL';
            }
        }
    }
}

export default prerequisite;