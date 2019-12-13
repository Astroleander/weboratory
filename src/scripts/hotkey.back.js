document.onkeydown = function(e) {
  if ( e.keyCode === 90 && e.ctrlKey ) {
    console.log('[global] back key down')
    history.back();
  }
}