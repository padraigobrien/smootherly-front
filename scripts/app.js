angular.module('Smootherly', [
  'ui.router',                // Angular flexible routing
  'ui.bootstrap',             // AngularJS native directives for Bootstrap
  'auth0',
  'ngRoute',
  'Smootherly.login',
  'Smootherly.dashboard',
  'Smootherly.navigation',
  'angular-storage',
  'angular-jwt',
  'angles'                 // Angular ChartJS
])
  .config(function myAppConfig($stateProvider, $urlRouterProvider, $compileProvider, $routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/landing");
    $stateProvider
      // Dashboard - Main page
      .state('dashboard', {
        url: "/dashboard",
        controller: "dashboardCtrl",
        templateUrl: "components/dashboard/dashboard.html",
        data: {
          pageTitle: 'Smootherly'
        },
        requiresLogin: true
      })
      .state('login', {
        controller: 'LoginCtrl',
        url: "/login",
        templateUrl: "components/Login/login.html"
      })
      .state('landing', {
        url: "/landing",
        templateUrl: "components/Landing/landing.html",
        data: {
          pageTitle: 'Landing page',
          specialClass: 'landing-page'
        }
      });

    //$locationProvider.html5Mode(true);

    authProvider.init({
      domain: "smootherly.eu.auth0.com",
      clientID: "0m2Mcwwgy382zPa1qWk2GyC0cjJwVDU4"
    });

    jwtInterceptorProvider.tokenGetter = function (store) {
      return store.get('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function ($rootScope, $state, auth, store, jwtHelper, $location) {

    auth.hookEvents();
    $rootScope.$state = $state;

    $rootScope.$on('$locationChangeStart', function () {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Either show the login page or use the refresh token to get a new idToken
          $location.path('/login');
        }
      }
      else {
        switch ($location.url()) {
          case '':
            console.log("No url");
            break;
          case '/landing':
            console.log("Landing page");
            break;
          case '/dashboard':
            console.log("dashboard page");
            $location.path('/login');
            break;
          case '/login':
            console.log("login page");
            break;
          default:
            console.log("no matching route");
            $location.path('/login');
        }
      }
    });
  });



