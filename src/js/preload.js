import createjs from 'preload-js'
import images from './images'

export default function preloadImages() {
  return new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(false)
    queue.loadManifest(images)
    queue.on('complete', () => {
      window.queue = queue
      setTimeout(() => resolve(), 300)
    })
    queue.on('progress', ({ progress }) => {
      document.getElementById('load_title').innerHTML = `已加载 ${(progress * 100).toFixed(2)}% 请稍后...`
      progress === 1 && setTimeout(() => {
        const array = document.body.className.split(' ') || []
        array.push('loaded')
        const classString = array.join(' ')
        document.body.className = classString
      }, 500)
    })
  })
}
