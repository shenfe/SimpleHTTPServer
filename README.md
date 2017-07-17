# SimpleHTTPServer
A SimpleHTTPServer module for Nodejs, wrapping `express` and `express-http-proxy`.

## Installation
```js
npm install --save-dev jimple-http-server
```

## Usage
Use Nodejs API as below:
```js
const path = require('path');
const server = require('jimple-http-server'));
let myServer = server([
    {
        to: 'dist/page'
    },
    {
        from: '/resource',
        to: 'dist/static'
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
], 3000);
```

## More
* [express-http-proxy](https://github.com/villadora/express-http-proxy)

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017-present, [shenfe](https://github.com/shenfe)
