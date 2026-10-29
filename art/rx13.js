/* Pharmacology rx13-arrhythmia art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 13 antiarrhythmics. Everything lives inside one function so the helpers never clash. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" style="stroke-width:1;stroke-dasharray:2 3"/>`;
  const wire = (d, c = 'var(--c-nerve)', w = 2.6) => `<path d="${d}" style="fill:none;stroke:var(--art-line);stroke-width:${w + 1.8};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const ln = (d, c = 'var(--art-line)', w = 2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;

  /* ---------- icons ---------- */
  const pill = (x, y, rot = -30, c = 'f-warn', s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const tab = (x, y, c = 'f-white', r = 7) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .6} ${y} H${x + r * .6}" style="stroke:var(--art-line);stroke-width:1.2"/>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:var(--c-bad);stroke-width:3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" style="stroke:var(--c-bad);stroke-width:3"/>`;
  const check = (x, y, d = 0, r = 7) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="${r}"/><path class="s-white" d="M${x - r / 2} ${y} l${r * .36} ${r * .38} l${r * .64} ${-r * .72}" style="stroke-width:2"/></g>`;
  const bolt = (x, y, s = 1) => G(x, y, s, `<path class="f-nerve" d="M2 -12 L-6 2 L0 2 L-3 12 L7 -3 L1 -3 Z"/>`);
  const warn = (x, y, s = 1) => G(x, y, s, `<path class="f-warn" d="M0 -11 L11 9 L-11 9 Z"/><path d="M0 -4 V3 M0 5.5 V6" style="stroke:var(--art-line);stroke-width:2.2;stroke-linecap:round"/>`);
  const HEART = 'M50 16 C38 0 6 2 6 32 C6 58 30 78 52 98 C74 78 96 56 96 32 C96 4 64 0 50 16 Z';
  const ATRIA = 'M50 18 C40 5 12 7 11 30 L11 42 L89 42 L89 30 C88 6 60 5 50 18 Z';
  const CS1 = 'M26 22 Q36 32 48 42', CS2 = 'M48 42 L50 54 M50 54 Q38 68 40 86 Q30 84 22 64 M50 54 Q62 68 62 86 Q72 84 80 62';
  // heart, local box 0..100; viewer's left = right atrium/ventricle. o.cs draws the conduction system, o.in adds local art
  const heart = (x, y, s, o = {}) => G(x, y, s, `<path class="${o.c || 'f-muscle'}" d="${HEART}"/><path class="f-mouth" d="${ATRIA}" style="opacity:.95"/>` +
    `<path d="M50 44 L52 94" style="stroke:var(--art-line);stroke-width:1.2;opacity:.45"/>` +
    (o.cs ? wire(CS1) + wire(CS2) + `<circle class="f-nerve" cx="26" cy="22" r="4.5"/><circle class="f-nerve" cx="48" cy="42" r="4"/>` : '') + (o.in || ''));
  const spark = (path, dur = 1.6, begin = 0, extra = '', r = 3.2, c = '#fff') => `<circle r="${r}" style="fill:${c};stroke:var(--c-warn);stroke-width:1.5"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}" ${extra}/></circle>`;
  const LIVER = 'M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z';
  const liver = (x, y, s = 1) => G(x, y, s, `<path class="f-liver" d="${LIVER}"/>`);
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1) => G(x, y, s, `<path class="f-mouth" d="${BRAIN}"/><path d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" style="fill:none;stroke:var(--art-line);stroke-width:1.2;opacity:.6"/>`);
  const LOBE = 'M-5 4 C-14 0 -34 14 -36 40 C-37 56 -24 60 -10 52 C-5 48 -3 24 -5 4 Z';
  const lungs = (x, y, s = 1, c = 'f-mouth') => G(x, y, s, `<path class="${c}" d="${LOBE}"/><g transform="scale(-1 1)"><path class="${c}" d="${LOBE}"/></g>` + ln('M0 -14 V4 M0 4 L-8 16 M0 4 L8 16', 'var(--art-line)', 3));
  const eye = (x, y, s = 1, iris = 'f-vein') => G(x, y, s, `<path class="f-white" d="M-16 0 Q0 -13 16 0 Q0 13 -16 0 Z"/><circle class="${iris}" r="5.5"/><circle r="2.4" style="fill:#111"/>`);
  const thyroid = (x, y, s = 1) => G(x, y, s, `<path class="f-stomach" d="M-2 -2 C-8 -12 -20 -10 -20 2 C-20 12 -8 14 -2 6 Z M2 -2 C8 -12 20 -10 20 2 C20 12 8 14 2 6 Z"/><rect class="f-stomach" x="-4" y="-2" width="8" height="7" rx="2"/>`);
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const kidney = (x, y, s = 1) => G(x, y, s, `<path class="f-muscle" d="${KID}"/>`);
  const sun = (x, y, r = 9) => `<g transform="translate(${x} ${y})"><g class="a-spin">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 ${-r - 3} V${-r - 8}" transform="rotate(${a})" style="stroke:var(--c-warn);stroke-width:2.5;stroke-linecap:round"/>`).join('')}<circle class="f-nerve" r="${r}"/></g></g>`;
  const hospital = (x, y, s = 1) => G(x, y, s, `<rect class="f-white" x="-20" y="-16" width="40" height="32" rx="2"/><rect class="f-white" x="-8" y="-26" width="16" height="12" rx="2"/><path d="M0 -24 V-16 M-4 -20 H4" style="stroke:var(--c-bad);stroke-width:2.6"/>` +
    [-13, -3, 7].map(a => `<rect class="f-water" x="${a}" y="-10" width="6" height="6" rx="1"/><rect class="f-water" x="${a}" y="0" width="6" height="6" rx="1"/>`).join('') + `<rect class="f-vein" x="-4" y="8" width="8" height="8"/>`);
  const vial = (x, y, lvl = .5, c = 'var(--c-bad)') => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-5" y="-14" width="10" height="28" rx="5"/><rect x="-3.5" y="${-12 + 24 * (1 - lvl)}" width="7" height="${24 * lvl}" rx="3" style="fill:${c}"/><rect class="f-scar" x="-6" y="-17" width="12" height="5" rx="1.5"/></g>`;
  const cal = (x, y, txt, s = 1) => G(x, y, s, `<rect class="f-white" x="-14" y="-12" width="28" height="26" rx="3"/><rect class="f-bad" x="-14" y="-12" width="28" height="7" rx="2"/><path d="M-8 -15 V-9 M8 -15 V-9" style="stroke:var(--art-line);stroke-width:2"/>`) + T(x, y + 9 * s, txt, { s: 9, c: 'tagtx' });
  const grapefruit = (x, y, r = 12) => `<circle class="f-warn" cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r - 3}" style="fill:#ff8a8a"/>` +
    [0, 60, 120].map(a => `<path d="M${x} ${y - r + 3} V${y + r - 3}" transform="rotate(${a} ${x} ${y})" style="stroke:#ffd0c8;stroke-width:1.4"/>`).join('');
  const bracelet = (x, y) => `<g transform="translate(${x} ${y})"><ellipse rx="34" ry="13" style="fill:none;stroke:#b8bfd0;stroke-width:5"/><ellipse rx="34" ry="13" style="fill:none;stroke:var(--art-line);stroke-width:1;opacity:.5"/><rect class="f-white" x="-15" y="-10" width="30" height="20" rx="5"/><path d="M0 -6 V6 M-6 0 H6" style="stroke:var(--c-bad);stroke-width:3.5"/></g>`;

  /* ---------- ECG monitor strips ---------- */
  const K = {
    p: (a = 1) => ({ w: 6, d: `q3 ${-6 * a} 6 0` }),
    h: n => ({ w: n, d: `h${n}` }),
    qrs: (a = 1) => ({ w: 8, r: 4, d: `l1.5 ${2 * a} l2.5 ${-22 * a} l2.5 ${25 * a} l1.5 ${-5 * a}` }),
    t: (a = 1, w = 10) => ({ w, d: `q${w / 2} ${-9 * a} ${w} 0` }),
    it: (w = 12) => ({ w, d: `q${w / 2} 9 ${w} 0` }),
    pvc: () => ({ w: 18, r: 3, d: 'l3 -20 l6 32 l5 -12 l4 0' }),
    saw: () => ({ w: 9, d: 'l2 -7 l7 7' }),
    fib: (k = 0) => ({ w: 12, d: ['l2 -2.5 l2 3 l2 -1.5 l2 2 l2 -3 l2 2', 'l2 2 l2 -3 l2 1.5 l2 -2.5 l2 3 l2 -1', 'l2 -1.5 l2 2.5 l2 -3 l2 1 l2 2 l2 -1'][k % 3] }),
    delta: () => ({ w: 10, r: 6, d: 'l4 -6 l1.5 -16 l2.5 25 l2 -3' }),
    shock: () => ({ w: 6, d: 'l1 -28 l2 42 l3 -14' }),
    vt: () => ({ w: 14, r: 4, d: 'l4 -18 l5 26 l5 -8' }),
    brug: () => ({ w: 22, r: 4, d: 'l2 3 l2 -24 q6 2 10 16 q4 6 8 5' }),
  };
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).flat();
  const sb = (gap = 10, a = 1) => [K.p(a), K.h(4), K.qrs(a), K.h(5), K.t(a), K.h(gap)];
  const lq = (gap = 8) => [K.p(), K.h(4), K.qrs(), K.h(22), K.t(1, 12), K.h(gap)];
  const af = n => { const g = [2, 1, 3, 1, 2, 4, 1, 2, 3], out = []; for (let i = 0; i < n; i++) { for (let j = 0; j < g[i % 9]; j++) out.push(K.fib(i + j)); out.push(K.qrs(.9)); } return out; };
  const fl = n => rep(n, () => [K.saw(), K.saw(), K.qrs()]);
  const sv = n => rep(n, () => [K.qrs(), K.h(2), K.t(.7, 8), K.h(2)]);
  const tdp = n => Array.from({ length: n }, (_, i) => { const A = +(3 + 17 * Math.abs(Math.sin(Math.PI * i / (n / 2)))).toFixed(1); return { w: 6, d: `l1.5 ${-A} l3 ${2 * A} l1.5 ${-A}` }; });
  const vf = n => Array.from({ length: n }, (_, i) => { const A = [6, 10, 4, 8, 12, 5, 9, 3, 7][i % 9], B = [8, 5, 11, 6, 4, 10, 7, 9, 5][i % 9]; return { w: 7, d: `l2 ${-A} l3 ${A + B} l2 ${-B}` }; });
  let RX = [], Y0 = 0;
  const strip = (x, y, w, h, toks, o = {}) => {
    let d = '', acc = 0; const lim = w - 8; RX = [];
    for (const t of toks) { if (acc + t.w > lim) break; if (t.r) RX.push(x + 4 + acc + t.r); d += ' ' + t.d; acc += t.w; }
    if (acc < lim) d += ` h${(lim - acc).toFixed(1)}`;
    Y0 = y + h * (o.base || .62);
    const p = `M${x + 4} ${Y0}${d}`;
    let grid = '';
    for (let gx = x + 10; gx < x + w - 2; gx += 10) grid += `M${gx} ${y + 2}V${y + h - 2}`;
    for (let gy = y + 10; gy < y + h - 2; gy += 10) grid += `M${x + 2} ${gy}H${x + w - 2}`;
    const st = `fill:none;stroke:${o.c || '#3dff9a'};stroke-width:${o.sw || 1.8};stroke-linejoin:round;stroke-linecap:round`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:#0f2530;stroke:var(--art-line);stroke-width:1.5"/>` +
      `<path d="${grid}" style="fill:none;stroke:#3dff9a;stroke-width:.5;opacity:.16"/>` +
      `<g class="q"><path d="${p}" style="${st}"/></g>` +
      `<g class="ansmotion"><path d="${p}" pathLength="100" style="${st};stroke-dasharray:100 100"><animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;.7;1" dur="${o.dur || 3}s" repeatCount="indefinite"/></path></g>`;
  };

  /* ---------- gauge: needle swings from a1 to a2 degrees (0 = straight up) on the back ---------- */
  const pol = (cx, cy, r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)].map(v => +v.toFixed(1));
  const arc = (cx, cy, r, a1, a2, col, w = 7) => { const [x1, y1] = pol(cx, cy, r, a1), [x2, y2] = pol(cx, cy, r, a2); return `<path d="M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}" style="fill:none;stroke:${col};stroke-width:${w}"/>`; };
  const gauge = (cx, cy, r, a1, a2, txt = '', cols = ['var(--c-vein)', 'var(--c-good)', 'var(--c-bad)']) => {
    const nd = `<path d="M${cx} ${cy} L${cx} ${cy - r + 9}" style="stroke:var(--art-line);stroke-width:3;stroke-linecap:round"/>`;
    return `<path class="f-white" d="M${cx - r - 5} ${cy} A${r + 5} ${r + 5} 0 0 1 ${cx + r + 5} ${cy} Z"/>` +
      arc(cx, cy, r - 2, -84, -30, cols[0]) + arc(cx, cy, r - 2, -30, 30, cols[1]) + arc(cx, cy, r - 2, 30, 84, cols[2]) +
      `<g class="q"><g transform="rotate(${a1} ${cx} ${cy})">${nd}</g></g>` +
      `<g class="ansmotion"><g>${nd}<animateTransform attributeName="transform" type="rotate" values="${a1} ${cx} ${cy};${a2} ${cx} ${cy};${a2} ${cx} ${cy}" keyTimes="0;.45;1" dur="3.4s" repeatCount="indefinite"/></g></g>` +
      `<circle class="f-white" cx="${cx}" cy="${cy}" r="4"/>` + (txt ? T(cx, cy - r * .32, txt, { s: 9, c: 'tagtx' }) : '');
  };

  /* ---------- ion channel in a membrane ---------- */
  const chan = (x, y, c, h = 38) => `<rect class="${c}" x="${x - 14}" y="${y}" width="11" height="${h}" rx="5"/><rect class="${c}" x="${x + 3}" y="${y}" width="11" height="${h}" rx="5"/>`;
  const plug = (x, y, r = 6) => `<circle class="f-bad" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .55} ${y} H${x + r * .55}" style="stroke:#fff;stroke-width:2"/>`;
  const ion = (x, y1, y2, c, dur, begin, bounce = false) => `<circle class="${c}" r="3.6"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="M${x} ${y1} L${x} ${y2}${bounce ? ` L${x} ${y1}` : ''}"/></circle>`;

  // action potential: x0,y0 baseline start, len = plateau length
  const ap = (x0, y0, len) => `M${x0} ${y0} L${x0 + 3} ${y0 - 28} L${x0 + 6} ${y0 - 24} Q${x0 + 6 + len * .5} ${y0 - 24} ${x0 + 6 + len * .8} ${y0 - 14} Q${x0 + 6 + len * .95} ${y0 - 2} ${x0 + 12 + len} ${y0} L${x0 + 118} ${y0}`;

  Object.assign(PICS, {

    /* 1. Normal conduction: SA -> AV (pause) -> His -> bundle branches */
    conduction: ART(`
      <g class="a-beat" style="animation-duration:1.6s">${heart(8, 14, 1.55, { cs: true })}</g>
      <g class="ansmotion">${G(8, 14, 1.55,
        spark('M26 22 Q36 32 48 42 L50 54 Q38 68 40 86 Q30 84 22 64', 1.6, 0, 'keyPoints="0;.29;.29;1" keyTimes="0;.25;.5;1" calcMode="linear"') +
        spark('M26 22 Q36 32 48 42 L50 54 Q62 68 62 86 Q72 84 80 62', 1.6, 0, 'keyPoints="0;.29;.29;1" keyTimes="0;.25;.5;1" calcMode="linear"'))}</g>
      ${L('M56 46 L160 28 M88 78 L160 68 M89 96 L160 106 M108 140 L160 142')}
      ${qtag(226, 28, 'SA node: pacemaker', 9.5)}${qtag(226, 68, 'AV node (pause)', 9.5)}
      ${qtag(226, 106, 'Bundle of His', 9.5)}${qtag(226, 142, 'Bundle branches', 9.5)}
      ${tag(226, 168, '→ ventricles contract', 'ans', 9.5)}`),

    /* 2. Two mechanisms: ectopic focus vs. reentry loop, and the drug fix for each */
    mech: ART(`
      <path d="M150 6 V174" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:2 4;opacity:.5"/>
      <rect class="f-muscle" x="10" y="28" width="130" height="64" rx="10"/>
      <rect class="f-muscle" x="160" y="28" width="130" height="64" rx="10"/>
      <g class="ans">
        <circle cx="75" cy="60" r="10" style="fill:none;stroke:var(--c-nerve);stroke-width:2.5"><animate attributeName="r" values="6;30" dur="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite"/></circle>
        <circle cx="75" cy="60" r="10" style="fill:none;stroke:var(--c-nerve);stroke-width:2.5"><animate attributeName="r" values="6;30" dur="1s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1s" begin=".5s" repeatCount="indefinite"/></circle>
      </g>
      <g class="a-blink" style="animation-duration:.5s"><path class="f-nerve" d="M75 50 L78 57 L85 58 L80 63 L82 70 L75 66 L68 70 L70 63 L65 58 L72 57 Z"/></g>
      <ellipse class="f-scar" cx="225" cy="60" rx="14" ry="10"/>
      ${ln('M225 30 V42', 'var(--c-nerve)', 3)}
      <circle cx="225" cy="60" r="22" style="fill:none;stroke:var(--c-nerve);stroke-width:3;stroke-dasharray:4 3"/>
      <g class="ansmotion">${spark('M225 38 A22 22 0 1 1 224.9 38', 1.1, 0, '', 4)}</g>
      ${qtag(75, 16, '↑ Automaticity', 10)}${qtag(225, 16, 'Reentry', 10)}
      <path d="M14 136 H136" style="stroke:var(--pic-ink);stroke-width:1;opacity:.4"/>
      <path d="M164 136 H286" style="stroke:var(--pic-ink);stroke-width:1;opacity:.4"/>
      <g class="q"><path d="${ap(16, 136, 36)}" style="fill:none;stroke:var(--c-vein);stroke-width:2.2"/><path d="${ap(166, 136, 36)}" style="fill:none;stroke:var(--c-vein);stroke-width:2.2"/></g>
      <g class="ansmotion">
        <path d="${ap(16, 136, 36)}" style="fill:none;stroke:var(--c-vein);stroke-width:2.2"><animate attributeName="d" values="${ap(16, 136, 36)};${ap(16, 136, 70)};${ap(16, 136, 70)};${ap(16, 136, 36)}" keyTimes="0;.35;.85;1" dur="3.4s" repeatCount="indefinite"/></path>
        <rect x="174" y="106" width="34" height="30" rx="3" style="fill:var(--c-bad);opacity:.3"><animate attributeName="width" values="34;66;66;34" keyTimes="0;.35;.85;1" dur="3.4s" repeatCount="indefinite"/></rect>
        <path d="${ap(166, 136, 36)}" style="fill:none;stroke:var(--c-vein);stroke-width:2.2"/>
      </g>
      ${T(75, 104, 'extra beats from an ectopic focus', { s: 9, c: 'ans ink' })}${T(225, 104, 'impulse loops around a block', { s: 9, c: 'ans ink' })}
      ${qtag(75, 160, 'Prolong action potential', 9.5)}${qtag(225, 160, 'Prolong refractory period', 9.5)}`),

    /* 3. Vaughan-Williams: four targets on the heart cell membrane */
    vw: ART(`
      <rect class="f-fat" x="6" y="70" width="288" height="22" rx="4"/>
      ${[42, 112, 188, 258].map((x, i) => tag(x, 14, 'Class ' + ['I', 'II', 'III', 'IV'][i], '', 10)).join('')}
      ${chan(42, 62, 'f-water')}${chan(188, 62, 'f-spleen')}${chan(258, 62, 'f-warn')}
      <path class="f-good" d="M109 100 V72 L100 58 L105 55 L112 66 L119 55 L124 58 L115 72 V100 Z"/>
      <g class="ansmotion">
        ${[0, .4, .8].map(b => ion(42, 28, 56, 'f-water', 1.2, b)).join('')}
        ${[0, .45, .9].map(b => ion(188, 108, 82, 'f-spleen', 1.3, b)).join('')}
        ${[0, .4, .8].map(b => ion(258, 28, 56, 'f-warn', 1.2, b)).join('')}
        <path class="f-warn" d="M112 24 l5 6 l-5 6 l-5 -6 Z"><animateMotion dur="1.4s" repeatCount="indefinite" path="M0 0 L0 22 L0 0"/></path>
      </g>
      <g class="ans">
        <g class="a-pop" style="--d:0">${plug(42, 62)}</g>
        <g class="a-pop" style="--d:1"><rect class="f-bad" x="104" y="52" width="16" height="9" rx="4"/></g>
        <g class="a-pop" style="--d:2">${plug(188, 100)}</g>
        <g class="a-pop" style="--d:3">${plug(258, 62)}</g>
        ${[['lidocaine', 'flecainide'], ['metoprolol', 'propranolol'], ['amiodarone', 'sotalol'], ['verapamil', 'diltiazem']].map(([a, b], i) => T([42, 112, 188, 258][i], 140, a, { s: 9 }) + T([42, 112, 188, 258][i], 152, b, { s: 9 })).join('')}
      </g>
      ${qtag(42, 118, 'Na⁺ block', 9.5)}${qtag(112, 118, 'β block', 9.5)}${qtag(188, 118, 'K⁺ block', 9.5)}${qtag(258, 118, 'Ca²⁺ block', 9.5)}
      ${T(150, 172, 'heart muscle cell membrane', { s: 9 })}`),

    /* 4. Class I subgroups: how hard each plugs the sodium channel */
    classI: ART(`
      <rect class="f-fat" x="6" y="50" width="288" height="22" rx="4"/>
      ${[50, 150, 250].map((x, i) => tag(x, 14, ['IA', 'IB', 'IC'][i], '', 11) + chan(x, 42, 'f-water')).join('')}
      <g class="ansmotion">
        ${[0, .7].map(b => ion(50, 26, 92, 'f-water', 1.8, b)).join('')}
        ${[0, .4, .8, 1.2].map(b => ion(150, 26, 92, 'f-water', 1.6, b)).join('')}
        ${[0, .6].map(b => ion(250, 24, 40, 'f-water', 1.2, b, true)).join('')}
      </g>
      <g class="ans">
        <g class="a-pop" style="--d:0">${plug(50, 50, 5)}</g>
        <g class="a-pop" style="--d:1">${plug(150, 50, 3.5)}</g>
        <g class="a-pop" style="--d:2">${plug(250, 48, 8)}</g>
        ${[[50, 2], [150, 1], [250, 3]].map(([x, n]) => [0, 1, 2].map(k => `<rect x="${x - 17 + k * 12}" y="94" width="10" height="8" rx="2" class="${k < n ? 'f-bad a-pop' : 'f-white'}" style="--d:${k + 2}"/>`).join('')).join('')}
        ${T(50, 140, 'disopyramide', { s: 9 })}${T(50, 151, 'procainamide', { s: 9 })}
        ${T(150, 140, 'lidocaine', { s: 9 })}${T(150, 151, 'weakest', { s: 9 })}
        ${T(250, 140, 'propafenone', { s: 9 })}${tag(250, 160, 'Strongest', 'a-pulse', 9.5)}
      </g>
      ${qtag(50, 122, 'Quinidine', 9.5)}${qtag(150, 122, 'Mexiletine', 9.5)}${qtag(250, 122, 'Flecainide', 9.5)}
      ${T(150, 176, 'Na⁺ block strength', { s: 9, c: 'ans ink' })}`),

    /* 5. AFib: chaotic atria, clot -> stroke, irregular ECG */
    afib: ART(`
      ${heart(8, 24, 1.2, { in: `<g class="a-shake" style="animation-duration:.3s">${ln('M16 24 l4 -4 l3 5 l4 -5 l3 4 M30 34 l4 -4 l3 5 l4 -4 M58 26 l4 -4 l3 5 l4 -5 l3 4 M66 36 l4 -4 l3 5 l4 -4', 'var(--c-nerve)', 2)}</g>` })}
      <circle cx="96" cy="58" r="6" style="fill:#7a1020;stroke:var(--art-line);stroke-width:1.5"/>
      ${brain(214, 18, 1.15)}
      <path d="M100 54 C130 30 170 30 214 36" style="fill:none;stroke:var(--pic-ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.6"/>
      <g class="ansmotion"><circle r="4.5" style="fill:#7a1020;stroke:var(--art-line);stroke-width:1.2"><animateMotion dur="2.6s" repeatCount="indefinite" path="M100 54 C130 30 170 30 222 38"/></circle></g>
      <g class="ans"><g class="a-blink">${bolt(250, 40, .9)}</g></g>
      ${strip(132, 108, 162, 50, af(12), { base: .66 })}
      ${T(213, 172, 'irregular, no P waves', { s: 9, c: 'ans ink' })}
      ${tag(70, 12, 'Most common arrhythmia', 'ans', 9.5)}
      ${qtag(64, 160, 'Disorganized atria', 9.5)}${qtag(100, 78, 'Clot', 9.5)}${qtag(178, 76, 'Stroke risk', 9.5)}`),

    /* 6. AFib by duration: timeline bars */
    afibTypes: ART(`
      <path d="M150 24 V150 M250 24 V150" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:3 4;opacity:.55"/>
      <path d="M100 150 H292" style="stroke:var(--pic-ink);stroke-width:1.6"/>
      ${T(100, 164, 'start', { s: 9 })}${T(150, 164, '7 days', { s: 9 })}${T(250, 164, '1 year', { s: 9 })}
      ${[44, 90, 136].map((y, i) => `<rect class="f-white" x="100" y="${y - 7}" width="190" height="14" rx="7" style="opacity:.6"/>` + tag(50, y, ['Paroxysmal', 'Persistent', 'Permanent'][i], '', 10)).join('')}
      <g class="ansmotion">
        ${[[44, 44, 'var(--c-good)'], [90, 122, 'var(--c-warn)'], [136, 186, 'var(--c-bad)']].map(([y, w, c]) => `<rect x="100" y="${y - 7}" width="${w}" height="14" rx="7" style="fill:${c};stroke:var(--art-line);stroke-width:1.2"><animate attributeName="width" values="0;${w};${w}" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/></rect>`).join('')}
      </g>
      <g class="ans">${check(156, 44, 3)}<g class="a-pop" style="--d:4">${bolt(234, 90, .8)}</g><g class="a-pop" style="--d:5">${nope(282, 118, 8)}</g></g>
      ${qtag(196, 28, 'Stops on its own, under 7 days', 9.5)}${qtag(196, 74, 'Lasts longer than 7 days', 9.5)}${qtag(186, 120, 'Over 1 year, no conversion', 9.5)}`),

    /* 7. AFib rate control: AV node gate + heart-rate gauge */
    rate: ART(`
      <rect class="f-mouth" x="16" y="22" width="120" height="40" rx="12"/>
      <rect class="f-muscle" x="16" y="98" width="120" height="44" rx="12"/>
      <g class="a-shake" style="animation-duration:.25s">${ln('M24 40 l5 -6 l4 7 l5 -7 l4 6 l5 -6 l4 7 M70 48 l5 -6 l4 7 l5 -7 l4 6 l5 -6 l4 7 M90 32 l5 -6 l4 7 l5 -7 l4 6', 'var(--c-nerve)', 2)}</g>
      ${ln('M76 62 V98', 'var(--art-line)', 5)}${ln('M76 62 V98', 'var(--c-nerve)', 3)}
      <circle class="f-nerve" cx="76" cy="80" r="9"/>
      <g class="ansmotion">${spark('M76 58 L76 80 L76 120', 1.8, 0, 'keyPoints="0;.45;.45;1" keyTimes="0;.3;.6;1" calcMode="linear"')}</g>
      <g class="ans"><g class="a-bob">${pill(104, 80, -20, 'f-good')}${pill(46, 80, 20, 'f-vein')}</g></g>
      ${tag(76, 12, 'Chaotic atria', '', 9.5)}${tag(76, 160, 'Ventricles', '', 9.5)}
      ${gauge(228, 66, 44, 64, -10, 'HR')}
      ${qtag(228, 86, 'Beta blockers', 9.5)}${qtag(228, 106, 'Diltiazem, verapamil', 9.5)}${qtag(228, 126, 'Digoxin', 9.5)}
      ${qtag(214, 150, 'With HF: IV amiodarone or digoxin', 9)}`),

    /* 8. Prevent stroke: anticoagulant shield stops clot reaching the brain */
    anticoag: ART(`
      ${heart(10, 18, 1.05)}
      <g class="q"><circle cx="88" cy="50" r="6" style="fill:#7a1020;stroke:var(--art-line);stroke-width:1.5"/></g>
      <g class="ansmotion"><circle cx="88" cy="50" r="6" style="fill:#7a1020;stroke:var(--art-line);stroke-width:1.5"><animate attributeName="r" values="6;1;1;6" keyTimes="0;.4;.9;1" dur="3.6s" repeatCount="indefinite"/></circle></g>
      ${brain(222, 40, 1.15)}
      <path d="M94 46 C130 40 180 44 222 52" style="fill:none;stroke:var(--pic-ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.6"/>
      <g class="ans">
        <g class="a-pulse"><path class="f-immune" d="M170 30 L188 36 V52 C188 64 180 70 170 74 C160 70 152 64 152 52 V36 Z"/>${pill(170, 52, -30, 'f-warn', 1.1)}</g>
        ${check(270, 40, 2)}
      </g>
      ${tag(150, 12, 'Goal: prevent stroke', '', 10)}
      ${qtag(160, 142, 'Anticoagulate: a DOAC first-line', 10)}
      ${tag(160, 166, 'warfarin is also used', 'ans', 9.5)}`),

    /* 9. Rhythm control: AFib shocked back to sinus + the options */
    rhythm: ART(`
      ${strip(8, 8, 284, 52, [...af(5), K.h(4), K.shock(), K.h(10), ...sb(8), ...sb(8), ...sb(8), ...sb(8)], { base: .64, dur: 3.4 })}
      <g class="ans"><g class="a-blink">${bolt(150, 18, .8)}</g></g>
      <g class="ans">
        <g class="a-pop" style="--d:0"><rect class="f-scar" x="30" y="72" width="14" height="22" rx="4"/><rect class="f-scar" x="50" y="72" width="14" height="22" rx="4"/>${bolt(47, 84, .55)}</g>
        <g class="a-pop" style="--d:1">${pill(92, 88, -30, 'f-warn', 1.3)}</g>
        <g class="a-pop" style="--d:2">${pill(140, 84, -30, 'f-spleen', 1.1)}${pill(162, 90, 20, 'f-good', 1.1)}</g>
        <g class="a-pop" style="--d:3"><path class="f-vein" d="M194 72 H222 V88 Q208 100 194 88 Z"/><g class="a-bob">${pill(208, 74, -60, 'f-bad', .9)}</g></g>
        <g class="a-pop" style="--d:4">${ln('M246 74 Q256 90 266 82', 'var(--pic-ink)', 2)}<circle cx="266" cy="82" r="4" style="fill:var(--c-warn)"/></g>
      </g>
      ${qtag(46, 118, 'Cardioversion', 9.5)}${qtag(92, 140, 'Amiodarone', 9.5)}${qtag(150, 118, 'Dronedarone, sotalol', 9.5)}
      ${qtag(208, 140, 'Pill in the pocket', 9.5)}${qtag(262, 118, 'Ablation', 9.5)}
      ${T(64, 164, 'after TEE rules out clot', { s: 9, c: 'ans ink' })}${T(208, 164, 'flecainide or propafenone', { s: 9, c: 'ans ink' })}`),

    /* 10. Pill in the pocket */
    pocket: ART(`
      <path class="f-vein" d="M18 30 H120 V140 Q70 160 18 140 Z"/>
      <path d="M30 42 Q69 84 108 42" style="fill:none;stroke:#1d3d7a;stroke-width:3"/>
      <path d="M26 36 H112" style="fill:none;stroke:#f2c14e;stroke-width:1.5;stroke-dasharray:3 3"/>
      <g class="ans"><g class="a-bob">${pill(69, 50, -55, 'f-bad', 1.6)}</g></g>
      <g class="q">${pill(69, 50, -55, 'f-scar', 1.6)}</g>
      ${qtag(78, 164, 'Flecainide or propafenone', 9.5)}
      ${qtag(226, 18, 'First: beta blocker or CCB', 9.5)}
      <g class="ans">${pill(176, 42, -20, 'f-good')}${pill(198, 42, 20, 'f-vein')}${T(256, 46, 'slows AV node', { s: 9 })}</g>
      ${heart(148, 58, .3)}
      <g class="ans">${check(172, 62, 1, 6)}</g>
      ${qtag(238, 72, 'No structural disease', 9)}
      ${strip(150, 96, 144, 50, [...af(3), K.h(6), ...sb(8), ...sb(8), ...sb(8)])}
      ${T(222, 164, 'one dose at home stops AFib', { s: 9, c: 'ans ink' })}`),

    /* 11. AFib vs. flutter */
    flutter: ART(`
      <ellipse class="f-mouth" cx="38" cy="32" rx="30" ry="20"/>
      <g class="a-shake" style="animation-duration:.3s">${ln('M16 30 l4 -5 l3 6 l4 -6 l3 5 M38 38 l4 -5 l3 6 l4 -6 M40 22 l4 -5 l3 6 l4 -6', 'var(--c-nerve)', 2)}</g>
      <ellipse class="f-mouth" cx="38" cy="102" rx="30" ry="20"/>
      <ellipse cx="38" cy="102" rx="18" ry="10" style="fill:none;stroke:var(--c-nerve);stroke-width:2.5"/>
      <g class="ansmotion">${spark('M56 102 A18 10 0 1 1 55.9 101.5', 1, 0, '', 3.4)}</g>
      ${tag(38, 64, 'AFib', '', 10)}${tag(38, 134, 'Flutter', '', 10)}
      ${strip(80, 8, 212, 50, af(10), { base: .66 })}
      ${strip(80, 78, 212, 50, fl(8), { base: .66 })}
      ${qtag(186, 68, 'Irregular, disorganized', 9.5)}${qtag(186, 138, 'Regular sawtooth, 2:1', 9.5)}
      ${qtag(150, 164, 'Flutter: rate control first, then rhythm', 9.5)}`),

    /* 12. PSVT: tiny reentry loop in the AV node, fast narrow QRS */
    psvt: ART(`
      ${heart(6, 22, 1.2, { cs: true })}
      <circle cx="64" cy="73" r="9" style="fill:none;stroke:var(--c-bad);stroke-width:2.5;stroke-dasharray:3 2"/>
      <g class="ansmotion">${spark('M73 73 A9 9 0 1 1 72.9 72.5', .45, 0, '', 3, '#ffd60a')}</g>
      ${qtag(66, 150, 'AV node reentry', 9.5)}
      ${strip(140, 8, 154, 54, sv(12), { base: .66, dur: 2 })}
      ${qtag(216, 74, '130–250 bpm, narrow QRS', 9.5)}
      ${qtag(214, 100, 'Prevent: digoxin or beta blocker', 9)}
      ${qtag(216, 126, 'Verapamil: second choice', 9.5)}
      ${qtag(216, 152, 'Ablation can cure it', 9.5)}`),

    /* 13. WPW: blocking the AV node sends impulses down the bypass tract */
    wpw: ART(`
      ${heart(78, 14, 1.4, { cs: true, in: wire('M88 30 Q96 42 88 56', 'var(--c-bad)', 3) })}
      ${L('M208 56 L236 40')}${tag(258, 34, 'Bypass tract', '', 9.5)}
      <g class="ansmotion">${G(78, 14, 1.4, [0, .5].map(b => spark('M26 22 Q56 14 88 30 Q96 42 88 56 Q82 76 60 90', 1, b, '', 3.2, '#ff5470')).join(''))}</g>
      <g class="ans"><g class="a-blink"><rect x="136" y="66" width="18" height="6" rx="2" style="fill:var(--c-bad);stroke:var(--art-line);stroke-width:1"/></g></g>
      ${pill(36, 52, -30, 'f-good', 1.4)}${pill(36, 108, -30, 'f-vein', 1.4)}
      <g class="ans"><g class="a-blink">${nope(36, 52, 17)}${nope(36, 108, 17)}</g></g>
      ${qtag(36, 80, 'No digoxin', 9.5)}${qtag(36, 136, 'No CCBs', 9.5)}
      ${qtag(150, 168, 'They speed conduction down the bypass', 9.5)}
      ${tag(262, 100, 'AV node blocked', 'ans', 9)}${tag(262, 120, '→ fast VFib risk', 'ans', 9)}`),

    /* 14. PVCs: when to treat */
    pvc: ART(`
      ${strip(8, 8, 284, 58, [...sb(12), ...sb(12), K.h(2), K.pvc(), K.it(12), K.h(22), ...sb(12), ...sb(12), ...sb(12)], { base: .64 })}
      ${tag(RX[2], 80, 'PVC: wide, early', '', 9.5)}${L(`M${RX[2]} 72 L${RX[2]} 62`)}
      ${qtag(150, 104, 'Symptoms or heart disease?', 10)}
      ${ln('M110 112 L70 132 M190 112 L230 132', 'var(--pic-ink)', 1.5)}
      <g class="ans">${T(80, 118, 'yes', { s: 9 })}${T(220, 118, 'no', { s: 9 })}
        <g class="a-bob">${pill(40, 148, -30, 'f-warn', 1.3)}</g>
        <g class="a-blink">${eye(268, 148, .9)}</g>
      </g>
      ${qtag(90, 150, 'Treat', 10)}${qtag(212, 150, 'Just monitor', 10)}
      ${T(150, 174, 'e.g. recent MI = heart disease', { s: 9, c: 'ans ink' })}`),

    /* 15. Torsades: long QT -> twisting polymorphic VT -> VFib */
    tdp: ART(`
      ${strip(8, 30, 284, 76, [K.h(2), ...lq(6), ...tdp(24), ...vf(12)], { base: .55, dur: 3.6 })}
      <g class="ans"><path d="M28 36 V42 M70 36 V42 M28 39 H70" style="stroke:var(--c-warn);stroke-width:2"/><g class="a-pulse"><rect x="28" y="34" width="42" height="10" rx="2" style="fill:var(--c-warn);opacity:.25"/></g></g>
      ${qtag(56, 16, 'Long QT: over 0.44 s', 9.5)}
      ${qtag(152, 122, 'Polymorphic VT (twisting)', 9.5)}
      ${qtag(250, 146, 'Can become VFib', 9.5)}
      ${T(100, 160, 'sudden death risk', { s: 9, c: 'ans ink' })}`),

    /* 16. QT-prolonging drugs stretch the QT */
    qtDrugs: ART(`
      <rect x="70" y="34" width="160" height="92" rx="8" style="fill:#0f2530;stroke:var(--art-line);stroke-width:1.5"/>
      <g class="q"><path d="M76 100 H96 Q101 92 106 100 H110 L112 102 L114 66 L117 106 L119 100 H134 Q144 84 154 100 H224" style="fill:none;stroke:#3dff9a;stroke-width:2"/></g>
      <g class="ansmotion">
        <path style="fill:none;stroke:#3dff9a;stroke-width:2"><animate attributeName="d" values="M76 100 H96 Q101 92 106 100 H110 L112 102 L114 66 L117 106 L119 100 H134 Q144 84 154 100 H224;M76 100 H96 Q101 92 106 100 H110 L112 102 L114 66 L117 106 L119 100 H174 Q184 84 194 100 H224;M76 100 H96 Q101 92 106 100 H110 L112 102 L114 66 L117 106 L119 100 H174 Q184 84 194 100 H224;M76 100 H96 Q101 92 106 100 H110 L112 102 L114 66 L117 106 L119 100 H134 Q144 84 154 100 H224" keyTimes="0;.4;.85;1" dur="3.6s" repeatCount="indefinite"/></path>
        <path style="fill:none;stroke:var(--c-warn);stroke-width:2"><animate attributeName="d" values="M111 50 H154;M111 50 H194;M111 50 H194;M111 50 H154" keyTimes="0;.4;.85;1" dur="3.6s" repeatCount="indefinite"/></path>
      </g>
      ${T(150, 118, 'QT stretches →', { s: 9, c: 'on' })}
      <g class="ans">
        <g class="a-pop" style="--d:0">${pill(30, 56, -30, 'f-warn', 1.4)}</g>
        <g class="a-pop" style="--d:1"><rect class="f-germ" x="256" y="50" width="22" height="11" rx="5.5"/>${pill(276, 70, 30, 'f-good')}</g>
        <g class="a-pop" style="--d:2">${brain(12, 108, .78)}</g>
        <g class="a-pop" style="--d:3">${pill(270, 122, -30, 'f-spleen', 1.4)}</g>
      </g>
      ${qtag(62, 14, 'Class IA and III', 9.5)}${qtag(230, 14, 'Macrolides, quinolones', 9.5)}
      ${qtag(74, 160, 'Haloperidol, quetiapine', 9.5)}${qtag(232, 160, 'Tricyclics (TCAs)', 9.5)}`),

    /* 17. Long QT syndrome treatment */
    lqts: ART(`
      ${strip(8, 8, 182, 52, [K.h(2), ...lq(10), ...lq(10), ...lq(10)])}
      ${pill(226, 26, -30, 'f-warn')}${pill(254, 22, 20, 'f-spleen')}${pill(276, 30, -10, 'f-germ')}
      <g class="ans"><g class="a-blink">${nope(252, 26, 22)}</g></g>
      ${qtag(250, 62, 'Stop QT drugs', 9.5)}
      <g class="ans"><g class="a-bob">${pill(40, 100, -30, 'f-good', 1.8)}</g></g>
      <g class="q">${pill(40, 100, -30, 'f-scar', 1.8)}</g>
      ${qtag(64, 128, 'Beta blocker', 10)}
      ${heart(136, 76, .62)}
      <rect class="f-white" x="226" y="84" width="34" height="26" rx="8"/><rect class="f-scar" x="230" y="80" width="12" height="6" rx="2"/>
      ${ln('M230 96 C210 96 200 110 172 128', 'var(--pic-ink)', 2)}
      <g class="ans"><g class="a-blink" style="animation-duration:.8s">${bolt(176, 118, .8)}</g></g>
      ${qtag(244, 128, 'ICD if high risk', 9.5)}
      ${T(240, 150, 'aborted arrest, syncope,', { s: 9, c: 'ans ink' })}${T(240, 162, 'or QT over 500 ms', { s: 9, c: 'ans ink' })}`),

    /* 18. Quinidine */
    quinidine: ART(`
      <g class="a-pulse">${pill(150, 58, -30, 'f-warn', 2.6)}</g>
      ${tag(150, 96, 'Quinidine (IA)', '', 10)}
      ${ln('M18 38 C18 18 66 18 66 38 C66 52 34 52 34 42', 'var(--art-line)', 11)}${ln('M18 38 C18 18 66 18 66 38 C66 52 34 52 34 42', 'var(--c-large)', 8)}
      <g class="ans">${[0, .5, 1].map((b, i) => `<g class="a-drop" style="animation-delay:${b}s"><circle class="f-water" cx="${30 + i * 8}" cy="56" r="3"/></g>`).join('')}</g>
      ${qtag(52, 76, 'Diarrhea (#1)', 9.5)}
      ${strip(212, 10, 80, 40, [K.h(2), ...lq(6)], { base: .66 })}
      ${qtag(250, 64, 'QT ↑, torsades', 9.5)}
      ${gauge(46, 140, 26, -50, 60)}
      ${T(46, 152, 'digoxin', { s: 9 })}
      ${qtag(52, 166, 'Raises digoxin', 9.5)}
      ${grapefruit(256, 128, 14)}<g class="ans"><g class="a-blink">${nope(256, 128, 18)}</g></g>
      ${qtag(250, 166, 'Avoid grapefruit', 9.5)}
      <rect class="f-white" x="104" y="122" width="92" height="12" rx="6"/>
      <g class="ans"><rect x="127" y="122" width="35" height="12" rx="4" style="fill:var(--c-good);stroke:var(--art-line);stroke-width:1"/><g class="a-bob"><path class="f-bad" d="M144 110 l5 8 h-10 Z"/></g></g>
      ${T(104, 146, '0', { s: 9 })}${T(196, 146, '8', { s: 9 })}
      ${qtag(150, 166, 'Level 2–5 mcg/mL', 9.5)}`),

    /* 19. Disopyramide: anticholinergic effects */
    diso: ART(`
      ${qtag(150, 14, 'Strong anticholinergic effects', 10)}
      <g class="a-pulse">${pill(150, 50, -30, 'f-spleen', 2.2)}</g>
      ${tag(150, 82, 'Disopyramide (IA)', '', 9.5)}
      <g class="ans">${T(50, 86, 'blocks ACh', { s: 9 })}<path class="f-good" d="M48 70 V58 L42 50 L46 48 L50 54 L54 48 L58 50 L52 58 V70 Z"/><g class="a-bob"><circle class="f-nerve" cx="50" cy="38" r="4"/></g>${nope(50, 52, 9)}</g>
      ${heart(234, 34, .4)}<g class="ans"><g class="a-blink">${nope(254, 54, 18)}</g></g>
      ${T(254, 86, 'avoid in HF', { s: 9, c: 'ans ink' })}
      <path class="f-skin" d="M20 112 Q38 100 56 112 Q38 126 20 112 Z"/>
      <g class="ans">${ln('M28 112 l4 -3 l3 4 l4 -4 l3 4 l4 -3', 'var(--c-bad)', 1.5)}</g>
      <path class="f-nerve" d="M98 104 C98 90 126 90 126 104 C126 120 118 128 112 128 C106 128 98 120 98 104 Z"/>
      <g class="ans"><rect x="102" y="96" width="20" height="26" rx="8" style="fill:var(--c-warn);opacity:.6"><animate attributeName="height" values="10;26;26" dur="2.4s" repeatCount="indefinite"/></rect></g>
      ${ln('M170 104 C170 92 200 92 200 104 C200 118 182 120 178 112', 'var(--art-line)', 10)}${ln('M170 104 C170 92 200 92 200 104 C200 118 182 120 178 112', 'var(--c-large)', 7)}
      <g class="ans"><path d="M164 122 h28" style="stroke:var(--c-bad);stroke-width:3;stroke-linecap:round"/></g>
      ${eye(254, 112, 1.1)}<g class="ans"><g class="a-pulse"><circle cx="254" cy="112" r="16" style="fill:none;stroke:var(--c-bad);stroke-width:2"/></g></g>
      ${qtag(38, 144, 'Dry mouth', 9.5)}${qtag(112, 164, 'Urinary retention', 9.5)}${qtag(185, 144, 'Constipation', 9.5)}${qtag(250, 164, 'Avoid: glaucoma', 9.5)}`),

    /* 20. Mexiletine */
    mexil: ART(`
      <g transform="translate(32 34) rotate(-20)"><rect class="f-white" x="-16" y="-6" width="26" height="12" rx="2"/><rect class="f-water" x="-6" y="-4" width="14" height="8"/>${ln('M10 0 H24 M-16 -8 V8 M-16 0 H-24 M-24 -6 V6', 'var(--art-line)', 1.8)}</g>
      ${T(32, 16, 'IV lidocaine', { s: 9 })}
      <g class="ans"><g class="a-blink">${ln('M66 34 H86 M80 28 L86 34 L80 40', 'var(--pic-ink)', 2.2)}</g></g>
      <g class="a-bob">${pill(116, 34, -30, 'f-good', 1.7)}</g>
      ${qtag(82, 62, 'Oral lidocaine look-alike', 9.5)}
      ${strip(180, 8, 112, 42, rep(8, () => [K.vt()]), { base: .62, dur: 2 })}
      ${qtag(236, 62, 'Life-threatening VT', 9.5)}
      <g class="ans">
        <g class="a-shake"><circle class="f-gall" cx="30" cy="108" r="12"/><path d="M24 104 h3 M33 104 h3 M24 114 q6 -4 12 0" style="fill:none;stroke:var(--art-line);stroke-width:1.6"/></g>
        <g class="a-shake" style="animation-duration:.15s"><path class="f-skin" d="M78 120 L80 104 Q80 100 83 100 Q86 100 86 104 L86 96 Q86 92 89 92 Q92 92 92 96 L92 98 Q92 94 95 94 Q98 94 98 98 L98 112 Q98 122 90 122 Z"/></g>
        <g class="a-spin" style="animation-duration:1.4s"><path d="M146 108 m-10 0 a10 10 0 1 1 10 10 a6 6 0 1 1 -6 -6 a2 2 0 1 1 2 2" style="fill:none;stroke:var(--c-spleen);stroke-width:2.5"/></g>
      </g>
      ${liver(214, 92, .4)}${warn(250, 112, .8)}
      <rect x="172" y="108" width="30" height="7" rx="2" style="fill:#fff;stroke:var(--art-line);stroke-width:1.2"/><rect x="196" y="108" width="6" height="7" style="fill:var(--c-warn)"/>
      <g class="ans">${[0, .6].map(d => `<g class="a-rise" style="animation-delay:${d}s"><path d="M204 104 q3 -4 0 -8" style="fill:none;stroke:var(--c-scar);stroke-width:1.8"/></g>`).join('')}${T(184, 98, 'level ↓', { s: 9 })}</g>
      ${qtag(30, 140, 'Nausea', 9.5)}${qtag(88, 162, 'Tremor', 9.5)}${qtag(146, 140, 'Dizziness', 9.5)}
      ${qtag(240, 140, 'Black box: liver', 9.5)}${qtag(214, 162, 'Smoking speeds clearance', 9)}`),

    /* 21. Flecainide */
    flec: ART(`
      ${qtag(80, 14, 'Prevents PAF + PSVT', 9.5)}${qtag(222, 14, 'Black box: ↑ mortality', 9.5)}
      <g class="a-beat" style="animation-duration:1.2s">${heart(24, 30, .9)}</g>
      <g class="ans">${check(104, 40, 0, 9)}</g>
      ${heart(170, 30, .9, { in: `<ellipse cx="66" cy="66" rx="16" ry="11" style="fill:#5a3a40;stroke:var(--art-line);stroke-width:1.5"/>` })}
      <g class="ans"><g class="a-blink">${nope(217, 72, 40)}</g></g>
      ${qtag(70, 132, 'No structural disease', 9.5)}${qtag(218, 132, 'Avoid after MI', 9.5)}
      ${strip(10, 146, 70, 30, [K.h(2), ...sb(6, .6), ...sb(6, .6)], { base: .7 })}
      ${qtag(150, 162, 'Check ECG + levels', 9.5)}
      <g class="ans">${vial(232, 160, .5)}${vial(252, 160, .5, 'var(--c-warn)')}</g>`),

    /* 22. Propafenone */
    propaf: ART(`
      ${strip(14, 8, 72, 36, rep(5, () => [K.vt()]), { base: .62, dur: 2 })}
      <path class="f-mouth" d="M118 30 Q150 2 182 30 Q150 46 118 30 Z"/>
      <path class="f-stomach" d="M136 30 Q150 44 164 30 Z"/>
      <g class="ans"><g class="a-bob">${T(194, 22, '≈', { s: 13, c: 'ink' })}</g>${T(110, 18, 'metallic', { s: 9 })}</g>
      <circle class="f-gall" cx="230" cy="26" r="14"/>
      <g class="ans"><g class="a-spin" style="animation-duration:1.4s"><path d="M262 26 m-9 0 a9 9 0 1 1 9 9 a5 5 0 1 1 -5 -5" style="fill:none;stroke:var(--c-spleen);stroke-width:2.4"/></g></g>
      ${qtag(50, 60, 'VT; AFib (no SHD)', 9.5)}${qtag(150, 60, 'Taste changes', 9.5)}${qtag(246, 60, 'Nausea, dizzy', 9.5)}
      ${strip(12, 82, 76, 44, [K.h(2), K.p(), K.h(3), K.brug(), K.h(6), K.p(), K.h(3), K.brug(), K.h(4)], { base: .66 })}
      ${hospital(150, 110, 1.05)}
      <g class="ans"><g class="a-pulse">${G(220, 92, 1, `<path class="f-pancreas" d="M14 14 L28 6 A16 16 0 1 0 28 22 Z"/><circle cx="12" cy="8" r="2" style="fill:var(--art-line)"/>`)}</g>${T(270, 112, '2D6', { s: 10 })}</g>
      <g class="q"><circle class="f-pancreas" cx="236" cy="106" r="15"/></g>
      ${qtag(50, 140, 'Unmasks Brugada', 9.5)}${qtag(150, 140, 'Start in hospital', 9.5)}${qtag(246, 140, 'CYP2D6 metabolism', 9.5)}
      ${tag(150, 168, 'Propafenone (IC)', '', 10)}`),

    /* 23. Class II: beta blockers */
    bb: ART(`
      <rect class="f-fat" x="10" y="62" width="130" height="16" rx="4"/>
      <path class="f-good" d="M72 86 V66 L63 52 L68 49 L75 60 L82 49 L87 52 L78 66 V86 Z"/>
      ${tag(40, 96, 'β₁ receptor', '', 9)}
      <g class="ansmotion">${[0, .7, 1.4].map(b => `<path class="f-warn" d="M75 0 l5 6 l-5 6 l-5 -6 Z"><animateMotion dur="2.1s" begin="${b}s" repeatCount="indefinite" path="M${-30 + b * 20} 14 L0 34 L${-30 + b * 20} 14"/></path>`).join('')}</g>
      <g class="ans"><g class="a-pop">${pill(75, 46, 0, 'f-vein', 1.2)}</g>${T(118, 24, 'adrenaline', { s: 9 })}${T(118, 35, 'bounces off', { s: 9 })}</g>
      ${gauge(226, 66, 42, 60, -20, 'HR')}
      ${qtag(226, 88, 'Slows HR + AV node', 9.5)}${T(226, 104, 'rate control in AFib/flutter', { s: 9, c: 'ans ink' })}
      ${heart(16, 108, .46)}<g class="ans"><g class="a-pulse"><path class="f-immune" d="M86 112 L100 117 V128 C100 137 94 141 86 144 C78 141 72 137 72 128 V117 Z"/></g></g>
      ${qtag(64, 164, 'Lower death after MI', 9.5)}
      <g class="ans">${[30, 24, 18, 12, 6].map((h, i) => `<rect class="f-vein a-fadein" style="--d:${i}" x="${190 + i * 16}" y="${148 - h}" width="11" height="${h}" rx="2"/>`).join('')}</g>
      <path d="M184 148 H276" style="stroke:var(--pic-ink);stroke-width:1.4"/>
      ${qtag(230, 164, 'Taper over 2 weeks', 9.5)}`),

    /* 24. Propranolol: nonselective */
    propranolol: ART(`
      ${qtag(150, 14, 'Nonselective: blocks β₁ + β₂', 9.5)}
      ${heart(20, 32, .58)}
      <g class="ans"><g class="a-pop">${pill(78, 40, -30, 'f-vein')}</g></g>
      ${G(150, 50, .9, `<path class="f-mouth" d="${LOBE}"/><g transform="scale(-1 1)"><path class="f-mouth" d="${LOBE}"/></g>`)}
      <g class="q">${ln('M150 38 V54 M150 54 L142 66 M150 54 L158 66', 'var(--art-line)', 3)}</g>
      <g class="ans"><g class="a-squeeze" style="animation-duration:1.2s">${ln('M150 38 V54 M150 54 L142 66 M150 54 L158 66', 'var(--c-bad)', 3.2)}</g></g>
      <path class="f-skin" d="M232 92 L230 70 Q230 66 233 66 Q236 66 236 70 L236 58 Q236 54 239 54 Q242 54 242 58 L242 62 Q242 58 245 58 Q248 58 248 62 L248 66 Q248 62 251 62 Q254 62 254 66 L254 84 Q254 96 244 96 Z"/>
      <g class="ans"><path d="M234 70 H252 V88 Q252 94 244 94 Q236 94 234 88 Z" style="fill:var(--c-vein);opacity:.45"/><g class="a-spin">${ln('M270 40 V56 M262 44 L278 52 M262 52 L278 44', 'var(--c-immune)', 2)}</g></g>
      ${qtag(50, 110, 'β₁: heart slows', 9.5)}${qtag(150, 110, 'β₂: bronchospasm', 9.5)}${qtag(250, 110, 'Cold hands', 9.5)}
      ${qtag(150, 136, 'Avoid in asthma', 10)}
      ${qtag(150, 162, "Black box: don't stop suddenly", 9.5)}`),

    /* 25. Amiodarone: all 4 classes, long half-life */
    amio: ART(`
      <g class="a-pulse">${pill(70, 64, -30, 'f-warn', 2.4)}</g>
      ${[['I', 'f-water', 24, 40], ['II', 'f-good', 116, 40], ['III', 'f-spleen', 24, 90], ['IV', 'f-warn', 116, 90]].map(([t, c, x, y], i) =>
        `<g class="ans"><g class="a-pop" style="--d:${i}"><circle class="${c}" cx="${x}" cy="${y}" r="12"/>${T(x, y + 3.5, t, { s: 10, c: 'tagtx' })}</g></g>`).join('')}
      ${qtag(70, 14, 'Class III + all 4 effects', 9.5)}
      <path d="M170 18 V88 H292" style="fill:none;stroke:var(--pic-ink);stroke-width:1.4"/>
      <g class="q"><path d="M172 24 C200 50 232 74 290 84" style="fill:none;stroke:var(--c-warn);stroke-width:2.4"/></g>
      <g class="ansmotion"><path d="M172 24 C200 50 232 74 290 84" pathLength="100" style="fill:none;stroke:var(--c-warn);stroke-width:2.4;stroke-dasharray:100 100"><animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;.7;1" dur="3.4s" repeatCount="indefinite"/></path></g>
      <g class="ans"><path d="M172 54 H210 V88" style="fill:none;stroke:var(--c-bad);stroke-width:1.2;stroke-dasharray:3 3"/>${T(254, 40, 'level falls', { s: 9 })}${T(254, 51, 'very slowly', { s: 9 })}</g>
      ${qtag(228, 104, 'Half-life about 53 days', 9.5)}
      ${strip(8, 112, 146, 40, vf(20), { base: .55, dur: 2.4 })}
      ${qtag(80, 166, 'Recurrent VFib, unstable VT', 9.5)}
      ${qtag(222, 134, 'Most effective', 9.5)}${qtag(222, 158, 'Most toxic', 9.5)}
      <g class="ans"><g class="a-pulse"><path class="f-nerve" d="M282 124 L285 131 L292 132 L287 136 L289 143 L282 139 L275 143 L277 136 L272 132 L279 131 Z"/></g><g class="a-blink">${warn(282, 158, .75)}</g></g>`),

    /* 26. Amiodarone black box: lungs, liver, arrhythmia */
    amioBB: ART(`
      ${tag(150, 12, 'Amiodarone black box', '', 10)}
      <path class="f-skin" d="M110 26 Q150 18 190 26 L204 70 Q210 120 200 176 L100 176 Q90 120 96 70 Z" style="opacity:.5"/>
      ${lungs(150, 44, .95)}
      <g class="ans">${[[128, 64], [136, 80], [120, 84], [168, 70], [176, 86], [162, 82]].map(([x, y], i) => `<circle class="f-scar a-pop" style="--d:${i}" cx="${x}" cy="${y}" r="3.2"/>`).join('')}</g>
      <g class="ans"><g class="a-shake">${heart(148, 74, .34)}</g></g><g class="q">${heart(148, 74, .34)}</g>
      ${liver(106, 108, .62)}
      <g class="ans"><g class="a-blink">${warn(136, 126, .8)}</g></g>
      ${L('M120 70 L86 52 M110 126 L86 124 M182 92 L200 86')}
      ${qtag(52, 52, 'Lung toxicity', 9.5)}${T(52, 68, 'can be fatal', { s: 9, c: 'ans ink' })}
      ${qtag(52, 124, 'Liver toxicity', 9.5)}${qtag(248, 86, 'Worse arrhythmias', 9.5)}
      ${qtag(150, 166, 'Only for life-threatening rhythms', 9.5)}`),

    /* 27. Other amiodarone effects: thyroid, skin, eyes, drug levels */
    amioAE: ART(`
      <path class="f-skin" d="M40 180 Q44 124 100 116 Q156 124 160 180 Z"/>
      <rect class="f-skin" x="88" y="88" width="24" height="30"/>
      <g class="q"><circle class="f-skin" cx="100" cy="58" r="32"/></g>
      <g class="ansmotion"><circle cx="100" cy="58" r="32" style="stroke:var(--art-line);stroke-width:1.5"><animate attributeName="fill" values="#f6c8a8;#8f9fb8;#8f9fb8;#f6c8a8" keyTimes="0;.4;.85;1" dur="4s" repeatCount="indefinite"/></circle></g>
      ${eye(88, 54, .55)}${eye(114, 54, .55)}
      <path d="M90 74 Q100 80 110 74" style="fill:none;stroke:var(--art-line);stroke-width:1.6"/>
      ${thyroid(100, 106, .7)}
      <g class="ans">${sun(30, 28, 9)}<g class="a-bob">${T(72, 112, '↑', { s: 12 })}${T(128, 112, '↓', { s: 12 })}</g><g class="a-pulse"><circle cx="114" cy="54" r="7" style="fill:none;stroke:var(--c-bad);stroke-width:2"/></g></g>
      ${L('M130 44 L150 30 M120 56 L156 64 M114 104 L152 102')}
      ${qtag(220, 26, 'Sun-sensitive, blue-gray skin', 9)}${qtag(220, 64, 'Optic neuritis', 9.5)}${qtag(222, 102, 'Hypo- or hyperthyroid', 9.5)}
      <g class="ansmotion">${[[196, 'var(--c-good)'], [244, 'var(--c-bad)']].map(([x, c]) => `<g transform="translate(${x} 140)"><rect class="f-white" x="-6" y="-14" width="12" height="28" rx="6"/><rect x="-4" width="8" rx="3" style="fill:${c}"><animate attributeName="y" values="8;-10;-10" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/><animate attributeName="height" values="4;22;22" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/></rect></g>`).join('')}</g>
      <g class="q">${vial(196, 140, .3, 'var(--c-good)')}${vial(244, 140, .3)}</g>
      ${T(176, 140, 'dig', { s: 9, a: 'end' })}${T(264, 140, 'warf', { s: 9, a: 'start' })}
      ${qtag(222, 168, 'Raises digoxin + warfarin', 9.5)}`),

    /* 28. Amiodarone monitoring checklist */
    amioMon: ART(`
      ${tag(150, 12, 'Amiodarone monitoring', '', 10)}
      ${[30, 60, 90, 120, 150].map((y, i) => `<rect class="f-white" x="8" y="${y - 12}" width="284" height="24" rx="8" style="opacity:.55"/>`).join('')}
      ${lungs(28, 26, .26)}${thyroid(28, 60, .5)}${liver(13, 82, .25)}${eye(28, 120, .7)}${sun(28, 150, 5)}
      ${qtag(128, 30, 'Chest X-ray + PFTs', 9.5)}${qtag(128, 60, 'Thyroid tests', 9.5)}${qtag(128, 90, 'Liver enzymes', 9.5)}${qtag(128, 120, 'Eye exam', 9.5)}${qtag(128, 150, 'Sunscreen', 9.5)}
      <g class="ans">${['at baseline', 'repeat', '2× a year', 'yearly', 'every day'].map((t, i) => T(232, 33 + i * 30, t, { s: 9.5, c: 'tagtx' }) + check(280, 30 + i * 30, i)).join('')}</g>`),

    /* 29. Dronedarone */
    drone: ART(`
      ${G(56, 38, 1, `<path class="f-white" d="M0 -16 L14 -8 V8 L0 16 L-14 8 V-8 Z"/><circle class="f-spleen" cx="22" cy="-14" r="7"/><circle class="f-spleen" cx="22" cy="14" r="7"/>`)}
      ${T(78, 27, 'I', { s: 9, c: 'on' })}${T(78, 55, 'I', { s: 9, c: 'on' })}
      ${G(176, 38, 1, `<path class="f-white" d="M0 -16 L14 -8 V8 L0 16 L-14 8 V-8 Z"/>`)}
      <g class="q"><circle class="f-scar" cx="198" cy="24" r="7"/><circle class="f-scar" cx="198" cy="52" r="7"/></g>
      <g class="ans"><g class="a-blink"><circle cx="198" cy="24" r="7" style="fill:none;stroke:var(--c-spleen);stroke-width:1.5;stroke-dasharray:2 2"/><circle cx="198" cy="52" r="7" style="fill:none;stroke:var(--c-spleen);stroke-width:1.5;stroke-dasharray:2 2"/></g></g>
      ${ln('M100 38 H148 M142 32 L148 38 L142 44', 'var(--pic-ink)', 2)}
      ${tag(60, 70, 'Amiodarone', '', 9)}${tag(180, 70, 'Dronedarone', '', 9)}
      ${qtag(254, 38, 'No iodine', 9.5)}
      ${strip(8, 84, 170, 38, [...af(3), K.h(4), ...sb(6, .7), ...sb(6, .7), ...sb(6, .7)], { base: .7 })}
      ${qtag(240, 103, 'Keeps sinus rhythm', 9.5)}
      ${tag(150, 136, 'Black box', '', 9)}
      ${heart(14, 142, .34)}${T(31, 162, 'IV', { s: 9, c: 'on' })}<g class="ans"><g class="a-blink">${nope(31, 158, 16)}</g></g>
      ${cal(166, 160, '1 yr+', .9)}<g class="ans"><g class="a-blink">${nope(166, 160, 16)}</g></g>
      ${qtag(96, 158, 'No NYHA IV HF', 9.5)}${qtag(236, 158, 'No permanent AFib', 9.5)}`),

    /* 30. Sotalol */
    sotalol: ART(`
      ${qtag(70, 16, 'Class II + III', 10)}
      <g class="ans"><g class="a-pop"><path class="f-good" d="M140 30 V14 L134 6 L137 4 L142 11 L147 4 L150 6 L144 14 V30 Z"/>${chan(170, 4, 'f-spleen', 26)}${plug(170, 16, 5)}</g></g>
      ${qtag(222, 46, 'Prevents AFib, flutter, VT', 9.5)}
      ${strip(8, 36, 140, 52, [K.h(2), ...lq(6), ...tdp(16)], { base: .55 })}
      ${qtag(78, 100, 'Torsades risk', 9.5)}
      ${hospital(222, 92, 1.05)}
      <g class="ans"><rect x="250" y="76" width="34" height="24" rx="3" style="fill:#0f2530;stroke:var(--art-line);stroke-width:1.2"/><path d="M253 92 h6 l2 -10 l3 14 l2 -4 h5 l2 -8 l3 12 h4" style="fill:none;stroke:#3dff9a;stroke-width:1.4"/></g>
      ${qtag(222, 128, 'Start in hospital on monitor', 9.5)}
      ${kidney(10, 140, .8)}<g class="ans"><g class="a-blink">${nope(22, 158, 16)}</g></g>
      ${qtag(92, 160, 'No if CrCl under 40', 9.5)}
      <path d="M168 160 H192" style="stroke:var(--c-warn);stroke-width:3"/><path d="M168 154 V166 M192 154 V166" style="stroke:var(--c-warn);stroke-width:2"/>
      <g class="ans"><g class="a-blink">${nope(180, 160, 16)}</g></g>
      ${qtag(246, 160, 'No if QTc over 450', 9.5)}`),

    /* 31. Class IV: verapamil and diltiazem */
    ivCCB: ART(`
      <rect class="f-fat" x="10" y="34" width="132" height="16" rx="4"/>
      ${chan(76, 28, 'f-warn', 28)}
      ${tag(40, 18, 'Ca²⁺ channel', '', 9)}
      <g class="ansmotion">${[0, .5, 1].map(b => ion(76, 6, 24, 'f-warn', 1.2, b, true)).join('')}</g>
      <g class="ans"><g class="a-pop">${plug(76, 30, 6)}</g>${T(116, 22, 'verapamil,', { s: 9 })}${T(116, 64, 'diltiazem', { s: 9 })}</g>
      ${strip(8, 70, 136, 46, [...sv(5), K.h(10), ...sb(8), ...sb(8)], { base: .64 })}
      ${qtag(76, 132, 'Converts PSVT', 9.5)}${qtag(76, 156, 'AFib rate control', 9.5)}
      <path d="M152 8 V176" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:2 4;opacity:.5"/>
      ${tag(225, 16, 'Avoid', '', 10)}
      ${heart(160, 30, .3, { c: 'f-scar' })}<g class="ans"><g class="a-blink">${nope(175, 45, 14)}</g></g>
      ${heart(160, 70, .3, { in: wire('M88 30 Q96 42 88 56', 'var(--c-bad)', 4) })}<g class="ans"><g class="a-blink">${nope(175, 85, 14)}</g></g>
      <path d="M162 124 h4 l2 -8 l2 12 l2 -4 h12 l2 -8 l2 12 l2 -4 h4" style="fill:none;stroke:var(--c-bad);stroke-width:1.6"/><g class="ans"><g class="a-blink">${nope(176, 122, 14)}</g></g>
      ${qtag(244, 44, 'HFrEF', 9.5)}${qtag(244, 84, 'WPW pathway', 9.5)}${qtag(244, 122, 'AV block', 9.5)}
      ${qtag(224, 160, 'Verapamil: constipation', 9.5)}`),

    /* 32. Digoxin */
    digoxin: ART(`
      ${ln('M24 150 C26 110 22 70 28 24', 'var(--c-gall)', 3)}
      ${[[30, 34], [20, 50], [32, 66], [20, 82], [32, 98]].map(([x, y], i) => `<path class="f-spleen" d="M${x} ${y} q-8 2 -9 12 q5 -2 9 0 q4 -2 9 0 q-1 -10 -9 -12 Z" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}
      ${T(28, 166, 'foxglove', { s: 9 })}
      ${heart(60, 14, 1.05, { cs: true })}
      <g class="ansmotion">${G(60, 14, 1.05, spark('M26 22 Q36 32 48 42 L50 54 Q62 68 62 86', 2.2, 0, 'keyPoints="0;.35;.35;1" keyTimes="0;.2;.65;1" calcMode="linear"'))}</g>
      <g class="ans"><g class="a-pulse"><circle cx="110" cy="58" r="8" style="fill:none;stroke:var(--c-vein);stroke-width:2.5"/></g></g>
      ${eye(236, 52, 1.4)}
      <g class="ans">${[30, 40].map((r, i) => `<g class="a-pulse" style="animation-delay:${i * .4}s"><circle cx="236" cy="52" r="${r}" style="fill:none;stroke:#ffe14d;stroke-width:4;opacity:.8"/></g>`).join('')}</g>
      ${qtag(236, 104, 'Yellow halo = toxicity', 9.5)}
      ${qtag(116, 134, 'Slows AV node: AFib rate', 9.5)}
      ${qtag(130, 160, 'Not first-line (Beers list)', 9.5)}
      ${T(250, 140, 'early sign', { s: 9, c: 'ans ink' })}`),

    /* 33. Unstable: synchronized cardioversion */
    cardiovert: ART(`
      ${strip(8, 8, 284, 56, [...sv(6), K.h(6), K.shock(), K.h(10), ...sb(8), ...sb(8), ...sb(8)], { base: .66, dur: 3.4 })}
      <g class="ans">${RX.slice(0, 6).map(x => `<g class="a-blink"><path d="M${x - 3} 13 h6 l-3 5 Z" style="fill:#fff"/></g>`).join('')}${T(70, 60, 'SYNC marks each R wave', { s: 9, c: 'on' })}</g>
      <rect class="f-white" x="14" y="82" width="96" height="64" rx="8"/>
      <rect x="22" y="90" width="56" height="28" rx="3" style="fill:#0f2530"/>
      <path d="M26 108 h8 l2 -10 l3 14 l2 -4 h8 l2 -10 l3 14 l2 -4 h12" style="fill:none;stroke:#3dff9a;stroke-width:1.3"/>
      <g class="ans"><g class="a-blink"><rect class="f-good" x="84" y="92" width="20" height="10" rx="3"/></g>${T(94, 114, 'SYNC', { s: 9, c: 'tagtx' })}</g>
      <circle class="f-bad" cx="94" cy="132" r="7"/>
      <path class="f-skin" d="M176 176 Q172 110 200 92 Q230 80 260 92 Q288 110 284 176 Z"/>
      <rect class="f-white" x="200" y="104" width="22" height="16" rx="4"/><rect class="f-white" x="252" y="128" width="22" height="16" rx="4"/>
      ${ln('M110 120 C150 120 170 112 200 112 M110 132 C160 150 200 140 252 136', 'var(--pic-ink)', 1.8)}
      <g class="ans"><g class="a-blink" style="animation-duration:.7s">${bolt(238, 122, 1)}</g></g>
      ${T(232, 168, 'BP ↓, chest pain', { s: 9, c: 'tagtx' })}
      ${tag(62, 158, 'Unstable patient', '', 9.5)}
      ${qtag(150, 78, 'Synchronized cardioversion', 10)}
      ${T(150, 100, 'before drugs', { s: 9, c: 'ans ink' })}`),

    /* 34. Patient teaching */
    teach: ART(`
      <g class="a-sway" style="animation-duration:2.6s">${bracelet(75, 44)}</g>
      <g transform="translate(184 40)"><path class="f-white" d="M-12 -10 H10 V12 Q10 18 4 18 H-6 Q-12 18 -12 12 Z"/><path d="M10 -4 Q20 -4 18 6 Q16 12 10 10" style="fill:none;stroke:var(--art-line);stroke-width:2"/><rect x="-10" y="-6" width="18" height="6" style="fill:#7a4a2a"/></g>
      <g class="ans">${[0, .6].map(d => `<g class="a-rise" style="animation-delay:${d}s"><path d="M${180 + d * 8} 24 q4 -5 0 -10" style="fill:none;stroke:var(--c-scar);stroke-width:2"/></g>`).join('')}</g>
      <path class="f-white" d="M214 22 H234 Q234 40 224 42 Q214 40 214 22 Z"/><path d="M224 42 V56 M216 56 H232" style="stroke:var(--art-line);stroke-width:2"/><path d="M215 28 H233 Q232 38 224 40 Q216 38 215 28 Z" style="fill:#9b1d3a"/>
      <rect x="248" y="38" width="34" height="7" rx="2" style="fill:#fff;stroke:var(--art-line);stroke-width:1.2"/><rect x="276" y="38" width="6" height="7" style="fill:var(--c-warn)"/>
      <g class="ans"><g class="a-bob"><path d="M164 30 V50 M158 44 L164 52 L170 44" style="fill:none;stroke:var(--c-bad);stroke-width:3;stroke-linecap:round"/></g></g>
      <g class="a-bob"><path class="f-water" d="M44 110 Q44 96 60 96 H96 Q110 96 110 110 Q110 124 96 124 H70 L58 134 L60 124 Q44 124 44 110 Z"/></g>
      <g class="ans"><g class="a-beat">${G(66, 102, .14, `<path class="f-bad" d="${HEART}"/>`)}</g>${T(90, 114, '!', { s: 13 })}</g>
      <path class="f-good" d="M190 124 Q196 98 220 100 Q218 124 190 124 Z"/><path d="M192 122 L214 104" style="stroke:var(--art-line);stroke-width:1.2"/>
      ${pill(238, 114, -30, 'f-spleen', 1.3)}
      <g class="ans"><g class="a-pulse"><circle class="f-warn" cx="270" cy="110" r="9"/>${T(270, 114, '?', { s: 12, c: 'on' })}</g></g>
      ${qtag(75, 78, 'Medical alert bracelet', 9.5)}${qtag(226, 78, 'Limit caffeine, alcohol', 9.5)}
      ${T(226, 94, '+ tobacco', { s: 9, c: 'ans ink' })}
      ${qtag(77, 154, 'Report new symptoms', 9.5)}${qtag(226, 154, 'Ask before OTC, herbals', 9.5)}`),
  });
})();
