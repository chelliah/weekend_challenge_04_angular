var express = require('express');
var path = require('path');
var bodyParser =require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');
var postSchema = require('../modules/post');
var Schema = mongoose.Schema;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded : true}));


var Post = mongoose.model('Post', postSchema);

router.post('/data',function(req,res){
    console.log(req.body);
    var addedPost = new Post({
        'name': req.body.userName,
        'title': req.body.postTitle,
        'text': req.body.postContent,
        'date': req.body.date
    });
    addedPost.save(function(err,data){
        if(err){
            console.log("There was an error posting data", err)
        }
        res.send(data);
    })
});

router.get('/data', function(req,res){
    Post.find({},function(err,data){
        if(err){
            console.log("There was an error retrieving data", err)
        }
        res.send(data);
    })
});

router.get('/*', function(req,res){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname,"../public",file))
});

module.exports = router;