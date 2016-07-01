(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .directive('listaEventi', listaEventi);

  /* @ngInject */
  function listaEventi() {
    var directive = {
      restrict: 'E',
      templateUrl: 'directives/lista-eventi/lista-eventi.view.html',
      scope: {
        eventi: '='
      },
      link: linkFunction,
      controller: Controller,
      controllerAs: 'ctrl',
      bindToController: true
    };

    function linkFunction($scope, $elm, $attr, ctrl) {

    }

    return directive;

  }

  Controller.$inject = ['$localStorage','$state'];

  /* @ngInject */
  function Controller($localStorage,$state) {
    var ctrl = this;

    /*
    Attributi
     */
     ctrl.utenteLoggato = $localStorage.utenteLoggato;

     ctrl.evento = null;

    /*
  FUNZIONI
     */
     //elimina un evento
     ctrl.eliminaEvento = eliminaEvento;

     //iscrive l'utente loggato all'evento
     ctrl.iscriviti = iscriviti;

     //gestisce il cambio di vista in modifica evento
     ctrl.modificaEvento = modificaEvento;

     //gestisce il cambio di vista in visualizza evento
     ctrl.visualizzaEvento = visualizzaEvento;

     /*
     Visualizza l'evento selezionato
     */
     function visualizzaEvento(evento) {
       console.log('chiama visualizzaEvento');
       $state.go('visualizzaEvento', {
         id: evento.id
       });
     }

     /*
     Va alla pagina di modifica evento
     */
     function modificaEvento(evento) {
       $state.go('modificaEvento', {
         id: evento.id
       });
     }

     /*
     Iscrive l'utente attualmente loggato ad un evento
      */
     function iscriviti(evento) {
       ctrl.evento = evento;
       if (!ctrl.evento.utenti) {
         ctrl.evento.utenti = [];
       }

       for (var i = 0; i < ctrl.evento.utenti.length; i++) {
         if (ctrl.utenteLoggato.email === ctrl.evento.utenti[i].email) {
           alert('Sei già iscritto a questo evento!');
           return;
         }
       }

       ctrl.evento.utenti.push(ctrl.utenteLoggato);
       alert('Ti sei iscritto a questo evento!');
     }

     function eliminaEvento(evento) {
       $localStorage.eventi.splice(evento, 1);
       $state.go('visualizzaEventi');
     }

  }

})();
