// global constants
// const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var guessCounter = 0;

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var clueHoldTime = 0;
var lives;

function randomPatternGenerator() {
  for (let p = 0; p < 8; p++) {
    pattern[p] = Math.floor(Math.random() * 4) + 1;
    console.log("The random pattern #" + p + " is " + pattern[p]);
  }
}

function startGame() {
  //initialize game variables and
  progress = 0;
  gamePlaying = true;
  randomPatternGenerator();
  lives = 3;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
}

// lighting a button
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
  // document.getElementById("button"+btn).classList.add("lit")
}

// clearing a button
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

// playing a single clue
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

// playing a sequence
function playClueSequence() {
  clueHoldTime = 1000 - progress * 100; //optional feature: clue hold time decrease by 100ms each turn
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("You won the game! Congrats!!!");
}

function loseLifeAlert() {
  alert("Try again! You have " + lives + " more chances!");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  // add game logic here
  if (btn === pattern[guessCounter]) {
    console.log("progress is: " + progress);
    console.log("guessCounter is: " + guessCounter);
    if (guessCounter == progress) {
      //is turn over?
      if (progress === 7) {
        winGame();
      } else {
        progress += 1;
        playClueSequence();
      }
    } else {
      guessCounter += 1;
    }
  } else {
    lives -= 1; // lose one life (or chance) if guessed incorrectly

    if (lives == 0) {
      // check if there is no more life (or chance)lefft
      loseGame(); // call the loseGame function
    } else {
      // otherwise reset the guessCounter to restart guessing
      guessCounter = 0;
      loseLifeAlert(); //and call the loseLife function to alert
    }
  }
  console.log("exiting the guess function: progress is: " + progress);
  console.log("exiting the guess function:  guessCounter is: " + guessCounter);
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
};
function playTone(btn, len) {
  if (!context) {
    context = new AudioContext();
    o = context.createOscillator();
    g = context.createGain();
    g.connect(context.destination);
    g.gain.setValueAtTime(0, context.currentTime);
    o.connect(g);
    o.start(0);
  }
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context;
var o;
var g;
// g.connect(context.destination)
// g.gain.setValueAtTime(0,context.currentTime)
// o.connect(g)
// o.start(0)


