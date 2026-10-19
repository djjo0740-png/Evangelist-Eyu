/* Asset helper. Images are real files now, so A() just returns the path. */
const ASSETS = {};
const A = p => ASSETS[p] || p;
document.querySelectorAll('img[data-a]').forEach(i => { i.src = A(i.dataset.a); });
var _vu = null;
function _vurl() {
  if (_vu) return _vu;
  _vu = 'media/eyu-message.mp4';
  return _vu;
}
function attachVideo(v) {
  try { v.src = _vurl(); v.load(); } catch (e) {
    v.insertAdjacentHTML('afterend', '<p style="color:#fff;padding:12px">Video could not be loaded.</p>');
  }
}
