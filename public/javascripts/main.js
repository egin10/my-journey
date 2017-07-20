function confirmDelete(url) {
    if (confirm('Are you sure delete this journey ?')) {
        location.href = url;
    }
    return false;
}

function goBack() {
    history.back();
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -4.742701, lng: 114.539448 },
        zoom: 4
    });
}

function myPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            let marker = new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP
            });

            marker.setMap(map);
            map.setCenter(pos);
            map.setZoom(12);
            $('#lat').val(pos.lat);
            $('#lng').val(pos.lng);

            marker.addListener('click', () => {
                new google.maps.InfoWindow({
                    content: `Your position \n ${pos.lat} , ${pos.lng}`,
                    maxWidth: 200,
                }).open(map, marker);
            });
        }, () => {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}