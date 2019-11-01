app = new Vue({
	el: "#app",
	data: {
		blockY: 0,
		blockX: 2,
		falledBlockX: 0,
		falledBlockY: 0,
		color: "rgb(0,205,205)",
		nextColor: "rgb(0,215,135)",
		blockdigit: 1,
		nextBlock: 2,
		message: "",
		gameOver: false,
		score: 0,
		count: 0,
		temp: 0,
		stage: [
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[0,0,0,0,0,7],
			[7,7,7,7,7,7],
		],
		blockColors: [
			"rgb(0,205,205)",
			"rgb(0,215,135)",
			"rgb(255,255,130)",
			"rgb(255,145,75)",
			"rgb(255,150,140)",
			"rgb(255,95,95)",
		]
	},
	methods: {
		startGame: function(){
			this.mainLoop();
		},
		mainLoop: function(){
		    this.fallBlock();
  	        setTimeout(this.mainLoop.bind(this), 500);
		},
		fallBlock: function(){
			if(this.stage[this.blockY+1][this.blockX] == 0){
				this.blockY++;
			}else{
				this.stage[this.blockY][this.blockX] = this.blockdigit;
				this.growBlock();
				this.linedelete();
				if(this.gameOverCheck()==false){
					this.nextBlockMake();
				}
			}
		},
		nextBlockMake: function(){
			this.blockY = 0;
			this.blockdigit = this.nextBlock;
			this.color = this.blockColors[this.blockdigit-1];
			this.nextBlock = Math.floor(Math.random() * 2 + 1);
			this.nextColor = this.blockColors[this.nextBlock-1];
		},
		checkBlockMove: function(){
			if(this.blockX <= 0) this.blockX = 0;
			else if(this.blockX >= 4) this.blockX = 4;
		},
		growBlock: function(){
				for(let i=0; i<9-this.blockY; i++){
					if(this.stage[this.blockY+i][this.blockX] != 6){
						if(this.stage[this.blockY+i][this.blockX] == this.stage[this.blockY+i+1][this.blockX]){
							this.stage[this.blockY+i][this.blockX] = 0;
							this.stage[this.blockY+i+1][this.blockX]++;
							this.score = this.score + 10;
						}
					}
				}
		},
		gameOverCheck: function(){
			for(let i=0; i<5; i++){
				if(this.stage[0][i] != 0){
					for(let j=0; j<10; j++){
						for(let k=0; k<5; k++){
							this.message = "GAME OVER";
							return true;
						}
					}
				}
			}
			return false;			
		},
		linedelete: function(){
			for(let i=0; i<10; i++){
				for(let j=0; j<4; j++){
					if(this.stage[i][j]==this.stage[i][j+1] && this.stage[i][j]!=0){
						this.count++;
					}
				}
				if(this.count==4){
					for(let k=i; k>0; k--){
						for(let l=0; l<5; l++){
							this.stage[k][l]=this.stage[k-1][l];
						}
					}
					this.score = this.score + 100;
				}
				this.count = 0;
			}
		}, 
		scoreCalculate: function(){

		},
	/*	restart: function(){
			for(let j=0; j<10; j++){
				for(let k=0; k<5; k++){
					this.stage[j][k] = 0;
					this.startGame();
				}
			}
		},  */
	},
})
document.onkeydown = function(e) {
	if(e.keyCode == 37) app.blockX--;
	else if(e.keyCode == 39) app.blockX++;
}
