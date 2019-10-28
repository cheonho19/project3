app = new Vue({
	el: "#app",
	data: {
		blockY: 0,
		blockX: 2,
		blockdigit: 1,
		blocks: [
			{ number: 1,
			  color: "rgb(255,0,0)",
			},
			{ number: 2,
			  color: "rgb(255,127,0)",
			},
			{ number: 3,
			  color: "rgb(255,255,0)",
			},
			{ number: 4,
			  color: "rgb(0,255,0)",
			},
			{ number: 5,
			  color: "rgb(0,0,255)",
			},
			{ number: 6,
			  color: "rgb(150,0,255)",
			},
		],
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
			this.blockY++;
		},
		moveleft: function(){
			console.log(this.blockX);
			this.blockX--;
		},
	},
})
	document.onkeydown = function(e) {
		app.blockX--;
	  }
