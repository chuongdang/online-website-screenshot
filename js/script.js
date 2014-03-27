function isValidURL(str) {
    var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

$(document).ready(function() {
    $('#captureBtn').click(function(e) {
        e.preventDefault();
        if ($('#url').val().length > 0) {
            if (isValidURL($('#url').val())) {
                $('#result').html('<div class="bar"><span></span></div>');
                $('#captureBtn').attr('disabled', 'disabled');
                $.post(
                    '',
                    {
                        'url': $('#url').val(),
                        'width': screen.width,
                        'height': screen.height
                    },
                    function(data) {
                        $('#captureBtn').removeAttr('disabled');
                        image = './captured/' + data;
                        $('#result').html('<a href="'+image+'">Download Screenshot</a><div class="preview"><img src="'+image+'" /></div>');
                    }
                );
            } else {
                alert('The URL is not valid');
            }
        } else {
            alert('Please input URL');
        }
    });
});