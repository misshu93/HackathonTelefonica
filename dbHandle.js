var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackathon');
var db = mongoose.connection;

db.once('open', function(c) {
    console.log("Successfully connected!");
});

var pvpcSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    
    pvpc: Number,
    pvpc2P: Number,
    pvpcCar: Number
});
var pvpcHour = mongoose.model('pvpcSchema', pvpcSchema);

var retrieve = function(input, res) {
    switch(input.length) {
    case 0:
	pvpcHour.find({}, function(e, data){
	    res.send(JSON.stringify(data));
	});
	break;
    case 1:
	pvpcHour.find({
	    year: input[0]
	}, function(e, data){
	    res.send(JSON.stringify(data));
	});
	break;
    case 2:
	pvpcHour.find({
	    year: input[0],
	    month: input[1]
	}, function(e, data){
	    res.send(JSON.stringify(data));
	});
	break;
    case 3:
	pvpcHour.find({
	    year: input[0],
	    month: input[1],
	    day: input[2]
	}, function(e, data){
	    res.send(JSON.stringify(data));
	});
	break;
    case 4:
	pvpcHour.findOne({
	    year: input[0],
	    month: input[1],
	    day: input[2],
	    hour: input[3]
	}, function(e, data){
	    res.send(JSON.stringify(data));
	});
	break;
    default:
	res.send("Something went wrong! :(");
    };
};

var get = function(req, res) {
    var input = req.url.split('/');
    input.splice(0, 2);
    if(input[input.length-1] == ""){ input.pop() };
    retrieve(input, res);
};
var post = function(req, res) {
    if(req.body.year
       && req.body.month
       && req.body.day
       && req.body.hour) {
	var thisHour = new pvpcHour({
	    year: req.body.year,
	    month: req.body.month,
	    day: req.body.day,
	    hour: req.body.hour,

	    pvpc: req.body.pvpc,
	    pvpc2P: req.body.pvpc2P,
	    pvpcCar: req.body.pvpcCar
	});
	thisHour.save(function(e, data) {
	    res.send("{success: 1}");
	});
    } else { res.send("{success: 0}") };
};

module.exports.retrieve = retrieve;
module.exports.get = get;
module.exports.post = post;
