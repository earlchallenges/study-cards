/* Pharmacology rx9-lipids art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 9 cholesterol drugs. Everything lives inside one function so the little helpers never clash. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" stroke-width="1" stroke-dasharray="2 3"/>`;
  const AR = (d, cls = 's-ink', w = 1.6) => `<path class="${cls}" d="${d}" stroke-width="${w}"/>`;
  // front shows `front`, back shows `back` (for SMIL motion that CSS can't freeze)
  const both = (front, back) => `<g class="q">${front}</g><g class="ansmotion">${back}</g>`;
  const rep = 'repeatCount="indefinite"';

  // level in a vertical tube: front frozen at f0, back loops f0 -> f1
  const tube = (x, y, w, h, f0, f1, cls = 'f-warn', dur = 4) => {
    const Y = f => (y + h * (1 - f)).toFixed(1), H = f => (h * f).toFixed(1);
    const kt = 'keyTimes="0;.45;.85;1"';
    return `<rect class="f-white" x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}"/>` +
      both(`<rect class="${cls} noline" x="${x + 2}" y="${Y(f0)}" width="${w - 4}" height="${H(f0)}" rx="3"/>`,
        `<rect class="${cls} noline" x="${x + 2}" width="${w - 4}" rx="3"><animate attributeName="y" values="${Y(f0)};${Y(f1)};${Y(f1)};${Y(f0)}" ${kt} dur="${dur}s" ${rep}/><animate attributeName="height" values="${H(f0)};${H(f1)};${H(f1)};${H(f0)}" ${kt} dur="${dur}s" ${rep}/></rect>`) +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="none" stroke="var(--art-line)" stroke-width="1.5"/>`;
  };
  // horizontal bar that grows from 0 to w on the back
  const hbar = (x, y, w, h, cls, dur = 2.6) => `<g class="ans"><rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"><animate attributeName="width" values="0;${w};${w}" keyTimes="0;.5;1" dur="${dur}s" ${rep}/></rect></g>`;

  // icons, centered on (x, y)
  const pill = (x, y, rot = -30, c = 'f-warn') => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const tab = (x, y, c = 'f-vein', r = 7) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/><path class="s-line" d="M${x - r * .6} ${y} H${x + r * .6}" stroke-width="1" opacity=".5"/>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const check = (x, y, d = 0) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3.5} ${y} l2.5 2.6 l4.5 -5" stroke-width="2"/></g>`;
  const cross = (x, y, d = 0) => `<g class="a-pop" style="--d:${d}"><circle class="f-bad" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3} ${y - 3} l6 6 M${x + 3} ${y - 3} l-6 6" stroke-width="2"/></g>`;
  const ldl = (x, y, r = 7) => `<circle class="f-warn" cx="${x}" cy="${y}" r="${r}"/><circle class="f-pancreas noline" cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .35}"/>`;
  const hdl = (x, y, r = 5) => `<circle class="f-good" cx="${x}" cy="${y}" r="${r}"/><circle class="f-white noline" cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .3}" opacity=".7"/>`;
  const enz = (x, y, r = 12, c = 'f-immune', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="${c}" d="M0 0 L${(r * .87).toFixed(1)} ${-r / 2} A${r} ${r} 0 1 0 ${(r * .87).toFixed(1)} ${r / 2} Z"/><circle cx="${-r * .1}" cy="${-r * .5}" r="${r * .13}" fill="#1d2238"/></g>`;
  const receptor = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0 V-9" stroke="var(--art-line)" stroke-width="2.4"/><path class="f-good" d="M-7 -18 C-7 -10 -4 -8 0 -8 C4 -8 7 -10 7 -18 L3.5 -18 C3.5 -13 2 -11.5 0 -11.5 C-2 -11.5 -3.5 -13 -3.5 -18 Z"/></g>`;
  const LIVER = 'M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z';
  const liver = (x, y, s = 1) => G(x, y, s, `<path class="f-liver" d="${LIVER}"/><path class="s-line" d="M72 5 Q68 24 62 44" stroke-width="1" opacity=".45"/>`);
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const kidney = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path class="f-muscle" d="${KID}"/></g>`;
  const heart = (x, y, s = 1, c = 'f-blood') => G(x, y, s, `<path class="${c}" d="M0 -4 C-6 -14 -20 -10 -18 0 C-16 8 -6 14 0 20 C6 14 16 8 18 0 C20 -10 6 -14 0 -4 Z"/>`);
  const muscle = (x, y, rx = 22, ry = 10) => `<ellipse class="f-muscle" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/><path class="s-line" d="${[-.5, -.2, .1, .4].map(f => `M${x + rx * f} ${y - ry * .8} q3 ${ry * .8} 0 ${ry * 1.6}`).join(' ')}" stroke-width="1" opacity=".5"/>`;
  const bolt = (x, y, s = 1) => G(x, y, s, `<path class="f-nerve" d="M2 -10 L-5 1 L0 1 L-3 10 L6 -2 L1 -2 Z"/>`);
  const bottle = (x, y, c = 'f-warn') => `<rect class="f-white" x="${x - 15}" y="${y - 24}" width="30" height="9" rx="2"/><rect class="${c}" x="${x - 13}" y="${y - 15}" width="26" height="38" rx="5"/><rect class="f-white" x="${x - 10}" y="${y - 6}" width="20" height="15" rx="2"/>`;
  const syringe = (x, y, rot = -35) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="f-white" x="-11" y="-4" width="18" height="8" rx="1.5"/><rect class="f-water" x="-4" y="-3" width="10" height="6"/><path class="s-line" d="M7 0 H16 M-11 -6 V6 M-11 0 H-17 M-17 -4 V4" stroke-width="1.6"/></g>`;
  const cal = (x, y, w = 30, h = 26) => `<rect class="f-white" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3"/><rect class="f-bad" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="7" rx="2"/><path class="s-line" d="M${x - w / 4} ${y - h / 2 - 3} v6 M${x + w / 4} ${y - h / 2 - 3} v6" stroke-width="1.6"/>`;
  const resin = (x, y, r = 6) => `<circle class="f-scar" cx="${x}" cy="${y}" r="${r}"/><circle class="f-white noline" cx="${x - r * .3}" cy="${y - r * .35}" r="${r * .3}" opacity=".6"/>`;
  const bile = (x, y, r = 2.8) => `<circle class="f-bile" cx="${x}" cy="${y}" r="${r}"/>`;
  const fish = (x, y, s = 1) => G(x, y, s, `<path class="f-water" d="M-22 0 C-12 -12 10 -12 18 0 C10 12 -12 12 -22 0 Z"/><path class="f-water" d="M16 0 L28 -9 L26 0 L28 9 Z"/><circle cx="-13" cy="-2" r="2" fill="#1d2238"/><path class="s-line" d="M-4 -6 Q0 0 -4 6" stroke-width="1"/>`);
  const capsule = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse class="f-pancreas" rx="10" ry="5.5"/><ellipse class="f-white noline" cx="-3" cy="-2" rx="4" ry="1.5" opacity=".7"/></g>`;
  const gb = (x, y, s = 1) => G(x, y, s, `<path class="f-gall" d="M0 -4 C12 -6 22 4 20 16 C18 28 6 32 -2 26 C-10 20 -10 6 -4 0 Z"/><path class="s-bile" d="M0 -4 C-2 -12 4 -18 10 -20" stroke-width="3"/>`);
  const scoop = (x, y) => `<path class="f-white" d="M${x - 14} ${y - 4} h22 a11 9 0 0 1 -22 0 Z"/><path class="f-fat" d="M${x - 12} ${y - 4} q11 -8 18 0 Z"/><path class="s-line" d="M${x + 8} ${y - 4} L${x + 22} ${y - 12}" stroke-width="3"/>`;
  const calc = (x, y) => `<rect class="f-vein" x="${x - 15}" y="${y - 20}" width="30" height="40" rx="4"/><rect class="f-white" x="${x - 11}" y="${y - 16}" width="22" height="10" rx="2"/>` +
    [0, 1, 2].map(r => [0, 1, 2].map(c => `<rect class="f-white noline" x="${x - 11 + c * 8}" y="${y - 2 + r * 7}" width="6" height="5" rx="1"/>`).join('')).join('');
  // dot that rides a path (shape drawn at the origin)
  const ride = (shape, path, dur, begin = 0) => `<g>${shape}<animateMotion dur="${dur}s" begin="${begin}s" ${rep} path="${path}"/></g>`;

  Object.assign(PICS, {

    /* Best first drug: statin lowers LDL-C the most and ASCVD risk */
    firstLine: ART(`
      <rect class="f-muscle" x="6" y="8" width="288" height="50" rx="12"/>
      <rect class="f-blood" x="6" y="16" width="288" height="34" rx="6" style="stroke:none" opacity=".55"/>
      <path class="f-fat" d="M150 50 C160 34 196 32 212 50 Z"/>
      ${both([[30, 30], [64, 40], [96, 26], [128, 38], [236, 28], [262, 40]].map(([x, y]) => ldl(x, y)).join(''),
        [0, .8, 1.6, 2.4, 3.2].map(b => ride(ldl(0, 0), 'M10 33 L180 33 L290 33', 4, b)).join('') + `<g opacity=".6">${[[96, 26], [236, 28]].map(([x, y]) => ldl(x, y)).join('')}</g>`)}
      <g class="a-bob">${bottle(48, 108, 'f-vein')}</g>
      <g class="ans">${pill(80, 136, -20, 'f-vein')}${pill(20, 140, 30, 'f-vein')}</g>
      ${tag(120, 100, 'LDL-C', '', 9.5)}
      ${tube(140, 84, 20, 64, .9, .35, 'f-warn')}
      <path class="s-ink" d="M136 116 H164" stroke-width="1" stroke-dasharray="2 2"/>
      <g class="a-beat">${heart(240, 100, 1.3)}</g>
      <g class="ans"><path class="f-white" d="M262 104 l10 -4 l10 4 v8 c0 8 -6 12 -10 14 c-4 -2 -10 -6 -10 -14 Z"/><path class="s-good" d="M267 112 l4 4 l7 -8" stroke-width="2"/></g>
      ${qtag(48, 164, 'A statin')}${qtag(150, 164, 'LDL-C ↓ most', 9.5)}${qtag(244, 148, 'ASCVD risk ↓', 9.5)}
      ${tag(190, 70, 'HMG-CoA reductase inhibitor', 'ans', 9)}`),

    /* How statins work: block HMG-CoA reductase -> more LDL receptors pull LDL in */
    hmg: ART(`
      <rect class="f-skin" x="6" y="6" width="176" height="168" rx="16"/>
      <rect class="f-blood noline" x="186" y="6" width="108" height="168" rx="10" opacity=".25"/>
      <path d="M182 10 V170" stroke="var(--c-liver)" stroke-width="5"/>
      ${T(70, 20, 'Liver cell', { s: 10, c: 'tagtx' })}${T(240, 20, 'Blood', { s: 10 })}
      ${T(60, 38, 'Acetyl-CoA', { s: 9.5, c: 'tagtx' })}${AR('M60 42 V50')}${T(60, 60, 'HMG-CoA', { s: 9.5, c: 'tagtx' })}${AR('M60 64 V74')}
      ${enz(48, 90, 13)}
      <g class="ans"><g class="a-pop">${pill(68, 90, 0, 'f-vein')}${nope(68, 90, 11)}</g></g>
      ${qtag(60, 116, 'HMG-CoA reductase', 9)}
      ${AR('M60 124 V134')}
      <g class="ans"><path class="s-bad" d="M50 124 L70 134 M70 124 L50 134" stroke-width="2.4"/></g>
      <g class="a-squeeze"><path class="f-fat" d="M30 146 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0 q4 10 -8 12 h-32 q-12 -2 -8 -12 Z"/></g>
      ${qtag(60, 166, 'Less cholesterol made', 9)}
      ${receptor(182, 46, 90)}${receptor(182, 130, 90)}
      <g class="ans">${[26, 74, 102, 150].map((y, i) => `<g class="a-pop" style="--d:${i + 2}">${receptor(182, y, 90)}</g>`).join('')}</g>
      ${both([[236, 50], [256, 86], [232, 112], [262, 138]].map(([x, y]) => ldl(x, y)).join(''),
        [[0, 46], [1, 102], [2, 130], [.5, 74], [1.5, 26]].map(([b, y]) => ride(ldl(0, 0), `M290 ${y} L204 ${y}`, 2.5, b)).join(''))}
      ${qtag(250, 62, 'More LDL receptors', 9)}
      ${tag(250, 146, 'LDL-C pulled out', 'ans', 9)}
      ${tag(250, 166, 'HDL↑ TG↓ CRP↓', 'ans', 9)}`),

    /* 4 statin benefit groups */
    groups: ART(`
      <g class="ans">${AR('M92 40 L128 78 M208 40 L172 78 M92 124 L128 100 M208 124 L172 100', 's-warn a-flow', 2.5)}</g>
      <g class="a-pulse">${bottle(150, 90, 'f-vein')}</g>
      ${tag(150, 126, 'Statin', '', 10)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${heart(56, 24, .9)}<path class="f-fat" d="M48 30 q8 -6 16 0 Z"/></g>
        <g class="a-pop" style="--d:1"><rect class="f-white" x="236" y="6" width="14" height="36" rx="7"/><rect class="f-warn noline" x="238" y="10" width="10" height="30" rx="5"/></g>
        <g class="a-pop" style="--d:2"><rect class="f-white" x="44" y="96" width="24" height="32" rx="4"/><rect class="f-water" x="48" y="100" width="16" height="10" rx="2"/>${T(56, 123, 'BG', { s: 9, c: 'tagtx' })}</g>
        <g class="a-pop" style="--d:3">${calc(244, 112)}</g>
      </g>
      ${qtag(56, 62, 'Clinical ASCVD', 9.5)}${qtag(244, 62, 'LDL-C 190+', 9.5)}
      ${qtag(80, 148, 'Diabetes, 40–75, LDL-C 70–189', 9)}${qtag(234, 148, 'Age 40–75, risk 7.5%+', 9)}
      ${T(150, 172, 'Who should take a statin?', { s: 9.5 })}`),

    /* Statin intensity: high / moderate / low, with drugs */
    intensity: ART(`
      ${[18, 66, 128].map(y => `<rect class="f-white" x="66" y="${y - 7}" width="226" height="14" rx="7"/>`).join('')}
      ${hbar(66, 11, 226, 14, 'f-good')}${hbar(66, 59, 158, 14, 'f-warn')}${hbar(66, 121, 90, 14, 'f-pancreas')}
      ${tag(34, 18, 'High', '', 10)}${tag(34, 66, 'Moderate', '', 9.5)}${tag(34, 128, 'Low', '', 10)}
      ${qtag(179, 18, 'LDL-C ↓ 50%+', 9)}${qtag(145, 66, '↓ 30–49%', 9)}${qtag(111, 128, '↓ under 30%', 9)}
      ${qtag(178, 38, 'Atorvastatin 40–80 · Rosuvastatin 20–40', 9)}
      ${qtag(178, 86, 'Atorvastatin 10–20 · Rosuvastatin 5–10', 9)}
      ${tag(178, 104, 'Simvastatin 20–40 · Pravastatin 40–80', 'ans', 9)}
      ${qtag(150, 148, 'Simvastatin 10 · Pravastatin 10–20 · Lovastatin 20', 9)}
      ${T(150, 172, 'doses in mg per day', { s: 9, w: 400 })}`),

    /* ASCVD risk bands + LDL target */
    riskCalc: ART(`
      ${T(150, 13, '10-year ASCVD risk (ages 40–75)', { s: 9.5 })}
      <rect class="f-good" x="10" y="20" width="70" height="16" rx="4"/><rect class="f-pancreas" x="80" y="20" width="70" height="16"/>
      <rect class="f-warn" x="150" y="20" width="70" height="16"/><rect class="f-bad" x="220" y="20" width="70" height="16" rx="4"/>
      <g class="ansmotion"><path class="f-white" d="M0 0 l-6 -9 h12 Z"><animateTransform attributeName="transform" type="translate" values="22 20;278 20;22 20" dur="5s" ${rep}/></path></g>
      ${qtag(45, 50, 'Low: under 5%', 9)}${qtag(185, 50, 'Intermediate 7.5–19.9%', 9)}
      ${qtag(115, 68, 'Borderline 5–7.4%', 9)}${qtag(255, 68, 'High: 20%+', 9)}
      <path class="s-ink" d="M8 82 H292" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${tag(38, 92, 'LDL-C', '', 9)}
      ${tube(28, 100, 20, 72, .9, .45, 'f-warn')}
      <path class="s-good" d="M22 132 H56" stroke-width="2"/>
      ${qtag(104, 132, 'LDL-C 100 or less', 9)}${qtag(104, 156, 'Total chol ~150', 9)}
      <g class="a-bob">${calc(250, 124)}</g>
      ${tag(250, 160, 'Lower is better', 'ans', 9)}
      <g class="ans">${AR('M196 110 V140 M190 132 l6 8 l6 -8', 's-good', 2.5)}</g>`),

    /* SASE: myalgia > myopathy > rhabdo; plus diabetes and liver */
    sase: ART(`
      ${[34, 84, 134].map(y => `${muscle(24, y + 4, 16, 8)}<rect class="f-white" x="48" y="${y + 1}" width="104" height="10" rx="5"/>${T(162, y + 10, 'CK', { s: 9, a: 'start' })}`).join('')}
      <g class="a-shake">${bolt(24, 30, .8)}</g>
      ${hbar(48, 35, 22, 10, 'f-good', 3)}${hbar(48, 85, 56, 10, 'f-warn', 3)}${hbar(48, 135, 104, 10, 'f-bad', 3)}
      ${qtag(98, 22, 'Myalgia, CK normal', 9)}${qtag(98, 72, 'Myopathy: CK up', 9)}${qtag(98, 122, 'Rhabdo: CK over 10×', 9)}
      ${tag(98, 160, '★ Myalgia is most common', 'ans', 9)}
      <g class="ans"><g class="a-drop"><path class="f-stool" d="M182 128 h14 l-2 18 h-10 Z"/></g></g>
      <path class="s-ink" d="M206 10 V170" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      <rect class="f-white" x="234" y="14" width="26" height="34" rx="4"/><rect class="f-water" x="238" y="18" width="18" height="11" rx="2"/>
      <g class="ans">${T(247, 27, '↑', { s: 9, c: 'tagtx' })}</g>
      <g class="a-drop">${G(272, 38, 1, '<path class="f-blood" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/>')}</g>
      ${qtag(250, 64, 'New diabetes', 9)}
      <g class="a-pulse">${liver(218, 92, .5)}</g>
      ${qtag(250, 140, 'LFTs ↑ (rare)', 9)}`),

    /* Risk factors for statin muscle symptoms */
    saseRisk: ART(`
      <g class="a-shake"><ellipse class="f-muscle" cx="150" cy="86" rx="20" ry="52"/>
      <path class="s-line" d="M138 44 q6 42 0 84 M150 36 q6 50 0 100 M162 44 q6 42 0 84" stroke-width="1" opacity=".5"/></g>
      <g class="ans">${bolt(150, 70, 1.1)}${bolt(152, 106, .9)}</g>
      <g class="ans">${[30, 70, 110, 150].map(y => AR(`M112 ${y} L128 ${86 + (y - 90) * .5} M188 ${y} L172 ${86 + (y - 90) * .5}`, 's-warn a-flow', 2)).join('')}</g>
      ${qtag(62, 30, 'Older age', 9)}${qtag(62, 70, 'Female', 9)}${qtag(62, 110, 'Low BMI', 9)}${qtag(62, 150, 'Asian descent', 9)}
      ${qtag(238, 30, 'Heavy alcohol', 9)}${qtag(238, 70, 'Intense exercise', 9)}${qtag(238, 110, 'CYP3A4 inhibitors', 9)}${qtag(236, 150, 'Kidney/liver/thyroid dz', 9)}
      ${T(150, 174, 'Who gets statin muscle aches?', { s: 9.5 })}`),

    /* Statin muscle aches: check CK -> switch/lower -> non-statin */
    saseFix: ART(`
      ${T(150, 14, 'Muscle aches on a statin: next steps', { s: 10 })}
      <rect class="f-white" x="40" y="34" width="18" height="44" rx="9"/><rect class="f-blood noline" x="42" y="56" width="14" height="20" rx="6"/>
      ${tab(140, 56, 'f-vein', 9)}${tab(164, 56, 'f-immune', 7)}
      <g class="ans"><path class="s-good a-flow" d="M144 42 C150 34 160 36 162 46" stroke-width="2"/><path class="s-warn" d="M152 72 v12 m-5 -5 l5 5 l5 -5" stroke-width="2"/></g>
      ${pill(244, 56, -30, 'f-good')}${pill(262, 50, 20, 'f-warn')}
      <g class="ans">${check(268, 72, 2)}</g>
      ${AR('M72 56 L118 56', 's-ink a-flow', 2)}${AR('M184 56 L226 56', 's-ink a-flow', 2)}
      <g class="ansmotion">${ride('<circle class="f-pancreas" r="6"/>', 'M49 98 L150 98 L252 98', 5)}</g>
      <path class="s-ink" d="M49 98 H252" stroke-width="1" stroke-dasharray="2 4" opacity=".6"/>
      ${qtag(50, 114, '1. Check CK', 9.5)}${qtag(150, 136, '2. Switch statin or lower dose', 9)}${qtag(250, 114, '3. Non-statin', 9.5)}
      ${tag(236, 154, 'if still not tolerated', 'ans', 9)}
      ${tag(100, 172, 'Keep them on some therapy', 'ans', 9)}`),

    /* CYP3A4 inhibitors raise atorva/lova/simva */
    cyp: ART(`
      ${tab(50, 18, 'f-vein')}${tab(150, 18, 'f-vein')}${tab(250, 18, 'f-vein')}
      ${qtag(50, 38, 'Atorvastatin', 9.5)}${qtag(150, 38, 'Lovastatin', 9.5)}${qtag(250, 38, 'Simvastatin', 9.5)}
      ${tag(58, 64, 'CYP3A4 (liver, gut)', '', 9)}
      ${enz(44, 102, 20, 'f-immune')}
      ${tab(84, 102, 'f-vein', 6)}${tab(102, 102, 'f-vein', 6)}${tab(120, 102, 'f-vein', 6)}
      <g class="ans"><g class="a-pop">${pill(64, 102, 0, 'f-bad')}${nope(64, 102, 13)}</g></g>
      ${AR('M136 102 L176 102', 's-warn a-flow', 2.5)}
      ${tag(200, 64, 'Statin level', '', 9)}
      ${tube(190, 74, 20, 62, .3, .95, 'f-vein')}
      ${muscle(260, 100, 22, 10)}
      <g class="ans"><g class="a-shake">${bolt(260, 98, .9)}</g></g>
      ${qtag(258, 128, 'Rhabdo risk ↑', 9)}
      <g class="ans">${T(150, 156, 'Inhibitors: clarithromycin, erythromycin,', { s: 9 })}${T(150, 168, 'ketoconazole, amiodarone, diltiazem', { s: 9 })}</g>
      ${q(150, 160)}`),

    /* Grapefruit juice: which statins interact */
    grapefruit: ART(`
      ${tag(52, 14, 'Interacts', '', 10)}${tag(248, 14, 'No interaction', '', 10)}
      <g class="a-bob"><circle class="f-warn" cx="150" cy="62" r="28"/><circle class="f-mouth" cx="150" cy="62" r="23" style="stroke-width:1"/>
      <path class="s-white" d="M150 40 V84 M128 62 H172 M134 46 L166 78 M166 46 L134 78" stroke-width="1.6"/><circle class="f-white noline" cx="150" cy="62" r="3"/></g>
      <g class="ans">${[0, .5, 1].map(d => `<g class="a-drop" style="animation-delay:${d}s"><circle class="f-mouth" cx="${124 - d * 4}" cy="${96 + d * 6}" r="3"/></g>`).join('')}</g>
      ${[40, 80, 120].map(y => pill(100, y, -20, 'f-bad')).join('')}${[40, 80, 120].map(y => pill(200, y, -20, 'f-good')).join('')}
      <g class="ans">${[40, 80, 120].map((y, i) => `<g class="a-blink" style="animation-delay:${i * .3}s"><path class="f-warn" d="M108 ${y - 18} l7 12 h-14 Z"/>${T(108, y - 8, '!', { s: 9, c: 'tagtx' })}</g>`).join('')}${[40, 80, 120].map((y, i) => check(210, y - 11, i)).join('')}</g>
      ${qtag(48, 40, 'Simvastatin', 9.5)}${qtag(48, 80, 'Atorvastatin', 9.5)}${qtag(48, 120, 'Lovastatin', 9.5)}
      ${qtag(254, 40, 'Rosuvastatin', 9.5)}${qtag(254, 80, 'Pravastatin', 9.5)}${qtag(254, 120, 'Pitavastatin', 9.5)}
      ${T(150, 148, 'Grapefruit juice blocks gut CYP3A4', { s: 9.5 })}
      ${T(150, 164, 'so some statin levels rise', { s: 9, w: 400 })}`),

    /* Asian patients: same dose -> higher levels -> start low */
    asian: ART(`
      ${tab(110, 22, 'f-vein', 9)}
      ${tag(150, 22, 'Same dose', '', 9.5)}
      ${AR('M100 30 L72 50 M120 30 L168 50', 's-ink a-flow', 1.8)}
      ${tube(60, 54, 22, 80, .45, .45, 'f-vein')}
      ${tube(160, 54, 22, 80, .45, .9, 'f-bad')}
      ${tag(71, 150, 'Most patients', '', 9)}${tag(171, 150, 'Asian patients', '', 9)}
      ${qtag(171, 168, 'Higher blood level', 9)}
      <circle class="f-white" cx="252" cy="70" r="22"/>
      <path class="s-good" d="M236 84 A22 22 0 0 1 240 52" stroke-width="5"/>
      <g class="ansmotion"><path class="s-line" d="M252 70 L252 52" stroke-width="3"><animateTransform attributeName="transform" type="rotate" values="40 252 70;-50 252 70;-50 252 70;40 252 70" keyTimes="0;.4;.85;1" dur="4s" ${rep}/></path></g>
      <g class="q"><path class="s-line" d="M252 70 L264 56" stroke-width="3"/></g>
      <circle class="f-scar" cx="252" cy="70" r="4"/>
      ${qtag(238, 110, 'Start at a lower dose', 9)}
      ${tag(238, 130, 'e.g., rosuva 5 mg', 'ans', 9)}`),

    /* Pregnancy: statins contraindicated; bile acid sequestrant if needed */
    preg: ART(`
      <circle class="f-skin" cx="50" cy="26" r="13"/>
      <path class="f-mouth" d="M38 42 Q50 36 62 42 C72 56 90 74 84 102 C80 116 66 118 62 118 L66 160 L34 160 L38 118 C30 100 30 70 38 42 Z"/>
      <circle class="f-skin" cx="70" cy="94" r="12" opacity=".9"/>
      <g class="a-beat">${heart(70, 92, .3)}</g>
      ${tag(54, 174, 'Pregnant or nursing', '', 9)}
      ${bottle(150, 70, 'f-vein')}
      <g class="ans"><g class="a-pop">${nope(150, 70, 30)}</g></g>
      ${tag(150, 22, 'Statin', '', 10)}
      ${qtag(150, 122, 'Contraindicated', 10)}
      <g class="ans">
        <g class="a-bob">${scoop(250, 66)}</g>
        ${check(270, 40, 2)}
        ${T(236, 150, 'if a lipid drug is', { s: 9, w: 400 })}${T(236, 162, 'truly needed', { s: 9, w: 400 })}
      </g>
      ${qtag(236, 104, 'Bile acid sequestrant', 9)}${tag(236, 124, 'cholestyramine', 'ans', 9)}`),

    /* Statin monitoring timeline */
    monitor: ART(`
      <path class="s-ink" d="M24 48 H286" stroke-width="2"/>
      <g class="ansmotion">${ride('<circle class="f-pancreas" r="6"/>', 'M24 48 L286 48', 6)}</g>
      ${tab(24, 48, 'f-vein', 9)}${tag(46, 24, 'Start/change', '', 9)}
      ${cal(110, 46)}${T(110, 55, '4–12', { s: 9, c: 'tagtx' })}
      <g class="a-pulse"><rect class="f-white" x="100" y="2" width="9" height="20" rx="4.5"/><rect class="f-pancreas noline" x="101.5" y="10" width="6" height="11" rx="3"/></g>
      ${cal(222, 46)}<g class="ans"><g class="a-spin"><path class="s-good" d="M214 46 a8 8 0 1 1 3 6" stroke-width="2"/></g></g>
      ${qtag(110, 76, 'Fasting lipids at 4–12 wk', 9)}${qtag(238, 76, 'Then every 3–12 mo', 9)}
      <path class="s-ink" d="M8 96 H292" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${liver(18, 106, .42)}${muscle(98, 122, 18, 8)}
      <g class="ans"><g class="a-blink">${T(70, 112, '?', { s: 12 })}</g></g>
      ${qtag(70, 152, 'LFTs, CK only if symptoms', 9)}
      <rect class="f-white" x="210" y="104" width="24" height="32" rx="4"/><rect class="f-water" x="214" y="108" width="16" height="10" rx="2"/>
      <g class="a-drop">${G(250, 118, 1, '<path class="f-blood" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/>')}</g>
      ${qtag(230, 152, 'Watch glucose', 9.5)}${tag(230, 170, 'diabetes risk', 'ans', 9)}`),

    /* Evening dosing: simva/lova at night; atorva/rosuva any time */
    evening: ART(`
      <rect x="6" y="6" width="142" height="168" rx="12" fill="#1d2b64" stroke="var(--art-line)" stroke-width="1.5"/>
      <rect class="f-fat" x="152" y="6" width="142" height="168" rx="12" style="opacity:.7"/>
      <g class="a-bob"><path d="M128 14 a14 14 0 1 0 8 24 a11 11 0 1 1 -8 -24 Z" fill="#ffe8a3" stroke="var(--art-line)" stroke-width="1"/></g>
      ${[[20, 18], [56, 14], [94, 26], [30, 46]].map(([x, y], i) => `<g class="a-blink" style="animation-delay:${i * .3}s"><circle cx="${x}" cy="${y}" r="1.8" fill="#fff"/></g>`).join('')}
      ${liver(18, 56, .55)}
      <g class="ans">${[[44, 54], [60, 50], [76, 56]].map(([x, y], i) => `<g class="a-rise" style="animation-delay:${i * .5}s"><circle class="f-pancreas" cx="${x}" cy="${y}" r="4"/></g>`).join('')}</g>
      ${T(77, 104, 'Liver makes most', { s: 9, c: 'on' })}${T(77, 115, 'cholesterol at night', { s: 9, c: 'on' })}
      ${qtag(77, 134, 'Simvastatin', 9.5)}${qtag(77, 154, 'Lovastatin', 9.5)}
      <g class="ans">${T(77, 170, 'short-acting', { s: 9, c: 'on' })}</g>
      <g class="a-spin"><circle class="f-pancreas" cx="190" cy="34" r="14"/><path class="s-warn" d="M190 12 v-4 M190 56 v4 M168 34 h-4 M212 34 h4 M174 18 l-3 -3 M206 50 l3 3 M206 18 l3 -3 M174 50 l-3 3" stroke-width="2"/></g>
      <circle class="f-white" cx="252" cy="68" r="20"/>
      <g class="ansmotion"><path class="s-line" d="M252 68 V54" stroke-width="2.5"><animateTransform attributeName="transform" type="rotate" values="0 252 68;360 252 68" dur="4s" ${rep}/></path></g>
      <g class="q"><path class="s-line" d="M252 68 V54" stroke-width="2.5"/></g>
      <path class="s-line" d="M252 68 L262 72" stroke-width="2.5"/>
      ${T(223, 110, 'Any time of day', { s: 10, c: 'tagtx' })}
      ${qtag(223, 134, 'Atorvastatin', 9.5)}${qtag(223, 154, 'Rosuvastatin', 9.5)}
      <g class="ans">${T(223, 170, 'long-acting', { s: 9, c: 'tagtx' })}</g>`),

    /* Atorvastatin: no renal adjustment */
    renal: ART(`
      <g class="a-pulse">${kidney(116, 30, 1.2, false)}${kidney(184, 30, 1.2, true)}</g>
      ${tag(150, 96, 'Kidney disease', '', 9.5)}
      ${pill(56, 40, -20, 'f-good')}
      <g class="ans">${AR('M54 52 C50 74 52 90 56 104', 's-good a-flow', 2.5)}${check(76, 40, 1)}</g>
      ${qtag(56, 112, 'Atorvastatin', 10)}
      ${tag(56, 130, 'no dose change', 'ans', 9)}
      ${tag(56, 148, 'cleared by liver', 'ans', 9)}
      ${pill(234, 36, -20, 'f-scar')}${pill(256, 48, 20, 'f-scar')}
      <circle class="f-white" cx="244" cy="124" r="15"/>
      <g class="ansmotion"><path class="s-line" d="M244 124 L244 112" stroke-width="2.5"><animateTransform attributeName="transform" type="rotate" values="50 244 124;-50 244 124;-50 244 124;50 244 124" keyTimes="0;.4;.85;1" dur="4s" ${rep}/></path></g>
      <g class="q"><path class="s-line" d="M244 124 L254 116" stroke-width="2.5"/></g>
      ${tag(244, 70, 'Most others', '', 9)}
      ${tag(240, 152, 'lower dose if severe', 'ans', 9)}
      ${T(150, 172, 'Which statin needs no renal dose change?', { s: 9 })}`),

    /* Ezetimibe: blocks NPC1L1 cholesterol absorption in the gut */
    ezetimibe: ART(`
      ${T(36, 14, 'Gut lumen', { s: 9.5 })}
      <rect class="f-small" x="6" y="52" width="288" height="30" rx="4"/>
      <path class="f-small" d="M6 52 ${Array.from({ length: 12 }, (_, i) => `q12 -14 24 0`).join(' ')} Z"/>
      ${[70, 150, 230].map(x => `<rect class="f-immune" x="${x - 6}" y="40" width="12" height="26" rx="3"/>`).join('')}
      ${T(150, 77, 'NPC1L1 door', { s: 9, c: 'on' })}
      ${both([[40, 28], [100, 22], [190, 26], [260, 30]].map(([x, y]) => `<path class="f-fat" d="M${x - 7} ${y} q7 -8 14 0 q-7 8 -14 0 Z"/>`).join('') +
        [70, 150, 230].map(x => `<circle class="f-fat" cx="${x}" cy="54" r="4"/>`).join(''),
        [0, .9, 1.8].map((b, i) => ride('<path class="f-fat" d="M-7 0 q7 -8 14 0 q-7 8 -14 0 Z"/>', `M${70 + i * 80} 18 L${70 + i * 80} 34 L${60 + i * 80} 18 L${30 + i * 80} 22`, 2.4, b)).join(''))}
      <g class="ans">${[70, 150, 230].map((x, i) => `<g class="a-pop" style="--d:${i}"><rect class="f-bad" x="${x - 8}" y="34" width="16" height="9" rx="3"/></g>`).join('')}
      ${AR('M200 14 L286 14', 's-food a-flow', 3)}</g>
      ${qtag(196, 14, 'Blocks absorption', 9)}
      ${liver(16, 104, .55)}
      ${AR('M70 86 L70 104', 's-ink', 1.6)}
      <g class="ans"><path class="s-bad" d="M62 90 l16 10 M78 90 l-16 10" stroke-width="2.2"/></g>
      ${qtag(52, 160, 'Less to the liver', 9)}
      ${tag(150, 100, 'LDL-C', '', 9)}
      ${tube(140, 108, 20, 50, .85, .5, 'f-warn')}
      ${qtag(150, 172, 'LDL-C ↓', 9)}
      ${tag(234, 104, 'Second-line:', 'ans', 9)}${tag(234, 122, 'add to max statin', 'ans', 9)}${tag(234, 140, 'or use alone', 'ans', 9)}
      <g class="ans"><g class="a-bob">${tab(214, 160, 'f-vein', 7)}${tab(244, 160, 'f-white', 7)}</g></g>${q(234, 122)}`),

    /* PCSK9 inhibitors */
    pcsk9: ART(`
      <rect class="f-blood noline" x="6" y="6" width="288" height="62" rx="10" opacity=".22"/>
      <rect class="f-skin" x="6" y="76" width="288" height="98" rx="10"/>
      <path d="M6 72 H294" stroke="var(--c-liver)" stroke-width="6"/>
      ${T(28, 18, 'Blood', { s: 9 })}${T(36, 170, 'Liver cell', { s: 9, c: 'tagtx' })}
      ${receptor(50, 72)}
      <path class="f-germ" d="M58 52 q8 -8 14 0 q4 8 -6 10 q-10 0 -8 -10 Z"/>${T(84, 44, 'PCSK9', { s: 9 })}
      ${AR('M50 82 C50 100 54 112 56 122', 's-ink', 1.6)}
      <circle class="f-germ" cx="58" cy="136" r="14" opacity=".8"/>
      <g class="ans"><g class="a-shake">${cross(58, 136)}</g></g>
      ${qtag(100, 150, 'Receptor destroyed', 9)}
      ${receptor(170, 72)}${receptor(250, 72)}
      <g class="ans">${[150, 190, 210, 230, 270].map((x, i) => `<g class="a-pop" style="--d:${i + 1}">${receptor(x, 72)}</g>`).join('')}
        <g class="a-bob"><path class="f-germ" d="M120 18 q8 -8 14 0 q4 8 -6 10 q-10 0 -8 -10 Z"/>
        <path class="f-good" d="M138 36 L138 26 L130 16 M138 26 L146 16" style="fill:none;stroke:var(--c-good);stroke-width:4"/></g>
        <g class="a-spin"><path class="s-good" d="M206 116 a12 12 0 1 1 6 10" stroke-width="2.4"/></g>
        <g class="ansmotion">${[[0, 170], [.7, 230], [1.4, 210], [2.1, 270]].map(([b, x]) => ride(ldl(0, 0, 6), `M${x} 10 L${x} 48`, 2.1, b)).join('')}</g>
      </g>
      ${qtag(232, 22, 'Antibody grabs PCSK9', 9)}
      ${qtag(210, 98, 'Receptors recycle', 9)}
      ${qtag(214, 142, 'Alirocumab', 9.5)}${qtag(214, 160, 'Evolocumab', 9.5)}
      <g class="ans">${syringe(276, 148, -40)}</g>`),

    /* Inclisiran: siRNA stops PCSK9 production; shot, 3 mo, then q6 mo */
    inclisiran: ART(`
      <rect class="f-skin" x="6" y="6" width="288" height="102" rx="14"/>
      ${T(42, 20, 'Liver cell', { s: 9, c: 'tagtx' })}
      <circle class="f-spleen" cx="40" cy="62" r="22"/>${T(40, 66, 'DNA', { s: 9, c: 'on' })}
      <path class="s-vein a-flow-slow" d="M64 62 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0" stroke-width="3"/>
      ${T(104, 46, 'PCSK9 mRNA', { s: 9, c: 'tagtx' })}
      <ellipse class="f-immune" cx="190" cy="62" rx="16" ry="11"/>
      ${both([[226, 40], [250, 62], [226, 84], [272, 40]].map(([x, y]) => `<path class="f-germ" d="M${x - 7} ${y - 2} q8 -8 14 0 q4 8 -6 10 q-10 0 -8 -10 Z"/>`).join(''),
        [0, 1, 2].map(b => ride('<path class="f-germ" d="M-7 -2 q8 -8 14 0 q4 8 -6 10 q-10 0 -8 -10 Z"/>', 'M206 62 L276 62', 3, b)).join('') + `<g>${nope(250, 62, 22)}</g>`)}
      ${tag(250, 98, 'PCSK9', '', 9)}
      <g class="ans">
        <g class="a-pop"><path class="s-bad" d="M134 54 l12 16 M146 54 l-12 16" stroke-width="2.6"/><circle cx="130" cy="74" r="4" fill="none" class="s-line" stroke-width="2"/><circle cx="150" cy="74" r="4" fill="none" class="s-line" stroke-width="2"/></g>
        <g class="a-bob"><path class="s-warn" d="M120 30 q6 -6 12 0 t12 0" stroke-width="3"/></g>
      </g>
      ${qtag(150, 22, 'siRNA cuts the mRNA', 9)}
      ${qtag(150, 94, 'Stops PCSK9 being made', 9)}
      ${[50, 150, 250].map(x => cal(x, 138, 40, 30)).join('')}
      <g class="ans">${[50, 150, 250].map((x, i) => `<g class="a-pop" style="--d:${i}">${syringe(x + 14, 126, -40)}</g>`).join('')}</g>
      ${qtag(50, 166, 'First shot', 9)}${qtag(150, 166, 'At 3 months', 9)}${qtag(250, 166, 'Then every 6 mo', 9)}`),

    /* Bempedoic acid: ACL inhibitor, upstream of the statin step */
    bempedoic: ART(`
      <rect class="f-skin" x="6" y="6" width="288" height="98" rx="14"/>
      ${T(28, 30, 'Citrate', { s: 9.5, c: 'tagtx' })}
      ${enz(74, 26, 12, 'f-spleen')}${qtag(78, 50, 'ACL', 9.5)}
      <g class="ans"><g class="a-pop">${pill(92, 26, 0, 'f-good')}${nope(92, 26, 11)}</g></g>
      ${AR('M106 26 L122 26')}${T(158, 30, 'Acetyl-CoA', { s: 9.5, c: 'tagtx' })}${AR('M196 26 L212 26')}${T(246, 30, 'HMG-CoA', { s: 9.5, c: 'tagtx' })}
      ${AR('M246 36 V48')}
      ${enz(236, 62, 11, 'f-immune')}${T(270, 60, 'statin', { s: 9, w: 400, c: 'tagtx' })}${T(270, 71, 'step', { s: 9, w: 400, c: 'tagtx' })}
      ${AR('M246 76 V84')}${T(246, 97, 'Cholesterol', { s: 9.5, c: 'tagtx' })}
      <g class="ans"><g class="a-blink"><path class="s-bad" d="M158 40 V54 m-5 -5 l5 5 l5 -5" stroke-width="2.4"/>${T(158, 68, 'less made', { s: 9, c: 'tagtx' })}</g></g>
      ${tag(64, 74, 'Blocks an early step', 'ans', 9)}
      ${qtag(140, 118, 'Oral option if statin-intolerant', 9)}
      <g class="ans">
        <g class="a-shake"><path class="f-white" d="M30 140 l4 -12 l3 12 l4 -14 l3 14 l4 -12 l2 12 Z"/></g>
        <path class="f-skin" d="M22 148 h36 q8 0 8 8 v6 h-44 Z"/>
      </g>
      ${qtag(64, 172, 'Uric acid ↑ (gout)', 9)}
      <path class="s-line" d="M254 128 C258 140 258 146 260 152" stroke-width="5"/>
      <g class="ans"><g class="a-shake"><path class="s-bad" d="M244 138 l8 -4 l-4 8 l10 -2" stroke-width="2"/></g></g>
      <path class="f-skin" d="M248 150 h30 q10 0 10 8 v4 h-44 Z"/>
      ${qtag(236, 172, 'Tendon rupture', 9.5)}`),

    /* Fibrates: big TG drop, HDL up, little LDL; gemfibrozil gallstones */
    fibrate: ART(`
      ${qtag(82, 14, 'Fibrates', 10)}
      <path class="s-ink" d="M14 110 H154" stroke-width="1.5"/>
      ${both(`<rect class="f-pancreas" x="22" y="30" width="30" height="80" rx="3"/><rect class="f-good" x="68" y="78" width="30" height="32" rx="3"/><rect class="f-warn" x="114" y="56" width="30" height="54" rx="3"/>`,
        `<rect class="f-pancreas" x="22" width="30" rx="3"><animate attributeName="y" values="30;70;70;30" keyTimes="0;.4;.85;1" dur="4.5s" ${rep}/><animate attributeName="height" values="80;40;40;80" keyTimes="0;.4;.85;1" dur="4.5s" ${rep}/></rect>` +
        `<rect class="f-good" x="68" width="30" rx="3"><animate attributeName="y" values="78;64;64;78" keyTimes="0;.4;.85;1" dur="4.5s" ${rep}/><animate attributeName="height" values="32;46;46;32" keyTimes="0;.4;.85;1" dur="4.5s" ${rep}/></rect>` +
        `<rect class="f-warn" x="114" width="30" rx="3"><animate attributeName="y" values="56;59;59;56" keyTimes="0;.4;.85;1" dur="4.5s" ${rep}/><animate attributeName="height" values="54;51;51;54" keyTimes="0;.4;.85;1" dur="4.5s" ${rep}/></rect>`)}
      ${tag(37, 122, 'TG', '', 9.5)}${tag(83, 122, 'HDL', '', 9.5)}${tag(129, 122, 'LDL', '', 9.5)}
      ${qtag(37, 142, 'TG ↓ 20–50%', 9)}${qtag(90, 160, 'HDL ↑', 9)}${qtag(132, 142, 'LDL barely', 9)}
      <path class="s-ink" d="M166 8 V172" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${pill(196, 26, -20, 'f-pancreas')}${pill(262, 36, -20, 'f-warn')}
      ${qtag(204, 46, 'Gemfibrozil', 9)}${qtag(262, 60, 'Fenofibrate', 9)}
      <g class="ans">${gb(196, 80, 1.1)}${[[194, 94], [202, 100], [196, 104]].map(([x, y], i) => `<circle class="f-pancreas a-pop" style="--d:${i}" cx="${x}" cy="${y}" r="3.4"/>`).join('')}</g>
      ${qtag(206, 130, 'Gallstones', 9.5)}${tag(206, 146, '+ dyspepsia', 'ans', 9)}
      <g class="ans"><g class="a-bob">${fish(262, 98, .7)}</g>${capsule(262, 120)}</g>
      ${qtag(232, 166, 'Or omega-3 (TG 500+)', 9)}`),

    /* Fibrate + statin -> myopathy/rhabdo */
    fibrateStatin: ART(`
      ${tab(30, 40, 'f-vein', 10)}${pill(80, 40, -20, 'f-pancreas')}
      ${T(55, 44, '+', { s: 14 })}
      ${tag(30, 64, 'Statin', '', 9)}${tag(84, 64, 'Fibrate', '', 9)}
      ${AR('M108 42 L150 42', 's-bad a-flow', 3)}
      <g class="a-shake">${muscle(198, 42, 34, 15)}</g>
      <g class="ans">${bolt(186, 40)}${bolt(212, 44, .8)}<path class="s-white" d="M200 28 l-4 14 l6 6" stroke-width="2"/></g>
      ${qtag(198, 76, 'Myopathy', 10)}
      ${tag(270, 18, 'CK', '', 9)}
      ${tube(262, 28, 16, 50, .2, .95, 'f-bad')}
      <g class="ans"><g class="a-drop"><path class="f-stool" d="M196 96 h16 l-2 20 h-12 Z"/></g></g>
      ${qtag(204, 132, 'Rhabdomyolysis', 10)}
      ${tag(70, 104, 'Worst with gemfibrozil', 'ans', 9)}
      ${qtag(70, 124, 'Higher risk:', 9)}
      <g class="ans">${T(70, 142, 'older adults, diabetes,', { s: 9 })}${T(70, 154, 'kidney disease,', { s: 9 })}${T(70, 166, 'hypothyroidism', { s: 9 })}</g>`),

    /* Bile acid sequestrants */
    bas: ART(`
      ${liver(8, 8, .6)}
      ${T(42, 52, 'liver', { s: 9, w: 400 })}
      ${AR('M64 32 C80 40 86 54 90 72', 's-bile a-flow', 3)}
      <rect class="f-small" x="70" y="72" width="224" height="40" rx="20"/>
      ${both([[112, 86], [150, 98], [196, 84], [236, 96]].map(([x, y]) => bile(x, y)).join(''),
        [0, .8, 1.6].map(b => ride(bile(0, 0, 3), 'M92 80 L130 92 L170 92', 2.4, b)).join(''))}
      <g class="ans">${[[142, 92], [202, 92], [262, 92]].map(([x, y], i) => `<g class="a-pulse" style="animation-delay:${i * .3}s">${resin(x, y, 9)}${bile(x - 8, y - 6)}${bile(x + 8, y - 5)}${bile(x, y + 9)}</g>`).join('')}
      ${AR('M276 104 L292 120', 's-food a-flow', 3)}</g>
      ${qtag(186, 62, 'Binds bile acids; not absorbed', 9)}
      ${qtag(160, 12, 'Cholestyramine', 9)}${qtag(230, 12, 'Colestipol', 9)}${qtag(196, 34, 'Colesevelam', 9)}
      <g class="ans"><g class="a-squeeze"><path class="f-stool" d="M30 130 q10 -10 20 0 q-10 8 -20 0 Z"/></g><circle class="f-small" cx="74" cy="132" r="9" opacity=".7"/></g>
      ${qtag(66, 154, 'Constipation, bloating', 9)}
      ${['A', 'D', 'E', 'K'].map((v, i) => `<circle class="f-pancreas" cx="${178 + i * 26}" cy="136" r="9"/>${T(178 + i * 26, 139.5, v, { s: 10, c: 'tagtx' })}`).join('')}
      <g class="ans"><g class="a-blink">${[0, 1, 2, 3].map(i => `<path class="s-bad" d="M${170 + i * 26} 128 l16 16" stroke-width="2"/>`).join('')}</g></g>
      ${qtag(217, 160, 'Vitamins A, D, E, K ↓', 9)}`),

    /* Avoid BAS when TG very high */
    basTG: ART(`
      ${tag(62, 16, 'Bile acid sequestrant', '', 9)}
      <g class="a-shake">${scoop(56, 54)}</g>
      <g class="ans">${AR('M86 60 L126 80', 's-bad a-flow', 3)}</g>
      ${qtag(62, 96, 'Can raise TG', 9.5)}
      ${tag(150, 16, 'TG', '', 9.5)}
      <g class="ans"><rect class="f-bad a-blink" x="134" y="28" width="32" height="46" rx="4" opacity=".35"/></g>
      ${tube(140, 28, 20, 140, .3, .95, 'f-pancreas', 5)}
      <path class="s-bad" d="M130 54 H170 M130 74 H170" stroke-width="2"/>
      ${qtag(226, 54, 'Colesevelam: TG over 500', 9)}${qtag(226, 76, 'Others: TG over 400', 9)}
      ${qtag(222, 106, 'Avoid if TG very high', 9.5)}
      <g class="ans">${gb(40, 128, 1)}<path class="s-bad" d="M46 112 l10 -6 M56 112 l-10 -6" stroke-width="2.2"/></g>
      ${qtag(62, 166, 'Also: biliary obstruction', 9)}
      ${T(226, 150, 'Why? The liver makes', { s: 9, w: 400 })}${T(226, 162, 'more VLDL (TG)', { s: 9, w: 400 })}`),

    /* Spacing other drugs: 1 h before or 4-6 h after */
    basSpacing: ART(`
      <path class="s-ink" d="M14 100 H290" stroke-width="2"/>
      ${[-2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map(h => `<path class="s-ink" d="M${100 + h * 24} 96 v8" stroke-width="1.5"/>`).join('')}
      ${T(100, 118, 'resin', { s: 9 })}${T(52, 118, '−2 h', { s: 9, w: 400 })}${T(196, 118, '+4 h', { s: 9, w: 400 })}${T(244, 118, '+6 h', { s: 9, w: 400 })}
      <g class="ans"><rect class="f-good noline" x="64" y="94" width="20" height="12" rx="4" opacity=".7"/><rect class="f-good noline" x="196" y="94" width="48" height="12" rx="4" opacity=".7"/></g>
      ${scoop(98, 66)}
      ${both(pill(126, 54, -20, 'f-vein'), `<g>${pill(0, 0, -20, 'f-vein')}<animateMotion dur="3s" ${rep} path="M126 54 L104 62 L104 62" keyTimes="0;.5;1" keyPoints="0;1;1" calcMode="linear"/></g>`)}
      <g class="ans"><g class="a-blink">${nope(112, 58, 14)}</g>${T(140, 34, 'binds it', { s: 9 })}</g>
      ${pill(74, 70, -20, 'f-vein')}${pill(220, 70, -20, 'f-vein')}
      <g class="ans">${check(74, 50, 1)}${check(220, 50, 2)}</g>
      ${qtag(70, 140, '1 hour before', 9.5)}${qtag(220, 140, '4–6 hours after', 9.5)}
      ${T(150, 20, 'Other meds vs. the resin', { s: 10 })}
      ${T(150, 168, 'The resin can trap other drugs in the gut', { s: 9, w: 400 })}`),

    /* Omega-3 fatty acids */
    omega: ART(`
      <g class="a-bob">${fish(44, 30, 1)}</g>
      ${capsule(98, 24, -20)}${capsule(112, 40, 15)}
      ${tag(70, 62, 'Lovaza · Vascepa', '', 9)}
      ${tag(250, 10, 'TG', '', 9)}
      ${tube(240, 18, 20, 80, .9, .45, 'f-pancreas')}
      <path class="s-bad" d="M234 38 H266" stroke-width="2"/>
      ${qtag(188, 38, 'For TG 500+', 9.5)}
      ${tag(188, 60, 'FDA approved', 'ans', 9)}
      <path class="s-ink" d="M8 108 H292" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${qtag(52, 126, 'Mild diarrhea', 9)}${qtag(52, 150, 'Fishy taste', 9)}
      <rect class="f-white" x="112" y="114" width="80" height="34" rx="4"/>
      <path class="s-bad a-draw" d="M114 134 l6 0 l2 -3 l2 3 l4 0 l2 -12 l3 18 l2 -6 l4 0 l2 -2 l2 3 l6 0 l2 -12 l3 16 l2 -4 l5 0 l2 -2 l3 2 l4 0 l2 -10 l3 14 l6 -4" stroke-width="1.6"/>
      ${qtag(152, 162, 'AFib risk ↑', 9)}
      <g class="ans"><g class="a-drop">${G(232, 130, 1.2, '<path class="f-blood" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/>')}</g>${pill(262, 128, -20, 'f-scar')}</g>
      ${qtag(246, 162, 'Bleeding + anticoag', 9)}`),

    /* Niacin: no longer recommended */
    niacin: ART(`
      <path class="f-scar" d="M140 160 L150 70 L160 160 Z"/>
      <rect class="f-scar" x="110" y="160" width="80" height="8" rx="3"/>
      ${both(`<path class="s-line" d="M70 70 H230" stroke-width="4"/><path class="s-ink" d="M70 70 L60 100 M70 70 L80 100 M230 70 L220 100 M230 70 L240 100" stroke-width="1"/><path class="f-white" d="M50 100 h40 a20 8 0 0 1 -40 0 Z"/><path class="f-white" d="M210 100 h40 a20 8 0 0 1 -40 0 Z"/>`,
        `<g><animateTransform attributeName="transform" type="rotate" values="0 150 70;14 150 70;10 150 70;14 150 70" keyTimes="0;.4;.7;1" dur="3s" ${rep}/><path class="s-line" d="M70 70 H230" stroke-width="4"/><path class="s-ink" d="M70 70 L60 100 M70 70 L80 100 M230 70 L220 100 M230 70 L240 100" stroke-width="1"/><path class="f-white" d="M50 100 h40 a20 8 0 0 1 -40 0 Z"/><path class="f-white" d="M210 100 h40 a20 8 0 0 1 -40 0 Z"/><circle class="f-good" cx="70" cy="94" r="5"/><circle class="f-bad" cx="230" cy="86" r="14"/><path class="s-white" d="M224 86 q6 -6 12 0" stroke-width="2"/></g>`)}
      <circle class="f-white noline" cx="150" cy="70" r="4"/>
      ${qtag(70, 130, 'Benefit: questionable', 9)}${qtag(230, 130, 'Side effects: unpleasant', 9)}
      ${tag(230, 148, 'e.g., flushing', 'ans', 9)}
      ${bottle(150, 32, 'f-pancreas')}${T(150, 36, 'B3', { s: 9, c: 'tagtx' })}
      <g class="ans"><g class="a-pop">${nope(150, 30, 24)}</g></g>
      ${tag(54, 18, 'Niacin', '', 10)}
      ${qtag(240, 18, 'No longer used', 9.5)}`),

    /* Familial hypercholesterolemia: autosomal dominant LDLR/APOB/PCSK9 */
    fh: ART(`
      <rect class="f-bad" x="20" y="14" width="22" height="22" rx="2"/><circle class="f-white" cx="90" cy="25" r="11"/>
      <path class="s-ink" d="M42 25 H79 M60 25 V46 M24 46 H116 M24 46 V56 M54 46 V56 M84 46 V56 M114 46 V56" stroke-width="1.6"/>
      <rect class="f-white" x="14" y="56" width="20" height="20" rx="2"/><circle class="f-white" cx="54" cy="66" r="10"/><rect class="f-white" x="74" y="56" width="20" height="20" rx="2"/><circle class="f-white" cx="114" cy="66" r="10"/>
      <g class="ans"><rect class="f-bad a-pop" style="--d:1" x="14" y="56" width="20" height="20" rx="2"/><circle class="f-bad a-pop" style="--d:2" cx="114" cy="66" r="10"/></g>
      ${qtag(66, 94, 'Autosomal dominant', 9.5)}${tag(66, 112, 'half the kids', 'ans', 9)}
      <g class="a-sway"><path class="s-vein" d="M170 8 C200 26 200 46 170 64 C140 82 140 102 170 120" stroke-width="3"/><path class="s-bad" d="M170 8 C140 26 140 46 170 64 C200 82 200 102 170 120" stroke-width="3"/>
      <path class="s-ink" d="M158 18 H182 M152 36 H188 M158 54 H182 M158 74 H182 M152 92 H188 M158 110 H182" stroke-width="1.4"/></g>
      ${qtag(238, 26, 'LDLR', 9.5)}${qtag(238, 50, 'APOB', 9.5)}${qtag(238, 74, 'PCSK9', 9.5)}
      ${tag(238, 98, 'gene mutations', 'ans', 9)}
      <g class="a-beat">${heart(40, 140, .9)}</g><g class="ans">${bolt(40, 144, .8)}</g>
      ${qtag(104, 140, 'Early heart attacks', 9)}
      <circle class="f-skin" cx="206" cy="132" r="9"/><path class="f-immune" d="M196 142 h20 l4 24 h-28 Z"/>
      <g class="ans">${cal(250, 142, 28, 26)}${T(250, 152, '2', { s: 12, c: 'tagtx' })}</g>
      ${qtag(226, 172, 'Screen kids from age 2', 9)}
      ${T(54, 172, 'very high LDL-C', { s: 9, w: 400 })}`),

    /* Most common: polygenic */
    polygenic: ART(`
      ${[[30, 20], [62, 30], [94, 18], [126, 30]].map(([x, y], i) => `<g class="a-drop" style="animation-delay:${i * .35}s"><rect class="f-spleen" x="${x - 9}" y="${y - 6}" width="18" height="12" rx="3"/></g>`).join('')}
      ${T(78, 52, 'many small gene variants', { s: 9 })}
      <g class="a-drop" style="animation-delay:.2s"><path class="f-fat" d="M184 20 h28 a14 10 0 0 0 -28 0 Z"/><rect class="f-food" x="184" y="21" width="28" height="5" rx="2"/><path class="f-fat" d="M184 27 h28 v4 a4 4 0 0 1 -4 4 h-20 a4 4 0 0 1 -4 -4 Z"/></g>
      <g class="a-drop" style="animation-delay:.9s"><rect class="f-vein" x="234" y="20" width="36" height="12" rx="4"/><rect class="f-vein" x="230" y="14" width="8" height="18" rx="3"/><rect class="f-vein" x="266" y="14" width="8" height="18" rx="3"/></g>
      ${T(230, 52, 'fat, weight, inactivity', { s: 9 })}
      ${AR('M80 60 L134 86 M226 60 L166 86', 's-warn a-flow', 2.5)}
      <path class="f-white" d="M126 84 h48 l-6 70 h-36 Z"/>
      ${both(`<path class="f-warn noline" d="M131 130 h38 l-2 22 h-34 Z"/>`,
        `<rect class="f-warn noline" x="131" width="38"><animate attributeName="y" values="150;96;96;150" keyTimes="0;.5;.85;1" dur="4s" ${rep}/><animate attributeName="height" values="2;56;56;2" keyTimes="0;.5;.85;1" dur="4s" ${rep}/></rect>`)}
      <path d="M126 84 h48 l-6 70 h-36 Z" fill="none" stroke="var(--art-line)" stroke-width="1.5"/>
      ${tag(150, 164, 'High LDL-C', '', 9)}
      ${qtag(64, 120, 'Polygenic', 11)}${tag(64, 140, 'most common type', 'ans', 9)}
      ${qtag(236, 120, 'Genes + lifestyle', 9.5)}
      ${T(236, 140, 'saturated + trans fat,', { s: 9, w: 400 })}${T(236, 152, 'obesity, inactivity', { s: 9, w: 400 })}`),

    /* Secondary causes */
    secondary: ART(`
      ${tag(70, 14, 'Conditions', '', 10)}${tag(230, 14, 'Drugs', '', 10)}
      ${['Diabetes, obesity', 'Hypothyroid, CKD', 'Cirrhosis, alcohol', 'Cushing syndrome'].map((t, i) => qtag(70, 44 + i * 30, t, 9)).join('')}
      ${['Thiazide, loop diuretics', 'Some beta blockers', 'Steroids, antipsychotics', 'Protease inhibitors'].map((t, i) => qtag(230, 44 + i * 30, t, 9)).join('')}
      <rect class="f-white" x="141" y="40" width="18" height="96" rx="9"/>
      <rect class="f-blood noline" x="143" y="92" width="14" height="42" rx="6"/>
      ${both(`<rect class="f-fat noline" x="143" y="80" width="14" height="12"/>`,
        `<rect class="f-fat noline" x="143" width="14"><animate attributeName="y" values="88;52;52;88" keyTimes="0;.5;.85;1" dur="4s" ${rep}/><animate attributeName="height" values="4;40;40;4" keyTimes="0;.5;.85;1" dur="4s" ${rep}/></rect>`)}
      <rect x="141" y="40" width="18" height="96" rx="9" fill="none" stroke="var(--art-line)" stroke-width="1.5"/>
      <g class="ans">${AR('M150 30 v-12 m-5 5 l5 -5 l5 5', 's-bad a-blink', 2.4)}</g>
      ${T(150, 152, 'lipids', { s: 9 })}
      ${T(150, 172, 'Treat the cause too', { s: 9.5 })}`),

    /* LDL vs HDL */
    lipo: ART(`
      ${liver(8, 58, .75)}${T(52, 120, 'Liver', { s: 10 })}
      <rect class="f-muscle" x="212" y="50" width="80" height="60" rx="12"/>
      <rect class="f-blood noline" x="212" y="62" width="80" height="36" opacity=".6"/>
      <path class="f-fat" d="M232 98 C238 84 262 84 270 98 Z"/>
      ${T(252, 124, 'Tissues + arteries', { s: 9 })}
      <path class="s-warn" d="M96 60 C130 20 180 20 214 58" stroke-width="2.5" stroke-dasharray="5 6"/>
      <path class="s-good" d="M214 104 C180 146 130 146 96 104" stroke-width="2.5" stroke-dasharray="5 6"/>
      ${both(ldl(155, 30, 9) + hdl(155, 136, 7),
        [0, 1.3].map(b => ride(ldl(0, 0, 9), 'M96 60 C130 20 180 20 214 58', 2.6, b)).join('') + [0, 1.3].map(b => ride(hdl(0, 0, 7), 'M214 104 C180 146 130 146 96 104', 2.6, b)).join(''))}
      ${tag(155, 52, 'LDL', '', 9.5)}${tag(155, 116, 'HDL', '', 9.5)}
      ${qtag(155, 12, 'Liver → tissues ("bad")', 9)}${qtag(155, 162, 'Back to the liver ("good")', 9)}
      <g class="ans"><g class="a-pulse"><path class="f-fat" d="M238 98 C242 90 258 90 264 98 Z"/></g></g>`),

    /* Lifestyle teaching */
    diet: ART(`
      <rect class="f-fat" x="20" y="22" width="22" height="16" rx="2"/>${AR('M46 30 L60 30', 's-ink a-flow', 2)}
      <path class="f-bile" d="M70 14 h8 v6 c6 2 8 6 8 10 v14 h-24 v-14 c0 -4 2 -8 8 -10 Z"/>
      ${qtag(50, 64, 'Swap sat. fat', 9)}${tag(50, 82, 'for unsaturated', 'ans', 9)}
      <g class="a-spin"><circle class="f-white" cx="150" cy="32" r="22"/><path class="f-good" d="M150 32 L150 10 A22 22 0 0 1 172 32 Z"/><path class="f-mouth" d="M150 32 L172 32 A22 22 0 0 1 150 54 Z"/><path class="f-food" d="M150 32 L150 54 A22 22 0 0 1 128 32 Z"/></g>
      ${qtag(150, 64, 'DASH plan', 9)}${tag(150, 82, 'fruit, veg, whole grains', 'ans', 9)}
      <g class="a-bob"><path class="f-immune" d="M226 34 c4 -10 10 -14 16 -12 l6 8 c6 2 14 4 18 10 v6 h-40 Z"/><path class="s-white" d="M234 30 l6 4 M238 26 l6 4" stroke-width="1.5"/></g>
      ${AR('M210 28 h-10 M212 36 h-14', 's-ink a-flow', 1.5)}
      ${qtag(254, 64, 'Exercise 40 min', 9)}${tag(254, 82, '3–4 times a week', 'ans', 9)}
      <rect class="f-white" x="80" y="118" width="40" height="8" rx="2"/><rect class="f-warn" x="120" y="118" width="8" height="8" rx="1"/>
      <g class="a-rise"><path class="s-ink" d="M126 112 q4 -6 0 -12" stroke-width="1.4" opacity=".6"/></g>
      <g class="ans">${nope(104, 122, 22)}</g>
      ${qtag(104, 160, 'Stop smoking', 9.5)}
      <path class="f-white" d="M188 104 h20 q0 16 -10 18 q-10 -2 -10 -18 Z"/><path class="f-muscle" d="M189.5 110 h17 q-1 9 -8.5 10 q-7.5 -1 -8.5 -10 Z"/><path class="s-line" d="M198 122 v12 m-7 0 h14" stroke-width="1.6"/>
      <g class="ans"><g class="a-pulse"><rect class="f-white" x="218" y="106" width="28" height="20" rx="4"/>${T(232, 120, 'limit', { s: 9, c: 'tagtx' })}</g></g>
      ${qtag(206, 160, 'Limit alcohol', 9.5)}`),
  });
})();
