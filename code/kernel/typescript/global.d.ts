declare var global: NodeJS.Global;

declare module NodeJS {
    interface Global {
        // kernel:
        source: {
            server: {
                http: typeof import('../../source/bootstrap/helper/constant/http/constant').default
            }
        },
        semaphore: import('events').EventEmitter,
        sleep: typeof import('../functions/sleep/sleep').default,
        config: typeof import('../functions/config/config').default,
        Import: typeof import('../functions/Import/Import').default,
        callback: typeof import('../functions/callback/callback').default,
        npm: typeof import('../../source/bootstrap/helper/npm/packages'),
        mongodb: {
            distinct: typeof import('../../source/components/model/mongodb/distinct').default,  
            find: typeof import('../../source/components/model/mongodb/find').default,     
            findByIdAndUpdate: typeof import('../../source/components/model/mongodb/find-by-id-and-update').default,
            findOne: typeof import('../../source/components/model/mongodb/find-one').default,
            insert: typeof import('../../source/components/model/mongodb/insert').default,
            insertMany: typeof import('../../source/components/model/mongodb/insert-many').default
        },
        redis: {
            del: typeof import('../../source/components/model/redis/del').default,  
            get: typeof import('../../source/components/model/redis/get').default,  
            keys: typeof import('../../source/components/model/redis/keys').default,  
            set: typeof import('../../source/components/model/redis/set').default,  
        },
        stack: typeof import('../../source/components/stack/stack').default,
        captcha: {
            create: typeof import('../../source/components/captcha/create').default
        },
    }
}
declare const source: {
    server: {
        http: typeof import('../../source/bootstrap/helper/constant/http/constant').default
    }
};
declare const semaphore: import('events').EventEmitter;
declare const sleep: typeof import('../functions/sleep/sleep').default;
declare const config: typeof import('../functions/config/config').default;
declare const Import: typeof import('../functions/Import/Import').default;
declare const callback: typeof import('../functions/callback/callback').default;
declare const npm: typeof import('../../source/bootstrap/helper/npm/packages');

declare const mongodb: {
    distinct: typeof import('../../source/components/model/mongodb/distinct').default,  
    find: typeof import('../../source/components/model/mongodb/find').default,     
    findByIdAndUpdate: typeof import('../../source/components/model/mongodb/find-by-id-and-update').default,
    findOne: typeof import('../../source/components/model/mongodb/find-one').default,
    insert: typeof import('../../source/components/model/mongodb/insert').default,
    insertMany: typeof import('../../source/components/model/mongodb/insert-many').default
};
declare const redis: {
    del: typeof import('../../source/components/model/redis/del').default,  
    get: typeof import('../../source/components/model/redis/get').default,  
    keys: typeof import('../../source/components/model/redis/keys').default,  
    set: typeof import('../../source/components/model/redis/set').default,  
};
declare const stack: typeof import('../../source/components/stack/stack').default;
declare const captcha: {
    create: typeof import('../../source/components/captcha/create').default
}