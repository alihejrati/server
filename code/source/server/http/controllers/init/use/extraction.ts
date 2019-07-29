let router: any = {};     
let servers: any = [];    
let statusCode: any = {}; 
let cookies: any = {};    
let npmJwt: any = {};     

config('\\code\\source\\server\\http\\router.conf.json').then(conf => router = conf);
config('\\code\\source\\server\\http\\listen.conf.json').then(conf => servers = conf);
config('\\code\\source\\server\\http\\status.conf.json').then(conf => statusCode = conf);
config('\\code\\source\\server\\http\\cookies.conf.json').then(conf => cookies = conf);
config('\\npm\\jwt.conf.json').then(conf => npmJwt = conf);

async function extraction(req, res, next, options: options) {
    const ip = npm.clientIp(req);
    const host = req.headers.host.split(':')[0];
    const port = Number(req.headers.host.split(':')[1]);
    const unique = `${process.argv[2]}:${ip}`; // customizable!
    let controller;

    req.url = decodeURIComponent(req.url.replace(/\\/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'));
    for (const server of servers) {
        server.port == port ? req.url = `/${server.name}${req.url}` : null;
        server.port == port ? controller = server.name : null;
    }
    req.url = router[req.url] || req.url;

    req['_'] = {
        status: statusCode.successful,
        unique: unique, // customizable!
        captcha: await captcha.check(unique, req.body.captcha  || req.query.captcha || '', {second: 59}),
        controller: controller.toLowerCase(),
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
            watchdog: {layer: '/init/**'},
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

export default callback(extraction);