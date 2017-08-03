const fs = require('fs');
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');

const serveIndexOption = {
    icons: true
};
const serveStaticOption = {
    setHeaders: function (res, path) {
        console.log('file path:', path);
        let type = serveStatic.mime.lookup(path);
        console.log('file type:', type);
        if (type.startsWith('image/')) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }
};

/**
 * [express-http-proxy](https://github.com/villadora/express-http-proxy)
 */
const proxy = require('express-http-proxy');

const server = (conf, port) => {
    let app = express();

    const isProxy = v => {
        return typeof v === 'object' || v.indexOf('.') > -1 || v.indexOf(':') > -1;
    };

    for (let { from, to, option, withoutRoute } of conf) {
        if (isProxy(to)) {
            option = option || {};
            let defaultOpt = {
                proxyReqPathResolver: withoutRoute ? undefined : function (req) {
                    return from + require('url').parse(req.url).path;
                },
                proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
                    proxyReqOpts.headers['Content-Type'] = 'application/json';
                    return proxyReqOpts;
                }
            };
            app.use(from, proxy(to, Object.assign(defaultOpt, option)));
        } else {
            let urlPath = (!from || from === '/') ? '/' : from;
            let targetPath = path.resolve(process.cwd(), to);

            app.use(urlPath, serveIndex(targetPath, serveIndexOption));
            app.use(urlPath, serveStatic(targetPath, serveStaticOption));
        }
    }

    return app.listen(port || 3000);
};

module.exports = server;
