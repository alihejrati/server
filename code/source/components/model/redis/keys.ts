import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/redis/model.js`);

async function keys(pattern: string, options: options) {
    pattern = pattern.replace(/\:null\:/g, `:${process.argv[2]}:`);
    const database = options['database'] || 'db';
    const Model = model[database];
    const value = await new Promise<any>((resolve, reject) => {
        Model.keys(pattern, (err, reply) => {
            if (!err) {
                resolve(reply);
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
            type: 'keys',
            pattern: pattern
        },
        res: value.length == 0 ? null : value
    });

    return value.length == 0 ? null : value;
}

export default callback(keys);