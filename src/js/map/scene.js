import * as THREE from 'three'

export function initScene() {
  const scene = new THREE.Scene()
  // 创建一个纹理图片加载器加载图片
  const textureLoader = new THREE.TextureLoader()
  // 加载背景图片
  const texture = textureLoader.load('src/assets/image/')
  scene.background = texture
  window.mapContext.scene = scene
  return scene
}
