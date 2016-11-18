// BASE SETUP
// =============================================================================

// call the packages we need

// var express = require('express');
// var bodyParser = require('body-parser');
// var morgan = require('morgan');
// var app = express();

// // configure app
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var port = process.env.PORT || 3000; // set our port

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://origin-dev:pass1@ds149297-a0.mlab.com:49297/heroku_nrxdgp9h/'); // connect to our database



var CalendarEvent = require('../../app/models/calendar-content/event');


// ROUTES FOR OUR API
// =============================================================================

// create our router
// var router = express.Router();

// // middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next();
// });

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {

//     res.json({ message: 'hooray! welcome to our api!' });
// });




//=============================================================================
// on routes that end in /event
// ----------------------------------------------------
router.route('/event')

// create a usergroupevent (accessed at POST http://localhost:8080/usergroupevent)
.post(function(req, res) {

    var event = new CalendarEvent();
    event.eventId = req.body.eventId;
    event.title = req.body.title;
    event.detail = req.body.detail;
    event.eventTypeId = req.body.eventTypeId;
    event.date = req.body.date;
    event.time = req.body.time;

    // set the event name (comes from the request)
    console.log("body:" + req.body);

    // set the event name (comes from the request)
    console.log("event:" + event.eventId);
    event.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!'});
    });

})

// get all the event (accessed at GET http://localhost:8080/api/event)
.get(function(req, res) {
    CalendarEvent.find(function(err, event) {
        if (err)
            res.send(err);


        res.json(event);
    });
});

// on routes that end in /event/:event_id
// ----------------------------------------------------

router.route('/event/:eventId')

.get(function(req, res) {
    CalendarEvent.find({"eventId":req.params.eventId}, function(err, usergroupevent) {
        if (err)
            res.send(err);
        res.json(usergroupevent);
    });
})

// update the event with this id
.put(function(req, res) {
    CalendarEvent.findById(req.params.event_id, function(err, event) {

        if (err)
            res.send(err);

        event.eventId = req.body.eventId;
        event.title = req.body.title;
        event.detail = req.body.detail;
        event.eventTypeId = req.body.eventTypeId;
        event.date = req.body.date;
        event.time = req.body.time;

        event.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the event with this id
.delete(function(req, res) {
   CalendarEvent.remove({
        _id: req.params.event_id
    }, function(err, event) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});




// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
