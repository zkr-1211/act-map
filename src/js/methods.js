import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { setRulerValue } from './map/ruler'

// 获取与射线相交的对象数组
export function getIntersects(event, camera, scene) {
  event.preventDefault() // 阻止默认的点击事件执行
  // 声明 rayCaster 和 mouse 变量
  const rayCaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  // 通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 // 这里为什么是-号，没有就无法点中
  // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
  rayCaster.setFromCamera(mouse, camera)
  // 获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。
  const intersects = rayCaster.intersectObjects(scene.children)
  // 返回选中的对象
  return intersects
}

// 过渡动画函数
export function initTween(start, target, delay) {
  const tween = new TWEEN.Tween(start).to(target, delay || 1000)
  tween.start()
}

export function setCameraToPrevZ() {
  const { camera, z } = window.mapContext
  const { top, value } = window.rulerContext
  setRulerValue(top, value)
  initTween(camera.position, { x: camera.position.x, y: camera.position.y, z }, 800)
}

// 是否移动端
export function isMobile() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod', 'iOS']
  const flag = Agents.some(item => {
    return userAgentInfo.indexOf(item) > 0
  })
  return flag
}