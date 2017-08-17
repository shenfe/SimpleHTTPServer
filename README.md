# SimpleHTTPServer
A SimpleHTTPServer module for Nodejs, wrapping `express` and `express-http-proxy`.

## Installation
```sh
npm install --save-dev jimple-http-server
```

## Usage
Use Nodejs API as below:
```js
const server = require('jimple-http-server');
let myServer = server([
    {
        to: 'dist/page'
    },
    {
        from: '/resource',
        to: 'dist/static'
    },
    {
        from: '/ajax',
        to: 'domain.com'
    }
], 3000);
```

## More
* [express-http-proxy](https://github.com/villadora/express-http-proxy)
* [serve-static](https://github.com/expressjs/serve-static)
* [serve-index](https://github.com/expressjs/serve-index)

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017-present, [shenfe](https://github.com/shenfe)
