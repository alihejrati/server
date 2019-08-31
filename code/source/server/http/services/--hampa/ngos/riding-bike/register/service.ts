import sms from '../../../../../../../components/sms/kavenegar/send';

async function service(req, res, next, options: options) {
    const name = Tools.isString(req.body.name);
    const fullname = Tools.isString(req.body.fullname);
    const mobile = Tools.isString(req.body.mobile);

    try {
        const query = await mongodb.insert('ngobikereg', {
            name: name,
            fullname: fullname,
            mobile: mobile,
            'flag.smsVerification': false
        }, { database: 'hampa', errorHandler: error => options['service'].error = error });

        if (query) {
            const code = '۶۶۴۳۳';
            const msg = `کد فعال سازی: ${code}`;
            const smsRes: any = await sms(msg, mobile, code);
            console.debug('------->', smsRes);
            if (smsRes && smsRes.flag == true) {
                await cookie.set('mobile', mobile, req, res);
                await response.attach(null, req, res);
            } else {
                options['service'].code(options['service'].status.failedDependency);
                await response.attach(smsRes, req, res);
            }
        } else {
            options['service'].code(options['service'].status.notModified);
            await response.attach(options['service'].error, req, res);
        }
    } catch (error) {
        console.error(error)
        options['service'].code(options['service'].status.conflict);
        await response.attach(options['service'].error, req, res);
    }
}

export default service;