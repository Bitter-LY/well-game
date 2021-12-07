export default class CellItem {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx, id) {
    this.ctx = ctx
    this.id = id
  }

  get canvas() {
    return this.ctx.canvas
  }

  render(isCheckPointIn) {}

  clear() {}

  containPoint(position) {
    return true
  }
}
