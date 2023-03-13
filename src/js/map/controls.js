import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { isMobile } from '../methods'

let controls, orbitControls
export function initControls(camera, renderer) {
  // 使用 OrbitControls （主要为了移动端使用touches进行滑动）
  orbitControls = new OrbitControls(camera, renderer.domElement)
  // 触摸移动
  orbitControls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN
  }
  orbitControls.enablePan = isMobile()
  // 是否不变焦
  orbitControls.enableZoom = false
  // 是否旋转
  orbitControls.enableRotate = false
  // 是否开启阻尼
  orbitControls.enableDamping = true
  // 动态阻尼系数 就是灵敏度
  orbitControls.dampingFactor = 0.03
  // 平移速度
  orbitControls.panSpeed = 0.8
  orbitControls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  }
  // 使用 TrackballControls 主要是使用滚轮动画 （没有移动端滑动api）
  controls = new TrackballControls(camera, renderer.domElement)
  // //修改鼠标按键
  controls.mouseButtons = {
    // 左键平移
    LEFT: THREE.MOUSE.PAN,
    // 滚轮滑动
    MIDDLE: THREE.MOUSE.DOLLY,
    // 右键旋转
    RIGHT: THREE.MOUSE.ROTATE
  }
  controls.keys = ['KeyA', 'KeyS', 'KeyD']
  controls.minDistance = 450
  controls.maxDistance = 1800
  setTimeout(() => {
    controls.maxDistance = 1000
  }, 2200)
  controls.noRotate = true
  // 变焦速度
  controls.zoomSpeed = 0.2
  // 平移速度
  controls.panSpeed = 0.1
  // 是否不变焦
  controls.noZoom = false
  // 是否不平移
  controls.noPan = isMobile()
  // 是否开启移动惯性
  controls.staticMoving = false
  // 动态阻尼系数 就是灵敏度
  controls.dynamicDampingFactor = 0.06
  // 未知，占时先保留
  controls.keys = [65, 83, 68]

  window.mapContext.controls = controls
  window.mapContext.orbitControls = orbitControls

  return { controls, orbitControls }
}

let minX, maxX, minY, maxY, nminX, nmaxX, nminY, nmaxY
if (!isMobile()) {
  if (window.innerWidth > 1680 && window.innerWidth <= 1920) {
    nminX = 0.0021
    nmaxX = 0.0021
  } else {
    nminX = 0.0018
    nmaxX = 0.0018
  }
} else {
  nminX = 0.0014
  nmaxX = 0.0014
}

export function restrictArea({ camera, wmPlane }) {
  const bbox = new THREE.Box3().setFromObject(wmPlane)
  nminY = 0.0014
  nmaxY = 0.0025
  minX = -camera.position.x + bbox.min.x / (camera.position.z * nminX)
  maxX = -camera.position.x + bbox.max.x / (camera.position.z * nmaxX)
  minY = -camera.position.y + bbox.min.y / (camera.position.z * nminY)
  maxY = -camera.position.y + bbox.max.y / (camera.position.z * nmaxY)
  const positionX = Math.min(maxX, Math.max(minX, camera.position.x))
  const positionY = Math.min(maxY, Math.max(minY, camera.position.y))
  camera.position.set(positionX, positionY, camera.position.z)
  camera.lookAt(positionX, positionY, controls.target.z)
  controls.target.x = positionX
  controls.target.y = positionY
  camera.lookAt(positionX, positionY, orbitControls.target.z)
  orbitControls.target.x = positionX
  orbitControls.target.y = positionY
}
export function onControlChange() {
  const { camera } = window.mapContext
  parseInt(camera.position.x) <= parseInt(minX) ? (camera.position.x = minX) : ''
  parseInt(camera.position.x) >= parseInt(maxX) ? (camera.position.x = maxX) : ''
  parseInt(camera.position.y) >= parseInt(maxY) ? (camera.position.y = maxY) : ''
  parseInt(camera.position.y) <= parseInt(minY) ? (camera.position.y = minY) : ''
}

export function onControlsChange() {
  window.mapContext.orbitControls.addEventListener('change', () => onControlChange())
}
