/*******************
VISUALIZZA EVENTI
Questo controller si occuperà di gestire tutta la logica di visualizzazione della lista degli utenti e alcune semplici operazioni su di essa.
- Eliminazione utente
- Chiamata a pagina aggiunti utente
*/


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('visualizzaUtenti', visualizzaUtenti);

  visualizzaUtenti.$inject = ['$rootScope'];

  /* @ngInject */
  function visualizzaUtenti($rootScope) {
    var ctrl = this;


    /*
      ATTRIBUTI
     */
    //la lista degli utenti
    ctrl.utenti=$rootScope.utenti; //rootScope lo usiamo solo finchè non faremo i service!!

    /*
    Variabili di flusso
     */


    /*
      FUNZIONI
     */
    ctrl.rimuoviUtente = rimuoviUtente;
    
    function rimuoviUtente(utente){
      var indexFound = -1;
      for(var i = 0; i<ctrl.utenti.length; i++){
        if(utente.nome == ctrl.utenti[i].nome){
          indexFound = i;
        }
      }
      if(indexFound >=0) {
        ctrl.utenti.splice(indexFound, 1);
      }
    }


  }
})();
