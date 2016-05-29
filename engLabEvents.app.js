(function() {
  'use strict';
  /**************************************
  DEFINIZIONE DELL'APP
  **************************************/
  //creo il modulo principale/app
  var engLabEvents = angular.module('engLabEvents', ['ngStorage', 'ui.router']);

  /**************************************
  ROUTING
  **************************************/

  /**                                                  /\/\      /\
                                                      /  \ \/\  /  \
             /\                                /\    /    \/  \/    \
         /\_/  \                              /  \  /     /          \
        /  /    \                            /    \/     /
   ____________________________________________________________________
                      /  :  \           ______________
                     /   .   \         |              |
                    /    .    \        |  UI-ROUTING  |
                   /           \       |______________|
                  /      .      \             ||
                 /               \            ||
                /        .        \           ||
               /                   \          ||
  **/

  engLabEvents.config(configRouterGenerale);

  //  configRouterGenerale.$inject('$stateProvider', '$urlRouterProvider');

  function configRouterGenerale($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      name: 'home',
      url: '/',
      templateUrl: 'views/home/home.view.html',
      controller: 'homeController',
      controllerAs: 'ctrl'
    });

    $stateProvider.state('creaEvento', {
      name: 'creaEvento',
      indietro: 'home',
      url: '/crea-evento',
      templateUrl: 'views/creaEvento/creaEvento.view.html',
      controller: 'creaEvento',
      controllerAs: 'ctrl'
    });

    $stateProvider.state('visualizzaEventi', {
      name: 'visualizzaEventi',
      indietro: 'home',
      url: '/visualizza-eventi',
      templateUrl: 'views/visualizzaEventi/visualizzaEventi.view.html',
      controller: 'visualizzaEventi',
      controllerAs: 'ctrl'
    });

    $stateProvider.state('visualizzaEvento', {
      name: 'visualizzaEvento',
      indietro: 'visualizzaEventi',
      url: '/visualizza-eventi/{id}',
      templateUrl: 'views/visualizzaEvento/visualizzaEvento.view.html',
      controller: 'visualizzaEvento',
      controllerAs: 'ctrl'
    });

    $stateProvider.state('registrazioneNuovoUtente', {
      name: 'registraNuovoUtente',
      url: '/registrati',
      indietro: 'home',
      templateUrl: 'views/registrazioneNuovoUtente/registrazioneNuovoUtente.view.html',
      controller: 'registrazioneNuovoUtente',
      controllerAs: 'ctrl'
    });

  }

  /**************************************
  CONTROLLER PRINCIPALE PER TUTTA L'app
  **************************************/


  //definisco il controller che associo a tutta l'app e che governerà gli aspetti generali.
  engLabEvents.controller('controllerApp', controllerApp);

  controllerApp.$inject = ['$state', '$timeout', '$rootScope'];

  function controllerApp($state, $timeout, $rootScope) {
    var ctrlApp = this;

    /*
      Attributi
     */
    ctrlApp.statoCorrente = {};
    ctrlApp.statoPrecedente = {};



    /*
    Funzioni
     */
    ctrlApp.indietro = indietro;
    ctrlApp.cambiaStato = cambiaStato;


    /*
      WATCH
     */
    //Intercetto il cambio di stato e mi memorizzo lo stato precedente
    $rootScope.$on('$stateChangeSuccess', function(ev, tostate, toParams, fromstate, fromParams) {
      ctrlApp.statoCorrente = tostate;
      ctrlApp.statoPrecedente = fromstate;
    });


    //va allo stato precedente
    function indietro() {
      if (ctrlApp.statoCorrente.indietro) {
        $state.go(ctrlApp.statoCorrente.indietro);
      } else {
        window.history.back();
      }
      //$state.go(ctrlApp.statoPrecedente, ctrlApp.statoPrecedente.params, ctrlApp.statoPrecedente.options);

    }


    //cambia lo stato programmaticamente
    function cambiaStato(nomeStato, params) {
      var stato = $state.get(nomeStato);
      if (stato) {
        $state.go(nomeStato, params);
      }
    }



  }

})();
