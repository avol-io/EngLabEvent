(function() {
    'use strict';

    angular
        .module('engLabEvents')
        .controller('homeController', homeController);

    homeController.$inject = [];

    /* @ngInject */
    function homeController() {
      var ctrl=this;

      ctrl.onPersonaSelezionata=onPersonaSelezionata;

      function onPersonaSelezionata(persona){
        alert('Ciaoooo '+persona.nome+'!');
      }
    }
})();
