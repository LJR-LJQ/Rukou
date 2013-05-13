// [导出]
exports.name = 'Redirector';
exports.serviceId = 'eb40e298-311b-42f7-b154-cdc463f32aa0';
exports.responseUrl = responseUrl;

function responseUrl(_rawReq, _rawRes) {
	var location = 'http://www.bing.com';
	_rawRes.statusCode = 307;
	_rawRes.setHeader('Location', location);
	_rawRes.end();
}