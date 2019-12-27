(() => {
    /* ========================================================================= */
    /*	Google Map Customization
    /* =========================================================================  */
    const mapOptions = {
        zoom: 13,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
        }
    };

    function addMarker(latLong, map) {
        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: '',
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        return marker;
    }

    function fitToMarkers(map, markers) {
        const bounds = new google.maps.LatLngBounds();
        if (markers.length > 1) {
            markers.forEach((marker) => bounds.extend(marker.position));
            map.fitBounds(bounds);
        }
    }

    function getLatLongs(points) {
        return points.split(' ').reduce((memo, point) => {
            const [latitude, longitude] = point.split(',');
            const latLong = new google.maps.LatLng(Number(latitude), Number(longitude));
            memo.push(latLong);
            return memo;
        },[]);
    }

    function initialize() {
        const $canvases = $('.map-canvas');
        $canvases.each((index, canvas) => {
            const points = $(canvas).attr('data-points').replace(/[\[\]]/g,'');
            const latLongs = getLatLongs(points);
            const map = new google.maps.Map(canvas, {
                center: latLongs[0],
                ...mapOptions,
            });
            const markers = latLongs.map((latLong) => addMarker(latLong, map));

            setMapStyle(map);
            fitToMarkers(map, markers);
        });

    }

    function setMapStyle(map) {
        const roadAtlasStyles = [{
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#2F3238"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#FFFFFF"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#50525f"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#808080"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#808080"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#3071a7"
            }, {
                "saturation": -65
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#bbbbbb"
            }]
        }];

        const styledMapOptions = {
            name: 'US Road Atlas'
        };

        const usRoadMapType = new google.maps.StyledMapType(roadAtlasStyles, styledMapOptions);

        map.mapTypes.set('roadatlas', usRoadMapType);
        map.setMapTypeId('roadatlas');
    }

    google.maps.event.addDomListener(window, "load", initialize);

})();