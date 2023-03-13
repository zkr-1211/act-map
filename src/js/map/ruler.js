export const setRulerValue = function(top = '86%', value = '0km', duration = '700ms') {
  document.getElementById('ruler_location').innerHTML = value
  document.getElementById('ruler_location').style.top = top
  document.getElementById('ruler_location').style.transition = duration
}