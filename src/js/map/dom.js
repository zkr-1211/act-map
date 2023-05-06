import { isMobile } from '../methods'
const frameHtml = `
  <div class="map-frame__item map-frame__bottom" ondragstart="return false;"><img src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/bg_bottm.png"></div>
  <div class="map-frame__item map-frame__top" ondragstart="return false;"><img src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/bg_top.png"></div>
  <div class="map-frame__item map-frame__left" ondragstart="return false;"><img src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/bg_left.png"></div>
  <div class="map-frame__item map-frame__right" ondragstart="return false;"><img src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/bg_right.png"></div>
`

const rulerHtml = `
  <div class="map__ruler">
    <div id="ruler_location" class="ruler-value" style="top: 11%;">1000km</div>
    <div id="ruler" class="ruler-image-block">
      <img src="https://statics.igg.com/assets/act/res/events/2021/register/map/img/ruler.png">
    </div>
  </div>
`
export function initDom() {
  const { root } = window.mapContext
  root.insertAdjacentHTML('beforeend', frameHtml)
  root.insertAdjacentHTML('beforeend', rulerHtml)
  if (isMobile()) {
    document.querySelector('.map__ruler').style.display = 'none'
  }
  // document.querySelectorAll('.map-frame__item').forEach(el => {
  //   el.addEventListener('dragstart', e => e.preventDefault())
  // })
}
