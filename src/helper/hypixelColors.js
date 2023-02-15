const hypixelRankColors = {
  RED: '#FF5555',
  GOLD: '#FFAA00',
  GREEN: '#55FF55',
  YELLOW: '#FFFF55',
  LIGHT_PURPLE: '#FF55FF',
  WHITE: '#FFFFFF',
  BLUE: '#5555FF',
  DARK_GREEN: '#00AA00',
  DARK_RED: '#AA0000',
  DARK_AQUA: '#00AAAA',
  DARK_PURPLE: '#AA00AA',
  DARK_GRAY: '#555555',
  BLACK: '#000000',
  DARK_BLUE: '#0000AA',
};

function starColor(stars) {
  if (stars < 100) {return `<span style="color: #AAAAAA;">[${stars}✫]</span>`;}
  else if (stars < 200)
    {return `<span style="color: #FFFFFF">[${stars}✫]</span>`;}
  else if (stars < 300)
    {return `<span style="color: #FFAA00">[${stars}✫]</span>`;}
  else if (stars < 400)
    {return `<span style="color: #55FFFF">[${stars}✫]</span>`;}
  else if (stars < 500)
    {return `<span style="color: #00AA00">[${stars}✫]</span>`;}
  else if (stars < 600)
    {return `<span style="color: #00AAAA">[${stars}✫]</span>`;}
  else if (stars < 700)
    {return `<span style="color: #AA0000">[${stars}✫]</span>`;}
  else if (stars < 800)
    {return `<span style="color: #FF55FF">[${stars}✫]</span>`;}
  else if (stars < 900)
    {return `<span style="color: #5555FF">[${stars}✫]</span>`;}
  else if (stars < 1000)
    {return `<span style="color: #AA00AA">[${stars}✫]</span>`;}
  else
    {return `<span style="color: #FF5555">[<span style="color: #FFAA00">1</span><span style="color: #FFFF55">${Math.floor(
      (stars % 1000) / 100
    )}</span><span style="color: #55FF55">${Math.floor(
      (stars % 100) / 10
    )}</span><span style="color: #55FFFF">${
      stars % 10
    }</span><span style="color: #FF55FF">✯</span><span style="color: #AA00AA">]</span>`;}
}

function nameColor(player) {
  const rank = player.rank;
  let plus = player.plus_color;
  if (plus !== undefined) {
    plus = HypixelColors[plus];
  } else {plus = '#FF5555';}
  if (rank.rank !== undefined) {
    if (rank.rank === 'YOUTUBER')
      {return `<span style="color: #FF5555;">[</span><span style="color: #FFFFFF;">YT</span><span style="color: #FF5555;">] ${rank.displayname}</span>`;}
    else if (rank.rank === 'ADMIN')
      {return `<span style="color: #AA0000">[ADMIN] ${rank.displayname}</span>`;}
    else if (rank.rank === 'MODERATOR')
      {return `<span style="color: #00AA00">[MOD] ${rank.displayname}</span>`;}
    else if (rank.rank === 'GAME_MASTER')
      {return `<span style="color: #00AA00">[GM] ${rank.displayname}</span>`;}
  }
  if (rank === 'MVP++') {
    return `<span style="color: #FFAA00;">[MVP</span><span style="color: ${plus}">++</span><span style="color: #FFAA00;">] ${player.displayname}</span>`;
  } else if (rank === 'MVP+') {
    return `<span style="color: #55FFFF;">[MVP</span><span style="color: ${plus}">+</span><span style="color: #55FFFF;">] ${player.displayname}</span>`;
  } else if (rank === 'MVP')
    {return `<span style="color: #55FFFF;">[MVP] ${player.displayname}</span>`;}
  else if (rank === 'VIP+')
    {return `<span style="color: #55FF55;">[VIP</span><span style="color: #FFAA00;">+</span><span style="color: #55FF55;">] ${player.displayname}</span>`;}
  else if (rank === 'VIP')
    {return `<span style="color: #55FF55;">[VIP] ${player.displayname}</span>`;}
  else {return `<span style="color: #AAAAAA;">${player.displayname}</span>`;}
}

function wsColor(ws) {
  try {
    if (ws < 4) {return `<span style="color: #AAAAAA">${ws}</span>`;}
    else if (ws < 10)
      {return `<span style="color: #FFFFFF">${ws}</span>`;} //100 stars
    else if (ws < 25)
      {return `<span style="color: #FFAA00">${ws}</span>`;} //200 stars
      // TODO ask lxgg about this
      // eslint-disable-next-line
    else if (ws < 25)
      {return `<span style="color: #00AAAA">${ws}</span>`;} //500 stars
    else if (ws < 100)
      {return `<span style="color: #AA0000">${ws}</span>`;} //600 stars
    else {return `<span style="color: #AA00AA">${ws}</span>`;} //900 stars
  } catch {
    return `<span style="color: #AAAAAA">${ws}</span>`;
  }
}

