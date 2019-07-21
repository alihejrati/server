import { Types } from 'mongoose';

class Stack {
    constructor() {
        
    }
    static create(): Promise<Types.ObjectId> {
        return new Promise((resolve, reject) => {
            mongodb.insert('stack', {}).then(stack => resolve(stack._id));
        });
    }
    static push(stack: Types.ObjectId, element: any) {
        return new Promise((resolve, reject) => {
            mongodb.findByIdAndUpdate('stack', stack, {
                $push: {
                    stack: {
                        $each: [element]
                    }
                }
            }).then(_stack => resolve(_stack));
        });
    }
    static top(stack: Types.ObjectId) {
        return new Promise((resolve, reject) => {
            mongodb.findByIdAndUpdate('stack', stack, {}).then(_stack => resolve(_stack.stack[_stack.stack.length-1]));
        });
    }
    static pop(stack: Types.ObjectId) {
        return new Promise((resolve, reject) => {
            Stack.top(stack).then((top) => {
                mongodb.findByIdAndUpdate('stack', stack, {
                    $pop: {
                        stack: 1
                    }
                }).then(_stack => resolve(top));
            });
        });
    }
}

export default Stack;