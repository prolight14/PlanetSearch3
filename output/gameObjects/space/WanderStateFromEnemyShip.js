var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WanderState = (function (_super) {
    __extends(WanderState, _super);
    function WanderState() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.turnSpeed = 3;
        _this_1.updateDirTimer = false;
        _this_1.turningToAngle = false;
        return _this_1;
    }
    WanderState.prototype.start = function () {
        var _this_1 = this;
        _this.isShooting = false;
        this.updateDirTimer = true;
        this.changeDirTimer = timer(true, 500, function () {
            _this.turnManager.start(Phaser.Math.Angle.Random(), _this_1.turnSpeed, function () {
                _this_1.changeDirTimer.reset(Phaser.Math.RND.between(500, 3000));
            });
        });
    };
    WanderState.prototype.turnToAngle = function (angle) {
        var _this_1 = this;
        if (this.turningToAngle) {
            return;
        }
        this.turningToAngle = true;
        this.updateDirTimer = false;
        _this.move = false;
        _this.turnManager.start(angle, this.turnSpeed, function () {
            _this.move = true;
            _this_1.updateDirTimer = true;
            _this_1.turningToAngle = false;
        });
    };
    WanderState.prototype.update = function () {
        if (this.updateDirTimer) {
            this.changeDirTimer.update();
        }
        if (!this.turningToAngle) {
            var canSeeTarget = false;
            i_loop: for (var i = 0; i < _this.visibleObjects.length; i++) {
                var _a = _this.visibleObjects[i], gameObject = _a.gameObject, angleBetween = _a.angleBetween;
                var _arrayName = gameObject._arrayName;
                switch (_arrayName) {
                    case "playerShip":
                        canSeeTarget = true;
                        this.turnToAngle(angleBetween);
                        break i_loop;
                }
            }
            _this.isShooting = canSeeTarget;
        }
    };
    return WanderState;
}(State));
//# sourceMappingURL=WanderStateFromEnemyShip.js.map