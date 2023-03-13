import monsterList from './data'
import * as THREE from 'three'
import { initTween, setCameraToPrevZ, isMobile } from './methods'
import { setRulerValue } from './map/ruler'
import { closeMonter } from './map'
import addressImg from '@/assets/image/address_img.png'
let currentIndex

export function showMonterPopup(nameOrIndex) {
  let current = null
  monsterList.forEach((item, i) => {
    if (
      (typeof nameOrIndex === 'string' && item.name === nameOrIndex) ||
      (typeof nameOrIndex === 'number' && i === nameOrIndex)
    ) {
      currentIndex = i
      current = item
    }
  })
  const { root } = window.mapContext
  const html = `
    <div id="monster_popup">
      <div id="monster_name_bar" class="monster-name-bar">
        ${current.monsterName}
      </div>
      <div id="monster_detail" class="monster-detail">
        <img class="top-left-border" src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/top_left_border.png" alt="" />
        <img id="cancel_logo" class="cancel-logo" src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/cancel_logo.png" alt="" />
        <div class="monster-image-block">
          <img id="monster_image" src="${current.img}" alt="" />
        </div>
        <div class="monster-content">
          <div class="monster-content-title">
            <div id="monster_content_name" class="monster-name">${current.monsterName}</div>
            <div class="monster-content-title-right">
              <div id="arrow_left" class="monster-content-title-arrow">
                <img id="arrow_left_img" class="arrow-image" src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/left_arrow_light.png" alt="" />
              </div>
              <div class="picture-number-block-left">
                <div id="monster_index" class="picture-number-text" style="color: #fff;">${currentIndex + 1}</div>
              </div>
              <div>
                <img src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/separate_img.png" alt="" />
              </div>
              <div class="picture-number-block-right">
                <div id="total_monster_number" class="picture-number-text" style="color: #56759a;">${monsterList.length}</div>
              </div>
              <div id="arrow_right" class="monster-content-title-arrow">
                <img id="arrow_right_img" class="arrow-image" src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/right_arrow_light.png" alt="" />
              </div>
            </div>
          </div>
          <div id="monster_content_detail" class="monster-content-detail">${current.description}</div>
        </div>
      </div>
    </div>
  `

  root.insertAdjacentHTML('beforeend', html)

  if (currentIndex === 0) {
    document.getElementById('arrow_left_img').src = ''
  } else if (currentIndex === monsterList.length - 1) {
    document.getElementById('arrow_right_img').src = ''
  }

  setRulerValue()

  moveToNextPoint()

  const prev = document.querySelector('#arrow_left')
  const next = document.querySelector('#arrow_right')
  const close = document.querySelector('#cancel_logo')

  prev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--
      hideMonsterContent()
      setCameraToPrevZ()
      setTimeout(() => {
        showMonterPopup(currentIndex)
      }, 700)
    }
  })

  next.addEventListener('click', () => {
    if (currentIndex < monsterList.length - 1) {
      currentIndex++
      hideMonsterContent()
      setCameraToPrevZ()
      setTimeout(() => {
        showMonterPopup(currentIndex)
      }, 700)
    }
  })

  close.addEventListener('click', () => {
    hideMonsterContent()
    setCameraToPrevZ()
    closeMonter()
  })
}

export function createMonsters() {
  // 创建坐标1
  const dotGeometry = new THREE.PlaneGeometry(60, 80)
  const textureLoader = new THREE.TextureLoader().load(addressImg)
  const dotM = new THREE.MeshBasicMaterial({ map: textureLoader, transparent: true })
  const wmpArray = []
  monsterList.forEach(item => {
    const wmP = new THREE.Mesh(dotGeometry, dotM)
    wmP.name = item.name
    wmP.position.set(item.positionX, item.positionY, item.positionZ || 1)
    wmP.lookAt(item.positionX, item.positionY, 500)
    wmpArray.push(wmP)
  })
  return wmpArray
}
export function hideMonsterContent() {
  const popup = document.querySelector('#monster_popup')
  popup && popup.parentNode.removeChild(popup)
}

// 点击改变内容
function moveToNextPoint() {
  const { camera } = window.mapContext
  const target = { x: isMobile() ? monsterList[currentIndex].positionX : monsterList[currentIndex].positionX + 10,
    y: isMobile() ? monsterList[currentIndex].positionY - 120 : monsterList[currentIndex].positionY, z: 450 }
  initTween(camera.position, target, 800)
}

