"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router = {};
var servers = [];
var statusCode = {};
var cookies = {};
var npmJwt = {};
config('\\code\\source\\server\\http\\router.conf.json').then(function (conf) { return router = conf; });
config('\\code\\source\\server\\http\\listen.conf.json').then(function (conf) { return servers = conf; });
config('\\code\\source\\server\\http\\status.conf.json').then(function (conf) { return statusCode = conf; });
config('\\code\\source\\server\\http\\cookies.conf.json').then(function (conf) { return cookies = conf; });
config('\\npm\\jwt.conf.json').then(function (conf) { return npmJwt = conf; });
function extraction(req, res, next, options) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, ip, host, port, unique, controller, servers_1, servers_1_1, server, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    ip = npm.clientIp(req);
                    host = req.headers.host.split(':')[0];
                    port = Number(req.headers.host.split(':')[1]);
                    unique = process.argv[2] + ":" + ip;
                    req.url = decodeURIComponent(req.url.replace(/\\/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'));
                    try {
                        for (servers_1 = __values(servers), servers_1_1 = servers_1.next(); !servers_1_1.done; servers_1_1 = servers_1.next()) {
                            server = servers_1_1.value;
                            server.port == port ? req.url = "/" + server.name + req.url : null;
                            server.port == port ? controller = server.name : null;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (servers_1_1 && !servers_1_1.done && (_a = servers_1.return)) _a.call(servers_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    req.url = router[req.url] || req.url;
                    _b = req;
                    _c = '_';
                    _d = {
                        status: statusCode.successful,
                        unique: unique
                    };
                    return [4, captcha.check(unique, req.body.captcha || req.query.captcha || '', { second: 59 })];
                case 1:
                    _d.captcha = _g.sent(),
                        _d.controller = controller.toLowerCase();
                    _e = {
                        value: ip
                    };
                    _f = {
                        device: req.clientInfo
                    };
                    return [4, npm.nodeIpDetails.initialise({ ip: ip }).allInformation()];
                case 2:
                    _b[_c] = (_d.ip = (_e.detection = (_f.details = _g.sent(),
                        _f),
                        _e),
                        _d.route = {
                            method: req.method.toLowerCase(),
                            protocol: req.protocol,
                            host: host,
                            port: port,
                            path: {
                                relative: req.url.split('?')[0],
                                absolute: req.protocol + "://" + host + ":" + port + req.url.split('?')[0],
                                original: {
                                    pure: decodeURIComponent(req.originalUrl),
                                    correct: decodeURIComponent(req.originalUrl.replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'))
                                }
                            }
                        },
                        _d.cookie = typeof req.cookies[cookies.name] === 'string' ? req.cookies[cookies.name] : '',
                        _d.user = {
                            login: false,
                            who: {}
                        },
                        _d.service = {
                            discovery: [],
                            code: []
                        },
                        _d.temporary = {
                            watchdog: { layer: '/init/**' },
                            service: { serve: null }
                        },
                        _d.flag = {
                            response: { attach: false }
                        },
                        _d.response = [],
                        _d.carry = {
                            config: {
                                servers: servers,
                                statusCode: statusCode,
                                cookies: cookies,
                                npm: {
                                    jwt: npmJwt
                                }
                            }
                        },
                        _d);
                    next();
                    return [2];
            }
        });
    });
}
exports.default = callback(extraction);
