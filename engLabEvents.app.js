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

    $stateProvider.state('login', {
      name: 'login',
      url: '/login',
      templateUrl: 'views/login/login.view.html',
      controller: 'login',
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
      url: '/visualizza-eventi/{id}',
      indietro: 'visualizzaEventi',
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

    $stateProvider.state('utentiRegistrati', {
      name: 'utentiRegistrati',
      url: '/utentiRegistrati',
      indietro: 'home',
      templateUrl: 'views/utentiRegistrati/utentiRegistrati.view.html',
      controller: 'utentiRegistrati',
      controllerAs: 'ctrl'
    });

    $stateProvider.state('modificaEvento', {
      name: 'modificaEvento',
      url: '/modificaEvento/{id}',
      indietro: 'visualizzaEventi',
      templateUrl: 'views/creaEvento/creaEvento.view.html',
      controller: 'creaEvento',
      controllerAs: 'ctrl'
    });

  }

  /**************************************
  CONTROLLER PRINCIPALE PER TUTTA L'app
  **************************************/


  //definisco il controller che associo a tutta l'app e che governerà gli aspetti generali.
  engLabEvents.controller('controllerApp', controllerApp);

  controllerApp.$inject = ['$state', '$timeout', '$rootScope','$localStorage'];

  function controllerApp($state, $timeout, $rootScope,$localStorage) {
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
    ctrlApp.logout = logout;


    /*
      WATCH
     */
    //Intercetto il cambio di stato e mi memorizzo lo stato precedente
    $rootScope.$on('$stateChangeSuccess', function(ev, tostate, toParams, fromstate, fromParams) {
      ctrlApp.statoCorrente = tostate;
      ctrlApp.statoPrecedente = fromstate;
    });

    //Intercetto il cambio di location e verifico se l'utente è loggato e in futuro se potrà accedere a quel percorso
    $rootScope.$on('$locationChangeStart', function(event, next, current) {

      var profile = $localStorage.utenteLoggato;

      if (!profile) {
        if(next.indexOf('registrati')<=0){ //prossimamente gestiremo i percorsi validi da loggati e non
          $state.go('login');
        }
      }

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


    function logout() {
      $localStorage.utenteLoggato = null;
      $state.go('login');
    }

    function init() {
      if ($localStorage.utenteLoggato) {
        ctrlApp.utente = $localStorage.utenteLoggato;
      } else {
        $timeout(function() {
          $state.go('login');
        }, 10);
      }

      if(!$localStorage.amministratori){
        //email degli amministratori di sistema
        $localStorage.amministratori = ['dario.fabbri@eng.it', 'alessandro.avolio@eng.it'];
      }
    }
    init();


  }


})();
