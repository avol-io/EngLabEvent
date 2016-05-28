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
		return function(array, filtro){
			if(!filtro){
				return array;
			}
			var result = [];
			array.forEach(function(utente){
				var trovato=false;
				filtro.forEach(function(item){
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

	visualizzaEventi.$inject = ['$rootScope'];

	/* @ngInject */
	function visualizzaEventi($rootScope) {
		var ctrl = this;


		/*
      ATTRIBUTI
		 */
		//la lista degli eventi
		ctrl.eventi=$rootScope.eventi; //rootScope lo usiamo solo finchè non faremo i service!!
		//lista utenti
		ctrl.utenti=$rootScope.utenti;

		ctrl.evento=null;
		
		if(ctrl.eventi && (!ctrl.utenti || ctrl.utenti.length == 0)){
			ctrl.eventi.forEach(function (evento){
				if(evento.utenti){
					evento.utenti=null;
				}
			});
		}else if(ctrl.eventi && ctrl.utenti && ctrl.utenti.length > 0){
			ctrl.eventi.forEach(function (evento){
				if(evento.utenti && evento.utenti.length > 0){
					evento.utenti.forEach(function(utente){
						var trovato=false;
						ctrl.utenti.forEach(function(current){
							if(current.id === utente.id){
								trovato=true;
							}
						});
						if(!trovato){
							evento.utenti.splice(utente, 1);
						}
					});
				}
			});
		}
		/*
    Variabili di flusso
		 */
		ctrl.visualizzaDettagli=false;
		ctrl.modificaEvento=false;
		ctrl.visualizzaUtenti=false;
		ctrl.visualizzaLista=false;
		ctrl.visualizzaVincoli = false;
		/*
  FUNZIONI
		 */

		ctrl.visualizzaEvento=visualizzaEvento;
		ctrl.eliminaEvento=eliminaEvento;
		ctrl.mostraUtenti=mostraUtenti;
		ctrl.aggiungiPartecipante=aggiungiPartecipante;
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
			if(!ctrl.visualizzaDettagli){
				ctrl.visualizzaUtenti=false;
				ctrl.visualizzaLista=false;
			}
			if(!ctrl.evento || evento.id===ctrl.evento.id){
				ctrl.visualizzaDettagli=!ctrl.visualizzaDettagli;
			}else{
				ctrl.visualizzaDettagli=true;
			}
			ctrl.evento=evento;
			if(ctrl.evento.vincoliPartecipanti && ctrl.evento.vincoliPartecipanti.min && ctrl.evento.vincoliPartecipanti.max){
				ctrl.visualizzaVincoli=true;
			}else{
				ctrl.visualizzaVincoli=false;
			}
			if(ctrl.evento.vincoliPartecipanti && ctrl.evento.utenti && ctrl.evento.vincoliPartecipanti.max  && ctrl.evento.vincoliPartecipanti.max < ctrl.evento.utenti.length){
				ctrl.evento.utenti=[];
			}
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
		
		function eliminaPartecipante(utente){
			ctrl.evento.utenti.splice(utente, 1);
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
			$rootScope.eventi.push(ctrl.evento);
			ctrl.visualizzaDettagli=false;
		}

		function eliminaEvento(evento){
			ctrl.eventi.splice(evento, 1);
		}

	}
})();
