
    function cariKopi() {
        $('#list-berita').empty()
        $('#coffee-table').append(`
        
        <table id="kopi" class="highlight responsive-table">
            <thead>
                <tr>
                    <th></th>
                    <th>tempat Ngopi</th>
                    <th>Adress</th>
                    <th>rating</th>
                    <th>distance</th>
                    <th>time estimate</th>
                </tr>
            </thead>
            <tbody id='listPlace'>
            </tbody>
        </table>`)
       
        $.ajax({
                url: `http://localhost:3000/coffee/search?lat=${lat}&lon=${lng}&cuisines=1040&sortBy=real_distance&order=asc`,
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
                        cuisines: el.restaurant.cuisines,
                        thumb : el.restaurant.thumb
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

                    $('#listPlace').append(`<tr id="subList${i}">
                        <td><img src="${restaurants[i].thumb}"></img></td>
                        <td>${restaurants[i].name}</td>
                        <td>${restaurants[i].address}</td>
                        <td>${restaurants[i].rating}</td>
                    </tr>
                    `)
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
                        
                        distanceAll.map(function(el,i){
                            $(`#subList${i}`).append(`<td>${el.distance}</td>`)
                            $(`#subList${i}`).append(`<td>${el.time}</td>`)
                        })
                    })
            })
            .fail(err => {
                console.log('hahahaha')
            })
    }


    $('document').ready(function () {
        $('#coffee-table').hide()
        $('#loginForm').hide()
        $('#registerForm').hide()
        $('#starting').show()

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
                zoom: 17
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
