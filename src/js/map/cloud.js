import * as THREE from 'three'
import clouds1 from '@/assets/image/clouds1.png'
import clouds2 from '@/assets/image/clouds2.png'
import clouds3 from '@/assets/image/clouds3.png'

export function initClouds(scene) {
  // 加载云朵理贴图
  const textureTree1 = new THREE.TextureLoader().load(clouds1)
  const textureTree2 = new THREE.TextureLoader().load(clouds2)
  const textureTree3 = new THREE.TextureLoader().load(clouds3)
  // 创建一个组表示所有的云朵
  const group1 = new THREE.Group()
  const group2 = new THREE.Group()
  const group3 = new THREE.Group()
  // 批量创建云朵精灵模型
  for (let i = 0; i < 50; i++) {
    const spriteMaterial1 = new THREE.SpriteMaterial({
      map: textureTree1, // 设置精灵纹理贴图
      opacity: 0.4
    })
    const spriteMaterial2 = new THREE.SpriteMaterial({
      map: textureTree2, // 设置精灵纹理贴图
      opacity: 0.9
    })
    const spriteMaterial3 = new THREE.SpriteMaterial({
      map: textureTree3, // 设置精灵纹理贴图
      opacity: 0.7
    })
    // 创建精灵模型对象
    const sprite1 = new THREE.Sprite(spriteMaterial1)
    const sprite2 = new THREE.Sprite(spriteMaterial2)
    const sprite3 = new THREE.Sprite(spriteMaterial3)
    // sprite1.name = 'y1';
    // sprite2.name = 'y2';
    // sprite3.name = 'y3';
    scene.add(sprite1)
    scene.add(sprite2)
    scene.add(sprite3)
    // 控制精灵大小,
    sprite1.scale.set(180, 80, 10) // // 只需要设置x、y两个分量就可以
    sprite2.scale.set(140, 100, 10) // // 只需要设置x、y两个分量就可以
    sprite3.scale.set(200, 180, 10) // // 只需要设置x、y两个分量就可以
    const k1 = Math.random() - 0.5
    const k2 = Math.random() - 0.5
    // 设置精灵模型位置，在空间中随机分布
    sprite1.position.set(1000 * k1, 3000 * Math.random(), 2000 * k2)
    sprite2.position.set(2000 * k1, 3000 * Math.random(), 2000 * k2)
    sprite3.position.set(2000 * k1, 5000 * Math.random(), 6000 * k2)
    group1.add(sprite1)
    group2.add(sprite2)
    group3.add(sprite3)
  }
  scene.add(group1) // 云朵群组插入场景中
  scene.add(group2) // 云朵群组插入场景中
  scene.add(group3) // 云朵群组插入场景中
  return {
    group1,
    group2,
    group3
  }
}