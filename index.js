//////////////////////////
// INITIALISE INSTANCES //
//////////////////////////
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
function ReadFile(path) {
    return fetch(path)
        .then(r => { if (!r.ok) throw r; return r.text(); });
}
// GAME OBJECTS && TRANSFORMS
pathBehaviorPairs = []
class PathBehaviorPair {
    constructor(path, behav) {
        this.path = path;
        this.behav = behav;
        pathBehaviorPairs.push(this);
    }
}
function PathExists(_path) {
    return pathBehaviorPairs.some(pair => pair.path == _path);
}
function GetBehaviorFromPath(_path) {
    const pair = pathBehaviorPairs.find(p => p.path === _path);
    return pair ? pair.behav : null;
}
class Behavior {
    constructor(_transform) {
        this.transform = _transform;
    }
    Start() {}
    Update() {}
}
/*/ BEHAVIOR BASE EXAMPLE ///
class Example extends Behavior {
    constructor(_transform) {
        super(_transform);
        // init-called data here...
    }
    Start() {
        // this instance is called when the Transform object is created...
    }
    Update() {
        // this instance is called once per frame...
    }
}
/*/
transforms = [];
class Transform {
    constructor(_name, _x, _y, _xSize, _ySize, _spritePath) {
        this._name_ = _name;
        this.x = _x;
        this.y = _y;
        this.xSize = _xSize;
        this.ySize = _ySize;
        this.spritePath = _spritePath;
        this.sprite = new Image();
        this.isActive = (this.spritePath != "None");
        if (this.isActive) {
            this.sprite.src = this.spritePath;
        }
        this.behavior = null;
        transforms.push(this);
    }
    
    SetActive(_isActive = true) {
        this.isActive = _isActive;
    }
    
