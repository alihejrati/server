async function signup(req, res, next) {
    const status = req['_'].carry.config.statusCode;
    await view.send('/robust/html/rtl/vertical-overlay-menu-template', '/auth/signup', req, res, {
        next: next, variables: {
            title: `ثبت نام`,
        }
    });
}

export default signup;