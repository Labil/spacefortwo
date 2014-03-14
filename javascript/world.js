// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/////////////////////////////////////////////////////////////////////////////////////////
var imageMgr = new ImageManager();

var World = function(canvasW, canvasH, ctx, tileNumAcross, tileSize, imgPaths, imgNames){
	this.canvasW = canvasW;
	this.canvasH = canvasH;
	this.context = ctx;

	this.walls = [];
	this.floors = [];
	this.player1;
	this.player2;

	this.tileNumAcross = tileNumAcross;
	this.tileSize = tileSize;

	this.levelGenerator = new LevelGenerator(tileNumAcross);
	this.loadLevel();
	this.loadImages(imgPaths, imgNames);
	
};

//After the images are fully loaded, drawing of screen can begin
World.prototype.loadImages = function(imgPaths, imgNames){
    imageMgr.load(imgPaths, imgNames, this.startDrawing.bind(this));
};

World.prototype.startDrawing = function(){
    this.draw();
};

World.prototype.loadLevel = function(){
	var levelData = this.levelGenerator.generateLevel();

	for(var i = 0; i < levelData.length; i++){
		if(levelData[i] == true){
			this.floors.push(new Tile(i % this.tileNumAcross * this.tileSize,
				Math.floor(i/this.tileNumAcross) * this.tileSize, this.tileSize, 'floor'));
		}
		else if(levelData[i] == false){
			this.walls.push(new Tile(i % this.tileNumAcross * this.tileSize,
				Math.floor(i/this.tileNumAcross) * this.tileSize, this.tileSize, 'wall'));
		}
	}
};

World.prototype.draw = function(){
	// helper function to iterate over all elems on board and draw
    var drawElements = function(arr, context){
        for (var i = 0; i < arr.length; i++) {
            arr[i].draw(context);
        }
    };

    this.context.clearRect(0, 0, this.canvasW, this.canvasH);
    drawElements(this.floors, this.context);
    drawElements(this.walls, this.context);

   // if(this.player) this.player.draw(this.context);
};