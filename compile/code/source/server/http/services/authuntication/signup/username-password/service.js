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
        var username, password, guestRole, _a, guestView, _b, listener, user;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    username = req.body.username || '';
                    password = req.body.password ? npm.objectHash(req.body.password) : '';
                    return [4, mongodb.findOne('role', { name: 'guest' })];
                case 1:
                    _a = (_c.sent());
                    if (_a) return [3, 3];
                    return [4, mongodb.insert('role', { name: 'guest' })];
                case 2:
                    _a = (_c.sent());
                    _c.label = 3;
                case 3:
                    guestRole = _a;
                    return [4, mongodb.findOne('view', { name: 'guest' })];
                case 4:
                    _b = (_c.sent());
                    if (_b) return [3, 6];
                    return [4, mongodb.insert('view', { name: 'guest' })];
                case 5:
                    _b = (_c.sent());
                    _c.label = 6;
                case 6:
                    guestView = _b;
                    listener = {};
                    return [4, mongodb.insert('user', {
                            username: username,
                            password: password,
                            role: guestRole._id,
                            view: guestView._id
                        }, {
                            listener: function (event) {
                                event.on('error', function (error) { return listener['error'] = error; });
                            }
                        })];
                case 7:
                    user = _c.sent();
                    if (!user) return [3, 9];
                    delete user['password'];
                    return [4, response.attach(user, req, res)];
                case 8:
                    _c.sent();
                    return [3, 11];
                case 9:
                    options['service'].code(listener['error'].pure.code);
                    return [4, response.attach(listener['error'], req, res)];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11: return [2];
            }
        });
    });
}
exports.default = callback(service, Promise.all([
    Promise.resolve().then(function () { return require('../../../_/prerequisite'); })
]));
