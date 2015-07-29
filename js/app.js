// data
var initialStatus = {
    center: {
        lat: 40.715586,
        lng: -73.995174
    },
    zoom: 14,
    keyword: 'hotpot',
    limit: '10',
    intent: 'browser',
    radius: 2000
};

var fourSquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M&client_secret=UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO&v=20130815&ll=' + initialStatus.center.lat + ',' + initialStatus.center.lng + '&query=' + initialStatus.keyword + '&limit=' + initialStatus.limit + '&intent=' + initialStatus.intent + '&radius=' + initialStatus.radius;

// array for store data from foursquare
var apiResult = [];

// array for store markers
var markers = [];

//classes


//modelView

function modelView() {
    var self = this;
    var map = init();
    fsInit(map);
    self.map = ko.observable(map);
    self.search = ko.observable();



}

function fsInit(map) {
    var result = $.getJSON(fourSquareURL, function(data) {
        var spots = data.response.venues;
        for (var i = 0, len = spots.length; i < len; i++) {
            var place = spots[i];
            var marker = {
                'name': place.name,
                'lat': place.location.lat,
                'lng': place.location.lng
            }
            apiResult.push(marker);
        }
        for (var i = 0, len = apiResult.length; i < len; i++) {
            var that = apiResult[i];
            markers[i] = new google.maps.Marker({
                name: that.name,
                position: {
                    lat: that.lat,
                    lng: that.lng
                },
                map: map
            });
        }

    });
}

function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    return map;
}


//google.maps.event.addDomListener(window, 'load', fsInit);
ko.applyBindings(modelView);
