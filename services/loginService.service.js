
(function() {
  'use strict';

  angular
    .module('engLabEvents')
    .service('loginService', service);

  service.$inject = ['$localStorage', '$q', 'Configuration','jwtHelper','$resource'];

  /* @ngInject */
  function service($localStorage, $q, Configuration,jwtHelper,$resource) {

    var serviceDef = {
      login: login,
      logout: logout,
      getToken:getToken,
      getProfile:getProfile
    };

    /* -------------------
       $Resource
      ------------------- */

    var $login = $resource('http://' + Configuration.net.domain +'/login');


    function getToken(){
      return $localStorage.token;
    }

    function getProfile(){
      return $localStorage.profile;
    }


    function login(uid,password) {
      var deferred = $q.defer();

      function success(response) {
        $localStorage.token=response.token;
        var profile = jwtHelper.decodeToken(response.token);
        console.log(profile);
        $localStorage.profile=profile;
        deferred.resolve(response);
        return profile;
      }

      function error(response) {
        deferred.reject('Errore nella fase di login');
      }
console.log({uid:uid,password:password});
      $login.save({uid:uid,password:password},{}).$promise.then(success, error);

      return deferred.promise;
    }

    function logout(){
        $localStorage.$reset();
    }

    return serviceDef;
  }
})();
