/**
 * @description: 获取input光标位置
 * @param {*} el input node
 * @return {*} 
 */
function getCursorPosition(el) {
  var cuRange;
  var tbRange;
  var headRange;
  var range;
  var dupRange;
  var ret = {};
  if (el.setSelectionRange) {
    // standard
    ret.begin = el.selectionStart;
    ret.end = el.selectionEnd;
    ret.result = el.value.substring(ret.begin, ret.end);
  } else if (document.selection) {
    // ie
    if (el.tagName.toLowerCase() === 'input') {
      cuRange = document.selection.createRange();
      tbRange = el.createTextRange();
      tbRange.collapse(true);
      tbRange.select();
      headRange = document.selection.createRange();
      headRange.setEndPoint('EndToEnd', cuRange);
      ret.begin = headRange.text.length - cuRange.text.length;
      ret.end = headRange.text.length;
      ret.result = cuRange.text;
      cuRange.select();
    } else if (el.tagName.toLowerCase() === 'textarea') {
      range = document.selection.createRange();
      dupRange = range.duplicate();
      dupRange.moveToElementText(el);
      dupRange.setEndPoint('EndToEnd', range);
      ret.begin = dupRange.text.length - range.text.length;
      ret.end = dupRange.text.length;
      ret.result = range.text;
    }
  }
  el.focus();
  return ret;
}

export { getCursorPosition };