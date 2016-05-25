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

  visualizzaEventi.$inject = ['$rootScope'];

  /* @ngInject */
  function visualizzaEventi($rootScope) {
    var ctrl = this;


    /*
      ATTRIBUTI
     */
    //la lista degli eventi
    ctrl.eventi=$rootScope.eventi; //rootScope lo usiamo solo finchè non faremo i service!!

    /*
    Variabili di flusso
     */

    //rimuovi evento
    ctrl.rimuoviEvento = rimuoviEvento;
    //modifica evento
    ctrl.modificaEvento = modificaEvento;
    //fine modifica evento
    ctrl.fineModificaEvento = fineModificaEvento;
    //aggiungi opzione
    ctrl.aggiungiOpzione = aggiungiOpzione;
    //rimuovi opzione
    ctrl.rimuoviOpzione = rimuoviOpzione;


    /*
      FUNZIONI
     */
     /*
     Rimuove un evento
      */
     function rimuoviEvento(evento) {
       for (var i = ctrl.eventi.length - 1; i >= 0; i--) {
         if (ctrl.eventi[i].id === evento.id) {
           ctrl.eventi.splice(i, 1);
         }
       }
     }

     /*
     Modifica evento
      */
     function modificaEvento(evento) {
       evento.edit = true;
       for (var i = ctrl.eventi.length - 1; i >= 0; i--) {
         if (ctrl.eventi[i].id != evento.id) {
           ctrl.eventi[i].edit = false;
         }
       }
     }

     /*
     Modifica evento
      */
     function fineModificaEvento(evento) {
       evento.edit = false;
     }

     /**
      * Aggiunge un'opzione
      */
     function aggiungiOpzione(evento) {
       evento.opzioni.push({
         'nome': ''
       });
     }

     /*
     Rimuove un opzione
      */
     function rimuoviOpzione(evento,opzione) {
       for (var i = evento.opzioni.length - 1; i >= 0; i--) {
         if (evento.opzioni[i].nome === opzione.nome) {
           evento.opzioni.splice(i, 1);
         }
       }
     }

  }
})();
