// 计时器

const ONE_SEC = 1000;

const noop = () => {
  // do nothing...
}

class Timer {
  constructor(interval = 100) {
    this.i = 0;
    this.t = null;

    this.interval = interval;
  }

  start(callback) {
    this.t = setTimeout(() => {
      const v = this.interval / ONE_SEC;
      this.i += v;

      callback && callback(parseFloat(this.i).toFixed(1));

      this.start(callback);
    }, this.interval);
  }

  stop() {
    clearTimeout(this.t);
    this.i = 0;
    this.t = null;
  }
}

/**
 * 这里我推荐一直使用 export，而不使用 default
 * 这样的好处就是，如果所有代码都这样写，那么使用者就不用关心我要不要括号了，只要加括号就行。提示也更好。
 * 
 * 当然，还是要看你们团队情况
 */
export {
  Timer
}