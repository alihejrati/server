import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function distinct(collection: string, distinct: string, query, options: options) {
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const select = options['select'] || {};
    const sort = options['sort'] || {};

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

    const documents = await Model
    .find(query)
    .populate(distinct)
    .distinct(distinct)
    .select(select)
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
            type: 'distinct',
            query: query,
            distinct: distinct,
            select: select,
            sort: sort
        },
        res: res
    });
    return res;
}

export default callback(distinct);