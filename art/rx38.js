/* Pharmacology rx38-thyroid art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 38 thyroid drugs. Everything lives inside one function so the helpers never clash. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" style="stroke-width:1;stroke-dasharray:2 3"/>`;
  const ln = (d, c = 'var(--art-line)', w = 2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const wire = (d, c = 'var(--c-nerve)', w = 2.6) => ln(d, 'var(--art-line)', w + 1.8) + ln(d, c, w);
  const arr = (d, c = 'var(--pic-ink)', cls = '') => `<path class="${cls}" d="${d}" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round" marker-end="url(#rx38a)"/>`;
  const DEFS = `<defs><marker id="rx38a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" style="fill:var(--pic-ink)"/></marker></defs>`;
  const A = inner => ART(DEFS + inner);

  /* ---------- icons ---------- */
  const pill = (x, y, rot = -30, c = 'f-warn', s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const tab = (x, y, c = 'f-pancreas', r = 7) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .6} ${y} H${x + r * .6}" style="stroke:var(--art-line);stroke-width:1.2"/>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:var(--c-bad);stroke-width:3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" style="stroke:var(--c-bad);stroke-width:3"/>`;
  const check = (x, y, d = 0, r = 7) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="${r}"/><path class="s-white" d="M${x - r / 2} ${y} l${r * .36} ${r * .38} l${r * .64} ${-r * .72}" style="stroke-width:2"/></g>`;
  const cross = (x, y, r = 8) => `<circle class="f-bad" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .45} ${y - r * .45} L${x + r * .45} ${y + r * .45} M${x + r * .45} ${y - r * .45} L${x - r * .45} ${y + r * .45}" style="stroke:#fff;stroke-width:2.2;stroke-linecap:round"/>`;
  const bolt = (x, y, s = 1) => G(x, y, s, `<path class="f-nerve" d="M2 -12 L-6 2 L0 2 L-3 12 L7 -3 L1 -3 Z"/>`);
  const warn = (x, y, s = 1) => G(x, y, s, `<path class="f-warn" d="M0 -11 L11 9 L-11 9 Z"/><path d="M0 -4 V3 M0 5.5 V6" style="stroke:var(--art-line);stroke-width:2.2;stroke-linecap:round"/>`);
  const drop = (x, y, s = 1, c = 'f-water') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/></g>`;
  const sun = (x, y, r = 8) => `<g transform="translate(${x} ${y})"><g class="a-spin">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 ${-r - 3} V${-r - 7}" transform="rotate(${a})" style="stroke:var(--c-warn);stroke-width:2.5;stroke-linecap:round"/>`).join('')}<circle class="f-nerve" r="${r}"/></g></g>`;
  const snow = (x, y, r = 9) => `<g transform="translate(${x} ${y})">${[0, 60, 120].map(a => `<path d="M0 ${-r} V${r} M-3 ${-r + 3} L0 ${-r + 6} L3 ${-r + 3} M-3 ${r - 3} L0 ${r - 6} L3 ${r - 3}" transform="rotate(${a})" style="fill:none;stroke:var(--c-vein);stroke-width:2;stroke-linecap:round"/>`).join('')}</g>`;
  const zzz = (x, y) => `<g class="a-rise">${T(x, y, 'z', { s: 10, c: 'ink' })}${T(x + 7, y - 7, 'z', { s: 12, c: 'ink' })}${T(x + 15, y - 15, 'Z', { s: 14, c: 'ink' })}</g>`;
  const cal = (x, y, txt, s = 1) => G(x, y, s, `<rect class="f-white" x="-15" y="-12" width="30" height="27" rx="3"/><rect class="f-bad" x="-15" y="-12" width="30" height="7" rx="2"/><path d="M-8 -15 V-9 M8 -15 V-9" style="stroke:var(--art-line);stroke-width:2"/>`) + T(x, y + 9 * s, txt, { s: 9, c: 'tagtx' });
  const vial = (x, y, c = 'var(--c-blood)', lvl = .6) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-6" y="-16" width="12" height="32" rx="6"/><rect x="-4.5" y="${-14 + 28 * (1 - lvl)}" width="9" height="${28 * lvl}" rx="4" style="fill:${c}"/><rect class="f-scar" x="-7" y="-20" width="14" height="6" rx="1.5"/></g>`;
  const ivbag = (x, y) => `<g transform="translate(${x} ${y})"><path class="f-white" d="M-10 -15 H10 V8 Q10 15 3 15 H-3 Q-10 15 -10 8 Z"/><rect class="f-pancreas noline" x="-8" y="-3" width="16" height="14" rx="2" opacity=".85"/></g>`;
  const scale = (x, y, s = 1) => G(x, y, s, `<rect class="f-white" x="-16" y="-10" width="32" height="20" rx="5"/><path d="M-8 -3 A8 8 0 0 1 8 -3" style="fill:none;stroke:var(--art-line);stroke-width:1.5"/>`);
  const needle = (x, y, from, to, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="q"><path d="M0 -3 L0 -10" transform="rotate(${from} 0 -3)" style="stroke:var(--c-bad);stroke-width:2;stroke-linecap:round"/></g><g class="ansmotion"><path d="M0 -3 L0 -10" style="stroke:var(--c-bad);stroke-width:2;stroke-linecap:round"><animateTransform attributeName="transform" type="rotate" values="${from} 0 -3;${to} 0 -3;${to} 0 -3" keyTimes="0;.5;1" dur="2.6s" repeatCount="indefinite"/></path></g></g>`;
  const rad = (x, y, r = 10) => `<g transform="translate(${x} ${y})"><circle r="${r}" style="fill:var(--c-nerve);stroke:var(--art-line);stroke-width:1.5"/><g class="a-spin">${[0, 120, 240].map(a => `<path d="M0 0 L${-r * .45} ${-r * .78} A${r * .9} ${r * .9} 0 0 1 ${r * .45} ${-r * .78} Z" transform="rotate(${a})" style="fill:#222"/>`).join('')}<circle r="${r * .18}" style="fill:#222"/></g></g>`;
  const ab = (x, y, rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${wire('M0 9 V0 L-6 -7 M0 0 L6 -7', 'var(--c-immune)', 2.6)}</g>`;
  const glass = (x, y) => `<path class="f-white" d="M${x - 7} ${y - 11} H${x + 7} L${x + 5} ${y + 11} H${x - 5} Z"/><path class="f-water noline" d="M${x - 6} ${y - 4} H${x + 6} L${x + 4.6} ${y + 10} H${x - 4.6} Z" opacity=".8"/>`;
  const bone = (x, y, s = 1, crack = false) => G(x, y, s, `<path class="f-bone" d="M-14 -3 C-20 -10 -24 -2 -19 0 C-24 2 -20 10 -14 3 H14 C20 10 24 2 19 0 C24 -2 20 -10 14 -3 Z"/>` + (crack ? `<path d="M-2 -3 L1 0 L-1 3" style="fill:none;stroke:var(--c-bad);stroke-width:1.5"/>` : ''));
  const cig = (x, y) => `<rect class="f-white" x="${x - 16}" y="${y - 3}" width="26" height="6" rx="1"/><rect class="f-warn" x="${x + 10}" y="${y - 3}" width="7" height="6" rx="1"/><g class="a-rise"><path d="M${x - 18} ${y - 6} q-4 -5 0 -10 q4 -5 0 -10" style="fill:none;stroke:var(--c-scar);stroke-width:2;stroke-linecap:round"/></g>`;
  const seaweed = (x, y) => `<g class="a-sway">${ln(`M${x} ${y + 12} q-6 -8 0 -14 q6 -6 0 -12`, 'var(--c-gall)', 4)}${ln(`M${x + 7} ${y + 12} q5 -7 0 -12 q-5 -5 0 -9`, 'var(--c-gall)', 3.5)}</g>`;
  const phone = (x, y) => `<rect class="f-white" x="${x - 9}" y="${y - 15}" width="18" height="30" rx="3"/><rect class="f-vein noline" x="${x - 7}" y="${y - 12}" width="14" height="21" rx="1" opacity=".5"/>`;

  /* ---------- body parts ---------- */
  const HEART = 'M50 16 C38 0 6 2 6 32 C6 58 30 78 52 98 C74 78 96 56 96 32 C96 4 64 0 50 16 Z';
  const heart = (x, y, s, c = 'f-muscle') => G(x, y, s, `<path class="${c}" d="${HEART}"/><path class="f-mouth" d="M50 18 C40 5 12 7 11 30 L11 42 L89 42 L89 30 C88 6 60 5 50 18 Z" style="opacity:.95"/>`);
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1) => G(x, y, s, `<path class="f-mouth" d="${BRAIN}"/><path d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" style="fill:none;stroke:var(--art-line);stroke-width:1.2;opacity:.6"/>`);
  const LIVER = 'M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z';
  const liver = (x, y, s = 1) => G(x, y, s, `<path class="f-liver" d="${LIVER}"/>`);
  const eye = (x, y, s = 1) => G(x, y, s, `<path class="f-white" d="M-16 0 Q0 -13 16 0 Q0 13 -16 0 Z"/><circle class="f-vein" r="5.5"/><circle r="2.4" style="fill:#111"/>`);
  const LOBE = 'M-3 -4 C-6 -16 -20 -18 -23 -4 C-25 8 -18 18 -8 16 C-4 15 -3 10 -3 6 Z';
  // butterfly thyroid centered on (x, y): about 50 wide x 34 tall at s = 1
  const thy = (x, y, s = 1, c = 'f-stomach', inner = '') => G(x, y, s, `<path class="${c}" d="${LOBE}"/><g transform="scale(-1 1)"><path class="${c}" d="${LOBE}"/></g><rect class="${c}" x="-7" y="-1" width="14" height="9" rx="3"/>` + inner);
  const pit = (x, y, s = 1) => G(x, y, s, `${ln('M0 -16 V-5', 'var(--art-line)', 4)}${ln('M0 -16 V-5', 'var(--c-pancreas)', 2.2)}<ellipse class="f-pancreas" cx="0" cy="2" rx="10" ry="8"/>`);
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const kidAd = (x, y, s = 1, adc = 'f-pancreas') => G(x, y, s, `<path class="f-muscle" d="${KID}"/><path class="${adc}" d="M6 4 C8 -8 20 -10 26 2 C20 0 12 0 6 4 Z"/>`);
  // simple person standing, feet at y; o.c body color, o.belly for pregnancy, o.cane for older adult
  const person = (x, y, s = 1, o = {}) => G(x, y, s, `<path class="${o.c || 'f-vein'}" d="M-13 -6 C-13 -30 -10 -40 0 -40 C10 -40 13 -30 13 -6 Z"/>` +
    (o.belly ? `<path class="${o.c || 'f-vein'}" d="M8 -30 C22 -28 22 -12 8 -10 Z"/>` : '') +
    `<rect class="f-skin" x="-9" y="-6" width="7" height="6" rx="2"/><rect class="f-skin" x="2" y="-6" width="7" height="6" rx="2"/>` +
    `<circle class="f-skin" cx="0" cy="-50" r="10"/>` + (o.gray ? `<path d="M-10 -52 Q0 -64 10 -52" style="fill:#d9d9e3;stroke:var(--art-line);stroke-width:1.2"/>` : '') +
    (o.cane ? ln('M16 -24 V0 M16 -24 q4 -4 8 0', 'var(--c-stool)', 2.5) : '') + (o.in || ''));
  // hormone molecule: little circle with a label
  const mol = (x, y, t, c = 'f-pancreas', r = 8) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>${T(x, y + 3.3, t, { s: 9, c: 'tagtx' })}`;
  // moving molecule: drawn at (20, 20) and the path shifted back, so its text box stays on-frame
  const shift = d => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - 20} ${+b - 20}`);
  const molM = (t, c, path, dur, begin = 0, r = 8) => `<g><circle class="${c}" cx="20" cy="20" r="${r}"/>${T(20, 23.3, t, { s: 9, c: 'tagtx' })}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path)}"/></g>`;
  const dot = (c, path, dur, begin = 0, r = 3.4, extra = '') => `<circle class="${c}" r="${r}"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}" ${extra}/></circle>`;

  /* ---------- ECG strip (from the arrhythmia art) ---------- */
  const K = {
    p: (a = 1) => ({ w: 6, d: `q3 ${-6 * a} 6 0` }),
    h: n => ({ w: n, d: `h${n}` }),
    qrs: (a = 1) => ({ w: 8, d: `l1.5 ${2 * a} l2.5 ${-22 * a} l2.5 ${25 * a} l1.5 ${-5 * a}` }),
    t: (a = 1, w = 10) => ({ w, d: `q${w / 2} ${-9 * a} ${w} 0` }),
  };
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).flat();
  const sb = (gap = 10) => [K.p(), K.h(4), K.qrs(), K.h(5), K.t(), K.h(gap)];
  const strip = (x, y, w, h, toks, o = {}) => {
    let d = '', acc = 0; const lim = w - 8;
    for (const t of toks) { if (acc + t.w > lim) break; d += ' ' + t.d; acc += t.w; }
    if (acc < lim) d += ` h${(lim - acc).toFixed(1)}`;
    const p = `M${x + 4} ${y + h * (o.base || .66)}${d}`;
    let grid = '';
    for (let gx = x + 10; gx < x + w - 2; gx += 10) grid += `M${gx} ${y + 2}V${y + h - 2}`;
    for (let gy = y + 10; gy < y + h - 2; gy += 10) grid += `M${x + 2} ${gy}H${x + w - 2}`;
    const st = `fill:none;stroke:#3dff9a;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round`;
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
      `<circle class="f-white" cx="${cx}" cy="${cy}" r="4"/>` + (txt ? T(cx, cy - r * .34, txt, { s: 9, c: 'tagtx' }) : '');
  };

  /* ---------- thermometer: mercury goes from f1 to f2 (0..1) on the back ---------- */
  const thermo = (x, y, h, f1, f2, c = 'var(--c-bad)') => {
    const top = v => y + 4 + (h - 8) * (1 - v), hh = v => (h - 8) * v + 6;
    return `<rect class="f-white" x="${x - 5}" y="${y}" width="10" height="${h + 4}" rx="5"/><circle class="f-white" cx="${x}" cy="${y + h + 6}" r="8"/>` +
      `<circle cx="${x}" cy="${y + h + 6}" r="5.5" style="fill:${c}"/>` +
      `<g class="q"><rect x="${x - 2.5}" y="${top(f1)}" width="5" height="${hh(f1)}" style="fill:${c}"/></g>` +
      `<g class="ansmotion"><rect x="${x - 2.5}" width="5" style="fill:${c}"><animate attributeName="y" values="${top(f1)};${top(f2)};${top(f2)}" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/><animate attributeName="height" values="${hh(f1)};${hh(f2)};${hh(f2)}" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/></rect></g>`;
  };

  /* ---------- lab bar panel: bars are 'hi', 'lo' or 'nl' against a green normal band ---------- */
  const labPanel = (x, title, bars, hiCol = 'var(--c-bad)') => {
    const base = 152, H = { hi: 92, lo: 18, nl: 50 }, bw = 30, gap = (138 - bars.length * bw) / (bars.length + 1);
    let s = `<rect class="f-white" x="${x}" y="22" width="138" height="154" rx="10" style="opacity:.92"/>` +
      `<rect x="${x + 6}" y="${base - 62}" width="126" height="26" rx="3" style="fill:var(--c-good);opacity:.28"/>` +
      `<rect x="${x + 36}" y="30" width="14" height="10" rx="2" style="fill:var(--c-good);opacity:.5"/>` + T(x + 54, 39, 'normal range', { s: 9, a: 'start', c: 'tagtx' }) + tag(x + 69, 12, title, '', 10) +
      `<path d="M${x + 6} ${base} H${x + 132}" style="stroke:var(--art-line);stroke-width:1.5"/>`;
    bars.forEach(([name, lvl, word], i) => {
      const bx = x + gap + i * (bw + gap), h = H[lvl], col = lvl === 'hi' ? hiCol : lvl === 'lo' ? 'var(--c-vein)' : 'var(--c-good)';
      s += `<rect x="${bx}" y="${base - 96}" width="${bw}" height="96" rx="3" style="fill:none;stroke:var(--art-line);stroke-width:1;stroke-dasharray:3 3;opacity:.5"/>` +
        `<g class="ans"><rect x="${bx}" y="${base - h}" width="${bw}" height="${h}" rx="3" style="fill:${col};stroke:var(--art-line);stroke-width:1.3"><animate attributeName="height" values="0;${h};${h}" keyTimes="0;.45;1" dur="3s" repeatCount="indefinite"/><animate attributeName="y" values="${base};${base - h};${base - h}" keyTimes="0;.45;1" dur="3s" repeatCount="indefinite"/></rect></g>` +
        T(bx + bw / 2, base + 13, name, { s: 9.5, c: 'tagtx' }) + qtag(bx + bw / 2, base - 96 + 14 + (lvl === 'hi' ? -8 : 0) + (lvl === 'lo' ? 30 : 0) + (lvl === 'nl' ? 16 : 0), word, 9);
    });
    return s;
  };

  /* ---------- thyroid follicle cell "factory": iodide in, T4/T3 out ---------- */
  const factory = (block) => `
      <rect class="f-blood" x="4" y="40" width="34" height="100" rx="8" style="opacity:.55"/>
      ${T(21, 154, 'blood', { s: 9 })}
      <rect class="f-skin" x="44" y="30" width="150" height="120" rx="18"/>
      ${T(119, 164, 'thyroid cell', { s: 9 })}
      <circle class="f-fat" cx="150" cy="90" r="30"/>
      ${T(150, 124, 'colloid', { s: 9, c: 'tagtx' })}
      <g class="a-spin" style="animation-duration:4s"><path class="f-good" d="M150 76 l4 4 h6 v6 l4 4 l-4 4 v6 h-6 l-4 4 l-4 -4 h-6 v-6 l-4 -4 l4 -4 v-6 h6 Z"/></g>
      ${T(150, 94, 'TPO', { s: 9, c: 'tagtx' })}
      <g class="ansmotion">
        ${[0, .7, 1.4].map(b => dot('f-spleen', 'M10 70 L70 80 L128 88', 2.1, b)).join('')}
        ${block ? '' : [0, 1.05].map(b => molM('T4', 'f-pancreas', 'M176 90 L232 80 L282 70', 2.1, b)).join('')}
      </g>`;

  Object.assign(PICS, {

    /* 1. Feedback loop: TRH -> TSH -> T4/T3, and T4/T3 shutting both off */
    axis: A(`
      ${brain(18, 10, 1.3)}${tag(48, 30, 'Hypothalamus', '', 9.5)}
      ${pit(48, 92, 1.1)}
      ${thy(48, 146, 1.1)}${tag(48, 172, 'Thyroid', '', 9.5)}
      ${wire('M48 56 V76', 'var(--c-mouth)', 3)}${wire('M48 104 V124', 'var(--c-pancreas)', 3)}
      <path d="M76 146 H168 V34 H90 M168 92 H66" style="fill:none;stroke:var(--c-bad);stroke-width:2.2;stroke-dasharray:5 4;opacity:.75"/>
      <g class="ansmotion">
        ${[0, .8].map(b => dot('f-mouth', 'M48 56 V80', 1.6, b)).join('')}
        ${[0, .8].map(b => dot('f-pancreas', 'M48 104 V128', 1.6, b)).join('')}
        ${[0, 1.4].map(b => dot('f-good', 'M76 146 H168 V34 H92', 2.8, b, 3.8)).join('')}
        ${dot('f-good', 'M76 146 H168 V92 H68', 2.2, .6, 3.8)}
      </g>
      <g class="ans">
        <g class="a-pulse">${cross(92, 34, 7)}</g><g class="a-pulse">${cross(68, 92, 7)}</g>
      </g>
      ${tag(108, 92, 'Pituitary', '', 9.5)}
      ${qtag(80, 66, 'TRH')}${qtag(80, 114, 'TSH')}${qtag(124, 146, 'T4 + T3')}
      ${qtag(234, 58, 'Negative feedback', 9.5)}
      ${tag(234, 82, 'High T4/T3 shuts off', 'ans', 9.5)}${tag(234, 100, 'TRH and TSH', 'ans', 9.5)}`),

    /* 2. T4 (mostly bound, prohormone) -> free T4 enters tissue -> loses an iodine -> T3 on the nuclear receptor */
    t4t3: A(`
      ${thy(36, 60, 1.25)}${tag(36, 88, 'Thyroid', '', 9.5)}
      <rect class="f-blood" x="66" y="96" width="132" height="40" rx="12" style="opacity:.4"/>
      ${T(132, 150, 'blood', { s: 9 })}
      <ellipse class="f-scar" cx="88" cy="116" rx="12" ry="9"/>${mol(88, 108, 'T4', 'f-pancreas', 7)}
      <ellipse class="f-scar" cx="120" cy="120" rx="12" ry="9"/>${mol(120, 112, 'T4', 'f-pancreas', 7)}
      <circle class="f-skin" cx="248" cy="96" r="46"/>
      <circle class="f-spleen" cx="254" cy="104" r="20" style="opacity:.85"/>
      ${T(254, 116, 'nucleus', { s: 9, c: 'on' })}
      ${arr('M60 64 Q76 80 84 98')}
      <g class="ansmotion">
        ${molM('T4', 'f-pancreas', 'M150 116 L212 104 L232 96', 2.8, 0, 7.5)}
        <g><circle class="f-spleen" r="2.6"/><animateMotion dur="2.8s" repeatCount="indefinite" keyPoints="0;0;1" keyTimes="0;.85;1" calcMode="linear" path="M232 96 L226 74"/><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.84;.85;1" dur="2.8s" repeatCount="indefinite"/></g>
      </g>
      <g class="ans"><g class="a-pulse">${mol(254, 98, 'T3', 'f-good', 8.5)}</g></g>
      ${qtag(84, 16, 'T4 = 90%: prohormone', 9.5)}
      ${qtag(132, 166, 'Only free (unbound) is active', 9.5)}
      ${qtag(248, 36, 'Tissues turn T4 → T3', 9.5)}
      ${qtag(250, 162, 'T3 = 10%: active', 9.5)}`),

    /* 3. Lab pattern: primary hypo vs primary hyper */
    labsHypo: A(`
      ${labPanel(8, 'Primary hypothyroid', [['TSH', 'hi', 'High'], ['Free T4', 'lo', 'Low']])}
      ${labPanel(154, 'Primary hyperthyroid', [['TSH', 'lo', 'Low'], ['Free T4', 'hi', 'High'], ['T3', 'hi', 'High']])}`),

    /* 4. Subclinical: TSH off, T4 still in the normal band */
    subclin: A(`
      ${labPanel(8, 'Subclinical hypo', [['TSH', 'hi', 'High'], ['T4', 'nl', 'Normal']])}
      ${labPanel(154, 'Subclinical hyper', [['TSH', 'lo', 'Low'], ['T4', 'nl', 'Normal'], ['T3', 'nl', 'Normal']])}`),

    /* 5. Best screen: TSH on the lab screen, then free T4/T3, anti-TPO */
    tsh: A(`
      ${vial(30, 96, 'var(--c-blood)', .7)}
      <g class="ans"><g class="a-drop">${drop(30, 62, .7, 'f-blood')}</g></g>
      ${arr('M44 96 H76')}
      <rect x="82" y="40" width="130" height="86" rx="10" style="fill:#0f2530;stroke:var(--art-line);stroke-width:1.5"/>
      <rect x="128" y="126" width="38" height="10" style="fill:#5a6378;stroke:var(--art-line);stroke-width:1.2"/>
      ${T(147, 56, 'lab result', { s: 9, c: 'on' })}
      <g class="ans"><g class="a-blink">${T(147, 98, 'TSH', { s: 30, c: 'on' })}</g></g>
      ${q(147, 90, 14)}
      ${pit(256, 70, 1.6)}${tag(256, 104, 'Pituitary', '', 9.5)}
      <g class="ans"><g class="a-pulse"><circle cx="256" cy="74" r="22" style="fill:none;stroke:var(--c-warn);stroke-width:2;stroke-dasharray:3 3"/></g></g>
      ${qtag(147, 22, 'Most sensitive test', 10)}
      ${qtag(80, 160, 'If high: free T4 + T3', 9.5)}${qtag(222, 160, 'Anti-TPO: Hashimoto', 9.5)}`),

    /* 6. Causes of hypothyroidism around the gland */
    hashi: A(`
      ${thy(150, 90, 1.7)}
      <g class="ans"><path class="s-warn a-flow" d="M70 52 L118 76 M230 52 L182 76 M70 128 L118 104 M230 128 L182 104 M150 146 L150 120" style="stroke-width:2.5"/></g>
      <g class="ans">
        <g class="a-shake">${ab(42, 32, -20)}${ab(60, 26, 10)}${ab(78, 36, 30)}</g>
        <g class="a-pop" style="--d:1"><rect class="f-white" x="236" y="18" width="20" height="28" rx="5"/><rect class="f-scar" x="236" y="14" width="20" height="8" rx="3"/>${T(246, 38, 'I', { s: 12, c: 'tagtx' })}${nope(246, 30, 16)}</g>
        <g class="a-pop" style="--d:2">${rad(48, 106, 11)}</g>
        <g class="a-pop" style="--d:3">${pill(238, 104, -30, 'f-spleen')}${pill(262, 108, 20, 'f-warn')}</g>
      </g>
      ${qtag(60, 60, 'Hashimoto (anti-TPO)', 9.5)}${qtag(242, 60, 'Iodine deficiency', 9.5)}
      ${qtag(56, 132, 'RAI or surgery', 9.5)}${qtag(244, 132, 'Lithium, amiodarone', 9.5)}
      ${qtag(150, 162, 'Postpartum thyroiditis', 9.5)}
      ${tag(150, 14, 'Top two: Hashimoto + low iodine', 'ans', 9.5)}`),

    /* 7. Where the chain breaks: tertiary / secondary / primary */
    types: A(`
      ${brain(22, 8, 1.15)}${pit(50, 84, 1.1)}${thy(50, 142, 1.1)}
      ${wire('M50 48 V68', 'var(--c-mouth)', 3)}${wire('M50 96 V120', 'var(--c-pancreas)', 3)}
      <g class="ansmotion">
        ${dot('f-mouth', 'M50 48 V70', 1.4, 0)}${dot('f-pancreas', 'M50 96 V122', 1.4, .7)}
      </g>
      <g class="ans">
        <g class="a-pop" style="--d:0">${cross(84, 26, 8)}</g>
        <g class="a-pop" style="--d:2">${cross(76, 84, 8)}</g>
        <g class="a-pop" style="--d:4">${cross(84, 142, 8)}</g>
      </g>
      ${qtag(192, 26, 'Tertiary: hypothalamus, low TRH', 9.5)}
      ${qtag(192, 84, 'Secondary: pituitary, low TSH', 9.5)}
      ${qtag(192, 136, 'Primary: thyroid gland fails', 9.5)}
      ${tag(192, 158, 'most common', 'ans a-pulse', 9.5)}`),

    /* 8. Hypothyroid: everything slows down */
    hypoSx: A(`
      ${person(150, 152, 1.55, { c: 'f-vein', in: `<path d="M-10 -55 Q0 -62 10 -55" style="fill:none;stroke:var(--art-line);stroke-width:1.2"/><path d="M-5 -45 Q0 -48 5 -45" style="fill:none;stroke:var(--art-line);stroke-width:1.2"/>` })}
      <path class="f-scar" d="M134 72 q-6 -14 4 -16 q8 -12 22 -4 q12 -2 10 10 q4 10 -8 12 Z" style="opacity:.9"/>
      <g class="ans">
        ${zzz(170, 50)}
        <g class="a-drop" style="animation-duration:2.4s"><path d="M138 82 v4 M162 82 v4" style="stroke:var(--c-water);stroke-width:2"/></g>
        ${snow(206, 112)}
        ${scale(96, 162, .9)}${needle(96, 162, -40, 40, .9)}
        <g class="a-beat" style="animation-duration:2.2s">${heart(140, 96, .2, 'f-muscle')}</g>
        <g class="a-pulse"><circle cx="112" cy="104" r="2" style="fill:#d9c2a0"/><circle cx="116" cy="112" r="1.6" style="fill:#d9c2a0"/></g>
      </g>
      ${qtag(56, 20, 'Fatigue, lethargy', 9.5)}${qtag(244, 20, 'Weight gain', 9.5)}
      ${qtag(52, 76, 'Dry skin, thin hair', 9.5)}${qtag(252, 76, 'Cold intolerance', 9.5)}
      ${qtag(50, 132, 'Constipation', 9.5)}${qtag(246, 150, 'Slow HR, depression', 9.5)}`),

    /* 9. Myxedema coma: cold, slow, low, and IV levothyroxine */
    myx: A(`
      ${strip(92, 6, 140, 40, [K.h(10), ...rep(4, () => sb(46))], { dur: 4 })}
      <rect class="f-white" x="30" y="122" width="190" height="14" rx="4"/>
      <rect class="f-scar" x="30" y="136" width="8" height="26"/><rect class="f-scar" x="212" y="136" width="8" height="26"/>
      <circle class="f-skin" cx="54" cy="112" r="11"/>
      <path class="f-water" d="M66 104 C110 98 180 98 214 106 V122 H66 Z"/>
      <path d="M48 112 h4 M56 112 h4" style="stroke:var(--art-line);stroke-width:1.4"/>
      ${thermo(18, 52, 44, .5, .08, 'var(--c-vein)')}
      ${ln('M258 30 V170 M244 30 H262', 'var(--c-scar)', 2.5)}
      <g class="ans">
        ${ivbag(252, 46)}
        ${ln('M252 61 C252 90 230 104 196 108', 'var(--pic-ink)', 1.4)}
        <g class="a-drop">${drop(252, 70, .45, 'f-pancreas')}</g>
        <g class="a-blink">${T(162, 60, 'BP ↓  RR ↓', { s: 10, c: 'ink' })}</g>
        ${zzz(66, 92)}
      </g>
      ${qtag(48, 20, 'Hypothermia', 9.5)}${tag(52, 38, 'no shivering', 'ans', 9)}${qtag(162, 74, 'Low BP, slow breathing', 9.5)}
      ${qtag(70, 150, 'Low consciousness', 9.5)}${qtag(150, 172, 'Low glucose', 9.5)}
      ${qtag(252, 92, 'IV levothyroxine', 9.5)}
      ${tag(258, 152, 'Emergency', 'ans a-pulse', 9.5)}`),

    /* 10. Congenital hypothyroidism: cretinism, and newborn heel-stick screen */
    cretin: A(`
      <ellipse class="f-water" cx="70" cy="98" rx="44" ry="26"/>
      <circle class="f-skin" cx="38" cy="90" r="17"/>
      <path d="M30 86 h5 M41 86 h5" style="stroke:var(--art-line);stroke-width:1.5"/>
      <g class="ans"><g class="a-pulse"><ellipse cx="38" cy="98" rx="5" ry="4" style="fill:#e86a7e;stroke:var(--art-line);stroke-width:1"/></g></g>
      <path class="f-skin" d="M110 104 q12 0 10 10 q-6 4 -12 -2 Z"/>
      <rect class="f-white" x="186" y="54" width="96" height="58" rx="5"/>
      ${T(234, 68, 'newborn screen', { s: 9, c: 'tagtx' })}
      ${[204, 226, 248, 270].map(x => `<circle cx="${x}" cy="90" r="8" style="fill:none;stroke:var(--c-blood);stroke-width:1.5"/>`).join('')}
      <g class="ans">
        <g class="a-drop">${drop(126, 112, .6, 'f-blood')}</g>
        ${[204, 226, 248, 270].map((x, i) => `<circle class="a-pop" style="--d:${i};fill:var(--c-blood);opacity:.8" cx="${x}" cy="90" r="7"/>`).join('')}
      </g>
      ${arr('M134 100 Q160 96 182 88')}
      ${qtag(150, 18, 'Cretinism', 12)}
      ${qtag(234, 132, 'Screen: TSH + free T4', 9.5)}
      ${qtag(70, 146, 'Intellectual disability', 9.5)}${qtag(70, 168, 'Short limbs, big tongue', 9.5)}`),

    /* 11. Levothyroxine: synthetic T4, weight-based dose */
    levo: A(`
      <rect class="f-warn" x="22" y="56" width="58" height="84" rx="8"/><rect class="f-white" x="18" y="44" width="66" height="16" rx="4"/>
      <rect class="f-white" x="28" y="76" width="46" height="40" rx="3"/>
      ${T(51, 92, 'Rx', { s: 12, c: 'tagtx' })}
      <g class="ans">
        <g class="a-pop" style="--d:0">${tab(110, 64)}</g><g class="a-pop" style="--d:1">${tab(124, 80)}</g><g class="a-pop" style="--d:2">${tab(108, 96)}</g>
        <g class="a-pulse">${mol(160, 80, 'T4', 'f-pancreas', 13)}${[0, 90, 180, 270].map(a => `<circle class="f-spleen" cx="${160 + 17 * Math.sin(a * Math.PI / 180)}" cy="${80 - 17 * Math.cos(a * Math.PI / 180)}" r="3.4"/>`).join('')}</g>
        ${T(160, 112, '4 iodines', { s: 9 })}
      </g>
      ${person(240, 150, 1.25, { c: 'f-good' })}
      ${tag(240, 166, 'ideal body weight', '', 9.5)}
      ${qtag(70, 18, 'Levothyroxine', 12)}${qtag(186, 40, 'Synthetic T4 (Synthroid)', 9.5)}
      ${qtag(130, 150, '1.6 mcg/kg/day', 10)}`),

    /* 12. Start dose: healthy adult full dose vs older/heart disease start low, go slow */
    levoStart: A(`
      <path d="M8 90 H292" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:3 4;opacity:.5"/>
      ${person(32, 78, 1.05, { c: 'f-good' })}${tag(32, 12, 'Healthy adult', '', 9.5)}
      <g class="ans"><g class="a-pop">${tab(96, 48, 'f-pancreas', 12)}</g></g>
      ${qtag(190, 48, 'Full dose: 1.6 mcg/kg/day', 9.5)}
      ${person(32, 170, 1.05, { c: 'f-spleen', gray: true, cane: true })}${tag(72, 102, 'Older or heart disease', '', 9.5)}
      <g class="ans">
        ${[0, 1, 2, 3].map(i => `<rect class="f-pancreas a-pop" style="--d:${i * 2}" x="${80 + i * 26}" y="${158 - (i + 1) * 9}" width="24" height="${(i + 1) * 9}" rx="2"/>`).join('')}
        <g class="a-blink">${heart(238, 112, .28)}${bolt(252, 124, .7)}</g>
      </g>
      ${qtag(206, 102, 'Start 12.5–25 mcg', 9.5)}${qtag(122, 172, 'Raise slowly', 9.5)}
      ${qtag(228, 160, 'Too fast: angina, arrhythmia', 9)}`),

    /* 13. How to take it: empty stomach, 1 hour before breakfast */
    levoTake: A(`
      <path d="M20 66 H280" style="stroke:var(--pic-ink);stroke-width:2"/>
      ${sun(40, 30, 8)}${T(40, 82, '6:00', { s: 9.5 })}${T(232, 82, '7:00', { s: 9.5 })}
      ${tab(72, 40)}${glass(92, 38)}
      <ellipse class="f-white" cx="232" cy="44" rx="24" ry="10"/><circle class="f-warn" cx="226" cy="42" r="5"/><rect class="f-food" x="234" y="38" width="12" height="6" rx="2"/>
      <g class="ansmotion"><g><path d="M0 -8 L5 0 L0 8 L-5 0 Z" class="f-bad"/><animateMotion dur="3s" repeatCount="indefinite" path="M60 66 H232" keyPoints="0;1;1" keyTimes="0;.7;1" calcMode="linear"/></g></g>
      ${qtag(150, 22, '1 hour before breakfast', 9.5)}
      ${qtag(56, 104, 'Empty stomach', 9.5)}${qtag(220, 104, 'Same brand, same time', 9.5)}
      ${qtag(56, 150, 'Lifelong', 9.5)}${qtag(210, 150, 'Never double a missed dose', 9.5)}
      <g class="ans">
        <g class="a-pulse">${T(56, 172, '∞', { s: 16, c: 'ink' })}</g>
        <g class="a-pop" style="--d:2">${tab(180, 172, 'f-pancreas', 5.5)}${tab(194, 172, 'f-pancreas', 5.5)}${nope(187, 172, 11)}</g>
        <g class="a-pop" style="--d:1">${cal(270, 132, 'daily', .8)}</g>
      </g>`),

    /* 14. Gut binders block absorption; liver inducers speed breakdown */
    levoDrugs: A(`
      <rect class="f-small" x="6" y="22" width="132" height="124" rx="14" style="opacity:.55"/>
      ${T(72, 16, 'gut', { s: 9 })}
      <rect class="f-mucus" x="142" y="22" width="12" height="124" rx="4"/>
      <rect class="f-blood" x="158" y="22" width="18" height="124" rx="6" style="opacity:.6"/>
      ${T(167, 16, 'blood', { s: 9 })}
      ${mol(60, 72, 'T4', 'f-pancreas', 8)}${mol(96, 92, 'T4', 'f-pancreas', 8)}
      <g class="ans">
        <g class="a-shake"><circle class="f-scar" cx="72" cy="72" r="7"/>${T(72, 75, 'Fe', { s: 9, c: 'on' })}<circle class="f-white" cx="108" cy="92" r="7"/>${T(108, 95, 'Ca', { s: 9, c: 'tagtx' })}</g>
        ${molM('T4', 'f-pancreas', 'M120 60 L146 62 L168 64 L168 62', 2.2, 0, 7)}
        <g class="a-spin" style="animation-duration:2s"><path class="f-scar" d="M246 68 l3 4 h5 v5 l3 3 l-3 3 v5 h-5 l-3 4 l-3 -4 h-5 v-5 l-3 -3 l3 -3 v-5 h5 Z"/></g>
        ${arr('M178 96 H200')}
      </g>
      ${liver(196, 66, .78)}
      ${qtag(40, 40, 'Iron', 10)}${qtag(104, 40, 'Calcium', 10)}
      ${qtag(50, 118, 'Antacids, PPIs', 9.5)}${qtag(98, 140, 'Sucralfate', 9.5)}
      ${qtag(240, 120, 'Faster breakdown', 9.5)}
      ${tag(236, 140, 'rifampin, phenytoin,', 'ans', 9)}${tag(232, 158, 'carbamazepine, phenobarb', 'ans', 9)}
      ${tag(236, 30, '← block absorption', 'ans', 9)}`),

    /* 15. Recheck TSH about 6 weeks: level climbs slowly to steady state (long half-life) */
    levoTSH: A(`
      <path d="M24 26 V130 H284" style="fill:none;stroke:var(--pic-ink);stroke-width:1.6"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(w => T(24 + w * 31, 142, String(w), { s: 9 })).join('')}
      ${T(154, 154, 'weeks after a dose change', { s: 9 })}
      ${T(16, 78, 'T4', { s: 9 })}
      <path d="M24 46 H284" style="stroke:var(--c-good);stroke-width:1.5;stroke-dasharray:4 3"/>
      ${T(282, 40, 'steady state', { s: 9, a: 'end' })}
      <g class="q"><path d="M24 126 C70 66 140 52 210 47 L284 46" style="fill:none;stroke:var(--c-vein);stroke-width:3;opacity:.35"/></g>
      <g class="ans">
        <path class="a-draw" d="M24 126 C70 66 140 52 210 47 L284 46" style="fill:none;stroke:var(--c-vein);stroke-width:3"/>
        <path d="M210 30 V130" style="stroke:var(--c-bad);stroke-width:1.5;stroke-dasharray:3 3"/>
        <g class="a-bob">${vial(232, 92, 'var(--c-blood)', .6)}</g>
      </g>
      ${qtag(118, 104, 'Long half-life (about 7 days)', 9)}
      ${qtag(210, 20, 'Recheck TSH ~6 weeks', 9.5)}
      ${qtag(80, 170, 'Stable: every 4–6 months', 9.5)}${qtag(234, 170, 'Then yearly', 9.5)}`),

    /* 16. Too much levothyroxine looks like hyperthyroidism */
    levoAE: A(`
      <rect class="f-warn" x="14" y="80" width="40" height="60" rx="6"/><rect class="f-white" x="11" y="72" width="46" height="12" rx="3"/>
      <g class="ans">${[0, 1, 2, 3].map(i => `<g class="a-pop" style="--d:${i}">${tab(30 + (i % 2) * 14, 64 - i * 8, 'f-pancreas', 6)}</g>`).join('')}</g>
      ${tag(34, 156, 'Dose too high', '', 9.5)}
      ${person(150, 150, 1.45, { c: 'f-bad' })}
      <g class="ans">
        <g class="a-beat" style="animation-duration:.45s">${heart(140, 90, .2)}</g>
        <g class="a-drop">${drop(130, 74, .5)}</g><g class="a-drop" style="animation-delay:.7s">${drop(172, 70, .5)}</g>
        ${sun(196, 46, 7)}
        <g class="a-shake" style="animation-duration:.25s">${ln('M112 112 l4 -4 l4 4 l4 -4', 'var(--c-nerve)', 2)}</g>
        ${bone(250, 132, .9, true)}
      </g>
      ${qtag(96, 22, 'Palpitations, fast HR', 9.5)}${qtag(242, 22, 'Heat intolerance, sweating', 9)}
      ${qtag(84, 168, 'Anxiety, insomnia, high BP', 9)}${qtag(250, 158, 'Bone loss over time', 9.5)}
      ${gauge(250, 96, 26, -40, 60, 'HR')}`),

    /* 17. Black box: never for weight loss; big doses + sympathomimetics are toxic */
    bbw: A(`
      <rect x="4" y="4" width="292" height="172" rx="6" style="fill:none;stroke:#111;stroke-width:5"/>
      <rect x="4" y="4" width="292" height="22" rx="4" style="fill:#111"/>
      ${T(150, 19, 'BLACK BOX WARNING', { s: 10.5, c: 'on' })}
      <path d="M150 34 V170" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:3 4;opacity:.5"/>
      ${scale(76, 88, 1.8)}${needle(76, 88, -50, 50, 1.8)}
      <path d="M44 120 q32 10 64 0" style="fill:none;stroke:var(--c-warn);stroke-width:4"/>
      <g class="ans"><g class="a-pulse">${nope(76, 88, 34)}</g></g>
      ${qtag(76, 150, 'Never for weight loss', 9.5)}
      ${tab(186, 70, 'f-pancreas', 9)}${tab(204, 82, 'f-pancreas', 9)}
      ${T(222, 64, '+', { s: 18 })}${pill(246, 66, -30, 'f-bad', 1.3)}
      <g class="ans"><g class="a-shake" style="animation-duration:.3s">${heart(206, 96, .3)}</g><g class="a-blink">${bolt(254, 112, .9)}</g></g>
      ${qtag(222, 46, 'Large doses', 9.5)}
      ${qtag(222, 150, 'Toxic with sympathomimetics', 9)}`),

    /* 18. Untreated adrenal insufficiency: give steroids first */
    adrenal: A(`
      <path d="M150 30 V172" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:3 4;opacity:.5"/>
      ${tag(150, 12, 'Low cortisol (adrenal insufficiency)', '', 9.5)}
      ${tab(30, 62, 'f-pancreas', 9)}${T(30, 82, 'thyroid', { s: 9 })}${T(30, 92, 'hormone', { s: 9 })}
      ${arr('M44 62 H66')}
      ${kidAd(74, 46, 1.05, 'f-scar')}
      <g class="ans"><g class="a-blink">${warn(122, 60, 1.2)}</g></g>
      ${qtag(74, 122, 'Adrenal crisis', 10)}
      ${tag(74, 142, 'needs more cortisol, has none', 'ans', 9)}
      <g class="ans"><g class="a-shake" style="animation-duration:.4s">${T(74, 164, 'BP ↓  shock', { s: 10, c: 'ink' })}</g></g>
      <g class="ans">
        <g class="a-pop" style="--d:0">${pill(184, 56, -30, 'f-immune', 1.2)}<circle class="f-white" cx="184" cy="40" r="7"/>${T(184, 43.5, '1', { s: 10, c: 'tagtx' })}</g>
        <g class="a-pop" style="--d:3">${tab(236, 56, 'f-pancreas', 9)}<circle class="f-white" cx="236" cy="38" r="7"/>${T(236, 41.5, '2', { s: 10, c: 'tagtx' })}</g>
        ${arr('M200 56 H222')}
        ${check(268, 56, 5, 9)}
      </g>
      ${kidAd(206, 76, .9, 'f-pancreas')}
      ${qtag(220, 136, 'Steroids first', 10)}
      ${tag(220, 156, 'then thyroid hormone', 'ans', 9.5)}`),

    /* 19. Liothyronine: T3 spikes fast and falls; T4 is smooth */
    lio: A(`
      <path d="M18 24 V118 H170" style="fill:none;stroke:var(--pic-ink);stroke-width:1.6"/>
      ${T(94, 132, 'time after a dose', { s: 9 })}
      <g class="q"><path d="M18 116 C30 30 42 30 60 80 C80 116 110 112 168 114" style="fill:none;stroke:var(--c-good);stroke-width:3;opacity:.3"/></g>
      <path d="M18 90 C40 84 120 84 168 86" style="fill:none;stroke:var(--c-pancreas);stroke-width:3"/>
      ${T(150, 80, 'T4', { s: 10 })}
      <g class="ans">
        <path class="a-draw" d="M18 116 C30 30 42 30 60 80 C80 116 110 112 168 114" style="fill:none;stroke:var(--c-good);stroke-width:3"/>
        ${T(48, 34, 'T3', { s: 10 })}
      </g>
      ${mol(212, 40, 'T3', 'f-good', 14)}
      <g class="ans">${[0, 120, 240].map(a => `<circle class="f-spleen a-pop" style="--d:${a / 120}" cx="${212 + 19 * Math.sin(a * Math.PI / 180)}" cy="${40 - 19 * Math.cos(a * Math.PI / 180)}" r="3.6"/>`).join('')}</g>
      ${qtag(260, 74, 'Synthetic T3', 9.5)}
      ${qtag(84, 152, 'Fast onset, short half-life', 9.5)}
      ${qtag(226, 100, 'Not for maintenance', 9.5)}
      ${qtag(220, 130, 'If symptoms persist on T4', 9.5)}
      ${qtag(214, 160, 'IV: myxedema coma', 9.5)}
      <g class="ans">${ivbag(278, 160)}</g>`),

    /* 20. Desiccated thyroid: pig thyroid -> T4 + T3 pill */
    armour: A(`
      <g transform="translate(46 64)"><ellipse class="f-mouth" cx="0" cy="0" rx="30" ry="20"/><circle class="f-mouth" cx="28" cy="-6" r="13"/><ellipse class="f-stomach" cx="40" cy="-4" rx="5" ry="6"/>
        <circle cx="38" cy="-6" r="1.2" style="fill:#222"/><circle cx="42" cy="-2" r="1.2" style="fill:#222"/><circle cx="28" cy="-12" r="1.8" style="fill:#222"/>
        <path class="f-mouth" d="M20 -18 l4 -8 l4 8 Z"/><rect class="f-mouth" x="-20" y="14" width="7" height="12" rx="2"/><rect class="f-mouth" x="10" y="14" width="7" height="12" rx="2"/></g>
      ${arr('M98 64 H132')}
      ${tab(170, 64, 'f-food', 18)}
      <g class="ans">
        <g class="a-pop" style="--d:1">${mol(150, 36, 'T4', 'f-pancreas', 10)}</g>
        <g class="a-pop" style="--d:2">${mol(192, 36, 'T3', 'f-good', 10)}</g>
      </g>
      <g class="ansmotion">${dot('f-mouth', 'M98 64 H140', 1.4, 0, 3)}</g>
      ${qtag(48, 22, 'From pig thyroid', 9.5)}${qtag(250, 64, 'T4 + T3', 10)}
      ${qtag(170, 104, 'Option if symptoms persist', 9.5)}
      ${qtag(76, 150, 'Avoid: pork allergy', 9.5)}${qtag(226, 150, 'Beers: avoid in elderly', 9.5)}
      <g class="ans"><g class="a-pop" style="--d:3">${nope(20, 126, 10)}</g><g class="a-pop" style="--d:4">${warn(290 - 8, 130, .7)}</g></g>`),

    /* 21. Pregnancy: keep therapy, raise dose ~50% */
    pregHypo: A(`
      ${person(52, 160, 1.6, { c: 'f-mouth', belly: true })}
      ${tab(124, 56, 'f-pancreas', 11)}${tab(152, 56, 'f-pancreas', 11)}
      <g class="ans"><g class="a-pop" style="--d:2">${tab(180, 56, 'f-good', 11)}</g>
        <g class="a-pulse">${T(214, 61, '+50%', { s: 13, c: 'ink' })}</g></g>
      ${qtag(152, 22, 'Raise dose about 50%', 10)}
      ${qtag(160, 98, 'Continue therapy', 9.5)}
      ${vial(126, 136)}<g class="ans"><g class="a-bob">${cal(160, 136, 'TSH', .9)}</g></g>
      ${qtag(226, 136, 'Watch TSH closely', 9.5)}
      ${qtag(200, 168, 'Safe in breastfeeding', 9.5)}
      <g class="ans">${check(272, 168, 3)}</g>`),

    /* 22. Thyrotoxicosis: everything speeds up */
    hyperSx: A(`
      ${person(150, 156, 1.5, { c: 'f-bad', in: `<circle class="f-white" cx="-4" cy="-52" r="3"/><circle class="f-white" cx="4" cy="-52" r="3"/><circle cx="-4" cy="-52" r="1.2" style="fill:#111"/><circle cx="4" cy="-52" r="1.2" style="fill:#111"/>` })}
      <g class="ans">
        <g class="a-pulse"><ellipse class="f-stomach" cx="150" cy="78" rx="10" ry="5"/></g>
        <g class="a-beat" style="animation-duration:.45s">${heart(141, 98, .18)}</g>
        <g class="a-shake" style="animation-duration:.2s">${ln('M120 148 l3 -3 l3 3 l3 -3', 'var(--c-nerve)', 2)}${ln('M170 148 l3 -3 l3 3 l3 -3', 'var(--c-nerve)', 2)}</g>
        <g class="a-drop">${drop(130, 64, .5)}</g><g class="a-drop" style="animation-delay:.8s">${drop(172, 66, .5)}</g>
        ${sun(204, 40, 7)}
        ${scale(98, 160, .9)}${needle(98, 160, 40, -40, .9)}
        <g class="a-pop">${G(112, 52, .9, '<path class="f-white" d="M-8 0 Q0 -8 8 0 Q0 8 -8 0 Z"/><circle r="3" style="fill:#111"/>')}</g>
      </g>
      ${qtag(62, 20, 'Palpitations, fast HR', 9.5)}${qtag(236, 20, 'Heat intolerance, sweat', 9)}
      ${qtag(48, 72, 'Bulging eyes', 9.5)}${qtag(250, 78, 'Goiter', 9.5)}
      ${qtag(56, 132, 'Weight loss, diarrhea', 9)}${qtag(248, 140, 'Tremor, anxiety', 9.5)}`),

    /* 23. Graves: antibodies (TSI) switch on the TSH receptor */
    graves: A(`
      <rect class="f-skin" x="20" y="96" width="260" height="60" rx="14"/>
      ${T(150, 170, 'thyroid cells', { s: 9 })}
      ${[60, 150, 240].map(x => `<path class="f-good" d="M${x - 9} 98 V82 L${x - 13} 74 L${x - 7} 72 L${x} 82 L${x + 7} 72 L${x + 13} 74 L${x + 9} 82 V98 Z"/>`).join('')}
      ${pit(28, 30, 1.1)}${T(28, 56, 'TSH low', { s: 9, c: 'ans ink' })}
      <g class="ansmotion">
        <g>${ab(0, 0)}<animateMotion dur="2.6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.5;1" calcMode="linear" path="M110 20 L150 66"/></g>
        <g>${ab(0, 0)}<animateMotion dur="2.6s" begin=".6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.5;1" calcMode="linear" path="M280 20 L240 66"/></g>
              </g>
      <g class="ans">${[0, 1, 2].map(i => `<g class="a-rise" style="animation-delay:${i * .5}s">${mol(130 + i * 35, 124, 'T4', 'f-pancreas', 7)}</g>`).join('')}</g>
      ${ab(60, 64)}
      ${qtag(150, 22, 'Autoantibodies (TSI)', 9.5)}
      ${qtag(66, 116, 'Bind TSH receptor', 9.5)}
      ${qtag(238, 144, 'Too much hormone', 9.5)}
      ${tag(234, 50, 'Most common hyperthyroid', 'ans', 9)}`),

    /* 24. NO SPECS: Graves eye disease stages + proptosis */
    nospecs: A(`
      <path class="f-skin" d="M10 40 C60 20 110 30 120 90 C110 150 60 160 10 140 Z"/>
      <ellipse class="f-fat" cx="56" cy="90" rx="34" ry="30"/>
      <g class="ansmotion"><g><circle class="f-white" cx="76" cy="90" r="22"/><circle class="f-vein" cx="96" cy="90" r="8"/><circle cx="100" cy="90" r="3.5" style="fill:#111"/><animateTransform attributeName="transform" type="translate" values="0 0;12 0;12 0;0 0" keyTimes="0;.4;.8;1" dur="3.2s" repeatCount="indefinite"/></g></g>
      <g class="q"><circle class="f-white" cx="76" cy="90" r="22"/><circle class="f-vein" cx="96" cy="90" r="8"/><circle cx="100" cy="90" r="3.5" style="fill:#111"/></g>
      <g class="ans"><g class="a-pulse"><path class="f-muscle" d="M40 64 L80 72 L80 76 L40 70 Z M40 116 L80 108 L80 104 L40 110 Z" style="opacity:.8"/></g></g>
      ${tag(64, 160, 'eye pushed forward', 'ans', 9.5)}
      ${[['N', 'No signs'], ['O', 'Only signs'], ['S', 'Soft tissue swelling'], ['P', 'Proptosis'], ['E', 'Extraocular muscles'], ['C', 'Corneal involvement'], ['S', 'Sight loss']].map(([l, t], i) => {
        const y = 18 + i * 22.5;
        return `<circle class="${i < 2 ? 'f-good' : i < 5 ? 'f-warn' : 'f-bad'}" cx="146" cy="${y}" r="9"/>${T(146, y + 3.8, l, { s: 11, c: 'on' })}` + q(176, y, 7) + `<g class="ans a-fadein" style="--d:${i}">${T(160, y + 3.5, t, { s: 10, a: 'start' })}</g>`;
      }).join('')}`),

    /* 25. Toxic nodular goiter: hot nodules work on their own; iodine load lights them up */
    goiter: A(`
      ${thy(150, 98, 2.4)}
      <g class="ans">
        <g class="a-pulse"><circle class="f-warn" cx="122" cy="92" r="10"/></g>
        <g class="a-pulse" style="animation-delay:.6s"><circle class="f-warn" cx="182" cy="104" r="8"/></g>
        ${[0, 1].map(i => `<g class="a-rise" style="animation-delay:${i * .8}s">${mol(i ? 182 : 122, i ? 74 : 64, 'T4', 'f-pancreas', 7)}</g>`).join('')}
      </g>
      <g class="ansmotion">
        ${[0, .8].map(b => dot('f-spleen', 'M40 54 L118 90', 1.6, b, 3)).join('')}
        ${[.4, 1.2].map(b => dot('f-spleen', 'M262 54 L184 102', 1.6, b, 3)).join('')}
      </g>
      ${pill(36, 40, -30, 'f-spleen', 1.2)}${G(262, 40, 1, `<rect class="f-white" x="-12" y="-5" width="18" height="10" rx="1.5"/><rect class="f-water" x="-6" y="-3.5" width="10" height="7"/>${ln('M6 0 H15 M-12 -7 V7', 'var(--art-line)', 1.6)}`)}
      ${qtag(150, 16, 'Hot nodules make hormone on their own', 9.5)}
      ${qtag(52, 70, 'Amiodarone, lithium', 9.5)}${qtag(254, 70, 'Iodine contrast', 9.5)}
      ${qtag(150, 158, 'Iodine load can trigger it', 9.5)}`),

    /* 26. Thyroiditis: subacute (viral, painful) vs painless/postpartum */
    thyroiditis: A(`
      <path d="M150 26 V172" style="stroke:var(--pic-ink);stroke-width:1;stroke-dasharray:3 4;opacity:.5"/>
      ${tag(76, 12, 'Subacute (viral)', '', 10)}${tag(226, 12, 'Painless / postpartum', '', 10)}
      ${thy(60, 56, 1.3)}<g class="a-shake">${G(112, 46, 1, `<circle class="f-germ" r="9"/>${[0, 60, 120, 180, 240, 300].map(a => `<circle class="f-germ" cx="${12 * Math.sin(a * Math.PI / 180)}" cy="${-12 * Math.cos(a * Math.PI / 180)}" r="2.2"/>`).join('')}`)}</g>
      <g class="a-blink">${bolt(60, 34, .8)}</g>
      ${thy(214, 56, 1.3)}
      <g transform="translate(262 52)"><circle class="f-skin" cx="0" cy="-10" r="8"/><path class="f-water" d="M-10 16 C-10 -2 10 -2 10 16 Z"/></g>
      <g class="ans">
        <g class="a-pop" style="--d:0">${pill(40, 110, -30, 'f-vein', 1.2)}</g>
        <g class="a-pop" style="--d:1">${tab(108, 110, 'f-white', 9)}</g>
        <g class="a-pop" style="--d:2">${pill(226, 110, -30, 'f-vein', 1.2)}</g>
      </g>
      ${qtag(40, 136, 'Beta blocker', 9.5)}${qtag(112, 136, 'NSAIDs: pain', 9.5)}
      ${qtag(226, 136, 'Beta blocker for symptoms', 9.5)}
      ${tag(226, 160, 'during the hyper phase', 'ans', 9.5)}
      ${gauge(76, 172, 18, 60, 0, 'HR')}`),

    /* 27. Thyroid storm: fever, racing heart, confusion */
    storm: A(`
      ${strip(8, 8, 180, 48, rep(10, () => sb(1)), { dur: 2.4 })}
      ${thermo(228, 14, 60, .45, .95)}
      <g class="ans"><g class="a-blink">${T(262, 40, '102°F+', { s: 11, c: 'ink' })}</g></g>
      ${brain(30, 88, 1.1)}
      <g class="ans">
        <g class="a-spin" style="animation-duration:2s">${ln('M58 92 a8 8 0 1 1 -0.1 0', 'var(--c-nerve)', 2.4)}</g>
        <g class="a-drop">${drop(130, 96, .6)}</g><g class="a-drop" style="animation-delay:.6s">${drop(150, 100, .6)}</g>
        <g class="a-pulse"><circle cx="216" cy="122" r="12" style="fill:#f4d03f;stroke:var(--art-line);stroke-width:1.5"/></g>
      </g>
      ${qtag(98, 70, 'HR 120–140 or AFib', 9.5)}
      ${qtag(56, 150, 'Confusion, agitation', 9.5)}${qtag(150, 126, 'Heavy sweating', 9.5)}
      ${qtag(240, 150, 'Vomiting, jaundice', 9.5)}
      ${tag(150, 172, 'Life-threatening: untreated hyperthyroidism', 'ans a-pulse', 9)}`),

    /* 28. Methimazole: blocks TPO, so the gland can't make hormone */
    methimazole: A(`
      ${factory(true)}
      <g class="ans">
        <g class="a-pop" style="--d:1"><rect class="f-bad" x="124" y="62" width="52" height="10" rx="5"/>${pill(186, 50, -30, 'f-good', 1.3)}</g>
        <g class="a-blink">${cross(250, 76, 8)}</g>
      </g>
      ${qtag(119, 16, 'Methimazole', 12)}
      ${qtag(66, 108, 'Blocks synthesis', 9.5)}
      ${qtag(248, 110, 'Once daily', 9.5)}
      ${tag(248, 132, 'drug of choice', 'ans', 9.5)}
      ${T(250, 60, 'T4, T3 ↓', { s: 9.5, c: 'ans ink' })}`),

    /* 29. PTU: blocks synthesis AND T4 -> T3 conversion */
    ptu: A(`
      <rect class="f-skin" x="10" y="34" width="120" height="96" rx="16"/>
      ${T(70, 144, 'thyroid', { s: 9 })}
      <g class="a-spin" style="animation-duration:4s"><path class="f-good" d="M70 72 l4 4 h6 v6 l4 4 l-4 4 v6 h-6 l-4 4 l-4 -4 h-6 v-6 l-4 -4 l4 -4 v-6 h6 Z"/></g>
      ${T(70, 90, 'TPO', { s: 9, c: 'tagtx' })}
      <circle class="f-skin" cx="232" cy="86" r="48"/>
      ${T(232, 146, 'body tissue', { s: 9 })}
      ${mol(212, 86, 'T4', 'f-pancreas', 9)}${arr('M224 86 H240')}${mol(254, 86, 'T3', 'f-good', 9)}
      ${arr('M134 86 H182')}
      <g class="ansmotion">${[0, .9].map(b => dot('f-spleen', 'M16 60 L52 76', 1.8, b)).join('')}</g>
      <g class="ans">
        <g class="a-pop" style="--d:0"><rect class="f-bad" x="44" y="60" width="52" height="9" rx="4.5"/></g>
        <g class="a-pop" style="--d:2"><rect class="f-bad" x="227" y="70" width="9" height="32" rx="4.5"/></g>
      </g>
      ${qtag(70, 18, 'Blocks synthesis', 9.5)}${qtag(232, 22, 'AND blocks T4 → T3', 9.5)}
      ${qtag(80, 162, 'Thyroid storm, 1st trimester', 9)}
      ${liver(160, 136, .3)}
      ${qtag(240, 162, 'More liver toxicity', 9.5)}
      <g class="ans"><g class="a-blink">${warn(286, 150, .6)}</g></g>`),

    /* 30. Pregnancy: PTU in 1st trimester, then switch to methimazole */
    pregHyper: A(`
      ${T(150, 18, 'Pregnancy', { s: 11 })}
      <rect class="f-white" x="14" y="40" width="272" height="30" rx="15"/>
      <rect x="14" y="40" width="90" height="30" rx="15" style="fill:var(--c-immune);opacity:.6"/>
      <rect x="104" y="40" width="182" height="30" rx="15" style="fill:var(--c-good);opacity:.5"/>
      ${T(59, 86, '1st trimester', { s: 9.5 })}${T(195, 86, '2nd + 3rd trimesters', { s: 9.5 })}
      <path d="M104 34 V76" style="stroke:var(--art-line);stroke-width:2"/>
      <g class="ansmotion"><g><circle class="f-mouth" r="7"/><circle class="f-skin" cx="0" cy="-2" r="3"/><animateMotion dur="4s" repeatCount="indefinite" path="M24 55 H276"/></g></g>
      ${qtag(59, 55, 'PTU', 11)}${qtag(195, 55, 'Methimazole', 11)}
      <g class="ans"><g class="a-pulse">${T(104, 110, 'switch ⟶', { s: 10, c: 'ink' })}</g></g>
      ${qtag(150, 140, 'Early methimazole: birth defects', 9.5)}
      <g class="ans"><g class="a-blink">${warn(36, 140, .8)}</g></g>`),

    /* 31. Thionamide side effects: marrow (WBC), liver, rash, joints, lupus-like */
    thionAE: A(`
      ${bone(60, 60, 2)}<ellipse cx="60" cy="60" rx="26" ry="5" style="fill:#e86a7e;opacity:.6"/>
      <g class="ansmotion">${[0, 1, 2, 3].map(i => `<circle class="f-white" r="5" cx="0" cy="0"><animateMotion dur="2.4s" begin="${i * .6}s" repeatCount="indefinite" path="M${40 + i * 12} 66 L${40 + i * 12} 104"/><animate attributeName="opacity" values="1;0" dur="2.4s" begin="${i * .6}s" repeatCount="indefinite"/></circle>`).join('')}</g>
      ${liver(176, 30, .7)}<g class="ans"><g class="a-blink">${warn(268, 34, .8)}</g></g>
      ${G(40, 140, 1, `<circle class="f-skin" r="16"/>`)}<g class="ans">${[[-6, -4], [4, 2], [-2, 8], [7, -6]].map(([a, b], i) => `<circle class="a-pop" style="--d:${i};fill:var(--c-bad)" cx="${40 + a}" cy="${140 + b}" r="2.4"/>`).join('')}</g>
      <circle class="f-bone" cx="140" cy="140" r="9"/>${ln('M140 122 V131 M140 149 V160', 'var(--c-bone)', 6)}<g class="ans"><g class="a-blink">${bolt(156, 136, .6)}</g></g>
      <g transform="translate(240 140)"><circle class="f-skin" r="18"/><g class="ans"><path class="a-pulse" d="M-12 2 Q-6 -6 0 2 Q6 -6 12 2 Q6 8 0 4 Q-6 8 -12 2 Z" style="fill:var(--c-bad);opacity:.7"/></g></g>
      ${qtag(74, 18, 'Agranulocytosis (low WBCs)', 9)}${qtag(214, 82, 'Hepatotoxicity', 9.5)}
      ${qtag(78, 166, 'Rash', 9.5)}${qtag(150, 172, 'Arthralgia', 9.5)}${qtag(238, 172, 'Lupus-like', 9.5)}`),

    /* 32. Thionamide monitoring: CBC, LFTs, T4/T3; fever or sore throat = call now */
    thionMon: A(`
      ${vial(20, 46, 'var(--c-blood)')}${vial(44, 46, 'var(--c-liver)')}${vial(68, 46, 'var(--c-pancreas)')}
      ${qtag(46, 82, 'CBC + diff', 9.5)}${qtag(46, 102, 'LFTs', 9.5)}${qtag(46, 122, 'Free T4, T3', 9.5)}
      ${cal(112, 52, '3–6 wk', 1)}${qtag(72, 156, 'Every 3–6 wk until normal', 9)}
      ${person(190, 150, 1.4, { c: 'f-vein' })}
      ${thermo(240, 40, 40, .4, .9)}
      <g class="ans">
        <g class="a-pulse"><circle cx="190" cy="92" r="6" style="fill:var(--c-bad);opacity:.8"/></g>
        <g class="a-blink">${phone(272, 120)}</g>
      </g>
      ${qtag(190, 18, 'Report fever or sore throat', 9.5)}
      ${tag(250, 160, 'right away', 'ans a-pulse', 9.5)}`),

    /* 33. Radioactive iodine: thyroid soaks it up and is destroyed */
    rai: A(`
      ${pill(30, 60, -30, 'f-nerve', 1.5)}${rad(30, 30, 9)}
      ${arr('M48 60 H82')}
      <g class="q">${thy(126, 60, 1.6)}</g>
      <g class="ansmotion">${thy(126, 60, 1.6, 'f-stomach', '<animate attributeName="opacity" values="1;.15;.15;1" keyTimes="0;.6;.9;1" dur="3.6s" repeatCount="indefinite"/>')}${[0, .6, 1.2].map(b => dot('f-nerve', 'M50 60 L110 58', 1.8, b, 3.2)).join('')}</g>
      ${arr('M164 60 H194')}${tab(214, 60, 'f-pancreas', 10)}${T(250, 64, '∞', { s: 16, c: 'ans ink' })}
      ${qtag(126, 20, 'Destroys thyroid tissue', 9.5)}
      ${qtag(224, 94, 'Lifelong thyroid hormone', 9.5)}
      ${person(44, 172, .95, { c: 'f-mouth', belly: true })}<g class="ans"><g class="a-pulse">${nope(44, 140, 22)}</g></g>
      ${qtag(116, 140, 'Never in pregnancy', 9.5)}
      ${cal(206, 140, '3–4 d', 1)}
      ${qtag(214, 168, 'Stop methimazole 3–4 d before', 9)}`),

    /* 34. Beta blockers: slow the racing heart, calm tremor and anxiety */
    bb: A(`
      ${heart(14, 24, 1)}
      <rect class="f-fat" x="110" y="30" width="12" height="60" rx="4"/>
      <path class="f-good" d="M118 66 V50 L110 40 L114 37 L120 46 L126 37 L130 40 L122 50 V66 Z"/>
      <g class="ans"><g class="a-pop"><rect class="f-bad" x="110" y="34" width="22" height="10" rx="5"/></g>${pill(150, 30, -30, 'f-vein', 1.2)}</g>
      ${gauge(232, 76, 40, 64, 0, 'HR')}
      ${qtag(150, 108, 'Beta blockers', 12)}
      ${qtag(60, 150, 'Heart rate ↓', 9.5)}${qtag(150, 168, 'Tremor ↓', 9.5)}${qtag(240, 150, 'Anxiety ↓', 9.5)}
      ${tag(150, 128, 'while other treatment works', 'ans', 9)}`),

    /* 35. Hyperthyroid teaching: daily HR, fever, iodine, smoking */
    hyperTeach: A(`
      ${phone(36, 50)}<g class="ans"><g class="a-beat" style="animation-duration:.8s">${heart(28, 40, .16)}</g></g>
      ${qtag(110, 26, 'Check HR daily', 9.5)}
      ${tag(118, 48, 'report under 50 or over 120', 'ans', 9)}
      ${thermo(234, 14, 42, .4, .85)}
      ${qtag(262, 76, 'Fever 101°F+', 9.5)}
      ${seaweed(36, 120)}<g class="ans"><g class="a-pop" style="--d:1">${nope(42, 120, 18)}</g></g>
      ${qtag(116, 112, 'Avoid kelp, iodine', 9.5)}
      ${cig(210, 132)}<g class="ans"><g class="a-pop" style="--d:2">${nope(206, 132, 18)}</g></g>
      ${qtag(206, 166, 'Stop smoking: eyes get worse', 9.5)}
      ${eye(270, 120, .8)}`),
  });
})();
