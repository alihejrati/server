import * as _log4js from 'log4js';
import * as mongoAppender from 'log4js-node-mongodb';

let log4js;
let loggerConfJson = {
    enable: false,
    map: {}
};

semaphore.on('/module/config/ready', () => {
    config('\\code\\kernel\\functions\\logger.conf.json').then((conf) => {
        const CONNECTION = conf.CONNECTION;
        const CATEGORY = conf.CATEGORY;
        _log4js.addAppender(
            mongoAppender.appender({connectionString: CONNECTION}),
            CATEGORY
        );
        log4js = _log4js.getLogger(CATEGORY);
        loggerConfJson = conf;
        semaphore.on('/module/config/change[logger.conf.json]', (conf) => {
            loggerConfJson = conf || loggerConfJson;
            console.debug('daryaft shod!', loggerConfJson);
        });
    });
});

async function purelog(level: string, sublevel: string, ...parameters) {
    const obj = {
        sublevel: sublevel,
        app: process.argv[2],
        parameters: parameters
    };

    if (log4js) {
        try {
            log4js[level](obj);
        } catch (error) {
            log4js['trace'](obj);
        }
    }
}

async function log(level: string, ...parameters) {
    if (loggerConfJson && loggerConfJson.enable) {
        await sleep(0);
        if (/^kernel\/[A-Za-z0-9]+$/g.test(level)) {
            let LEVEL = 'trace';
            try {
                LEVEL = parameters[0]['level'];
            } catch (error) {
                LEVEL = 'trace';
            }
            purelog(LEVEL, level, ...parameters);
        } else {
            purelog(loggerConfJson.map[level] || level, level, ...parameters);
        }
    }
}

async function logger() {
    const handler = {
        get: (obj, level) => {
            return (...parameters) => {
                return log(level, ...parameters);
            }
        },
    };

    // @ts-ignore
    console.log = new Proxy((...parameters) => {
        log('debug', ...parameters);
    }, handler);
    semaphore.emit('/module/logger/ready');
}

export default logger;