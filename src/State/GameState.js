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
    const cellStrPosition = new Set()

    const countX = {}
    const countY = {}

    arr.forEach((c) => {
      const [x, y] = c
      cellStrPosition.add(x + '_' + y)
      countX[x] = (countX[x] || 0) + 1
      countY[y] = (countY[y] || 0) + 1
    })

    if (
      Object.values(countX).some((v) => v >= 3) ||
      Object.values(countY).some((v) => v >= 3)
    ) {
      return true
    }

    const cellTrue1 = ['0_0', '1_1', '2_2']
    const cellTrue2 = ['2_0', '1_1', '0_2']

    return (
      cellTrue1.every((i) => cellStrPosition.has(i)) ||
      cellTrue2.every((i) => cellStrPosition.has(i))
    )
  }
}
