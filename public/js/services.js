'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  service('apiService', ["$http", function ($http) {
    return {
      getUser: function (fn) {
        $http.get('/api/getUser', {params: {}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using getUser");
          });
      },
      setSlides: function (fn) {
        $http.post('/api/setSlides', {params: {}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setSlides");
          });
      },
      addSlide: function (fn) {
        $http.post('/api/addSlide', {params: {}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setSlides");
          });
      },
      // Admin functionality
      getUsers: function (fn) {
        $http.get('/api/getUsers', {params: {}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setSlides");
          });
      },
      setUsers: function (fn) {
        $http.post('/api/addSlide', {params: {}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setSlides");
          });
      }
    };
  }]);