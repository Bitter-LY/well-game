import { state } from './game.state.js'
import Cell from './modules/Cell.js'
import CellItem from './modules/CellItem.js'
import Grid from './modules/Grid.js'
import fullCanvasBox from './utils/fullCanvasSize.js'

/**
 *
 * @description - 网格画布容器
 * @type {HTMLCanvasElement}
 */
const canvasGrid = document.querySelector('#canvas_grid')
/**
 *
 * @description - 动态单元格画布容器
 * @type {HTMLCanvasElement}
 */
const canvasCell = document.querySelector('#canvas_cell')

// step-0 设置画布像素宽高
const ratio = fullCanvasBox(canvasGrid, false)
fullCanvasBox(canvasCell, false)

// 获取2d画布渲染对象
const gridCtx = canvasGrid.getContext('2d')
const cellCtx = canvasCell.getContext('2d')

// 如果step-0没有设置画布高清适配，则不需要这一步
gridCtx.scale(ratio, ratio)
cellCtx.scale(ratio, ratio)

// 网格对象
const grid = new Grid(gridCtx)
// 单元格对象
const cell = new Cell(cellCtx)

// 绘制
grid.render()
cell.render()
cell.onClick(onCellClick)

/**
 *
 * @param {CellItem} cellItem
 */
function onCellClick(cellItem) {
  if (state.isGameOver) return
  const { p1, p2, p1Size, p2Size } = state
  const { BREAK, CIRCLE } = CellItem.TYPE

  cellItem.type = p1Size <= p2Size ? BREAK : CIRCLE
  cellItem.isRendered = true
  cell.render()

  if (p1Size <= p2Size) {
    p1.add(cellItem)
  } else {
    p2.add(cellItem)
  }

  const { p1Finish, p2Finish } = state
  state.isGameOver = p1Finish || p2Finish

  if (state.p1Size + state.p2Size === 9) {
    state.isGameOver = true
    cell.gameOver('even')
    return
  }

  if (state.isGameOver) {
    const winner = p1Finish ? 'p1' : 'p2'
    cell.gameOver(winner)
  }
}
