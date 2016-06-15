/*******************
LOGIN UTENTE
Questo controller si occuperà di gestire tutta la logica di login di un utente

 */


(function() {
	'use strict';

	angular
	.module('engLabEvents')
	.controller('login', login);

	login.$inject = ['$localStorage','$state'];

	/* @ngInject */
	function login($localStorage,$state) {
		var ctrl = this;
		/*
			ATTRIBUTI
		 */
		ctrl.utente = {
				nome:null,
				cognome:null,
				email:null,
				password:null,
				ruolo:'user'
		};
		ctrl.utenti = $localStorage.utenti;

		/*
		simulazione amministratori
		 */
		var adminListTemp=['alessandro.avolio@eng.it','dario.fabbri@eng.it'];


		/*
    Variabili di flusso
		 */


		/*
      FUNZIONI
		 */
		ctrl.login = login;
		ctrl.registrazioneNuovoUtente=registrazioneNuovoUtente;


		function login(){

			ctrl.utenti.forEach(function(utente){
				if(utente.email===ctrl.utente.email&&utente.password===ctrl.utente.password){
					$localStorage.utenteLoggato=utente;
				}
			});


			//se l'utente è loggato
			if(	$localStorage.utenteLoggato){
				//verifico se è un amministratore
				adminListTemp.forEach(function(admin){
					if(admin===ctrl.utente.email){
						$localStorage.utenteLoggato.ruolo='admin';
					}
				});
				$state.go('home');
			}else{
				alert("Credenziali non valide");
			}

		}

		function registrazioneNuovoUtente(){
			$state.go('registrazioneNuovoUtente');
		}



		function init(){
			if (!$localStorage.utenti) {
				$localStorage.utenti = [];
			}
			ctrl.utenti = $localStorage.utenti;
		}
		init();

	}
})();
