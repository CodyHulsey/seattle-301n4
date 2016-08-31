var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('<strong>LMAO I beat JR 21-3</strong>')
});

app.listen(8080, function() {
  console.log('server is running');
})

//
