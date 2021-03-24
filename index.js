//
function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
const invischar = "‎"; //Yes, there is a character there.
var input = getElementByXpath(
  "/html/body/div[3]/div[2]/div[1]/div/div[1]/div/div/trix-editor"
);
var btn = getElementByXpath(
  "/html/body/div[3]/div[2]/div[1]/div/div[2]/button[2]"
);
function send(msg) {
  input.value = msg;
  btn.click();
  return msg;
}
const colorcodeJSON = {
  orange: 2,
  blue: 4
};
function edit(posthtml, msg) {
  posthtml.children[0].children[1].children[0].children[0].children[0].click();
  send(msg);
}
async function color(posthtml, colorcode, msg, postH) {
  console.log(
    posthtml.children[0].children[0].children[2].children[0].children[0]
      .children[0].textContent
  );
  console.log(msg);
  if (
    posthtml.children[0].children[0].children[2].children[0].children[0]
      .children[0].textContent !== msg
  ) {
    posthtml = postH.children[posthtml.getAttribute("data-index") - 2];
    posthtml.children[0].children[1].children[0].children[2].children[0].click();
  } else {
    posthtml.children[0].children[1].children[0].children[2].children[0].click();
  }
  await delay(500);
  getElementByXpath("/html/body/div[3]/div[3]/div/div/div[1]/menu").children[
    colorcodeJSON[colorcode]
  ].click();
}
var urlbtn = getElementByXpath(
  "/html/body/div[3]/div[2]/div[1]/div/div[2]/div/div/button[2]"
);
var urlbar;
async function attach(url) {
  urlbtn.click();
  await delay(500);
  urlbar = getElementByXpath(
    "/html/body/div[3]/div[2]/div[2]/div/div/div/div/input"
  );
  var urlsub = getElementByXpath(
    "/html/body/div[3]/div[2]/div[2]/div/div/div/footer/button[2]"
  );
  var keyboardEvent = document.createEvent("KeyboardEvent");
  delete keyboardEvent.which;
  var initMethod =
    typeof keyboardEvent.initKeyboardEvent !== "undefined"
      ? "initKeyboardEvent"
      : "initKeyEvent";
  keyboardEvent[initMethod](
    "keyup", // event type : keydown, keyup, keypress
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
const emojis = {
  facepalm: "🤦‍♂️",
  rofl: "🤣",
  sigh: "🙄",
  tired: "😴",
  mask: "😷",
  curse: "🤬",
  ok: "👌",
  small: "🤏",
  foff: "🖕",
  "+1": "👍",
  "-1": "👎",
  hacker: "👨‍💻",
  surprise: "😧",
  bruh: "😑",
  pensive: "🤔",
  swag: "😎",
  angery: "😡",
  sad: "😢",
  mindblown: "🤯",
  money: "🤑",
  "100": "💯",
  page: "📄",
  up: "⏫",
  stonks: "📈",
  notstonks: "📉",
  check: "✔️",
  x: "❌",
  "?": "❓",
  "!?": "⁉️",
  f: "🇫",
  wave: "👋",
  smile: "😃",
  heart: "❤️",
  boom: "💥",
  sus: "⛔",
  tf: "🇹🇫"
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
var gameStart;
var gameAuthor;
var start;
async function evalulate(raw, author, displayname, postH) {
  if (gameStart === 1 && raw === "h" && gameAuthor === author) {
    var random = getRandom(1, 11);
    var hitted = start + random;
    if (hitted > 21) {
      gameStart = 0;
      return "Busted with " + hitted + "!";
    } else if (hitted === 21) {
      gameStart = 0;
      return "Perfect 21!";
    } else {
      start = hitted;
      return "+" + random + "! Hit again on " + hitted + "? (!h or !s)";
    }
  } else if (gameStart === 1 && raw === "s" && gameAuthor === author) {
    var random = getRandom(1, 35);
    if (random < 21 && getRandom(0, 5) !== 0) {
      random = random + getRandom(6, 11);
    }
    if (random > 21) {
      gameStart = 0;
      return "Won, dealer busted with " + random + "!";
    } else if (start > random) {
      gameStart = 0;
      return "Won, dealer had " + random + "!";
    } else if (random === start) {
      gameStart = 0;
      return "Tie!";
    } else if (start < random) {
      gameStart = 0;
      return "Lost, dealer had " + random + "!";
    }
  } else {
    if (raw === "ping") {
      return "Pong on " + new Date();
    } else if (raw === "e") {
      return "ikr!";
    } else if (raw[0] === "y" && raw[1] === " ") {
      var string = "";
      for (let s = 2; s < raw.length; s++) {
        string = string + raw[s];
      }
      return "[ " + string + " ]";
    } else if (raw === "bot.destroy") {
      return "x00000break";
    } else if (raw === "help") {
      return "Command List: !me, !ping, !y (text), !b, !emoji, :emojiname:, !search (text)";
    } else if (raw === "b") {
      if (gameStart === 1) {
        return "Game alreardy started";
      } else {
        start = getRandom(1, 11);
        gameStart = 1;
        gameAuthor = author;
        return (
          "Blackjack game started for " +
          gameAuthor +
          "! Starting with " +
          start +
          ". Type !h to hit, !s to stand."
        );
      }
    } else if (raw === "me") {
      return displayname + " (" + author + ")";
    } else if (raw === "postnum") {
      return "x00000length";
    } else if (raw === "user") {
      return "User: " + author + ", display name: " + displayname;
    } else if (raw === "test") {
      //attach('https://example.com');
      return "Deprecated";
    } else if (raw === "override") {
      if (author === "xX_untraceable_Xx") {
        gameStart = 0;
        return "Game stopped";
      }
    } else if (raw === "emoji") {
      var str = "";
      for (let i in emojis) {
        str = str + emojis[i] + "=" + i + "    ";
      }
      return str;
    } else if (
      raw[0] === "s" &&
      raw[1] === "e" &&
      raw[2] === "a" &&
      raw[3] === "r" &&
      raw[4] === "c" &&
      raw[5] === "h" &&
      raw[6] === " "
    ) {
      var string = "";
      for (let s = 7; s < raw.length; s++) {
        string = string + raw[s];
      }
      var localurl =
        "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + string;
      var rese = await fetch(localurl);
      var json = await rese.json();
      if (json["title"] === "No Definitions Found") {
        return "No Definitions Found";
      }
      var def =
        "Type of word: " +
        json[0]["meanings"][0]["partOfSpeech"] +
        ": " +
        json[0]["meanings"][0]["definitions"][0]["definition"] +
        "  Example: " +
        json[0]["meanings"][0]["definitions"][0]["example"];
      return def;
    } else if (raw === "color") {
      color(postH, "orange", "Orange");
      return "Colored";
    } else {
      return "x00000";
    }
  }
}
async function main() {
  send("Bot process started on " + new Date());
  try {
    var post;
    var count;
    var count2;
    var compare;
    while (true) {
      //null handle
      var post = getElementByXpath("/html/body/div[3]/div[1]/div[2]/div");
      var count = post.childElementCount - 2;
      var compare = post.children[count - 1].getAttribute("data-index");
      if (
        compare !== count2 &&
        post.children[count].children[0].children[0].children[2] != null
      ) {
        var postcont =
          post.children[count].children[0].children[0].children[2].children[0]
            .children[0].children[0].textContent;
        var author = post.children[
          count
        ].children[0].children[0].children[1].children[0].getAttribute("href");
        var displayname =
          post.children[count].children[0].children[0].children[1].children[0]
            .children[1].textContent;
        var string = "";
        for (let s = 19; s < author.length; s++) {
          string = string + author[s];
        }
        author = string;
        if (postcont[0] === "!") {
          var raw = postcont.replace("!", "");
          var proce = await evalulate(
            raw,
            author,
            displayname,
            post.children[count]
          );
          if (proce === "x00000") {
            //
          } else if (proce === "x00000break") {
            if (author === "xX_untraceable_Xx") {
              var botpro = send(
                "Bot process killed by " +
                  displayname +
                  " (" +
                  author +
                  ") : manual shutdown: " +
                  new Date()
              );
              setTimeout(function () {
                color(post.children[count + 1], "blue", botpro, post);
              }, 500);
              break;
            } else {
              var botpro = send(
                displayname +
                  " (" +
                  author +
                  ") doesn't have the permissions to do that!"
              );
              setTimeout(function () {
                color(post.children[count + 1], "blue", botpro, post);
              }, 500);
            }
          } else if (proce === "x00000length") {
            var inde = send(post.children[count].getAttribute("data-index"));
            setTimeout(function () {
              color(post.children[count + 1], "blue", inde, post);
            }, 500);
          } else {
            var res = send(proce);
            setTimeout(function () {
              color(post.children[count + 1], "blue", res, post);
            }, 500);
          }
          count2 = post.children[count].getAttribute("data-index");
        } else if (
          postcont.match(/:/g) != null &&
          postcont.match(/:/g).length >= 2
        ) {
          var wors = postcont;
          var num = postcont.match(/:/g).length / 2;
          for (let u = 0; u <= num; u++) {
            for (let e in emojis) {
              wors = wors.replace(":" + e + ":", emojis[e]);
            }
          }
          if (wors !== postcont) {
            edit(post.children[count], wors);
          }
        }
        var counr = (raw.match(/\//g) || []).length;
        if (counr !== 0) {
          for (let u = 1; u <= counr; u++) {
            raw.replace("/shrug", "kanmoji here");
          }
          if (wors !== postcont) {
            edit(post.children[count], wors);
          }
        }
      }
      await delay(1000);
    }
  } catch (err) {
    send(err + " : " + new Date());
    await delay(60000);
    main();
  }
}
main();
