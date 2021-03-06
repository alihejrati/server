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
function prerequisite(req, res, service, options) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, conf, status, serviceIndex, index, index, permissions, role, repair, _b, _c, name_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, config("\\code\\source\\server\\http\\service" + service.name.replace(/\//g, '\\') + "\\service.conf.json")];
                case 1:
                    conf = (_d.sent()) || {};
                    status = req['_'].carry.config.statusCode;
                    serviceIndex = req['_'].service.discovery.indexOf(service.name);
                    req['_'].service.code[serviceIndex] = status.successful;
                    conf.method = Array.isArray(conf.method) ? conf.method : ['*'];
                    conf.permission = Array.isArray(conf.permission) ? conf.permission : [];
                    conf.controller = Array.isArray(conf.controller) ? conf.controller : ['*'];
                    conf.captcha = conf.captcha === true;
                    conf.enable = conf.enable === false ? false : true;
                    if (!true) return [3, 4];
                    for (index = 0; index < conf.controller.length; index++) {
                        conf.controller[index] = conf.controller[index].toLowerCase();
                    }
                    if (!(conf.controller.indexOf(req['_'].controller) >= 0 || conf.controller.indexOf('*') >= 0)) return [3, 2];
                    return [3, 4];
                case 2:
                    req['_'].service.code[serviceIndex] = status.badRequest;
                    console.log['warn']({
                        tag: 'service/badRequest',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 3:
                    _d.sent();
                    return [2, 'KILL'];
                case 4:
                    if (!true) return [3, 7];
                    for (index = 0; index < conf.method.length; index++) {
                        conf.method[index] = conf.method[index].toLowerCase();
                    }
                    if (!(conf.method.indexOf(req['_'].route.method) >= 0 || conf.method.indexOf('*') >= 0)) return [3, 5];
                    return [3, 7];
                case 5:
                    req['_'].service.code[serviceIndex] = status.methodNotAllowed;
                    console.log['warn']({
                        tag: 'service/methodNotAllowed',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 6:
                    _d.sent();
                    return [2, 'KILL'];
                case 7:
                    if (!true) return [3, 10];
                    if (!conf.captcha) return [3, 10];
                    if (!req['_'].captcha) return [3, 8];
                    return [3, 10];
                case 8:
                    req['_'].service.code[serviceIndex] = status.unprocessableEntity;
                    console.log['warn']({
                        tag: 'service/captcha',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 9:
                    _d.sent();
                    return [2, 'KILL'];
                case 10:
                    if (!true) return [3, 13];
                    if (!conf.enable) return [3, 11];
                    return [3, 13];
                case 11:
                    req['_'].service.code[serviceIndex] = status.unavailableForLegalReasons;
                    console.log['warn']({
                        tag: 'service/unavailableForLegalReasons',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 12:
                    _d.sent();
                    return [2, 'KILL'];
                case 13:
                    if (!true) return [3, 24];
                    if (!(conf.permission.length != 0)) return [3, 24];
                    if (!req['_'].user.login) return [3, 22];
                    return [4, mongodb.find('permission', {
                            name: {
                                $in: conf.permission
                            }
                        }, { select: { _id: 1 } })];
                case 14:
                    permissions = _d.sent();
                    if (!(permissions && permissions.length == conf.permission.length)) return [3, 19];
                    return [4, mongodb.findOne('role', {
                            _id: req['_'].user.who.role,
                            permission: {
                                $all: permissions
                            }
                        }, { select: { _id: 1 } })];
                case 15:
                    role = _d.sent();
                    if (!(role && role._id == req['_'].user.who.role)) return [3, 16];
                    return [3, 18];
                case 16:
                    req['_'].service.code[serviceIndex] = status.forbidden;
                    console.log['warn']({
                        tag: 'service/forbidden',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 17:
                    _d.sent();
                    return [2, 'KILL'];
                case 18: return [3, 21];
                case 19:
                    repair = [];
                    try {
                        for (_b = __values(conf.permission), _c = _b.next(); !_c.done; _c = _b.next()) {
                            name_1 = _c.value;
                            repair.push({
                                name: name_1
                            });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    mongodb.insertMany('permission', repair);
                    req['_'].service.code[serviceIndex] = status.forbidden;
                    console.log['warn']({
                        tag: 'service/forbidden',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 20:
                    _d.sent();
                    return [2, 'KILL'];
                case 21: return [3, 24];
                case 22:
                    req['_'].service.code[serviceIndex] = status.unauthorized;
                    console.log['warn']({
                        tag: 'service/unauthorized',
                        req: {
                            _: req['_']
                        }
                    });
                    return [4, response.attach(null, req, res)];
                case 23:
                    _d.sent();
                    return [2, 'KILL'];
                case 24: return [2];
            }
        });
    });
}
exports.default = prerequisite;
