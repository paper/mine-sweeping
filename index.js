console.log("mine-sweeping");

import { createMap, flood } from "./modules/core.js";
import { MINE_VAL, MINE_STR, EMPTY_VAL, OPEN_CLASSNAME } from "./modules/config.js";

const MODE = {
  easy: {
    TYPE: "easy",
    MAX_ROW: 10,
    MAX_COL: 10,
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
    temp += `<li data-val="${v}" data-row="${row}" data-col="${col}"></li>`;
  }
  html += `<ul>${temp}</ul>`
}

const gameElement = document.getElementById("game");
const mineNumberElement = document.getElementById("JS_mine_number");

gameElement.innerHTML = html;
mineNumberElement.innerText = MINE_NUMBER;

function addFlag() {
  let v = +mineNumberElement.innerText;
  if (v > 0) {
    v -= 1;
    mineNumberElement.innerText = v;
    return true;
  }

  return false;
}

function delFlag() {
  let v = +mineNumberElement.innerText;
  if (v < MINE_NUMBER) {
    v += 1;
    mineNumberElement.innerText = v;
    return true;
  }

  return false;
}

const elementMap = [];

gameElement.querySelectorAll('ul').forEach(ul => {
  elementMap.push(ul.querySelectorAll('li'))
});

console.log(elementMap)

gameElement.addEventListener('click', function (event) {
  const elem = event.target;
  if (elem.nodeName === 'LI' && elem.getAttribute('data-val') !== null) {
    if (elem.classList.contains(OPEN_CLASSNAME)) {
      console.log('这个已经是打开的了块了')
      return;
    }

    const valStr = elem.getAttribute('data-val');
    const valNumber = +valStr;

    setRealVal(elem);

    if (valStr === MINE_STR) {
      console.warn('你踩地雷了, Game Over');
    } else {
      if (valNumber === EMPTY_VAL) {
        const row = +elem.getAttribute('data-row');
        const col = +elem.getAttribute('data-col');

        const temp = flood(gameMap, row, col);
        console.log('temp==', temp);

        temp.forEach(pos => {
          const [row, col] = pos;
          const el = elementMap[row][col];
          // elementMap[row][col].classList.add('active');
          if (el.getAttribute('data-sign') !== 'done') {
            setRealVal(el);
          }
        })
      }
    }
  }
}, false);

function setRealVal(elem) {
  if (elem.nodeName === 'LI' && elem.getAttribute('data-val') !== null) {
    const valStr = elem.getAttribute('data-val');
    const valNumber = +valStr;

    const s = valNumber === EMPTY_VAL ? '' : valStr;
    elem.innerText = s;
    elem.classList.add(OPEN_CLASSNAME);
  }
}

// 充值
function reset() {

}

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
      if (element.getAttribute('data-sign') === 'done') {
        element.innerText = '';
        element.removeAttribute('data-sign');

        delFlag();
      } else {
        const a = addFlag();
        if (a) {
          element.innerText = '🚩';
          element.setAttribute('data-sign', 'done');
        }
      }
    }
  }
}, false);