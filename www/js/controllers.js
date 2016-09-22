// author: Sandeep Mogla

angular.module('starter.controllers', ['jett.ionic.filter.bar', 'ngTagsInput', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicFilterBar, $ionicSideMenuDelegate, NotifyDataService, $http, $cordovaNetwork) {

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

    $scope.$on('NotificationEvent', function(args) {
        $scope.newNts = NotifyDataService.getNewNotifications();
    });

    $scope.clickBadge = function() {
        console.log("clickBadge");
        $scope.newNts = 0;
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
        console.log("fn showMenus");
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.logoutApp = function() {
        console.log("fn logoutApp ");
        $http.defaults.headers.common['x-access-token'] = null;
    };

})

.controller('NotificationsCtrl', function($scope, $http, $timeout, $templateCache, $cordovaNetwork, NotifyDataService) {
    $scope.feeds = [];
    $scope.groups = ["Test"];

    //$scope.url = 'http://nodejs-clientfeeds.rhcloud.com/api/all';
    $scope.url = 'http://localhost:8081/api/getlatest';
    $scope.response = null;

    //    var config = {
    //        headers: {
    //            "Content-Type": "text/plain"
    //        }
    //    }

    var promise = $http.get($scope.url).then(function(response) {
            $scope.feeds = response.data.data;
            if (response.data != null && response.data.data.hasOwnProperty('length')) {
                NotifyDataService.setNewNotifications(response.data.data.length);
                console.log("NotifyDataService.getNewNotifications() :: " + NotifyDataService.getNewNotifications());
                $scope.$emit('NotificationEvent', NotifyDataService.getNewNotifications());
            }
            console.log("success");
        },
        function(response) {
            alert("error" + response + " s : " + status);
            console.log("error");
        });

    function prepend(value, array) {
        var newArray = array.slice(0);
        newArray.unshift(value);
        return newArray;
    }

    $scope.doRefresh = function() {
        console.log('Refreshing!');

        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            //var _newFeeds = prepend('Feed ' + Math.floor(Math.random() * 1000) + 4, $scope.feeds);
            //$scope.feeds = _newFeeds;

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


    // Perform the login action when the user submits the login form
    $scope.saveSetting = function() {

        $scope.url = 'http://localhost:8081/api/savesetting';

        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        $scope.settingsData = {};

        $http.post($scope.url, $scope.settingsData, config)
            .then(function(response) {
                console.log('successCallback > ' + response);
            }, function(response) {
                alert("error ! something went wrong");
                console.log('errorCallback > ' + response);
            });
    };

})

.controller('HomeCtrl', function($scope, $stateParams) {

})

.controller('FavouritesCtrl', function($scope, $stateParams) {


})

.controller('LogoutCtrl', function($scope, $stateParams, $http) {

    $scope.logoutApp = function() {
        console.log("LogoutCtrl >");
        //$http.defaults.headers.common['x-access-token'] = null;
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, $location, $ionicModal, $http) {
    // Form data for the login modal

    $scope.loginData = {
        username: '',
        password: ''
    };

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        //$scope.modal.hide();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

        $scope.url = 'http://localhost:8081/api/authenticate';
        $scope.response = null;

        var config = {
            headers: {
                "Content-Type": "text/plain"
            }
        }

        var loginData = JSON.stringify($scope.loginData);

        $http.post($scope.url, $scope.loginData, config)
            .then(function(response) {
                if (Boolean(response.data.success)) {
                    //window.localStorage['_token'] = response.data.data;
                    $http.defaults.headers.common['x-access-token'] = response.data.data;
                    // Simulate a login delay. Remove this and replace with your login
                    // code if using a login system
                    $timeout(function() {
                        $scope.closeLogin();
                        $location.path("/app/notifications");
                    }, 1000);
                } else {
                    alert("error ! something went wrong");
                }
                console.log('successCallback > response > ' + response);
            }, function(response) {
                alert("error ! something went wrong");
                console.log('errorCallback > ' + response);
            });
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
})

.service('NotifyDataService', function() {
    var _newNotifications = 0;

    return {
        getNewNotifications: function() {
            return _newNotifications;
        },
        setNewNotifications: function(value) {
            _newNotifications = value;
        }
    };
});