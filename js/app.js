var HL = HL || {};

HL = {
    GoogleMap: {},
    GoogleMapInit: function() {
        HL.GoogleMap = new google.maps.Map($('#map')[0], {
           zoom: 5,
           center: {lat: 60, lng: 14},
           mapTypeId: google.maps.MapTypeId.ROADMAP,
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
        var contentNode = $("#content");
        contentNode.empty();

        if (category === undefined || category === "") {
            HL.FilteredMessages = $.extend(true, [], HL.Messages);
        } else {
            HL.FilteredMessages = HL.Messages.filter(function(message) {
                var isSame = message['category'] == category;
                return isSame;
            });
        }
        HL.ClearMarkers();
        var message = {};
        for (i; i < HL.FilteredMessages.length; i++) {
            message = HL.FilteredMessages[i];
            var marker = HL.AddMarker(message['latitude'], message['longitude'], message);
            HL.RenderMessage(contentNode, message, marker);
        }
    },
    RenderMessage: function(containerNode, message, marker) {
        var messageNode = $(''
            + '<a href="#" class="list-group-item">'
                + '<h4 class="list-group-item-heading">'
                    + message["subcategory"] + ' - '
                    + message["title"]
                + '</h4>'
                + '<p class="list-group-item-text">'
                    + message["description"]
                + '</p>'
                + '<p class="list-group-item-text">'
                    + new Date(parseInt(message["createddate"].substr(6))).toLocaleString()
                + '</p>'
            + '</a>');
        $(messageNode).click(function() {
            HL.CloseInfoWindow();
            $('.list-group-item.active').removeClass('active');
            $(messageNode).addClass('active');
            HL.GoogleMap.setCenter(marker.getPosition());
            clearTimeout(marker.timer);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 2250);
        });
        $(messageNode).mouseover(function() {
            if (marker.getAnimation()) return;
            marker.setAnimation(google.maps.Animation.BOUNCE);
            marker.timer = setTimeout(function() {
                marker.setAnimation(null);
            }, 750);
        });
        containerNode.append(messageNode);
    },
    Markers: [],
    ClearMarkers: function() {
        var i = 0;
        for(i; i < HL.Markers.length; i++) {
            HL.Markers[i].setMap(null);
        }
        HL.Markers = [];
    },
    AddMarker: function(lat, lng, message) {
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: HL.GoogleMap
        });
        HL.Markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            HL.CloseInfoWindow();
            HL.InfoWindow = new google.maps.InfoWindow({
                content: '<div><h4>' + message['subcategory'] + ' - ' + message['title'] + '</h4></div>'
                    +'<div>' + message['description'] + '</div>'
                +'<div>' + new Date(parseInt(message["createddate"].substr(6))).toLocaleString() + '</div>'
            });
            HL.InfoWindow.open(HL.GoogleMap, marker);
        });
        return marker;
    },
    InfoWindow: {},
    CloseInfoWindow: function() {
        if (!$.isEmptyObject(HL.InfoWindow)) {
            HL.InfoWindow.close();
        }
    }
};

$(document).ready(function() {
    HL.GetMessages();
    $('.choice').click(function() {
        HL.ProcessMessages($(this).attr("data-choice"));
    });
    HL.GoogleMapInit();
});