
    function cariKopi() {
        console.log(lat,lng)
       
        $.ajax({
                url: `http://localhost:3000/coffee/search?lat=${lat}&lon=${lng}&cuisines=1040&sortBy=rating&order=asc`,
                method: 'GET'
            })
            .done(data => {
                var newLat = lat
                var newLng = lng

                let restaurants = []
                data.map(el => {
                    let obj = {
                        lat: el.restaurant.location.latitude,
                        lng: el.restaurant.location.longitude,
                        name: el.restaurant.name,
                        address: el.restaurant.location.address,
                        rating: el.restaurant.user_rating.aggregate_rating,
                        cuisines: el.restaurant.cuisines
                    }
                    restaurants.push(obj)
                })

                for (let i = 0; i < restaurants.length; i++) {

                    let contentString = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        `<h1 id="firstHeading" class="firstHeading">${restaurants[i].name}</h1>` +
                        '<div id="bodyContent">' +
                        `<p><b>${restaurants[i].address}</b></p>` +
                        `<p> cuisines : ${restaurants[i].cuisines}</p>` +
                        `<p> rating : ${restaurants[i].rating}</p>` +
                        '</div>' +
                        '</div>';

                    let infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    lat = +restaurants[i][0]
                    lng = +restaurants[i][1]

                    let myLatLng = {
                        lat: +restaurants[i].lat,
                        lng: +restaurants[i].lng,
                    };

                    let marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        label: `${restaurants[i].name}`
                    });

                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                }

                let arrCoor = []
                restaurants.map(el => {
                    let tempCoor = `${el.lat},${el.lng}`
                    arrCoor.push(tempCoor)
                })

                arrCoor = arrCoor.join('|')

                let distanceAll = []

                $.ajax({
                        url: `http://localhost:3000/distance/?origin=${newLat},${newLng}&destinations=${arrCoor}`,
                        method: 'GET'
                    })
                    .done(rest => {
                        rest.rows[0].elements.map( el => {
                            let obj = {
                                distance : el.distance.text,
                                time : el.duration.text
                            }
                            distanceAll.push(obj)
                        })
                        
                    })
            })
            .fail(err => {
                console.log('hahahaha')
            })
    }


    $('document').ready(function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert('Geolocation is not supported in your browser');
        }

        function showPosition(position) {
            lat = position.coords.latitude
            lng = position.coords.longitude
            initMap()
        }

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: lat,
                    lng: lng
                },
                zoom: 15
            });

            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">Your Location</h1>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var myLatLng = {
                lat,
                lng
            };
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                label: 'Your Location'
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

        }

    })
