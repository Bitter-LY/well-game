import gameConfig from '../game.config.js'
import LinearGradient from '../Style/LinearGradient.js'

const {
  backgroundColor,
  grid: { lineColor, lineWidth }
} = gameConfig

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

  render() {
    const { ctx, canvas } = this
    const { width, height } = canvas.getBoundingClientRect()
    const stepX = width / 3
    const stepY = height / 3

    this.clear()

    ctx.beginPath()
    ctx.save()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.fillStyle =
      backgroundColor instanceof LinearGradient
        ? backgroundColor._buildColor(ctx)
        : backgroundColor
    ctx.fillRect(0, 0, width, height)
    ctx.moveTo(0, stepY)
    ctx.lineTo(width, stepY)
    ctx.moveTo(0, stepY * 2)
    ctx.lineTo(width, stepY * 2)

    ctx.moveTo(stepX, 0)
    ctx.lineTo(stepX, height)
    ctx.moveTo(stepX * 2, 0)
    ctx.lineTo(stepX * 2, height)
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
  }

  clear() {
    const { ctx, canvas } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
