// on page load -> generate game board
window.addEventListener("load", () => {
  console.log("Page Loaded");
  setRandomTileOrder(12);
  setTiles();
});

// global variables
let i = 0;
let clicks;
let timeScore;

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

// start button initiates game and starts counter
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

const startGame = () => {
  tiles.forEach(tile => tile.addEventListener("click", displayTile));
  resetTiles();
  startButton.disabled = true;
  console.log(randomOrderArray);
  startTimer();
};

// end button stops the game
document.getElementById("endGame").addEventListener("click", endGame);

const endGame = () => {
  const endTimer = () => {
    timeScore = document.getElementById("timer").innerText;
    console.log(timeScore);
    clearInterval(timer);
  };

  randomOrderArray = [];
  startButton.innerText = "New Game";
  startButton.disabled = false;

  endTimer();
  calculateScore();
};

/* createRandom number function
creates an array of 12 random numbers */
let randomOrderArray = [];

const setRandomTileOrder = (numberOfTiles) => {
  while (randomOrderArray.length < numberOfTiles) {
    let randomNum = Math.random();
    randomNum = randomNum * (numberOfTiles - 1);
    randomNum = Math.round(randomNum) + 1;

    if (randomOrderArray.includes(randomNum)) continue;
    randomOrderArray.push(randomNum);
  }
};

const setTiles = () => {
  for (const tile of tiles) {
    tile.innerHTML = randomOrderArray[i];
    i++;

    // replace numerical values with icon pairs
    if (tile.innerText < 3) {
      tile.innerHTML = rocket;
      tile.setAttribute("icon", "rocket");
    } else if (tile.innerHTML < 5) {
      tile.innerHTML = bacteria;
      tile.setAttribute("icon", "bacteria");
    } else if (tile.innerHTML < 7) {
      tile.innerHTML = cocktail;
      tile.setAttribute("icon", "cocktail");
    } else if (tile.innerHTML < 9) {
      tile.innerHTML = football;
      tile.setAttribute("icon", "football");
    } else if (tile.innerHTML < 11) {
      tile.innerHTML = pizza;
      tile.setAttribute("icon", "pizza");
    } else if (tile.innerHTML < 13) {
      tile.innerHTML = kiwi;
      tile.setAttribute("icon", "kiwi");
    } else {
      console.log("Error: too many tiles");
    }
  }
};

// Timer Function
let count;
let timer;

const startTimer = () => {
  clearInterval(timer);
  count = 0;

  timer = setInterval(() => {
    count = count++;
    document.getElementById("timer").firstChild.innerText = count++;

    if (count === 60) {
      clearInterval(timer);
      document.getElementById("timer").firstChild.innerText = "Game Over";
    }
  }, 1000);
};

/* icon assign variables */
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let selectedTile = "";
let tileIcon;
const tileIcons = [];
const tileIds = [];

// displayTile -> must stay as function (uses `this`)
tiles.forEach(tile => tile.addEventListener("click", displayTile));
let n = 0;

function displayTile(e) {
  this.classList.remove("hideTile");
  this.classList.add("displayTile");

  tileIcon = e.target.getAttribute("icon");
  tileIcons.push(tileIcon);

  const tileId = e.target.getAttribute("id");
  tileIds.push(tileId);

  countMoves();

  if (tileIcons.length % 2 === 0) {
    checkMatch(tileIcons, tileIds, n);
    n = n + 2;
  }
}

const checkMatch = (tileIcons, tileIds, n) => {
  console.log(n);
  console.log(n + 1);

  if (tileIcons[n] !== tileIcons[n + 1]) {
    console.log("no match");
    setTimeout(() => {
      document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
      document.getElementById(tileIds[n]).classList.remove("displayTile");
    }, 1000);
  } else {
    console.log("match");
    document.getElementById(tileIds[n]).style.backgroundColor = "green";
    document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
    document.getElementById(tileIds[n]).setAttribute("guess", "correct");
    document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
    document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
    document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
  }
};

// countMoves -> calculates clicks
const countMoves = () => {
  clicks = n;
  document.getElementById("clicks").firstChild.innerHTML = clicks;
};

// Clear tiles when new game is started
const clearTiles = () => {
  for (let idx = 0; idx < tiles.length; idx++) {
    tiles[idx].style.fontSize = "0em";
    tiles[idx].style.backgroundColor = "#44445a";
  }
};

// calculateScore
const calculateScore = () => {
  timeScore = parseInt(timeScore, 10);
  const calculatedScore = timeScore + clicks;
  console.log(calculatedScore);
  document.querySelector("#score").firstChild.innerHTML = calculatedScore;
};

// RGB generation
let newRGB;

const generateRGBVal = () => {
  const generateRandomColor = () => {
    let r = Math.random();
    r = r * 255;
    r = Math.round(r);
    return r;
  };

  const rgbValue = [];
  for (let idx = 0; idx <= 2; idx++) {
    const singleVal = generateRandomColor();
    rgbValue.push(singleVal);
  }
  newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
  return newRGB;
};

// resetTiles
const resetTiles = () => {
  for (const tile of tiles) {
    tile.style.backgroundColor = "#44445a";
    tile.removeAttribute("state");
    tile.classList.remove("hideTile");
    tile.classList.remove("displayTile");
  }
};
