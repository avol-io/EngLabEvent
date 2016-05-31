/*******************
VISUALIZZA EVENTO

 */


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('visualizzaEvento', visualizzaEvento);

  visualizzaEvento.$inject = ['$localStorage', '$stateParams','$state'];

  /* @ngInject */
  function visualizzaEvento($localStorage, $stateParams,$state) {
    var ctrl = this;


    /*
      ATTRIBUTI
		 */
    //l'evento
    ctrl.evento = {};


    /*
    Variabili di flusso
		 */
    ctrl.visualizzaPartecipanti = false;



    /*
  FUNZIONI
		 */
    ctrl.eliminaEvento = eliminaEvento;






    function salvaEvento() {
      $localStorage.eventi.push(ctrl.evento);
      ctrl.visualizzaDettagli = false;
    }

    function eliminaEvento(evento) {
      $localStorage.eventi.splice(evento, 1);
      $state.go('visualizzaEventi');
    }


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
