var app = angular.module('starter.controllers', []);

app.controller('mainCtrl',function($scope){

	//2 test case
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
		},
		{
			type:"polygon",
			path:$scope.testPath1,
		}
	];

	//load localStorage
	if(localStorage.getItem('storedAreas') != $scope.areas && (localStorage.getItem('storedAreas') != null)){
		$scope.areas = localStorage.getItem('storedAreas');
	}
	localStorage.setItem('storedAreas', JSON.stringify($scope.areas));

	$scope.add = function(){
		$scope.areas.push({type:"polygon",path:""});
		localStorage.setItem('storedAreas', JSON.stringify($scope.areas));
	}

	$scope.textAreas = [];
	$scope.stringifyPath = function(index){
		$scope.textAreas[index] = JSON.stringify($scope.areas[index]); 

	}

	$scope.removeArea = function(index){
		$scope.areas.splice(index,1);
	}

	$scope.isValidJson = function(json) {
		try {
	        JSON.parse(json);
	        return true;
	    } catch (e) {
	        return false;
	    }
	}
   	$scope.checkInput = function(index){

   		if(!$scope.isValidJson($scope.textAreas[index])){
   			document.getElementById("textareaId"+index).style.color = "red";
   		}else{
   			document.getElementById("textareaId"+index).style.color = "black";
   			//reflect the change to the map
   			//store it in localStorage
   			console.log($scope.textAreas[index]);
   			//parse it back
   			$scope.areas[index] = JSON.parse($scope.textAreas[index]);
   			//need two way binding for the path
   		}	
   	}
});