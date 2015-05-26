/**
 * Handles getting version of products
 * Created by james on 5/26/15.
 */
var sqlite3 = require('sqlite3');
var fs = require('fs');
var db;

fs.realpath('./data/db/products.db', function(err, path){
    if(err)
    {
        console.error('file path invalid');
    }
    else
    {
        db = new sqlite3.Database(path);
    }
});

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   var message = {};
    message.success = 0;
    message.data = {};
    message.data.message = 'no product guid provided';

    res.send(message);
});

router.get('/:guid', function(req, res){
    db.get('SELECT product_id, product_name FROM Products WHERE product_guid=?', req.params.guid, function(err, productRow){
        var message = {};
        message.success = 0;
        message.data = {};

        if(err)
        {
            message.success = 0;
            message.data.message = 'invalid product guid';

            res.send(message);
        }
        else
        {
            message.data.product_name = productRow.product_name;
            db.get('SELECT version_major, version_minor, version_revision FROM Version WHERE product_id=? ORDER BY version_major DESC, version_minor DESC, version_revision DESC', productRow.product_id, function(err, versionRow){
               if(err)
               {
                   message.success = 0;
                   message.data.messsage = 'database error occurred';

                   res.send(message);
               }
                else
               {
                   message.success = 1;
                   message.data.version = {};
                   message.data.version.major = versionRow.version_major;
                   message.data.version.minor = versionRow.version_minor;
                   message.data.version.revision = versionRow.version_revision;

                   res.send(message);
               }
            });
        }
    })
});

router.post('/', function(req, res){
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.files.file1));

    res.send('success');
});

module.exports = router;