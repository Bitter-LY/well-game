/**
 * @param {HTMLCanvasElement} canvas
 */
export function windowToCanvas(canvas, x, y) {
  const { width, height, left, top } = canvas.getBoundingClientRect()
  const { width: cw, height: ch } = canvas

  return {
    x: x - left * (cw / width),
    y: y - top * (ch / height)
  }
}

export function degreesToRadian(degrees) {
  return (degrees * Math.PI) / 180
}
