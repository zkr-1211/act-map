import * as THREE from 'three'
import mapImage from '@/assets/image/map.jpg'
export function createMap() {
  // 地图对象
  const wmGeometry = new THREE.PlaneGeometry(5000, 2500)
  const textureLoader2 = new THREE.TextureLoader().load(mapImage)
  const wmMaterial = new THREE.MeshBasicMaterial({ map: textureLoader2, side: THREE.DoubleSide })
  const wmPlane = new THREE.Mesh(wmGeometry, wmMaterial)
  wmPlane.name = 'map'
  wmPlane.lookAt(0, 0, 1500)

  return wmPlane
}
