///**
// * HOMER - Responsive Admin Theme
// * version 1.8
// *
// */
//
//function configState($stateProvider, $urlRouterProvider, $compileProvider, $routeProvider, authProvider, $httpProvider, $locationProvider,jwtInterceptorProvider) {
//
//    // Optimize load start with remove binding information inside the DOM element
//    $compileProvider.debugInfoEnabled(true);
//
//    // Set default state
//    $urlRouterProvider.otherwise("/login");
//    $stateProvider
//
//        // Dashboard - Main page
//        .state('dashboard', {
//            url: "/dashboard",
//            templateUrl: "views/dashboard.html",
//            data: {
//                pageTitle: 'Dashboard'
//            }
//        })
//      .state('login', {
//            controller: 'LoginCtrl',
//            url: "/login",
//            templateUrl: "Login/login.html"
//      });
//
//  authProvider.init({
//    domain: AUTH0_DOMAIN,
//    clientID: AUTH0_CLIENT_ID,
//    loginUrl: '/login'
//  });
//
//  //jwtInterceptorProvider.tokenGetter = function(store) {
//  //  return store.get('token');
//  //}
//}
//
//angular
//    .module('Smootherly')
//    .config(configState)
//    .run(function($rootScope, $state) {
//        $rootScope.$state = $state;
//    });
