/* Pharmacology rx10-htn art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 10 blood pressure drugs. Everything lives inside one function so the shape helpers
   below never clash with the other art files. Text is never placed inside a transformed group. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const at = (x, y, inner, s = 1) => `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" stroke-width="1" stroke-dasharray="2 3"/>`;
  const thick = (d, color, w = 7, more = '') => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path d="${d}" stroke="var(--c-${color})" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${more}/>`;
  const arr = (d, cls = 's-ink', w = 2) => `<path class="${cls}" d="${d}" stroke-width="${w}"/>`;
  const head = (x, y, a, c = 'var(--pic-ink)') => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0 L-7 -4 L-7 4 Z" fill="${c}"/>`;
  const tile = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--c-${c})" opacity=".2"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="var(--c-${c})" stroke-width="1.6"/>`;

  // little icons at their own origin (no text inside, place with at())
  const pill = (rot = -30, c = 'f-warn', c2 = 'f-white') => `<g transform="rotate(${rot})"><path class="${c}" d="M0 -6 H-9 A6 6 0 0 0 -9 6 H0 Z"/><path class="${c2}" d="M0 -6 H9 A6 6 0 0 1 9 6 H0 Z"/></g>`;
  const nope = (r = 14) => `<circle r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3.2"/><path d="M${-r * .7} ${-r * .7} L${r * .7} ${r * .7}" stroke="var(--c-bad)" stroke-width="3.2"/>`;
  const chk = (r = 8) => `<circle class="f-good" r="${r}"/><path class="s-white" d="M${-r * .45} 0 l${r * .32} ${r * .34} l${r * .58} ${-r * .64}" stroke-width="2.2"/>`;
  const HEART = 'M0 -8 C-2 -18 -20 -18 -19 -4 C-18 8 -6 14 0 20 C6 14 18 8 19 -4 C20 -18 2 -18 0 -8 Z';
  const heart = (cls = 'f-muscle') => `<path class="${cls}" d="${HEART}"/><path class="s-white" d="M-12 -6 Q-11 -11 -6 -12" stroke-width="2" opacity=".7"/>`;
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const kidney = (cls = 'f-muscle') => `<g transform="translate(-16 -22)"><path class="${cls}" d="${KID}"/><path class="s-line" d="M7 22 Q14 20 20 14 M7 22 Q14 24 20 30" stroke-width="1.2" opacity=".5"/></g>`;
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = () => `<g transform="translate(-23 -17)"><path class="f-mouth" d="${BRAIN}"/><path class="s-line" d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" stroke-width="1.2" opacity=".6"/></g>`;
  const LIVER = 'M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z';
  const drop = (c = 'f-water', s = 1) => `<g transform="scale(${s})"><path class="${c}" d="M0 -9 C3 -4 7 1 7 4 A7 7 0 0 1 -7 4 C-7 1 -3 -4 0 -9 Z"/></g>`;
  const moon = () => `<path class="f-nerve" d="M3 -12 A12 12 0 1 0 12 5 A9.5 9.5 0 0 1 3 -12 Z"/>`;
  const sun = () => `<path class="s-warn" d="M0 -15 V-11 M0 11 V15 M-15 0 H-11 M11 0 H15 M-10.6 -10.6 L-7.8 -7.8 M7.8 7.8 L10.6 10.6 M-10.6 10.6 L-7.8 7.8 M7.8 -7.8 L10.6 -10.6" stroke-width="2.2"/><circle class="f-nerve" r="7.5"/>`;
  const salt = () => `<path class="f-white" d="M-9 -8 Q-9 -18 0 -18 Q9 -18 9 -8 L8 16 H-8 Z"/><rect class="f-water noline" x="-7" y="-2" width="14" height="6" opacity=".6"/><circle cx="-3" cy="-13" r="1.2" fill="var(--art-line)"/><circle cx="3" cy="-13" r="1.2" fill="var(--art-line)"/><circle cx="0" cy="-9.5" r="1.2" fill="var(--art-line)"/>`;
  const grains = () => `<g class="a-drop"><rect class="f-white" x="-2" y="-24" width="3" height="3"/></g><g class="a-drop" style="animation-delay:.5s"><rect class="f-white" x="3" y="-26" width="3" height="3"/></g><g class="a-drop" style="animation-delay:1s"><rect class="f-white" x="-6" y="-26" width="3" height="3"/></g>`;
  const banana = () => `<path class="f-nerve" d="M-17 -9 C-14 10 10 14 18 -6 L15 -8 C8 4 -6 4 -12 -10 Z"/><path class="s-line" d="M-17 -9 l-2 -3 M18 -6 l2 -2" stroke-width="2"/>`;
  const scale = () => `<rect class="f-white" x="-17" y="-12" width="34" height="24" rx="6"/><path class="f-water" d="M-9 -3 A9 9 0 0 1 9 -3 Z"/><path class="s-line" d="M0 -3 L4 -9" stroke-width="1.6"/>`;
  const glass = () => `<path class="f-blood" d="M-8 -14 H8 Q9 -2 0 2 Q-9 -2 -8 -14 Z"/><path class="s-line" d="M0 2 V12 M-6 13 H6" stroke-width="2"/><path class="f-white noline" d="M-8 -14 H8 V-10 H-8 Z" opacity=".55"/>`;
  const plate = () => `<circle class="f-white" r="16"/><circle class="f-good" cx="-5" cy="-4" r="5"/><circle class="f-good" cx="-1" cy="-7" r="4"/><rect class="f-warn" x="2" y="-2" width="9" height="4" rx="2" transform="rotate(30)"/><circle class="f-bad" cx="-4" cy="7" r="3.5"/><circle class="f-pancreas" cx="7" cy="7" r="3.5"/>`;
  const shoe = () => `<path class="f-bad" d="M-16 6 L-15 -6 Q-10 -4 -5 -8 L3 0 Q12 2 16 6 Q16 10 12 10 H-14 Q-16 10 -16 6 Z"/><path class="s-white" d="M-8 -4 l3 3 M-4 -6 l3 3" stroke-width="1.5"/>`;
  const person = (c = 'f-water') => `<circle class="f-skin" cx="0" cy="-16" r="8"/><path class="${c}" d="M-12 18 V2 Q-12 -6 0 -6 Q12 -6 12 2 V18 Z"/>`;
  const lungs = () => `<path class="f-mouth" d="M-4 -12 C-14 -14 -20 4 -18 14 C-16 20 -6 18 -4 12 Z M4 -12 C14 -14 20 4 18 14 C16 20 6 18 4 12 Z"/><path class="s-line" d="M0 -18 V-6 M0 -6 L-5 0 M0 -6 L5 0" stroke-width="2"/>`;
  const thyroid = () => `<path class="f-mouth" d="M-2 0 C-6 -14 -18 -12 -16 2 C-15 12 -6 12 -2 6 Z M2 0 C6 -14 18 -12 16 2 C15 12 6 12 2 6 Z"/><rect class="f-mouth" x="-4" y="0" width="8" height="5" rx="2"/>`;
  const house = () => `<path class="f-pancreas" d="M-14 -2 L0 -14 L14 -2 V14 H-14 Z"/><rect class="f-white" x="-4" y="4" width="8" height="10"/><path class="s-line" d="M-17 0 L0 -16 L17 0" stroke-width="2"/>`;
  const coat = () => `<path class="f-white" d="M-14 16 V-6 Q-14 -12 -6 -14 L0 -4 L6 -14 Q14 -12 14 -6 V16 Z"/><circle class="f-skin" cy="-20" r="7"/><path class="s-vein" d="M-5 -6 Q-8 6 0 8 Q8 6 5 -6" stroke-width="1.6"/><circle class="f-vein" cx="0" cy="9" r="2.4"/>`;
  const cal = (c = 'f-bad') => `<rect class="f-white" x="-12" y="-11" width="24" height="23" rx="3"/><rect class="${c}" x="-12" y="-11" width="24" height="7" rx="2"/><path class="s-line" d="M-6 -14 V-8 M6 -14 V-8" stroke-width="2"/>`;
  const bottle = (c = 'f-good') => `<rect class="f-white" x="-7" y="-19" width="14" height="6" rx="1.5"/><rect class="${c}" x="-9" y="-13" width="18" height="28" rx="3"/><rect class="f-white" x="-6" y="-6" width="12" height="11" rx="1.5"/>`;
  const zzz = () => `<path class="s-vein" d="M0 0 h6 l-6 7 h6 M9 -9 h5 l-5 6 h5" stroke-width="1.8"/>`;
  const belly = () => `<circle class="f-skin" cx="-4" cy="-24" r="8"/><path class="f-skin" d="M-12 24 L-10 -14 Q-4 -18 2 -12 Q20 -6 18 10 Q16 22 2 22 L0 24 Z"/><circle class="f-mouth a-bob" cx="6" cy="6" r="7"/>`;
  const lips = (swell = false) => `<path class="f-mouth${swell ? ' a-pulse' : ''}" d="M-14 0 Q-7 -${swell ? 9 : 6} 0 -3 Q7 -${swell ? 9 : 6} 14 0 Q7 ${swell ? 11 : 7} 0 ${swell ? 11 : 7} Q-7 ${swell ? 11 : 7} -14 0 Z"/><path class="s-line" d="M-12 0 H12" stroke-width="1"/>`;
  const steps = () => `<path class="f-warn" d="M-22 14 V-14 H-10 V-6 H2 V2 H14 V10 H22 V14 Z"/>`;

  // vessel: outer wall + lumen; r1 -> r2 animates the lumen (dilate when r2 > r1)
  const vessel = (x, y, w, r1, r2 = r1, dur = 2.8, flow = true) => {
    const anim = r2 !== r1 ? `<animate attributeName="height" values="${2 * r1};${2 * r2};${2 * r2};${2 * r1}" keyTimes="0;.4;.8;1" dur="${dur}s" repeatCount="indefinite"/><animate attributeName="y" values="${y - r1};${y - r2};${y - r2};${y - r1}" keyTimes="0;.4;.8;1" dur="${dur}s" repeatCount="indefinite"/>` : '';
    const wall = Math.max(r1, r2) + 5;
    return `<rect class="f-muscle" x="${x}" y="${y - wall}" width="${w}" height="${2 * wall}" rx="6"/><rect class="f-skin noline" x="${x}" y="${y - wall + 3}" width="${w}" height="${2 * wall - 6}" opacity=".35"/>` +
      `<rect class="f-blood" x="${x}" y="${y - r1}" width="${w}" height="${2 * r1}">${anim}</rect>` +
      (flow ? `<path class="s-white a-flow" d="M${x + 4} ${y} H${x + w - 4}" stroke-width="1.6"/>` : '');
  };

  // half-dial gauge at (cx, cy) radius r; angles in degrees from straight up (-90 left .. 90 right)
  const arcP = (r, a1, a2) => {
    const p = a => [(r * Math.sin(a * Math.PI / 180)).toFixed(1), (-r * Math.cos(a * Math.PI / 180)).toFixed(1)];
    const [x1, y1] = p(a1), [x2, y2] = p(a2);
    return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`;
  };
  const dial = (cx, cy, r, zones = [['good', -90, -25], ['warn', -25, 25], ['bad', 25, 90]]) =>
    `<g transform="translate(${cx} ${cy})"><path class="f-white" d="M${-r - 4} 2 A${r + 4} ${r + 4} 0 0 1 ${r + 4} 2 Z"/>` +
    zones.map(([c, a, b]) => `<path d="${arcP(r - 6, a, b)}" stroke="var(--c-${c})" stroke-width="${Math.max(5, r / 6)}" fill="none"/>`).join('') + `</g>`;
  const hub = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="3.5" fill="var(--art-line)"/>`;
  // needle at fixed angle (cls e.g. 'a-sway' wiggles it, kept on an inner group)
  const needle = (cx, cy, r, a, cls = '') => `<g transform="translate(${cx} ${cy}) rotate(${a})"><g class="${cls}"><path class="s-line" d="M0 0 L0 ${-(r - 9)}" stroke-width="2.6"/></g></g>`;
  // needle that sweeps a1 -> a2 on the back; the front shows it resting at a1
  const sweep = (cx, cy, r, a1, a2, dur = 3) => `<g transform="translate(${cx} ${cy})">` +
    `<g class="q"><g transform="rotate(${a1})"><path class="s-line" d="M0 0 L0 ${-(r - 9)}" stroke-width="2.6"/></g></g>` +
    `<g class="ansmotion"><path class="s-line" d="M0 0 L0 ${-(r - 9)}" stroke-width="2.6"><animateTransform attributeName="transform" type="rotate" values="${a1};${a2};${a2};${a1}" keyTimes="0;.4;.85;1" dur="${dur}s" repeatCount="indefinite"/></path></g></g>` + hub(cx, cy);

  // ECG strip: n beats across width w starting at (x, y); gaps = beat indexes to skip (dropped beats)
  const ecg = (x, y, w, n, amp = 14, gaps = []) => {
    let d = `M${x} ${y}`; const s = w / n;
    for (let i = 0; i < n; i++) {
      const b = x + i * s;
      if (gaps.includes(i)) { d += ` L${(b + s).toFixed(1)} ${y}`; continue; }
      d += ` L${(b + s * .15).toFixed(1)} ${y} q${(s * .05).toFixed(1)} ${(-amp * .22).toFixed(1)} ${(s * .1).toFixed(1)} 0 L${(b + s * .36).toFixed(1)} ${y}` +
        ` l${(s * .03).toFixed(1)} ${(amp * .18).toFixed(1)} l${(s * .04).toFixed(1)} ${(-amp * 1.18).toFixed(1)} l${(s * .05).toFixed(1)} ${(amp * 1.3).toFixed(1)} l${(s * .03).toFixed(1)} ${(-amp * .3).toFixed(1)}` +
        ` L${(b + s * .64).toFixed(1)} ${y} q${(s * .08).toFixed(1)} ${(-amp * .38).toFixed(1)} ${(s * .16).toFixed(1)} 0 L${(b + s).toFixed(1)} ${y}`;
    }
    return d;
  };
  const strip = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff4f4" stroke="var(--art-line)" stroke-width="1.2"/>` +
    `<path d="${Array.from({ length: Math.floor(w / 10) }, (_, i) => `M${x + 10 + i * 10} ${y + 2} V${y + h - 2}`).join(' ')}" stroke="#f4b6b6" stroke-width=".6"/>`;
  const trace = (d, c = 'blood', dur = 2.6) => `<path d="${d}" pathLength="400" fill="none" stroke="var(--c-${c})" stroke-width="1.8" stroke-linejoin="round" class="a-draw" style="animation-duration:${dur}s"/>`;

  // moving chip with a label: drawn at (20, 20) and the motion path shifted back, so the text box stays on-frame
  const shift = d => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - 20} ${+b - 20}`);
  const bubble = (cls, txt, path, dur, begin = 0, r = 10, more = '') => `<g><circle class="${cls}" cx="20" cy="20" r="${r}"/><text class="tagtx" x="20" y="23.2" text-anchor="middle" style="font-size:9px">${txt}</text><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path)}" ${more}/></g>`;
  // still molecule chip
  const chip = (x, y, t, c = 'water', w = 0, size = 9) => {
    const ww = w || String(t).length * size * .56 + 12;
    return `<rect x="${x - ww / 2}" y="${y - 8}" width="${ww}" height="16" rx="8" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.3"/>${T(x, y + size * .36, t, { c: 'tagtx', s: size })}`;
  };
  const pop = (d, inner) => `<g class="a-pop" style="--d:${d}">${inner}</g>`;

  // 6-tile grid (3 x 2): items = [color, iconSvg, answerLabel, labelSize, hideIcon]
  const grid6 = (title, items, foot = '') => {
    let s = tag(150, 11, title, '', 10);
    items.forEach(([c, ic, lab, sz = 9.5, hide], i) => {
      const col = i % 3, row = Math.floor(i / 3), x = 8 + col * 96, y = 24 + row * (foot ? 70 : 78), h = foot ? 64 : 72;
      s += tile(x, y, 92, h, c) + (hide ? `<g class="ans">${pop(i, at(x + 46, y + 26, ic))}</g>` : at(x + 46, y + 26, ic)) + qtag(x + 46, y + h - 12, lab, sz);
    });
    return ART(s + foot);
  };
  // 4-tile grid (2 x 2): icon left, label right
  const grid4 = (title, items, foot = '', extra = '') => {
    let s = tag(150, 11, title, '', 10);
    items.forEach(([c, ic, lab, sz = 9.5, hide], i) => {
      const col = i % 2, row = Math.floor(i / 2), x = 8 + col * 146, y = 24 + row * (foot ? 64 : 76), h = foot ? 58 : 70;
      s += tile(x, y, 138, h, c) + (hide ? `<g class="ans">${pop(i, at(x + 28, y + h / 2, ic))}</g>` : at(x + 28, y + h / 2, ic)) + qtag(x + 94, y + h / 2, lab, sz);
    });
    return ART(s + foot + extra);
  };

  Object.assign(PICS, {

    /* 1-2. Definition: BP stages ladder + cuff dial */
    define: ART(`
      ${tag(62, 12, 'Cuff reading', '', 10)}
      ${dial(62, 96, 50, [['good', -90, -40], ['nerve', -40, -10], ['warn', -10, 30], ['bad', 30, 90]])}
      ${sweep(62, 96, 50, -75, 62, 3.6)}
      ${T(62, 116, 'mmHg', { s: 9.5 })}
      ${[['good', 'Normal', 'Under 120/80'], ['nerve', 'Elevated', '120–129 / <80'], ['warn', 'Stage 1', '130–139 / 80–89'], ['bad', 'Stage 2', '140/90 or more']].map(([c, n, v], i) =>
        pop(i, `<rect x="122" y="${24 + i * 30}" width="170" height="25" rx="8" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.3"/>`) + tag(152, 36.5 + i * 30, n, '', 9.5) + qtag(237, 36.5 + i * 30, v, 9.5)).join('')}
      <g class="ans">
        <path class="s-bad a-blink" d="M118 82 H296" stroke-width="2.4" stroke-dasharray="5 4"/>
        ${pop(5, at(30, 150, cal()))}${pop(6, at(62, 150, cal()))}
        ${tag(196, 156, 'HTN: 130/80+ on 2 visits', 'ans', 10)}
      </g>
      ${q(196, 156)}`),

    /* 3-4. Four first-line classes + stage 2 starts two */
    firstLine: ART(`
      ${tag(150, 11, '4 first-line classes', '', 10)}
      ${tile(8, 22, 68, 98, 'water')}${tile(80, 22, 68, 98, 'pancreas')}${tile(152, 22, 68, 98, 'good')}${tile(224, 22, 68, 98, 'immune')}
      ${at(42, 56, `<path class="s-water a-flow" d="M-20 -14 C-8 -4 -14 8 -2 14" stroke-width="2.2"/>${kidney()}`)}
      <g class="a-drop">${at(56, 66, drop('f-water', .8))}</g>
      ${at(114, 58, `<path class="f-pancreas" d="M0 0 L16 -9 A18 18 0 1 0 16 9 Z"/><circle cx="-2" cy="-8" r="2.2" fill="var(--art-line)"/>`)}
      <g class="ans a-pop" style="--d:1">${at(130, 58, pill(0, 'f-bad'), .8)}</g>
      ${at(186, 60, `<path class="f-good" d="M-14 18 V0 Q-14 -6 -8 -6 V-16 H-4 V0 H4 V-16 H8 V-6 Q14 -6 14 0 V18 Z"/>`)}
      <g class="ans a-pop" style="--d:2">${at(186, 46, pill(90, 'f-bad'), .8)}</g>
      ${at(258, 60, `<rect class="f-immune" x="-16" y="-18" width="10" height="36" rx="3"/><rect class="f-immune" x="6" y="-18" width="10" height="36" rx="3"/>`)}
      <g class="a-bob">${at(258, 34, `<circle class="f-nerve" r="6"/>`)}</g>
      <g class="ans a-pop" style="--d:3">${at(258, 58, `<rect class="f-bad" x="-6" y="-6" width="12" height="12" rx="2"/>`)}</g>
      ${qtag(42, 104, 'Thiazide')}${qtag(114, 104, 'ACE-I')}${qtag(186, 104, 'ARB')}${qtag(258, 104, 'CCB')}
      ${tag(40, 150, 'Stage 2', '', 10)}
      <g class="ans">
        <g class="a-pop" style="--d:4">${at(102, 150, pill(0, 'f-water'))}</g>
        ${T(124, 154, '+', { s: 14 })}
        <g class="a-pop" style="--d:5">${at(146, 150, pill(0, 'f-pancreas'))}</g>
        ${tag(226, 150, '2 drugs, 2 classes', 'ans', 10)}
      </g>
      ${q(180, 150)}`),

    /* 5. Second-line options */
    secondLine: grid6('Second-line BP drugs', [
      ['bad', `<g class="a-beat" style="animation-duration:1.8s">${heart()}</g>`, 'Beta blocker'],
      ['water', `<path class="s-line" d="M-12 -16 V4 A12 12 0 0 0 12 4 V-16" stroke-width="10"/><path d="M-12 -16 V4 A12 12 0 0 0 12 4 V-16" stroke="var(--c-water)" stroke-width="7" fill="none"/><path class="s-white a-flow" d="M-12 -16 V4 A12 12 0 0 0 12 4 V-16" stroke-width="1.6"/>`, 'Loop diuretic'],
      ['muscle', `${kidney()}<g transform="translate(16 -10)">${nope(9)}</g>`, 'Renin inhibitor', 9],
      ['blood', vessel(-30, 0, 60, 5, 10) + `<g transform="translate(18 -18)">${pill(-30, 'f-immune')}</g>`, 'Alpha-1 blocker', 9],
      ['mouth', `<g class="a-pulse">${brain()}</g>`, 'Alpha-2 agonist', 9],
      ['warn', vessel(-30, 0, 60, 7, 11, 2) + `<path class="s-warn" d="M-8 -22 V-16 M8 -22 V-16 M-8 22 V16 M8 22 V16" stroke-width="2"/>`, 'Vasodilator'],
    ]),

    /* 6. Stage 1: decide by risk */
    stage1: ART(`
      ${tag(36, 90, 'Stage 1', '', 10)}
      ${arr('M64 90 H72')}${head(76, 90, 0)}
      <path class="f-warn" d="M124 56 L178 90 L124 124 L70 90 Z"/>
      ${qtag(124, 90, 'CVD or ASCVD 10%+', 9)}
      <path class="s-good" d="M162 78 L196 46" stroke-width="2.5"/><path class="s-bad" d="M162 102 L196 134" stroke-width="2.5"/>
      ${tag(170, 54, 'Yes', '', 9.5)}${tag(170, 126, 'No', '', 9.5)}
      ${tile(200, 18, 92, 58, 'good')}${tile(200, 104, 92, 58, 'scar')}
      <g class="ans">
        ${pop(0, at(220, 38, shoe(), .8))}${T(238, 42, '+', { s: 13 })}${pop(1, at(256, 38, pill(-30, 'f-bad')))}
        ${pop(2, at(278, 38, cal('f-good'), .75))}
        ${tag(246, 64, 'Recheck 1 month', 'ans', 9)}
        ${pop(3, at(230, 124, shoe(), .8))}${pop(4, at(266, 124, cal('f-scar'), .75))}
        ${tag(246, 150, 'Recheck 3–6 mo', 'ans', 9)}
      </g>
      ${q(246, 46)}${q(246, 132)}
      ${tag(124, 162, 'Lifestyle for everyone', '', 9.5)}
      <g class="ansmotion"><circle class="f-nerve" r="5"><animateMotion dur="3.2s" repeatCount="indefinite" path="M60 90 L124 90 L196 46 L246 46"/></circle></g>`),

    /* 7. Goal under 130/80 */
    goal: ART(`
      ${tag(100, 12, 'BP goal, most adults', '', 10)}
      ${dial(100, 118, 78, [['good', -90, -15], ['warn', -15, 30], ['bad', 30, 90]])}
      ${sweep(100, 118, 78, 70, -48, 3.6)}
      <g class="a-blink">${T(52, 106, 'goal', { s: 10, c: 'tagtx' })}</g>
      ${qtag(100, 146, 'Under 130/80', 13)}
      ${tag(246, 24, 'Same goal with', '', 9.5)}
      <g class="ans">
        ${pop(0, at(212, 52, drop('f-pancreas', 1.1)))}${tag(256, 52, 'Diabetes', 'ans', 9.5)}
        ${pop(1, at(212, 84, kidney(), .62))}${tag(256, 84, 'CKD', 'ans', 9.5)}
        ${pop(2, at(212, 116, heart(), .6))}${tag(256, 116, 'Heart failure', 'ans', 9)}
        ${pop(3, at(212, 148, heart('f-bad'), .6))}${tag(256, 148, 'Coronary dz', 'ans', 9)}
      </g>
      ${q(246, 84)}${q(246, 132)}`),

    /* 8. Black patients without HF or CKD */
    black: ART(`
      ${tag(150, 11, 'Black patients, no HF or CKD', '', 10)}
      ${[['f-water', 'Thiazide', 1], ['f-immune', 'CCB', 1], ['f-pancreas', 'ACE-I', 0], ['f-good', 'ARB', 0]].map(([c, n, good], i) => {
        const x = 42 + i * 72;
        return `<g class="${good ? 'a-bob' : ''}">${at(x, 70, bottle(c), 1.5)}</g>` + tag(x, 108, n, '', 10) +
          `<g class="ans">${pop(i, at(x, 34, good ? chk(9) : `<circle class="f-white" r="9"/><path class="s-bad" d="M0 -5 V4 M-4 0 L0 5 L4 0" stroke-width="2.2"/>`))}</g>` + q(x, 34);
      }).join('')}
      ${tag(222, 130, 'Less BP drop + angioedema', 'ans', 9)}
      ${qtag(78, 140, 'Start one of these')}`),

    /* 9. CKD / protein in urine: ACE-I or ARB lowers glomerular pressure */
    ckd: ART(`
      ${tag(150, 11, 'CKD or diabetes, protein in urine', '', 9.5)}
      <circle class="f-mucus" cx="150" cy="100" r="38"/><circle cx="150" cy="100" r="30" fill="var(--c-water)" opacity=".35"/>
      ${thick('M164 134 C176 150 200 160 240 166', 'water', 7)}
      ${thick('M20 90 L126 98', 'blood', 9)}
      <g class="q">${thick('M174 98 L280 90', 'blood', 5)}</g>
      <g class="ans"><path class="s-line" d="M174 98 L280 90" stroke-width="8"><animate attributeName="stroke-width" values="8;14;14;8" keyTimes="0;.4;.85;1" dur="3s" repeatCount="indefinite"/></path><path d="M174 98 L280 90" stroke="var(--c-blood)" stroke-width="5" fill="none" stroke-linecap="round"><animate attributeName="stroke-width" values="5;11;11;5" keyTimes="0;.4;.85;1" dur="3s" repeatCount="indefinite"/></path></g>
      <g class="a-pulse">${[[140, 92], [158, 90], [150, 104], [136, 108], [164, 106], [150, 118]].map(([x, y]) => `<circle class="f-blood" cx="${x}" cy="${y}" r="9"/>`).join('')}</g>
      <g class="q">${[[180, 150], [198, 158], [218, 163]].map(([x, y]) => `<circle class="f-pancreas" cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
      <g class="ansmotion"><circle class="f-pancreas" r="3"><animateMotion dur="3s" repeatCount="indefinite" path="M166 136 C176 150 200 160 240 166" keyPoints="0;1;1" keyTimes="0;.35;1" calcMode="linear"/><animate attributeName="opacity" values="1;0;0" keyTimes="0;.4;1" dur="3s" repeatCount="indefinite"/></circle></g>
      ${tag(70, 160, 'Protein leaks', '', 9.5)}${L('M108 160 L176 152')}
      ${tag(52, 76, 'In', '', 9)}${tag(252, 74, 'Out', '', 9)}
      <g class="ans">${pop(1, at(236, 116, pill(-20, 'f-good')))}${tag(250, 136, 'Pressure ↓', 'ans', 9)}</g>
      ${qtag(150, 44, 'ACE inhibitor or ARB', 10)}`),

    /* 10. Pregnancy: never vs. safe */
    preg: ART(`
      ${tag(56, 12, 'Never', '', 10)}${tag(244, 12, 'Can use', '', 10)}
      ${at(150, 96, belly(), 1.7)}
      <g class="ans">
        <g class="a-pulse"><circle cx="160" cy="106" r="20" fill="none" stroke="var(--c-good)" stroke-width="2.4" stroke-dasharray="4 3"/></g>
        ${['ACE inhibitors', 'ARBs', 'Aliskiren'].map((n, i) => pop(i, at(16, 42 + i * 40, nope(8)))).join('')}
        ${[0, 1, 2, 3].map(i => pop(3 + i, at(290, 38 + i * 32, chk(6)))).join('')}
        ${tag(56, 164, 'Harm the fetus', 'ans', 9.5)}
      </g>
      ${['ACE inhibitors', 'ARBs', 'Aliskiren'].map((n, i) => qtag(64, 42 + i * 40, n, 9.5)).join('')}
      ${['Labetalol', 'Nifedipine', 'Methyldopa', 'Hydralazine'].map((n, i) => qtag(244, 38 + i * 32, n, 9.5)).join('')}`),

    /* 11. Primary vs. secondary: pie */
    primary: ART(`
      ${tag(150, 11, 'Types of hypertension', '', 10)}
      <circle class="f-water" cx="84" cy="98" r="58"/>
      <g class="a-pulse"><path class="f-warn" d="M84 98 L84 40 A58 58 0 0 1 118 51 Z"/></g>
      <circle cx="84" cy="98" r="64" fill="none" stroke="var(--c-water)" stroke-width="3" pathLength="400" class="a-draw" transform="rotate(-90 84 98)"/>
      ${qtag(74, 112, 'Primary (essential)', 10)}
      ${L('M106 46 L170 46')}${qtag(206, 46, 'Secondary')}
      <g class="ans">
        ${tag(78, 132, 'Over 90%', 'ans', 9.5)}
        ${tag(226, 96, 'Primary: no one cause', 'ans', 9.5)}
        ${tag(226, 122, 'Secondary: treatable', 'ans', 9.5)}
        ${tag(226, 148, 'cause or a drug', 'ans', 9.5)}
      </g>
      ${q(226, 122)}`),

    /* 12-13. Secondary causes + when to suspect */
    secondary: ART(`
      ${tag(150, 11, 'BP up from a cause', '', 10)}
      ${dial(150, 96, 36)}${sweep(150, 96, 36, -60, 70, 3)}
      ${at(44, 32, `${moon()}<g transform="translate(10 -8)">${zzz()}</g>`)}
      ${at(44, 80, kidney(), .7)}
      ${at(44, 124, `${kidney()}<path class="f-pancreas" d="M-12 -18 Q0 -34 16 -20 Q4 -18 -12 -18 Z"/>`, .7)}
      ${at(256, 32, thyroid())}
      ${at(250, 80, pill(-30, 'f-bad'))}${at(266, 74, pill(30, 'f-pancreas'))}
      <g class="a-squeeze">${at(256, 124, `<path class="f-blood" d="M-22 -7 H-6 Q0 -2 6 -7 H22 V7 H6 Q0 2 -6 7 H-22 Z"/>`)}</g>
      ${qtag(44, 52, 'Sleep apnea', 9.5)}${qtag(44, 102, 'CKD', 9.5)}${qtag(46, 146, 'Aldosteronism', 9)}
      ${qtag(256, 52, 'Hyperthyroid', 9.5)}${qtag(256, 100, 'NSAIDs, OCPs', 9.5)}${qtag(256, 146, 'Coarctation', 9.5)}
      ${qtag(150, 168, 'Suspect: sudden, under 30, new drug', 9.5)}`),

    /* 14. Risk factors */
    risk: grid6('Hypertension risk factors', [
      ['scar', `<path class="f-white" d="M-10 -16 H10 L0 0 L10 16 H-10 L0 0 Z"/><g class="a-blink"><path class="f-pancreas noline" d="M-6 -12 H6 L0 -3 Z M0 4 L7 13 H-7 Z"/></g>`, 'Older age'],
      ['vein', `${at(-10, 4, person('f-vein'), .7)}${at(10, 4, person('f-mouth'), .7)}${at(0, 10, person('f-pancreas'), .5)}`, 'Family history', 9],
      ['warn', `<g class="a-bob">${scale()}</g>`, 'Obesity, inactive', 9],
      ['water', `${at(-10, 2, salt(), .8)}<g transform="translate(-10 2)">${grains()}</g>${at(12, 4, banana(), .7)}<path class="s-bad" d="M12 -14 V-6 M8 -10 L12 -5 L16 -10" stroke-width="2"/>`, 'High Na, low K', 9],
      ['blood', `${at(-9, 0, glass())}${at(12, 2, `<rect class="f-white" x="-3" y="-14" width="6" height="22" rx="1"/><rect class="f-warn" x="-3" y="4" width="6" height="5"/>`)}<g class="a-rise">${at(12, -18, `<path class="s-scar" d="M0 0 q-3 -4 0 -8" stroke-width="1.6"/>`)}</g>`, 'Alcohol, tobacco', 9],
      ['muscle', `${at(-10, 0, drop('f-pancreas', 1.3))}${at(12, 0, kidney(), .6)}`, 'Diabetes, CKD', 9],
    ]),

    /* 15. White coat vs. masked */
    whiteCoat: ART(`
      ${at(150, 30, coat(), .75)}${tag(186, 18, 'Office', '', 9.5)}
      ${at(240, 30, house(), .9)}${tag(274, 18, 'Home', '', 9.5)}
      ${tag(54, 78, 'White coat', '', 10)}${tag(54, 138, 'Masked', '', 10)}
      ${[[150, 92, 60], [240, 92, -50], [150, 152, -50], [240, 152, 60]].map(([x, y, a], i) =>
        dial(x, y, 30) + `<g class="ans">${needle(x, y, 30, a, 'a-sway')}</g>` + hub(x, y) + q(x, y - 14, 8)).join('')}
      <g class="ans">
        ${tag(150, 103, 'High', 'ans', 9)}${tag(240, 103, 'Normal', 'ans', 9)}
        ${tag(150, 163, 'Normal', 'ans', 9)}${tag(240, 163, 'High', 'ans', 9)}
        ${tag(54, 158, 'More CV risk', 'ans', 9)}
      </g>
      ${q(54, 158, 7)}`),

    /* 16. Home BP monitoring */
    homeBP: ART(`
      ${tag(100, 11, 'Home BP check', '', 10)}
      <path class="f-skin" d="M6 46 H104 Q112 46 114 54 L190 60 Q198 61 198 68 Q198 75 190 76 L114 80 Q108 82 100 82 H6 Z"/>
      <path class="s-line" d="M108 52 Q112 64 108 78" stroke-width="1" opacity=".5"/>
      <g class="a-pulse"><rect class="f-water" x="36" y="40" width="52" height="48" rx="6"/></g>
      ${L('M106 88 V102')}${tag(112, 110, 'Elbow bend', '', 9)}
      ${thick('M62 90 Q60 104 66 116', 'scar', 3)}
      <rect class="f-white" x="30" y="116" width="76" height="40" rx="6"/><rect x="38" y="122" width="60" height="20" rx="3" fill="#dff7e8" stroke="var(--art-line)" stroke-width="1"/>
      ${T(68, 136.5, '128/78', { s: 10, c: 'tagtx' })}
      ${qtag(62, 28, 'Cuff above elbow', 9.5)}
      ${qtag(68, 168, 'Same validated cuff', 9.5)}
      ${tile(204, 22, 88, 46, 'nerve')}${at(226, 40, sun(), .8)}${at(268, 40, moon(), .8)}
      ${qtag(248, 60, 'AM pre-meds + PM', 9)}
      ${tile(204, 74, 88, 40, 'water')}
      <g class="ans">${pop(1, `<rect class="f-white" x="208" y="80" width="20" height="14" rx="3"/>`)}${pop(3, `<rect class="f-white" x="268" y="80" width="20" height="14" rx="3"/>`)}<g class="a-blink">${tag(248, 87, '1 min', 'ans', 9)}</g></g>
      ${qtag(248, 104, '2 readings', 9.5)}
      ${tile(204, 120, 88, 52, 'good')}
      <rect class="f-white" x="216" y="126" width="24" height="30" rx="2"/>
      <g class="ans"><path class="s-ink a-draw" pathLength="400" d="M220 133 H236 M220 139 H236 M220 145 H236 M220 151 H232" stroke-width="1.4"/></g>
      ${qtag(264, 140, 'Log it', 9.5)}`),

    /* 17. Lifestyle */
    lifestyle: grid6('Lifestyle lowers BP', [
      ['warn', `<g class="a-bob">${scale()}</g><path class="s-good" d="M22 -12 V0 M18 -4 L22 1 L26 -4" stroke-width="2"/>`, '1 mmHg per kg', 9],
      ['good', `<g class="a-spin" style="animation-duration:8s">${plate()}</g>`, 'DASH diet', 9.5],
      ['water', `${salt()}<g>${grains()}</g>`, 'Na < 1,500 mg', 9],
      ['nerve', `<g class="a-sway">${banana()}</g>`, 'K 3,500–5,000', 9],
      ['bad', `<g class="a-shake">${shoe()}</g>`, '90–150 min/week', 9],
      ['blood', `${glass()}<g transform="translate(14 -6)">${nope(8)}</g>`, 'Limit alcohol', 9.5],
    ]),

    /* 18. BP = cardiac output x resistance */
    bpPhys: ART(`
      ${tag(150, 11, 'Blood pressure =', '', 10.5)}
      <g class="a-beat">${at(46, 70, heart(), 1.4)}</g>
      ${qtag(46, 116, 'Cardiac output', 10)}
      ${T(104, 78, '×', { s: 22 })}
      <path class="f-muscle" d="M126 50 H180 Q205 60 230 50 H290 V94 H230 Q205 84 180 94 H126 Z"/>
      <path class="f-blood" d="M126 58 H180 Q205 68 230 58 H290 V86 H230 Q205 76 180 86 H126 Z"/>
      <g class="ans"><g class="a-squeeze"><path class="s-white" d="M196 50 V60 M214 50 V60 M196 94 V84 M214 94 V84" stroke-width="2"/></g></g>
      <path class="s-white a-flow" d="M130 72 H286" stroke-width="1.8"/>
      ${qtag(208, 116, 'Peripheral resistance', 10)}
      ${dial(150, 166, 24)}${sweep(150, 166, 24, -60, 40, 2.4)}
      ${tag(242, 156, 'Normal MAP 70–110', 'ans', 9.5)}${q(242, 156)}`),

    /* 19. RAAS */
    raas: ART(`
      ${at(30, 40, kidney(), .9)}${tag(30, 72, 'Kidney', '', 9)}
      ${at(120, 150, `<path class="f-liver" d="${LIVER}" transform="translate(-36 -18) scale(.6)"/>`)}${tag(120, 172, 'Angiotensinogen', '', 9)}
      ${at(206, 40, lungs())}
      ${arr('M52 40 H100')}${head(104, 40, 0)}
      ${chip(130, 40, 'Ang I', 'pancreas')}
      ${arr('M150 40 H176')}${head(180, 40, 0)}
      ${arr('M232 40 H244')}${head(248, 40, 0)}
      ${chip(270, 40, 'Ang II', 'bad')}
      ${arr('M120 136 L128 56')}${head(129, 52, -82)}
      ${arr('M270 50 V92')}${head(270, 96, 90)}
      ${vessel(238, 110, 56, 7, 3, 2.4, false)}
      ${arr('M256 52 L190 100')}${head(186, 103, 144)}
      ${at(170, 112, `<path class="f-pancreas" d="M-14 0 Q0 -18 14 0 Q0 -4 -14 0 Z"/>${kidney()}`, .65)}
      ${arr('M150 116 L96 116')}${head(92, 116, 180)}
      ${chip(46, 116, 'Na', 'nerve', 22)}${at(70, 116, drop('f-water'))}
      ${qtag(76, 26, 'Renin', 9.5)}${qtag(206, 66, 'ACE (lungs)', 9.5)}
      ${qtag(264, 140, 'Squeeze', 9.5)}${qtag(170, 140, 'Aldosterone', 9.5)}
      ${tag(54, 144, 'Keep Na + water', '', 9)}
      <g class="ansmotion">${bubble('f-pancreas', '', 'M60 40 L120 40 L170 40 L206 40 L250 40', 3, 0, 4)}</g>`),

    /* 20. Thiazide mechanism */
    thiazide: ART(`
      ${tag(70, 11, 'Nephron', '', 9.5)}
      <circle class="f-blood" cx="24" cy="36" r="11"/>
      ${thick('M34 34 C52 24 60 40 52 52 L52 140 Q60 158 68 140 L68 64 C74 48 92 46 96 58 C100 70 108 52 112 40 C114 32 118 30 118 30', 'water', 6)}
      ${thick('M118 28 V166', 'mucus', 7)}
      <path d="M68 64 C74 48 92 46 96 58 C100 70 108 52 112 40" stroke="var(--c-warn)" stroke-width="6" fill="none" stroke-linecap="round" class="a-blink"/>
      ${qtag(84, 82, 'Distal tubule', 9.5)}
      <circle cx="96" cy="56" r="14" fill="none" class="s-ink" stroke-width="1.2"/>
      ${L('M108 48 L148 26 M108 66 L148 160')}
      <rect class="f-water" x="148" y="24" width="50" height="138" rx="4" opacity=".55"/>
      <rect class="f-skin" x="198" y="24" width="48" height="138"/>
      <rect class="f-blood" x="246" y="24" width="46" height="138" rx="4" opacity=".85"/>
      ${tag(173, 33, 'Urine', '', 9)}${tag(269, 33, 'Blood', '', 9)}
      <ellipse class="f-good" cx="198" cy="90" rx="7" ry="13"/>
      <g class="q">${arr('M168 82 H230', 's-ink', 1.6)}${head(234, 82, 0)}${chip(166, 70, 'Na', 'nerve', 22)}${chip(166, 100, 'Cl', 'good', 20)}</g>
      <g class="ans">
        ${pop(0, at(198, 66, pill(90, 'f-bad')))}
        <g class="ansmotion">${bubble('f-nerve', 'Na', 'M170 70 L188 84 L170 110 L170 150', 2.8)}${bubble('f-good', 'Cl', 'M162 100 L188 96 L160 120 L160 150', 2.8, .6)}</g>
        <g class="a-drop">${at(172, 140, drop('f-water'))}</g>
      </g>
      ${qtag(222, 116, 'Na/Cl stay in', 9.5)}
      ${tag(210, 172, 'Less volume, then resistance', 'ans', 9)}${q(150, 172, 7)}`),

    /* 21. Chlorthalidone lasts longer */
    chlorthal: ART(`
      ${tag(150, 11, 'Preferred thiazide', '', 10)}
      <path class="s-ink" d="M96 130 H290" stroke-width="1.4"/>
      ${[0, 12, 24, 36, 48].map(h => `<path class="s-ink" d="M${96 + h * 4} 130 V134" stroke-width="1.2"/>` + T(96 + h * 4, 145, `${h}h`, { s: 9, w: 400 })).join('')}
      <path class="s-bad" d="M192 34 V130" stroke-width="1.6" stroke-dasharray="4 3"/>${tag(192, 156, '24 hours', '', 9)}
      ${at(30, 64, pill(0, 'f-water'))}${tag(66, 64, 'HCTZ', '', 9.5)}
      ${thick('M96 64 H144', 'water', 10, 'pathLength="400" class="a-draw"')}
      ${at(30, 104, pill(0, 'f-good'))}
      ${thick('M96 104 H282', 'good', 10, 'pathLength="400" class="a-draw"')}
      ${qtag(152, 86, 'Chlorthalidone', 10.5)}
      <g class="ans">
        ${pop(3, at(30, 86, `<path class="f-nerve" d="M-10 6 L-12 -6 L-5 0 L0 -9 L5 0 L12 -6 L10 6 Z"/>`))}
        ${tag(236, 70, 'Lasts 24h+', 'ans', 9.5)}
        ${tag(80, 168, 'Better outcome data than HCTZ', 'ans', 9.5)}
      </g>
      ${q(236, 70)}`),

    /* 22. Thiazide side effects */
    thiazideAE: grid6('Thiazide side effects', [
      ['nerve', `${banana()}<g class="a-drop"><path class="s-bad" d="M22 -14 V0 M17 -5 L22 1 L27 -5" stroke-width="2.4"/></g>`, 'Low K, Na, Mg', 9.5, true],
      ['scar', `<path class="f-bone" d="M-14 -4 a5 5 0 1 1 4 -6 L10 -10 a5 5 0 1 1 6 4 L16 2 a5 5 0 1 1 -6 6 L-10 6 a5 5 0 1 1 -4 -10 Z"/><g class="a-rise"><path class="s-good" d="M22 4 V-10 M17 -5 L22 -11 L27 -5" stroke-width="2.4"/></g>`, 'High Ca', 9.5, true],
      ['bad', `<path class="f-skin" d="M-18 8 Q-18 -6 -4 -8 L14 -8 Q20 -8 20 0 Q20 8 14 8 Z"/><g class="a-pulse"><circle class="f-bad" cx="12" cy="0" r="6"/></g><g class="a-blink"><path class="s-bad" d="M12 -14 l-3 -4 M18 -12 l3 -4 M6 -12 l-3 -3" stroke-width="1.8"/></g>`, 'Uric acid ↑ (gout)', 9, true],
      ['pancreas', `<g class="a-bob"><path class="f-white" d="M-10 -4 L0 -10 L10 -4 L10 8 L0 14 L-10 8 Z"/><path class="s-line" d="M-10 -4 L0 2 L10 -4 M0 2 V14" stroke-width="1.2"/></g><path class="s-good" d="M20 6 V-8 M15 -3 L20 -9 L25 -3" stroke-width="2.4"/>`, 'High glucose', 9.5, true],
      ['mouth', `${pill(-20, 'f-warn')}<g class="a-blink"><circle class="f-bad" cx="-14" cy="-10" r="3"/><circle class="f-bad" cx="14" cy="10" r="3"/><circle class="f-bad" cx="12" cy="-12" r="2.5"/></g>`, 'Sulfa allergy', 9.5, true],
      ['warn', `<g class="a-spin" style="animation-duration:6s">${sun()}</g>`, 'Photosensitivity', 9, true],
    ]),

    /* 23. Thiazides weak under CrCl 30 */
    thiazideCrCl: ART(`
      ${tag(150, 11, 'Thiazides in kidney disease', '', 10)}
      ${at(50, 70, kidney('f-scar'), 1.5)}
      ${dial(50, 152, 36, [['bad', -90, -30], ['warn', -30, 20], ['good', 20, 90]])}${sweep(50, 152, 36, 60, -60, 3)}
      ${qtag(50, 164, 'CrCl under 30', 9.5)}
      ${tag(118, 50, 'Most thiazides', '', 9.5)}
      <g class="a-blink">${at(118, 74, pill(0, 'f-water'))}</g>
      <g class="ans">${pop(0, at(118, 74, `<circle r="12" fill="none" stroke="var(--c-bad)" stroke-width="2.4" stroke-dasharray="3 3"/>`))}</g>
      ${qtag(118, 98, 'Weak', 9.5)}
      ${tile(166, 34, 126, 60, 'good')}${tile(166, 104, 126, 60, 'good')}
      ${at(186, 64, pill(-20, 'f-good'))}${at(186, 134, pill(-20, 'f-vein'))}
      <g class="ans">${pop(1, at(280, 50, chk(7)))}${pop(2, at(280, 120, chk(7)))}<g class="a-drop">${at(206, 70, drop('f-water', .8))}</g><g class="a-drop" style="animation-delay:.6s">${at(206, 140, drop('f-water', .8))}</g></g>
      ${qtag(238, 64, 'Metolazone', 9.5)}${qtag(238, 134, 'Loop diuretic', 9.5)}`),

    /* 24. ACE inhibitor mechanism */
    acei: ART(`
      ${tag(150, 11, 'ACE inhibitors', '', 10)}
      ${chip(40, 58, 'Ang I', 'pancreas')}
      ${at(150, 58, `<path class="f-pancreas" d="M0 0 L22 -12 A25 25 0 1 0 22 12 Z"/><circle cx="-4" cy="-12" r="3" fill="var(--art-line)"/>`)}
      ${tag(140, 92, 'ACE', '', 9.5)}
      <g class="ans">${pop(0, at(170, 58, pill(0, 'f-bad')))}</g>
      ${qtag(150, 28, 'Drug plugs ACE', 9.5)}
      ${arr('M184 58 H222')}${head(226, 58, 0)}
      <g class="q">${chip(258, 58, 'Ang II', 'bad')}</g>
      <g class="ans"><g class="a-blink">${chip(258, 58, 'Ang II', 'bad')}</g></g>
      ${qtag(250, 84, 'Less Ang II + aldo', 9)}
      <g class="ansmotion">${bubble('f-pancreas', '', 'M62 58 L112 58 L100 58 L112 58', 1.6, 0, 5)}</g>
      <rect x="8" y="112" width="284" height="60" rx="10" fill="var(--c-mouth)" opacity=".18"/>
      ${chip(40, 130, 'Bradykinin', 'mouth', 0, 9)}
      ${arr('M76 130 H112', 's-ink', 1.6)}${tag(140, 130, 'ACE breaks it', '', 9)}
      <g class="ans">${[0, 1, 2, 3, 4, 5, 6].map(i => pop(i + 1, `<circle class="f-mouth" cx="${190 + (i % 4) * 16}" cy="${128 + Math.floor(i / 4) * 16}" r="6"/>`)).join('')}</g>
      ${qtag(80, 158, 'Bradykinin builds up', 9.5)}${tag(232, 160, 'cough', 'ans', 9)}`),

    /* 25. ACE inhibitor side effects */
    aceiAE: ART(`
      ${tag(150, 11, 'ACE inhibitor side effects', '', 10)}
      <circle class="f-skin" cx="70" cy="82" r="44"/>
      <circle cx="54" cy="70" r="4" fill="var(--art-line)"/><circle cx="86" cy="70" r="4" fill="var(--art-line)"/>
      <g class="q">${at(70, 102, lips())}</g>
      <g class="ans">${at(70, 102, lips(true))}<g class="a-shake"><path class="s-scar" d="M118 92 q6 6 0 12 M126 88 q8 10 0 20 M134 84 q10 14 0 28" stroke-width="2.2"/></g></g>
      ${qtag(44, 140, 'Angioedema', 9.5)}${qtag(112, 140, 'Dry cough', 9.5)}
      <rect class="f-white" x="166" y="28" width="12" height="44" rx="6"/>
      <rect class="f-good" x="168" y="56" width="8" height="14" rx="4"><animate attributeName="height" values="14;38;38;14" keyTimes="0;.5;.85;1" dur="3s" repeatCount="indefinite"/><animate attributeName="y" values="56;32;32;56" keyTimes="0;.5;.85;1" dur="3s" repeatCount="indefinite"/></rect>
      ${qtag(234, 46, 'Hyperkalemia', 9.5)}
      ${dial(172, 118, 20)}${sweep(172, 118, 20, 50, -70, 3)}
      ${qtag(240, 110, 'First-dose low BP', 9)}
      ${at(172, 152, kidney(), .5)}<g class="ans"><g class="a-rise"><path class="s-bad" d="M190 160 V146 M185 151 L190 145 L195 151" stroke-width="2.2"/></g></g>
      ${qtag(240, 156, 'Creatinine ↑', 9.5)}`),

    /* 26. ACE inhibitor contraindications */
    aceiNo: grid4('ACE inhibitor: do not use', [
      ['mouth', `<g transform="scale(.8)">${belly()}</g>`, 'Pregnancy', 9.5],
      ['bad', lips(true), 'Past angioedema', 9],
      ['pancreas', `${at(-9, -6, pill(-30, 'f-pancreas'))}${at(9, 6, pill(-30, 'f-good'))}`, 'ARB or aliskiren', 9],
      ['water', `${salt()}<g>${grains()}</g>`, 'K salt substitutes', 9],
    ], '', `<g class="ans">${[[36, 59], [182, 59], [36, 135], [182, 135]].map(([x, y], i) => pop(i + 1, at(x, y, nope(19)))).join('')}${tag(102, 80, 'black box', 'ans', 9)}${tag(248, 155, 'high K', 'ans', 9)}${tag(102, 155, 'never combine', 'ans', 9)}</g>`),

    /* 27. ARB mechanism */
    arb: ART(`
      ${tag(150, 11, 'ARBs', '', 10)}
      <rect class="f-muscle" x="8" y="118" width="284" height="54" rx="8"/>
      <path class="s-white a-flow-slow" d="M20 146 H280" stroke-width="1.2" opacity=".6"/>
      <path class="f-good" d="M130 118 V98 Q130 88 138 88 V108 H162 V88 Q170 88 170 98 V118 Z"/>
      ${qtag(150, 132, 'AT1 receptor', 9.5)}
      <g class="ans">${pop(0, at(150, 100, pill(0, 'f-bad')))}</g>
      ${qtag(226, 98, 'Blocked (-sartan)', 9.5)}
      <g class="q">${chip(150, 50, 'Ang II', 'bad')}</g>
      <g class="ansmotion">${bubble('f-bad', 'II', 'M150 40 L150 76 L120 46 L150 40', 2.4, 0, 10)}</g>
      ${tag(58, 56, 'Angiotensin II', '', 9)}
      ${chip(46, 98, 'Bradykinin', 'mouth')}
      <g class="ans">${pop(2, at(90, 98, chk(6)))}${tag(60, 160, 'No bradykinin pile-up', 'ans', 9)}${tag(232, 160, 'Vessel relaxes', 'ans', 9)}</g>
      ${q(150, 160)}`),

    /* 28. ACE-I cough -> switch to ARB */
    arbVsAcei: ART(`
      ${tag(60, 12, 'ACE-I', '', 10)}${tag(240, 12, 'ARB', '', 10)}
      <circle class="f-skin" cx="60" cy="70" r="36"/>
      <circle cx="48" cy="62" r="3.5" fill="var(--art-line)"/><circle cx="72" cy="62" r="3.5" fill="var(--art-line)"/>
      <ellipse class="f-mouth" cx="60" cy="88" rx="8" ry="6"/>
      <g class="a-shake"><path class="s-scar" d="M100 80 q6 6 0 12 M108 76 q8 10 0 20" stroke-width="2.2"/></g>
      ${tag(60, 122, 'Dry cough', '', 9.5)}
      <circle class="f-skin" cx="240" cy="70" r="36"/>
      <circle cx="228" cy="62" r="3.5" fill="var(--art-line)"/><circle cx="252" cy="62" r="3.5" fill="var(--art-line)"/>
      <g class="q"><path class="s-line" d="M228 88 H252" stroke-width="2"/></g>
      <g class="ans"><path class="s-line" d="M226 84 Q240 96 254 84" stroke-width="2.2"/></g>
      <path class="s-good a-flow" d="M118 60 H180" stroke-width="3"/>${head(186, 60, 0, 'var(--c-good)')}
      ${qtag(150, 82, 'Switch to ARB', 10)}${tag(240, 122, 'Little cough', 'ans', 9.5)}
      <g class="ans">${pop(0, at(128, 152, pill(-30, 'f-pancreas')))}${pop(1, at(150, 152, pill(30, 'f-good')))}${pop(2, at(139, 152, nope(18)))}</g>
      ${qtag(222, 152, 'Never combine', 10)}`),

    /* 29. ARB dose plateau -> add a thiazide */
    arbAdd: ART(`
      ${tag(86, 11, 'ARB dose vs. BP drop', '', 9.5)}
      <path class="s-ink" d="M24 26 V140 H160" stroke-width="1.5"/>
      ${T(92, 156, 'ARB dose →', { s: 9 })}${T(18, 84, 'BP drop', { s: 9, a: 'middle' }).replace('<text', '<text transform="rotate(-90 18 84)"')}
      <path class="s-vein" d="M26 138 C50 70 70 50 100 46 C120 44 140 44 156 44" stroke-width="3" pathLength="400" class="a-draw"/>
      <g class="ansmotion"><circle class="f-vein" r="5"><animateMotion dur="3s" repeatCount="indefinite" path="M26 138 C50 70 70 50 100 46 C120 44 140 44 156 44"/></circle></g>
      ${qtag(126, 66, 'Flat: little extra', 9)}
      <path class="s-ink" d="M168 90 H178" stroke-width="2"/>${head(182, 90, 0)}
      ${tile(188, 30, 104, 110, 'good')}
      ${at(214, 70, pill(-30, 'f-good'))}${T(240, 74, '+', { s: 14 })}
      <g class="ans">${pop(0, at(266, 70, pill(-30, 'f-water')))}<g class="a-drop">${at(266, 98, drop('f-water', .8))}</g></g>
      ${q(266, 70)}
      ${qtag(240, 124, 'Add a thiazide', 10)}
      ${tag(150, 166, 'AT1 receptors nearly full', 'ans', 9.5)}`),

    /* 30. DHP vs non-DHP */
    ccb: ART(`
      ${tag(76, 11, 'Dihydropyridine', '', 9.5)}${tag(224, 11, 'Non-DHP', '', 9.5)}
      ${tile(8, 22, 136, 150, 'immune')}${tile(156, 22, 136, 150, 'bad')}
      ${vessel(22, 60, 108, 8, 15, 3)}
      ${qtag(76, 98, 'Mostly vessels', 9.5)}
      ${qtag(76, 140, 'Amlodipine, nifedipine', 9)}
      ${tag(76, 158, 'felodipine', 'ans', 9)}
      <g class="a-beat" style="animation-duration:1.7s">${at(196, 56, heart())}</g>
      ${vessel(222, 56, 62, 5, 9, 3, false)}
      ${strip(166, 88, 116, 26)}${trace(ecg(168, 104, 112, 3, 10), 'blood', 3)}
      ${qtag(224, 128, 'Heart rate + vessels', 9)}
      ${qtag(224, 152, 'Diltiazem, verapamil', 9)}`),

    /* 31. DHP side effects: ankle edema */
    dhpAE: ART(`
      ${tag(70, 11, 'Amlodipine-type CCB', '', 9.5)}
      <path class="f-skin" d="M50 22 H90 L88 120 Q88 134 100 140 L130 146 Q140 150 136 160 H52 Q46 150 50 130 Z"/>
      <g class="ans"><g class="a-pulse"><ellipse class="f-water" cx="70" cy="134" rx="26" ry="15" opacity=".7"/></g>
      <g class="a-drop">${at(104, 108, drop('f-water', .7))}</g><g class="a-drop" style="animation-delay:.7s">${at(40, 112, drop('f-water', .7))}</g></g>
      ${qtag(70, 170, 'Ankle edema', 10)}
      ${vessel(62, 60, 16, 3, 3, 1, false)}
      ${tag(132, 46, 'Arteriole', '', 9)}
      <g class="ans">${tag(132, 66, 'opens wide', 'ans', 9)}</g>
      ${tile(178, 22, 114, 46, 'bad')}
      ${at(198, 45, `<circle class="f-skin" r="13"/>`)}<g class="ans a-blink">${at(198, 45, `<circle class="f-bad noline" cx="-6" cy="3" r="3.5"/><circle class="f-bad noline" cx="6" cy="3" r="3.5"/>`)}</g>
      ${qtag(248, 45, 'Headache, flush', 9)}
      ${tile(178, 74, 114, 46, 'muscle')}
      <g class="a-beat" style="animation-duration:.5s">${at(198, 99, heart(), .6)}</g>
      ${qtag(248, 97, 'Reflex fast HR', 9)}
      ${tile(178, 126, 114, 46, 'nerve')}
      <g class="a-spin">${at(198, 149, `<path class="f-nerve" d="M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5 Z"/>`)}</g>
      ${qtag(248, 149, 'Dizzy standing', 9)}
      ${tag(150, 92, 'not HF', 'ans', 9)}`),

    /* 32. CCBs in HFrEF */
    amlodipine: ART(`
      ${tag(70, 11, 'HFrEF heart', '', 10)}
      <g class="a-squeeze" style="animation-duration:2.6s">${at(70, 78, heart('f-muscle'), 2.4)}</g>
      ${tag(70, 140, 'Weak squeeze', '', 9.5)}
      ${qtag(70, 164, 'Avoid most CCBs', 10)}
      ${tile(150, 24, 142, 66, 'bad')}
      ${at(172, 46, pill(-30, 'f-bad'))}${at(172, 72, pill(-30, 'f-warn'))}
      <g class="ans">${pop(0, at(172, 46, nope(11)))}${pop(1, at(172, 72, nope(11)))}</g>
      ${qtag(236, 46, 'Diltiazem', 9.5)}${qtag(236, 72, 'Verapamil', 9.5)}
      ${tile(150, 100, 142, 72, 'good')}
      ${at(172, 124, pill(-30, 'f-immune'))}${at(172, 150, pill(-30, 'f-vein'))}
      <g class="ans">${pop(2, at(194, 124, chk(6)))}${pop(3, at(194, 150, chk(6)))}</g>
      ${qtag(240, 124, 'Amlodipine', 9.5)}${qtag(240, 150, 'Felodipine', 9.5)}
      ${tag(222, 108, 'only if essential', 'ans', 9)}`),

    /* 33. Diltiazem/verapamil cautions */
    nondhp: ART(`
      ${tag(70, 11, 'Diltiazem, verapamil', '', 9.5)}
      ${at(66, 70, heart('f-muscle'), 2.3)}
      <circle class="f-nerve a-pulse" cx="48" cy="44" r="5"/><circle class="f-nerve" cx="68" cy="72" r="5"/>
      <path class="s-nerve a-flow" d="M48 44 L68 72 L60 96 M68 72 L86 98" stroke-width="2.4"/>
      ${tag(30, 32, 'SA', '', 9)}${tag(96, 66, 'AV node', '', 9)}
      <g class="ans">${pop(0, at(28, 92, pill(-30, 'f-immune')))}${T(42, 96, '+', { s: 12 })}${pop(1, at(56, 112, pill(-30, 'f-bad')))}</g>
      ${qtag(66, 130, 'No beta blockers', 9.5)}
      ${strip(8, 140, 136, 32)}${trace(ecg(10, 162, 132, 4, 14, [1, 2]), 'blood', 3.4)}
      ${tag(222, 24, 'Avoid if', '', 9.5)}
      ${qtag(222, 48, 'HFrEF', 9.5)}${qtag(222, 72, 'AV block, sick sinus', 9)}
      ${tile(156, 90, 136, 38, 'spleen')}${at(176, 109, `<g class="a-spin">${`<path class="f-spleen" d="M0 -9 L8 -4 L8 4 L0 9 L-8 4 L-8 -4 Z"/>`}</g>`)}
      ${qtag(236, 109, 'CYP3A4 drugs', 9.5)}
      ${tile(156, 134, 136, 38, 'stool')}${at(172, 153, `<circle class="f-stool" r="7"/>`)}
      ${tag(226, 143, 'Verapamil', '', 9)}${qtag(226, 162, 'Constipation', 9.5)}`),

    /* 34. Beta blockers for BP */
    bb: ART(`
      ${tag(70, 11, 'Beta blockers', '', 10)}
      <g class="a-beat" style="animation-duration:1.6s">${at(46, 58, heart(), 1.5)}</g>
      <g class="ans">${pop(0, at(78, 44, pill(-30, 'f-immune')))}</g>
      ${strip(100, 26, 192, 40)}${trace(ecg(102, 52, 188, 3, 16), 'blood', 3.2)}
      ${qtag(196, 80, 'Slows the heart', 9.5)}
      ${qtag(56, 100, 'Second-line', 10)}
      ${tag(56, 118, 'unless HF or CAD', 'ans', 9)}
      ${tile(100, 96, 116, 76, 'warn')}
      <g class="ans"><path class="s-warn a-draw" pathLength="400" d="M110 112 H134 V128 H158 V144 H182 V158 H206" stroke-width="3"/></g>
      ${qtag(158, 164, 'Taper 1–2 weeks', 9)}
      ${tile(222, 96, 70, 76, 'mouth')}
      <g class="a-pulse">${at(257, 124, lungs())}</g>
      ${qtag(257, 160, 'Asthma', 9.5)}
      <g class="ans">${tag(56, 150, 'Never stop fast', 'ans', 9)}</g>${q(56, 150)}`),

    /* 35. Aliskiren */
    aliskiren: ART(`
      ${tag(150, 11, 'Aliskiren (Tekturna)', '', 10)}
      ${chip(48, 46, 'Angiotensinogen', 'mucus', 0, 9)}
      ${at(140, 46, kidney(), .7)}${tag(140, 72, 'Renin', '', 9)}
      ${arr('M94 46 H120', 's-ink', 1.6)}${arr('M160 46 H196', 's-ink', 1.6)}${head(200, 46, 0)}
      <g class="q">${chip(240, 46, 'Ang I', 'pancreas')}</g>
      <g class="ans"><g class="a-blink">${chip(240, 46, 'Ang I', 'pancreas')}</g>${pop(0, at(178, 46, nope(11)))}${pop(1, at(162, 30, pill(-30, 'f-bad')))}</g>
      ${qtag(226, 84, 'Direct renin inhibitor', 9.5)}
      ${tile(8, 100, 92, 72, 'bad')}${tile(104, 100, 92, 72, 'mouth')}${tile(200, 100, 92, 72, 'good')}
      ${at(40, 124, pill(-30, 'f-pancreas'))}${at(66, 124, pill(30, 'f-good'))}
      <g class="ans">${pop(2, at(53, 124, nope(17)))}</g>
      ${qtag(54, 156, 'No ACE-I/ARB', 9)}
      ${at(150, 128, `<g transform="scale(.7)">${belly()}</g>`)}
      ${qtag(150, 156, 'Pregnancy', 9.5)}
      <rect class="f-white" x="230" y="108" width="10" height="36" rx="5"/>
      <rect class="f-good" x="232" y="132" width="6" height="10" rx="3"><animate attributeName="height" values="10;32;32;10" keyTimes="0;.5;.85;1" dur="3s" repeatCount="indefinite"/><animate attributeName="y" values="132;110;110;132" keyTimes="0;.5;.85;1" dur="3s" repeatCount="indefinite"/></rect>
      ${T(262, 132, 'K', { s: 14 })}
      ${qtag(246, 156, 'High K', 9.5)}`),

    /* 36. Alpha-1 blockers */
    alpha1: ART(`
      ${tag(80, 11, 'Alpha-1 blockers (-zosin)', '', 10)}
      ${vessel(10, 46, 120, 6, 13, 3)}
      ${qtag(70, 80, 'Vessels relax', 9.5)}
      <rect class="f-white" x="168" y="36" width="72" height="14" rx="4"/><rect class="f-vein" x="168" y="46" width="72" height="8" rx="3"/>
      <g class="ans"><g class="a-sway">${at(204, 40, person('f-good'), .9)}</g><g class="a-spin">${at(224, 24, `<path class="f-nerve" d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z"/>`)}</g></g>
      ${at(272, 32, moon())}
      ${qtag(206, 78, 'First dose: dizzy standing', 9)}
      ${qtag(270, 58, 'Bedtime', 9)}
      ${tile(8, 96, 138, 76, 'pancreas')}
      ${at(40, 132, `<circle class="f-mucus" r="18"/><circle class="f-pancreas" cy="22" r="10"/>`)}
      ${thick('M40 140 V168', 'nerve', 4, 'class="a-flow"')}
      ${qtag(100, 134, 'Helps BPH', 9.5)}
      ${tile(154, 96, 138, 76, 'scar')}
      ${at(186, 132, person('f-scar'))}<g class="ans">${pop(3, at(186, 132, nope(22)))}</g>
      ${qtag(248, 126, 'Beers list', 9.5)}${tag(248, 150, 'older adults', 'ans', 9)}`),

    /* 37. Clonidine */
    clonidine: ART(`
      ${tag(70, 11, 'Clonidine', '', 10)}
      <g class="a-pulse">${at(46, 50, brain())}</g>
      <g class="ans">${pop(0, at(78, 36, pill(-30, 'f-spleen')))}</g>
      ${thick('M46 70 V100', 'nerve', 4)}
      <g class="ans"><path class="s-white a-flow-slow" d="M46 70 V100" stroke-width="1.4"/></g>
      ${tag(92, 86, 'Less sympathetic', 'ans', 9)}
      ${at(24, 116, zzz())}${at(48, 120, heart(), .45)}${at(76, 120, lips(), .8)}
      ${qtag(78, 144, 'Sleepy, slow HR, dry mouth', 9)}
      ${qtag(56, 166, 'Last-line', 9.5)}
      <path class="s-ink" d="M152 28 V138 H290" stroke-width="1.4"/>
      ${T(222, 152, 'time →', { s: 9 })}
      <path class="s-ink" d="M210 30 V138" stroke-width="1" stroke-dasharray="3 3"/>${tag(210, 30, 'stop', '', 9)}
      <g class="ans"><path class="s-bad a-draw" pathLength="400" d="M154 112 H210 C220 112 222 48 236 46 C250 44 254 60 288 62" stroke-width="3"/></g>
      ${qtag(250, 86, 'Rebound high BP', 9.5)}
      ${qtag(220, 166, 'Taper slowly', 9.5)}`),

    /* 38. Methyldopa */
    methyldopa: grid4('Methyldopa', [
      ['mouth', `<g transform="scale(.8)">${belly()}</g>`, 'Used in pregnancy', 9],
      ['vein', `<g class="a-pulse">${brain()}</g><g transform="translate(16 -14)">${zzz()}</g>`, 'Drowsiness', 9.5],
      ['blood', `<circle class="f-blood" r="13"/><circle class="f-bad noline" r="6" opacity=".6"/>${[0, 90, 180, 270].map(a => `<g transform="rotate(${a})"><path class="s-immune" d="M0 -13 V-19 M0 -19 L-4 -23 M0 -19 L4 -23" stroke-width="2"/></g>`).join('')}<g class="a-blink"><circle class="f-blood" cx="18" cy="12" r="3"/></g>`, 'Coombs +, hemolysis', 9],
      ['liver', `<path class="f-liver a-pulse" d="${LIVER}" transform="translate(-24 -12) scale(.4)"/>`, 'Liver problems', 9.5],
    ], tag(150, 168, 'Central alpha-2 agonist', '', 9.5)),

    /* 39. Hydralazine */
    hydralazine: ART(`
      ${tag(70, 11, 'Hydralazine', '', 10)}
      ${vessel(8, 42, 124, 6, 14, 3)}
      ${qtag(70, 70, 'Direct vasodilator', 9.5)}
      ${tile(144, 22, 148, 64, 'bad')}
      <g class="a-beat" style="animation-duration:.55s">${at(166, 46, heart(), .6)}</g>
      <g class="a-drop">${at(186, 44, drop('f-water', .8))}</g>
      ${qtag(250, 44, 'Fast HR, fluid', 9.5)}
      <g class="ans">${pop(0, at(170, 72, pill(-30, 'f-immune')))}${pop(1, at(194, 72, pill(-30, 'f-water')))}</g>
      ${qtag(250, 72, '+ BB + diuretic', 9)}
      ${tile(8, 96, 138, 76, 'mouth')}
      <circle class="f-skin" cx="40" cy="134" r="22"/>
      <g class="ans a-blink"><path class="f-bad noline" d="M40 136 C34 126 22 126 24 136 C26 142 34 142 40 138 C46 142 54 142 56 136 C58 126 46 126 40 136 Z" opacity=".75"/></g>
      ${qtag(100, 134, 'Lupus-like', 9.5)}
      ${tile(154, 96, 138, 76, 'good')}
      ${at(184, 136, `<g transform="scale(.75)">${belly()}</g>`)}
      ${qtag(250, 128, 'Preeclampsia', 9.5)}${tag(250, 152, 'used in pregnancy', 'ans', 9)}`),

    /* 40. Minoxidil */
    minox: ART(`
      ${tag(70, 11, 'Severe hypertension', '', 9.5)}
      ${dial(70, 92, 56)}${sweep(70, 92, 56, 80, -10, 3.4)}
      ${qtag(70, 112, 'Last resort', 10.5)}
      ${at(70, 146, pill(0, 'f-warn'))}${tag(70, 168, 'Minoxidil', '', 9.5)}
      ${tile(144, 22, 148, 66, 'bad')}
      <g class="a-beat" style="animation-duration:.5s">${at(166, 46, heart(), .6)}</g>
      <g class="a-drop">${at(186, 44, drop('f-water', .8))}</g>
      ${tag(250, 42, 'Fast HR, fluid', '', 9.5)}
      ${T(218, 74, 'side effects', { s: 9, w: 400 })}
      ${tile(144, 96, 148, 76, 'good')}
      <g class="ans">${pop(0, at(170, 120, pill(-30, 'f-immune')))}${pop(1, at(170, 150, pill(-30, 'f-water')))}</g>
      ${qtag(234, 120, '+ beta blocker', 9.5)}${qtag(234, 150, '+ diuretic', 9.5)}`),

    /* 41. Adherence */
    adherence: grid6('Better adherence', [
      ['good', `<g class="a-bob">${pill(-30, 'f-immune', 'f-pancreas')}</g>`, 'Single-pill combo', 9],
      ['nerve', `<g class="a-spin" style="animation-duration:6s">${sun()}</g>`, 'Once daily', 9.5],
      ['water', `${scale().replace('f-white', 'f-white')}<g class="a-pulse"><rect class="f-water" x="-6" y="14" width="12" height="6" rx="2"/></g>`, 'Home BP checks', 9],
      ['bad', `<path class="f-white" d="M-16 16 V-6 L0 -16 L16 -6 V16 Z"/><path class="f-bad" d="M-3 -6 H3 V0 H9 V6 H3 V12 H-3 V6 H-9 V0 H-3 Z"/>`, 'One pharmacy', 9.5],
      ['vein', `<rect class="f-white" x="-10" y="-17" width="20" height="34" rx="4"/><g class="a-shake"><path class="f-nerve" d="M-5 4 Q-5 -8 0 -8 Q5 -8 5 4 L7 6 H-7 Z"/></g>`, 'Reminders', 9.5],
      ['mouth', `${at(-10, 4, person('f-vein'), .8)}${at(12, 4, person('f-good'), .8)}<g class="a-blink"><path class="s-ink" d="M-2 -14 Q1 -20 4 -14" stroke-width="1.6"/></g>`, 'Teach-back', 9.5],
    ]),
  });
})();
