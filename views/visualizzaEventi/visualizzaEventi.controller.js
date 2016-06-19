/*******************
VISUALIZZA EVENTI
Questo controller si occuperà di gestire tutta la logica di visualizzazione della lista degli eventi e alcune semplici operazioni su di essa.
- Eliminazione evento
- Chiamata a pagina aggiunti evento
 */


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('visualizzaEventi', visualizzaEventi);

  visualizzaEventi.$inject = ['$localStorage', '$state'];

  /* @ngInject */
  function visualizzaEventi($localStorage, $state) {
    var ctrl = this;


    /*
      ATTRIBUTI
		 */
    //la lista degli eventi
    ctrl.eventi = $localStorage.eventi; //rootScope lo usiamo solo finchè non faremo i service!!
    //lista utenti
    ctrl.utenti = $localStorage.utenti;

    ctrl.utenteLoggato = $localStorage.utenteLoggato;

    ctrl.evento = null;


    /*
    Variabili di flusso
		 */
    ctrl.visualizzaLista = false;



    /*
  FUNZIONI
		 */
    //elimina un evento
    ctrl.eliminaEvento = eliminaEvento;

    //iscrive l'utente loggato all'evento
    ctrl.iscriviti = iscriviti;

    //gestisce il cambio di vista in modifica evento
    ctrl.modificaEvento = modificaEvento;

    //gestisce il cambio di vista in visualizza evento
    ctrl.visualizzaEvento = visualizzaEvento;

		ctrl.possoModificare=possoModificare;

    function visualizzaEvento(evento) {
      $state.go('visualizzaEvento', {
        id: evento.id
      });
    }

    function modificaEvento(evento) {
      $state.go('modificaEvento', {
        id: evento.id
      });
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
      };

      ctrl.evento.utenti.push(ctrl.utenteLoggato);
    }

    function eliminaEvento(evento) {
      $localStorage.eventi.splice(evento, 1);
      $state.go('visualizzaEventi');
    }

		function possoModificare(evento){
			return evento.autore.email===$localStorage.utenteLoggato.email||$localStorage.utenteLoggato.ruolo==='admin';
		}




  }
})();
