(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .directive('persona', persona);

  /* @ngInject */
  function persona() {
    var directive = {
      restrict: 'E',
      templateUrl: 'directives/persona/persona.view.html',
      scope: {
        persona: '=',
        modalita: '@', //'normale','icona','espansa'
        onSelezionato: '&'
      },
      link: linkFunction,
      controller: Controller,
      controllerAs: 'ctrl',
      bindToController: true
    };

    return directive;



    function linkFunction($scope, $elm, $attr, ctrl) {

      $elm[0].onmousedown = function(evt) {
        $scope.longPress = true;
        setTimeout(function() {
          if ($scope.longPress) {
            ctrl.onHold();
            $scope.longPress = false;
          }

        }, 600);
      }
      $elm[0].onmouseup = function(evt) {
        $scope.longPress = false;
      };
    }
  }

  Controller.$inject = [];

  /* @ngInject */
  function Controller() {
    var ctrl = this;
    /*
    Attributi
     */
    ctrl.selezionato = false;

    /*
    Funzioni
     */
    ctrl.cambiaModalita = cambiaModalita;
    ctrl.onHold = onHold;

    function onHold() {
      alert('Hai premuto a lungo');
      if (ctrl.onSelezionato) {
        //se ho definito una funziona da richiamare quando sono selezionato allora quando farò hold sulla persona essa si selezionerà e chiamerà la funzione
        ctrl.selezionato = !ctrl.selezionato;
        ctrl.onSelezionato(ctrl.persona);
      }
    }

    function cambiaModalita() {
      if (ctrl.modalita === 'normale') {
        ctrl.modalita = 'espansa';
      } else if (ctrl.modalita === 'espansa') {
        ctrl.modalita = 'icona';
      } else if (ctrl.modalita === 'icona') {
        ctrl.modalita = 'normale';
      }
    }

    function init() {
      if (ctrl.modalita == 0) {
        ctrl.modalita = 'normale';
      }
    }
    init();
  }
})();
