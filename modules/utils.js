const gameState = {
  __key: false,

  isOver() {
    return this.__key;
  },

  setOver() {
    this.__key = true;
  },

  reset() {
    this.__key = false;
  }
}

/**
 * 这里实现一个洗牌
 * @param arr 给一个数组
 * @return [] 返回它的打乱版本，原数组会被修改
 */
function shuffle(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const n = Math.floor(Math.random() * len);
    swap(arr, i, n);
  }

  return arr;
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

export { shuffle, gameState };
