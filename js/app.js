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
        }).done(function(data) {
            var parsedData = JSON.parse(data);
            if (parsedData.error) {
                $("#content").append('<p>' + parsedData.error  + '</p>');
            } else {
                HL.Messages = parsedData['messages'].sort(function (a, b) {
                    var date1 = parseInt(a["createddate"].substr(6));
                    var date2 = parseInt(b["createddate"].substr(6));
                    return (date1 > date2) ? -1 : (date1 < date2) ? 1 : 0;
                });
//                HL.Messages = parsedData['messages'];
                $("#content").append('<p>' + data + '</p>'); //tillfällig utskrivning av rådata
                HL.ProcessMessages();
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $("#content").append('<p>' + jqXHR.status + ' ' + textStatus + '</p>');
        });
    },
    Messages: [],
    FilteredMessages: [],
    ProcessMessages: function(category) {
        var i = 0;
        var $contentNode = $("#content");
        $contentNode.empty();
//        $contentNode.append('<p>' + data + '</p>');

        if (category === undefined || category === "") {
            HL.FilteredMessages = $.extend(true, [], HL.Messages);
        } else {
            HL.FilteredMessages = HL.Messages.filter(function(message) {
                var isSame = message['category'] == category;
                return isSame;
            });
        }
        for (i; i < HL.FilteredMessages.length; i++) {
            HL.RenderMessage($contentNode, HL.FilteredMessages[i]);
        }
    },
    RenderMessage: function($node, $message) {
        $node.append(''
            + '<a href="#" class="list-group-item">'
                + '<h4 class="list-group-item-heading">'
                    + $message["subcategory"] + ' - '
                    + $message["title"]
                + '</h4>'
                + '<p class="list-group-item-text">'
                    + $message["description"]
                + '</p>'
                + '<p class="list-group-item-text">'
                    + new Date(parseInt($message["createddate"].substr(6))).toLocaleString()
                + '</p>'
            + '</a>'
        );
    },
    AddMarker: function() {

    }
};

$(document).ready(function() {
    HL.GetMessages();
    $('.choice').click(function() {
        HL.ProcessMessages($(this).attr("data-choice"));
    });
    HL.GoogleMaps();
});