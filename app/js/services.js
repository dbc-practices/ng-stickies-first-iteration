'use strict';

/* Services */

var myAppServices = angular.module('myApp.services', [])

myAppServices.service('boardSrv', [function(){

  this.boards = [
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

  // ---------- BOARD ---------------
  this.selectedBoard = this.boards[0];
  this.boardToDelete = null;

  this.setSelectedBoard = function(board) {
    this.selectedBoard = board;
  };

  this.setEditBoard = function (board) {
    board.editing = true;
  };

  this.setDoneEditBoard = function(board) {
    board.editing = false;
  };

  this.removeBoard = function() {
    this.boards.splice(this.boards.indexOf(this.boardToDelete), 1)
    if (this.boardToDelete == this.selectedBoard)
      this.selectedBoard = this.boards[0]
    this.deleteModalShown = false;
  };

  this.addBoard = function(board) {
    this.boards.push({  name: "new board", 
                          editing: false, 
                          notes: [{ x: 0, y: 0, content: "new note"}]
                        });
  };

  // ---------- NOTE ---------------
  this.addNote = function(e){
    // add note only when board is clicked,
    // dblclicking note shouldn't add new note
    if (e.target == e.currentTarget){  
      var newNote = { x: e.offsetX,
                      y: e.offsetY, 
                      content: "new note!"}
      this.selectedBoard.notes.push(newNote)
    }
  }

  this.removeNote = function(note){
    this.selectedBoard.notes.splice(this.selectedBoard.notes.indexOf(note), 1)
  }

  // ---------- MODAL ---------------

  this.modalShown = false;

  this.toggleModal = function() {
    this.modalShown = !this.modalShown;
  };

  this.deleteModalShown = false;
  this.toggleDeleteModal = function(board){
    this.deleteModalShown = !this.deleteModalShown;
    this.boardToDelete = board;
  };

}]);
