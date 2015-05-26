/**
 * Created by james on 5/26/15.
 */
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('/home/james/git/MyUpdateServer/data/db/products.db');
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
    db.all('SELECT product_id, product_name FROM Products WHERE product_guid=?', req.params.guid, function(err, productRows){
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
            message.data.product_name = productRows[0].product_name;
            db.all('SELECT version_major, version_minor, version_revision FROM Version WHERE product_id=?', productRows[0].product_id, function(err, versionRows){
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
                   message.data.version.major = versionRows[0].version_major;
                   message.data.version.minor = versionRows[0].version_minor;
                   message.data.version.revision = versionRows[0].version_revision;

                   res.send(message);
               }
            });
        }
    })
});

module.exports = router;