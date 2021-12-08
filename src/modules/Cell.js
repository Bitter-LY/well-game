import gameConfig from '../game.config.js'
import { state } from '../game.state.js'
import { degreesToRadian, windowToCanvas } from '../utils/calc.js'
import CellItem from './CellItem.js'

const {
  evenText,
  gameOverText: { text, fontFamily, fontSize, color },
  username
} = gameConfig

export default class Cell {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    /**
     * @type {Array<CellItem>}
     */
    this.cellItems = []
    this.ctx = ctx
    this._onClickFunc = () => {}

    this._addItems()
    this._bindEvent()
  }

  get canvas() {
    return this.ctx.canvas
  }

  render() {
    this.clear()
    this.cellItems.forEach((e) => e.render())
  }

  clear() {
    const { ctx, canvas } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  gameOver(winner = 'p1') {
    state.isGameOver = true
    const { ctx, canvas } = this
    const { width: boxWidth, height: boxHeight } =
      canvas.getBoundingClientRect()
    const padding = [20, 15, 20, 15]
    const borderRadius = 4
    const winnerText = winner === 'even' ? evenText : `Winner ${username[winner]}`

    ctx.beginPath()
    ctx.save()
    ctx.fillStyle = color
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.translate(boxWidth / 2, boxHeight / 2)

    const { width: overWidth } = ctx.measureText(text)
    const { width: winnerWidth } = ctx.measureText(winnerText)
    const maxWidth = Math.max(overWidth, winnerWidth)
    const rw = maxWidth + padding[1] + padding[3]
    const rh = fontSize * 3 + padding[0] + padding[2]

    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.translate(-rw / 2, -rh / 2)
    Array.from({ length: 4 }).forEach((_, i) => {
      const center = [
        i === 0 || i === 3 ? borderRadius : rw - borderRadius,
        i < 2 ? borderRadius : rh - borderRadius
      ]

      const startAngle = degreesToRadian(-180 + i * 90)
      const endAngle = startAngle + degreesToRadian(90)
      ctx.arc(...center, borderRadius, startAngle, endAngle, false)
    })

    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.translate(0, -fontSize)
    ctx.fillText(winnerText, 0, 0)
    ctx.restore()

    ctx.save()
    ctx.translate(0, fontSize)
    ctx.fillText(text, 0, 0)
    ctx.restore()

    ctx.restore()
    ctx.closePath()
  }

  onClick(cb) {
    this._onClickFunc = cb
  }

  _addItems() {
    this.cellItems = []
    const { cellItems, ctx, canvas } = this
    const { width: boxWidth, height: boxHeight } =
      canvas.getBoundingClientRect()
    const offsetX = boxWidth / 3 / 2
    const offsetY = boxHeight / 3 / 2
    const cellWidth = boxWidth / 3
    const cellHeight = boxHeight / 3

    for (let i = 0; i < 3; i++) {
      for (let ii = 0; ii < 3; ii++) {
        cellItems.push(
          new CellItem({
            ctx,
            id: ii + '_' + i,
            isRendered: false,
            position: [ii, i],
            width: cellWidth,
            height: cellHeight,
            center: [cellWidth * ii + offsetX, cellHeight * i + offsetY],
            type: CellItem.TYPE.BREAK
          })
        )
      }
    }
  }

  _bindEvent() {
    const { canvas } = this

    canvas.addEventListener('click', (e) => {
      if (state.isGameOver) {
        this.cellItems = []
        state.initState()
        this._addItems()
        this.render()

        return
      }

      const { x, y } = windowToCanvas(canvas, e.clientX, e.clientY)
      const target = this.cellItems.find((c) => c.contain(x, y))
      console.log(x, y);

      if (!(target instanceof CellItem)) return
      if (target.isRendered) return

      this._onClickFunc(target)
    })
  }
}
