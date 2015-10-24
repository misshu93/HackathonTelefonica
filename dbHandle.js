var mongoose = require('mongoose');
// This is supposed to be localhost!
mongoose.connect('mongodb://10.0.14.139/hackathon');
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
    var result = []
    for(i in req.body) {
	if(req.body[i].year
	   && req.body[i].month
	   && req.body[i].day
	   && req.body[i].hour) {
	    var thisHour = new pvpcHour({
		year: req.body[i].year,
		month: req.body[i].month,
		day: req.body[i].day,
		hour: req.body[i].hour,

		pvpc: req.body[i].pvpc,
		pvpc2P: req.body[i].pvpc2P,
		pvpcCar: req.body[i].pvpcCar
	    });
	    thisHour.save(function(){
		result.push({success: 1});
	    });
	};
    } else { result.push({success: 0}); };
    res.send(JSON.stringify(result));
};

module.exports.retrieve = retrieve;
module.exports.get = get;
module.exports.post = post;
