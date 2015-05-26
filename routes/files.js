/**
 * Created by james on 5/26/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (err, res){
   var message = {};
    message.success = 0;
    message.data = {};
    message.data.message = 'no product guid provided';

    res.send(message);
});

router.get('/:guid', function(err, res){
   var message = {};
    message.success = 0;
    message.data = {};
    message.data.message = 'no product version provided';

    res.send(message);
});

router.get('/:guid/:version', function(err, res){
    var message = {};
    message.success = 1;
    message.data = {};
    message.data.files = {};

    res.send(message);
});

router.get('/:guid/:version/:filename', function(err, res){
    //download files
});

module.exports = router;