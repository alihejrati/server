import distinct from '../../../../components/model/mongodb/distinct';
import find from '../../../../components/model/mongodb/find';
import findByIdAndUpdate from '../../../../components/model/mongodb/find-by-id-and-update';
import findOneAndUpdate from '../../../../components/model/mongodb/find-one-and-update';
import findOne from '../../../../components/model/mongodb/find-one';
import insert from '../../../../components/model/mongodb/insert';
import insertMany from '../../../../components/model/mongodb/insert-many';

import del from '../../../../components/model/redis/del';
import get from '../../../../components/model/redis/get';
import keys from '../../../../components/model/redis/keys';
import set from '../../../../components/model/redis/set';

async function boot(options: options) {
    global.mongodb = {
        distinct: distinct,  
        find: find,     
        findByIdAndUpdate: findByIdAndUpdate,
        findOneAndUpdate: findOneAndUpdate,
        findOne: findOne,
        insert: insert,
        insertMany: insertMany
    };    
    global.redis = {
        del: del,
        get: get,
        keys: keys,
        set: set
    };
}

export default callback(boot);