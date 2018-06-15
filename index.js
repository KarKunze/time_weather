var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.listen(port, function() {
  console.log('I am listening on port 3000!');
});
