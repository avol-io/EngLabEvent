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
  

   //l'utente che si vuole creare
    ctrl.utente = {
      nome: null, //stringa
      cognome: null, //striga
      email: null, //email
      esterno: false //bool
    };
    
    ctrl.salva = salva;
    ctrl.pulisci = pulisci;
    
    function salva() {
      if (!$rootScope.utenti) {
        $rootScope.utenti = [];
      }

      ctrl.utente.id = Math.ceil(Math.random() * 100);
      $rootScope.utenti.push(ctrl.utente);
      alert('Utente Salvato');
      ctrl.pulisci();
    }

    /**
     * Si occupa di pulire il form resettando tutti i campi
     * @return void
     */
    function pulisci() {
      ctrl.utente = {};
    }

  }
})();
