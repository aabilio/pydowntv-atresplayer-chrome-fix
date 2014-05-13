var url_pattern = /^http:\/\/(dptg.antena3.com|dpt.antena3.com|pydowntv.appspot.com|web.pydowntv.com|www.pydowntv.com|pydowntv.appspot.com|pydowntv2.appspot.com|localhost|localhost:8083|www.descargavideos.tv|descargavideos.tv|descargavideos.tk)\//i;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (url_pattern.test(tab.url)) {
        if (changeInfo.status === 'loading') { // Or 'complete'
        	var requestFilter = {
				urls: [
					//"*", "*.pydowntv.appspot.com/*", "*.web.pydowntv.com/*", "*.www.pydowntv.com/*", "*.pydowntv.appspot.com/*", "*.pydowntv2.appspot.com/*", "*.localhost/*", "*.localhost:8083/*"
					"<all_urls>" //"web.pydowntv.com", "www.pydowntv.com", "pydowntv.appspot.com", "pydowntv2.appspot.com", "localhost", "localhost:8083"
				],
				tabId: tabId
			};
            chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
				var headers = details.requestHeaders;
				var url_pattern = /^http:\/\/(servicios.atresplayer.com|dptg.antena3.com|dpt.antena3.com)\//i;
				if (url_pattern.test(details.url)) {

					for(var i = 0, l = headers.length; i < l; ++i) {
						if( headers[i].name == 'User-Agent' ) {
							break;
						}
					}
					if(i < headers.length) {
						headers[i].value = 'Dalvik/1.6.0 (Linux; U; Android 4.3; GT-I9300 Build/JSS15J';
					}

					for(var b = 0, l = headers.length; b < l; ++b) {
						if( headers[b].name == 'Referer' ) {
							break;
						}
					}
					if(b < headers.length) {
						headers[b].value = 'http://atresplayer.com';
					}

					return {requestHeaders: headers};
				}
				
			}, requestFilter, ['requestHeaders','blocking']);
        }
    } else {
        chrome.pageAction.hide(tabId);
    }
});
