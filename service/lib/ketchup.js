// [导出]
exports.compile = compile;

// [模块]
var fs = require('fs'),
	parser = require('./ketchup-lib/parser.js'),
	outputer = require('./ketchup-lib/outputer.js');


// [函数]
function compile(inputFileName, outputFileName) {
	// [变量]
	var inputFileContent,
		outputFileContent;

	// [流程]
	try {
		if (!fs.existsSync(inputFileName)) {
			return false;
		}

		inputFileContent = fs.readFileSync(inputFileName, {encoding: 'utf8'});
		outputFileContent = outputer.output(parser.parse(inputFileContent));

		if (outputFileContent === false) {
			return false;
		}

		fs.writeFileSync(outputFileName, outputFileContent);
		return true;
	} catch(err) {
		return false;
	}
}