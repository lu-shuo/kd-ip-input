// utils.js
export const flushPromise = () => {
  return new Promise(resolve => setTimeout(() => resolve(), 0));
};

export const setValue = (target, value) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent('input', true, true);
  target.value = value;
  target.dispatchEvent(e);
  return e;
};

export const triggerKey = (target, keycode) => {
  var e = document.createEvent('HTMLEvents');
  e.initEvent('keydown', true, true);
  e.keycode = keycode;
  target.dispatchEvent(e);
  return e;
};