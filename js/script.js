$(document).ready(function() {
    $('#captureBtn').click(function(e) {
        e.preventDefault();
        if ($('#url').val().length > 0) {
            $.post(
                '',
                {
                    'url': $('#url').val(),
                    'width': screen.width,
                    'height': screen.height
                },
                function(data) {
                    image = './captured/' + data;
                    $('#result').html('<a href="'+image+'">Download Screenshot</a><div class="preview"><img src="'+image+'" /></div>');
                }
            );
        } else {
            alert('Please input URL');
        }
    });
});