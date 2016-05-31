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
				password:null

		};
		ctrl.utenti = $localStorage.utenti;





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

			if(	$localStorage.utenteLoggato){
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
