function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
var input = getElementByXpath('/html/body/div[3]/div[2]/div[1]/div/div[1]/div/div/trix-editor');
var btn = getElementByXpath('/html/body/div[3]/div[2]/div[1]/div/div[2]/button[2]');
function send(msg) {
  input.value = msg;
  btn.click();
}
const delay = ms => new Promise(res => setTimeout(res, ms));
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
var gameStart;
var start;
async function evalulate(raw, author){
  if(gameStart == 1 && raw == 'h' && gameAuthor == author){
  var random = getRandom(1, 11);
  var hitted = start+random;
  if(hitted > 21){
    gameStart = 0;
    return 'Busted with '+hitted+'!';
  } else if (hitted == 21) {
    gameStart = 0;
    return 'Perfect 21!';
  } else {
    start = hitted;
    return 'Hit again on '+hitted+'?';
  }
} else if (gameStart == 1 && raw == 's' && gameAuthor == author){
  var random = getRandom(1, 35);
  if(random < 21 && getRandom(0,1) == 1){
    random = random+getRandom(1, 11);
  }
  if(random > 21){
    gameStart = 0;
    return 'Won, dealer busted with '+random+'!';
  } else if(start > random){
    gameStart = 0;
    return 'Won, dealer had '+random+'!';
  } else if (random == start){
    gameStart = 0;
    return 'Tie!';
  } else if (start < random){
    gameStart = 0;
    return 'Lost, dealer had '+random+'!';
  }
} else {
  if(raw == 'ping'){
    return 'Pong on '+new Date;
  } else if (raw == 'e'){
    return 'ikr!';
  } else if(raw[0] == 'y' && raw[1] == ' '){
    var string = '';
    for(s=2;s<raw.length;s++){
      string = string+raw[s];
    }
    return '\[ '+string+' \]';
  } else if (raw == 'bot.destroy') {
    return 'x00000break';
  } else if (raw == 'help'){
    return "Command List: !ping, !y (text), !b";
  } else if (raw[0] == 'b') {
    if (gameStart == 1){
      return 'Game alreardy started';
    } else {
      start = getRandom(1, 20);
      gameStart = 1;
      gameAuthor = author;
      return 'Blackjack game started for '+gameAuthor+'! Starting with '+start+'. Type !h to hit, !s to stand.';
    }
  } else if(raw == 'money') {
    return 'A currency system is in the works';
  } else {
    return 'x00000';
  }
}
}
async function main() {
try {
  var post;
  var count;
  var count2;
  while(true){
    count = count2;
    var post = getElementByXpath('/html/body/div[3]/div[1]/div[2]/div');
    var count = post.childElementCount-2;
    if (count != count2){
      var postcont = post.children[count].children[0].children[0].children[2].children[0].children[0].children[0].textContent;
      var author = post.children[count].children[0].children[0].children[1].children[0].children[1].textContent;
      if(postcont[0] == '!'){
        raw = postcont.replace("!", "");
      var proce = await evalulate(raw, author);
        if (proce == 'x00000'){
          //
        } else if (proce == 'x00000break') {
          if(author == '𝕕𝕖𝕞𝕠𝕟'){
            send('Bot process killed by '+author+': manual shutdown: '+new Date);
            break;
          } else {
            send(author+' doesn\'t have the permissions to do that!')
          }
        } else {
          send(proce);
        }
      }
    }
    console.log('2 secs')
    await delay(2000);
  }

} catch (err) {
  send(err);
  await delay(60000);
  main();
}
}
main();