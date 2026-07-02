# LumiJS
base code for creating 2D web games

# TRANSFORM
class Transform(<string _name>, <float _x>, <float _y>, <float _xSize>, <float _ySize>, <string (path of the image) _spritePath>)
Inherited :
- Image    Transform.sprite
- Bool     Transform.isActive (true by default or false if sprite is null)
- Behavior Transform.behavior (see "Behavior" below)
- Function Transform.SetActive(<bool _isActive>) : show/hide Transform's image
Externals :
- List<Transform> transforms : when Transform constructor is called, it push itself in this global list
- Transform FindTransformByName(<string _name>) : returns the first Transform whoes matches in "transforms" global list

# CAMERA
class Camera() :
- Transform : Camera.transform (the default Transform's name is "Main Camera")
- Float : Camera.zoom (default = 1)
Accessible built-in Camera "MainCamera" whoes Transform's name is "Main Camera".

# TIME
Constants : 
- DATE = new Date()
- START_TIME = performance.now()
Variables :
- float deltaTime : time elapsed between two last frames 
- float time : time in seconds since the start of the program
- int framecode : frame's count since the start of the program

# INPUTS
boolean GetKey(<int _id>) : returns true if given key's id is active (if the key is pressed), else returns false
- _id can be any integer, but there is some human-readable constants here just for you :
- KEY_RET = 8;
- KEY_TAB = 9;
- KEY_ENTER = 13;
- KEY_MAJ = 16;
- KEY_CTRL = 17;
- KEY_LEFT_VER_MAJ = 20;
- KEY_ESCAPE = 27;
- KEY_LEFT = 37;
- KEY_UP = 38;
- KEY_RIGHT = 39;
- KEY_DOWN = 40;
- KEY_0 = 48;
- KEY_1 = 49;
- KEY_2 = 50;
- KEY_3 = 51;
- KEY_4 = 52;
- KEY_5 = 53;
- KEY_6 = 54;
- KEY_7 = 55;
- KEY_8 = 56;
- KEY_9 = 57;
- KEY_A = 65;
- KEY_B = 66;
- KEY_C = 67;
- KEY_D = 68;
- KEY_E = 69;
- KEY_F = 70;
- KEY_G = 71;
- KEY_H = 72;
- KEY_I = 73;
- KEY_J = 74;
- KEY_K = 75;
- KEY_L = 76;
- KEY_M = 77;
- KEY_N = 78;
- KEY_O = 79;
- KEY_P = 80;
- KEY_Q = 81;
- KEY_R = 82;
- KEY_S = 83;
- KEY_T = 84;
- KEY_U = 85;
- KEY_V = 86;
- KEY_W = 87;
- KEY_X = 88;
- KEY_Y = 89;
- KEY_Z = 90;

# MISC
string  ReadFile(<string path>) : fetch path, then throw error if response code is not OK, else returns file's text
integer getRandomInt(<int min>, <int max>) : returns a random integer between <min> and <max>
