/*******************
REGISTRAZIONE NUOVO UTENTE
Questo controller si occuperà di gestire tutta la logica di registrazione di un nuovo utente.
Per ogni utente si vuole salvare:
- nome (text)
- cognome (text)
- uid aziendale (uid)
- se è esterno oppure no (bool)

 */


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('registrazioneNuovoUtente', registrazioneNuovoUtente);

  registrazioneNuovoUtente.$inject = ['$localStorage', '$scope', 'utentiFacade'];

  /* @ngInject */
  function registrazioneNuovoUtente($localStorage, $scope, utentiFacade) {
    var ctrl = this;
    /*
    	ATTRIBUTI
     */
    ctrl.utente = {
      nome: null,
      cognome: null,
      uid: null,
      password: null,
      emoticon: null,
      bio: null

    };
    ctrl.utenti = $localStorage.utenti;
    ctrl.emoticons = ['/img/emo/0.png', '/img/emo/1.png', '/img/emo/2.png'];


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
    ctrl.cambiaEmoticon = cambiaEmoticon;

    function salva() {

      function salvato(utente) {
        console.log(utente);
        alert('Utente registrato correttamente');
        pulisci();
      }

      function errore(errore) {
        console.error(errore);
        alert('Errore durante il salvataggio');

      }

      utentiFacade.saveUtente(ctrl.utente).then(salvato, errore);


    }

    function pulisci() {
      ctrl.utente = {};
      $scope.registrazioneNuovoUtenteForm.$setPristine();
      $scope.registrazioneNuovoUtenteForm.$setValidity();
    }

    function cambiaEmoticon(nome) {
      ctrl.utente.emoticon = nome;
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
