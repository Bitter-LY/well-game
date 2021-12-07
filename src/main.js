import Cell from './modules/Cell.js'
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
const ratio = fullCanvasBox(canvasGrid)
fullCanvasBox(canvasCell)

// 获取2d画布渲染对象
const gridCtx = canvasGrid.getContext('2d')
const cellCtx = canvasCell.getContext('2d')

// 如果step-0没有设置画布高清适配，则不需要这一步
gridCtx.scale(ratio, ratio)
cellCtx.scale(ratio, ratio)

// 网格对象
const grid = new Grid(gridCtx)
// 单元格对象
const cell = new Cell()

// 绘制
grid.render()
cell.render()
