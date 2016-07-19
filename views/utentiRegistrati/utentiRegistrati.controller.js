/*******************
UTENTI REGISTRATI
********************/


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('utentiRegistrati', utentiRegistrati);

  utentiRegistrati.$inject = ['$localStorage', 'loginService', 'utentiFacade'];

  /* @ngInject */
  function utentiRegistrati($localStorage, loginService, utentiFacade) {
    var ctrl = this;
    /*
    	ATTRIBUTI
     */
    ctrl.utente = {
      nome: null,
      cognome: null,
      uid: null,
      password: null
    };
    ctrl.utenti = [];



    /*
    Variabili di flusso
		 */
    ctrl.visualizaElimina = false;
    ctrl.visualizzaUtenti = false;

    /*
      FUNZIONI
		 */


    ctrl.elimina = elimina;


    function caricaUtenti() {
      function utentiCaricati(utenti) {
        ctrl.utenti = utenti;
      }

      function errore() {
        alert('Errore durante il caricamento degli utenti');
      }
      utentiFacade.getUtenti().then(utentiCaricati, errore);
    }

    function elimina(utente) {
      if (!loginService.getProfile().isAdmin) {
        alert('Non sei autorizzato a effettuare questa operazione');
        return;
      }

      function eliminato(){
        alert('utente elimianto!');
        //ctrl.utenti.splice(  ctrl.utenti.indexOf(utente), 1);
      }
      function errore(){
        alert('errore durante l\'eliminazione');
      }

      utentiFacade.deleteUtente(utente.uid).then(eliminato,errore);
    }


    function init() {
      // if (!$localStorage.utenti) {
      //   $localStorage.utenti = [];
      // }
      caricaUtenti();
      if (loginService.getProfile()) {
        ctrl.visualizzaUtenti = true;
        if (loginService.getProfile().isAdmin) {
          ctrl.visualizaElimina = true;
        }
      }
    }
    init();

  }
})();
