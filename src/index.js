const path = require('path');
const express = require('express');

/**
 * [express-http-proxy](https://github.com/villadora/express-http-proxy)
 */
const proxy = require('express-http-proxy');

const server = (conf, port) => {
    let app = express();

    const isProxy = v => {
        return typeof v === 'object' || v.indexOf('.') > -1 || v.indexOf(':') > -1;
    };

    for (let { from, to, option } of conf) {
        if (isProxy(to)) {
            app.use(from, proxy(to, option));
        } else {
            if (!from || from === '/') {
                app.use(express.static(path.resolve(process.cwd(), to)));
            } else {
                app.use(from, express.static(path.resolve(process.cwd(), to)));
            }
        }
    }

    port && app.listen(port);

    return app;
};

module.exports = server;
