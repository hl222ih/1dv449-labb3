$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "messages.php",
        headers: {
            'X-Auth-Token' : $("meta[name='token']").attr("content")
        }
    }).done(function(data) {
        var parsedData = JSON.parse(data);
        if (parsedData.error) {
            $("#content").append('<p>' + parsedData.error  + '</p>');
        } else {
            $("#content").append('<p>' + data + '</p>'); //tillfällig utskrivning av rådata
        }
    }).fail(function(data) {
        $("#content").append('<p>' + data.status + ' ' + data.statusText + '</p>');
    });
});