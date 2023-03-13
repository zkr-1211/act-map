import * as THREE from 'three'
import { initTween } from '../methods'
import snowImage from '@/assets/image/snow.png'

export function initSnow(scene) {
  // 加载下雪理贴图
  const textureTree = new THREE.TextureLoader().load(snowImage)
  // 创建一个组表示所有的下雪
  const group = new THREE.Group()
  // 批量创建下雪精灵模型
  for (let i = 0; i < 300; i++) {
    const spriteMaterial = new THREE.SpriteMaterial({
      map: textureTree, // 设置精灵纹理贴图
      opacity: 0.7
    })
    // 创建精灵模型对象
    const sprite = new THREE.Sprite(spriteMaterial)
    scene.add(sprite)
    // 控制精灵大小,
    sprite.scale.set(8, 10, 1) // // 只需要设置x、y两个分量就可以
    const k1 = Math.random() - 0.5
    const k2 = Math.random() - 0.5
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.set(2000 * k1, 3000 * Math.random(), 2000 * k2)
    group.add(sprite)
  }
  scene.add(group) // 下雪群组插入场景中
  return group
}

export function snow({ camera, group, group1, group2, group3, isWheel, wheelDelta }) {
  const timer = Date.now() * 0.00000000000008
  group.children.forEach(sprite => {
    // 雨滴的z坐标每次减
    sprite.position.z -= 2
    if (sprite.position.z < 0) {
      // 如果雨滴落到地面，重置z，从新下落
      sprite.position.z = 1000
    }
  })

  group1.children.forEach(sprite => {
    if (isWheel && wheelDelta) {
      const target = { x: sprite.position.x - 120, y: sprite.position.y, z: sprite.position.z + 120 }
      initTween(sprite.position, target, 400)
    }
    if (isWheel && !wheelDelta && camera.position.z < 800) {
      const target = { x: sprite.position.x + 120, y: sprite.position.y, z: sprite.position.z }
      initTween(sprite.position, target, 400)
    }
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.x -= timer
    sprite.position.y -= timer * 0.1
    if (sprite.position.z > 400) {
      sprite.position.z -= timer * 1.5
    }
    if (sprite.position.x < -1400) {
      sprite.position.x = 1400
    }
    if (camera.position.z > 1000) {
      sprite.position.x += 5
      sprite.position.y += 5
      sprite.position.z += 5
    }
  })
  group2.children.forEach(sprite => {
    if (isWheel && wheelDelta) {
      const target = { x: sprite.position.x - 120, y: sprite.position.y, z: sprite.position.z + 150 }
      initTween(sprite.position, target, 400)
    }
    if (isWheel && !wheelDelta && camera.position.z < 800) {
      const target = { x: sprite.position.x + 120, y: sprite.position.y, z: sprite.position.z }
      initTween(sprite.position, target, 400)
    }
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.x += timer
    sprite.position.y += timer * 0.01
    if (sprite.position.z > 400) {
      sprite.position.z -= timer * 1.8
    }
    if (sprite.position.x > 1400) {
      sprite.position.x = -1400
    }
    if (camera.position.z > 1000) {
      sprite.position.x += 5
      sprite.position.y += 5
      sprite.position.z += 5
    }
  })
  group3.children.forEach(sprite => {
    if (isWheel && wheelDelta) {
      const target = { x: sprite.position.x, y: sprite.position.y - 120, z: sprite.position.z + 120 }
      initTween(sprite.position, target, 400)
    }
    if (isWheel && !wheelDelta && camera.position.z < 800) {
      const target = { x: sprite.position.x, y: sprite.position.y + 120, z: sprite.position.z - 120 }
      initTween(sprite.position, target, 400)
    }
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.y += timer
    if (sprite.position.y > 1200) {
      sprite.position.y = -800
    }
    if (camera.position.z > 1000) {
      sprite.position.x -= 5
      sprite.position.y += 7
      sprite.position.z -= 5
    }
  })
}
