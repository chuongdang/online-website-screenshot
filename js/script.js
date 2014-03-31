function isValidURL(str) {
    var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

$(document).ready(function() {
    $('input[name=device]').change(function(e) {
        radio = e.currentTarget;
        if ($(radio).val() === 'mobile') {
            $('#resolution-picker').removeClass('hide');
        } else {
            $('#resolution-picker').addClass('hide');
        }
    }) ;

    $('#captureBtn').click(function(e) {
        e.preventDefault();
        if ($('#url').val().length > 0) {
            if (isValidURL($('#url').val())) {
                $('#result').html('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%"><span class="sr-only">45% Complete</span></div></div>');
                $('#captureBtn').attr('disabled', 'disabled');
                $.post(
                    '',
                    {
                        'url'       : $('#url').val(),
                        'width'     : screen.width,
                        'height'    : screen.height,
                        'device'    : $('input[name=device]:checked').val(),
                        'resolution': $('#resolution').val()
                    },
                    function(data) {
                        $('#captureBtn').removeAttr('disabled');
                        image = './captured/' + data;
                        $('#result').html('<a href="'+image+'">Download Screenshot</a><div class="preview"><a href="'+image+'" class="thumbnail"><img src="'+image+'" /></a></div>');
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