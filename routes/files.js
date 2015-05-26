/**
 * Created by james on 5/26/15.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res){
   var message = {};
    message.success = 0;
    message.data = {};
    message.data.message = 'no product guid provided';

    res.send(message);
});

router.get('/:guid', function(req, res){
   var message = {};
    message.success = 0;
    message.data = {};
    message.data.message = 'no product version provided';

    res.send(message);
});

router.get('/:guid/:version', function(req, res){
    var message = {};
    message.success = 1;
    message.data = {};

    fs.readdir('./data/files/' + req.params.guid + '/' + req.params.version, function(err, files){
        if(err)
        {
            message.success = 0;
            message.data.message = 'error reading directory';

            res.send(message);
        }
        else
        {
            message.data.files = files;

            res.send(message);
        }
    });
});

router.get('/:guid/:version/:filename', function(req, res){
    fs.realpath('./data/files/' + req.params.guid + '/' + req.params.version + '/' + req.params.filename, function(err, path){
        if(err)
        {
            var message = {};
            message.success = 0;
            message.data = {};
            message.data.message = 'error downloading file';
        }
        else
        {
            res.download(path);
        }
    })
});

module.exports = router;