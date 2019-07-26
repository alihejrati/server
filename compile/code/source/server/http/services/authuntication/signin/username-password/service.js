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
Object.defineProperty(exports, "__esModule", { value: true });
function service(req, res, next, options) {
    return __awaiter(this, void 0, void 0, function () {
        var status, username, password, user, token, key, usr, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    status = req['_'].carry.config.statusCode;
                    username = req.body.username || '';
                    password = req.body.password ? npm.objectHash(req.body.password) : '';
                    if (!!req['_'].user.login) return [3, 14];
                    if (!(username && password)) return [3, 11];
                    return [4, mongodb.findOne('user', {
                            username: username,
                            password: password
                        }, { select: { _id: 1 } })];
                case 1:
                    user = _d.sent();
                    if (!user) return [3, 8];
                    token = npm.objectHash(user._id);
                    key = npm.objectHash(token);
                    return [4, redis.set("auth:null:" + key, user)];
                case 2:
                    usr = _d.sent();
                    if (!usr) return [3, 5];
                    return [4, cookie.set('token', token, req, res)];
                case 3:
                    _d.sent();
                    return [4, response.attach({
                            token: token
                        }, req, res)];
                case 4:
                    _d.sent();
                    return [3, 7];
                case 5:
                    options['service'].code(status.notModified);
                    return [4, response.attach(null, req, res)];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7: return [3, 10];
                case 8:
                    options['service'].code(status.notAcceptable);
                    return [4, response.attach(null, req, res)];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3, 13];
                case 11:
                    options['service'].code(status.noContent);
                    return [4, response.attach(null, req, res)];
                case 12:
                    _d.sent();
                    _d.label = 13;
                case 13: return [3, 17];
                case 14:
                    options['service'].code(status.alreadyReported);
                    _b = (_a = response).attach;
                    _c = {};
                    return [4, cookie.get('token', req, res)];
                case 15: return [4, _b.apply(_a, [(_c.token = (_d.sent()) || req.body.token || req.query.token,
                            _c), req, res])];
                case 16:
                    _d.sent();
                    _d.label = 17;
                case 17: return [2];
            }
        });
    });
}
exports.default = callback(service, Promise.all([
    Promise.resolve().then(function () { return require('../../../_/prerequisite'); })
]));
