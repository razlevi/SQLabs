var path = require('path'), fs = require('fs');

var splittedPath = process.argv[1].split("\\");
var folderName = splittedPath[splittedPath.length - 2];

var EXT = process.argv[2];
var TEXT = process.argv[3];

var wasFound = false;

function fromDir(startPath, end, fileName) {

    if (!fs.existsSync(startPath)){ 
        console.log("No file was found");
        return; 
    }
      var files = fs.readdirSync(startPath); // [dir1, dir2, file1, file2]

    for(var i=0; i<files.length; i++){
        var filename = path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);

        if (stat.isDirectory()){    
            fromDir(filename, end, fileName);
        }

		var splittedFileName = files[i].split("."); // [filename, end]
		if(splittedFileName[0].indexOf(fileName) >= 0 && splittedFileName[1] == end.trim()) {
			wasFound = true;
			console.log('-- found: ',filename);
        }
        else if (splittedFileName[0].indexOf(fileName) < 0) {
            return console.log("USAGE: node.js [EXT] [TEXT]");
        }
        else {
            return console.log("File is not found");
        }
    };
};
fromDir('../' + folderName, EXT, TEXT); 