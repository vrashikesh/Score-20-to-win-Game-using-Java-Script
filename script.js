'use strict';
// selecting the elements from HTML file and saving them into variables for using throughout our program

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); // # is used to select elements by id instead of class
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0'); // This is same as using queryselector
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// starting condition of the game everything will be zero

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// calling the initiliazation function at the beginning
init();

// function for switching the player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // just like if else block
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice functionality implementation

btnRoll.addEventListener('click', function () {
  // if game is not playing then nothing should happen we check it here
  if (playing) {
    // generating random dice roll using random number logic between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice to user as it is previously hidden
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled number if it is 1

    if (dice !== 1) {
      // add rolled number to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // swith to next player
      switchPlayer();
    }
  }
});

// When we press hold button logic is implemented here

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to the active players score in array defined above
    scores[activePlayer] += currentScore; // scores[0]=scores[0]+currentScore;

    // update main score of the player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if the player hos won before we switch ie to check if score is >=100.

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      // finish the game now
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
