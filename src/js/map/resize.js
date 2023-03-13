export function onWindowResize(render) {
  window.mapContext.camera.aspect = window.innerWidth / window.innerHeight
  window.mapContext.camera.updateProjectionMatrix()
  window.mapContext.controls.handleResize()
  render()
  window.mapContext.renderer.setSize(window.innerWidth, window.innerHeight)
}
