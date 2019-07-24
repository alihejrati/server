async function extraction(req, res, next, options: options) {
    const router = await config('\\code\\source\\server\\http\\router.conf.json');
    const servers = await config('\\code\\source\\server\\http\\listen.conf.json');
    const statusCode = await config('\\code\\source\\server\\http\\status.conf.json');
    const cookies = await config('\\code\\source\\server\\http\\cookies.conf.json');
    const npmJwt = await config('\\npm\\jwt.conf.json');
    const ip = npm.clientIp(req);
    const host = req.headers.host.split(':')[0];
    const port = Number(req.headers.host.split(':')[1]);

    req.url = decodeURIComponent(req.url.replace(/\\/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'));
    for (const server of servers) {
        server.port == port ? req.url = `/${server.name}${req.url}` : null;
    }
    req.url = router[req.url] || req.url;
    
    req['_'] = {
        status: statusCode.successful,
        unique: `${ip}`, // customizable!
        ip: {
            value: ip,
            detection: {
                device: req.clientInfo,
                details: await npm.nodeIpDetails.initialise({ip: ip}).allInformation()
            }
        },
        route: {
            method: req.method.toLowerCase(),
            protocol: req.protocol,
            host: host,
            port: port,
            path: {
                relative: req.url.split('?')[0],
                absolute: `${req.protocol}://${host}:${port}${req.url.split('?')[0]}`,
                original: {
                    pure: decodeURIComponent(req.originalUrl),
                    correct: decodeURIComponent(req.originalUrl.replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'))
                }
            }
        },
        cookie: typeof req.cookies[cookies.name] === 'string' ? req.cookies[cookies.name] : '',
        user: {
            login: false,
            who: {}
        },
        service: {
            discovery: [],
            code: []
        },
        temporary: {
            watchdog: {layer: null},
            service: {serve: null}
        },
        flag: {
            response: {attach: false}
        },
        response: [],
        carry: {
            config: {
                servers: servers,
                statusCode: statusCode,
                cookies: cookies,
                npm: {
                    jwt: npmJwt
                }
            }
        },
    };

    next();
}

export default callback(extraction, Promise.all([
    import('../../_/watchdog')
]));