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
var Category = require('./app/models/custom-content/category');
var Content = require('./app/models/custom-content/content');
var RoleCategory = require('./app/models/custom-content/rolecategory');
var ContentCategory = require('./app/models/custom-content/contentcategory')


var ApiCode = require('./app/models/api-content/apicode');

var CalendarUserGroups = require('./app/models/calendar-content/usergroup')

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
// on routes that end in /apicode
// ----------------------------------------------------
router.route('/apicode')

// create a apicode (accessed at POST http://localhost:8080/apicode)
.post(function(req, res) {

    var apicode = new ApiCode();
    apicode.name = req.body.name;
    apicode.userId = req.body.userId;
    apicode.linkedInKey = req.body.linkedInKey;
    apicode.githubKey = req.body.githubKey;
    apicode.linkedInUrl = req.body.linkedInUrl;

    // set the category name (comes from the request)
    console.log("body:" + req.body);

    // set the category name (comes from the request)
    console.log("apiCode:" + apicode.name);
    apicode.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!'});
    });

})

// get all the category (accessed at GET http://localhost:8080/api/apicode)
.get(function(req, res) {
    ApiCode.find(function(err, apicode) {
        if (err)
            res.send(err);


        res.json(apicode);
    });
});

// on routes that end in /category/:category_id
// ----------------------------------------------------
router.route('/apicode/:apicode_id')

// get the category with that id
.get(function(req, res) {
    ApiCode.findById(req.params.apicode_id, function(err, apicode) {
        if (err)
            res.send(err);
        res.json(apicode);
    });
})

// update the category with this id
.put(function(req, res) {
    ApiCode.findById(req.params.apicode_id, function(err, apicode) {

        if (err)
            res.send(err);

        apicode.name = req.body.name;
        apicode.userId = req.body.userId;
        apicode.linkedInKey = req.body.linkedInKey;
        apicode.githubKey = req.body.githubKey;
        apicode.linkedInUrl = req.body.linkedInUrl;

        apicode.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the category with this id
.delete(function(req, res) {
    ApiCode.remove({
        _id: req.params.apicode_id
    }, function(err, apicode) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

//=============================================================================
// on routes that end in /content
// ----------------------------------------------------

router.route('/content')

// create a content (accessed at POST http://localhost:8080/content)
.post(function(req, res) {

    var content = new Content();
    content.categoryId = req.body.categoryId;
    content.title = req.body.title;
    content.bodyDescr = req.body.bodyDescr;
    content.createdBy = req.body.createdBy;

    // set the content name (comes from the request)
    console.log("body:" + req.body);

    // set the content name (comes from the request)
    content.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Content created!' });
    });


})

// get all the content (accessed at GET http://localhost:8080/api/content)
.get(function(req, res) {
    Content.find(function(err, content) {
        if (err)
            res.send(err);

        res.json(content);
    });
});

// on routes that end in /category/:content_id
// ----------------------------------------------------
router.route('/content/:content_id')

// get the category with that id
.get(function(req, res) {
    Content.findById(req.params.content_id, function(err, content) {
        if (err)
            res.send(err);
        res.json(content);
    });
})

// update the category with this id
.put(function(req, res) {
    Content.findById(req.params.content_id, function(err, content) {

        if (err)
            res.send(err);

        content.categoryId = req.body.categoryId;
        content.title = req.body.title;
        content.bodyDescr = req.body.bodyDescr;
        content.createdBy = req.body.createdBy;
        content.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Content updated!' });
        });

    });
})

// delete the content with this id
.delete(function(req, res) {
    Content.remove({
        _id: req.params.content_id
    }, function(err, content) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

//=============================================================================
// on routes that end in /rolecategory
// ----------------------------------------------------

router.route('/rolecategory')

// create a roleCategory (accessed at POST http://localhost:8080/roleCategory)
.post(function(req, res) {

    var roleCategory = new RoleCategory();
    roleCategory.categoryId = req.body.categoryId;
    roleCategory.roleId = req.body.roleId;

   

    // set the roleCategory name (comes from the request)
    roleCategory.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Role Category created!' });
    });


})

// get all the roleCategory (accessed at GET http://localhost:8080/api/roleCategory)
.get(function(req, res) {
    RoleCategory.find(function(err, roleCategory) {
        if (err)
            res.send(err);

        res.json(roleCategory);
    });
});

// on routes that end in /rolecategory/:rolecategory_id
// ----------------------------------------------------
router.route('/rolecategory/:rolecategory_id')

// get the category with that id
.get(function(req, res) {
    RoleCategory.findById(req.params.roleCategory_id, function(err, roleCategory) {
        if (err)
            res.send(err);
        res.json(roleCategory);
    });
})

// update the rolecategory with this id
.put(function(req, res) {
    RoleCategory.findById(req.params.roleCategory_id, function(err, roleCategory) {

        if (err)
            res.send(err);

        roleCategory.categoryId = req.body.categoryId;
        roleCategory.roleId = req.body.roleId;
        
        roleCategory.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'RoleCategory updated!' });
        });

    });
})

// delete the role category with this id
.delete(function(req, res) {
    RoleCategory.remove({
        _id: req.params.roleCategory_id
    }, function(err, roleCategory) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});



//=============================================================================
// on routes that end in /rolecategory
// ----------------------------------------------------

router.route('/contentcategory')

// create a contentcategory (accessed at POST http://localhost:8080/contentcategory)
.post(function(req, res) {

    var contentCategory = new ContentCategory();
    contentCategory.categoryId = req.body.categoryId;
    contentCategory.contentId = req.body.contentId;

   

    // set the content category name (comes from the request)
    contentCategory.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Content Category created!' });
    });


})

// get all the content category (accessed at GET http://localhost:8080/api/contentcategory)
.get(function(req, res) {
    ContentCategory.find(function(err, contentCategory) {
        if (err)
            res.send(err);

        res.json(contentCategory);
    });
});

// on routes that end in /contentcategory/:contentcategory_id
// ----------------------------------------------------
router.route('/contentcategory/:contentcategory_id')

// get the content category with that id
.get(function(req, res) {
    ContentCategory.findById(req.params.contentCategory_id, function(err, contentCategory) {
        if (err)
            res.send(err);
        res.json(contentCategory);
    });
})

// update the contentcategory with this id
.put(function(req, res) {
    ContentCategory.findById(req.params.contentCategory_id, function(err, contentCategory) {

        if (err)
            res.send(err);

        contentCategory.categoryId = req.body.categoryId;
        contentCategory.contentId = req.body.contentId;
        
        contentCategory.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Content Category updated!' });
        });

    });
})

// delete the role category with this id
.delete(function(req, res) {
    ContentCategory.remove({
        _id: req.params.contentCategory_id
    }, function(err, contentCategory) {
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
