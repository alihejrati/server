import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/redis/model.js`);

async function get(key: string, options: options) {
    const database = options['database'] || 'db';
    const Model = model[database];
    const value = await new Promise((resolve, reject) => {
        Model.get(key, (err, reply) => {
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