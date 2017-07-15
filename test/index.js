const path = require('path');
const open = require('open');

const server = require(path.resolve(process.cwd(), 'src/index.js'));

let port1 = 3000;
let app1 = server([
    {
        to: 'test'
    },
    {
        from: '/app1-assets',
        to: 'test/app1'
    },
    {
        from: '/search',
        to: 'developer.github.com',
        option: {
            https: true,
            proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
                proxyReqOpts.headers['Content-Type'] = 'application/json';
                return proxyReqOpts;
            }
        }
    }
], port1);

open(`http://127.0.0.1:${port1}`);
