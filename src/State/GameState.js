export default class GameState {
  constructor() {
    this.initState()
  }

  get p1Size() {
    return this.p1.size
  }

  get p2Size() {
    return this.p2.size
  }

  get allSize() {
    return this.p1Size + this.p2Size
  }

  get p1Finish() {
    return this._isEnd(this.p1)
  }

  get p2Finish() {
    return this._isEnd(this.p2)
  }

  initState() {
    this.p1 = new Set()
    this.p2 = new Set()
    this.isGameOver = false
  }

  /**
   *
   * @param {Set<CellItem>} set
   */
  _isEnd(set) {
    if (set.size === 0 || set.size < 3) return false

    const arr = Array.from(set).map((e) => e.position)

    // 斜着的情况
    const [skewRightCount, skewLeftCount] = arr.reduce(
      (data, cur) => {
        const [x, y] = cur

        if (x - y === 0) data[1] += 1
        if (x + y === 2) data[0] += 1

        return data
      },
      [0, 0]
    )

    if (skewRightCount === 3 || skewLeftCount === 3) return true

    // 水平或垂直的情况
    const sortX = arr.sort((a, b) => a[0] - b[0])
    const sortY = arr.sort((a, b) => a[1] - b[1])
    let rowCount = 1
    let colCount = 1

    function deep(startIndex = 1) {
      rowCount = 1
      colCount = 1

      for (let i = startIndex; i < startIndex + 2; i++) {
        const pre = sortX[i - 1]
        const cur = sortX[i]

        if (!pre || !cur) {
          return rowCount === 3 || colCount === 3
        }

        if (pre[1] === cur[1]) rowCount += 1
        if (sortY[i - 1][0] === sortY[i][0]) colCount += 1
      }

      if (rowCount === 3 || colCount === 3) return true
      return deep(++startIndex)
    }

    return deep()
  }
}
