import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function insert(collection: string, query, options: options) {
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const document = await new Promise((resolve, reject) => {
        new Model(query).save((error, doc) => {
            if (error) {
                errorHandler(error);
                resolve(undefined);
            }
            resolve(doc);
        });
    });
    let res;
    try {
        res = JSON.parse(JSON.stringify(document));
    } catch (error) {
        res = document || null;
    }

    console.log['database']({
        database: {
            type: 'mongodb',
            // db: options.preCall['model'].variable.db,
            collection: collection,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'insert',
            query: query
        },
        res: res
    });
    return res;
}

export default callback(insert);