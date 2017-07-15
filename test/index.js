const path = require('path');

const server = require(path.resolve(process.cwd(), 'src/index.js'));

let app1 = server([
    {
        to: 'src'
    },
    {
        from: 'test-scripts',
        to: 'test'
    },
    {
        from: '',
        to: 'zhihu.com',
        option: () => {}
    }
], 80);
