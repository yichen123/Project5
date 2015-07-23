// data
var initialStatus = {
    center: {
        lat: 40.1431473,
        lng: 116.2907178
    },
    zoom: 13
};

//classes

function init() {
    var map = new google.maps.Map(document.getElementById('map'), initialStatus);
    var marker = new google.maps.Marker({
        position: {
            lat: 40.1431473,
            lng: 116.2907178
        },
        map: map,
    });
}
google.maps.event.addDomListener(window, 'load', init);
