async function begin(req, res, next) {
    await view.send('/robust/html/rtl/vertical-overlay-menu-template', '/form/static/cycling', req, res, {next: next});
}

export default begin;