import keys from './keys';
import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/redis/model.js`);

async function del(pattern: string, options: options) {
    pattern = pattern.replace(/\:null\:/g, `:${process.argv[2]}:`);
    const database = options['database'] || 'db';
    const Model = model[database];
    const keyss = await keys(pattern) || [];
    const result: any[] = [];
    for (let key of keyss) {
        Model.del(key, (err, reply) => {
            if (!err) {
                result.push(reply);
            }   
        });
    }

    console.log['database']({
        database: {
            type: 'redis',
            // db: options.preCall['model'].variable.db,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'del',
            pattern: pattern
        },
        res: result
    });

    return result;
}

export default callback(del);