const tmi = require("tmi.js");
const request = require("request")
const c = require("./config.json")
const fs = require("fs");
const path = require("path");

let splitter = c.splitter

let days = ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ["January", "February", "March", "April", "May", "Juli", "Juli", "August", "September", "October", "November", "December"]
let hoursupper = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty-one", "Twenty-two", "Twenty-three"]
let hourslower = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three"]

let normalchars = /[^\s\u0020-\u007e\u00a7\u00b0\u00dc\u00c4\u00df\u0246\u00fc\u00b4\u00b2\u00b3\u20ac\ö\ä\ü]/;
let noncapschars = /[^\u0020-\u0040\u005b-\u007e\u00a7\u00b0\u00dc\u00c4\u00df\u0246\u00fc\u00b4\u00b2\u00b3\u20ac]\S/
let capschars = /[^\u0041-\u005a]/
let emojichars1 = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
let emojichars = rf(`./unicode/emojis.txt`)


/*"abcdefghijklmnopqrstuvwxyz"*/
      // Login data for bot 
let pw = c.token
//let ch = rf("./channels.txt")
let ch = []
function syncchans(){
  ch = []
  let chfile = rf(`./channels.txt`)
  for(i = 0; i < chfile.split(" ").length; i++){
    let cha = chfile.split(" ")[i]
    ch.push(cha)
  }
  return ch
}

let opts = {
  identity: {
    username: "ju_b0t",
    password: pw,
  },
  channels: syncchans(),
}

let opts2 = {
  identity: {
    username: "sudel_bot",
    password: c.sudel_token
  },
  channels: ["jubewe", "ju_b0t", "radiogalaxyallgaeu"]
}

let viewlog = []
function getviewchans(){
  viewlog = []
  let viewlogfile = rf(`./appdata/viewbot/viewchannels.txt`)
  for(i = 0; i < viewlogfile.split(" ").length; i++){
    let vloga = viewlogfile.split(" ")[i]
    viewlog.push(vloga)
  }
  return viewlog
}

let optsview = {
  identity: {
    username: "jubewe",
    password: c.tokenpv
  },
  channels: getviewchans()
}

let chlog = []
function synclogchans(){
  chlog = []
  let chlogfile = rf(`./appdata/logbot/logchannels.txt`)
  for(i = 0; i < chlogfile.split(" ").length; i++){
    let chloga = chlogfile.split(" ")[i]
    chlog.push(chloga)
  }
  return chlog
}
//synclogchans()

let logopts = {
  identity: {
    username: "ju_b0t",
    password: pw,
  },
  channels: synclogchans(),
}

let roomstateclientopts = {
  identity: {
    username: "Ju_B0t",
    password: pw
  },
  channels: []
}

let infoopts = {
  identity: {
    username: "Ju_B0t",
    password: pw
  },
  channels: []
}

let testopts = {
  identity: {
    username: "jubewe12",
    password: c.tokenj12,
  },
  channels: syncchans()
}

let requestopts = {
  method: "GET",
  headers: {
    'Client-ID' : c.client_id,
    'Accept' : 'application/vnd.twitchtv.v5+json',
    'Authorization' : `Bearer ${c.tokena}`,
    // 'Authorization' : `Oauth ${c.token}`,
  }
}

let requestopts2 = {
  method: "GET",
  headers: {
    'Accept' : 'application/vnd.twitchtv.v5+json',
    'Client-ID' : c.client_id,
    'Authorization' : `OAuth ${c.tokena}`,
  }
}

let requestopts3 = {
  method: "GET",
  headers: {
    'Client-ID' : c.client_id,
    'Accept' : 'application/vnd.twitchtv.v5+json',
    'Authorization' : `Bearer ${c.tokena}`,
  }
}

let requestopts4 = {
  method: "POST",
  headers: {
    'Authorization' : `Bearer ${c.tokena}`,
    'Client-ID' : c.client_id,
  }
}

let requestopts5 = {
  method: "PUT",
  headers: {
    'Client-ID' : c.client_id,
    'Accept' : 'application/vnd.twitchtv.v5+json',
    'Authorization' : `OAuth ${c.tokena}`,
  }
}

let requestopts6 = {
  method: "DELETE",
  headers: {
    'Client-ID' : c.client_id,
    'Accept' : 'application/vnd.twitchtv.v5+json',
    'Authorization' : `OAuth ${c.tokena}`,
  }
}

let requestemotes = {
  method: "GET",
  headers: {
    'Accept' : 'application/json',
  }
}

let requestoptspv = {
  method: "GET",
  headers: {
    'Client-ID' : c.client_idpv,
    'Accept' : 'application/vnd.twitchtv.v5+json',
    'Authorization' : `Oauth ${c.tokenpva}`,
    // 'Authorization' : `Oauth ${c.token}`,
  }
}

const logclient = new tmi.client(logopts);
const client = new tmi.client(opts);
const client2 = new tmi.client(opts);
// const clientsu = new tmi.client(opts2);
const viewclient = new tmi.client(optsview);
const infoclient = new tmi.client(infoopts);
const roomstateclient = new tmi.client(roomstateclientopts);
const testclient = new tmi.client(testopts);
// Connect to chat
client.connect();
console.log("-");

process.on('unhandledRejection', error => {});

let noticemsg = 0;
let starttime = Date.now();

// Console # Count
let connum = 0;
function conc(){
  connum = connum+1
};
let filec = 0;

// Time Functions
function pad2(n) { return n < 10 ? '0' + n : n };
let date = new Date()
let datea = ""
function syncdate(){
  date = new Date()
  datea = date.getFullYear().toString() + '-'+ pad2(date.getMonth() + 1) + "-" + 
  pad2(date.getDate()) + " " + pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + 
  ":" + pad2(date.getSeconds())
}
syncdate()
setInterval(function(){syncdate()}, 1000)
//setInterval(function(){console.log(datea)}, 1000)
setTimeout(function(){console.log("Started: " + datea)}, 1500)

let logtime = Date.now() + splitter + datea.replace(" ", "_")
// let dat = Date.now() + "," + datea.replace(" ", "_")
function syncdate2(){
  logtime = Date.now() + splitter + datea.replace(" ", "_")
}
// setTimeout(function(){dat = Date.now()}, 100)

// fs.appendFile('./stuff/console.txt', '\n\n - Log Opened: '+ datea, function (err){if(err) throw err});

function fapp(AppPath, AppData){
  fs.appendFile(AppPath, AppData, function(err){if(err)throw err})
}

function rf(RfPath){
  try {
    return fs.readFileSync(path.resolve(__dirname, RfPath), 'utf8')
  } catch(err){
    console.error(err)
  }
}

function appf(appfPath, appfContent){
  try {
    fs.appendFileSync(appfPath, appfContent)
  } catch(err){
    console.error(err)
  }
}

function wtfs(wtfspath, wtfscontent){
  fs.writeFileSync((wtfspath, wtfscontent), "utf-8")
}

function automes(aAction, aLength, aListnum){
  if(aAction.includes("ban")){
    return `[${aAction} (List #${aListnum})][Automated by Jubot]`
  } else if(aAction === "timeout"){
    return `[Timeout ${aLength} (List #${aListnum})][Automated by Jubot]`
  } else if(aAction === "delete"){
    return `[Delete (List #${aListnum})][Automated by Jubot]`
  }
}

function cmderr(User, Errorid, Cmdusage){
  return `/me ${User} Error '${Errorid}' | Command usage: '${Cmdusage}'`
}

function calctime(time){
  time = time.toString()
  if(time.endsWith("ms")){
    time = time.replace("ms", "")
  } else if(time.endsWith("s")){
    time = time.replace("s", "")
    time = time*1000
  } else if(time.endsWith("m")){
    time = time.replace("m", "")
    time = (time*60)*1000
  } else if(time.endsWith("h")){
    time = time.replace("h", "")
    time = ((time*60)*60)*1000
  } else if(time.endsWith("d")){
    time = time.replace("d", "")
    time = (((time*24)*60)*60)*1000
  }
  return time;
}

function cleantime(time){
  if(time !== undefined){
    time = time/1000
    if(time >= 60){
      time = (time/60).toFixed(1)
      if(time >= 60){
        time = (time/60).toFixed(1)
        if(time >= 24){
          time = (time/24).toFixed(1)
          if(time >= 7){
            time = (time/7).toFixed(1) + "w"
          } else {
            time = time + "d"
          }
        } else {
          time = time + "h"
        }
      } else {
        time = time + "m"
      }
    } else {
      time = time.toFixed(0) + "s"
    }
  }
  return time
}

function replaceall(replaceterm, replacemes){
  let replaced = replacemes
  for(i = 0; i < replacemes.length; i++){
    replaced = replaced.replace(replaceterm, " ")
  }
  return replaced
}

//
let cmdmax = 10
let keymax = 10
let remindtimeout = 0
let remindclients = 0
let remindtouser1 = 0
let remindtouser2 = 0
let cmdonly = 0
let onlyxy = 0
let checkcooldown = 0
let duelcooldown1 = 0
let duelcooldown = 0
let afkuser = ""
let afkfora = 1
let linkperm1 = ""
let linkperm2 = ""
let linkperm3 = ""
let wordonly = ""
let checkforcharsaction = undefined
let prefixstd = (("j!") || ("J!"))
let standartsettings = `prefix j!\nchars 0\nantifilters 0\nlinkfilters 0`
let standartcommands = "\nban 1m /ban ${@1!} ${2-}\nunban 1m /unban ${@1!}\nto/timeout 1m /timeout ${@1!} ${2,1} ${3-}\nuntimeout 1m /untimeout ${@1!}"
  + "\nslow/slowmode 1m /slow ${1}\nslowoff/slowmodeoff 1m /slowoff\nfollowers/followersonly 1m /followers ${1}\nsubs/subscribers/subscribersonly 1m /subscribersonly"
  + "\nsubsoff/subscribersoff/subscribersonlyoff 1m /subscribersoff\nclear/clearchat 1m /clear\nr9k/r9kbeta/unique/uniquechat 1m /r9k\nr9koff/r9kbetaoff/uniqueoff/uniquechatoff 1m /r9koff"

let SEXUAL_WORDS = ["8=", "anal", "anus", "arsch", "bitch", "dildo", /*"kek", */"kock", 
  "nude", "onlyfans", "penis", "piss", "pussy", "sex", "yarak", "yarra", "vagina"];

let GENDER_WORDS = ["schwul", "gay", "homo", "lesbi"];

let RELIGION_WORDS = ["nigg", "nogga", "nigga", "kanack", "🕆︎", "✞︎", "🕈︎", "✠︎"];

let DELETED_WORDS = ["noch müde", "müde aus", "knecht", "kommt alle", "shit", "stirb", "starb", "yallah"];

let CORONA_WORDS = ["Corona", "Impfen", "Astrazeneca", "C o r o n a", "Virus", 
  "Pandemie", "Lockdown"];

let TIMEOUTED_WORDS = ["arschloch", "a-loch", "fotze", "bastard", "huansohn", "hurensohn", 
  "nachricht gelöscht", "Cheer 100"];

let BANNED_WORDS = ["Hitler", "卐", "卍", "Гитлер", "Masturbiert", "Nazi", "fotze"];

let SYMBOLS = ["⠄", "⢰", "⣧", "⣼", "⣯", "⣸", "⣠", "⣶", "⣦", "⣴", "⣾", "⡀", "⣿", "⢸", 
  "⡇", "⠿", "⠶", "⢿", "⢃", "⣤", "⣄", "⢀", "⡅", "⢠", "⡍", "⣛", "⡉", "⣙", "⠸", "⣀", "⡋", 
  "⣡", "⠙", "⣥", "⣇", "⠻", "⡌", "⢻", "⣬", "⠉", "⠋", "⣰", "⣖", "⢇", "⡷", "⠇", "⠘", "⣽", 
  "⡗", "⠈", "⡟", "⣌", "⣻", "⡭", "⠅", "⠒", "⠭", "⣭", "⡻", "⠃", "⠞", "⣝", "⢮", "¸", "ø", 
  "¤", "º", "▁", "▂", "▄", "▅", "▆", "▇", "█", "•", "¯", " ҉", "░", "≋", "◔", "◡", "『", 
  "』", "【", "】", " ̾", " ͓̽", " ͎", " ̳", "▒", "▓", "█", "►", "◄", "═", "─", 
  
  // Zalgo Text
  "𝒶", "𝒷", "𝒸", "𝒹", "𝑒", "𝒻", "𝑔", "𝒽", "𝒾", "𝒿", "𝓀", "𝓁", "𝓂", 
  "𝓃", "𝑜", "𝓅", "𝓆", "𝓇", "𝓈", "𝓉", "𝓊", "𝓋", "𝓌", "𝓍", "𝓎", "𝓏", 
  "𝔄", "𝔅", "ℭ", "𝔇", "𝔈", "𝔉", "𝔊", "ℌ", "ℑ", "𝔍", "𝔎", "𝔏", "𝔐", 
  "𝔑", "𝔒", "𝔓", "𝔔", "ℜ", "𝔖", "𝔗", "𝔘", "𝔙", "𝔚", "𝔛", "𝔜", "ℨ",
  
  "𝖆", "𝖇", "𝖈", "𝖉", "𝖊", "𝖋", "𝖌", "𝖍", "𝖎", "𝖏", "𝖐", "𝖑", "𝖒", "𝖓",
  "𝖔", "𝖕", "𝖖", "𝖗", "𝖘", "𝖙", "𝖚", "𝖛", "𝖜", "𝖝", "𝖞", "𝖟",
  "𝕬", "𝕭", "𝕮", "𝕯", "𝕰", "𝕱", "𝕲", "𝕳", "𝕴", "𝕵", "𝕶", "𝕷", "𝕸", 
  "𝕹", "𝕺", "𝕻", "𝕼", "𝕽", "𝕾", "𝕿", "𝖀", "𝖁", "𝖂", "𝖃", "𝖄", "𝖅",

  "𝓪", "𝓫", "𝓬", "𝓭", "𝓮", "𝓯", "𝓰", "𝓱", "𝓲", "𝓳", "𝓴", "𝓵", "𝓶", "𝓷", 
  "𝓸", "𝓹", "𝓺", "𝓻", "𝓼", "𝓽", "𝓾", "𝓿", "𝔀", "𝔁", "𝔂", "𝔃",
  "𝓐", "𝓑", "𝓒", "𝓓", "𝓔", "𝓕", "𝓖", "𝓗", "𝓘", "𝓙", "𝓚", "𝓛", "𝓜", 
  "𝓝", "𝓞", "𝓟", "𝓠", "𝓡", "𝓢", "𝓣", "𝓤", "𝓥", "𝓦", "𝓧", "𝓨", "𝓩", 
  
  "𝒶", "𝒷", "𝒸", "𝒹", "𝑒", "𝒻", "𝑔", "𝒽", "𝒾", "𝒿", "𝓀", "𝓁", "𝓂", "𝓃", 
  "𝑜", "𝓅", "𝓆", "𝓇", "𝓈", "𝓉", "𝓊", "𝓋", "𝓌", "𝓍", "𝓎", "𝓏",
  "𝒜", "𝐵", "𝒞", "𝒟", "𝐸", "𝐹", "𝒢", "𝐻", "𝐼", "𝒥", "𝒦", "𝐿", "𝑀", "𝒩",
  "𝒪", "𝒫", "𝒬", "𝑅", "𝒮", "𝒯", "𝒰", "𝒱", "𝒲", "𝒳", "𝒴", "𝒵", 

  "𝕒", "𝕓", "𝕔", "𝕕", "𝕖", "𝕗", "𝕘", "𝕙", "𝕚", "𝕛", "𝕜", "𝕝", "𝕞", "𝕟", 
  "𝕠", "𝕡", "𝕢", "𝕣", "𝕤", "𝕥", "𝕦", "𝕧", "𝕨", "𝕩", "𝕪", "𝕫", 
  "𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄", "ℕ",
  "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ", 

  "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｊ", "ｋ",
  "ｌ", "ｍ", "ｎ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ",
  "ｙ", "ｚ", /*
  "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｊ", "Ｋ", "Ｌ", "Ｍ",
  "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", */

  "ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", "ᴋ", "ʟ",
  "ᴍ", "ɴ", "ᴏ", "ᴘ", "ʀ", "ꜱ", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "ʏ", "ᴢ",
  
  "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄻", "🄼", "🄽",
  "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉",
  
  "ɒ̈", "ƹ", "ʏ", "ƚ", "ꙅ", "ɿ", "ᴎ", "ʞ", "ꞁ", "ʜ", "ǫ", "Ꮈ", "ɘ", "ɔ", "ɒ", 
  
  "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", 
  "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉",

  "ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ", "ⓛ", "ⓜ", 
  "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ", 
  "ä⃝", "ö⃝", "ü⃝", "Ä⃝", "Ö⃝", "Ü⃝" ,

  "ค", "๒", "ς", "๔", "є", "Ŧ", "ﻮђ", "เ", "ן", "к", "ɭ", "๓", "ภ", "๏", "ק", "ợ", "г", "ร", 
  "Շ", "ย", "ש", "ฬ", "א", "ץ", "չ",

  "α", "Ⴆ", "ƈ", "ԃ", "ҽ", "ϝ", "ɠ", "ԋ", "ι", "ʝ", "ƙ", "ʅ", "ɱ", "ɳ", "σ", "ρ", "ϙ", "ɾ", 
  "ʂ", "ƚ", "υ", "ʋ", "ყ", "ȥ",

  "Ꮧ", "Ᏸ", "ፈ", "Ꮄ", "Ꮛ", "Ꭶ", "Ꮆ", "Ꮒ", "Ꭵ", "Ꮰ", "Ꮶ", "Ꮭ", "Ꮇ", "Ꮑ", "Ꭷ", "Ꭾ", "Ꭴ", 
  "Ꮢ", "Ꮥ", "Ꮦ", "Ꮼ", "Ꮙ", "Ꮗ", "ጀ", "Ꭹ", "ፚ", 

  "ą", "ც", "ƈ", "ɖ", "ɛ", "ʄ", "ɠ", "ɧ", /*"ı",*/ "ʝ", "ƙ", "Ɩ", "ɱ", "ŋ", "ơ", "℘", "ཞ", 
  "ʂ", "ɬ", "ų", "۷", "ῳ", "ҳ", "ყ", "ʑ", 

  "ค", "๖", "¢", "໓", "ē", "ງ", "ว", "๓", "ຖ", "๑", "Ş", "น", "ง", "ຟ", "ฯ", "ຊ", 

  "𝐚", "𝐛", "𝐜", "𝐝", "𝐞", "𝐟", "𝐠", "𝐡", "𝐢", "𝐣", "𝐤", "𝐥", "𝐦", "𝐧", "𝐨", "𝐩", "𝐪", "𝐫", 
  "𝐬", "𝐭", "𝐮", "𝐯", "𝐰", "𝐱", "𝐲", "𝐳", 
  "𝐀", "𝐁", "𝐂", "𝐃", "𝐄", "𝐅", "𝐆", "𝐇", "𝐈", "𝐉", "𝐊", "𝐋", "𝐌", "𝐍", "𝐎", "𝐏", "𝐐", 
  "𝐑", "𝐒", "𝐓", "𝐔", "𝐕", "𝐖", "𝐗", "𝐘", "𝐙", 

  "𝗮", "𝗯", "𝗰", "𝗱", "𝗲", "𝗳", "𝗴", "𝗵", "𝗶", "𝗷", "𝗸", "𝗹", "𝗺", "𝗻", "𝗼", "𝗽", "𝗾", "𝗿", 
  "𝘀", "𝘁", "𝘂", "𝘃", "𝘄", "𝘅", "𝘆", "𝘇", 
  "𝗔", "𝗕", "𝗖", "𝗗", "𝗘", "𝗙", "𝗚", "𝗛", "𝗜", "𝗝", "𝗞", "𝗟", "𝗠", "𝗡", "𝗢", "𝗣", "𝗤", "𝗥",
  "𝗦", "𝗧", "𝗨", "𝗩", "𝗪", "𝗫", "𝗬", "𝗭",

  "𝘢", "𝘣", "𝘤", "𝘥", "𝘦", "𝘧", "𝘨", "𝘩", "𝘪", "𝘫", "𝘬", "𝘭", "𝘮", "𝘯", "𝘰", "𝘱", "𝘲", "𝘳", 
  "𝘴", "𝘵", "𝘶", "𝘷", "𝘸", "𝘹", "𝘺", "𝘻",
  "𝘈", "𝘉", "𝘊", "𝘋", "𝘌", "𝘍", "𝘎", "𝘏", "𝘐", "𝘑", "𝘒", "𝘓", "𝘔", "𝘕", "𝘖", "𝘗", "𝘘", 
  "𝘙", "𝘚", "𝘛", "𝘜", "𝘝", "𝘞", "𝘟", "𝘠", "𝘡", 

  "𝙖", "𝙗", "𝙘", "𝙙", "𝙚", "𝙛", "𝙜", "𝙝", "𝙞", "𝙟", "𝙠", "𝙡", "𝙢", "𝙣", "𝙤", "𝙥", "𝙦", "𝙧", 
  "𝙨", "𝙩", "𝙪", "𝙫", "𝙬", "𝙭", "𝙮", "𝙯", 
  "𝘼", "𝘽", "𝘾", "𝘿", "𝙀", "𝙁", "𝙂", "𝙃", "𝙄", "𝙅", "𝙆", "𝙇", "𝙈", "𝙉", "𝙊", "𝙋", "𝙌", 
  "𝙍", "𝙎", "𝙏", "𝙐", "𝙑", "𝙒", "𝙓", "𝙔", "𝙕",  
  "𝒂", "𝒃", "𝒄", "𝒅", "𝒆", "𝒇", "𝒈", "𝒉", "𝒊", "𝒋", "𝒌", "𝒍", "𝒎", "𝒏", "𝒐", "𝒑", "𝒒", "𝒓", 
  "𝒔", "𝒕", "𝒖", "𝒗", "𝒘", "𝒙", "𝒚", "𝒛", 
  "𝑨", "𝑩", "𝑪", "𝑫", "𝑬", "𝑭", "𝑮", "𝑯", "𝑰", "𝑱", "𝑲", "𝑳", "𝑴", "𝑵", "𝑶", "𝑷", "𝑸", 
  "𝑹", "𝑺", "𝑻", "𝑼", "𝑽", "𝑾", "𝑿", "𝒀", "𝒁", 

  "𝚊", "𝚋", "𝚌", "𝚍", "𝚏", "𝚐", "𝚑", "𝚒", "𝚓", "𝚔", "𝚕", "𝚖", "𝚗", "𝚘", "𝚙", "𝚚", "𝚛", 
  "𝚜", "𝚝", "𝚞", "𝚟", "𝚠", "𝚡", "𝚢", "𝚣", 
  "𝙰", "𝙱", "𝙲", "𝙳", "𝙴", "𝙵", "𝙶", "𝙷", "𝙸", "𝙹", "𝙺", "𝙻", "𝙼", "𝙽", "𝙾", "𝙿", "𝚀", 
  "𝚁", "𝚂", "𝚃", "𝚄", "𝚅", "𝚆", "𝚇", "𝚈", "𝚉",

  "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", 
  "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ", /*
  "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", 
  "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", */

  "ᗩ", "ᗷ", "ᑕ", "ᗪ", "ᖴ", "ᕼ", "ᒍ", "ᒪ", "ᗰ", "ᑎ", "ᑭ", "ᑫ", "ᖇ", "ᔕ", "ᑌ", "ᐯ", "ᗯ", 
  "᙭", "ᘔ",

  "▌", "│", "█", "║", "▌",
];

let keytochans = [];
let keytokeys = [];
let keytotimes = [];
let keytousers = [];

function uptime(){
  let uptime = Date.now()-starttime
  uptime = cleantime(uptime)
  return uptime
}

let intervalpath = `./temp/intervals.txt`
let intervalfile = rf(intervalpath)
let runintervaltimer = 1000
// let lastintervals = []

function syncintervals(){
  let sinarr = []
  if(intervalfile.split("\n")[1] === undefined){
    runintervaltimer = 10000
  } else {
    for(i = 1; i < intervalfile.split("\n").length; i++){
      sinarr.push(intervalfile.split("\n")[i])
    }
  }
  return sinarr
}

function runintervals(){
  let intervals = syncintervals()
  /*if(lastintervals === intervals){
    return;
  } else {
    lastintervals = intervals
  }*/
  if(intervals.length > 0){
    let inlines = []
    let inchans = []
    let intimes = []
    let inlasts = []
    let inextras = []
    let incontents = []
    let inrunin = []
    for(a = 1; a < intervalfile.split("\n").length; a++){
      let inline = intervalfile.split("\n")[a]
      inlines.push(inline)
      inchans.push(inline.split(splitter)[0])
      intimes.push(inline.split(splitter)[1])
      inlasts.push(inline.split(splitter)[2])
      inextras.push(inline.split(splitter)[3])
      incontents.push(inline.split(splitter)[4])
      inrunin.push((Date.now()-inline.split(splitter)[1]))
    }
    for(b = 0; b < inlines.length; b++){
      if((Date.now()-intimes[b]) >= intimes[b]){
        client.say(inchans[b], incontents[b])
        appf(intervalpath, intervalfile.split("\n")[b+1].replace(inlines[b], inlines[b].replace(inlasts[b], Date.now())))
      }
    }
    // content = replacedefines, getslashcmds
  }
}

async function getuserid(gusidusername){
  return new Promise(function(resolve, reject){
    request(`https://api.twitch.tv/kraken/users?login=${gusidusername}`, requestopts2, function(e, r){
      if(e){
        return reject("0 " + e)
      } else {
        if(r.body.length < 30){
          return reject("1 " + r.body)
        } else if(r.body.startsWith(`{"error"`)){
          return reject("2 " + r.body)
        } else {
          return resolve(r.body.split(`"_id":"`)[1].split(`",`)[0])
        }
      }
    })
  })
}

async function getclip(getclipid){
  return new Promise(function(resolve, reject) {
    try {
      request(`https://api.twitch.tv/helix/clips?id=${getclipid}`, requestopts, function(e, r){
        if(e){
          return reject("0 " + e)
        } 
        if(r.body.length < 30){
          return reject("1 " + r.body)
        } else {
          return resolve(r.body)
        }
      })
    } catch(err){

    }
  })
}

async function getvipsb(vipuser, vipchan){
  return new Promise(function(resolve, reject){
    let vipusera = vipuser
    let vipchana = vipchan
    if(vipuser.startsWith("#")){
      vipchana = vipuser
      vipusera = vipchan
    }
    infoclient.join(vipchana)
    infoclient.vips(vipchana)
    .then((data) => {
      for(i = 0; i < data.join(" ").length; i++){
        let vipus = data.join(" ").split(" ")[i]
        if(vipus === vipuser){
          return resolve(1)
        }
      }
      return resolve(2)
    })
  })
}

async function createclip(createbroadcaster){
  return new Promise(function(resolve, reject){
    request(`https://api.twitch.tv/helix/clips?broadcaster_id=${createbroadcaster}`, requestopts4, function(e, r){
      if(e){
        return reject("0 " + e)
      }
      if(r.body.includes("error")){
        return reject("1 " + r.body)
      } else {
        return resolve(r.body)
      }
    })
  })
}

function pixelize(pinput, piindex, ppixel){
  if(pinput !== undefined){
    let pindex = 3
    let pixler = "󠀀"
    // console.log(ppixel)
    if(piindex !== undefined){
      pindex = piindex
    }
    if(ppixel !== undefined){
      pixler = ppixel
    }
    return `${pinput.substring(0, pindex)}${pixler}${pinput.substring(pindex, pinput.split("").length)}`
  } else {
    return `err-pi1`
  }
}

async function getuserinfo(infouser, infoopts){
  return new Promise(function(resolve, reject){
    getuserid(infouser)
    .then(id => {
      request(`https://api.twitch.tv/kraken/channels/${id}`, requestopts2, function(e, r){
        if(e){
          return reject("1 " + e)
        } else {
          if(r.body.length < 60){
            return reject("2 " + r.body)
          } else {
            let dat = JSON.parse(r.body)
            if(((infoopts === undefined) || (infoopts === "all"))){
              return resolve(dat)
            } else if(infoopts === "mature"){
              return resolve(dat.mature)
            } else if(infoopts === "status"){
              return resolve(dat.status)
            } else if(infoopts === "broadcaster_language"){
              return resolve(dat.broadcaster_language)
            } else if(((infoopts === "broadcaster_software") ||(infoopts === "software"))){
              return resolve(dat.broadcaster_software)
            } else if(((infoopts === "display_name") || (infoopts === "displayname"))){
              return resolve(dat.display_name)
            } else if(infoopts === "game"){
              return resolve(dat.game)
            } else if(infoopts === "language"){
              return resolve(dat.language)
            } else if(infoopts === "id"){
              return resolve(dat._id)
            } else if(infoopts === "name"){
              return resolve(dat.name)
            } else if(((infoopts === "created_at") || (infoopts === "created"))){
              return resolve(dat.created_at)
            } else if(((infoopts === "updated_at") || (infoopts === "created"))){
              return resolve(dat.updated_at)
            } else if(((infoopts === "created_at_") || (infoopts === "created_"))){
              return resolve(dat.created_at.replace("T", " ").replace("Z", "").split(".")[0])
            } else if(((infoopts === "updated_at_") || (infoopts === "updated_"))){
              return resolve(dat.updated_at.replace("T", " ").replace("Z", "").split(".")[0])
            } else if(infoopts === "partner"){
              return resolve(dat.partner)
            } else if(((infoopts === "logo") || (infoopts === "icon"))){
              return resolve(dat.logo)
            } else if(((infoopts === "video_banner") || (infoopts === "videobanner"))){
              return resolve(dat.video_banner)
            } else if(infoopts === "profile_banner"){
              return resolve(dat.profile_banner)
            } else if(infoopts === "profile_banner_background_color"){
              return resolve(dat.profile_banner_background_color)
            } else if(infoopts === "url"){
              return resolve(dat.url)
            } else if(infoopts === "views"){
              return resolve(dat.views)
            } else if(infoopts === "followers"){
              return resolve(dat.followers)
            } else if(infoopts === "broadcaster_type"){
              return resolve(dat.broadcaster_type)
            } else if(((infoopts === "description") || (infoopts === "bio"))){
              return resolve(dat.description)
            } else if(infoopts === "private_video"){
              return resolve(dat.private_video)
            } else if(infoopts === "privacy_options_enabled"){
              return resolve(dat.private_options_enabled)
            }
          }
        }
      })
    })
    .catch(err => {
      return reject("3 " + err)
    })
  })
}

