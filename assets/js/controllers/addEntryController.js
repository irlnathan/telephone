angular.module('telephone').controller('addEntryController', ['$scope', '$http', function($scope, $http){

  // set-up loading state
  $scope.addEntryForm = {
    loading: false,
    errorMsg: '',
    reasons: []
  };

  $scope.addEntry = function(){

    // Set the loading state (i.e. show loading spinner)
    $scope.addEntryForm.loading = true;

    // Submit a POST request to Sails.
    $http.post('/entry', {
      email: $scope.addEntryForm.email,
      name: $scope.addEntryForm.name,
      phone: $scope.addEntryForm.phone
    })
    .then(function onSuccess(sailsResponse){
      // window.location = '#/profile/' + sailsResponse.data.id;
      window.location = '#/entry/' + sailsResponse.data.id;
       // window.location = 'entry/' + sailsResponse.data.id;
    })
    .catch(function onError(sailsResponse){

      console.log('sailsResponse: ', sailsResponse);

      $scope.addEntryForm.errorMsg = true;

      $scope.addEntryForm.reasons = _.pluck(sailsResponse.data.errors, 'reason');


    })
    .finally(function eitherWay(){
      $scope.addEntryForm.loading = false;
    });
  };
}]);