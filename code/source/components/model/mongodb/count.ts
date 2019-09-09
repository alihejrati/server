import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function count(collection: string, options: options) {
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    let query = {};
    if (!options['default_mode']) {
        query = {'flag.hide': false, 'flag.delete': false};
    }

    const res = await Model
    .count(query)
    .exec();

    console.log['database']({
        database: {
            type: 'mongodb',
            // db: options.preCall['model'].variable.db,
            collection: collection,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'count',
            query: query
        },
        res: res
    });
    return res;
}

export default callback(count);