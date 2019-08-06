async function send(socket, options: options) {
    const message = options['message'];
    const event = options['event'];
    function resSend(data) {
        const _ = Object.assign({}, socket['_']);
        delete _['carry'];
        delete _['temporary'];
        delete _['flag'];
        delete _['captcha'];
        delete _['ip'];
        _.captcha = socket['_'].captcha ? true : false;
        _.ip = socket['_'].ip.value;
        mongodb.insert('socket', {state: 'connect', socketId: socket['_'].socketId.toString(), event: event, message: message, _: _}).then(() => {
            socket.emit(`/response${message.head}`, data);
        });
    }
    function standard(arrayList) {
        let counter = 0;
        const jsonObj = {};
        for (const iterator of arrayList) {
            if (iterator.label) {
                const key = `${iterator.label.split('/').slice(1).join('.')}`;
                delete iterator['label'];
                const value = npm.objectPath.get(jsonObj, key);
                if (value) {
                    if (Array.isArray(value)) {
                        value.push(iterator);
                        npm.objectPath.set(jsonObj, key, value); 
                    } else {
                        npm.objectPath.set(jsonObj, key, [value, iterator]); 
                    }
                } else {
                    npm.objectPath.set(jsonObj, key, iterator); 
                }
            } else {
                jsonObj[counter] = iterator;
                counter++;
            }
        }
        return jsonObj;
    }
    socket['_'].response.length == 0 ? resSend(null) : socket['_'].response.length == 1 && !socket['_'].response[0]['label'] ? resSend(socket['_'].response[0]) : resSend(standard(socket['_'].response));
}

export default send;