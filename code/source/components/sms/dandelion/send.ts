let sms: any = {};

config('\\code\\source\\components\\sms\\dandelion\\send.conf.json').then(conf => sms = conf);

async function send(message: string, mobile: string, code: string = '') {
    const json = {
        method: sms.method,
        url: sms.url,
        headers: {
            apikey: sms.apikey
        },
        form: {
            message: message,
            linenumber: sms.linenumber,
            Receptor: mobile,
            checkid: `${npm.uniqid()},${npm.uniqid()}`
        }
    };
    return await new Promise((resolve, reject) => {
        npm.request(json, function (error, response, body) {
            const result: any = {
                error: error,
                response: response,
                body: body,
                flag: true
            };

            console.debug('response', response);
            console.debug('body', body);

            mongodb.insert('sms', {
                app: process.argv[2],
                server: 'dandelion',
                mobile: mobile.split(','),
                code: code,
                json: json,
                result: result
            }); /* async */

            if (!error) {
                resolve(result);
            } else {
                console.error(error);
                resolve(null);
            }
        });
    });
}

export default send;