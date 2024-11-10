let model = {
  boardSize: 7,
  numShipe: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [{locations: ['06', '16', '26'], hits: ['', '', '']},
           {locations: ['24', '34', '44'], hits: ['', '', '']},
           {locations: ['10', '11', '12'], hits: ['', '', '']}],
  fire: function(guess){
    for(let i = 0; i < this.numships; i++){
      let ship = this.ships[i];
      let locations = ships.locations;
      let index = locations.indexOf[guess];
      if(index >= 0){
        ship.hits[index] = "hit";
        return true;
      }
    } return false;
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
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location){
    let cell = document.getElementById(location);
    cell.setAttribute('class', 'miss');
  }
}

