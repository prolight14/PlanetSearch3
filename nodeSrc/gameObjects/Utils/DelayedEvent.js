"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DelayedEvent = (function () {
    function DelayedEvent() {
        this.active = false;
        this.isCompletedArgs = [];
        this.isCompleted = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return false;
        });
        this.isCompletedContext = this;
        this.onFinishArgs = [];
        this.onFinish = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        });
        this.onFinishContext = this;
        this.removeQueued = false;
        this.removeOnInactive = false;
    }
    DelayedEvent.prototype.start = function (options) {
        if (options.removeOnInactive !== undefined) {
            this.removeOnInactive = options.removeOnInactive;
        }
        if (options.isCompletedArgs !== undefined) {
            this.isCompletedArgs = options.isCompletedArgs;
        }
        if (options.isCompleted !== undefined) {
            this.isCompleted = options.isCompleted;
        }
        if (options.isCompletedContext !== undefined) {
            this.isCompletedContext = options.isCompletedContext;
        }
        if (options.onFinishArgs !== undefined) {
            this.onFinishArgs = options.onFinishArgs;
        }
        if (options.onFinish !== undefined) {
            this.onFinish = options.onFinish;
        }
        if (options.onFinishContext !== undefined) {
            this.onFinishContext = options.onFinishContext;
        }
        this.active = true;
        return this;
    };
    DelayedEvent.prototype.stop = function (finish) {
        this.active = false;
        if (finish) {
            this.onFinish.apply(this.onFinishContext, this.onFinishArgs);
        }
        return this;
    };
    DelayedEvent.prototype.destroy = function () {
        this.active = false;
        this.removeQueued = true;
    };
    DelayedEvent.prototype.update = function () {
        if (this.active && this.isCompleted.apply(this.isCompletedContext, this.isCompletedArgs)) {
            this.onFinish.apply(this.onFinishContext, this.onFinishArgs);
            this.active = false;
        }
        return this;
    };
    return DelayedEvent;
}());
exports.default = DelayedEvent;
//# sourceMappingURL=DelayedEvent.js.map