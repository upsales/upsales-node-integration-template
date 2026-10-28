// The adapter reaches the app in this process over a socket through http.globalAgent,
// which keeps sockets alive from Node 19 on. A kept socket is frozen with the
// container, dropped by the other end, and answers the next invocation 502.
const http = require('http');
http.globalAgent = new http.Agent({ keepAlive: false });

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app');
const server = awsServerlessExpress.createServer(app);

// Without a resolution mode the proxy answers through context.succeed, which
// the nodejs24.x runtime no longer provides.
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
// Exported so a test can close it: the proxy's socket otherwise keeps Jest running.
exports.server = server;
