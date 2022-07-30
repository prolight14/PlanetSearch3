"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timer = function (start, interval, func, scope, args) {
    var startTime = performance.now();
    var called = !start;
    var update = function () {
        if (!called && performance.now() - startTime > interval) {
            called = true;
            return func.apply(scope, args);
        }
    };
    var reset = function (newInterval, _args) {
        if (newInterval !== undefined) {
            interval = newInterval;
        }
        if (_args !== undefined) {
            args = _args;
        }
        startTime = performance.now();
        called = false;
    };
    return {
        update: update,
        reset: reset
    };
};
exports.default = timer;
//# sourceMappingURL=Timer.js.map