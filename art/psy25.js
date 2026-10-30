/* Psychiatric Interview Ch 25 art: anxiety, OCD, and trauma disorders.
   Colorful replacements for PICS, loaded after the page sets PICS. Everything lives inside one
   function so the little shape helpers never clash with the other art files. */
(() => {
  // place a shape (never put an a-* class on this same <g>; wrap it instead)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const W = (cls, inner, d) => `<g class="${cls}"${d !== undefined ? ` style="--d:${d};animation-delay:${(d * 0.25).toFixed(2)}s"` : ''}>${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const P = (d, cls, w = 3, extra = '') => `<path class="${cls}" d="${d}" style="stroke-width:${w}${extra}"/>`;
  const FRONT = s => `<g class="q">${s}</g>`;          // only on the front
  const BACK = s => `<g class="ansmotion">${s}</g>`;   // only on the back (SMIL motion)
  const ANS = s => `<g class="ans">${s}</g>`;
  const arrowR = (x1, y, x2, cls = 's-warn') => P(`M${x1} ${y} H${x2} M${x2 - 6} ${y - 5} L${x2} ${y} L${x2 - 6} ${y + 5}`, cls + ' a-flow', 2.5);

  // a friendly person, feet at (0,0), about 44 tall
  const MOUTH = { smile: 'M-4 -29 Q0 -25.5 4 -29', worry: 'M-4 -27 Q0 -30.5 4 -27', flat: 'M-4 -28.5 H4' };
  const person = (x, y, s = 1, o = {}) => {
    const m = o.mood || 'smile';
    const eyes = o.wide
      ? `<circle cx="-3.6" cy="-33" r="2.4" fill="#fff" stroke="var(--art-line)" stroke-width=".8"/><circle cx="3.6" cy="-33" r="2.4" fill="#fff" stroke="var(--art-line)" stroke-width=".8"/><circle cx="-3.6" cy="${o.down ? -32 : -33}" r="1" fill="var(--art-line)"/><circle cx="3.6" cy="${o.down ? -32 : -33}" r="1" fill="var(--art-line)"/>`
      : `<circle cx="-3.5" cy="${o.down ? -32 : -33}" r="1.3" fill="var(--art-line)"/><circle cx="3.5" cy="${o.down ? -32 : -33}" r="1.3" fill="var(--art-line)"/>`;
    const mouth = m === 'scared' ? `<ellipse cx="0" cy="-27.8" rx="2.2" ry="2.6" fill="var(--art-line)"/>`
      : `<path d="${MOUTH[m]}" fill="none" stroke="var(--art-line)" stroke-width="1.4" stroke-linecap="round"/>`;
    const hair = o.hair ? `<path class="${o.hair}" d="M-10 -33 C-11 -45 11 -45 10 -33 C7 -39 -6 -40 -10 -33 Z"/>` : '';
    const blush = o.blush ? `<g class="a-pulse"><ellipse cx="-6.5" cy="-29" rx="2.4" ry="1.5" fill="#ff7aa2"/><ellipse cx="6.5" cy="-29" rx="2.4" ry="1.5" fill="#ff7aa2"/></g>` : '';
    return G(x, y, s, `<path class="${o.body || 'f-immune'}" d="M-13 0 C-13 -15 -9 -21 0 -21 C9 -21 13 -15 13 0 Z"/><circle class="f-skin" cx="0" cy="-32" r="10"/>${hair}${eyes}${mouth}${blush}${o.extra || ''}`);
  };

  // icons, centered at (x, y)
  const heart = (x, y, s = 1, c = 'f-bad') => G(x, y, s, `<path class="${c}" d="M0 7 C-11 -1 -9 -10 -4 -10 C-2 -10 0 -8.5 0 -6.5 C0 -8.5 2 -10 4 -10 C9 -10 11 -1 0 7 Z"/>`);
  const CL = 'M-18 10 C-28 10 -28 -2 -19 -3 C-20 -13 -6 -16 -2 -9 C2 -17 17 -15 16 -5 C26 -5 27 10 17 10 Z';
  const cloud = (x, y, s = 1, c = 'f-white', inner = '') => G(x, y, s, `<path class="${c}" d="${CL}"/>${inner}`);
  const bolt = (x, y, s = 1) => G(x, y, s, `<path class="f-nerve" d="M3 -13 L-7 2 L-1 2 L-4 13 L8 -3 L2 -3 Z"/>`);
  const spider = (x, y, s = 1) => G(x, y, s, P('M-4 -2 Q-12 -10 -16 -4 M-4 0 Q-13 -4 -18 2 M-4 2 Q-12 4 -16 10 M-4 4 Q-10 10 -12 15 M4 -2 Q12 -10 16 -4 M4 0 Q13 -4 18 2 M4 2 Q12 4 16 10 M4 4 Q10 10 12 15', 's-line', 1.6) +
    `<circle class="f-tumor" cx="0" cy="2" r="7"/><circle class="f-tumor" cx="0" cy="-6" r="4"/><circle cx="-1.5" cy="-6.5" r="1" fill="#fff"/><circle cx="1.5" cy="-6.5" r="1" fill="#fff"/>`);
  const house = (x, y, s = 1, c = 'f-pancreas') => G(x, y, s, `<path class="${c}" d="M-14 0 V-16 L0 -28 L14 -16 V0 Z"/><rect class="f-food" x="-4" y="-11" width="8" height="11"/><rect class="f-water" x="-11" y="-17" width="6" height="5"/><rect class="f-water" x="5" y="-17" width="6" height="5"/>`);
  const bus = (x, y, s = 1) => G(x, y, s, `<rect class="f-pancreas" x="-20" y="-12" width="40" height="20" rx="4"/>${[-15, -6, 3, 12].map(a => `<rect class="f-water" x="${a}" y="-9" width="6" height="7" rx="1"/>`).join('')}<circle class="f-tumor" cx="-11" cy="9" r="4"/><circle class="f-tumor" cx="11" cy="9" r="4"/>`);
  const car = (x, y, s = 1, c = 'f-bad') => G(x, y, s, `<path class="${c}" d="M-18 4 V-3 L-11 -4 L-6 -11 H7 L12 -4 L18 -2 V4 Z"/><path class="f-water" d="M-4 -9 H6 L9 -4 H-7 Z"/><circle class="f-tumor" cx="-10" cy="5" r="4"/><circle class="f-tumor" cx="10" cy="5" r="4"/>`);
  const store = (x, y, s = 1) => G(x, y, s, `<rect class="f-white" x="-16" y="-10" width="32" height="22"/><path class="f-bad" d="M-19 -10 L-16 -18 H16 L19 -10 Z"/>${[-12, -4, 4, 12].map(a => `<path d="M${a} -18 L${a - 1} -10" stroke="#fff" stroke-width="3"/>`).join('')}<rect class="f-water" x="-11" y="-5" width="9" height="8"/><rect class="f-food" x="3" y="-4" width="8" height="16"/>`);
  const crowd = (x, y, s = 1) => G(x, y, s, [[-14, 2, 'f-good'], [14, 2, 'f-germ'], [-5, -2, 'f-warn'], [6, -1, 'f-vein']].map(([a, b, c]) => `<path class="${c}" d="M${a - 7} ${b + 14} C${a - 7} ${b + 6} ${a + 7} ${b + 6} ${a + 7} ${b + 14} Z"/><circle class="f-skin" cx="${a}" cy="${b}" r="5"/>`).join(''));
  const lock = (x, y, s = 1, c = 'f-pancreas') => G(x, y, s, P('M-7 -6 V-12 A7 7 0 0 1 7 -12 V-6', 's-line', 3.2) + `<rect class="${c}" x="-11" y="-7" width="22" height="18" rx="3"/><circle cx="0" cy="0" r="2.4" fill="var(--art-line)"/><path d="M0 1 V6" stroke="var(--art-line)" stroke-width="2"/>`);
  const moon = (x, y, s = 1) => G(x, y, s, `<path class="f-acid" d="M2 -10 A10 10 0 1 0 10 4 A8 8 0 1 1 2 -10 Z"/>`);
  const star = (x, y, r = 4, c = 'f-acid') => `<path class="${c}" d="M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3} Z" style="stroke-width:1"/>`;
  const drop = (x, y, s = 1, c = 'f-water') => G(x, y, s, `<path class="${c}" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/>`);
  const check = (x, y, d = 0) => W('a-pop', `<circle class="f-good" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3.5} ${y} l2.5 2.6 l4.5 -5" style="stroke-width:2"/>`, d);
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1) => G(x - 23 * s, y - 16 * s, s, `<path class="f-mouth" d="${BRAIN}"/>` + P('M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26', 's-line', 1.2, ';opacity:.6'));
  const lungs = (x, y, s = 1) => G(x, y, s, P('M0 -16 V-4 M0 -4 L-5 2 M0 -4 L5 2', 's-line', 2.4) + `<path class="f-mouth" d="M-4 -6 C-14 -10 -20 2 -18 12 C-17 18 -8 18 -4 12 Z"/><path class="f-mouth" d="M4 -6 C14 -10 20 2 18 12 C17 18 8 18 4 12 Z"/>`);
  const face = (x, y, s = 1, mood = 'scared') => G(x, y, s, `<circle class="f-skin" r="13"/><circle cx="-4.5" cy="-3" r="3" fill="#fff" stroke="var(--art-line)" stroke-width=".8"/><circle cx="4.5" cy="-3" r="3" fill="#fff" stroke="var(--art-line)" stroke-width=".8"/><circle cx="-4.5" cy="-3" r="1.3" fill="var(--art-line)"/><circle cx="4.5" cy="-3" r="1.3" fill="var(--art-line)"/>` +
    (mood === 'scared' ? `<ellipse cx="0" cy="6" rx="3" ry="3.6" fill="var(--art-line)"/>` : P('M-5 7 Q0 3 5 7', 's-line', 1.5)));
  const speech = (x, y, w, h, tail = 'l', c = 'wh') => {
    const tx = tail === 'l' ? x + 16 : x + w - 16;
    return `<path class="${c}" d="M${x + 10} ${y} H${x + w - 10} Q${x + w} ${y} ${x + w} ${y + 10} V${y + h - 10} Q${x + w} ${y + h} ${x + w - 10} ${y + h} H${tx + 6} L${tx + (tail === 'l' ? -8 : 8)} ${y + h + 10} L${tx - 4} ${y + h} H${x + 10} Q${x} ${y + h} ${x} ${y + h - 10} V${y + 10} Q${x} ${y} ${x + 10} ${y} Z" style="stroke-width:1.5"/>`;
  };
  // clock face with a hand that spins on the back and sits still on the front
  const clock = (x, y, r, dur = 3, start = 60, cls = 'f-white') => {
    let s = `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<path d="M${(x + Math.cos(a) * r * .78).toFixed(1)} ${(y + Math.sin(a) * r * .78).toFixed(1)} L${(x + Math.cos(a) * r * .9).toFixed(1)} ${(y + Math.sin(a) * r * .9).toFixed(1)}" stroke="var(--art-line)" stroke-width="1.4"/>`; }
    const hand = (len, w, col) => `<path d="M${x} ${y} V${y - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"`;
    s += FRONT(`<g transform="rotate(${start} ${x} ${y})">${hand(r * .7, 2.5, 'var(--c-bad)')}/></g>`);
    s += BACK(`${hand(r * .7, 2.5, 'var(--c-bad)')}><animateTransform attributeName="transform" type="rotate" from="${start} ${x} ${y}" to="${start + 360} ${x} ${y}" dur="${dur}s" repeatCount="indefinite"/></path>`);
    s += `${hand(r * .45, 3, 'var(--art-line)')} transform="rotate(-60 ${x} ${y})"/><circle cx="${x}" cy="${y}" r="2.5" fill="var(--art-line)"/>`;
    return s;
  };
  // a mnemonic tile: letter hidden on the front behind a "?" badge
  const tile = (x, y, w, h, cls, letter, d = 0) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>` +
    ANS(W('a-pop', T(x + w / 2, y + h * .72, letter, { c: 'on', s: Math.round(h * .62) }), d)) + q(x + w / 2, y + h / 2, 10);
  const calendar = (x, y, w, h, cols, rows, fill = 0, cls = 'f-warn') => {
    let s = `<rect class="wh" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="f-bad" x="${x}" y="${y}" width="${w}" height="12" rx="4"/>`;
    const cw = (w - 8) / cols, ch = (h - 18) / rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c, cx = x + 4 + c * cw, cy = y + 15 + r * ch;
      s += `<rect class="f-white" x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${(cw - 2).toFixed(1)}" height="${(ch - 2).toFixed(1)}" rx="1.5" style="stroke-width:.8"/>`;
      if (i < fill) s += ANS(W('a-pop', `<rect class="${cls}" x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${(cw - 2).toFixed(1)}" height="${(ch - 2).toFixed(1)}" rx="1.5" style="stroke-width:.8"/>`, +(i * .35).toFixed(2)));
    }
    return s;
  };
  const bulb = (x, y, s = 1) => G(x, y, s, `<path class="f-acid" d="M0 -14 C9 -14 13 -6 10 1 C8 5 5 6 5 10 H-5 C-5 6 -8 5 -10 1 C-13 -6 -9 -14 0 -14 Z"/><rect class="f-scar" x="-5" y="10" width="10" height="6" rx="1.5"/>`);
  const filmStrip = (x, y, w, h) => `<rect class="f-tumor" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` +
    P(`M${x + 2} ${y + 4} H${x + w - 2} M${x + 2} ${y + h - 4} H${x + w - 2}`, 's-white a-flow', 3, ';stroke-dasharray:3 4');
  const eye = (x, y, s = 1) => G(x, y, s, `<path class="f-white" d="M-14 0 Q0 -11 14 0 Q0 11 -14 0 Z"/><circle class="f-vein" r="5"/><circle r="2.2" fill="var(--art-line)"/>`);
  const puff = (x, y, s = 1) => G(x, y, s, `<path class="f-bad" d="M0 -12 L3 -5 L11 -8 L6 -1 L12 4 L4 5 L3 12 L-2 6 L-9 10 L-6 3 L-12 -1 L-5 -4 L-8 -11 Z"/>`);

  Object.assign(PICS, {

    /* Anxiety screening questions: five quick questions, about 3 minutes */
    screen: ART(`
      ${clock(42, 40, 18, 4, 0)}
      ${qtag(42, 70, 'About 3 min')}
      ${person(42, 168, 1.5, { body: 'f-good', hair: 'f-stool' })}
      <rect class="f-white" x="46" y="128" width="20" height="26" rx="2"/>${P('M50 136 H62 M50 142 H62 M50 148 H58', 's-line', 1.2)}
      ${[['Are you a worrier?', cloud(110, 25, .4, 'f-white')], ['Ever had a panic attack?', heart(110, 55, .9)], ['Uneasy in social settings?', crowd(110, 83, .55)], ['Any special fears?', spider(110, 114, .6)], ['OCD or PTSD symptoms?', drop(104, 145, .8) + bolt(116, 144, .6)]]
        .map(([t, icon], i) => W('a-pop', `<rect class="wh" x="94" y="${12 + i * 30}" width="200" height="25" rx="12"/>${icon}`, i) + qtag(206, 24.5 + i * 30, t, 9.5)).join('')}`),

    /* Many disorders cause anxiety */
    overlap: ART(`
      ${P('M48 56 L132 112 M150 58 L150 98 M252 56 L168 112', 's-warn a-flow', 2.5)}
      ${cloud(48, 30, .85, 'f-vein')}
      ${W('a-drop', P('M38 44 l-2 6 M50 44 l-2 6 M60 44 l-2 6', 's-vein', 2))}
      ${W('a-spin', `<circle class="f-warn" cx="150" cy="30" r="12"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path class="s-warn" d="M150 14 V9" transform="rotate(${a} 150 30)" style="stroke-width:2.5"/>`).join('')}`)}
      ${brain(252, 32, .75)}
      ${W('a-blink', P('M276 20 q6 8 0 16 M282 16 q9 12 0 24', 's-germ', 2))}
      ${qtag(48, 70, 'Depression')}${qtag(150, 70, 'Mania')}${qtag(252, 70, 'Schizophrenia')}
      ${W('a-shake', `<circle class="f-acid" cx="150" cy="124" r="22"/><circle cx="143" cy="119" r="2" fill="var(--art-line)"/><circle cx="157" cy="119" r="2" fill="var(--art-line)"/>${P('M141 133 Q145 129 150 133 Q155 137 159 133', 's-line', 1.6)}`)}
      ${tag(204, 124, 'anxiety')}
      ${tag(150, 166, 'Anxiety alone ≠ an anxiety disorder', 'ans', 9.5)}`),

    /* Each anxiety disorder has its own therapy: the right key for each lock */
    why: ART(`
      ${qtag(150, 18, 'Each disorder has its own therapy')}
      ${[[56, 'f-bad', 'Panic disorder', 'CBT for panic', 'M-6 0 v6 h4 v-3 h4 v5 h4 v-8'], [122, 'f-germ', 'Social phobia', 'CBT for social', 'M-6 0 v4 h3 v4 h4 v-6 h5 v6 h2 v-8']].map(([y, c, lk, ky, teeth]) => {
        const key = `<circle class="${c}" cx="${-58}" cy="0" r="10"/><circle class="wh" cx="-58" cy="0" r="4"/><rect class="${c}" x="-48" y="-3" width="46" height="6" rx="2"/><path class="${c}" d="${teeth.replace('M-6 0', 'M-14 3')}" style="stroke-width:1.2"/>`;
        return lock(240, y, 1.4, c === 'f-bad' ? 'f-pancreas' : 'f-water') +
          FRONT(G(210, y, 1, key)) + BACK(`<g>${G(232, y, 1, key)}<animateTransform attributeName="transform" type="translate" values="-34 0;-34 0;0 0;0 0;-34 0" keyTimes="0;.15;.45;.85;1" dur="3s" repeatCount="indefinite"/></g>`) +
          tag(240, y + 28, lk, '', 9.5) + qtag(150, y + 22, ky, 9.5);
      }).join('')}
      ${tag(150, 170, 'CBT for panic ≠ CBT for social phobia', 'ans', 9)}`),

    /* The 7 disorders; the first four are hardest to tell apart */
    seven: ART(`
      <rect x="6" y="26" width="288" height="72" rx="12" fill="none" class="s-warn a-flow-slow" style="stroke-width:2"/>
      ${tag(150, 22, 'First 4: hardest to tell apart', 'ans', 9.5)}
      ${[['Panic', 'f-bad', heart(0, 0, 1.3, 'f-white')], ['Agoraphobia', 'f-pancreas', bus(0, 0, .6)], ['GAD', 'f-vein', cloud(0, 0, .55)], ['Social', 'f-germ', crowd(0, -4, .7)], ['Phobia', 'f-good', spider(0, 0, .75)], ['OCD', 'f-water', drop(-6, 0, 1, 'f-white') + drop(7, 4, .7, 'f-white')], ['PTSD', 'f-tumor', bolt(0, 0, 1.1)]].map(([t, c, icon], i) => {
        const row = i < 4 ? 0 : 1, x = row ? 47 + (i - 4) * 72 : 12 + i * 70, y = row ? 108 : 32;
        return W('a-pop', `<rect class="${c}" x="${x}" y="${y}" width="64" height="60" rx="10"/>${G(x + 32, y + 22, 1, icon)}`, i) + qtag(x + 32, y + 48, t, 9);
      }).join('')}`),

    /* Panic attacks are common, panic disorder is not */
    attackVsDis: ART(`
      ${tag(62, 22, 'Panic attack')}${tag(228, 22, 'Panic disorder')}
      ${[0, 1].map(g => {
        const ox = g ? 190 : 24, n = g ? 5 : 35; let s = '';
        for (let i = 0; i < 100; i++) {
          const x = ox + (i % 10) * 8.5, y = 38 + Math.floor(i / 10) * 8.5;
          s += `<circle class="f-white" cx="${x}" cy="${y}" r="3" style="stroke-width:.8"/>`;
          if (i < n) s += ANS(W('a-pop', `<circle class="${g ? 'f-bad' : 'f-warn'}" cx="${x}" cy="${y}" r="3" style="stroke-width:.8"/>`, +(i * .3).toFixed(1)));
        }
        return s;
      }).join('')}
      ${W('a-beat', heart(144, 76, 1.2))}
      ${qtag(62, 140, 'About 35% in a year', 9.5)}${qtag(228, 140, 'About 4.7% ever', 9.5)}
      ${tag(150, 166, 'An attack alone is not a diagnosis', 'ans', 9.5)}`),

    /* Panic disorder criteria */
    panicCrit: ART(`
      <rect class="wh" x="6" y="12" width="92" height="120" rx="10"/><rect class="f-water" x="12" y="18" width="80" height="108" rx="7"/>
      ${cloud(36, 36, .5)}${W('a-blink', bolt(56, 66, 1.4))}${person(52, 124, .9, { mood: 'scared', wide: true })}
      <rect class="wh" x="104" y="12" width="92" height="120" rx="10"/>
      ${W('a-beat', heart(150, 72, 1.7))}
      ${Array.from({ length: 13 }, (_, i) => { const a = i / 13 * 2 * Math.PI - Math.PI / 2, x = (150 + Math.cos(a) * 36).toFixed(1), y = (72 + Math.sin(a) * 36).toFixed(1); return `<circle class="f-white" cx="${x}" cy="${y}" r="5"/>` + (i < 4 ? ANS(W('a-pop', `<circle class="f-bad" cx="${x}" cy="${y}" r="5"/>`, i * 2)) : ''); }).join('')}
      <rect class="wh" x="202" y="12" width="92" height="120" rx="10"/>
      ${calendar(212, 20, 72, 64, 6, 5, 30)}
      ${W('a-bob', cloud(248, 108, .55, 'f-white') + T(248, 112, '?', { s: 12, c: 'tagtx' }))}
      ${T(101, 76, '+', { s: 14 })}${T(199, 76, '+', { s: 14 })}
      ${qtag(52, 146, 'Out of the blue', 9.5)}${qtag(150, 146, 'Any 4 of 13', 9.5)}${qtag(248, 146, '1+ month worry', 9.5)}
      ${tag(150, 168, 'Repeated unexpected attacks + 1 month of fear or change', 'ans', 9)}`),

    /* Heart, Breathlessness, Fear */
    hbf: ART(`
      ${[['H', 'f-bad', 'Heart', W('a-beat', heart(52, 72, 2)), ['Palpitations', 'Chest pain', 'Nausea']],
        ['B', 'f-water', 'Breath', lungs(150, 70, 1.2) + W('a-rise', `<circle class="f-white" cx="172" cy="54" r="3"/><circle class="f-white" cx="178" cy="46" r="2.2"/>`), ['Short of breath', 'Choking', 'Dizzy, tingling', 'Hot/cold waves']],
        ['F', 'f-germ', 'Fear', W('a-shake', face(248, 72, 1.3)) + W('a-drop', drop(266, 58, .5)), ['Fear of dying', 'Going crazy', 'Sweat, shake', 'Feels unreal']]].map(([L, c, word, icon, list], i) => {
        const cx = 52 + i * 98;
        return `<rect class="wh" x="${cx - 46}" y="8" width="92" height="168" rx="10"/>` + tile(cx - 40, 12, 80, 34, c, L, i) +
          ANS(G(0, -6, 1, icon) + tag(cx, 94, word, '', 10) + list.map((t, j) => tag(cx, 114 + j * 16.5, t, '', 9)).join(''));
      }).join('')}`),

    /* After an attack: at least 1 month of fear, worry, or change */
    after: ART(`
      ${W('a-blink', bolt(36, 50, 1.6))}
      ${person(36, 132, 1.2, { mood: 'scared', wide: true })}
      ${tag(36, 150, 'Panic attack', '', 9.5)}
      ${arrowR(62, 85, 80)}
      ${calendar(84, 40, 92, 90, 6, 5, 30)}
      ${qtag(130, 28, 'At least 1 month', 9.5)}
      ${arrowR(180, 85, 194)}
      ${W('a-bob', cloud(208, 40, .38, 'f-white') + T(208, 45, '!', { s: 13, c: 'tagtx' }))}${qtag(253, 40, 'Fear of more', 9)}
      ${W('a-bob', cloud(208, 80, .38, 'f-white') + T(208, 85, '?', { s: 13, c: 'tagtx' }), 1)}${qtag(253, 80, 'Worry re meaning', 9)}
      ${house(208, 128, .7)}${qtag(253, 120, 'Behavior change', 9)}
      ${tag(150, 166, 'Any one of these, for 1+ month', 'ans', 9.5)}`),

    /* Define panic in plain words: a sudden spike, not everyday worry */
    define: ART(`
      ${P('M18 30 V138 H176', 's-ink', 1.5)}${T(170, 150, 'time', { s: 9, w: 400 })}
      ${P('M20 112 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t12 0', 's-vein', 2.5)}
      ${ANS(P('M20 128 H66 C72 128 76 40 86 40 C96 40 104 96 120 118 C130 128 140 128 172 128', 's-bad a-draw', 3))}
      ${qtag(92, 22, 'Sudden rush of fear', 9.5)}
      ${tag(146, 92, 'everyday worry', 'ans', 9)}
      ${W('a-beat', heart(198, 44, 1.1))}${qtag(255, 44, 'Pounding heart', 9)}
      ${lungs(198, 84, .7)}${qtag(255, 84, 'Short of breath', 9)}
      ${face(198, 124, .8)}${qtag(255, 124, 'Fear of dying', 9)}
      ${tag(150, 166, 'Many patients call worry a "panic attack"', 'ans', 9.5)}`),

    /* Out of the blue vs. a trigger */
    blue: ART(`
      ${tag(64, 13, 'Out of the blue')}
      <rect class="f-water" x="8" y="24" width="112" height="118" rx="10"/>
      <circle class="f-acid" cx="98" cy="44" r="10"/>${cloud(36, 46, .5)}
      ${W('a-blink', bolt(66, 68, 1.5))}
      ${person(64, 136, 1.05, { mood: 'scared', wide: true })}
      ${qtag(64, 158, 'Panic disorder')}
      ${tag(211, 13, 'Has a trigger')}
      ${[[130, 24, crowd(0, -2, .8), 'Social phobia'], [214, 24, filmStrip(-24, -12, 48, 24) + bolt(0, 0, .7), 'PTSD'],
        [130, 98, bus(0, 0, .75), 'Agoraphobia'], [214, 98, W('a-bob', P('M0 -26 V-6', 's-ink', 1) + spider(0, 0, .8)), 'Specific phobia']].map(([x, y, icon, t]) =>
        `<rect class="wh" x="${x}" y="${y}" width="78" height="68" rx="10"/>${G(x + 39, y + 28, 1, icon)}${qtag(x + 39, y + 56, t, 9)}`).join('')}`),

    /* Night attacks + a remembered first attack point to true panic disorder */
    night: ART(`
      ${moon(116, 34, 1.1)}${W('a-blink', star(22, 28) + star(66, 22, 3) + star(92, 56, 3))}
      <rect class="f-vein" x="14" y="86" width="9" height="48" rx="2"/><rect class="f-vein" x="14" y="116" width="124" height="16" rx="3"/>
      <rect class="f-white" x="24" y="106" width="20" height="10" rx="4"/>
      ${W('a-bob', person(52, 116, .95, { mood: 'scared', wide: true, body: 'f-good' }))}
      <path class="f-germ" d="M62 104 H136 V116 H62 Z"/>
      ${W('a-beat', heart(76, 80, .8))}
      ${qtag(76, 152, 'Woken by an attack', 9.5)}
      ${person(234, 140, 1.15, { mood: 'worry' })}
      ${W('a-pulse', cloud(232, 62, 1.25, 'f-white', `<rect class="wh" x="-13" y="-10" width="18" height="16" rx="2" style="stroke-width:.8"/><rect class="f-bad" x="-13" y="-10" width="18" height="4" rx="1" style="stroke-width:.6"/>${star(-4, 1, 4, 'f-warn')}${bolt(11, 0, .55)}`))}
      ${P('M226 100 a3 3 0 1 0 .1 0 M222 90 a2 2 0 1 0 .1 0', 's-ink', 1.2)}
      ${qtag(226, 160, 'Remembers the first one', 9.5)}
      ${tag(150, 14, 'Both point to true panic disorder', 'ans', 9.5)}`),

    /* Good CBT candidates can name their catastrophic thoughts */
    cbt: ART(`
      <circle cx="96" cy="88" r="48" fill="none" class="s-bad a-flow" style="stroke-width:2.5"/>
      ${BACK(`<circle class="f-warn" r="5"><animateMotion dur="3s" repeatCount="indefinite" path="M96 40 A48 48 0 1 1 95.9 40"/></circle>`)}
      ${W('a-beat', heart(96, 40, 1.3))}${tag(96, 16, 'Racing heart', '', 9.5)}
      ${cloud(138, 112, .9, 'f-white')}${T(139, 117, "I'll die!", { s: 9, c: 'tagtx' })}
      ${W('a-blink', bolt(52, 114, 1.3))}${tag(38, 146, 'More panic', '', 9.5)}
      ${qtag(150, 146, 'Catastrophic thought', 9.5)}
      ${W('a-pulse', `<path class="f-good" d="M248 52 L272 60 V82 C272 98 260 108 248 114 C236 108 224 98 224 82 V60 Z"/>`)}
      ${T(248, 88, 'CBT', { c: 'on', s: 13 })}
      ${ANS(P('M222 92 L190 108', 's-good a-flow', 2.5))}
      ${qtag(248, 128, 'Can name the fear', 9.5)}
      ${tag(150, 168, 'CBT often beats meds for panic long-term', 'ans', 9.5)}`),

    /* Agoraphobia: places where escape is hard */
    agora: ART(`
      ${P('M150 92 L56 46 M150 92 L246 46 M150 92 L56 124 M150 92 L246 124', 's-ink', 1.2, ';stroke-dasharray:3 4')}
      ${house(150, 106, 1.1)}
      ${store(50, 38, 1)}${bus(250, 40, 1)}${crowd(50, 112, 1)}
      <rect class="f-scar" x="220" y="114" width="64" height="10" rx="3"/>${car(240, 112, .8, 'f-germ')}
      ${qtag(50, 64, 'Stores')}${qtag(250, 64, 'Buses')}${qtag(50, 144, 'Crowds')}${qtag(250, 144, 'Driving far')}
      ${BACK(`<g>${person(0, 0, .55, { mood: 'scared', wide: true, body: 'f-warn' })}<animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1;1;0" keyTimes="0;.45;.6;1" calcMode="linear" path="M150 112 L210 70"/></g>`)}
      ${tag(150, 18, 'Escape is hard or embarrassing', 'ans', 9.5)}
      ${tag(150, 168, 'Avoided or endured with distress', 'ans', 9.5)}`),

    /* Phobic avoidance: the safe zone shrinks */
    avoid: ART(`
      ${qtag(52, 16, 'Panic attacks', 9.5)}${P('M94 16 H104', 's-warn', 2)}${qtag(150, 16, 'Link to places', 9.5)}${P('M196 16 H206', 's-warn', 2)}${qtag(248, 16, 'Avoid them', 9.5)}
      ${FRONT(`<circle cx="150" cy="96" r="64" fill="var(--c-good)" fill-opacity=".18" stroke="var(--c-good)" stroke-width="2.5"/>`)}
      ${BACK(`<circle cx="150" cy="96" r="64" fill="var(--c-good)" fill-opacity=".18" stroke="var(--c-good)" stroke-width="2.5"><animate attributeName="r" values="64;64;20;20;64" keyTimes="0;.15;.7;.92;1" dur="6s" repeatCount="indefinite"/></circle>`)}
      ${store(108, 66, .8)}${bus(196, 66, .7)}
      <circle class="f-good" cx="108" cy="128" r="9"/><rect class="f-food" x="106" y="136" width="4" height="8"/>
      <rect class="f-scar" x="186" y="114" width="22" height="28" rx="2"/>${P('M191 120 h4 M200 120 h4 M191 128 h4 M200 128 h4', 's-white', 2)}
      ${ANS([[108, 66], [196, 66], [108, 130], [197, 128]].map(([x, y], i) => W('a-pop', nope(x, y, 14), i * 2 + 2)).join(''))}
      ${house(150, 106, .9)}
      ${tag(150, 170, "Worst case: can't leave home", 'ans', 9.5)}`),

    /* Agoraphobia vs. specific phobia vs. PTSD */
    agoraVs: ART(`
      ${[52, 150, 248].map(x => `<rect class="wh" x="${x - 46}" y="8" width="92" height="140" rx="10"/>`).join('')}
      ${tag(52, 24, 'Many places', '', 9.5)}
      ${store(30, 56, .65)}${bus(74, 58, .6)}${crowd(52, 92, .75)}
      ${W('a-blink', T(34, 82, '!', { s: 14 }) + T(78, 82, '!', { s: 14 }) + T(52, 122, '!', { s: 14 }))}
      ${tag(150, 24, 'One thing', '', 9.5)}
      ${W('a-sway', `<path class="f-scar" d="M112 92 Q150 52 188 92 V100 H112 Z"/><path class="f-water" d="M112 100 H188 V112 H112 Z"/>`)}
      ${P('M120 92 V80 M135 92 V68 M150 92 V64 M165 92 V68 M180 92 V80', 's-line', 1.4)}
      ${tag(248, 24, 'Trauma reminder', '', 9.5)}
      ${car(232, 66, .9)}${W('a-shake', car(266, 70, .7, 'f-germ'))}${W('a-blink', star(250, 62, 6, 'f-warn'))}
      ${W('a-pulse', cloud(248, 104, .7, 'f-white', bolt(0, 0, .6)))}
      ${qtag(52, 164, 'Agoraphobia', 9.5)}${qtag(150, 164, 'Specific phobia', 9.5)}${qtag(248, 164, 'PTSD', 9.5)}`),

    /* GAD: the worrier */
    gad: ART(`
      ${person(150, 172, 1.35, { mood: 'worry', hair: 'f-stool' })}
      ${W('a-blink', P('M140 112 a2.5 2.5 0 1 0 .1 0 M132 102 a3 3 0 1 0 .1 0 M162 112 a2.5 2.5 0 1 0 .1 0 M170 102 a3 3 0 1 0 .1 0', 's-ink', 1.4))}
      ${[[56, 56, `<circle class="f-acid" r="7"/><circle class="f-acid" cx="5" cy="4" r="6"/>`], [118, 30, heart(1, 1, .9)], [184, 30, house(1, 8, .55)], [246, 56, `<rect class="f-food" x="-9" y="-5" width="18" height="12" rx="2"/><path class="s-line" d="M-4 -5 V-8 H4 V-5" style="stroke-width:1.5"/>`]]
        .map(([x, y, icon], i) => W('a-bob', cloud(x, y, 1, 'f-white', icon), i)).join('')}
      ${qtag(58, 128, 'The worrier')}
      ${calendar(212, 92, 46, 40, 4, 3, 12, 'f-vein')}
      ${qtag(236, 148, 'Months, cannot relax', 9)}
      ${tag(150, 12, 'Many worries at once', 'ans', 9.5)}`),

    /* Worry topic points to the real diagnosis */
    worryTopic: ART(`
      ${[[6, 4, 'Social performance', W('a-bob', `<rect class="f-scar" x="-2" y="-4" width="4" height="14"/><circle class="f-tumor" cx="0" cy="-8" r="6"/>`), 'Social phobia'],
        [154, 4, 'Having panic attacks', W('a-beat', heart(0, 0, 1.1)), 'Panic disorder'],
        [6, 98, 'Body sensations', W('a-pulse', `<path class="f-skin" d="M-6 10 V-2 C-6 -6 6 -6 6 -2 V10 Z"/><circle class="f-skin" cx="0" cy="-9" r="4"/>`) + P('M8 -4 l4 -3 M8 2 l5 0', 's-bad', 1.6), 'Somatic symptom'],
        [154, 98, 'Many everyday things', W('a-bob', `<circle class="f-acid" cx="-7" cy="0" r="5" style="stroke-width:1"/>` + heart(7, 0, .5) + `<rect class="f-food" x="-4" y="5" width="9" height="6" rx="1" style="stroke-width:1"/>`), 'GAD']].map(([x, y, topic, icon, dx]) =>
        `<rect class="wh" x="${x}" y="${y}" width="140" height="72" rx="10"/>${tag(x + 70, y + 13, topic, '', 9)}${cloud(x + 28, y + 46, .82, 'f-white', icon)}${P(`M${x + 49} ${y + 48} H${x + 54}`, 's-warn', 2.5)}${qtag(x + 98, y + 48, dx, 9)}`).join('')}
      ${tag(150, 87, "Don't overdiagnose GAD", 'ans', 9)}`),

    /* Free-floating anxiety without a focus: not GAD */
    freeFloat: ART(`
      ${W('a-bob', `<ellipse class="f-acid" cx="62" cy="62" rx="32" ry="36"/><circle cx="52" cy="56" r="2.4" fill="var(--art-line)"/><circle cx="72" cy="56" r="2.4" fill="var(--art-line)"/>${P('M52 76 Q57 71 62 76 Q67 81 72 76', 's-line', 1.6)}<path class="f-acid" d="M58 98 L66 98 L62 104 Z"/>${P('M62 104 q-6 10 0 18 q6 8 -2 16', 's-line', 1.2)}`)}
      ${tag(62, 16, 'No focus', '', 9.5)}
      ${qtag(62, 160, 'Not GAD')}
      ${P('M100 54 L148 36 M100 70 L148 84 M98 86 L148 134', 's-warn a-flow', 2.5)}
      ${cloud(172, 30, .7, 'f-vein')}${W('a-drop', P('M164 42 l-2 5 M174 42 l-2 5 M184 42 l-2 5', 's-vein', 2))}
      ${qtag(240, 32, 'Depression', 9.5)}
      ${brain(172, 82, .6)}${W('a-blink', P('M192 74 q5 7 0 14', 's-germ', 2))}
      ${qtag(244, 84, 'Schizophrenia', 9.5)}
      <g transform="translate(164 132) rotate(-30)"><path class="f-warn" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>
      ${W('a-shake', P('M180 124 v18 l-4 4 M188 124 v18 l4 4', 's-muscle', 3))}
      ${qtag(242, 134, 'Akathisia (meds)', 9.5)}`),

    /* GAD criteria: 6 months, hard to control, 3 of 6 symptoms */
    gadCrit: ART(`
      ${Array.from({ length: 6 }, (_, i) => `<rect class="wh" x="${12 + i * 47}" y="12" width="40" height="38" rx="4"/><rect class="f-vein" x="${12 + i * 47}" y="12" width="40" height="9" rx="3"/>` +
        ANS(check(32 + i * 47, 36, i * 1.5))).join('')}
      ${qtag(150, 66, '6+ months, most days', 9.5)}
      ${W('a-spin', P('M60 92 a20 20 0 1 1 -14 6', 's-bad', 3) + `<path class="f-bad" d="M42 92 L50 100 L40 104 Z" style="stroke-width:1"/>`)}
      ${cloud(60, 112, .5, 'f-white')}
      ${qtag(66, 150, 'Hard to control', 9.5)}
      ${Array.from({ length: 6 }, (_, i) => { const x = 190 + (i % 3) * 30, y = 98 + Math.floor(i / 3) * 28; return `<circle class="f-white" cx="${x}" cy="${y}" r="10"/>` + (i < 3 ? ANS(W('a-pop', `<circle class="f-germ" cx="${x}" cy="${y}" r="10"/>`, i * 2 + 4)) : ''); }).join('')}
      ${qtag(220, 150, '3+ of 6 symptoms', 9.5)}
      ${tag(150, 170, 'Excess worry about many things', 'ans', 9)}`),

    /* GAD symptoms: Macbeth Frets Constantly Regarding Illicit Sins */
    mfcris: ART(`
      ${[['M', 'f-muscle', ['Muscle', 'tension'], W('a-shake', P('M-12 0 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6', 's-muscle', 3))],
        ['F', 'f-warn', ['Fatigue'], `<rect class="wh" x="-12" y="-7" width="22" height="14" rx="2"/><rect class="f-white" x="10" y="-3" width="3" height="6"/>${W('a-blink', `<rect class="f-bad" x="-10" y="-5" width="5" height="10"/>`)}`],
        ['C', 'f-vein', ['Concen-', 'tration'], brain(0, 0, .45) + W('a-spin', P('M-14 -10 a2 2 0 1 0 .1 0 M14 -8 a2 2 0 1 0 .1 0 M0 14 a2 2 0 1 0 .1 0', 's-warn', 2))],
        ['R', 'f-good', ['Restless'], W('a-bob', P('M-5 -12 V6 L-9 12 M5 -12 V6 L9 12', 's-line', 3))],
        ['I', 'f-bad', ['Irritable'], W('a-pulse', puff(0, 0, .9))],
        ['S', 'f-germ', ['Sleep', 'trouble'], moon(-2, 0, 1) + W('a-blink', P('M8 -12 h6 l-6 7 h6', 's-line', 1.5))]].map(([L, c, words, icon], i) => {
        const x = 6 + i * 48.5, cx = x + 22.5;
        return tile(x, 12, 45, 46, c, L, i) + ANS(G(cx, 84, 1, icon) + words.map((w, j) => T(cx, 116 + j * 11, w, { s: 9 })).join(''));
      }).join('')}
      ${tag(150, 160, 'Macbeth Frets Constantly Regarding Illicit Sins', 'ans', 9)}`),

    /* Social anxiety disorder: fear of scrutiny; clues in the room */
    social: ART(`
      <path d="M78 0 L22 150 H134 Z" fill="var(--c-acid)" opacity=".28"/>
      ${person(78, 128, 1.25, { mood: 'worry', down: true, blush: true, hair: 'f-stool' })}
      ${W('a-drop', drop(94, 76, .55))}
      <path class="f-food" d="M56 112 H100 L96 152 H60 Z"/><rect class="f-scar" x="94" y="98" width="3" height="14"/><circle class="f-tumor" cx="95" cy="96" r="3.5"/>
      ${[20, 62, 104, 146, 188, 230, 272].map((x, i) => `<circle class="${['f-skin', 'f-food', 'f-skin', 'f-stool', 'f-skin', 'f-food', 'f-skin'][i]}" cx="${x}" cy="174" r="12"/>` +
        W('a-blink', `<circle cx="${x - 3.5}" cy="168" r="1.6" fill="var(--art-line)"/><circle cx="${x + 3.5}" cy="168" r="1.6" fill="var(--art-line)"/>`, i)).join('')}
      ${qtag(220, 24, 'Fear of scrutiny', 9.5)}
      ${qtag(220, 48, 'Fear of embarrassment', 9.5)}
      ${qtag(220, 80, 'Clue: poor eye contact', 9.5)}
      ${qtag(220, 104, 'Clue: nervous laugh, shy', 9.5)}
      ${tag(220, 134, 'Speaking, meeting, eating', 'ans', 9)}`),

    /* Social anxiety follow-up: how bad, panic, avoidance */
    socialQ: ART(`
      <path class="wh" d="M24 46 A26 26 0 0 1 76 46 Z"/>
      <path d="M28 46 A22 22 0 0 1 40 27" stroke="var(--c-good)" stroke-width="6" fill="none"/><path d="M42 26 A22 22 0 0 1 58 26" stroke="var(--c-warn)" stroke-width="6" fill="none"/><path d="M60 27 A22 22 0 0 1 72 46" stroke="var(--c-bad)" stroke-width="6" fill="none"/>
      ${FRONT('<path d="M50 46 L50 26" stroke="var(--art-line)" stroke-width="2.5" stroke-linecap="round" transform="rotate(-50 50 46)"/>')}
      ${BACK('<path d="M50 46 L50 26" stroke="var(--art-line)" stroke-width="2.5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="-60 50 46;60 50 46;-60 50 46" dur="2.6s" repeatCount="indefinite"/></path>')}
      <circle cx="50" cy="46" r="3" fill="var(--art-line)"/>
      ${W('a-beat', heart(44, 96, 1.3))}${W('a-blink', bolt(64, 92, .9))}
      ${house(34, 160, .75, 'f-germ')}${T(34, 142, '♪', { s: 11 })}
      ${P('M80 150 C66 130 92 124 98 140 C104 156 70 172 52 166', 's-ink', 1.2, ';stroke-dasharray:3 4')}
      ${BACK(`<circle class="f-warn" r="4"><animateMotion dur="2.8s" repeatCount="indefinite" path="M80 150 C66 130 92 124 98 140 C104 156 70 172 52 166"/></circle>`)}
      ${T(14, 46, '1', { s: 14 })}${T(14, 100, '2', { s: 14 })}${T(14, 152, '3', { s: 14 })}
      ${qtag(196, 40, 'How uncomfortable do you get?', 9.5)}
      ${qtag(196, 96, 'To the point of a panic attack?', 9.5)}
      ${qtag(196, 152, 'Do you avoid social events?', 9.5)}`),

    /* Specific phobia */
    phobia: ART(`
      ${tag(150, 13, 'Insects, flying, heights...', 'ans', 9)}
      ${W('a-bob', P('M60 24 V70', 's-ink', 1.2) + spider(60, 82, 1.3))}
      ${W('a-shake', person(152, 146, 1.4, { mood: 'scared', wide: true }))}
      ${W('a-blink', T(178, 82, '!', { s: 16 }))}
      ${qtag(64, 130, 'One object or situation', 9)}
      <rect class="wh" x="212" y="28" width="18" height="96" rx="9"/>
      ${FRONT('<rect class="f-bad" x="215" y="100" width="12" height="21" rx="6"/>')}
      ${BACK('<rect class="f-bad" x="215" y="100" width="12" height="21" rx="6"><animate attributeName="y" values="100;31;31;100" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/><animate attributeName="height" values="21;90;90;21" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></rect>')}
      ${qtag(221, 140, 'Intense fear', 9)}
      <rect class="f-food" x="250" y="62" width="36" height="26" rx="3"/>${P('M260 62 V56 H276 V62', 's-line', 2)}
      ${ANS(W('a-pop', nope(268, 75, 18), 3))}
      ${qtag(234, 162, 'Interferes with life', 9)}`),

    /* Why OCD gets missed: embarrassment; ask in every review */
    ocdMiss: ART(`
      ${person(76, 168, 1.5, { mood: 'worry', down: true, blush: true, body: 'f-germ' })}
      ${cloud(70, 62, 1.3, 'f-white', drop(-8, 0, .8) + `<rect class="f-tumor" x="-3" y="-10" width="22" height="20" rx="3" opacity=".9"/>` + G(8, 2, .6, lock(0, 0, 1, 'f-pancreas')))}
      ${P('M74 96 a3 3 0 1 0 .1 0 M76 106 a2 2 0 1 0 .1 0', 's-ink', 1.2)}
      ${qtag(86, 22, "Embarrassed, won't bring it up", 9)}
      ${person(258, 168, 1.5, { body: 'f-good', hair: 'f-stool' })}
      <rect class="wh" x="164" y="60" width="62" height="78" rx="4"/><rect class="f-scar" x="184" y="55" width="22" height="9" rx="3"/>
      ${T(195, 78, 'Review', { s: 9 })}
      ${['Mood', 'Anxiety', 'OCD'].map((t, i) => T(172, 96 + i * 16, t, { s: 9, a: 'start' }) + `<rect class="f-white" x="208" y="${88 + i * 16}" width="10" height="10" rx="2" style="stroke-width:1"/>`).join('')}
      ${ANS(check(213, 93, 1) + check(213, 109, 3) + check(213, 125, 5))}
      ${qtag(196, 154, 'Ask every time', 9.5)}`),

    /* OCD screening question */
    ocdScreen: ART(`
      ${[52, 150, 248].map(x => `<rect class="wh" x="${x - 46}" y="10" width="92" height="104" rx="10"/>`).join('')}
      <ellipse class="f-skin" cx="42" cy="66" rx="10" ry="15" transform="rotate(-20 42 66)"/><ellipse class="f-skin" cx="62" cy="66" rx="10" ry="15" transform="rotate(20 62 66)"/>
      ${W('a-drop', drop(44, 34, .7) + drop(60, 30, .6))}
      <circle class="f-white" cx="34" cy="86" r="4"/><circle class="f-white" cx="70" cy="84" r="3"/>
      ${W('a-shake', lock(150, 62, 1.6))}${W('a-blink', T(176, 40, '?', { s: 14 }))}
      ${W('a-blink', cloud(248, 46, .8, 'f-white') + T(248, 50, '!', { s: 12, c: 'tagtx' }))}${W('a-blink', cloud(236, 80, .5, 'f-white'), 2)}${W('a-blink', cloud(266, 84, .45, 'f-white'), 4)}
      ${qtag(52, 102, 'Washing', 9.5)}${qtag(150, 102, 'Checking', 9.5)}${qtag(248, 102, 'Intrusive thoughts', 9)}
      ${person(70, 172, 1, { mood: 'smile', body: 'f-good' })}
      ${speech(98, 128, 52, 26, 'l')}${T(124, 145, 'No!', { s: 11 })}
      ${tag(228, 141, 'Confident no = unlikely', 'ans', 9)}`),

    /* OCD types: Washing and Straightening Make Clean Houses */
    wsmch: ART(`
      <path class="f-large" d="M4 40 L150 6 L296 40 Z"/>
      ${[['W', 'f-water', ['Washing'], W('a-drop', drop(-6, 0, .8) + drop(7, 2, .6))],
        ['S', 'f-good', ['Straight-', 'ening'], `<rect class="f-white" x="-15" y="-8" width="12" height="14"/>${W('a-sway', `<rect class="f-white" x="3" y="-8" width="12" height="14"/>`)}`],
        ['M', 'f-germ', ['Mental', 'rituals'], cx => W('a-blink', T(cx, 110, '1 2 3', { s: 10 }))],
        ['C', 'f-pancreas', ['Checking'], W('a-shake', lock(0, 0, .9))],
        ['H', 'f-food', ['Hoarding'], W('a-bob', `<rect class="f-food" x="-12" y="-2" width="12" height="10"/><rect class="f-large" x="1" y="-2" width="12" height="10"/><rect class="f-pancreas" x="-6" y="-12" width="12" height="10"/>`)]].map(([L, c, words, icon], i) => {
        const x = 9 + i * 57, cx = x + 26;
        return tile(x, 44, 52, 42, c, L, i) + ANS((typeof icon === 'function' ? icon(cx) : G(cx, 106, 1, icon)) + words.map((w, j) => T(cx, 132 + j * 11, w, { s: 9 })).join(''));
      }).join('')}
      ${tag(150, 166, 'Washing and Straightening Make Clean Houses', 'ans', 9)}`),

    /* Obsessions vs. compulsions: thought raises anxiety, act lowers it, loop repeats */
    obsComp: ART(`
      ${P('M232 34 C200 2 100 2 68 34', 's-warn a-flow-slow', 2.5)}<path class="f-warn" d="M66 26 L68 36 L76 32 Z" style="stroke-width:1"/>
      ${W('a-pulse', cloud(56, 72, 1.3, 'f-white', G(0, 0, .8, `<rect class="f-germ" x="-8" y="-4" width="16" height="8" rx="4"/>`)))}
      ${P('M92 76 H128', 's-bad a-flow', 2.5)}
      <rect class="wh" x="138" y="34" width="24" height="96" rx="12"/>
      ${FRONT('<rect class="f-bad" x="141" y="96" width="18" height="31" rx="9"/>')}
      ${BACK('<rect class="f-bad" x="141" y="96" width="18" height="31" rx="9"><animate attributeName="y" values="110;38;38;110;110" keyTimes="0;.35;.55;.8;1" dur="4s" repeatCount="indefinite"/><animate attributeName="height" values="17;89;89;17;17" keyTimes="0;.35;.55;.8;1" dur="4s" repeatCount="indefinite"/></rect>')}
      ${tag(150, 144, 'anxiety', '', 9.5)}
      ${P('M172 76 H208', 's-good a-flow', 2.5)}
      <ellipse class="f-skin" cx="236" cy="78" rx="9" ry="14" transform="rotate(-20 236 78)"/><ellipse class="f-skin" cx="254" cy="78" rx="9" ry="14" transform="rotate(20 254 78)"/>
      ${W('a-drop', drop(240, 48, .6) + drop(252, 44, .5))}
      ${qtag(56, 112, 'Obsession', 10)}${ANS(T(56, 128, 'thought, urge, image', { s: 9 }))}
      ${qtag(246, 112, 'Compulsion', 10)}${ANS(T(246, 128, 'driven act, eases it', { s: 9 }))}
      ${tag(150, 166, 'OCD needs either one', 'ans', 9.5)}`),

    /* Is it really OCD? driven + time-consuming */
    driven: ART(`
      <rect class="f-food" x="20" y="22" width="60" height="104" rx="4"/><circle class="f-acid" cx="68" cy="76" r="4"/>
      ${W('a-shake', lock(66, 96, .8))}
      ${Array.from({ length: 20 }, (_, i) => { const g = Math.floor(i / 5), k = i % 5, x = 100 + g * 22 + k * 4; return ANS(W('a-pop', k === 4 ? P(`M${x - 18} 58 L${x + 1} 34`, 's-bad', 2) : P(`M${x} 34 V58`, 's-line', 2), i)); }).join('')}
      ${qtag(140, 74, 'Checks 10-20 times', 9.5)}
      ${clock(246, 52, 28, 1.6, 0)}
      ${qtag(246, 98, 'Takes lots of time', 9.5)}
      ${qtag(78, 146, 'Feels driven, uneasy if not', 9)}
      ${qtag(224, 146, 'Interferes with daily life', 9)}
      ${tag(150, 170, 'Both are needed to call it OCD', 'ans', 9)}`),

    /* Measure impairment: time to get ready in the morning */
    impair: ART(`
      ${qtag(150, 14, 'How long to get ready in the morning?', 9.5)}
      ${W('a-pulse', `<circle class="f-warn" cx="28" cy="46" r="11"/>`)}${P('M28 28 V24 M12 46 H8 M44 46 H48 M16 34 l-3 -3 M40 34 l3 -3', 's-warn', 2)}
      <rect class="f-water" x="60" y="34" width="56" height="56" rx="28" opacity=".85"/>
      ${person(88, 148, 1.3, { mood: 'worry', body: 'f-germ' })}
      <rect class="f-white" x="56" y="122" width="64" height="12" rx="4"/>
      ${W('a-drop', drop(76, 110, .5) + drop(98, 112, .4))}
      ${clock(222, 80, 40, 1.2, 0)}
      ${BACK(`<path d="M222 80 V58" stroke="var(--c-vein)" stroke-width="4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="210 222 80;300 222 80" dur="3.6s" repeatCount="indefinite"/></path>`)}
      ${T(222, 108, 'AM', { s: 9 })}
      ${qtag(222, 140, 'Rituals: 2-3+ hours', 9.5)}
      ${tag(150, 168, 'Cleaning + dressing rituals eat the morning', 'ans', 9)}`),

    /* PTSD screening: name it and give trauma examples */
    ptsdScreen: ART(`
      ${speech(90, 10, 200, 74, 'l')}
      ${W('a-pop', `<path class="f-bad" d="M130 28 L146 34 V46 C146 54 138 60 130 64 C122 60 114 54 114 46 V34 Z"/>${T(130, 50, '!', { c: 'on', s: 13 })}`, 0)}
      ${W('a-pop', cloud(190, 38, .6, 'f-scar') + bolt(190, 56, .7), 2)}
      ${W('a-pop', car(244, 44, .8) + star(262, 34, 5, 'f-warn'), 4)}
      ${tag(130, 74, 'Attack', 'ans', 9)}${tag(190, 74, 'Disaster', 'ans', 9)}${tag(250, 74, 'Crash', 'ans', 9)}
      ${person(46, 150, 1.4, { body: 'f-good', hair: 'f-stool' })}
      ${person(250, 150, 1.25, { mood: 'flat' })}
      ${W('a-blink', bulb(278, 104, .8))}
      ${qtag(140, 110, 'Name it + give examples', 9.5)}
      ${tag(150, 168, 'Examples help recall; "no" = unlikely', 'ans', 9.5)}`),

    /* PTSD mnemonic: Remembers Atrocious Nuclear Attacks */
    rana: ART(`
      ${[['R', 'f-vein', ['Re-', 'experiencing'], W('a-spin', `<circle class="f-tumor" r="12"/>${[0, 72, 144, 216, 288].map(a => `<circle class="f-white" cx="0" cy="-6.5" r="3" transform="rotate(${a})" style="stroke-width:.8"/>`).join('')}`)],
        ['A', 'f-warn', ['Avoidance'], `<rect class="f-scar" x="-2" y="-2" width="4" height="16"/>` + W('a-sway', `<circle class="f-bad" cx="0" cy="-6" r="10"/><rect class="f-white" x="-6" y="-8" width="12" height="4" style="stroke-width:.8"/>`)],
        ['N', 'f-scar', ['Negative', 'mood'], W('a-bob', cloud(0, -2, .6, 'f-scar')) + W('a-drop', P('M-6 8 l-1 4 M2 8 l-1 4', 's-vein', 2))],
        ['A', 'f-bad', ['Arousal'], W('a-pulse', eye(0, 0, 1)) + P('M-16 -10 l-4 -4 M16 -10 l4 -4 M0 -13 v-5', 's-warn', 2)]].map(([L, c, words, icon], i) => {
        const x = 10 + i * 71, cx = x + 32;
        return tile(x, 12, 64, 48, c, L, i) + ANS(G(cx, 86, 1, icon) + words.map((w, j) => T(cx, 118 + j * 11, w, { s: 9 })).join(''));
      }).join('')}
      ${tag(150, 150, 'Remembers Atrocious Nuclear Attacks', 'ans', 9.5)}
      ${tag(150, 170, 'After a trauma, lasting 1+ month', 'ans', 9)}`),

    /* PTSD criteria: trauma, then RANA for at least a month */
    ptsdCrit: ART(`
      ${qtag(150, 16, 'Trauma: real or threatened death or injury', 9)}
      ${cloud(46, 66, 1, 'f-scar')}${W('a-blink', bolt(46, 92, 1.4))}
      ${arrowR(72, 86, 96)}
      ${[['Re-exp', 'f-vein'], ['Avoid', 'f-warn'], ['Neg mood', 'f-scar'], ['Arousal', 'f-bad']].map(([t, c], i) => { const x = 100 + (i % 2) * 50, y = 44 + Math.floor(i / 2) * 42; return `<rect class="${c}" x="${x}" y="${y}" width="46" height="36" rx="8"/>` + ANS(W('a-pop', T(x + 23, y + 22, t, { c: 'on', s: 9 }), i + 1)); }).join('')}
      ${q(148, 84, 11)}
      ${arrowR(202, 86, 222)}
      ${calendar(226, 50, 64, 72, 6, 5, 30)}
      ${qtag(258, 138, '1+ month', 9.5)}
      ${qtag(148, 138, 'RANA symptoms', 9.5)}
      ${tag(150, 166, 'Self or others; then all 4 groups', 'ans', 9)}`),

    /* Asking about the trauma: let the patient stay vague */
    vague: ART(`
      ${speech(8, 10, 176, 44, 'l')}
      ${qtag(96, 32, 'What sort of experience was it?', 9.5)}
      ${person(44, 150, 1.4, { body: 'f-good', hair: 'f-stool' })}
      ${speech(140, 66, 150, 40, 'r')}
      ${W('a-bob', `<g opacity=".45">${cloud(176, 86, .6, 'f-scar')}${cloud(262, 84, .5, 'f-scar')}</g>`)}
      ${ANS(T(215, 90, 'It was... a bad time.', { s: 9.5 }))}
      ${person(248, 154, 1.3, { mood: 'flat', down: true })}
      ${q(215, 86, 9)}
      ${tag(150, 170, 'Allow vagueness: avoidance is part of PTSD', 'ans', 9.5)}`),

    /* Re-experiencing: memories, nightmares, flashbacks */
    reexp: ART(`
      ${tag(150, 13, 'The trauma comes back', 'ans', 9.5)}
      ${[52, 150, 248].map(x => `<rect class="wh" x="${x - 46}" y="24" width="92" height="116" rx="10"/>`).join('')}
      ${person(52, 132, 1.1, { mood: 'worry' })}
      ${W('a-pulse', cloud(52, 62, 1, 'f-white', bolt(0, 0, .7)))}
      ${moon(176, 42, .8)}
      <rect class="f-vein" x="112" y="104" width="76" height="14" rx="3"/><rect class="f-vein" x="110" y="90" width="6" height="28" rx="2"/>
      ${person(134, 108, .7, { mood: 'scared', wide: true, body: 'f-germ' })}<path class="f-germ" d="M140 98 H186 V106 H140 Z"/>
      ${W('a-blink', cloud(150, 62, .75, 'f-tumor', bolt(0, 0, .6)))}
      ${filmStrip(212, 40, 72, 30)}${bolt(230, 55, .55)}${bolt(266, 55, .55)}
      ${W('a-spin', P('M248 82 a10 10 0 1 1 -8 4', 's-warn', 2.5) + `<path class="f-warn" d="M236 80 L242 88 L234 90 Z" style="stroke-width:1"/>`)}
      ${person(248, 136, .8, { mood: 'scared', wide: true })}
      ${qtag(52, 156, 'Memories', 9.5)}${qtag(150, 156, 'Nightmares', 9.5)}${qtag(248, 156, 'Flashbacks', 9.5)}
      ${tag(248, 172, 'feels back there', 'ans', 9)}`),

    /* Avoidance: car crash, then won't drive */
    avoidP: ART(`
      ${cloud(68, 52, 1.6, 'f-white', G(0, 0, .6, car(-6, 2, 1) + `<g transform="rotate(25 14 -4)">${car(16, -2, .9, 'f-germ')}</g>`) + star(0, -8, 4, 'f-warn'))}
      ${P('M64 92 a3 3 0 1 0 .1 0 M66 102 a2 2 0 1 0 .1 0', 's-ink', 1.2)}
      ${person(66, 158, 1.3, { mood: 'worry' })}
      ${qtag(210, 18, 'Avoids reminders', 9.5)}
      <rect class="f-scar" x="128" y="36" width="166" height="22" rx="4"/>${P('M134 47 H288', 's-white', 2, ';stroke-dasharray:8 6')}
      ${car(210, 46, 1)}${ANS(W('a-pulse', nope(210, 46, 17)))}
      ${qtag(210, 80, 'Car crash: stops driving', 9.5)}
      ${P('M134 112 C164 160 252 160 282 112', 's-ink', 1.4, ';stroke-dasharray:3 4')}
      ${BACK(`<g>${person(0, 0, .5, { body: 'f-warn' })}<animateMotion dur="3s" repeatCount="indefinite" path="M134 112 C164 160 252 160 282 112"/></g>`)}
      ${tag(150, 170, 'Ask about the specific trauma', 'ans', 9.5)}`),

    /* Negative cognitions and mood (once called numbing) */
    neg: ART(`
      ${tag(150, 14, 'Once called "numbing"', 'ans', 9.5)}
      <circle class="f-good" cx="34" cy="42" r="10" opacity=".55"/>${P('M24 42 H44 M34 32 V52', 's-line', 1.2, ';opacity:.55')}
      ${T(66, 48, '♪', { s: 16 })}
      ${ANS(W('a-pop', nope(34, 42, 13), 1) + W('a-pop', nope(64, 42, 13), 2))}
      ${qtag(50, 72, 'Lost interest', 9.5)}
      ${person(52, 166, 1.35, { mood: 'flat', body: 'f-scar' })}
      ${person(150, 166, 1.05, { body: 'f-good', hair: 'f-stool' })}${person(178, 166, .85, { body: 'f-warn' })}
      ${W('a-blink', heart(102, 118, 1))}
      ${P('M74 124 H94 M110 124 H132', 's-ink', 1.2, ';stroke-dasharray:2 4')}
      ${qtag(140, 90, 'Hard to feel close', 9.5)}
      ${P('M218 170 L240 52 M286 170 L256 52', 's-line', 2)}${P('M252 168 L248 60', 's-white a-flow-slow', 2)}
      ${W('a-bob', `<g opacity=".85">${cloud(248, 46, 1, 'f-scar')}</g>`)}
      ${qtag(246, 76, 'No future', 9.5)}
      ${tag(246, 128, 'gloomy view of self', 'ans', 9)}`),

    /* Hyperarousal: hypervigilance and startle are most specific */
    arousal: ART(`
      ${tag(90, 13, 'Most specific to PTSD', 'ans', 9.5)}
      <circle cx="52" cy="114" r="36" fill="var(--c-good)" fill-opacity=".12" stroke="var(--c-good)" stroke-width="1.5" stroke-dasharray="3 4"/>
      ${BACK(`<path d="M52 114 L52 78 A36 36 0 0 1 78 89 Z" fill="var(--c-good)" fill-opacity=".45"><animateTransform attributeName="transform" type="rotate" from="0 52 114" to="360 52 114" dur="2.4s" repeatCount="indefinite"/></path>`)}
      ${person(52, 150, 1.2, { mood: 'flat', wide: true })}
      ${qtag(52, 64, 'Hypervigilance', 9.5)}
      ${W('a-bob', person(150, 150, 1.2, { mood: 'scared', wide: true, body: 'f-germ' }))}
      ${W('a-pulse', puff(118, 92, .9).replace('f-bad', 'f-acid'))}${W('a-blink', T(176, 100, '!', { s: 18 }))}
      ${qtag(150, 36, 'Exaggerated startle', 9.5)}
      ${moon(212, 52, .8)}${qtag(254, 52, 'Insomnia', 9.5)}
      ${W('a-pulse', puff(212, 88, .7))}${qtag(254, 88, 'Irritability', 9.5)}
      ${brain(212, 124, .45)}${qtag(254, 124, 'Poor focus', 9.5)}
      ${tag(246, 164, 'Also in depression', 'ans', 9)}`),
  });
})();
