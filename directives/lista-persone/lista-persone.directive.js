(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .directive('listaPersone', listaPersone);

  /* @ngInject */
  function listaPersone() {
    var directive = {
      restrict: 'E',
      templateUrl: 'directives/lista-persone/lista-persone.view.html',
      scope: {
        persone: '=',
        azione: '='
      },
      link: linkFunction,
      controller: Controller,
      controllerAs: 'ctrl',
      bindToController: true
    };

    return directive;



    function linkFunction($scope, $elm, $attr, ctrl) {

    }
  }

  Controller.$inject = [];

  /* @ngInject */
  function Controller() {
    var ctrl = this;

    /*
    Attributi
     */

    ctrl.nonselezionati = [];
    ctrl.selezionati = [];

    /*
    Funzioni
     */
    ctrl.onSelezionato = onSelezionato;
    ctrl.onDeselezionato = onDeselezionato;
    ctrl.onAzioneMassiva = onAzioneMassiva;
    ctrl.onAzioneSingola = onAzioneSingola;

    function onSelezionato(persona) {
      ctrl.selezionati.push(persona);
      ctrl.nonselezionati.splice(ctrl.nonselezionati.indexOf(persona), 1);
    }

    function onDeselezionato(persona) {
      ctrl.nonselezionati.push(persona);
      ctrl.selezionati.splice(ctrl.selezionati.indexOf(persona), 1);
    }

    function onAzioneMassiva() {
      ctrl.selezionati.forEach(function(persona) {
        onAzioneSingola(persona);
      });
    }

    function onAzioneSingola(persona) {
      ctrl.azione(persona);
    }


    function init() {
      if (ctrl.persone.length > 0) {
        ctrl.persone.forEach(function(persona) {
          ctrl.nonselezionati.push(persona);
        });
      }
    }
    init();
  }

})();
