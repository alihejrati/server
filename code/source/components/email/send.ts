// let email: any = {};
// config('\\code\\source\\components\\email\\send.conf.json').then(conf => email = conf);

async function send(from: string, to: string, subject: string, message: string, code: string = `${npm.randomstring.generate()}${npm.randomstring.generate()}`) {
    const email = await config('\\code\\source\\components\\email\\send.conf.json');
    const transporter = npm.nodemailer.createTransport({
        service: email.service,
        auth: email.auth
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    };

    return await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                mongodb.insert('email', {
                    state: false,
                    code: code,
                    transporter: {
                        service: email.service,
                        auth: email.auth
                    },
                    mailOptions: mailOptions,
                    response: {
                        error: error,
                        info: info
                    }
                }, {}); /* async */
                resolve(null);
            } else {
                mongodb.insert('email', {
                    state: true,
                    code: code,
                    transporter: {
                        service: email.service,
                        auth: email.auth
                    },
                    mailOptions: mailOptions,
                    response: {
                        error: error,
                        info: info
                    }
                }, {}).then(mail => resolve(mail));
            }
        });
    });
}

export default send;