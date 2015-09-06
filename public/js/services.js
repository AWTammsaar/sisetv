'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  service('apiService', ["$http", function ($http) {
    return {
      getUser: function (fn) {
        $http.get('/api/getUser', {}).
          success(function (data, status, headers, config) {
            fn(data.data);
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using getUser");
          });
      },
      setSlides: function (slides, fn) {
        $http.post('/api/setSlides', {slides: slides}).
          success(function (data, status, headers, config) {
            fn(data.data);
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setSlides");
          });
      },
      addSlide: function (slide, fn) {
        $http.post('/api/addSlide', {data: slide}).
          success(function (data, status, headers, config) {
            fn(data.data);
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using addSlide");
          });
      },
      deleteSlide: function (id, fn) {
        $http.post('/api/deleteSlide', {id: id}).
          success(function (data, status, headers, config) {
            fn(data.data);
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using deleteSlide");
          });
      },
      // Admin functionality
      getUsers: function (fn) {
        $http.get('/api/getUsers', {}).
          success(function (data, status, headers, config) {
            fn(data.data);
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using getUsers");
          });
      },
      setUsers: function (users, fn) {
        $http.post('/api/setUsers', {users: users}).
          success(function (data, status, headers, config) {
            fn(data.data);
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setUsers");
          });
      }
    };
  }]).
  service('logout', ["$http", function ($http) {
    return function (fn) {
      $http.get('/api/logout').
        success(function (data, status, headers, config) {
          fn(false);
        }).
        error(function (data, status, headers, config) {
          fn(false);
        });
    }
  }]);
;