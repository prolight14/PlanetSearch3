"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = (function () {
    function StateMachine(states) {
        this.states = states;
    }
    StateMachine.prototype.start = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        Array.prototype.slice.call(arguments).forEach(function (stateName) {
            var state = _this.states[stateName];
            state.on = true;
            state.start(this);
        });
    };
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
    StateMachine.prototype.stop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        Array.prototype.slice.call(arguments).forEach(function (stateName) {
            var state = _this.states[stateName];
            state.on = false;
            state.stop(this);
        });
    };
    ;
    return StateMachine;
}());
exports.default = StateMachine;
//# sourceMappingURL=StateMachine.js.map