(function(){

var module = angular.module("whenOnScreen", []);

module.directive("whenOnScreenScroller", function() { return {
    restrict: "A",
    controller: ['$element',function($element) {
        this.el = $element;
    }]
}; } );

module.directive("whenOnScreen", [ "$window", function($window) { return {
    scope: { whenOnScreen: '&' },
    require: '?^whenOnScreenScroller',
    restrict: "A",
    link: function(scope, el, attr, scroller) {
        var onScreenPrev = false;
        var onScroll = function() {
            var currentScrollY = scroller ? scroller.el[0].scrollTop : $window.scrollY;
            var elHeight = el[0].scrollHeight;
            var elTopYPos = el[0].offsetTop - currentScrollY;
            var elBottomYPos = elTopYPos + elHeight;
            var scrollerHeight = scroller ? scroller.el[0].clientHeight : $window.innerHeight;
            var onScreen = !(elBottomYPos < 0 || elTopYPos > scrollerHeight);
            if (onScreen && !onScreenPrev) scope.whenOnScreen();
            onScreenPrev = onScreen;
        };
        var scrollerEl = scroller ? scroller.el : angular.element($window);
        scrollerEl.on("scroll", onScroll);
        scope.$on("$destroy", function() {
            scrollerEl.off("scroll", onScroll);
        });
    }
}; } ]);

})();