async function getchannelvod(gcvodchan, gcvodopts){
  return new Promise(function(resolve, reject){
    getuserid(gcvodchan)
    .then(id => {
      request(`https://api.twitch.tv/kraken/channels/${id}/videos`, requestopts2, function(e, r){
        if(e){
          return reject("1 " + r.body)
        }
        if(r.toJSON().body.length < 60){
          return resolve("x1")
        } else {
          let dat = JSON.parse(r.body)
          let lastvod = dat.videos[0]
          if(((gcvodopts !== undefined) || (gcvodopts !== "all"))){

          } else if(gcvodopts === "raw"){
            return resolve(dat)
          } else if(gcvodopts === "title"){
            return resolve(dat.title)
          } else if(gcvodopts === "description"){
            return resolve(dat.description)
          } else if(((gcvodopts === "broadcast_id") || (gcvodopts === "id"))){
            return resolve(dat.broadcast_id)
          } else if(((gcvodopts === "type") || (gcvodopts === "broadcast_type"))){
            return resolve(dat.broadcast_type)
          } else if(((gcvodopts === "status") || (gcvodopts === "broadcast_status"))){
            return resolve(dat.status)
          } else if(((gcvodopts === "tags") || (gcvodopts === "tag_list"))){
            return resolve(dat.tag_list)
          } else if(gcvodopts === "views"){
            return resolve(dat.views)
          } else if(((gcvodopts === "url") || (gcvodopts === "link"))){
            return resolve(dat.url)
          } else if(((gcvodopts === "language") || (gcvodopts === "lang"))){
            return resolve(dat.language)
          } else if(((gcvodopts === "created_at") || (gcvodopts === "created"))){
            return resolve(dat.created_at)
          } else if(gcvodopts === "viewable"){
            return resolve(dat.viewable)
          } else if(gcvodopts === "viewable_at"){
            return resolve(dat.viewable_at)
          } else if(((gcvodopts === "published_at") || (gcvodopts === "published"))){
            return resolve(dat.published_at)
          } else if(((gcvodopts === "delete_at") || (gcvodopts === "delete"))){
            return resolve(dat.delete_at)
          } else if(((gcvodopts === "id") || (gcvodopts === "_id"))){
            return resolve(dat._id)
          } else if(gcvodopts === "recorded_at"){
            return resolve(dat.recorded_at)
          } else if(gcvodopts === "game"){
            return resolve(dat.game)
          } else if(gcvodopts === "length"){
            return resolve(dat.length)
          } else if(gcvodopts === "length_"){
            return resolve(cleantime(dat.length*1000))
          } else if(((gcvodopts === "preview.small") || (gcvodopts === "preview.medium") || (gcvodopts === "preview.large") || (gcvodopts === "preview.template"))){
            return resolve(dat[gcvodopts])
          } else if(gcvodopts === "animated_preview_url"){
            return resolve(dat.animated_preview_url)
          } else if(gcvodopts === "channel.display_name"){
            return resolve(dat.channel.display_name)
          } else if(gcvodopts === "channel.name"){
            return resolve(dat.channel.name)
          } else if(gcvodopts === "channel.partner"){
            return resolve(dat.channel.partner)
          } else if(((gcvodopts === "channel.logo") || (gcvodopts === "channel.icon"))){
            return resolve(dat.channel.logo)
          } else if(gcvodopts === "channel.url"){
            return resolve(dat.channel.url)
          } else if(gcvodopts === "channel.views"){
            return resolve(dat.channel.views)
          } else if(gcvodopts === "channel.followers"){
            return resolve(dat.channel.followers)
          } else if(((gcvodopts === "channel.description") || (gcvodopts === "channel.bio"))){
            return resolve(dat.channel.description)
          } else if(gcvodopts === "channel.private_video"){
            return resolve(dat.channel.description)
          } 
        }
      })
    })
    .catch(err => {
      return reject("2 " + err)
    })
  })
}

client.on("connected", onConnectedHandler);
client2.connect()
// clientsu.connect()
logclient.connect()
viewclient.connect()
roomstateclient.connect()
infoclient.connect()
testclient.connect()

client2.on("connected", onConnectedHandler2)
// clientsu.on("connected", onConnectedHandler2)
logclient.on("connected", onConnectedHandler2)
viewclient.on("connected", onConnectedHandler2)
roomstateclient.on("connected", onConnectedHandler2)
infoclient.on("connected", onConnectedHandler2)
testclient.on("connected", onConnectedHandler2)

let admins = []
function syncperms(){
  if(rf("./permissions.txt").split("\n")[1] !== undefined){
    for(i = 0; i < rf("./permissions.txt").split("\n")[1].split(" ").length-1; i++){
      admins.push(rf("./permissions.txt").split("\n")[1].split(" ")[i])
    }
  }
}

syncperms()

