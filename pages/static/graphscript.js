$(document).ready(function() {
    // $('#plot_button').click(function() {
    //     console.log('Plot button clicked');
    //     var file_data = $('#audio_file').prop('files')[0];
    //     console.log('File uploaded' + file_data);
    //     var form_data = new FormData();
    //     form_data.append('audio_file', file_data);

    // $('#plot_button').click(function() {
    //     var form_data = new FormData($('#upload_form')[0]); // Serialize the form data
        
    $('#plot_button').click(function() {
        // var file_data = $('#audio_file').prop('files')[0];
        var file_data = document.getElementById('audio_file').files[0];
        var form_data = new FormData();
        form_data.append('audio_file', file_data);

        $.ajax({
            type: 'POST',
            url: '/plot_audio',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
                console.log('Received Response');
                var canvas = document.getElementById('plot_canvas');
                var ctx = canvas.getContext('2d');
                var img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, 0, 0);
                };
                img.src = 'data:image/png;base64,' + response.plot_base64;
            },
            error: function(xhr, status, error) {
                alert('Error occurred while plotting waveform: ' + error);
            }
        });
    });
});