angular.module('telephone').controller('listPageController', ['$location', '$routeParams', '$scope', '$http', function($location, $routeParams, $scope, $http){

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE=$scope;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.entryProfile = {
    properties: {},
    profiles: [],
    errorMsg: '',
    saving: false,
    loading: false,
    noProfile: false
  };

  $scope.entryProfile.loading = true;

  // Submit GET request to /user/profile/:id
  $http.get('/entry')
  .then(function onSuccess(sailsResponse){

    console.log('sailsResponse: ', sailsResponse);
    $scope.entryProfile.profiles = sailsResponse.data;

    $scope.entryProfile.loading = false;
  })
  .catch(function onError(sailsResponse){

    console.log(sailsResponse);
  
    if(sailsResponse.status === 404) {
      $scope.entryProfile.errorMsg = 'No profile found.';
      return;
    }

    $scope.signupForm.reasons = _.pluck(sailsResponse.data.errors, 'reason');

  })
  .finally(function eitherWay(){
    $scope.entryProfile.loading = false;
  });


  $scope.deleteEntry = function(profileId) {

    var theRoute = 'entry/' + profileId;

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