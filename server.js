var express = require('express');
var mongoose = require('mongoose');

// var social = require('social-cms-backend');
var app = new express();


// var SCB = require('social-cms-backend');

mongoose.connect('mongodb://localhost/quizz');

// Distribution de l'app
app.use('/', express.static(__dirname + '/app'));

/*app.use(social({
  mongodb_url: 'mongodb://localhost:27017/socialcmsdb',
  passport_strategy: 'facebook',
  facebook_app_id: process.env.FACEBOOK_APP_ID,
  facebook_app_secret: process.env.FACEBOOK_APP_SECRET
}));*/

//	SCB.middleware());

// ------------- API ---------------------------------------

// Question Model

var QuestionSchema = new mongoose.Schema({
type: String
,label: String
,answers: [{id: String
		, text: String
		, right:Boolean}
		]
});

var Question = mongoose.model('questions', QuestionSchema);

app.get('/quizz/questions', function(req, res){

	Question.find({}, function(err, docs){
		res.json(docs);
	});

});

// ------------- FIN API ---------------------------------------


app.listen(3000);
