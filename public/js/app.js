/**
 * Created by AlWilliam on 4/9/2015.
 */
// Code goes here

(function () {
  var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngRoute']);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/admin/admin', {
      templateUrl: 'partials/admin'
    });
    $routeProvider.when('/admin/cc', {
      templateUrl: 'partials/cc'
    });
    $routeProvider.otherwise({redirectTo: '/admin/cc'});
    $locationProvider.html5Mode(true);
  }]);

  app.controller("AppCtrl", function AppCtrl($scope, $http, logout) {
    //operation initiated when controller is constructed
    var appctrl = this;
    appctrl.logout = function(){
      console.log("wat");
      logout(function(){});
    }
  });

  app.controller("ContentCtrl", function ContentCtrl($scope, $http, apiService) {
    //operation initiated when controller is constructed
    var contentCtrl = this;
    contentCtrl.files = {};
    contentCtrl.swap = function (id, direction) {
      var targetid = id + direction;
      if (this.files.length > targetid && targetid >= 0) {
        var swapinit = contentCtrl.files[id],
          swaptarget = contentCtrl.files[targetid];
        swapinit.id = targetid;
        swaptarget.id = id;
        contentCtrl.files[id] = swaptarget;
        contentCtrl.files[targetid] = swapinit;
      }
    };

    contentCtrl.toggleVisible = function (id) {
      contentCtrl.files[id].hidden = !contentCtrl.files[id].hidden;
      apiService.setSlides(contentCtrl.files, function (data) {
        console.log(data);
        contentCtrl.files = data;
        contentCtrl.reOrderFrom(0);
      });
    };

    contentCtrl.deleteFile = function (id) {
      apiService.deleteSlide(id, function (data) {
        contentCtrl.files = data;
        contentCtrl.reOrderFrom(0);
      });
    };

    contentCtrl.reOrderFrom = function (startid) {
      // Allows for optimal array indexing.
      for (var i = startid, l = contentCtrl.files.length; i < l; i++) {
        contentCtrl.files[i].id = i;
      }
    };

    // Initialize slide data
    apiService.getUser(function (data) {
      contentCtrl.files = data.slides;
      contentCtrl.reOrderFrom(0);
    });

  });

  app.controller("AdminCtrl", function AdminCtrl($scope, $http, adminService) {
    //operation initiated when controller is constructed
    var adminctrl = this;
    adminctrl.toggled = {};
    adminctrl.toggle = function (target) {
      adminctrl.toggled[target] = !adminctrl.toggled[target];
    };

    adminctrl.orderUsers = function () {
      // Allows for optimal array indexing.
      for (var i = 0, l = adminctrl.slidegroup.length; i < l; i++) {
        adminctrl.slidegroup[i].id = i;
      }
    };

    adminctrl.deleteSlide = function (userid,slideid){
      adminService.deleteSlide(userid,slideid,function(slides){
        adminctrl.slidegroup[userid].slides = slides;
      });
    };

    adminctrl.toggleSlide = function(userid,slideid){
      adminctrl.slidegroup[userid].slides[slideid].hidden = !adminctrl.slidegroup[userid].slides[slideid].hidden;
      adminService.setUsers(adminctrl.slidegroup,function(){
        adminctrl.slidegroup=data;
        adminctrl.orderUsers();
      });
    };

    adminctrl.deleteUser = function(userid){
      adminService.deleteUser(userid,function(data){
        adminctrl.slidegroup=data;
        adminctrl.orderUsers();
      });
    };

    adminService.getUsers(function(data){
      adminctrl.slidegroup=data;
      adminctrl.orderUsers();
    });
  });

})();