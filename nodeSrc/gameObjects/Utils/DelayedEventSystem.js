"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DelayedEvent_1 = require("./DelayedEvent");
var DelayedEventSystem = (function () {
    function DelayedEventSystem() {
        this.delayedEvents = [];
    }
    DelayedEventSystem.prototype.addEvent = function (removeOnInactive) {
        var d_event;
        d_event = new DelayedEvent_1.default();
        this.delayedEvents.push(d_event);
        d_event.removeOnInactive = removeOnInactive;
        return d_event;
    };
    DelayedEventSystem.prototype.startEvent = function (options) {
        var d_event = new DelayedEvent_1.default();
        d_event.start(options);
        this.delayedEvents.push(d_event);
        return d_event;
    };
    DelayedEventSystem.prototype.quickEvent = function (isCompletedArgs, isCompleted, onFinish) {
        return this.startEvent({
            removeOnInactive: true,
            isCompletedArgs: isCompletedArgs,
            isCompleted: isCompleted,
            onFinish: onFinish
        });
    };
    DelayedEventSystem.prototype.updateEvents = function () {
        for (var i = this.delayedEvents.length - 1; i >= 0; i--) {
            var d_event = this.delayedEvents[i];
            d_event.update();
            if (d_event.removeQueued || d_event.removeOnInactive && !d_event.active) {
                this.delayedEvents.splice(i, 1);
            }
        }
    };
    return DelayedEventSystem;
}());
exports.default = DelayedEventSystem;
//# sourceMappingURL=DelayedEventSystem.js.map