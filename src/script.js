	// SETTING ALL VARIABLES

		var isMouseDown=false;
		var canvas = document.createElement('canvas');
		var body = document.getElementsByTagName("body")[0];
		var ctx = canvas.getContext('2d');
		var linesArray = [];
		currentSize = 5;
		var currentColor = "rgb(73,60,251)";
		var currentBg = "black";

		// INITIAL LAUNCH

		createCanvas();

		// // DRAWING EVENT HANDLERS

		canvas.addEventListener('mousedown', function() {mousedown(canvas, event);});
		canvas.addEventListener('mousemove',function() {mousemove(canvas, event);});
		canvas.addEventListener('mouseup',mouseup);

		// CREATE CANVAS

		function createCanvas() {
			canvas.id = "canvas";
			canvas.width = 800
			canvas.height = 800
			canvas.style.zIndex = 8;
			canvas.style.position = "absolute";
			canvas.style.border = "1px solid";
			ctx.fillStyle = currentBg;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			body.appendChild(canvas);
		}

		// DOWNLOAD CANVAS

		function downloadCanvas(link, canvas, filename) {
			link.href = document.getElementById(canvas).toDataURL();
			link.download = filename;
		}

		// SAVE FUNCTION

		function save() {
			localStorage.removeItem("savedCanvas");
			localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
			console.log("Saved canvas!");
		}

		// LOAD FUNCTION

		function load() {
			if (localStorage.getItem("savedCanvas") != null) {
				linesArray = JSON.parse(localStorage.savedCanvas);
				var lines = JSON.parse(localStorage.getItem("savedCanvas"));
				for (var i = 1; i < lines.length; i++) {
					ctx.beginPath();
					ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
					ctx.lineWidth  = linesArray[i].size;
					ctx.lineCap = "round";
					ctx.strokeStyle = linesArray[i].color;
					ctx.lineTo(linesArray[i].x, linesArray[i].y);
					ctx.stroke();
				}
				console.log("Canvas loaded.");
			}
			else {
				console.log("No canvas in memory!");
			}
		}

		// ERASER HANDLING

		function eraser() {
			currentSize = 50;
			currentColor = ctx.fillStyle
		}

		// GET MOUSE POSITION

		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}

		// ON MOUSE DOWN

		function mousedown(canvas, evt) {
			var mousePos = getMousePos(canvas, evt);
			isMouseDown=true
			var currentPosition = getMousePos(canvas, evt);
			ctx.moveTo(currentPosition.x, currentPosition.y)
			ctx.beginPath();
			ctx.lineWidth  = currentSize;
			ctx.lineCap = "round";
			ctx.strokeStyle = currentColor;

		}

		// ON MOUSE MOVE

		function mousemove(canvas, evt) {

			if(isMouseDown){
				var currentPosition = getMousePos(canvas, evt);
				ctx.lineTo(currentPosition.x, currentPosition.y)
				ctx.stroke();
				store(currentPosition.x, currentPosition.y, currentSize, currentColor);
			}
		}

		// STORE DATA

		function store(x, y, s, c) {
			var line = {
				"x": x,
				"y": y,
				"size": s,
				"color": c
			}
			linesArray.push(line);
		}

		// ON MOUSE UP

		function mouseup() {
			isMouseDown=false
			store()
		}