var colours = [];
var numSquares = 6;
var pickedColour;

var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	// mode buttons event listeners
	setupModeButtons();
	setupSquares();

	reset();
}

function setupModeButtons() {
	for (var i=0;i<modeButtons.length;i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			numSquares = (this.textContent === "Easy") ? 3 : 6;

			reset();
		});
	}
}

function setupSquares() {
	for (var i=0;i<squares.length;i++) {
	//add click events to squares
		squares[i].addEventListener("click", function(){
			//grab colour of clicked square
			var clickedColour = (this.style.backgroundColor);

			//compare colour to pickedColour
			if (clickedColour === pickedColour) {
				changeColours(clickedColour);
				h1.style.backgroundColor = clickedColour;
				messageDisplay.textContent = "Correct!";
				resetBtn.textContent = "Play Again?"
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		})
	}
}

function reset() {
	resetBtn.textContent = "New Colours";

	// generate all new colours
	colours = randomColours(numSquares);

	//pick a new random colour from array
	pickedColour = pickColour();

	// change colourDisplay to match changed colour
	colourDisplay.textContent = pickedColour;

	// change colours of squares on the page
	for (var i=0;i<squares.length;i++) {
		if (colours[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colours[i];
		} else {
			squares[i].style.display = "none";
		}
	}

	// reset background colour
	h1.style.backgroundColor = "steelblue";

	messageDisplay.textContent = "";
}

resetBtn.addEventListener("click", function() {
	reset();
});

function changeColours(colour) {

	// loop through all squares
	for (var i=0;i<squares.length;i++) {
		// change each colour to match the given colour
		squares[i].style.backgroundColor = colour;
	}
}

function pickColour() {
	var random = Math.floor(Math.random() * numSquares);
	return colours[random];
}

function randomColours(number) {
	function random() {
		return Math.floor(Math.random() * 256);
	}
	var coloursArr = new Array(number);
	for (var i=0;i<coloursArr.length;i++) {
		coloursArr[i] = `rgb(${random()}, ${random()}, ${random()})`;
	}

	return coloursArr;
}
