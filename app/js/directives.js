'use strict';

/* Directives */

var myAppDirectives = angular.module('myApp.directives', [])

myAppDirectives.directive('ngDraggable', function($document) {
    return {
      restrict: 'A',
      scope: {
        dragInfo: '=ngDraggable'
      },
      link: function(scope, elem, attr) {
        var startX, startY, 
            x, y,
            inittialOffsetX = elem[0].offsetLeft,
            initialOffsetY = elem[0].offsetTop,
            // start, stop, drag, container,
            width  = elem[0].offsetWidth,
            height = elem[0].offsetHeight,
            noteInfo, 
            container = document.getElementById('board').getBoundingClientRect();
        
        // Obtain drag options
        if (scope.dragInfo) {
          noteInfo = scope.dragInfo
        }
        
      // Bind mousedown event
        elem.on('mousedown', function(e) {
          startX = e.clientX - elem[0].offsetLeft + inittialOffsetX - 15;
          startY = e.clientY - elem[0].offsetTop + initialOffsetY - 15;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        // Handle drag event
        function mousemove(e) {
          x = e.clientX - startX;
          y = e.clientY - startY;
          setPosition();
        }

        // Unbind drag events
        function mouseup(e) {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }

        // Move element, within container if provided
        function setPosition() {
          if (container) {
            if (x < 0) {
              x = 0;
            } else if (x > container.right - width*2.9) {
              x = container.right - width*2.9;
            }
            if (y < container.top) {
              y = container.top;
            } else if (y > container.bottom - height*1.1) {
              y = container.bottom - height*1.1;
            }
          }
          elem.css({
            top: y + 'px',
            left:  x + 'px'
          });
          noteInfo.x = x;
          noteInfo.y = y;
        }
      }
    }
  });

myAppDirectives.directive("myContent", function(){
  return {
    restrict: "A",
    scope: { note: '=myContent' },
    link: function(scope, elem, attr) {
      elem.on('dblclick', function(e){
        elem[0].setAttribute("contenteditable", "true")
        elem[0].focus();
      })

      elem.bind("blur change", function(){
        scope.$apply(function(){
          scope.note.content = elem.html();
        })
        elem[0].removeAttribute("contenteditable")
      })
    }
  }
});

myAppDirectives.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '=show'
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: " <div class='ng-modal' ng-show='show'>" +
                  "<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
                  "<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
                    "<div class='ng-modal-dialog-content' ng-transclude></div>" +
                  "</div>" +
                "</div>"
  };
});
