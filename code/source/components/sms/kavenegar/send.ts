let sms: any = {};

config('\\code\\source\\components\\sms\\kavenegar\\send.conf.json').then(conf => sms = conf);

async function send(message: string, mobile: string, code: string = '') {
    const api = npm.kavenegar.KavenegarApi({apikey: sms.apikey});
    console.debug('---------------->',{apikey: sms.apikey});

    const json = {
        number: mobile,
        message: message,
        sender: sms.sender,
        receptor: mobile
    };

    const res = api.Send(json);

    const result: any = {
        error: undefined,
        response: res,
        flag: true
    };

    await mongodb.insert('sms', {
        app: process.argv[2],
        server: 'kavenegar',
        mobile: mobile.split(','),
        code: code,
        json: json,
        result: result
    }); /* async */
}

export default send;