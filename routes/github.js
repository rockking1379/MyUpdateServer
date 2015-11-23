/**
 * Created by James on 11/22/2015.
 */
var githubhook = require('githubhook');
var github = githubhook({'host':'update.codegeekhosting.me', 'port':3001});
var childProcess = require('child_process');

github.on('push', function(repo, ref, data){
    childProcess.exec('./hooks/post-receive');
    });

github.listen();