// 技术要点概述
// 这里是整个 Rukou 软件架构的最底层部分
// 在这里将会创建 HTTP 服务器，并对来往的请求和响应提供最基础的支持
// 对于这里，有两项服务是最为重要的
// 1、静态文件访问服务——通过 GET 方式，指名一个 URL 就能访问到对应的文件
// 2、数据访问服务——通过 POST 方式，发送一个 JSON 格式的对象到这里，就能够进行数据访问

// 注意路径转换部分是没有安全保护的，这个问题留到后面专门解决

// [模块]
var http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs');

// [常量]
var serviceId_serviceManager = 'ecb30d58-086e-4bf1-b6f7-2b07c2b5a247',
	serviceId_websiteManager = 'a9d7df7e-8bca-4efa-88ad-654a5a989319';

var action_queryDefaultWebsite = 'query default website',
	action_queryWebsite = 'query website',
	action_respond = 'respond';


// [变量]
var server,
	serviceManager;

// [流程]
// 首先尝试创建 http 服务
// 如果不能创建（例如端口被占用）那剩下的步骤也做不了了
// 因此一定要确保成功创建
// 创建失败将会引发 error 事件，创建成功则会引发 listening 事件
server = http.createServer();
server.listen(80);
server.on('listening', onListening);
server.on('error', onError);

