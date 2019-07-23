async function listen(options: options) {
    const listners = await config('\\code\\source\\server\\http\\listen.conf.json');

    for (const listner of listners) {
        npm.app.listen(listner.port, listner.host, () => {
            console.log['trace'](`${listner.host}:${listner.port}`);
        });
    }
}

export default callback(listen);