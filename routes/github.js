/**
 * Created by James on 11/22/2015.
 */
var childProcess = require('child_process');

var express = require('express');
var router = express.Router();

router.post('/', function (req, res){
   childProcess.exec('./hooks/post-receive');

    res.status(200);
    res.send();
});

module.exports = router;