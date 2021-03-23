function handleEmoji(raw){
  if(raw.match(/:/g).length === 2){
    raw = raw.replace(":", "");
    raw = raw.replace(":", "");
    if(emojis[raw] != undefined){
      return emojis[raw];
    } else {
      return '';
    }
  }
}