angular.module("tarefas").controller("TarefaController",function(){
	this.tarefa = {};
	
	this.tarefas = [];
	
	this.novaTarefa = function(){
		this.tarefa = {};
	};
	
	this.salvarTarefa = function(tarefa){
		tarefa.id = new Date().getTime();
		this.tarefas.push(tarefa);
		this.novaTarefa();
	};
});