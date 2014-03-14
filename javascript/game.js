var Game = function(){

};

Game.prototype.init = function(){
	this.tileSize = 32;
	this.numTilesAcross = 30;
	this.boardWidth = this.tileSize * this.numTilesAcross;

	this.setupRenderContext();
	var imgPaths = ["assets/wall.png", "assets/floor.png"];
	var imgNames = ["wall", "floor"];

	this.world = new World(this.canvas.width, this.canvas.height, this.context, this.numTilesAcross,
							this.tileSize, imgPaths, imgNames);
}

Game.prototype.setupRenderContext = function(){
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.tileSize * this.numTilesAcross;
	this.canvas.height = this.tileSize * this.numTilesAcross;

	//this.canvas.setAttribute("class", "canvas");
	document.body.appendChild(this.canvas);

	this.context = this.canvas.getContext("2d");
};


var setupEventListeners = function(herrings){
	//Slight margin on Y axis so the herrings aren't placed outside the window
	/*var marginY = 20;
	window.addEventListener("mousedown", function(e){

		//Don't wanna click behind the panel or panel button
		if(isPanelVisible && e.clientX < panelW) return;
		else if(!isPanelVisible && e.clientX < panelButtonW + 40) return;

		var hit = false;
		for(var i = 0; i < herrings.length; i++){
			var hW = herrings[i].w;
			var hH = herrings[i].h;
			var hX = herrings[i].xPos;
			var hY = herrings[i].yPos;

			if(e.clientX > hX 
				&& e.clientX < hX + hW 
				&& e.clientY > hY 
				&& e.clientY < hY + hH){

				selectHerring(herrings[i]);
				hit = true;
				break;
			}
		}
		if(hit == false){
			deselectHerring();
			hideInfo();
		}
	}, false);*/
};

var game = new Game();
game.init();