import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { initRender } from './map/renderer'
import { initCamera } from './map/camera'
import { initControls, restrictArea, onControlsChange } from './map/controls'
import { initScene } from './map/scene'
import { initLight } from './map/light'
import { initSnow, snow } from './map/snow'
import { initClouds } from './map/cloud'
import { initTween, getIntersects, setCameraToPrevZ } from './methods'
import { hideMonsterContent, createMonsters, showMonterPopup } from './monster'
import { createMap } from './map/create'
import { onWindowResize } from './map/resize'
import { initDom } from './map/dom'
import { setRulerValue } from './map/ruler'

window.mapContext = {
  controls: null,
  orbitControls: null,
  renderer: null,
  camera: null,
  scene: null,
  requestId: undefined,
  root: document.querySelector('.act-map'),
  z: 1000
}
window.rulerContext = {
  top: '11%',
  value: '1000km'
}

initDom()

let controls, orbitControls, renderer, camera, scene
let group, group1, group2, group3, wheelClock, isClick
let ruleValueChange = true
// 执行滚动动画
let isWheel = false
// 滚轮后退回到中心点
let isBack = false
// 滚动方向
let wheelDelta = false
let moveWheelStop = true
let moveWheelStart = false
let monsters
let wmPlane
// 初始化模型
function initModel() {
  group = initSnow(scene)
  const clouds = initClouds(scene)
  group1 = clouds.group1
  group2 = clouds.group2
  group3 = clouds.group3
  scene.add(wmPlane)
  monsters = createMonsters()
  monsters.forEach(item => scene.add(item))
}

// 滚动延迟函数
function stopWheel() {
  if (moveWheelStart) {
    isWheel = false
    moveWheelStart = false
    moveWheelStop = true
    // 这里写停止时调用的方法
  }
}

// 移动端滑动
function onTouchMove() {
  const popup = document.querySelector('#monster_popup')
  if (popup) {
    isBack = true
    isClick = true
    isWheel = true
    wheelDelta = false
    hideMonsterContent()
    setCameraToPrevZ()
  }
}

// 点击坐标
function onMouseDblclick(event) {
  const popup = document.querySelector('#monster_popup')
  wheelDelta = popup === null
  // 获取raycaster和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
  const intersects = getIntersects(event, camera, scene)
  if (intersects.length > 0) {
    if (intersects.find(item => item.object.name.indexOf('dot') === 0)) {
      const item = intersects.find(item => item.object.name.indexOf('dot') === 0)
      isBack = true
      isClick = true
      isWheel = true
      wheelDelta = true
      if (popup === null) {
        setRulerValue()
        showMonterPopup(item.object.name)
      } else {
        hideMonsterContent()
        setCameraToPrevZ()
        setTimeout(() => {
          showMonterPopup(item.object.name)
        }, 500)
      }
    } else {
      if (popup === null) {
        return
      } else {
        hideMonsterContent()
        setCameraToPrevZ()
      }
    }
  } else {
    hideMonsterContent()
  }
}

// 监听鼠标滚动
function onDocumentMouseWheel(event) {
  hideMonsterContent()
  ruleValueChange = true
  controls.noZoom = controls.maxDistance > 1000
  const top = parseFloat(document.getElementById('ruler_location').style.top)
  const value = parseFloat(document.getElementById('ruler_location').innerHTML)
  if (event.wheelDelta > 0) {
    isBack = true
    wheelDelta = true
    isWheel = true
    if (camera.position.z >= 450 && camera.position.z < 600) {
      isWheel = true
    }
    if (top < 86 && ruleValueChange) {
      setRulerValue(`${top + 7.5}%`, (value - 100).toString() + 'km')
    }
  } else if (event.wheelDelta < 0 && ruleValueChange) {
    isClick = false
    wheelDelta = false
    isWheel = true
    if ((camera.position.z <= 800 && camera.position.x < 210) || camera.position.x > 230) {
      const target = { x: 220, y: 250, z: camera.position.z }
      isBack && initTween(camera.position, target, 600)
      isBack = false
    }
    if (camera.position.z > 985) {
      const target = { x: camera.position.x, y: camera.position.y, z: 1000 }
      isBack && initTween(camera.position, target, 1)
      isBack = false
      controls.noZoom = true
    }
    if (top > 11 && ruleValueChange) {
      setRulerValue(`${top - 7.5}%`, (value + 100).toString() + 'km')
    }
  }
  // 滚动
  if (moveWheelStop) {
    moveWheelStop = false
    moveWheelStart = true
    wheelClock = setTimeout(stopWheel, 800)
  } else {
    clearTimeout(wheelClock)
    wheelClock = setTimeout(stopWheel, 800)
  }
  window.mapContext.z = camera.position.z
  window.rulerContext.top = document.getElementById('ruler_location').style.top
  window.rulerContext.value = document.getElementById('ruler_location').innerHTML
  camera.lookAt(scene.position)
  camera.updateProjectionMatrix()
}

// 滚轮动画
function initScroll() {
  const cp = camera.position
  if (wheelDelta) {
    if (wmPlane.rotation.x > -0.3 && cp.z < 800) {
      wmPlane.rotation.x -= 0.01
      monsters.forEach(item => {
        item.rotation.x -= 0.01
      })
    } else {
      isWheel = false
    }
  } else {
    if (wmPlane.rotation.x < 0 && cp.z < 1000) {
      wmPlane.rotation.x += 0.01
      monsters.forEach(item => {
        item.rotation.x += 0.01
      })
    }
    // 左右侧统一回滚动画
    if (cp.z > 800 && cp.z < 1000 && cp.x > 0 && !isClick) {
      cp.x -= 5
    }
  }
}

// 渲染
function render() {
  restrictArea({
    camera,
    wmPlane
  })

  snow({
    camera,
    group,
    group1,
    group2,
    group3,
    isWheel
  })

  camera.position.z > 450 && isClick && initScroll()

  // 刚进入页面的时候，鼠标不需要有任何操作，会自动做一个拉进的效果
  if (camera.position.z > 1000) {
    camera.position.z -= 10
    camera.position.y += 3
    camera.position.x -= 0.2
  }

  // 滚轮动画
  isWheel && initScroll()
  renderer.render(scene, camera)
}
// 动画
function animate() {
  // 更新控制器
  controls.update()
  orbitControls.update()
  TWEEN.update()
  window.mapContext.requestId = requestAnimationFrame(animate)
  render()
}

// 开始渲染
function init() {
  wmPlane = createMap()
  scene = initScene()
  renderer = initRender()
  camera = initCamera()
  const con = initControls(camera, renderer)
  controls = con.controls
  orbitControls = con.orbitControls
  initModel()
  initLight(scene)
  animate()
  onControlsChange()
  window.addEventListener('resize', () => onWindowResize(render))
}
window.reload = init
window.gameAnimate = animate
const map = document.querySelector('#act_map')
map.addEventListener('wheel', onDocumentMouseWheel)
map.addEventListener('click', onMouseDblclick, false)
map.addEventListener('touchmove', onTouchMove, false)
// 关闭弹窗调用该方法 使平面rotation恢复为0
export function closeMonter() {
  wheelDelta = false
}
export default init
