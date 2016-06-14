/*******************
UTENTI REGISTRATI
********************/


(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .controller('utentiRegistrati', utentiRegistrati);

  utentiRegistrati.$inject = ['$localStorage'];

  /* @ngInject */
  function utentiRegistrati($localStorage) {
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
    ctrl.visualizaElimina = false;
    ctrl.visualizzaUtenti = false;

    /*
      FUNZIONI
		 */

     
    ctrl.elimina = elimina;




    function elimina(utente) {
      if ($localStorage.utenteLoggato.ruolo != 'admin') {
        alert('Non sei autorizzato a effettuare questa operazione');
        return;
      }
      ctrl.utenti.splice(  ctrl.utenti.indexOf(utente), 1);
    }


    function init() {
      if (!$localStorage.utenti) {
        $localStorage.utenti = [];
      }
      ctrl.utenti = $localStorage.utenti;
      if ($localStorage.utenteLoggato) {
        ctrl.visualizzaUtenti = true;
        if ($localStorage.utenteLoggato && $localStorage.utenteLoggato.ruolo === 'admin') {
          ctrl.visualizaElimina = true;
        }
      }
    }
    init();

  }
})();
