"use strict";
// data
// map info
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
//api info
var apiData = {
    foursquareURL: 'https://api.foursquare.com/v2/venues/',
    clientID: 'CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M',
    clientSecret: 'UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO',
    apiVersion: '20150815'
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


// array of default markers
var markers = [];

// marker classes
var Marker = function(data, map, infoWindow) {
    this.name = data.name;
    this.lat = data.lat;
    this.lng = data.lng;
    this.marker = new google.maps.Marker({
        name: this.name,
        position: {
            lat: this.lat,
            lng: this.lng
        },
        map: map,
        id: data.id
    });
    google.maps.event.addListener(this.marker, 'click', function() {
        return markerClicked(infoWindow, map, this);
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
            var lowerCaseName = markers[i].name.toLowerCase();
            if(lowerCaseName.search(lowerCaseKeyword) != -1) {
                list.push(markers[i]);
            }
        }
        return list;
    }
};
// return if the item is in array
var isIn = function(item, array) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (item == array[i]) {
            return true;
        }
    }
    return false;
};
// marker clicked
var markerClicked = function(infoWindow, map, marker) {
    var apiURL = apiData.foursquareURL + marker.id + '?client_id=' + apiData.clientID + '&client_secret=' + apiData.clientSecret + '&v=' + apiData.apiVersion;
    // update InfoWindow with selected marker
    $.getJSON(apiURL, function(result) {
        var venueInfo = result.response.venue;
        var content = '<div id=\'InfoWindow\'><h3>' + venueInfo.name + '</h3><h4 style=\'color:#' + venueInfo.ratingColor + '\'>' + 'FourSquare Score: ' + venueInfo.rating + '</h4><p>ADDRESS: ' + venueInfo.location.formattedAddress[0] + '.</p> <p>CONTACT: ' + venueInfo.contact.formattedPhone + '.</p></div>';
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
    });
};

//modelView
function modelView() {
    var self = this;
    var map = init();
    var infoWindow = initInfoWindow();
    initMarker(map, infoWindow);
    self.searchInfo = ko.observable(); // input search words

    // save and update the page with the searched result
    self.searchResult = ko.computed(function() {
        var result = filter(self.searchInfo());
        for(var i = 0, len1 = markers.length; i < len1; i++) {
            // add marker[i] to the map if markers[i] is in searched result, or remove it from the map otherwise
            if (isIn(markers[i], result)) {
                markers[i].marker.setMap(map);
            } else {
                markers[i].marker.setMap(null);
            }
        }
        return result;
    });

    //operations
    self.nameClicked = function(){
        return markerClicked(infoWindow, map, this.marker);
    }
}

// initialize google map
function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    return map;
}

// initialize infoWindow
function initInfoWindow() {
    var info = new google.maps.InfoWindow({
        content: 'hi!'
    });
    return info;
}
// initialize markers for model
function initMarker(map, infoWindow) {
    for (var i = 0, len = stores.length; i < len; i++) {
        var marker = new Marker(stores[i], map, infoWindow);
        markers.push(marker);
    }
}



//google.maps.event.addDomListener(window, 'load', fsInit);
ko.applyBindings(new modelView);
