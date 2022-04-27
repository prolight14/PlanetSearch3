//@ts-nocheck
class WanderState extends State
        {
            private turnSpeed: number = 3;
            private updateDirTimer: boolean = false;
            private turningToAngle: boolean = false;

            private changeDirTimer: { update: () => void; reset: (time?: number) => void; };

            public start()
            {
                _this.isShooting = false;

                // Turn randomly
                this.updateDirTimer = true;
                this.changeDirTimer = timer(true, 500, () =>
                {
                    _this.turnManager.start(Phaser.Math.Angle.Random(), this.turnSpeed, () =>
                    {
                        this.changeDirTimer.reset(Phaser.Math.RND.between(500, 3000));
                    });
                });
            }

            private turnToAngle(angle: number)
            {
                if(this.turningToAngle)
                {
                    return;
                }

                this.turningToAngle = true;
                this.updateDirTimer = false;
                _this.move = false;
                _this.turnManager.start(angle, this.turnSpeed, () =>
                {
                    _this.move = true;
                    this.updateDirTimer = true;
                    this.turningToAngle = false;
                });
            }

            public update()
            {
                if(this.updateDirTimer)
                {
                    this.changeDirTimer.update();
                }

                if(!this.turningToAngle)
                {
                    // Determine if this ship can see the player
                    var canSeeTarget = false;
                    i_loop: for(var i = 0; i < _this.visibleObjects.length; i++)
                    {
                        const { gameObject, angleBetween } = _this.visibleObjects[i];
                        const _arrayName = gameObject._arrayName;
                        
                        switch(_arrayName)
                        {
                            case "playerShip":
                                canSeeTarget = true;
                                this.turnToAngle(angleBetween);
                                break i_loop;
                        }
                    }

                    _this.isShooting = canSeeTarget;
                }
            }
        }