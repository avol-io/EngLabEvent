/*******************
REGISTRAZIONE NUOVO UTENTE
Questo controller si occuperà di gestire tutta la logica di registrazione di un nuovo utente.
Per ogni utente si vuole salvare:
- nome (text)
- cognome (text)
- email aziendale (email)
- se è esterno oppure no (bool)

*/


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('registrazioneNuovoUtente', registrazioneNuovoUtente);

  registrazioneNuovoUtente.$inject = ['$rootScope'];

  /* @ngInject */
  function registrazioneNuovoUtente($rootScope) {
    var ctrl = this;


    /*
      ATTRIBUTI
     */

    /*
    Variabili di flusso
     */


    /*
      FUNZIONI
     */

  }
})();
