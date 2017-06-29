var app = angular.module('starter.controllers', []);

app.controller('mainCtrl',function($scope){

	//2 test cases
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
	

	//load localStorage
	if(localStorage.getItem('storedAreas123') != null){
		$scope.areas = JSON.parse(localStorage.getItem('storedAreas123'));
	}else{
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
		localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
	}
	//Array that stores boolean if GeoJSON is showing
	$scope.showGeoJSON = [];
	//Array that stores stringified info
	$scope.textAreas = [];
	$scope.areas.forEach(function(e){
		if(e.path == "[[0,0]]") {
			e.path = "";
		}
		$scope.textAreas.push(JSON.stringify(e));
		$scope.showGeoJSON.push(false);
	});

	$scope.changeShowGeoJSON = function(index){
		$scope.showGeoJSON[index] = !$scope.showGeoJSON[index];
	}

	$scope.add = function(){
		$scope.areas.push({type:"polygon",path:"[[0,0]]"});
		$scope.textAreas.push(JSON.stringify({type:"polygon",path:""}));
		localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
		$scope.showGeoJSON.push(false);
	}

	$scope.removeArea = function(index){
		$scope.areas.splice(index,1);
		$scope.textAreas.splice(index,1);
		localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
		$scope.showGeoJSON.splice(index,1);
	}

	$scope.isValidJson = function(json) {
		try {
	        var jsonObj = JSON.parse(json);
	        if (jsonObj.path == "") return true;
	        new Array(JSON.parse(jsonObj.path));
	        return true;
	    } catch (e) {
	        return false;
	    }
	}

   	$scope.checkInput = function(index){
   		let temp = $scope.textAreas[index];
   		temp = temp.replace(/\s/g,"");
   		console.log(temp);
   		if(!$scope.isValidJson(temp)){
   			document.getElementById("textareaId"+index).style.color = "red";
   		}else{
   			document.getElementById("textareaId"+index).style.color = "black";
   			$scope.areas[index] = JSON.parse(temp);
   			if($scope.areas[index].path == "") {
   				$scope.areas[index].path = "[[0,0]]";
   			}
   			localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
   		}	
   	}
});