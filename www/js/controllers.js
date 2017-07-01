var app = angular.module('starter.controllers', []);

app.controller('mainCtrl',function($scope){


	$scope.testJSON = {
						  "type": "Feature",
						  "properties": {},
						  "geometry": {
						    "type": "Polygon",
						    "coordinates": [
						      [
						        [
						          -73.9932632446289,
						          40.763381209080215
						        ],
						        [
						          -74.0035629272461,
						          40.7342506899291
						        ],
						        [
						          -73.99669647216797,
						          40.74205475883487
						        ],
						        [
						          -73.97815704345703,
						          40.746736760718505
						        ],
						        [
						          -73.94519805908203,
						          40.757400090129245
						        ],
						        [
						          -73.9932632446289,
						          40.763381209080215
						        ]
						      ]
						    ]
						  }
						}

	//load localStorage
	if(localStorage.getItem('storedAreas123') != null){
		$scope.areas = JSON.parse(localStorage.getItem('storedAreas123'));
	}else{
		$scope.areas = [];
		$scope.areas.push($scope.testJSON);
		localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
	}

	//Array that stores boolean if GeoJSON is showing
	$scope.showGeoJSON = [];
	//Array that stores stringified info
	$scope.textAreas = [];
	//Array that stores google path
	$scope.googlePath = [];
	//GeoJSON => Google Path
	$scope.translateCoordinates = function(json){

		let temp = angular.copy(json.geometry.coordinates[0]);
		temp.forEach(function(e,i){
			let t = temp[i][0];
			temp[i][0] = temp[i][1];
			temp[i][1] = t;
		});
		return temp;
	}
	console.log($scope.areas);
	$scope.areas.forEach(function(e){
		if(JSON.stringify(e.geometry.coordinates) == "[[[0,0]]]") {
			//e.geometry.coordinates = [[[0,0]]];
			var tempe = angular.copy(e);
			tempe.geometry.coordinates = [];
			$scope.textAreas.push(JSON.stringify(tempe));
		} else {
			$scope.textAreas.push(JSON.stringify(e));
		}
		
		$scope.showGeoJSON.push(false);
		$scope.googlePath.push($scope.translateCoordinates(e));
	});

	$scope.changeShowGeoJSON = function(index){
		$scope.showGeoJSON[index] = !$scope.showGeoJSON[index];
	}

	$scope.add = function(){
		$scope.areas.push({ "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[0,0]]] } });
		$scope.textAreas.push(JSON.stringify({ "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": "" } }));
		localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
		$scope.showGeoJSON.push(false);
		$scope.googlePath.push([[0,0]]);
	}

	$scope.removeArea = function(index){
		$scope.areas.splice(index,1);
		$scope.textAreas.splice(index,1);
		localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));
		$scope.showGeoJSON.splice(index,1);
		$scope.googlePath.splice(index,1);
	}

	$scope.isValidJson = function(json) {
		try {
	        var jsonObj = JSON.parse(json);
	        if (jsonObj.geometry.coordinates == "") return true;
	        new Array(jsonObj.geometry.coordinates[0]);
	        return true;
	    } catch (e) {
	        return false;
	    }
	}

   	$scope.checkInput = function(index){
   		let temp = $scope.textAreas[index];
   		temp = temp.replace(/\s/g,"");
   		if(!$scope.isValidJson(temp)){
   			document.getElementById("textareaId"+index).style.color = "red";
   		}else{
   			document.getElementById("textareaId"+index).style.color = "black";
   			$scope.areas[index] = JSON.parse(temp);
   			$scope.googlePath[index] = $scope.translateCoordinates($scope.areas[index]);
   			if($scope.areas[index].geometry.coordinates == "") {
   				$scope.areas[index].geometry.coordinates = "[[[0,0]]]";
   				$scope.googlePath[path] = [[0,0]];			
   			}
   			localStorage.setItem('storedAreas123', JSON.stringify($scope.areas));

   		}	
   	}
});