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

// restuants info
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
//var fourSquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M&client_secret=UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO

// array for store markers
var markers = [];

// marker classes
var Marker = function(data, map) {
    this.name = data.name;
    this.lat = data.lat;
    this.lng = data.lng;
    this.marker = new google.maps.Marker({
        name: this.name,
        position: {
            lat: this.lat,
            lng: this.lng
        },
        map: map
    });
};


// helper functions
// return a list of stores that contains the keyword
var filter = function(keyword) {
    if (keyword == '' || keyword == null) {
        return markers;
    }
    else {
        var list = [];
        var lowerCaseKeyword = keyword.toLowerCase();
        for (var i = 0, len = markers.length; i < len; i ++) {
            lowerCaseName = markers[i].name.toLowerCase();
            if(lowerCaseName.search(lowerCaseKeyword) != -1) {
                list.push(markers[i]);
            }
        }
        return list;
    }
}

// return if the item is in array
var isIn = function(item, array) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (item == array[i]) {
            return true;
        }
    }
    return false;
}

//modelView
function modelView() {
    var self = this;
    var map = init();
    initMarker(map);

    self.searchInfo = ko.observable(); // input search words

    // save and update the page with the searched result
    self.searchResult = ko.computed(function() {
        var result = filter(self.searchInfo());
        for(var i = 0, len1 = markers.length; i < len1; i++) {
            if (isIn(markers[i], result)) {
                markers[i].marker.setMap(map);
            } else {
                markers[i].marker.setMap(null);
            }
        }
        return result;
    });

    //operations

}

// initialize google map
function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    return map;
}

// initialize markers on the map
function initMarker(map) {
    for (var i = 0, len = stores.length; i < len; i++) {
        var marker = new Marker(stores[i], map);
        markers.push(marker);
    }
}


//google.maps.event.addDomListener(window, 'load', fsInit);
ko.applyBindings(new modelView);
