
angular.module('telephone', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: '/templates/home.html',
  })

  .when('/addEntry', {
    templateUrl: '/templates/addEntry.html',
    controller: 'addEntryController'
  })

  .when('/entry/:id', {
    templateUrl: '/templates/entry.html',
    controller: 'entryPageController'
  })

  .when('/entry', {
    templateUrl: '/templates/list.html',
    controller: 'listPageController'
  })

  .when('/entry/edit/:id', {
    templateUrl: '/templates/editEntry.html',
    // If the current user is an admin, "redirect" (client-side) to `#/users`.
    // Otherwise redirect to `#/profile`
    controller: 'editEntryPageController'
    // controller: ['$scope', '$location', function($scope, $location) {
    //   // if ($scope.me.isAdmin) {

    //   //   // Instead of:
    //   //   // window.location.hash = '#/users';

    //   //   // We can do it the angular way:
    //   //   // (to avoid a bunch of weird digest loop errors)
    //     //$location.path('/users');
    //   //   $location.replace();
    //   //   return;
    //   // }

    //   // // Client-side redirect to `#/profile`
    //   // $location.path('/profile');
    //   // $location.replace();
    //   // return;
    // }]
  });


}]);