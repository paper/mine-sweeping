console.log("mine-sweeping");

import { createMap } from "./modules/core.js";
import { MINE_VAL } from "./modules/config.js";

const MODE = {
  easy: {
    TYPE: "easy",
    ROW: 10,
    COL: 10,
    MINE_NUMBER: 10,
  },
  medium: 1,
  hard: 2,
};

const { TYPE, ROW, COL, MINE_NUMBER } = MODE.easy;

const gameMap = createMap(ROW, COL, MINE_NUMBER);

console.log(gameMap);

let html = "";

for (let row = 0; row < ROW; row++) {
  let temp = '';
  for (let col = 0; col < COL; col++) {
    const v = gameMap[row][col] === MINE_VAL ? 'x' : gameMap[row][col];
    temp += `<li data-val="${v}" data-rowpos="${row}" data-colpos="${col}">${v}</li>`;
  }
  html += `<ul>${temp}</ul>`
}

const gameElement = document.getElementById("game");

gameElement.innerHTML = html;

gameElement.addEventListener('click', function (event) {
  const element = event.target;
  if (element.nodeName === 'LI' && element.getAttribute('data-val') !== null) {
    element.innerText = element.getAttribute('data-val')
  }
}, false);

// 禁用右键菜单
gameElement.addEventListener('contextmenu', function (event) {
  event.preventDefault();
}, false);

// 鼠标右击判断
gameElement.addEventListener('mouseup', function (event) {
  if (event.button == 2) {
    console.log('鼠标右击了')
    
    const element = event.target;
    console.dir(element)

    if (element.nodeName === 'LI' && element.getAttribute('data-val') !== null) {
      element.innerText = '🚩'
    }
  }
}, false);