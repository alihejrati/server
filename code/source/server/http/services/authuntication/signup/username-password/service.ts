async function service(req, res, next, options: options) {
    const username = req.body.username || '';
    const password = req.body.password ? npm.objectHash(req.body.password) : '';
    const guestRole = await mongodb.findOne('role', { name: 'guest' }) || await mongodb.insert('role', { name: 'guest' });
    const guestView = await mongodb.findOne('view', { name: 'guest' }) || await mongodb.insert('view', { name: 'guest' });
    const listener = {};

    const user = await mongodb.insert('user', {
        username: username,
        password: password,
        role: guestRole._id,
        view: guestView._id
    }, {
        listener: (event) => {
            event.on('error', (error) => listener['error'] = error);
        }
    });

    if (user) {
        delete user['password'];
        await response.attach(user, req, res);
    } else {
        options['service'].code(listener['error'].pure.code);
        await response.attach(listener['error'], req, res);
    }
}

export default callback(service, Promise.all([
    import('../../../_/prerequisite')
]));