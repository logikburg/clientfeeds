// author: Sandeep Mogla

angular.module('starter.controllers', ['jett.ionic.filter.bar', 'ngTagsInput', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicFilterBar, $ionicSideMenuDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //
    //});

    // Create the login modal that we will use later
    //    $ionicModal.fromTemplateUrl('templates/login.html', {
    //        scope: $scope
    //    }).then(function(modal) {
    //        $scope.modal = modal;
    //    });

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

.controller('NotificationsCtrl', function($scope, $http, $timeout, $templateCache, $cordovaNetwork) {
    $scope.feeds = [];
    $scope.groups = ["Test"];

    //$scope.method = 'JSONP';-
    //$scope.url = 'http://localhost:8081/api/listJobs?callback=JSON_CALLBACK';

    $scope.url = 'http://nodejs-clientfeeds.rhcloud.com/api/all';
    $scope.response = null;

    //$scope.fetch = function() {
    //    $http({
    //        method: $scope.method,
    //        url: $scope.url,
    //        cache: $templateCache
    //    }).

    var promise = $http.get($scope.url);

    promise.success(function(data, status, headers, config) {
        // getting device infor from $cordovaDevice
        $scope.feeds = data.data;
        console.log("success");
    });

    promise.error(function(data, status, headers, config) {
        alert("error" + data + " s : " + status);
        console.log("error");
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

.controller('DetailCtrl', function($scope, $stateParams) {})

.controller('SignUpCtrl', function($scope, $stateParams) {

})

.controller('SettingsCtrl', function($scope, $stateParams) {
    var tagsData = [{
        id: 1,
        tag: 'Apple'
    }, {
        id: 2,
        tag: 'Banana'
    }, {
        id: 3,
        tag: 'Cherry'
    }, {
        id: 4,
        tag: 'Cantelope'
    }, {
        id: 5,
        tag: 'Grapefruit'
    }, {
        id: 6,
        tag: 'Grapes',
        selected: true
    }, {
        id: 7,
        tag: 'Lemon'
    }, {
        id: 8,
        tag: 'Lime'
    }, {
        id: 9,
        tag: 'Melon',
        selected: true
    }, {
        id: 10,
        tag: 'Orange'
    }, {
        id: 11,
        tag: 'Strawberry'
    }, {
        id: 11,
        tag: 'Watermelon'
    }];

    $scope.items = tagsData;

    $scope.tags = [{
        text: 'Tag1'
    }, {
        text: 'Tag2'
    }, {
        text: 'Tag3'
    }];

})

.controller('HomeCtrl', function($scope, $stateParams) {


})

.controller('FavouritesCtrl', function($scope, $stateParams) {


})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, $location, $ionicModal) {
    // Form data for the login modal
    $scope.loginData = {};



    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        //$scope.modal.hide();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
            $location.path("/app/notifications");
        }, 1000);
    };
})


.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});