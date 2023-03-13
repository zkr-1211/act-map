import './src/assets/style/index.scss'
import init from './src/js/map'
import preloadImages from './src/js/preload'

preloadImages().then(() => {
  init()
})
