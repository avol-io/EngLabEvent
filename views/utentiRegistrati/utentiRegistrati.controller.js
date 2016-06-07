/*******************
UTENTI REGISTRATI
Questo controller si occuperà di mostrare la lista degli utenti registrati in EngLabEvents.
Per ogni utente si mostra:
- nome (text)
- cognome (text)
- email aziendale (email)
- se è esterno oppure no (bool)
- data iscrizione
 */


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
		ctrl.utenti = $localStorage.utenti;


		/*
    Variabili di flusso
		 */


		/*
      FUNZIONI
		 */


		function init(){
			if (!$localStorage.utenti) {
				$localStorage.utenti = [];
			}
				ctrl.utenti = $localStorage.utenti;
		}
		init();

	}
})();
