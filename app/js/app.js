angular.module('quizz', ['ngRoute', 'security'])

.config(function($routeProvider){

	$routeProvider
	.when('/login', {templateUrl: 'partials/login.html'})
	.when('/questions/:id', {templateUrl: 'partials/questions.html', controller: 'question'})
	.when('/results', {templateUrl: 'partials/results.html'})

	.otherwise({ redirectTo: '/login' });
})

.run(function($rootScope, $location, Security){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if(!Security.isLogged()){
			$location.path('/login');
			return;
		}
	});
})

.factory('responses', [function () {
	return {
		responses: {}
		,addResponse: function(response){
			this[response.id] = response;
		}

	};
}])

.controller('main', function($scope, $location, Security, $http){

	$scope.questions = [];
	$scope.currentQuestion = {};

	$http.get("/quizz/questions").then(function(results){
		for(var i=0; i<results.data.length; i++){
			$scope.questions.push({compteur: i, question: results.data[i]});
		};
		$scope.currentQuestion = {
			compteur: $scope.questions[0].compteur
			,question:  $scope.questions[0].question
		};
	});

	$scope.register = function(){
		Security.login($scope.login.email, $scope.login.password);
		$location.url('/questions/'+$scope.currentQuestion.compteur);
	};

	$scope.continue = function(){
		if($scope.currentQuestion.compteur >= $scope.questions.length-1){
			$location.url('/results');
			return;
		}
		var index = +$scope.questions[$scope.currentQuestion.compteur].compteur +1;
		$location.url('/questions/'+index);
	};

	$scope.logout = function(){
		Security.logout();
	};
})

.controller('question', function($scope, $routeParams){
	var lQuestion = $scope.questions[$routeParams.id].question;
	$scope.currentQuestion.compteur = $routeParams.id;
	$scope.currentQuestion.question = lQuestion;
});