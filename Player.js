class Player extends Behavior {
    constructor(_transform) {
        super(_transform);
        // init-called data here...
        this.coll = false;
        this.collider_targets = [];
        this.speed = 100.0;
        this.velX = 0.0;
        this.velY = 0.0;
        this.normK = 0.0;
        this.targetPosX = 0.0;
        this.targetPosY = 0.0;
    }
    Start() {
        // this instance is called when the Transform object is created #0...
    }
    Update() {
        // this instance is called once per frame...
        this.velX = 0.0;
        this.velY = 0.0;
        if (GetKey(KEY_UP) == true) {
            this.velY++;
        }
        if (GetKey(KEY_DOWN) == true) {
            this.velY--;
        }
        if (GetKey(KEY_RIGHT) == true) {
            this.velX++;
        }
        if (GetKey(KEY_LEFT) == true) {
            this.velX--;
        }
        this.normK = Math.sqrt(Math.abs(this.velX) + Math.abs(this.velY))
        if (Math.abs(this.normK) > 0.1) { 
            this.targetPosX = this.transform.x + (this.velX * (this.speed / this.normK) * delta_time);
            this.targetPosY = this.transform.y + (this.velY * (this.speed / this.normK) * delta_time);
            this.coll = this.Collide(this.targetPosX, this.transform.y);
            if (this.coll == false) {
                this.transform.x = this.targetPosX;
            }
            this.coll = this.Collide(this.transform.x, this.targetPosY);
            if (this.coll == false) {
                this.transform.y = this.targetPosY;
            }
        }
    }
    
    Collide(px, py) {
        let ret = false;
        this.collider_targets.forEach(target => { 
            if (Hitbox(
                target.x, target.y,
                px - target.xSize, 
                px + target.xSize, 
                py - target.ySize, 
                py + target.ySize
            )) {
                console.log("collide");
                ret = true;
            }
        });
        return ret;
    }
}
