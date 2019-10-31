app = new Vue({
	el: "#app",
	data: {
		blockY: 0,
		blockX: 2,
		falledBlockX: 0,
		falledBlockY: 0,
		color: "rgb(0,205,205)",
		blockdigit: 1,
		count: 0,
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
		blockcolors: [
			"rgb(0,205,205)",
			"rgb(0,215,135)",
			"rgb(255,255,130)",
			"rgb(255,145,75)",
			"rgb(255,150,215)",
			"rgb(255,45,70)",
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
				if(this.stage[this.blockY][this.blockX] == this.stage[this.blockY+1][this.blockX]) this.growBlock();
				this.nextBlockMake();
			}
		},
		nextBlockMake: function(){
				this.blockY = 0;
				this.blockdigit = Math.floor(Math.random() * 6 + 1);
				this.color = this.blockcolors[this.blockdigit-1];
		},
		checkBlockMove: function(){
			if(this.blockX <= 0) this.blockX = 0;
			else if(this.blockX >= 4) this.blockX = 4;
		},
		growBlock: function(){
			if(this.stage[this.blockY][this.blockX] != 6){
				this.stage[this.blockY][this.blockX] = 0;
				this.stage[this.blockY+1][this.blockX]++;
			}
		},
	},
})
document.onkeydown = function(e) {
	if(e.keyCode == 37) app.blockX--;
	else if(e.keyCode == 39) app.blockX++;
}
