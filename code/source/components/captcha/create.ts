async function create(key: string, options: options) {
    const captcha = npm.svgCaptcha.create({
        color: true
    });

    mongodb.insert('captcha', {
        key: key,
        value: captcha.text
    }); /* async */

    return captcha.data;
}

export default callback(create);