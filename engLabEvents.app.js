(function() {
  'use strict';

  //creo il modulo principale/app
  var engLabEvents = angular.module('engLabEvents', [ 'ngStorage', 'ui.router']);

  //definisco il controller che associo a tutta l'app e che governerà gli aspetti generali.
  engLabEvents.controller('controllerApp', function() {
    var ctrlApp = this;

    /*
      Attributi
     */
    ctrlApp.templatePage = null;
    ctrlApp.paginaCorrente = 'home';

    /*
    Funzioni
     */
    ctrlApp.cambiaPagina = cambiaPagina;

    function cambiaPagina(nomePagina) {
      if (nomePagina) {
        ctrlApp.paginaCorrente = nomePagina;
        ctrlApp.templatePage = 'views/' + nomePagina + '/' + nomePagina + '.view.html';
      } else {
        ctrlApp.templatePage = null;
        ctrlApp.paginaCorrente = 'home';
      }
    }

  });

})();
