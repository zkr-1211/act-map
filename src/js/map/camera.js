import * as THREE from 'three'

export function initCamera() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.set(0, 0, 1800)
  window.mapContext.camera = camera
  return camera
}
