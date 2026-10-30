/* Psychiatric Interview Ch 27 art: assessing psychotic disorders.
   Colorful replacements for PICS, loaded after the page sets PICS. Everything lives inside one
   function so the little helpers below never clash with other art files. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const title = t => T(8, 16, t, { a: 'start', s: 11.5 });
  const ln = (d, w = 1.5, cls = '') => `<path class="${cls}" d="${d}" fill="none" stroke="var(--art-line)" style="stroke-width:${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const st = (d, color, w = 2.5, cls = '') => `<path class="${cls}" d="${d}" fill="none" stroke="${color === 'white' ? '#ffffff' : color === 'ink' ? 'var(--pic-ink)' : `var(--c-${color})`}" style="stroke-width:${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const dot = (x, y, r = 1.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--art-line)"/>`;
  const pop = (d, inner) => `<g class="a-pop" style="--d:${d}">${inner}</g>`;
  // left-aligned label pill starting at x
  const pl = (x, y, t, cls = '', size = 10) => {
    const w = String(t).length * size * 0.56 + 12, h = size + 7;
    return `<g class="${cls}"><rect class="tagbg" x="${x}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}"/>` +
      `<text class="tagtx" x="${x + 6}" y="${y + size * 0.36}" style="font-size:${size}px">${esc(t)}</text></g>`;
  };
  const qpl = (x, y, t, size = 10) => q(x + 9, y) + pl(x, y, t, 'ans', size);

  // a friendly person, feet at (x, y)
  const MOUTH = { smile: 'M-4 -29 Q0 -25.5 4 -29', flat: 'M-3.5 -28 H3.5', sad: 'M-4 -27 Q0 -30 4 -27', worry: 'M-4 -27.5 Q-2 -29.5 0 -27.5 Q2 -25.5 4 -27.5' };
  const person = (x, y, s = 1, o = {}) => G(x, y, s,
    `<path class="${o.shirt || 'f-immune'}" d="M-13 0 V-11 Q-13 -23 0 -23 Q13 -23 13 -11 V0 Z"/>` + (o.body || '') +
    `<circle class="${o.skin || 'f-skin'}" cx="0" cy="-33" r="10"/>` +
    (o.hair ? `<path class="${o.hair}" d="M-10.5 -33 Q-12 -45.5 0 -45 Q12 -45.5 10.5 -33 Q7 -39 0 -38.5 Q-6 -38.5 -10.5 -33 Z"/>` : '') +
    (o.eyes === 'side' ? dot(-1.5, -33.5) + dot(5.5, -33.5) : o.eyes === 'narrow' ? ln('M-6 -33.5 H-2 M2 -33.5 H6', 1.4) : dot(-3.6, -33.5) + dot(3.6, -33.5)) +
    (o.mouth === 'o' ? `<ellipse cx="0" cy="-27.5" rx="2.4" ry="2.8" fill="var(--art-line)"/>` : ln(MOUTH[o.mouth || 'smile'], 1.4)) + (o.extra || ''));
  const doc = (x, y, s = 1, o = {}) => person(x, y, s, Object.assign({ shirt: 'f-white', hair: 'f-stool', extra: ln('M-6 -22 Q-8 -9 0 -7 Q8 -9 6 -22', 1.3) + '<circle class="f-vein" cx="0" cy="-7" r="2.4"/>' }, o));

  // speech bubble with a tail pointing to (tx, ty) below or above it
  const bub = (x, y, w, h, tx, ty, cls = 'f-white') => {
    const up = ty < y, by = up ? y + 1 : y + h - 1, cx = Math.max(x + 8, Math.min(x + w - 18, tx - 4));
    return `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/><path class="${cls} noline" d="M${cx} ${by} L${tx} ${ty} L${cx + 9} ${by} Z"/>` +
      ln(`M${cx} ${by} L${tx} ${ty} L${cx + 9} ${by}`, 1.5);
  };
  // bumpy thought cloud
  const cloud = (cx, cy, rx, ry, cls = 'f-white', n = 9, extra = '') => {
    const p = [];
    for (let i = 0; i < n; i++) { const a = i / n * 2 * Math.PI - Math.PI / 2; p.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
    for (let i = 1; i <= n; i++) {
      const a = p[i - 1], b = p[i % n], r = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.6;
      d += ` A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    }
    return `<path class="${cls}" d="${d} Z" ${extra}/>`;
  };
  const puffs = (x1, y1, x2, y2, cls = 'f-white') => `<circle class="${cls}" cx="${x1}" cy="${y1}" r="2.5"/><circle class="${cls}" cx="${x2}" cy="${y2}" r="4"/>`;

  // icons centered on (x, y)
  const ear = (x, y, s = 1) => G(x, y, s, `<path class="f-skin" d="M2 -13 C-8 -14 -12 -2 -6 5 C-3 9 -5 13 1 13 C6 13 8 7 6 3 C10 -2 11 -12 2 -13 Z"/>` + ln('M-1 -6 C3 -8 6 -4 3 0 C1 2 2 4 0 6', 1.3));
  const eye = (x, y, s = 1) => G(x, y, s, `<path class="f-white" d="M-12 0 Q0 -10 12 0 Q0 10 -12 0 Z"/><circle class="f-vein" r="4.5"/>` + dot(0, 0, 2));
  const nose = (x, y, s = 1) => G(x, y, s, `<path class="f-skin" d="M0 -13 C1 -5 7 2 7 6 C7 10 3 10 0 9 C-3 10 -7 10 -7 6 C-7 2 -1 -5 0 -13 Z"/>` + dot(-3, 7, 1.2) + dot(3, 7, 1.2));
  const hand = (x, y, s = 1) => G(x, y, s, [-6, -2, 2, 6].map((fx, i) => `<rect class="f-skin" x="${fx - 1.8}" y="${-12 + (i === 0 || i === 3 ? 3 : 0)}" width="3.6" height="12" rx="1.8"/>`).join('') +
    `<rect class="f-skin" x="-8.5" y="-3" width="17" height="14" rx="4"/><rect class="f-skin" x="7" y="-1" width="9" height="4" rx="2" transform="rotate(-35 8 1)"/>`);
  const waves = (x, y, cls = 'a-blink') => `<g class="${cls}">${st(`M${x} ${y - 5} Q${x + 4} ${y} ${x} ${y + 5}`, 'spleen', 2)}${st(`M${x + 6} ${y - 9} Q${x + 12} ${y} ${x + 6} ${y + 9}`, 'spleen', 2)}</g>`;
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1, cls = 'f-mouth') => G(x, y, s, `<path class="${cls}" d="${BRAIN}"/>` + ln('M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26', 1.2));
  const tv = (x, y, w = 80, h = 58, screen = '') => `<rect class="f-tumor" x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/><rect class="f-water" x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="4"/>${screen}` +
    ln(`M${x + w * .3} ${y + h} L${x + w * .22} ${y + h + 8} M${x + w * .7} ${y + h} L${x + w * .78} ${y + h + 8}`, 2);
  const bulb = (x, y, s = 1) => G(x, y, s, `<circle class="f-pancreas" cx="0" cy="-4" r="9"/><rect class="f-scar" x="-4.5" y="4" width="9" height="7" rx="2"/>` + ln('M-3 -4 L0 0 L3 -4', 1.2));
  const flag = (x, y) => `<path class="f-bad" d="M${x} ${y - 24} L${x + 16} ${y - 18} L${x} ${y - 12} Z"/>` + ln(`M${x} ${y} V${y - 26}`, 2);
  const mag = (x, y, s = 1) => G(x, y, s, `<path d="M7 7 L16 16" stroke="var(--art-line)" style="stroke-width:4" stroke-linecap="round"/><circle class="f-white" r="9" fill-opacity=".7"/>`);
  const check = (x, y, d = 0) => pop(d, `<circle class="f-good" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3.5} ${y} l2.5 2.6 l4.5 -5" style="stroke-width:2"/>`);
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" style="stroke-width:3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" style="stroke-width:3"/>`;
  const pill = (x, y, rot = -30, c = 'f-warn') => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="${c}" d="M0 -6 H-10 A6 6 0 0 0 -10 6 H0 Z"/><path class="f-white" d="M0 -6 H10 A6 6 0 0 1 10 6 H0 Z"/></g>`;
  const germ = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="s-germ" d="M7 0 q3 -3 6 0 t6 0" style="stroke-width:1.3"/><rect class="f-germ" x="-8" y="-4" width="16" height="8" rx="4"/></g>`;
  // clock hand that spins around (cx, cy): the invisible tail keeps the group's box centered
  const hand2 = (cx, cy, len, dur = 3, w = 2) => `<g class="a-spin" style="animation-duration:${dur}s"><path d="M${cx} ${cy} L${cx} ${cy - len}" stroke="var(--art-line)" style="stroke-width:${w}" stroke-linecap="round"/><path d="M${cx} ${cy} L${cx} ${cy + len}" stroke="none" fill="none"/></g>`;
  const clock = (cx, cy, r, dur = 3) => `<circle class="f-white" cx="${cx}" cy="${cy}" r="${r}"/>` +
    [0, 90, 180, 270].map(a => `<path d="M${cx} ${cy - r + 2} V${cy - r + 5}" stroke="var(--art-line)" style="stroke-width:1.5" transform="rotate(${a} ${cx} ${cy})"/>`).join('') +
    hand2(cx, cy, r * .6, dur * 8, 2.2) + hand2(cx, cy, r * .8, dur, 1.6) + dot(cx, cy, 1.8);
  // something moving along a path (back only). Draw it at (ox, oy); the path is shifted back so text boxes stay on-frame.
  const shift = (d, ox, oy) => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - ox} ${+b - oy}`);
  const mover = (inner, path, dur, begin = 0, ox = 0, oy = 0, extra = '') => `<g class="ansmotion"><g>${inner}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path, ox, oy)}" ${extra}/></g></g>`;
  // a needle that swings between two angles around (cx, cy) on the back
  const needle = (cx, cy, len, vals, dur = 4) => `<g class="ansmotion"><g><path d="M${cx} ${cy} L${cx} ${cy - len}" stroke="var(--art-line)" style="stroke-width:3" stroke-linecap="round"/>` +
    `<animateTransform attributeName="transform" type="rotate" values="${vals.map(v => `${v} ${cx} ${cy}`).join(';')}" dur="${dur}s" repeatCount="indefinite"/></g></g>` + `<circle class="f-tumor" cx="${cx}" cy="${cy}" r="4"/>`;
  const arcPt = (cx, cy, r, a) => [(cx + r * Math.cos(a * Math.PI / 180)).toFixed(1), (cy + r * Math.sin(a * Math.PI / 180)).toFixed(1)];
  const arc = (cx, cy, r, a1, a2) => { const [x1, y1] = arcPt(cx, cy, r, a1), [x2, y2] = arcPt(cx, cy, r, a2); return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`; };
  const divider = (x = 150, y1 = 26, y2 = 176) => `<path d="M${x} ${y1} V${y2}" stroke="var(--pic-ink)" style="stroke-width:1" stroke-dasharray="3 4" opacity=".4" fill="none"/>`;

  Object.assign(PICS, {

    /* Five screening questions, about 2 minutes */
    screen: ART(`
      ${title('Psychosis screen')}
      ${doc(42, 150, 1.35)}
      ${clock(42, 52, 15, 2)}
      ${tag(42, 170, 'about 2 min', 'ans', 9.5)}
      ${['Dreaming while awake?', 'Strange things you can\'t explain?', 'Hear or see what others can\'t?', 'People bothering or harming you?', 'Do strangers talk about you?']
        .map((t, i) => pop(i, `<circle class="${['f-spleen', 'f-warn', 'f-immune', 'f-bad', 'f-good'][i]}" cx="94" cy="${40 + i * 30}" r="9"/>${T(94, 44 + i * 30, i + 1, { c: 'on', s: 11 })}`) +
          q(116, 40 + i * 30) + `<g class="ans">${pop(i, pl(108, 40 + i * 30, t, '', 9.5))}</g>`).join('')}`),

    /* Psychosis is a symptom found in many disorders, not only schizophrenia */
    notSame: ART(`
      ${title('Where psychosis shows up')}
      ${[[150, 40], [232, 60], [255, 100], [231, 141], [150, 160], [69, 141], [45, 100], [69, 60]]
        .map(([x, y]) => st(`M${x} ${y} L150 100`, 'warn', 2, 'a-flow')).join('')}
      <g class="a-pulse">${brain(122, 82, 1.2)}</g>
      ${tag(150, 104, 'Psychosis', '', 11)}
      ${tag(150, 40, 'Schizophrenia', '', 10)}
      ${qtag(232, 60, 'Mania', 9.5)}${qtag(255, 100, 'Delirium', 9.5)}${qtag(231, 141, 'Dissociative', 9.5)}
      ${qtag(150, 160, 'Personality d/o', 9.5)}${qtag(69, 141, 'Drugs', 9.5)}${qtag(45, 100, 'Dementia', 9.5)}${qtag(69, 60, 'Depression', 9.5)}
      ${tag(150, 125, 'poor grasp of reality', 'ans', 9)}`),

    /* Obvious psychosis vs hidden psychosis */
    hidden: ART(`
      ${title('Two kinds of psychotic patients')}
      ${divider()}
      ${person(75, 140, 1.3, { shirt: 'f-spleen', hair: 'f-tumor', mouth: 'o' })}
      ${puffs(88, 82, 96, 72)}
      <g class="a-bob">${cloud(105, 46, 34, 18)}${eye(92, 46, .7)}${ear(116, 46, .7)}${waves(124, 46)}</g>
      ${person(222, 140, 1.3, { shirt: 'f-good', hair: 'f-food' })}
      ${puffs(232, 82, 240, 72)}
      ${cloud(250, 46, 34, 18, 'f-white', 9, 'stroke-dasharray="3 3" fill-opacity=".35"')}
      <g class="ans">${eye(238, 46, .7)}${ear(262, 46, .7)}<g class="a-sway">${mag(196, 50, 1.2)}</g></g>
      ${qtag(75, 166, 'Obvious: probe the type', 9.5)}${qtag(222, 166, 'Hidden: screen for it', 9.5)}`),

    /* Screen everyone */
    everyone: ART(`
      ${title('Who gets screened for psychosis?')}
      ${[['f-immune', 'f-stool', 'smile'], ['f-good', 'f-bone', 'flat'], ['f-spleen', 'f-tumor', 'sad'], ['f-warn', 'f-food', 'smile'], ['f-mouth', 'f-large', 'flat'], ['f-vein', 'f-stool', 'smile']]
        .map(([sh, h, m], i) => person(30 + i * 48, 122, 1.05, { shirt: sh, hair: h, mouth: m }) + `<g class="ans">${check(30 + i * 48, 62, i)}</g>`).join('')}
      ${qtag(150, 40, 'Every patient', 12)}
      ${pl(20, 146, 'Esp. depression, dementia, substance use', 'ans', 10)}
      ${pl(20, 167, 'Past psychosis changes diagnosis + care', 'ans', 10)}`),

    /* 3-4% of the public hear voices; under half have a disorder */
    voices: ART(`
      ${title('Out of 100 people')}
      ${ear(28, 56, 1.3)}<g class="ans">${waves(40, 56)}</g>
      ${Array.from({ length: 100 }, (_, i) => `<circle cx="${70 + (i % 20) * 11}" cy="${32 + Math.floor(i / 20) * 11}" r="3.6" fill="var(--pic-ink)" opacity=".25"/>`).join('')}
      <g class="ans">${[[25, 'f-good'], [48, 'f-good'], [71, 'f-good'], [93, 'f-bad']].map(([i, c], k) =>
        `<g class="a-pulse" style="animation-delay:${k * .3}s"><circle class="${c}" cx="${70 + (i % 20) * 11}" cy="${32 + Math.floor(i / 20) * 11}" r="4.6"/></g>`).join('')}</g>
      ${qtag(150, 100, '3–4% hear voices')}
      ${qtag(150, 122, 'Less than half have a disorder', 9.5)}
      <g class="ans"><circle class="f-good" cx="22" cy="146" r="5"/>${T(32, 149.5, 'often began before age 12', { a: 'start', s: 9.5 })}
      <circle class="f-good" cx="22" cy="166" r="5"/>${T(32, 169.5, 'mostly positive voices', { a: 'start', s: 9.5 })}
      <circle class="f-bad" cx="190" cy="146" r="5"/>${T(200, 149.5, 'disorder', { a: 'start', s: 9.5 })}</g>`),

    /* Two nonjudgmental screening questions */
    harass: ART(`
      ${divider(150, 24, 150)}
      ${bub(6, 22, 138, 40, 60, 74)}${bub(156, 22, 138, 40, 225, 74)}
      ${q(75, 42)}${q(225, 42)}
      <g class="ans">${T(75, 38, '"Anyone harassing or', { c: 'tagtx', s: 9.5 })}${T(75, 51, 'trying to harm you?"', { c: 'tagtx', s: 9.5 })}
      ${T(225, 38, '"Do strangers look at', { c: 'tagtx', s: 9.5 })}${T(225, 51, 'or talk about you?"', { c: 'tagtx', s: 9.5 })}</g>
      ${person(56, 140, 1.15, { shirt: 'f-immune', hair: 'f-stool', mouth: 'worry', eyes: 'side' })}
      <g class="ans">${[0, 1, 2].map(i => `<g class="a-blink" style="animation-delay:${i * .4}s"><ellipse class="f-scar" cx="${92 + i * 16}" cy="${136 - (i % 2) * 6}" rx="3" ry="5"/></g>`).join('')}
      <g class="a-blink">${person(132, 140, .9, { shirt: 'f-scar', skin: 'f-scar', mouth: 'flat' })}</g></g>
      ${person(225, 140, 1.15, { shirt: 'f-good', hair: 'f-food', mouth: 'worry' })}
      ${person(180, 136, .85, { shirt: 'f-warn', hair: 'f-tumor', eyes: 'side' })}${person(272, 136, .85, { shirt: 'f-spleen', hair: 'f-large', mouth: 'o' })}
      <g class="ans">${st('M193 104 Q201 98 207 104', 'warn', 2, 'a-flow')}${st('M259 104 Q251 98 243 104', 'spleen', 2, 'a-flow')}</g>
      ${tag(75, 166, 'Paranoia', '', 10.5)}${tag(225, 166, 'Ideas of reference', '', 10.5)}`),

    /* Depressed widow: keep probing; antidepressant + antipsychotic */
    vignette: ART(`
      ${title('A depressed widow')}
      <path class="f-large" d="M10 74 L42 50 L74 74 Z"/><rect class="f-bone" x="16" y="74" width="52" height="40"/><rect class="f-water" x="26" y="84" width="12" height="12"/><rect class="f-food" x="46" y="90" width="12" height="24"/>
      ${person(122, 132, 1.25, { shirt: 'f-spleen', hair: 'f-bone', mouth: 'sad' })}
      ${[0, 1, 2].map(i => mover(`<path class="f-bad" d="M0 -8 L4 -4 L10 -7 L8 -1 L13 3 L6 4 L4 10 L0 5 L-5 9 L-5 3 L-11 1 L-5 -3 Z"/>`, 'M70 80 Q90 60 110 78', 2.4, i * .8)).join('')}
      ${qpl(178, 36, 'Denied voices', 9.5)}${qpl(178, 58, 'Kept gently asking', 9.5)}${qpl(178, 80, 'Heard insults', 9.5)}
      <g class="ans">${pop(0, pill(190, 110, -25, 'f-good'))}${pop(1, pill(262, 110, 25, 'f-spleen'))}
      ${T(190, 132, 'antidepressant', { s: 9 })}${T(262, 132, 'antipsychotic', { s: 9 })}
      ${st('M225 104 V116 M219 110 H231', 'good', 2.5, 'a-pulse')}</g>${q(225, 118)}
      ${qtag(150, 164, 'Major depression with psychotic features', 9.5)}`),

    /* Normalize, then ask */
    normalize: ART(`
      ${bub(8, 8, 226, 50, 40, 82)}
      ${q(120, 33)}
      <g class="ans">${T(120, 24, '"Deep depression sometimes', { c: 'tagtx', s: 9.5 })}${T(120, 37, 'causes strange experiences, like voices.', { c: 'tagtx', s: 9.5 })}${T(120, 50, 'Has that happened to you?"', { c: 'tagtx', s: 9.5 })}</g>
      ${doc(40, 148, 1.3)}
      ${person(258, 148, 1.3, { shirt: 'f-good', hair: 'f-large' })}
      <g class="ans"><path d="M66 116 Q150 70 232 116" fill="none" stroke="var(--c-good)" style="stroke-width:7" stroke-linecap="round" opacity=".35"/>${st('M66 116 Q150 70 232 116', 'good', 3, 'a-flow')}</g>
      ${qtag(150, 108, 'Normalize, then ask', 10)}
      ${T(150, 136, 'Springboards:', { s: 9.5 })}
      ${q(150, 158)}<g class="ans">${pop(0, tag(100, 158, 'Anxiety', '', 9.5))}${pop(1, tag(150, 158, 'Drugs', '', 9.5))}${pop(2, tag(203, 158, 'Dementia', '', 9.5))}</g>`),

    /* Mnemonic: Delusions Herald Schizophrenic's Bad News */
    dhsbn: ART(`
      ${title('Schizophrenia symptoms')}
      ${[['D', 'Delusions', 'Delusions', 'f-bad'], ['H', 'Herald', 'Hallucinations', 'f-spleen'], ['S', 'Schizophrenic\'s', 'Speech disorganized', 'f-immune'], ['B', 'Bad', 'Behavior disorganized', 'f-warn'], ['N', 'News', 'Negative symptoms', 'f-good']]
        .map(([l, m, w, c], i) => { const y = 42 + i * 29; return pop(i, `<rect class="${c}" x="10" y="${y - 12}" width="26" height="24" rx="6"/>${T(23, y + 5.5, l, { c: 'on', s: 15 })}`) +
          `<g class="ans">${pop(i, T(44, y + 3.5, m, { a: 'start', s: 10, w: 400 }))}</g>` + qpl(132, y, w, 10); }).join('')}`),

    /* DSM-5: 2+ symptoms for 1 month, at least one core, 6 months total */
    szCrit: ART(`
      ${title('Schizophrenia time rule')}
      <rect class="f-white" x="20" y="44" width="260" height="30" rx="6"/>
      <g class="ans"><rect class="f-warn" x="20" y="44" width="86.7" height="30" rx="6" opacity=".55"/><rect class="f-warn" x="150" y="44" width="130" height="30" rx="6" opacity=".55"/>
      <g class="a-pulse"><rect class="f-bad" x="106.7" y="44" width="43.3" height="30"/></g>
      ${T(63, 63, 'prodrome', { s: 9.5, c: 'tagtx' })}${T(215, 63, 'residual', { s: 9.5, c: 'tagtx' })}</g>
      ${[1, 2, 3, 4, 5].map(i => ln(`M${20 + i * 43.3} 44 V74`, 1, '')).join('')}
      ${[1, 2, 3, 4, 5, 6].map(i => T(20 + (i - .5) * 43.3, 86, `mo ${i}`, { s: 9, w: 400 })).join('')}
      ${mover(`<circle class="f-good" r="6"/><circle class="f-white" r="2.5"/>`, 'M24 38 L276 38', 4)}
      ${qtag(128, 30, '2+ symptoms, 1 month', 9.5)}
      ${qtag(150, 104, '6 months total', 10)}
      ${['D', 'H', 'S', 'B', 'N'].map((l, i) => `<rect class="${i < 3 ? 'f-bad' : 'f-white'}" x="${58 + i * 38}" y="122" width="30" height="26" rx="6"/>${T(73 + i * 38, 140, l, { c: i < 3 ? 'on' : 'tagtx', s: 13 })}`).join('')}
      <g class="ans">${[0, 1, 2].map(i => `<g class="a-pulse" style="animation-delay:${i * .3}s"><rect x="${55 + i * 38}" y="119" width="36" height="32" rx="8" fill="none" stroke="var(--c-warn)" style="stroke-width:2.5"/></g>`).join('')}</g>
      ${qtag(116, 166, 'At least 1 core: D, H, or S', 9.5)}`),

    /* Thought content = what; thought process = how */
    tcTp: ART(`
      ${divider()}
      ${tag(75, 32, 'Content (TC)', '', 10.5)}${tag(225, 32, 'Process (TP)', '', 10.5)}
      <g class="a-bob">${cloud(75, 84, 52, 32, 'f-pancreas')}${T(75, 80, 'WHAT', { s: 13, c: 'tagtx' })}${T(75, 96, 'you think', { s: 10, w: 400, c: 'tagtx' })}</g>
      ${[[180, 84, 'f-immune'], [214, 66, 'f-good'], [244, 96, 'f-spleen'], [276, 76, 'f-warn']].map(([x, y, c]) => `<circle class="${c}" cx="${x}" cy="${y}" r="11"/>`).join('')}
      ${ln('M190 79 L204 71', 2.5, 'a-flow')}${ln('M223 72 L236 88', 2.5, 'a-flow')}
      <g class="a-shake">${st('M254 92 L259 86 L262 91 L266 82', 'bad', 2.5)}</g>
      ${T(225, 124, 'HOW thoughts link', { s: 10 })}
      ${qtag(75, 152, 'Impaired → delusions', 9.5)}
      ${qtag(225, 152, 'Impaired → disorg. speech', 9.5)}`),

    /* Delusion: impossible belief; mostly paranoid or grandiose */
    delusion: ART(`
      ${divider(150, 24, 150)}
      ${person(58, 140, 1.2, { shirt: 'f-immune', hair: 'f-stool', mouth: 'worry', eyes: 'side' })}
      <path class="f-good" d="M98 140 Q92 118 108 112 Q112 98 126 104 Q140 98 142 114 Q154 122 144 140 Z"/>
      <g class="ans"><g class="a-blink">${eye(112, 120, .45)}${eye(126, 120, .45)}</g>${eye(128, 132, .4)}</g>
      <g class="ans"><g class="a-spin" style="animation-duration:9s">${Array.from({ length: 12 }, (_, i) => { const [x1, y1] = arcPt(225, 96, 24, i * 30), [x2, y2] = arcPt(225, 96, 38, i * 30); return st(`M${x1} ${y1} L${x2} ${y2}`, 'pancreas', 3); }).join('')}</g></g>
      ${person(225, 140, 1.2, { shirt: 'f-bad', hair: 'f-large', extra: `<g class="ans"><path class="f-pancreas" d="M-9 -41 L-9 -51 L-4.5 -46 L0 -53 L4.5 -46 L9 -51 L9 -41 Z"/></g>` })}
      ${qtag(75, 32, 'Paranoid', 11)}${tag(75, 52, 'most common (~60%)', 'ans', 9.5)}
      ${qtag(225, 32, 'Grandiose', 11)}${tag(225, 52, 'special powers; mania', 'ans', 9.5)}
      ${qtag(150, 166, 'A belief most agree is impossible', 9.5)}`),

    /* Ideas of reference: ordinary events seem aimed at me */
    reference: ART(`
      ${title('Ideas of reference')}
      ${tv(10, 40, 84, 60, person(52, 92, .8, { shirt: 'f-pancreas', hair: 'f-tumor', mouth: 'o' }))}
      ${person(150, 140, 1.15, { shirt: 'f-good', hair: 'f-food', mouth: 'worry' })}
      ${person(222, 136, .85, { shirt: 'f-warn', hair: 'f-tumor', eyes: 'side' })}${person(270, 136, .85, { shirt: 'f-spleen', hair: 'f-large', eyes: 'side' })}
      <g class="ans">${st('M98 74 Q118 80 132 96', 'warn', 2.5, 'a-flow')}${st('M98 84 Q112 92 126 104', 'warn', 2.5, 'a-flow')}
      ${st('M208 106 Q190 100 174 106', 'spleen', 2, 'a-flow')}${st('M258 100 Q220 84 172 98', 'spleen', 2, 'a-flow')}
      ${puffs(160, 80, 166, 70)}<g class="a-bob">${cloud(196, 46, 46, 18)}${T(196, 50, 'It\'s about ME', { c: 'tagtx', s: 10 })}</g>
      ${tag(250, 76, 'often dangerous', '', 9)}</g>
      ${qtag(150, 164, 'Ordinary events get special meaning', 9.5)}`),

    /* Delusion of control: an outside force controls me */
    control: ART(`
      ${title('Delusion of control')}
      ${tv(14, 46, 80, 58)}
      <g class="ans">${[0, 1, 2].map(i => st(`M98 ${66 + i * 10} Q150 ${56 + i * 14} 192 ${84 + i * 6}`, 'nerve', 3, 'a-flow')).join('')}
      ${tag(146, 46, 'rays through the TV', '', 9.5)}</g>
      <g class="a-sway">${person(214, 140, 1.4, { shirt: 'f-immune', hair: 'f-stool', mouth: 'worry' })}</g>
      ${qtag(150, 166, 'An outside force controls me', 10)}`),

    /* Capgras: loved one replaced by an impostor */
    capgras: ART(`
      ${title('Capgras syndrome')}
      ${person(60, 142, 1.25, { shirt: 'f-immune', hair: 'f-stool', mouth: 'worry' })}
      ${person(210, 142, 1.25, { shirt: 'f-mouth', hair: 'f-large' })}
      <g class="ans"><g class="a-blink">${G(210, 142, 1.25, `<path d="M-13 0 V-11 Q-13 -23 0 -23 Q13 -23 13 -11 V0 Z M0 -43 A10 10 0 1 1 0 -23 A10 10 0 1 1 0 -43" fill="none" stroke="var(--c-bad)" style="stroke-width:2" stroke-dasharray="3 2"/>`)}${tag(262, 96, 'impostor?', '', 9.5)}</g></g>
      ${puffs(76, 78, 84, 66)}
      ${cloud(112, 44, 44, 18)}<g class="ans">${T(112, 48, 'Not the real her!', { c: 'tagtx', s: 9.5 })}</g>${q(112, 44)}
      <g class="a-pulse"><path class="f-bad" d="M140 104 C134 96 124 102 130 110 L140 118 L150 110 C156 102 146 96 140 104 Z"/></g>
      ${qtag(130, 162, 'Loved one replaced by an impostor', 9.5)}
      ${tag(222, 30, 'delusion of replacement', 'ans', 9)}`),

    /* Jealousy: spouse is unfaithful, no evidence */
    jealousy: ART(`
      ${title('Delusion of jealousy')}
      ${person(50, 142, 1.2, { shirt: 'f-immune', hair: 'f-stool', mouth: 'worry', eyes: 'side' })}
      ${person(112, 142, 1.2, { shirt: 'f-mouth', hair: 'f-large' })}
      <g class="a-pulse"><path class="f-bad" d="M81 82 C75 74 65 80 71 88 L81 96 L91 88 C97 80 87 74 81 82 Z"/></g>
      <g class="ans">${st('M81 82 L78 88 L84 90 L81 96', 'white', 1.8)}</g>
      <path class="f-pancreas" d="M182 82 H206 L212 88 H262 V132 H182 Z"/><rect class="f-white" x="186" y="92" width="72" height="36" rx="3"/>
      <g class="ans"><g class="a-sway">${mag(200, 104, 1.1)}</g>${T(238, 118, 'empty', { s: 9.5, c: 'tagtx' })}</g>
      ${qtag(84, 30, 'Spouse is cheating', 10)}${qtag(222, 152, 'No evidence', 10.5)}`),

    /* Somatic: sure of illness or poisoning; tests are normal */
    somatic: ART(`
      ${title('Somatic delusions')}
      ${person(64, 144, 1.3, { shirt: 'f-good', hair: 'f-tumor', mouth: 'sad', body: `<path class="f-skin" d="M-10 -10 Q0 -4 10 -10 L10 -6 Q0 0 -10 -6 Z"/>` })}
      ${puffs(78, 82, 86, 72)}${cloud(106, 46, 40, 20)}
      <g class="ans"><g class="a-bob">${germ(90, 46, -10)}${germ(110, 54, 20)}</g>
      <g class="a-bob" style="animation-delay:.5s"><path class="f-spleen" d="M124 32 H130 V37 C135 39 135 42 135 45 V58 H119 V45 C119 42 119 39 124 37 Z"/>${T(127, 52, '!', { c: 'on', s: 11 })}</g></g>
      ${q(106, 46)}
      <rect class="f-white" x="186" y="36" width="80" height="88" rx="6"/><rect class="f-scar" x="210" y="30" width="32" height="12" rx="4"/>
      ${[0, 1, 2, 3].map(i => `<path d="M198 ${56 + i * 18} H236" stroke="var(--pic-ink)" opacity=".4" style="stroke-width:3" stroke-linecap="round"/>` + `<g class="ans">${check(250, 56 + i * 18, i)}</g>`).join('')}
      ${qtag(226, 140, 'Tests normal', 10)}
      ${qtag(80, 164, 'Illness or poison belief', 9.5)}
      ${tag(222, 160, 'often with depression', 'ans', 9)}`),

    /* Religious: grandiose, God-like */
    religious: ART(`
      ${title('Religious delusions')}
      <g class="ans"><g class="a-spin" style="animation-duration:10s">${Array.from({ length: 16 }, (_, i) => { const [x1, y1] = arcPt(150, 100, 30, i * 22.5), [x2, y2] = arcPt(150, 100, 48, i * 22.5); return st(`M${x1} ${y1} L${x2} ${y2}`, 'pancreas', 3); }).join('')}</g></g>
      ${person(150, 150, 1.4, { shirt: 'f-white', hair: 'f-food', extra: `<g class="ans"><ellipse cx="0" cy="-50" rx="10" ry="3" fill="none" stroke="var(--c-pancreas)" style="stroke-width:2.5"/></g>` })}
      ${qtag(150, 36, 'Feels God-like, e.g., the Messiah', 9.5)}
      ${tag(60, 70, 'a grandiose type', 'ans', 9)}
      ${pl(8, 166, 'Ask: special bond with God?', 'ans', 9)}${pl(158, 166, 'Special religious powers?', 'ans', 9)}${q(150, 166)}`),

    /* Technological: connected to machines that give power */
    tech: ART(`
      ${title('Technological delusions')}
      ${person(70, 150, 1.4, { shirt: 'f-immune', hair: 'f-stool' })}
      <g class="ans"><g class="a-blink"><rect class="f-nerve" x="76" y="82" width="12" height="8" rx="2"/></g></g>
      <rect class="f-tumor" x="196" y="60" width="72" height="48" rx="5"/><rect class="f-water" x="201" y="65" width="62" height="38" rx="3"/><path class="f-scar" d="M188 108 H276 L282 116 H182 Z"/>
      <g class="ans">${st('M88 86 Q140 60 196 84', 'nerve', 3, 'a-flow')}${st('M88 86 Q140 60 196 84', 'warn', 1, '')}
      <g class="a-pulse"><path class="f-nerve" d="M232 70 L224 86 H232 L228 98 L240 80 H232 Z"/></g>
      ${tag(150, 40, 'transmitter in my brain', '', 9.5)}</g>
      ${qtag(220, 140, 'Connected to machines', 9.5)}
      ${tag(220, 162, 'gives immense power', 'ans', 9.5)}`),

    /* Interviewing a paranoid patient: become an ally */
    ally: ART(`
      ${title('Be an ally')}
      ${doc(110, 142, 1.25)}
      ${person(166, 142, 1.25, { shirt: 'f-good', hair: 'f-tumor', mouth: 'flat' })}
      <g class="a-pulse"><path class="f-bad" d="M138 62 C132 54 122 60 128 68 L138 76 L148 68 C154 60 144 54 138 62 Z"/></g>
      <circle cx="262" cy="80" r="28" fill="none" stroke="var(--c-spleen)" style="stroke-width:2.5" stroke-dasharray="4 4"/>
      <g class="ans">${nope(262, 80, 12)}${tag(262, 120, 'not part of it', '', 9)}</g>
      ${bub(8, 24, 108, 40, 96, 82)}${q(62, 44)}
      <g class="ans">${T(62, 40, '"Has anyone', { c: 'tagtx', s: 9.5 })}${T(62, 53, 'treated you badly?"', { c: 'tagtx', s: 9.5 })}</g>
      ${qtag(140, 166, 'Nonjudgmental: on their side', 9.5)}`),

    /* Counterprojective statement */
    counter: ART(`
      ${bub(8, 8, 214, 40, 50, 82)}${q(115, 28)}
      <g class="ans">${T(115, 24, '"You probably think I\'m part of it', { c: 'tagtx', s: 9.5 })}${T(115, 38, 'too, which would be understandable."', { c: 'tagtx', s: 9.5 })}</g>
      ${doc(52, 146, 1.3)}
      ${person(240, 146, 1.3, { shirt: 'f-spleen', hair: 'f-food', mouth: 'flat', eyes: 'narrow', extra: `<path class="f-spleen" d="M-13 -12 H13 V-6 H-13 Z"/>` })}
      <g class="ans"><g class="a-grow">${bub(196, 56, 64, 26, 236, 92)}${T(228, 73, 'Well…', { c: 'tagtx', s: 10 })}</g></g>
      ${qtag(140, 124, 'Name their suspicion of you', 9.5)}
      ${tag(150, 168, 'helps them open up', 'ans', 9.5)}`),

    /* Reality testing and the three phases of a delusion */
    phases: ART(`
      ${title('How strongly is it believed?')}
      ${st(arc(150, 128, 76, 180, 240), 'bad', 14)}${st(arc(150, 128, 76, 241, 299), 'warn', 14)}${st(arc(150, 128, 76, 300, 360), 'good', 14)}
      ${needle(150, 128, 60, [-75, -75, 0, 0, 75, 75, -75], 6)}
      ${qtag(56, 66, 'Fully convinced', 9.5)}${qtag(150, 38, 'Double awareness', 9.5)}${qtag(246, 66, 'Nondelusional', 9.5)}
      ${qtag(150, 152, 'Reality testing = strength of belief', 9.5)}
      ${T(150, 172, 'shows severity + response to treatment', { s: 9.5, c: 'ink ans' })}`),

    /* Gentle reality-testing frames */
    frame: ART(`
      ${title('Ask gently')}
      ${bub(176, 24, 116, 26, 260, 58)}<g class="ans">${T(234, 41, '"That\'s a delusion."', { c: 'tagtx', s: 9.5 })}${st('M188 37.5 H280', 'bad', 2)}${nope(160, 37, 10)}</g>${q(234, 37)}
      <g class="a-pulse">${bulb(50, 92, 1.5)}</g>
      <g class="a-bob">${brain(126, 76, 1)}</g>
      <g class="a-bob" style="animation-delay:.6s">${cloud(250, 92, 26, 16, 'f-mucus')}</g>
      ${qtag(50, 130, 'Imagination', 10)}${qtag(150, 130, 'Mind tricks', 10)}${qtag(250, 130, 'Fantasy', 10)}
      <g class="ans">${T(50, 152, '…getting the', { s: 9 })}${T(50, 164, 'best of you?', { s: 9 })}${T(150, 152, '…playing tricks', { s: 9 })}${T(150, 164, 'on you?', { s: 9 })}${T(250, 152, 'Fantasizing', { s: 9 })}${T(250, 164, 'any of this?', { s: 9 })}</g>`),

    /* Hallucinations: half of schizophrenia; ask with curiosity */
    halluc: ART(`
      ${title('Hallucinations')}
      <circle class="f-white" cx="52" cy="68" r="30"/>
      <g class="ans"><g class="a-pulse"><path class="f-spleen" d="M52 38 A30 30 0 0 1 52 98 Z"/></g></g>
      ${qtag(52, 112, 'About half', 10)}${T(52, 128, 'of schizophrenia', { s: 9.5, c: 'ink ans' })}
      ${ear(112, 70, 1.3)}<g class="ans">${waves(126, 70)}</g>
      ${qpl(150, 44, 'How many voices?', 9.5)}${qpl(150, 68, 'Male or female?', 9.5)}${qpl(150, 92, 'What do they say?', 9.5)}
      ${T(8, 150, 'Also:', { a: 'start', s: 9.5 })}${q(60, 150)}
      <g class="ans">${pop(0, pl(40, 150, 'Depression', '', 9.5))}${pop(1, pl(110, 150, 'Bipolar', '', 9.5))}${pop(2, pl(164, 150, 'Substances', '', 9.5))}
      ${pop(3, pl(40, 170, 'Dissociative', '', 9.5))}${pop(4, pl(122, 170, 'Dementia', '', 9.5))}</g>`),

    /* Command hallucinations: always ask */
    command: ART(`
      ${title('Always ask about commands')}
      <g class="a-shake"><path class="f-warn" d="M14 40 L30 32 L44 40 L60 30 L70 42 L86 42 L76 54 L86 66 L66 66 L58 78 L48 66 L28 72 L32 60 L14 56 L24 48 Z"/>${T(50, 57, '!', { c: 'on', s: 15 })}</g>
      ${st('M62 74 Q70 90 66 98', 'warn', 2.5, 'a-flow')}
      ${person(60, 150, 1.25, { shirt: 'f-immune', hair: 'f-stool', mouth: 'worry' })}
      ${doc(240, 150, 1.25)}
      ${bub(118, 26, 174, 52, 236, 90)}${q(205, 52)}
      <g class="ans">${T(205, 42, '"Are the voices telling you', { c: 'tagtx', s: 9.5 })}${T(205, 55, 'to do anything? To hurt', { c: 'tagtx', s: 9.5 })}${T(205, 68, 'yourself or anyone else?"', { c: 'tagtx', s: 9.5 })}</g>
      <g class="ans"><g class="a-pulse"><path class="f-good" d="M150 124 L164 130 V140 C164 150 158 155 150 158 C142 155 136 150 136 140 V130 Z"/></g>${st('M144 141 L149 146 L157 136', 'white', 2)}</g>`),

    /* One question covers all senses */
    senses: ART(`
      ${bub(14, 8, 272, 40, 150, 62)}${q(150, 28)}
      <g class="ans">${T(150, 24, '"Have you heard, seen, smelled, or felt', { c: 'tagtx', s: 9.5 })}${T(150, 38, 'things other people couldn\'t?"', { c: 'tagtx', s: 9.5 })}</g>
      ${[45, 115, 185, 255].map(x => st(`M150 66 L${x} 82`, 'warn', 1.8, 'a-flow')).join('')}
      ${pop(0, ear(45, 98, 1.3))}${pop(1, eye(115, 98, 1.3))}${pop(2, nose(185, 98, 1.3))}${pop(3, hand(255, 100, 1.3))}
      <g class="ans">${waves(58, 98)}</g>
      ${qtag(45, 134, 'Auditory', 9.5)}${qtag(115, 134, 'Visual', 9.5)}${qtag(185, 134, 'Olfactory', 9.5)}${qtag(255, 134, 'Tactile', 9.5)}
      <g class="ans">${T(45, 156, 'heard', { s: 9.5, w: 400 })}${T(115, 156, 'seen', { s: 9.5, w: 400 })}${T(185, 156, 'smelled', { s: 9.5, w: 400 })}${T(255, 156, 'felt', { s: 9.5, w: 400 })}</g>`),

    /* Formal thought disorder: LOA cluster and velocity cluster */
    formal: ART(`
      ${qtag(150, 14, 'Thought process: form, not content', 9.5)}
      ${divider(150, 28, 176)}
      <circle class="f-immune" cx="30" cy="80" r="13"/><circle class="f-good" cx="75" cy="62" r="13"/><circle class="f-spleen" cx="120" cy="92" r="13"/>
      ${ln('M42 75 L63 67', 2.5, 'a-flow')}
      <g class="a-shake">${st('M86 70 L94 76 L98 70 L108 84', 'bad', 2.5)}</g>
      ${st(arc(225, 104, 46, 180, 240), 'vein', 10)}${st(arc(225, 104, 46, 241, 299), 'good', 10)}${st(arc(225, 104, 46, 300, 360), 'bad', 10)}
      ${needle(225, 104, 38, [-85, 85, -85], 3)}
      <g class="ans">${T(176, 120, 'slow', { s: 9 })}${T(276, 120, 'fast', { s: 9 })}</g>
      ${qtag(75, 136, 'LOA cluster', 10)}${T(75, 156, 'thoughts don\'t connect', { s: 9.5, c: 'ink ans' })}
      ${qtag(225, 136, 'Velocity cluster', 10)}${T(225, 156, 'mutism to flight of ideas', { s: 9.5, c: 'ink ans' })}`),

    /* LOA from mild to severe */
    loaScale: ART(`
      ${title('Mild to severe')}
      ${[0, 1, 2, 3].map(i => `<circle class="f-immune" cx="108" cy="${42 + i * 34}" r="4"/>` + flag(280, 50 + i * 34)).join('')}
      ${st('M108 42 C122 26 134 58 146 42 C158 26 170 58 182 42 C194 26 206 58 218 42 C232 30 252 42 278 34', 'good', 2.5, 'a-draw')}
      ${st('M108 76 C140 76 170 72 196 80 C214 86 230 100 240 98', 'warn', 2.5, 'a-draw')}
      ${st('M108 110 L130 110 M142 98 L160 104 M172 118 L190 112 M204 100 L222 108', 'bad', 2.5, 'a-draw')}
      ${st('M110 140 l6 -6 M124 150 l4 6 M136 136 l8 2 M150 152 l-3 -7 M162 140 l7 5 M176 132 l2 8 M190 150 l6 -3 M204 138 l-4 6 M218 146 l7 -5', 'germ', 2.5, 'a-draw')}
      ${qtag(52, 42, 'Circumstantial', 9.5)}${qtag(52, 76, 'Tangential', 9.5)}${qtag(52, 110, 'LOA', 9.5)}${qtag(52, 144, 'Word salad', 9.5)}
      ${T(150, 174, 'Chart LOA as mild, moderate, or severe', { s: 9.5, c: 'ink ans' })}`),

    /* Circumstantiality: detours but gets there */
    circum: ART(`
      ${title('Circumstantiality')}
      ${person(32, 150, 1.2, { shirt: 'f-good', hair: 'f-bone', mouth: 'o' })}
      ${flag(266, 72)}${tag(270, 82, 'the point', '', 9)}
      ${st('M50 114 C70 80 96 72 100 96 C104 118 80 118 86 98 C96 66 140 70 150 92 C158 112 132 116 136 94 C142 66 190 76 200 92 C210 108 190 112 194 94 C200 74 236 64 264 60', 'good', 3, 'a-draw')}
      <g class="ans">${[[93, 106], [143, 102], [197, 100]].map(([x, y], i) => pop(i, `<circle class="f-pancreas" cx="${x}" cy="${y}" r="4"/>`)).join('')}</g>
      ${qtag(150, 138, 'Long-winded, extra details', 9.5)}
      ${qtag(170, 158, '…but gets back to the point', 9.5)}
      ${T(292, 16, 'not always illness', { a: 'end', s: 9, c: 'ink ans' })}
      ${T(170, 176, 'common in dementia, anxiety', { s: 9, w: 400, c: 'ink ans' })}`),

    /* Tangentiality: veers off and never returns */
    tangent: ART(`
      ${title('Tangentiality')}
      ${person(32, 150, 1.2, { shirt: 'f-spleen', hair: 'f-tumor', mouth: 'o' })}
      ${flag(266, 62)}${tag(266, 72, 'the question', '', 9)}
      ${st('M50 112 C90 92 130 76 160 72 C190 70 206 86 212 110 C216 128 236 136 258 132', 'warn', 3, 'a-draw')}
      <g class="ans"><g class="a-blink">${st('M250 126 L260 132 L250 139', 'warn', 3)}</g></g>
      ${qtag(130, 132, 'Veers off, never returns', 9.5)}
      ${qtag(140, 154, 'Usually psychosis or dementia', 9.5)}
      ${T(140, 174, '"rambling" when it\'s dementia', { s: 9, w: 400, c: 'ink ans' })}`),

    /* LOA: each sentence fine, leaps cannot be followed */
    loa: ART(`
      ${title('Looseness of associations')}
      ${T(292, 16, 'aka derailment', { a: 'end', s: 9, c: 'ink ans' })}
      ${[[12, 30, 'f-immune'], [170, 42, 'f-good'], [30, 96, 'f-spleen'], [180, 108, 'f-warn']].map(([x, y, c], i) =>
        `<rect class="f-white" x="${x}" y="${y}" width="100" height="30" rx="8"/><rect class="${c}" x="${x + 6}" y="${y + 8}" width="60" height="5" rx="2.5"/><rect class="${c}" x="${x + 6}" y="${y + 17}" width="44" height="5" rx="2.5"/>` +
        `<g class="ans">${check(x + 86, y + 15, i)}</g>`).join('')}
      <g class="ans">${st('M112 46 Q140 20 170 52', 'bad', 2.5, 'a-flow')}${st('M176 72 Q120 92 130 104', 'bad', 2.5, 'a-flow')}${st('M130 118 Q156 136 180 124', 'bad', 2.5, 'a-flow')}</g>
      ${q(140, 32)}${q(144, 86)}${q(156, 132)}
      ${qtag(150, 158, 'Each sentence OK; the leaps can\'t be followed', 9.5)}
      ${T(150, 176, 'also called disjointed speech', { s: 9, w: 400, c: 'ink ans' })}`),

    /* Loss of goal and other LOA-family terms */
    loaTerms: ART(`
      ${title('Loss of goal')}
      ${[34, 24, 14, 5].map((r, i) => `<circle class="${i % 2 ? 'f-white' : 'f-bad'}" cx="72" cy="92" r="${r}"/>`).join('')}
      <path d="M72 92 m-52 0 a52 46 0 1 0 104 0 a52 46 0 1 0 -104 0" fill="none" stroke="var(--pic-ink)" opacity=".35" style="stroke-width:1.5" stroke-dasharray="3 4"/>
      ${mover(`<circle class="f-immune" r="6"/><circle class="f-white" r="2.2"/>`, 'M20 92 Q20 46 72 46 Q124 46 124 92 Q124 138 72 138 Q20 138 20 92', 3)}
      ${qtag(72, 156, 'Never reaches the point', 9.5)}
      ${T(72, 174, 'usually from LOA', { s: 9, w: 400, c: 'ink ans' })}
      ${qpl(150, 54, 'Derailment = LOA', 9.5)}${qpl(150, 80, 'Disjointed = LOA', 9.5)}${qpl(150, 106, 'Rambling = tangential', 9.5)}
      ${T(158, 124, 'rambling: in dementia', { a: 'start', s: 9, w: 400, c: 'ink ans' })}`),

    /* Word salad */
    salad: ART(`
      ${title('Word salad')}
      ${T(292, 16, 'the most extreme LOA', { a: 'end', s: 9, c: 'ink ans' })}
      ${[['purple', 70, 44], ['Tuesday', 132, 34], ['sings', 196, 42], ['window', 236, 66], ['of', 102, 70], ['softly', 164, 66], ['the', 54, 88], ['glass', 212, 92]]
        .map(([w, x, y], i) => `<g class="a-bob" style="animation-delay:${(i * .23).toFixed(2)}s">${tag(x, y, w, '', 10)}</g>`).join('')}
      <path class="f-good" d="M70 104 H230 Q228 140 150 144 Q72 140 70 104 Z"/>
      <path class="f-bile noline" d="M80 104 Q100 96 118 104 Q140 94 160 104 Q182 96 200 104 Q214 98 222 104 Z"/>
      ${qtag(150, 164, 'Incoherent, even within one sentence', 9.5)}`),

    /* Neologisms, clang associations, non sequiturs */
    saladTerms: ART(`
      ${divider(100, 24, 150)}${divider(200, 24, 150)}
      ${tag(50, 30, 'Neologism', '', 10)}${tag(150, 30, 'Clang', '', 10)}${tag(250, 30, 'Non sequitur', '', 10)}
      ${['g', 'l', 'o', 'r', 'p'].map((l, i) => pop(i, `<rect class="${['f-bad', 'f-warn', 'f-pancreas', 'f-good', 'f-immune'][i]}" x="${14 + i * 15}" y="58" width="13" height="18" rx="3"/>${T(20.5 + i * 15, 71.5, l, { c: 'on', s: 11 })}`)).join('')}
      ${T(50, 100, '(a new word)', { s: 9, w: 400 })}
      ${tag(124, 62, 'rain', '', 10)}${tag(176, 62, 'train', '', 10)}${tag(150, 96, 'brain', '', 10)}
      <g class="ans">${st('M132 68 Q150 86 138 92 M168 68 Q150 86 162 92 M138 60 Q150 52 162 60', 'spleen', 2, 'a-flow')}</g>
      ${tag(232, 58, 'I ate', '', 9.5)}<g class="a-shake">${tag(258, 78, 'violin', '', 9.5)}</g>${tag(240, 98, 'toast', '', 9.5)}
      ${qtag(50, 124, 'Made-up word', 9)}${qtag(150, 124, 'Linked by sound', 9)}${qtag(250, 124, 'Out of context', 9)}
      ${T(150, 168, 'Neologisms often come with word salad', { s: 9.5, c: 'ink ans' })}`),

    /* Mutism */
    mutism: ART(`
      ${title('Mutism')}
      ${person(60, 150, 1.5, { shirt: 'f-vein', hair: 'f-stool', mouth: 'flat' })}
      ${bub(74, 30, 64, 32, 78, 80)}
      ${[0, 1, 2].map(i => `<g class="a-blink" style="animation-delay:${i * .3}s"><circle cx="${94 + i * 12}" cy="46" r="3" fill="var(--art-line)"/></g>`).join('')}
      ${qtag(220, 46, 'Will not speak', 10.5)}
      ${T(158, 84, 'Can be:', { a: 'start', s: 9.5, c: 'ink ans' })}
      ${qpl(156, 104, 'Negative symptom', 9.5)}${qpl(156, 128, 'Catatonia (mood d/o)', 9.5)}${qpl(156, 152, 'Response to a delusion', 9.5)}`),

    /* Poverty of thought vs poverty of content */
    poverty: ART(`
      ${divider()}
      ${tag(75, 30, 'Poverty of thought', '', 10)}${tag(225, 30, 'Poverty of content', '', 10)}
      ${person(40, 140, 1.15, { shirt: 'f-immune', hair: 'f-tumor', mouth: 'flat' })}
      ${bub(70, 60, 54, 26, 52, 92)}<g class="ans">${pop(0, T(97, 77, '"Yes."', { c: 'tagtx', s: 10 }))}</g>${q(97, 73)}
      ${person(178, 146, 1.1, { shirt: 'f-spleen', hair: 'f-food', mouth: 'o' })}
      ${bub(196, 42, 98, 54, 186, 104)}
      <g class="ans">${[0, 1, 2, 3].map(i => st(`M204 ${53 + i * 11} q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0`, ['vein', 'good', 'warn', 'spleen'][i], 2, 'a-flow')).join('')}
      <rect class="f-white" x="210" y="118" width="70" height="10" rx="5"/><g class="a-blink"><rect class="f-bad" x="211" y="119" width="8" height="8" rx="4"/></g>${T(245, 140, 'meaning', { s: 9 })}</g>${q(245, 74)}
      ${qtag(75, 166, 'Very few words', 9.5)}${qtag(225, 166, 'Many words, little meaning', 9.5)}`),

    /* Thought blocking */
    blocking: ART(`
      ${title('Thought blocking')}
      ${person(40, 150, 1.35, { shirt: 'f-good', hair: 'f-large', mouth: 'o' })}
      ${puffs(56, 84, 62, 74)}
      <g class="a-blink">${cloud(80, 46, 26, 16)}${bulb(80, 49, .9)}</g>
      ${pop(0, tag(110, 104, 'I was going', '', 10))}${pop(1, tag(178, 104, 'to say…', '', 10))}
      ${st('M60 116 H200', 'good', 3, 'a-draw')}
      <path class="f-scar" d="M214 84 H222 V128 H214 Z"/>
      <g class="ans">${tag(256, 100, '…?', '', 12)}</g>
      ${qtag(150, 146, 'Stops mid-thought', 10)}${qtag(170, 168, 'Forgets what it was', 10)}`),

    /* Perseveration: stuck on one idea */
    persev: ART(`
      ${title('Perseveration')}
      <ellipse cx="96" cy="100" rx="74" ry="48" fill="none" stroke="var(--c-warn)" style="stroke-width:8" opacity=".35"/>
      <ellipse cx="96" cy="100" rx="74" ry="48" fill="none" stroke="var(--c-warn)" style="stroke-width:2" stroke-dasharray="5 5"/>
      ${person(96, 126, 1.05, { shirt: 'f-immune', hair: 'f-stool', mouth: 'flat' })}
      <g class="q"><circle class="f-pancreas" cx="170" cy="100" r="8"/></g>
      ${mover(`<circle class="f-pancreas" r="8"/>${dot(0, 0, 2)}`, 'M170 100 Q170 52 96 52 Q22 52 22 100 Q22 148 96 148 Q170 148 170 100', 2.2)}
      ${qtag(240, 54, 'Stuck on one idea', 9.5)}
      ${T(240, 84, 'Seen in:', { s: 9.5, c: 'ink ans' })}
      ${q(240, 120)}<g class="ans">${pop(0, tag(240, 102, 'OCD', '', 10))}${pop(1, tag(240, 124, 'Dementia', '', 10))}${pop(2, tag(240, 146, 'Psychosis', '', 10))}</g>`),

    /* Racing thoughts (inside) vs pressured speech (out loud, mania) */
    racing: ART(`
      ${divider()}
      ${tag(75, 30, 'Racing thoughts', '', 10)}${tag(225, 30, 'Pressured speech', '', 10)}
      ${person(60, 152, 1.25, { shirt: 'f-immune', hair: 'f-stool', mouth: 'flat' })}
      ${puffs(76, 94, 82, 86)}${cloud(106, 68, 30, 17)}
      <g class="a-spin" style="animation-duration:.8s">${st('M106 58 A10 10 0 1 1 96 68', 'spleen', 3)}${st('M106 78 A10 10 0 0 1 106 58', 'warn', 3)}</g>
      ${person(176, 148, 1.25, { shirt: 'f-bad', hair: 'f-food', mouth: 'o' })}
      ${[0, 1, 2, 3].map(i => mover(`<rect class="${['f-warn', 'f-pancreas', 'f-good', 'f-mucus'][i]}" x="-9" y="-6" width="18" height="12" rx="5"/>`, `M196 ${112 - i * 6} L290 ${70 + i * 14}`, 1.1, i * .27)).join('')}
      <g class="ans">${st('M190 98 L198 92 M192 108 L202 108', 'bad', 2, 'a-blink')}</g>
      ${qtag(75, 166, 'Felt inside: anxiety, detox', 9.5)}${qtag(225, 166, 'Fast, loud: mania', 9.5)}
      ${T(240, 58, 'hard to interrupt', { s: 9, c: 'ink ans' })}`),

    /* Flight of ideas: LOA at high speed */
    flight: ART(`
      ${title('Flight of ideas')}
      ${st('M36 50 L118 40 L200 54 L266 90 L160 106 L60 110', 'ink', 1.2, 'a-flow')}
      ${[['cars', 36, 50, 'f-warn'], ['moon', 118, 40, 'f-spleen'], ['music', 200, 54, 'f-good'], ['rain', 266, 90, 'f-immune'], ['cheese', 160, 106, 'f-pancreas'], ['math', 60, 110, 'f-mouth']]
        .map(([w, x, y, c]) => `<circle class="${c}" cx="${x}" cy="${y}" r="17"/>${T(x, y + 3.5, w, { s: 9.5, c: 'tagtx' })}`).join('')}
      ${mover(`<circle class="f-bad" r="6"/><circle class="f-white" r="2.2"/>`, 'M36 50 L118 40 L200 54 L266 90 L160 106 L60 110', 1.6)}
      ${qtag(150, 146, 'LOA at high speed', 10)}
      ${T(150, 168, 'not the same as pressured speech', { s: 9.5, c: 'ink ans' })}`),

    /* Disorganized behavior: seen by observation */
    disorgBeh: ART(`
      ${title('Disorganized behavior')}
      ${eye(250, 30, 1)}<g class="ans">${st('M240 40 L214 62', 'vein', 2, 'a-flow')}</g>
      ${person(196, 150, 1.45, { shirt: 'f-spleen', hair: 'f-food', mouth: 'worry', body: `<path class="f-pancreas" d="M0 -23 Q13 -23 13 -11 V0 H0 Z"/>` })}
      <g class="ans">${[0, 1, 2].map(i => `<g class="a-rise" style="animation-delay:${i * .5}s">${st(`M${170 + i * 8} 110 q-4 -5 0 -10 t0 -10`, 'scar', 2)}</g>`).join('')}
      <g class="a-shake"><rect class="f-food" x="226" y="122" width="32" height="24" rx="4"/><rect class="f-white" x="232" y="114" width="20" height="12" rx="2"/>${T(242, 140, '?', { c: 'on', s: 12 })}</g></g>
      ${qtag(66, 40, 'Seen by observation', 9.5)}
      ${qpl(10, 70, 'Poor grooming', 9.5)}${qpl(10, 94, 'Body odor', 9.5)}${qpl(10, 118, 'Odd clothing', 9.5)}${qpl(10, 142, 'Simple tasks hard', 9.5)}
      ${T(10, 168, 'e.g., can\'t find an insurance card', { a: 'start', s: 9, w: 400, c: 'ink ans' })}`),

    /* Positive (added) vs negative (missing) symptoms */
    negSx: ART(`
      ${divider()}
      ${tag(75, 30, 'Positive', '', 10.5)}${tag(225, 30, 'Negative', '', 10.5)}
      ${person(52, 124, 1.2, { shirt: 'f-good', hair: 'f-stool', mouth: 'o' })}
      ${puffs(66, 76, 74, 68)}<g class="a-bob">${cloud(104, 60, 26, 13)}${eye(96, 60, .5)}${ear(113, 60, .5)}</g>
      <g class="a-pulse"><circle class="f-good" cx="120" cy="96" r="11"/>${st('M114 96 H126 M120 90 V102', 'white', 3)}</g>
      <g class="a-blink">${person(212, 124, 1.2, { shirt: 'f-scar', skin: 'f-bone', mouth: 'flat' })}</g>
      <g class="a-pulse"><circle class="f-bad" cx="268" cy="96" r="11"/>${st('M262 96 H274', 'white', 3)}</g>
      <rect class="f-white" x="246" y="50" width="28" height="14" rx="3"/><rect x="274" y="54" width="3" height="6" fill="var(--art-line)"/><g class="a-blink"><rect class="f-bad" x="248" y="52" width="5" height="10"/></g>
      ${qtag(75, 142, 'Something added', 9.5)}${T(75, 160, 'delusions, hallucinations', { s: 9.5, c: 'ink ans' })}
      ${qtag(225, 142, 'Something missing', 9.5)}
      <g class="ans">${T(225, 159, 'flat affect, apathy, asocial,', { s: 9 })}${T(225, 172, 'little speech, low motivation', { s: 9 })}</g>`),
  });
})();
