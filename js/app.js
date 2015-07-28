// data
var initialStatus = {
    center: {
        lat: 40.715586,
        lng: -73.995174
    },
    zoom: 14,
    keyword: 'hotpot',
    limit: '10'
};

var fourSquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M&client_secret=UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO&v=20130815&ll=' + initialStatus.center.lat + ',' + initialStatus.center.lng + '&query=' + initialStatus.keyword + '&limit=' + initialStatus.limit;

// array for store data from foursquare
var apiResult = [];

// array for store markers
var markers = [];
//classes


//modelView

function modelView() {
    var self = this;
    var map = init();
    var marker = new google.maps.Marker({
        name: 'test1',
        position: {
            lat: 40.71,
            lng: -73.995
        },
    });
    marker.setMap(map);
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
            console.log(spots[i]);
            console.log(marker);
        }
        console.log(apiResult);
        for (var i = 0, len = apiResult.length; i < len; i++) {
            var that = apiResult[i];
            marker[i] = new google.maps.Marker({
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

}


//google.maps.event.addDomListener(window, 'load', fsInit);
ko.applyBindings(modelView);
console.log(apiResult);
