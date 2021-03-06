import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function findOneAndUpdate(collection: string, query, update, options: options) {
    const errorHandler = options['errorHandler'] || function (error) { }
    const _options = options['options'] || { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true };
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    if (!options['default_mode']) {
        if (query['$or']) {
            for (let index = 0; index < query['$or'].length; index++) {
                query['$or'][index]['flag.hide'] = false;
                query['$or'][index]['flag.delete'] = false;
            }
        } else {
            query['flag.hide'] = false;
            query['flag.delete'] = false;
        }
    }

    const document = await Model.findOneAndUpdate(query, update, _options);

    const res = JSON.parse(JSON.stringify(document));

    console.log['database']({
        database: {
            type: 'mongodb',
            // db: options.preCall['model'].variable.db,
            collection: collection,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'find-by-id-and-update',
            query: query,
            update: update,
            options: _options
        },
        res: res
    });
    return res;
}
export default callback(findOneAndUpdate);