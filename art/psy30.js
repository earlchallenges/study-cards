/* Psychiatric Interview Ch 30 (ADHD) art: colorful replacements for PICS, loaded after the page sets PICS.
   Everything lives inside one function so the little helpers never clash with other art files. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  // text: o.c = class (ink on the background, tagtx on white), o.s = size, o.a = anchor, o.w = weight
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const W = (x, y, t, o = {}) => T(x, y, t, Object.assign({ c: 'tagtx' }, o)); // dark text for white bubbles
  const dash = d => `<path class="s-ink" d="${d}" style="stroke-width:1.2;stroke-dasharray:3 4" opacity=".6"/>`;

  // a friendly person standing on (x, y); s = size (kid ~.7, adult ~1)
  const person = (x, y, s = 1, o = {}) => {
    const shirt = o.shirt || 'vein', hair = o.hair || 'stool';
    const arms = o.arms === 'up' ? 'M-10 -32 L-18 -48 M10 -32 L18 -48' : o.arms === 'wave' ? 'M-10 -32 L-17 -16 M10 -32 L20 -46' : 'M-10 -32 L-15 -15 M10 -32 L15 -15';
    const mouth = o.mouth === 'open' ? '<ellipse cx="0" cy="-41" rx="3" ry="2.4" fill="#7a2e3b"/>' : o.mouth === 'flat' ? '<path d="M-3 -41 H3" stroke="#3b2430" stroke-width="1.3"/>' : '<path d="M-3.5 -42 Q0 -38.5 3.5 -42" fill="none" stroke="#3b2430" stroke-width="1.3" stroke-linecap="round"/>';
    return G(x, y, s, `
      <path d="M-5 -15 V0 M5 -15 V0" stroke="#3d405b" stroke-width="5" stroke-linecap="round"/>
      <path d="${arms}" stroke="var(--c-skin)" stroke-width="4.5" stroke-linecap="round"/>
      <rect class="f-${shirt}" x="-11" y="-37" width="22" height="24" rx="8"/>
      <circle class="f-skin" cx="0" cy="-46" r="10"/>
      <path class="f-${hair}" d="M-10 -47 Q-10 -57 0 -57 Q10 -57 10 -47 Q4 -53 -3 -51 Q-7 -50 -10 -47 Z"/>
      ${o.hat ? '<path class="f-nerve" d="M-7 -55 L0 -70 L7 -55 Z"/><circle class="f-bad" cx="0" cy="-70" r="2.5"/>' : ''}
      <circle cx="-3.5" cy="-46" r="1.4" fill="#3b2430"/><circle cx="3.5" cy="-46" r="1.4" fill="#3b2430"/>${mouth}`);
  };
  // speech bubble with its tail pointing down to (px, py)
  const say = (x, y, w, h, px, py, cls = 'f-white') => {
    const r = 8, tx = Math.min(Math.max(px, x + 16), x + w - 16);
    return `<path class="${cls}" d="M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${tx + 6} L${px} ${py} L${tx - 6} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z"/>`;
  };
  // thought cloud: outlined puffs, then the same puffs again without lines so only the outside edge shows
  const cloud = (cx, cy, w, h) => {
    const puffs = [[0, 0, .5], [-.3, -.15, .32], [.3, -.15, .32], [-.38, .12, .28], [.38, .12, .28], [0, -.3, .3], [0, .25, .3]]
      .map(([a, b, r]) => [cx + a * w, cy + b * h * 1.3, r * Math.min(w, h * 1.4)]);
    return puffs.map(([a, b, r]) => `<circle class="f-white" cx="${a}" cy="${b}" r="${r}" style="stroke-width:3"/>`).join('') +
      puffs.map(([a, b, r]) => `<circle class="f-white noline" cx="${a}" cy="${b}" r="${r}"/>`).join('');
  };
  const house = (x, y, s = 1, cls = 'f-vein') => G(x, y, s, `<rect class="${cls}" x="-14" y="-20" width="28" height="20"/><path class="f-bad" d="M-18 -19 L0 -34 L18 -19 Z"/><rect class="f-white" x="-4" y="-11" width="8" height="11"/><rect class="f-nerve" x="6" y="-16" width="6" height="6"/>`);
  const school = (x, y, s = 1) => G(x, y, s, `<rect class="f-blood" x="-18" y="-22" width="36" height="22"/><path class="f-warn" d="M-21 -21 L0 -36 L21 -21 Z"/><path class="s-line" d="M0 -36 V-48" style="stroke-width:1.5"/><path class="f-good" d="M0 -48 L10 -45 L0 -42 Z"/><rect class="f-white" x="-4" y="-12" width="8" height="12"/><rect class="f-mucus" x="-14" y="-17" width="7" height="6"/><rect class="f-mucus" x="7" y="-17" width="7" height="6"/>`);
  const office = (x, y, s = 1) => G(x, y, s, `<rect class="f-scar" x="-13" y="-40" width="26" height="40"/>` +
    [0, 1, 2, 3].map(r => [0, 1].map(c => `<rect class="f-mucus" x="${-9 + c * 11}" y="${-35 + r * 8}" width="7" height="5"/>`).join('')).join('') + `<rect class="f-white" x="-4" y="-7" width="8" height="7"/>`);
  const check = (x, y, d = 0, r = 6) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="${r}"/><path class="s-white" d="M${x - r * .5} ${y} l${r * .36} ${r * .38} l${r * .65} ${-r * .72}" style="stroke-width:1.8"/></g>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const gear = (x, y, r = 7) => `<g transform="translate(${x} ${y})"><g class="a-spin"><path class="f-scar" d="${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4, b = a + .3, c = a - .3; return `${i ? 'L' : 'M'}${(r * Math.cos(c)).toFixed(1)} ${(r * Math.sin(c)).toFixed(1)} L${(r * 1.35 * Math.cos(c + .08)).toFixed(1)} ${(r * 1.35 * Math.sin(c + .08)).toFixed(1)} L${(r * 1.35 * Math.cos(b - .08)).toFixed(1)} ${(r * 1.35 * Math.sin(b - .08)).toFixed(1)} L${(r * Math.cos(b)).toFixed(1)} ${(r * Math.sin(b)).toFixed(1)}`; }).join(' ')} Z"/><circle class="f-nerve" r="${r * .4}"/></g></g>`;
  const dots9 = (x, y, lit, cls, step = 16, r = 5.5, cols = 9) => Array.from({ length: 9 }, (_, i) => `<circle cx="${x + (i % cols) * step}" cy="${y + Math.floor(i / cols) * step}" r="${r}" fill="none" stroke="var(--pic-ink)" stroke-width="1.2" opacity=".55"/>`).join('') +
    `<g class="ans">${Array.from({ length: lit }, (_, i) => `<circle class="${cls} a-pop" style="--d:${i}" cx="${x + (i % cols) * step}" cy="${y + Math.floor(i / cols) * step}" r="${r}"/>`).join('')}</g>`;
  const pillBottle = (x, y, s = 1) => G(x, y, s, `<rect class="f-warn" x="-12" y="-30" width="24" height="32" rx="4"/><rect class="f-white" x="-14" y="-38" width="28" height="9" rx="2"/><rect class="f-white" x="-9" y="-22" width="18" height="15" rx="2"/>`);
  const tile = (x, y, letter, cls, d) => `<rect class="${cls}" x="${x}" y="${y}" width="28" height="28" rx="6"/>${q(x + 14, y + 14, 8)}<g class="ans"><g class="a-pop" style="--d:${d}">${T(x + 14, y + 21, letter, { c: 'on', s: 19, w: 800 })}</g></g>`;

  Object.assign(PICS, {

    /* 1. Screening question: clinician asks about school days; patient remembers childhood */
    screen: ART(`
      <g class="a-bob">${cloud(232, 54, 104, 54)}
        <rect class="f-food" x="206" y="66" width="44" height="5"/><path class="s-line" d="M212 71 V82 M244 71 V82" style="stroke-width:2"/>
        <rect class="f-good" x="196" y="28" width="56" height="20" rx="2"/>${T(224, 42, 'A B C', { c: 'on', s: 10 })}
        <g class="a-shake">${person(228, 74, .55, { shirt: 'warn', arms: 'up', mouth: 'open' })}</g>
      </g>
      <circle class="f-white" cx="262" cy="96" r="4"/><circle class="f-white" cx="266" cy="106" r="2.6"/>
      ${person(262, 172, 1, { shirt: 'spleen', hair: 'food', mouth: 'flat' })}
      ${person(40, 172, 1, { shirt: 'good' })}
      ${say(6, 8, 148, 54, 46, 112)}
      ${q(80, 34, 12)}
      <g class="ans"><g class="a-fadein" style="--d:0">${W(80, 26, 'As a kid, any trouble with')}${W(80, 39, 'hyperactivity or paying')}${W(80, 52, 'attention in school?')}</g></g>
      ${say(64, 74, 92, 24, 52, 114)}
      ${q(110, 86, 8)}
      <g class="ans"><g class="a-fadein" style="--d:3">${W(110, 90, 'If yes: still now?')}</g></g>
      ${tag(232, 13, 'Thinks back to school', '', 9)}`),

    /* 2. DSM-5 criteria: 6 of 9 in a cluster, 5 at 17+, before 12, two settings */
    criteria: ART(`
      ${T(6, 34, 'Inattention', { a: 'start', s: 10 })}
      ${dots9(98, 30, 6, 'f-vein')}
      ${tag(162, 50, 'OR', '', 9.5)}
      ${T(6, 74, 'Hyper/impulsive', { a: 'start', s: 9.5 })}
      ${dots9(98, 70, 6, 'f-warn')}
      ${qtag(262, 50, '6 of 9')}
      ${qtag(162, 94, 'Age 17+: only 5 of 9', 9.5)}
      <rect class="f-pancreas" x="40" y="132" width="60" height="22" rx="4"/>
      <rect class="f-mouth" x="46" y="118" width="48" height="16" rx="4"/>
      <path class="s-line" d="M58 118 V108 M70 118 V108 M82 118 V108" style="stroke-width:2"/>
      <g class="a-blink"><circle class="f-warn" cx="58" cy="105" r="3"/><circle class="f-warn" cx="70" cy="105" r="3"/><circle class="f-warn" cx="82" cy="105" r="3"/></g>
      ${q(70, 144, 8)}<g class="ans">${T(70, 149, '12', { c: 'tagtx', s: 13, w: 800 })}</g>
      ${qtag(70, 168, 'Some before age 12', 9.5)}
      ${school(186, 152, 1)}${house(262, 152, 1.05)}
      <path class="s-warn a-flow" d="M208 140 L244 140" style="stroke-width:2.5"/>
      <g class="ansmotion"><g><circle class="f-nerve" cx="0" cy="0" r="4"/><animateMotion dur="2.4s" repeatCount="indefinite" path="M206 132 L246 132 L206 132"/></g></g>
      ${qtag(224, 168, '2+ settings', 10)}`),

    /* 3. MOAT mnemonic: letter tiles pop in beside a school ringed by a moat */
    moat: ART(`
      ${tile(8, 8, 'M', 'f-blood', 0)}${tile(8, 50, 'O', 'f-warn', 1)}${tile(8, 92, 'A', 'f-good', 2)}${tile(8, 134, 'T', 'f-spleen', 3)}
      ${qtag(104, 22, 'Movement excess')}${qtag(104, 64, 'Organization problems', 9.5)}
      ${qtag(104, 106, 'Attention problems')}${qtag(104, 148, 'Talking impulsively')}
      <ellipse class="f-water" cx="245" cy="100" rx="50" ry="40"/>
      <ellipse class="s-white a-flow-slow" cx="245" cy="100" rx="43" ry="33" style="stroke-width:1.5"/>
      <ellipse class="f-good" cx="245" cy="104" rx="30" ry="20"/>
      ${school(245, 110, 1)}
      <g class="a-bob">${person(268, 116, .45, { shirt: 'warn', arms: 'up', mouth: 'open' })}</g>
      ${tag(245, 162, 'Classroom moat', '', 9.5)}`),

    /* 4. Inattention / disorganization: messy backpack, lost keys, unfinished bar; butterfly steals focus */
    inatt: ART(`
      <path class="s-ink" d="M150 24 V172" style="stroke-width:1.2;stroke-dasharray:3 4" opacity=".5"/>
      ${tag(70, 12, 'Organization', '', 10)}${tag(226, 12, 'Attention', '', 10)}
      <g class="ans">
        <g class="a-rise"><rect class="f-white" x="22" y="30" width="12" height="15" transform="rotate(-20 28 37)"/></g>
        <g class="a-rise" style="animation-delay:.6s"><rect class="f-white" x="44" y="28" width="12" height="15" transform="rotate(15 50 35)"/></g>
      </g>
      <rect class="f-vein" x="18" y="44" width="40" height="40" rx="9"/><rect class="f-mucus" x="24" y="62" width="28" height="16" rx="4"/>
      <path class="s-line" d="M28 44 Q38 30 48 44" style="stroke-width:2"/>
      <g class="a-sway"><circle cx="108" cy="54" r="15" fill="none" stroke="var(--pic-ink)" stroke-width="2.5"/><path class="s-ink" d="M119 65 L130 76" style="stroke-width:3.5"/></g>
      <circle class="f-nerve" cx="104" cy="54" r="5"/><path class="s-nerve" d="M108 54 H116" style="stroke-width:3"/>
      ${qtag(46, 100, "Can't organize", 9.5)}${qtag(110, 84, 'Loses things', 9.5)}
      <rect x="20" y="118" width="110" height="12" rx="6" fill="none" stroke="var(--pic-ink)" stroke-width="1.5"/>
      <g class="ans"><rect class="f-warn" x="21" y="119" width="48" height="10" rx="5"><animate attributeName="width" values="0;48;48" keyTimes="0;.6;1" dur="3s" repeatCount="indefinite"/></rect></g>
      ${qtag(75, 146, "Doesn't finish", 9.5)}
      ${person(200, 150, .72, { shirt: 'good', hair: 'liver' })}
      <rect class="f-food" x="170" y="128" width="82" height="7" rx="2"/><path class="s-line" d="M176 135 V168 M246 135 V168" style="stroke-width:2.5"/>
      <rect class="f-white" x="186" y="120" width="22" height="8" rx="1"/>
      <rect class="f-white" x="250" y="96" width="26" height="32" rx="2"/>
      <g class="ans"><path class="s-bad a-pop" style="--d:0" d="M255 104 l6 6 m0 -6 l-6 6" stroke-width="2"/><path class="s-bad a-pop" style="--d:2" d="M264 114 l6 6 m0 -6 l-6 6"/></g>
      <path class="s-ink" d="M255 120 H271" style="stroke-width:1.2" opacity=".6"/>
      <g class="ansmotion"><g><path class="f-spleen" d="M0 0 C-8 -9 -12 -1 -2 2 C-12 5 -8 12 0 3 C8 12 12 5 2 2 C12 -1 8 -9 0 0 Z"/><animateMotion dur="4s" repeatCount="indefinite" path="M214 104 C240 60 290 70 276 54 C262 40 218 50 196 66 C180 78 196 104 214 104 Z"/></g></g>
      ${qtag(226, 36, 'Easily distracted', 9.5)}${qtag(226, 166, 'Forgetful, careless', 9.5)}`),

    /* 5. Hyperactivity / impulsivity: blurting over a friend; fidgety kid bouncing out of the seat */
    hyper: ART(`
      <path class="s-ink" d="M150 24 V172" style="stroke-width:1.2;stroke-dasharray:3 4" opacity=".5"/>
      ${say(84, 32, 60, 22, 118, 122)}${W(114, 47, '. . .')}
      ${person(118, 172, .8, { shirt: 'gall', hair: 'large', mouth: 'flat' })}
      <g class="a-pulse">${say(8, 50, 90, 32, 40, 124, 'f-nerve')}</g>
      ${q(53, 66, 9)}<g class="ans">${W(53, 70, 'Me! Me! I know!', { s: 9.5 })}</g>
      ${person(40, 172, .8, { shirt: 'warn', arms: 'up', mouth: 'open' })}
      ${qtag(75, 18, 'Talks a lot, blurts', 9.5)}${qtag(84, 104, 'Interrupts', 9.5)}
      <rect class="f-food" x="198" y="138" width="46" height="6" rx="2"/><rect class="f-food" x="240" y="104" width="6" height="40" rx="2"/>
      <path class="s-line" d="M202 144 V172 M240 144 V172" style="stroke-width:2.5"/>
      <g class="a-bob" style="animation-duration:.6s"><g class="a-shake">${person(220, 150, .8, { shirt: 'vein', arms: 'wave', mouth: 'open' })}</g></g>
      <g class="ans a-blink"><path class="s-warn" d="M188 100 Q184 110 188 120 M180 104 Q176 112 180 120 M256 84 Q262 92 258 100" style="stroke-width:2"/></g>
      ${qtag(226, 34, 'Fidgets, leaves seat', 9.5)}${qtag(226, 58, "Can't wait a turn", 9.5)}`),

    /* 6. DSM-5 changes: onset flag slides from 7 to 12; adults need 5 of 9, kids 6 of 9 */
    adultVsKid: ART(`
      ${tag(150, 11, 'DSM-5 changes', '', 9.5)}
      <path class="s-ink" d="M24 52 H276" style="stroke-width:2"/>
      ${[0, 3, 6, 9, 12, 15, 18].map(a => `<path class="s-ink" d="M${24 + a * 14} 48 V56" style="stroke-width:1.5"/>${T(24 + a * 14, 67, a, { s: 9 })}`).join('')}
      ${T(8, 44, 'Age', { s: 9, a: 'start' })}
      <g class="ans"><path class="s-scar" d="M122 52 V28" style="stroke-width:2"/><path class="f-scar" d="M122 28 L138 33 L122 38 Z"/><path class="s-bad" d="M114 30 L134 46 M134 30 L114 46" style="stroke-width:2.5"/></g>
      ${q(192, 36, 9)}
      <g class="ans"><g><path class="s-line" d="M192 52 V24" style="stroke-width:2"/><path class="f-good" d="M192 24 L210 30 L192 36 Z"/>
        <animateTransform attributeName="transform" type="translate" values="-70 0;-70 0;0 0;0 0" keyTimes="0;.2;.6;1" dur="3.4s" repeatCount="indefinite"/></g>
        <path class="f-good noline" d="M24 49 H192 V55 H24 Z" opacity=".35"/></g>
      ${qtag(116, 80, 'Was 7', 9.5)}${qtag(200, 80, 'Now before 12', 9.5)}
      <rect x="8" y="94" width="138" height="82" rx="10" fill="var(--c-lymph)" opacity=".35"/>
      <rect x="154" y="94" width="138" height="82" rx="10" fill="var(--c-nerve)" opacity=".25"/>
      ${person(30, 152, .7, { shirt: 'warn' })}${dots9(64, 106, 6, 'f-warn', 18, 6, 3)}
      ${person(180, 154, .78, { shirt: 'spleen', hair: 'food' })}${dots9(214, 106, 5, 'f-spleen', 18, 6, 3)}
      ${qtag(80, 164, 'Kids: 6 of 9')}${qtag(226, 164, 'Age 17+: 5 of 9', 9.5)}`),

    /* 7. Easier in kids: a parent reports; an adult has to prove a fading childhood */
    kids: ART(`
      <path class="s-ink" d="M150 24 V172" style="stroke-width:1.2;stroke-dasharray:3 4" opacity=".5"/>
      ${tag(40, 12, 'Child', '', 10)}${tag(262, 12, 'Adult', '', 10)}
      ${say(8, 26, 136, 40, 50, 114)}
      ${q(76, 46, 10)}
      <g class="ans"><g class="a-fadein">${W(76, 43, 'He fidgets in class')}${W(76, 57, 'and at home too!')}</g></g>
      ${person(48, 172, .95, { shirt: 'gall', hair: 'liver' })}
      <g class="a-bob">${person(96, 172, .62, { shirt: 'warn', arms: 'up' })}</g>
      ${qtag(104, 92, 'Parent reports', 9.5)}
      ${cloud(210, 62, 96, 56)}
      <g class="a-blink"><rect x="190" y="40" width="40" height="40" rx="2" fill="#e9d8b8" stroke="#8d5b3a" stroke-width="1.5"/>${person(210, 76, .5, { shirt: 'warn' })}</g>
      ${q(240, 44, 7)}
      <circle class="f-white" cx="256" cy="100" r="3.6"/><circle class="f-white" cx="258" cy="110" r="2.4"/>
      ${person(258, 172, .95, { shirt: 'vein', hair: 'food', mouth: 'flat' })}
      ${qtag(203, 104, 'Prove childhood?', 9)}`),

    /* 8. No test: lab tube and brain scan crossed out; reports from people flow into the diagnosis */
    noTest: ART(`
      <rect class="f-white" x="30" y="22" width="14" height="44" rx="7"/><rect class="f-blood noline" x="32" y="44" width="10" height="20" rx="5"/>
      <circle class="f-mouth" cx="92" cy="44" r="20"/><path class="s-line" d="M84 36 Q92 42 86 50 M98 32 Q94 42 102 48" style="stroke-width:1.5" opacity=".6"/>
      ${q(37, 44, 8)}${q(92, 44, 8)}
      <g class="ans"><g class="a-pop" style="--d:0">${nope(37, 44, 16)}</g><g class="a-pop" style="--d:1">${nope(92, 44, 22)}</g></g>
      ${qtag(64, 84, 'No lab or scan test', 9.5)}
      <rect class="f-food" x="40" y="106" width="52" height="68" rx="5"/><rect class="f-white" x="46" y="114" width="40" height="56" rx="2"/>
      <rect class="f-scar" x="56" y="101" width="20" height="9" rx="3"/>
      ${[0, 1, 2].map(i => `<path class="s-ink" d="M60 ${128 + i * 14} H80" style="stroke-width:1.5" opacity=".5"/>${check(53, 128 + i * 14, i * 2, 4.5)}`).join('')}
      <path class="s-warn a-flow" d="M148 136 L94 130 M198 138 Q150 156 94 146 M250 146 Q170 176 94 160" style="stroke-width:2"/>
      ${person(160, 172, .7, { shirt: 'gall', hair: 'liver' })}${person(210, 172, .7, { shirt: 'spleen' })}${person(260, 172, .6, { shirt: 'warn' })}
      ${tag(160, 112, 'Parent', '', 9)}${tag(210, 100, 'Teacher', '', 9)}${tag(268, 112, 'Patient', '', 9)}
      <g class="ansmotion"><g><circle class="f-nerve" r="3.5"/><animateMotion dur="2s" repeatCount="indefinite" path="M198 138 Q150 156 94 146"/></g>
        <g><circle class="f-nerve" r="3.5"/><animateMotion dur="2s" begin=".7s" repeatCount="indefinite" path="M250 146 Q170 176 94 160"/></g></g>
      ${qtag(210, 64, 'Diagnosis = interviews', 9.5)}`),

    /* 9. Interviewing: checklist with a check for school, home and an example per criterion; reused after treatment */
    list: ART(`
      <rect class="f-food" x="8" y="12" width="168" height="162" rx="8"/><rect class="f-white" x="16" y="24" width="152" height="144" rx="3"/>
      <rect class="f-scar" x="72" y="6" width="40" height="12" rx="4"/>
      ${T(92, 40, 'DSM-5 criteria', { c: 'tagtx', s: 9.5 })}
      ${T(114, 56, 'school', { c: 'tagtx', s: 9 })}${T(148, 56, 'home', { c: 'tagtx', s: 9 })}
      ${[0, 1, 2, 3].map(i => {
        const y = 74 + i * 24;
        return `<path class="s-ink" d="M24 ${y} H90" style="stroke-width:2" opacity=".45"/>${T(22, y - 5, `#${i + 1}`, { c: 'tagtx', s: 9, a: 'start' })}` +
          `<g class="ans">${check(114, y - 2, i * 2)}${check(148, y - 2, i * 2 + 1)}</g>`;
      }).join('')}
      <g class="ans"><path class="s-spleen a-draw" d="M28 164 q5 -6 10 0 t10 0 t10 0 t10 0" stroke="var(--c-spleen)" style="stroke-width:2"/></g>
      ${qtag(238, 22, 'Every criterion', 10)}${qtag(238, 50, 'In 2 settings', 10)}${qtag(238, 78, 'Specific example', 10)}
      <rect class="f-white" x="190" y="98" width="38" height="44" rx="3"/><rect class="f-white" x="252" y="98" width="38" height="44" rx="3"/>
      ${T(209, 110, 'Before', { c: 'tagtx', s: 9 })}${T(271, 110, 'After', { c: 'tagtx', s: 9 })}
      <g class="ans"><rect class="f-bad a-pop" style="--d:1" x="196" y="116" width="26" height="6" rx="3"/><rect class="f-bad a-pop" style="--d:2" x="196" y="125" width="26" height="6" rx="3"/><rect class="f-bad a-pop" style="--d:3" x="196" y="134" width="20" height="5" rx="2.5"/>
        <rect class="f-good a-pop" style="--d:5" x="258" y="116" width="14" height="6" rx="3"/></g>
      <path class="s-warn a-flow" d="M231 120 H248" style="stroke-width:2.5"/>
      ${qtag(240, 160, 'Reuse to track Rx', 9.5)}`),

    /* 10. Look-alikes: four other causes point at a distracted, impulsive head */
    mimic: ART(`
      <path class="s-warn a-flow" d="M70 54 L124 78 M230 54 L176 78 M70 124 L124 102 M230 124 L176 102" style="stroke-width:2.5"/>
      <circle class="f-skin" cx="150" cy="90" r="24"/>
      <circle cx="142" cy="88" r="2" fill="#3b2430"/><circle cx="158" cy="88" r="2" fill="#3b2430"/><path d="M144 100 Q150 96 156 100" fill="none" stroke="#3b2430" stroke-width="1.5"/>
      <g transform="translate(150 54)"><g class="a-spin"><path d="M0 0 m-2 0 a2 2 0 1 1 4 0 a4 4 0 1 1 -8 0 a6 6 0 1 1 12 0 a8 8 0 1 1 -16 0" fill="none" stroke="var(--c-spleen)" stroke-width="2"/></g></g>
      ${tag(150, 128, 'Looks like ADHD', '', 9.5)}
      ${pillBottle(30, 50, .9)}<g class="a-bob"><g transform="translate(58 38) rotate(-30)"><path class="f-bad" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g></g>
      ${qtag(52, 72, 'Substance abuse')}
      <g class="a-bob"><ellipse class="f-scar" cx="262" cy="30" rx="22" ry="12"/><circle class="f-scar" cx="252" cy="24" r="10"/><circle class="f-scar" cx="270" cy="22" r="9"/></g>
      <g class="ans">${[248, 260, 272].map((x, i) => `<g class="a-drop" style="animation-delay:${i * .5}s"><path class="f-water" d="M${x} 44 c2 3 3 5 3 6.5 a3 3 0 0 1 -6 0 c0 -1.5 1 -3.5 3 -6.5 Z"/></g>`).join('')}</g>
      ${qtag(250, 72, 'Depression')}
      <g class="a-blink"><path class="f-nerve" d="M44 104 L30 128 L42 128 L34 148 L58 120 L46 120 L54 104 Z"/></g>
      <g class="ans a-rise"><path class="s-good" d="M68 130 V114 M62 120 L68 114 L74 120" style="stroke-width:2.5"/></g>
      ${qtag(52, 162, 'Mania')}
      <g transform="translate(260 128)"><g class="a-beat"><path class="f-blood" d="M0 8 C-14 -2 -12 -14 -5 -14 C-2 -14 0 -11 0 -9 C0 -11 2 -14 5 -14 C12 -14 14 -2 0 8 Z"/></g></g>
      <g class="ans a-drop"><path class="f-water" d="M280 112 c2 3 3 5 3 6.5 a3 3 0 0 1 -6 0 c0 -1.5 1 -3.5 3 -6.5 Z"/></g>
      ${qtag(250, 162, 'Anxiety')}`),

    /* 11. Adult caution: a quarter feign or exaggerate, often to get abusable stimulants */
    feign: ART(`
      ${tag(150, 12, 'Adult ADHD caution', '', 9.5)}
      <circle class="f-good" cx="64" cy="82" r="42"/>
      <path class="s-line" d="M64 82 V40 M64 82 H106" style="stroke-width:1.5"/>
      ${q(86, 62, 9)}
      <g class="ans"><g class="a-pulse"><path class="f-warn" d="M64 82 L64 40 A42 42 0 0 1 106 82 Z"/></g>${T(84, 68, '1/4', { c: 'on', s: 13 })}</g>
      ${qtag(80, 144, '~1 in 4 fake or exaggerate', 9.5)}
      ${pillBottle(226, 112, 1.6)}
      ${T(226, 92, 'Rx', { c: 'tagtx', s: 12, w: 800 })}
      <g class="a-sway"><circle cx="252" cy="72" r="16" fill="var(--c-mucus)" fill-opacity=".35" stroke="var(--pic-ink)" stroke-width="2.5"/><path class="s-ink" d="M263 84 L276 98" style="stroke-width:4"/></g>
      ${qtag(226, 144, 'To get stimulants', 9.5)}
      ${qtag(226, 166, 'Highly abusable', 9.5)}`),

    /* 12. Focus clue: eyes locked on a football game, but drifting off a dull report */
    focus: ART(`
      <path class="s-ink" d="M150 10 V172" style="stroke-width:1.2;stroke-dasharray:3 4" opacity=".5"/>
      <rect class="f-vein" x="66" y="20" width="76" height="54" rx="6"/><rect class="f-good" x="72" y="26" width="64" height="42" rx="2"/>
      <path class="s-white" d="M104 26 V68" style="stroke-width:1.2"/><circle class="s-white" cx="104" cy="47" r="7" style="stroke-width:1.2"/>
      <path class="s-line" d="M96 74 L90 84 M112 74 L118 84" style="stroke-width:2"/>
      <g class="ansmotion"><g><ellipse class="f-food" rx="6" ry="3.6"/><animateMotion dur="1.8s" repeatCount="indefinite" rotate="auto" path="M80 58 Q104 22 128 58 Q104 22 80 58"/></g></g>
      <g class="ans"><path class="s-good a-flow" d="M46 124 L82 70" style="stroke-width:2.5"/></g>
      ${person(36, 172, .95, { shirt: 'warn', hair: 'food' })}
      ${qtag(96, 104, 'Fun: locked in', 10)}
      <rect class="f-food" x="166" y="120" width="76" height="6" rx="2"/><path class="s-line" d="M172 126 V160 M236 126 V160" style="stroke-width:2.5"/>
      <rect class="f-white" x="188" y="92" width="34" height="28" rx="2"/>${W(205, 103, 'Report', { s: 9 })}
      <path class="s-ink" d="M193 110 H217 M193 115 H211" style="stroke-width:1.2" opacity=".5"/>
      ${person(270, 172, .95, { shirt: 'spleen', mouth: 'flat' })}
      <g class="ans"><path class="s-bad a-draw" d="M262 124 C240 116 236 96 250 86 C262 78 232 66 214 74 C196 82 214 50 236 44" style="stroke-width:2;stroke-dasharray:400"/>
        <g class="a-rise"><circle class="f-white" cx="190" cy="56" r="8"/><circle class="f-nerve noline" cx="190" cy="56" r="3.5"/></g>
        <g class="a-rise" style="animation-delay:.9s"><circle class="f-white" cx="268" cy="50" r="8"/><rect class="f-scar noline" x="265" y="45" width="6" height="10" rx="1.5"/></g></g>
      ${qtag(210, 166, 'Dull: drifts off', 10)}`),

    /* 13. Inattention questions: sent for shoes, the kid veers off to a ball and never gets there */
    distract: ART(`
      ${qtag(64, 14, 'Hard to pay attention?', 9.5)}
      ${qtag(64, 40, 'Hard to finish things?', 9.5)}
      <rect class="f-white" x="30" y="54" width="44" height="40" rx="3"/>
      <path class="s-ink" d="M52 60 L58 72 L70 72 L60 80 L64 92 L52 84 L40 92 L44 80 L34 72 L46 72 Z" style="stroke-width:1.5" opacity=".7"/>
      <g class="ans"><path class="f-nerve noline" d="M52 60 L58 72 L70 72 L60 80 L52 84 L40 92 L44 80 L34 72 L46 72 Z" opacity=".9"><animate attributeName="opacity" values="0;.9;.9" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/></path></g>
      <g transform="translate(244 30)">${say(-44, -20, 52, 20, -20, 6)}${person(-28, 30, .5, { shirt: 'gall', mouth: 'open' })}${person(4, 30, .5, { shirt: 'blood', mouth: 'open' })}</g>
      ${W(226, 24, 'blah blah', { s: 9 })}
      <g class="ans a-blink"><path class="s-warn" d="M266 28 q4 4 0 8 M272 24 q6 8 0 16" style="stroke-width:2"/></g>
      ${qtag(244, 76, 'Distractible?', 9.5)}
      ${dash('M52 158 H240')}
      <g class="a-bob"><circle class="f-bad" cx="150" cy="78" r="11"/><path class="s-white" d="M139 78 H161 M150 67 Q144 78 150 89" style="stroke-width:1.5"/></g>
      <g class="ans"><path class="s-warn a-flow" d="M50 150 C80 146 100 124 116 106 C126 96 134 92 140 90" style="stroke-width:2.5"/></g>
      ${person(30, 172, .65, { shirt: 'warn' })}
      <g class="ansmotion"><g><circle class="f-skin" r="5"/><circle class="f-warn" cy="9" r="5"/><animateMotion dur="3s" repeatCount="indefinite" path="M50 140 C80 136 100 114 116 96 C126 86 132 80 136 74"/></g></g>
      <path class="f-blood" d="M246 164 h18 q8 0 8 6 h-26 Z"/><path class="f-blood" d="M262 156 h14 q8 0 8 6 h-22 Z"/>
      ${qtag(232, 128, 'Forgot the shoes?', 9.5)}`),

    /* 14. Hyperactivity questions: class clown, teacher saying stop, fidgety, blurting at a meeting */
    clown: ART(`
      ${say(6, 34, 88, 26, 42, 118)}
      ${q(50, 47, 8)}<g class="ans">${W(50, 51, 'Please sit down!', { s: 9.5 })}</g>
      ${person(36, 172, .95, { shirt: 'gall', hair: 'scar' })}
      ${qtag(58, 18, 'Teacher said stop?', 9.5)}
      <g class="a-shake">${person(132, 172, .72, { shirt: 'warn', arms: 'up', mouth: 'open', hat: true })}</g>
      <g class="ans"><g class="a-bob"><circle class="f-bad" cx="118" cy="108" r="4"/></g><g class="a-bob" style="animation-delay:.3s"><circle class="f-nerve" cx="132" cy="102" r="4"/></g><g class="a-bob" style="animation-delay:.6s"><circle class="f-water" cx="146" cy="108" r="4"/></g></g>
      ${qtag(130, 64, 'Fidgety?')}${qtag(130, 86, 'Class clown?')}
      ${say(206, 34, 82, 26, 246, 118, 'f-nerve')}
      ${q(247, 47, 8)}<g class="ans"><g class="a-pulse">${W(247, 51, 'Wait, I think..!', { s: 9 })}</g></g>
      ${person(246, 160, .85, { shirt: 'spleen', mouth: 'open', hair: 'food' })}
      <rect class="f-food" x="196" y="140" width="100" height="8" rx="2"/><path class="s-line" d="M206 148 V172 M286 148 V172" style="stroke-width:2.5"/>
      <rect class="f-white" x="212" y="134" width="18" height="6"/>
      ${qtag(244, 18, 'Blurts at meetings?', 9)}`),

    /* 15. "Hyperactive" = a motor you can't turn off; obvious in kids, subtle in adults */
    motor: ART(`
      ${qtag(150, 14, "A motor you can't turn off", 10)}
      ${qtag(150, 38, 'Rule out mania, anxiety', 9)}
      <g class="a-bob" style="animation-duration:.7s">${person(70, 150, 1.1, { shirt: 'warn', arms: 'up', mouth: 'open' })}<g class="ans">${gear(70, 123, 6)}</g></g>
      <g class="ans a-blink"><path class="s-warn" d="M44 96 Q38 108 44 120 M36 100 Q30 110 36 120 M96 96 Q102 108 96 120 M104 100 Q110 110 104 120" style="stroke-width:2"/></g>
      ${qtag(72, 166, 'Kids: obvious')}
      <rect class="f-food" x="190" y="94" width="5" height="66" rx="2"/><rect class="f-food" x="190" y="128" width="54" height="6" rx="2"/>
      <path class="s-line" d="M192 134 V172 M240 134 V172" style="stroke-width:2.5"/>
      <path d="M206 122 H236 V130" stroke="#3d405b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M236 130 V150" stroke="#3d405b" stroke-width="6" stroke-linecap="round"/>
      <g class="a-bob" style="animation-duration:.45s"><path class="f-scar" d="M232 148 h12 q6 0 6 6 h-18 Z"/></g>
      <rect class="f-spleen" x="200" y="92" width="22" height="32" rx="8"/>
      <circle class="f-skin" cx="211" cy="80" r="10"/><path class="f-food" d="M201 79 Q201 69 211 69 Q221 69 221 79 Q215 73 208 75 Q204 76 201 79 Z"/>
      <circle cx="207.5" cy="80" r="1.4" fill="#3b2430"/><circle cx="214.5" cy="80" r="1.4" fill="#3b2430"/><ellipse cx="211" cy="86" rx="2.6" ry="2" fill="#7a2e3b"/>
      <g class="a-sway" style="animation-duration:.8s"><path d="M218 100 L232 108 L242 98" stroke="var(--c-skin)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
      <g class="ans">${gear(211, 106, 4)}</g>
      ${say(234, 52, 60, 22, 222, 78)}
      <g class="ans a-blink">${W(264, 67, 'and so...', { s: 9 })}</g>${q(264, 63, 7)}
      ${qtag(268, 88, 'Chatty', 9)}${qtag(272, 112, 'Gestures', 9)}${qtag(272, 140, 'Foot tap', 9)}
      ${qtag(200, 166, 'Adults: subtle')}`),

    /* 16. Conners' Scale: the form travels to teacher, employer and parents to confirm two settings */
    conners: ART(`
      <path class="s-warn a-flow" d="M120 70 L62 46 M180 70 L240 46 M120 120 L62 140" style="stroke-width:2"/>
      <rect class="f-food" x="118" y="46" width="64" height="88" rx="5"/><rect class="f-white" x="124" y="56" width="52" height="72" rx="2"/>
      <rect class="f-scar" x="138" y="41" width="24" height="9" rx="3"/>
      ${q(150, 68, 8)}<g class="ans">${W(150, 70, "Conners'", { s: 9.5 })}</g>
      ${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => `<circle cx="${136 + c * 9}" cy="${84 + r * 11}" r="3" fill="none" stroke="#3d405b" stroke-width="1"/>`).join('') +
        `<g class="ans"><circle class="f-vein a-pop" style="--d:${r}" cx="${136 + [2, 3, 1, 2][r] * 9}" cy="${84 + r * 11}" r="3"/></g>`).join('')}
      ${qtag(150, 148, "Conners' Scale")}
      ${school(42, 48, .9)}${qtag(42, 64, 'Teacher', 9.5)}
      ${office(262, 50, .9)}${qtag(262, 64, 'Employer', 9.5)}
      ${house(42, 140, 1)}${qtag(42, 156, 'Parents', 9.5)}
      <g class="ansmotion">${['M120 70 L62 46', 'M180 70 L240 46', 'M120 120 L62 140'].map((p, i) => `<g><rect class="f-white" x="-7" y="-5" width="14" height="10" rx="1"/><path class="s-line" d="M-7 -5 L0 1 L7 -5" style="stroke-width:1"/><animateMotion dur="2.4s" begin="${i * .8}s" repeatCount="indefinite" path="${p}"/></g>`).join('')}</g>
      ${qtag(244, 112, 'Confirms 2 settings', 9.5)}
      ${tag(226, 166, 'Ask parents, even adults', '', 9)}`),
  });
})();
