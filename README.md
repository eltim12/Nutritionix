# CariKopi

get nearby coffee shop :

```
URL : http://localhost:3000/coffee/search?lat=<value>&lon=<value>&radius=<value>&sortBy=<value>&order=<value>
    Method : GET
    URL Query Required: lat=[String],lon=[String]
    URL query Optional: radius=[string],sortBy=[cost/rating],order=[desc/asc]
    Success Response :
    Code 200
        [ 
            { restaurant : {
                    R": {
                        "res_id": 18661545
                    },
                    "apikey": "f4801e8d6a2de0bf311172b7070f32eb",
                    "id": "18661545",
                    "name": "Opal Coffee",
                    "url": "https://www.zomato.com/jakarta/opal-coffee-pondok-indah?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                    "location":
                    ....
                }
            }
        ]
    Error Response :
    Code: 500 NOT FOUND
    Content: {  msg: <error message> }
```
get distance and time from origin place to destination :
```
URL : http://localhost:3000/distance/?origin=<lattitude,longitude>&destinations=<lattitude,longitude>|<lattitude,longitude>|...
    Method : GET
    URL Query Required: origin=[String],destinations=[String]
    Success Response :
    Code 200
        {
            "destination_addresses": [
                "Graha Intirub, Jl. Cililitan Besar, RT.7/RW.11, Kb. Pala, Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650, Indonesia"
            ],
            "origin_addresses": [
                "Jl. Pd. Pinang 3 No.47, RT.11/RW.2, Pd. Pinang, Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310, Indonesia"
            ],
            "rows": [
                {
                    "elements": [
                        {
                            "distance": {
                                "text": "23.2 km",
                                "value": 23171
                            },
                            "duration": {
                                "text": "36 mins",
                                "value": 2144
                            },
                            "status": "OK"
                        }
                    ]
        }
    
    Error Response :
    Code: 500 NOT FOUND
    Content: {  msg: <error message> }
```
#Usage



Access the API via http://localhost:3000/
