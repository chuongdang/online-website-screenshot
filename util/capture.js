var webpage = require('webpage'),
    system = require('system'),
    address,
    path,
    width,
    height,
    device,
    resolution;

address = system.args[1];
path = system.args[2];
width = system.args[3];
height = system.args[4];
device = system.args[5];
resolution = system.args[6];

var renderPage = function(url, path, width, height, device, resolution) {
    var sizes = [
        [320, 480],
        [320, 568],
        [600, 1024],
        [1024, 768],
        [1280, 800],
        [1440, 900]
    ];

    var page = webpage.create();

    if (device === 'mobile') {
        page.settings.userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16';
        size = sizes[resolution];
        width = size[0];
        height = size[1];
    } else {
        page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36';
    }

    if (typeof width === 'undefined') {
        width = 1024
    }
    if (typeof height === 'undefined') {
        height = 800
    }

    page.viewportSize = {width: width, height: height};

    page.onNavigationRequested = function(targetUrl, type, willNavigate, main) {
        if (targetUrl.indexOf('https//') > 0) {
            targetUrl = targetUrl.replace('http://', '');
            targetUrl = targetUrl.replace('https//', 'https://')
        }
        if (main && targetUrl != url) {
            url = targetUrl;
            page.close()
            renderPage(targetUrl, path, width, height, device, resolution);
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

renderPage(address, path, width, height, device, resolution);