var webpage = require('webpage'),
    system = require('system'),
    address,
    path;

address = system.args[1];
path = system.args[2];
width = system.args[3];
height = system.args[4];

var renderPage = function(url, path, width, height) {
    var page = webpage.create();

    page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36';

    if (!/^http:\/\//.test(url)) {
        url = 'http://' + url;
    }

    if (typeof width === 'undefined') {
        width = 1024
    }
    if (typeof height === 'undefined') {
        height = 800
    }
    page.viewportSize = {width: width, height: height};

    page.onNavigationRequested = function(targetUrl, type, willNavigate, main) {
        if (main && targetUrl != url) {
            url = targetUrl;
            page.close()
            renderPage(targetUrl, path, width, height);
        }
    };

    page.onLoadFinished = function(status) {
        if (status === "success") {
            var fileName = Math.random() + '.png';
            page.render(path + '/' + fileName);
            console.log(fileName);
        } else {
            page.close();
        }
        phantom.exit();
    };

    page.open(url);
}

renderPage(address, path, width, height);