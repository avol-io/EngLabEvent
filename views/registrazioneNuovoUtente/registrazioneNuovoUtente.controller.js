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
		
		ctrl.utente = {
				nome:null,
				cognome:null,
				email:null

		};
		ctrl.utenti = $rootScope.utenti;


		/*
      ATTRIBUTI
		 */
		

		/*
    Variabili di flusso
		 */


		/*
      FUNZIONI
		 */
		ctrl.salva = salva;
		ctrl.pulisci = pulisci;
		ctrl.elimina = elimina;

		function salva(){
			if (!$rootScope.utenti) {
				$rootScope.utenti = [];
			}
			ctrl.utente.id = Math.ceil(Math.random() * 100);
			$rootScope.utenti.push(ctrl.utente);
			ctrl.utenti=$rootScope.utenti;
			ctrl.pulisci();
		}

		function pulisci() {
			ctrl.utente = {};
		}
		
		function elimina(utente){
			$rootScope.utenti.splice(utente, 1);
			ctrl.utenti=$rootScope.utenti;
	    }


	}
})();
