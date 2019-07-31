import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/redis/model.js`);
let jwt: any = {};

config('\\npm\\jwt.conf.json').then(conf => jwt = conf);

async function get(key: string, options: options) {
    key = key.replace(/\:null\:/g, `:${process.argv[2]}:`);
    const database = options['database'] || 'db';
    const Model = model[database];
    const value = await new Promise((resolve, reject) => {
        Model.get(key, (err, reply) => {
            try {
                reply = npm.jwtSimple.decode(reply, jwt.secret);
            } catch (error) {
                reply = null;
            }
            if (!err) {
                try {
                    reply = JSON.parse(reply);
                    resolve(reply);
                } catch (error) {
                    resolve(reply);
                }
            }
        });
    });

    console.log['database']({
        database: {
            type: 'redis',
            // db: options.preCall['model'].variable.db,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'get',
            key: key
        },
        res: value
    });

    return value;
}

export default callback(get);