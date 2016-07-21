(function () {
  "use strict";
 
  var walk = require('walk')
    , fs = require('fs')
  ,fs = require('fs-extra')
  ,path = require('path')
  ,googleTranslate = require('google-translate')('AIzaSyAuTf1csdpQoR_iS_srkGApLQidSisVZB0')
 , walker
    ;
 
    fs.mkdir("libx",function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log('created');
            }
       });
    var search = /#*\s*/;
  walker = walk.walk('./notes');
 
 walker.on("directories", function (root, dirStatsArray, next) {
   console.log(dirStatsArray);
     dirStatsArray.forEach(function(dir,i){
         console.log(dir.name);
         var file1=path.join(__dirname, "notes", dir.name);
         var file2=path.join(__dirname, "libx", dir.name);
    
    fs.mkdirs('libx/'+dir.name, function (err) {
  if (err) return console.error(err);
  console.log("success!")
});
 
     

         
         console.log(file2);
         var files = fs.readdirSync(file1);

files.forEach(function(fileName, i) {

    var file = path.join(file1, fileName);

    fs.readFile(file, 'utf-8', function(error, content) {
         fs.writeFile('libx/'+dir.name+'/'+fileName+'.txt', content, function(err){
            if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
        } );


    });   // console.log(content);
          //fs.readFile(file, 'utf-8', function(error, content) {
           //   console.log(content);
    });

         
    next();
         
  });
     
    
 });
 
  walker.on("errors", function (root, nodeStatsArray, next) {
    next();
  });
 
  walker.on("end", function () {
    console.log("all done");
  });
}());