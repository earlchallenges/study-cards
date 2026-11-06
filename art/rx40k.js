/* Pharmacology rx40-key art: colorful replacements for PICS, loaded after the page sets PICS.
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

  const S = (title, body) => ART(tag(150, 11, title, '', 10) + body);
  const cube = (c = 'f-pancreas', s = 1) => `<g transform="scale(${s})"><rect class="${c}" x="-5" y="-5" width="10" height="10" rx="2"/></g>`;
  const flow = (path, n, dur, inner = cube()) => [...Array(n)].map((_, i) => fade(inner, path, dur, i * dur / n)).join('');
  const label = (x, y, t, s = 9.5) => T(x, y, t, { s });
  const ans = (x, y, t, s = 9.5) => T(x, y, t, { s, c: 'ans ink' });
  const vessel = (d, w = 12) => thick(d, 'blood', w);
  const fatCell = (x, y, r = 14) => `<g transform="translate(${x} ${y})"><circle class="f-fat a-pulse" r="${r}"/></g>`;
  const dot = (c, r = 4) => `<circle class="${c}" r="${r}"/>`;
    const shield = () => `<path class="f-immune" d="M0 -17 L14 -11 V2 C14 11 7 16 0 19 C-7 16 -14 11 -14 2 V-11 Z" opacity=".55"/>`;
  const bolt = () => `<path class="f-warn" d="M3 -10 L-5 2 H0 L-3 10 L5 -2 H0 Z"/>`;
  const riseBar = (x, base, w, h, c, dur = 2.4) => `<g class="ansmotion"><rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="3" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.3"><animate attributeName="height" values="0;${h};${h}" keyTimes="0;.6;1" dur="${dur}s" repeatCount="indefinite"/><animate attributeName="y" values="${base};${base - h};${base - h}" keyTimes="0;.6;1" dur="${dur}s" repeatCount="indefinite"/></rect></g>`;
  const insPlot = lines => plot(34, 142, 244, 104, 24, [0, 6, 12, 18, 24]) + lines.join('');
  const crv = (o, p, e, top, c, d = 0, p2) => drawC(curve(34, 142, 244, 24, o, p, e, top, p2 ?? p), c, d);
  const faint = (o, p, e, top, p2) => `<path d="${curve(34, 142, 244, 24, o, p, e, top, p2 ?? p)}" fill="none" stroke="var(--pic-ink)" stroke-width="1.4" opacity=".28"/>`;

  Object.assign(PICS, {
    /* Metformin: liver pours out less sugar. Top lane untreated, bottom lane on the drug. */
    first: S('New type 2: what do you start?', `
      ${tile(10, 24, 280, 150, 'water')}
      ${at(16, 46, liver(), .62)}
      ${vessel('M112 44 H282')}${vessel('M112 98 H282')}
      ${label(190, 34, 'no drug: lots of sugar pours out')}
      ${flow('M116 44 L280 44', 7, 2.6)}
      ${flow('M116 98 L280 98', 2, 2.6)}
      ${cls('a-pop', at(38, 128, pill(-25, 'f-good'), 1))}
      ${T(190, 88, 'on the drug: much less', { s: 9.5, c: 'ans ink' })}
      ${qtag(190, 128, 'Metformin', 14)}
      ${ans(190, 158, 'plus diet and exercise')}`),

    /* Type 1: immune cells destroy beta cells, so insulin must come from a shot. */
    type1: S('Type 1: why, and what fixes it', `
      ${tile(10, 24, 134, 150, 'pancreas')}${tile(156, 24, 134, 150, 'good')}
      ${label(77, 40, 'immune attack')}
      ${[[58, 88], [84, 76], [96, 102], [66, 112]].map(([x, y], i) => at(x, y, `<circle class="f-pancreas a-blink" style="animation-delay:${i * .3}s" r="10"/>`)).join('')}
      ${flow('M22 56 L60 88', 2, 1.8, dot('f-germ', 6))}${flow('M132 56 L92 94', 2, 1.8, dot('f-germ', 6))}
      ${label(77, 152, 'beta cells gone')}
      ${label(223, 40, 'replace it')}
      ${cls('a-bob', at(190, 76, syringe(35), 1.2))}
      ${flow('M204 92 L262 118', 3, 1.8, key('f-good'))}
      ${qtag(223, 142, 'Insulin for life', 10.5)}
      ${ans(223, 162, 'long-acting + mealtime')}`),

    /* SGLT2 in HF: extra sugar, salt and water leave through the kidney; fewer HF hospital stays. */
    hfbest: S('Heart failure: which class helps?', `
      ${tile(10, 24, 280, 150, 'good')}
      ${cls('a-beat', at(52, 78, heart(), 1.3))}
      ${label(52, 118, 'fluid-loaded heart')}
      ${at(160, 72, kidney(), 1)}
      ${flow('M78 76 L136 74', 3, 1.8, drop('f-water', .7))}
      ${flow('M160 96 L160 150', 3, 1.8)}
      ${at(160, 150, toilet(), .7)}
      ${ans(160, 34, 'sugar, salt, water leave')}
      ${qtag(236, 74, 'SGLT2 inhibitor', 9.5)}
      ${ans(236, 96, 'dapagliflozin')}
      ${ans(236, 126, 'fewer HF')}${ans(236, 138, 'hospital stays')}`),

    /* Pioglitazone: kidney holds on to salt and water, fluid backs up, legs swell, heart strains. */
    hfavoid: S('Heart failure: which drug backfires?', `
      ${tile(10, 24, 280, 150, 'bad')}
      ${at(52, 72, kidney(), 1)}
      ${label(52, 112, 'kidney keeps fluid')}
      ${flow('M78 72 L128 72', 3, 1.7, drop('f-water', .7))}
      ${cls('a-pulse', at(156, 72, heart(), 1.25))}
      ${label(156, 110, 'heart strains')}
      ${flow('M156 116 L156 138', 2, 1.7, drop('f-water', .6))}
      ${cls('a-pulse', at(156, 150, foot(), .55))}
      ${cls('a-pop', at(244, 50, bbox(), 1.1))}
      ${qtag(236, 88, 'Pioglitazone', 10.5)}
      ${ans(236, 114, 'boxed warning')}
      ${ans(236, 130, 'no NYHA 3 or 4')}
      ${ans(236, 152, 'swelling, weight up')}`),

    /* GLP-1 in heart disease: a shield around the heart; events bounce off. */
    cvd: S('Heart disease: which class protects?', `
      ${tile(10, 24, 280, 150, 'immune')}
      ${cls('a-beat', at(84, 92, heart(), 1.5))}
      <g class="ans"><circle cx="84" cy="94" r="46" fill="var(--c-immune)" opacity=".18" stroke="var(--c-immune)" stroke-width="3"/></g>
      ${fade(bolt(), 'M24 40 L52 66 L24 40', 1.8, 0)}${fade(bolt(), 'M146 40 L118 66 L146 40', 1.8, .6)}${fade(bolt(), 'M150 150 L120 126 L150 150', 1.8, 1.2)}
      ${label(84, 166, 'fewer heart attacks, strokes')}
      ${cls('a-bob', at(218, 54, pen('f-immune', -25), 1.05))}
      ${qtag(218, 94, 'GLP-1 agonist', 11)}
      ${ans(218, 116, 'semaglutide')}${ans(218, 130, 'dulaglutide')}${ans(218, 144, 'liraglutide')}`),

    /* CKD: shield on the kidney; linagliptin leaves through the gut, not the urine. */
    ckd: S('Kidney disease: two good picks', `
      ${tile(10, 24, 134, 150, 'good')}${tile(156, 24, 134, 150, 'water')}
      ${at(77, 76, kidney(), 1.05)}
      <g class="ans a-pulse"><circle cx="77" cy="76" r="33" fill="var(--c-immune)" opacity=".2" stroke="var(--c-immune)" stroke-width="3"/></g>
      ${qtag(77, 130, 'SGLT2 inhibitor', 9.5)}
      ${ans(77, 152, 'protects, if eGFR allows')}
      ${at(198, 48, liver(), .3)}
      ${thick('M204 62 C204 92 262 84 262 112 S214 128 214 146', 'small', 7)}
      ${flow('M204 62 C204 92 262 84 262 112 S214 128 214 146', 3, 2.4, tab('f-good'))}
      ${at(256, 52, kidney(), .5)}${cls('a-pop', at(256, 52, nope(15)))}
      ${qtag(223, 162, 'Linagliptin', 10)}`),

    /* Glipizide: liver breaks it into inactive pieces, so the kidney has nothing active to pile up. */
    glip: S('Sulfonylurea + kidney trouble', `
      ${tile(10, 24, 280, 150, 'pancreas')}
      ${cls('a-bob', at(36, 72, pill(-25, 'f-good'), 1))}
      ${flow('M52 72 L86 72', 2, 1.4, dot('f-good'))}
      ${at(84, 50, liver(), .42)}
      ${label(112, 96, 'liver breaks it down')}
      ${flow('M138 72 L202 72', 3, 2, dot('f-scar'))}
      ${label(172, 60, 'inactive')}
      ${at(226, 72, kidney(), .95)}
      ${cls('a-pop', at(262, 46, chk(9)))}
      ${qtag(150, 132, 'Glipizide', 16)}
      ${ans(150, 158, 'preferred when kidneys are weak')}`),

    /* Glyburide: long-lasting, so glucose keeps sliding, including overnight. */
    glyb: S('Older adult: skip this sulfonylurea', `
      ${tile(10, 24, 280, 150, 'bad')}
      ${cls('a-sway', at(46, 110, elder(), 1.25))}
      ${gluGauge(150, 104, 50, 10, -78, 3.2)}
      ${at(150, 122, moon(), .6)}
      ${label(150, 146, 'sugar keeps falling at night')}
      ${qtag(240, 74, 'Glyburide', 11.5)}
      ${ans(240, 98, 'lasts longer')}
      ${ans(240, 112, 'more lows')}`),

    /* DPP-4 in older adults: glucose wave stays above the danger floor. */
    older: S('Older adult: a gentle choice', `
      ${tile(10, 24, 280, 150, 'good')}
      ${cls('a-sway', at(44, 104, elder(), 1.2))}
      <rect x="84" y="124" width="196" height="26" rx="4" fill="var(--c-bad)" opacity=".25"/>
      ${T(182, 142, 'danger zone: lows', { s: 9.5 })}
      ${drawC('M88 88 C110 58 128 58 150 86 S190 112 210 84 S252 60 276 86', 'good')}
      ${label(182, 46, 'blood sugar over the day')}
      ${qtag(182, 162, 'DPP-4 inhibitor', 10)}`),

    /* GLP-1 weight loss: brain signals full, stomach empties slowly, scale drops. */
    wtloss: S('Weight loss is the goal', `
      ${tile(10, 24, 280, 150, 'good')}
      ${at(54, 58, brain(), .85)}
      ${flow('M54 78 L54 108', 2, 1.4, dot('f-immune'))}
      ${at(54, 134, stomach(), .62)}
      ${label(54, 170, 'I feel full')}
      ${at(146, 78, scaleIc(), 1.5)}
      ${cls('a-drop', at(146, 124, `<path class="s-good" d="M0 -12 V10 M-8 3 L0 12 L8 3" stroke-width="3.6"/>`))}
      ${qtag(232, 74, 'GLP-1 agonist', 10)}
      ${qtag(232, 112, 'Tirzepatide', 10)}
      ${ans(232, 148, 'biggest weight loss')}`),

    /* Weight gain: insulin action stores sugar in fat; pioglitazone adds fat and fluid. */
    wtgain: S('These three add pounds', `
      ${tile(10, 24, 86, 150, 'pancreas')}${tile(107, 24, 86, 150, 'spleen')}${tile(204, 24, 86, 150, 'immune')}
      ${flow('M26 54 L52 92', 3, 1.8)}${fatCell(53, 98, 18)}
      ${qtag(53, 148, 'Sulfonylureas', 9)}
      ${flow('M124 54 L150 92', 2, 1.8)}${flow('M176 54 L150 92', 2, 1.8, drop('f-water', .7))}${fatCell(150, 98, 18)}
      ${qtag(150, 148, 'Pioglitazone', 9)}
      ${flow('M220 54 L247 92', 3, 1.8)}${fatCell(247, 98, 18)}
      ${qtag(247, 148, 'Insulin', 10)}`),

    /* Hypoglycemia: too much insulin clears sugar from blood. */
    lowrisk: S('Which drugs drop blood sugar most?', `
      ${tile(10, 24, 280, 150, 'bad')}
      ${vessel('M22 56 H158')}
      ${flow('M36 56 L36 116', 3, 1.6)}${flow('M86 56 L86 116', 3, 1.6)}${flow('M136 56 L136 116', 3, 1.6)}
      ${label(86, 42, 'blood sugar pulled out')}
      ${gluGauge(86, 160, 42, 15, -76, 2.8)}
      ${qtag(224, 74, 'Insulin', 13)}
      ${qtag(224, 108, 'Sulfonylureas', 10.5)}
      ${ans(224, 134, 'most of all: glyburide')}`),

    /* Cost: a simple price chart. */
    budget: S('Tight budget: lowest cost', `
      ${tile(10, 24, 280, 150, 'good')}
      ${label(68, 40, 'monthly price')}
      <path class="s-ink" d="M24 146 H128" stroke-width="1.8"/>
      ${riseBar(34, 146, 24, 18, 'good')}${riseBar(66, 146, 24, 24, 'good')}${riseBar(98, 146, 24, 88, 'bad')}
      ${ans(46, 160, 'Met')}${ans(78, 160, 'SU')}${ans(110, 160, 'GLP-1')}
      ${qtag(210, 62, '1st: Metformin', 11)}
      ${qtag(210, 98, '2nd: Glipizide', 11)}
      ${ans(210, 134, 'tell us if you can\'t afford it')}
      ${ans(210, 148, 'don\'t skip doses')}`),

    /* Lactic acidosis: weak kidneys can't clear metformin, lactate builds up. */
    metbox: S('Metformin: the boxed warning', `
      ${tile(10, 24, 280, 150, 'bad')}
      ${at(50, 76, kidney(), 1.05)}${cls('a-blink', at(50, 76, nope(26)))}
      ${label(50, 120, 'eGFR under 30')}
      ${flow('M84 76 L134 76', 3, 1.7, pill(-20, 'f-good'))}
      ${label(109, 60, 'drug backs up')}
      ${at(166, 96, vial(.1, 'f-bad'), 2)}
      ${riseBar(153, 126, 26, 42, 'bad', 3)}
      ${label(166, 148, 'lactate rises')}
      ${qtag(240, 70, 'Lactic', 12)}
      ${qtag(240, 96, 'acidosis', 12)}
      ${cls('a-pop', at(240, 134, bbox(), .9))}`),

    /* GI upset: most common; ER version gentler. */
    metgi: S('Metformin: most common complaint', `
      ${tile(10, 24, 280, 150, 'warn')}
      ${cls('a-squeeze', at(60, 84, stomach(), 1))}
      ${thick('M78 120 C110 136 140 112 168 128', 'small', 8)}
      ${flow('M78 120 C110 136 140 112 168 128', 5, 1.2, drop('f-water', .55))}
      ${label(60, 132, 'upset gut')}
      ${at(196, 112, toilet(), 1.2)}
      ${qtag(200, 60, 'Diarrhea', 15)}
      ${ans(200, 158, 'less with extended-release')}`),

    /* B12: taken up in the last part of the small intestine; metformin blocks some of it. */
    b12: S('Years on metformin: what runs low?', `
      ${tile(10, 24, 280, 150, 'vein')}
      ${thick('M20 112 H190', 'small', 22)}
      ${label(105, 138, 'end of the small intestine')}
      ${vessel('M20 64 H190', 9)}
      ${label(105, 50, 'bloodstream')}
      ${flow('M36 112 L176 112', 4, 3, dot('f-immune', 5))}
      ${flow('M108 110 L108 68', 1, 2.4, dot('f-immune', 5))}
      ${at(70, 88, pill(-20, 'f-good'), .75)}${at(150, 88, pill(-20, 'f-good'), .75)}
      ${ans(110, 92, 'metformin blocks some')}
      ${qtag(240, 70, 'Vitamin B12', 11)}
      ${cls('a-blink', at(240, 118, hand(), .7))}
      ${ans(240, 150, 'can cause numbness')}`),

    /* SGLT2 mechanism: gate in the kidney tubule is blocked; sugar goes on to the urine. */
    sgltmoa: S('Where and how it works', `
      ${tile(10, 24, 280, 150, 'water')}
      ${vessel('M20 50 H280', 9)}
      ${label(150, 40, 'blood')}
      ${thick('M20 104 H226 Q246 104 246 124 V146', 'mucus', 15)}
      ${label(70, 128, 'kidney tubule')}
      <rect x="96" y="58" width="24" height="36" rx="5" fill="#fff" stroke="var(--art-line)" stroke-width="1.5"/>
      ${T(108, 79, 'gate', { s: 8.5 })}
      ${cls('a-pop', at(108, 76, nope(19)))}
      ${flow('M28 104 L226 104 Q246 104 246 124 L246 146', 5, 3)}
      ${at(246, 154, toilet(), .55)}
      ${qtag(204, 76, 'Sugar leaves in urine', 9.5)}
      ${ans(170, 136, 'A1c, BP, weight drop')}`),

    /* Infections: sugar in urine feeds germs. */
    sgltinf: S('Sweet urine feeds what?', `
      ${tile(10, 24, 280, 150, 'germ')}
      ${flow('M78 34 L78 74', 3, 1.5)}
      ${at(78, 110, bladder(), 2.4)}
      ${cls('a-grow', at(62, 106, germ(25), 1))}${cls('a-grow', at(92, 118, yeast(), .8), 'animation-delay:.5s')}
      ${label(78, 162, 'sugar + warmth = germs grow')}
      ${qtag(210, 80, 'Genital yeast', 11)}
      ${qtag(210, 116, 'UTIs', 14)}`),

    /* Euglycemic DKA: gauge stays normal, fat burns, ketones flood blood. */
    eudka: S('DKA, but sugar is normal', `
      ${tile(10, 24, 280, 150, 'bad')}
      ${gluGauge(66, 96, 48, -12, 4, 2)}
      ${label(66, 118, 'glucose looks normal')}
      ${fatCell(140, 134, 20)}
      ${label(140, 166, 'burning fat')}
      ${[0,1,2,3].map(i => bubble('f-warn', 'K', 'M140 110 L140 48', 2.2, i * .55, 8)).join('')}
      ${label(140, 36, 'ketones')}
      ${qtag(228, 76, 'Euglycemic DKA', 9.5)}
      ${ans(228, 100, 'from SGLT2 inhibitors')}
      ${cls('a-blink', at(228, 132, warn(), 1.4))}`),

    /* Amputation warning: foot risk. */
    cana: S('One SGLT2 inhibitor: limb warning', `
      ${tile(10, 24, 280, 150, 'bad')}
      ${cls('a-pulse', at(76, 100, foot(), 2.1))}
      <path class="s-bad a-blink" d="M92 88 V146" stroke-width="3" stroke-dasharray="6 5"/>
      ${label(76, 164, 'risk of leg or foot loss')}
      ${qtag(210, 84, 'Canagliflozin', 13)}
      ${ans(210, 112, 'check feet every day')}`),

    /* GLP-1 mechanism: three separate actions. */
    glpmoa: S('Three things this class does', `
      ${tile(10, 24, 88, 150, 'good')}${tile(106, 24, 88, 150, 'bad')}${tile(202, 24, 88, 150, 'warn')}
      ${at(54, 50, panc('f-pancreas'), .55)}
      ${flow('M54 66 L54 116', 3, 1.8, key('f-good'))}
      ${qtag(54, 136, 'More insulin', 9)}
      ${ans(54, 156, 'pancreas')}
      ${at(150, 50, panc('f-pancreas'), .55)}
      ${cls('a-drop', at(150, 92, `<path class="s-bad" d="M0 -16 V12 M-8 5 L0 14 L8 5" stroke-width="3.4"/>`))}
      ${qtag(150, 136, 'Less glucagon', 9)}
      ${ans(150, 156, 'liver makes less')}
      ${at(246, 76, stomach(), .72)}
      ${flow('M226 66 L266 90', 2, 5, dot('f-food', 4))}
      ${qtag(246, 136, 'Slow stomach', 9)}
      ${ans(246, 156, 'full longer')}`),

    /* Thyroid warning: a growing C-cell tumor, plus family history. */
    glpthy: S('Ask this before a GLP-1 agonist', `
      ${tile(10, 24, 280, 150, 'mouth')}
      ${at(72, 76, thyroid(), 2.5)}
      <g class="ans"><g transform="translate(92 78)"><circle class="f-tumor a-grow" r="9"/></g></g>
      ${at(72, 136, tree(), 1)}
      ${cls('a-blink', '<circle cx="83" cy="147" r="8" fill="none" stroke="var(--c-bad)" stroke-width="2.5"/>')}
      ${qtag(198, 66, 'Medullary thyroid cancer', 8.8)}
      ${qtag(198, 102, 'MEN2', 15)}
      ${ans(198, 132, 'patient or family')}
      ${ans(198, 146, 'either one: don\'t use')}`),

    /* Side effects: each tile shows what actually happens. */
    glpae: S('GLP-1 agonists: side effects', `
      ${tile(10, 24, 136, 72, 'warn')}${tile(154, 24, 136, 72, 'good')}${tile(10, 102, 136, 72, 'pancreas')}${tile(154, 102, 136, 72, 'gall')}
      ${cls('a-sway', at(36, 60, stomach(), .55))}
      ${qtag(100, 60, 'Nausea', 11)}
      ${at(180, 76, stomach(), .5)}
      ${flow('M180 56 L180 32', 3, 1.2, drop('f-bile', .6))}
      ${qtag(244, 60, 'Vomiting', 10.5)}
      ${at(40, 140, panc('f-pancreas'), .38)}${cls('a-blink', '<circle cx="40" cy="140" r="18" fill="var(--c-bad)" opacity=".3"/>')}
      ${qtag(104, 140, 'Pancreatitis', 9.5)}
      ${cls('a-pulse', at(184, 138, gallb(), 1.05))}
      ${qtag(248, 138, 'Gallbladder', 9.5)}`),

    /* Name endings: each icon shows the class action. */
    names: S('Name ending = drug class', `
      ${[[10, 24, 'water', '-gliflozin', 'SGLT2'], [154, 24, 'good', '-gliptin', 'DPP-4'], [10, 102, 'immune', '-tide', 'GLP-1'], [154, 102, 'spleen', '-glitazone', 'TZD']].map(([x, y, c, a, b]) => tile(x, y, 136, 72, c) + tag(x + 86, y + 22, a, '', 10) + qtag(x + 86, y + 50, b, 12)).join('')}
      ${at(36, 58, kidney(), .62)}${flow('M36 72 L36 92', 2, 1.1, cube('f-pancreas', .6))}
      ${at(184, 60, shield(), 1.05)}${cls('a-pulse', at(184, 60, dot('f-good', 6)))}
      ${cls('a-bob', at(38, 138, pen('f-immune', -25), .68))}
      ${at(184, 138, '<circle class="f-skin" r="16"/>')}${flow('M160 138 L184 138', 2, 1.3, key('f-good'))}`),

    /* Diagnosis: each bar climbs to the cutoff. */
    labs: S('Diabetes if any one reaches', `
      ${[[14, 'blood', 'A1c', '6.5%'], [84, 'vein', 'Fasting', '126'], [154, 'warn', '2-hour', '200'], [224, 'good', 'Random', '200']].map(([x, c, a, b], i) => tile(x, 24, 62, 150, c) + label(x + 31, 40, a, 9.5) + `<rect x="${x + 21}" y="58" width="20" height="82" rx="4" fill="#fff" stroke="var(--art-line)" stroke-width="1.3"/>` + riseBar(x + 22, 139, 18, 70, c, 2.6 + i * .15) + `<path d="M${x + 16} 69 H${x + 46}" stroke="var(--art-line)" stroke-width="2"/>` + qtag(x + 31, 154, b, 11)).join('')}
      ${ans(255, 171, '+ symptoms', 9)}`),

    /* Rapid insulin: starts with the meal, first hill on the chart. */
    fast: S('Which insulins start first?', `
      ${insPlot([faint(.6, 3, 8, 70), faint(2, 8, 16, 52), faint(1, 4, 24, 26, 21), crv(.15, 1, 4, 96, 'bad'), fillC(curve(34, 142, 244, 24, .15, 1, 4, 96), 'bad')])}
      ${at(72, 34, plate(), .5)}
      ${qtag(190, 58, 'Lispro, aspart, glulisine', 9.5)}
      ${ans(190, 82, 'start in 5 to 15 minutes')}
      ${ans(190, 96, 'timed with meals')}`),

    /* No-peak insulin: flat line with the sun and moon passing over 24 hours. */
    nopeak: S('Steady all day and night', `
      ${insPlot([faint(.15, 1, 4, 96), faint(2, 8, 16, 62), crv(1, 4, 24, 42, 'spleen', 0, 21), fillC(curve(34, 142, 244, 24, 1, 4, 24, 42, 21), 'spleen')])}
      ${mover(sun(), 'M60 66 Q155 30 278 66', 6)}
      ${qtag(170, 76, 'Glargine, detemir', 11)}
      ${ans(170, 92, 'no peak, background insulin')}`),

    /* NPH: hill peaking between 6 and 10 hours, shaded. */
    nphk: S('Peak at 6 to 10 hours', `
      ${insPlot([`<rect x="${34 + 244 * 6 / 24}" y="38" width="${244 * 4 / 24}" height="104" fill="var(--c-warn)" opacity=".22"/>`, faint(.15, 1, 4, 90), faint(1, 4, 24, 26, 21), crv(2, 8, 16, 80, 'good'), fillC(curve(34, 142, 244, 24, 2, 8, 16, 80), 'good')])}
      ${label(125, 34, '6 to 10 h')}
      ${qtag(220, 66, 'NPH', 17)}
      ${ans(220, 90, 'intermediate-acting')}`),

    /* Insulin side effect: keys move too much sugar into cells; gauge falls. */
    insae: S('Insulin: number one problem', `
      ${tile(10, 24, 280, 150, 'vein')}
      ${vessel('M20 56 H140', 11)}
      <circle class="f-skin" cx="80" cy="130" r="24"/>
      ${T(80, 134, 'cell', { s: 10 })}
      ${flow('M58 58 L72 110', 3, 1.5)}${flow('M100 58 L88 110', 3, 1.5)}
      ${flow('M28 80 L58 118', 2, 1.8, key('f-good'))}
      ${gluGauge(208, 92, 44, 8, -76, 2.6)}
      ${qtag(208, 114, 'Low blood sugar', 10)}
      ${ans(208, 138, 'also weight gain, low K')}
      ${ans(208, 152, 'rotate injection sites')}`),

    /* Rescue: 15 g raises the gauge back to green. */
    rescue: S('Shaky and sweaty: how many grams?', `
      ${tile(10, 24, 280, 150, 'good')}
      ${cls('a-shake', at(46, 92, person('f-water'), 1.15))}
      ${fade(drop('f-water', .55), 'M26 66 L18 96', 1.3, 0)}${fade(drop('f-water', .55), 'M66 66 L74 96', 1.3, .6)}
      ${at(116, 86, glass(), 1)}
      ${flow('M116 106 L150 118', 2, 1.4, cube('f-pancreas', .7))}
      ${gluGauge(208, 118, 46, -76, 2, 3.2)}
      ${qtag(208, 60, '15 grams', 16)}
      ${ans(208, 142, 'then recheck in 15 minutes')}
      ${ans(110, 162, 'juice, tablets, candy')}`),
  });
})();
