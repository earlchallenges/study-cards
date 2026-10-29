/* Chapter 9 Part 5 art (a): colorful replacements for PICS, loaded after the page sets PICS.
   Celiac, IBD, IBS, diverticula. Front view anatomy: cecum/terminal ileum on the viewer's lower left,
   sigmoid on the viewer's lower right, rectum at the bottom middle. */
{
  // ---------- small local helpers (block scoped so they never clash with other pages) ----------
  const st = (c, w) => `fill="none" style="stroke:${c};stroke-width:${w}px;stroke-linecap:round;stroke-linejoin:round"`;
  // an outlined tube along a path
  const T = (d, c, w = 12, ex = '') => `<path d="${d}" ${st('var(--art-line)', w + 3)}/><path d="${d}" ${st(`var(--c-${c})`, w)} ${ex}/>`;
  const line = (d, c, w = 2, ex = '') => `<path d="${d}" ${st(c, w)} ${ex}/>`;
  const lead = d => `<path d="${d}" fill="none" style="stroke:var(--pic-ink);stroke-width:1px" stroke-dasharray="2 3" opacity=".7"/>`;
  const txt = (x, y, t, s = 10, ex = '') => `<text class="ink" x="${x}" y="${y}" text-anchor="middle" style="font-size:${s}px;font-weight:700" ${ex}>${t}</text>`;
  const on = (x, y, t, s = 10) => `<text class="on" x="${x}" y="${y}" text-anchor="middle" style="font-size:${s}px">${t}</text>`;
  const g = (x, y, inner, ex = '', s = 1) => `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}">${ex ? `<g ${ex}>${inner}</g>` : inner}</g>`;
  const check = (x, y, ex = '') => `<g ${ex}><circle class="f-good" cx="${x}" cy="${y}" r="8"/>${line(`M${x - 4} ${y} L${x - 1} ${y + 3} L${x + 4.5} ${y - 3.5}`, '#fff', 2.4)}</g>`;
  const xmark = (x, y, r = 9, ex = '') => `<g ${ex}>${line(`M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`, 'var(--c-bad)', 3.5)}</g>`;
  const bolt = (x, y, ex = '', s = 1) => g(x, y, `<path class="f-nerve" d="M2 -9 L-5 1 L0 1 L-2 9 L5 -1 L0 -1 Z" ${ex}/>`, '', s);
  const drop = (x, y, cls = 'f-blood', ex = '', s = 1) => g(x, y, `<path class="${cls}" d="M0 -7 C3 -2 5 1 5 3 A5 5 0 0 1 -5 3 C-5 1 -3 -2 0 -7 Z" ${ex}/>`, '', s);
  const pill = (x, y, a = 0, c = 'bad', ex = '') => `<g ${ex}><g transform="translate(${x} ${y}) rotate(${a})"><rect class="f-white" x="-10" y="-4.5" width="20" height="9" rx="4.5"/><path class="f-${c}" d="M0 -4.5 H-5.5 A4.5 4.5 0 0 0 -5.5 4.5 H0 Z"/></g></g>`;
  const person = (x, y, cls) => `<circle class="${cls}" cx="${x}" cy="${y - 9}" r="4.5"/><path class="${cls}" d="M${x - 7} ${y + 7} Q${x - 7} ${y - 3} ${x} ${y - 3} Q${x + 7} ${y - 3} ${x + 7} ${y + 7} Z"/>`;
  const toilet = (x, y, s = 1) => g(x, y, `<rect class="f-white" x="-13" y="-30" width="26" height="14" rx="3"/>
    <path class="f-white" d="M-20 -14 L20 -14 Q20 6 5 10 L6 18 L-6 18 L-5 10 Q-20 6 -20 -14 Z"/><ellipse class="f-water" cx="0" cy="-12" rx="17" ry="3.2"/>`, '', s);
  const scale = (x, y, ex = '') => g(x, y, `<rect class="f-white" x="-15" y="-9" width="30" height="18" rx="4"/><path class="f-mucus" d="M-8 -3 A8 8 0 0 1 8 -3 Z"/>
    ${line('M0 -3 L-4 -8', 'var(--art-line)', 1.5)}<g ${ex}>${line('M22 -8 L22 6 M17 1 L22 7 L27 1', 'var(--c-bad)', 3)}</g>`);
  const thermo = (x, y, ex = '') => g(x, y, `<rect class="f-white" x="-5" y="-26" width="10" height="34" rx="5"/><circle class="f-blood" cx="0" cy="12" r="8"/>
    <rect class="f-blood noline" x="-2.5" y="-14" width="5" height="22" rx="2" ${ex}/>`);
  const heart = (x, y, ex = '', s = 1) => g(x, y, `<path class="f-bad ${ex}" d="M0 9 C-14 0 -12 -10 -6 -10 C-2 -10 0 -7 0 -5 C0 -7 2 -10 6 -10 C12 -10 14 0 0 9 Z"/>`, '', s);
  const wbc = (x, y, ex = '', r = 7) => `<g ${ex}><circle class="f-white" cx="${x}" cy="${y}" r="${r}"/><path class="f-germ noline" d="M${x - r * .55} ${y} a${r * .28} ${r * .28} 0 1 1 ${r * .5} ${-r * .2} a${r * .28} ${r * .28} 0 1 1 ${r * .5} ${r * .3} a${r * .28} ${r * .28} 0 1 1 ${-r * .2} ${r * .4} Z"/></g>`;
  const immune = (x, y, r = 5, ex = '') => `<circle class="f-immune ${ex}" cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r * .45}" fill="#0a5b7a"/>`;
  const germ = (x, y, a = 0, ex = '') => `<g ${ex}><g transform="translate(${x} ${y}) rotate(${a})"><rect class="f-germ" x="-7" y="-3.5" width="14" height="7" rx="3.5"/>${line('M7 0 q3 -3 6 0', 'var(--c-germ)', 1.5)}</g></g>`;

  // a row of finger-shaped villi: x0..x1, base line y, height h, n fingers (same command list at any height)
  const villi = (x0, x1, base, h, n) => {
    const w = (x1 - x0) / n, vw = w * .7, gp = (w - vw) / 2, r = vw / 2;
    let d = `M${x0} ${base + 22} L${x0} ${base}`;
    for (let i = 0; i < n; i++) {
      const a = x0 + i * w + gp, b = a + vw;
      d += ` L${a} ${base} L${a} ${base - h + r} A${r} ${r} 0 0 1 ${b} ${base - h + r} L${b} ${base}`;
    }
    return d + ` L${x1} ${base} L${x1} ${base + 22} Z`;
  };

  // large intestine in a 100 x 100 box: cecum (12,82) up, across, down, sigmoid, rectum ending at (50,98)
  const COL = 'M12 82 L12 20 Q12 12 20 12 L80 12 Q88 12 88 20 L88 60 C88 80 66 70 58 80 C54 85 50 86 50 98';
  // the same path run backwards (rectum first) for "spreads up from the rectum"
  const COLR = 'M50 98 C50 86 54 85 58 80 C66 70 88 80 88 60 L88 20 Q88 12 80 12 L20 12 Q12 12 12 20 L12 82';
  const SI = 'M30 26 C50 20 72 26 70 34 C68 42 32 38 32 46 C32 54 70 50 68 58 C66 66 40 64 34 70 C28 76 22 80 15 80';
  const colon = (w = 12, extra = '') => T(COL, 'large', w) + T('M10 87 C7 93 11 97 9 101', 'large', 2.5) +
    line('M12 32 h-6 M12 48 h-6 M12 64 h-6 M36 12 v-6 M56 12 v-6 M72 12 v-6 M88 32 h6 M88 46 h6', 'var(--art-line)', 1) + extra;
  // whole tract in a 100 x 150 box (mouth at top, anus at 50,148)
  const TCOL = 'M12 132 L12 70 Q12 62 20 62 L80 62 Q88 62 88 70 L88 110 C88 130 66 120 58 130 C54 135 50 136 50 148';
  const TSI = 'M62 56 C72 66 46 70 34 74 C24 78 64 82 66 90 C68 98 30 96 30 104 C30 112 66 108 64 116 C62 124 30 126 15 130';
  const tract = () => `<ellipse class="f-mouth" cx="50" cy="5" rx="9" ry="4.5"/>` + T('M50 10 L50 32', 'esoph', 5) +
    `<path class="f-stomach" d="M47 30 C52 25 66 26 72 33 C80 42 75 55 64 57 C56 58 49 52 47 45 Z"/>` +
    T(TCOL, 'large', 9) + T(TSI, 'small', 5);

  // bowel wall cross-section strip (inset): 4 layers, top = mucosa
  const wall = (x, y, w, redLayers, ex = '') => {
    const names = [['f-small', 9], ['f-skin', 9], ['f-muscle', 12], ['f-bone', 5]];
    let s = '', yy = y;
    names.forEach(([c, h], i) => { s += `<rect class="${c}" x="${x}" y="${yy}" width="${w}" height="${h}"/>`; yy += h; });
    const hh = names.slice(0, redLayers).reduce((a, b) => a + b[1], 0);
    return s + `<rect class="f-bad ans ${ex}" x="${x + w * .3}" y="${y}" width="${w * .4}" height="${hh}" rx="3" opacity=".85"/>`;
  };

  // a sigmoid segment with pouches; pc = pouch class
  const sig = (pc, ex = '') => T('M20 8 L20 50 C20 80 70 66 76 96', 'large', 16) +
    [[9, 22], [31, 36], [9, 48], [36, 64], [18, 74], [64, 72], [58, 98], [88, 90]].map(([x, y], i) => `<circle class="${pc} ${ex}" cx="${x}" cy="${y}" r="5" style="--d:${i}"/>`).join('');

  Object.assign(PICS, {
    // ===================== CELIAC =====================
    celiac: (() => {
      const tall = villi(130, 290, 118, 62, 6), flat = villi(130, 290, 118, 12, 6);
      return ART(`
      <rect x="0" y="118" width="300" height="62" class="f-skin noline" opacity=".5"/>
      <path class="f-small" d="${villi(10, 120, 118, 62, 4)}"/>
      ${[30, 58, 86, 112].map((x, i) => `<circle class="f-fat a-drop" cx="${x - 10}" cy="44" r="3.5" style="animation-delay:${i * .4}s"/>`).join('')}
      <g class="q"><path class="f-small" d="${tall}"/></g>
      <g class="ansmotion"><path class="f-small" d="${tall}"><animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;.3;.55;.9;1" values="${tall};${tall};${flat};${flat};${tall}"/></path></g>
      <g class="ans">${[148, 175, 202, 229, 256, 283].map((x, i) => `<rect class="f-food a-drop" x="${x - 4}" y="58" width="8" height="6" rx="2" style="animation-delay:${i * .27}s"/>`).join('')}
        ${[145, 178, 210, 242, 275].map(x => immune(x, 131, 5.5, 'a-pulse')).join('')}</g>
      <line x1="125" y1="10" x2="125" y2="172" style="stroke:var(--pic-ink);stroke-width:1px" stroke-dasharray="3 3" opacity=".5"/>
      ${tag(65, 16, 'Normal villi')}${txt(65, 160, 'Nutrients soak in', 9.5)}
      ${qtag(210, 16, 'Gluten: wheat, barley, rye', 9.5)}${qtag(210, 38, 'Immune attack flattens villi', 9.5)}
      ${qtag(210, 164, 'Less surface → malabsorption', 9.5)}`);
    })(),

    celiacGenes: ART(`
      <path class="f-spleen" d="M12 128 C8 95 40 80 75 82 C110 80 142 95 138 128 Z"/>
      ${txt(75, 122, 'Immune cell', 9)}
      ${[[50, 'f-good'], [100, 'f-warn']].map(([x, c]) => g(x, 84, `<path class="${c}" d="M-9 0 L-9 -14 Q-9 -18 -5 -18 L-5 -8 L5 -8 L5 -18 Q9 -18 9 -14 L9 0 Z"/><ellipse class="f-food" cx="0" cy="-12" rx="4.5" ry="3"/>`)).join('')}
      ${[50, 100].map(x => `<g class="a-bob"><rect class="f-immune" x="${x - 3}" y="54" width="6" height="9" rx="2"/><circle class="f-immune" cx="${x}" cy="44" r="13"/><circle cx="${x}" cy="44" r="5.5" fill="#0a5b7a"/></g>`).join('')}
      ${tag(75, 16, 'T cells see gluten', 9.5)}
      ${qtag(50, 104, 'DQ2')}${qtag(100, 104, 'DQ8')}
      <circle cx="225" cy="58" r="30" fill="none" style="stroke:var(--pic-ink);stroke-width:10px" opacity=".15"/>
      <g class="ansmotion"><circle cx="225" cy="58" r="30" fill="none" class="s-good" style="stroke-width:10px" pathLength="100" stroke-dasharray="99 100" transform="rotate(-90 225 58)">
        <animate attributeName="stroke-dashoffset" dur="4s" repeatCount="indefinite" keyTimes="0;.5;1" values="99;0;0"/></circle></g>
      <g class="ans">${txt(225, 64, '99%', 16)}${txt(225, 104, 'of people with celiac', 9.5)}${txt(225, 116, 'carry DQ2 or DQ8', 9.5)}</g>
      ${q(225, 58, 11)}
      ${[...Array(12)].map((_, i) => person(29 + i * 22, 146, [1, 4, 7, 10].includes(i) ? 'f-good a-pop' : i === 5 ? 'f-warn a-pop' : 'f-white')).join('')}
      ${qtag(150, 170, 'Many carry the genes and never get celiac', 9)}`),

    celiacAssoc: ART(`
      ${[[22, 30], [278, 30], [22, 88], [278, 88], [22, 146], [278, 146]].map(([x, y], i) => line(`M150 95 L${x} ${y}`, 'var(--c-bad)', 2, `class="a-flow-slow" opacity=".7"`)).join('')}
      <circle class="f-white" cx="150" cy="95" r="27"/>
      <path class="f-small" d="${villi(128, 172, 106, 9, 4)}" />
      ${tag(150, 84, 'Celiac', '', 10)}
      ${g(22, 30, `<path class="f-pancreas a-pop" style="--d:0" d="M-14 2 C-14 -6 -4 -6 4 -4 C10 -3 14 -7 16 -2 C17 3 10 4 4 4 C-4 5 -14 9 -14 2 Z"/>`)}
      ${g(278, 30, `<g class="a-pop" style="--d:1"><ellipse class="f-muscle" cx="-6" cy="0" rx="6" ry="11"/><ellipse class="f-muscle" cx="6" cy="0" rx="6" ry="11"/><rect class="f-muscle" x="-5" y="2" width="10" height="5"/></g>`)}
      ${g(22, 88, `<g class="a-pop" style="--d:2"><path class="f-bone" d="M-12 -7 a4 4 0 1 1 3 -3 L9 -4 a4 4 0 1 1 3 3 L12 4 a4 4 0 1 1 -3 3 L-9 4 a4 4 0 1 1 -3 -3 Z"/>${[-5, 0, 5].map(x => `<circle cx="${x}" cy="0" r="1.6" fill="var(--surface)"/>`).join('')}</g>`)}
      ${g(278, 88, `<g class="a-grow"><path class="f-lymph" d="M-12 0 C-12 -10 0 -12 6 -9 C12 -6 8 -2 12 2 C14 8 4 12 -4 10 C-10 8 -12 5 -12 0 Z"/>${[[-5, -2], [2, -5], [3, 4], [-3, 5]].map(([x, y]) => `<circle class="f-immune" cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>`)}
      ${g(22, 146, `<g class="a-pop" style="--d:4"><circle class="f-blood" cx="-5" cy="-3" r="8" opacity=".55"/><circle cx="-5" cy="-3" r="3.5" fill="var(--surface)" opacity=".8"/><circle class="f-blood" cx="6" cy="5" r="7" opacity=".55"/><circle cx="6" cy="5" r="3" fill="var(--surface)" opacity=".8"/></g>`)}
      ${g(278, 146, `<g class="a-pop" style="--d:5"><rect class="f-skin" x="-13" y="-10" width="26" height="20" rx="4"/>${[[-6, -3], [-1, -5], [4, -2], [-3, 3], [6, 4], [1, 2]].map(([x, y]) => `<circle class="f-mucus" cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>`)}
      ${qtag(85, 30, 'Type 1 diabetes')}${qtag(205, 30, 'Hashimoto thyroiditis', 9.5)}
      ${qtag(80, 88, 'Osteoporosis')}${qtag(220, 88, 'Lymphoma risk')}
      ${qtag(82, 146, 'Iron-deficiency anemia', 9)}${qtag(214, 146, 'Dermatitis herpetiformis', 9)}`),

    celiacSx: ART(`
      <circle class="f-skin" cx="50" cy="20" r="11"/>
      <ellipse class="f-skin" cx="50" cy="64" rx="34" ry="32"/>
      ${line('M34 86 Q50 92 66 86', 'var(--art-line)', 1.2)}
      <g class="ans">${[[38, 66], [56, 58], [48, 76], [62, 72]].map(([x, y], i) => `<circle class="f-mucus a-rise" cx="${x}" cy="${y}" r="${4 + (i % 2) * 2}" style="animation-delay:${i * .45}s"/>`).join('')}</g>
      ${toilet(150, 70, 1.55)}
      <g class="a-bob"><path class="f-food" d="M128 50 C126 42 138 40 144 43 C150 38 166 40 170 46 C176 48 174 54 168 54 L132 55 C126 55 126 52 128 50 Z" opacity=".9"/>
        ${[[138, 46], [150, 44], [160, 47], [166, 50]].map(([x, y]) => `<circle class="f-fat" cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g>
      <g class="ans">${[134, 150, 166].map((x, i) => line(`M${x} 30 q-4 -5 0 -10 q4 -5 0 -10`, 'var(--c-gall)', 2, `class="a-rise" style="animation-delay:${i * .5}s"`)).join('')}</g>
      ${g(250, 32, `<path class="f-white" d="M-12 -18 L-6 -26 L6 -26 L12 -18 L12 18 L-12 18 Z"/><rect class="f-water noline" x="-12" y="-4" width="24" height="10"/>`)}${on(250, 36, 'MILK', 9)}
      ${xmark(250, 32, 13, 'class="ans a-pop"')}
      ${scale(242, 98, 'class="a-drop"')}
      ${qtag(50, 106, 'Bloating, gas')}
      ${qtag(150, 124, 'Bulky, foul, floating', 9.5)}${qtag(150, 143, 'Steatorrhea (fat)', 9.5)}
      ${qtag(240, 62, 'Lactose intolerance', 9.5)}${qtag(252, 124, 'Weight loss')}
      ${g(26, 162, `<circle class="f-skin" cx="0" cy="-4" r="8"/><path class="f-mucus" d="M-9 4 Q0 -1 9 4 L9 12 L-9 12 Z"/>`)}
      ${g(272, 162, `<path class="f-white" d="M-13 -4 L13 -4 Q12 10 0 10 Q-12 10 -13 -4 Z"/>${[-7, -2, 3, 8].map(x => `<ellipse class="f-food" cx="${x}" cy="-5" rx="3" ry="2"/>`).join('')}`)}
      ${qtag(150, 163, 'Infants: starts when cereals added', 9)}`),

    celiacDx: ART(`
      ${g(36, 78, `<rect class="f-white" x="-12" y="-46" width="24" height="94" rx="11"/><rect class="f-blood noline" x="-10" y="-14" width="20" height="60" rx="9"/><rect class="f-vein" x="-14" y="-52" width="28" height="12" rx="3"/>`)}
      ${tag(36, 14, '1', '', 10)}
      <g class="ans">${[[70, 36], [96, 48], [74, 66], [100, 80], [78, 96]].map(([x, y], i) => g(x, y, `<g class="a-pop" style="--d:${i}">${line('M0 10 L0 0 L-6 -7 M0 0 L6 -7', 'var(--c-immune)', 3.5)}<circle class="f-warn" cx="0" cy="-11" r="3.4"/></g>`)).join('')}</g>
      ${qtag(84, 120, 'tTG-IgA')}${qtag(84, 140, 'EMA-IgA')}${qtag(84, 160, 'Gliadin antibodies', 9.5)}
      <g class="ans">${line('M138 66 L160 66', 'var(--pic-ink)', 2)}<path d="M160 61 L168 66 L160 71 Z" style="fill:var(--pic-ink)"/>${txt(152, 56, 'then', 9)}</g>
      ${tag(198, 14, '2', '', 10)}
      ${T('M218 4 L220 46', 'esoph', 7)}
      <path class="f-stomach" d="M214 44 C220 34 250 36 262 52 C270 64 262 78 248 80 C234 82 222 72 216 62 Z"/>
      ${T('M256 78 C262 92 266 108 252 116 C240 122 226 116 228 104', 'small', 9)}
      <g class="ans">${line('M219 2 L221 46 C232 52 256 54 260 70 C266 90 262 100 252 108', 'var(--art-line)', 2.5, `class="a-draw" pathLength="400"`)}<circle class="f-white a-pulse" cx="252" cy="108" r="3.5"/></g>
      ${lead('M246 112 L196 124')}
      <circle class="f-white" cx="184" cy="128" r="20"/>
      <path class="f-small" d="${villi(166, 202, 132, 7, 4)}"/>
      ${line('M198 142 L206 152', 'var(--art-line)', 4)}
      ${qtag(228, 165, 'EGD + duodenal biopsy', 9.5)}`),

    celiacTx: ART(`
      ${[30, 72, 114].map((x, i) => g(x, 50, line('M0 30 L0 -26', 'var(--c-food)', 2.5) +
        [-20, -12, -4, 4, 12].map(y => `<ellipse class="f-${i === 1 ? 'pancreas' : 'food'}" cx="-4.5" cy="${y}" rx="4" ry="6.5" transform="rotate(-25 -4.5 ${y})"/><ellipse class="f-${i === 1 ? 'pancreas' : 'food'}" cx="4.5" cy="${y}" rx="4" ry="6.5" transform="rotate(25 4.5 ${y})"/>`).join('') +
        (i === 1 ? line('M-6 -24 L-14 -40 M6 -24 L14 -40 M0 -26 L0 -42', 'var(--c-food)', 1.2) : ''))).join('')}
      ${[30, 72, 114].map((x, i) => xmark(x, 46, 16, `class="ans a-pop" style="--d:${i}"`)).join('')}
      ${tag(30, 94, 'wheat', '', 9)}${tag(72, 94, 'barley', '', 9)}${tag(114, 94, 'rye', '', 9)}
      ${g(196, 52, `<path class="f-white" d="M-24 -4 L24 -4 Q22 22 0 22 Q-22 22 -24 -4 Z"/><path class="f-white" d="M-20 -4 Q-14 -18 0 -18 Q14 -18 20 -4 Z"/>${[[-10, -8], [-4, -12], [3, -9], [9, -12], [12, -7], [-2, -6], [6, -5]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="1.2" fill="#d9d2c0"/>`).join('')}`)}
      ${g(262, 50, `<path class="f-good" d="M-4 26 C-14 10 -12 -10 -4 -24 L0 26 Z"/><path class="f-good" d="M4 26 C14 10 12 -10 4 -24 L0 26 Z"/><ellipse class="f-nerve" cx="0" cy="0" rx="8" ry="24"/>${[-16, -10, -4, 2, 8, 14].map(y => line(`M-6 ${y} H6`, '#c79a00', 1)).join('')}`)}
      ${check(196, 82, 'class="ans a-pop" style="--d:2"')}${check(262, 82, 'class="ans a-pop" style="--d:3"')}
      ${tag(196, 94, 'rice', '', 9)}${tag(262, 94, 'corn', '', 9)}
      ${qtag(72, 116, 'Never: wheat, barley, rye', 9.5)}${qtag(229, 116, 'Rice + corn are fine', 9.5)}
      <path d="M30 146 C30 132 50 132 60 146 C70 160 90 160 90 146 C90 132 70 132 60 146 C50 160 30 160 30 146 Z" class="s-good a-draw" pathLength="400" style="stroke-width:4px"/>
      <circle cx="150" cy="146" r="14" fill="none" style="stroke:var(--pic-ink);stroke-width:7px" opacity=".15"/>
      <circle cx="150" cy="146" r="14" fill="none" class="s-good a-draw" style="stroke-width:7px" pathLength="444" stroke-dasharray="400 444" transform="rotate(-90 150 146)"/>
      ${g(245, 146, `<path class="f-white" d="M-18 0 Q0 -14 18 0 Q0 14 -18 0 Z"/><circle class="f-vein a-blink" cx="0" cy="0" r="5.5"/><circle cx="0" cy="0" r="2.3" fill="#111"/>`)}
      ${qtag(60, 170, 'Lifelong')}${qtag(150, 170, 'Controls ~90%')}${qtag(245, 170, 'Watch for cancer', 9.5)}`),

    sprue: (() => {
      const tall = villi(162, 286, 128, 44, 6), flat = villi(162, 286, 128, 11, 6);
      return ART(`
      <rect x="0" y="128" width="300" height="52" class="f-skin noline" opacity=".5"/>
      <line x1="150" y1="4" x2="150" y2="150" style="stroke:var(--pic-ink);stroke-width:1px" stroke-dasharray="3 3" opacity=".5"/>
      ${tag(77, 14, 'Celiac')}${tag(214, 14, 'Tropical sprue')}
      ${g(280, 22, `<path class="s-food" d="M0 24 Q-2 8 0 -6" style="stroke-width:3px"/><path class="f-good" d="M0 -6 Q-12 -14 -18 -4 Q-10 -10 0 -6 Q-6 -18 4 -18 Q2 -12 0 -6 Q12 -16 18 -6 Q8 -10 0 -6 Z"/>`)}
      <path class="f-small" d="${villi(14, 138, 128, 11, 6)}"/>
      ${[40, 100].map((x, i) => `<rect class="f-food a-drop" x="${x}" y="98" width="8" height="6" rx="2" style="animation-delay:${i * .6}s"/>`).join('')}
      <g class="ans">${[30, 60, 90, 120].map(x => immune(x, 140, 5, 'a-pulse')).join('')}</g>
      <g class="q"><path class="f-small" d="${flat}"/></g>
      <g class="ansmotion"><path class="f-small" d="${flat}"><animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;.35;.75;.9;1" values="${flat};${flat};${tall};${tall};${flat}"/></path></g>
      ${germ(180, 100, 20)}${germ(230, 106, -15)}${germ(266, 96, 10)}
      <g class="ans">${pill(205, 82, 20, 'good', 'class="a-drop"')}</g>
      ${qtag(77, 44, 'Autoimmune')}${qtag(77, 66, 'Lifelong')}
      ${qtag(214, 44, 'Infection (tropics)', 9.5)}${qtag(214, 66, 'Antibiotics cure it', 9.5)}
      ${qtag(150, 166, 'Both flatten the villi', 9.5)}`);
    })(),

    // ===================== IBD =====================
    ibd: ART(`
      ${g(30, 24, tract() + `<g class="ans">${[[22, 128, 9], [50, 76, 6], [12, 92, 6], [55, 62, 6], [64, 103, 5]].map(([x, y, r], i) => `<circle class="f-bad a-blink" cx="${x}" cy="${y}" r="${r}" style="animation-delay:${i * .3}s"/>`).join('')}</g>`, '', .85)}
      ${g(170, 30, colon(12) + `<g class="ansmotion"><path d="${COLR}" ${st('var(--c-bad)', 9)} pathLength="100" stroke-dasharray="100 100" opacity=".9"><animate attributeName="stroke-dashoffset" dur="5s" repeatCount="indefinite" keyTimes="0;.6;1" values="100;45;45"/></path></g>`, '', 1.1)}
      ${qtag(72, 14, 'Crohn disease')}${qtag(225, 14, 'Ulcerative colitis')}
      <path d="M8 168 C18 158 28 158 38 168 S56 176 66 168 S84 156 96 168 S114 176 124 168 S140 160 150 168" class="s-bad a-draw" pathLength="400" style="stroke-width:2.5px"/>
      ${qtag(222, 146, 'Flares + remissions', 9.5)}${qtag(222, 168, 'More in Whites, Ashkenazi Jews', 9)}`),

    crohnPic: ART(`
      ${g(100, 6, tract() + `<g class="ans">
        ${[[20, 129, 8, 0], [12, 96, 5, 1], [34, 75, 5, 2], [66, 92, 5, 3], [60, 62, 5, 4], [88, 92, 5, 5], [50, 5, 3.5, 6]].map(([x, y, r, i]) => `<circle class="f-bad a-pop" cx="${x}" cy="${y}" r="${r}" style="--d:${i}"/>`).join('')}
        <circle cx="52" cy="141" r="6" fill="none" class="s-good" style="stroke-width:2px"/></g>`, '', 1.1)}
      ${lead('M90 18 L148 12')}${lead('M88 80 L132 90')}${lead('M88 140 L120 147')}
      ${qtag(50, 18, 'Mouth to anus')}${qtag(50, 80, 'Skip lesions')}${qtag(50, 140, 'Distal ileum', 10.5)}
      <g class="ans">${txt(50, 160, 'most often', 9.5)}</g>
      <rect x="220" y="44" width="70" height="35" class="f-small"/>
      ${wall(220, 44, 70, 4, 'a-pulse')}
      <g class="ans">${txt(255, 96, 'all 4 layers', 9.5)}</g>
      ${lead('M220 62 L190 110')}
      ${qtag(255, 30, 'Transmural')}
      ${lead('M162 162 L196 152')}${qtag(250, 152, 'Rectum spared', 9.5)}
      <g class="ans">${txt(250, 170, '(usually)', 9.5)}</g>`),

    ucPic: ART(`
      ${g(98, 10, `${T(SI, 'small', 6)}${colon(12)}
        <g class="ansmotion"><path d="${COLR}" ${st('var(--c-bad)', 9)} pathLength="100" stroke-dasharray="100 100"><animate attributeName="stroke-dashoffset" dur="6s" repeatCount="indefinite" keyTimes="0;.65;.9;1" values="100;30;30;100"/></path></g>
        <circle class="f-bad a-pulse ans" cx="50" cy="96" r="5"/>`, '', 1.4)}
      ${lead('M100 140 L160 146')}${lead('M98 66 L215 80')}
      ${qtag(52, 140, 'Starts in rectum')}${qtag(52, 66, 'Continuous')}
      <g class="ans">${txt(52, 82, 'spreads up', 9.5)}${line('M52 120 L52 92', 'var(--c-bad)', 2.5, 'class="a-flow"')}</g>
      <rect x="226" y="40" width="66" height="35" class="f-small"/>
      ${wall(226, 40, 66, 1, 'a-pulse')}
      ${qtag(259, 26, 'Mucosa only')}
      <g class="ans">${txt(259, 90, 'rest spared', 9.5)}</g>
      ${qtag(170, 170, 'Colon + rectum only', 9.5)}`),

    cobble: (() => {
      const nod = [];
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; nod.push([82 + Math.cos(a) * 26, 88 + Math.sin(a) * 24, 10, 8, a]); }
      for (let i = 0; i < 12; i++) { const a = (i + .5) / 12 * Math.PI * 2; nod.push([82 + Math.cos(a) * 52, 88 + Math.sin(a) * 50, 13, 10, a]); }
      return ART(`
      <circle class="f-muscle" cx="82" cy="88" r="72"/>
      ${nod.map(([x, y, rx, ry, a], i) => `<g class="a-pop" style="--d:${i % 6}"><ellipse class="f-small" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx}" ry="${ry}" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/></g>`).join('')}
      <ellipse class="f-tumor" cx="82" cy="88" rx="11" ry="8"/>
      <g class="ans">${[0, 1, 2, 3].map(i => { const a = i * Math.PI / 2 + .4; return line(`M${(82 + Math.cos(a) * 14).toFixed(1)} ${(88 + Math.sin(a) * 12).toFixed(1)} L${(82 + Math.cos(a) * 70).toFixed(1)} ${(88 + Math.sin(a) * 68).toFixed(1)}`, '#5a1020', 2.2, 'class="a-draw" pathLength="400"'); }).join('')}</g>
      ${qtag(82, 170, 'Cobblestone')}
      <circle class="f-white" cx="232" cy="46" r="32"/>
      <g class="a-pulse">${[...Array(9)].map((_, i) => { const a = i / 9 * Math.PI * 2; return `<ellipse class="f-mouth" cx="${(232 + Math.cos(a) * 15).toFixed(1)}" cy="${(46 + Math.sin(a) * 15).toFixed(1)}" rx="6" ry="3.5" transform="rotate(${(a * 180 / Math.PI).toFixed(0)} ${(232 + Math.cos(a) * 15).toFixed(1)} ${(46 + Math.sin(a) * 15).toFixed(1)})"/>`; }).join('')}
        <circle class="f-germ" cx="232" cy="46" r="8"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${(232 + Math.cos(i * 1.2 + 2.6) * 5).toFixed(1)}" cy="${(46 + Math.sin(i * 1.2 + 2.6) * 5).toFixed(1)}" r="1.5" fill="#2a1240"/>`).join('')}</g>
      ${[...Array(14)].map((_, i) => { const a = i / 14 * Math.PI * 2; return `<circle class="f-immune noline" cx="${(232 + Math.cos(a) * 26).toFixed(1)}" cy="${(46 + Math.sin(a) * 26).toFixed(1)}" r="2.6"/>`; }).join('')}
      ${qtag(232, 90, 'Granulomas')}
      <path class="f-small" fill-rule="evenodd" d="M207 136 a25 25 0 1 0 50 0 a25 25 0 1 0 -50 0 Z M226 136 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 Z"/>
      <g class="ans"><circle cx="232" cy="136" r="6" fill="none" style="stroke:var(--c-bad);stroke-width:2px" class="a-pulse"/></g>
      ${qtag(232, 170, 'Thick, narrow wall', 9.5)}`);
    })(),

    crohnCx: ART(`
      <path class="f-small" d="M8 42 C50 36 95 40 112 54 L124 64 L156 64 L166 56 C190 52 260 54 292 56 L292 86 C260 87 190 89 166 86 L156 78 L124 78 L112 88 C95 102 50 106 8 98 Z"/>
      <rect class="f-scar" x="124" y="60" width="32" height="4"/><rect class="f-scar" x="124" y="78" width="32" height="4"/>
      <g class="a-shake">${[[70, 64], [86, 74], [100, 66], [56, 78], [96, 82]].map(([x, y]) => `<circle class="f-stool" cx="${x}" cy="${y}" r="7"/>`).join('')}</g>
      <ellipse class="f-bile a-pulse" cx="232" cy="44" rx="18" ry="11"/>
      ${T('M210 86 C214 102 226 108 226 124', 'stool', 5)}
      <g class="ans">${line('M210 86 C214 102 226 108 226 124', 'var(--c-water)', 2.5, 'class="a-flow"')}</g>
      <ellipse class="f-pancreas" cx="228" cy="140" rx="24" ry="17"/><text x="228" y="144" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#1d2238">bladder</text>
      ${g(36, 150, `<path class="f-skin" d="M-26 -14 Q-28 14 -2 14 L-2 -14 Z M26 -14 Q28 14 2 14 L2 -14 Z"/>${line('M0 -4 L-3 2 L1 6 L-2 12', 'var(--c-bad)', 2.2, 'class="a-blink"')}`)}
      ${g(276, 128, `<ellipse class="f-white" cx="0" cy="0" rx="14" ry="5"/><ellipse cx="0" cy="-1" rx="8" ry="2.5" fill="#ddd"/>`)}
      ${lead('M50 30 L70 58')}${lead('M140 30 L140 60')}${lead('M232 30 L232 34')}
      ${qtag(50, 20, 'Obstruction')}${qtag(140, 20, 'Stricture')}${qtag(250, 20, 'Abscess')}
      ${qtag(150, 116, 'Fistula')}<g class="ans">${tag(126, 134, 'to bowel, bladder, vagina', '', 9)}</g>
      ${qtag(95, 168, 'Perianal fissure', 9.5)}${qtag(255, 166, 'Malnutrition')}`),

    crohnSx: ART(`
      <path class="f-skin" d="M74 18 Q110 6 146 18 L150 60 Q156 110 146 168 L74 168 Q64 110 70 60 Z"/>
      ${line('M110 40 L110 160 M74 100 L146 100', 'var(--pic-ink)', 1, 'stroke-dasharray="3 3" opacity=".5"')}
      <circle cx="110" cy="100" r="2" style="fill:var(--pic-ink)"/>
      ${txt(82, 30, 'R', 10)}${txt(138, 30, 'L', 10)}
      <circle class="f-bad a-pulse" cx="92" cy="128" r="12" opacity=".8"/>
      ${line('M86 124 L98 132 M98 124 L86 132', '#fff', 2)}
      <ellipse class="f-tumor ans a-grow" cx="94" cy="148" rx="9" ry="6"/>
      ${lead('M80 128 L58 118')}${lead('M86 148 L60 146')}
      ${qtag(36, 118, 'RLQ pain')}${qtag(36, 146, 'Belly mass')}
      ${toilet(212, 38, .9)}
      ${[200, 212, 224].map((x, i) => drop(x, 64, 'f-water', `class="a-drop" style="animation-delay:${i * .4}s"`)).join('')}
      ${qtag(225, 82, 'Watery diarrhea', 9.5)}
      ${scale(196, 112, 'class="a-drop"')}
      ${qtag(262, 112, 'Weight loss')}
      ${g(174, 152, `<rect class="f-white" x="-4" y="-20" width="8" height="40"/>${[-16, -8, 0, 8, 16].map(y => line(`M-4 ${y} H0`, 'var(--art-line)', 1)).join('')}${person(14, 12, 'f-warn')}${line('M8 -4 H22', 'var(--c-bad)', 2, 'stroke-dasharray="2 2"')}`)}
      ${qtag(246, 152, 'Slow growth (kids)', 9)}
      <g class="ans">${txt(250, 172, 'late puberty', 9)}</g>`),

    ucSx: ART(`
      ${T('M88 6 C88 40 40 36 44 66 C48 92 60 92 60 108', 'large', 16)}
      <ellipse class="f-large a-squeeze" cx="60" cy="122" rx="17" ry="18"/>
      <ellipse class="f-bad noline" cx="60" cy="122" rx="9" ry="10" opacity=".55"/>
      ${line('M60 140 L60 148', 'var(--c-large)', 6)}
      <g class="ans">${bolt(32, 112, 'class="a-blink"')}${bolt(88, 118, 'class="a-blink" style="animation-delay:.5s"')}${bolt(36, 138, 'class="a-blink" style="animation-delay:.3s"')}${bolt(86, 142, 'class="a-blink" style="animation-delay:.8s"')}</g>
      ${qtag(58, 155, 'Tenesmus')}
      <g class="ans">${tag(80, 172, 'constant urge, rectal spasm', '', 9)}</g>
      ${toilet(156, 60, 1.4)}
      <g class="a-bob"><path class="f-stool" d="M134 42 C132 34 144 32 150 36 C156 30 170 34 172 40 C178 42 176 47 170 47 L138 48 C132 48 132 45 134 42 Z"/>
        ${line('M140 40 q6 -3 12 0 M156 38 q6 -2 10 1', 'var(--c-blood)', 2.5)}
        <ellipse class="f-mucus" cx="146" cy="46" rx="5" ry="2.5"/><ellipse class="f-mucus" cx="166" cy="44" rx="4" ry="2"/></g>
      ${drop(156, 98, 'f-blood', 'class="a-drop"')}
      ${qtag(156, 120, 'Bloody stools + mucus', 9.5)}
      ${qtag(156, 142, 'Urgency')}
      <g class="ans">${[0, 1, 2, 3].map(i => g(220 + i * 18, 34, line('M-6 -10 V10 M-2 -10 V10 M2 -10 V10 M6 -10 V10 M-9 6 L9 -6', 'var(--pic-ink)', 1.6), `class="a-pop" style="--d:${i}"`)).join('')}</g>
      ${qtag(247, 60, 'Up to 20 a day', 9.5)}
      ${g(232, 98, `<ellipse class="f-skin" cx="0" cy="0" rx="14" ry="13"/><path class="a-spin" d="M0 -6 A6 6 0 1 1 -6 0 A3 3 0 1 1 0 -3" fill="none" style="stroke:var(--c-bad);stroke-width:2px"/>`)}
      ${qtag(270, 98, 'Cramps', 9.5)}
      ${scale(222, 140, 'class="a-drop"')}
      ${qtag(250, 165, 'Weight loss')}`),

    extra: ART(`
      <circle class="f-skin" cx="150" cy="26" r="15"/>
      ${T('M126 52 L108 96 M174 52 L192 96', 'skin', 8)}
      ${T('M140 104 L137 172 M160 104 L163 172', 'skin', 10)}
      <path class="f-skin" d="M124 44 Q150 38 176 44 L178 106 Q150 112 122 106 Z"/>
      <circle class="f-bad a-pulse" cx="150" cy="82" r="13" opacity=".85"/>
      ${T('M141 76 C150 72 160 76 158 84 C156 90 144 88 142 94', 'small', 3)}
      ${[[144, 22], [156, 22]].map(([x, y]) => `<circle class="f-white" cx="${x}" cy="${y}" r="3.3"/><circle class="ans a-blink" cx="${x}" cy="${y}" r="2" style="fill:var(--c-bad)"/>`).join('')}
      <path d="M144 32 Q150 35 156 32" fill="none" style="stroke:var(--art-line);stroke-width:1.5px"/>
      <circle class="ans f-white a-pulse" cx="153" cy="33" r="1.8"/>
      ${[[137, 140], [163, 140]].map(([x, y]) => `<circle class="f-bad a-pulse ans" cx="${x}" cy="${y}" r="5.5" opacity=".85"/>`).join('')}
      <g class="ans">${[[164, 154], [161, 162], [166, 160]].map(([x, y]) => `<circle class="f-blood" cx="${x}" cy="${y}" r="2.3"/>`).join('')}</g>
      <path class="f-liver" d="M168 62 C164 58 160 64 162 70 C163 76 170 78 172 72 C168 70 168 66 168 62 Z"/>
      <circle class="f-bone ans a-pop" cx="166" cy="70" r="2.3"/>
      <g class="ans">${['M150 82 L150 28', 'M150 82 L153 35', 'M150 82 L137 136', 'M150 82 L163 156', 'M150 82 L166 70'].map(d => line(d, 'var(--c-bad)', 1.5, 'class="a-flow"')).join('')}</g>
      ${lead('M100 22 L140 22')}${lead('M200 36 L157 34')}${lead('M100 140 L131 140')}${lead('M200 158 L168 158')}${lead('M200 90 L170 72')}
      ${qtag(64, 22, 'Eyes: uveitis, iritis', 9.5)}${qtag(240, 36, 'Mouth ulcers')}
      ${qtag(62, 140, 'Joint pain')}${qtag(244, 158, 'Erythema nodosum', 9.5)}
      ${qtag(238, 96, 'Kidney stones', 9.5)}<g class="ans">${txt(238, 114, '(Crohn)', 9.5)}</g>`),

    megacolon: ART(`
      ${T('M78 152 L78 62 Q78 48 92 48 L208 48 Q222 48 222 62 L222 118 C222 142 192 126 176 138 C166 146 154 146 152 158 L152 172', 'large', 13)}
      ${T('M120 78 C150 72 180 78 178 90 C176 102 124 96 122 108 C120 120 174 114 174 126 C172 138 110 134 84 146', 'small', 6)}
      <g class="ansmotion"><ellipse class="f-large" cx="150" cy="50" rx="62" ry="7"><animate attributeName="ry" dur="4s" repeatCount="indefinite" keyTimes="0;.45;.85;1" values="7;26;26;7"/><animate attributeName="rx" dur="4s" repeatCount="indefinite" keyTimes="0;.45;.85;1" values="62;76;76;62"/></ellipse>
        <circle cx="132" cy="46" r="4" fill="#fff" opacity=".6"><animate attributeName="r" dur="4s" repeatCount="indefinite" keyTimes="0;.45;.85;1" values="1;6;6;1"/></circle>
        <circle cx="166" cy="54" r="4" fill="#fff" opacity=".6"><animate attributeName="r" dur="4s" repeatCount="indefinite" keyTimes="0;.45;.85;1" values="1;5;5;1"/></circle></g>
      <g class="ans">${line('M150 22 L150 78', 'var(--pic-ink)', 1.2, 'stroke-dasharray="3 2"')}${tag(150, 14, 'over 6 cm', '', 9)}</g>
      ${qtag(150, 96, 'Colon rapidly dilates', 9.5)}
      <g class="ans">${tag(150, 118, 'Complication of UC', '', 9.5)}</g>
      ${thermo(34, 86)}
      <g class="ansmotion"><rect class="noline" x="31.5" y="78" width="5" height="16" rx="2" style="fill:var(--c-blood)"><animate attributeName="y" dur="4s" repeatCount="indefinite" values="94;56;56;94" keyTimes="0;.45;.85;1"/><animate attributeName="height" dur="4s" repeatCount="indefinite" values="8;46;46;8" keyTimes="0;.45;.85;1"/></rect></g>
      ${qtag(34, 124, 'Fever')}
      ${heart(266, 60, 'a-beat', 1.4)}${qtag(266, 88, 'Fast pulse')}
      ${wbc(254, 124, 'class="a-pop" style="--d:1"')}${wbc(270, 120, 'class="a-pop" style="--d:2"')}${wbc(264, 134, 'class="a-pop" style="--d:3"')}${wbc(280, 132, 'class="a-pop" style="--d:4"')}
      ${qtag(262, 156, 'High WBC')}
      <g class="ans">${tag(48, 156, 'Life-threatening', '', 9)}</g>`),

    ibdDx: ART(`
      ${g(98, 32, `${T(SI, 'small', 6)}${colon(12)}
        <g class="ans"><path d="M50 104 ${COLR.slice(1)}" class="a-draw" pathLength="400" ${st('var(--art-line)', 2.5)}/></g>
        <g class="ansmotion"><g><rect class="f-white" x="-4" y="-2.5" width="8" height="5" rx="2.5"/><animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="${SI}"/></g></g>`, '', 1.05)}
      ${qtag(150, 18, 'Colonoscopy + biopsy', 9.5)}
      ${qtag(150, 166, 'Capsule camera', 9.5)}
      ${g(30, 56, `<rect class="f-white" x="-7" y="-24" width="14" height="44" rx="7"/><rect class="f-blood noline" x="-5" y="-6" width="10" height="24" rx="5"/><rect class="f-good" x="-9" y="-28" width="18" height="8" rx="2"/>`)}
      <g class="ans">${line('M45 38 L45 54 L49 50 M45 54 L41 50', 'var(--c-bad)', 2, 'class="a-bob"')}</g>
      ${qtag(48, 94, 'CRP, ESR')}
      ${g(30, 136, `<circle cx="0" cy="0" r="17" class="f-white"/><circle cx="0" cy="0" r="9" fill="var(--surface)" style="stroke:var(--art-line);stroke-width:1.5px"/><rect class="f-mucus" x="-24" y="2" width="48" height="5" rx="2"/>`)}
      <g class="ans"><circle cx="30" cy="136" r="13" fill="none" class="s-immune a-spin" style="stroke-width:2px" stroke-dasharray="6 6"/></g>
      ${qtag(48, 166, 'CT / MRI')}
      ${g(252, 40, `<path class="f-white" d="M-12 -10 L12 -10 L10 14 L-10 14 Z"/><rect class="f-warn" x="-14" y="-16" width="28" height="7" rx="2"/><path class="f-stool" d="M-6 6 Q0 -4 6 6 Z"/>`)}
      ${qtag(252, 72, 'Calprotectin')}
      ${g(252, 120, `<ellipse class="f-white" cx="0" cy="0" rx="20" ry="9"/><ellipse class="f-fat" cx="0" cy="-1" rx="15" ry="6"/>`)}
      <g class="ans">${germ(246, 119, 0, 'class="a-pop"')}${germ(256, 117, 60, 'class="a-pop" style="--d:2"')}</g>
      ${qtag(252, 146, 'Stool culture')}`),

    ladder: ART(`
      ${line('M58 172 L58 8 M118 172 L118 8', 'var(--c-food)', 6)}
      ${[['good', 150], ['nerve', 112], ['warn', 74], ['bad', 36]].map(([c, y], i) => `<rect class="f-${c} a-pop" style="--d:${i}" x="54" y="${y - 5}" width="68" height="10" rx="4"/>`).join('')}
      <g class="ansmotion"><g>${person(0, 0, 'f-immune')}<animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;.15;.25;.4;.5;.65;.75;1" keyPoints="0;0;.333;.333;.667;.667;1;1" calcMode="linear" path="M88 140 L88 102 L88 64 L88 26"/></g></g>
      <defs><linearGradient id="ch95-sev" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#06d6a0"/><stop offset=".5" stop-color="#ff9f1c"/><stop offset="1" stop-color="#ef476f"/></linearGradient></defs>
      <path d="M22 168 L22 20" fill="none" style="stroke:url(#ch95-sev);stroke-width:8px;stroke-linecap:round"/>
      <path d="M12 26 L22 8 L32 26 Z" fill="#ef476f"/>
      <text class="ink" x="40" y="96" text-anchor="middle" transform="rotate(-90 40 96)" style="font-size:9.5px;font-weight:700">more severe</text>
      ${qtag(196, 150, '5-ASA: mild')}${qtag(198, 112, 'Steroids: mod-severe', 9.5)}
      ${qtag(196, 74, 'Immune modulators', 9.5)}${qtag(198, 36, 'Biologics: infliximab', 9.5)}
      <g class="ans">${txt(198, 54, 'adalimumab', 9)}</g>
      ${pill(278, 150, -20, 'good')}${pill(278, 112, 20, 'warn')}${pill(278, 74, -20, 'germ')}
      ${g(278, 36, `<rect class="f-water" x="-8" y="-14" width="16" height="20" rx="3"/>${line('M0 6 L0 16', 'var(--c-vein)', 2)}`)}${drop(278, 22, 'f-water', 'class="a-drop"', .6)}`),

    diet: ART(`
      ${tag(75, 14, 'Crohn')}${tag(225, 14, 'Ulcerative colitis')}
      <circle class="f-white" cx="75" cy="78" r="44"/><circle cx="75" cy="78" r="34" fill="none" style="stroke:var(--art-line);stroke-width:1px" opacity=".4"/>
      <g class="a-pop" style="--d:0"><path class="f-white" d="M48 82 Q60 56 76 82 Z"/>${[[56, 76], [62, 70], [68, 76], [60, 80], [66, 66]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="1.2" fill="#d9d2c0"/>`).join('')}</g>
      <g class="a-pop" style="--d:1"><path class="f-food" d="M82 60 C96 56 104 66 96 76 L90 82 L86 78 C80 74 76 64 82 60 Z"/><rect class="f-bone" x="86" y="80" width="5" height="12" rx="2" transform="rotate(30 88 86)"/></g>
      <g class="a-pop" style="--d:2"><path class="f-fat" d="M58 92 Q58 86 66 86 L84 86 Q92 86 92 92 L92 108 L58 108 Z"/></g>
      ${g(18, 40, `<circle class="f-good" cx="-3" cy="2" r="6"/><circle class="f-good" cx="4" cy="-3" r="5"/><circle class="f-nerve" cx="5" cy="5" r="2.5"/>`)}
      ${xmark(18, 40, 11, 'class="ans a-pop" style="--d:3"')}
      <circle class="f-white" cx="225" cy="78" r="44"/><circle cx="225" cy="78" r="34" fill="none" style="stroke:var(--art-line);stroke-width:1px" opacity=".4"/>
      <g class="a-pop" style="--d:1">${[[204, 66], [212, 60], [212, 72]].map(([x, y]) => `<circle class="f-good" cx="${x}" cy="${y}" r="7"/>`).join('')}${line('M210 76 L214 90', 'var(--c-good)', 4)}</g>
      <g class="a-pop" style="--d:2">${[[236, 62], [244, 68], [234, 72], [242, 58]].map(([x, y]) => `<ellipse class="f-muscle" cx="${x}" cy="${y}" rx="5" ry="3.5"/>`).join('')}</g>
      <g class="a-pop" style="--d:3"><path class="f-food" d="M206 90 Q206 82 216 82 L236 82 Q246 82 246 90 L246 106 L206 106 Z"/>${[[214, 92], [224, 96], [234, 90], [238, 100], [218, 101]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#6b4226"/>`).join('')}</g>
      <g class="a-pop" style="--d:4"><path class="f-food" d="M250 70 C262 66 268 74 262 82 L258 86 L254 84 C248 80 246 72 250 70 Z"/></g>
      ${qtag(75, 132, 'Low-residue')}${qtag(225, 132, 'High-fiber')}
      ${qtag(150, 154, 'Both: high calorie, high protein', 9)}
      <g class="ans">${tag(150, 172, 'Both: screen for colon cancer', '', 9)}</g>`),

    // ===================== IBS =====================
    ibs: ART(`
      ${tag(75, 14, 'IBS')}${tag(225, 14, 'IBD')}
      <g class="a-squeeze" style="animation-duration:2s"><circle class="f-small" cx="75" cy="78" r="44"/>
        <path class="f-white" d="${[...Array(16)].map((_, i) => { const a = i / 16 * Math.PI * 2, r = i % 2 ? 22 : 17; return (i ? 'L' : 'M') + (75 + Math.cos(a) * r).toFixed(1) + ' ' + (78 + Math.sin(a) * r).toFixed(1); }).join(' ')} Z"/></g>
      <g class="ans">${bolt(34, 42, 'class="a-blink"')}${bolt(118, 50, 'class="a-blink" style="animation-delay:.4s"')}${bolt(116, 112, 'class="a-blink" style="animation-delay:.8s"')}${bolt(32, 114, 'class="a-blink" style="animation-delay:.2s"')}
        ${check(75, 78)}</g>
      <circle class="f-bad" cx="225" cy="78" r="44"/>
      <path class="f-white" d="${[...Array(16)].map((_, i) => { const a = i / 16 * Math.PI * 2, r = i % 2 ? 22 : 17; return (i ? 'L' : 'M') + (225 + Math.cos(a) * r).toFixed(1) + ' ' + (78 + Math.sin(a) * r).toFixed(1); }).join(' ')} Z"/>
      ${[[0.6, 'a'], [2.3, 'b'], [4.1, 'c']].map(([a]) => `<ellipse class="f-tumor" cx="${(225 + Math.cos(a) * 24).toFixed(1)}" cy="${(78 + Math.sin(a) * 24).toFixed(1)}" rx="6" ry="4" transform="rotate(${(a * 57.3 + 90).toFixed(0)} ${(225 + Math.cos(a) * 24).toFixed(1)} ${(78 + Math.sin(a) * 24).toFixed(1)})"/>`).join('')}
      <g class="ans">${[[212, 76], [228, 84], [236, 70]].map(([x, y], i) => drop(x, y, 'f-blood', `class="a-drop" style="animation-delay:${i * .5}s"`, .8)).join('')}
        ${[[0.2], [1.4], [2.9], [3.6], [5.2]].map(([a], i) => immune(+(225 + Math.cos(a) * 38).toFixed(1), +(78 + Math.sin(a) * 38).toFixed(1), 4.5, 'a-pulse')).join('')}</g>
      ${qtag(75, 140, 'Functional')}${qtag(225, 140, 'Inflammatory')}
      <g class="ans">${tag(75, 162, 'no damage', '', 9.5)}${tag(225, 162, 'ulcers, bleeding, damage', '', 9.5)}</g>`),

    ibsCause: ART(`
      ${g(150, 30, `<path class="f-mouth" d="M-30 6 C-34 -14 -16 -24 0 -22 C16 -24 34 -14 30 6 C28 16 12 18 0 16 C-12 18 -28 16 -30 6 Z"/>${line('M0 -22 L0 16 M-20 -8 q6 4 12 0 M8 -4 q6 4 12 0 M-18 6 q6 -3 10 2', 'var(--art-line)', 1.2)}`)}
      <g class="ans">${bolt(108, 18, 'class="a-blink"')}${bolt(192, 20, 'class="a-blink" style="animation-delay:.6s"')}</g>
      ${line('M144 50 C140 70 140 80 144 100', 'var(--c-nerve)', 3, 'class="a-flow"')}${line('M156 100 C160 80 160 70 156 50', 'var(--c-nerve)', 3, 'class="a-flow" style="animation-direction:reverse"')}
      ${g(110, 98, colon(12, `<path d="${COL}" ${st('var(--c-muscle)', 4)} class="a-flow" opacity=".7"/>`) + `<g class="ans">${germ(36, 40, 0, 'class="a-bob"')}${germ(60, 50, 40, 'class="a-bob"')}</g>`, '', .78)}
      <g class="ans">${g(222, 136, `<path class="f-white" d="M-12 -6 L-4 -6 L6 -14 L6 14 L-4 6 L-12 6 Z"/>${[10, 16, 22].map((r, i) => `<path class="a-pulse" style="animation-delay:${i * .25}s" d="M${r} -${r * .6} A${r} ${r} 0 0 1 ${r} ${r * .6}" fill="none" stroke="var(--c-bad)" stroke-width="2"/>`).join('')}`)}</g>
      ${qtag(52, 30, 'Stress, mood')}${qtag(248, 30, 'Gut-brain axis', 9.5)}
      ${lead('M86 110 L112 120')}${lead('M86 150 L136 140')}
      ${qtag(48, 110, 'Altered motility', 9.5)}${qtag(48, 150, 'Bacteria, food', 9.5)}
      ${qtag(250, 104, 'Oversensitive gut', 9.5)}<g class="ans">${txt(250, 120, 'visceral hyperalgesia', 9)}</g>
      ${qtag(250, 168, 'More in women', 9.5)}`),

    ibsSx: ART(`
      ${g(40, 50, `<ellipse class="f-skin" cx="0" cy="0" rx="24" ry="26"/><circle class="f-bad a-pulse" cx="0" cy="4" r="11" opacity=".85"/><path class="a-spin" d="M0 -2 A6 6 0 1 1 -6 4 A3 3 0 1 1 0 1" fill="none" style="stroke:#fff;stroke-width:2px"/>`)}
      ${line('M72 50 L100 50', 'var(--pic-ink)', 2.5, 'class="a-flow"')}
      ${toilet(150, 56, 1.05)}
      ${line('M182 50 L222 50', 'var(--pic-ink)', 2.5, 'class="a-flow"')}
      ${g(258, 50, `<ellipse class="f-skin" cx="0" cy="0" rx="24" ry="26"/><circle class="f-good ans a-pop" cx="0" cy="4" r="11"/>${line('M-6 4 L-2 8 L6 0', '#fff', 2.5, 'class="ans"')}`)}
      ${qtag(150, 96, 'Cramps eased by a BM', 9.5)}
      ${g(22, 126, `<ellipse class="f-skin a-pulse" cx="0" cy="0" rx="14" ry="13"/><circle class="f-mucus" cx="-4" cy="-2" r="3"/><circle class="f-mucus" cx="4" cy="3" r="3.5"/>`)}
      ${qtag(88, 126, 'Bloating, gas')}
      ${g(154, 126, `${[-12, -6, 0].map(x => `<circle class="f-stool" cx="${x}" cy="-4" r="3"/>`).join('')}<path class="f-water a-drop" d="M-12 6 Q-6 2 0 6 Q6 10 12 6 L12 10 L-12 10 Z"/>`)}
      ${qtag(232, 126, 'Diarrhea / constipation', 9)}
      ${g(22, 160, `<ellipse class="f-mucus a-bob" cx="-4" cy="0" rx="8" ry="5"/>${drop(9, 0, 'f-blood', '', .8)}${xmark(9, 0, 6, 'class="ans"')}`)}
      ${qtag(88, 160, 'Mucus, no blood')}
      ${g(154, 160, `${toilet(0, 4, .55)}<path d="M8 -12 A6 6 0 1 1 2 -6" fill="none" class="a-spin" style="stroke:var(--c-warn);stroke-width:2px"/>`)}
      ${qtag(232, 160, 'Incomplete emptying', 9.5)}`),

    rome: ART(`
      ${[...Array(12)].map((_, w) => [...Array(7)].map((_, d) => `<rect class="f-white" x="${14 + w * 11}" y="${36 + d * 11}" width="9" height="9" rx="2"/>`).join('')).join('')}
      <g class="ans">${[2, 5, 1, 4, 0, 3, 6, 2, 4, 1, 5, 3].map((d, w) => `<rect class="f-bad a-pop" style="--d:${w}" x="${14 + w * 11}" y="${36 + d * 11}" width="9" height="9" rx="2"/>`).join('')}</g>
      ${line('M14 120 L14 126 L144 126 L144 120', 'var(--pic-ink)', 1.5)}
      ${qtag(79, 20, 'Pain 1+ day a week', 9.5)}
      ${qtag(79, 142, 'for 3 months')}
      <g class="ans">${txt(79, 162, '12 weeks', 9.5)}</g>
      ${qtag(224, 20, '+ 2 or more of:', 9.5)}
      ${toilet(170, 58, .55)}${g(170, 98, `<rect class="f-white" x="-12" y="-10" width="24" height="20" rx="3"/>${line('M-12 -4 H12', 'var(--art-line)', 1)}`)}${on(170, 104, '3×', 9)}
      ${g(170, 138, `<path class="f-stool" d="M-14 -4 C-10 -10 -4 -2 0 -6 C4 -10 10 -2 14 -6 L14 2 C10 6 4 -2 0 2 C-4 6 -10 -2 -14 2 Z"/><ellipse class="f-water" cx="0" cy="8" rx="12" ry="3"/>`)}
      ${qtag(230, 58, 'Tied to BMs')}${qtag(230, 98, 'Frequency change', 9.5)}${qtag(230, 138, 'Form change')}
      <g class="ans">${[58, 98, 138].map((y, i) => check(289, y, `class="a-pop" style="--d:${i + 3}"`)).join('')}</g>`),

    ibsRed: ART(`
      ${[[22, 42, 'Weight loss'], [172, 42, 'Rectal bleeding'], [22, 94, 'Onset after 50'], [172, 94, 'Diarrhea at night'], [22, 146, 'Iron-deficiency anemia'], [172, 146, 'Family hx IBD/GI cancer']].map(([x, y, t], i) =>
        line(`M${x - 8} ${y + 20} L${x - 8} ${y - 18}`, 'var(--pic-ink)', 2) +
        `<g class="a-sway" style="animation-delay:${i * .3}s"><path class="f-bad" d="M${x - 8} ${y - 18} C${x} ${y - 22} ${x + 8} ${y - 14} ${x + 18} ${y - 18} L${x + 18} ${y} C${x + 8} ${y + 4} ${x} ${y - 4} ${x - 8} ${y} Z"/></g>` +
        qtag(x + (i % 2 ? 72 : 76), y - 8, t, t.length > 17 ? 9 : 9.5)).join('')}
      <g class="ans">${line('M10 38 L10 52 M6 48 L10 53 L14 48', '#fff', 2)}${drop(166, 33, 'f-white', '', .7)}
        ${on(18, 89, '50+', 9)}<path d="M168 79 A6 6 0 1 0 172 91 A5 5 0 1 1 168 79 Z" fill="#fff"/>
        <circle cx="15" cy="137" r="5" fill="#fff" opacity=".7"/><circle cx="15" cy="137" r="2" style="fill:var(--c-bad)"/>
        ${line('M164 132 L170 138 L176 132 M170 138 L170 142', '#fff', 1.6)}</g>
      ${tag(150, 172, 'Not IBS: these need a workup', 'ans', 9.5)}${q(150, 172, 8)}`),

    fodmap: ART(`
      <circle class="f-white" cx="58" cy="54" r="38"/>
      <g class="a-pop" style="--d:0"><path class="f-white" d="M34 62 Q46 36 62 62 Z"/></g>
      <g class="a-pop" style="--d:1">${[[64, 36], [70, 40], [76, 34]].map(([x, y]) => `<rect class="f-warn" x="${x}" y="${y}" width="5" height="18" rx="2" transform="rotate(25 ${x} ${y})"/>`).join('')}</g>
      <g class="a-pop" style="--d:2"><ellipse class="f-white" cx="72" cy="70" rx="12" ry="9"/><circle class="f-nerve" cx="72" cy="70" r="4.5"/></g>
      <g class="a-pop" style="--d:3"><path class="f-blood" d="M44 70 C40 66 44 62 48 64 C52 62 56 66 52 70 L48 78 Z"/></g>
      ${check(92, 22, 'class="ans a-pop" style="--d:4"')}
      ${g(166, 48, `<circle class="f-white" cx="0" cy="0" r="12"/><path d="M-8 0 Q0 -10 8 0 M-6 6 Q0 -2 6 6" fill="none" style="stroke:#c9a0dc;stroke-width:1.5px"/>${line('M0 -12 L0 -18', 'var(--c-good)', 2)}`)}
      ${g(200, 48, `<path class="f-white" d="M0 -12 C8 -10 12 0 10 6 C8 12 -8 12 -10 6 C-12 0 -8 -10 0 -12 Z"/>${line('M0 -12 V8 M-5 -8 Q-7 2 -4 9 M5 -8 Q7 2 4 9', 'var(--art-line)', 1)}`)}
      ${g(234, 48, `${[[-6, -4], [4, -6], [-2, 5], [7, 4]].map(([x, y]) => `<ellipse class="f-stool" cx="${x}" cy="${y}" rx="5" ry="3.5" transform="rotate(30 ${x} ${y})"/>`).join('')}`)}
      ${g(268, 48, `<circle class="f-blood" cx="0" cy="2" r="11"/>${line('M0 -9 L2 -16', 'var(--c-food)', 2)}<ellipse class="f-good" cx="6" cy="-14" rx="5" ry="2.5"/>`)}
      <g class="ans">${[166, 200, 234, 268].map((x, i) => xmark(x, 48, 13, `class="a-pop" style="--d:${i + 2}"`)).join('')}</g>
      ${tag(166, 72, 'onion', '', 9)}${tag(200, 72, 'garlic', '', 9)}${tag(234, 72, 'beans', '', 9)}${tag(268, 72, 'apple', '', 9)}
      ${qtag(58, 104, 'Low-FODMAP diet')}${qtag(217, 98, 'Avoid gas-forming foods', 9.5)}
      ${g(20, 136, `<circle class="f-white" cx="0" cy="0" r="11"/><g class="a-spin" style="animation-duration:6s">${line('M0 0 L0 -7', 'var(--art-line)', 1.8)}</g>${line('M0 0 L5 2', 'var(--art-line)', 1.8)}`)}
      ${qtag(92, 136, 'Smaller, regular meals', 9.5)}
      ${g(172, 136, `<circle class="f-good a-pulse" cx="0" cy="-5" r="5"/><path class="f-good" d="M-12 8 Q-6 -2 0 4 Q6 -2 12 8 Z"/>`)}
      ${qtag(234, 136, 'Manage stress')}
      ${pill(20, 166, -20, 'germ', 'class="a-bob"')}
      ${qtag(132, 166, 'Antispasmodics, antidepressants', 9)}`),

    ibsDrugs: ART(`
      ${tag(44, 12, 'Constipation')}
      <rect class="f-large" x="8" y="26" width="284" height="34" rx="17"/>
      <rect x="14" y="32" width="272" height="22" rx="11" fill="var(--surface)" opacity=".7"/>
      <g class="ansmotion"><g>${[0, 9, 18, 30, 39].map(x => `<circle class="f-stool" cx="${x}" cy="43" r="5"/>`).join('')}<animateTransform attributeName="transform" type="translate" dur="4s" repeatCount="indefinite" values="30 0;220 0"/></g></g>
      <g class="q">${[60, 69, 78, 90, 99].map(x => `<circle class="f-stool" cx="${x}" cy="43" r="5"/>`).join('')}</g>
      <g class="ans">${[110, 150, 190, 230].map((x, i) => drop(x, 18, 'f-water', `class="a-drop" style="animation-delay:${i * .35}s"`, .8)).join('')}</g>
      ${qtag(150, 76, 'Psyllium, lubiprostone, linaclotide', 9)}
      <g class="ans">${txt(150, 92, 'add bulk + pull water in to speed it up', 9)}</g>
      ${tag(34, 106, 'Diarrhea')}
      <rect class="f-large" x="8" y="118" width="284" height="34" rx="17"/>
      <rect x="14" y="124" width="272" height="22" rx="11" class="f-water noline" opacity=".55"/>
      ${line('M20 135 L270 135', 'var(--c-water)', 4, 'class="a-flow"')}
      <g class="ans">${g(276, 106, `<path class="f-bad" d="M-5 -12 L5 -12 L12 -5 L12 5 L5 12 L-5 12 L-12 5 L-12 -5 Z"/>`)}${on(276, 109.5, 'slow', 9)}</g>
      ${qtag(150, 168, 'Loperamide, bile acid binders, eluxadoline', 9)}`),

    // ===================== DIVERTICULA =====================
    divert: ART(`
      <rect x="0" y="0" width="300" height="60" class="f-mucus noline" opacity=".35"/>
      <rect class="f-large" x="-2" y="60" width="304" height="14"/>
      <rect class="f-skin" x="-2" y="74" width="304" height="14"/>
      <rect class="f-muscle" x="-2" y="88" width="134" height="26"/><rect class="f-muscle" x="168" y="88" width="134" height="26"/>
      <rect class="f-bone" x="-2" y="114" width="134" height="5"/><rect class="f-bone" x="168" y="114" width="134" height="5"/>
      <g class="q"><path class="f-large" d="M132 88 L168 88 L168 114 L132 114 Z" opacity=".55"/></g>
      <g class="ansmotion"><path class="f-large" d="M132 74 L132 114 C126 116 128 118 150 118 C172 118 174 116 168 114 L168 74 Z">
        <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;.6;.9;1" values="M132 74 L132 114 C126 116 128 118 150 118 C172 118 174 116 168 114 L168 74 Z;M132 74 L132 116 C104 128 112 166 150 166 C188 166 196 128 168 116 L168 74 Z;M132 74 L132 116 C104 128 112 166 150 166 C188 166 196 128 168 116 L168 74 Z;M132 74 L132 114 C126 116 128 118 150 118 C172 118 174 116 168 114 L168 74 Z"/></path></g>
      ${line('M200 178 C200 150 182 132 170 120 C164 112 158 104 154 92', 'var(--c-blood)', 4)}
      ${line('M154 92 C150 84 146 80 140 76', 'var(--c-blood)', 2.5)}
      <g class="ans">${[60, 110, 190, 240].map((x, i) => g(x, 34, `<g class="a-bob" style="animation-delay:${i * .3}s">${line('M0 -10 L0 10 M-5 4 L0 11 L5 4', 'var(--c-bad)', 3)}</g>`)).join('')}</g>
      ${tag(30, 102, 'Muscle', '', 9)}${tag(30, 67, 'Mucosa', '', 9)}
      ${qtag(150, 18, 'High pressure inside colon', 9.5)}
      ${lead('M200 132 L224 136')}${qtag(250, 140, 'Weak spot where', 9.5)}<g class="ans">${tag(250, 157, 'an artery enters', '', 9.5)}</g>
      ${lead('M118 150 L100 152')}${qtag(56, 152, 'Mucosa pouches out', 9.5)}`),

    divRisk: ART(`
      ${g(110, 52, sig('f-large', 'a-grow'), '', .8)}
      ${g(22, 30, `<path class="f-muscle" d="M-12 -2 C-14 -10 0 -12 8 -8 C14 -5 14 4 8 7 C0 10 -10 6 -12 -2 Z"/><ellipse class="f-fat" cx="-3" cy="-1" rx="4" ry="2.5"/>`)}
      ${qtag(88, 30, 'Low fiber, red meat', 9.5)}
      ${g(22, 85, `${person(0, 6, 'f-warn')}<ellipse class="f-warn" cx="0" cy="8" rx="11" ry="9"/>`)}
      ${qtag(80, 85, 'Obesity')}
      ${g(22, 140, `<rect class="f-germ" x="-14" y="-4" width="28" height="10" rx="3"/><rect class="f-germ" x="-14" y="-12" width="6" height="18" rx="2"/><rect class="f-germ" x="8" y="-12" width="6" height="18" rx="2"/>`)}${on(28, 124, 'z z', 9)}
      ${qtag(80, 140, 'Inactivity')}
      ${g(278, 30, `<rect class="f-white" x="-14" y="-3" width="22" height="6"/><rect class="f-warn" x="8" y="-3" width="6" height="6"/>${line('M-16 -6 q-3 -4 0 -8', 'var(--pic-ink)', 1.3, 'class="a-rise" opacity=".6"')}`)}
      ${qtag(222, 30, 'Smoking')}
      ${g(278, 85, `${toilet(0, 6, .6)}${drop(10, -16, 'f-water', 'class="a-drop"', .6)}`)}
      ${qtag(222, 85, 'Straining')}
      ${pill(272, 140, -20, 'bad')}${pill(284, 152, 30, 'vein')}
      ${qtag(194, 140, 'Steroids, opioids, NSAIDs', 9)}
      ${qtag(150, 168, 'Age over 60')}`),

    osis: ART(`
      ${tag(75, 14, 'Diverticulosis')}${tag(225, 14, 'Diverticulitis')}
      <line x1="150" y1="4" x2="150" y2="176" style="stroke:var(--pic-ink);stroke-width:1px" stroke-dasharray="3 3" opacity=".5"/>
      ${g(32, 30, sig('f-large'), '', .9)}
      <g class="ans">${drop(92, 122, 'f-blood', 'class="a-drop"', .7)}</g>
      ${g(182, 30, `<g opacity=".35">${T('M20 8 L20 50 C20 80 70 66 76 96', 'bad', 30)}</g>` + sig('f-bad', 'a-pulse'), '', .9)}
      ${thermo(280, 64)}
      ${wbc(262, 112, 'class="a-pop"')}${wbc(276, 118, 'class="a-pop" style="--d:1"')}
      ${qtag(75, 140, 'Pouches, no symptoms', 9.5)}<g class="ans">${txt(75, 160, 'maybe mild bleeding', 9)}</g>
      ${qtag(225, 140, 'Inflamed pouches', 9.5)}${qtag(225, 162, 'LLQ pain, fever, high WBC', 9)}`),

    divCx: ART(`
      <path class="f-large" d="M4 66 L196 66 L208 74 L222 74 L232 66 L296 66 L296 98 L232 98 L222 90 L208 90 L196 98 L4 98 Z"/>
      <rect class="f-scar" x="206" y="70" width="18" height="4"/><rect class="f-scar" x="206" y="90" width="18" height="4"/>
      <g class="a-shake">${[160, 174, 186].map(x => `<circle class="f-stool" cx="${x}" cy="82" r="7"/>`).join('')}</g>
      <circle class="f-large" cx="60" cy="58" r="9"/><ellipse class="f-bile a-pulse" cx="60" cy="44" rx="20" ry="12"/>
      <circle class="f-bad" cx="258" cy="58" r="9"/>
      <g class="ans">${[0, 1].map(i => drop(250 + i * 14, 80, 'f-blood', `class="a-drop" style="animation-delay:${i * .6}s"`, .8)).join('')}</g>
      <circle class="f-bad" cx="100" cy="106" r="9"/><circle cx="100" cy="113" r="3" fill="#2a1a10"/>
      <g class="ans">${line('M100 116 C96 126 84 128 78 134 M100 116 C108 126 118 126 122 134', 'var(--c-stool)', 2.5, 'class="a-flow"')}</g>
      <ellipse class="f-bad ans a-grow" cx="100" cy="138" rx="34" ry="7" opacity=".35"/>
      <circle class="f-bad" cx="176" cy="106" r="9"/>
      ${T('M176 114 C178 124 190 130 196 134', 'stool', 4)}
      <ellipse class="f-pancreas" cx="214" cy="146" rx="24" ry="16"/><text x="214" y="152" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#1d2238">bladder</text>
      <g class="ans">${[0, 1, 2].map(i => `<circle class="f-white a-rise" cx="${190 + i * 6}" cy="128" r="2.2" style="animation-delay:${i * .5}s"/>`).join('')}</g>
      ${lead('M174 30 L192 74')}
      ${qtag(60, 18, 'Abscess')}${qtag(160, 22, 'Obstruction')}${qtag(258, 22, 'Bleeding')}
      ${qtag(74, 162, 'Perforation, peritonitis', 9.5)}${qtag(268, 120, 'Fistula')}`),

    divTx: ART(`
      ${tag(75, 12, 'Acute')}${tag(225, 12, 'Long term')}
      <line x1="150" y1="4" x2="150" y2="146" style="stroke:var(--pic-ink);stroke-width:1px" stroke-dasharray="3 3" opacity=".5"/>
      ${g(22, 42, `<circle class="f-white" cx="0" cy="0" r="14"/><circle cx="0" cy="0" r="7" fill="var(--surface)" style="stroke:var(--art-line);stroke-width:1.2px"/><rect class="f-mucus" x="-18" y="2" width="36" height="4" rx="2"/>`)}
      <g class="ans"><circle cx="22" cy="42" r="10.5" fill="none" class="s-immune a-spin" style="stroke-width:2px" stroke-dasharray="5 5"/></g>
      ${qtag(88, 42, 'CT with contrast', 9.5)}
      ${g(22, 84, `<rect class="f-water" x="-9" y="-14" width="18" height="20" rx="4"/>${line('M0 6 L0 16', 'var(--c-vein)', 2)}`)}${on(22, 83, 'Rx', 9)}${drop(22, 104, 'f-water', 'class="a-drop"', .55)}
      ${qtag(88, 84, 'Antibiotics')}
      ${g(22, 126, `<path class="f-white" d="M-9 -14 L9 -14 L7 12 L-7 12 Z"/><path class="f-water noline" d="M-8 -4 L8 -4 L7 11 L-7 11 Z" opacity=".5"/>`)}
      ${qtag(88, 126, 'Clear liquids, rest', 9.5)}
      ${g(172, 42, `<circle class="f-good" cx="-4" cy="-4" r="6"/><circle class="f-good" cx="4" cy="-6" r="6"/><circle class="f-good" cx="0" cy="-10" r="5"/>${line('M0 -2 L0 12', 'var(--c-good)', 4)}`, 'class="a-pop"')}
      ${qtag(238, 42, 'High fiber')}
      ${g(172, 84, `<rect class="f-water" x="-6" y="-14" width="12" height="28" rx="4"/><rect class="f-vein" x="-4" y="-18" width="8" height="5" rx="1.5"/>`, 'class="a-pop" style="--d:1"')}
      ${qtag(238, 84, 'Plenty of fluids', 9.5)}
      ${g(172, 128, toilet(0, 4, .55) + xmark(0, -2, 10), 'class="a-pop" style="--d:2"')}
      ${qtag(238, 126, 'No straining')}
      ${g(30, 162, `<ellipse class="f-food" cx="-8" cy="0" rx="6" ry="4"/><ellipse class="f-fat" cx="4" cy="-2" rx="3" ry="2"/><ellipse class="f-fat" cx="10" cy="2" rx="3" ry="2"/><ellipse class="f-nerve" cx="22" cy="0" rx="4" ry="8"/>`)}
      ${check(275, 162, 'class="ans a-pop" style="--d:3"')}
      ${qtag(162, 162, 'Nuts, seeds, corn are fine', 9.5)}`),

    meckel: ART(`
      ${T('M40 10 L40 160', 'large', 22)}
      ${T('M44 124 C80 124 100 108 140 112 C180 116 220 104 292 110', 'small', 14)}
      <g class="a-sway">${T('M200 108 C202 92 196 78 204 64', 'small', 10)}</g>
      <circle class="f-muscle" cx="47" cy="124" r="4"/>
      ${tag(40, 170, 'Cecum', '', 9)}${tag(268, 130, 'Ileum', '', 9)}
      ${line('M50 146 L200 146', 'var(--c-nerve)', 3, 'class="a-draw" pathLength="400"')}
      ${line('M50 140 L50 152 M200 140 L200 152', 'var(--pic-ink)', 1.5)}
      ${line('M216 62 L216 106', 'var(--c-nerve)', 2.5, 'class="ans"')}
      ${qtag(125, 164, '2 feet from IC valve', 9.5)}
      ${lead('M220 84 L240 64')}${qtag(252, 52, '2 inches long', 9.5)}
      ${qtag(110, 22, '2% of people')}${qtag(110, 46, 'Males 2:1')}
      ${qtag(110, 70, 'Trouble before age 2', 9.5)}
      ${lead('M168 72 L196 84')}
      <g class="ans">${tag(240, 22, 'Meckel diverticulum', '', 9)}</g>${q(240, 22, 8)}`),
  });
}
