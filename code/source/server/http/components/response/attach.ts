async function attach(body, req, res, options: options) {
    try {
        body = JSON.parse(npm.jsonStringifySafe(body))
    } catch (error) {}
    
    const attachment = {
        code: req['_'].temporary.watchdog.layer && (/^\/service\/.+/g).test(req['_'].temporary.watchdog.layer) && req['_'].temporary.service.serve ? req['_'].service.code[req['_'].service.discovery.indexOf(req['_'].temporary.service.serve)] : req['_'].status,
        body: body
    };
    
    if (req['_'].temporary.watchdog.layer && (/^\/service\/.+/g).test(req['_'].temporary.watchdog.layer) && req['_'].temporary.service.serve) {
        attachment['label'] = `/service${req['_'].temporary.service.serve}`;
    }

    req['_'].flag.response.attach = true;
    req['_'].response.push(attachment);
}

export default callback(attach);