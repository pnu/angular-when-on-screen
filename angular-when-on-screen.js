(function(){

angular.module("whenOnScreen", [])
.directive("whenOnScreen", [ "$window", function($window) { return {
    scope: { whenOnScreen: '&' },
    restrict: "A",
    link: function(scope, el, attr) {
        var onScreenPrev = false;
        var onScroll = function() {
            var currentScrollY = $window.scrollY;
            var elHeight = el[0].scrollHeight;
            var elTopYPos = el[0].offsetTop - currentScrollY;
            var elBottomYPos = elTopYPos + elHeight;
            var scrollerHeight = $window.innerHeight;
            var onScreen = !(elBottomYPos < 0 || elTopYPos > scrollerHeight);
            if (onScreen && !onScreenPrev) scope.whenOnScreen();
            onScreenPrev = onScreen;
        };
        angular.element($window).on("scroll", onScroll);
        scope.$on("$destroy", function() {
            angular.element($window).off("scroll", onScroll);
        });
    }
}; } ]);

})();
