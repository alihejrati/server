declare module NodeJS {
    interface Global {
        // source:
        source: {
            server: {
                http: typeof import('../../source/bootstrap/helper/constant/http/constant').default
            }
        },
        npm: typeof import('../../source/bootstrap/helper/npm/packages'),
        mongodb: {
            distinct: typeof import('../../source/components/model/mongodb/distinct').default,  
            find: typeof import('../../source/components/model/mongodb/find').default,     
            findByIdAndUpdate: typeof import('../../source/components/model/mongodb/find-by-id-and-update').default,
            findOneAndUpdate: typeof import('../../source/components/model/mongodb/find-one-and-update').default,
            findOne: typeof import('../../source/components/model/mongodb/find-one').default,
            insert: typeof import('../../source/components/model/mongodb/insert').default,
            insertMany: typeof import('../../source/components/model/mongodb/insert-many').default,
            count: typeof import('../../source/components/model/mongodb/count').default,
        },
        redis: {
            del: typeof import('../../source/components/model/redis/del').default,  
            get: typeof import('../../source/components/model/redis/get').default,  
            keys: typeof import('../../source/components/model/redis/keys').default,  
            set: typeof import('../../source/components/model/redis/set').default,  
        },
        stack: typeof import('../../source/components/stack/stack').default,
        Tools: typeof import('../../source/components/tools/tools').default,
        captcha: {
            create: typeof import('../../source/components/captcha/create').default,
            check: typeof import('../../source/components/captcha/check').default,
        },
    }
}

declare const source: {
    server: {
        http: typeof import('../../source/bootstrap/helper/constant/http/constant').default
    }
};
declare const npm: typeof import('../../source/bootstrap/helper/npm/packages');
declare const mongodb: {
    distinct: typeof import('../../source/components/model/mongodb/distinct').default,  
    find: typeof import('../../source/components/model/mongodb/find').default,     
    findByIdAndUpdate: typeof import('../../source/components/model/mongodb/find-by-id-and-update').default,
    findOneAndUpdate: typeof import('../../source/components/model/mongodb/find-one-and-update').default,
    findOne: typeof import('../../source/components/model/mongodb/find-one').default,
    insert: typeof import('../../source/components/model/mongodb/insert').default,
    insertMany: typeof import('../../source/components/model/mongodb/insert-many').default,
    count: typeof import('../../source/components/model/mongodb/count').default,
};
declare const redis: {
    del: typeof import('../../source/components/model/redis/del').default,  
    get: typeof import('../../source/components/model/redis/get').default,  
    keys: typeof import('../../source/components/model/redis/keys').default,  
    set: typeof import('../../source/components/model/redis/set').default,  
};
declare const stack: typeof import('../../source/components/stack/stack').default;
declare const Tools: typeof import('../../source/components/tools/tools').default;
declare const captcha: {
    create: typeof import('../../source/components/captcha/create').default,
    check: typeof import('../../source/components/captcha/check').default,
};