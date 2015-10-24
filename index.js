var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(express.static('htdocs'));

app.listen(app.get('port'), function() {
    console.log('Running on port', app.get('port')); 
});
