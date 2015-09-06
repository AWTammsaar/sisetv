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

  app.controller("AppCtrl", function AppCtrl($scope, $http) {
    //operation initiated when controller is constructed
    var appctrl = this;
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

  app.controller("AdminCtrl", function AdminCtrl($scope, $http) {
    //operation initiated when controller is constructed
    var adminctrl = this;
    adminctrl.toggled = {};
    adminctrl.toggle = function (target) {
      adminctrl.toggled[target] = !adminctrl.toggled[target];
    };

    adminctrl.slidegroup = [
      {
        displayName: "ASD",
        registered: false,
        registerLink: "wasdtesting"
      },
      {
        displayName: "Otherperson",
        registered: true,
        files: [
          {
            id: 0,
            type: "Image",
            name: "cute_kitten.jpeg",
            duration: 10,
            transition: "Smooth",
            transitionTime: 0.5,
            hidden: true
          },
          {
            id: 1,
            type: "Video",
            name: "fox_on_trampoline.wmv",
            duration: 10,
            transition: "Smooth",
            transitionTime: 0.5,
            hidden: false
          },
          {
            id: 2,
            type: "HTML",
            name: "cool_thing.html",
            duration: 15,
            transition: "Slide right",
            transitionTime: 0.3,
            hidden: false
          }
        ]
      },
      {
        displayName: "Thingly",
        registered: true,
        files: [
          {
            id: 0,
            type: "Image",
            name: "cute_kitten.jpeg",
            duration: 10,
            transition: "Smooth",
            transitionTime: 0.5,
            hidden: true
          },
          {
            id: 1,
            type: "Video",
            name: "fox_on_trampoline.wmv",
            duration: 10,
            transition: "Smooth",
            transitionTime: 0.5,
            hidden: false
          },
          {
            id: 2,
            type: "HTML",
            name: "cool_thing.html",
            duration: 15,
            transition: "Slide right",
            transitionTime: 0.3,
            hidden: false
          }
        ]
      },
      {
        displayName: "Nais",
        registered: true,
        files: [
          {
            id: 0,
            type: "Image",
            name: "cute_kitten.jpeg",
            duration: 10,
            transition: "Smooth",
            transitionTime: 0.5,
            hidden: true
          },
          {
            id: 1,
            type: "Video",
            name: "fox_on_trampoline.wmv",
            duration: 10,
            transition: "Smooth",
            transitionTime: 0.5,
            hidden: false
          },
          {
            id: 2,
            type: "HTML",
            name: "cool_thing.html",
            duration: 15,
            transition: "Slide right",
            transitionTime: 0.3,
            hidden: false
          }
        ]
      }

    ];
  });


})();