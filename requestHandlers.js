var exec = require("child_process").exec;
var fs = require("fs");
var path = require("path");

function serve(pathname, response) {
	console.log("Request handler 'serve' was called");

	pathname = path.join(process.cwd(), pathname);

	path.exists(pathname, function(exists) {
        if(!exists) {
            console.log("does not exist: " + pathname);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }

        if (fs.statSync(pathname).isDirectory()) pathname += '/index.html';

		fs.readFile(pathname, "binary", function(err, file) {
			if(err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
		});
	});
}

function resumate(request, response) {
	console.log("Request handler 'resumate' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});

	if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            if (body.length > 1e6)
                req.connection.destroy();
        });
        request.on('end', function () {
            console.log(body);
        });
    }

		// We should write the entire data? No, probably just a link to it. But then we have to handle that. 
		// Let's try writing the data of the file, then deleting the file from the server.

		// A PHP example:
		// header('Content-Type: application/pdf');
		// header('Content-Disposition: attachment; filename=' . $file . ';');
		// header('Content-Length: ' . filesize($folder . '/' . $file));

		//readfile($folder . '/' . $file);
	response.write("Resumation!!!");


	response.end();
}

exports.serve = serve;
exports.resumate = resumate;