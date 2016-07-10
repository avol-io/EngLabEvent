(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .service('utentiFacade', service);

  service.$inject = ['$q', 'Configuration', '$resource','loginService'];

  /* @ngInject */
  function service($q, Configuration, $resource,loginService) {

    var serviceDef = {
      getUtenti:getUtenti,
      getUtente:getUtente,
      deleteUtente:deleteUtente,
      saveUtente:saveUtente
    };

    /* ------------------
       $Resource
      ------------------- */
    var config = { headers: { 'token': loginService.getToken() } };
    var $utente = $resource('http://' + Configuration.net.domain + Configuration.net.endpoint + '/users/:uid');


    function getUtenti() {
      var deferred = $q.defer();

      function success(response) {
          deferred.resolve(response);

      }

      function error(response) {
        deferred.reject('Errore problemi con get utenti');
      }
      $utente.query().$promise.then(success, error);

      return deferred.promise;
    }

    function getUtente(uid) {
      var deferred = $q.defer();

      function success(response) {
        deferred.resolve(response);
      }

      function error(response) {
        deferred.reject('Errore problemi con get utente');
      }
      $utente.get({uid:uid}).$promise.then(success, error);

      return deferred.promise;
    }

    function deleteUtente(uid) {
      var deferred = $q.defer();

      function success(response) {
      deferred.resolve(response);
      }

      function error(response) {
        deferred.reject('Errore problemi con get utente');
      }
      $utente.delete({uid:uid}).$promise.then(success, error);

      return deferred.promise;
    }

    function saveUtente(utente) {
      var deferred = $q.defer();

      function success(response) {
          deferred.resolve(response);
      }

      function error(response) {
        deferred.reject(response);
      }
      $utente.save(utente).$promise.then(success, error);

      return deferred.promise;
    }
    return serviceDef;
  }
})();
