var Game = function(){

};

Game.prototype.init = function(){
	this.tileSize = 96;
	this.numTilesAcross = 30;
	this.boardWidth = this.tileSize * this.numTilesAcross;

	this.setupRenderContext();
	var imgPaths = ["assets/wall.png", "assets/floor.png", "assets/whale_1_32px.png"];
	var imgNames = ["wall", "floor", "player"];

	this.world = new World(this.canvas.width, this.canvas.height, this.context, this.numTilesAcross,
							this.tileSize, imgPaths, imgNames);

	var soundEfx; // Sound Efx
	soundEfx = document.getElementById("soundEfx");
	//soundEfx.play();
	//var soundLoad = "assets/music/PF01_MXAR_Ambience_Stem_01"; //Game Over sound efx

}

Game.prototype.setupRenderContext = function(){
	this.canvas = document.createElement("canvas");
	//this.canvas.width = this.tileSize * this.numTilesAcross;
	//this.canvas.height = this.tileSize * this.numTilesAcross;

	this.canvas.width = this.tileSize * 10; 
	 this.canvas.width = this.tileSize * 8;
	 this.canvas.height = window.innerHeight - 60; //- 60 for minus bookmarksbar etc
	//this.canvas.setAttribute("class", "canvas");
	document.body.appendChild(this.canvas);

	this.context = this.canvas.getContext("2d");
};


var setupEventListeners = function(herrings){
	
};

var game = new Game();
game.init();