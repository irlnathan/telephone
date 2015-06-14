angular.module('telephone').controller('editEntryPageController', ['$location', '$routeParams', '$scope', '$http', function($location, $routeParams, $scope, $http) {

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE = $scope;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.editEntryForm = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false,
    changePassword: {}
  };

  $scope.editEntryForm.loading = true;

  // console.log('The id is: ', $routeParams.id);
  var theRoute = '/entry/' +  $routeParams.id;

  // Submit GET request to Sails.
  $http.get(theRoute)
    .then(function onSuccess(sailsResponse) {
      $scope.editEntryForm.properties.name = sailsResponse.data.name;
      $scope.editEntryForm.properties.email = sailsResponse.data.email;
      $scope.editEntryForm.properties.phone = sailsResponse.data.phone;

      $scope.editEntryForm.loading = false;
    })
    .catch(function onError(sailsResponse) {
      console.log(sailsResponse);
      // Otherwise, display generic error if the error is unrecognized.
      $scope.editEntryForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

    })
    .finally(function eitherWay() {
      $scope.editEntryForm.loading = false;
    });

  $scope.updateEntry = function() {

    var theRoute = '/entry/' + $routeParams.id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        name: $scope.editEntryForm.properties.name,
        email: $scope.editEntryForm.properties.email,
        phone: $scope.editEntryForm.properties.phone
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        window.location = '#/entry/' + sailsResponse.data[0].id;

        $scope.editEntryForm.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editEntryForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editEntryForm.loading = false;
      });
  };

  $scope.restore = function() {

    // Submit PUT request to Restore GravatarURL.
    $http.put('/user/restoreGravatarURL', {
        email: $scope.editEntryForm.properties.email
      })
      .then(function onSuccess(sailsResponse) {

        // Restore the current gravatarURL
        $scope.editEntryForm.properties.gravatarURL = sailsResponse.data;

        $scope.editEntryForm.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editEntryForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editEntryForm.loading = false;
      });
  };

  $scope.changeMyPassword = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    $http.put('/user/changePassword', {
        id: $scope.editEntryForm.properties.id,
        password: $scope.editEntryForm.properties.password
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
          // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
          window.location = '#/profile/' + $scope.editEntryForm.properties.id;
          // 
          // toastr.success('Password Updated!');

        $scope.editEntryForm.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editEntryForm.changePassword.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editEntryForm.loading = false;
      });

  };

}]);