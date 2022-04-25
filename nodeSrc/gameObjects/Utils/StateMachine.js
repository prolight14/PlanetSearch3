"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = (function () {
    function StateMachine(states) {
        this.states = states;
    }
    StateMachine.prototype.startMultiple = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Array.prototype.slice.call(arguments).forEach(function (key) {
            _this.start(key);
        });
    };
    StateMachine.prototype.start = function (key, args) {
        var state = this.states[key];
        state.on = true;
        state.start.apply(state, args);
    };
    ;
    StateMachine.prototype.emit = function (name, args) {
        for (var i in this.states) {
            var state = this.states[i];
            if (state.on) {
                state[name].apply(state, args);
            }
        }
    };
    StateMachine.prototype.emitState = function (stateName, name, args) {
        var state = this.states[stateName];
        if (state.on) {
            state[name].apply(state, args);
        }
    };
    StateMachine.prototype.getState = function (key) {
        return this.states[key];
    };
    StateMachine.prototype.stopAll = function () {
        for (var i in this.states) {
            var state = this.states[i];
            state.on = false;
            state.stop();
        }
        ;
    };
    StateMachine.prototype.stopMultiple = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Array.prototype.slice.call(arguments).forEach(function (key) {
            _this.stop(key);
        });
    };
    StateMachine.prototype.stop = function (key, args) {
        var state = this.states[key];
        state.on = false;
        state.stop.call(state, args);
    };
    ;
    return StateMachine;
}());
exports.default = StateMachine;
//# sourceMappingURL=StateMachine.js.map