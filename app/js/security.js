angular.module('security', [])
.factory('Security', function($rootScope){

	$rootScope.login = {
		registered : true // temp for tests
	};

	return {
				login: function(email, password){
					$rootScope.login = {
						email: email
						,password: password
						,registered : true
					};
				}
				,logout: function(){
					$rootScope.login = {};
				}
				,isLogged : function(){
					return $rootScope.login.registered;
				}
	};
});