try {

  client.on("message", (channel, userstate, message, self) => {
    
    let chan = channel.split("#")[1]
    let chana = channel.split("#")[1].toLowerCase()
    let dat = new Date()
    // Prefix
    //let pref = (("j!") || ("J!"))
    let settingspath = `./channels/${chan}/settings.txt`
    let cmdpath = `./channels/${chan}/commands.txt`

    if(!fs.existsSync(settingspath)){
      if(!fs.existsSync(`./channels/${chan}`)){
        fs.mkdirSync(`./channels/${chan}`, {recursive: true})
      }
      appf(`./channels/${chan}/settings.txt`, standartsettings)
      if(!fs.existsSync(settingspath)){
        appf(settingspath, "")
      }
      if(!fs.existsSync(`./channels/${chan}/x_capsignore.txt`)){
        appf(`./channels/${chan}/x_capsignore.txt`, "")
      }
      // break;
      setTimeout(function(){}, 1000)
    }

    if(!fs.existsSync(cmdpath)){
      if(!fs.existsSync(`./channels/${chan}`)){
        fs.mkdirSync(`./channels/${chan}`, {recursive: true})
      }
      appf(cmdpath, standartcommands)
      return;
    }

    let settingsfile = rf(settingspath)
    let cmdfile = rf(cmdpath)

    let pref = undefined
    if(rf(settingspath).split("\n")[0] === undefined){
      fs.writeFileSync(settingspath, standartsettings, "utf-8", function(err){if(err){throw err}})
      pref = "j!"
    } else {
      pref = rf(settingspath).split("\n")[0].split(" ")[1]
    }

    let checkforchars = undefined
    if(rf(settingspath).split("\n")[1] === undefined){
      fs.writeFileSync(settingspath, standartsettings, "utf-8", function(err){if(err){throw err}})
      checkforchars = 0
    } else {
      checkforchars = rf(settingspath).split("\n")[1].split(" ")[1]
    }

    let antifilters = undefined
    if(rf(settingspath).split("\n")[2] === undefined){
      fs.writeFileSync(settingspath, standartsettings, "utf-8", function(err){if(err){throw err}})
      antifilters = 0
    } else {
      antifilters = rf(settingspath).split("\n")[2].split(" ")[1]
    }

    let linkfilters = undefined
    if(rf(settingspath).split("\n")[3] === undefined){
      fs.writeFileSync(settingspath, standartsettings, "utf-8", function(err){if(err){throw err}})
      linkfilters = 0
    } else {
      linkfilters = rf(settingspath).split("\n")[3].split(" ")[1]
    }

    let capitals = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    let messagelength = message.length
    let numgetcs = 0
    let numgetcsc = 0

    function percentage(partialValue, totalValue){
      return (100 * partialValue) / totalValue;
    }

    function getvips(VipUserstate){
      if(VipUserstate["badges-raw"] === null){
        return 0
      } else {
        if(VipUserstate.badges.vip){
          return 1
        }
      }
    }

    let req = ((userstate.mod) || (userstate.username === "jubewe")|| (userstate.username === channel.split("#")[1]))
    let adminreq = (((userstate.username === "jubewe") || (admins.some(a => a === userstate.username))))
    let ownerreq = (userstate.username === "jubewe")
    let numberssarr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let numbersarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Count for Console
    conc()
    let mess = message.toUpperCase()
    let checkmessage = word => mess.includes(word.toLowerCase()) || mess.includes(word.toUpperCase())

    // Log messages in console
    syncdate()
    console.log(`${datea} #${connum} ${channel} | ${userstate.username}: ${message}`)
    // Write to file
    filec = `#${connum} ${channel} | ${userstate.username}: ${message}`
    if(userstate.username === "ju_b0t"){
      return
    }

    // Antispamfilters - message repeat
    let messagechars = []
    let messagews = message.replace(/[" "]/g, "")
    // console.log(messagews)
    for(i = 0; i < messagews.split("").length; i++){
      messagechars.push(messagews.split("")[i])
    }

    let ignoredcaps = []
    if(!fs.existsSync(`./channels/${chan}/x_capsignore.txt`)){
      if(!fs.existsSync(`./channels/${chan}/`)){
        fs.mkdirSync(`./channels/${chan}/`, {recursive: true})
      }
      appf(`./channels/${chan}/x_capsignore.txt`, "")
    } else {
      ignoredcaps = []
      let capsfile = rf(`./channels/${chan}/x_capsignore.txt`)
      for(i = 0; i < capsfile.split(" ").length; i++){
        let capsword = capsfile.split(" ")[i]
        ignoredcaps.push(capsword) 
      }
      function syncignored(){
        ignoredcaps = []
        let capsfile = rf(`./channels/${chan}/x_capsignore.txt`)
        for(i = 0; i < capsfile.split(" ").length; i++){
          let capsword = capsfile.split(" ")[i]
          ignoredcaps.push(capsword) 
        }
        return ignoredc
      }
      //ignoredcaps = ignoredcaps.push(syncignored())
    }

    // Functions for Delete, Timeout and Ban
    let doDelete = DELETED_WORDS.some(checkmessage)
    let doTimeout = TIMEOUTED_WORDS.some(checkmessage)
    let doBan = BANNED_WORDS.some(checkmessage)
    let doCo = CORONA_WORDS.some(checkmessage)
    let doSpam = SYMBOLS.some(checkmessage)
    let doSex = SEXUAL_WORDS.some(checkmessage)
    let doGender = GENDER_WORDS.some(checkmessage)
    let doRel = RELIGION_WORDS.some(checkmessage)

    // [𝘓𝘪𝘴𝘵 #1234567890]
    if(antifilters === "1"){
    if(doDelete){
      if(!req){
        client.deletemessage(channel, userstate.id);
        return;
      }
      /* */
    };
    if(doTimeout){
      if(!req){
        client.timeout(channel, userstate.username, 1800, automes("timeout", "30m", "2"));
        return;
      }
      /* */
    };
    if(doBan){
      if(!req){
        client.ban(channel, userstate.username, automes("ban", "", "3"));
        return;
      }
      /* */
    };
    if(doCo){
      if(!req){
        // client.timeout(channel, userstate.username, 600, automes("timeout", "10m", "4"));
        // return;
      }
      /* */
    };
    if(doSpam){
      if(!req){
        client.timeout(channel, userstate.username, 1, automes("timeout", "1s", "5"))
        return;
      }
    };
    if(doSex){
      if(!req){
        client.timeout(channel, userstate.username, 300, automes("timeout", "5m", "7"));
        return;
      }
    };
    if(doRel){
      if(!req){
        client.timeout(channel, userstate.username, 300, automes("timeout", "5m", "8"));
        return;
      }
    };
    if(doGender){
      if(!req){
        client.timeout(channel, userstate.username, 1, automes("timeout", "1s", "9"));
        return;
      }
    };
    }

    function synccharcheck(){
    if(fs.existsSync(settingspath)){
      let charfile = rf(settingspath)
      if(charfile.includes("charcheck")){
        let charstate = charfile.split(charfile.indexOf("charcheck"))[1].split(" ")[0]
        let charaction = charfile.split(charfile.indexOf("charcheck"))[1].split(" ")[1]
        if(charstate === 1){
          checkforchars = 1
        }
        if(charaction === "del"){
          checkforchars = "del"
        } 
        if(charaction === "to"){
          checkforchars = "to"
        }
      }
    }
    }

    // Anticaps System
    if(antifilters === "1"){
    if(messagelength >= 10){
      if((req) || (self) || (getvips(userstate) === 1)){

      } else {
        if(ignoredcaps.some(word => message.includes(word))){
        
        } else {
          // console.log("caps")
          for(i = 0; i < messagelength; i++){
            let getcaps = message.split("")[numgetcs]
            if(getcaps === getcaps.toUpperCase()){
              if(capitals.some(word => getcaps.includes(word.toUpperCase()))){
                numgetcsc = numgetcsc+1
              }
            }
            numgetcs = numgetcs+1
            //console.log("Letters checked: " + numgetcs)
          }
          //client.say(channel, "Messagelength: " + numgetcs + " | " + numgetcsc + " Caps")
          // console.log(`Messagelength: ${numgetcs} | Caps: ${numgetcsc}`)
          // 1 = 100% | 2 = 50% | 2,28 = 40%
          let capspercent = messagelength/numgetcsc
          if(capspercent === Infinity){

          } else if(capspercent <= 2){
            try {
              client.deletemessage(channel, userstate.id)
              client.timeout(channel, userstate.username, 1, automes("timeout", "1s", "11"))
            } catch(err){

            }
            // console.log(`#${connum} ca* ${channel} Len: ${numgetcs}, Caps: ${numgetcsc}, capspercent`)
          } else {
          }
          numgetcsc = 0
          numgetcs = 0
        }
      }
    }
    }

    if(checkforchars === "1"){
    if(req){

    } else {
      if(normalchars.test(message) === true){
        // if(message.includes(emojichars)){
          client.deletemessage(channel, userstate.id)
          client.timeout(channel, userstate.username, 1, `Message includes blocked chars [Automated by Jubot]`)
          // client.say(channel, `No emoji`)
        // } else {
          // client.say(channel, "emoji")
        // }
      }
    }
    }

    // Check for commandsonly
    if(cmdonly === 1){
      let commands = []
      if(commands.some(checkmessage)){
      } else {
        if((req) || (self)){
        } else {
          client.timeout(channel, userstate.username, 1, `Commands only chat enabled! [Automated by JuBot]`)
          return;
        }
      }
    }

    if(onlyxy !== 0){
    if((req) || (self)){
    } else {
      if(message === onlyxy){
        return;
      } else {
        client.timeout(channel, userstate.username, 1, `Only "${onlyxy}" chat enabled! [Automated by JuBot]`)
        return;
      }
    }
    }

    //let linklist = fs.readFileSync(path.resolve(__dirname, "./stuff/linklist.txt"), "utf-8")
    let linklist = [("https://"), ("http://"), (".com"), (".de"), (".en"), (".io"), (".lol"), (".me"), 
  (".at"), (".org"), (".net"), (".int"), (".etu"), (".gov"), (".ac"), (".app"), (".bot"), (".tv"), 
  (".gg"), (".co"), (".chat"), (".channel"), (".ceo"), (".club"), (".coop"), (".contact"), (".dating"), 
  (".dev"), (".diy"), (".docs"), (".download"), (".domains"), (".earth"), (".expert"), (".fail"), 
  (".fan"), (".film"), (".final"), (".fit"), (".foo"), (".forum"), (".fun"), (".free"), (".game"), 
  (".gift"), (".google"), (".group"), (".hangout"), (".host"), (".hot"), (".how"), (".inc"), 
  (".info"), (".ink"), (".joy"), (".law"), (".lgbt"), (".like"), (".link"), (".lotto"), (".love"), 
  (".map"), (".media"), (".now"), (".origin"), (".pay"), (".party"), (".pic"), (".porn"), (".prime"), 
  (".prof"), (".hub"), (".pub"), (".radio"), (".racing"), (".read"), (".rest"), (".rip"), (".room"), 
  (".run"), (".sale"), (".search"), (".sex"), (".to"), (".single"), (".site"), (".social"), (".software"), 
  (".song"), (".sucks"), (".support"), (".systems"), (".talk"), (".tax"), (".team"), (".tech"), (".top"), 
  (".trust"), (".vid"), (".vip"), (".vote"), (".watch"), (".website"), (".wiki"), (".work"), (".win"), 
  (".world"), (".wow"), (".wtf"), (".xxx"), (".xyz"), (".zip"), (".eu"), (".bing"), (".cal"), (".dell"), 
  (".dhl"), (".gle"), (".microsoft"), (".ms"), (".netflix"), (".instagram"), (".facebook"), (".ch"), (".be"), 
    ("www."), (".edu")]
    if(linkfilters === "1"){
      if(linklist.some(x => message.includes(x))){
      //console.log("link")  
        if((req) || (message.includes("clips.twitch.tv/") || (message.includes(`twitch.tv/${chan}/clip/`) || (getvips(userstate) === 1)))){
        
        } else {
          //console.log(`${linkperm1} ${linkperm2} ${linkperm3}`)
          let returncheck = checklinkuser(channel, userstate.username.toLowerCase(), linkperm1)
          if(returncheck === 1){
            linkperm1 = `${linkperm1.split(" ")[0]} ${linkperm1.split(" ")[1]} ${linkperm1.split(" ")[2]-1}`
            console.log(linkperm1)
            return;
          } else if(returncheck === 3){
            linkperm1 = ""
            return;
          } else {
            let returncheck2 = checklinkuser(channel, userstate.username.toLowerCase(), linkperm2)
            if(returncheck2 === 1){
              linkperm2 = `${linkperm2.split(" ")[0]} ${linkperm2.split(" ")[1]} ${linkperm2.split(" ")[2]-1}`
              return;
            } else if(returncheck2 === 3){
              linkperm2 = ""
              return;
            } else {
              let returncheck3 = checklinkuser(channel, userstate.username.toLowerCase(), linkperm3)
              if(returncheck3 === 1){
                linkperm3 = `${linkperm3.split(" ")[0]} ${linkperm3.split(" ")[1]} ${linkperm3.split(" ")[2]-1}`
                return;
              } else if(returncheck3 === 3){
                linkperm3 = ""
                return;
              } else {
                client.deletemessage(channel, userstate.id)
                client.timeout(channel, userstate.username, 60, `Posting links without j!permit | ${automes("timeout", "1m", "Li1")}`)
                return;
              }
            }
        }
      
        function checklinkuser(Linkchan, Linkuser, Linlist){
        //console.log(`${Linkchan} ${Linkuser} | ${Linlist}`)
        // 1 = Perm | 2 = Noperm | 3 = Oneperm
          if(Linkchan === Linlist.split(" ")[0]){
          //console.log("channel yes")
            if(Linkuser === Linlist.split(" ")[1]){
            //console.log("user yes")
              if(Linlist.split(" ")[2] !== undefined){
                if(Linlist.split(" ")[2]-1 > 0){
                  //console.log(">1")
                  //Linlist = `${Linlist.split(" ")[0]} ${Linlist.split(" ")[1]} ${Linlist.split(" ")[2]-1}`
                  // console.log(`${Linlist.split(" ")[2]-1}`)
                  return 1
                } else {
                  //console.log("<1")
                  // console.log(`=1`)
                  return 3
                }
              }
            } else {
              return 2
            }
          }
        }
      }
      }
    }

    function nom(){
      client.deletemessage(channel, userstate.id)
      client.timeout(channel, userstate.username, 1, "You dont have permission to use this Command [Automated by Jubot]")
      //client.say(channel, "@"+ userstate.username + " Error: You dont have Permission to do that!");
    }

    if(message.startsWith(`${pref}permit`)){
      if(req){
      let permchan = channel
      if(message.split(" ")[1] === undefined){
        client.say(channel, `/me ${userstate.username} Error li1 | Command Usage: '${pref}permit <user>'`)
      } else {
      let permuser = message.split(" ")[1].toLowerCase()
      let permcount = message.split(" ")[2]
      let linkpermtime = 60000
      if(permcount === undefined){
        permcount = 1
      }
      //let permmessage = client.say(channel, `${permuser} you have permission to post ${permcount} link*s in ${channel} for 1 minute [${permnum}]`)
      function permmessage(permnum){
        client.say(channel, `/me ${permuser} you have permission to post ${permcount} link*s in ${channel} for 1 minute [${permnum}]`)
      }
      if(permcount === undefined){
        permcount = 1
      }
      if(linkperm1 === ""){
        linkperm1 = `${permchan} ${permuser} ${permcount}`
        permmessage("1")
      //  console.log(linkperm1)
        setTimeout(function(){linkperm1 = ""}, linkpermtime)
      } else if(linkperm2 === ""){
        linkperm2 = `${permchan} ${permuser} ${permcount}`
        permmessage("2")
      //  console.log(linkperm2)
        setTimeout(function(){linkperm2 = ""}, linkpermtime)
      } else if(linkperm3 === ""){
        linkperm3 = `${permchan} ${permuser} ${permcount}`
        permmessage("3")
      //  console.log(linkperm3)
        setTimeout(function(){linkperm3 = ""}, linkpermtime)
      } else {
        client.say(channel, `/me ${userstate.username} all 3 permits used, try again in a minute`)
      }
    }
      } else {
        client.deletemessage(channel, userstate.id)
        client.timeout(channel, userstate.username, 60, `Restricted Command | ${automes("timeout", "1m")}`)
      }
    }

    // P - Timer
    // j!timer <time in ms> <message>
    if(message.startsWith(`${pref}timer`)){
      if(message.length > "10") {
        if(message.split(" ")[1] === undefined){
          client.say(channel, cmderr(userstate.username, "ti01", `${pref}timer <time>(ms/s/m/h/d) <message>`))
          return;
        }
        if(message.split(" ")[2] === undefined){
          client.say(channel, cmderr(userstate.username, "ti02", `${pref}timer <time>(ms/s/m/h/d) <message>`))
          return;
        }
        let timertime = message.split(" ")[1]
        if(timertime === calctime(timertime)){
          client.say(channel, cmderr(userstate.usernames, "ti02.2", `${pref}timer <time>(ms/s/m/h/d) <message>`))
        } else {
          timertime = calctime(timertime)
        }
        let timermessage = message.substring(message.split(" ")[0].split("").length + message.split(" ")[1].split("").length +2, message.length)
        console.log("&&", channel, "|", userstate.username, "| (" + timertime + ") :", timermessage)
        // setTimeout(function(){console.log("&!", channel, "|", userstate.username, "| ("+timertime+") :", timermessage1)}, timertime1)
        client.say(channel, `${userstate.username} Timer set (${message.split(" ")[1]})`)
        setTimeout(function(){client.say(channel, userstate.username + " Timer: "+ timermessage)}, timertime)
        return;
      } else {
        //console.log("timertime = null")
        client.say(channel, cmderr(userstate.username, "ti04", `${pref}timer <time>(ms/s/m/h/d) <message>`))
        return;
      }
    }

    if(((message.startsWith(`${pref}mc`)) || (message.startsWith(`${pref}ml`)))){
      if(req){
        let mcuser = userstate.username
        if(message.split(" ")[1] !== undefined){
          mcuser = message.split(" ")[1]
        }
        request(`https://modlookup.3v.fi/api/user-totals/${mcuser}`, requestopts3, function(e, r){
          if(e){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting Modlookup info of ${pixelize(mcuser)}`)
          } else {
            let dat = JSON.parse(r.body)
            client.say(channel, `/me [SYSTEM] ${userstate.username} User ${pixelize(mcuser)} is Moderator on ${dat.total} Channels (Partners: ${dat.partners}, All Follows: ${dat.follows}, Views: ${dat.views})`)
          }
        })
      }
    }

    async function getbttvemotes(gbbtvchan, bttvmode){
      return new Promise(function(resolve, reject){
        getuserid(gbbtvchan)
        .then(id => {
            request(`https://api.betterttv.net/3/cached/users/twitch/${id}`, requestemotes, function(e, r){
              if(e){
                return reject("1 " + r.body)
              } else {
                if(r.body.length > 60){
                let dat = JSON.parse(r.body).sharedEmotes
                // console.log(dat)
                let embttv = []
                if((bttvmode === undefined || bttvmode === 0)){
                  Object.keys(dat).forEach(code => {
                    embttv.push(dat[code].code)
                  })
                } else if(bttvmode === 1){
                  Object.keys(dat).forEach(code => {
                    embttv.push(`${dat[code].id} ${dat[code].code} ${dat[code].imageType} ${dat[code].user.name} ${dat[code]}`)
                  })
                }
                embttv = embttv.sort()
                return resolve(embttv)
              } else {
                return reject("2 get")
              }
            }
          })
        })
        .catch(err => {
          return reject("3 " + err)
        })
      })
    }

    async function getbttvemoteid(gbttvid){
      return new Promise(function(resolve, reject){
        request(`https://api.betterttv.net/3/emotes/${gbttvid}`, requestemotes, function(e, r){
          if(e){
            return reject("1 " + r.body)
          } else {
            if(r.body.length > 60){
              let dat = JSON.parse(r.body)
              // console.log(dat)
              let emotebttv = [dat.code, dat.user.name, dat.imageType, dat.createdAt, dat.global]
              // console.log(emotebttv)
              return resolve(emotebttv)
            } else {
              return reject("2 " + r.body)
            }
          }
        })
      })
    }

    async function getbttvuser(gbttvuser){

    }

    async function getffzemotes(gffzchan, ffzmode){
      return new Promise(function(resolve, reject){
        getuserid(gffzchan)
        .then(id => {
          request(`https://api.frankerfacez.com/v1/room/id/${id}`, requestemotes, function(e, r){
            if(e){
              return reject("1 " + r.body)
            } else {
              if(r.body.length > 60){
                let dat = JSON.parse(r.body)
                dat = dat.sets[Object.keys(dat.sets)[0]].emoticons
                // console.log(dat)
                let emffz = []
                if((ffzmode === undefined) || (ffzmode === 0)){
                  Object.keys(dat).forEach(name => {
                    emffz.push(dat[name].name)
                  })
                } else if(ffzmode === 1){
                  Object.keys(dat).forEach(name => {
                    emffz.push(`${dat[name].id} ${dat[name].name} ${dat[name].owner.name} ${dat[name].usage_count}`)
                  })
                }
                emffz = emffz.sort()
                return resolve(emffz)
              } else {
                return reject("2 get")
              }
            }
          })
        })
        .catch(err => {
          return reject("3 " + err)
        })
      })
    }

    async function getffzemoteid(gffzid){
      return new Promise(function(resolve, reject){
        request(`https://api.frankerfacez.com/v1/emote/${gffzid}`, requestemotes, function(e, r){
          if(e){
            return reject("1 " + r.body)
          }
          if(r.body.length > 30){
            let dat = JSON.parse(r.body)["emote"]
            let emoteffz = [dat.name, dat.owner.name, dat.usage_count, dat.created_at, dat.status, dat.public]
            // console.log(emoteffz)
            return resolve(emoteffz)
          } else {
            return reject("2 " + r.body)
          }
        })
      })
    }

    async function getemotenamechan(gename, gechan){
      return new Promise(function(resolve, reject){
        getbttvemotes(gechan, 1)
        .then(emotes1 => {
          let emote1names = []
          let emote1ids = []
          for(e = 0; e < emotes1.length; e++){
            emote1names.push(emotes1[e].split(" ")[1])
            emote1ids.push(emotes1[e].split(" ")[0])
          }
          if(emote1names.some(name => name === gename)){
            return resolve("BTTV " + emotes1[emote1names.indexOf(gename)])
          } else if(emote1ids.some(id => id === gename)){
            return resolve("BTTV " + emotes1[emote1ids.indexOf(gename)])
          }
        })
        .catch(err => {
          return reject("1_BTTV " + err)
        })

        getffzemotes(gechan, 1)
        .then(emotes2 => {
          let emote2names = []
          let emote2ids = []
          for(e2 = 0; e2 < emotes2.length; e2++){
            emote2names.push(emotes2[e2].split(" ")[1])
            emote2ids.push(emotes2[e2].split(" ")[0])
          }
          if(emote2names.some(name => name === gename)){
            return resolve("FFZ " + emotes2[emote2names.indexOf(gename)])
          } else if(emote2ids.some(id => id === gename)){
            return resolve("FFZ " + emotes2[emote2ids.indexOf(gename)])
          }
        })
        .catch(err => {
          return reject("1_FFZ " + err)
        })

        get7tvemotes(gechan, 1)
        .then(emotes3 => {
          let emote3names = []
          let emote3ids = []
          for(e3 = 0; e3 < emotes3.length; e3++){
            emote3names.push(emotes3[e3].split(" ")[1])
            emote3ids.push(emotes3[e3].split(" ")[0])
          }
          if(emote3names.some(name => name === gename)){
            return resolve("7TV " + emotes3[emote3names.indexOf(gename)])
          } else if(emote3ids.some(id => id === gename)){
            return resolve("7TV " + emotes3[emote3ids.indexOf(gename)])
          }
        })
        .catch(err => {
          return reject("1_7TV " + err)
        })

        
      })
    }

    async function get7tvemotes(user7tv, opts7tv){
      return new Promise(function(resolve, reject){
        request(`https://api.7tv.app/v2/users/${user7tv}/emotes`, requestemotes, function(e, r){
          if(e){
            // console.error(e)
            return reject("1 "+ e)
          } else {
            if(r.body.length < 100){
              // console.log("No Emotes " + r.body)
              return reject("2 " + r.body)
            } else {
              let dat = JSON.parse(r.body)
              // console.log(dat.status)
              if(dat.status === undefined){
                let emotes7tvarr = []
                if(((opts7tv === undefined) || (opts7tv === 0))){
                  Object.keys(dat).forEach(emote7tv => {
                    emotes7tvarr.push(dat[emote7tv].name)
                  })
                  return resolve(emotes7tvarr)
                  // console.log(emotes7tvarr.join(", "))
                } if(opts7tv === 1){
                  Object.keys(dat).forEach(emote7tv => {
                    emotes7tvarr.push(`${dat[emote7tv].id} ${dat[emote7tv].name} ${dat[emote7tv].owner.display_name} ${dat[emote7tv].owner.id} ${dat[emote7tv].visibility} ${dat[emote7tv].status} ${dat[emote7tv].urls[3]}`)
                  })
                  emotes7tvarr = emotes7tvarr.sort()
                  return resolve(emotes7tvarr)
                } else {
                  Object.keys(dat).forEach(emote7tv => {
                    emotes7tvarr.push(dat[emote7tv].opts7tv)
                  })
                  emotes7tvarr = emotes7tvarr.sort()
                  return resolve(emotes7tvarr)
                }
              } else if(dat.status === 404){
                return reject("3 - 404")
              }
            }
          }
        })
      })
    }

    async function get7tvemoteid(g7tvid){
      return new Promise(function(resolve, reject){
        request(`https://api.7tv.app/v2/emotes/${g7tvid}`, requestemotes, function(e, r){
          if(e){
            return reject("1 " + e)
          } else {
            let dat = JSON.parse(r.body)
            if(dat.status === 3){
              let emote7tv = [dat.name, dat.owner.display_name, dat.status, dat.visibility, dat.mime]
              // let emote7tv = dat
              return resolve(emote7tv)
            } else {
              return reject ("2 " + r.body)
            }
          }
        })
      })
    }

    if(message.startsWith(`${pref}emote`)){
      if(message.startsWith(`${pref}emotes`)){
        if(req){
          if(message.split(" ")[1] !== undefined){
            let emoteuser = chan
            let emoteuser2 = pixelize(chan)
            if(message.split(" ")[2] !== undefined){
              emoteuser = message.split(" ")[2]
              emoteuser2 = pixelize(message.split(" ")[2])
            }
            let emoteactiona = message.split(" ")[1].toLowerCase()
            let forceopt = ((message.endsWith("force")) || (message.endsWith("-f")) || (message.endsWith("-") || (message.endsWith("-force"))))
            // 0 = error, 1 = normal msg, 2 = force
            function emotesmsg(option, emotetype, arraybttv, arrayffz, array7tv){
              if(arraybttv === undefined){arraybttv = []}
              if(arrayffz === undefined){arrayffz = []}
              if(array7tv === undefined){arrayffz = []} 
              if(option === 0){
                client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} [${emotetype} | ${emoteuser2}] Error on getting emotes 1`)
              } else if(option === 1){
                let emotesmessage = `/me [SYSTEM-EMOTE] ${userstate.username} [${emotetype} | ${emoteuser2}] `
                if(emotetype.toLowerCase() === "bttv"){
                  emotesmessage = emotesmessage + `[${arraybttv.length}]: ${arraybttv.join(" ")}`
                } else if(emotetype.toLowerCase() === "ffz"){
                  emotesmessage = emotesmessage + `[${arrayffz.length}]: ${arrayffz.join(" ")}`
                } else if(emotetype.toLowerCase() === "7tv"){
                  emotesmessage = emotesmessage + `[${array7tv.length}]: ${array7tv.join(" ")}`
                } else if(emotetype.toLowerCase() === "all"){
                  function sortoutarr(checkarr){
                    if(checkarr.length === 0){
                      return "-"
                    } else {
                      return checkarr.join(" ")
                    }
                  }
                  emotesmessage = emotesmessage + `[BTTV: ${arraybttv.length} | FFZ: ${arrayffz.length} | 7TV: ${array7tv.length}] (${arraybttv.length + arrayffz.length + array7tv.length}): ${sortoutarr(arraybttv)} | ${sortoutarr(arrayffz)} | ${sortoutarr(array7tv)}`
                }
                client.say(channel, emotesmessage)
              } else if(option === 2){
                if(emotetype.split(" ")[1] !== undefined){
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} [${emotetype.split(" ")[0]} | ${emoteuser2}] [${arraybttv.length + arrayffz.length + array7tv.length}] - '${pref}emotes ${emotetype.split(" ")[1]} ${emoteuser2} -force' to send all`)
                } else {
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} [${emotetype} | ${emoteuser2}] [${emotebttv.length}] - '${pref}emotes ${emotetype} ${emoteuser2} -force' to send all`)
                }
              }
            }
            if(emoteactiona === "bttv"){
              getbttvemotes(emoteuser, 0)
              .then(emotes => {
                if(emotes.length > 25){
                  if(forceopt){
                    emotesmsg(1, "BTTV", emotes, [], [])
                  } else {
                    emotesmsg(2, "BTTV bttv", emotes, [], [])
                  }
                } else {
                  emotesmsg(1, "BTTV", emotes, [], [])
                }
              })
              .catch(err => {
                emotesmsg(0, "BTTV")
                console.error(`>> ERROR ${connum} - ${err}`)
              })
            } else if(emoteactiona === "ffz"){
              getffzemotes(emoteuser, 0)
              .then(emotes => {
                if(emotes.length > 25){
                  if(forceopt){
                    emotesmsg(1, "FFZ", [], emotes, [])
                  } else {
                    emotesmsg(2, "FFZ ffz", emotes, [], [])
                  }
                } else {
                  emotesmsg(1, "FFZ", [], emotes, [])
                }
              })
              .catch(err => {
                emotesmsg(0, "FFZ")
                console.error(`>> ERROR ${connum} - ${err}`)
              })
            } else if(emoteactiona === "7tv"){
              get7tvemotes(emoteuser, 0)
              .then(emotes => {
                if(emotes.length > 25){
                  if(forceopt){
                    emotesmsg(1, "7TV", [], [], emotes)
                  } else {
                    emotesmsg(2, "7TV 7tv", emotes, [], [])
                  }
                } else {
                  emotesmsg(1, "7TV", [], [], emotes)
                }
              })
              .catch(err => {
                emotesmsg(0, "7TV")
                console.error(`>> ERROR ${connum} - ${err}`)
              })
            } else if(emoteactiona === "all"){
              getbttvemotes(emoteuser, 0)
              .then(emotes1 => {
                getffzemotes(emoteuser, 0)
                .then(emotes2 => {
                  get7tvemotes(emoteuser, 0)
                  .then(emotes3 => {
                    if(emotes1.length + emotes2.length + emotes3.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", emotes1, emotes2, emotes3)
                      } else {
                        emotesmsg(2, "ALL all", emotes1, emotes2, emotes3)
                      }
                    } else {
                      emotesmsg(1, "ALL", emotes1, emotes2, emotes3)
                    }
                  })
                  .catch(err3 => {
                    // 7TV err
                    if(emotes1.length + emotes2.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", emotes1, emotes2, [])
                      } else {
                        emotesmsg(2, "ALL all", emotes1, emotes2, [])
                      }
                    } else {
                      emotesmsg(1, "ALL", emotes1, emotes2, [])
                    }
                  })
                })
                .catch(err2 => {
                  // FFZ err
                  get7tvemotes(emoteuser, 0)
                  .then(emotes3 => {
                    if(emotes1.length + emotes2.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", emotes1, [], emotes3)
                      } else {
                        emotesmsg(2, "ALL all", emotes1, [], emotes3)
                      }
                    } else {
                      emotesmsg(1, "ALL", emotes1, [], emotes3)
                    }
                  })
                  .catch(err3 => {
                    // 7TV err
                    if(emotes1.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", emotes1, [], [])
                      } else {
                        emotesmsg(2, "ALL <all/bttv>", emotes1, [], [])
                      }
                    } else {
                      emotesmsg(1, "ALL", emotes1, [], [])
                    }
                  })
                })
              })
              .catch(err1 => {
                // BTTV err
                getffzemotes(emoteuser, 0)
                .then(emotes2 => {
                  get7tvemotes(emoteuser, 0)
                  .then(emotes3 => {
                    if(emotes2.length + emotes3.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", [], emotes2, emotes3)
                      } else {
                        emotesmsg(2, "ALL all", [], emotes2, emotes3)
                      }
                    } else {
                      emotesmsg(1, "ALL", [], emotes2, emotes3)
                    }
                  })
                  .catch(err3 => {
                    // 7TV err
                    if(emotes2.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", [], emotes2, [])
                      } else {
                        emotesmsg(2, "ALL <all/ffz>", [], emotes2, [])
                      }
                    } else {
                      emotesmsg(1, "ALL", [], emotes2, [])
                    }
                  })
                })
                .catch(err => {
                  get7tvemotes(emoteuser, 0)
                  .then(emotes3 => {
                    if(emotes3.length > 25){
                      if(forceopt){
                        emotesmsg(1, "ALL", [], [], emotes3)
                      } else {
                        emotesmsg(2, "ALL <all/7tv>", [], [], emotes3)
                      }
                    } else {
                      emotesmsg(1, "ALL", [], [], emotes3)
                    }
                  })
                  .catch(err3 => {
                    // 7TV err
                    client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} [ALL | ${emoteuser2}] [BTTV: 0 | FFZ: 0 | 7TV: 0] - No Emotes found`)
                  })
                  // client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} Error on getting emotes for ${emoteuser2} - No Emotes found`)
                })
                // client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} Error on getting all-BTTV emotes for ${emoteuser2} (${err})`)
              })
            } else {
              client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} Command usage: '${pref}emotes <all/bttv/ffz/7tv> (<channel\chan>) (<-force>)'`)
            }
          } else {
            client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} Command usage: '${pref}emotes <all/bttv/ffz/7tv> (<channel\chan>) (<-force>)'`)
          }
        }
      } else {
        if(message.split(" ")[1] !== undefined){
          let emoteaction = message.split(" ")[1]
          if(emoteaction === "info"){ 
            if(message.split(" ")[2] !== undefined){
              let emotea = message.split(" ")[2]
              let emoteid = ""
              if(emotea.includes("https://www.frankerfacez.com/emoticons/")){
                emoteid = emotea.split("https://www.frankerfacez.com/emoticons/")[1]
                getffzemoteid(emoteid)
                .then(femote => {
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} FFZ Emoteinfo for ${emoteid} Name: ${femote[0]}, Owner: ${pixelize(femote[1])}, Channels: ${femote[2]}, Created: ${femote[3].split(".")[0].replace(/T/g, " ")} | ${femote[1]} | Link: https://cdn.betterttv.net/emote/${femote[0]}/2x`)
                })
                .catch(err => {
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} FFZ Emoteinfo Error for ${emoteid} (${err})`)
                })
              } else if(emotea.includes("https://betterttv.com/emotes/")){
                emoteid = emotea.split("https://betterttv.com/emotes/")[1]
                getbttvemoteid(emoteid, 0)
                .then(bemote => {
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} BTTV Emoteinfo for ${emoteid}: Name: ${bemote[0]}, Creator: ${pixelize(bemote[1])}, Type: ${bemote[2]}, Created: ${bemote[3].split(".")[0].replace(/T/g, " ")} | ${femote[1]} | Link: https://cdn.frankerfacez.com/emote/${femote[0]}/2`)
                })
                .catch(err => {
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} BTTV Emoteinfo Error for ${emoteid} (${err})`)
                })
              } else if(emotea.includes("https://7tv.app/emotes/")){
                emoteid = emotea.split("https://7tv.app/emotes/")[1]
                get7tvemoteid(emoteid)
                .then(emote7 => {
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} 7TV Emoteinfo for ${emoteid}: Name: ${emote7[0]}, Creator: ${pixelize(emote7[1])}, Type: ${emote7[4]} | ${emote7[1]}`)
                })
                .catch(err => {

                })
              } else {
                getemotenamechan(emotea, chan)
                .then(aemote => {
                  let emoteinfo = ""
                  if(aemote.split(" ")[0] === "BTTV"){
                    emoteinfo = `ID: ${aemote.split(" ")[1]}, Name: ${aemote.split(" ")[2]}, Type: ${aemote.split(" ")[3]}, Creator: ${pixelize(aemote.split(" ")[4])} | ${aemote.split(" ")[2]} | https://cdn.betterttv.net/emote/${aemote.split(" ")[1]}/3x`
                  } else if(aemote.split(" ")[0] === "FFZ"){
                    emoteinfo = `ID: ${aemote.split(" ")[1]}, Name: ${aemote.split(" ")[2]}, Creator: ${pixelize(aemote.split(" ")[3])}, Channels: ${aemote.split(" ")[4]} | ${aemote.split(" ")[2]} | https://cdn.frankerfacez.com/emote/${aemote.split(" ")[1]}/2`
                  } else if(aemote.split(" ")[0] === "7TV"){
                    emoteinfo = `ID: ${aemote.split(" ")[1]}, Name: ${aemote.split(" ")[2]}, Creator: ${pixelize(aemote.split(" ")[3])} | ${emotea}`
                  } else {
                    client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} Error on getting Emoteinfo for ${emotea} - Not found [BTTV/FFZ/7TV]`)
                    return;
                  }
                  client.say(channel, `/me [SYSTEM-EMOTE] ${userstate.username} ${aemote.split(" ")[0]} Emoteinfo for ${emotea}: ${emoteinfo}`)
                })
              }
            }
          } 
        }
      }
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    // M - Disconnect
    // j!disconnect
    if(message.startsWith(`${pref}disconnect`)){
      if(req){
        conc()
        client.part(channel)
        client.say(channel, `/me [SYSTEM] ${userstate.username} Left Channel until Restart`)
        console.log("#" + connum + " di* " + channel + " | " + userstate.username)
        return;
      }
    }

    if(message.startsWith(`${pref}reconnect`)){
      if(adminreq){
        client.say(channel, `/me [SYSTEM] ${userstate.username} Reconnecting...`)
        client.disconnect()
        // client.connect()
      }
    }

    if(message.startsWith(`${pref}off`)){
      if(adminreq){
        client.say(channel, `/me ${userstate.username} Disconnected from Chat`)
        client.removeAllListeners("message")
        process.exit()
      }
    }

    // M - Ping
    // j!ping
    if(message.startsWith(`${pref}ping`)){
      if(req){
        client.ping()
        .then((data) => {
          client.say(channel, `${userstate.username} Bot Ping: ${data}s`)
          console.log(`#${connum} Ping: ${data}s`)
          //console.log(dat)
          return;
        })
      }
    }

    // M - State
    // j!state
    if(message.startsWith(`${pref}state`)){
      if(req){
        if(client.readyState() === "OPEN"){
          stateclient = "CONNECTED"
        } else {
          stateclient = readyState()
        }
        client.say(channel, `${userstate.username} State: ${stateclient}`)
        return;
      }
    }

    // M - Commandsonly
    // j!commandsonly || j!cmdonly
    if((message.startsWith(`${pref}commandsonly`) || (message.startsWith(`${pref}cmdonly`)))){
      if(req){
        if((message.startsWith(`${pref}commandsonlyoff`) || (message.startsWith(`${pref}cmdonlyoff`)))){
          cmdonly = 0
          client.say(channel, `/me This Chat is not longer in Commandsonly mode`)
        } else {
          cmdonly = 1
          client.say(channel, `/me This Chat is now in Commandsonly mode`)
        }
        return;
      }
    }

    // <#channel> <countername> <counter>
    function counterreadfile(counterfilepath, counterchannel, countername){
      let counterimport = fs.readFileSync(path.resolve(__dirname, counterfilepath), 'utf8')
      let counterfoundnumber = ""
      let linelength = ""
      let counternum1 = 0
      let counternumber = 0
      let counterfound = ""
      for(i = 0; i < counterimport.split("\n").length; i++){
        let getline = counterimport.split("\n")[counternum1]
        let getcounterchannel = getline.split(" ")[0]
        let getcountername = getline.split(counterchannel + " ")[1].split(" ")[0]
        let getcounternumber = getline.split(counterchannel + " " + getcountername + " ")[1]
      
        if(getcounterchannel === counterchannel){
          // console.log("  Recieved Channel")
          if(getcountername === countername){
            if(getcounternumber != isNaN){
              //console.log("  Recieved Countername")
              counternumber = getcounternumber
              counterfound = 1
              //client.say(channel, `Counter ${getcountername} Found ${getcounternumber}`)
            }
          }
        } else {
          counternum1 = counternum1+1
        }
      }
      if(counternumber != 0){
        counterfound = "1"
        //
        return counterchannel + " " + countername + " " + counternumber;
      } else {
        counterfound = "0"
        //
        return 0;
      }
    /*if(counternumber === ""){
    console.log(`co~1 Error: No Number found`)
    }*/
    }

    // 1 = Done; 0 = Not Done; 2 = First Msg
    function replydate(Dateold, Timeouttime){
      let replydatereply = undefined
      if(Timeouttime = undefined){
        Timeouttime = 10
      } else if(Timeouttime != isNaN){
        Timeouttime = 10
      }
      if(Dateold === undefined){
        // First Msg
        replydatereply = 2
      } else if(Timeouttime.isNaN){
        Dateold = Date.now()
      }
      if(replydatereply === undefined){
      if((Date.now() - Dateold) > (Timeouttime*1000)){
        // Timeout done
        replydatereply = 1
      } else {
        // Timeout not done
        replydatereply = 0
      }}
      return replydatereply
    }

    if(((message.startsWith(`j!prefix`)) || (message.startsWith(`j!pref`)) || (message.startsWith(`${pref}prefix`)) || (message.startsWith(`${pref}pref`)))){
      if(req){
        let messplit = 0
        if(message.split(" ")[3] !== undefined){
          messplit = 1
        }
        let chana = chan
        if(message.split(" ")[3] !== undefined){
          if(adminreq){
            if(message.split(" ")[3].startsWith("-")){
              chana = message.split(" ")[3].split("-")[1]
              messplit = 2
            }
          }
        }

        if(message === `j!prefix`){
          client.say(channel, `/me [SYSTEM] ${userstate.username} Prefix: '${pref}'`)
        }
        if(message.split(" ")[3] === undefined){
          if(message.split(" ")[1] !== undefined){
          let prefaction = message.split(" ")[1]
          if(!fs.existsSync(`./channels/${chana}/settings.txt`)){
            if(!fs.existsSync(`./channels/${chana}`)){
              fs.mkdirSync(`./channels/${chana}`, {recursive: true})
            }
            appf(`./channels/${chana}/settings.txt`, standartsettings)
          }
            if((prefaction === ("reset")) || (prefaction === ("remove")) || (prefaction === ("delete"))){
              pref = (("j!") || ("J!"))
              let preffile = rf(`./channels/${chana}/settings.txt`)
              //appf(`./channels/${chan}/settings.txt`, preffile.split("\n")[0].split(" ")[1].replace(preffile.split("\n")[0].split(" ")[1]), "standart")
              fs.writeFileSync(`./channels/${chana}/settings.txt`, preffile.split("\n")[0].replace(preffile.split("\n")[0], "prefix j!"))
              client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully resetted Prefix to '${prefixstd}'`)
            }
            if(((prefaction === "edit") || (prefaction === "change") || (prefaction === "set"))){
              //console.log("prefix edit")
              if(message.split(" ")[2] !== undefined){
                let newpref = message.split(" ")[2]
                pref = newpref
                let preffile = rf(`./channels/${chana}/settings.txt`)
                //appf(`./channels/${chan}/settings.txt`, preffile.split("\n")[0].split(" ")[1].replace(preffile.split("\n")[0].split(" ")[1], newpref))
                fs.writeFileSync(`./channels/${chana}/settings.txt`, preffile.split("\n")[0].replace(preffile.split("\n")[0], "prefix " + newpref))
                client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully changed Prefix to '${newpref}'`)
              }
            }
          }
        } else {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error pre*1: Invalid Prefix | Command Usage: '${pref}prefix <reset/edit> <(newpref)>'`)
        }
      }
    }

    if(message.startsWith(`${pref}duel`)){
      if(duelcooldown === 1){
        return;
      } else {
        let duela = message.split(" ")[1]
        let duelb = userstate.username
        if(duela === undefined){
          return;
        } else if(duela.toLowerCase() === duelb.toLowerCase()){
          client.say(channel, `/me [SYSTEM] ${duelb} you cant duel yourself`)
          return;
        } else {
          duelcooldown = 1
          client.say(channel, `/me [SYSTEM] ${duelb}, you are challenged to a duel by ${duela}! Type 'j!accept' to accept or 'j!deny' to deny - You have 30s`)
          const duelopts = {
            identity: {
              username: "ju_b0t",
              password: pw,
            },
            channels: [channel]
          }
          const duelclient = new tmi.client(duelopts)
          duelclient.connect()
        
          setTimeout(function(){
            if(duelcooldown1 === 1){
              //client.say(channel, "abc")
            } else {
              client.say(channel, `/me [SYSTEM] ${duelb} didnt reply to the duel of ${duela} [⌛ - 30s]`)
              duelclient.removeAllListeners("message")
            }
            duelcooldown = 0
            duelcooldown1 = 0
          }, 30000)
        
          duelclient.on("message", (channeld, userstated, messaged, selfd) => {
            if(duelb.toLowerCase === userstated.username.toLowerCase){
              if(messaged === `j!accept`){
                duelcooldown1 = 1
                duelclient.say(channeld, `/me [SYSTEM] ${duela} is duelling ${duelb}`)
                setTimeout(function(){duelclient.say(channeld, `/me [SYSTEM] (They have a hard fight) - And its quiet`)}, 5000)
                function getRandomInt(max) {
                  return Math.floor(Math.random() * max);
                }
                let won = getRandomInt(5)
                //console.log(won)
                if((won === 0) || (won === 2) || (won === 4)){
                  won = duela
                } else {
                  won = duelb
                }
                setTimeout(function(){duelclient.say(channeld, `/me [SYSTEM] The smoke clears... and there is standing: >> ${won} << Congrats! [⌛ - 30s]`)}, 10000)
                duelclient.removeAllListeners("message")
                setTimeout(function(){duelcooldown = 0}, 30000)
                //setTimeout(function(){duelcooldown1 = 0}, 31000)
              } else if(messaged === "j!deny"){
                duelcooldown1 = 1
                duelclient.say(channeld, `/me [SYSTEM] ${duela} is scared of ${duelb}, runs away and denyes the duel!`)
                duelclient.removeAllListeners("message")
                setTimeout(function(){duelcooldown = 0}, 30000)
                //setTimeout(function(){duelcooldown1 = 0}, 31000)
              }
            }
          })
        }
      }
    }

    if(message.startsWith(`${pref}only`)){
      if(req){
        if(onlyxy !== 0){
          if(message.startsWith(`${pref}onlyoff`)){
            client.say(channel, `/me [SYSTEM] ${userstate.username} > disabled < ${onlyxy}-onlychat`)
            onlyxy = 0
            return;
          }
        }
        if(onlyxy === 0){
          if(message.startsWith(`${pref}only `)){
            wordonly = message.substr(pref.length + 5, message.length - 5)
          if(wordonly === undefined){
            client.say(channel, cmderr(userstate.username, "xon", `${pref}only <word>`))
          } else {
            onlyxy = wordonly
            client.say(channel, `/me [SYSTEM] ${userstate.username} > enabled < '${wordonly}'onlychat `)
          }
        }
        } else {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error: '${onlyxy}'-onlychat is enabled`)
        }
      }
    }

    if(message.startsWith(`${pref}say`)){
      if(adminreq){
        let saynum = 1
        let saymsg = message
        if(message.split(" ")[1] !== undefined){
          if(message.split(" ")[1].startsWith("#")){
            if(!isNaN(message.split(" ")[message.split(" ").length-1].split("#")[1])){
              saynum = message.split(" ")[message.split(" ").length-1].split("#")[1]
              // saymsg = message.substr(message.split(" ")[0].length + 1).replace(/#/g, "").replace(saynum, "")
              saymsg = message.substring(message.split(" ")[0].length + 1)
            }
            for(i = 0; i < saynum; i++){
              client.say(channel, `${saymsg}`)
            }
            return;
          } else {
            if(message.split(" ")[1] !== undefined){
              client.say(channel, `${message.substring(message.split(" ")[0].length+1, message.length)}`)
              return;
            }
          }
        }
      }
    }

    if(message.startsWith(`${pref}send`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          if(message.split(" ")[2] !== undefined){
            let sendcmd = message.split(" ")[0]
            let sendchan = message.split(" ")[1]
            let sendmes = message.substring(sendcmd.length + sendchan.length + 2, message.length)
            if(sendchan.startsWith("@")){
              sendchan = sendchan.replace("@", "")
              if(!sendchan.startsWith("#")){
                sendchan = "#" + sendchan
              }
            }
            if(sendchan.startsWith("$")){
              sendchan = sendchan.replace("$", "")
              if(sendchan.startsWith("#")){
                sendchan = sendchan.replace("#", "")
              }
              let whisperrej = `Successfully whispered message to ${sendchan}`
              client.whisper(`${sendchan}`, `${sendmes}`)
              .catch((err) => {
                whisperrej = `Error ${err} on sending whisper to ${sendchan}`
              })
              client.say(channel, `/me ${userstate.username} ${whisperrej}`)
            } else {
              if(!sendchan.startsWith("#")){
                sendchan = "#" + sendchan
              }
              client.say(sendchan, sendmes)
              .then(() => {
                client.say(channel, `/me ${userstate.username} Successfully sent message to ${sendchan}`)
              })
            }
          }
        }
      }
    }

    if(((message.startsWith((`${pref}math`)) || (message.startsWith(`${pref}calc`)) || (message.startsWith(`${pref}calculate`)) || (message.startsWith(`${pref}solve`))))){
      if(message.split(" ")[1] !== undefined){
        let excersise = message.substring(message.split(" ")[0].split("").length +1, message.split("").length)
        // console.log(excersise)
        excersise = excersise.replace(/\s/g, "")
        try {
          let excersisesolved = eval(excersise)
          client.say(channel, `/me [SYSTEM] ${userstate.username} "${excersise}" = "${excersisesolved}"`)
        } catch(err){
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Not mathematical`)
        }
      }
    }

    if(message.startsWith(`${pref}uptime`)){
      client.say(channel, `/me [SYSTEM] ${userstate.username} [Jubot] Uptime: ${uptime()}`)
    }

    if(message.startsWith(`${pref}ismod`)){
      let ismoduser = userstate.username
      if(message.split(" ")[1] !== undefined){
        ismoduser = message.split(" ")[1].replace(/@#/g, "")
      }
      let ismodchan = chan
      if(message.split(" ")[2] !== undefined){
        ismodchan = message.split(" ")[2].replace(/@#/g, "")
      }
      infoclient.mods(ismodchan)
      .then((data) => {
        if(data.includes(ismoduser)){
          client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(ismoduser)} is a mod in ${pixelize(ismodchan)} (${data.length})`)
        } else {
          if(ismoduser.replace("#", "") === ismodchan.replace("#", "")){
            client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(ismoduser)} is the Broadcaster in ${pixelize(ismodchan)} (${data.length})`)
          } else {
            client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(ismoduser)} is not a mod in ${pixelize(ismodchan)} (${data.length})`)
          }
        }
      })
      .catch(err => {
        client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting mods of ${pixelize(ismodchan)} - Please check your Writing`)
      })
    }

    if(message.startsWith(`${pref}isvip`)){
      let isvipuser = userstate.username
      if(message.split(" ")[1] !== undefined){
        isvipuser = message.split(" ")[1].replace(/@#/g, "") 
      }
      let isvipchan = chan
      if(message.split(" ")[2] !== undefined){
        isvipchan = message.split(" ")[2].replace(/@#/g, "")
      }
      infoclient.vips(isvipchan)
      .then((data) => {
        if(data.includes(isvipuser)){
          client.say(channel, `/me [SYSTEM] ${userstate.username} - ${pixelize(isvipuser)} is a Vip in ${pixelize(isvipchan)} (${data.length})`)
        } else {
          if(isvipuser.replace("#", "") === isvipchan.replace("#", "")){
            client.say(channel, `/me [SYSTEM] ${userstate.username} - ${pixelize(isvipuser)} is the Broadcaster in ${pixelize(isvipchan)} (${data.length})`)
          } else {
            client.say(channel, `/me [SYSTEM] ${userstate.username} - ${pixelize(isvipuser)} is not a Vip in ${pixelize(isvipchan)} (${data.length})`)
          }
        }
      })
      .catch(err => {
        client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting Vips of ${pixelize(isvipchan)} - Please check your Writing`)
      })
    }

    if(message.startsWith(`${pref}info`)){
      let infouser = chan
      if(message.split(" ")[1] !== undefined){
        infouser = message.split(" ")[1].replace(/@#/g, "")
      }
      request(`https://api.twitch.tv/kraken/users?login=${infouser}`, requestopts2, function(e, r){
        if(e){

        } else {
          if(r.toJSON().body.length < 30){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error: No data returned for ${pixelize(infouser)}`)
          } else {
            let utype = r.toJSON().body.split(`"type":"`)[1].split(`",`)[0]
            let uid = r.toJSON().body.split(`"_id":"`)[1].split(`",`)[0]
            let ubio = "Empty"
            if(r.toJSON().body.split(`"bio":"`)[1] !== undefined){
                ubio = r.toJSON().body.split(`"bio":"`)[1].split(`",`)[0]
            }
            let ucreated = r.toJSON().body.split(`"created_at":"`)[1].split(`",`)[0]
            let uupdated = r.toJSON().body.split(`"updated_at":"`)[1].split(`",`)[0]
            client.say(channel, `/me [SYSTEM] ${userstate.username} Info for ${pixelize(infouser)}: Id: ${uid}, Type: ${utype}, Created: ${ucreated}, Updated: ${uupdated}, Bio: ${ubio}`)
          }
        }
      })
    }

    if(message.startsWith(`${pref}host`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          let hosttarget = message.split(" ")[1].replace(/@#/g, "")
          let hostchannel;
          if(message.split(" ")[2] !== undefined){
            hostchannel = message.split(" ")[2].replace(/@#/g, "")
            client.say(hostchannel,`/host ${hosttarget}`)
            .then (
              client.say(channel, `/me [SYSTEM] ${userstate.username} trying to host ${pixelize(hosttarget)} from ${pixelize(hostchannel)}`)
            )
            .catch(err => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error on hosting ${pixelize(hosttarget)} from ${pixelize(hostchannel)} 1`)
              console.log(`>> ERROR ${connum} - ${err}`)
            })
            client.say(channel, `/me [SYSTEM] ${userstate.username} trying to host ${pixelize(hosttarget)} from ${pixelize(hostchannel)}`)
            return;
          } else {
            hostchannel = channel
            client.say(hostchannel,`/host ${hosttarget}`)
            // client.host(hostchannel, hosttarget)
            .then(
              client.say(channel, `/me [SYSTEM] ${userstate.username} trying to host ${pixelize(hosttarget)} from ${pixelize(chan)}`)
            )
            .catch(err => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error on hosting ${pixelize(hosttarget)} from ${pixelize(chan)} 2`)
              console.log(`>> ERROR ${connum} - ${err}`)
            })
            return;
          }
        }
      }
    }

    if(message.startsWith(`${pref}view`)){
      if(adminreq){
        if(message === `${pref}views`){
          let viewfile = rf(`./appdata/viewbot/viewchannels.txt`)
          let viewarr = []
          for(i = 0; i < viewfile.split(" ").length-1; i++){
            viewarr.push(pixelize(viewfile.split(" ")[i]))
          }
          viewarr.sort()
          client.say(channel, `/me [SYSTEM] ${userstate.username} Currently viewing ${viewarr.length} Channels: ${viewarr.join("; ")}`)
          return;
        }
        if(message.split(" ")[0] !== ((`${pref}viewers`) || (`${pref}viewerlist`))){
          if(message.split(" ")[1] !== undefined){
            let viewchan = message.split(" ")[1].toLowerCase()
            if(viewchan.startsWith("#")){
              viewchan = viewchan.replace(/@#/g, "")
            }
            if(!rf(`./appdata/viewbot/viewchannels.txt`).includes(viewchan + " ")){
              viewclient.join(viewchan)
              appf(`./appdata/viewbot/viewchannels.txt`, viewchan + " ")
              client.say(channel, `/me [SYSTEM] ${userstate.username} now viewing ${pixelize(viewchan)}`)
            } else {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Already viewing ${pixelize(viewchan)}`)
            }
          }
        }
      }
    }

    if(message.startsWith(`${pref}unview`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          let viewchan = message.split(" ")[1].toLowerCase()
          if(viewchan.startsWith("#")){
            viewchan = viewchan.replace(/@#/g, "")
          }
          if(rf(`./appdata/viewbot/viewchannels.txt`).includes(viewchan + " ")){
            viewclient.part(viewchan)
            fs.writeFile(`./appdata/viewbot/viewchannels.txt`, rf(`./appdata/viewbot/viewchannels.txt`).replace(viewchan + " ", ""), function(err){if(err)throw err})
            client.say(channel, `/me [SYSTEM] ${userstate.username} no longer viewing ${pixelize(viewchan)}`)
          } else {
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Not viewing ${pixelize(viewchan)}`)
          }
        }
      }
    }
    
    if(message.startsWith(`${pref}getviews`)){
      let viewsuser = chan
      if(message.split(" ")[1] !== undefined){
        viewsuser = message.split(" ")[1]
      }
      getuserid(viewsuser)
      .then(id => {
        request(`https://api.twitch.tv/kraken/channels/${id}`, requestopts2, function(e, r){
          if(e){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting views of ${pixelize(viewsuser)} 1`)
            console.log(`>> ERROR ${connum} - ${e}`)
          }
          if(r.body.length < 60){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting views of ${pixelize(viewsuser)} 2`)
            console.log(`>> ERROR ${connum} - ${r.body}`)
          } else {
            let dat = JSON.parse(r.body)
            client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(viewsuser)} has ${dat.views} views on their channel`)
          }
        })
      })
      .catch(err => {
        client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting views of ${pixelize(viewsuser)} 3`)
        console.log(`>> ERROR ${connum} - ${err}`)
      })
    }

    if((message.startsWith(`${pref}capsignore`)) || (message.startsWith(`${pref}capsunignore`))){
      if(req){
        if(message.startsWith(`${pref}capsignore`)){
          if(message.split(" ")[1] !== undefined){
            if(message.split(" ")[1] === "list"){
              client.say(channel, `/me [SYSTEM] ${userstate.username} Ignored Caps list: ${ignoredcaps.join(" ")}`)
            } else {
              let ignored = message.substring(message.split(" ")[0].length+1, message.split("").length)
              if(rf(`./channels/${chan}/x_capsignore.txt`).includes(ignored)){
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error: ${ignored} is already in caps list`)
                return;
              } else {
                ignoredcaps.push(ignored)
                fs.writeFile(`./channels/${chan}/x_capsignore.txt`, ignoredcaps.join(" "), function(e){if(e){throw e}})
                client.say(channel, `/me [SYSTEM] ${userstate.username} Added ${ignored} to ignored caps list`)
                return;
              }
            }
          }
        }
        if(message.startsWith(`${pref}capsunignore`)){
          if(message.split(" ")[1] !== undefined){
            let ignored = message.substring(message.split(" ")[0].length+1, message.split("").length)
            if(ignoredcaps.includes(ignored)){
              if(!rf(`./channels/${chan}/x_capsignore.txt`).includes(ignored)){
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error: ${ignored} is not in caps list`)
                return;
              } else {
                ignoredcaps.splice(ignoredcaps.indexOf(ignored))
                fs.writeFile(`./channels/${chan}/x_capsignore.txt`, ignoredcaps.join(" "), function(e){if(e){throw e}})
                client.say(channel, `/me [SYSTEM] ${userstate.username} Removed ${ignored} from ignored caps list`)
                return;
              }
            }
          }
        } 
      }
    }

    if(message.startsWith(`${pref}antifilters`)){
      if(req){
        if(message.split(" ")[1] !== undefined){
          let anfiaction = message.split(" ")[1]
          if(anfiaction === "get"){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Anfi state: ${antifilters}`)
            return;
          } else if(anfiaction === "on"){
            if(antifilters === 1){
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Antifilters are already enabled`)
              return;
            } else {
              try {
                fs.writeFileSync(settingspath, settingsfile.replace(settingsfile.split("\n")[2].split(" ")[1], "1"))
                client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully enabled anfifilters for ${channel}`)
              } catch {

              }
            }
          } else if(anfiaction === "off"){
            if(antifilters === 0){
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Antifilters are already disabled`)
              return;
            } else {
              try {
                fs.writeFileSync(settingspath, settingsfile.replace(settingsfile.split("\n")[2].split(" ")[1], "0"))
                client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully disabled anfifilters for ${channel}`)
              } catch {}
            }
          }
        }
      }
    }

    if((message.startsWith(`${pref}linkfilters`) || (message.startsWith(`${pref}linkfilter`)))){
      if(req){
        if(message.split(" ")[1] !== undefined){
          let linkfilteraction = message.split(" ")[1]
          switch(linkfilteraction){
            case (("on") || ("On")): {
              if(linkfilters === "1"){
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Linkfilters are already enabled`)
                return;
              } else {

                try {
                  fs.writeFileSync(settingspath, settingsfile.replace(settingsfile.split("\n")[3].split(" ")[1], "1"))
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully enabled Linkfilter`)
                  return;
                } catch {
                
                }
              }
            }
            case (("off") || ("Off")): {
              if(linkfilters === "0"){
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Linkfilters are already disabled`)
                return;
              } else {
                try {
                  fs.writeFileSync(settingspath, settingsfile.replace(settingsfile.split("\n")[3].split(" ")[1], "0"))
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully disabled Linkfilters`)
                  return;
                } catch {}
              }
            } 
            default: {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Linkfilters state: ${linkfilters}`)
            }
          }
        } else {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error: No Action given | Usage: '${pref}linkfilters <on/off>'`)
        }
      }
    }

    if(message.startsWith(`${pref}filter1`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          function filterreplace1(filternum, filtermsg){
            let letterstr = []
            let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
              "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 
              "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            if(filternum === 1){
              let letterarra1 = ["𝔄", "𝔅", "ℭ", "𝔇", "𝔈", "𝔉", "𝔊", "ℌ", "ℑ", "𝔍", "𝔎", "𝔏", "𝔐", "𝔑", "𝔒", "𝔓", 
              "𝔔", "ℜ", "𝔖", "𝔗", "𝔘", "𝔙", "𝔚", "𝔛", "𝔜", "ℨ", "𝔞", "𝔟", "𝔠", "𝔡", "𝔢", "𝔣", "𝔤", "𝔥", "𝔦", "𝔧", "𝔨", 
              "𝔩", "𝔪", "𝔫", "𝔬", "𝔭", "𝔮", "𝔯", "𝔰", "𝔱", "𝔲", "𝔳", "𝔴", "𝔵", "𝔶", "𝔷"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarra1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              }
            } else if(filternum === 2){
              let letterarrb1 = ["𝒜", "𝐵", "𝒞", "𝒟", "𝐸", "𝐹", "𝒢", "𝐻", "𝐼", "𝒥", "𝒦", "𝐿", "𝑀", "𝒩", "𝒪", 
              "𝒫", "𝒬", "𝑅", "𝒮", "𝒯", "𝒰", "𝒱", "𝒲", "𝒳", "𝒴", "𝒵", "𝒶", "𝒷", "𝒸", "𝒹", "𝑒", "𝒻", "𝑔", "𝒽", 
              "𝒾", "𝒿", "𝓀", "𝓁", "𝓂", "𝓃", "𝑜", "𝓅", "𝓆", "𝓇", "𝓈", "𝓉", "𝓊", "𝓋", "𝓌", "𝓍", "𝓎", "𝓏"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrb1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              }
            } else if(filternum === 3){
              let letterarrc1 = ["𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄", "ℕ", "𝕆", 
              "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ", "𝕒", "𝕓", "𝕔", "𝕕", "𝕖", "𝕗", "𝕘", "𝕙", 
              "𝕚", "𝕛", "𝕜", "𝕝", "𝕞", "𝕟", "𝕠", "𝕡", "𝕢", "𝕣", "𝕤", "𝕥", "𝕦", "𝕧", "𝕨", "𝕩", "𝕪", "𝕫"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrc1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              }
            } else if(filternum === 4){
              let letterarrd1 = ["ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", "ᴋ", "ʟ", "ᴍ", "ɴ", "ᴏ", "ᴘ", 
              "Q", "ʀ", "ꜱ", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "x", "ʏ", "ᴢ", "ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", 
              "ᴋ", "ʟ", "ᴍ", "ɴ", "ᴏ", "ᴘ", "Q", "ʀ", "ꜱ", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "x", "ʏ", "ᴢ"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrd1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              }
            } else if(filternum === 5){
              let letterarre1 = ["🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄻", "🄼", "🄽", "🄾", 
              "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉", "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", 
              "🄺", "🄻", "🄼", "🄽", "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarre1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              }
            } else if(filternum === 6){
              let letterarrf1 = ["Ą̸̦̯̮̘̮̲̭͌̐̈̎̍͗͗", "B̴̙̏͌̂̈̑̏̕", "C̸̡̨̱̝̯̮̼̪͊̆͊̃͘", "Ḍ̷̈́͛̄̆̃͒̐", "Ĕ̸̠͙́̿̀̍̚͝ ̸̭̼̘͖͉̽͒̌͊ͅ", "F̵̣̜̫̼͈̠̟̔͛͜͝ ̴̛̪͉͔̫̏͗", "G̶̫̮̫̱̯͕͇͘", " ̷͇̖͇̥͔͓͛̐̽͂͛H̵̺͙͉͐̓̅͗ ̴̛͖͈̎͑̀͝", "I̶̛̩̹̍̃͗͊̑ ̶̩̐͝", "J̷̛̭̪͚͔͕͈͈̉̊̅̿̈́͐̊̒", "K̴͖̝̯̬̭̦̦͌̿̄͆́̅̚͜͜ ", "̴̨̣̲̗̲̹̻̰̖̜̈́̽̌̀Ḷ̵̡̹͔͔͓̺̗͖̦̂͌̂͌̐͗̚͠ ", "̵͇̬̭̱̓̓̃̈́͛̇͝͝M̸̢͈͖͔̪̦̈̽͑͂͂͌̐͊̾ ", "̵̨͙̥͈̼͎̯̥͇̇͗Ń̵̡̺̮̙̭͑̅̓̽̊͘", 
              " ̴̢̡̲̬͕̰̣̤̣̘̓̉͑̕͠O̶̺͈̫̼͕̬͊͊̐͗͠", " ̵̡̱̹͙̲̣̠̩͇̓̈́̀̑̀̒̓̚P̴̗̓͗̔̔", " ̶͚̻̮̃̌͑͌̆̈́̊͝ͅQ̵̢̬̩̲̩̪̾̌͋̈́̆ ̴͙̃͆͐", "Ṟ̷̫͎̿͂ ̴̨̬͓̬͕̭̂", "S̵̙̩͓̊͗̃̈́̑̓̅́̓ ̵͎̞͖̲̻͓̇̿", "T̷̨͈͇̺͍͖̒̊ ̴̯͕̀͝ͅ", "U̶̫͋̾̀̅͌͗́̒̔", " ̸̧͕̟̬͖̤͆̆͛͗͗̚͘Ṽ̸͇̭̮̯̮̹̥̙͆̊̀̇̂̓̂͠", " ̵̫͉̪̗̈͜ͅW̴̲͕̊̃͜͝ͅ ", "̸̨̰̣̖͈̗̻̜̳̀̎̎̓̇͌̓͑͝X̶̢̗̰̠͓̦̃̐͂̋͝ͅ ", "̶̳̖̭͆̅́͛́̋̃͂Y̸͕͔̆̏̒͆͜", " ̴̬̗̭͎͇͖͈̱̿͊͐̈́̚Z̶̛͙̙̺̔̒̾͐̔̕", "à̵̮͙̟̲̳̞̟͙̭̊̎̕͜", "b̴̛̌̈͒̍̅͝ͅ", "c̸̹͔̙͔̪̥̔̔̊̿̍͗̎͝", "d̵̳̳͓͍͖̜͋̇̈̈́̋̊͂̎͂͝", 
              "ȩ̷̭̫̝̗̮̝̭̦̗̐̅̏̐̉͂̓͐͝", "f̸̣̋͠", "g̶̛͈̠̦̋̈́͑͗̓͘͠͠", "h̷̖̑̀̔̍͒͑̚͠", "ī̸̡̤̘̼͕̝͂͒̏͑͘", "j̶̧̻̜͕̈́̋̃̃͑͘", "ǩ̴̤̻̠̜̏", "l̴̥͙̬͔̟͓̖̬̗̊̿̋́̍̓̀͝͝͝", "m̸̧̛̜͍̺̫̄̈́͂͊̈́̅̂͠͝", "n̸̨̧͔̤̭͍̠̜̏̑̄͜͜͝", "ő̸̧̜͔͕̱̠̥͐̔͐̌̏̑͊̄ͅ", "p̵̛̮̦̙̝̘̼̱͕͂̈́", "q̴̪͚̩̣̖̞̏͒͊", "r̴̡̢̛̯͕͙̙", "s̶̡̢̟̙̝̻̪̐̄̅̆̀̕͠", "t̶̡̡̧̛͎̭̖̤̀̂̒̂̕͝", "ụ̷̡̻̲̣͍̄͊̇̒̀̓̒͝͝ͅ", "v̸̪͓̟̟̟̰̤̲̝̝̎̓̇", "w̸̧͇͎̔͑̔̚̚",
              "q̵̡̖͇̉̃͝", "y̸̧̢̧̮̳̮͍͙͎̍̑̋̑͘͜", "z̴̛̺̗̆"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrf1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              } 
            } else if(filternum === 7){
              let letterarrg1 = ["🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", 
              "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉", "🅰", "🅱", "🅲", "🅳", "🅴", 
              "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", 
              "🆆", "🆇", "🆈", "🆉"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrg1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              } 
            } else if(filternum === 8){
              let letterarrh1 = ["𝐀", "𝐁", "𝐂", "𝐃", "𝐄", "𝐅", "𝐆", "𝐇", "𝐈", "𝐉", "𝐊", "𝐋", "𝐌", "𝐍", "𝐎", "𝐏", 
              "𝐐", "𝐑", "𝐒", "𝐓", "𝐔", "𝐕", "𝐖", "𝐗", "𝐘", "𝐙", "𝐚", "𝐛", "𝐜", "𝐝", "𝐞", "𝐟", "𝐠", "𝐡", "𝐢", "𝐣", 
              "𝐤", "𝐥", "𝐦", "𝐧", "𝐨", "𝐩", "𝐪", "𝐫", "𝐬", "𝐭", "𝐮", "𝐯", "𝐰", "𝐱", "𝐲", "𝐳"]
                for(i = 0; i < filtermsg.split("").length; i++){
                  let filter1letter = filtermsg.split("")[i]
                  if(letters.some(x => x === filter1letter)){
                    let filter1num = letters.indexOf(filter1letter)
                    letterstr.push(letterarrh1[filter1num])
                  } else {
                    letterstr.push(filter1letter)
                  }
                } 
            } else if(filternum === 9){
              let letterarri1 = ["𝗔", "𝗕", "𝗖", "𝗗", "𝗘", "𝗙", "𝗚", "𝗛", "𝗜", "𝗝", "𝗞", "𝗟", "𝗠", "𝗡", "𝗢", "𝗣", 
              "𝗤", "𝗥", "𝗦", "𝗧", "𝗨", "𝗩", "𝗪", "𝗫", "𝗬", "𝗭", "𝗮", "𝗯", "𝗰", "𝗱", "𝗲", "𝗳", "𝗴", "𝗵", "𝗶", "𝗷", 
              "𝗸", "𝗹", "𝗺", "𝗻", "𝗼", "𝗽", "𝗾", "𝗿", "𝘀", "𝘁", "𝘂", "𝘃", "𝘄", "𝘅", "𝘆", "𝘇"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarri1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              } 
            } else if(filternum === 10){
              let letterarrj1 = ["𝘈", "𝘉", "𝘊", "𝘋", "𝘌", "𝘍", "𝘎", "𝘏", "𝘐", "𝘑", "𝘒", "𝘓", "𝘔", "𝘕", "𝘖", "𝘗", 
              "𝘘", "𝘙", "𝘚", "𝘛", "𝘜", "𝘝", "𝘞", "𝘟", "𝘠", "𝘡", "𝘢", "𝘣", "𝘤", "𝘥", "𝘦", "𝘧", "𝘨", "𝘩", "𝘪", "𝘫", 
              "𝘬", "𝘭", "𝘮", "𝘯", "𝘰", "𝘱", "𝘲", "𝘳", "𝘴", "𝘵", "𝘶", "𝘷", "𝘸", "𝘹", "𝘺", "𝘻"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrj1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              }
            } else if(filternum === 11){
              let letterarrk1 = ["𝘼", "𝘽", "𝘾", "𝘿", "𝙀", "𝙁", "𝙂", "𝙃", "𝙄", "𝙅", "𝙆", "𝙇", "𝙈", "𝙉", "𝙊", "𝙋", 
              "𝙌", "𝙍", "𝙎", "𝙏", "𝙐", "𝙑", "𝙒", "𝙓", "𝙔", "𝙕", "𝙖", "𝙗", "𝙘", "𝙙", "𝙚", "𝙛", "𝙜", "𝙝", "𝙞", "𝙟", 
              "𝙠", "𝙡", "𝙢", "𝙣", "𝙤", "𝙥", "𝙦", "𝙧", "𝙨", "𝙩", "𝙪", "𝙫", "𝙬", "𝙭", "𝙮", "𝙯"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrk1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              } 
            } else if(filternum === 12){
              let letterarrl1 = ["𝙰", "𝙱", "𝙲", "𝙳", "𝙴", "𝙵", "𝙶", "𝙷", "𝙸", "𝙹", "𝙺", "𝙻", "𝙼", "𝙽", "𝙾", "𝙿", 
              "𝚀", "𝚁", "𝚂", "𝚃", "𝚄", "𝚅", "𝚆", "𝚇", "𝚈", "𝚉", "𝚊", "𝚋", "𝚌", "𝚍", "𝚎", "𝚏", "𝚐", "𝚑", "𝚒", "𝚓", 
              "𝚔", "𝚕", "𝚖", "𝚗", "𝚘", "𝚙", "𝚚", "𝚛", "𝚜", "𝚝", "𝚞", "𝚟", "𝚠", "𝚡", "𝚢", "𝚣"]
              for(i = 0; i < filtermsg.split("").length; i++){
                let filter1letter = filtermsg.split("")[i]
                if(letters.some(x => x === filter1letter)){
                  let filter1num = letters.indexOf(filter1letter)
                  letterstr.push(letterarrl1[filter1num])
                } else {
                  letterstr.push(filter1letter)
                }
              } 
            }
            return letterstr.join("")
          }
        let filter1msg = filterreplace1(message)
        client.say(channel, filter1msg)
        }
      }
    }

    if((message.startsWith(`${pref}join`)) || (message.startsWith(`${pref}leave`))){
      if(adminreq){
        function checkchan(checkchannel, path){
          if(rf(path) === undefined){
            return e
          }
          let state = 0
          for(i = 0; i < rf(path).split(" ").length; i++){
            let getchana = rf(path).split(" ")[i]
            if(getchana === checkchannel){
              state = 1
            }
          }
          return state
        }
        if(message.split(" ")[1] !== undefined){
          let chana = message.split(" ")[1].toLowerCase().replace(/@#/g, "")
          if(message.startsWith(`${pref}join`)){
            if(checkchan(chana, `./channels.txt`) === 0){
              client.join(chana)
              appf(`./channels.txt`, chana + " ")
              client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully joined ${pixelize(chana)}`)
            } else {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Already in channel ${pixelize(chana)}`)
            }
          }
          if(message.startsWith(`${pref}leave`)){
            if(checkchan(chana, `./channels.txt`) === 1){
              client.part(chana)
              // fs.writeFileSync(`./channels.txt`, rf(`./channels.txt`).replace(chana + " ", ""))
              let leavefile = rf(`./channels.txt`)
              fs.writeFileSync(`./channels.txt`, leavefile.replace(chana + " ", ""), "utf-8", function(err){if(err){throw err}})
              client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully left ${pixelize(chana)}`)
            } else {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error: not in channel ${pixelize(chana)}`)
            }
          }
        }
      }
    }

    if(message.startsWith(`${pref}rejoin`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          client.part(message.split(" ")[1])
          .then(() => {
            client.join(message.split(" ")[1])
            .then(() => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully re-joined ${pixelize(message.split(" ")[1])}`)
            })
          })
        } else {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error on re-joining - no channel given`)
        }
      }
    }

    if(((message.startsWith(`${pref}getchans`)) || (message.startsWith(`${pref}chans`)))){
      if(adminreq){
        let chans = []
        let chanfile = rf("./channels.txt")
        for(i = 0; i < chanfile.split(" ").length-1; i++){
          chans.push(pixelize(rf("./channels.txt").split(" ")[i].toLowerCase()))
        }
        client.say(channel, `/me ${userstate.username} Currently in ${client.getChannels().length} channels: ${chans.join(", ")}`)
      }
    }

    if(message.startsWith(`${pref}islive`)){
      let isliveuser = chan
      if(message.split(" ")[1] !== undefined){
        isliveuser = message.split(" ")[1].replace(/@#/g, "")
      }
      try {
        request(`https://api.twitch.tv/helix/streams?user_login=${isliveuser}`, requestopts, function(e, r){
          if(e){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting livestatus of ${pixelize(isliveuser)} 1`)
            console.log(`>> ERROR ${connum} - ${e}`)
          } else {
            if(r.toJSON().body.length < 30){
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(isliveuser)} is not live`)
            } else {
              let dat = JSON.parse(r.body)
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(isliveuser)} is live streaming ${dat.data[0].game_name} for ${dat.data[0].viewer_count} Viewers since ${(dat.data[0].started_at).replace("T", " ").replace("Z", "").replace(dat.data[0].started_at.split("T")[1].split(":")[0], pad2(+dat.data[0].started_at.split("T")[1].split(":")[0]+1))}`)
            }
          }
        })
      } catch(err){
        client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting livestatus of ${pixelize(isliveuser)} 2`)
        console.log(`>> ERROR ${connum} - ${err}`)
      }
    }

    if((message.startsWith(`${pref}streaminfo`) || (message.startsWith(`${pref}streamstate`)))){
      if(req){
        let streaminfouser = chan
        if(message.split(" ")[1] !== undefined){
          streaminfouser = message.split(" ")[1].replace(/@#/g, "")
        }
        request(`https://api.twitch.tv/helix/streams?user_login=${streaminfouser}`, requestopts3, function(e, r){
          if(e){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting streaminfo for ${pixelize(streaminfouser)} 1`)
            console.log(`>> ERROR ${connum} - ${e}`)
          } else {
            if((r.toJSON().body.length < 30) || (r.toJSON().body === null) || (r.toJSON().body === undefined)){
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(streaminfouser)} is not live`)
            } else {
              // console.log(r.toJSON().body)
              let dat = JSON.parse(r.body)["data"][0]
              let suid = dat.id
              let sgame = dat.game_name
              let stype = dat.type
              let stitle = dat.title
              let sviewers = dat.viewer_count
              console.log(dat)
              let sstarted = dat.started_at.replace("T", " ").replace("Z", "")
              let slang = dat.language
              client.say(channel, `/me [SYSTEM] ${userstate.username} Streaminfo for ${pixelize(streaminfouser)}: User-ID: ${suid}, Game: ${sgame}, Stream-type: ${stype}, Viewers: ${sviewers}, Language: ${slang}, Started: ${sstarted}, Title: ${stitle}`)
            }
          }
        })
      }
    }

    if(message.startsWith(`${pref}user`)){
      let requestuser = userstate.username
      if(message.split(" ")[1] !== undefined){
        requestuser = message.split(" ")[1].replace(/@#/g, "")
      }
      getuserid(requestuser)
      .then(id => {
        request(`https://api.twitch.tv/kraken/channels/${id}`, requestopts2, function(e, r){
          if(e){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting userinfo for ${pixelize(requestuser)} 1`)
            console.log(`>> ERROR ${connum} - ${e}`)
          }
          if(r.toJSON().body.length < 30){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting userinfo for ${pixelize(requestuser)} 2`)
            console.log(`>> ERROR ${connum} - ${r.body}`)
          } else {
            let dat = JSON.parse(r.body)
            let name = dat.display_name
            let id = dat._id
            let title = dat.status
            let game = dat.game
            let lang = dat.language
            let partner = dat.partner
            let views = dat.views
            let followers = dat.followers
            let description = dat.description
            let created_at = dat.created_at
            created_at = created_at.replace("T", " ").replace("Z", "").split(".")[0]
            let updated_at = dat.updated_at
            updated_at = updated_at.replace("T", " ").replace("Z", "").split(".")[0]
            request(`https://api.twitch.tv/kraken/users/${id}`, requestopts2, function(e, r){
              if(e){
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting userinfo for ${pixelize(requestuser)} 01`)
                console.log(`>> ERROR ${connum} - ${r.body}`)
              } else {
                if(r.body.length < 60){
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting userinfo for ${pixelize(requestuser)} 01`)
                  console.log(`>> ERROR ${connum} - ${r.body}`)
                } else {
                  let dat2 = JSON.parse(r.body)
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Userinfo for ${dat2.type} ${pixelize(name)}: ID: ${id}, Created: ${created_at}, Bio: ${description}, Partner: ${partner}, Language: ${lang}, Views: ${views}, Followers: ${followers} (Updated: ${updated_at})`)
                }
              }
            })
          }
        })
      })
      .catch(err => {
        client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting userinfo for ${pixelize(requestuser)} 3`)
        console.log(`>> ERROR ${connum} - ${err}`)
      })
    }

    if(message.startsWith(`${pref}follows`)){
      if(req){
        let followsuser = chan
        if(message.split(" ")[1] !== undefined){
          followsuser = message.split(" ")[1].replace(/@#/g, "")
        }
        getuserid(followsuser)
        .then(id => {
          request(`https://api.twitch.tv/kraken/channels/${id}/follows`, requestopts2, function(e, r){
            if(e){
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting follows of ${pixelize(followsuser)} 1`)
              console.log(`>> ERROR ${connum} - ${e}`)
            } else {
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(followsuser)} has ${JSON.parse(r.body)._total} followers`)
            }
          })
        })
        .catch(err => {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting follows of ${pixelize(followsuser)} 2`)
          console.log(`>> ERROR ${connum} - ${err}`)
        })
      }
    } 

    if(message.startsWith(`${pref}viewers`)){
      if(req){
        let viewerschan = chan
        if(message.split(" ")[1] !== undefined){
          viewerschan = message.split(" ")[1].replace(/@#/g, "")
        }
        request(`https://tmi.twitch.tv/group/user/${viewerschan}/chatters`, requestemotes, function(e, r){
          if(e){
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting viewers for ${pixelize(viewerschan)} 1`)
            console.log(`>> ERROR ${connum} - ${e}`)
          } else {
            let dat = JSON.parse(r.body)
            let viewers = []
            
            viewers.push("Broadcaster:")
            Object.keys(dat.chatters.broadcaster).forEach(user => {
              viewers.push(pixelize(dat.chatters.broadcaster[user]))
            })
            viewers.push("Admins:")
            Object.keys(dat.chatters.admins).forEach(user => {
              viewers.push(pixelize(dat.chatters.admins[user]))
            })
            viewers.push("Staff:")
            Object.keys(dat.chatters.staff).forEach(user => {
              viewers.push(pixelize(dat.chatters.staff[user]))
            })
            viewers.push("Global Mods:")
            Object.keys(dat.chatters.global_mods).forEach(user => {
              viewers.push(pixelize(dat.chatters.global_mods[user]))
            })
            viewers.push("Moderators:")
            if(dat.chatters.moderators !== undefined){
              Object.keys(dat.chatters.moderators).forEach(user => {
              viewers.push(pixelize(dat.chatters.moderators[user]))
              })
            }
            viewers.push("Vips:")
            Object.keys(dat.chatters.vips).forEach(user => {
              viewers.push(pixelize(dat.chatters.vips[user]))
            })
            viewers.push("Viewers:")
            Object.keys(dat.chatters.viewers).forEach(user => {
              viewers.push(pixelize(dat.chatters.viewers[user]))
            })
            if(viewers.length > 30){
              client.say(channel, `/me [SYSTEM] ${userstate.username} Users in ${pixelize(viewerschan)} (${dat.chatter_count})`)
            } else {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Users in chat: ${dat.chatter_count} | List: ${viewers.join(" ")}`)
              
            }
          }
        })
      }
    }

    // M - Nuke
    // j!nuke/purge <time> <nuke>
    if(message.startsWith(((`${pref}nuke`) || (message.startsWith(`${pref}purge`))))){
      if(req){
        if(!fs.existsSync(`./channels/${chan}/log.txt`)){
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error: Channel ${chan} is not being logged - Contact Jubewe for Log`)
          return;
        }
        if(message.split(" ")[1] !== undefined){
          if(message.split(" ")[2] !== undefined){
            let time = message.split(" ")[1]
            time = calctime(time)
            let nuke = message.substring(message.split(" ")[0].length+message.split(" ")[1].length+2, message.split("").length)
            if(time !== isNaN){
              console.log(nuke)
              let nukefile = rf(`./channels/${chan}/log.txt`)
              let nuked = 0
              let nukedusers = []
              // nukedusers.push(client.mods(channel))
              for(i = nukefile.split("\n").length-1; i > 1; i--){
                let nukeline = nukefile.split("\n")[i-1]
                let nuketime = nukeline.split(splitter)[0]
                let nukeuser = nukeline.split(splitter)[3]
                let nukemess = nukeline.split(splitter)[5]
                let nukebadges = nukeline.split(splitter)[2]
                let badgesarr = []
                for(a = 0; a < nukebadges.split(",").length; a++){
                  badgesarr.push(nukebadges.split(",")[a])
                }
                if((Date.now()-time) < nuketime){
                  // console.log(nuketime + " " + nukeuser + " " + nukemess)
                  if(nukemess.includes(nuke)){
                    if((badgesarr.includes("~") || badgesarr.includes("@") || badgesarr.includes("&"))){

                    } else {
                      nuked = nuked+1
                      client.timeout(channel, nukeuser, 1, `Nuke #${nuked} [Automated by JuBot]`)
                      nukedusers.push(nukeuser)
                    }

                  }
                } else {
                  i = 0
                }
              }
              // console.log(nukedusers)
              client.say(channel, `/me [SYSTEM] ${userstate.username} Nuked ${nuked} users`)
            }
          }
        }
      }
    }

    // J - Syncban
    // j!sb <get/add/del/ban/unban/timeout> <channel/user> <length/reason>
    if(((message.startsWith(`${pref}sb`)) || (message.startsWith(`${pref}syncban`)))){
      if(userstate.username === "jubewe"){
      if(message.split(" ")[1] !== undefined){
        let sbaction = message.split(" ")[1]
        let sbfile = rf(`./appdata/syncban/syncbanchannels.txt`)
        if(sbaction === "ban"){
          if(message.split(" ")[2] !== undefined){
            let sbuser = message.split(" ")[2]
            for(i = 0; i < sbfile.split(" ").length; i++){
              if(message.split(" ")[3] !== undefined){
                let sbreas = message.substring(message.split(" ")[0].length+sbaction.length+sbuser.length+3)
                let sbchan = sbfile.split(" ")[i]
                client.ban(sbchan, sbuser, sbreas)
              }
            }
            client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully banned ${pixelize(sbuser)} in ${sbfile.split(" ").length-1} channels`)
          }
        }
        if(((sbaction === ("timeout")) || (sbaction === ("to")))){
          if(message.split(" ")[2] !== undefined){
            let sbuser = message.split(" ")[2]
            if(message.split(" ")[3] !== undefined){
              let sbleng = message.split(" ")[3]
              let sblenga = message.split(" ")[3]
              sbleng = calctime(sbleng)
              if(isNaN(sbleng)){
                sbleng = calctime("10m")
              }
              if(sbleng !== isNaN){
                let sbreas = ""
                if(message.split(" ")[4] !== undefined){
                  sbreas = message.substring(message.split(" ")[0].length+sbaction.length+sbuser.length+sbleng.length+4, message.split("").length)
                }
                for(i = 0; i < sbfile.split(" ").length; i++){
                  if(message.split(" ")[3] !== undefined){
                    let sbchan = sbfile.split(" ")[i]
                    client.timeout(sbchan, sbuser, sbleng, sbreas)
                  }
                }
                client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully timed out ${pixelize(sbuser)} in ${sbfile.split(" ").length-1} channels for ${sblenga}`)
              }
            }
          }
        }
        if(sbaction === "unban"){
          if(message.split(" ")[2] !== undefined){
            let sbuser = message.split(" ")[2]
            for(i = 0; i < sbfile.split(" ").length; i++){
              let sbchan = sbfile.split(" ")[i]
              client.unban(sbchan, sbuser)
            }
            client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully unbanned ${pixelize(sbuser)} in ${sbfile.split(" ").length-1} channels`)
          }
        }
        if(sbaction === "add"){
          if(message.split(" ")[2] !== undefined){
            let sbchan = message.split(" ")[2]
            if(sbchan.startsWith("#")){
              sbchan = sbchan.replace("#", "")
            }
            if(!sbfile.includes(sbchan + " ")){
              appf(`./appdata/syncban/syncbanchannels.txt`, sbchan + " ")
              client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully added ${pixelize(sbchan)} to the syncbanlist`)
            }
          }
        }
        if(((sbaction === ("del")) || (sbaction === ("remove")))){
          if(message.split(" ")[2] !== undefined){
            let sbchan = message.split(" ")[2]
            if(sbfile.includes(sbchan + " "))
              //appf(`./appdata/syncban/syncbanchannels.txt`, sbfile.replace(sbchan + " ", ""))
              fs.writeFileSync(`./appdata/syncban/syncbanchannels.txt`, sbfile.replace(sbchan + " ", ""))
              client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully removed ${pixelize(sbchan)} from the syncbanlist`)
            }
          }
        if(sbaction === "list"){
          let syncbanchans = []
          for(i = 0; i < rf(`./appdata/syncban/syncbanchannels.txt`).split(" ").length-1; i++){
            syncbanchans.push(pixelize(rf(`./appdata/syncban/syncbanchannels.txt`).split(" ")[i]))
          }
          client.say(channel, `/me [SYSTEM] ${userstate.username} ${syncbanchans.length} Channels in Syncbanlist - ${syncbanchans.join(", ")}`)
        }
        }
      }
    }

    if(message.startsWith(`${pref}roomstate`)){
      let roomstate = ""
      let roomchannel = channel
      if(message.split(" ")[1] !== undefined){
        roomchannel = message.split(" ")[1].replace(/@#/g, "")
      }
      roomstateclient.join(roomchannel)
      roomstateclient.on("roomstate", (channel, state) => {
        let roomlang = state["broadcaster-lang"]
        let roomemoteonly = state["emote-only"]
        let roomrituals = state.rituals
        let roomid = state["room-id"]
        let roomslowmode = state.slow
        let roomsubsonly = state["subs-only"]
        roomstateclient.removeAllListeners("roomstate")
        roomstate = `RoomID: ${roomid} - Lang: ${roomlang} - Emoteonly: ${roomemoteonly} - Slowmode: ${roomslowmode} - Subsonly: ${roomsubsonly} - Rituals: ${roomrituals}`
        // console.log(roomstate)
        roomstateclient.part(roomchannel)
        client.say(chan, `/me [RSTA] ${userstate.username} Roomstate in ${pixelize(roomchannel)}: ${roomstate}`)
      })
    }

    if(message.startsWith(`${pref}clip`)){
      if(message.split(" ")[1] !== undefined){
        if(message.split(" ")[1] === "info"){
          if(message.split(" ")[2] !== undefined){
            let clipid = message.split(" ")[2]
            if(clipid.startsWith(`https://clips.twitch.tv/`)){
              clipid = clipid.split(`https://clips.twitch.tv/`)[1]
            } else if(clipid.startsWith(`https://twitch.tv/`) && clipid.includes(`/clip/`)){
              clipid = clipid.split(`/clip/`)[1]
            }
            try {
              // getclip(clipid)
              getclip(clipid).then(value => {
                // clipinfo = value
                let dat = JSON.parse(value).data[0]
                // console.log(dat.url)
                let curl = dat.url
                let cbroadcaster = pixelize(dat.broadcaster_name)
                let ccreator = pixelize(dat.creator_name)
                let cvideoid = dat.video_id
                let ctitle = dat.title
                let cviews = dat.view_count
                let ccreated = dat.created_at.replace("T", " ").replace("Z", "").replace(dat.created_at.split("T")[1].split(":")[0], pad2(+dat.created_at.split("T")[1].split(":")[0]+1))
                let cthumbnail = dat.thumbnail_url
                let cduration = dat.duration
                let clanguage = dat.language
                if(cduration >= 60){
                  cduration = cduration/60 + "m"
                } else {
                  cduration = cduration + "s"
                }
                client.say(channel, `/me [SYSTEM] ${userstate.username} Clipinfo: Channel: ${cbroadcaster}, Creator: ${ccreator}, Views: ${cviews}, Length: ${cduration}, Title: ${ctitle}, Created: ${ccreated}, Language: ${clanguage}, Url: ${curl}`)
              })
              .catch(err => {
                if(err.startsWith("0")){
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Clipinfo Error`)
                  return;
                } else {
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Clipinfo Error: No Data returned`)
                  return;
                }
              })
          } catch(err){}
          }
        }
      } 
      if(message.split(" ")[1] !== "info"){
        if(req){
          let broadcasteruser = chan
          let broadcasterid = ""
          if(message.split(" ")[1] !== undefined){
            broadcasteruser = message.split(" ")[1]
          }
          try {
            getuserid(broadcasteruser)
            .then(id => {
              broadcasterid = id
              createclip(broadcasterid)
              .then(value => {
                client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully created Clip: https://clips.twitch.tv/${value.split(`"id":"`)[1].split(`"`)[0]}`)
                return;
              })
              .catch(err => {
                if(err.startsWith("0")){
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Clip Error: ${err}`)
                  return;
                } else {
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Clip Error: No data returned ${err}`)
                  return;
                }
              })
            })
          } catch(err){
          
          }
        }
      }
    }

    if(message.startsWith(`${pref}video`)){
      if(req){
        if(message.split(" ")[1] !== undefined){
          let videoaction = message.split(" ")[1]
          if(videoaction === "info"){
            if(message.split(" ")[2] !== undefined){
              let videoid = message.split(" ")[2]
              if(videoid.includes(`twitch.tv/videos/`)){
                videoid = videoid.split(`videos/`)[1]
              }
              request(`https://api.twitch.tv/kraken/videos/${videoid}`, requestopts3, function(e, r){
              if(e){}
              let dat = JSON.parse(r.body)
              let broadcasttitle = dat.title
              let broadcastviews = dat.views
              let broadcasturl = dat.url
              let broadcastcreated = dat.created_at.replace("T", " ").replace("Z", "").replace(dat.created_at.split("T")[1].split(":")[0], pad2(+dat.created_at.split("T")[1].split(":")[0]+1))
              let broadcastlang = dat.language
              let broadcastrest = dat.viewable
              let broadcastgame = dat.game
              let broadcastduration = dat.length
              let broadcaster = dat.channel.name
              let broadcasttype = dat.status
              if(broadcastduration >= 60){
                // Minute
                broadcastduration = broadcastduration/60
                if(broadcastduration >= 60){
                  // Hour
                  broadcastduration = broadcastduration/60
                  if(broadcastduration >= 24){
                    // Day
                    broadcastduration = broadcastduration/24
                    if(broadcastduration >= 7){
                      // Week
                      broadcastduration = (broadcastduration/7).toFixed(1) + "w"
                    } else {
                      broadcastduration = broadcastduration.toFixed(1) + "d"
                    }
                  } else {
                    broadcastduration = broadcastduration.toFixed(1) + "h"
                  }
                } else {
                  broadcastduration = broadcastduration.toFixed(1)  + "m"
                }
              } else {
                broadcastduration = broadcastduration + "s"
              }
              // console.log(broadcaster, broadcastviews, broadcasttitle, broadcastduration, broadcastcreated, broadcastrest, broadcastgame, broadcastlang, broadcasturl)
              client.say(channel, `/me ${userstate.username} Video Info: Channel: ${pixelize(broadcaster)}, Type: ${broadcasttype}, Views: ${broadcastviews}, Game: ${broadcastgame}, Length: ${broadcastduration}, Language: ${broadcastlang}, Title: ${broadcasttitle}, Created: ${broadcastcreated}, Viewable: ${broadcastrest}, Url: ${broadcasturl}`)
              })
            }
          }
        }
      }
    }

    // j!command <add/edit/remove/disable/enable/rename> <cmdname> <cmdmessage>
    // Path: "./channels/chan/commands.txt"
    // File: "cmdname 1m/v/b|0m/v/b cmdcontent"
    if((message.startsWith(`${pref}command`) || (message.startsWith(`${pref}cmd`)))){
      let cmdusage = `${pref}cmd <add/remove/edit/enable/disable> <cmdname> <cmdaction> #<(del/to<timeiss>/ban)> -<(mod/vip/bro)`
      if(req){
      let cmddir = `./channels/${chan}`
      let cmddir2 = cmdpath
      // If cmdaction doesnt exist
      if(message.split(" ")[1] === undefined){
        client.say(channel, cmderr(userstate.username, "cmd1", cmdusage))
        return;
      // If cmdaction exist
      } else {
        if(message.split(" ")[2] === undefined){
          if(message.split(" ")[1] === (("get") || ("list"))){
          } else {
            //client.say(channel, cmderr(userstate.username, "cmd2", cmdusage))
            //return;
          }
        } else {
          let cmdprefa = message.split(" ")[0]
          let cmdaction = message.split(" ")[1]
          let cmdname = message.split(" ")[2]
          let cmdperms = (message.endsWith("-mod") || message.endsWith("-vip") || message.endsWith("-bro"))
          let endlength = 0
          if(cmdperms){
            endlength = 8
          } 
          let cmdcontent = message.substr(cmdprefa.length + cmdaction.length + cmdname.length + 3, message.length - cmdprefa.length - cmdaction.length - cmdname.length - endlength)
          let cmdcontenta = cmdcontent
          // console.log("content before: " + cmdcontent)
          // cmdcontent = replacedefines(cmdcontent, channel)
          // console.log("content after: " + cmdcontent)
          //console.log("cmdcontent: " + cmdcontent)
          function returnaction(actionmsg){
            let cmdaactionm = ""
            if(actionmsg.split(" ")[actionmsg.split(" ").length-1].startsWith("#")){
              let cmdaaction = actionmsg.split(" ")[actionmsg.split(" ").length-1]
              if(cmdaaction.split("#")[1] === "del"){
                cmdaactionm = "~d"
              }
              if(cmdaaction.split("#")[1].startsWith("to")){
                let cmdaactiontime = cmdaaction.split("#to")[1]
                if(cmdaactiontime !== isNaN){
                  cmdaactionm = "~t" + cmdaactiontime
                }
              }
            }
            return cmdaactionm
          }

          function raction(ractionmsg){
            let ractionmsgm = ""
            if(ractionmsg.includes("~")){
              let ractionmsga = ractionmsg.split("~")[1]
              if(ractionmsga === "del"){
                ractionmsgm = `~ Delete`
              } else if(ractionmsga.startsWith("to")){
                let ractionmsgtime = ractionmsga.split("to")[1]
                ractionmsgm = `~ Timeout (${ractionmsgtime})`
              }
            }
            return ractionmsgm
          }

          function replaceactions(actionmsg){
            if((actionmsg.split(" ")[actionmsg.split(" ").length-1].includes("#")) || (actionmsg.split(" ").reverse().join(" ").includes("#"))){
              if((actionmsg.split(" ").reverse().join(" ").split(" ")[0] === "#del") || (actionmsg.split(" ").reverse().join(" ").split(" ")[1] === "#del")){
                actionmsg = actionmsg.replace(" #del", "")
              } else if((actionmsg.split(" ").reverse().join(" ").split(" ")[0] === ("#ban")) || (actionmsg.split(" ").reverse().join(" ").split(" ")[0].startsWith("#ban"))){
                actionmsg = actionmsg.replace(" #ban", "")
              } else if(actionmsg.split(" ").reverse().join(" ").split(" ")[0].startsWith("#to")){
                let cmdactionbtime = actionmsg.split(" ").reverse().join(" ").split(" ")[0]
                if(cmdactionbtime !== isNaN){
                  actionmsg = actionmsg.replace(" #to" + cmdactionbtime, "")
                }
              } else if(actionmsg.split(" ").reverse().join(" ").split(" ")[1].startsWith("#to")){
                let cmdactionbtime = actionmsg.split(" ").reverse().join(" ").split(" ")[1]
                if(cmdactionbtime !== isNaN){
                  actionmsg = actionmsg.replace(" #to" + cmdactionbtime, "")
                }
              }
            }
            return actionmsg
          }

          let cmdcount = []
          function getcmdcount(){
            for(c = 1; c < cmdfile.split("\n").length; c++){
              cmdline = cmdfile.split("\n")[c]
              if((!cmdline.startsWith(" ") && !cmdline.startsWith(splitter))){
                cmdcount.push(cmdline.split(" ")[0])
              }
            }
          }
          // getcmdcount()

          if((cmdaction === "add") || (cmdaction === "a")){
            if(message.split(" ")[3] === undefined){
              return;
            }
            if(1 === 0){ // cmdcount.length >= cmdmax
               client.say(channel, `/me [CMD] ${userstate.username} Error: No command slots left`)
            } else {
              let cmdsysfilea = ""
              cmdsysfilea = cmdfile
              for(i = 1; i < cmdsysfilea.split("\n").length; i++){
                let cmdsyslinea = cmdsysfilea.split("\n")[i]
                let cmdsyscmda = cmdsyslinea.split(" ")[0]
                let cmdsysacheck = cmdsyscmda === cmdname
                let cmdsysachecka = ""
                if(cmdsyscmda.includes("/")){
                  let cmdsain = []
                  for(a = 0; a < cmdsyscmda.split("/").length; a++){
                    cmdsain.push(cmdsyscmda.split("/")[a])
                  }
                  cmdsyscmda = cmdsyscmda.split("/")[0]
                  cmdsysacheck = cmdsain.some(cmd => cmdname === cmd)
                  cmdsain.shift()
                  cmdsysachecka = ` ['${cmdsyscmda.split("/")[0]}' ~ '${cmdsain.join("'; '")}']`
                }
                if(cmdsysacheck){
                  // i = cmdsysfilea.split("\n").length
                  client.say(channel, `/me [CMD] ${userstate.username} Error: command '${cmdname}' already exists${cmdsysachecka}`)
                  return;
                }
              }
              let temparr = []
              for(i = 0; i < cmdcontent.split(" ").length; i++){
                temparr.push(cmdcontent.split(" ")[i])
              }

              cmdcontent = replaceactions(cmdcontent)

              appf(cmddir2, `\n${cmdname} ${returnperm("1")}${returnaction(cmdcontent)} ${cmdcontent}`)
              // i = cmdsysfilea.split("\n").length
              client.say(channel, `/me [CMD] ${userstate.username} Successfully added command '${cmdname}' ('${cmdcontent}') [${returnperm("1")}]`)
              return;
            }
          } else if((cmdaction === "remove") || (cmdaction === "delete") || (cmdaction === "del")){
            if(fs.existsSync(cmddir2)){
              let cmdrefile = ""
              cmdrefile = rf(cmddir2)
              if(cmdrefile.split("\n")[1] === undefined){
                client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
                return;
              }
              let cmdreli = 1
              for(i = 1; i < cmdrefile.split("\n").length; i++){
                let cmdreline = cmdrefile.split("\n")[i]
                // Message end -mod
                let cmdrecmd = cmdreline.split(" ")[0]
                if(cmdrecmd.includes("/")){
                  cmdrecmd = cmdrecmd.split("/")[0]
                }
                if(cmdrecmd === cmdname){
                  let cmdrestate = cmdreline.split(`${cmdrecmd} `)[1]
                  // let cmdrecontent = cmdreline.substr(cmdrecmd.length + 3, cmdreline.length - cmdrecmd.length - 3)
                  // let cmdreremoved = cmdrefile.replace(`${cmdreline}`, "")
                  // i = cmdrefile.split("\n").length
                  fs.writeFileSync(cmddir2, cmdrefile.replace(`${("\n"+cmdreline).toString()}`, ''), "utf-8")
                  client.say(channel, `/me [CMD] ${userstate.username} Successfully removed command ${cmdname} [${returnperm("1")}]`)
                  return;
                }
              }
            } else {
              client.say(channel, `/me [CMD] ${userstate.username} No command found named '${cmdname}'`)
              return;
            }
          } else if(cmdaction === "edit"){
            if(fs.existsSync(cmddir2)){
              let cmdedfile = rf(cmddir2)
              if(cmdedfile.split("\n")[1] === undefined){
                client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
                return;
              }
              for(i = 1; i < cmdedfile.split("\n").length; i++){
                let cmdedline = cmdedfile.split("\n")[i]
                let cmdedcmd = cmdedline.split(" ")[0]
                let cmdedarr = []
                if(cmdedcmd.includes("/")){
                  cmdedcmd = cmdedcmd.split("/")[0]
                  for(a = 0; a < cmdedcmd.split("/").length; a++){
                    cmdedarr.push(cmdedcmd.split("/")[a])
                  }
                } else {
                  cmdedarr.push(cmdedcmd)
                }
                if(cmdedarr.some(x => cmdname === x)){
                  let cmdedstate = cmdedline.split(" ")[1]
                  let cmdedlength = 3
                  cmdcontent = replaceactions(cmdcontent)
                  if(cmdedstate.startsWith("1")){
                    cmdedstate = "1"
                  } else if(cmdedstate.startsWith("0")){
                    cmdedstate = "0"
                  }
                  fs.writeFileSync(cmddir2, cmdedfile.replace(`${cmdedline}`, `${cmdedcmd} ${returnperm(cmdedstate)} ${cmdcontent}`))
                  client.say(channel, `/me [CMD] ${userstate.username} Successfully edited command '${cmdedcmd}' ('${cmdcontent}') [${returnperm(cmdedstate)}]`)
                  return;
                } 
              }
              client.say(channel, `/me [CMD] ${userstate.username} no command found named ${cmdname}`)
            } 
            return;
          } else if((cmdaction === "enable") || (cmdaction === "disable")){
            if(fs.existsSync(cmddir2)){
              if(cmdfile.split("\n")[1] === undefined){
                client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
                return;
              }

              for(i = 1; i < cmdfile.split("\n").length; i++){
                let cmdendiline = cmdfile.split("\n")[i]
                let cmdendicmd = cmdendiline.split(" ")[0]
                let cmdendicheck = cmdname === cmdendicmd
                if(cmdendicmd.includes("/")){
                  // cmdendicmd = cmdendicmd.split("/")[0]
                  let cmdsendi = []
                  for(a = 0; a < cmdendicmd.split("/").length; a++){
                    cmdsendi.push(cmdendicmd.split("/")[a])
                  }
                  cmdendicheck = cmdsendi.some(cmd => cmdname === cmd)
                }
                let cmdendistate = cmdendiline.split(" ")[1]
                let cmdendicontent = cmdendiline.substring(cmdendicmd.length + cmdendistate.length +2, cmdendiline.length)
                //console.log(cmdendicontent)
                if(cmdendicheck){
                  if(cmdaction === "enable"){
                    if(cmdendistate.includes("1")){
                      client.say(channel, `/me [CMD] ${userstate.username} Error cmdei1 - Command is enabled`)
                    } else if(cmdendistate.includes("0")){
                      fs.writeFileSync(cmdendiline, cmdfile.replace(cmdendiline, `${cmdendicmd} ${switchstate(cmdendistate)} ${cmdendicontent}`))
                      client.say(channel, `/me [CMD] ${userstate.username} Successfully enabled Command '${cmdendicmd}'`)
                      // i = cmdfile.split("\n").length
                      return;
                    }
                  }
                  if(cmdaction === "disable"){
                    if(cmdendistate.includes("0")){
                      client.say(channel, `/me [CMD] ${userstate.username} Error cmdei2 - Command is disabled`)
                    } else if(cmdendistate.includes("1")){
                      // i = cmdfile.split("\n").length
                      fs.writeFileSync(cmddir2, cmdfile.replace(cmdendiline, `${cmdendicmd} ${switchstate(cmdendistate)} ${cmdendicontent}`))
                      client.say(channel, `/me [CMD] ${userstate.username} Successfully disabled Command '${cmdendicmd}'`)
                      return;
                    }
                  }
                }
              }
            } else {
              client.say(channel, `/me [CMD] ${userstate.username} Error: there are no commands for this channel yet`)
              return;
            }
            client.say(channel, `/me [CMD] ${userstate.username} Error: Command not found! '${pref}cmd list' to see all chatcommands`)
            return;
          } else if(cmdaction === "rename"){
            let cmdrenfile = rf(cmddir2)
            if(cmdrenfile.split("\n")[1] === undefined){
              client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
              return;
            }
            // j!cmd rename <oldcmd> <newcmd>
            if(cmdrenfile.split("\n")[1] === undefined){
              client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
              return;
            }
            for(i = 1; i < cmdrenfile.split("\n").length; i++){
              let cmdrenline = cmdrenfile.split("\n")[i]
              let cmdrencmd = cmdrenline.split(" ")[0]
              if(cmdrencmd.includes("/")){
                cmdrencmd = cmdrencmd.split("/")[0]
              }
              let cmdrenstate = cmdrenline.split(`${cmdrencmd} `)[1]
              let cmdrencontent = cmdrenline.substring(cmdrencmd.length + 3, cmdrenline.length - cmdrencmd.length - 3)
              let oldcmd = message.split(" ")[2]
              let newcmd = message.split(" ")[3]
              if(cmdrencmd === oldcmd){
                fs.writeFileSync(cmddir2, cmdfile.replace(cmdrenline, cmdrenline.replace(oldcmd, newcmd)))
                client.say(channel, `/me [CMD] ${userstate.username} Successfully renamed command '${oldcmd}' to '${newcmd}'`)
                i = cmdrenfile.split("\n").length
                return;
              }
            }
          } else if(cmdaction === "info"){
            // Info about command (on_off/mod)
            // j!cmd info <cmdname>
            let cmdinfile = rf(cmddir2)
            if(cmdinfile.split("\n")[1] === undefined){
              client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
              return;
            }
            for(i = 1; i < cmdinfile.split("\n").length; i++){
              let cmdinline = cmdinfile.split("\n")[i]
              let cmdincmd = cmdinline.split(" ")[0]
              let cmdina = cmdname === cmdincmd
              if(cmdincmd.includes("/")){
                if(cmdincmd.split("/")[1] !== undefined){
                  var cmdsin = new Array
                  for(a = 0; a < cmdincmd.split("/").length; a++){
                    cmdsin.push(cmdincmd.split("/")[a])
                  }
                  cmdina = cmdsin.some(cmd => cmdname === cmd)
                }
              }

              if(cmdina){
                let cmdinstate = cmdinline.split(" ")[1]
                let cmdinstateperm = reperm(cmdinstate)
                let cmdincontent = cmdinline.substring(cmdincmd.length + 3)
                let cmdininfo = ""
                if(cmdincmd.includes("/")){
                  cmdsin.shift()
                  cmdininfo = ` ['${cmdincmd.split("/")[0]}' ~ '${cmdsin.join("'; '")}'] -`
                }
                // i = cmdinfile.split("\n").length
                client.say(channel, `/me [CMD] ${userstate.username} Commandinfo '${cmdincmd}' - [${cmdinstateperm}${raction(cmdinstate)}] -${cmdininfo} '${cmdincontent}'`)
                return;
              }
            }
            client.say(channel, `/me [CMD] ${userstate.username} No command found named "${message.split(" ")[2]}"`)
          } else if(cmdaction === "alias"){
            let cmdalfile = rf(cmddir2)
            if(cmdalfile.split("\n")[1] === undefined){
              client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
              return;
            }
            if(message.split(" ")[2] !== undefined){
              if(message.split(" ")[3] !== undefined){
                let cmdalaction = message.split(" ")[2]
                let cmdalname = message.split(" ")[3]
                if(cmdalaction === "info"){
                  for(i = 0; i < cmdalfile.split("\n").length; i++){
                    let cmdalline = cmdalfile.split("\n")[i]
                    let cmdalcmd = cmdalline.split(" ")[0]
                    let cmdalcheck = cmdalcmd === cmdalname
                    if(cmdalcmd.includes("/")){
                      if(cmdalcmd.split("/")[1] !== undefined){
                        var cmdsp = new Array
                        for(a = 0; a < cmdalcmd.split("/").length; a++){
                          cmdsp.push(cmdalcmd.split("/")[a])
                        }
                        cmdalcheck = cmdsp.some(cmd => cmdalname === cmd)
                      }
                    }
                    if(cmdalcheck){
                      let cmdalinfo = "No Alias found"
                      if(cmdalcmd.includes("/")){
                        cmdsp.shift()
                        cmdalinfo = `'${cmdsp.join("'; '")}'`
                        cmdalcmd = cmdalcmd.split("/")[0]
                      }
                      // i = cmdalfile.split("\n").length
                      client.say(channel, `/me [CMD] ${userstate.username} ['${cmdalcmd}' ~ ${cmdalinfo}]`)
                    }
                  }
                }
                if(message.split(" ")[4] !== undefined){
                  let cmdal = message.split(" ")[4]

                  if(cmdalaction === "add"){
                    for(i = 0; i < cmdalfile.split("\n").length; i++){
                      let cmdalline = cmdalfile.split("\n")[i]
                      let cmdalcmd = cmdalline.split(" ")[0]
                      let cmdalcmda = cmdalcmd
                      let cmdalcheck = cmdalcmd === cmdalname
                      if(cmdalcmd.includes("/")){
                        if(cmdalcmd.split("/")[1] !== undefined){
                          cmdalcmda = cmdalcmda.split("/")[0]
                            var cmdsp = new Array
                            for(a = 0; a < cmdalcmd.split("/").length; a++){
                              cmdsp.push(cmdalcmd.split("/")[a])
                            }
                          cmdalcheck = cmdsp.some(cmd => cmdal === cmd)
                        }
                      }
                      if(!cmdalcheck){
                        if(cmdalcmda === cmdalname){
                          // client.say(channel, `/me [CMD] ${userstate.username} No Alias found`)
                          fs.writeFileSync(cmddir2, cmdalfile.replace(`${cmdalcmd}`, `${cmdalcmd}/${cmdal}`))
                          cmdsp.shift()
                          cmdsp.push(cmdal)
                          client.say(channel, `/me [CMD] ${userstate.username} Successfully Added alias '${cmdal}' to '${cmdalname}' ['${cmdalname}' ~ '${cmdsp.join("'; '")}']`)
                          return;
                        }
                      } else {
                        // client.say(channel, `/me [CMD] ${userstate.username} Alias found`)
                        client.say(channel, `/me [CMD] ${userstate.username} Error: Alias already exists on command`)
                        return;
                      }

                    }
                  }
                  if((cmdalaction === "delete") || (cmdalaction === "remove")){
                    for(i = 0; i < cmdalfile.split("\n").length; i++){
                      let cmdalline = cmdalfile.split("\n")[i]
                      let cmdalcmd = cmdalline.split(" ")[0]
                      let cmdalcmda = cmdalcmd
                      let cmdalcheck = cmdalcmd === cmdalname
                      if(cmdalcmd.includes("/")){
                        if(cmdalcmd.split("/")[1] !== undefined){
                          cmdalcmda = cmdalcmda.split("/")[0]
                            var cmdsp = new Array
                            for(a = 0; a < cmdalcmd.split("/").length; a++){
                              cmdsp.push(cmdalcmd.split("/")[a])
                            }
                          cmdalcheck = cmdsp.some(cmd => cmdal === cmd)
                        }
                      }
                      if(cmdalcmda === cmdalname){
                        if(cmdalcheck){
                          // client.say(channel, `/me ${userstate.username} No Alias found`)
                          fs.writeFileSync(cmddir2, cmdalfile.replace(`/${cmdal}`, ``))
                          cmdsp.shift()
                          if(cmdsp.indexOf(cmdal) > -1){
                            cmdsp.splice(cmdsp.indexOf(cmdal), 1);
                          }
                          client.say(channel, `/me [CMD] ${userstate.username} Successfully Removed alias '${cmdal}' from '${cmdalname}' ['${cmdalname}' ~ '${cmdsp.join("'; '")}']`)
                          return;
                        } else {
                          // client.say(channel, `/me ${userstate.username} Alias found`)
                          client.say(channel, `/me [CMD] ${userstate.username} Error: Alias doesnt exist on command`)
                          return;
                        }
                      } 
                    }
                  }
                }
              }
            }
          }
        }
      }
      } 
      if((message.split(" ")[1] === "get") || (message.split(" ")[1] === "list")){
        cmddir2 = cmdpath
        let cmdlifile = cmdfile
        if(cmdlifile.split("\n")[1] === undefined){
          client.say(channel, `/me [CMD] ${userstate.username} Error: No Commands found`)
          return;
        }
        let cmdlicmds = []
        for(i = 1; i < cmdlifile.split("\n").length; i++){
          let cmdliline = cmdlifile.split("\n")[i]
          let cmdlicmd = cmdliline.split(" ")[0]
          if(cmdlicmd === ""){
            // Keyword
          } else {
            if(cmdliline.split(" ")[1].includes("0")){
              cmdlicmds.push("(" + cmdlicmd + " " + cmdliline.split(" ")[1] + ")")
            } else {
              cmdlicmds.push(cmdlicmd)
            }
          }
        }
        client.say(channel, `/me [CMD] ${userstate.username} Commands for this channel: ${cmdlicmds.sort().join("; ")}`)
        return;
      }
    }

    if(message.startsWith(`${pref}`)){
      let cmdsysdir = cmdpath
      if(fs.existsSync(cmdsysdir)){
        let cmdsysli = 1
        let cmdsysfile = cmdfile
        for(i = 1; i < cmdsysfile.split("\n").length; i++){
        // If file has no cmds
          let cmdsysline = cmdsysfile.split("\n")[i]
          // console.log("Line: " + cmdsysline)
          let cmdsyscmd = cmdsysline.split(" ")[0]
          // console.log("Cmdsyscmd: " + cmdsyscmd)
          let cmdsyschecka = message.split(`${pref}`)[1].split(" ")[0]
          let cmdsyscheck = cmdsyscmd === cmdsyschecka
          if(cmdsyscmd.includes("/")){
            if(cmdsyscmd.split("/")[1] !== undefined){
              var cmdsyscheckb = new Array
              for(a = 0; a < cmdsyscmd.split("/").length; a++){
                cmdsyscheckb.push(cmdsyscmd.split("/")[a])
              }
              // console.log(cmdsyscheckb)
              cmdsyscheck = cmdsyscheckb.some(word => cmdsyschecka === word)
            }
          }
          if(cmdsyscheck){
            // console.log("cmd found")
            let cmdsysstate = cmdsysline.split(" ")[1]
            if(cmdsysstate.includes(0)){
            } else {
              let cmdsyscontent = cmdsysline.substring(cmdsyscmd.length + cmdsysstate.length + 2, cmdsysline.length)
            //console.log("content1 " + cmdsyscontent)
            
            cmdsyscontent = replacedefines(message, channel, cmdsyscontent, userstate)
            //console.log("content2 " + cmdsyscontent)            
              function ifreqtrue(){
                if(cmdsyscontent !== undefined){
                  if(cmdsyscontent.startsWith("/")){
                    let cmdsysaction = cmdsyscontent.split("/")[1].split(" ")[0]
                    //cmdcontent = getslashcmds(cmdsyscontent)
                    //-------
                    if(cmdsysaction === "chain"){
                      cmdsyscontent = cmdsyscontent.replace("/chain ", "")
                      if(cmdsyscontent.split(" && ")[1] !== undefined){
                        chain1 = getslashcmds(cmdsyscontent.split(" && ")[0], userstate)
                        chain2 = getslashcmds(cmdsyscontent.split(" && ")[1].split(" && ")[0], userstate)
                        if(cmdsyscontent.split(" && ")[2] !== undefined){
                          chain3 = getslashcmds(cmdsyscontent.split(" && ")[2], userstate)
                          if(cmdsyscontent.split(" && ")[3] !== undefined){
                            chain4 = getslashcmds(cmdsyscontent.split(" && ")[3], userstate)
                            if(cmdsyscontent.split(" && ")[4] !== undefined){
                              chain5 = getslashcmds(cmdsyscontent.split(" && ")[4], userstate)
                              if(cmdsyscontent.split(" && ")[5] !== undefined){
                                chain6 = getslashcmds(cmdsyscontent.split(" && ")[5], userstate)
                                if(cmdsyscontent.split(" && ")[6] !== undefined){
                                  chain7 = getslashcmds(cmdsyscontent.split(" && ")[6], userstate)
                                  if(cmdsyscontent.split(" && ")[7] !== undefined){
                                    chain8 = getslashcmds(cmdsyscontent.split(" && ")[7], userstate)
                                    if(cmdsyscontent.split(" && ")[8] !== undefined){
                                      chain9 = getslashcmds(cmdsyscontent.split(" && ")[8], userstate)
                                      if(cmdsyscontent.split(" && ")[9] !== undefined){
                                        chain10 = getslashcmds(cmdsyscontent.split(" && ")[9], userstate)
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      chain1 = getslashcmds(cmdsyscontent, userstate)
                      return;
                    }
                  } else {
                    chain1 = getslashcmds(cmdsyscontent, userstate)
                    return;
                  }
                }
              }
              
              /*if(cmdactionb === undefined){
                cmdactionb = client.say(channel, cmdsyscontent)
              }*/
              if(cmdsysstate.includes("m")){
                // console.log("modreq")
                if(req){
                  // console.log("modreq true")
                  try {
                    ifreqtrue()
                  } catch(err){
                    
                  }
                } else {
                  // console.log("modreq false")
                }
                return;
              } else if(cmdsysstate.includes("v")){
                // console.log("vipreq")
                if((getvips(userstate) === 1) || (req)){
                  // console.log("vipreq true")
                  try {
                    ifreqtrue()
                  } catch(err){
                  
                  }
                } else {
                  // console.log("vipreq false")
                }
                return;
              } else if(cmdsysstate.includes("b")){
                // console.log("brodreq")
                if((userstate.username === channel.split("#")[1]) || (userstate.username === "jubewe")){
                  // console.log("brodreq true")
                  try {
                    ifreqtrue()
                  } catch(err){
                    
                  }
                } 
                return;
              } else {
                // console.log("no reqs found")
                try {
                  ifreqtrue()
                } catch(err){
                  
                }
                return;
              }
            }
          }
          cmdsysli = +cmdsysli+1
        }
      }  
    }

    let keypath = `./channels/${chan}`
    let keypath2 = cmdpath
    let keyfile = cmdfile
    // j!key <add/delete/edit/enable/disable/rename/info> <keyname> <(keycontent)> -<(vip/mod/bro)>
    // Path: "./channels/chan/commands.txt"
    // File: " keyname<splitter>keystate<splitter>keycontent"
    if(((message.startsWith(`${pref}key`)) || (message.startsWith(`${pref}keyword`)))){
      let keywordhelp = "Command usage: j!key <add/remove/enable/disable/edit/alias> <keyword> <(keycontent)> -<(mod/vip/bro)>"
      if(req){
        if(message.split(" ")[1] !== undefined){
          let keyaction = message.split(" ")[1]
          if(keyaction === "help"){
            client.say(channel, `/me [KEY] ${userstate.username} Keyword help: ${keywordhelp}`)
          }
          if((keyaction === "list") || (keyaction === "get")){
            // List keywords
            let keywordsarr = []
            let keystates = []
            for(a = 0; a < getkeysb().length; a++){
              if(getkeystates()[a].includes("0")){
                keywordsarr.push("(" + getkeysb()[a] + " " +  getkeystates()[a] + ")")
              } else {
                keywordsarr.push(getkeysb()[a])
              }
            }
            if(keywordsarr.length === 0){
              client.say(channel, `/me [KEY] ${userstate.username} Error: No keywords found`)
              return;
            } else {
              client.say(channel, `/me [KEY] ${userstate.username} Keywords for this channel: ${keywordsarr.sort().join("; ")}`)
              return;
            }
          }
          if(message.split(" ")[2] !== undefined){
            let keyword = message.split(" ")[2].replace(/\$\{s\}/g, " ")
            message = message.replace(message.split(" ")[2], keyword)

            if((keyaction === "add") || (keyaction === "a")){
              // console.log("key add")
              if(checkkey(keyword) === 1){
                client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword already exist`)
                return;
              } else {
                if(message.split(" ")[3] !== undefined){
                  let keycontentlength = 0
                  let keystate = "1"
                  if((message.endsWith("-mod")) || (message.endsWith("-vip") || (message.endsWith("-bro")))){
                    keycontentlength = 5
                  }
                  keystate = returnperm(keystate)
                  let keycontent = message.substring(message.split(" ")[0].length + keyaction.length + keyword.length +3, message.length -keycontentlength)
                  appf(keypath2, `\n ${keyword}${splitter}${keystate}${splitter}${keycontent}`)
                  let akeyarr = []
                  let akeyex = ""
                  if(keyword.includes("/")){
                    for(a = 0; a < keyword.split("/").length; a++){
                      akeyarr.push(keyword.split("/")[a])
                    }
                    akeyex = ` ['${akeyarr.join(`'; '`)}']`
                  } else {
                    akeyarr.push(keyword)
                  }
                  client.say(channel, `/me [KEY] ${userstate.username} Successfully added Keyword "${akeyarr.shift()}"${akeyex} ["${keycontent}"]`)
                }
              }
            }
          
            if((keyaction === "delete") || (keyaction === "del") || (keyaction === "remove")){
              // console.log("key delete")
              if(message.split(" ")[2] === "all"){
                if(userstate.username === chan){
                  fs.writeFileSync(keypath2, "")
                  client.say(channel, `/me [KEY] ${userstate.username} Successfully deleted all keys for this channel`)
                } else {
                  client.say(channel, `/me [KEY] ${userstate.username} Error: only the broadcaster can delete all keys`)
                }
              } else if(message.split(" ")[2] === "last"){
                let firsts = getcmdfilefirst()
                // console.log(firsts[firsts.length-1])
                if(firsts[firsts.length-1].startsWith(" ")){
                  fs.writeFileSync(keypath2, keyfile.replace(`${("\n" + keyfile.split("\n")[firsts.length]).toString()}`, ''))
                  client.say(channel, `/me [KEY] ${userstate.username} Successfully deleted last key ${firsts[firsts.length-1]}`)
                } else {
                  client.say(channel, `/me [KEY] ${userstate.username} Error: No last added key found`)
                }
                // return;
              } else {
                if(checkkeya(keyword) === 1){
                  for(i = 1; i < keyfile.split("\n").length; i++){
                    let dkeyline = keyfile.split("\n")[i]
                    let dkeykey = dkeyline.split(splitter)[0].substring(1)
                    if(dkeyline.startsWith(" ")){
                      let dkeyarr = []
                      if(dkeykey.includes("/")){
                        for(a = 0; a < dkeykey.split("/").length; a++){
                          dkeyarr.push(dkeykey.split("/")[a])
                        }
                      } else { 
                        dkeyarr.push(dkeykey)
                      }
                      if(dkeyarr.some(ke => keyword === ke)){
                        fs.writeFileSync(keypath2, keyfile.replace(`${("\n" + dkeyline).toString()}`, ""))
                        client.say(channel, `/me [KEY] ${userstate.username} Successfully deleted Keyword "${dkeykey}"`)
                        return;
                      }
                    }
                  }
                } else {
                  client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword doesnt exist`)
                  return;
                }
              }
            }
          
            if(keyaction === "edit"){
              if(checkkeya(keyword) === 1){
                for(i = 0; i < keyfile.split("\n").length; i++){
                  // ekeystate = returnperm(ekeystate)
                  let ekeyline = keyfile.split("\n")[i]
                  if(ekeyline.startsWith(" ")){
                    let ekeykey = ekeyline.split(splitter)[0].substring(1)
                    let ekeystate = ekeyline.split(splitter)[1]
                    let ekeycontentlength = 0
                    if((message.endsWith("-mod")) || (message.endsWith("-vip") || (message.endsWith("-bro")))){
                      ekeycontentlength = 5
                      if(ekeystate.startsWith("1")){
                        ekeystate = returnperm("1")
                      }
                      if(ekeystate.startsWith("0")){
                        ekeystate = returnperm("0")
                      }
                    } else {
                      if(ekeystate.startsWith("1")){
                        ekeystate = returnperm("1")
                      } else {
                        ekeystate = returnperm("0")
                      }
                    }
                    let ekeycontent = message.substr(message.split(" ")[0].length + keyaction.length + keyword.length +3, message.length - message.split(" ")[0].length - keyaction.length - keyword.length -3 -ekeycontentlength)
                    let ekeyarr = []
                    let ekeye = ""
                    if(ekeykey.includes("/")){
                      for(a = 0; a < ekeykey.split("/").length; a++){
                        ekeyarr.push(ekeykey.split("/")[a])
                      }
                      ekeye = ` ['${ekeyarr.join(`'; '`)}']`
                    } else {
                      ekeyarr.push(ekeykey)
                    }
                    if(ekeyarr.some(ke => keyword === ke)){
                      fs.writeFileSync(keypath2, keyfile.replace(ekeyline, ` ${ekeykey}${splitter}${ekeystate}${splitter}${ekeycontent}`))
                      client.say(channel, `/me [KEY] ${userstate.username} Successfully edited Keyword "${ekeyarr.shift()}"${ekeye} [${reperm(ekeystate)}] ["${ekeycontent}"]`)
                      return;
                    }
                  }
                }
              } else {
                client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword doesnt exist`)
                return;
              }
            }
          
            if((keyaction === "enable") || (keyaction === "disable")){
              if(checkkeya(keyword) === 1){
                for(i = 0; i < keyfile.split("\n").length; i++){
                  let ekeyline = keyfile.split("\n")[i]
                  let ekeykey = ekeyline.split(splitter)[0].substring(1)
                  if(ekeyline.startsWith(" ")){
                    let ekeystate = ekeyline.split(splitter)[1]
                    let ekeycontent = ekeyline.split(splitter)[2]
                    let ekeyarr = []
                    if(ekeykey.includes("/")){
                      for(a = 0; a < ekeykey.split("/").length; a++){
                        ekeyarr.push(ekeykey.split("/")[a])
                      }
                    } else {
                      ekeyarr.push(ekeykey)
                    }
                    if(ekeyarr.some(ke => keyword === ke)){
                      if(ekeystate.startsWith("1")){
                        if(keyaction === "enable"){
                          client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword is already enabled`)
                          return;
                        }
                        if(keyaction === "disable"){
                          fs.writeFileSync(keypath2, keyfile.replace(ekeyline, ` ${ekeykey}${splitter}${switchstate2(ekeystate)}${splitter}${ekeycontent}`))
                          client.say(channel, `/me [KEY] ${userstate.username} Successfully Disabled Keyword "${ekeykey}"`)
                          return;
                        }
                      } else if(ekeystate.startsWith("0")){
                        if(keyaction === "enable"){
                          fs.writeFileSync(keypath2, keyfile.replace(ekeyline, ` ${ekeykey}${splitter}${switchstate2(ekeystate)}${splitter}${ekeycontent}`))
                          client.say(channel, `/me [KEY] ${userstate.username} Successfully Enabled Keyword "${ekeykey}"`)
                          return;
                        }
                        if(keyaction === "disable"){
                          client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword is already disabled`)
                          return;
                        }
                      }
                    }
                  }
                }
              } else {
                client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword doesnt exist`)
                return;
              }
            }
          
            if(keyaction === "info"){
              if(checkkeya(keyword) === 1){
                for(i = 0; i < keyfile.split("\n").length; i++){
                  let ikeyline = keyfile.split("\n")[i]
                  if(ikeyline.startsWith(" ")){
                    let ikeykey = ikeyline.split(splitter)[0].substring(1)
                    let ikeystate = ikeyline.split(splitter)[1]
                    let ikeycontent = ikeyline.split(splitter)[2]
                    let ikeyarr = []
                    let ikeye = ""
                    if(ikeykey.includes("/")){
                      for(a = 0; a < ikeykey.split("/").length; a++){
                        ikeyarr.push(ikeykey.split("/")[a])
                      }
                      ikeye = ` ['${ikeyarr.join(`'; '`)}']`
                    } else {
                      ikeyarr.push(ikeykey)
                    }
                    if(ikeyarr.some(ke => keyword === ke)){
                      client.say(channel, `/me [KEY] ${userstate.username} Info: "${ikeyarr.shift()}"${ikeye} [${reperm(ikeystate)}] ["${ikeycontent}"]`)
                      return;
                    }
                  }
                }
              } else {
                client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword doesnt exist`)
                return;
              }
            }
          
            if(keyaction === "rename"){
              if(checkkeya(keyword) === 1){
                if(message.split(" ")[3] !== undefined){
                  for(i = 0; i < keyfile.split("\n").length; i++){
                    let rkeyline = keyfile.split("\n")[i]
                    if(rkeyline.startsWith(" ")){
                      let rkeykey = rkeyline.split(splitter)[0].split(" ")[1]
                      let rkeystate = rkeyline.split(splitter)[1]
                      let rkeycontent = rkeyline.split(splitter)[2]
                      let rkeyarr = []
                      if(rkeykey.includes("/")){
                        for(a = 0; a < rkeykey.split("/").length; a++){
                          rkeyarr.push(rkeykey.split("/")[a])
                        }
                      } else {
                        rkeyarr.push(rkeykey)
                      }
                      if(rkeyarr.some(ke => keyword === ke)){
                        let rnewkey = message.split(" ")[3]
                        let rkeye = ""
                        let rkewarr = []
                        if(rnewkey.includes("/")){
                          for(a = 0; a < rnewkey.split("/").length; a++){
                            rkewarr.push(rnewkey.split("/")[a])
                          }
                          rkeye = ` ['${rnewkey}']`
                        } else {
                          rkewarr.push(rnewkey)
                        }
                        fs.writeFileSync(keypath2, keyfile.replace(rkeyline, ` ${rnewkey}${splitter}${rkeystate}${splitter}${rkeycontent}`))
                        client.say(channel, `/me [KEY] ${userstate.username} Successfully renamed command '${rkeykey}' to '${rkewarr.shift()}'${rkeye} [${reperm(rkeystate)}] ["${rkeycontent}"]`)
                        return;
                      }
                    }
                  }
                } else {
                  client.say(channel, `/me [KEY] ${userstate.username} Error: No Rename given`)
                  return;
                }
              } else {
                client.say(channel, `/me [KEY] ${userstate.username} Error: Keyword doesnt exist`)
                return;
              }
            }
          }
        }
      }
    } 
    
    let keys = getkeys()
    let keysa = getkeysa()
    // console.log(keys)
    // console.log(keysa)
    if(keysa.some(ke => message.includes(ke))){
      // console.log("ye")
      // if(keytochans === []){
      //   keytochans.push(chan)
      //   for(a = 0; a < getkeysb().length; a++){

      //   }
      //   keytokeys.push()
      // }
      for(k = 0; k < keys.length; k++){
        // console.log(keys)
        let key = keys[k]
        // console.log(key)
        let keyarr = []
        if(key.includes("/")){
          for(b = 0; b < key.split("/").length; b++){
            keyarr.push(key.split("/")[b])
          }
        } else {
          keyarr.push(key)
        }
        // console.log(keyarr)
        if(keyarr.some(keya => ((message.includes(keya)) || (message === keya)))){
          if(key.includes("/")){
            key = key.split("/")[0]
          }
          let xkeycontent = getkeycontent(key)
          xkeycontent = replacedefines(message, channel, xkeycontent, userstate)
          // console.log("ye")
          let keystate = getkeystate(key)
          // console.log(`Key: ${key} | State: ${keystate} | Content: ${xkeycontent}`)
          if(keystate.includes("1")){
            function ifreqtrue(){
              if(xkeycontent !== undefined){
                if(xkeycontent.startsWith("/")){
                  let cmdsysaction = xkeycontent.split("/")[1].split(" ")[0]
                  //cmdcontent = getslashcmds(xkeycontent)
                  //-------
                  if(cmdsysaction === "chain"){
                    xkeycontent = xkeycontent.replace("/chain ", "")
                    if(xkeycontent.split(" && ")[1] !== undefined){
                      chain1 = getslashcmds(xkeycontent.split(" && ")[0])
                      chain2 = getslashcmds(xkeycontent.split(" && ")[1].split(" && ")[0])
                      if(xkeycontent.split(" && ")[2] !== undefined){
                        chain3 = getslashcmds(xkeycontent.split(" && ")[2])
                        if(xkeycontent.split(" && ")[3] !== undefined){
                          chain4 = getslashcmds(xkeycontent.split(" && ")[3])
                          if(xkeycontent.split(" && ")[4] !== undefined){
                            chain5 = getslashcmds(xkeycontent.split(" && ")[4])
                            if(xkeycontent.split(" && ")[5] !== undefined){
                              chain6 = getslashcmds(xkeycontent.split(" && ")[5])
                              if(xkeycontent.split(" && ")[6] !== undefined){
                                chain7 = getslashcmds(xkeycontent.split(" && ")[6])
                                if(xkeycontent.split(" && ")[7] !== undefined){
                                  chain8 = getslashcmds(xkeycontent.split(" && ")[7])
                                  if(xkeycontent.split(" && ")[8] !== undefined){
                                    chain9 = getslashcmds(xkeycontent.split(" && ")[8])
                                    if(xkeycontent.split(" && ")[9] !== undefined){
                                      chain10 = getslashcmds(xkeycontent.split(" && ")[9])
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    chain1 = getslashcmds(xkeycontent)
                    return;
                  }
                } else {
                  chain1 = getslashcmds(xkeycontent)
                  return;
                }
              }
            }

            function executekey(){

              function executekeya(){
                ifreqtrue()
                keytokeys.push(key)
                keytochans.push(chana)
                keytousers.push(userstate.username.toLowerCase())
                let keyindex = keytokeys.length
                setTimeout(() => {
                  // console.log("resetted " + keyindex)
                  keyindex = keytokeys.length
                  keytokeys.splice(keyindex - 1, 1);
                  keytochans.splice(keyindex - 1, 1);
                  keytousers.splice(keyindex - 1, 1);
                }, 15000)
              }
              // console.log("gkeystart")
              let gkma = getkeymatches(key)
              let gcma = getchannelmatches(chana)
              let guma = getusermatches(userstate.username.toLowerCase())
              if(gkma.length > 0){
                for(i = 0; i < gkma.length; i++){
                  if((keyarr.some(gkma[i]) && gkma[i] === gcma[i] && gkma[i] === guma[i])){
                    // console.log("m1")
                    return;
                  } else {
                    // console.log("f1")
                  }
                }
                executekeya()
              } else {
                // console.log("xgkma")
                executekeya()
              }
            }
            // console.log("key enabled")
            if(keystate.split("")[1] !== undefined){
              if(keystate.includes("m")){
                if(req){
                  // client.say(channel, xkeycontent)
                  try {
                    // getslashcmds(xkeycontent)
                    executekey()
                    return;
                  } catch(err){
                    return;
                  }
                } else {
                  return;
                }
              } else if(keystate.includes("v")){
                if((getvips(userstate) === 1) || (req)){
                  // client.say(channel, xkeycontent)
                  try {
                    // getslashcmds(xkeycontent)
                    executekey()
                    return;
                  } catch(err){
                    return;
                  }
                } else {
                  return;
                }
              } else if(keystate.includes("b")){
                if((userstate.username === chana) || (adminreq)){
                  // client.say(channel, xkeycontent)
                  try {
                    // getslashcmds(xkeycontent)
                    executekey()
                    return;
                  } catch(err){
                    return;
                  }
                } else {
                  return;
                }
              } 
            } else {
              // client.say(channel, xkeycontent)
              try {
                  // getslashcmds(xkeycontent)
                  executekey()
                  return;
                } catch(err){
                  return;
                }
            }
          
          } else if(keystate.includes("0")){
            // console.log("key disabled")
            return;
          }
        }
      }
    }

    if(message.startsWith(`${pref}klist`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          if(message.split(" ")[1] === "1"){
            client.say(channel, `/me [KEY-] ${userstate.username} Logged in Console`)
            let klistarr = []
            let klistarr1 = []
            let klistarr2 = []
            let klistarr3 = []
            for(k = 0; k < keytokeys.length; k++){
              let kkeys = getkeymatches(keytokeys[k], "1")
              let kchan = getchannelmatches(keytochans[k], "1")
              let kuser = getusermatches(keytousers[k], "1")
              // klistarr1.push(keytokeys[k])
              // klistarr2.push(keytochans[k])
              // klistarr3.push(keytousers[k])
              klistarr.push(`${kkeys}-${kchan}-${kuser}`)
            }
            console.log(klistarr.join("; "))
            // console.log(`>> ${klistarr1.join(",")} ${klistarr2.join(",")} ${klistarr3.join(",")}`)
            // other function option - return what matches as string
          } else if(message.split(" ")[1] === "reset"){
            keytochans = []
            keytokeys = []
            keytousers = []
            client.say(channel, `/me [KEY-] ${userstate.username} Successfully resetted arrays`)
          }
        } else {
          client.say(channel, `/me [KEY-] ${userstate.username} Logged in Console`)
          console.log("Keys: " + keytokeys.join(", "))
          console.log("Chans: " + keytochans.join(", "))
          console.log("Users: " + keytousers.join(", "))
        }
      }
    }

    function getkeymatches(gkkey, gkeyopt){
      let gkmindexes = []
      for(gkm = 0; gkm < keytokeys.length; gkm++){
        if(keytokeys[gkm] === gkkey){
          if(((gkeyopt === undefined) || (gkeyopt === "0"))){
            gkmindexes.push(gkm)
          } else if(gkeyopt === "1"){
            gkmindexes.push(keytokeys[gkm])
          }
        }
      }
      // console.log(`gkeymatch ${gkmindexes.join(", ")}`)
      return gkmindexes
    }

    function getchannelmatches(gcchan, gchanopt){
      let gcmindexes = []
      for(gcm = 0; gcm < keytochans.length; gcm++){
        if(keytochans[gcm] === gcchan){
          if(((gchanopt === undefined) || (gchanopt === "0"))){
            gcmindexes.push(gcm)
          } else if(gchanopt === "1"){
            gcmindexes.push(keytochans[gcm])
          }
        }
      }
      // console.log(`gchmatch ${gcmindexes.join(", ")}`)
      return gcmindexes
    }

    function getusermatches(guuser, guseropt){
      let gumindexes = []
      for(gum = 0; gum < keytousers.length; gum++){
        if(keytousers[gum] === guuser){
          if(((guseropt === undefined) || (guseropt === "0"))){
            gumindexes.push(gum)
          } else if(guseropt === "1"){
            gumindexes.push(keytousers[gum])
          }
        }
      }
      // console.log(`gumatch ${gumindexes.join(", ")}`)
      return gumindexes
    }

    if(((message.startsWith(`${pref}py`)) || (message.startsWith(`${pref}pyramid`)))){
      if(adminreq){
        let emote = "TriHard"
        let pychan = channel
        let pymes = message
        if(pymes.split(" ")[pymes.split(" ").length -1].startsWith("#")){
          pychan = pymes.split(" ")[pymes.split(" ").length-1]
          pymes = pymes.slice(0, -pychan.length)
        }
        if(pymes.split(" ")[2] !== undefined){
          emote = pymes.substring(pymes.split(" ")[0].length + pymes.split(" ")[1].length +2)
        }
        let amount = pymes.split(" ")[1]
        if(!isNaN(amount)){
          if(amount >= 20){
            amount = 19
          }
          function isOdd(isoddnum) {return isoddnum%2}
          if(isOdd(amount) === 0){
            amount = amount-1
          }
          // console.log(isOdd(amount))
          let pyarr = []
          for(i = 0; i < amount; i++){
            if(i < amount/2){
              pyarr.push(emote)
              client.say(pychan, pyarr.join(" "))
            }
            if(i === amount/2){
              client.say(pychan, pyarr.join(" "))
            }
            if(i > amount/2){
              pyarr.shift()
              client.say(pychan, pyarr.join(" "))
            }
          }
        }
      }
    }

    if(message.startsWith(`${pref}syncperms`)){
      if(adminreq){
        syncperms()
        client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully synced perms`)
      }
    }

    if(message.startsWith(`${pref}perms`)){
      if(ownerreq){
        if(message.split(" ")[1] !== undefined){
          let permsaction = message.split(" ")[1]
          if(((permsaction === "add") || (permsaction === "grant"))){
            if(message.split(" ")[2] !== undefined){
              if(admins.includes(message.split(" ")[2])){
                client.say(channel, `/me ${userstate.username} user ${pixelize(message.split(" ")[2])} is already in the permslist`)
              } else {
                appf("./permissions.txt", `${message.split(" ")[2]} `)
                admins.push(message.split(" ")[2])
                client.say(channel, `/me ${userstate.username} Successfully added ${pixelize(message.split(" ")[2])} to the permslist`)
              }
            }
          } else if(((permsaction === "remove") || (permsaction === "ungrant"))){
            if(message.split(" ")[2] !== undefined){
              if(admins.includes(message.split(" ")[2])){
                fs.writeFileSync("./permissions.txt", rf("./permissions.txt").replace(message.split(" ")[2] + " ", ""))
                admins.splice(admins.indexOf(message.split(" ")[2]), 1)
                if(admins.includes(message.split(" ")[2])){
                  syncperms()
                }
                client.say(channel, `/me ${userstate.username} Successfully removed ${pixelize(message.split(" ")[2])} from the permslist`)
              } else {
                client.say(channel, `/me ${userstate.username} user ${pixelize(message.split(" ")[2])} was not found in the permslist`)
              }
            }
          } else if(permsaction === "list"){
            if(message.endsWith("-chat")){
              let adminspixeled = []
              for(i = 0; i < admins; i++){
                adminspixeled.push(pixelize(admins[i]))
              }
              client.say(channel, `/me ${userstate.username} permslist: ${adminspixeled.join(", ")}`)
            } else {
              client.say(channel, `/me ${userstate.username} permslist in console`)
              console.log(admins)
            }
          }
        }
      }
    }

    if(message.startsWith(`${pref}link`)){
      if(req){
        if(message.split(" ")[1] !== undefined){
          let linkaction = message.split(" ")[1].toLowerCase()
          let linkuser = userstate.username
          if(message.split(" ")[2] !== undefined){
            linkuser = message.split(" ")[2]
          }
          if(linkaction === "twitch"){
            client.say(channel, `/me [LINK] ${userstate.username} https://twitch.tv/${linkuser}`)
          } else if(((linkaction === "ml") || (linkaction === "mlu") || (linkaction === "modlookup") || (linkaction === "mc"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://modlookup.3v.fi/u/${linkuser}`)
          } else if(((linkaction === "ffz") || (linkaction === "frankerfacez") || (linkaction === "frankerface") || (linkaction === "frankerz"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://www.frankerfacez.com/${linkuser}`)
          } else if(((linkaction === "bttv") || (linkaction === "bettertwitchtv") || (linkaction === "bettertwitch"))){
            getuserid(linkuser)
            .then(id => {
              request(`https://api.betterttv.net/3/cached/users/twitch/${id}`, requestemotes, function(e, r){
                if(e){
                  client.say(channel, `/me [LINK] ${userstate.username} Error on getting bttv id of ${pixelize(linkuser)} 1`)
                } else {
                  if(JSON.parse(r.body).id === undefined){
                    client.say(channel, `/me [LINK] ${userstate.username} Error: ${pixelize(linkuser)} was not found in database`)
                  } else {
                    client.say(channel, `/me [LINK] ${userstate.username} https://betterttv.com/users/${JSON.parse(r.body).id}`)
                  }
                }
              })
            })
          } else if(((linkaction === "popoutuser") || (linkaction === "ppuser") || (linkaction === "card"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://www.twitch.tv/popout/${chan}/viewercard/${linkuser}`)
          } else if(((linkaction === "pfp") || (linkaction === "picture") || (linkaction === "profilepicture"))){
            getuserinfo(linkuser, "logo")
            .then(uinfo => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${uinfo}`)
            })
            .catch(err => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting profile data for ${pixelize(linkuser)} 3`)
              console.log(`>> ERROR ${connum} - ${err}`)
            })
          } else if(linkaction === "about"){
            client.say(channel, `/me [LINK] ${userstate.username} https://twitch.tv/${linkuser}/about`)
          } else if(((linkaction === "videos") || (linkaction === "vods"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://www.twitch.tv/${linkuser}/videos`)
          } else if(linkaction === "clips"){
            client.say(channel, `/me [LINK] ${userstate.username} https://www.twitch.tv/${linkuser}/clips`)
          } else if(((linkaction === "scheudle") || (linkaction === "calendar"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://www.twitch.tv/${linkuser}/scheudle`)
          } else if(linkaction === "lastvod"){
            getchannelvod(linkuser, "url")
            .then(vodinfo => {
              client.say(channel, `/me [LINK] ${userstate.username} ${vodinfo}`)
            })
          } else if(linkaction === "lastclip"){
            
          } else if(((linkaction === "popoutchat") || (linkaction === "ppchat") || (linkaction === "chat"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://www.twitch.tv/popout/${linkuser}/chat`)
          } else if(((linkaction === "popoutplayer") || (linkaction === "ppplayer") || (linkaction === "player"))){
            client.say(channel, `/me [LINK] ${userstate.username} https://player.twitch.tv/?channel=${linkuser}&enableExtensions=true&muted=false&parent=twitch.tv&player=popout`)
          }
        }
      }
    }

    if(message.startsWith(`${pref}substate`)){
      if(adminreq){
        let subuser = userstate.username
        if(message.split(" ")[1] !== undefined){
          subuser = message.split(" ")[1]
        }
        let subchannel = chan
        if(message.split(" ")[2] !== undefined){
          subchannel = message.split(" ")[2].replace("#", "")
        }
        getuserid(subuser)
        .then(suid => {
          getuserid(subchannel)
          .then(scid => {
            request(`https://api.twitch.tv/kraken/channels/${scid}/subscriptions/${suid}`, requestoptspv, function(e, r){
              if(e){
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting Data from api 1`)
                console.log(`>> ERROR ${connum} - ${e}`)
              } else {
                console.log(r.body)
              }
            })
          })
          .catch(err => {
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting ID of channel ${pixelize(subchannel)} 2`)
            console.log(`>> ERROR ${connum} - ${err}`)
          })
        })
        .catch(err => {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting ID of user ${pixelize(subuser)}`)
          console.log(`>> ERROR ${connum} - ${err}`)
        })
      }
    }

    async function getblockedusers(gblocked){
      return new Promise(function(resolve, reject){
        request(`https://api.twitch.tv/kraken/users/${c.user_id}/blocks`, requestopts2, function(e, r){
          if(e){
            return reject("1 " + err)
          } else {
            // console.log(r.body)
            let dat = JSON.parse(r.body)
            let blocked = []
            // console.log(blocks)
            if(((gblocked === undefined) || (gblocked === 0))){
              if(dat._total > 0){
                dat = dat.blocks
                Object.keys(dat).forEach(user => {
                  blocked.push(dat[user].user.name)
                })
              }
            } else {
              if(dat._total > 0){
                dat = dat.blocks
                Object.keys(dat).forEach(user => {
                  blocked.push(`${dat[user].user.name}${splitter}${dat[user].user._id}${splitter}${dat[user].user.created_at}${splitter}${dat[user].user.type}${splitter}${dat[user].user.bio}`)
                })
              }
            }
            return resolve(blocked)
          }
        })
      })
    }

    if(message.startsWith(`${pref}block`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          let blockuser = message.split(" ")[1].replace("@", "")
          if(blockuser === "list"){
            getblockedusers()
            .then(blocked => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${blocked.length} Blocked users: ${blocked.join(", ")}`)
            })
            .catch(err => {
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting blocked users 1`)
              console.error(`>> ERROR ${connum} - ${err}`)
            })
          } else {
            getblockedusers()
            .then(blocked => {
              if(blocked.includes(blockuser)){
                client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(blockuser)} is already blocked`)
              } else {
                getuserid(blockuser)
                .then(id => {
                  request(`https://api.twitch.tv/kraken/users/${c.user_id}/blocks/${id}`, requestopts5, function(e, r){
                    if(e){ 
                      console.error(`>> ERROR ${connum} - ${e}`)
                      client.say(channel, `/me [SYSTEM] ${userstate.username} Error on blocking ${pixelize(blockuser)} (${id}) 1`)
                    } else {
                      // console.log(r.body)
                      client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully blocked ${pixelize(blockuser)} (${id})`)
                    }
                  })
                })
                .catch(err => {
                  console.error(`>> ERROR ${connum} - ${err}`)
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Error on blocking ${pixelize(blockuser)} 2`)
                })
              }
            })
            
          }
        } else {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error on blocking - no user given | Command usage: "${pref}block <user>"`)
        }
      }
    }

    if(message.startsWith(`${pref}unblock`)){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          let unblockuser = message.split(" ")[1].replace("@", "")
          getblockedusers()
          .then(blocked => {
            if(blocked.includes(unblockuser)){
              getuserid(unblockuser)
              .then(id => {
                request(`https://api.twitch.tv/kraken/users/${c.user_id}/blocks/${id}`, requestopts6, function(e, r){
                  if(e){
                    console.error(`>> ERROR ${connum} - ${e}`)
                    client.say(channel, `/me [SYSTEM] ${userstate.username} Error on unblocking ${pixelize(unblockuser)} (${id}) 1`)
                  } else {
                    client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully unblocked ${pixelize(unblockuser)} (${id})`)
                  }
                })
              })
              .catch(err => {
                console.error(`>> ERROR ${connum} - ${err}`)
                client.say(channel, `/me [SYSTEM] ${userstate.username} Error on unblocking ${pixelize(unblockuser)} (${id}) 2`)
              })
            } else {
              client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(unblockuser)} is not blocked`)
            }
          })
        } else {
          client.say(channel, `/me [SYSTEM] ${userstate.username} Error on unblocking - no user given | Command usage: "${pref}unblock <user>"`)
        }
      }
    }

    if(((message.startsWith(`${pref}isfollow`)) || (message.startsWith(`${pref}followage`)) || (message.startsWith(`${pref}followingo`)))){
      if(req){
        let isfollowsuser = userstate.username
        if(message.split(" ")[1] !== undefined){
          isfollowsuser = message.split(" ")[1].replace(/[#@]/g, "")
        }
        let isfollowschannel = chan
        if(message.split(" ")[2] !== undefined){
          isfollowschannel = message.split(" ")[2].replace(/[#@]/g, "")
        }
        if(isfollowsuser === isfollowschannel){
          if(userstate.username === isfollowsuser){
            client.say(channel, `/me [SYSTEM] ${userstate.username} you cant follow your own channel`)
          } else { 
            client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(isfollowsuser)} cant follow their own channel`)
          }
        } else {
          getuserid(isfollowsuser)
          .then(userid => {
            getuserid(isfollowschannel)
            .then(channelid => {
              request(`https://api.twitch.tv/kraken/users/${userid}/follows/channels/${channelid}`, requestopts2, function(e, r){
                if(e){
                  client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting followinfo of ${pixelize(isfollowsuser)} in ${pixelize(isfollowschannel)} 1`)
                  console.log(`>> ERROR connum - ${e}`)
                } else {
                  let dat = JSON.parse(r.body)
                  if(r.body.length < 80){
                    if(dat.message === "Follow not found"){
                      if(isfollowsuser === userstate.username){
                        client.say(channel, `/me [SYSTEM] ${userstate.username} you are not following ${pixelize(isfollowschannel)}`)
                      } else {
                        client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(isfollowsuser)} is not following ${pixelize(isfollowschannel)}`)
                      }
                    }
                  } else {
                    if(isfollowsuser === userstate.username){
                      client.say(channel, `/me [SYSTEM] ${userstate.username} you are following ${pixelize(isfollowschannel)} since ${dat.created_at.replace(dat.created_at.split("T")[1].split(":")[0], pad2(+dat.created_at.split("T")[1].split(":")[0]+1)).replace("T", " ").replace("Z", "")}`)
                    } else {
                      client.say(channel, `/me [SYSTEM] ${userstate.username} ${pixelize(isfollowsuser)} is following ${pixelize(isfollowschannel)} since ${dat.created_at.replace(dat.created_at.split("T")[1].split(":")[0], pad2(+dat.created_at.split("T")[1].split(":")[0]+1)).replace("T", " ").replace("Z", "")}`)
                    }
                  }
                }
              })
            })
            .catch(err => {
              console.log(`>> ERROR connum - ${err} 2`)
              client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting channelid of ${pixelize(isfollowschannel)} 2`)
            })
          })
          .catch(err => {
            console.log(`>> ERROR connum - ${err} 3`)
            client.say(channel, `/me [SYSTEM] ${userstate.username} Error on getting userid of ${pixelize(isfollowsuser)} 3`)
          })
        }
      }
    }

    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    if(message.startsWith(`${pref}song`)){
      if(adminreq){
        let spotify_token = rf("./appdata/songbot/spotify_token.txt")
        let spotify_song = {
          method: "GET",
            headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${spotify_token}`
          }
        }

        let requestspotifyrefresh = {
          method: "POST",
          headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "--data" : `-code=${spotify_token}`
          }
        }
        
        request(`https://api.spotify.com/v1/me/player/currently-playing`, spotify_song, function(e, r){
          if(e){
            client.say(channel, `${userstate.username} Error on getting not playing`)
            console.log(`>> ERROR ${e}`)
          } else {
            console.log(r.body)
            if(r.body.length < 60){
              client.say(channel, `${userstate.username} Nothing playing`)
            } else {
              let dat = JSON.parse(r.body)
              if(dat.error !== undefined){
                if(dat.error.message === "The access token expired"){
                  request(`https://api.spotify.com/v1/swap`, requestspotifyrefresh, function(e, r){
                    if(e){
                      console.log(e)
                    } else {
                      console.log(r.body)
                    }
                  })
                }
              } else {
                let songstate = ""
                if(dat.is_playing === false){
                  songstate = "⏸"
                } else {
                  songstate = "▶"
                }
                let playlength = millisToMinutesAndSeconds(parseInt(dat.item.duration_ms))
                let playstate = millisToMinutesAndSeconds(parseInt(dat.progress_ms))
                client.say(channel, `${userstate.username} Currently playing ${dat.item.name} by ${dat.item.album.artists[0].name} ${songstate} (${playstate}/${playlength})`)
              } 
            }
          } 
        })
      }
    }

    if(((message.startsWith(`${pref}reg`)) || (message.startsWith(`${pref}regex`)))){
      if(adminreq){
        // j!reg <add/edit/del/enable/disable/info> <regex name> <(regex)> <action>
        if(message.split(" ")[1] !== undefined){
          let regaction = message.split(" ")[1]
          if(regaction === "add"){
            if(message.split(" ")[2] !== undefined){
              if(!getregex().includes(message.split(" ")[2])){
                if(message.split(" ")[3] !== undefined){
                  if(message.split(" ")[4] !== undefined){
                    let regname = message.split(" ")[2]
                    let regcontentlength = 0
                    if((message.endsWith("-mod")) || (message.endsWith("-vip") || (message.endsWith("-bro")))){
                      regcontentlength = 5
                    }
                    let regregex = message.split(" ")[3]
                    let regcontent = message.substring(message.split(" ")[0].length + regaction.length + regname.length + regregex.length + 3, message.length - regcontentlength)
                    appf(cmdpath, `\n${splitter}${regname}${splitter}${returnperm("1")}${splitter}${regregex}${splitter}${regcontent}`)
                    client.say(channel, `/me [REG] ${userstate.username} Successfully added Regex ${regname}`)
                  } else {
                    client.say(channel, `/me [REG] ${userstate.username} Error: No Regex action given`)
                  }
                } else {
                  client.say(channel, `/me [REG] ${userstate.username} Error: No Regex given`)
                }
              } else {
                client.say(channel, `/me [REG] ${userstate.username} Error: Regex name already in use`)
              }
            }
          } else if(regaction === "delete"){
            if(message.split(" ")[1] !== undefined){
              if(getregex().includes(message.split(" ")[1])){
                fs.writeFileSync(cmdpath, cmdfile.replace((cmdfile.split("\n")[getregex().indexOf(message.split(" ")[1])+1]).toString(), ""))
                client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully deleted Regex ${message.split(" ")[1]}`)
              }
            }
          }
        }
      }
    }

    if(getregexcontent().some(reg => (new RegExp(reg).test(message) === true))){
      client.say(channel, `/me [SYSTEM] ${userstate.username} Detected regex match`)
    }

    function getregex(){
      let ginarr = []
      for(i = 1; i < cmdfile.split("\n").length; i++){
        let ginline = cmdfile.split("\n")[i]
        if(ginline.startsWith(splitter)){
          ginarr.push(ginline)
        }
      }
      return ginarr
    }

    function getregexnames(){
      let ginnarr = []
      for(i = 1; i < cmdfile.split("\n").length; i++){
        let ginnline = cmdfile.split("\n")[i]
        if(ginnline.startsWith(splitter)){
          ginnarr.push(ginnline.split(splitter)[1])
        }
      }
      return ginnarr
    }

    function getregexstate(){
      let ginsarr = []
      for(i = 1; i < cmdfile.split("\n").length; i++){
        let ginsline = cmdfile.split("\n")[i]
        if(ginsline.startsWith(splitter)){
          ginsarr.push(ginsline.split(splitter)[2])
        }
      }
      return ginsarr
    }

    function getregexcontent(){
      let gincarr = []
      for(i = 1; i < cmdfile.split("\n").length; i++){
        let gincline = cmdfile.split("\n")[i]
        if(gincline.startsWith(splitter)){
          gincarr.push(gincline.split(splitter)[3])
        }
      }
      return gincarr
    }

    function getregexaction(){
      let gracarr = []
      for(i = 1; i < cmdfile.split("\n").length; i++){
        let gracline = cmdfile.split("\n")[i]
        if(gracline.startsWith(splitter)){
          gracarr.push(gracline.split(splitter)[4])
        }
      }
      return gracarr
    }

    function reperm(rState){
      let rstatea = rState.split("")[0]
      if(rState.split("")[1] === undefined){
        if(rstatea === "1"){
          return "Enabled - Public"
        } else {
          return "Disabled - Public"
        }
      } else {
        let rstateb = rState.split("")[1]
        if(rstatea === "1"){
          if(rstateb === "v"){
            return "Enabled - Vip (/Mod/Brodcaster)"
          } else if(rstateb === "m"){
            return "Enabled - Mod (/Brodcaster)"
          } else if(rstateb === "b"){
            return "Enabled - Brodcaster"
          }
        } else {
          if(rstateb === "v"){
            return "Disabled - Vip (/Mod/Brodcaster)"
          } else if(rstateb === "m"){
            return "Disabled - Mod (/Brodcaster)"
          } else if(rstateb === "b"){
            return "Disabled - Brodcaster"
          }
        }
      }
    }

    function returnperm(State){
      if(message.endsWith("-mod")){
        return State + "m"
      }
      if(message.endsWith("-vip")){
        return State + "v"
      }
      if(message.endsWith("-bro")){
        return State + "b"
      }
      return State
    }

    function switchstate(stateold){
      let stateolda = stateold.split("")[0]
      if(stateold.split("")[1] === undefined){
        if(stateolda === "1"){
          return 0
        } else if(stateolda === "0"){
          return 1
        }
      } else {
        let stateoldb = stateold.split("")[1]
        if(stateolda === "1"){
          return 0 + stateoldb
        } else if(stateolda === "0"){
          return 1 + stateoldb
        }
      }
    }

    function switchstate2(stateold){
      let stateolda = stateold.split("")[0]
      if(stateold.split("")[1] === undefined){
        if(stateolda === "1"){
          return "0"
        } else if(stateolda === "0"){
          return "1"
        }
      } else {
        let stateoldb = stateold.split("")[1]
        if(stateolda === "1"){
          return "0" + stateoldb
        } else if(stateolda === "0"){
          return "1" + stateoldb
        }
      }
    }

    function requeststream(requestsuser){
      request(`https://api.twitch.tv/helix/streams?user_login=${requestsuser}`, requestopts, function(e, r){
        if(e){
          return 2
        }
        if(r.body.length > 30){
          return r.body
        } else {
          return 0
        }
      })
    }

    function getcmdfilefirst(){
      let firsts = []
      for(i = 1; i < cmdfile.split("\n").length; i++){
        let firstsline = cmdfile.split("\n")[i]
        if(firstsline.startsWith(" ")){
          firsts.push(firstsline.split(splitter)[0])
        } else if(firstsline.startsWith(splitter)){
          firsts.push(firstsline.split(splitter)[1])
        } else {
          firsts.push(firstsline.split(" ")[0])
        }
      }
      return firsts
    }

    function getkeys(){
      let fkeyarr = []
      for(i = 1; i < keyfile.split("\n").length; i++){
        let keylinea = keyfile.split("\n")[i]
        let keyworda = keylinea.split(splitter)[0].substring(1)
        if(keylinea.startsWith(" ")){
          fkeyarr.push(keyworda)
        }
      }
      fkeyarr.sort()
      // console.log(fkeyarr)
      return fkeyarr
    }

    function getkeysb(){
      let fkeyarr = []
      for(i = 1; i < keyfile.split("\n").length; i++){
        let keylinea = keyfile.split("\n")[i]
        let keyworda = keylinea.split(splitter)[0].substring(1)
        if(keylinea.startsWith(" ")){
          fkeyarr.push(keyworda)
        }
      }
      // console.log(fkeyarr)
      return fkeyarr
    }

    function getkeysa(){
      let fkeyarrb = []
      for(i = 1; i < keyfile.split("\n").length; i++){
        let keylineb = keyfile.split("\n")[i]
        if(keylineb.startsWith(" ")){
          let keywordb = keylineb.split(splitter)[0].substring(1)
          if(keywordb.includes("/")){
            for(a = 0; a < keywordb.split("/").length; a++){
              fkeyarrb.push(keywordb.split("/")[a])
            }
          } else {
            fkeyarrb.push(keywordb)
          }
        }
      }
      fkeyarrb.sort()
      // console.log(fkeyarrb)
      return fkeyarrb
    }

    function checkkey(ckey){
      // 1 = true, 2 = false
      let ckeyarr = getkeys()
      if(ckeyarr.includes(ckey)){
        return 1
      } else {
        return 2
      }
    }

    function checkkeya(ckey){
      // 1 = true, 2 = false
      let ckeyarr = getkeysa()
      if(ckeyarr.includes(ckey)){
        return 1
      } else {
        return 2
      }
    }

    function getkeystates(){
      let gkeystates = []
      for(i = 1; i < keyfile.split("\n").length; i++){
        let keylinec = keyfile.split("\n")[i]
        if(keylinec.startsWith(" ")){
          let keywordstate = keylinec.split(splitter)[1]
          gkeystates.push(keywordstate)
        }
      }
      return gkeystates
    }

    function getkeystate(skey){
      let skeystate = ""
      for(i = 1; i < keyfile.split("\n").length; i++){
        let skeyline = keyfile.split("\n")[i]
        let skeykey = skeyline.split(splitter)[0].substring(1)
        let skeystatea = skeyline.split(splitter)[1]
        let skeyarr = []
        if(skeykey.includes("/")){
          for(a = 0; a < skeykey.split("/").length; a++){
            skeyarr.push(skeykey.split("/")[a])
          }
        } else {
          skeyarr.push(skeykey)
        }
        if(skeyarr.some(ke => skey === ke)){
          skeystate = skeystatea
        }
      }
      return skeystate
    }

    function getkeycontent(gkey){
      let gkeyarr = []
      for(i = 1; i < keyfile.split("\n").length; i++){
        let gkeyline = keyfile.split("\n")[i]
        let gkeykey = gkeyline.split(splitter)[0].substring(1)
        let gkeystate = gkeyline.split(splitter)[1]
        let gkeyc = gkeyline.split(splitter)[2]
        if(gkeyline.startsWith(" ")){
          let gkeys = []
          if(gkeykey.includes("/")){
            for(j = 0; j < gkeykey.split("/").length; j++){
              gkeys.push(gkeykey.split("/")[j])
            }
          } else {
            gkeys.push(gkeykey)
          }
          if(gkeys.some(key => gkey === key)){
            return gkeyc
          }
        }
      }
    }

    function getslashcmds(cmdactionaa, ustate, gscnum){
      try {
        //console.log("cmdactionaa " + cmdactionaa)
        if(!cmdactionaa.startsWith("/")){
          return client.say(channel, cmdactionaa)
        }
        let cmdactiona = cmdactionaa.split("/")[1].split(" ")[0]
        if(cmdactionaa.split("/")[1] === undefined){
        } else {
          cmdactiona = cmdactiona.split(" ")[0]
        }
        let cmdsys = cmdactionaa.split(" ")[0]
        let cmdsys1 = ""
        let cmdsys2 = ""
        let cmdsys3 = ""
        let cmdsysa = ""
        let cmdsysb = ""
      
        let cmdsysa1 = cmdactionaa.replace(`${cmdactionaa.split(" ")[0]} `, "")
      
        if(cmdactionaa.split(" ")[1] !== undefined){
          cmdsys1 = cmdactionaa.split(" ")[1]
          if(cmdactionaa.split(" ")[2] !== undefined){
            cmdsysa = cmdactionaa.replace(`${cmdactionaa.split(" ")[0]} ${cmdactionaa.split(" ")[1]} `, "")
          }
        }
        if(cmdactionaa.split(" ")[2] !== undefined){
          cmdsys2 = cmdactionaa.split(" ")[2]
          if(cmdactionaa.split(" ")[3] !== undefined){
            cmdsysb = cmdactionaa.replace(`${cmdactionaa.split(" ")[0]} ${cmdactionaa.split(" ")[1]} ${cmdactionaa.split(" ")[2]} `, "")
          }
        }
        if(cmdactionaa.split(" ")[3] !== undefined){
          cmdsys3 = cmdactionaa.split(" ")[3]
          if(cmdactionaa.split(" ")[4] !== undefined){
            cmdsysc = cmdactionaa.replace(`${cmdactionaa.split(" ")[0]} ${cmdactionaa.split(" ")[1]} ${cmdactionaa.split(" ")[2]} ${cmdactionaa.split(" ")[3]} `, "")
          }
        }
      
        /*if((cmdsys1 === "${1}") || (cmdsys1 === "") || (cmdsys1 === "${1-}")){
          cmdsys1 = 10
        }
      
        if((cmdsys2 === "${2}") || (cmdsys2 === "") || (cmdsys1 === "${2}")){
          cmdsys2 = 10
        }*/
      
        if(cmdactiona === "ban"){
          cmdactiona = client.ban(channel, cmdsys1, cmdsysb)
        } else if(cmdactiona === "unban"){
          cmdactiona = client.unban(channel, cmdsys1)
        } else if(((cmdactiona === ("timeout")) || (cmdactiona === ("to")))){
          if((cmdsys2 === "${2}") || (cmdsys2 === "") || (cmdsys1 === "${2}")){
            cmdsys2 = 10
          }
          cmdactiona = client.timeout(channel, cmdsys1, cmdsys2, cmdsysb)
        } else if(cmdactiona === "untimeout"){
          cmdactiona = client.unban(channel, cmdsys1)
        } else if(((cmdactiona === ("slow")) || (cmdactiona === ("slowmode")))){
          if(cmdsys1 !== undefined){
            if(cmdsys1 === "0"){
              cmdactiona = client.slowoff(channel)
            } else {
              cmdactiona = client.slow(channel, cmdsys1)
            }
          } else {
            cmdactiona = client.slow(channel)
          }
        } else if(((cmdactiona === ("slowoff")) || (cmdactiona === ("slowmodeoff")))){
          cmdactiona = client.slowoff(channel)
        } else if(((cmdactiona === ("emote")) || (cmdactiona === ("emotes")) || (cmdactiona === ("emotesonly")) || (cmdactiona === ("emoteonly")))){
          cmdactiona = client.emoteonly(channel)
        } else if(((cmdactiona === ("emotesoff")) || (cmdactiona === ("emoteoff")) || (cmdactiona === ("emotesonlyoff")) || (cmdactiona === ("emoteonlyoff")))){
          cmdactiona = client.emoteonlyoff(channel)
        } else if(((cmdactiona === ("follower")) || (cmdactiona === ("followers")) || (cmdactiona === ("followersonly")) || (cmdactiona === ("followeronly")))){
          cmdactiona = client.followersonly(channel, cmdsys1)
        } else if(((cmdactiona === ("followeroff")) || (cmdactiona === ("followersoff")) || (cmdactiona === ("followersonlyoff")) || (cmdactiona === ("followeronlyoff")))){
          cmdactiona = client.followersonlyoff(channel)
        } else if(((cmdactiona === ("subs")) || (cmdactiona === ("subscribers")) || (cmdactiona === ("subsonly")) || (cmdactiona === ("subscribersonly")) || (cmdactiona === ("subscriberonly")))){
          cmdactiona = client.subscribers(channel)
        } else if(((cmdactiona === ("subsoff")) || (cmdactiona === ("subscribersoff")) || (cmdactiona === ("subsonlyoff")) || (cmdactiona === ("subscriberonlyoff")) || (cmdactiona === ("subscribersonlyoff")))){
          cmdactiona = client.subscribersoff(channel)
        } else if(((cmdactiona === ("clear")) || (cmdactiona === ("clearchat")))){
          cmdactiona = client.clear(channel)
        } else if(((cmdactiona === ("r9k")) || (cmdactiona === ("r9kbeta")))){
          cmdactiona = client.r9kbeta(channel)
        } else if(((cmdactiona === ("r9koff")) || (cmdactiona === ("r9kbetaoff")))){
          cmdactiona = client.r9kbetaoff(channel)
        } else if(cmdactiona === "say"){
          cmdactiona = client.say(channel, cmdsysa1)
        } else if(cmdactiona === "me"){
          cmdactiona = client.action(channel, cmdsysa1)
        } else if(cmdactiona === "delete"){
          if(gscnum === undefined){
            cmdactiona = client.deletemessage(channel, ustate.id)
          }
        }
          return cmdactiona
        } catch(err){
          console.error(err)
        }
    }

    function replacedefines(mes, chan, content, userstate){
      try {
        for(i = 0; i < content.split(" ").length; i++){
          let contentchar = content.split(" ")[i]
          //console.log(contentchar)
          if(contentchar.includes("${")){
            //console.log("contentstartwith")
            let contentrep = contentchar.split("${")[1]
            if(contentrep.includes("@")){
              contentrep = contentrep.replace("@", "")
              mes = mes.replace(/[@]/g, "")
              content = content.replace("@", "")
            }
    
            if(contentrep.split("}")[0].includes("1,")){
              if(contentrep.split("1,")[1] !== undefined){
                let replaceifemptya = contentrep.split("1,")[1].replace("}", "")
                if(mes.split(" ")[1] !== undefined){
                  content = content.replace("${1," + `${replaceifemptya}` + "}", `${mes.split(" ")[1]}`)
                } else {
                  content = content.replace("${1," + `${replaceifemptya}` + "}", `${replaceifemptya}`)
                }
              }
            } 
            if(contentrep.split("}")[0].includes("2,")){
              if(contentrep.split("2,")[1] !== undefined){
                let replaceifemptyb = contentrep.split("2,")[1].replace("}", "")
                if(mes.split(" ")[2] !== undefined){
                  content = content.replace("${2," + `${replaceifemptyb}` + "}", `${mes.split(" ")[2]}`)
                } else {
                  content = content.replace("${2," + `${replaceifemptyb}` + "}", `${replaceifemptyb}`)
                }
              }
            } 
            if(contentrep.split("}")[0].includes("3,")){
              if(contentrep.split("3,")[1] !== undefined){
                let replaceifemptyc = contentrep.split("3,")[1].replace("}", "")
                if(mes.split(" ")[3] !== undefined){
                  content = content.replace("${3," + `${replaceifemptyc}` + "}", `${mes.split(" ")[3]}`)
                } else {
                  content = content.replace("${3," + `${replaceifemptyc}` + "}", `${replaceifemptyc}`)
                }
              }
            } 
            if(contentrep.split("}")[0].startsWith("1-,")){
              if(contentrep.split("1-,")[1] !== undefined){
                let replaceifemptyaa = contentrep.replace("\s", "").split("1-,")[1].replace("}", "")
                if(mes.split(" ")[1] !== undefined){
                  content = content.replace("${1-," + `${replaceifemptyaa}` + "}", `${mes.substring(mes.split(" ")[0].length+1)}`)
                } else {
                  content = content.replace("${1-," + `${replaceifemptyaa}` + "}", `${replaceifemptyaa}`)
                }
              }
            } 
            if(contentrep.split("}")[0].startsWith("2-,")){
              if(contentrep.split("2-,")[1] !== undefined){
                let replaceifemptyba = contentrep.replace("\s", "").split("2-,")[1].replace("}", "")
                if(mes.split(" ")[2] !== undefined){
                  content = content.replace("${2-," + `${replaceifemptyba}` + "}", `${mes.substring(mes.split(" ")[0].length + mes.split(" ")[1].length +2, message.length)}`)
                } else {
                  content = content.replace("${2-," + `${replaceifemptyba}` + "}", `${replaceifemptyba}`)
                }
              }
            } 
            if(contentrep.split("}")[0].startsWith("3-,")){
              if(contentrep.split("3-,")[1] !== undefined){
                let replaceifemptyca = contentrep.replace("\s", "").split("3-,")[1].replace("}", "")
                if(mes.split(" ")[3] !== undefined){
                  content = content.replace("${3-," + `${replaceifemptyca}` + "}", `${mes.substring(mes.split(" ")[0].length + mes.split(" ")[1].length + mes.split(" ")[2].length +3)}`)
                } else {
                  content = content.replace("${3-," + `${replaceifemptyca}` + "}", `${replaceifemptyca}`)
                }
              }
            } 
            if(contentrep.split("}")[0] === ("channel")){
              if(chan !== undefined){
                content = content.replace("${channel}", `${chan}`)
              } else {
                content = content.replace(contentchar, `${chan}`)
              }
            } 
            if(contentrep.split("}")[0] === ("user")){
              if(userstate.username !== undefined){
                content = content.replace("${user}", `${userstate.username}`)
              } else {
                content = content.replace("${user}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("user.badges")){
              if(userstate.username !== undefined){
                content = content.replace("${user.badges}", `${userstate["badges-raw"]}`)
              } else {
                content = content.replace("${user.badges}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("user.color")){
              if(userstate.username !== undefined){
                content = content.replace("${user.color}", `${userstate.color}`)
              } else {
                content = content.replace("${user.color}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("user.ismod")){
              if(userstate.username !== undefined){
                content = content.replace("${user.ismod}", `${userstate.mod}`)
              } else {
                content = content.replace("${user.ismod}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("user.isvip")){
              if(userstate.username !== undefined){
                content = content.replace("${user.isvip}", `${userstate.vip}`)
              } else {
                content = content.replace("${user.isvip}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("1")){
              if(mes.split(" ")[1] !== undefined){
                content = content.replace("${1}", `${mes.split(" ")[1]}`)
              } else {
                content = content.replace("${1}", "")
              }
              //content = repfilter(content, contentchar, mes, `${mes.split(" ")[1]}`)
            } 
            if(contentrep.split("}")[0] === ("2")){
              if(mes.split(" ")[2] !== undefined){
                content = content.replace("${2}", `${mes.split(" ")[2]}`)
              } else {
                content = content.replace("${2}", "")
              }
              // content = content.replace(contentchar, `${mes.split(" ")[2]}`)
            } 
            if(contentrep.split("}")[0] === ("3")){
              if(mes.split(" ")[3] !== undefined){
                content = content.replace("${3}", mes.split(" ")[3])
              } else {
                content = content.replace("${3}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("1-")){
              if(mes.split(" ")[1] !== undefined){
                content = content.replace("${1-}", `${mes.substr(mes.split(" ")[0].length + 1, 
                mes.length - mes.split(" ")[0].length - 1)}`)
              } else {
                content = content.replace("${1-}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("2-")){
              if(mes.split(" ")[2] !== undefined){
                content = content.replace("${2-}", `${mes.substr(mes.split(" ")[0].length + mes.split(" ")[1].length + 2)}`)
              } else {
                content = content.replace("${2-}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("3-")){
              if(mes.split(" ")[3] !== undefined){
                content = content.replace("${3-}", `${mes.substr(mes.split(" ")[0].length + 
                mes.split(" ")[1].length + mes.split(" ")[2].length/* + mes.split(" ")[3].length */+ 3,)}`)
              } else {
                content = content.replace("${3-}", "")
              }
            } 
            if(contentrep.split("}")[0] === ("1!")){
              if(mes.split(" ")[1] !== undefined){
                content = content.replace("${1!}", mes.split(" ")[1])
              } else {
                return;
              }
            } 
            if(contentrep.split("}")[0] === ("2!")){
              if(mes.split(" ")[2] !== undefined){
                content = content.replace("${2!}", mes.split(" ")[2])
              } else {
                return;
              }
            } 
            if(contentrep.split("}")[0] === ("3!")){
              if(mes.split(" ")[3] !== undefined){
                content = content.replace("${3!}", mes.split(" ")[3])
              } else {
                return;
              }
            } 
            if(contentrep.split("}")[0] === ("1-!")){
              if(mes.split(" ")[1] !== undefined){
                content = content.replace("${1-!}", `${mes.substr(mes.split(" ")[0].length + 1)}`)
              } else {
                return;
              }
            } 
            if(contentrep.split("}")[0] === ("2-!")){
              if(mes.split(" ")[2] !== undefined){
                content = content.replace("${2-!}", `${mes.substr(mes.split(" ")[0].length + mes.split(" ")[1].length + 2)}`)
              } else {
                return;
              }
            } 
            if(contentrep.split("}")[0] === ("3-!")){
              if(mes.split(" ")[3] !== undefined){
                content = content.replace("${3-!}", `${mes.substr(mes.split(" ")[0].length + 
                mes.split(" ")[1].length + mes.split(" ")[2].length/* + mes.split(" ")[3].length */+ 3)}`)
              } else {
                return;
              }
            } 
            if(contentrep.split("}")[0] === ("random")){
              function getRandomInt(max) {
                return Math.floor(Math.random() * max);
              }
              content = content.replace("${random}", getRandomInt(100))
            } 
            if(contentrep.includes("randoma}")){
              function getRandomInt(max) {
                return Math.floor(Math.random() * max);
              }
              if(mes.split(" ")[1] !== undefined){
                if(!mes.split(" ")[1].isNaN){
                  content = content.replace("${randoma}", getRandomInt(mes.split(" ")[1]))
                }
              } else {
                content = content.replace("${randoma}", getRandomInt(100))
              }
            } 
            if(contentrep.split("}")[0] === ("replace")){
              if(mes.split(" ")[1] !== undefined){
                if(mes.split(" ")[2] !== undefined){
                  let replaceterm = mes.split(" ")[1]
                  let replacemes = mes.substr(mes.split(" ")[0].length + mes.split(" ")[1].length +1)
                  content = content.replace("${replace}", replaceall(replaceterm, replacemes))
                }
              }
            } 
            if(contentrep.split("}")[0].includes("date")){
              let d = new Date()
              content = content.replace("${date}", `${d.getFullYear()}-${pad2(d.getMonth())}-${pad2(d.getDay())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`)
              content = content.replace("${date.minute}", pad2(d.getMinutes()))
              content = content.replace("${date2}", Date.now())
              content = content.replace("${date.year}", d.getFullYear())
              content = content.replace("${date.getfullyear}", d.getFullYear())
              content = content.replace("${date.month}", pad2(d.getMonth()+1))
              content = content.replace("${date.day}", pad2(d.getDate()))
              content = content.replace("${date.hour}", pad2(d.getHours()))
              content = content.replace("${date.minute}", pad2(d.getMinutes()))
              content = content.replace("${date.second}", pad2(d.getSeconds()))
              content = content.replace("${date.milliseconds}", d.getMilliseconds())
              content = content.replace("${date.ms}", d.getMilliseconds())
              content = content.replace("${date.dayname}", days[d.getDay()])
              content = content.replace("${date.monthname}", months[d.getMonth()])
              content = content.replace("${date.hourname}", hourslower[d.getHours()])
              content = content.replace("${date.hourname.lower}", hourslower[d.getHours()])
              content = content.replace("${date.hourname.upper}", hoursupper[d.getHours()])
              content = content.replace("${date.12}", `${d.getFullYear()} ${pad2(d.getMonth())}-${pad2(d.getDay())} ${pad2(get12htime(d.getHours(), 3))}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`)
              content = content.replace("${date.12.hour}", get12htime(d.getHours(), 3))
              content = content.replace("${date.12.hour.0}", pad2(get12htime(d.getHours(), 3)))
              content = content.replace("${date.12.hour2}", get12htime(d.getHours(), 1, " "))
              // content = content.replace("${date.12.hour2.0}", get12htime(d.getHours(), 4, " "))
              content = content.replace("${date.12.hour2.1}", get12htime(d.getHours(), 1, ""))
              content = content.replace("${date.12.time}", get12htime(d.getHours(), 2))
              content = content.replace("${date.12.hour.text}", get12htime(d.getHours(), 1, " ", "text"))
              content = content.replace("${date.12.hour.text.lower}", get12htime(d.getHours(), 1, " ", "text", "lower"))
              content = content.replace("${date.12.hour.text.upper}", get12htime(d.getHours(), 1, " ", "text", "upper"))
            
              function get12htime(input, name, namemode, statea, state){
            // INPUT ALWAYS Date.getHours() !
            // e.g.: get12htime(d.getHours(),1,"text","upper")
            
            if(input !== undefined){
              if(input !== isNaN){
                if(input <= 12){
                  if(name === 2){
                    return "am"
                  } 
                  if(name === 3){
                    return input
                  }
                  if(statea === "text"){
                    if(state === "upper"){
                      if(name === 1){
                        return [hoursupper[input] + namemode + "am"]
                      } else {
                        return hoursupper[input]
                      }
                    } else {
                      if(name === 1){
                        return [hourslower[input] + namemode + "am"]
                      } else {
                        return hourslower[input]
                      }
                    }
                  } else {
                    if(name === 1){
                      return [input + namemode + "am"]
                    } else {
                      return input
                    }
                  }
                } else {
                  if(name === 2){
                    return "pm"
                  }
                  if(name === 3){
                    return input
                  }
                  input = (input - 12)
                  if(statea === "text"){
                    if(state === "upper"){
                      if(name === 1){
                        return [hoursupper[input] + namemode + "pm"]
                      } else {
                        return hoursupper[input]
                      }
                    } else {
                      if(name === 1){
                        return [hourslower[input] + namemode + "pm"]
                      } else {
                        return hourslower[input]
                      }
                    }
                  } else {
                    if(name === 1){
                      return [input + namemode + "pm"]
                    } else {
                      return input
                    }
                  }
                }
              }
            }
              }
            } 
            if(contentrep.split("}")[0] === "message.id"){
              content = content.replace("${message.id}", userstate.id)
            } 
            if(contentrep.split("}")[0].includes("lastmsg")){
              let chann = chan.replace(/[#@]/g, "")
              chann = chann.toLowerCase()
              let lastmsgnum = 1
              if(contentrep.split("}")[0].split(",")[1] !== undefined){
                if(!isNaN(contentrep.split("}")[0].split(",")[1])){
                  lastmsgnum = contentrep.split("}")[0].split(",")[1]
                  if(lastmsgnum < rf(`./channels/${chann}/log.txt`).split("\n").length-1){
                    lastmsgnum = rf(`./channels/${chann}/log.txt`).split("\n").length-1
                  }
                } else if(contentrep.split("}")[0].split(",")[1] === "first"){
                  lastmsgnum = rf(`./channels/${chann}/log.txt`).split("\n").length-1
                }
              }
              if(logclient.getChannels().includes(chan)){
                if(rf(`./channels/${chann}/log.txt`).split("\n")[1] !== undefined){
                  let lastmsg = rf(`./channels/${chann}/log.txt`).split("\n")[rf(`./channels/${chann}/log.txt`).split("\n").length-lastmsgnum]
                  // console.log(chann)
                  // console.log(lastmsg)
                  // let lastmsgtimems = lastmsg.split(splitter)[0]
                  // let lastmsgtime = lastmsg.split(splitter)[1]
                  // let lastmsguserbadges = lastmsg.split(splitter)[2]
                  // let lastmsgusername = lastmsg.split(splitter)[3]
                  // let lastmsguserid = lastmsg.split(splitter)[4]
                  // let lastmsgcontent = lastmsg.split(splitter)[5]
                  // let lastmsgid = lastmsg.split(splitter)[6]
                  content = content.replace("${lastmsg.timems}", lastmsg.split(splitter)[0])
                  content = content.replace("${lastmsg.time}", lastmsg.split(splitter)[1])
                  content = content.replace("${lastmsg.user.name}", lastmsg.split(splitter)[3])
                  content = content.replace("${lastmsg.user.id}", lastmsg.split(splitter)[4])
                  content = content.replace("${lastmsg.user.badges}", lastmsg.split(splitter)[2])
                  content = content.replace("${lastmsg.id}", lastmsg.split(splitter)[6])
                  content = content.replace("${lastmsg.content}", lastmsg.split(splitter)[5])
                  break;
                }
              }
            } 
            if(contentrep.split("}")[0] === "uptime"){
              content = content.replace("${uptime}", uptime())
            } 
            if(contentrep.includes("${prefix}")){
              content = content.replace("${prefix}", pref)
            } 
          }
        }
      } catch(err){
        console.error(err)
      }
      return content.replace(/${s}/g, " ")
    }

// Giveaway/Ticket System
// j!ga <add/edit/close//join/leave> <(gatime in m)> <ganame> <gatext>

// Warn/Ban etc system 
// -> Check if file with username exist, if yes read (warns/bans/timeouts/channels) and add 
// warn/ban/timeout/ + channel, else create file 
// Normal Format: 
// channel | x warns x timeouts x bans x messages
// -> New Line new channel
// check with for loop - search 0 split in line, if not check other line, limit: 
// !! search file for channel
    if(message === `${pref}cl`){
      if(adminreq){
        console.clear()
        client.say(channel, `/me [SYSTEM] ${userstate.username} Successfully cleared console`)
      }
    }

    // Chat commands
    switch(message.toLowerCase()) {
      case `${pref}test`:
        client.say(channel, `/me [SYSTEM] ${userstate.username} [JuBot] Test`)
        return;
      case `${pref}list`:
        client.say(channel, `/me [SYSTEM] ${userstate.username} Mod-Actions, Commands etc: https://bit.ly/ju_b0t`);
        return;
      case "!help":
        client.say(channel, `/me [SYSTEM] Help for Jubot: PREFIX >'${pref}'<, commands: '${pref}list'`)
        return;
    }
  });
} catch(err){
  console.error(err)
}

testclient.on("message", (channel, userstate, message, self) => {
  let preft = "j!!"
  if(userstate.username === "jubewe"){
    if(message.startsWith(`${preft}say`)){
      testclient.say(channel, `${message.substring(message.split(" ")[0].length+1, message.split("").length)}`)
    }
    if(message.startsWith(`${preft}send`)){
      let sendchan = channel
      if(message.split(" ")[1] !== undefined){
        sendchan = message.split(" ")[1].replace(/#/g, "")
      }
      if(message.split(" ")[2] !== undefined){
        testclient.say(sendchan, `${message.substring(message.split(" ")[0].length + message.split(" ")[1].length + 2, message.split("").length)}`)
      }
    }

  } else {

  }
})

client.on("disconnected", (reason) => {
  syncdate()
  console.log(`${datea} Disconnected: ${reason}`)
  // setTimeout(function(){client.connect()}, 1000)
})

client.on("connecting", (addr, port) => {
  syncdate()
  console.log(`${datea} Connecting to ${addr}:${port}`)
})

let badgesarr = []
let badgesrawarr = []
let livechan = undefined
// let logtime = Date.now() + "," + datea.replace(" ", "_")

function badgestoarr(ustate){
  if(ustate !== undefined){
    for(i = 0; i < ustate["badges-raw"].split(",").length; i++){
      let badge = ustate["badges-raw"].split(",")[i]
      let badge2 = badge.split("/")[0]
      // console.log(badge2)
      if(badge2 === "admin"){
        badgesarr.push("&")
        badgesrawarr.push(badge)
      } else if(badge2 === "global_mod"){
        badgesarr.push("*")
        badgesrawarr.push(badge)
      } else if(badge2 === "broadcaster"){
        badgesarr.push("~")
        badgesrawarr.push(badge)
      } else if(badge2 === "moderator"){
        badgesarr.push("@")
        badgesrawarr.push(badge)
      } else if(badge2 === "global_mod"){
        badgesarr.push("*")
        badgesrawarr.push(badge)
      } else if(((badge2 === "turbo") || (badge2 === "premium"))){
        badgesarr.push("+")
        badgesrawarr.push(badge)
      } else if(badge2 === "subscriber"){
        badgesarr.push("%")
        badgesrawarr.push(badge)
      } else if(badge2 === "vip"){
        badgesarr.push("!")
        badgesrawarr.push(badge)
      } else if(badge2 === "partner"){
        badgesarr.push("/")
        badgesrawarr.push(badge)
      } else if(badge2 === "glitchcon2020"){
        badgesarr.push("gl20")
        badgesrawarr.push(badge)
      } else if(badge2 === "glhf-pledge"){
        badgesarr.push("glhf")
        badgesrawarr.push(badge)
      } else {
        badgesarr.push("?")
        badgesrawarr.push("?" + badge)
      } 
    }
  }
}

try {
  logclient.on("message", (channel, userstate, message, self) => {
    syncdate2()
    let adminreq = (userstate.username === "jubewe")
    badgesarr = []
    let chan = channel.split("#")[1]
    if(!fs.existsSync(`./channels/${chan}/log.txt`)){
      if(!fs.existsSync(`./channels/${chan}`)){
        fs.mkdirSync(`./channels/${chan}`, {recursive: true})
      }
      appf(`./channels/${chan}/log.txt`, "")
      return;
    }
    // appf(`./channels/${chan}/log.txt`, `\n${Date.now()} ${userstate.username} ${message}`)

    if(userstate["badges-raw"] !== null){

      badgestoarr(userstate)
      // console.log(badgesrawarr.join(","))
    }
    let badgesopts = "-"
    if(badgesarr.length > 0){
      badgesopts = badgesarr.join(",")
    } 
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}${badgesopts}${splitter}${userstate.username}${splitter}${userstate["user-id"]}${splitter}${message}${splitter}${userstate.id}`)
    if(livechan !== undefined){
      if(channel === livechan){
        // newmes = `\n${Date.now()} ${badgesarr.join(",")} ${userstate.username} ${message}`
        newmes = `\n${logtime} ${badgesarr.join(",")} ${userstate.username} ${message} ${userstate.id}`
      }
    } else if(livechan === undefined){
      if(channel === livechan){
        // newmes = `\n${Date.now()} ${badgesarr.join(",")} ${userstate.username} ${message}`
        newmes = `\n${logtime} ${badgesarr.join(",")} ${userstate.username} ${message} ${userstate.id}`
        // oldmes = `\n${Date.now()} ${badgesarr.join(",")} ${userstate.username} ${message}`
        oldmes = `\n${logtime} ${badgesarr.join(",")} ${userstate.username} ${message} ${userstate.id}`
      }
    }

    let logchannelspath = "./appdata/logbot/logchannels.txt"
    if(message.startsWith("j!logs")){
      if(adminreq){
        let logchans = []
        for(i = 0; i < rf(logchannelspath).split(" ").length-1; i++){
          let logchan = rf(logchannelspath).split(" ")[i]
          logchans.push(pixelize(logchan))
        }
        logchans.sort()
        logclient.say(channel, `/me [LOG] ${userstate.username} Logging ${logchans.length} Channels: ${logchans.join(", ")}`)
      }
    }

    if(message.startsWith("j!log")){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          let logchan = message.split(" ")[1].toLowerCase()
          if(logchan.startsWith("#")){
            logchan = logchan.replace("#", "")
          }
          if(!rf(logchannelspath).includes(`${logchan} `)){
            logclient.join(logchan)
            appf(logchannelspath, `${logchan} `)
            client.say(channel, `/me [LOG] ${userstate.username} now logging ${pixelize(logchan)}`)
          } else {
            client.say(channel, `/me [LOG] ${userstate.username} Error: already logging ${pixelize(logchan)}`)
          }
        }
      }
    }

    if(message.startsWith("j!unlog")){
      if(adminreq){
        if(message.split(" ")[1] !== undefined){
          let logchan = message.split(" ")[1].toLowerCase()
          if(logchan.startsWith("#")){
            logchan = logchan.replace("#", "")
          }
          if(rf(logchannelspath).includes(`${logchan} `)){
            logclient.part(logchan)
            fs.writeFileSync(logchannelspath, rf(logchannelspath).replace(`${logchan} `, ""))
            //appf(logchannelspath, rf(logchannelspath).replace(` ${logchan}`, ""))
            client.say(channel, `/me [LOG] ${userstate.username} not longer logging ${pixelize(logchan)}`)
          } else {
            client.say(channel, `/me [LOG] ${userstate.username} Error: not logging ${pixelize(logchan)}`)
          }
        }
      }
    }

  })

  logclient.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
    syncdate2()
    badgesarr = []
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>!-${splitter}${username}${splitter}${deletedMessage}${splitter}${userstate["target-msg-id"]}`)
  })

  logclient.on("ban", (channel, username, reason) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>!!${splitter}${badgesarr.push()}${splitter}${username}${splitter}${reason}`)
  })

  logclient.on("clearchat", (channel) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>!c`)
  })

  logclient.on("emoteonly", (channel, enabled) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>em*${splitter}${returnstate(enabled)}`)
  })

  function returnstate(n) { return n === true ? 'Off' : "On" }
  logclient.on("followersonly", (channel, enabled, length) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>f*${splitter}${returnstate(enabled)}${splitter}${length}`)
  })

  logclient.on("hosted", (channel, username, viewers, autohost) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>~h${splitter}${username}${splitter}${viewers}`)
  })

  logclient.on("hosting", (channel, target, viewers) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>h~${splitter}${target}${splitter}${viewers}`)
  })

  logclient.on("unhost", (channel, viewers) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>h~!${splitter}${viewers}`)
  })

  logclient.on("notice", (channel, msgId, message) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>~~${splitter}${msgId}${splitter}${message}`)
  })

  logclient.on("raided", (channel, username, viewers) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>~r${splitter}${username}${splitter}${viewers}`)
  })

  logclient.on("slowmode", (channel, enabled, length) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>sl*${splitter}${returnstate(enabled)}${splitter}${length}`)
  })

  logclient.on("timeout", (channel, username, reason, duration) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>!t${splitter}${username}${splitter}${duration}${splitter}${reason}`)
  })

  logclient.on("mod", (channel, username) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>m+${splitter}${username}`)
  })

  logclient.on("unmod", (channel, username) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>m-${splitter}${username}`)
  })

  logclient.on("subscription", (channel, username, methods, message, userstate) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>su${splitter}${username}${splitter}${userstate["msg-param-streak-months"]}${splitter}${methods.plan}${splitter}${message}`)
  })

  logclient.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>sug${splitter}${username}${splitter}${recipient}${splitter}${streakMonths}${splitter}${methods.plan}`)
  })

  logclient.on("resub", (channel, username, streakMonths, message, userstate, methods) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>sur${splitter}${username}${splitter}${streakMonths}${splitter}${methods.plan}${splitter}${message}`)
  })

  logclient.on("r9kbeta", (channel, enabled) => {
    syncdate2()
    chan = channel.split("#")[1]
    appf(`./channels/${chan}/log.txt`, `\n${logtime}${splitter}>r9*${splitter}${returnstate(enabled)}`)
  })

} catch(err) {
  console.error("LOGERR " +err)
} 

client.on("whisper", (sender, userstate, message) => {
  client.say("#jubewe", `[SYSTEM] jubewe | Recieved whisper from ${sender.replace("#", "")}: "${message}"`)
})

client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
  /* */
  conc()
  console.log("#" + connum, "!-", channel, "@" + username + ":", deletedMessage)
  return;
});

client.on("ban", (channel, username, reason, userstate) => {
  /* */
  conc()
  console.log("#" + connum, "!!", channel, "@" + username, "|", reason)
  return;
});

client.on("timeout", (channel, username, reason, duration) => {
  /* */
  conc()
  console.log("#" + connum, "!t", channel, username, "(" + duration, "-", reason + ")")
  return;
});

client.on("clearchat", (channel) => {
  /* */
  conc()
  console.log("#" + connum, "!c", channel)
  return;
});

client.on("automod", (channel, msgId, message) => {
  /* */
  conc()
  console.log(`#${connum} *! ${channel} | ${message} [${msgId}]`)
  return;
});

client.on("mod", (channel, username) => {
  /* */
  conc()
  console.log("#" + connum, "m+", channel, "@" + username)
  return;
});

client.on("unmod", (channel, username) => {
  /* */
  conc()
  console.log("#" + connum, "m-", channel, "@" + username)
  return;
});

client.on("redeem", (channel, username, rewardType, tags) => {
  /* */
  conc()
  console.log("#" + connum, "re", channel, "@" + username, rewardType)
  return;
});

client.on("hosting", (channel, target, viewers) => {
  /* */
  conc()
  console.log("#" + connum, "h~", channel, "->", target, "("+ viewers +")")
  return;
});

client.on("raided", (channel, username, viewers) => {
  /* */
  conc()
  console.log("#" + connum, "~r", channel, "<-", username, "("+ viewers +")")
  return;
});

client.on("hosted", (channel, username, viewers, autohost) => {
  /* */
  conc()
  console.log("#" + connum, "~h", channel, "<-", username, "("+ viewers +")")
  return;
});

client.on("notice", (channel, msgId, message) => {
  conc()
  console.log("#" + connum, "~~", channel, msgId, message)
});

client.on("r9kbeta", (channel, enabled) => {
  /* */
  conc()
  console.log("#" + connum, "r9*", channel, "->", enabled)
  return;
});

client.on("slowmode", (channel, enabled, length) => {
  /* */
  conc()
  console.log("#" + connum, "sl*", channel, "->", enabled, "("+ length +")")
  return;
});

client.on("emoteonly", (channel, enabled) => {
  /* */
  conc()
  console.log("#" + connum, "em*", channel, "->", enabled)
  return;
});

client.on("followersonly", (channel, enabled, length) => {
  /* */
  conc()
  console.log("#" + connum, "f*", channel, "->", enabled, "("+ length +")")
  return;
});

client.on("subscribers", (channel, enabled) => {
  /* */
  conc()
  console.log("#" + connum, "su*", channel, "->", enabled)
  return;
})

// Connect to Channel chat 
function onConnectedHandler(addr, port) {
  console.log()
  console.log("      ## ##     ## ########   #######  ######## ")
  console.log("      ## ##     ## ##     ## ##     ##    ##    ")
  console.log("      ## ##     ## ##     ## ##     ##    ##    ")
  console.log("      ## ##     ## ########  ##     ##    ##    ")
  console.log("##    ## ##     ## ##     ## ##     ##    ##    ")
  console.log("##    ## ##     ## ##     ## ##     ##    ##    ")
  console.log(" ######   #######  ########   #######     ##    ")
  console.log("")
  console.log(">>> Connected to Chat <<<")
  console.log(`>>> ${addr}:${port} <<<`);
  client.ping()
  .then((data) => {
  console.log(`>>> Ping: ${data} <<<`)})
};

function onConnectedHandler2(addr, port){
  console.log(`> Connecting to ${addr}:${port}`)
}