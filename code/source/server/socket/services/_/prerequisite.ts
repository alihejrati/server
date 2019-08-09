async function prerequisite(socket, service, options?: options) {
    const conf = await config(`\\code\\source\\server\\socket\\service${service.name.replace(/\//g, '\\')}\\service.conf.json`) || {};
    const status = socket['_'].carry.config.statusCode;
    const serviceIndex = socket['_'].service.discovery.indexOf(service.name);
    socket['_'].service.code[serviceIndex] = status.successful;
    conf.permission = Array.isArray(conf.permission) ? conf.permission : []; 
    conf.captcha = conf.captcha === true;
    conf.enable = conf.enable === false ? false : true;
    
    if (true) {
        if (conf.captcha) {
            if (socket['_'].captcha) {
                // ok!
            } else {
                socket['_'].service.code[serviceIndex] = status.unprocessableEntity;
                console.log['warn']({
                    tag: 'service/captcha',
                    socket: {
                        _: socket['_']
                    }
                });
                await response.attach(null, socket);
                return 'KILL';
            }
        }
    }

    if (true) {
        if (conf.enable) {
            // ok!
        } else {
            socket['_'].service.code[serviceIndex] = status.unavailableForLegalReasons;
            console.log['warn']({
                tag: 'service/unavailableForLegalReasons',
                socket: {
                    _: socket['_']
                }
            });
            await response.attach(null, socket);
            return 'KILL';
        }
    }

    if (true) {
        if (conf.permission.length != 0) {
            if (socket['_'].user.login) {
                const permissions = await mongodb.find('permission', {
                    name: {
                        $in: conf.permission
                    }
                }, {select: {_id: 1}});
                if (permissions && permissions.length == conf.permission.length) {
                    const role = await mongodb.findOne('role', {
                        _id: socket['_'].user.who.role,
                        permission: {
                            $all: permissions
                        }
                    }, {select: {_id: 1}});
                    if (role && role._id == socket['_'].user.who.role) {
                        // ok!
                    } else {
                        socket['_'].service.code[serviceIndex] = status.forbidden;
                        console.log['warn']({
                            tag: 'service/forbidden',
                            socket: {
                                _: socket['_']
                            }
                        });
                        await response.attach(null, socket);
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
                    socket['_'].service.code[serviceIndex] = status.forbidden;
                    console.log['warn']({
                        tag: 'service/forbidden',
                        socket: {
                            _: socket['_']
                        }
                    });
                    await response.attach(null, socket);
                    return 'KILL';
                } 
            } else {
                socket['_'].service.code[serviceIndex] = status.unauthorized;
                console.log['warn']({
                    tag: 'service/unauthorized',
                    socket: {
                        _: socket['_']
                    }
                });
                await response.attach(null, socket);
                return 'KILL';
            }
        }
    }
}

export default prerequisite;