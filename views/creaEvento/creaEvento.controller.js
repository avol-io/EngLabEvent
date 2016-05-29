/*******************
CREA EVENTO
Questo controller si occuperà di gestire tutta la logica della pagina di inserimento di un nuovo evento.
Il modello che rappresenta un'evento ha questo struttura
{
nome:stringa *,
data:data *,
luogo:stringa,
opzioni:[ {
            nomeOpzione:stringa,
          //  valoreOpzione:stringa
          }
        ],
vincoliPartecipanti:{
                    min:intero,
                    max:intero
                  }
}
 ********************/

(function() {
	'use strict';

	angular
	.module('engLabEvents')
	.controller('creaEvento', creaEvento);

	creaEvento.$inject = ['$localStorage'];

	/* @ngInject */
	function creaEvento($localStorage) {
		var ctrl = this;


		/*
      ATTRIBUTI
		 */


		//l'evento che si vuole creare
		ctrl.evento = {
				nome: null, //stringa
				data: new Date(), //data
				luogo: null, //stringa
				opzioni: [], //array di "Opzioni" {nome:stringa}
				edit: false,
				vincoliPartecipanti: {
					min: null, //intero
					max: null, //intero
				}
		};

		/*
    Variabili di flusso
		 */
		//visualizza opzioni
		ctrl.visualizzaOpzioni = false;
		//visualizza vincoli su i partecipanti
		ctrl.visualizzaVincoli = false;


		/*
      FUNZIONI
		 */
		//salva l'evento
		ctrl.salva = salva;
		//pulisce l'evento
		ctrl.pulisci = pulisci;
		//aggiungi opzione
		ctrl.aggiungiOpzione = aggiungiOpzione;
		//rimuovi opzione
		ctrl.rimuoviOpzione = rimuoviOpzione;
		//cambia la visualizzazione dell'opzioni
		ctrl.cambiaVisualizzazioneOpzioni = cambiaVisualizzazioneOpzioni;
		//cambia la visualizzazione dei vincoli
		ctrl.alCambiamentoDelVincoloSuIPartecipanti = alCambiamentoDelVincoloSuIPartecipanti;

		/**
		 * Si occupa di gestire il salvataggio di un evento
		 * @return void
		 */
		function salva() {
			ctrl.evento.id = Math.ceil(Math.random() * 100);
			ctrl.eventi.push(ctrl.evento);
			alert('Evento Salvato');
			ctrl.pulisci();
		}


		/**
		 * Si occupa di pulire il form resettando tutti i campi
		 * @return void
		 */
		function pulisci() {
			ctrl.evento = {};
			ctrl.evento.opzioni=[];
			ctrl.visualizzaOpzioni = false;
			ctrl.visualizzaVincoli = false;
		}

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
    Cambia visualizzazione
		 */
		function cambiaVisualizzazioneOpzioni() {
			if (ctrl.evento.opzioni.length === 0) {
				ctrl.visualizzaOpzioni = !ctrl.visualizzaOpzioni;
			}
		}

		/*
    Pulisce i vincoli
		 */
		function alCambiamentoDelVincoloSuIPartecipanti() {
			ctrl.evento.vincoliPartecipanti.min =null;
			ctrl.evento.vincoliPartecipanti.max=null;
		}


		function init(){
			if (!$localStorage.eventi) {
				$localStorage.eventi = [];
			}
			ctrl.eventi=$localStorage.eventi;
		}
		init();

	}
})();
