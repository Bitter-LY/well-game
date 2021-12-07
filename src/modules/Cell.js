import CellItem from './CellItem.js'

class CellItemFind {
  constructor() {
    /**
     * @type {Array<CellItem>}
     */
    this.cellItems = []
  }

  findItem(position) {
    const cellItem = this.cellItems.find((c) => c.containPoint(position))
    return cellItem ? cellItem : undefined
  }
}

export default class Cell extends CellItemFind {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    super()
    this.ctx = ctx
  }

  get canvas() {
    return this.ctx.canvas
  }

  render() {}

  clear() {}
}
