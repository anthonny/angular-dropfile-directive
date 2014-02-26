'use strict';
describe('Drop file Directive', function () {
	
	var element;
	var $scope;
	var listTest=[];

	// Load aql.asciidoc module
	beforeEach(module('aql.directives.dropfile'));

	function compileDirective(html) {
        inject(function($compile) {
            var element = $compile(html)($scope);
        });
        // $digest is necessary to finalize the directive generation
        $scope.$digest();
    }

	//
	beforeEach(inject(function ($compile, $rootScope) {
		$scope = $rootScope.$new();
		$scope.checked=false;

		$scope.onDragEnter = function(event) {
			$scope.checked = true;
		}
		$scope.onDragOver = function(event) {
			$scope.checked = true;
		}
		$scope.onDragLeave = function(event) {
			$scope.checked = true;
		}
		$scope.onDrop = function(event) {
			$scope.checked = true;
		}


		element = angular.element('<div dropfile data-ng-model="fileContent" '+ 
			'on-drag-enter="onDragEnter(event)" '+
			'on-drag-over="onDragOver(event)" '+
			'on-drag-leave="onDragLeave(event)" '+
			'on-drop="onDrop(event)"></div>');
		$compile(element)($scope);

	}));

	it('should trigger onDragEnter' , function (done) {	
		element.trigger('dragenter');
		waitsFor(function() {
				return $scope.checked;
			}, 'fail to execute onDragEnter', 20);
	});

	it('should trigger onDragOver' , function (done) {	
		element.trigger('dragover');
		waitsFor(function() {
				return $scope.checked;
			}, 'fail to execute onDragOver', 20);
	});

	it('should trigger onDragLeave' , function (done) {	
		element.trigger('dragleave');
		waitsFor(function() {
				return $scope.checked;
			}, 'fail to execute onDragLeave', 20);
	});

	it('should trigger ondrop' , function (done) {	

		// "drop" event.
		var event = jQuery.Event('drop');
		event.dataTransfer={
			files: {}
		};

		var fileContent;
		FileReader.prototype.readAsText = function(file) {
			fileContent='content';
		};
		FileReader.prototype.onload = function(event) {
			$scope.fileContent = fileContent;
		};

		element.trigger(event);
		waitsFor(function() {
				return $scope.checked;
			}, 'fail to execute onDrop', 20);

		expect($scope.fileContent).toBe(fileContent);
	});
});