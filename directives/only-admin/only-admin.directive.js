(function(){
  'use strict';

  angular
    .module('engLabEvents')
    .directive('onlyAdmin', onlyAdmin);

  function onlyAdmin(){
    var directive = {
      restrict: 'A',
      link: linkFunction,
      controller: Controller,
      controllerAs: 'ctrl',
      bindToController: true
    };

    function linkFunction($scope, $elm, $attr, ctrl) {
      setTimeout(function() {
        var admin = ctrl.utenteLoggato.ruolo==='admin';
        $scope.$apply($elm);
        if(!admin){
          $elm.remove();
          // $elm.css('visibility', 'hidden');
          // $elm.css('display', 'none');
        }
      }, 100);
    }

    return directive;

  }

  Controller.inject = ['$localStorage'];

  /* @ngInject */
  function Controller($localStorage) {
    var ctrl = this;

    /*
    Attributi
     */
    ctrl.utenteLoggato = $localStorage.utenteLoggato;

  }


})();
