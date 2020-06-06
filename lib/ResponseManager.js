const CONFIG = require(process.cwd() + '/config.json');
const request = require('request');
const path = require('path');
const url = require('path');

class ResponseManager {

	static MakeProxyResponse(req, res) {

		let targetURL = req.query.url;

		const makeGoodOptions = {};
		makeGoodOptions.url 								= targetURL;
		makeGoodOptions.followAllRedirects 	= true;
		makeGoodOptions.localAddress 				= CONFIG.downStreamAddress;

		const makeHeader = {};
		makeHeader['User-Agent'] = CONFIG.userAgentString;

 		// PIPE 안쓰면 Buffer leak 해결이 어렵다..
		if (req.headers['accept-ranges']) {
			makeHeader['Accept-Ranges'] = req.headers['accept-ranges'];
		}

		if (req.headers['range']) {
			makeHeader['Range'] = req.headers['range'];
		}

		makeGoodOptions['headers'] = makeHeader;

		const downloadStatus = {};
		downloadStatus.currentDownloadSize = 0;
		downloadStatus.currentFakeBuffer = 0;
		downloadStatus.currentChunks = null;

		const proxyRequest = request.get(makeGoodOptions)
  	.on('response', (response) => {
		
			if (!(response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) ||
				(typeof response.headers['content-length'] !== 'undefined' && parseInt(response.headers['content-length']) > CONFIG.maxStreamSize)
			){
				return setTimeout(() => { 
					response.destroy();
				}, 5000);
			}
	

			// Setting the filename
			let filename = '', contentDisp = response.headers['content-disposition'];
    	if (contentDisp && /^attachment/i.test(contentDisp)) {
        filename = contentDisp.toLowerCase()
            .split('filename=')[1]
            .split(';')[0]
            .replace(/"/g, '');
    	} else {
        filename = path.basename(url.parse(targetURL).base);
    	}

			filename = filename.split('?')[0];
			
			// Sending
			res.setHeader('content-disposition', 'attachment; filename="' + filename + '"');
	
			response
			.on('data', (data) => {

			//	downloadStatus.currentDownloadSize += data.byteLength;
			//	downloadStatus.currentFakeBuffer += data.byteLength;
				
			//	res.write(data, 'binary');

			})
			.on('end', () => {
				res.end(null, 'binary');
			})
			.on('error', (e) => {
				console.error(e);
			});

			res.on('drain', () => {

			});

			req.on('close',() => {
				response.destroy();
				//console.log('클라이언트에 의해 proxy 연결이 종료');
			});
	
		})
		.pipe(res);		

	}

}


module.exports = ResponseManager
