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
	this.numTiles;
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
	this.numTiles = levelData.length;

	for(var i = 0; i < levelData.length; i++){
		if(levelData[i] == true){
			//id, xPos, yPos, width, height, graphics name
			this.floors.push(new Tile(i, i % this.tileNumAcross * this.tileSize,
				Math.floor(i/this.tileNumAcross) * this.tileSize, this.tileSize, 'floor'));
		}
		else if(levelData[i] == false){
			this.walls.push(new Tile(i, i % this.tileNumAcross * this.tileSize,
				Math.floor(i/this.tileNumAcross) * this.tileSize, this.tileSize, 'wall'));
		}
	}

	var pos = {
		"x" : this.canvasW /2 - this.tileSize/2,
		"y" : this.canvasH /2 - this.tileSize/2
	}
	this.player1 = new Player(this, pos.x, pos.y, this.tileSize, "player");
	this.setRandomMapStartTile();
};



World.prototype.setRandomMapStartTile = function(){
	var range = this.floors.length - 0;
	var rand = Math.floor(Math.random() * range);
	console.log("random is: " + rand);

	var zeroPosX = this.floors[rand].xPos;
	var zeroPosY = this.floors[rand].yPos;

	for(var i = 0; i < this.walls.length; i++){
		this.walls[i].xPos += this.player1.xPos - zeroPosX;
		this.walls[i].yPos += this.player1.yPos - zeroPosY;
	}
	for(var i = 0; i < this.floors.length; i++){
		this.floors[i].xPos += this.player1.xPos - zeroPosX;
		this.floors[i].yPos += this.player1.yPos - zeroPosY;
	}


};

World.prototype.moveWorld = function(dir){
	for(var i = 0; i < this.walls.length; i++){
		this.walls[i].xPos += dir[0];
		this.walls[i].yPos += dir[1];
	}
	for(var i = 0; i < this.floors.length; i++){
		this.floors[i].xPos += dir[0];
		this.floors[i].yPos += dir[1];
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
    this.player1.draw(this.context);

    requestAnimationFrame(this.draw.bind(this)); //to avoid this being window

   // if(this.player) this.player.draw(this.context);
};