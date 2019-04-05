# CariKopi

get nearby coffee shop :

```
URL : /search?lat=<value>&lon=<value>&radius=<value>
    Method : GET
    URL Query Required: lat=[String],lon=[String],radius=[string]
    Success Response :
    Code 200
        {
            "results_found": 3067,
            "results_start": 0,
            "results_shown": 20,
            "restaurants": [
                { <object restaurant> }
                }
        }
    Error Response :
    Code: 500 NOT FOUND
    Content: {  msg: <error message> }
```

#Usage

Access the API via http://localhost:3000/
