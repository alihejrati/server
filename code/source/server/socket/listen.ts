async function listen(options: options) {
    const socket = await config('\\code\\source\\server\\socket\\listen.conf.json');
    npm.server = npm.server(handler).listen(socket.port, socket.host);

    function handler(req, res) {
        res.writeHead(200);
        res.end(`
            <html>
                <head>
                    <title>Socket io client</title>
                    <script src="http://${socket.host}:${socket.port}/socket.io/socket.io.js"></script>
                    <script>
                        var socket = io("http://${socket.host}:${socket.port}");
                    </script>
                </head>
                <body>
                </body>
            </html>
        `);
    }
    semaphore.emit('/server/socket/ready');
}   

export default callback(listen);