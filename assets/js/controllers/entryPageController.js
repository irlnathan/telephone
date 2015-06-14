angular.module('telephone').controller('entryPageController', ['$location', '$routeParams', '$scope', '$http', function($location, $routeParams, $scope, $http){

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE=$scope;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.entryProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false,
    noProfile: false
  };

  $scope.entryProfile.loading = true;

  // Build up route
  var theRoute = '/entry/' +  $routeParams.id;

  // Submit GET request to /user/profile/:id
  $http.get(theRoute)
  .then(function onSuccess(sailsResponse){

    $scope.entryProfile.properties.email = sailsResponse.data.email;
    $scope.entryProfile.properties.name = sailsResponse.data.name;
    $scope.entryProfile.properties.phone = sailsResponse.data.phone;
    $scope.entryProfile.properties.id = sailsResponse.data.id;

    $scope.entryProfile.loading = false;
  })
  .catch(function onError(sailsResponse){

    console.log(sailsResponse);
  
    if(sailsResponse.status === 404) {
      $scope.entryProfile.errorMsg = 'No profile found.';
      $scope.entryProfile.noProfile = true;
      return;
    }

    $scope.signupForm.reasons = _.pluck(sailsResponse.data.errors, 'reason');

  })
  .finally(function eitherWay(){
    $scope.entryProfile.loading = false;
  });

  $scope.deleteEntry = function() {

    var theRoute = 'entry/' + $routeParams.id;

    console.log('theRoute: ', theRoute);

    $http.delete(theRoute)
    .then(function onSuccess(deletedProfile){
      window.location = '#/addEntry';
    })
    .catch(function onError(err){
      $scope.entryProfile.errorMsg = 'An unexpected error occurred: ' + err;
    });
  };

}]);