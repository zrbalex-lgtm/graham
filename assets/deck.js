/* ============================================================
   Graham's number — deck engine, drawings, animations and toys
   ============================================================ */
(function () {
"use strict";

var deck = document.getElementById('deck');
var slides = [].slice.call(deck.querySelectorAll('.slide'));
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var showAll = /[?&]all\b/.test(location.search);

/* ---------- speaker cues, one per slide ---------- */
var NOTES = [
"Я не смогу вам его показать. Никто на Земле не может его записать. И при этом это обычное конечное число — не бесконечность.",
"Пусть назовут. Кто-то скажет «плюс один» — это и есть ловушка: в эту игру нельзя выиграть. Наш вопрос другой: до какого места мы вообще способны что-то представить?",
"Одна точка. Запомните её размер — все следующие будут ровно такими же, меняется только количество.",
"Десять видно все сразу, без пальца. На Луне побывало 12 человек — за всю историю, все имена на одной странице.",
"Квадратик 10×10, красная — один процент. Спроси: сколько тут точек, если не считать? — мы перестали считать и начали узнавать форму.",
"Тысяча рядом со ста — сто теперь как марка на конверте. В сутках 1440 минут: весь ваш день — вот это поле.",
"Тут глаз сдаётся первым, раньше мозга: вы видите уже не точки, а серое пятно. Полный стадион — у каждого лицо и имя.",
"Самый большой стадион мира. Разница с прошлым слайдом в десять раз, а голова её уже почти не чувствует. <b>Мы только что перестали различать масштабы.</b>",
"4,5 метра бумаги. Красная точка — та самая единица, с которой начали. Спроси: миллион секунд — это сколько? (11,5 суток, полторы недели назад)",
"Неделя → целая жизнь → неандертальцы. Мы дописывали три нолика. <b>Маленькое изменение в записи = чудовищное изменение в числе. Это главный урок дня.</b>",
"Свет: 7,5 раз вокруг Земли за секунду. До ближайшей звезды 4,2 световых года — сорок триллионов км. До ближайшей.",
"Столько муравьёв ползает сейчас по планете. По общему весу — примерно как всё человечество.",
"Все пляжи планеты, каждая песчинка. Запомните это число, мы к нему вернёмся в неожиданном месте.",
"Всё предыдущее было про огромные пространства. А это — стакан воды в руке. Большие числа не живут далеко, они прячутся в мелком.",
"Разобрали на атомы всю Вселенную до самого края. Это потолок реальности: дальше считать нечего, предметы кончились. Спроси: а математика кончилась? <b>Дальше — ползунок: дай покрутить детям, пусть сами дойдут от точки до гугола.</b>",
"Сто нулей помещаются в три строчки. Это в сто миллиардов миллиардов раз больше, чем всё вещество Вселенной. Название придумал 9-летний племянник математика Каснера.",
"52 карты. Перетасуйте — и, скорее всего, в таком порядке эти карты не лежали никогда за всю историю Вселенной. Гигантское число в кармане.",
"Пишем по одному нолику на атом, каждому атому Вселенной. Атомов не хватит в сто миллиардов миллиардов раз. Записать гуголплекс физически невозможно.",
"Стоп. Мы всё время приписывали нули, и упёрлись. Значит, менять надо не число — <b>менять надо операцию.</b>",
"<b>Главный вопрос дня.</b> Сложение много раз = умножение. Умножение много раз = степень. А степень много раз? Дай им помолчать: кто-то скажет «степень степени» — это правильный ответ.",
"Одна стрелка — просто степень, новая одежда для старого знакомого. Самое сложное позади: дальше только добавляем стрелки.",
"Две стрелки = башня из троек. Считаем СВЕРХУ: 3³=27, значит вся башня — 3²⁷. Три тройки — и семь с половиной триллионов.",
"Добавили одну тройку — 3,6 трлн цифр. Спроси: сколько это читать вслух по цифре в секунду? (больше ста тысяч лет). <b>Дальше ползунок: пусть сами добавляют тройки и смотрят, как число взрывается.</b>",
"Три стрелки говорят, какой высоты строить башню. 7,6 трлн троек по 2 см — ровно до Солнца. И посчитать надо всю, сверху донизу. Внизу только первые 13 троек — а это уже больше всего, что было в первой половине.",
"Восемь символов. Пусть повисит в тишине. Гуголплекс рядом с этим неотличим от нуля — и мы ещё даже не дошли до первого шага.",
"Четыре стрелки: посчитай башню до Солнца, и это — количество башен дальше. Тут я честно поднимаю руки, образов больше нет. И это только разминка.",
"Стрелок теперь g₁ штук. Не четыре, не гугол. Мы увеличиваем уже не число и даже не действие, а количество ступенек на лестнице действий. <b>Кнопки внизу — прокрутить всю лестницу ещё раз, если кто-то потерялся.</b>",
"Спроси: сколько раз повторить? — шестьдесят четыре. g₁ по сравнению с g₂ — фактически ноль, и так 64 раза подряд.",
"Информация имеет вес: если удержать в голове все цифры, голова схлопнется в чёрную дыру. Буквально. Это число нельзя знать — его можно только определить.",
"Хвост зависит только от хвоста: 3, 9, 27, 81, 243 → 3, 9, 7, 1… Поэтому конец знаем, а начало и длину — нет. Последняя цифра 7, значит число нечётное — как я обещал в начале.",
"Оно не придумано ради рекорда, а вылезло из нормальной задачки. <b>Дай им поиграть: пусть попробуют раскрасить шесть точек без одноцветного треугольника. Это невозможно — и в этом вся суть задачи Грэма, только у него вместо треугольников квадраты, а вместо плоскости много измерений.</b>",
"Финальная шутка: число Грэма — это была оценка СВЕРХУ. Настоящий ответ, похоже, 13. 1980 — Книга рекордов Гиннесса.",
"Сложение много раз — умножение, умножение много раз — степень, степень — башня, башня — стрелки, стрелки — g₁, g — число Грэма. Один и тот же вопрос, заданный шесть раз, увёл нас за край Вселенной. Голова не может его вместить, но смогла построить — из трёх троек и одной хорошей идеи."
];

/* ---------- helpers ---------- */
function group(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

/* ---------- chalk dot fields ---------- */
var row10 = document.getElementById('row10');
for (var i = 0; i < 10; i++) {
  var e = document.createElement('div');
  e.className = 'd';
  e.style.animationDelay = (i * 45) + 'ms';
  row10.appendChild(e);
}
var g100 = document.getElementById('grid100');
for (var j = 0; j < 100; j++) {
  var c = document.createElement('div');
  c.className = 'd' + (j === 43 ? ' r' : '');
  c.style.animationDelay = (j * 7) + 'ms';
  g100.appendChild(c);
}

[].forEach.call(document.querySelectorAll('canvas.dots'), function (cv) {
  var n = +cv.dataset.n, cols = +cv.dataset.cols, p = +cv.dataset.pitch, r = +cv.dataset.r;
  var rows = Math.ceil(n / cols);
  cv.width = cols * p; cv.height = rows * p;
  var ctx = cv.getContext('2d');
  var redIdx = Math.floor(rows * 0.42) * cols + Math.floor(cols * 0.46);
  if (p <= 3) {
    var img = ctx.createImageData(cv.width, cv.height), d = img.data;
    for (var i = 0; i < n; i++) {
      var x = (i % cols) * p + 1, y = Math.floor(i / cols) * p + 1, o = (y * cv.width + x) * 4;
      d[o] = 236; d[o + 1] = 231; d[o + 2] = 217; d[o + 3] = 235;
    }
    ctx.putImageData(img, 0, 0);
    // the marker has to survive heavy downscaling on a projector
    var rx = (redIdx % cols) * p + 1, ry = Math.floor(redIdx / cols) * p + 1;
    ctx.fillStyle = '#e4685a'; ctx.beginPath(); ctx.arc(rx, ry, 14, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = 'rgba(228,104,90,.85)'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(rx, ry, 58, 0, 6.2832); ctx.stroke();
    ctx.lineWidth = 5; ctx.beginPath();
    ctx.moveTo(rx + 44, ry - 44); ctx.lineTo(rx + 200, ry - 200); ctx.stroke();
    ctx.font = 'bold 92px monospace'; ctx.textBaseline = 'bottom';
    ctx.fillText('1', rx + 210, ry - 190);
  } else {
    ctx.fillStyle = '#ece7d9';
    for (var k = 0; k < n; k++) {
      var X = (k % cols) * p + p / 2, Y = Math.floor(k / cols) * p + p / 2;
      ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.2832); ctx.fill();
    }
  }
});

/* ================= generated plates =================
   Slides 12, 13, 14, 15, 24 and 29 load real image files from img/.
   Only the light year (11) and the cards (17) are drawn by code.   */

/* --- light year (slide 11) --- */
(function () {
  var cv = document.getElementById('ly'), x = cv.getContext('2d'), W = cv.width, H = cv.height;
  var sky = x.createLinearGradient(0, 0, W, 0);
  sky.addColorStop(0, '#1a1330'); sky.addColorStop(.45, '#0d1026'); sky.addColorStop(1, '#05060f');
  x.fillStyle = sky; x.fillRect(0, 0, W, H);
  for (var i = 0; i < 420; i++) {
    var s = Math.random();
    x.fillStyle = 'rgba(255,255,255,' + (0.1 + s * 0.6) + ')';
    x.fillRect(Math.random() * W, Math.random() * H, s > .95 ? 2 : 1, s > .95 ? 2 : 1);
  }
  var gl = x.createRadialGradient(110, 150, 4, 110, 150, 150);
  gl.addColorStop(0, '#fff6d5'); gl.addColorStop(.13, '#ffd166');
  gl.addColorStop(.34, 'rgba(255,140,40,.45)'); gl.addColorStop(1, 'rgba(255,120,20,0)');
  x.fillStyle = gl; x.beginPath(); x.arc(110, 150, 150, 0, 6.2832); x.fill();
  x.fillStyle = '#fff3cf'; x.beginPath(); x.arc(110, 150, 38, 0, 6.2832); x.fill();
  x.strokeStyle = 'rgba(255,214,120,.6)'; x.lineWidth = 3; x.setLineDash([16, 13]);
  x.beginPath(); x.moveTo(170, 150); x.lineTo(890, 150); x.stroke(); x.setLineDash([]);
  var st = x.createRadialGradient(925, 150, 1, 925, 150, 46);
  st.addColorStop(0, '#ffffff'); st.addColorStop(.16, '#cfe4ff');
  st.addColorStop(1, 'rgba(120,170,255,0)');
  x.fillStyle = st; x.beginPath(); x.arc(925, 150, 46, 0, 6.2832); x.fill();
  x.font = '500 19px system-ui,sans-serif'; x.fillStyle = 'rgba(255,255,255,.78)';
  x.fillText('Солнце', 74, 244);
  x.textAlign = 'right'; x.fillText('ближайшая звезда — 4,2 св. года', 962, 244); x.textAlign = 'left';
})();

/* --- deck of cards (slide 17) --- */
(function () {
  var svg = document.getElementById('cards');
  var faces = [['A','♠'],['K','♥'],['7','♦'],['Q','♣'],['10','♥'],['J','♠'],['4','♦'],['9','♣'],['A','♥']];
  var s = '<defs><radialGradient id="felt" cx="50%" cy="40%">'
        + '<stop offset="0%" stop-color="#2f6b52"/><stop offset="100%" stop-color="#13342a"/>'
        + '</radialGradient></defs>'
        + '<rect width="760" height="420" fill="url(#felt)"/>';
  for (var i = 0; i < 9; i++) {
    var a = -40 + i * 10, red = faces[i][1] === '♥' || faces[i][1] === '♦';
    var col = red ? '#c0392b' : '#232a2e';
    s += '<g transform="translate(380 400) rotate(' + a + ')">'
       + '<rect x="-64" y="-300" width="128" height="196" rx="11" fill="#fdfcf8"'
       + ' stroke="#cfc9ba" stroke-width="1.6"/>'
       + '<text x="-52" y="-268" font-family="Georgia,serif" font-size="30" font-weight="700" fill="' + col + '">' + faces[i][0] + '</text>'
       + '<text x="-52" y="-240" font-size="26" fill="' + col + '">' + faces[i][1] + '</text>'
       + '<text x="0" y="-186" font-size="60" fill="' + col + '" text-anchor="middle">' + faces[i][1] + '</text>'
       + '</g>';
  }
  svg.innerHTML = s;
})();

/* ---------- chalk bits ---------- */
document.getElementById('googol').innerHTML = '<b>1</b>' + new Array(101).join('0');

function tower(id, count, h) {
  var g = document.getElementById(id), s = '', y = h - 14, size = 30;
  for (var i = 0; i < count; i++) {
    s += '<text x="' + (6 + i * 5) + '" y="' + y + '" style="font-size:' + size + 'px">3</text>';
    y -= size * 0.92; size *= 0.86;
  }
  g.innerHTML = s;
}
tower('t3', 3, 150); tower('t4', 4, 190); tower('t5', 5, 230);

function completeGraph(id, pts, colors) {
  var s = '', i, j, k = 0;
  for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) {
    s += '<path class="s thin ' + colors[k++ % colors.length] + '" opacity=".85" d="M'
       + pts[i][0] + ' ' + pts[i][1] + ' L' + pts[j][0] + ' ' + pts[j][1] + '"/>';
  }
  for (i = 0; i < pts.length; i++) {
    s += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="5.5" fill="var(--chalk)"/>';
  }
  document.getElementById(id).innerHTML = s;
}
completeGraph('k4', [[10,10],[190,10],[190,190],[10,190]], ['red','blue','red','blue','blue','red']);
completeGraph('k8', [[20,60],[160,60],[160,200],[20,200],[80,20],[220,20],[220,160],[80,160]],
  ['red','blue','blue','red','blue','red','red','blue']);

/* ============================================================
   Animations fired when a slide becomes active
   ============================================================ */
var runningTimers = [];
function clearTimers() {
  runningTimers.forEach(function (id) { cancelAnimationFrame(id); });
  runningTimers = [];
}

function countUp(el) {
  var target = +el.dataset.count;
  if (!target) return;
  if (reduce) { el.textContent = group(target); return; }
  var t0 = null, dur = 1000;
  function frame(ts) {
    if (t0 === null) t0 = ts;
    var k = Math.min(1, (ts - t0) / dur);
    el.textContent = group(Math.round(target * easeOut(k)));
    if (k < 1) runningTimers.push(requestAnimationFrame(frame));
  }
  runningTimers.push(requestAnimationFrame(frame));
}

var ARROW_WALL = 'g₂ = 3 ' + new Array(430).join('↑') + '… 3';
var arrowsEl = document.getElementById('arrows');
function floodArrows() {
  if (reduce) { arrowsEl.textContent = ARROW_WALL; return; }
  var t0 = null, dur = 1400;
  function frame(ts) {
    if (t0 === null) t0 = ts;
    var k = Math.min(1, (ts - t0) / dur);
    arrowsEl.textContent = ARROW_WALL.slice(0, Math.round(ARROW_WALL.length * easeOut(k)));
    if (k < 1) runningTimers.push(requestAnimationFrame(frame));
  }
  runningTimers.push(requestAnimationFrame(frame));
}

function animateSlide(idx) {
  clearTimers();
  [].forEach.call(slides[idx].querySelectorAll('[data-count]'), countUp);
  if (slides[idx].querySelector('#arrows')) floodArrows();
}

/* ============================================================
   Toy 1 — powers of ten slider (slide 15)
   ============================================================ */
(function () {
  // [exponent, plain text for small values or null, caption]
  var SCALE = [
    [0, '1', 'одна точка — с неё мы начали'],
    [1, '10', 'пальцев на руках'],
    [2, '100', 'лет живут самые старые люди'],
    [3, '1 000', 'минут в сутках — почти, их 1440'],
    [4, '10 000', 'полный стадион'],
    [5, '100 000', 'волос на голове'],
    [6, null, 'секунд в 11,5 днях'],
    [9, null, 'секунд в 32 годах'],
    [12, null, 'секунд в 31 700 годах — со времён неандертальцев'],
    [13, null, 'километров в одном световом годе'],
    [15, null, 'муравьёв на Земле'],
    [18, null, 'песчинок на всех пляжах Земли'],
    [23, null, 'молекул в ложке воды'],
    [25, null, 'молекул в стакане воды'],
    [50, null, 'атомов во всей Земле'],
    [57, null, 'атомов в Солнце'],
    [68, null, 'способов перетасовать колоду карт'],
    [80, null, 'атомов во всей наблюдаемой Вселенной'],
    [100, null, 'гугол — считать уже нечего']
  ];
  var range = document.getElementById('scaleRange');
  var numEl = document.getElementById('scaleNum');
  var capEl = document.getElementById('scaleCap');
  range.max = SCALE.length - 1;
  function paint() {
    var row = SCALE[+range.value];
    numEl.innerHTML = row[1] ? row[1] : '10<sup>' + row[0] + '</sup>';
    capEl.textContent = row[2];
    numEl.classList.toggle('gold', row[0] >= 80);
  }
  range.addEventListener('input', paint);
  paint();
})();

/* ============================================================
   Toy 2 — build the tower yourself (slide 23)
   ============================================================ */
(function () {
  var TOWER = [
    ['3', 'одна тройка — это просто тройка'],
    ['27', 'две тройки — двадцать семь'],
    ['7 625 597 484 987', 'три тройки — семь с половиной триллионов'],
    ['число из 3 638 334 640 025 цифр', 'четыре тройки. прочитать вслух — 115 тысяч лет'],
    ['в нём столько цифр, что само их количество — число из 3,6 триллиона цифр',
     'пять троек. это уже больше гуголплекса'],
    ['длину этого числа описать уже нечем', 'шесть троек. а мы всё ещё на двух стрелках']
  ];
  var range = document.getElementById('towerRange');
  var val = document.getElementById('towerVal');
  var cap = document.getElementById('towerCap');
  var svg = document.getElementById('towerPreview');
  function paint() {
    var n = +range.value, row = TOWER[n - 1];
    val.textContent = row[0];
    val.classList.toggle('long', row[0].length > 24);
    val.classList.toggle('gold', n >= 4);
    cap.textContent = row[1];
    // stack of threes, shrinking upward, bottom anchored
    var s = '', y = 238, size = 46;
    for (var i = 0; i < n; i++) {
      s += '<text x="' + (50 - size * 0.3 + (i % 2 ? 2 : -2)).toFixed(1) + '" y="' + y.toFixed(1)
         + '" style="font-size:' + size.toFixed(1) + 'px">3</text>';
      y -= size * 0.9; size *= 0.84;
    }
    svg.innerHTML = s;
  }
  range.addEventListener('input', paint);
  paint();
})();

/* ============================================================
   Toy 3 — step through the arrow levels (slide 27)
   ============================================================ */
(function () {
  var ARROWS = [
    ['↑',    '3 ↑ 3 = 27', 'перемножь три тройки'],
    ['↑↑',   '3 ↑↑ 3 = 7 625 597 484 987', 'башня из трёх троек'],
    ['↑↑↑',  '3 ↑↑↑ 3', 'башня из 7 625 597 484 987 троек — высотой до Солнца'],
    ['↑↑↑↑', '3 ↑↑↑↑ 3 = g₁', 'столько башен до Солнца, сколько даёт сама башня до Солнца'],
    ['g₁ ↑', '3 ↑(g₁ штук)↑ 3 = g₂', 'а теперь и стрелок столько же, сколько равно g₁']
  ];
  var wrap = document.getElementById('arrowBtns');
  var expr = document.getElementById('arrowExpr');
  var cap = document.getElementById('arrowCap');
  var btns = [];
  ARROWS.forEach(function (row, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn' + (i === 0 ? ' on' : '');
    b.textContent = row[0];
    b.addEventListener('click', function () { select(i); });
    wrap.appendChild(b);
    btns.push(b);
  });
  function select(i) {
    btns.forEach(function (b, k) { b.classList.toggle('on', k === i); });
    expr.textContent = ARROWS[i][1];
    expr.classList.toggle('gold', i >= 3);
    cap.textContent = ARROWS[i][2];
  }
  select(0);
})();

/* ============================================================
   Toy 4 — colour the edges without a one-colour triangle (slide 31)
   This is Ramsey's R(3,3) = 6: from six points on it is impossible.
   ============================================================ */
(function () {
  var RED = '#e4685a', BLUE = '#74a9c6';
  var svg = document.getElementById('ramseySvg');
  var range = document.getElementById('ramseyRange');
  var nLabel = document.getElementById('ramseyN');
  var shuffle = document.getElementById('ramseyShuffle');
  var msg = document.getElementById('ramseyMsg');
  var n = +range.value, edges = [], pts = [];

  function build(keepColors) {
    n = +range.value;
    nLabel.textContent = n;
    pts = [];
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / n;
      pts.push([120 + Math.cos(a) * 118, 120 + Math.sin(a) * 118]);
    }
    var old = edges;
    edges = [];
    var k = 0;
    for (var i2 = 0; i2 < n; i2++) for (var j = i2 + 1; j < n; j++) {
      var col = keepColors && old[k] ? old[k].c : (Math.random() < 0.5 ? 0 : 1);
      edges.push({ i: i2, j: j, c: col });
      k++;
    }
    render();
  }

  function findMono() {
    // index lookup for the edge between two vertices
    var at = {};
    edges.forEach(function (e, k) { at[e.i + '-' + e.j] = k; });
    for (var a = 0; a < n; a++)
      for (var b = a + 1; b < n; b++)
        for (var c = b + 1; c < n; c++) {
          var e1 = edges[at[a + '-' + b]], e2 = edges[at[a + '-' + c]], e3 = edges[at[b + '-' + c]];
          if (e1.c === e2.c && e2.c === e3.c) return [at[a+'-'+b], at[a+'-'+c], at[b+'-'+c]];
        }
    return null;
  }

  function render() {
    var mono = findMono();
    var hot = mono ? mono.reduce(function (o, k) { o[k] = 1; return o; }, {}) : {};
    var s = '';
    edges.forEach(function (e, k) {
      var col = e.c ? BLUE : RED;
      s += '<line data-k="' + k + '" x1="' + pts[e.i][0].toFixed(1) + '" y1="' + pts[e.i][1].toFixed(1)
         + '" x2="' + pts[e.j][0].toFixed(1) + '" y2="' + pts[e.j][1].toFixed(1)
         + '" stroke="' + col + '" color="' + col + '"'
         + (hot[k] ? ' class="mono"' : ' opacity=".55"') + '/>';
    });
    pts.forEach(function (p) {
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="7"/>';
    });
    svg.innerHTML = s;

    if (mono) {
      msg.textContent = n >= 6
        ? 'одноцветный треугольник. с шестью точками его не избежать — это доказано'
        : 'одноцветный треугольник — попробуй ещё';
      msg.className = 'toy-cap lose';
    } else {
      msg.textContent = n >= 6 ? 'чисто?! проверь ещё раз' : 'чисто! с ' + n + ' точками так можно';
      msg.className = 'toy-cap win';
    }
  }

  svg.addEventListener('click', function (ev) {
    var k = ev.target && ev.target.dataset ? ev.target.dataset.k : null;
    if (k == null) return;
    edges[+k].c = edges[+k].c ? 0 : 1;
    render();
  });
  range.addEventListener('input', function () { build(false); });
  shuffle.addEventListener('click', function () {
    edges.forEach(function (e) { e.c = Math.random() < 0.5 ? 0 : 1; });
    render();
  });
  build(false);
})();

/* ============================================================
   Navigation
   ============================================================ */
var cur = 0, step = 0;
function stepsOf(i) { return slides[i].querySelectorAll('.step').length; }

function render() {
  slides.forEach(function (s, i) { s.classList.toggle('active', i === cur); });
  var st = slides[cur].querySelectorAll('.step');
  [].forEach.call(st, function (el, i) { el.classList.toggle('on', showAll || i < step); });
  document.getElementById('counter').textContent = (cur + 1) + ' / ' + slides.length;
  document.getElementById('bar').style.width = ((cur + 1) / slides.length * 100) + '%';
  document.getElementById('notes').innerHTML = '<b>' + (cur + 1) + '.</b> ' + (NOTES[cur] || '');
}
function go(i) {
  cur = Math.max(0, Math.min(slides.length - 1, i));
  step = 0;
  render();
  animateSlide(cur);
}
function next() {
  if (!showAll && step < stepsOf(cur)) { step++; render(); }
  else if (cur < slides.length - 1) { go(cur + 1); }
}
function prev() {
  if (!showAll && step > 0) { step--; render(); }
  else if (cur > 0) { cur--; step = showAll ? 0 : stepsOf(cur); render(); animateSlide(cur); }
}
function toggleNotes() { document.getElementById('notes').classList.toggle('on'); }
function toggleFs() {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (deck.requestFullscreen) deck.requestFullscreen();
}

document.getElementById('next').addEventListener('click', function (e) { e.stopPropagation(); next(); });
document.getElementById('prev').addEventListener('click', function (e) { e.stopPropagation(); prev(); });
document.getElementById('notesBtn').addEventListener('click', function (e) { e.stopPropagation(); toggleNotes(); });
document.getElementById('fsBtn').addEventListener('click', function (e) { e.stopPropagation(); toggleFs(); });

// a click anywhere advances — except on the hud, the notes, or inside a toy
deck.addEventListener('click', function (e) {
  if (e.target.closest('#hud') || e.target.closest('#notes') || e.target.closest('.toy')) return;
  next();
});

function typing(el) {
  return el && (el.tagName === 'INPUT' || el.tagName === 'BUTTON' ||
                el.tagName === 'TEXTAREA' || el.tagName === 'SELECT');
}
function onKey(e) {
  if (typing(e.target)) return;           // let sliders and buttons keep their keys
  var k = e.key;
  if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'PageDown' || k === 'Enter') {
    e.preventDefault(); next();
  } else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') {
    e.preventDefault(); prev();
  } else if (k === 'Home') { e.preventDefault(); go(0); }
  else if (k === 'End') { e.preventDefault(); go(slides.length - 1); }
  else if (k === 'n' || k === 'N' || k === 'т' || k === 'Т') { toggleNotes(); }
  else if (k === 'f' || k === 'F' || k === 'а' || k === 'А') { toggleFs(); }
}
deck.addEventListener('keydown', onKey);
document.addEventListener('keydown', function (e) { if (e.target !== deck) onKey(e); });

deck.focus();
render();
animateSlide(0);
})();
