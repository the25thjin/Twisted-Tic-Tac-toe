let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_button");
let msg = document.querySelector("#msg");
let msgC = document.querySelector(".hide");
let turn0 = true;
const mine = Math.floor(Math.random() * 9);
let count = 0;
let moves = 0;
boxes[mine].classList.add("mine");
let patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "";
  }
};
const reset = () => {
  count = 0;
  enableBoxes();
  turn0 = true;
  msgC.classList.add("hide");
  resetMine();
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.classList.contains("mine")) {
      disableBoxes();
      if (turn0) {
        msgC.classList.remove("hide");
        msg.innerText = "O stepped on mine , X WINS";
      } else {
        msgC.classList.remove("hide");
        msg.innerText = "X stepped on mine , O WINS";
      }
    } else {
      if (turn0 == true) {
        box.style.backgroundColor = "green";
        box.textContent = "O";
        turn0 = false;
      } else {
        box.style.backgroundColor = "red";
        box.textContent = "X";
        turn0 = true;
      }
    }
    moves++;
    count++;
    if (moves == 6) {
      removeMine();
    }
    box.disabled = true;
    let iswinner = checkwinner();
    if (count == 9 && !iswinner) {
      msgC.classList.remove("hide");
      msg.innerText = "DRAW";
      disableBoxes();
    }
  });
});
const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgC.classList.remove("hide");
  disableBoxes();
};
const checkwinner = () => {
  for (let pattern of patterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos3val);
        // return true;
      }
    }
  }
};
const removeMine = () => {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].classList.contains("mine")) {
      boxes[i].classList.remove("mine");
      break;
    }
  }
};
const resetMine = () => {
  // Remove the previous mine
  removeMine();

  // Set a new random mine
  const mine = Math.floor(Math.random() * 9);
  boxes[mine].classList.add("mine");
  moves = 0;
};
reset_btn.addEventListener("click", reset);
