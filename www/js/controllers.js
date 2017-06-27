var app = angular.module('starter.controllers', []);

app.controller('mainCtrl',function($scope){

	$scope.testPath = [
					    [
					      
					      40.75453936473234,-73.99188995361328
					    ],
					    [
					      
					      40.74413568925235,-73.99703979492188
					    ],
					    [
					     
					      40.74907763805906,-73.9760971069336
					    ],
					    [
					      40.75635984059143,-73.97506713867186
					      
					    ],
					    [
					      
					      40.75453936473234,-73.99188995361328
					    ]
					];
			
	$scope.testPathString = JSON.stringify($scope.testPath);
	$scope.areas = [
		{
			path:$scope.testPathString,
			deleted:false
		}
	];
	
});