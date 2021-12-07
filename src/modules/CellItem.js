import gameConfig from '../game.config.js'
import { degreesToRadian } from '../utils/calc.js'

const { circle, break: breakConfig } = gameConfig

export default class CellItem {
  static TYPE = {
    CIRCLE: Symbol('CIRCLE'),
    BREAK: Symbol('BREAK')
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array<Number>} center
   * @param {CellItem.TYPE} type
   */
  constructor({
    ctx,
    id,
    width,
    height,
    position,
    center,
    isRendered = true,
    type = CellItem.TYPE.CIRCLE
  }) {
    this.ctx = ctx
    this.id = id
    this.width = width
    this.height = height
    this.position = position
    this.center = center
    this.isRendered = isRendered
    this.type = type
  }

  get canvas() {
    return this.ctx.canvas
  }

  render() {
    const { type } = this
    const { CIRCLE, BREAK } = CellItem.TYPE

    switch (type) {
      case CIRCLE:
        this._circle()
        break
      case BREAK:
        this._break()
        break
    }
  }

  contain(x, y) {
    const { position, width, height } = this
    const sx = position[0] * width
    const sy = position[1] * height

    return x > sx && x < sx + width && y > sy && y < sy + height
  }

  _circle() {
    const { ctx, isRendered, center } = this
    const { color, lineWidth, radius } = circle
    if (!isRendered) return

    ctx.beginPath()
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.arc(...center, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
  }

  _break() {
    const { ctx, center, isRendered } = this
    const ds = [45, 135]
    const { lineLength, lineWidth, color } = breakConfig
    if (!isRendered) return

    ctx.beginPath()
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.translate(...center)
    ds.forEach((d) => {
      ctx.save()
      ctx.rotate(degreesToRadian(d))
      ctx.moveTo(-lineLength, 0)
      ctx.lineTo(lineLength, 0)
      ctx.restore()
    })
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
  }
}
