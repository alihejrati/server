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
function serve(req, res, next, options) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, discovery, status, _loop_1, discovery_1, discovery_1_1, service, e_1_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    discovery = req['_'].service.discovery;
                    status = req['_'].carry.config.statusCode;
                    _loop_1 = function (service) {
                        var serviceModule;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    req['_'].temporary.service.serve = service;
                                    return [4, Import("/code/source/server/http/services/" + service + "/service.ts")];
                                case 1:
                                    serviceModule = (_a.sent()) || {
                                        default: function (req, res, next) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var serviceIndex;
                                                return __generator(this, function (_a) {
                                                    serviceIndex = req['_'].service.discovery.indexOf(service);
                                                    req['_'].service.code[serviceIndex] = status.serviceUnavailable;
                                                    console.log['warn']({
                                                        tag: 'service/unavailable',
                                                        req: {
                                                            _: req['_']
                                                        }
                                                    });
                                                    return [2];
                                                });
                                            });
                                        }
                                    };
                                    return [4, serviceModule.default(req, res, next, {
                                            service: {
                                                name: service,
                                                code: function (code) { return req['_'].service.code[req['_'].service.discovery.indexOf(service)] = code; },
                                            }
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    discovery_1 = __values(discovery), discovery_1_1 = discovery_1.next();
                    _c.label = 2;
                case 2:
                    if (!!discovery_1_1.done) return [3, 5];
                    service = discovery_1_1.value;
                    return [5, _loop_1(service)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    discovery_1_1 = discovery_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (discovery_1_1 && !discovery_1_1.done && (_a = discovery_1.return)) _a.call(discovery_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8:
                    req['_'].temporary.service.serve = null;
                    if (!req['_'].flag.response.attach) return [3, 10];
                    return [4, response.send(req, res)];
                case 9:
                    _b = _c.sent();
                    return [3, 11];
                case 10:
                    _b = next();
                    _c.label = 11;
                case 11:
                    _b;
                    return [2];
            }
        });
    });
}
exports.default = callback(serve, Promise.all([
    Promise.resolve().then(function () { return require('../../_/watchdog'); })
]));
