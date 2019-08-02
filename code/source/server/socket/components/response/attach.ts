async function attach(body, socket, options: options) {
    try {
        body = JSON.parse(npm.jsonStringifySafe(body))
    } catch (error) {}
    
    const attachment = {
        code: socket['_'].temporary.watchdog.layer && (/^\/service\/.+/g).test(socket['_'].temporary.watchdog.layer) && socket['_'].temporary.service.serve ? socket['_'].service.code[socket['_'].service.discovery.indexOf(socket['_'].temporary.service.serve)] : socket['_'].status,
        body: body
    };
    
    if (socket['_'].temporary.watchdog.layer && (/^\/service\/.+/g).test(socket['_'].temporary.watchdog.layer) && socket['_'].temporary.service.serve) {
        attachment['label'] = `/service${socket['_'].temporary.service.serve}`;
    }

    socket['_'].flag.response.attach = true;
    socket['_'].response.push(attachment);
}

export default attach;