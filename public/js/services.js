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
      setSlides: function (slides, fn) {
        $http.post('/api/setSlides', {params: {slides:slides}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setSlides");
          });
      },
      addSlide: function (slide, fn) {
        $http.post('/api/addSlide', {params: {data:slide}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using addSlide");
          });
      },
      deleteSlide: function (id, fn) {
        $http.post('/api/addSlide', {params: {id:id}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using deleteSlide");
          });
      },
      // Admin functionality
      getUsers: function (fn) {
        $http.get('/api/getUsers', {params: {}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using getUsers");
          });
      },
      setUsers: function (users, fn) {
        $http.post('/api/setUsers', {params: {users:users}}).
          success(function (data, status, headers, config) {
            fn({data: data.data});
          }).
          error(function (data, status, headers, config) {
            console.log("Error while using setUsers");
          });
      }
    };
  }]);