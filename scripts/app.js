/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

angular.module('Smootherly', [
    'ui.router',                // Angular flexible routing
    'ui.bootstrap',             // AngularJS native directives for Bootstrap
    'auth0',
    'ngRoute',
    'Smootherly.login',
    'angular-storage',
    'angular-jwt'
])
  .config( function myAppConfig ($stateProvider, $urlRouterProvider, $compileProvider, $routeProvider, authProvider, $httpProvider, $locationProvider,jwtInterceptorProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/login");
    $stateProvider

      // Dashboard - Main page
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "views/dashboard.html",
        data: {
          pageTitle: 'Dashboard'
        }
      })
      .state('login', {
        controller: 'LoginCtrl',
        url: "/login",
        templateUrl: "Login/login.html"
      });

    $locationProvider.html5Mode(true);

    authProvider.init({
      domain: "smootherly.eu.auth0.com",
      clientID: "0m2Mcwwgy382zPa1qWk2GyC0cjJwVDU4"
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    }
  })
  .run(function($rootScope, $state, auth, store) {

    auth.hookEvents();

    $rootScope.$state = $state;

    $rootScope.$on('$locationChangeStart', function() {
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
          } else {
            $location.path('/login');
          }
        }}})
  });



