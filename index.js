var express = require('express');
var parser = require('body-parser');
var app = express();

var dbHandle = require('./dbHandle');

app.set('port', (process.env.PORT || 80));

app.use(express.static('htdocs'));
app.use(parser.json());
app.get('/db(/*)?', dbHandle.get);
app.post('/db(/)?', dbHandle.post);
app.listen(app.get('port'), function() {
    console.log('Running on port', app.get('port')); 
});
