var exec = require("child_process").exec;
var fs = require("fs");
var path = require("path");
var murmur = require("murmur");

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
			var fileId = murmur.hash128(body).hex();

			var resumeData = JSON.parse(body);
			console.log(resumeData);

			// Here is where we create a TeX file.

			var texString = "\\documentclass[" + resumeData.fontSize + "pt]{article}";

			fs.readFile('header.tex', 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
				texString += data;

			// texString now contains the header.

			// Next we clean the data to avoid common LaTeX errors

				if(resumeData.name === ""){
					resumeData.name = "Name";
				}


			// Now we add the data to the texString

				texString += "\\makeheading{" + resumeData.name + "}";
				for(blockIndex = 0; blockIndex < resumeData.numBlocks; blockIndex++){

				}

				for(blockIndex = 0; blockIndex < resumeData.numBlocks; blockIndex++){
					
					blockLength = resumeData.blocks[blockIndex].numEntries;

					texString += "\\section{" + resumeData.blocks[blockIndex].title + "}";

					switch(resumeData.blocks[blockIndex].type){
						case 'keyValueBlock':
							texString += "\\newlength{\\rcollength}\\setlength{\\rcollength}{1.85in}";
							texString += "\\begin{tabular}[t]{@{}p{\\textwidth-\\rcollength}p{\\rcollength}}"
							for(entryIndex=0; entryIndex < blockLength; entryIndex++){
								texString += "\\textit{" + resumeData.blocks[blockIndex].entries[entryIndex].key + "}: " + resumeData.blocks[blockIndex].entries[entryIndex].value +"\\\\\n ";
							}
							texString += "\\end{tabular}\n\n";
							break;

						case 'lr-keyValueBlock':
							for(entryIndex=0; entryIndex < blockLength; entryIndex++){
								texString += resumeData.blocks[blockIndex].entries[entryIndex].key + " \\hfill \\textbf{ " + resumeData.blocks[blockIndex].entries[entryIndex].value + "}\\\\\n\n "
							}
							break;

						case 'descriptionBlock':
							for(entryIndex=0; entryIndex < blockLength; entryIndex++){
								texString += "\\emph{" + resumeData.blocks[blockIndex].entries[entryIndex].key + "}\\\\\n ";
								texString += resumeData.blocks[blockIndex].entries[entryIndex].value + "\n ";

								if(entryIndex < blockLength){
									texString += "\n\\vspace{2mm}\n\n";
								}
							}

							break;

						case 'listBlock':

							texString += "\\vspace{-8mm}\\begin{itemize}";

							for(entryIndex=0; entryIndex < blockLength; entryIndex++){
								texString += "\\item " + resumeData.blocks[blockIndex].entries[entryIndex].value;
							}
							texString += "\\end{itemize}\n\n";
							break;

						default:
							console.log("switch failure on block type check");
							break;
					}
				}



				texString += "\\end{document}";



				// Finished parsing the JSON and making the string, we're now ready to typeset.

				console.log("About to run LaTeX.");

				if(!fs.existsSync("temp")){
					fs.mkdirSync("temp", 0766, function(err){
						if(err) {
							console.log(err);
							response.writeHead(500, {"Content-Type": "text/plain"});
							response.write(err + "\n");
							response.end();
							return;
						}
					});
				}
				fs.mkdir("temp/" + fileId, function(err){
					if(!err || (err && err.code === 'EEXIST')){
						fs.writeFile('temp/' + fileId + '/resume.tex', texString, function(err) {
							if(err) {
								console.log(err);
							}
							exec("pdflatex" + " -output-directory=temp/" + fileId
							 + ' temp/' + fileId + '/resume.tex', function(error, stdout, stderr) {
									console.log(stdout);
							 		console.log(stderr);
									response.end(fileId);
							});
						});
					}
					else{
						console.log(err);
						response.writeHead(500, {"Content-Type": "text/plain"});
						response.write(err + "\n");
						response.end();
						return;
					}
				});
			});
		});
	}
}

exports.serve = serve;
exports.resumate = resumate;