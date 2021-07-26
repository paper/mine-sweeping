const EMPTY_VAL = 0;
const MINE_VAL = 100;
const MINE_STR = '💥'; // 💣
const OPEN_CLASSNAME = 'open';

const MODE = {
  easy: {
    TYPE: "easy",
    MAX_ROW: 5,
    MAX_COL: 5,
    MINE_NUMBER: 2,
  },
  medium: 1,
  hard: 2,
};

export {
  EMPTY_VAL,
  MINE_VAL,
  MINE_STR,
  OPEN_CLASSNAME,
  MODE
}