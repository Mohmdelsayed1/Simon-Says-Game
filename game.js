//Learnt more about querselector and ForEach through https://developer.mozilla.org/en-US/ & https://www.w3schools.com/

//Get divs by Id
const GreenBox = document.getElementById("green");
const RedBox = document.getElementById("red");
const YellowBox = document.getElementById("yellow");
const BlueBox = document.getElementById("blue");

//Store each audio in a constant
const GreenAudio = new Audio("sounds/green.mp3");
const RedAudio = new Audio("sounds/red.mp3");
const YellowAudio = new Audio("sounds/yellow.mp3");
const BlueAudio = new Audio("sounds/blue.mp3");

//Create a <p> to display current level
const CurrentLevel=document.createElement("p");
CurrentLevel.id="level";
document.getElementById("level-title").appendChild(CurrentLevel);

//Define the blink event for each color
const GreenBlink = () => {
  GreenBox.classList.replace("green", "pressed");
  GreenAudio.play();
  setTimeout(() => {
    GreenBox.classList.replace("pressed", "green");
  }, 100);
};

const RedBlink = () => {
  RedBox.classList.replace("red", "pressed");
  RedAudio.play();
  setTimeout(() => {
    RedBox.classList.replace("pressed", "red");
  }, 100);
};

const YellowBlink = () => {
  YellowBox.classList.replace("yellow", "pressed");
  YellowAudio.play();
  setTimeout(() => {
    YellowBox.classList.replace("pressed", "yellow");
  }, 100);
};

const BlueBlink = () => {
  BlueBox.classList.replace("blue", "pressed");
  BlueAudio.play();
  setTimeout(() => {
    BlueBox.classList.replace("pressed", "blue");
  }, 100);
};

//Add click event listener for each div click
GreenBox.addEventListener("click", GreenBlink);
RedBox.addEventListener("click", RedBlink);
YellowBox.addEventListener("click", YellowBlink);
BlueBox.addEventListener("click", BlueBlink);

//Store each event with it's corresponding div Id
const colors = [
  [RedBlink, "red"],
  [YellowBlink, "yellow"],
  [GreenBlink, "green"],
  [BlueBlink, "blue"],
];

//Initialize the main variables
let Level = 0;
let Sequence = [];//to track the pattern history
let clickedId = "";
let clickarr = [];//to track clicks history

//Generate rondom Pattern every new game
const StartGame = () => {
  document.getElementsByTagName("body")[0].classList.remove("game-over");
  Level+=1
  CurrentLevel.innerText=`Level ${Level}`;
  let x = 0;
  x = Math.floor(Math.random() * 4);
  Sequence.push(colors[x][1]);
  setTimeout(colors[x][0],800);
  console.log(Sequence);
};

//Start new game upon any key press
document.addEventListener("keydown", StartGame);

//Make sure that clicks sequence pattern follow the generated blink sequence pattern 
let BoxClick = document.querySelectorAll(".btn");
BoxClick.forEach(function (button) {//For each clicked button define the check algorithm
  button.addEventListener("click", function () {
    clickedId = this.id;
    clickarr.push(clickedId);//Push click' Ids to click sequence
    for (let i = 0; i < clickarr.length; i++) {//Loop through the Clicks array to recognize correct pattern
      if(Sequence.length==0){//If players clicked before game start, remind them to press a key first 
        CurrentLevel.innerText="Press Any Key To Start First";
      }
      else if (Sequence[i] != clickarr[i]) {//Validate the clicks' sequence congruency with the generated blinks' sequence
        CurrentLevel.innerText="game over, Press Any Key To Start Again";
        Level=0;
        Sequence = [];
        clickarr = [];
        document.getElementsByTagName("body")[0].classList.add("game-over");
        return;
      } 
      if(i==Sequence.length-1 ) {//Mark the completion of the level
        clickarr=[];
        StartGame();
      }
    }
  });
});
