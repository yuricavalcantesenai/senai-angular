(function(){
	'use strict';
	
	angular.module("tarefas").filter("capitalize", Filter);
	
	Filter.$inject = ["uppercaseFilter", "lowercaseFilter"];
	
	function Filter(uc, lc) {
		return function(input){
			var regexp = new RegExp(/([a-zA-Z0-9])([a-zA-Z0-9]*)/);
			var output = [];
			var match;
			while(match = regexp.exec(input)){
				output.push(uc(match[1])+lc(match[2]));
				input = input.replace(match[0],"");
			}
			return output.join(" ");
		};
	}
})();