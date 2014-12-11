var HL = HL || {};

HL = {
    GoogleMaps: function() {
        var map = new google.maps.Map($('#map')[0], {
           zoom: 6,
           center: {lat: 60, lng: 14},
           mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    },
    GetMessages: function() {
        $.ajax({
            type: "GET",
            url: "messages.php",
            headers: {
                'X-Auth-Token' : $("meta[name='token']").attr("content")
            }
        }).done(function(data, textStatus, jqXHR) {
            var parsedData = JSON.parse(data);
            if (parsedData.error) {
                $("#content").append('<p>' + parsedData.error  + '</p>');
            } else {
                HL.Messages = parsedData['messages'];
                $("#content").append('<p>' + data + '</p>'); //tillfällig utskrivning av rådata
                HL.ShowMessages();
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $("#content").append('<p>' + jqXHR.status + ' ' + textStatus + '</p>');
        });
    },
    Messages: [],
    FilteredMessages: [],
    ShowMessages: function(subCategory) {
        if (subCategory) {
            HL.FilteredMessages = this.Messages.filter(function(message) { return message['subcategory'] === subCategory });
        } else {
            HL.FilteredMessages = $.extend(true, [], HL.Messages);
        }
        HL.ProcessMessages();
        alert(JSON.stringify(HL.FilteredMessages));
    },
    ProcessMessages: function() {
        var i = 0;
        var $contentNode = $("#content");
        $contentNode.empty();
//        $contentNode.append('<p>' + data + '</p>');

        for (i; i < HL.FilteredMessages.length; i++) {
            $contentNode.append('<li>' + HL.FilteredMessages[i]['subcategory'] + '</li>');
        }
    },
    RenderMessage: function() {

    },
    AddMarker: function() {

    }
};

$(document).ready(function() {
    HL.GetMessages();
    HL.GoogleMaps();
});