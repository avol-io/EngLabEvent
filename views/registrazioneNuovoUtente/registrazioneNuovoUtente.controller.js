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


    /*
      ATTRIBUTI
     */

    /*
    Variabili di flusso
     */


    /*
      FUNZIONI
     */
     ctrl.registraUtente = registraUtente;

     function registraUtente(){
        var utente = ctrl.utente;

        if(!$rootScope.utenti){
            $rootScope.utenti = [];
        }

        ctrl.utenti = $rootScope.utenti;

        //aggiungo l'utente inserito nella lista dei registrati
        ctrl.utenti.push(ctrl.utente);

        BootstrapDialog.show({
            title: 'Conferma registrazione',
            message: 'Utente registrato correttamente!',
            closable: true,
            buttons: [{
                label: 'Ok',
                action: function(dialog) {
                    dialog.close();
                }
            }]
        });
     }

  }
})();