// [函数]
function onListening() {
	// [流程]
	// 至此 http 服务虽然已经开始监听
	// 但是还无法处理来自客户端的请求，因为整个服务框架还没有初始化
	// 所以下面的代码会先初始化服务框架
	// 完成后才开始处理客户端的请求

	// 初始化服务框架
	// 只要加载 Service Manager 即可
	serviceManager = require('./service/service-manager.js');

	// 然后开始处理请求
	server.on('request', onRequest);

	// [函数]
	function onRequest(req, res) {
		// 只支持 GET 和 POST 两种方法
		// GET 用于获取文件之类的资源
		// POST 则用于调用服务器上的 Service（当 POST 的 content-type 为 application/json 时）
		if (req.method === 'GET') {
			onGET(req, res);
		} else if (req.method === 'POST') {
			onPOST(req, res);
		} else {
			// 返回 405 错误
			// 405: Method Not Allowed
			res.statusCode = 405;
			res.end();
		}

		// [函数]
		function onGET(req, res) {
			// 处理步骤描述
			// 1、获得客户端请求的路径，如果无法解析客户端提供的路径参数，则返回 400 错误，并不再继续执行后续步骤
			// 2、如果客户端请求的是 '/' ，并且 通过 Website Manager 能够查询到默认站点，则将用户重定向到默认站点，否则返回 404 错误，并不再继续执行后续步骤
			// 3、将客户端请求路径分解为 websiteId、websiteDirPath、websiteFilename 三部分，其中前两个部分必须存在，第三个部分（websiteFilename）则可以没有。如果分解失败，则返回 404 错误，并不再继续执行后续步骤
			// 4、通过 Website Manager 服务的站点信息查询接口，获得目标站点的信息，如果无法获取到网站信息，或者网站根目录未给出，或者网站根目录指向的位置无效，则返回 404 错误，并不再继续执行后续步骤
			// 5、如果 websiteFilename 给出了，则根据网站根目录、websiteDirPath、websiteFilename 三者组合出完整的文件绝对路径，如果文件存在，则直接返回文件内容，并不再执行后续步骤
			// 6、调用 Website Manager 服务的动态内容生成接口，把内容的生成交由目标网站负责，如果这一步失败了，则返回 404 错误

			// [变量]
			var rawReqUrl,
				decodedReqUrl,
				parsedReqUrlObj;

			var websiteId,
				websiteDirPath,
				websiteFilename;

			var websiteRootDir,
				websiteDirPathAbs;

			// [流程]
			runSteps(step1, step2, step3, step4, step5, step6);

			// [函数]
			function runSteps() {
				var i = 0,
					steps = arguments;
				runNextStep();

				function runOneStep(step, continueCallback) {
					try {
						step(continueCallback);
					} catch(err) {

					}
				}

				function runNextStep() {
					if (i < steps.length) {
						++i;
						runOneStep(steps[i-1], runNextStep);
					}
				}
			}

			function step1(continueCallback) {
				// [流程]
				try {
					rawReqUrl = req.url;
					decodedReqUrl = decodeURIComponent(rawReqUrl);
					parsedReqUrlObj = url.parse(decodedReqUrl);
					if (continueCallback) {
						continueCallback();
					}
				} catch(err) {
					res.statusCode = 400;
					res.end();
				}
			}

			function step2(continueCallback) {
				if (parsedReqUrlObj.pathname === '/') {
					var reqObj = {
						serviceId: serviceId_websiteManager,
						action: action_queryDefaultWebsite
					};
					serviceManager.serveIt(reqObj, serveItCallback);
				} else {
					if (continueCallback) {
						continueCallback();
					}
				}

				// [函数]
				function serveItCallback(resObj) {
					if (resObj.error) {
						res.statusCode = 404;
						res.end();
					} else {
						// 这里 location 的拼接有一定的问题
						// 没有考虑查询字符串等问题
						// TODO
						var location = 'http://' + req.headers['host'] + '/' + resObj.websiteId + '/';
						res.statusCode = 307;
						res.setHeader('Location', location);
						res.end();
					}
				}
			}

			function step3(continueCallback) {
				if (!parseThreePart()) {
					res.statusCode = 404;
					res.end();
				} else {
					if (continueCallback) {
						continueCallback();
					}
				}

				// [函数]
				function parseThreePart() {
					// 提示
					// 对于形如 /xxxxx/1111/2222/3333/filename 的地址，解析后为
					// websiteId: xxxxx
					// websiteDirPath: /1111/2222/3333/
					// websiteFilename: filename

					// [变量]
					var inputUrl;

					var websiteId_start,
						websiteId_end;

					var websiteDirPath_start,
						websiteDirPath_end;

					var websiteFilename_start,
						websiteFilename_end;

					// [流程]
					inputUrl = parsedReqUrlObj.pathname;

					// 先抽取 websiteId 部分
					// 注意对于形如 /xxxxx/ 可以正确抽取，但是 /xxxxx 则认为是错误的
					// websiteId 的末尾必须以 '/' 结束，这里有一些特殊的考虑
					websiteId_start = websiteId_end = 1;
					for (var i = websiteId_start, len = inputUrl.length; i < len; ++i) {
						if (inputUrl[i] === '/') {
							websiteId_end = i;
							break;
						}
					}

					if (websiteId_end > websiteId_start) {
						websiteId = inputUrl.substring(websiteId_start, websiteId_end);
					} else {
						return false;
					}

					// 然后是抽取 websiteDirPath 部分
					// 注意只要上一步能成功，这一步也总是能成功的
					websiteDirPath_start = websiteId_end;
					websiteDirPath_end = websiteId_end + 1;
					for (var i = websiteDirPath_start, len = inputUrl.length; i < len; ++i) {
						if (inputUrl[i] === '/') {
							websiteDirPath_end = i + 1;
						}
					}

					websiteDirPath = inputUrl.substring(websiteDirPath_start, websiteDirPath_end);

					// 最后是抽取 websiteFilename 部分
					// 同样，只要上一步能成功，这一步也总是能成功
					// 即使文件名未给出，也算是成功的
					websiteFilename_start = websiteDirPath_end;
					websiteFilename_end = inputUrl.length;

					websiteFilename = inputUrl.substring(websiteFilename_start, websiteFilename_end);

					// 所有解析都成功完成了
					return true;
				}
			}

			function step4(continueCallback) {
				var reqObj = {
						serviceId: serviceId_websiteManager,
						action: action_queryWebsite,
						websiteId: websiteId
				};
				serviceManager.serveIt(reqObj, serveItCallback);

				// [函数]
				function serveItCallback(resObj) {
					if (resObj.error || !fs.existsSync(resObj.rootDir)) {
						res.statusCode = 404;
						res.end();
					} else {
						websiteRootDir = resObj.rootDir;
						if (continueCallback) {
							continueCallback();
						}
					}
				}
			}

			function step5(continueCallback) { debugger;
				// [变量]
				var filepathAbs;

				// [流程]
				if (websiteFilename) {
					// 由于 websiteDirPath 可能会以 '/' 或 '\' 开头，这样在做路径拼接的时候会有问题
					// 所以需要预先处理一下
					if (websiteDirPath && websiteDirPath.length > 0) {
						if (websiteDirPath[0] === '/' || websiteDirPath[0] === '\\') {
							websiteDirPath = '.' + websiteDirPath;
						}
					}

					filepathAbs = path.join(websiteRootDir, websiteDirPath, websiteFilename);
					if (!responseFile(req, res, filepathAbs)) {
						if (continueCallback) {
							continueCallback();
						}
					} else {
						// 发送文件成功了，那就什么也不用做了
					}
				} else {
					if (continueCallback) {
						continueCallback();
					}
				}

				// [函数]

				function responseFile(req, res, filepathAbs) {
					var contentType,
						readStream;

					if (!fileExistsSync(filepathAbs)) return false;
					contentType = mime(filepathAbs);
					res.setHeader('Content-Type', contentType);
					readStream = fs.createReadStream(filepathAbs);
					readStream.pipe(res);
					return true;

					function fileExistsSync(filepathAbs) {
						var s;

						try {
							if (!fs.existsSync(filepathAbs)) return false;
							s = fs.lstatSync(filepathAbs);
							return s.isFile();
						} catch(err) {
							return false;
						}
					}

					function mime(filename) {
						var ext,
							contentType;
						ext = path.extname(filename);
						if (ext) {
							ext = ext.toLowerCase();
						}
						switch (ext) {
							case '.htm':
							case '.html':
								contentType = 'text/html';
								break;
							case '.js':
								contentType = 'text/javascript';
								break;
							case '.css':
								contentType = 'text/css';
								break;
							case '.jpe':
							case '.jpg':
							case '.jpeg':
								contentType = 'image/jpeg';
								break;
							case '.png':
								contentType = 'image/png';
								break;
							case '.gif':
								contentType = 'image/gif';
								break;
							default:
								contentType = 'application/octet-stream';
								break;
						}
						return contentType;
					}
				}
			}

			function step6(continueCallback) { debugger;
				var reqObj = {
					serviceId: serviceId_websiteManager,
					action: action_respond,
					websiteId: websiteId,
					req: req,
					res: res
				};
				serviceManager.serveIt(reqObj, serveItCallback);

				function serveItCallback(resObj) {
					if (resObj.error) {
						res.statusCode = 404;
						res.end();
					} else {
						// 内容已经由站点自己生成了
						// 这里就不用做什么了
					}
				}
			}
		}

		function onPOST(req, res) {
			// 客户端请求的 Content-Type 属于 application/json 类型吗？
			// 是则进行 JSON 解析，然后调用 serviceManager 对象的 serveIt() 方法进行处理
			// 不是则返回 415 错误（Unsupported Media Type）
			if (req.headers['content-type'] === 'application/json') {
				waitJson(req, waitJsonCallback);
			} else {
				res.statusCode = 415;
				res.end();
			}

			// # callback(err, jsonObj)
			function waitJson(req, callback) {
				// [变量]
				var chunks = [],
					totalLength = 0;

				// [流程]
				req.on('data', onData);
				req.on('end', onEnd);

				function onData(chunk) {
					chunks.push(chunk);
					totalLength += chunk.length;
				}

				function onEnd() {
					var buffer,
						str,
						obj;

					try {

						buffer = new Buffer(totalLength);
						for (var i = 0, pos = 0, len = chunks.length; i < len; ++i) {
							var chunk = chunks[i];
							chunk.copy(buffer, pos);
							pos += chunk.length;
						}

						str = buffer.toString('utf8');
						obj = JSON.parse(str);
						callback(null, obj);

					} catch(err) {

						callback(err, null);

					}
				}
			}

			function waitJsonCallback(err, reqObj) {
				// 如果 JSON 解析失败，则返回 400 错误（Bad Request）
				// 如果解析成功，则调用 serviceManager 对象的 serveIt() 方法进行处理
				if (err) {
					res.statusCode = 400;
					res.end();
				} else {
					// 在调用 serviceManager 对象的 serveIt() 方法的过程中
					// 为了增强健壮性，如果出现了预期之外的错误，则返回 500 错误（Internal Server Error）
					try {
						var resObj = serviceManager.serveIt(reqObj, serveItCallback);
					} catch(err) {
						res.statusCode = 500;
						res.end();
					}
				}

				function serveItCallback(resObj) {
					try {
						var resStr = JSON.stringify(resObj);
						res.setHeader('Content-Type', 'application/json;charset=utf-8');
						res.end(resStr);
					} catch(err) {
						res.statusCode = 500;
						res.end();
					}
				}
			}
		}
	}
}

function onError(err) {
	console.log(err.toString());
}
