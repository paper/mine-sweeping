console.log("mine-sweeping");

import { createMap } from "./modules/core.js";

const MODE = {
  'easy': {
    TYPE: 'easy',
    ROW: 10,
    COL: 10,
    MINE_NUMBER: 10
  },
  'medium': 1,
  'hard': 2
}

const { TYPE, ROW, COL, MINE_NUMBER } = MODE.easy;

const gameMap = createMap(ROW, COL, MINE_NUMBER);


console.log(gameMap)

let html = '';

for (let i = 0; i < ROW; i++) {
  for(let j = 0; j < COL; j++) {
    html += `<li>${gameMap[i][j]}</li>`
  }
}

