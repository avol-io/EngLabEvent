(function() {
    'use strict';

    angular
        .module('engLabEvents')
        .directive('persona', persona);

    /* @ngInject */
    function persona() {
        var directive = {
            restrict: 'E',
            templateUrl: 'directives/persona/persona.view.html',
            scope: {
              persona:'=',
              modalita:'=?', //'normale','icona','espansa'
              onSelezionato:'&'
            },
            controller: Controller,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;


    }

    Controller.$inject = [];

    /* @ngInject */
    function Controller() {
        var ctrl = this;
        /*
        Attributi
         */
        ctrl.selezionato=false;

        /*
        Funzioni
         */
        ctrl.cambiaModalita=ctrl.cambiaModalita;
        ctrl.onHold=ctrl.onHold;

        function onHold(){
          if(ctrl.onSelezionato){
            //se ho definito una funziona da richiamare quando sono selezionato allora quando farò hold sulla persona essa si selezionerà e chiamerà la funzione
              ctrl.selezionato=!ctrl.selezionato;
          }
        }

        function init(){
          // if(ctrl.modalita==0){
          ctrl.modalita=   'normale';
          // }
        }
        init();
    }
})();
