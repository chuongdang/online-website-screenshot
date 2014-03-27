<?php
if (!empty($_POST['url'])) {
    $url = $_POST['url'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $path = dirname(__FILE__) . '/captured';
    $phantomPath = '/usr/bin/phantomjs';
    $os = PHP_OS;
    if (strpos(strtolower($os), 'darwin') !== FALSE) {
        $phantomPath = '/usr/local/bin/phantomjs';
    }
    $command = sprintf(
        '%s util/capture.js %s %s %s %s',
        $phantomPath,
        $url,
        $path,
        $width,
        $height
    );
    $fileName = exec($command);
    echo $fileName;
    exit;
}
?>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div id="wrapper">
            <h3>Screen Capture</h3>
            <input type="text" id="url" placeholder="Input the URL" />
            <button class="btn" id="captureBtn">Capture</button>
            <div id="result">
            </div>
        </div>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
    </body>
</html>