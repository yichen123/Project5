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

// url for applying foursquare api
var fourSquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M&client_secret=UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO&v=20130815&ll=' + initialStatus.center.lat + ',' + initialStatus.center.lng + '&query=' + initialStatus.keyword + '&limit=' + initialStatus.limit + '&intent=' + initialStatus.intent + '&radius=' + initialStatus.radius;

// array for store data from foursquare
var apiResult = [];

// array for store markers
var markers = [];

// marker classes, data is the formlized data from foursquare
var Marker = function(data, map) {
    this.name= data.name,
    this.lat= data.location.lat,
    this.lng= data.location.lng
    this.marker = new google.maps.Marker({
        name: this.name,
        position: {
            lat: this.lat,
            lng: this.lng
        },
        map: map
    });
};


//modelView

function modelView() {
    var self = this;
    var map = init();
    fsInit(map);
    self.map = ko.observable(map);
    self.searchInfo = ko.observable(); // input search words
    self.searchResult = ko.observableArray(); // store searched result
    console.log(searchInfo());

        for (var i = 0, len = markers.length; i < len; i++) {
            searchResult.push(markers[i]);
        }
        console.log(searchResult());

    
}

// retrive data from foursquare and make markers on the map
function fsInit(map) {
    var result = $.getJSON(fourSquareURL, function(data) {
        var spots = data.response.venues;
        for (var i = 0, len = spots.length; i < len; i++) {
            var place = spots[i];
            apiResult.push(place);
            var marker = new Marker(place, map);
            markers.push(marker);
        }

    });
}

// initialize google map
function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    return map;
}


//google.maps.event.addDomListener(window, 'load', fsInit);
ko.applyBindings(modelView);
