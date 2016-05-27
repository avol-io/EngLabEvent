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

    visualizzaEventi.$inject = ['$rootScope'];

    /* @ngInject */
    function visualizzaEventi($rootScope) {
        var ctrl = this;

        /*
          ATTRIBUTI
         */
        //la lista degli eventi
        if($rootScope.eventi){
              ctrl.eventi = $rootScope.eventi;
        }

        /*
        Variabili di flusso
         */


        /*
          FUNZIONI
         */
        ctrl.eliminaEvento = eliminaEvento;
        ctrl.modificaEvento = modificaEvento;
        ctrl.rimuoviOpzione = rimuoviOpzione;

        /*
        Funzione che elimina l'evento selezionato dalla lista
        */
        function eliminaEvento(indice) {

            BootstrapDialog.show({
                title: 'Conferma cancellazione',
                message: 'Sicuro di voler cancellare l\'evento selezionato ?',
                closable: true,
                buttons: [{
                    label: 'No',
                    action: function(dialog) {
                        dialog.close();
                    }
                }, {
                    label: 'Si',
                    action: function(dialog) {
                        ctrl.eventi.splice(indice, 1);
                        $rootScope.eventi = ctrl.eventi;
                        dialog.close();
                        setTimeout(function() {
                            $rootScope.$apply();
                        }, 500);
                    }
                }]
            });
        }

        /*
        Funzione che permette di modificare inline l'evento selezionato dalla lista
        */
        function modificaEvento(indice) {

            ctrl.eventi[indice].editable = false;

            BootstrapDialog.show({
                title: 'Conferma modifica',
                message: 'Evento modificato correttamente!',
                closable: true,
                buttons: [{
                    label: 'Ok',
                    action: function(dialog) {
                        dialog.close();
                    }
                }]
            });

        }

        /*
        Funzione che permette di eliminare un'opzione inline l'evento selezionato dalla lista
        */
        function rimuoviOpzione(indiceEvento, indiceOpzione) {
            ctrl.eventi[indiceEvento].opzioni.splice(indiceOpzione,1);

            $rootScope.eventi = ctrl.eventi;

        }
    }
})();
