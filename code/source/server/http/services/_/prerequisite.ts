async function prerequisite(req, res, service, options?: options) {
    const conf = await config(`\\code\\source\\server\\http\\service${service.name.replace(/\//g, '\\')}\\service.conf.json`) || {};
    const status = req['_'].carry.config.statusCode;
    const serviceIndex = req['_'].service.discovery.indexOf(service.name);
    req['_'].service.code[serviceIndex] = status.successful;
    conf.method = Array.isArray(conf.method) ? conf.method : ['*']; 
    conf.permission = Array.isArray(conf.permission) ? conf.permission : []; 
    conf.controller = Array.isArray(conf.controller) ? conf.controller : ['*'];
    conf.captcha = conf.captcha === true;
    conf.enable = conf.enable === true;
    

    if (true) {
        for (let index = 0; index < conf.controller.length; index++) {
            conf.controller[index] = conf.controller[index].toLowerCase();
        }
        if (conf.controller.indexOf(req['_'].controller) >= 0 || conf.controller.indexOf('*') >= 0) {
            // ok!
        } else {
            req['_'].service.code[serviceIndex] = status.badRequest;
            console.log['warn']({
                tag: 'service/badRequest',
                req: {
                    _: req['_']
                }
            });
            await response.attach(null, req, res);
            return 'KILL';
        }
    }

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
            await response.attach(null, req, res);
            return 'KILL';
        }
    }

    if (true) {
        if (conf.captcha) {
            if (req['_'].captcha) {
                // ok!
            } else {
                req['_'].service.code[serviceIndex] = status.unprocessableEntity;
                console.log['warn']({
                    tag: 'service/captcha',
                    req: {
                        _: req['_']
                    }
                });
                await response.attach(null, req, res);
                return 'KILL';
            }
        }
    }

    if (true) {
        if (conf.enable) {
            // ok!
        } else {
            req['_'].service.code[serviceIndex] = status.unavailableForLegalReasons;
            console.log['warn']({
                tag: 'service/unavailableForLegalReasons',
                req: {
                    _: req['_']
                }
            });
            await response.attach(null, req, res);
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
                        await response.attach(null, req, res);
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
                    await response.attach(null, req, res);
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
                await response.attach(null, req, res);
                return 'KILL';
            }
        }
    }
}

export default prerequisite;