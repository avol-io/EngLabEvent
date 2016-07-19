/*******************
LOGIN UTENTE
Questo controller si occuperà di gestire tutta la logica di login di un utente

 */


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('login', login);

  login.$inject = ['$localStorage', '$state', 'loginService'];

  /* @ngInject */
  function login($localStorage, $state, loginService) {
    var ctrl = this;
    /*
    	ATTRIBUTI
     */
    ctrl.utente = {};


    /*
    Variabili di flusso
		 */
    ctrl.loading = false;

    /*
      FUNZIONI
		 */
    ctrl.login = login;
    ctrl.registrazioneNuovoUtente = registrazioneNuovoUtente;


    function login() {
      ctrl.loading = true;
      var profilo = undefined;

      function loginOK(p) {
        ctrl.loading = false;
        profilo = p;
        $state.go('home');
      }

      function loginErr() {
        ctrl.loading = false;
        alert('Credenziali non valide');
      }

      var promise = loginService.login(ctrl.utente.uid, ctrl.utente.password);
      promise.then(loginOK, loginErr);

    }

    function registrazioneNuovoUtente() {
      $state.go('registrazioneNuovoUtente');
    }

  }
})();
