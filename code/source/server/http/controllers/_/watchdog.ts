let status = {};

config('\\code\\source\\server\\http\\status.conf.json').then((conf) => {
    status = conf;
});

async function watchdog(specification: Specification, options: options) {
    const req = specification.function.parameters[specification.function.arguments.indexOf('req')];
    const res = specification.function.parameters[specification.function.arguments.indexOf('res')];
    const next = specification.function.parameters[specification.function.arguments.indexOf('next')];
    const pathAbsolute = specification.path.absolute;
    const statusList: any[] = []; // TODOooooooooooooooooooooooo!!
    const layer = pathAbsolute.split('controllers')[1];

    if (req['_']) {
        req['_'].temporary.watchdog.layer = layer;
    }
    
    statusList.push(status['successful']);
    statusList.sort();

    if (!req['_'] || statusList.indexOf(req['_'].status) >= 0 || statusList.indexOf('*') >= 0 || /^\/error\/.+/g.test(layer)) {
        console.log['watchdog']({
            path: pathAbsolute,
            req: {
                _: req['_']
            }
        });
        return true;
    } else {
        console.log['warn']({
            sensitive: 'watchdog',
            path: pathAbsolute,
            req: {
                _: req['_']
            }
        });
        next();
        return 'KILL';
    }
}

export default watchdog;