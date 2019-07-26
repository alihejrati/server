import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function find(collection: string, query, options: options) {
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const select = options['select'] || {};
    const limit = options['limit'] || null;
    const skip = options['skip'] || null;
    const sort = options['sort'] || {};

    const documents = await Model
    .find(query)
    .select(select)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .exec();
    const res = documents.length == 0 ? null : JSON.parse(JSON.stringify(documents));

    console.log['database']({
        database: {
            type: 'mongodb',
            // db: options.preCall['model'].variable.db,
            collection: collection,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'find',
            query: query,
            select: select,
            limit: limit,
            skip: skip,
            sort: sort
        },
        res: res
    });
    return res;
}

export default callback(find);