let model = {
  boardSize: 7,
  numShipe: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [{locations: ['06', '16', '26'], hits: ['', '', '']},
           {locations: ['24', '34', '44'], hits: ['', '', '']},
           {locations: ['10', '11', '12'], hits: ['', '', '']}],
  fire: function(guess){
    for(let i = 0; i < this.numShipe; i++){
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      if(index >= 0){
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if(this.isSunk(ship)){
          view.displayMessage('You sank my battleship!');
          this.shipSunk++;
        }
        return true;
      }
    } 
    view.displayMiss(guess);
    view.displayMessage('You missed!');
    return false;
  },
  isSunk: function(ship) {
    for(let i = 0; i < this.shiplength; i++){
      if(ship.hits[i] !== 'hit'){
        return false;
      }
    } 
    return true;
  },
  generateLocations: function() {
    let locations;
    for(let i = 0; i < this.numShipe; i++) {
      do {
        locations = this.generateShip();

      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip: function() {
    let direction = Math.floor(Math.random() * 2);
    let row;
    let col;
    if (direction === 1){

    } else {
      let newShipLocations = [];
      for(let i = 0; i < this.shipLength; i++) {
        if(direction === 1){
          row = Math.floor(Math.random() * this.boardSize);
          col = Math.floor(Math.random() * (this.boardSize - (this.shipLength +1)));
          newShipLocations.push(row + "" + (column + i));
        } else {
          row = Math.floor(Math.random() * (this.boardSize - (this.shipLength +1)));
          col =  Math.floor(Math.random() * this.boardSize);
          newShipLocations.push((row + i) + '' + col);
        }
      }
      return newShipLocations;
    }
  }
};


let view = {
  displayMessage: function (msg){
    let messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
    console.log(msg)
  },
  displayHit: function (location){
    let cell = document.getElementById(location);
    cell.setAttribute('class', 'hit');
  },
  displayMiss: function (location){
    let cell = document.getElementById(location);
    cell.setAttribute('class', 'miss');
  }
}

let controller = {
  guesses: 0,
  processGuess: function(guess){
    let location = parseGuess(guess);
    if(location){
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipSunk === model.numShipe) {
        view.displayMessage('You sank all my battleship, in ' + this.guesses + ' guesses');
      }
    }
  }
};

function parseGuess (guess){
  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G' ];
  if(guess === null || guess.length !== 2){
    alert('Ooops, please enter a letter and a number on the board');
  } else {
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let column = guess.charAt(1);
    if(isNaN(row) || isNaN(column)){
      alert('Opps, that is not on the board!');
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
      alert(`Oops, that's off the board!`);
    } else {
      return row + column;
    }
  }
  return null;
}
function handleFireButton(){
  let guessInput = document.getElementById('guessInput');
  let guess = guessInput.ariaValueMax;
  controller.processGuess(guess);
  guessInput.value = '';
}

function init() {
  let fireButton = docyment.getElementById('fireButton');
  fireButton.onclick = handleFireButton;
  let guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;

}

function handleKeyPress(e) {
  let fireButton = document.getElementById('fireButton');
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;

