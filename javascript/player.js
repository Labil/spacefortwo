var Player = function(world, xPos, yPos, tileSize, stringGraphics){
	this.tileSize = tileSize;
	this.hp = 3;
	this.oxygen = 100;
	this.world = world;
	this.xPos = xPos;
	this.yPos = yPos;
	this.graphics = stringGraphics;
	//this.name = name;

	this.moveDirection = {
		"LEFT" : [-this.tileSize, 0],
		"RIGHT" : [this.tileSize, 0],
		"UP" : [0, -this.tileSize],
		"DOWN" : [0, this.tileSize]
	};	

	this.setupEventListener();
};

Player.prototype.setupEventListener = function(){
	var self = this;

	window.addEventListener("keydown", function(evt){
		//up
		if(evt.keyCode == 38){
			self.move(self.moveDirection.UP);
		}
		//down
		if(evt.keyCode == 40){
			console.log("Key down");
			self.move(self.moveDirection.DOWN);
		}
		//left
		if(evt.keyCode == 37){
			console.log("Key left");
			self.move(self.moveDirection.LEFT);
		}
		//right
		if(evt.keyCode == 39){
			console.log("Key right");
			self.move(self.moveDirection.RIGHT);
		}
	});
};

Player.prototype.checkMove = function(dir){
	var prospectiveXPos = this.xPos + dir[0];
	var prospectiveYPos = this.yPos + dir[1];

	for(var i = 0; i < this.world.walls.length; i++){
		if(this.world.walls[i].xPos == prospectiveXPos &&
			this.world.walls[i].yPos == prospectiveYPos){
			return false;
		}
	}
	return true;
};

Player.prototype.move = function(dir){
	if(this.checkMove(dir)){
		this.xPos += dir[0];
		this.yPos += dir[1];
	}
};

Player.prototype.draw = function(context){
	context.drawImage(imageMgr.getImage(this.graphics), this.xPos, this.yPos, this.tileSize, this.tileSize);
};