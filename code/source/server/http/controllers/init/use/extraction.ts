import parser from '../../../components/parser/parser';

let components: any = {captcha: {}};
let socket: any = {};     
let router: any = {};     
let servers: any = [];    
let statusCode: any = {}; 
let cookies: any = {};    
let npmJwt: any = {};     

config('\\code\\source\\components\\captcha\\check.conf.json').then(conf => components.captcha.check = conf);
config('\\code\\source\\server\\socket\\listen.conf.json').then(conf => socket = conf);
config('\\code\\source\\server\\http\\router.conf.json').then(conf => router = conf);
config('\\code\\source\\server\\http\\listen.conf.json').then(conf => servers = conf);
config('\\code\\source\\server\\http\\status.conf.json').then(conf => statusCode = conf);
config('\\code\\source\\server\\http\\cookies.conf.json').then(conf => cookies = conf);
config('\\npm\\jwt.conf.json').then(conf => npmJwt = conf);

async function extraction(req, res, next) {
    const ip = req.ip; // TODO => change to ipv6
    const host = req.headers.host.split(':')[0];
    const port = Number(req.headers.host.split(':')[1]) || Number(req.connection.server._connectionKey.split(':').pop());
    const unique = `${process.argv[2]}:${ip}`; // customizable!
    let controller;

    req.body = req.body.dynamic ? parser(req.body) : req.body;
    req.url = decodeURIComponent(req.url.replace(/\\/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'));
    for (const server of servers) {
        server.port == port ? req.url = `/${server.name}${req.url}` : null;
        server.port == port ? controller = server.name : null;
    }
    req.url = router[req.url] || req.url;

    req['_'] = {
        status: statusCode.successful,
        unique: unique, // customizable!
        captcha: await captcha.check(unique, req.body.captcha  || req.query.captcha || '', components.captcha.check.expire),
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
                socket: socket,
                servers: servers,
                statusCode: statusCode,
                cookies: cookies,
                components: components,
                npm: {
                    jwt: npmJwt
                }
            }
        },
    };

    next();
}

export default extraction;