(function(){
	'use strict';
	
	angular.module("tarefas").directive("dateFormat", Directive);
	
	Directive.$inject = [];
	
	function Directive(){
		return {
			restrict : 'A',
			link: function(scope, element, attrs, controller){
				element.on('keyup', function(e){
					if(e.which >= 48 && e.which <= 57){
						console.log("keyup");
					}
				});
			}
		};
	}
})();
