let router: any = {};     
let statusCode: any = {}; 
let cookies: any = {};    
let npmJwt: any = {};     

config('\\code\\source\\server\\socket\\router.conf.json').then(conf => router = conf);
config('\\code\\source\\server\\http\\status.conf.json').then(conf => statusCode = conf);
config('\\code\\source\\server\\socket\\cookies.conf.json').then(conf => cookies = conf);
config('\\npm\\jwt.conf.json').then(conf => npmJwt = conf);

async function extraction(socket: SocketIO.Socket, event, message, next, options: options) {
    const ip = socket.handshake.address;
    const socketId = socket.id;
    const unique = `${process.argv[2]}:${ip}`; // customizable!
    npm.nodeIpDetails.initialise({ip: ip}).allInformation().then(details => socket['_'].ip.detection.details = details);
    
    socket['_'] = {
        status: statusCode.successful,
        socketId: socketId,
        unique: unique, // customizable!
        captcha: false,
        ip: {
            value: ip,
            detection: {
                details: {} // Promise
            }
        },
        cookie: typeof npm.cookie.parse(socket.handshake.headers.cookie)[cookies.name] === 'string' ? npm.cookie.parse(socket.handshake.headers.cookie)[cookies.name] : '',
        user: {
            login: false,
            who: {}
        },
        service: {
            discovery: [],
            code: []
        },
        temporary: {
            watchdog: {layer: '/connect/**'},
            service: {serve: null}
        },
        flag: {
            response: {attach: false}
        },
        response: [],
        carry: {
            config: {
                statusCode: statusCode,
                npm: {
                    jwt: npmJwt
                }
            }
        },
    };

    next();
}

export default extraction;