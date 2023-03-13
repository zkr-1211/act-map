import * as THREE from 'three'

export function initLight(scene) {
  scene.add(new THREE.AmbientLight(0x404040))
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(1, 1, 1)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(Math.random() * 0x10)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff)
  directionalLight.position.x = Math.random() - 0.5
  directionalLight.position.y = Math.random() - 0.5
  directionalLight.position.z = Math.random() - 0.5
  directionalLight.position.normalize()
  scene.add(directionalLight)

  directionalLight.position.x = Math.random() - 0.5
  directionalLight.position.y = Math.random() - 0.5
  directionalLight.position.z = Math.random() - 0.5
  directionalLight.position.normalize()
  scene.add(directionalLight)
}
