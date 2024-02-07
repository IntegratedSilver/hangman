

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let userInput = document.getElementById("userInput");
let displayedWord = document.getElementById("displayedWord");
let displayedGuesses = document.getElementById("displayedGuesses");
let letterBank = document.getElementById("letterBank");

let hangmanLetters = document.getElementById("hangmanLetters");
// will become the random word we pull from our array
let randomWord = "";

// this will contain an array that we will join together later
// in order to display the underscores and letters they have guessed correctly,
// in the spaces they would take up in a word
let letterArray = [];

// this will be the letters they have guessed
let wrongGuess = "";

//number of guesses they have made, or turns taken, starts at zero
let guesses = 0;

let maxGuesses = 6;

startBtn.addEventListener("click", function () {
  dataCall();
});

restartBtn.addEventListener("click", function () {
  resetGame();
});

userInput.addEventListener("keydown", function (event) {
  // event or "e"   is a reserved word which will run the function event and also stores the data from the function   its like a fishing net and grabs a bunch of data unlike us making a variable normally
  // console.log(event);
  if (event.key === "Enter") {
    let guess = userInput.value.toLowerCase();
    //Check if the users guess is included in our random word
    if (randomWord.includes(guess)) {
      // alert("test");
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === guess) {
          letterArray[i] = guess;
        }
      }
    } else {
      wrongGuess += guess;
      letterBank.textContent = wrongGuess;
      guesses++;
    }
    updateGameState();
    userInput.value = "";
    gameEnd();
  }
});

function dataCall() {
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
      let rndNum = Math.floor(Math.random() * data.words.length);
      randomWord = data.words[rndNum];
      console.log(randomWord);

      startGame(randomWord);
    });
}

// function startGame(stickman) {
//   letterArray = [];
//   for (let i = 0; i < stickman.length; i++) {
//     letterArray[i] = "_";
//     updateGameState();
//     userInput.readOnly = false;
//   }
// }

function startGame(word) {
    letterArray = [];
    for (let i = 0; i < word.length; i++) {
      letterArray[i] = "_";
      updateGameState();
      userInput.readOnly = false;
      
    }
  }


function updateGameState() {
  displayedWord.textContent = letterArray.join(" ");
  displayedGuesses.textContent = `Guesses: ${guesses} / ${maxGuesses}`;
}

function resetGame() {
  randomWord = "";
  wrongGuess = "";
  letterArray = [];
  guesses = 0;
  userInput.readOnly = true;
  userInput.value = "";
  displayedGuesses.textContent = "Guesses Used: X / X";
  displayedWord.textContent = "Displayed Word";
  letterBank.textContent = "Letter Bank";
  hangmanLetters.textContent = "Stickman Hint";
  sound.currentTime = 0
}

function gameEnd() {
  // Lose: check if guesses === maxGuesses
  // Win: check if randomWord === letterArray
  if (guesses === maxGuesses) {
    alert(`You lose! Your word was ${randomWord}`);
    resetGame();
  } else if (letterArray.join("") === randomWord && randomWord != "") {
    alert(`You win! Your word was ${randomWord}`);
    resetGame();
  }
}
//stickman array
let stickArray = [
  "a verb maybe?",
  "try a noun",
  "i'm bob",
  "want a hint?",
  "hint :3"
];

function changeText() {
  // Get a random index from the array
  let randomIndex = Math.floor(Math.random() * stickArray.length);

  // Get the <p> element by its ID
  let paragraph = document.getElementById("hangmanLetters");

  // Change the text content to the randomly selected string
  paragraph.textContent = stickArray[randomIndex];
}
//audio volume
let sound = document.getElementById("sound");
sound.volume = 0.2;
