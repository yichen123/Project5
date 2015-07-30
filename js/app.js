// data
var initialStatus = {
    center: {
        lat: 40.720586,
        lng: -73.995174
    },
    zoom: 13,
    keyword: 'hotpot',
    limit: '10',
    intent: 'browser',
    radius: 2000
};

// store info
var stores = [{
    name: 'Hakata Ton Ton',
    id: '4a0f01acf964a52011761fe3',
    lat: 40.733012,
    lng: -74.003118
}, {
    name: 'Shabu Tatsu',
    id: '3fd66200f964a52026e51ee3',
    lat: 40.729444,
    lng: -73.985883
}, {
    name: 'Noodle Village',
    id: '49d3deadf964a5201d5c1fe3',
    lat: 40.71415453,
    lng: -73.998768
}, {
    name: 'Hot Kitchen',
    id: '4e7fc0019adffe8cdf3b2198',
    lat: 40.727578,
    lng: -73.9883929
}, {
    name: 'Ootoya',
    id: '4f7b61f6e4b07aaa5d524842',
    lat: 40.7387544,
    lng: -73.9927804
}, {
    name: 'Daruma Ya',
    id: '4a2c50d8f964a5204c971fe3',
    lat: 40.72231067,
    lng: -74.00989181
}, {
    name: 'Han Dynasty',
    id: '52169fba11d21db81bdab2a0',
    lat: 40.732213,
    lng: -73.988072
}, {
    name: 'EN Japanese Brasserie',
    id: '42055e00f964a5206e1f1fe3',
    lat: 40.730371,
    lng: -74.006888,
}];

// url for applying foursquare api
//var fourSquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M&client_secret=UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO&v=20130815&ll=' + initialStatus.center.lat + ',' + initialStatus.center.lng + '&query=' + initialStatus.keyword + '&limit=' + initialStatus.limit + '&intent=' + initialStatus.intent + '&radius=' + initialStatus.radius;

// array for store data from foursquare
var apiResult = [];

// array for store markers
var markers = [];

// marker classes, data is the formlized data from foursquare
var Marker = function(data, map) {
    this.name = data.name,
    this.lat = data.lat,
    this.lng = data.lng,
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
    self.map = ko.observable(map);
    self.searchInfo = ko.observable(); // input search words
    self.searchResult = ko.observableArray(); // store searched result
    for (var i = 0, len = stores.length; i < len; i++) {
        var marker = new Marker(stores[i], map);
        markers.push(marker);
    }
    console.log(searchInfo());
}

// initialize google map
function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    return map;

}


    //google.maps.event.addDomListener(window, 'load', fsInit);
    ko.applyBindings(modelView);
