import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);

async function insertMany(collection: string, query, options: options) {
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const documents = await new Promise((resolve, reject) => {
        Model.insertMany(query, { ordered: false }, (err, docs) => {
            if (!err) {
                resolve(docs);
            }
        });
    });

    const res = JSON.parse(JSON.stringify(documents));

    console.log['database']({
        database: {
            type: 'mongodb',
            // db: options.preCall['model'].variable.db,
            collection: collection,
            // dsn: options.preCall['model'].variable.dsn,
        },
        transaction: {
            type: 'insert-many',
            query: query
        },
        res: res
    });
    return res;
}

export default callback(insertMany);