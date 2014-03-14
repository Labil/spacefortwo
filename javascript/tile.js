var Tile = function(xPos, yPos, size, type){
	this.xPos = xPos;
	this.yPos = yPos;
    this.size = size;
    this.type = type;
};

Tile.prototype.draw = function(context){
	context.drawImage(imageMgr.getImage(this.type), this.xPos, this.yPos, this.size, this.size);
};