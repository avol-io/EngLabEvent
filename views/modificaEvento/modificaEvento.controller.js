/*******************
MODIFICA EVENTO

 */


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('modificaEvento', modificaEvento);

  modificaEvento.$inject = ['$localStorage', '$stateParams','$state'];

  /* @ngInject */
  function modificaEvento($localStorage, $stateParams, $state) {
    var ctrl = this;


    /*
      ATTRIBUTI
		 */
    //l'evento
    ctrl.evento = {};


    /*
    Variabili di flusso
		 */
    ctrl.visualizzaPartecipanti = true;

    /*
  FUNZIONI
		 */
    function init() {
      if ($stateParams.id) {
        console.log($stateParams.id);

        $localStorage.eventi.forEach(function(evento) {

          if (evento.id == $stateParams.id) {
            ctrl.evento = evento;
            console.log(ctrl.evento);
          }
        });
      }
    }
    init();

  }

})();
