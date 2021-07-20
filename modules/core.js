import { shuffle } from './utils.js';

/**
 * 生成 row 行，col 列的数组，默认用 0 填充
 * @param row
 * @param col
 * @return [[]]
 */
function createEmptyMap(row = 1, col = 1, val = 0) {
  const arr = [];

  for (let i = 0; i < row; i++) {
    let r = [];

    for (let j = 0; j < col; j++) {
      r.push(val);
    }

    arr.push(r);
  }

  return arr;
}

/**
 * 生成地雷位置
 * @param row 地图的行数
 * @param col 地图的列数
 * @param num 你要创建多少个
 * @example 比如在 10x10的地图创建3个地雷，那么就是说在[0, 0] - [9, 9] 生产3个随机的坐标系，
 * 比如：[2, 3], [4, 6], [8, 8] 这3个雷
 *
 * 这里有个算法优化，如果直接使用随机算法，比如先随机生成1个雷，然后再生成第2个雷，虽然可以，但需要判断雷是否重复，如果重复得再次随机，看运气，如果运气不好，时间会长，这算法有缺陷。
 *
 * 所以这里参考洗牌算法，先把所有点取出来，再洗牌，取前 num 个，即雷的下标，
 * 时间复杂度 O(row * col)
 */
function createLandminePosition(row = 1, col = 1, num = 1) {
  const allPosition = [];
  
  for(let i = 0; i < row; i++) {
    for(let j = 0; j < col; j++) {
      allPosition.push([i, j]);
    }
  }
  
  console.log(allPosition);
  const max = allPosition.length;
  
  num = Math.min(num, max);
  
  
}

createLandminePosition(5, 5);

// const ret = createEmptyMap(5,3);
// console.log(ret);

export { createEmptyMap };
