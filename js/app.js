// data
var initialStatus = {
    center: {
        lat: 39.94,
        lng: 116.4
    },
    zoom: 13
};

var fourSquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=CE2VKST0IIJ11AELGRTJBBWIFXJXVMWTPE0RW1AXPTWJN22M&client_secret=UAJNPU23B3TPFUBPFLOYECCQPSAS3CPPOMLQXK5EHRBITHAO&v=20130815&ll=39.94,116.4&query=pekingduck'

var markers = [];
//classes


//modelView

function modelView() {
    var self = this;
    var map = init();
    self.map = ko.observable(map);
    self.search = ko.observable();

}

function fsInit() {
    var result = $.getJSON(fourSquareURL, function(data) {
        var spots = data.response.venues;
        for (var i = 0, len = Math.min(9, spots.length); i < len; i++) {
            var location = spots[i].location;
            var marker = {
                'name': location.address,
                'lat': location.lat,
                'lng': location.lng
            }
            markers.push(marker);
            console.log(spots[i]);
            console.log(marker);

        }
    });
}

function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    var marker = new google.maps.Marker({
        name: 'test 1',
        position: {
            lat: 39.94,
            lng: 116.4
        },
        map: map,
    });
}
fsInit();
ko.applyBindings(modelView);
console.log(markers);


// google.maps.event.addDomListener(window, 'load', init);
