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

  /* ---------- whole-body engine: a body with organs on the left, a four-step story on the right ---------- */
  const cube = (c = 'f-pancreas', s = 1) => `<g transform="scale(${s})"><rect class="${c}" x="-5" y="-5" width="10" height="10" rx="2"/></g>`;
  const SUG = cube('f-pancreas', .62), DROP = drop('f-water', .55), KEY = `<g transform="scale(.6)">${key('f-good')}</g>`, PILL = `<g transform="scale(.55)">${pill(-25, 'f-good')}</g>`, GERM = `<g transform="scale(.6)">${germ(20)}</g>`;
  const dot = (c, r = 3) => `<circle class="${c}" r="${r}"/>`;
  const flow = (path, n, dur, inner = SUG) => [...Array(n)].map((_, i) => fade(inner, path, dur, i * dur / n)).join('');
  const K = (x, y, t, s = 9) => T(x, y, t, { s });
  const POS = { brain: [56, 30, 11], thyroid: [56, 46, 8], heart: [60, 63, 11], liver: [44, 78, 13], stomach: [66, 84, 10], panc: [56, 96, 13], kidneyL: [44, 107, 9], kidneyR: [70, 107, 9], gut: [56, 123, 15], bladder: [56, 140, 7], fat: [76, 118, 8], thigh: [45, 158, 9], foot: [43, 176, 8] };
  const BLOOD = 'M60 68 C58 86 57 110 56 128 L47 168';
  const body = (hi = []) => {
    const lit = k => hi.includes(k) || (k === 'kidney' && (hi.includes('kidneyL') || hi.includes('kidneyR')));
    const o = (k, inner) => `<g opacity="${lit(k) ? 1 : .62}">${inner}</g>`;
    return `<path d="M39 56 L25 98 L21 124 M73 56 L87 98 L91 124" stroke="var(--c-skin)" stroke-width="9" stroke-linecap="round" fill="none"/>` +
      `<path d="M46 142 L44 174 M66 142 L68 174" stroke="var(--c-skin)" stroke-width="13" stroke-linecap="round" fill="none"/>` +
      `<path d="M38 174 H50 M62 174 H74" stroke="var(--c-skin)" stroke-width="7" stroke-linecap="round"/>` +
      `<rect x="50" y="38" width="12" height="14" fill="var(--c-skin)"/>` +
      `<path class="f-skin" d="M36 54 Q56 46 76 54 L79 128 Q79 146 66 147 H46 Q33 146 33 128 Z"/><circle class="f-skin" cx="56" cy="30" r="12.5"/>` +
      `<ellipse cx="45" cy="64" rx="8" ry="11" fill="var(--c-mucus)" opacity=".55"/><ellipse cx="68" cy="64" rx="8" ry="11" fill="var(--c-mucus)" opacity=".55"/>` +
      `<ellipse cx="45" cy="158" rx="5.5" ry="11" fill="var(--c-muscle)" opacity=".6"/><ellipse cx="67" cy="158" rx="5.5" ry="11" fill="var(--c-muscle)" opacity=".6"/>` +
      `<ellipse cx="74" cy="120" rx="4" ry="9" class="f-fat noline" opacity=".95"/><ellipse cx="38" cy="120" rx="4" ry="9" class="f-fat noline" opacity=".95"/>` +
      `<path d="${BLOOD}" stroke="var(--c-blood)" stroke-width="2.4" fill="none" opacity=".75"/><path d="M60 58 L56 40" stroke="var(--c-blood)" stroke-width="1.8" fill="none" opacity=".75"/><path d="M57 106 H68 M57 106 H46" stroke="var(--c-blood)" stroke-width="1.6" fill="none" opacity=".75"/>` +
      o('brain', at(56, 30, brain(), .38)) + o('thyroid', at(56, 46, thyroid(), .42)) + o('liver', at(31, 70, liver(), .24)) + o('stomach', at(66, 84, stomach(), .3)) + o('panc', at(57, 97, panc('f-pancreas'), .23)) +
      o('kidney', at(45, 107, kidney(), .34) + at(69, 107, kidney(), .34)) +
      o('gut', `<path d="M42 118 H70 Q74 123 70 126 H44 Q40 130 44 133 H68" stroke="var(--c-small)" stroke-width="3.6" fill="none" stroke-linecap="round"/>`) +
      o('bladder', at(56, 141, bladder(), .42)) + o('heart', `<g class="a-beat">${at(60, 62, heart(), .5)}</g>`) +
      hi.map(k => { const [x, y, r] = POS[k]; return `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r + 2}" fill="var(--c-warn)" fill-opacity=".18" stroke="var(--c-warn)" stroke-width="1.8"/>`; }).join('') +
      flow(BLOOD, 3, 3, dot('f-blood', 2));
  };
  // a colored beam from a highlighted organ into the zoom panel
  const beam = k => { const [x, y] = POS[k]; return `<path class="a-flow" d="M${x + 6} ${y} C96 ${y} 104 92 120 92" stroke="var(--c-warn)" stroke-width="2" fill="none"/>`; };
  // the story engine: each step lights up in turn with its picture and caption
  const stepsG = (list, sec) => { const T0 = list.length * sec, n = list.length;
    return list.map(([cap, pic, spot], i) => { const s = i / n, e = (i + 1) / n, d = .012;
      const kt = i === 0 ? `0;${d};${(e - d).toFixed(3)};${e.toFixed(3)};1` : i === n - 1 ? `0;${s.toFixed(3)};${(s + d).toFixed(3)};${(1 - d).toFixed(3)};1` : `0;${s.toFixed(3)};${(s + d).toFixed(3)};${(e - d).toFixed(3)};${e.toFixed(3)};1`;
      const vals = i === 0 ? '0;1;1;0;0' : i === n - 1 ? '0;0;1;1;0' : '0;0;1;1;0;0';
      const lines = cap.split('|');
      return `<g class="ansmotion" opacity="0"><animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${T0}s" repeatCount="indefinite"/>${spot || ''}${pic}` +
        `<circle class="f-warn" cx="124" cy="162" r="6.5"/><text class="tagtx" x="124" y="165" text-anchor="middle" style="font-size:9px">${i + 1}</text>` +
        lines.map((l, j) => T(214, (lines.length === 1 ? 165 : 159 + j * 12), l, { s: 9.6 })).join('') + `</g>`; }).join('') +
      `<g class="ansmotion"><rect x="120" y="175" width="172" height="3" rx="1.5" fill="var(--c-warn)"><animate attributeName="width" values="0;172" dur="${T0}s" repeatCount="indefinite"/></rect></g>`; };
  const scene = ({ t, a, hi = [], c = 'water', flows = '', steps, sec = 4 }) => { const sz = Math.max(9, Math.min(12, 165 / (a.length * .56)));
    return ART(tag(150, 9, t, '', 9.5) + body(hi) + flows + `<rect x="118" y="24" width="176" height="124" rx="10" fill="var(--c-${c})" opacity=".2"/><rect x="118" y="24" width="176" height="124" rx="10" fill="none" stroke="var(--c-${c})" stroke-width="1.6"/>` + stepsG(steps, sec) + qtag(206, 35, a, sz)); };

  /* ---------- zoom-panel pictures (drawn in x 120..292, y 46..146) ---------- */
  const big = (ic, x = 206, y = 92, s = 1) => at(x, y, ic, s);
  const pipe = (d, c = 'blood', w = 10) => thick(d, c, w);
  const liverOut = (n, tx) => at(124, 62, liver(), .42) + pipe('M176 84 H288') + flow('M178 84 L286 84', n, 2.2, cube('f-pancreas', .8)) + K(232, 74, tx) ;
  const cellDoor = (n, tx, open = true) => `<circle class="f-skin" cx="248" cy="96" r="36"/>` + K(252, 100, 'cell') + `<rect x="208" y="84" width="8" height="24" rx="3" fill="${open ? 'var(--c-good)' : 'var(--c-bad)'}" stroke="var(--art-line)"/>` + pipe('M124 96 H204', 'blood', 12) + flow(open ? 'M126 96 L250 96' : 'M126 96 L204 96', n, 2, cube('f-pancreas', .8)) + K(164, 78, tx);
  const betaCell = (n, tx) => `<circle class="f-pancreas a-pulse" cx="162" cy="96" r="32"/>` + K(162, 100, 'beta cell') + flow('M190 96 L288 96', n, 2, key('f-good')) + K(240, 74, tx);
  const gauge = (a1, a2, tx, dur = 3.5) => gluGauge(206, 128, 62, a1, a2, dur) + K(206, 142, tx);
  const fatGrow = (tx) => `<g transform="translate(240 96)"><circle class="f-fat a-grow" r="30"/></g>` + flow('M124 96 L222 96', 4, 2) + K(170, 76, tx);
  const tubule = (blocked, tx) => pipe('M124 60 H288', 'blood', 8) + K(206, 54, 'blood') + pipe('M124 118 H262 Q280 118 280 136', 'mucus', 14) + K(165, 138, 'kidney tubule') + `<rect x="194" y="68" width="24" height="42" rx="5" fill="#fff" stroke="var(--art-line)" stroke-width="1.5"/>` +
    (blocked ? at(206, 88, nope(17)) + flow('M128 118 L262 118 Q280 118 280 136', 5, 2.6) : flow('M128 118 L200 118 L206 92 L212 62', 4, 2.6)) + K(240, 96, tx);
  const barChart = bars => `<path class="s-ink" d="M136 134 H280" stroke-width="1.6"/>` + bars.map(([x, h, c, l]) => riseBar(x, 134, 26, h, c, 3.6) + K(x + 13, 145, l, 9)).join('');
  const riseBar = (x, base, w, h, c, dur = 2.4) => `<g class="ansmotion"><rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="3" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.3"><animate attributeName="height" values="0;${h};${h}" keyTimes="0;.5;1" dur="${dur}s" repeatCount="indefinite"/><animate attributeName="y" values="${base};${base - h};${base - h}" keyTimes="0;.5;1" dur="${dur}s" repeatCount="indefinite"/></rect></g>`;
  const iPlot = (lines, lab = '') => { const x0 = 130, y0 = 134, w = 156; const P = (o, p, e, top, p2) => curve(x0, y0, w, 24, o, p, e, top, p2 ?? p);
    return `<path class="s-ink" d="M${x0} 52 V${y0} H${x0 + w}" stroke-width="1.5"/>` + [0, 6, 12, 18, 24].map(h => K(x0 + w * h / 24, y0 + 10, h + 'h', 9)).join('') + lines.map(([o, p, e, top, c, p2]) => c ? `<path d="${P(o, p, e, top, p2)}" pathLength="400" class="a-draw" stroke="var(--c-${c})" stroke-width="3.4" fill="none" style="animation-duration:3.6s"/>` : `<path d="${P(o, p, e, top, p2)}" fill="none" stroke="var(--pic-ink)" stroke-width="1.3" opacity=".3"/>`).join('') + lab; };
  const wave = (d, c = 'good') => `<path d="${d}" pathLength="400" class="a-draw" stroke="var(--c-${c})" stroke-width="3.4" fill="none" style="animation-duration:3.6s"/>`;
  const penAt = (x = 104, y = 118) => cls('a-bob', at(x, y, pen('f-immune', -150), .55));
  const ketone = (x1, y1, x2, y2, n = 3) => [...Array(n)].map((_, i) => bubble('f-warn', 'K', `M${x1} ${y1} L${x2} ${y2}`, 2.4, i * .8, 8)).join('');

  const gaugeSmall = (x, y, a) => dial(x, y, 34, [['bad', -90, -50], ['good', -50, 20], ['warn', 20, 90]]) + `<g transform="translate(${x} ${y}) rotate(${a})"><path class="s-line" d="M0 0 V-24" stroke-width="2.6"/></g>`;
  Object.assign(PICS, {
    first: scene({ t: 'New type 2: what do you start?', a: 'Metformin', hi: ['liver'], flows: beam('liver') + flow('M56 118 C48 108 44 96 45 84', 2, 2.4, PILL) + flow('M50 76 L58 66', 3, 1.8), steps: [
      ['In type 2, the liver makes|too much sugar', liverOut(7, 'lots of sugar out')],
      ['A pill is absorbed in the gut|and travels to the liver', at(160, 104, `<path d="M-30 0 H30" stroke="var(--c-small)" stroke-width="16" stroke-linecap="round"/>`) + flow('M132 104 L190 104 L238 74', 3, 2.4, pill(-25, 'f-good')) + at(222, 54, liver(), .42)],
      ['Metformin turns down the|liver\'s sugar output', liverOut(2, 'much less sugar') + cls('a-pop', at(148, 118, pill(-25, 'f-good'), 1))],
      ['A1c falls. It\'s safe, it works,|and it costs little', barChart([[150, 78, 'bad', 'before'], [222, 42, 'good', 'after']])],
    ] }),
    type1: scene({ t: 'Type 1: what is the treatment?', a: 'Insulin for life', hi: ['panc'], c: 'pancreas', flows: beam('panc') + flow('M100 120 L74 120', 2, 2, KEY), steps: [
      ['The immune system attacks|the insulin-making beta cells', [[170, 92], [204, 72], [240, 96], [206, 118]].map(([x, y], i) => `<circle class="f-pancreas a-blink" style="animation-delay:${i * .3}s" cx="${x}" cy="${y}" r="16"/>`).join('') + flow('M122 60 L170 88', 2, 1.6, dot('f-germ', 7)) + flow('M290 60 L242 92', 2, 1.6, dot('f-germ', 7)) + flow('M290 140 L210 118', 2, 1.6, dot('f-germ', 7))],
      ['No insulin means no key:|sugar stays in the blood', cellDoor(6, 'sugar piles up', false)],
      ['Thirst, peeing a lot, hunger,|weight loss, fatigue', at(156, 92, glass(), 1.4) + at(206, 94, toilet(), 1.2) + cls('a-squeeze', at(258, 92, scaleIc(), 1.2))],
      ['Daily shots replace it: long-acting|plus rapid-acting at meals', cls('a-bob', at(160, 86, pen('f-immune', -25), 1.2)) + `<circle class="f-skin" cx="248" cy="96" r="36"/>` + K(252, 100, 'cell') + `<rect x="208" y="84" width="8" height="24" rx="3" fill="var(--c-good)" stroke="var(--art-line)"/>` + flow('M176 96 L208 96', 3, 1.8, key('f-good'))],
    ] }),
    hfbest: scene({ t: 'Heart failure: which class helps?', a: 'SGLT2 inhibitor', hi: ['heart', 'kidneyR'], c: 'good', flows: beam('kidneyR') + flow('M60 72 L68 100', 3, 1.8, DROP) + flow('M68 116 L58 136', 3, 1.8), steps: [
      ['A weak heart gets|overloaded with fluid', cls('a-pulse', at(206, 88, heart(), 1.7)) + flow('M130 60 L180 80', 2, 1.8, drop('f-water', .9)) + flow('M284 60 L234 80', 2, 1.8, drop('f-water', .9)) + flow('M130 130 L180 104', 2, 1.8, drop('f-water', .9))],
      ['The drug blocks sugar and|salt return in the kidney', tubule(true, 'gate shut')],
      ['Sugar, salt, and water|leave in the urine', at(170, 88, kidney(), 1.25) + flow('M170 116 L232 128', 4, 2) + flow('M196 90 L250 110', 3, 2, drop('f-water', .9)) + at(262, 112, toilet(), 1.2)],
      ['Dapagliflozin: fewer heart|failure hospital stays', cls('a-beat', at(168, 92, heart(), 1.4)) + barChart([[216, 76, 'bad', 'no'], [254, 48, 'good', 'on']])],
    ] }),
    hfavoid: scene({ t: 'Heart failure: which drug backfires?', a: 'Pioglitazone', hi: ['kidneyL', 'heart', 'foot'], c: 'bad', flows: beam('kidneyL') + flow('M46 100 L58 72', 3, 1.8, DROP) + flow('M56 110 L46 170', 3, 2, DROP), steps: [
      ['The kidney holds on to|more salt and water', at(160, 90, kidney(), 1.4) + flow('M190 90 L286 90', 4, 2, drop('f-water', 1)) + K(238, 74, 'back into the blood')],
      ['Extra fluid fills the|blood vessels', pipe('M124 96 H288', 'blood', 30) + flow('M126 96 L286 96', 7, 2, drop('f-water', 1.1)) + K(206, 66, 'more volume')],
      ['Fluid pools: swollen legs|and fluid in the lungs', cls('a-pulse', at(168, 86, foot(), 2)) + `<ellipse class="f-mucus a-pulse" cx="248" cy="88" rx="26" ry="36"/>` + flow('M248 58 L248 112', 3, 1.8, drop('f-water', .9))],
      ['A weak heart can\'t cope. Boxed|warning: no NYHA class 3 or 4', cls('a-shake', at(164, 92, heart(), 1.6)) + cls('a-blink', at(244, 88, bbox(), 1.7))],
    ] }),
    cvd: scene({ t: 'Heart disease: which class protects?', a: 'GLP-1 agonist', hi: ['heart'], c: 'immune', flows: penAt() + beam('heart') + flow('M92 120 L62 70', 3, 2.2, dot('f-immune', 3)), steps: [
      ['Diabetes speeds up plaque|inside heart arteries', pipe('M124 96 H288', 'blood', 40) + `<path class="f-fat" d="M170 76 Q206 104 244 76 Z"/>` + `<path class="f-fat" d="M186 116 Q214 96 240 116 Z"/>` + flow('M126 96 L286 96', 6, 2.2, dot('f-white', 4))],
      ['A weekly or daily GLP-1|medicine goes under the skin', cls('a-sway', at(206, 88, pen('f-immune', -25), 1.6))],
      ['Semaglutide, dulaglutide, and|liraglutide reduce heart events', cls('a-beat', at(206, 94, heart(), 1.6)) + `<circle class="a-pulse" cx="206" cy="94" r="44" fill="var(--c-immune)" fill-opacity=".18" stroke="var(--c-immune)" stroke-width="3"/>`],
      ['Fewer heart attacks, strokes,|and heart deaths', barChart([[150, 76, 'bad', 'no'], [226, 54, 'good', 'on']])],
    ] }),
    ckd: scene({ t: 'Kidney disease: two good picks', a: 'SGLT2; linagliptin', hi: ['kidneyL', 'kidneyR'], c: 'good', flows: beam('kidneyR') + flow('M60 72 L68 100', 3, 1.8, dot('f-blood', 3)), steps: [
      ['High sugar overworks the|kidney\'s tiny filters', at(206, 92, kidney(), 1.7) + flow('M124 92 L180 92', 5, 1.2) + cls('a-blink', at(262, 66, warn(), 1))],
      ['SGLT2 inhibitors ease that|strain and protect the kidney', at(206, 92, kidney(), 1.7) + `<circle class="a-pulse" cx="206" cy="92" r="46" fill="var(--c-immune)" fill-opacity=".2" stroke="var(--c-immune)" stroke-width="3"/>`],
      ['Linagliptin leaves through the|gut, so no kidney dose change', at(134, 56, liver(), .34) + pipe('M160 82 C170 122 240 88 250 124', 'small', 9) + flow('M160 82 C170 122 240 88 250 124', 4, 2.4, tab('f-good')) + at(258, 76, kidney(), .8) + cls('a-pop', at(258, 76, nope(24)))],
      ['Check eGFR before starting|and along the way', gauge(-70, -10, 'kidney function')],
    ] }),
    glip: scene({ t: 'Sulfonylurea + kidney trouble', a: 'Glipizide', hi: ['liver', 'kidneyL'], c: 'pancreas', flows: beam('liver') + flow('M56 118 C48 108 44 96 45 84', 2, 2.2, PILL) + flow('M46 90 L46 100', 2, 1.4, dot('f-scar', 2.5)), steps: [
      ['The pill is absorbed and|reaches the liver', at(166, 60, liver(), .4) + flow('M124 118 L186 86', 3, 2, pill(-25, 'f-good'))],
      ['The liver breaks it into|mostly inactive pieces', at(144, 60, liver(), .42) + flow('M196 84 L284 84', 4, 2, dot('f-scar', 5)) + K(240, 72, 'inactive')],
      ['Weak kidneys clear them|with little buildup', at(206, 92, kidney(), 1.6) + flow('M124 92 L184 92', 3, 2, dot('f-scar', 5)) + flow('M206 118 L206 146', 3, 2, dot('f-scar', 5)) + cls('a-pop', at(262, 72, chk(11)))],
      ['So it\'s the preferred|sulfonylurea here', cls('a-bob', at(206, 88, pill(-25, 'f-good'), 2.6))],
    ] }),
    glyb: scene({ t: 'Older adult: skip this sulfonylurea', a: 'Glyburide', hi: ['panc', 'brain'], c: 'bad', flows: beam('panc') + flow('M56 96 L58 72', 3, 2, KEY), steps: [
      ['It makes beta cells release|insulin for a long time', betaCell(5, 'insulin keeps coming')],
      ['Aging kidneys clear it slower,|so its effect can build up', at(170, 92, kidney(), 1.4) + at(254, 96, vial(.7, 'f-bad'), 2)],
      ['Blood sugar keeps falling,|even overnight', gauge(5, -78, 'asleep') + cls('a-bob', at(262, 66, moon(), 1))],
      ['Confusion and falls are the|danger. It has the most lows', cls('a-sway', at(206, 94, elder(), 1.7)) + cls('a-blink', at(262, 72, warn(), 1))],
    ] }),
    older: scene({ t: 'Older adult: a gentle choice', a: 'DPP-4 inhibitor', hi: ['gut', 'panc'], c: 'good', flows: beam('gut') + flow('M56 118 L56 102', 3, 1.8, dot('f-good', 2.8)), steps: [
      ['Eating makes the gut release|GLP-1, a helpful hormone', pipe('M124 92 H288', 'small', 26) + flow('M130 92 L284 92', 3, 3, dot('f-food', 6)) + flow('M170 80 L170 50', 2, 1.6, dot('f-good', 5)) + flow('M240 80 L240 50', 2, 1.6, dot('f-good', 5))],
      ['DPP-4 enzymes quickly|break GLP-1 down', `<circle class="f-bad a-pulse" cx="170" cy="92" r="24"/>` + K(170, 96, 'DPP-4') + flow('M288 92 L198 92', 3, 2, dot('f-good', 6))],
      ['The drug blocks DPP-4,|so GLP-1 lasts longer', `<circle class="f-bad" cx="170" cy="92" r="24"/>` + K(170, 96, 'DPP-4') + at(170, 92, nope(26)) + flow('M208 92 L286 92', 5, 2.6, dot('f-good', 6))],
      ['Insulin rises only when sugar is|high: few lows, weight neutral', `<rect x="126" y="116" width="162" height="20" rx="4" fill="var(--c-bad)" opacity=".28"/>` + K(206, 130, 'danger zone') + wave('M130 88 C152 58 170 58 192 84 S232 106 250 82 S274 66 286 84')],
    ] }),
    wtloss: scene({ t: 'Weight loss is the goal', a: 'GLP-1 or tirzepatide', hi: ['brain', 'stomach', 'fat'], c: 'good', flows: penAt() + beam('stomach') + flow('M58 42 L64 76', 3, 2, dot('f-immune', 2.5)), steps: [
      ['The weekly shot reaches|the brain\'s appetite center', cls('a-pulse', at(206, 92, brain(), 1.8)) + flow('M124 136 L180 110', 3, 2, dot('f-immune', 5))],
      ['It slows the stomach,|so patients feel full longer', cls('a-squeeze', at(206, 94, stomach(), 1.3)) + flow('M170 56 L238 124', 2, 5, dot('f-food', 6))],
      ['They eat less, and fat|stores begin to shrink', `<g transform="translate(206 92)"><circle class="f-fat a-grow" r="36"/></g>` + flow('M206 92 L286 60', 3, 2)],
      ['Tirzepatide acts on two|hormones: GIP and GLP-1', cls('a-bob', at(206, 74, scaleIc(), 1.8)) + cls('a-drop', at(206, 124, `<path class="s-good" d="M0 -12 V8 M-8 1 L0 10 L8 1" stroke-width="3.6"/>`))],
    ] }),
    wtgain: scene({ t: 'Which diabetes drugs add pounds?', a: 'SU, pioglitazone, insulin', hi: ['fat', 'panc'], c: 'pancreas', flows: beam('fat') + flow('M58 100 L72 114', 3, 1.8, KEY), steps: [
      ['Sulfonylureas make the pancreas|release more insulin', betaCell(5, 'more insulin')],
      ['Insulin moves extra sugar into|fat cells to be stored', fatGrow('stored as fat')],
      ['Pioglitazone grows fat cells|and also holds on to fluid', `<g transform="translate(206 92)"><circle class="f-fat a-grow" r="34"/></g>` + flow('M124 70 L184 86', 3, 2, drop('f-water', 1)) + flow('M288 70 L228 86', 3, 2, drop('f-water', 1))],
      ['The scale goes up with|all three', cls('a-bob', at(206, 74, scaleIc(), 1.8)) + cls('a-rise', at(206, 124, `<path class="s-bad" d="M0 12 V-8 M-8 -1 L0 -10 L8 -1" stroke-width="3.6"/>`))],
    ] }),
    lowrisk: scene({ t: 'Which drugs drop blood sugar most?', a: 'Insulin, sulfonylureas', hi: ['panc', 'brain'], c: 'bad', flows: beam('panc') + flow('M60 62 L56 40', 3, 2, SUG), steps: [
      ['They push insulin up, no matter|how low sugar already is', betaCell(5, 'insulin up')],
      ['Too many keys pull too much|sugar out of the blood', cellDoor(7, 'sugar leaving')],
      ['The brain runs on sugar,|and now it runs short', cls('a-blink', at(206, 92, brain(), 1.8)) + flow('M124 136 L180 110', 1, 3)],
      ['Shaky, sweaty, confused.|Glyburide is the worst', gauge(0, -78, 'too low')],
    ] }),
    budget: scene({ t: 'Tight budget: lowest cost', a: 'Metformin, glipizide', hi: ['liver', 'panc'], c: 'good', flows: flow('M56 118 C48 108 44 96 45 84', 3, 2.2, PILL), steps: [
      ['Older generic pills cost little|and have long track records', barChart([[140, 22, 'good', 'Met'], [184, 28, 'good', 'SU'], [228, 80, 'bad', 'Newer']])],
      ['Metformin first: it treats|the liver\'s sugar output', liverOut(3, 'less sugar')],
      ['Then a sulfonylurea like|glipizide: more insulin', betaCell(4, 'more insulin')],
      ['Tell us if money is tight. Skipped|doses let sugar climb', gauge(0, 74, 'skipped doses')],
    ] }),
    metbox: scene({ t: 'Metformin: the boxed warning', a: 'Lactic acidosis', hi: ['kidneyL', 'kidneyR', 'liver'], c: 'bad', flows: beam('kidneyR') + flow('M46 80 L58 68', 3, 2, dot('f-warn', 2.5)), steps: [
      ['Healthy kidneys clear|metformin into the urine', at(206, 88, kidney(), 1.5) + flow('M124 88 L184 88', 3, 1.8, pill(-25, 'f-good')) + flow('M206 114 L206 146', 3, 1.8, pill(-25, 'f-good'))],
      ['With eGFR under 30, the drug|backs up in the blood', at(170, 90, kidney(), 1.4) + at(170, 90, nope(28)) + at(246, 96, vial(.75, 'f-good'), 2)],
      ['The liver can\'t recycle lactate|fast enough, so lactate rises', at(134, 62, liver(), .36) + at(246, 96, vial(.15, 'f-bad'), 2) + riseBar(233, 124, 26, 42, 'bad', 3.4) + flow('M180 84 L232 96', 3, 2, dot('f-warn', 5))],
      ['Rare but deadly: fast breathing,|belly pain, feeling very ill', cls('a-blink', at(168, 92, bbox(), 1.8)) + `<ellipse class="f-mucus a-pulse" cx="248" cy="92" rx="26" ry="36"/>`],
    ] }),
    metgi: scene({ t: 'Metformin: most common complaint', a: 'Diarrhea', hi: ['stomach', 'gut'], c: 'warn', flows: beam('gut') + flow('M60 92 L58 116', 3, 1.8, PILL) + flow('M60 134 L56 150', 4, 1.2, DROP), steps: [
      ['Metformin collects heavily|in the gut wall', pipe('M124 92 H288', 'small', 30) + flow('M128 92 L284 92', 5, 2.6, pill(-25, 'f-good'))],
      ['Cramps, gas, bloating,|and nausea can follow', cls('a-squeeze', at(206, 92, stomach(), 1.4)) + flow('M260 110 L260 60', 3, 1.8, dot('f-white', 5))],
      ['Diarrhea is the top complaint,|often early on', pipe('M124 76 C180 120 220 70 250 104', 'small', 14) + flow('M124 76 C180 120 220 70 250 104', 6, 1.2, drop('f-water', 1)) + at(264, 114, toilet(), 1.1)],
      ['Extended-release causes much|less of it', barChart([[150, 76, 'bad', 'regular'], [226, 18, 'good', 'XR']])],
    ] }),
    b12: scene({ t: 'Years on metformin: what runs low?', a: 'Vitamin B12', hi: ['stomach', 'gut', 'foot'], c: 'immune', flows: beam('gut') + flow('M66 92 L58 118', 3, 2, dot('f-immune', 2.8)), steps: [
      ['The stomach makes intrinsic|factor, which carries B12', at(206, 92, stomach(), 1.3) + flow('M124 60 L184 84', 3, 2, dot('f-immune', 6)) + flow('M226 110 L286 136', 3, 2, dot('f-good', 5))],
      ['The end of the small intestine|absorbs B12 into the blood', pipe('M124 120 H288', 'small', 24) + pipe('M124 66 H288', 'blood', 10) + flow('M150 110 L150 72', 2, 1.8, dot('f-immune', 5)) + flow('M206 110 L206 72', 2, 1.8, dot('f-immune', 5)) + flow('M262 110 L262 72', 2, 1.8, dot('f-immune', 5))],
      ['Metformin interferes, so less|gets through over the years', pipe('M124 120 H288', 'small', 24) + pipe('M124 66 H288', 'blood', 10) + flow('M128 120 L286 120', 5, 3, dot('f-immune', 5)) + at(170, 94, pill(-25, 'f-good'), .9) + at(240, 94, pill(-25, 'f-good'), .9)],
      ['Low B12 can cause anemia|and numb hands and feet', cls('a-blink', at(166, 92, hand(), 1.6)) + cls('a-blink', at(246, 90, foot(), 1.7), 'animation-delay:.6s')],
    ] }),
    sgltmoa: scene({ t: 'How do SGLT2 inhibitors work?', a: 'Sugar leaves in urine', hi: ['kidneyL', 'kidneyR', 'bladder'], flows: beam('kidneyR') + flow('M69 116 L58 136', 4, 1.6), steps: [
      ['Kidneys filter sugar out of|the blood into a tubule', at(160, 92, kidney(), 1.4) + flow('M124 62 L150 88', 3, 1.6) + flow('M182 96 L286 96', 3, 1.8) + K(238, 86, 'into the tubule')],
      ['Normally, SGLT2 gates send|almost all of it back', tubule(false, 'SGLT2')],
      ['The drug shuts the gates,|so sugar keeps going', tubule(true, 'gate shut')],
      ['Sugar leaves in urine.|A1c, BP, and weight fall', at(180, 96, bladder(), 2.6) + flow('M180 56 L180 88', 4, 1.6) + barChart([[234, 62, 'good', 'A1c']])],
    ] }),
    sgltinf: scene({ t: 'Sweet urine feeds what?', a: 'Yeast, UTIs', hi: ['bladder', 'kidneyR'], c: 'germ', flows: beam('bladder') + flow('M69 116 L58 136', 3, 1.8), steps: [
      ['The drug leaves extra sugar|in the urine', at(206, 96, bladder(), 3) + flow('M206 46 L206 88', 4, 1.6)],
      ['Germs and yeast feed on|that sugar and multiply', at(206, 96, bladder(), 3) + cls('a-grow', at(186, 94, germ(20), 1.3)) + cls('a-grow', at(226, 106, yeast(), 1), 'animation-delay:.6s') + flow('M206 50 L206 84', 2, 1.6)],
      ['UTI: burning, urgency,|frequent trips', at(206, 96, bladder(), 3) + `<circle class="a-pulse" cx="206" cy="96" r="44" fill="var(--c-bad)" fill-opacity=".25" stroke="var(--c-bad)" stroke-width="3"/>` + at(270, 112, toilet(), .9)],
      ['Genital yeast infections are|the most common problem', cls('a-grow', at(160, 92, yeast(), 2)) + cls('a-grow', at(244, 96, yeast(), 2), 'animation-delay:.7s')],
    ] }),
    eudka: scene({ t: 'SGLT2 user in DKA, sugar is normal', a: 'Euglycemic DKA', hi: ['kidneyR', 'fat', 'liver'], c: 'bad', flows: beam('liver') + flow('M70 116 L46 86', 3, 2.2, dot('f-fat', 2.8)) + flow('M50 78 L58 68', 3, 1.8, dot('f-warn', 2.8)), steps: [
      ['Sugar leaks out in urine, so the|meter looks normal. Insulin falls', gauge(-14, 2, 'looks normal')],
      ['The body thinks it\'s starving,|so it starts burning fat', `<g transform="translate(166 92)"><circle class="f-fat a-pulse" r="34"/></g>` + flow('M200 92 L286 92', 5, 2, dot('f-fat', 6)) + K(240, 80, 'fatty acids')],
      ['The liver turns that fat|into acidic ketones', at(136, 62, liver(), .38) + ketone(186, 86, 284, 86, 3) + K(240, 74, 'ketones')],
      ['Sick patient + normal sugar:|still check ketones!', cls('a-blink', at(166, 92, warn(), 2.4)) + ketone(232, 136, 232, 56, 3)],
    ] }),
    cana: scene({ t: 'SGLT2 inhibitor: amputation warning', a: 'Canagliflozin', hi: ['foot', 'thigh'], c: 'bad', flows: beam('foot') + flow('M56 128 L46 170', 4, 2, dot('f-blood', 2.8)), steps: [
      ['Diabetes already harms leg|arteries and foot nerves', pipe('M124 92 H288', 'blood', 30) + `<path class="f-fat" d="M170 78 Q206 104 244 78 Z"/>` + flow('M126 92 L286 92', 5, 2.4, dot('f-white', 4))],
      ['Small sores can go|unnoticed and get infected', cls('a-pulse', at(196, 88, foot(), 2.6)) + cls('a-blink', '<circle cx="232" cy="118" r="7" fill="var(--c-bad)"/>') + flow('M284 70 L238 112', 2, 1.8, GERM)],
      ['Canagliflozin raised amputation|risk in early trials. Why is unclear', cls('a-blink', at(166, 88, warn(), 2)) + barChart([[212, 72, 'bad', 'on'], [248, 42, 'good', 'no']])],
      ['FDA dropped the boxed warning in|2020, but the risk is still listed', cls('a-bob', at(166, 88, foot(), 2)) + at(250, 88, chk(18))],
    ] }),
    glpmoa: scene({ t: 'How do GLP-1 agonists work?', a: 'More insulin, slower stomach', hi: ['panc', 'stomach', 'brain', 'liver'], c: 'immune', flows: penAt() + beam('panc') + flow('M92 120 L62 100', 3, 2, dot('f-immune', 2.8)), steps: [
      ['It copies a gut hormone and|tells the pancreas: more insulin', betaCell(5, 'when sugar is high')],
      ['Less glucagon, so the liver|makes less sugar', liverOut(2, 'less sugar')],
      ['The stomach empties slowly,|so sugar rises slowly', cls('a-squeeze', at(206, 94, stomach(), 1.3)) + flow('M170 56 L238 124', 2, 5, dot('f-food', 6))],
      ['The brain gets a "full" signal,|so they eat less, lose weight', cls('a-pulse', at(170, 92, brain(), 1.5)) + cls('a-bob', at(254, 88, scaleIc(), 1.3))],
    ] }),
    glpthy: scene({ t: 'Ask this before a GLP-1 agonist', a: 'Medullary thyroid, MEN2', hi: ['thyroid'], c: 'mouth', flows: beam('thyroid'), steps: [
      ['C cells in the thyroid have|GLP-1 receptors', at(206, 92, thyroid(), 3.6) + [[166, 84], [188, 104], [226, 104], [246, 84]].map(([x, y]) => `<circle class="f-immune a-pulse" cx="${x}" cy="${y}" r="5"/>`).join('')],
      ['These drugs caused C-cell tumors|in rodents. Human risk is unproven', at(206, 92, thyroid(), 3.6) + `<g transform="translate(240 92)"><circle class="f-tumor a-grow" r="13"/></g>`],
      ['So ask about the patient and|their family', at(206, 94, tree(), 2.6) + cls('a-blink', '<circle cx="235" cy="123" r="19" fill="none" stroke="var(--c-bad)" stroke-width="3"/>')],
      ['Either one in the history:|don\'t use this class', at(166, 92, pen('f-immune', -25), 1.3) + cls('a-pop', at(166, 92, nope(32))) + cls('a-blink', at(250, 90, bbox(), 1.6))],
    ] }),
    glpae: scene({ t: 'GLP-1 agonists: side effects', a: 'Nausea; pancreatitis', hi: ['stomach', 'panc'], c: 'warn', flows: beam('stomach') + flow('M64 76 L56 42', 3, 1.5, drop('f-bile', .5)), steps: [
      ['A slower stomach causes nausea,|the most common complaint', cls('a-sway', at(206, 92, stomach(), 1.4))],
      ['Vomiting can follow. Both ease|with time and slow dose increases', at(206, 112, stomach(), 1) + flow('M206 88 L206 50', 4, 1.3, drop('f-bile', 1))],
      ['Watch for pancreatitis: severe|belly pain that goes to the back', at(206, 92, panc('f-pancreas'), .9) + `<circle class="a-pulse" cx="206" cy="92" r="42" fill="var(--c-bad)" fill-opacity=".3" stroke="var(--c-bad)" stroke-width="3"/>`],
      ['Also gallbladder disease:|upper right belly pain', cls('a-pulse', at(206, 92, gallb(), 2.8))],
    ] }),
    names: scene({ t: 'Name endings that give away the class', a: 'Learn the endings', hi: ['kidneyR', 'gut', 'panc', 'fat'], c: 'immune', flows: flow('M69 116 L58 136', 3, 1.8), steps: [
      ['-gliflozin = SGLT2 inhibitor:|sugar out through the kidney', tubule(true, 'gate shut'), beam('kidneyR')],
      ['-gliptin = DPP-4 inhibitor:|protects the gut\'s GLP-1', `<circle class="f-bad" cx="170" cy="92" r="24"/>` + K(170, 96, 'DPP-4') + at(170, 92, nope(26)) + flow('M208 92 L286 92', 5, 2.6, dot('f-good', 6)), beam('gut')],
      ['-tide = GLP-1 agonist:|more insulin, slower stomach', betaCell(5, 'more insulin'), beam('panc')],
      ['-glitazone = TZD: fat and muscle|respond better to insulin', cellDoor(5, 'door opens wider'), beam('fat')],
    ] }),
    labs: scene({ t: 'Lab numbers that diagnose diabetes', a: '6.5, 126, 200', hi: ['heart', 'liver'], c: 'blood', flows: flow('M46 80 L58 68', 3, 1.8), steps: [
      ['A1c 6.5% or more: sugar stuck to|red cells over about 3 months', cls('a-pulse', at(206, 92, rbc(), 2.8)) + flow('M124 60 L184 84', 3, 1.8) + flow('M288 60 L228 84', 3, 1.8) + K(206, 140, '6.5%', 12)],
      ['Fasting glucose 126 or more:|nothing to eat for 8 hours', cls('a-bob', at(166, 88, moon(), 2.2)) + at(246, 92, plate(), 1.1) + at(246, 92, nope(28)) + K(206, 140, '126', 12)],
      ['2-hour glucose test 200 or more:|drink sugar, then test', cls('a-bob', at(160, 90, glass(), 1.8)) + cls('a-pulse', at(246, 90, clock(), 2)) + K(206, 140, '200', 12)],
      ['Random glucose 200 or more,|with symptoms', at(166, 90, meter(), 1.6) + cls('a-bob', at(246, 92, drop('f-blood', 2))) + K(206, 140, '200', 12)],
    ] }),
    fast: scene({ t: 'Which insulins start fastest?', a: 'Lispro, aspart, glulisine', hi: ['stomach', 'fat'], c: 'water', flows: penAt() + flow('M92 120 L62 72', 3, 1.8, KEY) + flow('M56 40 L65 78', 2, 2, dot('f-food', 3)), steps: [
      ['A meal sends sugar into the blood|within minutes', cls('a-bob', at(160, 88, plate(), 1.3)) + pipe('M196 88 H288') + flow('M198 88 L286 88', 5, 1.8, cube('f-pancreas', .8))],
      ['Rapid insulin starts in 5 to 15|minutes, right with the meal', iPlot([[.15, 1, 4, 74, 'bad'], [.6, 3, 8, 50], [2, 8, 16, 40]])],
      ['It peaks near the meal\'s sugar|rise, then fades in 3 to 5 hours', iPlot([[.15, 1, 4, 74, 'bad']]) + at(146, 44, plate(), .35)],
      ['Keys open the cells, and meal|sugar gets used', cellDoor(5, 'sugar moves in')],
    ] }),
    nopeak: scene({ t: 'Which insulins have no peak?', a: 'Glargine, detemir', hi: ['liver', 'fat'], c: 'spleen', flows: penAt() + beam('liver') + flow('M72 122 L62 72', 2, 3, KEY), steps: [
      ['Injected under the skin, it forms a|deposit that releases slowly', `<rect x="124" y="94" width="164" height="42" fill="var(--c-fat)" stroke="var(--art-line)"/>` + `<circle class="f-immune a-pulse" cx="206" cy="112" r="14"/>` + flow('M206 98 L206 54', 3, 3, key('f-good'))],
      ['The liver leaks sugar all day and|night, even without food', liverOut(3, 'background sugar') + mover(sun(), 'M130 134 Q206 110 286 134', 8)],
      ['So it gives a steady, flat|level instead of a hill', iPlot([[1, 4, 24, 36, 'spleen', 21], [.15, 1, 4, 74], [2, 8, 16, 50]])],
      ['That\'s basal insulin. It lasts about|a day, so usually once daily', mover(sun(), 'M130 70 Q206 40 286 70', 8) + iPlot([[1, 4, 24, 36, 'spleen', 21]])],
    ] }),
    nphk: scene({ t: 'Which insulin peaks at 6 to 10 hours?', a: 'NPH', hi: ['fat', 'liver'], c: 'good', flows: penAt() + flow('M92 120 L62 72', 2, 3, KEY), steps: [
      ['Intermediate-acting and cloudy,|so it\'s gently mixed before use', cls('a-sway', at(206, 92, vial(.8, 'f-white'), 2.6))],
      ['Slow start: it begins|working in 2 to 4 hours', iPlot([[2, 8, 16, 76, 'good']]) ],
      ['Its hill peaks at 6 to 10 hours,|the riskiest time for a low', iPlot([[2, 8, 16, 76, 'good']], `<rect x="${130 + 156 * 6 / 24}" y="52" width="${156 * 4 / 24}" height="82" fill="var(--c-warn)" opacity=".28"/>`)],
      ['Then it wears off by|10 to 16 hours', iPlot([[2, 8, 16, 76, 'good']]) + cls('a-pulse', at(262, 66, clock(), 1.2))],
    ] }),
    insae: scene({ t: 'Insulin: most common side effect', a: 'Low blood sugar', hi: ['fat', 'brain'], c: 'vein', flows: penAt() + flow('M92 120 L62 72', 2, 2, KEY) + flow('M60 62 L56 40', 2, 2.4), steps: [
      ['Too much insulin pulls sugar|out of the blood too fast', cellDoor(7, 'sugar rushes in')],
      ['Blood sugar drops,|and the brain runs short', gauge(0, -78, 'low blood sugar')],
      ['Potassium also moves into cells,|and fat storage adds weight', [0, 1, 2].map(i => bubble('f-warn', 'K', 'M126 76 L228 96', 2.4, i * .8, 9)).join('') + `<circle class="f-skin" cx="252" cy="100" r="32"/>` + flow('M124 122 L230 112', 2, 2)],
      ['The same spot gets lumpy, so|rotate injection sites', `<path class="f-skin" d="M136 60 H276 V134 H136 Z"/>` + [[166, 80], [206, 80], [246, 80], [166, 114], [206, 114], [246, 114]].map(([x, y], i) => `<circle class="a-blink" style="animation-delay:${i * .5}s" cx="${x}" cy="${y}" r="9" fill="var(--c-immune)"/>`).join('')],
    ] }),
    rescue: scene({ t: 'Treating a low: how many grams?', a: '15 grams', hi: ['brain', 'stomach'], c: 'good', flows: flow('M56 42 L65 78', 3, 1.8, dot('f-immune', 2.6)) + flow('M60 62 L56 40', 3, 1.8), steps: [
      ['Under 70, shaky, sweaty, confused:|the brain is short on fuel', cls('a-shake', at(170, 96, person('f-water'), 1.5)) + gaugeSmall(250, 112, -70)],
      ['Awake and able to swallow: 15 g|of tablets, juice, or regular soda', cls('a-bob', at(160, 90, glass(), 1.6)) + cls('a-bob', at(206, 92, tab('f-white'), 1.5), 'animation-delay:.3s') + cls('a-bob', at(254, 92, '<circle class="f-bad" r="13"/>'), 'animation-delay:.6s')],
      ['Sugar reaches the blood. Recheck|in 15 minutes, repeat if still low', gauge(-76, 2, '15 minutes later')],
      ['Can\'t swallow or passed out:|no food. Glucagon and 911', cls('a-blink', at(166, 92, phone(), 1.5)) + cls('a-sway', at(244, 90, syringe(-35), 1.5))],
    ] }),
  });
})();
