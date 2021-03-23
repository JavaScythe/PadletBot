function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const delay = ms => new Promise(res => setTimeout(res, ms));
var urlbtn = getElementByXpath('/html/body/div[3]/div[2]/div[1]/div/div[2]/div/div/button[2]');
var urlbar
async function attach(url){
  urlbtn.click();
  await delay(500);
  urlbar = getElementByXpath('/html/body/div[3]/div[2]/div[2]/div/div/div/div/input');
  var urlsub = getElementByXpath('/html/body/div[3]/div[2]/div[2]/div/div/div/footer/button[2]');
  var keyboardEvent = document.createEvent('KeyboardEvent');
   delete keyboardEvent.which;
   var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';
   keyboardEvent[initMethod](
     'keyup', // event type : keydown, keyup, keypress
     true, // bubbles
     true, // cancelable
     window, // viewArg: should be window
     false, // ctrlKeyArg
     false, // altKeyArg
     false, // shiftKeyArg
     false, // metaKeyArg
     13, // keyCodeArg : unsigned long the virtual key code, else 0
     13 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
   );
  urlbar.focus();
  urlbar.value = url;
  urlbar.dispatchEvent(keyboardEvent);
}