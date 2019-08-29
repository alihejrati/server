async function signin(req, res, next) {
    const status = req['_'].carry.config.statusCode;
    await view.send('/robust/html/rtl/vertical-overlay-menu-template', '/auth/signin', req, res, {
        next: next, variables: {
            title: `احراز هویت`,
        }
    });
}

export default signin;