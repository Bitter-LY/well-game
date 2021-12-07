export default class Grid {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx
  }

  get canvas() {
    return this.ctx.canvas
  }

  render() {}

  clear() {}
}
