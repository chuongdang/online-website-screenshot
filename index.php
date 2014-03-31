<?php
if (!empty($_POST['url'])) {
    $url = $_POST['url'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $device = $_POST['device'];
    $resolution = $_POST['resolution'];
    $path = dirname(__FILE__) . '/captured';
    if (PHP_INT_MAX == 2147483647) {
        $phantomPath = 'util/phantomjs-linux-32';
    } else {
        $phantomPath = 'util/phantomjs-linux-64';
    }
    $os = PHP_OS;
    if (strpos(strtolower($os), 'darwin') !== FALSE) {
        $phantomPath = 'util/phantomjs-mac';
    }
    $command = sprintf(
        '%s --ignore-ssl-errors=true --ssl-protocol=any util/capture.js %s %s %s %s %s %s',
        $phantomPath,
        $url,
        $path,
        $width,
        $height,
        $device,
        $resolution
    );
    $fileName = exec($command);
    echo $fileName;
    exit;
}
?>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div id="wrapper" class="col-sm-6 col-md-4">
            <div class="thumbnail">
                <h3>Screen Capture</h3>
                <form role="form" class="form-horizontal">
                    <div class="form-group">
                        <div class="col-xs-8 col-xs-offset-2">
                            <input type="url" class="form-control" id="url" placeholder="Input URL" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="radio-inline">
                            <input type="radio" name="device" id="desktop" value="desktop" checked="checked"> Desktop
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="device" id="mobile" value="mobile"> Mobile
                        </label>
                    </div>
                    <div id="resolution-picker" class="form-group hide">
                        <div class="col-xs-8 col-xs-offset-2">
                        <select id="resolution" class="form-control">
                            <option value="0">320 x 480</option>
                            <option value="1">320 x 568</option>
                            <option value="2">600 x 1024</option>
                            <option value="3">1024 x 768</option>
                            <option value="4">1280 x 800</option>
                            <option value="5">1440 x 900</option>
                        </select>
                            </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-lg" id="captureBtn">
                            <span class="glyphicon glyphicon-camera"></span> Capture
                        </button>
                    </div>
                </form>
                <div id="result">
                </div>
            </div>
        </div>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
    </body>
</html>