/*******************
VISUALIZZA EVENTI
Questo controller si occuperà di gestire tutta la logica di visualizzazione della lista degli eventi e alcune semplici operazioni su di essa.
- Eliminazione evento
- Chiamata a pagina aggiunti evento
 */


(function() {
	'use strict';

	angular
	.module('engLabEvents')
	.controller('visualizzaEventi', visualizzaEventi);

	angular
	.module('engLabEvents').filter('noDuplicati', function(){
		return function(array, presenti){
			if(!presenti){
				return array;
			}
			var result = [];
			array.forEach(function(utente){
				var trovato=false;
				presenti.forEach(function(item){
					if(item.id === utente.id){
						trovato=true;
					}
				});
				if(!trovato){
					result.push(utente);
				}
			});
			return result;
		};
	});
	angular
	.module('engLabEvents').filter('contains', function(){
		return function(creati, evento){
			if(!creati){
				return false;
			}
			var owner = false;
			creati.forEach(function(e){
				if(e.id===evento.id){
					owner = true;
				}
			});
			return owner;
		};
	});
	visualizzaEventi.$inject = ['$localStorage','$state'];

	/* @ngInject */
	function visualizzaEventi($localStorage,$state) {
		var ctrl = this;
		/*
      ATTRIBUTI
		 */
		//la lista degli eventi
		ctrl.eventi=$localStorage.eventi; //rootScope lo usiamo solo finchè non faremo i service!!
		//lista utenti
		ctrl.utenti=$localStorage.utenti;

		ctrl.evento=null;
		ctrl.utenteLoggato = $localStorage.utenteLoggato;

		/*
    Variabili di flusso
		 */
		ctrl.visualizzaDettagli=false;
		ctrl.modificaEvento=false;
		ctrl.visualizzaUtenti=false;
		ctrl.visualizzaLista=false;
		ctrl.visualizzaVincoli = false;
		ctrl.nonPartecipante=true;


		/*
  FUNZIONI
		 */

		ctrl.visualizzaEvento=visualizzaEvento;
		ctrl.eliminaEvento=eliminaEvento;
		ctrl.mostraUtenti=mostraUtenti;
		ctrl.aggiungiPartecipante=aggiungiPartecipante;
		ctrl.aggiungiPartecipanteSingolo=aggiungiPartecipanteSingolo;
		ctrl.eliminaPartecipante=eliminaPartecipante;
		ctrl.visualizzaPartecipanti=visualizzaPartecipanti;
		//aggiungi opzione
		ctrl.aggiungiOpzione = aggiungiOpzione;
		//rimuovi opzione
		ctrl.rimuoviOpzione = rimuoviOpzione;
		//cambia la visualizzazione dei vincoli
		ctrl.alCambiamentoDelVincoloSuIPartecipanti = alCambiamentoDelVincoloSuIPartecipanti;

		/**
		 * Aggiunge un'opzione
		 */
		function aggiungiOpzione() {
			ctrl.evento.opzioni.push({
				'nome': ''
			});
		}

		/*
    Rimuove un opzione
		 */
		function rimuoviOpzione(opzione) {
			for (var i = ctrl.evento.opzioni.length - 1; i >= 0; i--) {
				if (ctrl.evento.opzioni[i].nome === opzione.nome) {
					ctrl.evento.opzioni.splice(i, 1);
				}
			}
		}
		/*
    Pulisce i vincoli
		 */
		function alCambiamentoDelVincoloSuIPartecipanti() {
			if(!ctrl.evento.vincoliPartecipanti){
				ctrl.evento.vincoliPartecipanti = {};
			}
			ctrl.evento.vincoliPartecipanti.min =null;
			ctrl.evento.vincoliPartecipanti.max=null;
		}

		function visualizzaEvento(evento){
			$state.go('visualizzaEvento',{id:evento.id});
			// if(!ctrl.visualizzaDettagli){
			// 	ctrl.visualizzaUtenti=false;
			// 	ctrl.visualizzaLista=false;
			// }
			// if(!ctrl.evento || evento.id===ctrl.evento.id){
			// 	ctrl.visualizzaDettagli=!ctrl.visualizzaDettagli;
			// }else{
			// 	ctrl.visualizzaDettagli=true;
			// }
			// ctrl.evento=evento;
			// if(ctrl.evento.vincoliPartecipanti && ctrl.evento.vincoliPartecipanti.min && ctrl.evento.vincoliPartecipanti.max){
			// 	ctrl.visualizzaVincoli=true;
			// }else{
			// 	ctrl.visualizzaVincoli=false;
			// }
			// if(ctrl.evento.vincoliPartecipanti && ctrl.evento.utenti && ctrl.evento.vincoliPartecipanti.max  && ctrl.evento.vincoliPartecipanti.max < ctrl.evento.utenti.length){
			// 	ctrl.evento.utenti=[];
			// }
		}
		function visualizzaPartecipanti(evento){
			if(!ctrl.visualizzaLista){
				ctrl.visualizzaUtenti=false;
				ctrl.visualizzaDettagli=false;
			}
			if(!ctrl.evento || evento.id===ctrl.evento.id){
				ctrl.visualizzaLista=!ctrl.visualizzaLista;
			}
			ctrl.evento=evento;
			if(ctrl.evento.vincoliPartecipanti && ctrl.evento.utenti && ctrl.evento.vincoliPartecipanti.max  && ctrl.evento.vincoliPartecipanti.max < ctrl.evento.utenti.length){
				ctrl.evento.utenti=[];
			}
		}

		function aggiungiPartecipante(utente){
			if(!ctrl.evento.utenti){
				ctrl.evento.utenti=[];
			}
			ctrl.evento.utenti.push(utente);
			if(ctrl.evento.utenti.length == ctrl.utenti.length){
				ctrl.visualizzaUtenti=false;
			}
		}
		function aggiungiPartecipanteSingolo(evento){
			var utente = $localStorage.utenteLoggato;
			ctrl.evento = evento;
			if(!ctrl.evento.utenti){
				ctrl.evento.utenti=[];
			}
			ctrl.evento.utenti.push(utente);
			ctrl.nonPartecipante=false;
		}

		function eliminaPartecipante(utente){
			ctrl.evento.utenti.splice(ctrl.evento.utenti.indexOf(utente), 1);
			if(ctrl.evento.utenti.length == 0){
				ctrl.visualizzaLista=false;
			}
		}

		function mostraUtenti(evento){
			if(!ctrl.visualizzaUtenti){
				ctrl.visualizzaDettagli=false;
				ctrl.visualizzaLista=false;
			}
			if(!ctrl.evento || evento.id===ctrl.evento.id){
				ctrl.visualizzaUtenti=!ctrl.visualizzaUtenti;
			}
			ctrl.evento=evento;
			if(ctrl.evento.vincoliPartecipanti && ctrl.evento.utenti && ctrl.evento.vincoliPartecipanti.max  && ctrl.evento.vincoliPartecipanti.max < ctrl.evento.utenti.length){
				ctrl.evento.utenti=[];
			}
		}

		function salvaEvento(){
			$localStorage.eventi.push(ctrl.evento);
			ctrl.visualizzaDettagli=false;
		}

		function eliminaEvento(evento){
			ctrl.eventi.splice(evento, 1);
		}

	}
})();
