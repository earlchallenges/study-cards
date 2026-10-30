/* Psychiatric Interview Ch 28 art: dementia (major neurocognitive disorder) and delirium.
   Colorful replacements for PICS, loaded after the page sets PICS. Everything lives inside one
   function so the little helpers below never clash with the other art files. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const A = (cls, inner, d = 0) => `<g class="${cls}" style="--d:${d};animation-delay:${(d * 0.25).toFixed(2)}s">${inner}</g>`;
  const ln = (d, w = 1.4, cls = 's-line', more = '') => `<path class="${cls}" d="${d}" style="stroke-width:${w}${more}"/>`;
  const dash = d => `<path class="s-ink a-flow" d="${d}" style="stroke-width:1.6"/>`;
  const spinAt = (cx, cy, dur, inner) => `<g>${inner}<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/></g>`;

  // faces and people. head centered on its origin, radius 10
  const MOUTH = {
    smile: 'M-4 4 Q0 7.5 4 4', flat: 'M-3.5 5 H3.5', frown: 'M-4 6.5 Q0 3 4 6.5', wavy: 'M-4.5 5 q2.2 -2 4.5 0 t4.5 0',
  };
  const face = (mood = 'smile', look = 0, hair = 'f-stool') => {
    const m = mood === 'o' ? `<ellipse cx="0" cy="5" rx="2.2" ry="2.6" fill="var(--art-line)"/>` : ln(MOUTH[mood], 1.3);
    return `<path class="${hair}" d="M-10 -1 C-11 -10 -4 -12 0 -12 C6 -12 11 -9 10 -1 C7 -6 -6 -7 -10 -1 Z"/>` +
      `<circle class="f-skin" cx="0" cy="0" r="10"/><path class="${hair}" d="M-10 -2 C-10 -10 -4 -12 0 -12 C6 -12 10 -9 10 -2 C6 -7 -5 -7 -10 -2 Z"/>` +
      `<circle cx="${-3.6 + look}" cy="0" r="1.5" fill="var(--art-line)"/><circle cx="${3.6 + look}" cy="0" r="1.5" fill="var(--art-line)"/>${m}`;
  };
  const head = (x, y, s = 1, mood, look, hair) => G(x, y, s, face(mood, look, hair));
  // person: head at (x, y), body down to y + 42 * s
  const person = (x, y, s = 1, shirt = 'f-immune', mood = 'smile', look = 0, hair = 'f-stool') => G(x, y, s,
    `<path class="${shirt}" d="M-15 42 C-15 22 -9 14 0 14 C9 14 15 22 15 42 Z"/>` + face(mood, look, hair));

  // speech bubble with a tail pointing to (tx, ty)
  const say = (x, y, w, h, tx, ty, cls = 'f-white') => {
    const bx = Math.max(x + 10, Math.min(x + w - 16, tx - 4));
    return `<path class="${cls}" d="M${x + 8} ${y} H${x + w - 8} Q${x + w} ${y} ${x + w} ${y + 8} V${y + h - 8} Q${x + w} ${y + h} ${x + w - 8} ${y + h} H${bx + 10} L${tx} ${ty} L${bx} ${y + h} H${x + 8} Q${x} ${y + h} ${x} ${y + h - 8} V${y + 8} Q${x} ${y} ${x + 8} ${y} Z"/>`;
  };
  // thought cloud centered at (cx, cy) with little puffs down to (tx, ty)
  const cloud = (cx, cy, rx, ry, tx, ty) => {
    let s = '';
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * 2 * Math.PI;
      s += `<circle class="f-white" cx="${(cx + rx * 0.78 * Math.cos(a)).toFixed(1)}" cy="${(cy + ry * 0.7 * Math.sin(a)).toFixed(1)}" r="${(ry * 0.5).toFixed(1)}"/>`;
    }
    s += `<ellipse class="f-white noline" cx="${cx}" cy="${cy}" rx="${rx * 0.86}" ry="${ry * 0.8}"/>`;
    const mx = (cx + tx) / 2, my = (cy + ry * 0.8 + ty) / 2;
    return s + `<circle class="f-white" cx="${mx}" cy="${my}" r="3"/><circle class="f-white" cx="${(mx + tx) / 2}" cy="${(my + ty) / 2}" r="2"/>`;
  };
  const W = (x, y, t, s = 10, a = 'middle') => T(x, y, t, { c: 'tagtx', s, a });

  // little icons, centered on (x, y)
  const pin = (x, y) => G(x, y, 1, `<path class="f-bad" d="M0 10 C-4 4 -8 0 -8 -4 A8 8 0 0 1 8 -4 C8 0 4 4 0 10 Z"/><circle class="f-white" cx="0" cy="-4" r="3"/>`);
  const cal = (x, y, txt = '') => G(x, y, 1, `<rect class="f-white" x="-11" y="-10" width="22" height="20" rx="3"/><rect class="f-bad" x="-11" y="-10" width="22" height="6" rx="2"/>` +
    (txt ? '' : [-6, 0, 6].map(a => [0, 5].map(b => `<rect x="${a - 1.6}" y="${b - 1}" width="3.2" height="3" fill="var(--art-line)" opacity=".5"/>`).join('')).join(''))) + (txt ? W(x, y + 7, txt, 9) : '');
  const cake = (x, y) => G(x, y, 1, `<rect class="f-mouth" x="-10" y="-2" width="20" height="11" rx="2"/><path class="f-white" d="M-10 1 q2.5 3 5 0 t5 0 t5 0 t5 0 V-2 H-10 Z"/>` +
    `<rect class="f-pancreas" x="-1" y="-9" width="2" height="7"/><g class="a-blink"><ellipse class="f-warn" cx="0" cy="-11" rx="1.8" ry="2.6"/></g>`);
  const house = (x, y) => G(x, y, 1, `<rect class="f-pancreas" x="-9" y="-2" width="18" height="12"/><path class="f-bad" d="M-12 -1 L0 -11 L12 -1 Z"/><rect class="f-food" x="-2.5" y="3" width="5" height="7"/>`);
  const star = (x, y, r = 9) => {
    let d = '';
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1); }
    return `<path class="f-pancreas" d="${d}Z"/>`;
  };
  const ball = (x, y, r = 8) => `<circle class="f-immune" cx="${x}" cy="${y}" r="${r}"/>${ln(`M${x - r} ${y} Q${x} ${y - r * 0.6} ${x + r} ${y} M${x} ${y - r} Q${x - r * 0.5} ${y} ${x} ${y + r}`, 1.1)}`;
  const chair = (x, y) => G(x, y, 1, `<path class="f-food" d="M-7 -10 H-3 V0 H7 V4 H-7 Z"/><path class="s-line" d="M-6 4 V10 M6 4 V10" style="stroke-width:2.2"/>`);
  const swatch = (x, y) => G(x, y, 1, `<path class="f-germ" d="M-8 -3 C-8 -9 2 -10 6 -6 C10 -2 8 6 2 7 C-4 8 -8 3 -8 -3 Z"/>`);
  const clockIcon = (x, y, r, hands = true) => `<circle class="f-white" cx="${x}" cy="${y}" r="${r}"/>` +
    [0, 3, 6, 9].map(i => { const a = i * Math.PI / 6; return ln(`M${(x + r * 0.78 * Math.sin(a)).toFixed(1)} ${(y - r * 0.78 * Math.cos(a)).toFixed(1)} L${(x + r * 0.92 * Math.sin(a)).toFixed(1)} ${(y - r * 0.92 * Math.cos(a)).toFixed(1)}`, 1.4); }).join('') +
    (hands ? ln(`M${x} ${y} L${x} ${y - r * 0.7} M${x} ${y} L${x + r * 0.45} ${y + r * 0.1}`, 2) : '') + `<circle cx="${x}" cy="${y}" r="1.8" fill="var(--art-line)"/>`;
  const ivbag = (x, y) => G(x, y, 1, `<path class="f-white" d="M-9 -14 H9 V8 Q9 14 3 14 H-3 Q-9 14 -9 8 Z"/><rect class="f-water noline" x="-7" y="-2" width="14" height="13" rx="2" opacity=".8"/>${ln('M0 14 V20', 1.5)}`);
  const bug = (x, y, k = 1) => G(x, y, k, ln('M-6 -4 L6 4 M-6 4 L6 -4 M-7 0 H7', 1.2) + `<ellipse class="f-germ" cx="0" cy="0" rx="5" ry="3.6"/><circle class="f-germ" cx="5.5" cy="0" r="2.2"/>`);
  const check = (x, y, d = 0) => A('a-pop', `<circle class="f-good" cx="${x}" cy="${y}" r="8"/>${ln(`M${x - 4} ${y} l3 3 l5 -6`, 2.2, 's-white')}`, d);
  const cross = (x, y, d = 0) => A('a-pop', `<circle class="f-bad" cx="${x}" cy="${y}" r="8"/>${ln(`M${x - 3.5} ${y - 3.5} l7 7 M${x + 3.5} ${y - 3.5} l-7 7`, 2.2, 's-white')}`, d);
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1, cls = 'f-mouth') => G(x, y, s, `<path class="${cls}" d="${BRAIN}" style="stroke-width:${(1.5 / s).toFixed(2)}"/>` +
    `<path class="s-line" d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" style="stroke-width:${(1.2 / s).toFixed(2)};opacity:.6"/>`);
  const bed = (x, y, w) => `<rect class="f-white" x="${x}" y="${y}" width="${w}" height="12" rx="4"/>${ln(`M${x + 2} ${y - 18} V${y + 24} M${x + w - 2} ${y - 4} V${y + 24}`, 3)}`;
  const bottle = (x, y, s = 1) => G(x, y, s, `<rect class="f-warn" x="-10" y="-14" width="20" height="28" rx="3"/><rect class="f-white" x="-11" y="-20" width="22" height="7" rx="2"/><rect class="f-white" x="-7" y="-6" width="14" height="12" rx="1.5"/>`);
  const clip = (x, y, w, h) => `<rect class="f-food" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="f-white" x="${x + 7}" y="${y + 10}" width="${w - 14}" height="${h - 16}" rx="3"/><rect class="f-scar" x="${x + w / 2 - 14}" y="${y - 4}" width="28" height="10" rx="3"/>`;
  // spotlight beam from (x, y) out to the right, ending at x2 with half-height hh
  const beam = (x, y, x2, hh, cls = '') => `<g class="${cls}"><path class="f-pancreas noline" d="M${x} ${y} L${x2} ${y - hh} Q${x2 + 8} ${y} ${x2} ${y + hh} Z" opacity=".55"/></g>`;
  // mnemonic letter tile
  const LETTER = (x, y, w, h, cls, letter, d, size = 30) =>
    `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>` +
    `<g class="ans">${A('a-pop', T(x + w / 2, y + h / 2 + size * 0.36, letter, { c: 'on', s: size, w: 800 }), d)}</g>` + q(x + w / 2, y + h / 2, 10);

  Object.assign(PICS, {

    /* 1. Screening questions: orientation, 3-word memory, general and personal facts */
    screen: ART(`
      ${T(150, 16, 'Bedside cognitive screen', { s: 12 })}
      <rect class="f-lymph" x="6" y="26" width="92" height="122" rx="12"/>
      <rect class="f-fat" x="104" y="26" width="92" height="122" rx="12"/>
      <rect class="f-bone" x="202" y="26" width="92" height="122" rx="12"/>
      ${A('a-pop', head(26, 52, 1), 0)}${tag(68, 52, 'Name', '', 9.5)}
      ${A('a-pop', pin(26, 84), 1)}${tag(68, 84, 'Place', '', 9.5)}
      ${A('a-pop', cal(26, 116), 2)}${tag(68, 116, 'Date', '', 9.5)}
      ${A('a-pop', ball(124, 52), 3)}${tag(164, 52, 'ball', '', 9.5)}
      ${A('a-pop', chair(124, 84), 4)}${tag(164, 84, 'chair', '', 9.5)}
      ${A('a-pop', swatch(124, 116), 5)}${tag(164, 116, 'purple', '', 9.5)}
      ${A('a-pop', star(220, 52), 6)}${tag(262, 52, 'Presidents', '', 9)}
      ${A('a-pop', house(220, 84), 7)}${tag(262, 84, 'Address', '', 9)}
      ${A('a-pop', cake(220, 118), 8)}${tag(262, 116, 'Birthdays', '', 9)}
      ${qtag(52, 163, 'Orientation')}
      ${qtag(150, 163, 'Memory: 3 words', 9.5)}
      ${qtag(248, 163, 'General info')}
    `),

    /* 2. Three-word recall: say three words, wait a couple of minutes, ask for them back */
    threeWords: ART(`
      ${person(30, 70, 1, 'f-good', 'smile', 1)}
      ${say(54, 18, 118, 56, 42, 66)}
      ${ball(78, 38)}${chair(115, 38)}${swatch(150, 38)}
      ${W(113, 64, 'ball · chair · purple', 9.5)}
      ${dash('M150 80 Q150 92 150 98')}
      ${clockIcon(150, 122, 20, false)}
      <g class="q">${ln('M150 122 L150 108', 2)}</g>
      ${ln('M150 122 L160 124', 2)}
      <g class="ansmotion">${spinAt(150, 122, 2, ln('M150 122 L150 107', 2))}</g>
      ${tag(150, 156, 'wait ~2 min', '', 9.5)}
      ${dash('M174 116 Q200 104 224 104')}
      ${person(262, 86, 1, 'f-germ', 'smile', -1, 'f-scar')}
      ${cloud(250, 38, 40, 22, 258, 72)}
      <g class="ans">${A('a-pop', ball(228, 38, 7), 1)}${A('a-pop', chair(250, 40), 3)}${A('a-pop', swatch(274, 38), 5)}</g>
      ${q(250, 38)}
      ${qtag(240, 163, 'Recall all 3 later', 9.5)}
    `),

    /* 3. DSM-5 names: major NCD = dementia, mild NCD = milder dementia */
    ncd: ART(`
      ${tag(76, 20, 'Dementia')}
      ${tag(226, 20, 'Milder dementia')}
      ${brain(26, 44, 2)}
      ${brain(176, 44, 2)}
      <g class="ans">
        ${[[50, 62], [72, 54], [96, 62], [58, 86], [84, 80], [106, 90], [70, 102]].map(([x, y], i) => A('a-pop', `<circle class="f-scar" cx="${x}" cy="${y}" r="7"/>`, i)).join('')}
        ${A('a-pop', `<circle class="f-scar" cx="234" cy="70" r="6"/>`, 2)}
        ${[[46, 0], [78, 2], [110, 4]].map(([x, d]) => A('a-rise', `<rect class="f-mouth" x="${x}" y="36" width="9" height="9" rx="2"/>`, d)).join('')}
        ${A('a-rise', `<rect class="f-mouth" x="246" y="38" width="8" height="8" rx="2"/>`, 3)}
      </g>
      ${qtag(76, 134, 'Major neurocognitive', 9.5)}${tag(76, 152, 'disorder', 'ans', 9.5)}
      ${qtag(226, 134, 'Mild neurocognitive', 9.5)}${tag(226, 152, 'disorder', 'ans', 9.5)}
      ${tag(150, 171, 'Delirium keeps its name', 'ans', 9.5)}
    `),

    /* 4. Delirium: attention flickers, so everything suffers. Dementia: attention steady, memory suffers */
    attn: ART(`
      <path class="s-ink" d="M150 30 V170" style="stroke-width:1;stroke-dasharray:3 4"/>
      ${tag(76, 16, 'Delirium')}${tag(224, 16, 'Dementia')}
      ${head(26, 62, 1.5, 'wavy', 2)}
      ${head(174, 62, 1.5, 'smile', 2)}
      <g class="ans">
        <g class="a-blink">${beam(42, 62, 136, 24)}</g>
        ${beam(190, 62, 284, 24)}
        ${A('a-bob', `<circle class="f-warn" cx="100" cy="52" r="3"/><circle class="f-warn" cx="118" cy="74" r="3"/><circle class="f-warn" cx="84" cy="70" r="2.5"/>`)}
        <circle class="f-good" cx="252" cy="62" r="4"/>
      </g>
      ${[['Memory', 8], ['Words', 55], ['Logic', 102]].map(([t, x]) => `<rect class="f-immune" x="${x}" y="98" width="44" height="24" rx="6"/>${T(x + 22, 114, t, { c: 'on', s: 9.5 })}`).join('')}
      ${[['Memory', 156], ['Words', 203], ['Logic', 250]].map(([t, x]) => `<rect class="f-immune" x="${x}" y="98" width="44" height="24" rx="6"/>${T(x + 22, 114, t, { c: 'on', s: 9.5 })}`).join('')}
      <g class="ans">
        ${A('a-blink', [8, 55, 102].map(x => `<rect class="f-scar" x="${x}" y="98" width="44" height="24" rx="6" opacity=".8"/>`).join(''))}
        ${A('a-blink', `<rect class="f-scar" x="156" y="98" width="44" height="24" rx="6" opacity=".8"/>`, 2)}
      </g>
      ${qtag(76, 144, 'Attention impaired')}
      ${qtag(224, 144, 'Attention intact')}
      ${tag(76, 165, 'so everything is off', 'ans', 9)}
      ${tag(224, 165, 'memory is what fails', 'ans', 9)}
    `),

    /* 5. Medical FRAT mnemonic */
    frat: ART(`
      ${T(150, 17, 'Delirium mnemonic', { s: 12 })}
      ${['M', 'F', 'R', 'A', 'T'].map((l, i) => LETTER(6 + i * 58, 28, 56, 58, ['f-bad', 'f-warn', 'f-nerve', 'f-good', 'f-immune'][i], l, i)).join('')}
      <g class="ans">
        ${[['Medical', 'cause'], ['Fluctuates', 'in a day'], ['Recent', 'onset'], ['Attention', 'impaired'], ['Thinking', 'impaired']].map(([a, b], i) =>
          A('a-fadein', T(34 + i * 58, 104, a, { s: 9.5 }) + T(34 + i * 58, 117, b, { s: 9.5, w: 400 }), i + 1)).join('')}
      </g>
      ${qtag(150, 146, 'Medical FRAT', 13)}
      ${tag(150, 170, 'Medical + F R A T', 'ans', 9.5)}
    `),

    /* 6. DSM-5 delirium: attention drops over hours to days, then swings up and down; medical cause */
    delCrit: ART(`
      ${ln('M28 30 V132 H290', 1.6, 's-ink')}
      ${T(32, 24, 'Attention', { s: 9.5, a: 'start' })}
      ${T(270, 146, 'time', { s: 9.5 })}
      ${ivbag(60, 92)}
      <g class="ans">
        <path class="s-bad" d="M30 48 H92 C102 48 106 110 116 112 C128 114 132 84 146 86 C160 88 164 120 178 120 C192 120 196 80 210 82 C224 84 228 118 242 118 C256 118 262 90 284 92"/>
        <g class="ansmotion"><circle class="f-warn" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M30 48 H92 C102 48 106 110 116 112 C128 114 132 84 146 86 C160 88 164 120 178 120 C192 120 196 80 210 82 C224 84 228 118 242 118 C256 118 262 90 284 92"/></circle></g>
      </g>
      ${qtag(134, 24, 'Hours to days')}
      ${qtag(60, 124, 'Medical cause', 9.5)}
      ${qtag(196, 154, 'Fluctuates all day')}
      ${tag(222, 46, 'Awareness + attention drop', 'ans', 9)}
      ${tag(196, 66, 'cognition or perception change', 'ans', 9)}
    `),

    /* 7. Testing attention: skip serial sevens, judge how routine questions are answered */
    noSerial: ART(`
      <rect class="f-white" x="8" y="26" width="118" height="76" rx="10"/>
      ${W(67, 46, '100 − 7 = 93', 12)}${W(67, 66, '93 − 7 = 86', 12)}${W(67, 86, '86 − 7 = …', 12)}
      <g class="ans">${A('a-pop', ln('M18 34 L116 94 M116 34 L18 94', 4, 's-bad'))}</g>
      ${qtag(67, 118, 'Skip serial 7s')}
      ${say(138, 6, 72, 28, 166, 46, 'f-lymph')}${W(174, 24, 'Breakfast?', 10)}
      ${say(216, 6, 78, 28, 252, 46)}
      <g class="ans">${A('a-draw', `<path class="s-germ" d="M224 20 q8 -8 14 0 t12 2 q10 6 8 -6 q-2 -8 12 -4 t14 8" style="stroke-width:2"/>`)}</g>
      ${person(170, 64, 0.9, 'f-good', 'smile', 1)}
      ${person(256, 64, 0.9, 'f-germ', 'wavy', 2)}
      ${qtag(214, 128, 'Judge routine answers')}
      ${tag(150, 158, 'Can they stay on one question?', 'ans', 9.5)}
    `),

    /* 8. Loud vs quiet delirium */
    loudQuiet: ART(`
      <path class="s-ink" d="M150 10 V170" style="stroke-width:1;stroke-dasharray:3 4"/>
      ${ivbag(124, 34)}${ln('M124 54 V128', 2.4)}
      <g class="ans">${A('a-shake', `${ln('M30 76 L18 56 M78 76 L90 56', 4, 's-muscle')}${person(54, 66, 1, 'f-bad', 'o')}`)}
        ${say(76, 8, 46, 26, 66, 52, 'f-nerve')}${W(99, 26, '#@!?', 11)}
        ${ln('M124 54 Q110 70 92 70', 1.4, 's-water')}${A('a-drop', `<circle class="f-water" cx="94" cy="78" r="2.5"/>`)}
      </g>
      <g class="q">${person(54, 66, 1, 'f-bad', 'flat')}</g>
      ${bed(168, 100, 120)}
      ${head(190, 90, 1, 'flat', 2)}
      <rect class="f-water" x="200" y="86" width="84" height="16" rx="6"/>
      <g class="ans">
        ${A('a-blink', `${say(200, 50, 40, 22, 194, 76)}${W(220, 65, 'mm…', 9.5)}`)}
        ${A('a-bob', `<circle cx="262" cy="56" r="12" fill="none" stroke="var(--art-line)" style="stroke-width:3"/><circle class="f-water noline" cx="262" cy="56" r="10" opacity=".4"/>${ln('M270 65 L280 76', 4)}`)}
      </g>
      ${qtag(75, 148, 'Loud: agitated')}
      ${qtag(225, 148, 'Quiet: easy to miss')}
      ${tag(75, 168, 'rambles, pulls out lines', 'ans', 9)}
      ${tag(225, 168, 'needs probing', 'ans', 9)}
    `),

    /* 9. Spotting quiet delirium: walk in silently and watch */
    observe: ART(`
      <rect class="f-food" x="8" y="22" width="52" height="108" rx="3"/><rect class="f-bone" x="14" y="28" width="40" height="102"/>
      ${person(34, 70, 0.95, 'f-good', 'flat', 2)}
      ${say(58, 26, 40, 22, 46, 58)}${W(78, 41, '. . .', 11)}
      ${bed(140, 112, 150)}
      <rect class="f-water" x="176" y="100" width="108" height="16" rx="6"/>
      ${head(188, 84, 1.3, 'wavy', 3)}
      <g class="ans">
        ${A('a-blink', `${say(208, 104 - 40, 34, 18, 198, 92)}${W(225, 76, 'mm…', 9)}`)}
        <g class="ansmotion">${G(0, 0, 1, `${bug(0, 0, 1.5)}<animateMotion dur="4s" repeatCount="indefinite" path="M246 34 C270 24 286 46 270 56 C254 66 230 52 246 34 Z"/>`)}</g>
      </g>
      ${qtag(74, 148, 'Say nothing, just watch', 9.5)}
      ${qtag(222, 148, 'Tracks an unseen bug', 9.5)}
      ${tag(74, 168, 'normal: looks, says hi', 'ans', 9)}
      ${tag(222, 168, 'or glances away, mutters', 'ans', 9)}
    `),

    /* 10. Incoherent: psychosis vs dementia vs delirium */
    vignettes: ART(`
      ${[52, 150, 248].map((x, i) => `${cloud(x, 34, 40, 22, x, 66)}${person(x, 82, 0.85, ['f-warn', 'f-immune', 'f-germ'][i], ['frown', 'smile', 'wavy'][i], 1)}`).join('')}
      ${A('a-blink', `<ellipse class="f-white" cx="52" cy="34" rx="15" ry="9"/><circle class="f-vein" cx="52" cy="34" r="5.5"/><circle cx="52" cy="34" r="2.2" fill="var(--art-line)"/>`)}
      ${house(150, 36)}
      ${[[230, 30, 0], [246, 44, 1], [262, 28, 2], [270, 42, 3], [238, 40, 4]].map(([x, y, d]) => A('a-rise', `<rect class="f-germ" x="${x - 4}" y="${y - 3}" width="8" height="6" rx="2"/>`, d * 1.4)).join('')}
      <g class="ans">
        ${tag(52, 132, 'focus OK', '', 9)}${tag(150, 132, 'focus OK', '', 9)}${tag(248, 132, 'focus lost', '', 9)}
        ${check(88, 132, 1)}${check(186, 132, 2)}${cross(284, 132, 3)}
      </g>
      ${qtag(52, 156, 'Psychosis')}
      ${qtag(150, 156, 'Dementia')}
      ${qtag(248, 156, 'Delirium')}
      ${T(52, 176, 'fixed delusion', { s: 9, w: 400 })}${T(150, 176, 'hospital = home', { s: 9, w: 400 })}${T(248, 176, "can't hold a thought", { s: 9, w: 400 })}
    `),

    /* 11. Delirium tremens example: stopped alprazolam suddenly, could not hold one thought */
    dts: ART(`
      ${bottle(44, 64, 1.6)}
      <circle cx="44" cy="64" r="34" fill="none" stroke="var(--c-bad)" style="stroke-width:3.5"/>${ln('M20 40 L68 88', 3.5, 's-bad')}
      ${tag(56, 112, 'stopped suddenly', '', 9.5)}
      ${tag(56, 130, 'alprazolam (Xanax)', 'ans', 9)}
      <rect class="f-white" x="94" y="48" width="40" height="32" rx="4"/><rect class="f-bad" x="94" y="48" width="40" height="9" rx="3"/>${W(114, 73, '3 days', 10)}
      ${dash('M138 64 L168 64')}
      ${person(200, 66, 1.3, 'f-germ', 'wavy', 1)}
      <g class="ans">
        ${[0, 1, 2].map(i => A('a-rise', `<rect class="${['f-bad', 'f-warn', 'f-good'][i]}" x="${222 + i * 22}" y="${22 + i * 4}" width="18" height="12" rx="3"/><circle class="f-scar" cx="${226 + i * 22}" cy="${36 + i * 4}" r="2.5"/><circle class="f-scar" cx="${236 + i * 22}" cy="${36 + i * 4}" r="2.5"/>`, i * 2)).join('')}
      </g>
      ${q(250, 32)}
      ${qtag(200, 140, 'Benzo withdrawal')}
      ${tag(200, 162, "train of thought won't hold", 'ans', 9.5)}
    `),

    /* 12. Delirium and 3-object recall: the words never get registered */
    recall: ART(`
      ${tag(40, 46, 'ball', '', 10)}${tag(40, 80, 'chair', '', 10)}${tag(40, 114, 'purple', '', 10)}
      ${person(220, 66, 1.9, 'f-germ', 'wavy', -2)}
      <g class="ans">
        ${spinAt(220, 22, 3, `<path class="s-germ" d="M220 22 m-3 0 a3 3 0 1 1 6 0 a6 6 0 1 1 -12 0 a9 9 0 1 1 18 0" style="stroke-width:2"/>`)}
        <g class="ansmotion">
          ${[[46, 0], [80, 0.6], [114, 1.2]].map(([y, b]) => `<circle class="f-immune" r="5"><animateMotion dur="2.4s" begin="${b}s" repeatCount="indefinite" path="M68 ${y} C120 ${y} 160 ${(y + 66) / 2} 192 ${66} C182 ${74} 172 ${y + 30} 150 ${y + 34}"/><animate attributeName="opacity" values="1;1;0" dur="2.4s" begin="${b}s" repeatCount="indefinite"/></circle>`).join('')}
        </g>
      </g>
      ${qtag(170, 152, 'Usually fails')}
      ${tag(170, 172, 'too inattentive to register the words', 'ans', 9)}
    `),

    /* 13. Hallucinations in delirium: visual or auditory, extremely common */
    halluc: ART(`
      ${bed(80, 112, 150)}
      <rect class="f-water" x="120" y="100" width="104" height="16" rx="6"/>
      ${head(130, 82, 1.5, 'o', -2)}
      <g class="ans">
        ${A('a-bob', `${bug(44, 46, 1.6)}${bug(74, 30, 1.4)}`)}
        ${A('a-blink', ln('M156 72 q6 8 0 16 M164 66 q10 14 0 28 M172 60 q14 20 0 40', 2.2, 's-germ'))}
        ${A('a-blink', ln('M156 72 q6 8 0 16 M164 66 q10 14 0 28', 2.2, 's-germ'), 2)}
      </g>
      ${qtag(58, 72, 'Visual')}
      ${qtag(222, 76, 'Auditory')}
      ${qtag(150, 150, 'Extremely common', 12)}
      ${tag(150, 171, 'in delirium', 'ans', 9.5)}
    `),

    /* 14. Proving recent onset (ask others) and fluctuation (see the patient twice a day) */
    fluct: ART(`
      <path class="s-ink" d="M140 10 V170" style="stroke-width:1;stroke-dasharray:3 4"/>
      ${person(34, 76, 1, 'f-good', 'smile', 2)}
      ${say(52, 14, 84, 38, 40, 62)}
      ${W(94, 30, 'Mom changed', 9.5)}${W(94, 43, 'just last week', 9.5)}
      ${cal(96, 92)}
      <g class="ans">${A('a-pop', `<circle cx="96" cy="97" r="9" fill="none" stroke="var(--c-bad)" style="stroke-width:2.2"/>`, 1)}</g>
      ${qtag(70, 140, 'Ask others: onset', 9.5)}
      <g class="a-spin">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return ln(`M${(180 + 13 * Math.cos(a)).toFixed(1)} ${(32 + 13 * Math.sin(a)).toFixed(1)} L${(180 + 18 * Math.cos(a)).toFixed(1)} ${(32 + 18 * Math.sin(a)).toFixed(1)}`, 2, 's-warn'); }).join('')}</g>
      <circle class="f-nerve" cx="180" cy="32" r="10"/>
      <path class="f-pancreas" d="M268 20 A13 13 0 1 0 280 40 A10 10 0 1 1 268 20 Z"/>
      ${T(180, 64, 'morning', { s: 9.5 })}${T(262, 64, 'evening', { s: 9.5 })}
      ${head(180, 92, 1.4, 'smile', 0)}
      ${head(262, 92, 1.4, 'flat', 0)}
      <g class="ans">${A('a-pop', head(262, 92, 1.4, 'wavy', 3), 2)}${A('a-rise', `<text class="ink" x="284" y="80" style="font-size:12px;font-weight:700">?</text>`, 3)}</g>
      ${qtag(221, 140, 'See them twice a day', 9.5)}
      ${tag(150, 164, 'or ask caregivers how they did', 'ans', 9.5)}
    `),

    /* 15. Best way to diagnose dementia: MSE + family interview */
    family: ART(`
      ${person(34, 90, 1, 'f-germ', 'smile', 1, 'f-scar')}
      ${say(6, 22, 108, 34, 38, 72)}${W(60, 43, 'My memory is fine!', 9.5)}
      ${clip(126, 64, 48, 58)}
      ${[80, 92, 104].map(y => ln(`M140 ${y} H164`, 1.6)).join('')}
      ${A('a-pop', `<circle class="f-warn" cx="194" cy="94" r="9"/>${ln('M189 94 H199 M194 89 V99', 2.4, 's-white')}`, 1)}
      ${person(232, 82, 0.95, 'f-good', 'smile', -1)}
      ${person(270, 90, 0.8, 'f-immune', 'smile', -1)}
      <g class="ans">${A('a-pop', `${say(218, 24, 70, 28, 238, 64, 'f-lymph')}${W(253, 42, "She's slipping", 9)}`, 2)}</g>
      ${qtag(150, 146, 'MSE')}
      ${qtag(244, 146, 'Family interview', 9.5)}
      ${tag(150, 168, 'patients deny or minimize memory loss', 'ans', 9)}
    `),

    /* 16. First family question: now vs 10 years ago (gradual decline) */
    tenYears: ART(`
      <rect class="f-pancreas" x="8" y="22" width="80" height="96" rx="8"/><rect class="f-lymph" x="15" y="29" width="66" height="82" rx="4"/>
      <rect class="f-pancreas" x="212" y="22" width="80" height="96" rx="8"/><rect class="f-lymph" x="219" y="29" width="66" height="82" rx="4"/>
      ${person(48, 60, 1.1, 'f-immune', 'smile', 0, 'f-stool')}
      ${person(252, 60, 1.1, 'f-immune', 'flat', 0, 'f-white')}
      ${T(150, 34, 'vs.', { s: 14 })}
      <g class="ans">
        ${ln('M100 50 H200 M100 50 V110', 1.2, 's-ink')}
        <path class="s-warn a-draw" d="M102 54 C130 58 150 72 170 86 C182 94 192 100 198 104" style="stroke-width:3.5"/>
        ${T(150, 124, 'slow slide', { s: 9.5 })}
      </g>
      ${qtag(48, 136, '10 years ago')}
      ${qtag(252, 136, 'Now')}
      ${tag(150, 162, 'gradual decline = dementia', 'ans', 10)}
    `),

    /* 17. Informant (IQCODE-style) questions */
    iqcode: ART(`
      ${tag(150, 13, 'Ask family: compared with 10 years ago…', '', 9.5)}
      ${[
        ['Recent events', cal(0, 0)],
        ['Where kept', G(0, 0, 1, `<circle class="f-pancreas" cx="-6" cy="0" r="6"/><circle class="f-white" cx="-6" cy="0" r="2"/><path class="f-pancreas" d="M0 -2 H12 V2 H10 V5 H8 V2 H0 Z"/>`)],
        ['Birthdays', cake(0, 2)],
        ['Decisions', G(0, 0, 1, `${ln('M0 -12 V12', 2.4)}<path class="f-warn" d="M-12 -10 H6 L10 -6 L6 -2 H-12 Z"/><path class="f-immune" d="M12 0 H-6 L-10 4 L-6 8 H12 Z"/>`)],
        ['Money', G(0, 0, 1, [6, 2, -2, -6].map(y => `<ellipse class="f-pancreas" cx="0" cy="${y}" rx="10" ry="3.5"/>`).join(''))],
        ['Finding words', G(0, 0, 1, `${say(-12, -10, 24, 16, -4, 10)}<circle cx="-5" cy="-2" r="1.5" fill="var(--art-line)"/><circle cx="0" cy="-2" r="1.5" fill="var(--art-line)"/><circle cx="5" cy="-2" r="1.5" fill="var(--art-line)"/>`)],
        ['Housework', G(0, 0, 1, `${ln('M8 -12 L-2 6', 2.4)}<path class="f-pancreas" d="M-2 4 L-12 12 L4 12 L2 6 Z"/>`)],
        ['Personality', G(0, 0, 1, `<circle class="f-nerve" cx="-4" cy="0" r="9"/><circle class="f-water" cx="6" cy="2" r="9"/>${ln('M-8 1 Q-4 5 0 1', 1.2)}${ln('M2 6 Q6 2 10 6', 1.2)}`)],
      ].map(([t, icon], i) => {
        const x = 6 + (i % 4) * 73, y = 26 + Math.floor(i / 4) * 76;
        return `<rect class="${i % 2 ? 'f-fat' : 'f-lymph'}" x="${x}" y="${y}" width="70" height="70" rx="10"/>` +
          `<g transform="translate(${x + 35} ${y + 26})">${A('a-pop', icon, i)}</g>` + qtag(x + 35, y + 56, t, 9);
      }).join('')}
    `),

    /* 18. Memory LAPSE: the six dementia domains */
    lapse: ART(`
      ${T(150, 16, 'Dementia: 6 domains', { s: 12 })}
      ${[['M', 'Memory', '', 'f-bad'], ['L', 'Language', '', 'f-warn'], ['A', 'Attention', '(complex)', 'f-nerve'],
        ['P', 'Perceptual', 'motor', 'f-good'], ['S', 'Social', 'cognition', 'f-immune'], ['E', 'Executive', 'function', 'f-germ']].map(([l, a, b, c], i) => {
        const x = 6 + (i % 3) * 97, y = 26 + Math.floor(i / 3) * 60;
        return `<rect class="f-white" x="${x}" y="${y}" width="94" height="54" rx="10"/>` + LETTER(x + 3, y + 3, 34, 48, c, l, i, 24) +
          `<g class="ans">${A('a-fadein', W(x + 42, y + (b ? 24 : 31), a, 9.5, 'start') + (b ? W(x + 42, y + 38, b, 9.5, 'start') : ''), i + 1)}</g>`;
      }).join('')}
      ${qtag(150, 152, 'Memory LAPSE', 12)}
      ${tag(150, 170, 'DSM-5: need 1 of 6 impaired', 'ans', 9.5)}
    `),

    /* 19. Memory loss no longer required (DSM-IV required it) */
    memory: ART(`
      ${clip(16, 24, 120, 104)}${clip(164, 24, 120, 104)}
      ${W(76, 50, 'DSM-IV', 12)}${W(224, 50, 'DSM-5', 12)}
      <rect class="f-white" x="30" y="62" width="13" height="13" rx="2"/>${W(50, 73, 'Memory loss', 10.5, 'start')}
      <rect class="f-white" x="178" y="62" width="13" height="13" rx="2"/>${W(198, 73, 'Memory loss', 10.5, 'start')}
      <g class="ans">
        ${A('a-pop', ln('M31 68 l5 5 l9 -11', 3, 's-good'))}
        ${tag(76, 100, 'required', '', 10)}
      </g>
      ${qtag(224, 100, 'Not required')}
      ${tag(150, 150, 'but nearly every patient has it', 'ans', 10.5)}
    `),

    /* 20. Screen for delirium before testing for dementia */
    delFirst: ART(`
      <rect class="f-nerve" x="8" y="40" width="112" height="76" rx="12"/>
      <rect class="f-immune" x="180" y="40" width="112" height="76" rx="12"/>
      ${T(22, 60, '1', { c: 'on', s: 16 })}${T(194, 60, '2', { c: 'on', s: 16 })}
      ${head(40, 86, 1.3, 'smile', 3)}
      <g class="ans">${A('a-blink', beam(54, 86, 108, 18))}</g>
      ${brain(214, 62, 1.2)}
      ${dash('M126 78 L174 78')}
      <g class="ans">${A('a-pop', `<rect class="f-warn" x="136" y="62" width="28" height="22" rx="4"/>${ln('M143 62 V56 a7 7 0 0 1 14 0 V62', 2.6)}`, 2)}</g>
      ${qtag(70, 26, 'Delirium screen first', 10)}
      ${tag(236, 26, 'Dementia testing')}
      ${tag(150, 138, 'If delirious, dementia testing is invalid', 'ans', 9.5)}
    `),

    /* 21. Complex attention: fine in a quiet chat, overwhelmed by many inputs */
    complex: ART(`
      <rect class="f-lymph" x="6" y="22" width="108" height="112" rx="12"/>
      <rect class="f-fat" x="120" y="22" width="174" height="112" rx="12"/>
      ${person(32, 76, 0.85, 'f-good', 'smile', 2)}${person(88, 76, 0.85, 'f-germ', 'smile', -2, 'f-scar')}
      ${say(34, 30, 52, 22, 44, 60)}${W(60, 45, 'chat', 9.5)}
      <g class="ans">${check(60, 120, 1)}</g>
      ${person(214, 82, 0.9, 'f-germ', 'wavy', 0, 'f-scar')}
      <rect class="f-immune" x="132" y="34" width="34" height="24" rx="3"/><rect class="f-water" x="136" y="38" width="26" height="16" rx="2"/>
      ${head(144, 104, 0.8, 'o', 1)}${head(162, 112, 0.7, 'smile', 1, 'f-food')}
      <g class="a-shake"><rect class="f-bad" x="264" y="34" width="16" height="26" rx="3"/><rect class="f-white" x="267" y="38" width="10" height="14" rx="1"/></g>
      <g class="ans">
        ${dash('M168 50 L198 72')}${dash('M174 106 L198 92')}${dash('M262 50 L230 72')}
        ${spinAt(214, 58, 1.6, `<path class="s-germ" d="M214 58 m-2 0 a2 2 0 1 1 4 0 a4.5 4.5 0 1 1 -9 0 a7 7 0 1 1 14 0" style="stroke-width:1.8"/>`)}
      </g>
      ${qtag(60, 148, 'Quiet chat: OK', 10)}
      ${qtag(207, 148, 'Many inputs: struggles', 10)}
      ${tag(207, 168, "can't repeat a phone number", 'ans', 9)}
    `),

    /* 22. Executive function: planning and abstract thinking; clock drawing screens it */
    exec: ART(`
      ${brain(14, 32, 2.4)}
      <g class="ans">${A('a-blink', `<ellipse class="f-pancreas" cx="38" cy="70" rx="22" ry="26" opacity=".85"/>`)}</g>
      ${tag(70, 130, 'front of the brain', 'ans', 9.5)}
      <rect class="f-white" x="150" y="22" width="140" height="70" rx="10"/>
      ${['Plan the steps', 'Think abstractly', 'Do the job'].map((t, i) => `<rect class="f-white" x="160" y="${32 + i * 19}" width="11" height="11" rx="2"/>${W(178, 41 + i * 19, t, 9.5, 'start')}`).join('')}
      <g class="ans">${[0, 1, 2].map(i => A('a-pop', (i === 2 ? ln(`M161 ${33 + i * 19} l9 9 M170 ${33 + i * 19} l-9 9`, 2.6, 's-bad') : ln(`M161 ${37 + i * 19} l3.5 4 l7 -9`, 2.6, 's-good')), i)).join('')}</g>
      ${qtag(220, 104, 'Planning, abstract thinking', 9)}
      ${clockIcon(176, 146, 18)}
      ${qtag(240, 146, 'Clock drawing', 10)}
    `),

    /* 23. Clock drawing: normal vs bunched numbers, hands at 2:30 */
    clock: ART(`
      ${tag(78, 18, 'Expected')}${tag(222, 18, 'Dementia')}
      <circle class="f-white" cx="78" cy="84" r="50"/><circle class="f-white" cx="222" cy="84" r="50"/>
      <circle cx="78" cy="84" r="2.5" fill="var(--art-line)"/><circle cx="222" cy="84" r="2.5" fill="var(--art-line)"/>
      <g class="ans">
        ${Array.from({ length: 12 }, (_, i) => { const a = (i + 1) * Math.PI / 6; return A('a-pop', W((78 + 40 * Math.sin(a)).toFixed(1), (84 - 40 * Math.cos(a) + 3.6).toFixed(1), String(i + 1), 10), i * 0.4); }).join('')}
        ${A('a-fadein', ln(`M78 84 L${(78 + 24 * Math.sin(75 * Math.PI / 180)).toFixed(1)} ${(84 - 24 * Math.cos(75 * Math.PI / 180)).toFixed(1)}`, 3.2, 's-bad') + ln('M78 84 L78 122', 2.2, 's-vein'), 6)}
        ${Array.from({ length: 12 }, (_, i) => { const a = (8 + i * 14) * Math.PI / 180; return A('a-pop', W((222 + 38 * Math.sin(a)).toFixed(1), (84 - 38 * Math.cos(a) + 3.6).toFixed(1), String(i + 1), 10), i * 0.4); }).join('')}
        ${A('a-fadein', ln('M222 84 L241 74', 3.2, 's-bad') + ln('M222 84 L248 84', 2.2, 's-vein'), 6)}
      </g>
      ${q(78, 84, 11)}${q(222, 84, 11)}
      ${qtag(150, 156, 'Write numbers, set hands to 2:30', 9.5)}
      ${tag(150, 174, 'needs some high school education', 'ans', 9)}
    `),

    /* 24. Language: word-finding trouble (tip of the tongue) */
    aphasia: ART(`
      ${person(46, 90, 1.2, 'f-immune', 'o', 2, 'f-scar')}
      ${cloud(44, 32, 36, 22, 44, 70)}
      <g class="ans">${A('a-blink', G(44, 32, 1, `<path class="f-warn" d="M-9 -8 H9 L7 9 H-7 Z"/><path class="s-line" d="M9 -4 q7 0 6 6 q-1 4 -7 4" style="stroke-width:2"/>`))}</g>
      ${q(44, 32)}
      ${say(80, 46, 104, 32, 66, 90)}
      ${W(132, 66, 'Pass me the… um…', 10)}
      <g class="ans">${A('a-blink', tag(160, 96, 'c _ _ ?', '', 10), 2)}</g>
      <rect class="f-lymph" x="198" y="24" width="94" height="86" rx="10"/>
      <path class="f-warn" d="M210 52 H228 L226 70 H212 Z"/>${ln('M244 74 L266 48', 4, 's-vein')}
      <circle class="f-white" cx="276" cy="64" r="9"/>${ln('M276 64 V58 M276 64 L280 66', 1.4)}
      ${tag(245, 94, 'name these', '', 9.5)}
      ${qtag(96, 152, 'Word-finding trouble')}
      ${tag(232, 132, 'naming: only severe cases', 'ans', 9)}
      ${tag(232, 152, 'family notices early', 'ans', 9)}
    `),

    /* 25. Perceptual-motor (apraxia): everyday tasks break down */
    apraxia: ART(`
      <rect class="f-lymph" x="6" y="22" width="92" height="108" rx="12"/>
      <rect class="f-fat" x="104" y="22" width="92" height="108" rx="12"/>
      <rect class="f-bone" x="202" y="22" width="92" height="108" rx="12"/>
      <path class="f-immune" d="M30 40 L44 34 Q52 42 60 34 L74 40 L84 58 L74 62 L72 108 H32 L30 62 L20 58 Z"/>
      ${ln('M52 44 V108', 1.2)}
      <g class="ans">${A('a-shake', [52, 64, 76, 88, 100].map((y, i) => `<circle class="f-white" cx="${i % 2 ? 46 : 58}" cy="${y}" r="2.6"/>`).join(''))}</g>
      <path class="f-bad" d="M118 92 C118 76 132 70 142 70 L150 70 C154 80 170 82 184 88 C190 92 188 104 180 104 H122 Q118 104 118 92 Z"/>
      <rect class="f-white" x="118" y="100" width="70" height="6" rx="3"/>
      <g class="ans">${A('a-sway', ln('M146 78 q-10 -14 -2 -24 M152 78 q12 -10 6 -26', 2, 's-food'))}</g>
      <g class="ans">${A('a-shake', `<path class="f-food" d="M218 92 Q248 80 278 92 V98 H218 Z"/><rect class="f-good" x="214" y="80" width="64" height="7" rx="3"/><rect class="f-bad" x="226" y="70" width="60" height="7" rx="3"/>`)}</g>
      <path class="f-food" d="M218 104 H278 V110 Q248 118 218 110 Z"/>
      <g class="q"><path class="f-food" d="M218 92 Q248 80 278 92 V98 H218 Z"/></g>
      ${qtag(52, 118, 'Dressing', 9.5)}${qtag(150, 118, 'Shoelaces', 9.5)}${qtag(248, 118, 'Sandwich', 9.5)}
      ${tag(150, 152, 'strength intact, everyday tasks fail', 'ans', 9.5)}
      ${tag(150, 172, 'ask family or watch a task', 'ans', 9)}
    `),

    /* 26. MMSE three-step command */
    threeStep: ART(`
      ${tag(150, 14, 'MMSE 3-step command', '', 10.5)}
      ${[6, 104, 202].map((x, i) => `<rect class="${['f-lymph', 'f-fat', 'f-bone'][i]}" x="${x}" y="26" width="92" height="96" rx="12"/>${T(x + 12, 44, String(i + 1), { c: 'tagtx', s: 13 })}`).join('')}
      ${A('a-bob', `<rect class="f-white" x="36" y="40" width="32" height="40" rx="2"/><path class="f-skin" d="M58 66 Q70 62 76 72 L80 96 H58 Q52 84 50 76 Q50 70 58 66 Z"/>`)}
      ${tag(70, 106, 'R', '', 9.5)}
      <rect class="f-white" x="134" y="40" width="32" height="20" rx="2"/>
      <g class="ans">${A('a-squeeze', `<rect class="f-white" x="134" y="60" width="32" height="20" rx="2"/>`)}</g>
      <g class="q"><rect class="f-white" x="134" y="60" width="32" height="20" rx="2"/></g>
      ${ln('M134 60 H166', 1.2, 's-ink', ';stroke-dasharray:3 3')}
      ${ln('M212 108 H286', 3)}
      <g class="ans">${A('a-drop', `<rect class="f-white" x="234" y="88" width="32" height="12" rx="2"/>`)}</g>
      ${dash('M100 74 L106 74')}${dash('M198 74 L204 74')}
      ${qtag(52, 138, 'Right hand', 10)}${qtag(150, 138, 'Fold in half', 10)}${qtag(248, 138, 'On the floor', 10)}
      ${tag(150, 164, 'Tests apraxia', 'ans', 11)}
    `),

    /* 27. Social cognition: personality change, misreading social cues */
    social: ART(`
      <g class="ans">${A('a-sway', person(56, 84, 1, 'f-good', 'frown', -3))}${A('a-sway', person(244, 84, 1, 'f-immune', 'frown', 3, 'f-food'), 2)}
        ${A('a-drop', `<path class="f-water" d="M70 70 C72 74 74 76 72 78 A2.5 2.5 0 0 1 68 76 C68 74 69 72 70 70 Z"/>`)}
        ${A('a-drop', `<path class="f-water" d="M230 70 C232 74 234 76 232 78 A2.5 2.5 0 0 1 228 76 C228 74 229 72 230 70 Z"/>`, 2)}
      </g>
      <g class="q">${person(56, 84, 1, 'f-good', 'smile', 3)}${person(244, 84, 1, 'f-immune', 'smile', -3, 'f-food')}</g>
      ${person(150, 80, 1.15, 'f-germ', 'smile', 0, 'f-scar')}
      ${say(88, 10, 124, 34, 150, 62)}
      ${W(150, 31, "Let's talk politics!", 10)}
      ${qtag(150, 146, 'Personality change')}
      ${tag(150, 168, 'misreads social cues, says awkward things', 'ans', 9)}
    `),
  });
})();
