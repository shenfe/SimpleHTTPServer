const path = require('path');
const open = require('open');

const server = require('../src/index.js');

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
        to: 'developer.github.com'
    }
], port1);

open(`http://127.0.0.1:${port1}`);
