async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    const username = req.body.username || '';
    const password = req.body.password ? npm.objectHash(req.body.password) : '';
    const err = {};
    
    if (username && password) {
        const Role = await mongodb.insert('role', { name: username }, { errorHandler: error => err['errorRole'] = error }) || {};
        const View = await mongodb.insert('view', { name: username }, { errorHandler: error => err['errorView'] = error }) || {};

        if (!err['errorRole'] && !err['errorView']) {
            const user = await mongodb.insert('user', {
                username: username,
                password: password,
                role: Role._id,
                view: View._id
            }, { errorHandler: error => err['error'] = error });
        
            if (user) {
                delete user['password'];
                await response.attach(user, req, res);
            } else {
                options['service'].code(err['error'].pure.code);
                await response.attach(err['error'], req, res);
            }
        } else {
            options['service'].code(status.notAcceptable);
            await response.attach(err, req, res);
        }
    } else {
        options['service'].code(status.noContent);
        await response.attach(err, req, res);
    }
    
}

export default callback(service, Promise.all([
    import('../../../_/prerequisite')
]));