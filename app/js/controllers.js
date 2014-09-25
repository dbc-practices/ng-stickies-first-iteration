'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('baseCtrl', ['$scope', function($scope){
    $scope.boards = [
      { name: 'board 1',
        editing: false,
        notes: [
          { x: 50, y: 50, content: "this is sample note number 1"},
          { x: 300, y: 300, content: "sample note number 2 bla bla bla"}
        ]
      },
      { name: 'board 2',
        editing: false,
        notes: [
          { x: 50, y: 100, content: "sample note 1 on board 2"},
          { x: 200, y: 200, content: "board 2 note 2"}
        ]
      },
      { name: 'board 3',
        editing: false,
        notes: [{ x: 50, y: 50, content: "this is new note"}]
      }
    ];

    $scope.selectedBoard = $scope.boards[0];

    // ---------- BOARD ---------------
    $scope.selectBoard = function(board){
      $scope.selectedBoard = board;
    }

    $scope.editBoard = function (board) {
      board.editing = true;
    };

    $scope.doneEditing = function(board) {
      board.editing = false;
    }

    $scope.removeBoard = function(board) {
      $scope.boards.splice($scope.boards.indexOf(board), 1)
    }

    $scope.addBoard = function(board) {
      $scope.boards.push({  name: "new board", 
                            editing: false, 
                            notes: [{ x: 0, y: 0, content: "new note"}]
                          });
    }

    // ---------- NOTE ---------------
    $scope.addNote = function(e){
      // add note only when board is clicked,
      // dblclicking note shouldn't add new note
      if (e.target == e.currentTarget){  
        var newNote = { x: e.offsetX,
                        y: e.offsetY, 
                        content: "new note!"}
        $scope.selectedBoard.notes.push(newNote)
      }
    }

    $scope.removeNote = function(note){
      $scope.selectedBoard.notes.splice($scope.selectedBoard.notes.indexOf(note), 1)
    }
  }]);
