var foodieApp = angular.module('foodieApp',['ngRoute']);
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id',{
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
});

foodieApp.controller('mainController',function($scope) {
	$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		id:'1',

	},

	{
		name: 'Gourmet Nine',
		address: '38/39, Level 1, Block A, Connaught Place',
		location: 'Connaught Place',
		category: 'Fine Dining, Bar',
		vote: '4.8',
		cuisines: 'Modern Indian, Italian',
		cost: '1200',
		hours: '11 Noon to 1 AM (Mon-Sun)',
		image: 'download.jpg',
		id: '2',
	},

	{
	name: 'Saffon ',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.0',
	cuisines: 'Modern Indian',
	cost: '2300',
	hours: '12 Noon to 1 AM (Mon-Sun)',

	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},

	{
	name: 'A1 Punjabi Food Dhaba ',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.1',
	cuisines: 'Modern Indian',
	cost: '900',
	hours: '12 Noon to 1 AM (Mon-Sun)',

	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
}];
})

foodieApp.controller('loginController',function($scope,$location) {

	$scope.goToHome = function() {
		console.log($location.url('home'));
		$location.url('home');
	}

})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		id:'1',
		bestDish: {
			name: 'Corn Pizza',
			image: 'http://www.hindimeaning.com/pictures/fruits/banana.jpg?x47669'
		}
	},

	{
		name: 'Gourmet Nine',
		address: '38/39, Level 1, Block A, Connaught Place',
		location: 'Connaught Place',
		category: 'Fine Dining, Bar',
		vote: '4.8',
		cuisines: 'Modern Indian, Italian',
		cost: '1200',
		hours: '11 Noon to 1 AM (Mon-Sun)',
		image: 'download.jpg',
		id: '2',
		bestDish: {
			name: 'Spinach Dimsums',
			image: 'http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_3377_StockFood-00193424cut.jpg'
		}
	},

		{
			name: 'saffon',
			address: '38/39, Level 1, Block A, Connaught Place',
			location: 'Connaught Place',
			category: 'Fine Dining, Bar',
			vote: '4.0',
			cuisines: 'Modern Indian, Italian',
			cost: '900',
			hours: '11 Noon to 1 AM (Mon-Sun)',
			image: 'download.jpg',

			bestDish: {
				name: 'Spinach Dimsums',
				image: 'http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_3377_StockFood-00193424cut.jpg'
			}
		},
		{
			name: 'Farzi Cafe',
			address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
			location: 'Connaught Place',
			category: 'Casual Dining, Bar',
			vote: '4.1',
			cuisines: 'Modern Indian',
			cost: '2200',
			hours: '12 Noon to 1 AM (Mon-Sun)',
			image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',

			bestDish: {
				name: 'Corn Pizza',
				image: 'http://www.hindimeaning.com/pictures/fruits/banana.jpg?x47669'
			}


	}];
	$scope.restaurant = restaurants[$routeParams.id - 1];
	$scope.getIngredients = function(url) {
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key b19c326c5f07417ea4aad597ac173c81',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function (response) {
				console.log(response);
				var ingredients = response.data.outputs[0].data.concepts;
	  			for (var i =0;i<ingredients.length;i++) {
	  				$scope.ingredients.push(ingredients[i].name);
	  				$scope.probabilityvalue.push(ingredients[i].value);
	  			}


	        }, function (xhr) {
	        	console.log(xhr);
	        })
		}

		$scope.ingredients = [];
		$scope.probabilityvalue=[];

		$scope.checkVegorNonVeg = function() {
			var flag_quit =0;
			ing_list = angular.copy($scope.ingredients); //hard copy
			prob_value= $scope.probabilityvalue;
			var elements = prob_value.filter(function(a){return a > 0.85;});
			ing_list.splice(elements.length,20);
			var nonveg = ["egg","meat","bacon","chicken","sushi","pork","steak"];
			var additionnonveg = "<div><img src='http://21425-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2013/05/non-veg-300x259.jpg' class='vegnonveg' ></div>"
			var additionveg = "<div><img src='http://21425-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2013/05/veg-300x259.jpg' class='vegnonveg' ></div>"

			for(j=0;j<ing_list.length;j++){
				for(i=0;i<nonveg.length;i++){
					if(ing_list[j] == nonveg[i]){
						flag_quit=1;
						break;
					}
				}
			if(flag_quit==1){
				$(".rest-extra").append(additionnonveg);
				break;
			}

		}
		if(flag_quit==0){$(".rest-extra").append(additionveg);}
	}

});
