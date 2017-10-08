angular.module('todoController', [])
	// se anade el servicio Todos a la app
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		// GET =====================================================================
		// al iniciar la app se muestran todos los Todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
		// CREATE ==================================================================
		//se crea el Todo
		$scope.createTodo = function() {
			// validar la info
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				Todos.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // limpia la forma
						$scope.todos = data; // actualiza la list de pendientes
					});
			}
		};
		// DELETE ==================================================================
		// se borra despues de checarlo
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // se actualiza la lista de pendientes
		};
	}]);