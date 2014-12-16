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
        var inViewPrev = false;
        var onScroll = function() {
            var scEl = scroller ? scroller.el[0] : undefined;
            var scElYPos =   scEl ? scEl.offsetTop + scEl.clientTop : 0;
            var scElHeight = scEl ? scEl.clientHeight : $window.innerHeight;
            var scrollY =    scEl ? scEl.scrollTop : $window.scrollY;
            var elTopY = el[0].offsetTop - scElYPos - scrollY;
            var elBottomY = elTopY + el[0].scrollHeight;
            var inView = elBottomY > 0 && elTopY < scElHeight;
            if (inView && !inViewPrev) scope.whenOnScreen();
            inViewPrev = inView;
        };
        var scrollerEl = scroller ? scroller.el : angular.element($window);
        scrollerEl.on("scroll", onScroll);
        setTimeout(onScroll, 200);
        scope.$on("$destroy", function() {
            scrollerEl.off("scroll", onScroll);
        });
    }
}; } ]);

})();
