import Email from '../../../../../../../components/email/send';

async function service(req, res, next, options: options) {
    const name = Tools.isString(req.body.name);
    const fullname = Tools.isString(req.body.fullname);
    const email = Tools.isString(req.body.email);

    try {
        const query = await mongodb.insert('ngobikereg', {
            name: name,
            fullname: fullname,
            email: email,
            'flag.emailVerification': false
        }, { database: 'hampa', errorHandler: error => options['service'].error = error });

        if (query) {
            const CODE = `${npm.randomstring.generate()}${npm.randomstring.generate()}`;
            const msg = `
            با کلیک برروی لینک زیر ایمیل خود را تایید کنید
            اگر این ایمیل به درخواست شما ارسال نشده این پیام را نادیده بگیرید
            http://172.15.1.230:8080/service/--hampa/verification/email?code=${CODE}`;
            
            const mail = await Email('NGO', email, 'تایید پست الکترونیک', msg, CODE);
            if (mail) {
                await response.attach(null, req, res);
            } else {
                options['service'].code(options['service'].status.failedDependency);
                await response.attach(null, req, res);
            }
        } else {
            options['service'].code(options['service'].status.notModified);
            await response.attach(options['service'].error, req, res);
        }
    } catch (error) {
        console.error('---------error------->', error)
        options['service'].code(options['service'].status.conflict);
        await response.attach(error, req, res);
    }
}

export default service;