console.log("mine-sweeping start");

import { gameState } from "./modules/utils.js";
import { createMap, openMist } from "./modules/core.js";
import { MODE, MINE_VAL, MINE_STR, EMPTY_VAL, OPEN_CLASSNAME } from "./modules/config.js";
import { Timer } from "./modules/time.js";



const { TYPE, MAX_ROW, MAX_COL, MINE_NUMBER } = MODE.easy;

const ALL_BOX_NUMBER = MAX_ROW * MAX_COL;
console.log('ALL_BOX_NUMBER = ', ALL_BOX_NUMBER);

const gameElement = document.getElementById("game");
const mineNumberElement = document.getElementById("JS_mine_number");
const gameResetElement = document.getElementById("JS_game_reset");
const timeElement = document.getElementById("JS_time");

let gameMap = [];
let elementMap = [];

const myTimer = new Timer();

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

function openBox(elem) {
  if (elem.nodeName === 'LI' && elem.getAttribute('data-val') !== null) {
    const valStr = elem.getAttribute('data-val');
    const valNumber = +valStr;

    const s = valNumber === EMPTY_VAL ? '' : valStr;
    elem.innerText = s;
    elem.classList.add(OPEN_CLASSNAME);
  }
}

function gameStart() {

  myTimer.stop();
  myTimer.start((i) => {
    // timeElement.textContent = i + '秒';
  });

  gameMap = createMap(MAX_ROW, MAX_COL, MINE_NUMBER);

  // console.log('gameMap==', gameMap);
  // console.log('==========================')
  let html = "";

  for (let row = 0; row < MAX_ROW; row++) {
    let temp = '';
    for (let col = 0; col < MAX_COL; col++) {
      const v = gameMap[row][col] === MINE_VAL ? MINE_STR : gameMap[row][col];
      temp += `<li data-val="${v}" data-row="${row}" data-col="${col}"></li>`;
    }
    html += `<ul>${temp}</ul>`
  }

  gameElement.innerHTML = html;
  mineNumberElement.innerText = MINE_NUMBER;

  elementMap = [];
  gameElement.querySelectorAll('ul').forEach(ul => {
    elementMap.push(ul.querySelectorAll('li'))
  });
}

// 重制
function gameReset() {
  gameState.reset();
  
  gameStart();
}

function checkSuccess() {
  // TODO
  // 可以再优化，当 flag 已经用完时，再每次都判断。这样会减少很多判断次数！
  // 还可以再优化就是，已经是 open 的元素，其实是判断一次后，下次就再也不用判断了，因为它状态已经是固定的

  // [class = "open"] + [class = "flag"] = ALL_BOX_NUMBER
  for (let row = 0; row < MAX_ROW; row++) {
    for (let col = 0; col < MAX_COL; col++) {
      const elem = elementMap[row][col];
      if (!elem.classList.contains('open') && !elem.classList.contains('flag')) {
        console.log('not done');
        return false;
      }
    }
  }

  console.log('success done');
  console.log('myTimer.stop()');
  console.log('gameState.setOver()');
  
  myTimer.stop();
  gameState.setOver();
  
  return true;
}



gameResetElement.addEventListener('click', function(){
  gameReset();
}, false);

// 左键
gameElement.addEventListener('click', function (event) {
  if (gameState.isOver()) {
    return
  }

  const elem = event.target;
  if (elem.nodeName === 'LI' && elem.getAttribute('data-val') !== null) {
    if (elem.classList.contains(OPEN_CLASSNAME)) {
      console.log('这个已经是打开的了块了')
      return;
    }

    const valStr = elem.getAttribute('data-val');
    const valNumber = +valStr;

    openBox(elem);

    if (valStr === MINE_STR) {
      console.warn('你踩地雷了, Game Over');
      myTimer.stop();
      gameState.setOver();
    } else {
      if (valNumber === EMPTY_VAL) {
        const row = +elem.getAttribute('data-row');
        const col = +elem.getAttribute('data-col');

        const temp = openMist(gameMap, row, col);
        // console.log('temp==', temp);

        temp.forEach(pos => {
          const [row, col] = pos;
          const el = elementMap[row][col];

          if (!el.classList.contains('flag')) {
            openBox(el);
          }
        });
      }

      checkSuccess();
    }
  }
}, false);


// 禁用右键菜单
gameElement.addEventListener('contextmenu', function (event) {
  event.preventDefault();
}, false);

// 鼠标右击判断
gameElement.addEventListener('mouseup', function (event) {
  if (gameState.isOver()) {
    return
  }

  if (event.button == 2) {
    // console.log('鼠标右击了')

    const element = event.target;
    // console.dir(element)

    if (element.nodeName === 'LI' && element.getAttribute('data-val') !== null) {
      if (element.classList.contains('flag')) {
        element.innerText = '';
        element.classList.remove('flag');

        delFlag();
      } else {
        const a = addFlag();
        if (a) {
          element.innerText = '🚩';
          element.classList.add('flag');

          checkSuccess();
        }
      }
    }
  }
}, false);

gameStart();