async function hell(socket: SocketIO.Socket, event, message, next, options: options) {
    socket['_'].timestamp = new Date();
    socket['_'].captcha = false;
    socket['_'].service.discovery = [];
    socket['_'].service.code = [];
    socket['_'].temporary.watchdog.layer = '/disconnect/**';
    socket['_'].temporary.service.serve = null;
    socket['_'].flag.response.attach = false;
    socket['_'].response = [];

    await redis.del(`cookie:null:${socket['_'].cookie}`);

    const _ = Object.assign({}, socket['_']);
    delete _['carry'];
    delete _['temporary'];
    delete _['flag'];
    delete _['captcha'];
    delete _['ip'];
    _.captcha = socket['_'].captcha ? true : false;
    _.ip = socket['_'].ip.value;
    await mongodb.insert('socket', {state: 'disconnect', socketId: socket['_'].socketId.toString(), event: event, message: message, _: _});
}

export default hell;