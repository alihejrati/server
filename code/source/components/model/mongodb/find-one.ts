import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function findOne(collection: string, query, options: options) {
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const sort = options['sort'] || {};
    const select = options['select'] || {};
    const document = await Model.findOne(query).sort(sort).select(select);
    const res = JSON.parse(JSON.stringify(document));

    console.log['database']({
        database: {
            type: 'mongodb',
            // db: options.preCall['model'].variable.db,
            collection: collection,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'find-one',
            query: query,
            sort: sort
        },
        res: res
    });
    return res;
}

export default callback(findOne);