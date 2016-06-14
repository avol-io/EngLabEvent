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

  registrazioneNuovoUtente.$inject = ['$localStorage'];

  /* @ngInject */
  function registrazioneNuovoUtente($localStorage) {
    var ctrl = this;
    /*
    	ATTRIBUTI
     */
    ctrl.utente = {
      nome: null,
      cognome: null,
      email: null,
      password: null

    };
    ctrl.utenti = $localStorage.utenti;



    /*
    Variabili di flusso
		 */
    ctrl.visualizzaUtenti = false;

    /*
      FUNZIONI
		 */
    ctrl.salva = salva;
    ctrl.pulisci = pulisci;
  ctrl.visualizzaUtenti = false;

    function salva() {
      for (var i = 0; i < ctrl.utenti; i++) {
        if (ctrl.utente.email === ctrl.utenti[i].email) {
          alert('Già presente un utente con la stessa mail. Contattare gli amministratori.');
          return;
        }
      }

      ctrl.utente.id = Math.ceil(Math.random() * 100);
      ctrl.utente.dataIscrizione = new Date();


      ctrl.utenti.push(ctrl.utente);
      alert('Utente registrato correttamente');
      pulisci();
    }

    function pulisci() {
      ctrl.utente = {};
      $scope.registrazioneNuovoUtenteForm.$setPristine();
    }




    function init() {
      console.log('Sto in ctrl init');
      if (!$localStorage.utenti) {
        $localStorage.utenti = [];
      }
      if ($localStorage.utenteLoggato) {
        ctrl.visualizzaUtenti = true;
        if ($localStorage.utenteLoggato && $localStorage.utenteLoggato.ruolo === 'admin') {
          ctrl.visualizaElimina = true;
        }
      }
      ctrl.utenti = $localStorage.utenti;
    }
    init();

  }
})();
