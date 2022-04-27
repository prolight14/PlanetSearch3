"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clock = (function () {
    function Clock(duration, start) {
        this.duration = 500;
        this.running = false;
        this.startTime = 0;
        if (start) {
            this.reset(duration);
            return;
        }
        if (duration !== undefined) {
            this.duration = duration;
        }
    }
    Clock.prototype.getMilliseconds = function () {
        return performance.now();
    };
    Clock.prototype.reset = function (duration) {
        if (duration === undefined) {
            duration = this.duration;
        }
        this.duration = duration;
        this.running = true;
        this.startTime = this.getMilliseconds();
    };
    Clock.prototype.isFinished = function () {
        if (this.running && this.getMilliseconds() - this.startTime > this.duration) {
            this.running = false;
        }
        return !this.running;
    };
    return Clock;
}());
exports.default = Clock;
//# sourceMappingURL=Clock.js.map