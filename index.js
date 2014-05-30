var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["serve"] = requestHandlers.serve;
handle["/resumate"] = requestHandlers.resumate;

server.start(router.route, handle);