function fkdrColor(fkdr) {
  try {
    if (fkdr < 1) {return `<span style="color: #AAAAAA">${fkdr}</span>`;}
    else if (fkdr < 3)
      {return `<span style="color: #FFFFFF">${fkdr}</span>`;} //100 stars
    else if (fkdr < 5)
      {return `<span style="color: #FFAA00">${fkdr}</span>`;} //200 stars
    else if (fkdr < 10)
      {return `<span style="color: #00AAAA">${fkdr}</span>`;} //500 stars
    else if (fkdr < 25)
      {return `<span style="color: #AA0000">${fkdr}</span>`;} //600 stars
    else {return `<span style="color: #AA00AA">${fkdr}</span>`;} //900 stars
  } catch {
    return `<span style="color: #AAAAAA">${fkdr}</span>`;
  }
}

function wlrColor(wlr) {
  try {
    if (wlr < 1) {return `<span style="color: #AAAAAA">${wlr}</span>`;}
    else if (wlr < 2)
      {return `<span style="color: #FFFFFF">${wlr}</span>`;} //100 stars
    else if (wlr < 5)
      {return `<span style="color: #FFAA00">${wlr}</span>`;} //200 stars
    else if (wlr < 7)
      {return `<span style="color: #00AAAA">${wlr}</span>`;} //500 stars
    else if (wlr < 10)
      {return `<span style="color: #AA0000">${wlr}</span>`;} //600 stars
    else {return `<span style="color: #AA00AA">${wlr}</span>`;} //900 stars
  } catch {
    return `<span style="color: #AAAAAA">${wlr}</span>`;
  }
}

function finalsColor(finals) {
  try {
    if (finals < 1000)
      {return `<span style="color: #AAAAAA">${finals}</span>`;} //100 stars
    else if (finals < 5000)
      {return `<span style="color: #FFFFFF">${finals}</span>`;} //200 stars
    else if (finals < 10000)
      {return `<span style="color: #FFAA00">${finals}</span>`;} //500 stars
    else if (finals < 20000)
      {return `<span style="color: #00AAAA">${finals}</span>`;} //600 stars
    else if (finals < 30000)
      {return `<span style="color: #AA0000">${finals}</span>`;}
    else {return `<span style="color: #AA00AA">${finals}</span>`;} //900 stars
  } catch {
    return `<span style="color: #AAAAAA">${finals}</span>`;
  }
}

function winsColor(wins) {
  try {
    if (wins < 500) {return `<span style="color: #AAAAAA">${wins}</span>`;}
    else if (wins < 1000)
      {return `<span style="color: #FFFFFF">${wins}</span>`;} //100 stars
    else if (wins < 2000)
      {return `<span style="color: #FFAA00">${wins}</span>`;} //200 stars
    else if (wins < 5000)
      {return `<span style="color: #00AAAA">${wins}</span>`;} //500 stars
    else if (wins < 10000)
      {return `<span style="color: #AA0000">${wins}</span>`;} //600 stars
    else {return `<span style="color: #AA00AA">${wins}</span>`;} //900 stars
  } catch {
    return `<span style="color: #AAAAAA">${wins}</span>`;
  }
}

function bblrColor(bblr) {
  try {
    if (bblr < 1) {return `<span style="color: #AAAAAA">${bblr}</span>`;}
    else if (bblr < 2)
      {return `<span style="color: #FFFFFF">${bblr}</span>`;} //100 stars
    else if (bblr < 3)
      {return `<span style="color: #FFAA00">${bblr}</span>`;} //200 stars
    else if (bblr < 5)
      {return `<span style="color: #00AAAA">${bblr}</span>`;} //500 stars
    else if (bblr < 7.5)
      {return `<span style="color: #AA0000">${bblr}</span>`;} //600 stars
    else {return `<span style="color: #AA00AA">${bblr}</span>`;} //900 stars
  } catch {
    return `<span style="color: #AAAAAA">${bblr}</span>`;
  }
}

module.exports = {
  starColor,
  nameColor,
  wsColor,
  fkdrColor,
  wlrColor,
  finalsColor,
  winsColor,
  bblrColor,
};
