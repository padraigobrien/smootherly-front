angular.module( 'Smootherly.dashboard', ['auth0'])
  .controller( 'dashboardCtrl', function dashboardController($scope, auth) {
console.log(auth);
      $scope.auth = auth;
  })
  .controller( 'chartjsCtrl', function dashboardController($scope) {
    /**
     * Data for Line chart
     */
    $scope.sharpLineOptions = {
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      bezierCurve : false,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 1,
      datasetFill : true,
    };



    /**
     * Data for Sharp Line chart
     */
    $scope.sharpLineData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Example dataset",
          fillColor: "rgba(98,203,49,0.5)",
          strokeColor: "rgba(98,203,49,0.7)",
          pointColor: "rgba(98,203,49,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(98,203,49,1)",
          data: [5000, 3000, 3440, 3219, 4054, 4327]
        }
      ]
    };
});
