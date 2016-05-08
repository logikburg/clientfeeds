// author: Sandeep Mogla

angular.module('starter.controllers', ['jett.ionic.filter.bar'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicFilterBar, $ionicSideMenuDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.feeds,
            update: function(filteredItems) {
                $scope.feeds = filteredItems;
            },
            //filterProperties: 'description'
        });
    };

    $scope.showMenus = function() {
        console.log("showMenus");
        $ionicSideMenuDelegate.toggleLeft();
    };

})

.controller('FeedsCtrl', function($scope, $http, $timeout, $templateCache) {
    $scope.feeds = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];

    $scope.groups = [1, 2, 3, 4];

    $scope.method = 'JSONP';
    $scope.url = 'http://localhost:8081/api/listJobs?callback=JSON_CALLBACK';

    //$scope.fetch = function() {
    $scope.response = null;
    //    $http({
    //        method: $scope.method,
    //        url: $scope.url,
    //        cache: $templateCache
    //    }).

    var promise = $http.get($scope.url);
    promise.success(function(data, status, headers, config) {
        $scope.feeds = data.data;
        alert("success");
    });
    promise.error(function(data, status, headers, config) {
        alert("error");
    });

    //    then(function(response) {
    //        $scope.status = response.status;
    //        $scope.data = response.data;
    //    }, function(response) {
    //        $scope.data = response.data || "Request failed";
    //        $scope.status = response.status;
    //    });
    //};

    $scope.doRefresh = function() {
        console.log('Refreshing!');

        $timeout(function() {
            //simulate async response
            $scope.feeds.push('Feed ' + Math.floor(Math.random() * 1000) + 4);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);

    }

})

.controller('DetailCtrl', function($scope, $stateParams) {});