# Reverse geocode Rest API

The API only returns the most precise address for the specified coordiantes.
In order for this to work please use your google maps API KEY in `consts.js`;
``` sh
### Replace API_KEY with a proper key

 const GoogleMapsAPIKey = 'API_KEY';

```
### To Run the API

``` sh

npm install
npm start

```

### AVAILABLE ENDPOINTS

#### 1. Reverse Geocode coordinates

Base endpoint URL: GET : `localhost:8000/reverse-geocode`

###### Parameters

* `lat` - Latitude (mondatory)
* `lng` - Longitude (mondatory)


#### 2. Get all results

   Endpoint URL:GET : `localhost:8000/results`


#### 3. Find results by ID or place_id

Base endpoint URL: GET :  `localhost:8000/reverse-geocode`

###### Parameters

* `ID` - Find by ID 
* `place_id` - Find by Place ID 

If no parameter (ID or place_id) is specified, the API retruns all available results.



#### 4. Delete results by ID or place_id

Base endpoint URL: Delete :  `localhost:8000/reverse-geocode`

###### Parameters


* `ID` - Find by ID 
* `place_id` - Find by Place ID 


### Response Format

```
 {
     status : status of the request {200, 400 , 404 , 500 ...} ,
     results : if the request is successeful , 
     error : if there are errors
 }
```