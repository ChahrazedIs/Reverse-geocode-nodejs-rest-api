var express = require('express');
var router = express.Router();

const axios = require('axios');
const GoogleMapsAPIKey = 'AIzaSyAwdL3NcmUdlVCfmtUgvklrSTW4ZrFRLfQ';


const { Result } = require('./models/Result');
const mongoose = require('mongoose');


//========================================================
//        Translates coordinates to formated address
//========================================================


router.get('/reverse-geocode', (req, res) => {

    if ((lat = req.query.lat) && (lng = req.query.lng)) {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleMapsAPIKey}`)
            .then(response => {
                var status = response.data.status;
                if (status === "OK") {

                    const result = new Result({
                        coordinates: {
                            lat: lat,
                            lng: lng
                        },
                        place_id: response.data.results[0].place_id,
                        formatted_address: response.data.results[0].formatted_address,
                    }
                    );

                    result.save((err, doc) => {
                        if (err) return res.json({ status: 500, error: err });
                        res.status(200).json({
                            status: 200,
                            results: {
                                place_id: response.data.results[0].place_id,
                                formatted_address: response.data.results[0].formatted_address,
                            }
                        })
                    })
                }

                if (status === "ZERO_RESULTS")
                    res.json({ status: 204, "data": "No results found" });
                if (status === "REQUEST_DENIED")
                    res.json({ status: 400, "erreur": response.data.error_message });
                if (status === "INVALID_REQUEST")
                    res.json({ status: 400, "data": response.data });

            })
            .catch(error => {
                res.json({ status: 400, "error": error });
            });
    } else {
        res.json({ status: 400, error: "Lat and Lng missing" });
    }
});


//========================================================
//        Get all results or find by ID ou place_id
//========================================================

router.get('/results', (req, res) => {
    let filter = {}
    // Check if an ID parameter is specified in the request
    if ((ID = req.query.ID)) {
        if (!mongoose.Types.ObjectId.isValid(req.query.ID)) ID = null;
        filter._id = mongoose.Types.ObjectId(ID);
    }

    // Check if a place_id parameter is specified in the request
    if (place_id = req.query.place_id) {
        filter.place_id = place_id;
    }

    // get the results with filters
    Result.find(filter, (err, results) => {

        if (err)
            return res.status(500).send({
                status: 500,
                error: err
            });

        res.status(200).send({
            success: 200,
            results: results
        })

    })


});

//========================================================
//       Delete a result by ID ou place_id
//========================================================

router.delete('/results', (req, res) => {
    let filter = {}
    // Check if an ID parameter is specified in the request
    if ((ID = req.query.ID)) {
        if (!mongoose.Types.ObjectId.isValid(req.query.ID)) ID = null;
        filter._id = mongoose.Types.ObjectId(ID);
    }

    // Check if a place_id parameter is specified in the request
    if (place_id = req.query.place_id) {
        filter.place_id = place_id;
    }

    if (ID || place_id) {
        // delete the results with filters
        Result.deleteOne(filter, (err, results) => {

            if (err)
                return res.status(500).send({
                    status: 500,
                    error: err
                });

            res.status(200).send({
                success: 200,
                results: "Deleted successfylly !"
            })

        })
    }
    else {
        res.status(400).send({
            success: 400,
            error: "No ID nor place_id specified"
        })
    }



});

module.exports = router;