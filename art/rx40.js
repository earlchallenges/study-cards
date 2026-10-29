/* Pharmacology rx40-diabetes art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 40 diabetes drugs. Everything lives inside one function so the shape helpers below
   never clash with the other art files. Text is never placed inside a transformed group. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const at = (x, y, inner, s = 1) => `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const tile = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--c-${c})" opacity=".2"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="var(--c-${c})" stroke-width="1.6"/>`;
  const pop = (d, inner) => `<g class="a-pop" style="--d:${d}">${inner}</g>`;
  const cls = (c, inner, style = '') => `<g class="${c}"${style ? ` style="${style}"` : ''}>${inner}</g>`;
  const thick = (d, color, w = 7) => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path d="${d}" stroke="var(--c-${color})" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const head = (x, y, a, c = 'var(--pic-ink)') => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0 L-7 -4 L-7 4 Z" fill="${c}"/>`;
  const arr = (d, w = 2) => `<path class="s-ink" d="${d}" stroke-width="${w}"/>`;

  // ---------- icons at their own origin (no text inside) ----------
  const hex = (r = 5, c = 'f-nerve') => `<path class="${c}" d="${[0, 1, 2, 3, 4, 5].map(i => `${i ? 'L' : 'M'}${(r * Math.cos(i * Math.PI / 3)).toFixed(1)} ${(r * Math.sin(i * Math.PI / 3)).toFixed(1)}`).join(' ')} Z" style="stroke-width:1.1"/>`;
  const pill = (rot = -30, c = 'f-warn', c2 = 'f-white') => `<g transform="rotate(${rot})"><path class="${c}" d="M0 -6 H-9 A6 6 0 0 0 -9 6 H0 Z"/><path class="${c2}" d="M0 -6 H9 A6 6 0 0 1 9 6 H0 Z"/></g>`;
  const tab = (c = 'f-white') => `<ellipse class="${c}" rx="11" ry="7"/><path class="s-line" d="M-6 0 H6" stroke-width="1.2" opacity=".5"/>`;
  const nope = (r = 14) => `<circle r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3.2"/><path d="M${-r * .7} ${-r * .7} L${r * .7} ${r * .7}" stroke="var(--c-bad)" stroke-width="3.2"/>`;
  const chk = (r = 8) => `<circle class="f-good" r="${r}"/><path class="s-white" d="M${-r * .45} 0 l${r * .32} ${r * .34} l${r * .58} ${-r * .64}" stroke-width="2.2"/>`;
  const warn = (c = 'f-warn') => `<path class="${c}" d="M0 -12 L12 9 H-12 Z"/><path class="s-line" d="M0 -4 V2" stroke-width="2.2"/><circle cx="0" cy="5.5" r="1.4" fill="var(--art-line)"/>`;
  const bbox = () => `<rect x="-14" y="-12" width="28" height="24" rx="3" fill="#111" stroke="#fff" stroke-width="1.6"/><path class="f-white" d="M0 -7 L8 6 H-8 Z" style="stroke:none"/><path d="M0 -3 V2" stroke="#111" stroke-width="1.8"/><circle cy="4" r="1" fill="#111"/>`;
  const HEART = 'M0 -8 C-2 -18 -20 -18 -19 -4 C-18 8 -6 14 0 20 C6 14 18 8 19 -4 C20 -18 2 -18 0 -8 Z';
  const heart = (c = 'f-muscle') => `<path class="${c}" d="${HEART}"/><path class="s-white" d="M-12 -6 Q-11 -11 -6 -12" stroke-width="2" opacity=".7"/>`;
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const kidney = (c = 'f-muscle') => `<g transform="translate(-16 -22)"><path class="${c}" d="${KID}"/><path class="s-line" d="M7 22 Q14 20 20 14 M7 22 Q14 24 20 30" stroke-width="1.2" opacity=".5"/></g>`;
  const LIVER = 'M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z';
  const liver = () => `<path class="f-liver" d="${LIVER}"/><path class="s-line" d="M72 5 Q68 24 62 44" stroke-width="1" opacity=".45"/>`;
  const PANC = 'M6 10 C2 22 10 32 22 30 C30 28 34 22 44 20 C62 18 82 16 100 10 C108 7 112 2 106 0 C90 -2 66 4 46 6 C34 7 26 2 18 2 C10 2 8 6 6 10 Z';
  const panc = (c = 'f-pancreas') => `<g transform="translate(-56 -15)"><path class="${c}" d="${PANC}"/></g>`;
  const STOM = 'M12 0 L20 0 C20 8 26 10 36 8 C52 6 62 18 60 32 C58 48 42 58 24 56 C14 55 8 50 10 44 C12 40 20 42 26 40 C34 36 34 28 28 24 C20 18 12 14 12 0 Z';
  const stomach = () => `<g transform="translate(-35 -28)"><path class="f-stomach" d="${STOM}"/></g>`;
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = () => `<g transform="translate(-23 -17)"><path class="f-mouth" d="${BRAIN}"/><path class="s-line" d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" stroke-width="1.2" opacity=".6"/></g>`;
  const thyroid = () => `<path class="f-mouth" d="M-2 0 C-6 -14 -18 -12 -16 2 C-15 12 -6 12 -2 6 Z M2 0 C6 -14 18 -12 16 2 C15 12 6 12 2 6 Z"/><rect class="f-mouth" x="-4" y="0" width="8" height="5" rx="2"/>`;
  const gallb = () => `<path class="f-gall" d="M-4 -16 Q4 -18 6 -10 Q14 4 6 14 Q-2 20 -9 12 Q-14 4 -6 -6 Z"/><circle class="f-bone" cx="0" cy="6" r="3.2"/><circle class="f-bone" cx="-5" cy="1" r="2.4"/>`;
  const bladder = (c = 'f-pancreas') => `<path class="${c}" d="M-13 -5 Q-13 -15 0 -15 Q13 -15 13 -5 Q13 8 3 10 V15 H-3 V10 Q-13 8 -13 -5 Z"/>`;
  const drop = (c = 'f-water', s = 1) => `<g transform="scale(${s})"><path class="${c}" d="M0 -9 C3 -4 7 1 7 4 A7 7 0 0 1 -7 4 C-7 1 -3 -4 0 -9 Z"/></g>`;
  const toilet = () => `<rect class="f-white" x="-13" y="-17" width="10" height="17" rx="2"/><path class="f-white" d="M-13 0 H12 Q12 10 2 11 L4 17 H-8 L-6 11 Q-13 8 -13 0 Z"/><ellipse class="f-water" cx="0" cy="2" rx="9" ry="2"/>`;
  const glass = () => `<path class="f-white" d="M-9 -15 H9 L7 15 H-7 Z"/><path class="f-water noline" d="M-7.6 -5 H7.6 L6.2 14 H-6.2 Z" opacity=".85"/>`;
  const plate = () => `<circle class="f-white" r="15"/><circle class="f-white" r="10" style="stroke-width:1"/><path class="s-line" d="M-21 -12 V12 M-23 -12 V-4 M-19 -12 V-4 M21 -12 Q25 -2 21 2 V12" stroke-width="1.6"/>`;
  const scaleIc = () => `<rect class="f-white" x="-17" y="-12" width="34" height="24" rx="6"/><path class="f-water" d="M-9 -3 A9 9 0 0 1 9 -3 Z"/><path class="s-line" d="M0 -3 L4 -9" stroke-width="1.6"/>`;
  const eye = () => `<path class="f-white" d="M-17 0 Q0 -13 17 0 Q0 13 -17 0 Z"/><circle class="f-vein" r="6"/><circle r="2.6" fill="var(--art-line)"/>`;
  const zzz = () => `<path class="s-vein" d="M-8 2 h7 l-7 8 h7 M3 -10 h6 l-6 7 h6" stroke-width="2"/>`;
  const person = (c = 'f-water') => `<circle class="f-skin" cx="0" cy="-16" r="8"/><path class="${c}" d="M-12 18 V2 Q-12 -6 0 -6 Q12 -6 12 2 V18 Z"/>`;
  const elder = (c = 'f-spleen') => `<circle class="f-skin" cx="-2" cy="-15" r="7.5"/><path class="f-white" d="M-9 -19 Q-2 -26 5 -19 Q-2 -22 -9 -19 Z"/><path class="${c}" d="M-12 18 V3 Q-11 -6 0 -6 Q9 -5 9 3 V18 Z"/><path class="s-line" d="M13 -2 Q17 -4 17 0 V18" stroke-width="2.2"/>`;
  const belly = () => `<circle class="f-skin" cx="-4" cy="-24" r="8"/><path class="f-skin" d="M-12 24 L-10 -14 Q-4 -18 2 -12 Q20 -6 18 10 Q16 22 2 22 L0 24 Z"/><circle class="f-fat" cx="7" cy="5" r="7"/>`;
  const pregnant = () => `<circle class="f-skin" cx="-2" cy="-17" r="7.5"/><path class="f-mouth" d="M-10 18 L-8 -8 Q-2 -10 2 -6 Q16 0 14 10 Q12 16 4 16 L4 18 Z"/>`;
  const couch = () => `<rect class="f-spleen" x="-17" y="-12" width="34" height="13" rx="4"/><rect class="f-spleen" x="-20" y="-2" width="40" height="11" rx="4"/><path class="s-line" d="M-15 9 V14 M15 9 V14" stroke-width="2"/>`;
  const tree = () => `<path class="s-line" d="M0 -6 V0 M-11 0 H11 M-11 0 V6 M11 0 V6" stroke-width="1.6"/><circle class="f-water" cx="0" cy="-11" r="5"/><circle class="f-mouth" cx="-11" cy="11" r="5"/><circle class="f-bad" cx="11" cy="11" r="5"/>`;
  const germ = (rot = 0) => `<g transform="rotate(${rot})"><path class="s-germ" d="M7 0 q3 -3 6 0 t6 0" stroke-width="1.3"/><rect class="f-germ" x="-8" y="-4" width="16" height="8" rx="4"/></g>`;
  const yeast = () => `<ellipse class="f-germ" cx="-4" cy="2" rx="8" ry="6"/><ellipse class="f-germ" cx="7" cy="-5" rx="5" ry="4"/><ellipse class="f-germ" cx="-10" cy="-8" rx="3.5" ry="3"/>`;
  const foot = () => `<path class="f-skin" d="M-7 -18 H4 V2 Q17 4 17 10 Q17 15 10 15 H-7 Q-9 15 -9 10 Z"/>`;
  const syringe = (rot = -35) => `<g transform="rotate(${rot})"><rect class="f-white" x="-11" y="-4" width="18" height="8" rx="1.5"/><rect class="f-water" x="-4" y="-3" width="10" height="6"/><path class="s-line" d="M7 0 H16 M-11 -6 V6 M-11 0 H-17 M-17 -4 V4" stroke-width="1.6"/></g>`;
  const pen = (c = 'f-immune', rot = 0) => `<g transform="rotate(${rot})"><rect class="${c}" x="-22" y="-5" width="30" height="10" rx="3"/><rect class="f-white" x="8" y="-4" width="9" height="8" rx="2"/><rect class="f-white" x="-27" y="-3.5" width="6" height="7" rx="1.5"/><path class="s-line" d="M17 0 H23" stroke-width="1.4"/><rect class="f-white noline" x="-14" y="-2" width="10" height="4" rx="1" opacity=".7"/></g>`;
  const cal = (c = 'f-bad') => `<rect class="f-white" x="-12" y="-11" width="24" height="23" rx="3"/><rect class="${c}" x="-12" y="-11" width="24" height="7" rx="2"/><path class="s-line" d="M-6 -14 V-8 M6 -14 V-8" stroke-width="2"/>`;
  const meter = (c = 'f-immune') => `<rect class="${c}" x="-11" y="-16" width="22" height="32" rx="5"/><rect class="f-white" x="-8" y="-12" width="16" height="12" rx="2"/><circle class="f-white" cx="0" cy="8" r="3.5"/>`;
  const phone = () => `<rect class="f-white" x="-9" y="-16" width="18" height="32" rx="4"/><rect class="f-good" x="-6" y="-12" width="12" height="20" rx="1.5"/><circle cx="0" cy="12" r="1.6" fill="var(--art-line)"/>`;
  const band = () => `<ellipse rx="17" ry="9" fill="none" stroke="var(--c-vein)" stroke-width="4"/><rect class="f-white" x="-9" y="-7" width="18" height="14" rx="3"/><path d="M0 -4.5 V4.5 M-4.5 0 H4.5" stroke="var(--c-bad)" stroke-width="2.6"/>`;
  const clock = () => `<circle class="f-white" r="11"/><path class="s-line" d="M0 0 V-7 M0 0 L5 3" stroke-width="1.8"/>`;
  const moon = () => `<path class="f-nerve" d="M3 -12 A12 12 0 1 0 12 5 A9.5 9.5 0 0 1 3 -12 Z"/>`;
  const sun = () => `<path class="s-warn" d="M0 -15 V-11 M0 11 V15 M-15 0 H-11 M11 0 H15 M-10.6 -10.6 L-7.8 -7.8 M7.8 7.8 L10.6 10.6 M-10.6 10.6 L-7.8 7.8 M7.8 -7.8 L10.6 -10.6" stroke-width="2.2"/><circle class="f-nerve" r="7.5"/>`;
  const rbc = () => `<circle class="f-blood" r="12"/><circle class="f-bad noline" r="5" opacity=".6"/>`;
  const lips = () => `<path class="f-mouth" d="M-14 0 Q-7 -7 0 -3 Q7 -7 14 0 Q7 8 0 8 Q-7 8 -14 0 Z"/><path class="s-line" d="M-12 0 H12" stroke-width="1"/>`;
  const hand = () => `<path class="f-skin" d="M-8 14 V-2 L-12 -8 Q-12 -11 -9 -10 L-6 -6 V-16 Q-6 -19 -3 -19 Q0 -19 0 -16 V-8 V-18 Q0 -21 3 -21 Q6 -21 6 -18 V-8 V-15 Q6 -18 9 -18 Q12 -18 12 -15 V6 Q12 14 6 14 Z"/>`;
  const head2 = () => `<circle class="f-skin" r="15"/><path class="s-spleen" d="M-5 -4 a5 5 0 1 1 5 5 a3 3 0 1 1 -3 -3" stroke="var(--c-spleen)" stroke-width="2" fill="none"/>`;
  const vial = (lvl = .3, c = 'f-bad') => `<rect class="f-white" x="-7" y="-16" width="14" height="5" rx="1.5"/><rect class="f-white" x="-9" y="-11" width="18" height="27" rx="3"/><rect class="${c} noline" x="-7.5" y="${14 - 23 * lvl}" width="15" height="${23 * lvl}" rx="2"/>`;

  // half-dial gauge at (cx, cy) radius r; angles in degrees from straight up (-90 left .. 90 right)
  const arcP = (r, a1, a2) => {
    const p = a => [(r * Math.sin(a * Math.PI / 180)).toFixed(1), (-r * Math.cos(a * Math.PI / 180)).toFixed(1)];
    const [x1, y1] = p(a1), [x2, y2] = p(a2);
    return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`;
  };
  const dial = (cx, cy, r, zones) => `<g transform="translate(${cx} ${cy})"><path class="f-white" d="M${-r - 4} 2 A${r + 4} ${r + 4} 0 0 1 ${r + 4} 2 Z"/>` +
    zones.map(([c, a, b]) => `<path d="${arcP(r - 6, a, b)}" stroke="var(--c-${c})" stroke-width="${Math.max(5, r / 6)}" fill="none"/>`).join('') + `</g>`;
  const hub = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="3.5" fill="var(--art-line)"/>`;
  // needle sweeps a1 -> a2 on the back; the front shows it resting at a1
  const sweep = (cx, cy, r, a1, a2, dur = 3) => `<g transform="translate(${cx} ${cy})">` +
    `<g class="q"><g transform="rotate(${a1})"><path class="s-line" d="M0 0 L0 ${-(r - 9)}" stroke-width="2.6"/></g></g>` +
    `<g class="ansmotion"><path class="s-line" d="M0 0 L0 ${-(r - 9)}" stroke-width="2.6"><animateTransform attributeName="transform" type="rotate" values="${a1};${a2};${a2};${a1}" keyTimes="0;.4;.85;1" dur="${dur}s" repeatCount="indefinite"/></path></g></g>` + hub(cx, cy);
  const gluGauge = (cx, cy, r, a1, a2, dur) => dial(cx, cy, r, [['bad', -90, -50], ['good', -50, 20], ['warn', 20, 90]]) + sweep(cx, cy, r, a1, a2, dur);

  // something moving along a path (back only); inner drawn at its own origin
  const mover = (inner, path, dur, begin = 0, more = '') => `<g class="ansmotion"><g>${inner}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}" ${more}/></g></g>`;
  const fade = (inner, path, dur, begin = 0) => `<g class="ansmotion"><g opacity="0">${inner}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></g></g>`;
  // still chip with text
  const chip = (x, y, t, c = 'water', size = 9) => {
    const ww = String(t).length * size * .56 + 12;
    return `<rect x="${x - ww / 2}" y="${y - 8}" width="${ww}" height="16" rx="8" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.3"/>${T(x, y + size * .36, t, { c: 'tagtx', s: size })}`;
  };
  // moving chip with a label: drawn at (20, 20) and the motion path shifted back, so the text box stays on-frame
  const shift = d => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - 20} ${+b - 20}`);
  const bubble = (c, txt, path, dur, begin = 0, r = 10) => `<g class="ansmotion"><g><circle class="${c}" cx="20" cy="20" r="${r}"/><text class="tagtx" x="20" y="23.2" text-anchor="middle" style="font-size:9px">${txt}</text><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path)}"/></g></g>`;

  // 6-tile grid (3 x 2): items = [color, iconSvg, answerLabel, labelSize]
  const grid6 = (title, items, foot = '') => {
    let s = tag(150, 11, title, '', 10);
    items.forEach(([c, ic, lab, sz = 9.5], i) => {
      const col = i % 3, row = Math.floor(i / 3), x = 8 + col * 96, y = 24 + row * (foot ? 66 : 78), h = foot ? 61 : 72;
      s += tile(x, y, 92, h, c) + at(x + 46, y + (foot ? 23 : 27), ic) + qtag(x + 46, y + h - 11, lab, sz);
    });
    return ART(s + foot);
  };
  // 4-tile grid (2 x 2): icon left, label right
  const grid4 = (title, items, foot = '') => {
    let s = tag(150, 11, title, '', 10);
    items.forEach(([c, ic, lab, sz = 9.5, sub], i) => {
      const col = i % 2, row = Math.floor(i / 2), x = 8 + col * 146, y = 24 + row * (foot ? 64 : 76), h = foot ? 58 : 70;
      s += tile(x, y, 138, h, c) + at(x + 27, y + h / 2, ic) +
        (sub ? tag(x + 94, y + h / 2 - 12, sub, '', 9) + qtag(x + 94, y + h / 2 + 11, lab, sz) : qtag(x + 94, y + h / 2, lab, sz));
    });
    return ART(s + foot);
  };

  // insulin time-action plot: hours 0..H across x0..x0+w, baseline y0, height h
  const plot = (x0, y0, w, h, H, ticks) => `<rect x="${x0}" y="${y0 - h}" width="${w}" height="${h}" rx="4" fill="var(--c-water)" opacity=".08"/>` +
    `<path class="s-ink" d="M${x0} ${y0 - h} V${y0} H${x0 + w}" stroke-width="1.6"/>` +
    ticks.map(t => `<path class="s-ink" d="M${x0 + w * t / H} ${y0} v4" stroke-width="1.2"/>` + T(x0 + w * t / H, y0 + 13, t + ' h', { s: 9, w: 400 })).join('');
  // a smooth insulin curve: onset o, peak p (or plateau p..p2), end e (hours); top = peak height in px
  const curve = (x0, y0, w, H, o, p, e, top, p2 = p) => {
    const X = t => (x0 + w * t / H).toFixed(1), Y = y0 - top;
    return `M${x0} ${y0} L${X(o)} ${y0} C${X(o + (p - o) * .5)} ${y0} ${X(o + (p - o) * .5)} ${Y} ${X(p)} ${Y}` +
      (p2 > p ? ` L${X(p2)} ${Y}` : '') + ` C${X(p2 + (e - p2) * .45)} ${Y} ${X(p2 + (e - p2) * .55)} ${y0} ${X(e)} ${y0}`;
  };
  const drawC = (d, c, delay = 0, dur = 2.8) => `<path d="${d}" pathLength="400" fill="none" stroke="var(--c-${c})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="a-draw" style="animation-duration:${dur}s;animation-delay:${delay}s"/>`;
  const fillC = (d, c, y0) => `<path d="${d} Z" fill="var(--c-${c})" opacity=".18"/>`;

  // a cell membrane with receptor sockets
  const cellBox = (x, y, w, h, c = 'f-skin') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="22"/>`;
  const key = (c = 'f-good') => `<circle class="${c}" cx="-8" cy="0" r="6"/><circle cx="-8" cy="0" r="2" fill="var(--surface)"/><rect class="${c}" x="-2" y="-2" width="14" height="4"/><rect class="${c}" x="7" y="2" width="3" height="4"/><rect class="${c}" x="2" y="2" width="3" height="3"/>`;

  Object.assign(PICS, {

    /* 1. Diagnosis: four tests, four cut-offs */
    dx: grid4('Diabetes diagnosis: any one of', [
      ['blood', `${rbc()}${at(-8, -9, hex(3.5))}${at(9, -6, hex(3.5))}${at(4, 10, hex(3.5))}`, '6.5% or more', 9.5, 'A1c'],
      ['vein', `${moon()}${cls('a-blink', at(10, 10, plate(), .45))}`, '126+ mg/dL', 9.5, 'Fasting'],
      ['warn', `${at(-6, 2, glass())}${at(-6, 4, hex(4))}${at(10, -10, clock(), .7)}`, '200+ mg/dL', 9.5, '2-h OGTT'],
      ['good', `${meter()}${cls('a-bob', at(14, -12, drop('f-water', .7)))}`, '200+ & symptoms', 9, 'Random'],
    ]),

    /* 2. Prediabetes: the middle (yellow) zone on each test */
    prediab: ART(`
      ${tag(150, 11, 'Prediabetes = the middle zone', '', 10)}
      ${tag(122, 34, 'Normal', '', 9)}${tag(192, 34, 'Prediabetes', '', 9)}${tag(262, 34, 'Diabetes', '', 9)}
      ${[['A1c', '5.7–6.4%'], ['Fasting', '100–125'], ['2-h OGTT', '140–199']].map(([n, v], i) => {
        const y = 62 + i * 40;
        return tag(46, y, n, '', 9.5) +
          `<rect x="92" y="${y - 11}" width="60" height="22" rx="6" fill="var(--c-good)" stroke="var(--art-line)" stroke-width="1.3"/>` +
          `<rect x="152" y="${y - 11}" width="80" height="22" fill="var(--c-nerve)" stroke="var(--art-line)" stroke-width="1.3"/>` +
          `<rect x="232" y="${y - 11}" width="60" height="22" rx="6" fill="var(--c-bad)" stroke="var(--art-line)" stroke-width="1.3"/>` +
          qtag(192, y, v, 9.5) +
          `<g class="ansmotion"><path d="M0 0 L-6 -8 H6 Z" fill="var(--art-line)"><animateTransform attributeName="transform" type="translate" values="110 ${y - 12};192 ${y - 12};192 ${y - 12};110 ${y - 12}" keyTimes="0;.4;.85;1" dur="3.2s" begin="${i * .3}s" repeatCount="indefinite"/></path></g>`;
      }).join('')}
      ${tag(150, 170, 'mg/dL for fasting and OGTT', '', 9)}`),

    /* 3. Type 1 (immune attack on beta cells) vs type 2 (insulin resistance) */
    t1t2: ART(`
      ${tile(6, 6, 140, 168, 'immune')}${tile(154, 6, 140, 168, 'warn')}
      ${tag(76, 18, 'Type 1', '', 10)}${tag(224, 18, 'Type 2', '', 10)}
      <circle class="f-pancreas" cx="76" cy="74" r="34"/>
      ${[[62, 62], [86, 60], [70, 84], [92, 82], [76, 72]].map(([x, y], i) => `<g class="a-blink" style="animation-delay:${i * .25}s;animation-duration:2.4s"><circle class="f-good" cx="${x}" cy="${y}" r="7"/></g>`).join('')}
      <g class="ans">${[[30, 50], [122, 56], [40, 110], [116, 104]].map(([x, y], i) => `<g class="a-shake" style="animation-delay:${i * .1}s">${at(x, y, `${[0, 60, 120, 180, 240, 300].map(a => `<path transform="rotate(${a})" d="M0 -8 V-11" class="s-immune" stroke-width="2"/>`).join('')}<circle class="f-immune" r="8"/>`)}</g>`).join('')}</g>
      ${qtag(76, 126, 'Autoimmune', 10)}
      ${qtag(76, 148, 'No insulin made', 9.5)}
      ${qtag(76, 166, 'Insulin for life', 9.5)}
      ${cellBox(176, 52, 96, 54)}
      <rect class="f-white" x="216" y="46" width="16" height="12" rx="3"/>
      <circle class="f-scar" cx="224" cy="52" r="3"/>
      <g class="a-bob">${at(196, 44, hex(5))}${at(250, 42, hex(5))}${at(264, 50, hex(5))}</g>
      ${mover(key(), 'M224 30 L224 40 L224 30', 1.2)}
      <g class="q">${at(224, 34, key())}</g>
      ${T(224, 88, 'muscle / fat cell', { s: 9, w: 400 })}
      ${qtag(224, 126, 'Insulin resistance', 10)}
      ${qtag(224, 148, '90–95% of cases', 9.5)}
      ${qtag(224, 166, 'Insulin falls later', 9.5)}`),

    /* 4. Type 1 classic signs */
    t1sx: grid6('Type 1 classic signs', [
      ['water', `${toilet()}${cls('a-drop', at(14, -14, drop('f-pancreas', .6)))}`, 'Polyuria'],
      ['vein', `${glass()}${cls('a-bob', at(14, -12, drop('f-water', .6)))}`, 'Polydipsia'],
      ['warn', `${plate()}${cls('a-pulse', at(0, 0, `<circle class="f-food" r="6"/>`))}`, 'Polyphagia'],
      ['good', `${scaleIc()}${cls('a-bob', `<path class="s-bad" d="M14 -20 V-10" stroke-width="2.4"/><path d="M14 -6 L10 -12 H18 Z" fill="var(--c-bad)"/>`)}`, 'Weight loss'],
      ['immune', cls('a-blink', eye()), 'Blurred vision'],
      ['spleen', `${person('f-spleen')}${cls('a-rise', at(14, -18, zzz(), .8))}`, 'Fatigue'],
    ]),

    /* 5. Type 2 risk factors */
    t2risk: grid6('Type 2 risk factors', [
      ['warn', at(0, 4, cls('a-bob', belly()), .85), 'Belly fat, obesity', 9],
      ['spleen', `${couch()}${cls('a-rise', at(12, -18, zzz(), .7))}`, 'Inactivity'],
      ['vein', cls('a-sway', elder()), 'Older age'],
      ['mouth', `${pregnant()}${at(15, -8, cal('f-mouth'), .6)}`, 'Past GDM'],
      ['bad', `${cls('a-beat', heart())}${at(14, 10, drop('f-fat', .8))}`, 'HTN, high lipids', 9],
      ['good', pop(0, tree()), 'Family, ethnicity', 9],
    ]),

    /* 6. Islet: beta cells make insulin (glucose down), alpha cells make glucagon (glucose up) */
    islets: ART(`
      ${tag(70, 14, 'Islet of Langerhans', '', 10)}
      <circle class="f-pancreas" cx="70" cy="96" r="62"/>
      ${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `<circle class="f-mouth" cx="${(70 + 48 * Math.cos(a)).toFixed(1)}" cy="${(96 + 48 * Math.sin(a)).toFixed(1)}" r="9"/>`; }).join('')}
      ${[[58, 80], [82, 80], [70, 96], [52, 106], [88, 106], [70, 116], [62, 92], [80, 94]].map(([x, y]) => `<circle class="f-good" cx="${x}" cy="${y}" r="8"/>`).join('')}
      ${qtag(70, 98, 'Beta cells', 9.5)}
      ${qtag(70, 154, 'Alpha cells', 9.5)}
      ${tile(148, 26, 146, 66, 'good')}${tile(148, 100, 146, 66, 'mouth')}
      ${qtag(200, 42, 'Insulin', 10)}${qtag(200, 116, 'Glucagon', 10)}
      ${bubble('f-good', 'I', 'M120 70 L170 66', 1.8)}
      ${bubble('f-mouth', 'G', 'M116 126 L170 140', 1.8, .6)}
      ${at(270, 60, hex(9))}${at(270, 134, hex(9))}
      <g class="ans"><g class="a-drop">${arr('M250 46 V64', 2.6)}${head(250, 72, 90)}</g><g class="a-rise">${arr('M250 146 V128', 2.6)}${head(250, 120, -90)}</g></g>
      ${qtag(200, 72, 'Lowers glucose', 9.5)}${qtag(200, 146, 'Raises glucose', 9.5)}`),

    /* 7. Metformin: liver puts out less glucose */
    metformin: ART(`
      ${tag(150, 11, 'First-line for type 2', '', 10)}
      ${at(6, 36, liver(), .95)}
      ${T(60, 98, 'liver', { s: 9.5, c: 'ink' })}
      ${thick('M116 60 H292', 'blood', 14)}
      ${[0, 1, 2, 3, 4, 5].map(i => fade(hex(4.5), 'M104 60 H290', 3, -i * .5)).join('')}
      <g class="q">${at(140, 60, hex(4.5))}${at(190, 60, hex(4.5))}${at(240, 60, hex(4.5))}</g>
      <g class="ans"><g class="a-bob">${at(112, 58, pill(-20, 'f-white', 'f-water'))}</g></g>
      ${qtag(152, 30, 'Metformin (biguanide)', 9.5)}
      ${tag(242, 84, 'glucose into blood', '', 9)}
      ${tag(74, 126, 'Liver glucose output', '', 9.5)}
      ${dial(74, 168, 34, [['good', -90, -30], ['warn', -30, 30], ['bad', 30, 90]])}${sweep(74, 168, 34, 60, -60, 3.6)}
      ${qtag(214, 116, 'Lowers liver output', 9.5)}
      <g class="ans">${pop(0, chip(170, 146, 'Effective', 'good'))}${pop(1, chip(222, 146, 'Safe', 'immune'))}${pop(2, chip(270, 146, 'Cheap', 'nerve'))}</g>
      ${q(222, 146)}`),

    /* 8. Metformin side effects */
    metAE: grid6('Metformin side effects', [
      ['stool', `${toilet()}${cls('a-shake', at(15, -12, drop('f-stool', .6)))}`, 'Diarrhea (#1)'],
      ['bad', `${vial(.25)}${cls('a-blink', `<path class="s-bad" d="M16 -14 V0" stroke-width="2.4"/><path d="M16 4 L12 -2 H20 Z" fill="var(--c-bad)"/>`)}`, 'Low B12 over time', 9],
      ['good', `${scaleIc()}${cls('a-bob', `<path d="M18 -8 L14 -14 H22 Z" fill="var(--c-good)" transform="rotate(180 18 -11)"/>`)}`, 'Mild weight loss', 9],
      ['immune', `${meter()}${cls('a-pop', at(14, 10, chk(7)))}`, 'Lows: rare alone', 9],
      ['water', `${tab()}${cls('a-pulse', at(0, 0, `<ellipse class="f-white noline" rx="6" ry="3" opacity=".9"/>`))}`, 'ER: less GI upset', 9],
      ['warn', cls('a-pulse', bbox()), 'Box: lactic acidosis', 9],
    ]),

    /* 9. Stop or avoid metformin */
    metNo: ART(`
      ${tag(150, 11, 'Stop or avoid metformin', '', 10)}
      ${tile(6, 22, 112, 152, 'bad')}
      ${at(62, 56, kidney())}
      ${dial(62, 128, 44, [['bad', -90, -40], ['warn', -40, 10], ['good', 10, 90]])}${sweep(62, 128, 44, 60, -68, 3.4)}
      ${T(18, 142, '0', { s: 9, w: 400, a: 'start' })}${T(106, 142, '90', { s: 9, w: 400, a: 'end' })}
      ${qtag(62, 160, 'eGFR under 30', 10)}
      ${[['vein', syringe(-30), 'Hold: iodinated contrast'], ['warn', `<circle class="f-acid" r="10"/><path class="s-line" d="M-4 -3 h8 M-4 3 h8" stroke-width="1.5"/>`, 'Lactic or metabolic acidosis'], ['liver', at(-15, -8, liver(), .25), 'Liver dz, alcohol, HF'], ['spleen', at(0, 0, drop('f-blood', 1.2)), 'Type 1 or DKA']].map(([c, ic, lab], i) => {
        const y = 24 + i * 38;
        return tile(124, y, 170, 34, c) + pop(i, at(142, y + 17, ic)) + qtag(222, y + 17, lab, 9);
      }).join('')}`),

    /* 10. SGLT2 inhibitors: block glucose reabsorption so it leaves in urine */
    sglt2: ART(`
      ${tag(150, 11, 'SGLT2 inhibitors (-gliflozin)', '', 10)}
      <circle class="f-muscle" cx="24" cy="48" r="14"/><path class="s-blood" d="M6 34 Q24 30 26 46 Q28 58 10 62" stroke-width="2"/>
      ${thick('M38 48 H236 Q256 48 256 68 V108', 'water', 14)}
      ${T(140, 34, 'proximal tubule', { s: 9, w: 400 })}
      ${thick('M38 92 H220', 'blood', 10)}
      ${T(130, 110, 'blood', { s: 9, w: 400 })}
      ${[70, 110, 150, 190].map((x, i) => `<rect class="f-good" x="${x - 7}" y="57" width="14" height="9" rx="4"/>` +
        `<g class="ans">${pop(i, `<g transform="translate(${x} 62)">${pill(0, 'f-bad', 'f-white')}</g>`)}</g>`).join('')}
      <g class="q">${[70, 110, 150, 190].map(x => `${at(x, 78, hex(4))}`).join('')}</g>
      ${[0, 1, 2, 3, 4].map(i => mover(hex(4.5), 'M44 48 H236 Q256 48 256 68 V128', 3.2, -i * .64)).join('')}
      ${at(256, 140, bladder())}
      ${qtag(92, 128, 'SGLT2 blocked', 10)}
      ${qtag(250, 166, 'Glucose in urine', 9.5)}
      <g class="ans">${pop(0, chip(34, 152, 'A1c ↓', 'nerve'))}${pop(1, chip(78, 152, 'BP ↓', 'nerve'))}${pop(2, chip(134, 152, 'Weight ↓', 'nerve'))}</g>
      ${q(78, 152)}
      ${cls('a-beat', at(160, 126, heart(), .55))}${at(186, 128, kidney(), .5)}
      ${qtag(126, 172, 'Heart + kidney protection', 9)}`),

    /* 11. SGLT2 inhibitor cautions */
    sglt2AE: grid6('SGLT2 inhibitor cautions', [
      ['germ', cls('a-pulse', yeast()), 'Genital yeast'],
      ['pancreas', `${bladder()}${cls('a-shake', at(0, -3, germ(), .6))}`, 'UTIs'],
      ['water', `${cls('a-squeeze', drop('f-water', 1.4))}`, 'Volume loss'],
      ['bad', `${meter()}${cls('a-blink', at(15, -10, `<circle class="f-bad" r="6"/>`))}`, 'Euglycemic DKA', 9],
      ['warn', cls('a-pulse', warn('f-bad')), 'Fournier gangrene', 9],
      ['skin', `${foot()}${nope(15)}`, 'Cana: amputation', 9],
    ], tag(150, 170, 'Not for ESKD or dialysis', 'ans', 9.5) + q(150, 170)),

    /* 12. DPP-4 inhibitors: keep incretins (GLP-1, GIP) from being chewed up */
    dpp4: ART(`
      ${tag(150, 11, 'DPP-4 inhibitors (-gliptin)', '', 10)}
      ${tag(34, 30, 'gut', '', 9)}
      ${at(34, 62, `<path class="f-small" d="M-22 -14 Q0 -24 22 -14 Q28 0 22 14 Q0 24 -22 14 Q-28 0 -22 -14 Z"/>`)}
      ${at(250, 60, panc(), .7)}
      ${tag(250, 30, 'pancreas', '', 9)}
      ${bubble('f-immune', 'GLP-1', 'M50 54 L226 54', 3, 0, 15)}
      ${bubble('f-spleen', 'GIP', 'M50 72 L226 72', 3, -1.5, 13)}
      <g transform="translate(140 104)"><g class="a-pulse"><path class="f-germ" d="M0 0 L18 -10 A20 20 0 1 0 18 10 Z"/><circle cx="2" cy="-9" r="2.4" fill="#fff"/></g></g>
      <g class="ans">${at(156, 104, pill(0, 'f-good', 'f-white'))}</g>
      ${qtag(140, 136, 'DPP-4 enzyme blocked', 9.5)}
      ${qtag(250, 96, 'Insulin ↑', 9.5)}
      ${qtag(62, 160, 'Weight neutral', 9.5)}
      ${qtag(150, 160, 'Few lows', 9.5)}
      ${qtag(236, 160, 'Good for older adults', 9)}
      ${qtag(64, 120, 'Lina: no renal dose', 9)}`),

    /* 13. Sulfonylureas: close the beta cell K-ATP channel -> insulin release */
    su: ART(`
      ${tag(150, 11, 'Sulfonylureas', '', 10)}
      ${cellBox(10, 34, 150, 110, 'f-good')}
      ${T(85, 136, 'beta cell', { s: 9.5, c: 'ink' })}
      <rect class="f-white" x="70" y="28" width="30" height="12" rx="3"/>
      <g class="q"><path class="s-line" d="M85 28 V40" stroke-width="3" stroke-dasharray="2 2"/></g>
      <g class="ans"><rect class="f-bad a-blink" x="77" y="29" width="16" height="10" rx="2"/></g>
      ${tag(40, 24, 'K-ATP', '', 9)}
      <g class="ans">${cls('a-bob', at(122, 26, pill(-15, 'f-warn', 'f-white')))}</g>
      ${[[40, 70], [66, 92], [96, 70], [120, 100], [50, 112], [86, 112]].map(([x, y], i) => mover(`<circle class="f-pancreas" r="6"/><circle class="f-white noline" cx="-1.5" cy="-1.5" r="1.8" opacity=".7"/>`, `M${x} ${y} L160 ${y} L196 ${y}`, 2.6, -i * .4, 'keyTimes="0;.7;1" keyPoints="0;.6;1" calcMode="linear"')).join('')}
      <g class="q">${[[40, 70], [66, 92], [96, 70], [120, 100], [50, 112], [86, 112]].map(([x, y]) => `<circle class="f-pancreas" cx="${x}" cy="${y}" r="6"/>`).join('')}</g>
      ${qtag(84, 54, 'Insulin released', 9.5)}
      ${tag(240, 28, 'Blood glucose', '', 9)}
      ${gluGauge(240, 92, 44, 60, -72, 3.4)}
      ${qtag(240, 112, 'Hypoglycemia', 9.5)}
      ${qtag(240, 136, 'Weight gain', 9.5)}
      ${qtag(150, 164, 'Needs working beta cells', 9.5)}`),

    /* 14. Glipizide vs glyburide */
    gly: ART(`
      ${tile(6, 6, 140, 168, 'good')}${tile(154, 6, 140, 168, 'bad')}
      ${tag(76, 18, 'Glipizide', '', 10)}${tag(224, 18, 'Glyburide', '', 10)}
      ${at(42, 56, pill(-25, 'f-good', 'f-white'), 1.3)}
      ${at(96, 62, kidney())}
      <g class="ans">${cls('a-pop', at(116, 42, chk(9)))}</g>
      ${qtag(76, 108, 'Preferred in CKD', 9.5)}
      ${qtag(76, 132, 'kidney disease OK', 9)}
      ${at(186, 56, pill(-25, 'f-bad', 'f-white'), 1.3)}
      ${at(250, 60, elder())}
      <g class="ans">${at(250, 60, nope(20))}</g>
      ${dial(224, 160, 26, [['bad', -90, -40], ['good', -40, 30], ['warn', 30, 90]])}${sweep(224, 160, 26, 40, -70, 2.8)}
      ${qtag(224, 100, 'Most hypoglycemia', 9.5)}
      ${qtag(224, 120, 'Avoid in older adults', 9)}`),

    /* 15. Pioglitazone: insulin sensitizer; edema, HF box, bladder cancer */
    tzd: ART(`
      ${tag(80, 12, 'Pioglitazone (TZD)', '', 10)}
      <circle class="f-fat" cx="72" cy="80" r="52"/>
      <circle class="f-spleen" cx="72" cy="84" r="16"/>
      ${T(72, 124, 'fat / muscle cell', { s: 9, w: 400 })}
      ${[[-70], [-30], [10], [190], [150]].map(([a], i) => { const r = a * Math.PI / 180; const x = 72 + 52 * Math.cos(r), y = 80 + 52 * Math.sin(r); return `<g class="ans">${pop(i + 1, `<rect class="f-good" x="${(x - 5).toFixed(1)}" y="${(y - 5).toFixed(1)}" width="10" height="10" rx="2"/>`)}</g>`; }).join('')}
      ${mover(hex(4.5), 'M90 22 L88 46 L80 70', 2.4, 0)}
      ${mover(hex(4.5), 'M140 70 L116 72 L96 80', 2.4, -1.2)}
      ${mover(pill(0, 'f-immune', 'f-white'), 'M6 150 L40 112 L64 90', 3, 0)}
      ${qtag(72, 56, 'Insulin sensitizer', 9.5)}
      ${qtag(72, 84, 'PPAR-γ', 9)}
      ${at(30, 156, cal('f-immune'), .8)}
      ${qtag(84, 160, 'Slow onset (weeks)', 9)}
      ${[['water', `${foot()}${cls('a-pulse', at(4, 4, drop('f-water', .8)))}`, 'Edema, weight gain'], ['bad', `${cls('a-beat', heart())}${at(14, 10, bbox(), .5)}`, 'Box: heart failure'], ['pancreas', `${bladder()}${at(2, -2, warn(), .45)}`, 'Bladder cancer risk']].map(([c, ic, lab], i) => {
        const y = 24 + i * 52;
        return tile(150, y, 144, 46, c) + at(172, y + 23, ic, .9) + qtag(236, y + 23, lab, 9);
      }).join('')}`),

    /* 16. GLP-1 receptor agonists */
    glp1: ART(`
      ${tag(150, 11, 'GLP-1 receptor agonists', '', 10)}
      ${cls('a-bob', at(150, 92, pen('f-immune', -20), 1.3))}
      ${tile(6, 24, 112, 66, 'pancreas')}${tile(182, 24, 112, 66, 'stomach')}${tile(6, 96, 112, 56, 'good')}${tile(182, 96, 112, 56, 'muscle')}
      ${at(36, 46, panc(), .45)}
      ${qtag(62, 66, 'Insulin ↑', 9.5)}${qtag(62, 82, 'Glucagon ↓', 9.5)}
      ${cls('a-squeeze', at(214, 54, stomach(), .55), 'animation-duration:3.4s')}
      ${mover(`<circle class="f-food" r="3"/>`, 'M206 42 Q222 52 216 68', 4, 0)}
      ${qtag(254, 56, 'Slow emptying', 9)}
      ${at(28, 124, scaleIc(), .8)}<g class="ans"><g class="a-drop"><path d="M46 116 L42 110 H50 Z" fill="var(--c-good)" transform="rotate(180 46 113)"/></g></g>
      ${qtag(80, 124, 'Weight loss', 9.5)}
      ${cls('a-beat', at(204, 124, heart(), .7))}
      ${qtag(254, 124, 'Some: CV benefit', 9)}
      ${qtag(150, 166, 'Preferred injectable before insulin', 9.5)}`),

    /* 17. GLP-1 RA cautions */
    glp1AE: ART(`
      ${tag(150, 11, 'GLP-1 RA cautions', '', 10)}
      ${[['stomach', `${cls('a-shake', stomach())}`, 'Nausea, vomiting'], ['bad', cls('a-pulse', panc('f-bad')), 'Pancreatitis'], ['gall', cls('a-sway', gallb()), 'Gallbladder disease']].map(([c, ic, lab], i) => {
        const x = 8 + i * 96;
        return tile(x, 24, 92, 74, c) + at(x + 46, 50, ic, i === 1 ? .6 : .7) + qtag(x + 46, 86, lab, 9);
      }).join('')}
      ${tile(8, 106, 284, 68, 'tumor')}
      ${at(36, 140, thyroid(), 1.2)}
      <g class="ans">${cls('a-pulse', at(36, 146, `<circle class="f-tumor" r="4"/>`))}</g>
      ${at(70, 140, bbox(), .9)}
      ${at(258, 140, tree())}<g class="ans">${at(258, 140, nope(18))}</g>
      ${qtag(160, 128, 'Box: medullary thyroid cancer', 9)}
      ${qtag(160, 154, 'No MTC or MEN2 history', 9.5)}`),

    /* 18. Tirzepatide: one molecule, two receptors */
    tirz: ART(`
      ${tag(150, 11, 'Tirzepatide (Mounjaro)', '', 10)}
      ${cellBox(20, 96, 200, 76, 'f-pancreas')}
      ${T(120, 160, 'beta cell', { s: 9.5, c: 'ink' })}
      <path class="f-spleen" d="M64 98 V82 H72 V90 H80 V82 H88 V98 Z"/>
      <path class="f-immune" d="M152 98 V82 H160 V90 H168 V82 H176 V98 Z"/>
      ${qtag(76, 116, 'GIP-R', 9.5)}${qtag(164, 116, 'GLP-1-R', 9.5)}
      <g class="q"><g transform="translate(120 46)"><path class="f-good" d="M-50 0 H50 V8 H-36 V22 H-48 V8 Z M38 8 V22 H50 V8 Z"/></g></g>
      <g class="ansmotion"><g><path class="f-good" d="M-50 0 H50 V8 H-36 V22 H-48 V8 Z M38 8 V22 H50 V8 Z"/><animateTransform attributeName="transform" type="translate" values="120 40;120 62;120 62;120 40" keyTimes="0;.35;.8;1" dur="3s" repeatCount="indefinite"/></g></g>
      <g class="ans"><g class="a-pulse"><circle cx="76" cy="90" r="12" fill="var(--c-nerve)" opacity=".5"/></g><g class="a-pulse"><circle cx="164" cy="90" r="12" fill="var(--c-nerve)" opacity=".5"/></g></g>
      ${qtag(120, 34, 'Dual GIP + GLP-1 agonist', 9.5)}
      ${at(258, 50, cal('f-good'))}
      ${qtag(258, 76, 'Once weekly', 9.5)}
      ${at(258, 112, thyroid())}${at(276, 126, bbox(), .5)}
      ${qtag(250, 146, 'Thyroid cancer box', 9)}
      ${qtag(250, 164, 'No MTC or MEN2', 9)}`),

    /* 19. Pramlintide: amylin mimetic at meals with insulin */
    pram: ART(`
      ${tag(150, 11, 'Pramlintide (Symlin)', '', 10)}
      ${tile(6, 22, 150, 86, 'good')}
      ${at(44, 52, plate())}
      ${cls('a-bob', at(112, 40, pen('f-good', -15), .9))}
      ${cls('a-bob', at(112, 62, pen('f-immune', -15), .9), 'animation-delay:.5s')}
      ${qtag(80, 84, 'Mealtime shot', 9.5)}
      ${qtag(80, 100, 'Amylin mimetic', 9)}
      ${tile(164, 22, 130, 86, 'bad')}
      ${gluGauge(229, 84, 36, 50, -74, 3.2)}
      ${qtag(229, 98, 'Severe lows', 9.5)}
      ${tag(229, 32, 'with insulin', '', 9)}
      ${[['vein', 'T1 or T2 on insulin'], ['stomach', 'Nausea'], ['warn', 'No gastroparesis']].map(([c, lab], i) => {
        const x = [6, 112, 182][i], w = [102, 66, 112][i];
        return tile(x, 116, w, 58, c) + qtag(x + w / 2, 160, lab, 9);
      }).join('')}
      ${at(57, 134, person('f-vein'), .55)}
      ${cls('a-shake', at(145, 136, stomach(), .45))}
      ${at(238, 138, stomach(), .45)}<g class="ans">${at(238, 136, nope(12))}</g>`),

    /* 20. Insulin types by duration: four action curves */
    insulin: (() => {
      const x0 = 30, y0 = 92, w = 256, H = 24;
      const C = [['bad', 'Rapid', 'lispro, aspart, glulisine', .25, 1, 4, 62], ['warn', 'Short', 'regular', .5, 3, 7, 48], ['good', 'Intermediate', 'NPH', 2, 6, 15, 38, 9], ['vein', 'Long', 'glargine, detemir, degludec', 1.5, 4, 24, 22, 23]];
      return ART(`
        ${plot(x0, y0, w, 74, H, [0, 4, 8, 12, 24])}
        ${C.map(([c, , , o, p, e, top, p2], i) => drawC(curve(x0, y0, w, H, o, p, e, top, p2 || p), c, i * .35)).join('')}
        ${C.map(([c, n, d], i) => {
          const y = 120 + i * 17;
          return `<path d="M10 ${y} H26" stroke="var(--c-${c})" stroke-width="4" stroke-linecap="round"/>` + tag(30 + n.length * 2.8 + 5, y, n, '', 9) + qtag(200, y, d, 9);
        }).join('')}`);
    })(),

    /* 21. Rapid-acting vs regular */
    rapid: (() => {
      const x0 = 24, y0 = 80, w = 264, H = 8;
      return ART(`
        ${plot(x0, y0, w, 66, H, [0, 1, 2, 4, 6, 8])}
        <g class="ans">${drawC(curve(x0, y0, w, H, .15, 1, 4, 56), 'bad')}${drawC(curve(x0, y0, w, H, .75, 3, 7, 44), 'warn', .4)}</g>
        ${q(150, 46, 11)}
        ${tile(6, 102, 140, 74, 'bad')}${tile(154, 102, 140, 74, 'warn')}
        ${tag(76, 114, 'Rapid-acting', '', 10)}${tag(224, 114, 'Regular', '', 10)}
        ${qtag(76, 134, 'Onset 5–15 min', 9.5)}${qtag(76, 150, 'Peak 30–90 min', 9.5)}${qtag(76, 166, 'Lasts 3–4 h', 9.5)}
        ${qtag(224, 134, 'Onset 30–60 min', 9.5)}${qtag(224, 150, 'Peak 2–4 h', 9.5)}${qtag(224, 166, 'Lasts 6–8 h', 9.5)}`);
    })(),

    /* 22. NPH peak */
    nph: (() => {
      const x0 = 24, y0 = 118, w = 264, H = 24, X = t => x0 + w * t / H, d = curve(x0, y0, w, H, 2, 6, 16, 70, 10);
      return ART(`
        ${tag(150, 11, 'NPH (intermediate-acting)', '', 10)}
        ${plot(x0, y0, w, 90, H, [0, 2, 4, 6, 10, 16, 24])}
        <g class="ans"><rect x="${X(6)}" y="${y0 - 88}" width="${X(10) - X(6)}" height="88" fill="var(--c-nerve)" opacity=".35"/>${fillC(d, 'good')}${drawC(d, 'good')}</g>
        ${qtag(X(8), 40, 'Peak 6–10 h', 10)}
        ${q(X(8), 80, 11)}
        ${qtag(70, 156, 'Onset 2–4 h', 9.5)}
        ${qtag(150, 172, 'Lasts 10–16 h', 9.5)}
        ${at(232, 156, `<g class="a-sway">${moon()}</g>`)}${at(266, 156, sun(), .8)}`);
    })(),

    /* 23. Glargine: flat basal, no peak, ~24 h */
    glargine: (() => {
      const x0 = 24, y0 = 116, w = 264, H = 24, X = t => x0 + w * t / H;
      const d = `M${x0} ${y0} C${X(1)} ${y0} ${X(1.2)} ${y0 - 40} ${X(2.5)} ${y0 - 40} L${X(22)} ${y0 - 40} C${X(23)} ${y0 - 40} ${X(23.6)} ${y0 - 20} ${X(24)} ${y0 - 14}`;
      return ART(`
        ${tag(150, 11, 'Insulin glargine (basal)', '', 10)}
        ${plot(x0, y0, w, 88, H, [0, 2, 6, 12, 18, 24])}
        <g class="ans">${fillC(d + ` L${X(24)} ${y0}`, 'vein')}${drawC(d, 'vein', 0, 3.4)}</g>
        ${at(70, 44, sun(), .9)}${at(230, 44, moon(), .9)}
        ${qtag(150, 56, 'No peak', 10)}
        ${qtag(60, 152, 'Onset ~2 h', 9.5)}
        ${qtag(150, 170, 'Lasts about 24 h', 9.5)}
        ${qtag(240, 152, 'Once daily', 9.5)}`);
    })(),

    /* 24. Insulin side effects */
    insAE: grid4('Insulin side effects', [
      ['bad', `${meter('f-bad')}${cls('a-drop', `<path d="M15 -2 L11 -8 H19 Z" fill="var(--c-bad)" transform="rotate(180 15 -5)"/>`)}`, 'Hypoglycemia (#1)', 9.5],
      ['warn', `${scaleIc()}${cls('a-rise', `<path d="M18 -12 L14 -6 H22 Z" fill="var(--c-warn)"/>`)}`, 'Weight gain', 10],
      ['good', `<circle class="f-skin" r="15"/>${mover(`<circle class="f-good" r="4.5"/>`, 'M-24 -10 L-4 -2 L2 2', 2, 0)}${mover(`<circle class="f-good" r="4.5"/>`, 'M-24 12 L-4 4 L0 0', 2, -1)}`, 'Low potassium (K+)', 9],
      ['skin', `${at(0, 0, `<path class="f-skin" d="M-16 -12 Q0 -18 16 -12 Q20 4 14 16 Q0 20 -14 16 Q-20 4 -16 -12 Z"/>`)}${cls('a-pulse', `<circle class="f-fat" cx="-6" cy="2" r="5"/>`)}${cls('a-spin', `<circle r="9" fill="none" stroke="var(--c-vein)" stroke-width="1.6" stroke-dasharray="4 3"/>`)}`, 'Lumps: rotate sites', 9],
    ]),

    /* 25. Hypoglycemia signs */
    hypo: grid6('Hypoglycemia signs', [
      ['water', `${cls('a-shake', hand())}${cls('a-drop', at(14, -12, drop('f-water', .6)))}`, 'Shaky, sweaty', 9.5],
      ['muscle', `${cls('a-beat', heart())}`, 'Fast heartbeat', 9.5],
      ['warn', `${plate()}${cls('a-blink', at(0, 0, `<circle class="f-food" r="5"/>`))}`, 'Hunger', 9.5],
      ['spleen', `${cls('a-spin', head2())}`, 'Confused, dizzy', 9.5],
      ['immune', cls('a-blink', eye()), 'Blurred vision', 9.5],
      ['mouth', `${lips()}${cls('a-blink', `<path class="s-nerve" d="M-18 -10 l-4 -4 M0 -10 V-15 M18 -10 l4 -4" stroke-width="2"/>`)}`, 'Tingling lips', 9.5],
    ]),

    /* 26. Hyperglycemia signs */
    hyper: grid4('Hyperglycemia signs', [
      ['bad', `${meter('f-bad')}${cls('a-rise', `<path d="M15 -12 L11 -6 H19 Z" fill="var(--c-bad)"/>`)}`, 'High blood sugar', 9.5],
      ['pancreas', `${drop('f-pancreas', 1.6)}${cls('a-pulse', at(0, 4, hex(5)))}`, 'Sugar in urine', 9.5],
      ['water', `${toilet()}${cls('a-blink', at(14, -14, clock(), .55))}`, 'Frequent urination', 9],
      ['vein', `${glass()}${cls('a-bob', at(15, -12, drop('f-water', .6)))}`, 'Thirst', 10],
    ]),

    /* 27. Older adults: wider target, avoid lows */
    older: ART(`
      ${tag(150, 11, 'Older adults (65+)', '', 10)}
      ${at(44, 84, elder(), 1.6)}
      <circle cx="150" cy="76" r="44" fill="var(--c-bad)" stroke="var(--art-line)" stroke-width="1.4"/>
      <circle cx="150" cy="76" r="32" fill="var(--c-white, #fff)" stroke="var(--art-line)" stroke-width="1.2"/>
      <g class="q"><circle cx="150" cy="76" r="10" fill="var(--c-good)" stroke="var(--art-line)" stroke-width="1.2"/></g>
      <g class="ansmotion"><circle cx="150" cy="76" r="10" fill="var(--c-good)" stroke="var(--art-line)" stroke-width="1.2"><animate attributeName="r" values="10;28;28;10" keyTimes="0;.4;.85;1" dur="3.4s" repeatCount="indefinite"/></circle></g>
      ${T(150, 30, 'A1c target', { s: 9.5 })}
      ${qtag(150, 80, 'Less strict A1c goal', 9.5)}
      ${tag(250, 30, 'Blood glucose', '', 9)}
      ${gluGauge(250, 90, 40, -70, -10, 3)}
      ${qtag(250, 106, 'Avoid lows', 9.5)}
      ${at(40, 150, meter())}${at(70, 150, cal('f-immune'), .8)}
      ${qtag(170, 150, 'Frequent glucose + A1c checks', 9.5)}`),

    /* 28. Patient teaching */
    teach: grid4('Diabetes teaching', [
      ['bad', cls('a-pulse', band()), 'Medical alert ID', 9.5],
      ['warn', `${meter()}${cls('a-bob', `<path d="M16 -16 L12 -10 H20 Z" fill="var(--c-warn)"/><path d="M16 14 L12 8 H20 Z" fill="var(--c-vein)"/>`)}`, 'Know low/high signs', 9],
      ['good', `${phone()}${cls('a-blink', `<path class="s-bad" d="M13 -12 q5 4 0 8 M17 -15 q8 7 0 14" stroke-width="1.8"/>`)}`, '911 if no response', 9],
      ['immune', `${at(-6, 0, meter(), .9)}${cls('a-pop', at(12, 8, cal('f-good'), .6))}`, 'Check glucose + A1c', 9],
    ]),
  });
})();
