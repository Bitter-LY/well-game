/**
 * @param {HTMLCanvasElement} canvas
 */
export function windowToCanvas(canvas, x, y) {
  const { left, top } = canvas.getBoundingClientRect()

  return {
    x: x - left,
    y: y - top
  }
}

export function degreesToRadian(degrees) {
  return (degrees * Math.PI) / 180
}
