import * as jsonStringifySafe from 'json-stringify-safe';

async function preCall($preCall, specification) {
    let KILL = false;
    const $$preCall = {};
    console.log['kernel/Function/preCall']({
        level: 'trace',
        specification: JSON.parse(jsonStringifySafe(specification))
    });    
    const funcs = await $preCall;
    for (const func of funcs) {
        $$preCall[func.default.name] = await func.default(specification);
        if ($$preCall[func.default.name] == 'KILL') {
            KILL = true;
            break;
        }
    }
    return {
        KILL: KILL,
        $$preCall: $$preCall
    };
    // return $$preCall;
}
async function postReturn($postReturn, specification) {
    const $$postReturn = {};
    console.log['kernel/Function/postReturn']({
        level: 'trace',
        specification: JSON.parse(jsonStringifySafe(specification))
    });
    const funcs = await $postReturn;
    for (const func of funcs) {
        $$postReturn[func.default.name] = await func.default(specification);
    }
    return $$postReturn;
}

function callback(callback: Function, $preCall: any = [], $postReturn: any = []) {
    const error = new Error();
    
    const specification = {
        path: {
            absolute: (error.stack || '').split('at Object.<anonymous>')[1].split('(')[1].split(')')[0].split('.js:')[0].replace(/\\/g, '/').replace(/\/+/g, '/')
        },
        function: {
            name: callback.name,
            arguments: (function getArgs(func) {
                // First match everything inside the function argument parens.
                //@ts-ignore
                let args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
                // Split the arguments string into an array comma delimited.
                return args.split(',').map(function(arg) {
                  // Ensure no inline comments are parsed and trim the whitespace.
                  return arg.replace(/\/\*.*\*\//, '').trim();
                }).filter(function(arg) {
                  // Ensure no undefined values are added.
                  return arg;
                });
            })(callback),
            parameters: []
        }
    };

    async function cb(...parameters) {
        // @ts-ignore
        specification.function.parameters = parameters;
        const spec = JSON.parse(jsonStringifySafe(specification));
        if (specification.function.arguments[specification.function.arguments.length-1] == 'options' && specification.function.arguments.length == parameters.length) {
            // pass
            parameters[parameters.length-1]['preCall'] = {};
            parameters[parameters.length-1]['specification'] = spec;
        } else if (specification.function.arguments[specification.function.arguments.length-1] == 'options' && specification.function.arguments.length == parameters.length + 1) {
            // non pass
            parameters.push({
                preCall: {},
                specification: spec
            });
        } else {
            console.log['kernel/callback']({
                level: 'error',
                specification: spec
            });
            return;
        }
        const {KILL, $$preCall} = await preCall($preCall, specification);
        if (!KILL) {
            // @ts-ignore
            parameters[parameters.length-1]['preCall'] = $$preCall;
            const $callback    = await callback(...parameters);
            const $$postReturn = await postReturn($postReturn, specification);
            return $callback;       
        } else {
            console.log['kernel/Function/KILL']({
                level: 'warn',
                specification: JSON.parse(jsonStringifySafe(specification))
            }); 
        }
    }
    Object.defineProperty(cb, 'name', {value: callback.name, writable: false});
    return cb;
}

global.callback = callback;

export default callback;