"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = {
    warn: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, arguments);
    }
};
exports.default = logger;
//# sourceMappingURL=logger.js.map