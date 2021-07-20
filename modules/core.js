import { shuffle } from "./utils.js";
import { EMPTY_VAL, MINE_VAL } from "./config.js";

/**
 * 生成 row 行，col 列的数组地图，
 * 用 0 填充空白，用 100 填充地雷
 * @param row
 * @param col
 * @return [[]]
 */
function createMap(row = 2, col = 2, mine_number = 1) {
  const arr = [];
  const landminePosition = createLandminePosition(row, col, mine_number);

  for (let i = 0; i < row; i++) {
    let r = [];

    for (let j = 0; j < col; j++) {
      r.push(EMPTY_VAL);
    }

    arr.push(r);
  }

  landminePosition.forEach(([row_pos, col_pos]) => {
    // console.log(row_pos, col_pos);

    // 填充地雷
    arr[row_pos][col_pos] = MINE_VAL;

    // 8个位置，设置周边的空位值 +1，并且它不是地雷
    // 上区域
    setMinePlus(row_pos - 1, col_pos - 1);
    setMinePlus(row_pos - 1, col_pos);
    setMinePlus(row_pos - 1, col_pos + 1);

    // 下区域
    setMinePlus(row_pos + 1, col_pos - 1);
    setMinePlus(row_pos + 1, col_pos);
    setMinePlus(row_pos + 1, col_pos + 1);

    // 左，右
    setMinePlus(row_pos, col_pos - 1);
    setMinePlus(row_pos, col_pos + 1);
  });

  return arr;

  function setMinePlus(row_pos, col_pos) {
    try {
      if (arr[row_pos][col_pos] !== MINE_VAL) {
        arr[row_pos][col_pos] += 1;
      }
    } catch(e) {
      // do nothing...
    }
  }
}

/**
 * 生成地雷位置
 * @param row 地图的行数
 * @param col 地图的列数
 * @param mine_number 你要创建多少个雷
 * @example 比如在 10x10的地图创建3个地雷，那么就是说在[0, 0] - [9, 9] 生产3个随机的坐标系，
 * 比如：[2, 3], [4, 6], [8, 8] 这3个雷
 *
 * 这里有个算法优化，如果直接使用随机算法，比如先随机生成1个雷，然后再生成第2个雷，虽然可以，但需要判断雷是否重复，如果重复得再次随机，看运气，如果运气不好，时间会长，这算法有缺陷。
 *
 * 所以这里参考洗牌算法，先把所有点取出来，再洗牌，取前 mine_number 个
 * 时间复杂度 O(row * col)
 */
function createLandminePosition(row = 2, col = 2, mine_number = 1) {
  const allPosition = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      allPosition.push([i, j]);
    }
  }

  const max = allPosition.length;

  mine_number = Math.min(mine_number, max);

  return shuffle(allPosition).slice(0, mine_number);
}



export { createMap, createLandminePosition };
