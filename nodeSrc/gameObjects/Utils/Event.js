"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DelayedEvent = (function () {
    function DelayedEvent() {
        this.active = false;
    }
    DelayedEvent.prototype.start = function (isCompleted, onFinish, context) {
        this.active = true;
        if (isCompleted !== undefined) {
            this.isCompleted = isCompleted;
        }
        if (onFinish !== undefined) {
            this.onFinish = onFinish;
        }
        if (context !== undefined) {
            this.context = context;
        }
    };
    DelayedEvent.prototype.stop = function () {
        this.active = false;
    };
    DelayedEvent.prototype.update = function () {
        if (this.active && this.isCompleted.apply(this.context)) {
            this.onFinish.apply(this.context);
            this.active = false;
        }
    };
    return DelayedEvent;
}());
exports.default = DelayedEvent;
//# sourceMappingURL=Event.js.map