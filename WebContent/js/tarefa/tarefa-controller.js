angular.module("tarefas").controller("TarefaController",function(){
	this.tarefa = {};
	
	this.tarefas = [];
	
	this.novaTarefa = function(){
		this.tarefa = {};
	};
	
	this.salvarTarefa = function(tarefa){
		if(tarefa.id){
			editarTarefa(tarefa);
		} else{
			incluirTarefa(tarefa);
		}
	};
	
	function incluirTarefa(tarefa){
		tarefa.id = new Date().getTime();
		this.tarefas.push(tarefa);
		this.novaTarefa();
	}
	
	function editarTarefa(tarefa){
		var pos = -1;
		angular.forEach(this.tarefas,function(item,index){
			if(tarefa.id == item.id){
				pos = index;
			}
		});
		if(pos > -1){
			this.tarefas.splice(pos,1,this.tarefa);
			this.novaTarefa();
		}
	}
	
	this.removerTarefa = function(tarefa){
		var pos = -1;
		angular.forEach(this.tarefas,function(item,index){
			if(tarefa.id == item.id){
				pos = index;
			}
		});
		if(pos > -1){
			this.tarefas.splice(pos,1);
		}
	}
	
	this.selecionarTarefa = function(tarefa){
		this.tarefa = angular.copy(tarefa);
	}
});