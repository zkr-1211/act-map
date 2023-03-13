import * as THREE from 'three'

export function initRender() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('act_map') })
  renderer.setSize(window.innerWidth, window.innerHeight)
  window.mapContext.renderer = renderer
  return renderer
}
