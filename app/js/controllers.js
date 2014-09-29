'use strict';

/* Controllers */


var myAppControllers = angular.module('myApp.controllers', [])

myAppControllers.controller('baseCtrl', ['$scope', 'boardSrv', function($scope, boardSrv){
  $scope.boardSrv = boardSrv;

  $scope.selectBoard = function(board){
    boardSrv.setSelectedBoard(board);
  };

  $scope.isSelected = function(board){
    return boardSrv.selectedBoard == board;
  };

  $scope.editBoard = function(board){
    boardSrv.setEditBoard(board);
  };

  $scope.doneEditBoard = function(board){
    boardSrv.setDoneEditBoard(board);
  };

  $scope.removeBoard = function(){
    boardSrv.removeBoard();
  };

  $scope.addBoard = function(board){
    boardSrv.addBoard(board);
  };

  // ----- NOTE ------

  $scope.addNote = function(e){
    boardSrv.addNote(e);
  };

  $scope.removeNote = function(note){
    boardSrv.removeNote(note);
  };

  // ----- MODAL ------

  $scope.toggleModal = function(){
    boardSrv.toggleModal();
  };

  $scope.toggleDeleteModal = function(board){
    boardSrv.toggleDeleteModal(board);
  };

}]);
