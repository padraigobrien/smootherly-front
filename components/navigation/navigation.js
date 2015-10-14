angular.module( 'Smootherly.navigation', ['auth0'])
  .controller( 'navigationCtrl', function dashboardController($scope,$location, auth, store) {

    $scope.auth = auth;

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      console.log("Logged out");
      $location.path('/login');
    }
  });
