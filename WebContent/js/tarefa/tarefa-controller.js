(function(){
	'use strict';
	
	angular.module("tarefas").controller("TarefaController",Controller);
	
	Controller.$inject = ["lowercaseFilter", "TarefaFactory", "toaster"];
	
	function Controller(lc, tarefaFactory, toaster){
		var self = this;
		
		self.tarefa = {};
		
		self.tarefas = [];
		
		self.pesquisa = "";
		
		function init(){
			self.pesquisar();
		}
		
		self.novaTarefa = function(){
			self.tarefa = {};
		};
		
		self.salvarTarefa = function(tarefa){
			tarefa.descricao = lc(tarefa.descricao);
			if(tarefa.id){
				editarTarefa(tarefa);
			} else{
				incluirTarefa(tarefa);
			}
		};
		
		function incluirTarefa(tarefa){
			tarefaFactory.save(tarefa).then(function(result){
				self.tarefas.push(result.data);				
				self.novaTarefa();
				toaster.pop({
					type: result.status,
					title: "Aviso",
					body: result.mensagem
				});
			});
		}
		
		function editarTarefa(tarefa){
			// atualiza no servico
			tarefaFactory.update(tarefa.id, tarefa).then(function(result){
				// atualiza na lista
				var pos = -1;
				angular.forEach(self.tarefas,function(item,index){
					if(result.data.id == item.id){
						pos = index;
					}
				});
				if(pos > -1){
					self.tarefas.splice(pos,1,result.data);
				}
				self.novaTarefa();
				toaster.pop({
					type: result.status,
					title: "Aviso",
					body: result.mensagem
				});
			});
		}
		
		self.removerTarefa = function(tarefa){
			tarefaFactory.remove(tarefa.id).then(function(result){
				var pos = -1;
				angular.forEach(self.tarefas,function(item,index){
					if(result.data.id == item.id){
						pos = index;
					}
				});
				if(pos > -1){
					self.tarefas.splice(pos,1);
				}
				toaster.pop({
					type: result.status,
					title: "Aviso",
					body: result.mensagem
				});
			});
		}
		
		self.selecionarTarefa = function(tarefa){
			tarefaFactory.getById(tarefa.id).then(function(result){
				self.tarefa = result.data;
			});
		}
		
		self.pesquisar = function(){
			tarefaFactory.search(self.pesquisa).then(function(result){
				self.tarefas = result.data || [];
			});
		}
		
		init();
	}
})();