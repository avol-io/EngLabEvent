(function () {
  'use strict';

  //creo il modulo principale/app
  var engLabEvents = angular.module('engLabEvents', []);

  //definisco il controller che associo a tutta l'app e che governerà gli aspetti generali.
  engLabEvents.controller('controllerApp', function () {
    var ctrlApp = this;

    /*
      Attributi
     */
    ctrlApp.currentPage = null;
    ctrlApp.templatePage = null;

    /*
     Attributi di flusso
    */
    ctrlApp.isMainPage = true;

    /*
    Funzioni
     */
    ctrlApp.changePage = changePage;


    function changePage(pageName) {
      if (pageName != null) {
        ctrlApp.currentPage = pageName;
        ctrlApp.templatePage = 'views/' + pageName + '/' + pageName + '.view.html';
        ctrlApp.isMainPage = false;
      }
      else {
        ctrlApp.currentPage = null;
        ctrlApp.templatePage = null;
        ctrlApp.isMainPage = true;
      }
    }

  });

})();
