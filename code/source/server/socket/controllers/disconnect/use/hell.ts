async function hell(socket: SocketIO.Socket, event, message, next, options: options) {
    socket['_'].timestamp = new Date();
    socket['_'].captcha = false;
    socket['_'].service.discovery = [];
    socket['_'].service.code = [];
    socket['_'].temporary.watchdog.layer = '/disconnect/**';
    socket['_'].temporary.service.serve = null;
    socket['_'].flag.response.attach = false;
    socket['_'].response = [];
    const _ = Object.assign({}, socket['_']);
    delete _['carry'];
    await mongodb.findOneAndUpdate('socket', {socketId: socket['_'].socketId.toString()}, {state: 'disconnect', event: event, message: message, $push: { _: { $each: [_]}}});

}

export default hell;