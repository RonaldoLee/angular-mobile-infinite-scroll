angular.module('mobileInfiniteScroll', [])
    .directive('mobileInfiniteScroll', [ "$window", function ($window) {
        return {
            link:function (scope, element, attrs) {
                var e = element[0];
                var threshold = parseInt(attrs.threshold) || 10;

                var startY = 0, endY = 0;

                e.addEventListener('touchstart', function (event) {
                    var touch = event.targetTouches[0];
                    startY = touch.clientY;
                });

                e.addEventListener('touchmove', function (event) {
                    var touch = event.targetTouches[0];
                    endY = touch.clientY;
                });

                e.addEventListener('touchend', function() {
                    var gap = endY - startY;

                    console.log(gap)
                    console.log(e.scrollTop);
                    if (attrs.onReachBottom && gap < 0 && e.scrollHeight - e.clientHeight - e.scrollTop <= threshold) {
                        scope.$apply(attrs.onReachBottom);
                    } else if (attrs.onReachTop && gap > 0 && e.scrollTop <= threshold) {
                        scope.$apply(attrs.onReachTop);
                    }
                });
            }
        };
    }]);