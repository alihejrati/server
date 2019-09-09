import * as currentDir from 'current-dir';
const model = require(`${currentDir()}/file/private/database/mongodb/model.js`);
import findOneAndUpdate from './find-one-and-update';

async function findByIdAndUpdate(collection: string, _id: string, query, options: options) {
    return await findOneAndUpdate(collection, {_id: _id}, query, options);
    // const errorHandler = options['errorHandler'] || function (error) {}
    // const database = options['database'] || 'db';
    // const Model = model[`${database}_${collection}`];
    // const document = await Model.findByIdAndUpdate(_id, query, { new: true });

    // const res = JSON.parse(JSON.stringify(document));

    // console.log['database']({
    //     database: {
    //         type: 'mongodb',
    //         // db: options.preCall['model'].variable.db,
    //         collection: collection,
    //         // dsn: options.preCall['model'].variable.dsn,
    //     },
    //     transaction: {
    //         type: 'find-by-id-and-update',
    //         query: query,
    //         _id: _id
    //     },
    //     res: res
    // });
    // return res;
}
export default callback(findByIdAndUpdate);