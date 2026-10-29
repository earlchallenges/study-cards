/* Pharmacology rx12-hf art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 12 heart failure drugs. Everything lives inside one function so the little shape
   helpers below never clash with the other art files. */
(() => {
  // a few extra motions this page needs; each class name contains "a-" so it counts as animation,
  // and the shared ".pic.mystery * { animation: none }" rule still freezes them on the card front
  const STY = `<style>
.pic .a-rx-weak{transform-box:fill-box;transform-origin:center;animation:arxw 1.4s ease-in-out infinite}
@keyframes arxw{40%{transform:scale(.92)}}
.pic .a-rx-strong{transform-box:fill-box;transform-origin:center;animation:arxs 1.4s ease-in-out infinite}
@keyframes arxs{40%{transform:scale(.7)}}
.pic .a-rx-needle{transform-box:view-box;animation:arxn 3.2s ease-in-out infinite alternate}
@keyframes arxn{0%,15%{transform:rotate(var(--a0))}75%,100%{transform:rotate(var(--a1))}}
.pic .a-rx-fill{transform-box:fill-box;transform-origin:50% 100%;animation:arxf 3s ease-in-out infinite alternate}
@keyframes arxf{0%,10%{transform:scaleY(var(--f0,.25))}80%,100%{transform:scaleY(1)}}
.pic .a-rx-wipe{transform-box:fill-box;transform-origin:0% 50%;animation:arxp 3.6s ease-in-out infinite}
@keyframes arxp{0%{transform:scaleX(0)}75%,100%{transform:scaleX(1)}}
.pic .a-rx-draw{stroke-dasharray:var(--L,600);animation:arxd 3s linear infinite}
@keyframes arxd{0%{stroke-dashoffset:var(--L,600)}75%,100%{stroke-dashoffset:0}}
</style>`;
  const A = inner => ART(STY + inner);

  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" stroke-width="1" stroke-dasharray="2 3"/>`;
  const thick = (d, color, w = 7) => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path d="${d}" stroke="var(--c-${color})" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const fo = 'front-only'; // shapes in a "q" group show only on the front

  // hearts
  const HP = 'M40 72 C16 56 2 40 4 24 C6 8 26 2 40 16 C54 2 74 8 76 24 C78 40 64 56 40 72 Z';
  const heart = (x, y, s, anim = 'a-beat', cls = 'f-blood') => G(x, y, s, `<g class="${anim}"><path class="${cls}" d="${HP}"/><path d="M14 28 Q15 16 27 12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/></g>`);
  // 4-chamber cartoon heart (viewer's left = patient's right side, blue)
  const heart4 = (x, y, s, rvCls = '') => G(x, y, s,
    `<path d="M46 14 C46 2 60 -4 68 4" stroke="var(--art-line)" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M46 14 C46 2 60 -4 68 4" stroke="var(--c-blood)" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<path class="f-muscle" d="${HP}"/>` +
    `<ellipse class="f-vein" cx="25" cy="27" rx="9" ry="8"/><ellipse class="f-blood" cx="55" cy="27" rx="9" ry="8"/>` +
    `<g class="${rvCls}"><ellipse class="f-vein" cx="29" cy="47" rx="9" ry="13"/></g><ellipse class="f-blood" cx="51" cy="47" rx="10" ry="13"/>`);

  // icons centered on (x, y)
  const pill = (x, y, rot = -30, c = 'f-warn', s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const check = (x, y, d = 0) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3.5} ${y} l2.5 2.6 l4.5 -5" stroke-width="2"/></g>`;
  const drop = (x, y, s = 1, c = 'f-water') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/></g>`;
  const bottle = (x, y, c = 'f-good', s = 1) => G(x, y, s, `<rect class="${c}" x="-9" y="-12" width="18" height="26" rx="4"/><rect class="f-white" x="-11" y="-19" width="22" height="7" rx="2"/><rect class="f-white" x="-6" y="-5" width="12" height="11" rx="1.5"/>`);
  const hexP = (x, y, r) => [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k; return (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ' ' + (y + r * Math.sin(a)).toFixed(1); }).join(' ') + 'Z';
  const lungs = (x, y, s = 1, cls = 'f-mouth') => G(x, y, s, `<path class="${cls}" d="M-4 -18 C-16 -22 -26 -4 -26 12 C-26 22 -14 24 -4 18 Z"/><path class="${cls}" d="M4 -18 C16 -22 26 -4 26 12 C26 22 14 24 4 18 Z"/><path class="s-line" d="M0 -30 V-14 M0 -14 L-6 -8 M0 -14 L6 -8" stroke-width="2.2"/>`);
  const eye = (x, y, s = 1) => G(x, y, s, `<path class="f-white" d="M-18 0 Q0 -14 18 0 Q0 14 -18 0 Z"/><circle class="f-vein" r="6"/><circle r="2.6" fill="#1d2238"/><circle r="1.2" cx="-2" cy="-2" fill="#fff"/>`);
  const tube = (x, y) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-5" y="-12" width="10" height="24" rx="5"/><rect class="f-blood noline" x="-4" y="0" width="8" height="11" rx="4"/><rect class="f-germ" x="-6" y="-15" width="12" height="5" rx="1.5"/></g>`;
  const clock = (x, y, r = 12) => `<circle class="f-white" cx="${x}" cy="${y}" r="${r}"/><path class="s-line" d="M${x} ${y} L${x} ${y - r * .55}" stroke-width="2"/>` +
    `<g class="a-spin"><circle cx="${x}" cy="${y}" r="${r - 1}" fill="none" stroke="none"/><path class="s-bad" d="M${x} ${y} L${x + r * .75} ${y}" stroke-width="1.6"/></g><circle cx="${x}" cy="${y}" r="1.8" fill="var(--art-line)"/>`;
  // receptor cup sitting on a membrane at (x, y); the notch is x-6..x+6, y-20..y-8
  const cup = (x, y, cls = 'f-germ') => `<path class="${cls}" d="M${x - 12} ${y} V${y - 20} H${x - 6} V${y - 8} H${x + 6} V${y - 20} H${x + 12} V${y} Z"/>`;
  const plug = (x, y, c = 'f-good', d = 0) => `<g class="a-pop" style="--d:${d}"><rect class="${c}" x="${x - 6}" y="${y - 22}" width="12" height="14" rx="3"/></g>`;

  // ECG trace: gaps between beats (one beat is 42*s wide)
  const beat = s => `h${6 * s} q${3 * s} ${-4 * s} ${6 * s} 0 h${4 * s} l${2 * s} ${3 * s} l${3 * s} ${-20 * s} l${3 * s} ${24 * s} l${2 * s} ${-7 * s} h${6 * s} q${5 * s} ${-7 * s} ${10 * s} 0`;
  const ecg = (x, y, w, gaps, s = 1, color = 'bad') => {
    let d = `M${x} ${y}`, cx = x, n = 0;
    for (const g of gaps) { if (cx + 42 * s > x + w) break; d += ' ' + beat(s) + ` h${g}`; cx += 42 * s + g; n++; }
    d += ` H${x + w}`;
    return `<path class="a-rx-draw" style="--L:${Math.round(w + n * 70 * s)}" d="${d}" stroke="var(--c-${color})" stroke-width="1.8" fill="none" stroke-linejoin="round"/>`;
  };
  const strip = (x, y, w, h) => `<rect class="f-white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>` +
    `<path d="${Array.from({ length: Math.floor(w / 8) - 1 }, (_, i) => `M${x + 8 + i * 8} ${y + 1} V${y + h - 1}`).join(' ')} ${Array.from({ length: Math.floor(h / 8) }, (_, i) => `M${x + 1} ${y + 4 + i * 8} H${x + w - 1}`).join(' ')}" stroke="#ffb8c8" stroke-width=".6"/>`;

  // half-circle gauge with colored zones [[from, to, color]] (0..1) and a needle that swings v0 -> v1 on the back
  const gauge = (cx, cy, r, zones, v0, v1) => {
    const P = f => { const t = Math.PI * (1 + f); return `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`; };
    const a = v => -90 + 180 * v;
    return `<path class="f-white" d="M${cx - r - 9} ${cy} A${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${cy} Z"/>` +
      zones.map(([f, t, c]) => `<path d="M${P(f)} A${r} ${r} 0 0 1 ${P(t)}" stroke="var(--c-${c})" stroke-width="8" fill="none"/>`).join('') +
      `<g class="a-rx-needle" style="transform-origin:${cx}px ${cy}px;transform:rotate(${a(v0)}deg);--a0:${a(v0)}deg;--a1:${a(v1)}deg"><path d="M${cx} ${cy} L${cx} ${cy - r + 3}" stroke="var(--art-line)" stroke-width="2.8" stroke-linecap="round"/></g>` +
      `<circle class="f-white" cx="${cx}" cy="${cy}" r="4"/>`;
  };

  // stick figures standing on (x, y)
  const POSE = {
    run: ['M3 -27 L-1 -13 M-1 -13 L-9 -6 L-14 -5 M-1 -13 L6 -6 L5 0 M2 -23 L-6 -19 M2 -23 L9 -17', 5, -33],
    walk: ['M0 -28 V-12 M0 -12 L-6 0 M0 -12 L5 0 M0 -23 L-5 -15 M0 -23 L6 -16', 1, -34],
    bent: ['M6 -21 L0 -12 M0 -12 L-4 0 M0 -12 L4 0 M5 -19 L7 -10 M5 -19 L-1 -13', 10, -25],
    sit: ['M0 -26 V-12 H12 M12 -12 V0 M0 -22 L8 -16 M0 -22 L-6 -15', 0, -32],
  };
  const fig = (x, y, pose, s = 1) => { const [d, hx, hy] = POSE[pose]; return G(x, y, s, `<path class="s-line" d="${d}" stroke-width="2.6"/><circle class="f-skin" cx="${hx}" cy="${hy}" r="5.5"/>`); };
  const puffs = (x, y, d = 0) => `<g class="a-blink" style="animation-delay:${d}s"><circle class="f-white" cx="${x}" cy="${y}" r="3"/><circle class="f-white" cx="${x + 6}" cy="${y - 4}" r="2.4"/><circle class="f-white" cx="${x + 11}" cy="${y - 9}" r="1.8"/></g>`;

  // moving bubbles with text: drawn at (20, 20) and the motion path shifted back, so the text's own box stays on-frame
  const shift = d => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - 20} ${+b - 20}`);
  const bubble = (cls, txt, path, dur, begin, r = 10) => `<g><circle class="${cls}" cx="20" cy="20" r="${r}"/><text class="tagtx" x="20" y="23.2" text-anchor="middle" style="font-size:9px">${txt}</text><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path)}"/></g>`;
  const ion = (x, y, cls, txt, r = 9) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><text class="tagtx" x="${x}" y="${y + 3.2}" text-anchor="middle" style="font-size:9px">${txt}</text>`;

  // staircase for the A-D stages
  const SC = ['f-good', 'f-pancreas', 'f-warn', 'f-bad'];

  Object.assign(PICS, {

    /* 1. GDMT: four pillars hold up the failing heart */
    gdmt: A(`
      <path class="f-bone" d="M10 56 L150 14 L290 56 Z"/>
      ${heart(135, 27, .38)}
      ${T(92, 50, 'HFrEF', { c: 'tagtx', s: 10 })}${T(208, 50, 'GDMT', { c: 'tagtx', s: 10 })}
      <rect class="f-bone" x="6" y="56" width="288" height="9" rx="2"/>
      ${[['f-vein', 45], ['f-good', 115], ['f-warn', 185], ['f-germ', 255]].map(([c, x], i) =>
        `<g class="a-pop" style="--d:${i}"><rect class="${c}" x="${x - 20}" y="65" width="40" height="84"/><path class="s-line" d="M${x - 9} 70 V144 M${x} 70 V144 M${x + 9} 70 V144" stroke-width="1" opacity=".35"/></g>`).join('')}
      <rect class="f-bone" x="4" y="149" width="292" height="9" rx="2"/>
      ${qtag(45, 96, 'ACE-I/ARB/ARNI', 9)}${qtag(115, 122, 'Beta blocker', 9)}${qtag(185, 96, 'Aldosterone blocker', 9)}${qtag(255, 122, 'SGLT2 inhibitor', 9)}
      ${tag(150, 170, 'Fewer deaths + hospital stays', 'ans', 9.5)}`),

    /* 2. HFrEF (big weak pump) vs HFpEF (thick stiff wall) */
    types: A(`
      ${tag(75, 12, 'HFrEF')}${tag(225, 12, 'HFpEF')}
      <g class="a-rx-weak"><ellipse class="f-muscle" cx="75" cy="72" rx="44" ry="46"/><ellipse class="f-blood" cx="75" cy="74" rx="38" ry="40"/></g>
      <g class="ans"><path class="s-blood a-flow-slow" d="M75 32 V24" stroke-width="3"/></g>
      <ellipse class="f-muscle" cx="225" cy="72" rx="40" ry="46"/><ellipse class="f-blood" cx="225" cy="78" rx="12" ry="22"/>
      <path class="s-line" d="M196 50 l6 4 M192 74 l7 0 M196 98 l6 -4 M254 50 l-6 4 M258 74 l-7 0 M254 98 l-6 -4" stroke-width="1.4" opacity=".5"/>
      <g class="ans"><g class="a-drop"><circle class="f-blood" cx="225" cy="30" r="4"/></g><g class="a-drop" style="animation-delay:.8s"><circle class="f-blood" cx="215" cy="32" r="3"/></g></g>
      ${tag(150, 128, 'Mildly reduced EF: 41–49%', 'ans', 9)}
      ${qtag(75, 148, 'EF 40% or less', 9.5)}${qtag(75, 168, "Can't pump out", 9.5)}
      ${qtag(225, 148, 'EF 50% or more', 9.5)}${qtag(225, 168, "Stiff, can't fill", 9.5)}`),

    /* 3. Ejection fraction: the share of the full ventricle that gets pumped out */
    ef: A(`
      ${thick('M80 52 C82 30 100 20 128 22', 'blood', 9)}
      <path class="s-white a-flow" d="M80 50 C82 30 100 22 126 22" stroke-width="2"/>
      <g class="a-rx-strong"><ellipse class="f-muscle" cx="66" cy="102" rx="40" ry="50"/><ellipse class="f-blood" cx="66" cy="106" rx="30" ry="40"/></g>
      ${tag(66, 168, 'Left ventricle', '', 9.5)}
      <rect class="f-white" x="160" y="32" width="36" height="112" rx="4"/>
      <g class="ans"><rect class="f-blood a-rx-fill" style="--f0:.1" x="160" y="74" width="36" height="70" rx="4"/>
        ${T(178, 113, 'SV', { c: 'on', s: 11 })}${tag(178, 22, 'EDV = full', '', 9)}${tag(178, 160, 'SV = pumped out', '', 9)}</g>
      ${tag(248, 30, 'EF =', '', 11)}
      ${qtag(248, 64, 'SV ÷ EDV × 100', 10)}${qtag(248, 100, 'Normal 60–65%', 10)}`),

    /* 4. HF with improved EF: the EF line climbs over 40% on GDMT */
    improved: A(`
      <rect class="f-bad noline" x="31" y="90" width="257" height="60" opacity=".18"/><rect class="f-good noline" x="31" y="14" width="257" height="76" opacity=".18"/>
      <path class="s-ink" d="M30 12 V150 H288" stroke-width="1.5"/>
      <path d="M30 90 H288" stroke="var(--c-bad)" stroke-width="1.6" stroke-dasharray="5 4"/>
      ${T(26, 54, '60%', { a: 'end', s: 9 })}${T(26, 94, '40%', { a: 'end', s: 9 })}${T(26, 134, '20%', { a: 'end', s: 9 })}
      ${T(286, 144, 'EF over time', { a: 'end', s: 9 })}
      <g class="ans">
        <path class="s-good a-rx-draw" style="--L:300" d="M34 114 C70 114 100 112 130 100 S210 70 284 62" stroke-width="3.5"/>
        <circle class="f-bad" cx="34" cy="114" r="4"/>
        ${[120, 160, 200, 240].map((x, i) => `<g class="a-pop" style="--d:${i}">${pill(x, 126, -30, 'f-good', .9)}</g>`).join('')}
      </g>
      ${qtag(236, 36, 'Now over 40%', 10)}${qtag(86, 166, 'Usually from GDMT', 9.5)}${qtag(220, 166, 'Not a full recovery', 9.5)}`),

    /* 5. ACC/AHA stages climb one way: A -> D */
    stages: A(`
      ${[0, 1, 2, 3].map(i => { const x = 8 + i * 72, top = 146 - i * 28; return `<g class="a-pop" style="--d:${i}"><rect class="${SC[i]}" x="${x}" y="${top}" width="70" height="${174 - top}" rx="3"/>${T(x + 35, top + 21, 'ABCD'[i], { c: 'on', s: 16 })}</g>`; }).join('')}
      ${heart(31, 116, .3, 'a-beat', 'f-mouth')}
      <g class="a-blink"><circle class="f-warn" cx="68" cy="118" r="5"/>${T(68, 121.5, '!', { c: 'on', s: 9 })}</g>
      ${heart(103, 88, .3)}<path class="s-scar" d="M112 96 l8 6 M116 94 l-2 10" stroke-width="2.2"/>
      ${heart(175, 60, .3)}<path class="s-scar" d="M184 68 l8 6 M188 66 l-2 10" stroke-width="2.2"/>${puffs(204, 64)}
      ${heart(247, 32, .3, 'a-shake', 'f-scar')}<path class="s-scar" d="M256 40 l8 6 M260 38 l-2 10" stroke-width="2.2"/>
      ${qtag(56, 100, 'At risk, no damage', 9)}${qtag(115, 72, 'Damage, no symptoms', 9)}${qtag(187, 44, 'Damage + symptoms', 9)}${qtag(259, 16, 'End-stage', 9)}`),

    /* 6. NYHA classes: how much activity brings on symptoms */
    nyha: A(`
      ${[40, 113, 187, 260].map((x, i) => `<rect class="${SC[i]} noline" x="${x - 34}" y="26" width="68" height="104" rx="8" opacity=".28"/>${tag(x, 18, ['I', 'II', 'III', 'IV'][i], '', 10)}<path class="s-ink" d="M${x - 30} 120 H${x + 30}" stroke-width="1.5"/>`).join('')}
      <g class="a-bob">${fig(40, 120, 'run', 1.5)}</g>
      <path class="s-ink" d="M14 82 h8 M12 92 h10 M16 102 h6" stroke-width="1.5" opacity=".6"/>
      <path class="f-good noline" d="M83 120 L143 120 L143 96 Z" opacity=".5"/>
      <g class="a-bob" style="animation-duration:2.6s">${fig(112, 110, 'walk', 1.4)}</g>
      <g class="ans"><g class="a-drop">${drop(126, 64, .6)}</g></g>
      ${fig(182, 120, 'bent', 1.5)}<g class="ans">${puffs(203, 80)}</g>
      <rect class="f-white" x="230" y="102" width="56" height="10" rx="3"/><rect class="f-food" x="230" y="112" width="56" height="5"/>
      ${fig(242, 102, 'sit', 1.2)}<g class="ans">${puffs(250, 58)}${puffs(266, 72, .5)}</g>
      ${qtag(40, 146, 'No limits', 9.5)}${qtag(113, 166, 'Slight limits', 9.5)}${qtag(187, 146, 'Marked limits', 9.5)}${qtag(252, 166, 'Symptoms at rest', 9)}`),

    /* 7. HFrEF vicious cycle: RAAS + SNS make the heart worse; GDMT breaks it */
    hfref: A(`
      <path d="M150 30 A62 62 0 1 1 149.9 30" stroke="var(--art-line)" stroke-width="8" fill="none"/>
      <path class="s-warn a-flow" d="M150 30 A62 62 0 1 1 149.9 30" stroke-width="5"/>
      ${[20, 110, 200, 290].map(t => { const r = t * Math.PI / 180; return `<path transform="translate(${(150 + 62 * Math.sin(r)).toFixed(1)} ${(92 - 62 * Math.cos(r)).toFixed(1)}) rotate(${t})" d="M-5 -7 L4 0 L-5 7" stroke="var(--art-line)" stroke-width="3" fill="none" stroke-linejoin="round"/>`; }).join('')}
      ${heart(130, 62, .5, 'a-rx-weak')}
      <g class="ans">${[45, 135, 225].map((t, i) => { const r = t * Math.PI / 180; return `<g class="a-pop" style="--d:${i + 1}">${pill((150 + 62 * Math.sin(r)).toFixed(1), (92 - 62 * Math.cos(r)).toFixed(1), t, 'f-good', 1.3)}</g>`; }).join('')}
        ${tag(150, 116, 'GDMT blocks it', '', 9.5)}</g>
      ${tag(150, 30, 'Low cardiac output', '', 10)}
      ${qtag(212, 92, 'RAAS + SNS on', 9.5)}${qtag(150, 156, 'More preload + afterload', 9.5)}${qtag(88, 92, 'Remodeling', 9.5)}`),

    /* 8. Congestion: fluid in lungs, belly, legs */
    congestion: A(`
      <circle class="f-skin" cx="110" cy="22" r="13"/>
      <rect class="f-skin" x="84" y="38" width="52" height="64" rx="14"/>
      <rect class="f-skin" x="90" y="98" width="16" height="48" rx="6"/><rect class="f-skin" x="114" y="98" width="16" height="48" rx="6"/>
      <ellipse class="f-mouth" cx="99" cy="60" rx="10" ry="16"/><ellipse class="f-mouth" cx="121" cy="60" rx="10" ry="16"/>
      <g class="ans">
        <g class="a-pulse"><path class="f-water" d="M90 64 Q99 68 108 64 Q108 74 99 76 Q90 74 90 64 Z"/><path class="f-water" d="M112 64 Q121 68 130 64 Q130 74 121 76 Q112 74 112 64 Z"/></g>
        <g class="a-pulse" style="animation-delay:.4s"><ellipse class="f-water" cx="110" cy="90" rx="20" ry="8" opacity=".85"/></g>
        <g class="a-pulse" style="animation-delay:.8s"><ellipse class="f-skin" cx="98" cy="148" rx="12" ry="8"/><ellipse class="f-skin" cx="122" cy="148" rx="12" ry="8"/>
          <circle cx="94" cy="148" r="1.6" fill="var(--art-line)"/><circle cx="126" cy="148" r="1.6" fill="var(--art-line)"/></g>
      </g>
      <rect class="f-food" x="190" y="42" width="78" height="8" rx="2"/>
      <ellipse class="f-white" cx="208" cy="38" rx="14" ry="4"/><ellipse class="f-white" cx="208" cy="31" rx="14" ry="4"/><ellipse class="f-white" cx="208" cy="24" rx="14" ry="4"/>
      <circle class="f-skin" cx="212" cy="12" r="6"/><path class="s-line" d="M216 18 L250 40" stroke-width="5"/>
      <path class="f-pancreas" d="M206 88 A13 13 0 1 0 214 108 A10 10 0 1 1 206 88 Z"/>
      ${fig(244, 112, 'sit', 1)}<g class="ans">${puffs(252, 80)}</g>
      <rect class="f-white" x="210" y="138" width="44" height="14" rx="4"/><rect class="f-good" x="222" y="141" width="20" height="8" rx="2"/>
      <g class="ans"><g class="a-rise"><path class="s-bad" d="M264 150 V136 M259 141 L264 135 L269 141" stroke-width="2.5"/></g></g>
      ${L('M68 60 L88 60 M68 90 L88 90 M84 150 L88 150')}
      ${qtag(44, 60, 'Dyspnea', 9.5)}${qtag(44, 90, 'Ascites', 9.5)}${qtag(46, 150, 'Dependent edema', 9)}
      ${qtag(236, 64, 'Orthopnea', 9.5)}${qtag(236, 124, 'PND: wakes gasping', 9)}${qtag(236, 166, 'Weight gain', 9.5)}
      ${tag(110, 171, 'Also: fatigue, cool hands + feet', 'ans', 9)}`),

    /* 9. Right heart failure: blood backs up into the body veins */
    rightHF: A(`
      ${thick('M116 70 V12', 'vein', 7)}
      ${thick('M120 116 V150', 'vein', 6)}${thick('M120 134 H84', 'vein', 5)}${thick('M122 130 L198 124', 'vein', 4)}
      ${G(20, 116, .55, '<path class="f-liver" d="M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z"/>')}
      ${G(198, 110, .6, '<path class="f-spleen" d="M4 8 C12 -2 34 0 38 12 C42 26 34 42 20 46 C12 48 14 36 10 30 C6 24 -2 18 4 8 Z"/>')}
      <rect class="f-skin" x="104" y="148" width="12" height="26" rx="4"/><rect class="f-skin" x="124" y="148" width="12" height="26" rx="4"/>
      ${heart4(100, 58, .9, 'a-rx-weak')}
      ${lungs(234, 50, .85)}
      <path class="s-ink a-flow" d="M210 66 L170 92" stroke-width="2"/><path d="M174 84 L168 93 L178 94" stroke="var(--pic-ink)" stroke-width="2" fill="none"/>
      <g class="ans">
        <path class="s-white a-flow" d="M116 66 V14 M120 120 V148 M120 134 H86 M122 130 L196 124" stroke-width="1.6"/>
        <g class="a-pulse"><ellipse class="f-vein" cx="116" cy="28" rx="7" ry="11"/></g>
        <g class="a-pulse" style="animation-delay:.5s"><ellipse class="f-skin" cx="110" cy="170" rx="9" ry="5"/><ellipse class="f-skin" cx="130" cy="170" rx="9" ry="5"/></g>
        ${tag(80, 50, 'Right ventricle', '', 9)}
      </g>
      ${L('M126 28 L138 28')}
      ${qtag(156, 28, 'JVD', 10)}${qtag(232, 14, 'Left HF or lung disease', 9)}
      ${qtag(52, 106, 'Big liver', 9.5)}${qtag(250, 154, 'Big spleen', 9.5)}${qtag(176, 168, 'Leg edema', 9.5)}`),

    /* 10. Starting an ACE inhibitor: block ACE, titrate up, accept a small creatinine rise */
    acei: A(`
      ${tag(34, 20, 'Ang I', '', 10)}
      <path class="s-ink" d="M56 20 H108" stroke-width="2"/><path d="M104 15 L110 20 L104 25" stroke="var(--pic-ink)" stroke-width="2" fill="none"/>
      <circle class="f-germ" cx="128" cy="20" r="14"/>${T(128, 23.5, 'ACE', { c: 'on', s: 9 })}
      <path class="s-ink" d="M144 20 H190" stroke-width="2"/><path d="M186 15 L192 20 L186 25" stroke="var(--pic-ink)" stroke-width="2" fill="none"/>
      ${tag(222, 20, 'Ang II', '', 10)}
      <g class="ans"><g class="a-pop">${pill(128, 6, -20, 'f-vein', 1)}</g>
        <g class="a-blink"><path d="M160 12 l12 16 M172 12 l-12 16" stroke="var(--c-bad)" stroke-width="3"/></g></g>
      ${[[18, 18, 'x1'], [60, 34, 'x2'], [102, 56, 'x4']].map(([x, h, t], i) => `<g class="a-pop" style="--d:${i}"><rect class="f-good" x="${x}" y="${112 - h}" width="36" height="${h}" rx="3"/>${T(x + 18, 108, t, { c: 'on', s: 9.5 })}</g>${T(x + 18, 123, ['Start', '1–2 wk', '2–4 wk'][i], { s: 9 })}`).join('')}
      ${tag(228, 44, 'Creatinine', '', 9.5)}
      ${gauge(228, 96, 34, [[0, .55, 'good'], [.55, .75, 'warn'], [.75, 1, 'bad']], .12, .5)}
      ${qtag(80, 140, 'Start low, double q1–2 wk', 9)}${qtag(228, 116, 'Up to 30% rise OK', 9)}${qtag(228, 140, 'Check K + Cr in 1–2 wk', 9)}
      ${tag(150, 164, 'Caution: SBP under 80, Cr over 3, K over 5', 'ans', 9)}`),

    /* 11. ARB when an ACE inhibitor causes cough or angioedema */
    arb: A(`
      ${tag(58, 16, 'On ACE-I', '', 10)}
      <circle class="f-skin" cx="58" cy="64" r="28"/><circle cx="48" cy="56" r="2.5" fill="var(--art-line)"/><circle cx="68" cy="56" r="2.5" fill="var(--art-line)"/>
      <g class="q"><path class="s-line" d="M50 78 Q58 82 66 78" stroke-width="2"/></g>
      <g class="ans"><g class="a-pulse"><ellipse class="f-mouth" cx="58" cy="78" rx="13" ry="7"/></g>${puffs(92, 80)}${puffs(96, 64, .4)}</g>
      ${pill(58, 146, -20, 'f-vein', 1.3)}<g class="ans"><g class="a-pop">${nope(58, 146, 15)}</g></g>
      <path class="s-good a-flow" d="M126 92 H158" stroke-width="4"/><path d="M154 85 L162 92 L154 99" stroke="var(--c-good)" stroke-width="3" fill="none"/>
      <rect class="f-skin" x="170" y="104" width="124" height="14"/><path class="s-line" d="M170 111 H294" stroke-width=".8" opacity=".4"/>
      ${cup(232, 104)}
      ${tag(198, 50, 'Ang II', '', 9)}
      <g class="q"><path class="f-warn" d="${hexP(232, 66, 8)}"/></g>
      <g class="ansmotion"><g><animateTransform attributeName="transform" type="translate" values="0 0;0 8;0 0" dur="1.2s" repeatCount="indefinite"/><path class="f-warn" d="${hexP(232, 62, 8)}"/></g></g>
      <g class="ans">${plug(232, 104, 'f-good', 1)}${tag(266, 88, 'ARB', '', 9.5)}</g>
      ${tag(232, 132, 'AT1 receptor', '', 9.5)}
      ${qtag(30, 116, 'Cough', 9.5)}${qtag(92, 116, 'Angioedema', 9.5)}
      ${qtag(232, 22, 'Candesartan, valsartan', 9)}${tag(232, 162, 'Works as well as ACE-I', 'ans', 9.5)}`),

    /* 12. ARNI: sacubitril jams neprilysin, valsartan blocks the AT1 receptor */
    arni: A(`
      <path class="s-ink" d="M150 28 V150" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      <path class="f-germ" d="M60 78 L79 67 A22 22 0 1 0 79 89 Z"/><circle cx="56" cy="66" r="2.5" fill="#fff"/>
      ${tag(54, 112, 'Neprilysin', '', 9)}
      <g class="q">${ion(100, 78, 'f-good', 'NP', 8)}</g>
      <g class="ans">
        <g class="a-pop">${pill(82, 78, 0, 'f-warn', 1)}</g>
        <g class="a-bob">${ion(110, 50, 'f-good', 'NP', 8)}${ion(126, 80, 'f-good', 'NP', 8)}</g><g class="a-bob" style="animation-delay:.6s">${ion(108, 104, 'f-good', 'NP', 8)}</g>
        ${tag(76, 136, 'More natriuretic peptides', '', 9)}
      </g>
      <rect class="f-skin" x="160" y="96" width="132" height="14"/>
      ${cup(224, 96)}
      <g class="q"><path class="f-warn" d="${hexP(224, 58, 8)}"/></g>
      <g class="ansmotion"><g><animateTransform attributeName="transform" type="translate" values="0 0;0 8;0 0" dur="1.2s" repeatCount="indefinite"/><path class="f-warn" d="${hexP(224, 54, 8)}"/></g></g>
      ${tag(262, 56, 'Ang II', '', 9)}
      <g class="ans">${plug(224, 96, 'f-good', 1)}${tag(224, 136, 'Less vasoconstriction', '', 9)}</g>
      ${tag(224, 122, 'AT1 receptor', '', 9)}
      ${qtag(76, 18, 'Neprilysin inhibitor', 9.5)}${qtag(224, 18, 'ARB (valsartan)', 9.5)}
      ${qtag(150, 164, 'Replaces ACE-I/ARB (NYHA II–III)', 9)}`),

    /* 13. ACE-I -> ARNI: 36-hour washout */
    washout: A(`
      ${tag(150, 14, 'Never combine with ACE-I or ARB', 'ans', 9)}
      <g transform="translate(150 42)"><g class="a-sway"><path class="f-white" d="M-10 -14 H10 L2 0 L10 14 H-10 L-2 0 Z"/><path class="f-pancreas" d="M-6 -10 H6 L0 -2 Z"/><path class="f-pancreas" d="M-7 12 H7 L0 5 Z"/></g></g>
      <rect class="f-white" x="46" y="84" width="208" height="12" rx="6"/>
      <g class="ans"><rect class="f-warn a-rx-wipe" x="46" y="84" width="208" height="12" rx="6"/></g>
      ${[46, 115.3, 184.7, 254].map(x => `<path class="s-ink" d="M${x} 98 V104" stroke-width="1.5"/>`).join('')}
      <g class="ans">${['0 h', '12 h', '24 h', '36 h'].map((t, i) => T([46, 115.3, 184.7, 254][i], 114, t, { s: 9 })).join('')}</g>
      ${pill(26, 90, -30, 'f-vein', 1.3)}${pill(276, 90, -30, 'f-germ', 1.3)}
      ${tag(38, 66, 'Last ACE-I', '', 9.5)}${tag(262, 66, 'Start ARNI', '', 9.5)}
      ${qtag(150, 132, 'Wait 36 hours', 11)}
      ${pill(70, 160, -30, 'f-vein', 1.1)}${T(86, 164, '+', { s: 12 })}${pill(102, 160, -30, 'f-germ', 1.1)}
      <g class="ans"><g class="a-pop">${nope(86, 160, 22)}</g></g>
      ${qtag(190, 160, 'Together: angioedema', 9.5)}`),

    /* 14. Beta blockers with mortality benefit */
    bb: A(`
      ${[[40, 'f-vein'], [88, 'f-good'], [136, 'f-germ']].map(([y, c], i) => `<g class="a-pop" style="--d:${i}">${bottle(26, y, c, .85)}</g>`).join('')}
      ${qtag(90, 40, 'Carvedilol', 9.5)}${qtag(104, 88, 'Metoprolol succinate ER', 9)}${qtag(90, 136, 'Bisoprolol', 9.5)}
      ${heart(176, 6, .45, 'a-beat')}
      <g class="ans">${tag(256, 24, 'Lower mortality', '', 9)}</g>
      ${strip(176, 54, 116, 34)}${ecg(178, 75, 112, [40, 40, 40], .8, 'bad')}
      ${T(234, 100, 'Heart rate slows', { s: 9 })}
      ${[0, 1, 2, 3].map(i => `<rect class="f-good" x="${184 + i * 26}" y="${152 - 10 - i * 10}" width="24" height="${10 + i * 10}" rx="2" opacity="${.45 + i * .18}"/>`).join('')}
      <g class="ansmotion"><circle class="f-warn" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M196 136 L222 126 L248 116 L274 106"/></circle></g>
      ${qtag(228, 170, 'Start low, titrate slowly', 9)}`),

    /* 15. Carvedilol blocks beta-1, beta-2, alpha-1; metoprolol only beta-1 */
    carvedilol: A(`
      ${heart(110, 8, .38, 'a-beat')}
      <g class="a-pulse">${lungs(190, 28, .55)}</g>
      <g class="a-pulse"><rect class="f-blood" x="236" y="16" width="40" height="16" rx="8"/><rect class="f-white noline" x="240" y="22" width="32" height="4" rx="2" opacity=".6"/></g>
      ${T(125, 52, 'β1 heart', { s: 9.5 })}${T(190, 52, 'β2 lungs', { s: 9.5 })}${T(256, 52, 'α1 vessels', { s: 9.5 })}
      ${tag(44, 72, 'Carvedilol', '', 10)}${tag(44, 126, 'Metoprolol', '', 10)}
      ${[125, 190, 256].map(x => cup(x, 80) + cup(x, 134)).join('')}
      <g class="ans">${[125, 190, 256].map((x, i) => plug(x, 80, 'f-warn', i)).join('')}${plug(125, 134, 'f-vein', 3)}${check(190, 118, 4)}${check(256, 118, 5)}</g>
      ${qtag(190, 96, 'More low BP; avoid in asthma', 9)}${qtag(190, 150, 'Beta-1 only: OK in lung disease', 9)}
      ${tag(150, 170, 'Both: heart rate and workload go down', 'ans', 9)}`),

    /* 16. Beta blocker cautions */
    bbAE: A(`
      ${heart(30, 18, .55, 'a-pulse')}
      <g class="ans"><g class="a-drop">${drop(80, 28, .9)}</g><g class="a-drop" style="animation-delay:.7s">${drop(88, 44, .7)}</g></g>
      ${strip(106, 22, 88, 34)}${ecg(108, 44, 84, [60, 60], .7, 'bad')}
      <rect class="f-white" x="232" y="18" width="32" height="44" rx="6"/><rect class="f-water" x="237" y="24" width="22" height="14" rx="2"/>
      ${T(248, 35, '48', { c: 'tagtx', s: 9 })}<circle class="f-scar" cx="248" cy="50" r="4"/>
      <g class="ans"><g class="a-bob"><path class="f-germ" d="M230 26 Q248 18 266 26 L264 38 Q256 40 248 34 Q240 40 232 38 Z"/><circle cx="241" cy="31" r="2.5" fill="#fff"/><circle cx="255" cy="31" r="2.5" fill="#fff"/></g></g>
      ${qtag(54, 78, 'Worse HF at first', 9)}${qtag(150, 94, 'Bradycardia, heart block', 9)}${qtag(246, 78, 'Masks hypoglycemia', 9)}
      <path class="s-ink" d="M22 112 V146 H130" stroke-width="1.2"/>
      <g class="ans"><path class="s-bad" d="M24 118 H66 V144" stroke-width="2.5"/>${nope(66, 130, 8)}
        <path class="s-good a-rx-draw" style="--L:140" d="M24 118 H74 L126 144" stroke-width="2.5"/></g>
      ${pill(200, 128, -30, 'f-vein', 1.2)}${lungs(242, 132, .55)}
      <g class="ans"><g class="a-pulse"><path class="f-water" d="M230 136 h9 v6 h-9 Z M245 136 h9 v6 h-9 Z" opacity=".9"/></g><g class="a-pop">${nope(200, 128, 14)}</g></g>
      ${qtag(80, 166, 'Never stop suddenly', 9)}${qtag(222, 166, 'Not in acute HF', 9)}`),

    /* 17. MRAs: block aldosterone -> Na and water leave, K stays (hyperkalemia risk) */
    ara: A(`
      <rect class="f-water" x="8" y="26" width="168" height="26" opacity=".55"/>
      <rect class="f-skin" x="8" y="52" width="168" height="60"/>
      <rect class="f-blood" x="8" y="112" width="168" height="24" opacity=".45"/>
      ${tag(32, 39, 'Urine', '', 9)}${tag(32, 124, 'Blood', '', 9)}
      ${tag(54, 66, 'Aldosterone', '', 9)}
      <path class="f-pancreas" d="${hexP(56, 92, 8)}"/>
      ${cup(110, 104)}
      <rect class="f-warn" x="136" y="46" width="16" height="12" rx="3"/>
      <g class="q"><path class="s-ink" d="M144 36 V68" stroke-width="2"/><path d="M139 63 L144 69 L149 63" stroke="var(--pic-ink)" stroke-width="2" fill="none"/></g>
      <g class="ans">${plug(110, 104, 'f-warn', 0)}
        ${[0, 1, 2].map(i => `<g class="a-pop" style="--d:${i + 1}">${ion(116 + i * 22, 124, 'f-germ', 'K')}</g>`).join('')}</g>
      <g class="ansmotion">${[0, 1.1, 2.2].map(b => bubble('f-pancreas', 'Na', 'M58 39 H170', 3.3, b, 9)).join('')}</g>
      ${tag(242, 44, 'Potassium', '', 9.5)}
      ${gauge(242, 96, 34, [[0, .5, 'good'], [.5, .7, 'warn'], [.7, 1, 'bad']], .3, .85)}
      ${qtag(242, 116, 'Hyperkalemia', 9.5)}
      ${qtag(92, 152, 'Spironolactone, eplerenone', 9)}${tag(92, 170, 'Fewer deaths + admissions', 'ans', 9)}
      ${tag(236, 140, 'GFR over 30, K under 5', 'ans', 9)}${tag(236, 160, 'HFrEF NYHA II–IV', 'ans', 9)}`),

    /* 18. Spironolactone (hits sex-hormone receptors too) vs eplerenone (selective, CYP3A4) */
    spiro: A(`
      <path class="s-ink" d="M150 4 V176" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${tag(75, 12, 'Spironolactone', '', 10)}${tag(225, 12, 'Eplerenone', '', 10)}
      ${pill(75, 34, 0, 'f-warn', 1.2)}${pill(225, 34, 0, 'f-good', 1.2)}
      <path class="s-ink a-flow" d="M70 40 L40 54 M75 40 V54 M80 40 L110 54 M225 40 V54" stroke-width="1.5"/>
      ${[35, 75, 115, 185, 225, 265].map(x => cup(x, 72)).join('')}
      ${[['MR', 35], ['Andro.', 75], ['Prog.', 115], ['Andro.', 185], ['MR', 225], ['Prog.', 265]].map(([t, x]) => T(x, 86, t, { s: 9 })).join('')}
      <g class="ans">${plug(35, 72, 'f-warn', 0)}${plug(75, 72, 'f-warn', 1)}${plug(115, 72, 'f-warn', 2)}${plug(225, 72, 'f-good', 0)}${check(185, 56, 3)}${check(265, 56, 3)}</g>
      ${qtag(75, 102, 'Nonselective', 9.5)}${qtag(225, 102, 'Selective', 9.5)}
      <path class="f-skin" d="M24 128 Q48 122 72 128 V158 H24 Z"/>
      <g class="ans"><g class="a-grow"><ellipse class="f-skin" cx="38" cy="138" rx="9" ry="7"/><ellipse class="f-skin" cx="58" cy="138" rx="9" ry="7"/></g></g>
      ${qtag(110, 140, 'Gynecomastia', 9.5)}${qtag(225, 124, 'Less gynecomastia', 9)}
      <circle class="f-liver" cx="178" cy="156" r="19"/>${T(178, 159, 'CYP3A4', { c: 'on', s: 9 })}
      ${qtag(248, 148, 'CYP3A4 inhibitors', 9)}${tag(248, 166, 'raise its level', 'ans', 9)}`),

    /* 19. Potassium checks after starting spironolactone */
    araMonitor: A(`
      ${tag(150, 14, 'Check K + kidney function', '', 10)}
      <path class="s-ink" d="M16 70 H284" stroke-width="3"/><path d="M280 64 L288 70 L280 76" stroke="var(--pic-ink)" stroke-width="3" fill="none"/>
      ${[30, 78, 126, 170, 214, 256].map((x, i) => `<circle class="f-white" cx="${x}" cy="70" r="5"/><g class="ans"><g class="a-pop" style="--d:${i}">${tube(x, 70)}</g></g>`).join('')}
      ${[['Day 3', 30], ['Week 1', 78], ['Month 1', 126], ['Month 2', 170], ['Month 3', 214], ['Then periodic', 256]].map(([t, x], i) => qtag(x, i % 2 ? 98 : 42, t, 9.5)).join('')}
      ${bottle(30, 140, 'f-germ', 1)}${T(30, 143.5, 'K+', { c: 'tagtx', s: 9 })}
      <g class="ans"><g class="a-pop" style="--d:6">${nope(30, 138, 18)}</g></g>
      <path class="f-white" d="M160 126 Q160 120 166 120 H174 Q180 120 180 126 V156 H160 Z"/><rect class="f-scar" x="161" y="114" width="18" height="8" rx="3"/>${T(170, 145, 'KCl', { c: 'tagtx', s: 9 })}
      <g class="ans"><g class="a-drop"><circle class="f-white" cx="166" cy="110" r="1.6"/></g><g class="a-pop" style="--d:7">${nope(170, 136, 18)}</g></g>
      ${qtag(100, 140, 'Stop K supplements', 9)}${qtag(246, 140, 'No salt substitutes', 9)}`),

    /* 20. SGLT2 inhibitors: glucose + Na stay in the tubule and leave in urine */
    sglt2: A(`
      <rect class="f-blood" x="8" y="12" width="200" height="20" opacity=".45"/>
      <rect class="f-small" x="8" y="32" width="200" height="22"/>
      <rect class="f-water" x="8" y="54" width="200" height="40" opacity=".5"/>
      <rect class="f-small" x="8" y="94" width="200" height="14"/>
      ${thick('M208 74 H246 V100', 'water', 12)}
      <rect class="f-white" x="226" y="98" width="40" height="50" rx="6"/>
      <g class="ans"><rect class="f-pancreas a-rx-fill" style="--f0:.2" x="228" y="118" width="36" height="28" rx="4" opacity=".75"/></g>
      ${tag(30, 22, 'Blood', '', 9)}${tag(256, 22, 'Kidney tubule', '', 9)}
      ${[50, 110, 170].map(x => `<rect class="f-germ" x="${x - 7}" y="46" width="14" height="10" rx="2"/>`).join('')}
      <g class="q">${[50, 110, 170].map(x => `<path class="s-ink" d="M${x} 66 V20" stroke-width="2"/><path d="M${x - 4} 25 L${x} 19 L${x + 4} 25" stroke="var(--pic-ink)" stroke-width="2" fill="none"/>`).join('')}</g>
      <g class="ans">${[50, 110, 170].map((x, i) => `<g class="a-pop" style="--d:${i}">${pill(x, 50, 0, 'f-warn', .9)}</g>`).join('')}</g>
      <g class="ansmotion">${bubble('f-pancreas', 'Glu', 'M20 74 H246 V128', 3.6, 0, 9)}${bubble('f-white', 'Na', 'M20 74 H246 V128', 3.6, 1.2, 9)}${bubble('f-pancreas', 'Glu', 'M20 74 H246 V128', 3.6, 2.4, 9)}</g>
      ${qtag(112, 120, 'Dapagliflozin, empagliflozin', 9)}${qtag(112, 138, 'Glucose + Na out: diuresis', 9)}
      ${qtag(112, 156, 'With or without diabetes', 9)}${tag(150, 172, 'Fewer HF admissions + CV deaths', 'ans', 9)}`),

    /* 21. SGLT2 inhibitor side effects */
    sglt2AE: A(`
      ${drop(60, 40, 2.4, 'f-pancreas')}<rect class="f-white" x="54" y="38" width="10" height="10" rx="1"/>
      <g class="ans"><g class="a-bob"><ellipse class="f-germ" cx="92" cy="30" rx="7" ry="5"/><ellipse class="f-germ" cx="100" cy="40" rx="5" ry="4"/></g><g class="a-bob" style="animation-delay:.5s"><ellipse class="f-germ" cx="30" cy="34" rx="6" ry="4"/></g></g>
      <g class="a-pulse">${drop(212, 38, 2.2)}</g>
      <g class="ans"><g class="a-drop"><path class="s-bad" d="M250 22 V48 M244 42 L250 49 L256 42" stroke-width="3"/></g>${T(262, 60, 'BP', { s: 9.5 })}</g>
      <path class="f-white" d="M66 98 H84 V110 L96 140 Q98 146 92 146 H58 Q52 146 54 140 L66 110 Z"/>
      <path class="f-acid" d="M60 128 H90 L95 140 Q96 144 92 144 H58 Q54 144 55 140 Z"/>
      <g class="ans"><g class="a-rise"><circle class="f-acid" cx="70" cy="122" r="3"/><circle class="f-acid" cx="80" cy="116" r="2.4"/></g>${T(116, 126, 'ketones', { s: 9 })}</g>
      <path class="f-warn" d="M225 96 L248 136 H202 Z"/>${T(225, 130, '!', { c: 'on', s: 16 })}
      <g class="ans"><g class="a-blink">${tag(268, 108, 'rare', '', 9)}</g></g>
      ${qtag(75, 84, 'Yeast infections, UTIs', 9)}${qtag(225, 84, 'Volume loss, low BP', 9)}
      ${qtag(75, 164, 'Ketoacidosis', 9.5)}${qtag(225, 156, 'Fournier gangrene (rare)', 9)}`),

    /* 22. Ivabradine: plugs the If ("funny") channel in the SA node -> slower heart rate */
    ivab: A(`
      <circle class="f-nerve" cx="58" cy="68" r="38"/>
      ${tag(54, 76, 'SA node cell', '', 9)}
      <g transform="translate(85 41) rotate(45)"><rect class="f-water" x="-11" y="-8" width="8" height="16" rx="2"/><rect class="f-water" x="3" y="-8" width="8" height="16" rx="2"/></g>
      <g class="q"><path class="s-ink" d="M104 22 L80 46" stroke-width="2"/><path d="M80 39 L79 47 L87 46" stroke="var(--pic-ink)" stroke-width="2" fill="none"/></g>
      <g class="ans"><g class="a-pop">${pill(85, 41, 45, 'f-germ', 1)}</g></g>
      ${strip(134, 14, 158, 36)}${ecg(136, 38, 154, [6, 6, 6, 6], .8, 'bad')}${T(140, 24, 'Before', { a: 'start', c: 'tagtx', s: 9 })}
      <g class="ans">${strip(134, 60, 158, 36)}${ecg(136, 84, 154, [44, 44], .8, 'good')}${T(140, 70, 'After: slower', { a: 'start', c: 'tagtx', s: 9 })}</g>
      ${eye(150, 150, 1)}
      <g class="ans">${[[132, 134], [170, 136], [160, 166]].map(([x, y], i) => `<g class="a-blink" style="animation-delay:${i * .4}s"><path d="M${x} ${y - 5} L${x + 1.5} ${y - 1.5} L${x + 5} ${y} L${x + 1.5} ${y + 1.5} L${x} ${y + 5} L${x - 1.5} ${y + 1.5} L${x - 5} ${y} L${x - 1.5} ${y - 1.5} Z" fill="var(--c-nerve)" stroke="var(--art-line)"/></g>`).join('')}</g>
      ${qtag(66, 120, 'Blocks the If channel', 9.5)}
      ${qtag(236, 116, 'EF 35% or less, HR 70+', 9)}${tag(236, 134, 'Sinus, max beta blocker', 'ans', 9)}
      ${qtag(236, 160, 'AFib, slow HR, flashes', 9)}`),

    /* 23. BiDil: hydralazine (arteries) + isosorbide dinitrate (veins) */
    bidil: A(`
      ${tag(75, 12, 'Hydralazine', '', 9.5)}${tag(225, 12, 'Isosorbide dinitrate', '', 9.5)}
      <g class="a-pulse"><rect class="f-blood" x="22" y="32" width="106" height="18" rx="9"/><rect class="f-white noline" x="28" y="39" width="94" height="4" rx="2" opacity=".55"/></g>
      <g class="a-pulse" style="animation-delay:.5s"><rect class="f-vein" x="172" y="32" width="106" height="18" rx="9"/><rect class="f-white noline" x="178" y="39" width="94" height="4" rx="2" opacity=".55"/></g>
      ${tag(75, 66, 'Arteries: less afterload', 'ans', 9)}${tag(225, 66, 'Veins: less preload', 'ans', 9)}
      ${qtag(75, 92, 'Black patients', 10)}${qtag(225, 92, 'NYHA III–IV', 10)}
      ${tag(150, 116, 'Added to GDMT: lowers mortality', 'ans', 9)}
      <path class="f-vein" d="M106 140 L114 150 L106 160 L98 150 Z"/>${pill(130, 150, -30, 'f-warn', 1)}
      <g class="ans"><g class="a-pop">${nope(118, 150, 22)}</g></g>
      ${qtag(220, 150, 'Never with PDE-5 inhibitors', 9)}`),

    /* 24. Loop diuretics: block Na-K-2Cl in the thick ascending limb -> fluid off, not fewer deaths */
    loop: A(`
      <path d="M30 22 V128 Q30 152 50 152 Q70 152 70 128 V22" stroke="var(--art-line)" stroke-width="17" fill="none"/>
      <path d="M30 22 V128 Q30 152 50 152 Q70 152 70 128 V22" stroke="var(--c-water)" stroke-width="13" fill="none" opacity=".9"/>
      <path d="M70 128 V30" stroke="var(--c-small)" stroke-width="5" fill="none"/>
      ${[56, 86, 116].map(y => `<rect class="f-germ" x="78" y="${y - 6}" width="10" height="12" rx="2"/>`).join('')}
      <g class="q">${[56, 86, 116].map(y => `<path class="s-ink" d="M72 ${y} H100" stroke-width="2"/><path d="M95 ${y - 4} L101 ${y} L95 ${y + 4}" stroke="var(--pic-ink)" stroke-width="2" fill="none"/>`).join('')}</g>
      <g class="ans">${[56, 86, 116].map((y, i) => `<g class="a-pop" style="--d:${i}">${pill(92, y, 0, 'f-warn', .9)}</g>`).join('')}</g>
      <g class="ansmotion">${[0, 1.3, 2.6].map(b => `<circle class="f-white" r="4"><animateMotion dur="3.9s" begin="${b}s" repeatCount="indefinite" path="M30 24 V128 Q30 150 50 150 Q70 150 70 128 V20"/></circle>`).join('')}</g>
      ${tag(50, 170, 'Loop of Henle', '', 9)}
      ${qtag(200, 14, 'Furosemide, bumetanide, torsemide', 9)}
      <rect class="f-white" x="124" y="40" width="52" height="40" rx="8"/><rect class="f-good" x="134" y="46" width="32" height="12" rx="2"/>
      <g class="ans"><g class="a-drop"><path class="s-good" d="M150 62 V76 M145 71 L150 77 L155 71" stroke-width="2.5"/></g></g>
      ${qtag(236, 60, 'Lose 1–2 lb a day', 9.5)}
      ${qtag(200, 102, 'Relieves fluid + symptoms', 9.5)}
      ${qtag(200, 128, 'Does NOT lower mortality', 9.5)}${tag(200, 152, 'Use the lowest dose that works', 'ans', 9)}`),

    /* 25. Loop diuretic side effects */
    loopAE: A(`
      ${thick('M14 24 H62 Q78 24 78 40', 'water', 12)}
      <ellipse class="f-scar" cx="78" cy="146" rx="26" ry="7"/><path class="s-line" d="M64 146 H92 M70 142 V150 M78 140 V152 M86 142 V150" stroke-width="1"/>
      <g class="q"><circle class="f-water" cx="78" cy="70" r="3"/><circle class="f-water" cx="78" cy="100" r="3"/></g>
      <g class="ansmotion">${[['f-germ', 'K', 0], ['f-pancreas', 'Na', .7], ['f-good', 'Mg', 1.4], ['f-bone', 'Ca', 2.1]].map(([c, t, b]) => bubble(c, t, 'M78 46 V138', 2.8, b, 10)).join('')}</g>
      ${qtag(78, 166, 'Low K, Na, Mg, Ca', 9.5)}
      ${G(130, 34, 1.1, '<path class="f-skin" d="M0 -14 C10 -14 14 -4 10 4 C7 9 4 10 4 16 C4 20 -2 20 -4 16 C-6 12 -2 10 -2 4 C-6 0 -6 -14 0 -14 Z"/>')}
      <g class="ans"><g class="a-blink"><path d="M148 26 Q152 34 148 42 M154 22 Q160 34 154 46" stroke="var(--pic-ink)" stroke-width="1.8" fill="none"/></g>${nope(151, 34, 10)}</g>
      <g class="a-pulse">${drop(152, 86, 1.6)}</g>
      <g class="ans"><g class="a-drop"><path class="s-bad" d="M170 74 V96 M165 91 L170 97 L175 91" stroke-width="2.5"/></g></g>
      <path class="f-acid" d="${hexP(150, 134, 8)}"/><path class="f-white" d="M164 128 l6 -6 l6 6 l-6 6 Z"/>
      <g class="ans"><g class="a-rise"><path class="s-bad" d="M184 144 V126 M179 131 L184 125 L189 131" stroke-width="2.5"/></g></g>
      ${qtag(234, 34, 'Ototoxicity (high doses)', 9)}${qtag(234, 86, 'Dehydration, low BP', 9)}${qtag(240, 134, 'High uric acid, glucose', 9)}`),

    /* 26. Diuretic resistance: add metolazone to block the distal tubule too */
    metolazone: A(`
      ${thick('M10 86 H236 V122', 'water', 26)}
      <rect class="f-small noline" x="10" y="70" width="98" height="4" opacity=".9"/><rect class="f-pancreas noline" x="122" y="70" width="98" height="4"/>
      <rect class="f-germ" x="52" y="64" width="16" height="10" rx="2"/><rect class="f-germ" x="162" y="64" width="16" height="10" rx="2"/>
      ${pill(60, 62, 0, 'f-warn', .9)}
      <g class="q"><path class="s-ink" d="M170 84 V48" stroke-width="2"/><path d="M166 53 L170 47 L174 53" stroke="var(--pic-ink)" stroke-width="2" fill="none"/></g>
      <g class="ans"><g class="a-pop">${pill(170, 62, 0, 'f-good', .9)}</g></g>
      <rect class="f-white" x="216" y="122" width="40" height="46" rx="6"/>
      <g class="ans"><rect class="f-water a-rx-fill" style="--f0:.2" x="218" y="134" width="36" height="32" rx="4"/></g>
      <g class="ansmotion">${[0, 1.1, 2.2].map(b => bubble('f-pancreas', 'Na', 'M18 88 H236 V140', 3.3, b, 9)).join('')}</g>
      ${T(60, 116, 'Loop of Henle', { s: 9 })}${T(170, 116, 'Distal tubule', { s: 9 })}
      ${tag(60, 44, 'Loop diuretic', '', 9.5)}${qtag(170, 36, 'Add metolazone', 10)}${tag(170, 16, 'Thiazide-like', 'ans', 9)}
      ${tag(108, 146, 'Double block: more Na + water out', 'ans', 9)}`),

    /* 27. Digoxin: blocks the Na/K pump -> more Ca -> stronger squeeze; narrow window */
    digoxin: A(`
      <rect class="f-skin" x="14" y="24" width="128" height="88" rx="14"/>
      ${tag(78, 16, 'Heart muscle cell', '', 9)}
      <rect class="f-germ" x="6" y="44" width="16" height="24" rx="4"/>${tag(54, 56, 'Na/K pump', '', 9)}
      <path class="s-muscle" d="M30 82 H130 M30 96 H130" stroke-width="3" opacity=".6"/>
      <g class="ans"><g class="a-pop"><path class="f-mouth" d="M14 40 C6 40 4 46 8 50 C4 54 6 60 14 60 C20 58 22 54 20 50 C22 46 20 42 14 40 Z"/></g>
        ${[[62, 78], [84, 90], [106, 78], [124, 92], [72, 100]].map(([x, y], i) => `<g class="a-pop" style="--d:${i + 1}">${ion(x, y, 'f-bone', 'Ca', 8)}</g>`).join('')}
        ${tag(78, 124, 'More Ca: stronger squeeze', '', 9)}</g>
      ${heart(186, 14, .72, 'a-rx-strong')}
      ${qtag(216, 82, 'Positive inotrope', 9.5)}
      <rect class="f-white" x="160" y="98" width="130" height="10" rx="3"/>
      <rect class="f-good noline" x="186" y="99" width="20.8" height="8"/><rect class="f-bad noline" x="264" y="99" width="25" height="8" rx="2"/>
      <g class="a-bob"><path class="f-warn" d="M196 96 L191 88 H201 Z"/></g>
      ${qtag(210, 124, 'Target 0.5–0.9 ng/mL', 9)}
      ${qtag(78, 152, 'Fewer admissions', 9.5)}${qtag(214, 152, 'No mortality benefit', 9.5)}
      ${tag(150, 172, 'Narrow index; Beers list', 'ans', 9)}`),

    /* 28. Digoxin toxicity */
    digTox: A(`
      ${eye(46, 34, 1.1)}
      <g class="ans"><g class="a-pulse"><ellipse cx="46" cy="34" rx="28" ry="18" fill="none" stroke="var(--c-bile)" stroke-width="3"/><ellipse cx="46" cy="34" rx="34" ry="23" fill="none" stroke="var(--c-acid)" stroke-width="2"/></g></g>
      ${qtag(48, 70, 'Vision changes', 9)}
      ${G(126, 8, .9, '<path class="f-mouth" d="M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z"/>')}
      <g class="ans"><g class="a-spin"><path d="M140 22 q8 -8 16 0 q-8 8 -16 0" stroke="var(--c-germ)" stroke-width="2" fill="none"/></g></g>
      ${qtag(150, 50, 'Confusion', 9.5)}
      ${strip(196, 14, 96, 34)}${ecg(198, 36, 92, [4, 26, 10], .7, 'bad')}
      ${qtag(242, 62, 'Arrhythmia, AV block', 9)}
      ${gauge(150, 106, 34, [[0, .17, 'warn'], [.17, .3, 'good'], [.3, .67, 'warn'], [.67, 1, 'bad']], .25, .85)}
      ${qtag(150, 126, 'Level over 2 ng/mL', 9.5)}
      <g class="a-shake">${G(18, 112, .7, '<path class="f-stomach" d="M12 0 L20 0 C20 8 26 10 36 8 C52 6 62 18 60 32 C58 48 42 58 24 56 C14 55 8 50 10 44 C12 40 20 42 26 40 C34 36 34 28 28 24 C20 18 12 14 12 0 Z"/>')}</g>
      ${qtag(90, 168, 'Nausea, vomiting, no appetite', 9)}
      <g class="ans"><g class="a-drop">${ion(232, 102, 'f-germ', 'K')}${ion(258, 102, 'f-good', 'Mg')}</g>
        ${tag(244, 142, 'Low K or Mg: worse', '', 9)}</g>`),

    /* 29. Drugs that raise digoxin levels */
    digDrugs: A(`
      ${tag(150, 14, 'Digoxin level', '', 9.5)}
      <rect class="f-white" x="128" y="26" width="44" height="104" rx="8"/>
      <g class="ans"><rect class="f-good a-rx-fill" style="--f0:.4" x="130" y="44" width="40" height="84" rx="6"/></g>
      <path d="M124 44 H176" stroke="var(--c-bad)" stroke-width="2" stroke-dasharray="4 3"/>${T(180, 47, 'toxic', { a: 'start', s: 9 })}
      ${pill(48, 44, -30, 'f-warn', 1.4)}${pill(48, 104, -30, 'f-vein', 1.4)}${pill(252, 44, -30, 'f-germ', 1.4)}${pill(252, 104, -30, 'f-good', 1.4)}
      <path class="s-ink a-flow" d="M66 50 L122 72 M66 104 L122 92 M234 50 L190 70 M234 104 L178 92" stroke-width="2"/>
      ${qtag(48, 70, 'Amiodarone', 9.5)}${qtag(48, 130, 'Verapamil', 9.5)}
      ${qtag(252, 70, 'Clarithromycin', 9)}${tag(252, 86, '+ erythromycin', 'ans', 9)}${qtag(252, 130, 'Cyclosporine', 9.5)}
      ${clock(56, 162, 12)}${qtag(160, 162, 'Draw level 6–8 h after dose', 9.5)}`),

    /* 30. CCBs in HFrEF: diltiazem/verapamil weaken the squeeze */
    ccbNo: A(`
      ${tag(76, 16, 'Calcium channel blockers', '', 9.5)}
      ${pill(56, 66, -30, 'f-vein', 1.8)}${pill(56, 106, -30, 'f-germ', 1.8)}
      <g class="ans"><g class="a-pop">${nope(56, 86, 40)}</g></g>
      <path class="s-bad a-flow" d="M100 86 L170 70" stroke-width="3"/>
      ${heart(180, 26, 1.1, 'a-rx-weak', 'f-scar')}
      ${qtag(222, 124, 'Not recommended', 10.5)}${tag(222, 146, 'Weaker squeeze, worse HF', 'ans', 9)}
      ${qtag(70, 144, 'Diltiazem, verapamil', 9.5)}${tag(70, 164, 'Contraindicated', 'ans', 9.5)}`),

    /* 31. HFpEF treatment */
    hfpef: A(`
      ${tag(150, 14, 'Stiff, thick ventricle', '', 9.5)}
      <g class="a-rx-weak"><ellipse class="f-muscle" cx="150" cy="82" rx="34" ry="44"/><ellipse class="f-blood" cx="150" cy="88" rx="10" ry="18"/></g>
      <g class="ans">
        <g class="a-pop" style="--d:0"><g class="a-drop">${drop(50, 46, 2)}</g></g>
        <g class="a-pop" style="--d:1">${pill(250, 46, -30, 'f-warn', 1.8)}</g>
        <g class="a-pop" style="--d:2">${pill(40, 116, -30, 'f-germ', 1.4)}${pill(70, 116, -30, 'f-vein', 1.4)}</g>
        <g class="a-pop" style="--d:3"><rect class="f-vein" x="208" y="108" width="22" height="16" rx="3"/>${ecg(234, 118, 30, [4], .5, 'bad')}<rect class="f-white" x="268" y="108" width="20" height="16" rx="4"/></g>
      </g>
      ${qtag(50, 80, 'Diuretics', 9.5)}${qtag(250, 80, 'SGLT2 inhibitor', 9.5)}
      ${qtag(60, 152, 'Consider ARNI or MRA', 9)}${qtag(228, 152, 'Control BP, AFib, weight', 9)}`),

    /* 32. Treatment by stage */
    stageTx: A(`
      ${tag(56, 18, 'Treat by stage', '', 10)}
      ${[0, 1, 2, 3].map(i => { const x = 120 + i * 44, top = 144 - i * 30; return `<g class="a-pop" style="--d:${i}"><rect class="${SC[i]}" x="${x}" y="${top}" width="44" height="${176 - top}" rx="3"/>${T(x + 22, top + 20, 'ABCD'[i], { c: 'on', s: 15 })}</g>`; }).join('')}
      <g class="ansmotion"><circle class="f-white" r="5"><animateMotion dur="4s" repeatCount="indefinite" path="M142 138 L142 136 L186 106 L230 76 L274 46"/></circle></g>
      ${qtag(61, 148, 'Control BP + lipids', 9)}${tag(61, 166, 'SGLT2i if diabetic', 'ans', 9)}
      ${qtag(102, 118, 'ACE-I + beta blocker', 9)}${qtag(146, 88, 'Full GDMT incl. ARNI', 9)}${qtag(185, 58, 'Advanced HF specialist', 9)}`),

    /* 33. BNP: the stretched heart releases it into the blood */
    bnp: A(`
      <g class="a-pulse">${heart(10, 28, 1.1, '', 'f-blood')}</g>
      <rect class="f-white" x="138" y="22" width="24" height="70" rx="12"/><rect class="f-germ" x="135" y="16" width="30" height="10" rx="3"/>
      <g class="ans"><rect class="f-blood noline a-rx-fill" style="--f0:.3" x="140" y="56" width="20" height="34" rx="9"/></g>
      <g class="ansmotion">${[0, 1.2, 2.4].map(b => bubble('f-good', 'BNP', 'M64 60 Q100 20 150 40', 3.6, b, 11)).join('')}</g>
      ${tag(58, 128, 'Stretched heart wall', '', 9)}
      ${qtag(150, 112, 'BNP / NT-proBNP', 10.5)}
      <g transform="translate(218 40) rotate(-30)"><rect class="f-white" x="-6" y="-16" width="12" height="26" rx="4"/><rect class="f-vein" x="-8" y="8" width="16" height="6" rx="2"/></g>
      <g class="a-blink"><path d="M234 44 q8 6 0 14 M240 40 q12 10 0 22 M246 36 q16 14 0 30" stroke="var(--c-immune)" stroke-width="2" fill="none"/></g>
      <rect x="216" y="94" width="58" height="52" rx="6" fill="#22283a" stroke="var(--art-line)"/>
      <path d="M245 98 V142 M228 108 Q245 102 262 108 M226 118 Q245 112 264 118 M226 128 Q245 122 264 128" stroke="#ffffff" stroke-width="1.6" fill="none" opacity=".85"/>
      <ellipse cx="250" cy="130" rx="9" ry="7" fill="#ffffff" opacity=".35"/>
      ${tag(246, 80, 'Echo with Doppler', 'ans', 9)}${tag(245, 160, 'Chest X-ray', 'ans', 9)}`),

    /* 34. HF self-care teaching */
    teach: A(`
      <rect class="f-white" x="30" y="26" width="54" height="38" rx="8"/><rect class="f-good" x="40" y="32" width="34" height="12" rx="2"/>
      <g class="a-spin"><circle class="f-pancreas" cx="108" cy="30" r="8"/><path d="M108 16 v4 M108 40 v4 M94 30 h4 M118 30 h4 M98 20 l3 3 M115 37 l3 3 M98 40 l3 -3 M115 23 l3 -3" stroke="var(--c-pancreas)" stroke-width="2"/></g>
      ${qtag(75, 80, 'Weigh daily before meds', 9)}
      <rect class="f-vein" x="180" y="18" width="26" height="44" rx="5"/><rect class="f-white" x="183" y="23" width="20" height="30" rx="2"/>
      <g class="ans"><g class="a-rise"><path class="s-bad" d="M222 50 V26 M216 32 L222 25 L228 32" stroke-width="3"/></g>${tag(258, 38, '+3 lb', '', 9.5)}</g>
      ${qtag(225, 80, 'Call: up 2–3 lb in a day', 9)}
      <path class="f-white" d="M56 122 Q56 114 64 114 H76 Q84 114 84 122 V156 H56 Z"/><rect class="f-scar" x="57" y="104" width="26" height="11" rx="4"/>
      ${T(70, 142, 'Na', { c: 'tagtx', s: 10 })}
      <g class="ans"><g class="a-drop"><circle class="f-white" cx="64" cy="98" r="1.8"/></g><g class="a-pop">${nope(70, 132, 24)}</g></g>
      ${qtag(138, 136, 'Limit sodium', 9.5)}
      ${clock(196, 118, 14)}${pill(244, 118, -30, 'f-warn', 1.2)}${pill(270, 118, -30, 'f-warn', 1.2)}
      <g class="ans"><g class="a-pop">${nope(257, 118, 20)}</g></g>
      ${qtag(225, 150, 'Missed: skip if within 6 h', 9)}${tag(225, 168, 'Never double up', 'ans', 9)}`),
  });
})();
