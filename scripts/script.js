'use strict';

// UI Variables
const headingEl = document.querySelector('.game__heading');
const newGameBtn = document.querySelector('.new-game');
const checkBtn = document.querySelector('.check');
const giveupBtn = document.querySelector('.give-up');
const guessEl = document.querySelector('.guess');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');

// Function that generates the secret number
const generateSecretNumber = () => {
  const secretNumber = Math.trunc(Math.random() * 50) + 1;
  scoreEl.textContent = 20;
  return secretNumber;
};

// Function that adds/removes opacity class
const opacity = isTrue => {
  if (isTrue) {
    checkBtn.classList.add('opacity');
    guessEl.classList.add('opacity');
    giveupBtn.classList.add('opacity');
  }
  if (!isTrue) {
    checkBtn.classList.remove('opacity');
    guessEl.classList.remove('opacity');
    giveupBtn.classList.remove('opacity');
  }
};

// Function that enables/disables buttons depending on game state/result
const enableDisableBtns = gameResult => {
  if (gameResult === 'lost' || gameResult === 'won') {
    checkBtn.disabled = true;
    guessEl.disabled = true;
    giveupBtn.disabled = true;
  }

  if (gameResult === 'reset') {
    checkBtn.disabled = false;
    guessEl.disabled = false;
    giveupBtn.disabled = false;
  }

  if (gameResult === 'give up') {
    newGameBtn.disabled = false;
    checkBtn.disabled = true;
    guessEl.disabled = true;
  }
};

// SecretNumber and score variables
let secretNumber = generateSecretNumber();
let score = 20;

// Function that displays winning UI variables
const gameWon = () => {
  enableDisableBtns('won');
  numberEl.textContent = secretNumber;
  headingEl.innerHTML = `<span class="orange">You</span> guessed <span class="green">correctly</span> with the number <span class="green">${secretNumber}</span>`;
  const score = Number(scoreEl.textContent);
  const highScore = Number(highScoreEl.textContent);
  highScoreEl.textContent = score > highScore ? score : highScore;
  guessEl.value = '';
  opacity(true);
};

// Function that displays losing UI variables
const gameLost = () => {
  headingEl.innerHTML = `You <span class="red">lost</span> the secret <span class="orange">number</span> was <span class="green">${secretNumber}</span>`;
  numberEl.textContent = secretNumber;
  scoreEl.textContent = score;
  enableDisableBtns('lost');
  guessEl.value = '';
  opacity(true);
};

// Function that checks the number inputted by the user
const checkNumber = msg => {
  if (score > 0) {
    scoreEl.textContent = score;
    headingEl.innerHTML = msg;
  }

  if (score > -1 && score <= 0) gameLost();
};

// Function that starts the game
const startGame = () => {
  const guess = Number(guessEl.value);

  if (!guess) {
    headingEl.innerHTML = `Please <span class="orange">enter</span> a valid <span class="green">number</span>...`;
    return;
  }

  if (guess === secretNumber) gameWon();

  if (guess > secretNumber) {
    score--;
    checkNumber(
      'The <span class="green">number</span> entered <span class="orange">is</span> too <span class="red">High</span>'
    );
  }

  if (guess < secretNumber) {
    score--;
    checkNumber(
      'The <span class="green"> number</span> entered <span class="orange">is</span> too <span class="red">Low</span>'
    );
  }
};

// Function that resets the game
const resetGame = () => {
  headingEl.innerHTML = `Guess the <span class="green">number</span> between <span class="orange">1</span> and <span class="red">50</span>`;
  scoreEl.textContent = 50;
  enableDisableBtns('reset');
  numberEl.textContent = '?';
  secretNumber = generateSecretNumber();
  score = 20;
  guessEl.value = '';
  opacity(false);
};

// Function that displays give up UI variables
const giveUp = () => {
  headingEl.innerHTML = `You <span class="red">gave up</span> the <span class="orange">number</span> was <span class="green">${secretNumber}</span>`;
  numberEl.textContent = secretNumber;
  highScoreEl.textContent = 0;
  enableDisableBtns('give up');
  opacity(true);
};

// Click listener that starts the game
checkBtn.addEventListener('click', () => startGame());

// Click listener that resets the game
newGameBtn.addEventListener('click', () => resetGame());

// Click listener that ends the game when user gives up
giveupBtn.addEventListener('click', () => giveUp());