    SetBehavior(script_path) {
        if (script_path == "None") {return;}
        // Add script balise
        if (PathExists(script_path) == false) {
            const s = document.createElement('script');
            s.src = script_path;
            s.async = false;
            document.head.appendChild(s);
            // extract class name
            const base = script_path.split('/').pop();
            const class_name = base.replace(/\.[^.]+$/, '');
            // read script content, then evaluate it and set it
            ReadFile(script_path).then(text => {
                const B = eval(`(${text})`);
                new PathBehaviorPair(script_path, B);
                this.behavior = new B(this);
                this.behavior.Start();
            });
        } else {
            const B = GetBehaviorFromPath(script_path);
            if (B != null) {
                this.behavior = new B(this);
                this.behavior.Start();
            }
        }
    }
}
function FindTransformByName(_name) {
    for (let i = 0; i < transforms.length; i++) {
        obj = transforms[i];
        if (obj._name_ == _name) {
            return obj;
        }
    }
    return null;
}
/////////////////
// GAME STUFFS //
/////////////////
// PHYSICS
function Hitbox(xt, yt, x1, x2, y1, y2) {
    let hit =  xt > x1 
            && xt < x2 
            && yt > y1 
            && yt < y2;
    return hit;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// TIME
const DATE = new Date();
const START_TIME = performance.now();
let time = ((performance.now()) - START_TIME) / 1000;
let last_time = time;
let deltaTime = 0;
let framecode = 0;
// CAMERA
class Camera {
     constructor() {
        this.transform = new Transform("Main Camera",0,0, 1, 1,"None");
        this.zoom = 1.00;
    }
}
MainCamera = new Camera();
// INPUTS
class InputKey {
    constructor(key_id, key_status) {
        this.id = key_id;
        this.status = key_status;
    }
}
INPUTS = []
function IKeyExists(_id) {
    return INPUTS.some(ikey => ikey.id == _id);
}
function GetKeyByID(_id) {
    const ikey = INPUTS.find(ikey => ikey.id === _id);
    return ikey ? ikey : null;
}
function GetKey(_id) {
    if (IKeyExists(_id)) {
        k = GetKeyByID(_id);
        return k.status;
    }
    return false;
}
KEY_RET = 8;
KEY_TAB = 9;
KEY_ENTER = 13;
KEY_MAJ = 16;
KEY_CTRL = 17;
KEY_LEFT_VER_MAJ = 20;
KEY_ESCAPE = 27;
KEY_LEFT = 37;
KEY_UP = 38;
KEY_RIGHT = 39;
KEY_DOWN = 40;
KEY_0 = 48;
KEY_1 = 49;
KEY_2 = 50;
KEY_3 = 51;
KEY_4 = 52;
KEY_5 = 53;
KEY_6 = 54;
KEY_7 = 55;
KEY_8 = 56;
KEY_9 = 57;
KEY_A = 65;
KEY_B = 66;
KEY_C = 67;
KEY_D = 68;
KEY_E = 69;
KEY_F = 70;
KEY_G = 71;
KEY_H = 72;
KEY_I = 73;
KEY_J = 74;
KEY_K = 75;
KEY_L = 76;
KEY_M = 77;
KEY_N = 78;
KEY_O = 79;
KEY_P = 80;
KEY_Q = 81;
KEY_R = 82;
KEY_S = 83;
KEY_T = 84;
KEY_U = 85;
KEY_V = 86;
KEY_W = 87;
KEY_X = 88;
KEY_Y = 89;
KEY_Z = 90;
document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);
function keyDown(event) {
    if (IKeyExists(event.keyCode)) {
        ikey = GetKeyByID(event.keyCode);
        ikey.status = true;
    } else {
        INPUTS.push(new InputKey(event.keyCode, true));
    }
}
function keyUp(event) {
    if (IKeyExists(event.keyCode)) {
        ikey = GetKeyByID(event.keyCode);
        ikey.status = false;
    } else {
        INPUTS.push(new InputKey(event.keyCode, false));
    }
}
///////////////
// MAIN LOOP //
///////////////
function GameUpdate(element) {
    if (element.behavior != null) {
        element.behavior.Update();
    }
}
function GameLoop() {
    requestAnimationFrame(GameLoop);
    clearScreen();
    transforms.forEach(GameUpdate);
    drawScreen();
    time = (performance.now() - START_TIME) / 1000;
    delta_time = time - last_time;
    last_time = time;
    framecode++;
}
function Load() {
    console.log("LOADING...");
    fetch('./map.json')
        .then(response => response.json())
        .then(data => {
            data["Transforms"].forEach(post => 
            {
                // Create Transform object
                t = new Transform(
                    post._name_,
                    post.x, 
                    post.y, 
                    post.xSize, 
                    post.ySize, 
                    post.texture
                );
                // Set behavior script
                t.SetBehavior(post.behavior);
            });
        });
}
function drawTransform(transform) {
    if (transform.isActive == false && transform.spritePath == "None" && transform._name_ == "Main Camera") {return;}
    let x_screen_pos = +MainCamera.zoom*(transform.x-MainCamera.transform.x)+canvas.width*0.5-transform.xSize*MainCamera.zoom*0.5;
    let y_screen_pos = -MainCamera.zoom*(transform.y-MainCamera.transform.y)+canvas.height*0.5-transform.ySize*MainCamera.zoom*0.5;
    let do_draw =    x_screen_pos > -transform.xSize * MainCamera.zoom 
                  && x_screen_pos < canvas.width + transform.xSize * MainCamera.zoom
                  && y_screen_pos > -transform.ySize * MainCamera.zoom 
                  && y_screen_pos < canvas.height + transform.ySize * MainCamera.zoom;
    if(do_draw) {
        ctx.fillStyle = transform.color;
        ctx.drawImage(
            transform.sprite, 
            x_screen_pos, 
            y_screen_pos, 
            transform.xSize * MainCamera.zoom, 
            transform.ySize * MainCamera.zoom
        );
    }
}
function drawScreen() {
    transforms.forEach(drawTransform);
}
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

// APPLICATION
Load();
GameLoop();
