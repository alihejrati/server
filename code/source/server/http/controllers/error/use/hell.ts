let viewHell = {VIEW: '', PAGE: ''};
config('\\code\\source\\server\\http\\view\\hell.conf.json').then(conf => viewHell = conf);


function statusCode(code: number, req, res) {
    const status = req['_'].carry.config.statusCode;
    req['_'].status = req['_'].status == status.successful ? code : req['_'].status;
}

async function hell(req, res, next) {
    let code;
    const status = req['_'].carry.config.statusCode;
    const VIEW = req['_'].user.login ? '?' : viewHell.VIEW;
    const PAGE = req['_'].user.login ? 'error/code' : viewHell.PAGE;

    const SEND = () => {
        res.render('error/handler');
    }

    const NEXT = () => {
        req['_'].status = code;
        if (VIEW == '?') {
            view.send(viewHell.VIEW, viewHell.PAGE, req, res, {next: SEND, variables: {}});
        } else {
            SEND();
        }
    };

    if (req['_'].service.discovery.length == 0) {
        statusCode(status.notFound, req, res);
        if (req['_'].route.method == 'get') {
            code = req['_'].status;
            if (!req['_'].user.login && req['_'].controller == 'backend') {
                res.redirect('/signin');
            } else {
                await view.send(VIEW, PAGE, req, res, {next: NEXT, variables: {}});
            }
        } else {
            await response.attach(null, req, res);
            await response.send(req, res);
        }
    } else {
        statusCode(status.multiStatus, req, res);
        if (req['_'].route.method == 'get') {
            code = req['_'].status;
            if (!req['_'].user.login && req['_'].controller == 'backend') {
                res.redirect('/signin');
            } else {
                await view.send(VIEW, PAGE, req, res, {next: NEXT, variables: {}});
            }
        } else {
            await response.attach(null, req, res);
            await response.send(req, res);
        }
    }
}

export default hell;