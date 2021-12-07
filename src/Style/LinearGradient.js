export default class LinearGradient {
  /**
   *
   * @param {Array<Array>} colorStopList
   */
  constructor(colorStopList) {
    this.colorStopList = colorStopList
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  _buildColor(ctx) {
    const { width, height } = ctx.canvas.getBoundingClientRect()
    const linerGradient = ctx.createLinearGradient(0, 0, width, height)

    this.colorStopList.forEach((e) => {
      const [stop, color] = e
      linerGradient.addColorStop(stop, color)
    })

    return linerGradient
  }
}
