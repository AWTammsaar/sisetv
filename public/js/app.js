/**
 * Created by AlWilliam on 4/9/2015.
 */
// Code goes here

(function() {
    var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngRoute']);
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/app/view1', {
            templateUrl: 'partials/view1',
            controller: MyCtrl1});
        $routeProvider.when('/app/view2', {
            templateUrl: 'partials/view2',
            controller: MyCtrl2});
        $routeProvider.when('/app/admin', {
            templateUrl: 'partials/admin',
            controller: MyCtrl2});
        $routeProvider.when('/app/cc', {
            templateUrl: 'partials/cc',
            controller: MyCtrl2});
        $routeProvider.otherwise({redirectTo: '/app/cc'});
        $locationProvider.html5Mode(true);
    }]);
    app.controller("AppCtrl",function AppCtrl($scope, $http) {
        //operation initiated when controller is constructed
        var appctrl = this;
        $http({method: 'GET', url: '/api/name'}).
            success(function(data, status, headers, config) {
              appctrl.name = data.data;
            }).
            error(function(data, status, headers, config) {
                appctrl.name = 'Error!'
            });
    });
    app.controller("ContentCtrl",function ContentCtrl($scope, $http) {
        //operation initiated when controller is constructed
        var contentCtrl = this;
        contentCtrl.files = [
            {
                id:0,
                type:"Image",
                name: "cute_kitten.jpeg",
                duration: 10,
                transition: "Smooth",
                transitionTime: 0.5,
                hidden:true
            },
            {
                id:1,
                type:"Video",
                name: "fox_on_trampoline.wmv",
                duration: 10,
                transition: "Smooth",
                transitionTime: 0.5,
                hidden:false
            },
            {
                id:2,
                type:"HTML",
                name: "cool_thing.html",
                duration: 15,
                transition: "Slide right",
                transitionTime: 0.3,
                hidden:false
            }
        ];
        contentCtrl.newFile = {
            id:NaN,
            type:"New",
            name:"",
            duration:NaN,
            transition:"Select transition",
            transitionTime:NaN,
            hidden:true
        };
        this.swap=function(id,direction){
            var targetid=id+direction;
            if(this.files.length>targetid && targetid>=0) {
                var swapinit = this.files[id],
                    swaptarget = this.files[targetid];
                swapinit.id=targetid;
                swaptarget.id=id;
                this.files[id]=swaptarget;
                this.files[targetid]=swapinit;
            }
        };
        this.toggleVisible = function(id){
            this.files[id].hidden = !this.files[id].hidden;
        };
        this.addFile = function(){
            this.newFile.id=this.files.length;
            this.files.push(jQuery.extend(true, {}, this.newFile));
            this.newFile = {
                id:NaN,
                type:"New",
                name:"",
                duration:NaN,
                transition:"Select transition",
                transitionTime:NaN,
                hidden:true
            };
        };
        this.deleteFile=function(id){
            this.files.splice(id,1);
            this.reOrderFrom(id);
        };
        this.reOrderFrom = function(startid){
            // Allows for optimal array indexing.
            for(var i=startid,l=this.files.length;i<l;i++){
                this.files[i].id=i;
            }
        };
        $http({method: 'GET', url: '/api/files'}).
         success(function(data, status, headers, config) {
              contentCtrl.files = data.data;
            }).
         error(function(data, status, headers, config) {
                contentCtrl.files = {
                    type:"Error",
                    name:"Something has gone wrong",
                    duration: 0,
                    transition: "None",
                    transitionTime: 0
                };
            });

    });

    app.controller("AdminCtrl",function AdminCtrl($scope, $http) {
        //operation initiated when controller is constructed
        var adminctrl = this;
        /**$http({method: 'GET', url: '/api/name'}).
            success(function(data, status, headers, config) {
                appctrl.name = data.name;
            }).
            error(function(data, status, headers, config) {
                appctrl.name = 'Error!'
            });
         */
        adminctrl.slidegroup = [
            {
                name:"ASD",
                files:[
                    {
                        id:0,
                        type:"Image",
                        name: "cute_kitten.jpeg",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:true
                    },
                    {
                        id:1,
                        type:"Video",
                        name: "fox_on_trampoline.wmv",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:false
                    },
                    {
                        id:2,
                        type:"HTML",
                        name: "cool_thing.html",
                        duration: 15,
                        transition: "Slide right",
                        transitionTime: 0.3,
                        hidden:false
                    }
                ]
            },
            {
                name:"Otherperson",
                files:[
                    {
                        id:0,
                        type:"Image",
                        name: "cute_kitten.jpeg",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:true
                    },
                    {
                        id:1,
                        type:"Video",
                        name: "fox_on_trampoline.wmv",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:false
                    },
                    {
                        id:2,
                        type:"HTML",
                        name: "cool_thing.html",
                        duration: 15,
                        transition: "Slide right",
                        transitionTime: 0.3,
                        hidden:false
                    }
                ]
            },
            {
                name:"Thingly",
                files:[
                    {
                        id:0,
                        type:"Image",
                        name: "cute_kitten.jpeg",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:true
                    },
                    {
                        id:1,
                        type:"Video",
                        name: "fox_on_trampoline.wmv",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:false
                    },
                    {
                        id:2,
                        type:"HTML",
                        name: "cool_thing.html",
                        duration: 15,
                        transition: "Slide right",
                        transitionTime: 0.3,
                        hidden:false
                    }
                ]
            },
            {
                name:"Nais",
                files:[
                    {
                        id:0,
                        type:"Image",
                        name: "cute_kitten.jpeg",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:true
                    },
                    {
                        id:1,
                        type:"Video",
                        name: "fox_on_trampoline.wmv",
                        duration: 10,
                        transition: "Smooth",
                        transitionTime: 0.5,
                        hidden:false
                    },
                    {
                        id:2,
                        type:"HTML",
                        name: "cool_thing.html",
                        duration: 15,
                        transition: "Slide right",
                        transitionTime: 0.3,
                        hidden:false
                    }
                ]
            }

        ];
    });


})();