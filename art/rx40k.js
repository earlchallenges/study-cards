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
  const cube = (c = 'f-white') => `<rect class="${c}" x="-5" y="-5" width="10" height="10" rx="2"/>`;
  const sugarRain = (x, y1, y2, n = 3, dur = 1.8) => [...Array(n)].map((_, i) => fade(cube('f-pancreas'), `M${x} ${y1} L${x} ${y2}`, dur, i * dur / n)).join('');
  const money = () => `<rect class="f-good" x="-16" y="-9" width="32" height="18" rx="3"/><circle class="f-white" r="5"/><path class="s-line" d="M0 -3 V3" stroke-width="1.6"/>`;
  const cell = (x, y, r = 28, c = 'f-skin') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
  const big = (x, y, t, s = 24, c = 'ink') => T(x, y, t, { s, c });
  const insPlot = (lines) => { const x0 = 34, y0 = 142, w = 244; return plot(x0, y0, w, 104, 24, [0, 6, 12, 18, 24]) + lines.join(''); };
  const C = (o, p, e, top, c, d = 0, p2) => drawC(curve(34, 142, 244, 24, o, p, e, top, p2 ?? p), c, d);

  Object.assign(PICS, {
    first: S('New type 2: start here', `
      ${tile(14, 28, 272, 138, 'water')}
      ${at(62, 92, `<g class="a-bob">${liver()}</g>`, .72).replace('translate(62 92)', 'translate(20 66)')}
      ${sugarRain(120, 100, 150)}
      ${cls('a-pop', at(200, 66, pill(-25, 'f-good'), 2))}
      ${qtag(200, 106, 'Metformin', 14)}
      ${T(200, 136, 'works, safe, cheap', { s: 10, c: 'ans ink' })}`),

    type1: S('Type 1: the only answer', `
      ${tile(14, 28, 272, 138, 'vein')}
      ${at(86, 72, panc('f-pancreas'), .8)}
      ${cls('a-blink', at(86, 76, nope(16)))}
      ${T(86, 112, 'no insulin made', { s: 10 })}
      ${cls('a-sway', at(214, 66, syringe(-35), 1.5))}
      ${qtag(214, 112, 'Insulin for life', 12)}
      ${T(150, 150, 'long-acting + mealtime rapid', { s: 10, c: 'ans ink' })}`),

    hfbest: S('Diabetes + heart failure', `
      ${tile(14, 28, 130, 138, 'blood')}${tile(156, 28, 130, 138, 'good')}
      ${cls('a-beat', at(79, 80, heart(), 1.5))}
      ${T(79, 135, 'weak pump', { s: 10 })}
      ${at(221, 72, kidney(), 1)}
      ${sugarRain(221, 94, 124, 3, 1.5)}
      ${qtag(221, 140, 'SGLT2 inhibitor', 11)}`),

    hfavoid: S('Diabetes + heart failure: do NOT give', `
      ${tile(14, 28, 272, 138, 'bad')}
      ${cls('a-beat', at(70, 84, heart(), 1.4))}
      ${fade(drop('f-water', .9), 'M70 118 L70 150', 1.6, 0)}${fade(drop('f-water', .9), 'M46 118 L46 150', 1.6, .6)}${fade(drop('f-water', .9), 'M94 118 L94 150', 1.6, 1.1)}
      ${cls('a-pop', at(205, 62, bbox(), 1.4))}
      ${qtag(205, 104, 'Pioglitazone', 13)}
      ${T(205, 132, 'fluid buildup', { s: 10, c: 'ans ink' })}
      ${T(205, 148, 'no NYHA 3 or 4', { s: 10, c: 'ans ink' })}`),

    cvd: S('Diabetes + heart disease', `
      ${tile(14, 28, 130, 138, 'blood')}${tile(156, 28, 130, 138, 'immune')}
      ${cls('a-beat', at(79, 88, heart('f-muscle'), 1.5))}
      ${cls('a-pop', at(116, 54, chk(10)))}
      ${cls('a-sway', at(221, 72, pen('f-immune', -25), 1.15))}
      ${qtag(221, 120, 'GLP-1 agonist', 11)}
      ${T(221, 144, 'sema, dula, lira', { s: 10, c: 'ans ink' })}`),

    ckd: S('Diabetes + kidney disease', `
      ${tile(14, 28, 272, 138, 'good')}
      ${cls('a-pulse', at(64, 88, kidney(), 1.4))}
      ${qtag(190, 62, 'SGLT2 if eGFR allows', 10.5)}
      ${qtag(190, 100, 'Linagliptin', 12)}
      ${T(190, 122, 'no kidney dose change', { s: 10, c: 'ans ink' })}
      ${T(190, 148, 'check eGFR first', { s: 10, c: 'ans ink' })}`),

    glip: S('Sulfonylurea + kidney trouble', `
      ${tile(14, 28, 272, 138, 'pancreas')}
      ${at(70, 92, kidney(), 1.3)}
      ${cls('a-pop', at(112, 62, band(), .8))}
      ${cls('a-bob', at(205, 66, pill(-25, 'f-good'), 1.8))}
      ${qtag(205, 112, 'Glipizide', 15)}`),

    glyb: S('Older adult: skip this sulfonylurea', `
      ${tile(14, 28, 272, 138, 'bad')}
      ${cls('a-sway', at(72, 96, elder(), 1.6))}
      ${cls('a-pop', at(205, 64, pill(-25, 'f-bad'), 1.7))}
      ${cls('a-blink', at(205, 64, nope(26)))}
      ${qtag(205, 112, 'Glyburide', 15)}
      ${T(205, 138, 'more lows, lasts longer', { s: 10, c: 'ans ink' })}`),

    older: S('Older adult: gentle choice', `
      ${tile(14, 28, 272, 138, 'good')}
      ${cls('a-sway', at(66, 98, elder(), 1.6))}
      ${gluGauge(205, 92, 44, -40, 10, 3)}
      ${qtag(205, 116, 'DPP-4 inhibitor', 11)}
      ${T(205, 140, 'few lows; A1c goal looser', { s: 9.5, c: 'ans ink' })}`),

    wtloss: S('Weight loss is the goal', `
      ${tile(14, 28, 272, 138, 'good')}
      ${cls('a-squeeze', at(70, 84, belly(), 1.5))}
      ${at(170, 66, scaleIc(), 1.2)}
      ${cls('a-sway', at(244, 66, pen('f-immune', -25), .85))}
      ${qtag(200, 110, 'GLP-1 agonist', 11.5)}
      ${qtag(200, 138, 'Tirzepatide', 11.5)}`),

    wtgain: S('These three add pounds', `
      ${tile(14, 28, 84, 138, 'pancreas')}${tile(108, 28, 84, 138, 'spleen')}${tile(202, 28, 84, 138, 'immune')}
      ${cls('a-pulse', at(56, 78, panc('f-pancreas'), .55))}
      ${qtag(56, 134, 'Sulfonylureas', 8.5)}
      ${cls('a-bob', at(150, 78, pill(-25, 'f-spleen'), 1.6))}
      ${qtag(150, 134, 'Pioglitazone', 8.5)}
      ${cls('a-sway', at(244, 78, syringe(-35), 1.3))}
      ${qtag(244, 134, 'Insulin', 11)}`),

    lowrisk: S('Most likely to drop blood sugar', `
      ${tile(14, 28, 272, 138, 'bad')}
      ${gluGauge(74, 110, 52, 30, -75, 2.6)}
      ${cls('a-shake', at(74, 136, hand(), .55))}
      ${qtag(205, 66, 'Insulin', 14)}
      ${qtag(205, 100, 'Sulfonylureas', 12)}
      ${T(205, 124, 'especially glyburide', { s: 10, c: 'ans ink' })}`),

    budget: S('Tight budget', `
      ${tile(14, 28, 272, 138, 'good')}
      ${cls('a-bob', at(68, 70, money(), 1.4))}
      ${cls('a-bob', at(68, 112, money(), 1), '--d:.3s')}
      ${qtag(195, 66, '1st: Metformin', 12.5)}
      ${qtag(195, 104, '2nd: Glipizide', 12.5)}
      ${T(195, 142, 'never skip doses, speak up', { s: 10, c: 'ans ink' })}`),

    metbox: S('Metformin: the boxed warning', `
      ${tile(14, 28, 272, 138, 'bad')}
      ${cls('a-blink', at(64, 80, bbox(), 1.8))}
      ${at(64, 134, pill(-20, 'f-good'), .9)}
      ${qtag(190, 74, 'Lactic acidosis', 14)}
      ${cls('a-pulse', at(150, 122, kidney(), .7))}
      ${T(214, 128, 'eGFR under 30: no', { s: 11, c: 'ans ink' })}`),

    metgi: S('Metformin: most common complaint', `
      ${tile(14, 28, 272, 138, 'warn')}
      ${cls('a-squeeze', at(80, 92, stomach(), 1.25))}
      ${at(205, 66, toilet(), 1.25)}
      ${qtag(205, 112, 'Diarrhea', 15)}
      ${T(205, 140, 'less with extended-release', { s: 9.5, c: 'ans ink' })}`),

    b12: S('Years on metformin: this runs low', `
      ${tile(14, 28, 272, 138, 'vein')}
      ${at(72, 88, vial(.18, 'f-bad'), 2)}
      ${cls('a-blink', T(72, 148, 'level dropping', { s: 10 }))}
      ${cls('a-pulse', at(200, 66, rbc(), 1.5))}
      ${qtag(200, 118, 'Vitamin B12', 15)}`),

    sgltmoa: S('Where this drug works', `
      ${tile(14, 28, 272, 138, 'water')}
      ${at(76, 78, kidney(), 1.7)}
      ${sugarRain(76, 112, 158, 4, 2)}
      ${at(190, 122, toilet(), 1.1)}
      ${fade(cube('f-pancreas'), 'M112 92 L176 112', 2, 0)}${fade(cube('f-pancreas'), 'M112 92 L176 112', 2, 1)}
      ${qtag(200, 62, 'Sugar leaves in urine', 10.5)}`),

    sgltinf: S('Sweet urine feeds these', `
      ${tile(14, 28, 272, 138, 'germ')}
      ${at(70, 90, bladder(), 2)}
      ${cls('a-sway', at(50, 72, germ(25), 1))}${cls('a-bob', at(92, 108, yeast(), 1))}
      ${qtag(200, 72, 'Yeast infections', 12)}
      ${qtag(200, 110, 'UTIs', 15)}`),

    eudka: S('DKA with normal sugar', `
      ${tile(14, 28, 272, 138, 'bad')}
      ${gluGauge(80, 112, 54, -10, 0, 2)}
      ${T(80, 134, 'sugar looks fine', { s: 10 })}
      ${cls('a-blink', at(205, 60, warn(), 1.6))}
      ${qtag(205, 104, 'Euglycemic DKA', 12)}
      ${T(205, 130, 'from SGLT2 inhibitors', { s: 10, c: 'ans ink' })}`),

    cana: S('One SGLT2 inhibitor: limb warning', `
      ${tile(14, 28, 272, 138, 'bad')}
      ${cls('a-shake', at(72, 92, foot(), 1.8))}
      ${cls('a-blink', at(126, 62, warn(), 1))}
      ${qtag(205, 92, 'Canagliflozin', 14)}`),

    glpmoa: S('Three things this class does', `
      ${tile(14, 28, 272, 138, 'immune')}
      ${cls('a-squeeze', at(60, 92, stomach(), 1))}
      ${T(60, 152, 'slow stomach', { s: 10 })}
      ${at(150, 74, panc('f-pancreas'), .7)}
      ${[0, 1, 2].map(i => fade(key('f-good'), 'M150 92 L150 128', 1.8, i * .6)).join('')}
      ${qtag(150, 150, 'More insulin', 10)}
      ${cls('a-rise', at(240, 110, `<path class="s-bad" d="M0 -22 V14 M-9 6 L0 16 L9 6" stroke-width="3.4"/>`))}
      ${qtag(240, 150, 'Less glucagon', 9.5)}`),

    glpthy: S('Ask this before a GLP-1 agonist', `
      ${tile(14, 28, 272, 138, 'mouth')}
      ${cls('a-pulse', at(74, 74, thyroid(), 2.2))}
      ${at(74, 134, tree(), 1)}
      ${qtag(200, 72, 'Medullary thyroid CA', 10.5)}
      ${qtag(200, 110, 'MEN2', 15)}
      ${T(200, 138, 'patient or family', { s: 10, c: 'ans ink' })}`),

    glpae: grid4('GLP-1 agonists: side effects', [
      ['warn', `${cls('a-sway', at(0, 0, stomach(), .55))}`, 'Nausea', 11, 'Most common'],
      ['good', `${cls('a-squeeze', at(0, 0, stomach(), .55))}`, 'Vomiting', 11, 'Most common'],
      ['pancreas', `${cls('a-blink', at(0, 0, panc('f-pancreas'), .42))}`, 'Pancreatitis', 10, 'Watch for'],
      ['gall', `${cls('a-pulse', at(0, 0, gallb(), 1))}`, 'Gallbladder', 10, 'Watch for'],
    ]),

    names: grid4('Name ending = drug class', [
      ['water', `${at(0, 0, kidney(), .8)}`, 'SGLT2', 12, '-gliflozin'],
      ['good', `${cls('a-bob', at(0, 0, pill(-25, 'f-good'), 1))}`, 'DPP-4', 12, '-gliptin'],
      ['immune', `${cls('a-sway', at(0, 0, pen('f-immune', -25), .7))}`, 'GLP-1', 12, '-tide'],
      ['spleen', `${cls('a-pulse', at(0, 0, pill(-25, 'f-spleen'), 1))}`, 'TZD', 12, '-glitazone'],
    ]),

    labs: grid4('Diabetes if any one is at least', [
      ['blood', `${cls('a-pulse', at(0, 0, rbc(), 1.1))}`, '6.5%', 13, 'A1c'],
      ['vein', `${cls('a-bob', at(0, 0, moon(), 1.1))}`, '126', 13, 'Fasting'],
      ['warn', `${cls('a-sway', at(0, 0, glass(), .9))}`, '200', 13, '2-hour test'],
      ['good', `${cls('a-blink', at(0, 0, meter(), .9))}`, '200 + symptoms', 9, 'Random'],
    ]),

    fast: S('Which insulin wins the race?', `
      ${insPlot([C(.15, 1, 4, 96, 'bad'), fillC(curve(34, 142, 244, 24, .15, 1, 4, 96), 'bad')])}
      ${cls('a-bob', at(120, 54, clock(), 1))}
      ${qtag(190, 66, 'Lispro, aspart, glulisine', 10)}
      ${T(190, 92, 'start in 5 to 15 min', { s: 11, c: 'ans ink' })}`),

    nopeak: S('Steady, with no hill', `
      ${insPlot([drawC(curve(34, 142, 244, 24, 1, 4, 24, 42, 21), 'spleen')])}
      ${cls('a-pop', at(70, 60, sun(), 1))}${cls('a-pop', at(240, 60, moon(), 1), '--d:.3s')}
      ${qtag(155, 58, 'Glargine, detemir', 12)}`),

    nphk: S('The 6 to 10 hour hill', `
      ${insPlot([C(2, 8, 16, 78, 'good'), fillC(curve(34, 142, 244, 24, 2, 8, 16, 78), 'good')])}
      ${cls('a-bob', at(115, 44, `<path class="s-ink" d="M0 -6 V8 M-5 3 L0 9 L5 3" stroke-width="2.4"/>`))}
      ${qtag(214, 60, 'NPH', 16)}`),

    insae: S('Insulin: number one problem', `
      ${tile(14, 28, 272, 138, 'vein')}
      ${gluGauge(78, 112, 54, 0, -75, 2.4)}
      ${cls('a-sway', at(205, 58, syringe(-35), 1.2))}
      ${qtag(205, 100, 'Low blood sugar', 12)}
      ${T(205, 124, 'also weight gain, low K', { s: 10, c: 'ans ink' })}
      ${T(205, 142, 'rotate injection sites', { s: 10, c: 'ans ink' })}`),

    rescue: S('Shaky and sweaty: how many grams?', `
      ${tile(14, 28, 272, 138, 'good')}
      ${cls('a-shake', at(60, 96, person('f-water'), 1.5))}
      ${fade(drop('f-water', .6), 'M36 70 L30 100', 1.3, 0)}${fade(drop('f-water', .6), 'M84 70 L90 100', 1.3, .6)}
      ${qtag(195, 62, '15 grams', 17)}
      ${cls('a-bob', at(160, 112, glass(), 1))}
      ${cls('a-bob', at(205, 112, tab('f-white'), 1.2), '--d:.2s')}
      ${cls('a-bob', at(248, 112, `<circle class="f-bad" r="10"/>`), '--d:.4s')}
      ${T(205, 152, 'juice, tablets, candy', { s: 10, c: 'ans ink' })}`),
  });
})();
