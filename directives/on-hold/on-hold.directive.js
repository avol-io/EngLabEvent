(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .directive('onHold', onHold);

  /* @ngInject */
  function onHold() {
    var directive = {
      restrict: 'A',

      scope: {
        esegui: '=',

      },
      link: linkFunction,

    };

    return directive;



    function linkFunction($scope, $elm, $attr, ctrl) {

      $elm[0].onmousedown = function(evt) {
        $scope.longPress = true;
        setTimeout(function() {
          if ($scope.longPress) {
            $scope.$apply($scope.esegui());
            $scope.longPress = false;
          }

        }, 600);
      }
      $elm[0].onmouseup = function(evt) {
        $scope.longPress = false;
      };
    }
  }

})();
