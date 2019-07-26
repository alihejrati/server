import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/redis/model.js`);
let jwt: any = {};

config('\\npm\\jwt.conf.json').then(conf => jwt = conf);

async function set(key: string, value: any, options: options) {
    const database = options['database'] || 'db';
    const Model = model[database];
    try {
        JSON.parse(JSON.stringify(value));
        value = JSON.stringify(value);
    } catch (error) {}

    value = value || null;

    const _res = key ? await Model.set(key, npm.jwtSimple.encode(value, jwt.secret)) : null;
    const res  = key ? _res || {key: key, value: value} : null;

    console.log['database']({
        database: {
            type: 'redis',
            // db: options.preCall['model'].variable.db,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'set',
            key: key,
            value: value
        },
        res: res
    });

    return res;
}

export default callback(set);