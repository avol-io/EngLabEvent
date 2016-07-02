/*******************
VISUALIZZA EVENTO

 */


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('visualizzaEvento', visualizzaEvento);

  visualizzaEvento.$inject = ['$localStorage', '$stateParams', '$state'];

  /* @ngInject */
  function visualizzaEvento($localStorage, $stateParams, $state) {
    var ctrl = this;


    /*
      ATTRIBUTI
		 */
    //l'evento
    ctrl.evento = {};

    ctrl.utenteLoggato = $localStorage.utenteLoggato;


    /*
    Variabili di flusso
		 */
    ctrl.visualizzaPartecipanti = false;


    /*
  FUNZIONI
		 */
    ctrl.eliminaEvento = eliminaEvento;

    ctrl.eliminaPartecipante = eliminaPartecipante;
    //iscrive un utente ad un evento
    ctrl.iscriviti = iscriviti;
    ctrl.possoCancellarmi=possoCancellarmi;
    ctrl.possoModificare=possoModificare;



    function salvaEvento() {
      $localStorage.eventi.push(ctrl.evento);
      ctrl.visualizzaDettagli = false;
    }

    function eliminaEvento() {
      $localStorage.eventi.splice(  $localStorage.eventi.indexOf(ctrl.evento), 1);
      $state.go('visualizzaEventi');
    }



    function eliminaPartecipante(utente) {

      ctrl.evento.utenti.splice(  ctrl.evento.utenti.indexOf(utente), 1);

    }


    function possoCancellarmi(utente){
      var evento=ctrl.evento;
      return utente.email===$localStorage.utenteLoggato.email||evento.autore.email===$localStorage.utenteLoggato.email||$localStorage.utenteLoggato.ruolo==='admin';
    }

    function possoModificare(){
      var evento=ctrl.evento;
      return evento.autore.email===$localStorage.utenteLoggato.email||$localStorage.utenteLoggato.ruolo==='admin';
    }


    /*
    Iscrive l'utente attualmente loggato ad un evento
     */
    function iscriviti(evento) {
      ctrl.evento = evento;
      if (!ctrl.evento.utenti) {
        ctrl.evento.utenti = [];
      }

      for (var i = 0; i < ctrl.evento.utenti.length; i++) {
        if (ctrl.utenteLoggato.email === ctrl.evento.utenti[i].email) {
          alert('Sei già iscritto a questo evento!');
          return;
        }
      }

      ctrl.evento.utenti.push(ctrl.utenteLoggato);
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
