import { shuffle } from "./utils.js";
import { EMPTY_VAL, MINE_VAL } from "./config.js";

/**
 * 生成 row 行，col 列的数组地图，
 * 用 0 填充空白，用 100 填充地雷
 * @param {number} maxRow 最大行
 * @param {number} maxCol 最大列
 * @param {number} mineNumber 地雷数
 * @return {Array[]} map
 */
function createMap(maxRow = 2, maxCol = 2, mineNumber = 1) {
  const map = [];
  const landminePosition = createLandminePosition(maxRow, maxCol, mineNumber);

  for (let row = 0; row < maxRow; row++) {
    let r = [];

    for (let col = 0; col < maxCol; col++) {
      r.push(EMPTY_VAL);
    }

    map.push(r);
  }

  console.log("landminePosition=", landminePosition);

  landminePosition.forEach((pos) => {
    const [row, col] = pos;

    // 填充地雷
    map[row][col] = MINE_VAL;

    // 8个位置，设置周边的空位值 +1，并且它不是地雷
    // 上区域
    setMinePlus(map, row - 1, col - 1);
    setMinePlus(map, row - 1, col);
    setMinePlus(map, row - 1, col + 1);

    // 下区域
    setMinePlus(map, row + 1, col - 1);
    setMinePlus(map, row + 1, col);
    setMinePlus(map, row + 1, col + 1);

    // 左，右
    setMinePlus(map, row, col - 1);
    setMinePlus(map, row, col + 1);
  });

  return map;
}

function setMinePlus(map, row, col) {
  try {
    if (typeof map[row][col] === "number" && map[row][col] !== MINE_VAL) {
      map[row][col] += 1;
    }
  } catch (e) {
    // do nothing...
  }
}

/**
 * 生成地雷位置
 * @param maxRow 地图的行数
 * @param maxCol 地图的列数
 * @param mineNumber 你要创建多少个雷
 * @example 比如在 10x10的地图创建3个地雷，那么就是说在[0, 0] - [9, 9] 生产3个随机的坐标系，
 * 比如：[2, 3], [4, 6], [8, 8] 这3个雷
 *
 * 这里有个算法优化，如果直接使用随机算法，比如先随机生成1个雷，然后再生成第2个雷，虽然可以，但需要判断雷是否重复，如果重复得再次随机，看运气，如果运气不好，时间会长，这算法有缺陷。
 *
 * 所以这里参考洗牌算法，先把所有点取出来，再洗牌，取前 mine_number 个
 * 时间复杂度 O(row * col)
 */
function createLandminePosition(maxRow = 2, maxCol = 2, mineNumber = 1) {
  const allPosition = [];

  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      allPosition.push([row, col]);
    }
  }

  const max = allPosition.length;

  mineNumber = Math.min(mineNumber, max);

  return shuffle(allPosition).slice(0, mineNumber);
}

/**
 * 深度遍历打开地图迷雾
 * @param {Array[]} map 地图
 * @param {number} row 第几行
 * @param {number} col 第几列
 */
function openMist(map, row, col) {
  const MAX_ROW = map.length;
  const MAX_COL = map[0].length;

  if (map[row][col] !== EMPTY_VAL) {
    return;
  }

  // 用来标记已经走过的路就不再走了
  const cache = {};

  // 用来收集需要展开的坐标
  const ret = [];

  // 深度优先遍历
  function walk(row, col) {
    const pos = [row, col];
    const cacheKey = pos.join("-");

    if (cache[cacheKey]) {
      return;
    }

    cache[cacheKey] = true;

    // up
    tryWalk(row - 1, col);

    // down
    tryWalk(row + 1, col);

    // left
    tryWalk(row, col - 1);

    // right
    tryWalk(row, col + 1);

    // left-up
    tryWalk(row - 1, col - 1);

    // right-up
    tryWalk(row - 1, col + 1);

    // left-down
    tryWalk(row + 1, col - 1);

    // right-down
    tryWalk(row + 1, col + 1);
  }

  function tryWalk(row, col) {
    try {
      if (typeof map[row][col] === "number") {
        ret.push([row, col]);

        if (map[row][col] === EMPTY_VAL) {
          walk(row, col);
        }
      }
    } catch (err) {
      // do nothing...
    }
  }

  walk(row, col);

  return ret;
}

export { createMap, createLandminePosition, openMist };
