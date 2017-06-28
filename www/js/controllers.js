var app = angular.module('starter.controllers', []);

app.controller('mainCtrl',function($scope){

	$scope.showGeoJSON = [];
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
			
	//$scope.testPathString = JSON.stringify($scope.testPath);


	$scope.testPath1 = [
			            [
			              
			              40.746736760718505,-73.98948669433594
			            ],
			            [
			              
			              40.706148461723764,-74.01369094848633
			            ],
			            [
			              
			              40.7375024965684,-73.98056030273438
			            ],
			            [
			              
			              40.746736760718505,-73.98948669433594
			            ]
			        ];
	$scope.areas = [
		{
			type:"polygon",
			path:$scope.testPath,
			removed:false
		}
		// ,
		// {
		// 	type:"polygon",
		// 	path:$scope.testPath1,
		// 	removed:false
		// }
	];
	localStorage.setItem('storedAreas', JSON.stringify($scope.areas));

	$scope.add = function(){
		$scope.areas.push({type:"polygon",path:"",removed:false});
		localStorage.setItem('storedAreas', JSON.stringify($scope.areas));
		//$scope.areas = localStorage.getItem('storedAreas');
	}

	$scope.textAreas = [];
	$scope.stringifyPath = function(index){
		$scope.textAreas[index] = JSON.stringify($scope.areas[index]); 

	}
	$scope.removeArea = function(index){
		$scope.areas[index].removed = true;
	}

	$scope.isValidJson = function(json) {
		try {
	        JSON.parse(json);
	        return true;
	    } catch (e) {
	        return false;
	    }
	}
	
});