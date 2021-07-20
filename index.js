console.log("mine-sweeping");

import { createMap } from "./modules/core.js";
import { MINE_VAL, MINE_STR } from "./modules/config.js";

const MODE = {
  easy: {
    TYPE: "easy",
    MAX_ROW: 5,
    MAX_COL: 5,
    MINE_NUMBER: 5,
  },
  medium: 1,
  hard: 2,
};

const { TYPE, MAX_ROW, MAX_COL, MINE_NUMBER } = MODE.easy;

const gameMap = createMap(MAX_ROW, MAX_COL, MINE_NUMBER);

console.log('gameMap==', gameMap);
console.log('==========================')
let html = "";

for (let row = 0; row < MAX_ROW; row++) {
  let temp = '';
  for (let col = 0; col < MAX_COL; col++) {
    const v = gameMap[row][col] === MINE_VAL ? MINE_STR : gameMap[row][col];
    temp += `<li data-val="${v}" data-rowpos="${row}" data-colpos="${col}">${v}</li>`;
  }
  html += `<ul>${temp}</ul>`
}

const gameElement = document.getElementById("game");

gameElement.innerHTML = html;

const elementMap = [];

gameElement.querySelectorAll('ul').forEach(ul => {
  elementMap.push(ul.querySelectorAll('li'))
});

console.log(elementMap)

gameElement.addEventListener('click', function (event) {
  const element = event.target;
  if (element.nodeName === 'LI' && element.getAttribute('data-val') !== null) {
    const val = element.getAttribute('data-val');

    element.innerText = val;

    if (val === MINE_STR) {
      console.warn('你踩地雷了, Game Over');
    }
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