let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_button");
let msg = document.querySelector("#msg");
let msgC = document.querySelector(".hide");
let turn0 = true;
let count = 0;
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
const enableBoxes = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "";
  }
}
const reset = () =>{
  count = 0;
  enableBoxes();
  turn0 = true;
  msgC.classList.add('hide');

}
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0 == true) {
      box.style.backgroundColor = "green";
      box.textContent = "O";
      turn0 = false;
    } else {
      box.style.backgroundColor = "red";
      box.textContent = "X";
      turn0 = true;
    }
    count ++;
    box.disabled = true;
    // checkwinner();
    let iswinner = checkwinner();
    if(count == 9 && !iswinner){
      msgC.classList.remove('hide');
      msg.innerText = 'DRAW';
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
reset_btn.addEventListener('click',reset);