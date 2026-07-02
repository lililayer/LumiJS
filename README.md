# LumiJS
base code for creating 2D web games

## TRANSFORM
class `Transform(string _name, float _x, float _y, float _xSize, float _ySize, string _spritePath)` : Object displayed in scene (canvas) with or without a Behavior js script

Inherited
  - String   `Transform.name` : Transform's name (used for FindTransformByName, as seen below)
  - Float    `Transform.x` : x-axis image's position in pixels
  - Float    `Transform.y` : y-axis image's position in pixels
  - Float    `Transform.xSize` : image's width in pixels
  - Float    `Transform.ySize` : image's height in pixels
  - String   `Transform.spritePath` : image's file path, which sources Transform.sprite, set None to set inactive object's scene display (Transform.isActive)
  - Bool     `Transform.isActive` : true by default or false if sprite is null)
  - Image    `Transform.sprite` : Image displayed in scene (canvas)
  - Behavior `Transform.behavior` : Behavior attached to the Transform see Behavior below)
  - Function `Transform.SetActive(bool _isActive)` : show/hide Transform's image
  - Function `Transform.SetBehavior(string script_path)` : use script_path = path to the script attached to the Transform None to set bevavior to null

Externals
  - List<Transform> `transforms` : when Transform constructor is called, it push itself in this global list
  - Transform `FindTransformByName(string _name)` : returns the first Transform whoes matches in transforms global list

## BEHAVIOR
base class `Behavior(Transform _transform)` :
- Transform `Behavior.transform` : Transform attached to the Behavior
- Function  `Behavior.Start()` : called when the Transform object is created
- Function  `Behavior.Update()` : called once per frame

Example of use : 
```javascript
class Example extends Behavior {
    constructor(_transform) {
        super(_transform);
        // init-called data here...
        this.a = "hello start";
        this.b = "update called"
    }
    Start() {
        // this instance is called when the Transform object is created...
        console.log(this.a);
    }
    Update() {
        // this instance is called once per frame...
        console.log(this.b);
    }
}
```
  
## CAMERA
class `Camera()` :
- Transform `Camera.transform` (the default Transform's name is "Main Camera")
- Float `Camera.zoom` (default = 1)
The built-in Camera is accessible via `MainCamera`.

## TIME
Constants : 
- `DATE` = new Date()
- `START_TIME` = performance.now()
Variables :
- float `deltaTime` : time elapsed between two last frames 
- float `time` : time in seconds since the start of the program
- int `framecode` : frame's count since the start of the program

## INPUTS
* boolean `GetKey(int _id)` : returns true if given key's id is active (if the key is pressed), else returns false
  _id can be any integer, but there is some human-readable constants here just for you :
  - `KEY_RET` = 8;
  - `KEY_TAB` = 9;
  - `KEY_ENTER` = 13;
  - `KEY_MAJ` = 16;
  - `KEY_CTRL` = 17;
  - `KEY_LEFT_VER_MAJ` = 20;
  - `KEY_ESCAPE` = 27;
  - `KEY_LEFT` = 37;
  - `KEY_UP` = 38;
  - `KEY_RIGHT` = 39;
  - `KEY_DOWN` = 40;
  - `KEY_0` = 48;
  - `KEY_1` = 49;
  - `KEY_2` = 50;
  - `KEY_3` = 51;
  - `KEY_4` = 52;
  - `KEY_5` = 53;
  - `KEY_6` = 54;
  - `KEY_7` = 55;
  - `KEY_8` = 56;
  - `KEY_9` = 57;
  - `KEY_A` = 65;
  - `KEY_B` = 66;
  - `KEY_C` = 67;
  - `KEY_D` = 68;
  - `KEY_E` = 69;
  - `KEY_F` = 70;
  - `KEY_G` = 71;
  - `KEY_H` = 72;
  - `KEY_I` = 73;
  - `KEY_J` = 74;
  - `KEY_K` = 75;
  - `KEY_L` = 76;
  - `KEY_M` = 77;
  - `KEY_N` = 78;
  - `KEY_O` = 79;
  - `KEY_P` = 80;
  - `KEY_Q` = 81;
  - `KEY_R` = 82;
  - `KEY_S` = 83;
  - `KEY_T` = 84;
  - `KEY_U` = 85;
  - `KEY_V` = 86;
  - `KEY_W` = 87;
  - `KEY_X` = 88;
  - `KEY_Y` = 89;
  - `KEY_Z` = 90;

## MAP.JSON
./map.json stores the Transform objects that will be created during the initial load
```json
{
	"Transforms":[
		{
			"_name_":"transform's name", 
			"x":0, // x axis position in pixels here
			"y":0, // y axis position in pixels here
			"xSize":70, // x size in pixels
			"ySize":35, // y size in pixels
			"texture":"./path/to/the/sprite_image.png",
			"behavior":"./Resources/Scripts/script.js"
		},
    {
      ...
    },
    ...
	]
}
```
## MISC
- function `Hitbox(xt, yt, x1, x2, y1, y2)` : check if the 2D Vector(xt, yt) matches the box with left-down corner (x1, y1) and right-up corner (x2, y2)
- string  `ReadFile(string path)` : fetch path, then throw error if response code is not OK, else returns file's text
- integer `getRandomInt(int min, int max)` : returns a random integer between <min> and <max>
