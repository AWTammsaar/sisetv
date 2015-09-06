'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('selectOnClick', function ($window) {
    return {
      link: function (scope, element) {
        element.on('click', function () {
          var selection = $window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(element[0]);
          selection.removeAllRanges();
          selection.addRange(range);
        });
      }
    }
  }).
  directive('customOnChange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeFunc = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeFunc);
      }
    };
  });
