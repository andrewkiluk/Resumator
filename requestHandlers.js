var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called");

  exec("pdflatex " + file_id, function(error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});

    // We should write the entire data? No, probably just a link to it. But then we have to handle that. 
    // Let's try writing the data of the file, then deleting the fuile from the server.

    // A PHP example:
    // header('Content-Type: application/pdf');
    // header('Content-Disposition: attachment; filename=' . $file . ';');
    // header('Content-Length: ' . filesize($folder . '/' . $file));

readfile($folder . '/' . $file);
    response.write();


    response.end();
  });
}

function upload() {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hellow Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;