/**
 *@description - 设置画布像素为canvas元素的Css大小
 * @param {HTMLCanvasElement} canvas
 * @param {Boolean} highDefinition - 画布是否高清适配
 * @returns {[Number, undefined]}
 */
export default function fullCanvasBox(canvas, highDefinition = true) {
  const ratio = devicePixelRatio
  const { offsetWidth, offsetHeight } = canvas
  const width = highDefinition ? offsetWidth * ratio : offsetWidth
  const height = highDefinition ? offsetHeight * ratio : offsetHeight

  canvas.width = width
  canvas.height = height
  canvas.isHighDefinition = highDefinition

  return highDefinition ? ratio : undefined
}
