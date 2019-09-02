async function browser(req, res, next) {
    await view.send('/file-browser/master', '/', req, res, {next: next});
}

export default browser;