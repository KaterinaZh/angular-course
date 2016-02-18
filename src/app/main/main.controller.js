(function () {
  'use strict';

  angular
    .module('angular-course')
    .controller('MainController', MainController)
    .directive('myRepeat', myRepeatDirective);

  /** @ngInject */
  function MainController($scope) {
    activate();

    function activate() {
      $scope.someText = "Hi";
      $scope.someHtml = "<div>This is a funny cat-roll</div>";
      $scope.array = [
        {src: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg", name: "first", num: 1},
        {name: "second", num: 2},
        {name: "third", num: 3}
      ];

      $scope.change = function () {
        if ($scope.someText === 'Hello Kitty') {
          $scope.array = [
            {
              src: "http://www.newyorker.com/wp-content/uploads/2014/08/Stokes-Hello-Kitty2-1200.jpg",
              name: "Kitty waves",
              num: 1
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4leDwXg0fowwyEYZm-hbiGQHM2vbjLX_FZwWrTXEnnEhcNf-HA",
              name: "Kitty flies",
              num: 2
            },
            {
              src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTUyyBgZWrogM0rak9w6f2X-SPV5peZGqr3t0zWCZTATnoRaJ_0",
              name: "Kitty on x-ray",
              num: 3
            }
          ];
          $scope.someHtml = '<div class="kitty">This is Hello Kitty!</div>';
        }
      };
    }
  }

  //of course that's not my code, but I found this solution and tried to understand :)
  function myRepeatDirective() {
    function link($scope, $element, $attr, controller, transclude) {
      var myLoop = $attr.myRepeat,
        match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
        indexString = match[1],
        collectionString = match[2],
        parent = $element.parent(),
        elements = [];

      // $watchCollection is called everytime the collection is modified
      $scope.$watchCollection(collectionString, function (collection) {
        var i, block, childScope;

        // check if elements have already been rendered
        if (elements.length > 0) {
          // if so remove them from DOM, and destroy their scope
          for (i = 0; i < elements.length; i++) {
            elements[i].el.remove();
            elements[i].scope.$destroy();
          }
          elements = [];
        }

        for (i = 0; i < collection.length; i++) {
          // create a new scope for every element in the collection.
          childScope = $scope.$new();
          // pass the current element of the collection into that scope
          childScope[indexString] = collection[i];

          transclude(childScope, function (clone) {
            // clone the transcluded element, passing in the new scope.
            parent.append(clone); // add to DOM
            block = {};
            block.el = clone;
            block.scope = childScope;
            elements.push(block);
          });
        }
      });
    }

    return {
      transclude: 'element',
      link: link
    };
  }
})();
