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
var router_1 = require("./router");
function connection(options) {
    return __awaiter(this, void 0, void 0, function () {
        var Connect, Router, Disconnect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, router_1.default({
                        connect: Import('/code/source/server/socket/controllers/connect/controller.ts')
                    })];
                case 1:
                    Connect = _a.sent();
                    return [4, router_1.default({
                            service: Import('/code/source/server/socket/controllers/service/controller.ts')
                        })];
                case 2:
                    Router = _a.sent();
                    return [4, router_1.default({
                            disconnect: Import('/code/source/server/socket/controllers/disconnect/controller.ts')
                        })];
                case 3:
                    Disconnect = _a.sent();
                    semaphore.on('/server/socket/ready', function () {
                        var io = npm.socketIo(npm.server);
                        io.use(npm.socketioWildcard());
                        io.on('connection', function (socket) {
                            Connect(socket, 'connection', null);
                            socket.on('*', function (event) {
                                if (event.data[0] && typeof event.data[0] === 'string' && /^\/service\//g.test(event.data[0])) {
                                    var message = { head: event.data[0], tail: event.data.slice(1) };
                                    var last = message.tail[message.tail.length - 1];
                                    last && typeof last === 'object' && npm.isPlainObject(last) ? true : message.tail.push({});
                                    Router(socket, event, message);
                                }
                            });
                            socket.on('disconnect', function (event) {
                                Disconnect(socket, event || 'disconnect', null);
                            });
                        });
                    });
                    return [2];
            }
        });
    });
}
exports.default = callback(connection);
