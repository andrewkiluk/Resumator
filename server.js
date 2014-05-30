var http = require("http");
var url = require("url");
var fs = require("fs");


function start(route, handle) {
	var onRequest = function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, request, response);
		
	}
	http.createServer(onRequest).listen(8888);
	console.log("The server has started.");

	// The below will be a function which is called periodically to clean up old data.

	// (function()
	// {
	// 	setInterval(function() {
	// 		fs.rmdir(path, callback)
	// 	}, 5*60*1000 );
	// })();
}

exports.start = start;