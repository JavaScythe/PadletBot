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
async function edit(msg, num) {
  getElementByXpath(
    "/html/body/div[3]/div[1]/div[2]/div/div[" + num + "]/div/div[2]/button"
  ).click();
  await delay(500);
  getElementByXpath("/html/body/div[3]/div[3]/div/div/div[2]").click();
  send(msg);
}
async function color(num, colorcode, postH, msg) {
  var postcont =
    postH.children[num - 1].children[0].children[0].children[2].children[0]
      .children[0].children[0].textContent;
  if (postcont == msg) {
    getElementByXpath(
      "/html/body/div[3]/div[1]/div[2]/div/div[" + num + "]/div/div[2]/button"
    ).click();
    await delay(500);
    getElementByXpath("/html/body/div[3]/div[3]/div/div/div[1]/menu").children[
      colorcodeJSON[colorcode]
    ].click();
  } else {
    num = num + 1;
    console.log(num);
    getElementByXpath(
      "/html/body/div[3]/div[1]/div[2]/div/div[" + num + "]/div/div[2]/button"
    ).click();
    await delay(500);
    getElementByXpath("/html/body/div[3]/div[3]/div/div/div[1]/menu").children[
      colorcodeJSON[colorcode]
    ].click();
  }
}
var urlbtn = getElementByXpath(
  "/html/body/div[3]/div[2]/div[1]/div/div[2]/div/div/button[2]"
);
var urlbar;
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
var start;
async function evalulate(raw, author, displayname, postH, num) {
  if (gameStart == 1 && raw == "h" && gameAuthor == author) {
    var random = getRandom(1, 11);
    var hitted = start + random;
    if (hitted > 21) {
      gameStart = 0;
      return "Busted with " + hitted + "!";
    } else if (hitted == 21) {
      gameStart = 0;
      return "Perfect 21!";
    } else {
      start = hitted;
      return "+" + random + "! Hit again on " + hitted + "? (!h or !s)";
    }
  } else if (gameStart == 1 && raw == "s" && gameAuthor == author) {
    var random = getRandom(1, 35);
    if (random < 21 && getRandom(0, 5) != 0) {
      random = random + getRandom(6, 11);
    }
    if (random > 21) {
      gameStart = 0;
      return "Won, dealer busted with " + random + "!";
    } else if (start > random) {
      gameStart = 0;
      return "Won, dealer had " + random + "!";
    } else if (random == start) {
      gameStart = 0;
      return "Tie!";
    } else if (start < random) {
      gameStart = 0;
      return "Lost, dealer had " + random + "!";
    }
  } else {
    if (raw == "ping") {
      return "Pong on " + new Date();
    } else if (raw == "e") {
      return "ikr!";
    } else if (raw[0] == "y" && raw[1] == " ") {
      var string = "";
      for (s = 2; s < raw.length; s++) {
        string = string + raw[s];
      }
      return "[ " + string + " ]";
    } else if (raw == "bot.destroy") {
      return "x00000break";
    } else if (raw == "help") {
      return "Command List: !me, !ping, !y (text), !b, !emoji, :emojiname:, !search (word), !postnum";
    } else if (raw == "b") {
      if (gameStart == 1) {
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
    } else if (raw == "me") {
      return displayname + " (" + author + ")";
    } else if (raw == "postnum" || raw == "count") {
      return "x00000length";
    } else if (raw == "user") {
      return "User: " + author + ", display name: " + displayname;
    } else if (raw == "test") {
      //attach('https://example.com');
      return "Deprecated";
    } else if (raw == "override") {
      if (author == "xX_untraceable_Xx") {
        gameStart = 0;
        return "Game stopped";
      }
    } else if (raw == "emoji") {
      var str = "";
      for (i in emojis) {
        str = str + emojis[i] + "=" + i + "    ";
      }
      return str;
    } else if (
      raw[0] == "s" &&
      raw[1] == "e" &&
      raw[2] == "a" &&
      raw[3] == "r" &&
      raw[4] == "c" &&
      raw[5] == "h" &&
      raw[6] == " "
    ) {
      var string = "";
      for (s = 7; s < raw.length; s++) {
        string = string + raw[s];
      }
      var localurl =
        "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + string;
      var rese = await fetch(localurl);
      json = await rese.json();
      if (json["title"] == "No Definitions Found") {
        return "No Definitions Found";
      }
      def =
        "Type of word: " +
        json[0]["meanings"][0]["partOfSpeech"] +
        ": " +
        json[0]["meanings"][0]["definitions"][0]["definition"] +
        "  Example: " +
        json[0]["meanings"][0]["definitions"][0]["example"];
      return def;
    } else if (raw == "color") {
      send("Orange");
      await delay(700);
      color(num, "orange", postH, "Orange");
      return "x00000";
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
        compare != count2 &&
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
        for (s = 19; s < author.length; s++) {
          string = string + author[s];
        }
        author = string;
        if (postcont[0] == "!") {
          raw = postcont.replace("!", "");
          var proce = await evalulate(
            raw,
            author,
            displayname,
            post,
            count + 1
          );
          if (proce == "x00000") {
            //
          } else if (proce == "x00000break") {
            if (author == "xX_untraceable_Xx") {
              send(
                "Bot process killed by " +
                  displayname +
                  " (" +
                  author +
                  ") : manual shutdown: " +
                  new Date()
              );
              break;
            } else {
              send(
                displayname +
                  " (" +
                  author +
                  ") doesn't have the permissions to do that!"
              );
              setTimeout(function () {
                color(count, "blue", post, proce);
              }, 2000);
            }
          } else if (proce == "x00000length") {
            send(post.children[count].getAttribute("data-index"));
            setTimeout(function () {
              color(count, "blue", post, proce);
            }, 2000);
          } else {
            send(proce);
            setTimeout(function () {
              color(count, "blue", post, proce);
            }, 2000);
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
          if (wors != postcont) {
            edit(wors, count + 1);
          }
        } else if (
          postcont.match(/\//g) != null &&
          postcont.match(/\//g).length > 0
        ) {
          wors = postcont.replace("/shrug", "¯\\_(ツ)_/¯");
          if (wors !== postcont) {
            edit(wors, count + 1);
          }
        }
      }
      await delay(1000);
    }
  } catch (err) {
    console.log(err);
    send(err + " : " + new Date());
    await delay(60000);
    main();
  }
}
main();
