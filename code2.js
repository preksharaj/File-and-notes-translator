var fs = require('fs');
var googleTranslate = require('google-translate')('AIzaSyAuTf1csdpQoR_iS_srkGApLQidSisVZB0');

//the regex, which still needs to be refined. It is now matching 0 or more '#' followed by 0 or more white spaces
var search = /#*\s*/;

fs.readFile('file.txt', function(err, data) {
    if (err) throw err;
    //I changed the "\n" to "\r\n", because I noticed our lines had "\r" attached to them
    var lines = data.toString().split("\r\n");

    //I'm making heavy use of the Array map method. This saves a lot of time and makes for cleaner code when what you want is to build one array from another.

    var splitLines = lines.map(function(line){
      // if we search for pattern on a string, javascript will only return the beginning of that pattern, but we actually want the end.
      // so instead, we'll get the matched substring, and use its length to divide the line
      var lineFormat = line.match(search)[0]; //gets the substring matched by the RegEx
      var lineContent = line.substr(lineFormat.length, line.length); //a substring from the length of the matched pattern to the end of the line
      return [lineFormat, lineContent];
    });

    //this is an array that has only the "content" side of the lines.
    var content = splitLines.map(function(line){
      return line[1];
    });

    //Now instead of using googleTranslate inside a loop, we pass it an array, and it will return an array of translated terms in the same order.
    //Also, we should always pass the source language, to avoid potential confusions.
    googleTranslate.translate(content,"en", "es", function(error, translation) {
        if (!error) {
            // translation will be an array of objects. With this map operation we extract an array of texts.
            var translatedContent = translation.map(function(line){
              return line.translatedText;
            });

            //the splitLines array is still visible. Now we pass two arguments to map: 'line' is the element of the array, and 'i' is its index
            var translatedLines = splitLines.map(function(line,i){
              return line[0] + translatedContent[i]; //returns a string: the original format portion and the translated content.
            });

            //the 'join' method of Arrays is the oposite of 'split' method of Strings. It will concatenate the array into a string, intercalating the argument (in this case '\r\n')
            reconstructedFile = translatedLines.join('\r\n');

            console.log(reconstructedFile);
        }

    });

});
