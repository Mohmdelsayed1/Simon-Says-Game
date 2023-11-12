//Learnt more about querselector and ForEach through https://developer.mozilla.org/en-US/ & https://www.w3schools.com/
const GreenBox = document.getElementById("green");
const RedBox = document.getElementById("red");
const YellowBox = document.getElementById("yellow");
const BlueBox = document.getElementById("blue");
const GreenAudio = new Audio("sounds/green.mp3");
const RedAudio = new Audio("sounds/red.mp3");
const YellowAudio = new Audio("sounds/yellow.mp3");
const BlueAudio = new Audio("sounds/blue.mp3");
const level=document.createElement("p");
level.id="level";
document.getElementById("level-title").appendChild(level);

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

GreenBox.addEventListener("click", GreenBlink);
RedBox.addEventListener("click", RedBlink);
YellowBox.addEventListener("click", YellowBlink);
BlueBox.addEventListener("click", BlueBlink);
const colors = [
  [RedBlink, "red"],
  [YellowBlink, "yellow"],
  [GreenBlink, "green"],
  [BlueBlink, "blue"],
];
const toggle_event = (color, time) => {
  setTimeout(color, time);
};
let r = 0;
let Sequence = [];
let SequenceBlink = [];
let clickedId = "";
let clickarr = [];
let CompletedLevel = false;
const StartGame = () => {
  document.getElementsByTagName("body")[0].classList.remove("game-over");
  r+=1
  level.innerText=`Level ${r}`;
  let x = 0;
  x = Math.floor(Math.random() * 4);
  Sequence.push(colors[x][1]);
  SequenceBlink.push(colors[x][0]);
  toggle_event(SequenceBlink[SequenceBlink.length - 1], 800);
  console.log(Sequence);
};

document.addEventListener("keydown", StartGame);

let BoxClick = document.querySelectorAll(".btn");
BoxClick.forEach(function (button) {
  button.addEventListener("click", function () {
    clickedId = this.id;
    clickarr.push(clickedId);
    console.log(clickarr);
    for (let i = 0; i < clickarr.length; i++) {
      if (Sequence[i] != clickarr[i]) {
        level.innerText="game over, Press Any Key To Start Again";
        r=0;
        Sequence = [];
        clickarr = [];
        document.getElementsByTagName("body")[0].classList.add("game-over");
      } 
      if(i==clickarr.length-1 && Sequence[i] == clickarr[i]) {
        CompletedLevel = true;
      }
    }

    if (CompletedLevel && clickarr.length==Sequence.length) {
      clickarr = [];
      CompletedLevel=false;
      StartGame();
    }
  });
});
