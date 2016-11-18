// BASE SETUP
// =============================================================================

// call the packages we need

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://origin-dev:pass1@ds149297-a0.mlab.com:49297/heroku_nrxdgp9h/'); // connect to our database


var ApiCode = require('./app/models/api-content/apicode');

var CalendarUserGroup = require('./app/models/calendar-content/usergroup');
var CalendarGroup = require('./app/models/calendar-content/group');
var CalendarUserGroupEvent = require('./app/models/calendar-content/usergroupevent');
var CalendarEvent = require('./app/models/calendar-content/event');
var CalendarEventType = require('./app/models/calendar-content/eventtype');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    res.json({ message: 'hooray! welcome to our api!' });
});

//=============================================================================
// on routes that end in /usergroup
// ----------------------------------------------------
router.route('/usergroup')

// create a usergroup (accessed at POST http://localhost:8080/usergroup)
.post(function(req, res) {

    var usergroup = new CalendarUserGroup();
    usergroup.userId = req.body.userId;
    usergroup.groupId = req.body.groupId;

    // set the usergroup name (comes from the request)
    console.log("body:" + req.body);

    // set the usergroup name (comes from the request)
    console.log("usergroup:" + usergroup.groupId);
    usergroup.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!'});
    });

})

// get all the usergroup (accessed at GET http://localhost:8080/api/usergroup)
.get(function(req, res) {
    CalendarUserGroup.find(function(err, usergroup) {
        if (err)
            res.send(err);


        res.json(usergroup);
    });
});

// on routes that end in /usergroup/:usergroup_id
// ----------------------------------------------------
router.route('/usergroup/:usergroup_id')

// get the usergroup with that id
.get(function(req, res) {
    CalendarUserGroup.findById(req.params.usergroup_id, function(err, usergroup) {
        if (err)
            res.send(err);
        res.json(usergroup);
    });
})

// update the usergroup with this id
.put(function(req, res) {
    CalendarUserGroup.findById(req.params.usergroup_id, function(err, usergroup) {

        if (err)
            res.send(err);

        usergroup.userId = req.body.userId;
        usergroup.groupId = req.body.groupId;

        usergroup.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the usergroup with this id
.delete(function(req, res) {
   CalendarUserGroup.remove({
        _id: req.params.usergroup_id
    }, function(err, usergroup) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

//=============================================================================
// on routes that end in /group
// ----------------------------------------------------
router.route('/group')

// create a group (accessed at POST http://localhost:8080/group)
.post(function(req, res) {

    var group = new CalendarGroup();
    group.groupId = req.body.groupId;
    group.groupName = req.body.groupName;

    // set the group name (comes from the request)
    console.log("body:" + req.body);

    // set the group name (comes from the request)
    console.log("group:" + group.groupId);
    group.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!'});
    });

})

// get all the group (accessed at GET http://localhost:8080/api/group)
.get(function(req, res) {
    CalendarGroup.find(function(err, group) {
        if (err)
            res.send(err);


        res.json(group);
    });
});

// on routes that end in /group/:group_id
// ----------------------------------------------------
router.route('/group/:group_id')

// get the group with that id
.get(function(req, res) {
    CalendarGroup.findById(req.params.group_id, function(err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
})

// update the group with this id
.put(function(req, res) {
    CalendarGroup.findById(req.params.group_id, function(err, group) {

        if (err)
            res.send(err);

        group.groupId = req.body.groupId;
        group.groupName = req.body.groupName;

        group.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the group with this id
.delete(function(req, res) {
   CalendarGroup.remove({
        _id: req.params.group_id
    }, function(err, group) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});


//=============================================================================
// on routes that end in /usergroupevent
// ----------------------------------------------------
router.route('/usergroupevent')

// create a usergroupevent (accessed at POST http://localhost:8080/usergroupevent)
.post(function(req, res) {

    var usergroupevent = new CalendarUserGroupEvent();
    usergroupevent.groupId = req.body.groupId;
    usergroupevent.userId = req.body.userId;
    usergroupevent.eventId = req.body.eventId;

    // set the usergroupevent name (comes from the request)
    console.log("body:" + req.body);

    // set the usergroupevent name (comes from the request)
    console.log("usergroupevent:" + usergroupevent.groupId);
    usergroupevent.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!'});
    });

})

// get all the usergroupevent (accessed at GET http://localhost:8080/api/usergroupevent)
.get(function(req, res) {
    CalendarUserGroupEvent.find(function(err, usergroupevent) {
        if (err)
            res.send(err);


        res.json(usergroupevent);
    });
});

// on routes that end in /usergroupevent/:usergroupevent_id
// ----------------------------------------------------

router.route('/usergroupevent/:userId')

.get(function(req, res) {
    CalendarUserGroupEvent.find({"userId":req.params.userId}, {'eventId' : 1, '_id' : 0}, function(err, usergroupevent) {
        if (err)
            res.send(err);
        // CalendarEvent.find( {eventId: { $in: usergroupevent }}, function(err, event){

        // res.json(event);
        // console.log(event);
        // });

        res.json(usergroupevent);
       
    });
})

// update the usergroupevent with this id
.put(function(req, res) {
    CalendarUserGroupEvent.findById(req.params.usergroupevent_id, function(err, usergroupevent) {

        if (err)
            res.send(err);

        usergroupevent.groupId = req.body.groupId;
        usergroupevent.userId = req.body.userId;
        usergroupevent.eventId = req.body.eventId;

        usergroupevent.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the usergroupevent with this id
.delete(function(req, res) {
   CalendarUserGroupEvent.remove({
        _id: req.params.usergroupevent_id
    }, function(err, usergroupevent) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});


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

//=============================================================================
// on routes that end in /eventtype
// ----------------------------------------------------
router.route('/eventtype')

// create a eventtype (accessed at POST http://localhost:8080/eventype)
.post(function(req, res) {

    var eventtype = new CalendarEventType();
    eventtype.eventTypeId = req.body.eventTypeId;
    eventtype.eventType = req.body.eventType;


    // set the eventtype name (comes from the request)
    console.log("body:" + req.body);

    // set the eventtype name (comes from the request)
    console.log("eventtype:" + eventtype.eventTypeId);
    eventtype.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!'});
    });

})

// get all the eventtype (accessed at GET http://localhost:8080/api/eventtype)
.get(function(req, res) {
    CalendarEventType.find(function(err, eventtype) {
        if (err)
            res.send(err);


        res.json(eventtype);
    });
});

// on routes that end in /eventtype/:eventtype_id
// ----------------------------------------------------
router.route('/eventtype/:eventtype_id')

// get the event with that id
.get(function(req, res) {
    CalendarEventType.findById(req.params.eventtype_id, function(err, eventtype) {
        if (err)
            res.send(err);
        res.json(eventtype);
    });
})

// update the eventtype with this id
.put(function(req, res) {
    CalendarEventType.findById(req.params.eventtype_id, function(err, eventtype) {

        if (err)
            res.send(err);

        eventtype.eventTypeId = req.body.eventTypeId;
        eventtype.eventType = req.body.eventType;


        eventtype.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the eventtype with this id
.delete(function(req, res) {
   CalendarEventType.remove({
        _id: req.params.eventtype_id
    }, function(err, eventtype) {
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
