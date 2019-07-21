"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = (function () {
    function Stack() {
    }
    Stack.create = function () {
        return new Promise(function (resolve, reject) {
            mongodb.insert('stack', {}).then(function (stack) { return resolve(stack._id); });
        });
    };
    Stack.push = function (stack, element) {
        return new Promise(function (resolve, reject) {
            mongodb.findByIdAndUpdate('stack', stack, {
                $push: {
                    stack: {
                        $each: [element]
                    }
                }
            }).then(function (_stack) { return resolve(_stack); });
        });
    };
    Stack.top = function (stack) {
        return new Promise(function (resolve, reject) {
            mongodb.findByIdAndUpdate('stack', stack, {}).then(function (_stack) { return resolve(_stack.stack[_stack.stack.length - 1]); });
        });
    };
    Stack.pop = function (stack) {
        return new Promise(function (resolve, reject) {
            Stack.top(stack).then(function (top) {
                mongodb.findByIdAndUpdate('stack', stack, {
                    $pop: {
                        stack: 1
                    }
                }).then(function (_stack) { return resolve(top); });
            });
        });
    };
    return Stack;
}());
exports.default = Stack;
