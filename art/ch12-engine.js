/* Chapter 12 (musculoskeletal) art engine, shared by the four ch12 pages.
   Every card is a scene: a skeleton body on the left with the problem spot glowing and a beam
   into a zoom panel on the right, where a 3-4 step animated story plays.
   Needs ch9-pics.js (esc, tag, q, qtag, ART) and ch9-art.css. Exposes window.M12. */
(() => {
  const f = n => +(+n).toFixed(1);
  const at = (x, y, inner, s = 1, r = 0) => `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}${r ? ` rotate(${r})` : ''}">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 9.5}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const K = (x, y, t, s = 9) => T(x, y, t, { s });
  const cls = (c, inner, style = '') => `<g class="${c}"${style ? ` style="${style}"` : ''}>${inner}</g>`;
  const pop = (d, inner) => `<g class="a-pop" style="--d:${d}">${inner}</g>`;
  const thick = (d, color, w = 6, op = 1) => `<path d="${d}" stroke="var(--art-line)" stroke-width="${w + 2.6}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/><path d="${d}" stroke="var(--c-${color})" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`;
  const arrowP = (d, c = 'warn', w = 2.4) => `<path d="${d}" stroke="var(--c-${c})" stroke-width="${w}" fill="none" stroke-linecap="round" class="a-flow"/>`;
  const head = (x, y, a, c = 'var(--c-warn)') => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0 L-7 -4 L-7 4 Z" fill="${c}"/>`;

  /* ---------- motion ---------- */
  const mover = (inner, path, dur, begin = 0) => `<g class="ansmotion"><g>${inner}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/></g></g>`;
  const fade = (inner, path, dur, begin = 0) => `<g class="ansmotion"><g opacity="0">${inner}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></g></g>`;
  const flow = (path, n, dur, inner) => [...Array(n)].map((_, i) => fade(inner, path, dur, f(i * dur / n))).join('');
  // slide something back and forth (dx, dy) on the back side only; front shows it at rest
  const slide = (inner, dx, dy, dur = 2.4) => `<g>${inner.replace(/^/, '')}<animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};${dx} ${dy};0 0" keyTimes="0;.35;.75;1" dur="${dur}s" repeatCount="indefinite"/></g>`;
  const spin = (x, y, inner, dur = 3) => `<g transform="translate(${x} ${y})"><g>${inner}<animateTransform attributeName="transform" type="rotate" values="0;360" dur="${dur}s" repeatCount="indefinite"/></g></g>`;
  const grow = (x, y, inner, a = .4, b = 1.1, dur = 2.6) => `<g transform="translate(${x} ${y})"><g>${inner}<animateTransform attributeName="transform" type="scale" values="${a};${b};${b};${a}" keyTimes="0;.45;.8;1" dur="${dur}s" repeatCount="indefinite"/></g></g>`;
  const blinkG = (inner, dur = 1.2) => `<g>${inner}<animate attributeName="opacity" values="1;.2;1" dur="${dur}s" repeatCount="indefinite"/></g>`;

  /* ---------- small icons, drawn at their own origin ---------- */
  const dot = (c, r = 3) => `<circle class="${c}" r="${r}"/>`;
  const germ = (c = 'f-germ') => `<path class="s-germ" d="M6 0 q3 -3 6 0" stroke-width="1.3"/><rect class="${c}" x="-7" y="-3.5" width="13" height="7" rx="3.5"/>`;
  const wbc = () => `<circle class="f-immune" r="7"/><path d="M-3 -2 q2 -3 4 0 q2 3 -1 4" stroke="#fff" stroke-width="1.6" fill="none"/>`;
  const crystal = (r = 0) => `<g transform="rotate(${r})"><path d="M-6 0 L6 0" stroke="var(--c-acid)" stroke-width="2.4" stroke-linecap="round"/><path d="M-6 0 L6 0" stroke="var(--art-line)" stroke-width=".6"/></g>`;
  const pill = (rot = -30, c = 'f-good') => `<g transform="rotate(${rot})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const syringe = (rot = -35) => `<g transform="rotate(${rot})"><rect class="f-white" x="-11" y="-4" width="18" height="8" rx="1.5"/><rect class="f-water" x="-4" y="-3" width="10" height="6"/><path class="s-line" d="M7 0 H17 M-11 -6 V6 M-11 0 H-17 M-17 -4 V4" stroke-width="1.6"/></g>`;
  const ice = () => `<rect class="f-mucus" x="-12" y="-9" width="24" height="18" rx="5"/><rect class="f-white noline" x="-8" y="-5" width="6" height="6" rx="1.5" opacity=".8"/><rect class="f-white noline" x="1" y="-1" width="6" height="6" rx="1.5" opacity=".8"/>`;
  const heat = () => `<path class="s-bad" d="M-6 8 q-4 -6 0 -10 q4 -5 0 -10 M2 8 q-4 -6 0 -10 q4 -5 0 -10 M10 8 q-4 -6 0 -10 q4 -5 0 -10" stroke-width="2"/>`;
  const vial = (lvl = .5, c = 'f-blood') => `<rect class="f-white" x="-6" y="-15" width="12" height="4" rx="1.5"/><rect class="f-white" x="-8" y="-11" width="16" height="25" rx="3"/><rect class="${c} noline" x="-6.5" y="${f(12 - 21 * lvl)}" width="13" height="${f(21 * lvl)}" rx="2"/>`;
  const xray = (inner = '') => `<rect x="-20" y="-16" width="40" height="32" rx="3" fill="#1d2238" stroke="var(--art-line)" stroke-width="1.4"/>${inner}`;
  const sun = () => `<path class="s-warn" d="M0 -15 V-11 M0 11 V15 M-15 0 H-11 M11 0 H15 M-10.6 -10.6 L-7.8 -7.8 M7.8 7.8 L10.6 10.6 M-10.6 10.6 L-7.8 7.8 M7.8 -7.8 L10.6 -10.6" stroke-width="2.2"/><circle class="f-nerve" r="7.5"/>`;
  const milk = () => `<path class="f-white" d="M-7 -6 L-4 -12 H4 L7 -6 V14 H-7 Z"/><rect class="f-water noline" x="-6" y="-1" width="12" height="7" opacity=".8"/>`;
  const steak = () => `<path class="f-bad" d="M-12 -2 Q-12 -10 -2 -10 Q10 -10 12 -2 Q14 8 2 9 Q-12 10 -12 -2 Z"/><ellipse class="f-fat noline" cx="5" cy="-2" rx="3" ry="2.5"/>`;
  const beer = () => `<rect class="f-pancreas" x="-7" y="-8" width="13" height="20" rx="2"/><rect class="f-white" x="-8" y="-12" width="15" height="5" rx="2.5"/><path class="s-line" d="M6 -3 h4 v9 h-4" stroke-width="1.8"/>`;
  const shrimp = () => `<path class="f-warn" d="M-10 4 Q-12 -8 0 -10 Q12 -10 10 2 Q8 8 2 6 Q6 2 2 -2 Q-4 -4 -4 4 Z"/>`;
  const clock = () => `<circle class="f-white" r="11"/><path class="s-line" d="M0 0 V-7 M0 0 L5 3" stroke-width="1.8"/>`;
  const cal = (c = 'f-bad') => `<rect class="f-white" x="-12" y="-11" width="24" height="23" rx="3"/><rect class="${c}" x="-12" y="-11" width="24" height="7" rx="2"/><path class="s-line" d="M-6 -14 V-8 M6 -14 V-8" stroke-width="2"/>`;
  const moon = () => `<path class="f-nerve" d="M3 -12 A12 12 0 1 0 12 5 A9.5 9.5 0 0 1 3 -12 Z"/>`;
  const nope = (r = 13) => `<circle r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${-r * .7} ${-r * .7} L${r * .7} ${r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const chk = (r = 9) => `<circle class="f-good" r="${r}"/><path class="s-white" d="M${-r * .45} 0 l${r * .32} ${r * .34} l${r * .58} ${-r * .64}" stroke-width="2.2"/>`;
  const warn = () => `<path class="f-warn" d="M0 -12 L12 9 H-12 Z"/><path class="s-line" d="M0 -4 V2" stroke-width="2.2"/><circle cy="5.5" r="1.4" fill="var(--art-line)"/>`;
  const zap = (c = 'nerve') => `<path d="M2 -12 L-5 1 H1 L-3 12 L6 -2 H0 Z" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.2"/>`;
  const burst = (r = 10, c = 'f-bad') => { let p = ''; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * .5 : r; p += (i ? 'L' : 'M') + f(Math.cos(a) * rr) + ' ' + f(Math.sin(a) * rr); } return `<path class="${c}" d="${p}Z"/>`; };
  const pain = () => `<path d="M-12 -12 l5 5 M12 -12 l-5 5 M-14 4 h6 M14 4 h-6 M0 -16 v6" stroke="var(--c-bad)" stroke-width="2.4" stroke-linecap="round"/>`;
  const tingle = () => `<path d="M-10 -8 l3 3 l-3 3 l3 3 M0 -10 l3 3 l-3 3 l3 3 M10 -8 l3 3 l-3 3 l3 3" stroke="var(--c-nerve)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const dumbbell = () => `<rect class="f-scar" x="-14" y="-7" width="5" height="14" rx="1.5"/><rect class="f-scar" x="9" y="-7" width="5" height="14" rx="1.5"/><rect class="f-scar" x="-9" y="-2" width="18" height="4"/>`;
  const cig = () => `<rect class="f-white" x="-12" y="-2.5" width="20" height="5" rx="1"/><rect class="f-warn" x="8" y="-2.5" width="5" height="5"/><path class="s-scar" d="M14 -4 q3 -4 0 -8 q-3 -4 0 -8" stroke-width="1.6"/>`;
  const gene = () => `<path d="M-6 -14 C6 -7 -6 7 6 14 M6 -14 C-6 -7 6 7 -6 14" stroke="var(--c-spleen)" stroke-width="2.4" fill="none"/><path d="M-3 -10 H3 M-4 -4 H4 M-4 4 H4 M-3 10 H3" stroke="var(--art-line)" stroke-width="1.3"/>`;
  const scaleI = () => `<rect class="f-white" x="-15" y="-10" width="30" height="20" rx="5"/><path class="f-water" d="M-8 -2 A8 8 0 0 1 8 -2 Z"/><path class="s-line" d="M0 -2 L4 -8" stroke-width="1.6"/>`;
  const kidney = (c = 'f-muscle') => `<path class="${c}" d="M-2 -14 C10 -14 14 -4 13 4 C12 12 7 16 0 15 C-6 14 -8 8 -4 4 C-1 2 -1 -2 -4 -5 C-8 -9 -7 -14 -2 -14 Z"/>`;
  const heart = () => `<path class="f-muscle" d="M0 -6 C-2 -14 -16 -14 -15 -3 C-14 6 -5 11 0 16 C5 11 14 6 15 -3 C16 -14 2 -14 0 -6 Z"/>`;
  const lungs = () => `<path class="f-mouth" d="M-3 -12 C-14 -10 -17 6 -15 14 C-10 16 -4 14 -3 10 Z M3 -12 C14 -10 17 6 15 14 C10 16 4 14 3 10 Z"/><path class="s-line" d="M0 -16 V-6 M0 -6 L-4 -2 M0 -6 L4 -2" stroke-width="1.6"/>`;
  const brain = () => `<path class="f-mouth" d="M-14 2 C-16 -8 -6 -14 0 -10 C6 -14 16 -8 14 2 C14 10 6 12 0 9 C-6 12 -14 10 -14 2 Z"/><path class="s-line" d="M0 -10 V8 M-8 -4 q3 3 0 6 M8 -4 q-3 3 0 6" stroke-width="1.1" opacity=".6"/>`;
  const eye = (c = 'f-white') => `<path class="${c}" d="M-15 0 Q0 -12 15 0 Q0 12 -15 0 Z"/><circle class="f-vein" r="5.5"/><circle r="2.4" fill="var(--art-line)"/>`;
  const ear = () => `<path class="f-skin" d="M-4 -12 C8 -14 12 -2 6 6 C3 10 4 14 -2 14 C-6 14 -6 10 -3 8 C2 4 3 -4 -4 -4 Z"/>`;
  const tooth = (c = 'f-white') => `<path class="${c}" d="M-8 -10 Q0 -14 8 -10 Q10 0 6 12 Q4 14 2 6 Q0 2 -2 6 Q-4 14 -6 12 Q-10 0 -8 -10 Z"/>`;
  const sling = () => `<path class="f-water" d="M-14 -12 L14 6 Q14 14 4 14 L-12 4 Z"/><path class="s-line" d="M-14 -12 L-4 -18 M14 6 L8 -18" stroke-width="1.6"/>`;
  const cast = (rot = 0) => `<g transform="rotate(${rot})"><rect class="f-white" x="-18" y="-7" width="36" height="14" rx="6"/><path class="s-scar" d="M-12 -7 V7 M-4 -7 V7 M4 -7 V7 M12 -7 V7" stroke-width="1"/></g>`;
  const splint = () => `<rect class="f-warn" x="-18" y="-3" width="36" height="6" rx="2"/><path class="s-white" d="M-10 -6 V6 M0 -6 V6 M10 -6 V6" stroke-width="2.6"/>`;
  const screwPlate = () => `<rect class="f-scar" x="-20" y="-4" width="40" height="8" rx="3"/>` + [-14, -5, 5, 14].map(x => `<circle class="f-white" cx="${x}" cy="0" r="2.2"/>`).join('');
  const bed = () => `<rect class="f-white" x="-16" y="-2" width="32" height="8" rx="2"/><rect class="f-water" x="-16" y="-8" width="10" height="6" rx="2"/><path class="s-line" d="M-16 6 V12 M16 6 V12 M-16 -10 V6" stroke-width="2"/>`;
  const shoe = () => `<path class="f-bad" d="M-14 6 V-4 Q-12 -8 -6 -6 L4 0 Q14 0 14 6 Z"/><path class="s-white" d="M-4 -4 l3 3 M0 -2 l3 3" stroke-width="1.4"/>`;
  const magn = () => `<circle class="f-white" cx="-3" cy="-3" r="9"/><path class="s-line" d="M4 4 L12 12" stroke-width="3.6"/>`;
  const steth = () => `<path class="s-line" d="M-8 -12 V0 Q-8 8 0 8 Q8 8 8 0 V-12" stroke-width="2"/><path class="s-line" d="M0 8 V12" stroke-width="2"/><circle class="f-white" cx="0" cy="15" r="4"/>`;
  const needle = () => `<path d="M-14 0 H8" stroke="var(--c-scar)" stroke-width="2"/><path class="f-white" d="M8 -3 H16 V3 H8 Z"/>`;
  const thermo = (lvl = .8) => `<rect class="f-white" x="-3.5" y="-14" width="7" height="22" rx="3.5"/><circle class="f-bad" cy="10" r="5.5"/><rect class="f-bad noline" x="-1.6" y="${f(8 - 20 * lvl)}" width="3.2" height="${f(20 * lvl)}"/>`;
  const knob = (c = 'f-bone') => `<circle class="${c}" r="6"/>`;
  const heartEKG = () => `<path d="M-18 0 H-8 L-5 -8 L-1 10 L3 -14 L6 0 H18" stroke="var(--c-bad)" stroke-width="2" fill="none"/>`;

  /* ---------- people (own origin at the hips, about 50 tall) ---------- */
  const person = (o = {}) => { const c = o.c || 'f-water', sk = o.skin || 'f-skin';
    return `<path d="M-4 0 L-7 22 M4 0 L7 22" stroke="var(--c-${(o.leg || 'vein')})" stroke-width="5.5" stroke-linecap="round"/>` +
      `<path d="M-6 -22 L-13 -4 M6 -22 L13 -4" stroke="var(--c-skin)" stroke-width="4.5" stroke-linecap="round"/>` +
      `<path class="${c}" d="M-8 2 V-20 Q-8 -26 0 -26 Q8 -26 8 -20 V2 Z"/><circle class="${sk}" cx="0" cy="-33" r="7"/>`; };
  const kid = (c = 'f-good') => at(0, 0, person({ c }), .72);
  const baby = () => `<ellipse class="f-white" cx="0" cy="4" rx="16" ry="9"/><circle class="f-skin" cx="-14" cy="-2" r="7"/><path d="M4 8 Q12 14 18 8 M2 10 Q8 18 14 14" stroke="var(--c-skin)" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const elder = (c = 'f-spleen') => `<path d="M-3 0 L-6 22 M4 0 L6 22" stroke="var(--c-vein)" stroke-width="5" stroke-linecap="round"/><path class="${c}" d="M-8 2 V-16 Q-6 -26 4 -24 Q10 -20 8 -12 V2 Z"/><circle class="f-skin" cx="8" cy="-28" r="6.5"/><path class="f-white noline" d="M3 -32 Q8 -37 13 -32 Q8 -34 3 -32 Z"/><path class="s-line" d="M14 -10 Q18 -12 18 -8 V22" stroke-width="2.2"/>`;
  const runner = (c = 'f-bad') => `<path d="M-2 0 L-12 12 L-16 22 M2 0 L10 10 L18 12" stroke="var(--c-vein)" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M-4 -20 L-14 -10 M4 -20 L14 -24" stroke="var(--c-skin)" stroke-width="4.5" stroke-linecap="round"/><path class="${c}" d="M-7 2 L-4 -22 Q0 -26 6 -22 L7 2 Z"/><circle class="f-skin" cx="4" cy="-31" r="6.5"/>`;

  /* ---------- the body (skeleton inside a soft silhouette) ---------- */
  const POS = { skull: [58, 27, 11], jaw: [58, 36, 6], ear: [47, 28, 5], eye: [54, 26, 4], neck: [58, 44, 5], shoulder: [76, 51, 7], shoulderL: [40, 51, 7], clav: [58, 48, 7],
    ribs: [58, 66, 13], chest: [58, 62, 12], spine: [58, 72, 7], tspine: [58, 64, 9], lowback: [58, 104, 8], lspine: [58, 100, 9], pelvis: [58, 117, 11], sij: [58, 113, 7], pubis: [58, 123, 5],
    hip: [66, 122, 6], hipL: [50, 122, 6], hips: [58, 122, 12], femur: [68, 136, 7], thigh: [68, 136, 8], thighL: [48, 136, 8], knee: [69, 150, 6], kneeL: [47, 150, 6], knees: [58, 150, 14],
    shin: [70, 161, 6], tibia: [70, 161, 6], calf: [70, 161, 7], ankle: [70, 171, 5], foot: [75, 175, 6], toe: [79, 176, 4], footL: [41, 175, 6],
    arm: [81, 67, 6], elbow: [86, 84, 6], elbowL: [30, 84, 6], forearm: [89, 98, 6], wrist: [92, 111, 5], wristL: [24, 111, 5], hand: [93, 118, 6], handL: [23, 118, 6], finger: [95, 124, 4],
    heart: [61, 64, 7], lungs: [58, 66, 13], kidney: [58, 98, 8], bladder: [58, 120, 5], gut: [58, 104, 10], skin: [80, 70, 6], marrow: [68, 136, 6], body: [58, 100, 40] };
  const spineX = (y, o) => o.spine === 'scol' ? 58 + 6 * Math.sin((y - 44) / 68 * Math.PI * 2) : 58;
  const body = (hi = [], o = {}) => {
    const B = 'bone';
    let s = `<g opacity=".38"><circle class="f-skin noline" cx="58" cy="28" r="13"/>` +
      `<path d="M40 52 L30 84 L24 112 M76 52 L86 84 L92 112" stroke="var(--c-skin)" stroke-width="10" stroke-linecap="round" fill="none"/>` +
      `<path d="M50 124 L46 150 L45 172 M66 124 L70 150 L71 172" stroke="var(--c-skin)" stroke-width="14" stroke-linecap="round" fill="none"/>` +
      `<path class="f-skin noline" d="M40 47 Q58 41 76 47 L80 118 Q80 128 70 128 H46 Q36 128 36 118 Z"/></g>`;
    if (o.muscle) s += `<g opacity=".7"><ellipse class="f-muscle noline" cx="35" cy="67" rx="4.5" ry="12" transform="rotate(20 35 67)"/><ellipse class="f-muscle noline" cx="81" cy="67" rx="4.5" ry="12" transform="rotate(-20 81 67)"/>` +
      `<ellipse class="f-muscle noline" cx="48" cy="136" rx="6" ry="13"/><ellipse class="f-muscle noline" cx="68" cy="136" rx="6" ry="13"/><ellipse class="f-muscle noline" cx="46" cy="162" rx="4.5" ry="8"/><ellipse class="f-muscle noline" cx="70" cy="162" rx="4.5" ry="8"/>` +
      `<path class="f-muscle noline" d="M46 56 Q58 52 70 56 L68 76 Q58 80 48 76 Z" opacity=".6"/></g>`;
    // ribs, clavicles
    for (let i = 0; i < 6; i++) { const y = 55 + i * 5, w = 14 - Math.abs(i - 2) * 1.2; s += thick(`M58 ${y} Q${58 - w} ${y - 2} ${58 - w - 2} ${y + 6} M58 ${y} Q${58 + w} ${y - 2} ${58 + w + 2} ${y + 6}`, B, 1.6); }
    s += thick('M44 49 L58 46 L72 49', B, 2.4);
    // spine column
    if (o.spine === 'fused') s += thick('M58 42 V112', B, 6) + `<path d="M58 44 V110" stroke="var(--art-line)" stroke-width=".8" stroke-dasharray="2 4"/>`;
    else for (let y = 42; y <= 110; y += 5.6) s += `<rect class="f-bone" x="${f(spineX(y, o) - 3.6)}" y="${f(y)}" width="7.2" height="4.4" rx="1.4" style="stroke-width:1"/>`;
    // pelvis, sacrum
    s += `<path class="f-bone" d="M43 111 Q50 106 58 112 Q66 106 73 111 L70 123 Q64 119 60 125 H56 Q52 119 46 123 Z"/><path class="s-line" d="M58 112 V124" stroke-width="1" opacity=".5"/>`;
    // arms, legs
    s += thick('M42 52 L31 83 M74 52 L85 83', B, 3.4) + thick('M31 85 L25 110 M85 85 L91 110', B, 2.8) + thick('M51 123 L47 149 M65 123 L69 149', B, 4.4) + thick('M47 151 L46 170 M69 151 L70 170', B, 3.6);
    s += `<ellipse class="f-bone" cx="23" cy="117" rx="3.6" ry="5.5"/><ellipse class="f-bone" cx="93" cy="117" rx="3.6" ry="5.5"/><ellipse class="f-bone" cx="42" cy="175" rx="6" ry="2.8"/><ellipse class="f-bone" cx="74" cy="175" rx="6" ry="2.8"/>`;
    [[42, 52], [74, 52], [31, 84], [85, 84], [25, 111], [91, 111], [51, 123], [65, 123], [47, 150], [69, 150], [46, 171], [70, 171]].forEach(([x, y]) => s += `<circle class="f-bone" cx="${x}" cy="${y}" r="2.6" style="stroke-width:1"/>`);
    // skull and jaw
    s += `<path class="f-bone" d="M51 33 Q58 42 65 33 Z"/><circle class="f-bone" cx="58" cy="27" r="10"/><circle cx="54.5" cy="27" r="2.2" fill="var(--art-line)"/><circle cx="61.5" cy="27" r="2.2" fill="var(--art-line)"/>`;
    if (o.organs) s += o.organs;
    // glowing spots
    s += hi.map(k => { const [x, y, r] = POS[k]; return `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r + 2}" fill="var(--c-${o.glow || 'warn'})" fill-opacity=".25" stroke="var(--c-${o.glow || 'warn'})" stroke-width="1.9"/>`; }).join('');
    if (o.pain) s += o.pain.map(k => { const [x, y] = POS[k]; return cls('a-blink', at(x, y, pain(), .55)); }).join('');
    if (o.zing) s += o.zing.map(k => { const [x, y] = POS[k]; return cls('a-blink', at(x + 8, y, zap(), .6)); }).join('');
    return s;
  };
  const beam = (k, c = 'warn') => { const [x, y] = POS[k]; return `<path class="a-flow" d="M${x + 5} ${y} C${f((x + 120) / 2 + 10)} ${y} ${f((x + 120) / 2)} 92 120 92" stroke="var(--c-${c})" stroke-width="2" fill="none"/>`; };

  /* ---------- the story engine ---------- */
  const stepsG = (list, sec) => { const T0 = list.length * sec, n = list.length;
    return list.map(([cap, pic], i) => { const s = i / n, e = (i + 1) / n, d = .012;
      const kt = i === 0 ? `0;${d};${f(e - d)};${f(e)};1` : i === n - 1 ? `0;${f(s)};${f(s + d)};${f(1 - d)};1` : `0;${f(s)};${f(s + d)};${f(e - d)};${f(e)};1`;
      const vals = i === 0 ? '0;1;1;0;0' : i === n - 1 ? '0;0;1;1;0' : '0;0;1;1;0;0';
      const lines = cap.split('|');
      return `<g class="ansmotion" opacity="0"><animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${T0}s" repeatCount="indefinite"/>${pic}` +
        `<circle class="f-warn" cx="124" cy="162" r="6.5"/><text class="tagtx" x="124" y="165" text-anchor="middle" style="font-size:9px">${i + 1}</text>` +
        lines.map((l, j) => T(212, lines.length === 1 ? 165 : 159 + j * 11.5, l, { s: 9.4 })).join('') + `</g>`; }).join('') +
      `<g class="ansmotion"><rect x="120" y="175" width="172" height="3" rx="1.5" fill="var(--c-warn)"><animate attributeName="width" values="0;172" dur="${T0}s" repeatCount="indefinite"/></rect></g>`; };
  // front-of-card still: the first step's picture, shown faintly while the card is a mystery
  const scene = ({ t, a, hi = [], c = 'water', flows = '', steps, sec = 3.6, o = {}, beamFrom }) => {
    const sz = Math.max(8.5, Math.min(11.5, 165 / (a.length * .56)));
    const bm = beamFrom === null ? '' : beam(beamFrom || hi[0] || 'body');
    return ART(tag(150, 9, t, '', 9.2) + body(hi, o) + bm + flows +
      `<rect x="118" y="24" width="176" height="124" rx="10" fill="var(--c-${c})" opacity=".18"/><rect x="118" y="24" width="176" height="124" rx="10" fill="none" stroke="var(--c-${c})" stroke-width="1.6"/>` +
      `<g class="q">${steps[0][1]}</g>` + stepsG(steps, sec) + qtag(206, 36, a, sz)); };

  /* ---------- zoom-panel pictures (drawn in x 122..290, y 48..146) ---------- */
  // long bone across the panel. o: fx (trans|obl|spiral|comm|green|path|stress), plates, callus, hema, porous, bow, marrow (red|yellow), thin, label
  const bone = (cx = 206, cy = 96, L = 136, o = {}) => {
    const h = o.h || 9, r = o.r || 14, x1 = cx - L / 2, x2 = cx + L / 2, b = o.bow || 0;
    const shaft = `M${x1} ${cy - h} Q${cx} ${cy - h - b} ${x2} ${cy - h} L${x2} ${cy + h} Q${cx} ${cy + h - b} ${x1} ${cy + h} Z`;
    let s = `<ellipse class="f-bone" cx="${x1}" cy="${cy}" rx="${r * .8}" ry="${r}"/><ellipse class="f-bone" cx="${x2}" cy="${cy}" rx="${r * .8}" ry="${r}"/>`;
    if (o.cart) s += `<path d="M${x1 - r * .8 + 1} ${cy - r * .6} A${r * .8} ${r} 0 0 0 ${x1 - r * .8 + 1} ${cy + r * .6}" stroke="var(--c-mucus)" stroke-width="4" fill="none"/><path d="M${x2 + r * .8 - 1} ${cy - r * .6} A${r * .8} ${r} 0 0 1 ${x2 + r * .8 - 1} ${cy + r * .6}" stroke="var(--c-mucus)" stroke-width="4" fill="none"/>`;
    s += `<path class="f-bone" d="${shaft}"/>`;
    const mh = o.thin ? h - 1.5 : h - 3.5;
    s += `<path d="M${x1 + 4} ${cy - mh} Q${cx} ${cy - mh - b} ${x2 - 4} ${cy - mh} L${x2 - 4} ${cy + mh} Q${cx} ${cy + mh - b} ${x1 + 4} ${cy + mh} Z" fill="var(--c-${o.marrow === 'red' ? 'blood' : 'fat'})" opacity="${o.marrow === 'red' ? .55 : .8}"/>`;
    if (o.porous) for (let i = 0; i < 18; i++) s += `<ellipse cx="${f(x1 + 8 + (i * 37) % (L - 16))}" cy="${f(cy - h + 3 + (i * 13) % (2 * h - 6) - b * .5)}" rx="${f(1.6 + (i % 3))}" ry="1.6" fill="var(--surface)" opacity=".85"/>`;
    if (o.plates) s += `<path d="M${x1 + r * .6} ${cy - r * .8} V${cy + r * .8} M${x2 - r * .6} ${cy - r * .8} V${cy + r * .8}" stroke="var(--c-spleen)" stroke-width="2.4" stroke-dasharray="3 2"/>`;
    const crack = { trans: `M${cx} ${cy - h - 2} L${cx + 2} ${cy - 2} L${cx - 1} ${cy + 3} L${cx + 1} ${cy + h + 2}`, obl: `M${cx - 12} ${cy - h - 2} L${cx + 12} ${cy + h + 2}`,
      spiral: `M${cx - 16} ${cy - h - 2} C${cx - 4} ${cy - h} ${cx - 4} ${cy + h} ${cx + 8} ${cy + 2} S${cx + 18} ${cy - h} ${cx + 22} ${cy - h - 2}`,
      comm: `M${cx - 10} ${cy - h - 2} L${cx - 4} ${cy} L${cx - 9} ${cy + h + 2} M${cx - 4} ${cy} L${cx + 6} ${cy - 3} L${cx + 10} ${cy - h - 2} M${cx + 6} ${cy - 3} L${cx + 9} ${cy + h + 2}`,
      green: `M${cx - 3} ${cy - h - 2 - b} L${cx + 1} ${cy - h + 6 - b} L${cx - 2} ${cy - 1 - b}`, stress: `M${cx} ${cy - h - 1} L${cx + 1} ${cy - h + 4}`, path: `M${cx - 2} ${cy - h - 2} L${cx + 3} ${cy} L${cx - 1} ${cy + h + 2}` }[o.fx];
    if (o.hema) s += `<ellipse class="a-pulse" cx="${cx}" cy="${cy}" rx="22" ry="${h + 9}" fill="var(--c-blood)" opacity=".55"/>`;
    if (crack) s += `<path d="${crack}" stroke="var(--surface)" stroke-width="3.4" fill="none"/><path class="a-blink" d="${crack}" stroke="var(--c-bad)" stroke-width="1.8" fill="none"/>`;
    if (o.fx === 'comm') s += [[-6, -h - 6], [8, h + 6], [14, -h - 4]].map(([dx, dy], i) => cls('a-bob', `<path class="f-bone" d="M${cx + dx - 4} ${cy + dy - 2} L${cx + dx + 3} ${cy + dy - 3} L${cx + dx + 4} ${cy + dy + 2} L${cx + dx - 3} ${cy + dy + 3} Z"/>`, `animation-delay:${i * .3}s`)).join('');
    if (o.fx === 'path') s += `<circle class="f-tumor a-pulse" cx="${cx - 18}" cy="${cy}" r="7" opacity=".9"/>`;
    if (o.callus) s += `<ellipse class="f-scar a-grow" cx="${cx}" cy="${cy}" rx="20" ry="${h + 6}" opacity=".85"/>` + `<path d="M${cx} ${cy - h} V${cy + h}" stroke="var(--c-bone)" stroke-width="2"/>`;
    return s;
  };
  // remodeling strip: osteoclasts dig pits, osteoblasts lay new bone
  const remodel = (mode = 'both', y = 112) => {
    let s = `<rect class="f-bone" x="126" y="${y}" width="160" height="26" rx="4"/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M${136 + i * 26} ${y + 6} q6 6 0 12" stroke="var(--art-line)" stroke-width="1" fill="none" opacity=".4"/>`).join('');
    if (mode !== 'build') s += `<path d="M150 ${y} q14 16 28 0" fill="var(--surface)" stroke="var(--art-line)" stroke-width="1.2"/>` + mover(`<path class="f-germ" d="M-12 4 Q-14 -10 0 -10 Q14 -10 12 4 Z"/><circle cx="-5" cy="-3" r="1.6" fill="#fff"/><circle cx="0" cy="-5" r="1.6" fill="#fff"/><circle cx="5" cy="-3" r="1.6" fill="#fff"/>`, `M150 ${y - 4} L178 ${y - 4} L150 ${y - 4}`, 3) + K(164, y - 18, 'osteoclast') + flow(`M164 ${y + 4} L164 ${y - 30}`, 3, 1.8, dot('f-nerve', 2.6));
    if (mode !== 'clear') s += [0, 1, 2, 3].map(i => pop(i, `<rect class="f-immune" x="${214 + i * 15}" y="${y - 12}" width="12" height="11" rx="3"/>`)).join('') + [0, 1, 2].map(i => `<rect class="a-fadein" style="--d:${i + 2}" x="${214}" y="${y - 2 - i * 0}" width="58" height="3" rx="1.5" fill="var(--c-bone)" stroke="var(--art-line)" stroke-width=".8"/>`).join('') + K(242, y - 18, 'osteoblasts');
    return s;
  };
  // synovial joint, vertical. o.kind: normal|oa|ra|gout|septic|fused|disloc|bursa|nodes|stiff
  const joint = (cx = 206, cy = 96, o = {}) => {
    const k = o.kind || 'normal', gap = k === 'oa' || k === 'fused' ? 3 : 7;
    const capsule = `<path d="M${cx - 28} ${cy - 34} Q${cx - 38} ${cy} ${cx - 28} ${cy + 34} M${cx + 28} ${cy - 34} Q${cx + 38} ${cy} ${cx + 28} ${cy + 34}" stroke="var(--c-${k === 'ra' ? 'bad' : 'scar'})" stroke-width="${k === 'ra' ? 5 : 3}" fill="none" stroke-dasharray="${k === 'ra' ? '0' : '5 3'}" stroke-linecap="round"/>`;
    const cartT = k === 'oa' ? `<path d="M${cx - 18} ${cy - gap} Q${cx - 10} ${cy - gap + 3} ${cx - 4} ${cy - gap} M${cx + 6} ${cy - gap} Q${cx + 12} ${cy - gap + 3} ${cx + 18} ${cy - gap}" stroke="var(--c-mucus)" stroke-width="3" fill="none"/>` : k === 'fused' ? '' : `<ellipse class="f-mucus" cx="${cx}" cy="${cy - gap - 7}" rx="21" ry="11"/>`;
    const cartB = k === 'oa' ? `<path d="M${cx - 18} ${cy + gap} Q${cx} ${cy + gap - 3} ${cx + 8} ${cy + gap}" stroke="var(--c-mucus)" stroke-width="3" fill="none"/>` : k === 'fused' ? '' : `<ellipse class="f-mucus" cx="${cx}" cy="${cy + gap + 7}" rx="21" ry="11"/>`;
    const top = `<rect class="f-bone" x="${cx - 12}" y="${cy - 52}" width="24" height="36" rx="2"/>${cartT}<ellipse class="f-bone" cx="${cx}" cy="${cy - gap - 9}" rx="19" ry="10"/>`;
    const bot = `<rect class="f-bone" x="${cx - 12}" y="${cy + 16}" width="24" height="36" rx="2"/>${cartB}<ellipse class="f-bone" cx="${cx}" cy="${cy + gap + 9}" rx="19" ry="10"/>`;
    let s = capsule + `<rect x="${cx - 26}" y="${cy - gap - 4}" width="52" height="${2 * gap + 8}" rx="6" fill="var(--c-water)" opacity=".45"/>`;
    if (k === 'bursa') s += `<ellipse class="a-pulse" cx="${cx + 30}" cy="${cy - 26}" rx="14" ry="9" fill="var(--c-bad)" opacity=".75" stroke="var(--art-line)"/>`;
    s += bot;
    if (k === 'disloc') s += `<g>${top}<animateTransform attributeName="transform" type="translate" values="0 0;30 -10;30 -10;0 0" keyTimes="0;.3;.75;1" dur="3s" repeatCount="indefinite"/></g>`;
    else if (k === 'normal') s += cls('a-bob', top);
    else if (k === 'oa') s += cls('a-shake', top);
    else s += top;
    if (k === 'fused') s += `<rect class="f-bone" x="${cx - 18}" y="${cy - 10}" width="36" height="20" rx="4"/><path d="M${cx - 18} ${cy} H${cx + 18}" stroke="var(--art-line)" stroke-width=".8" stroke-dasharray="2 3"/>`;
    if (k === 'oa' || o.spurs) s += [[-22, -gap - 4, 200], [22, -gap - 4, -20], [-22, gap + 4, 160], [22, gap + 4, 20]].map(([dx, dy, r], i) => pop(i, at(cx + dx, cy + dy, `<path class="f-bone" d="M0 -4 L9 0 L0 4 Z"/>`, 1, r))).join('') + flow(`M${cx - 18} ${cy} L${cx + 18} ${cy}`, 3, 2.2, `<path class="f-white" d="M-2 -2 L2 -1 L1 2 Z"/>`);
    if (k === 'ra') s += [-1, 1].map(sd => grow(cx + sd * 22, cy, `<path class="f-bad" d="M${sd * 6} -12 Q${-sd * 12} -6 ${-sd * 10} 0 Q${-sd * 12} 6 ${sd * 6} 12 Z" opacity=".85"/>`, .5, 1.05, 3)).join('') + flow(`M${cx - 40} ${cy + 30} L${cx - 10} ${cy}`, 3, 2.4, wbc());
    if (k === 'gout') s += [[-12, -1, 20], [-2, 2, -30], [8, -2, 50], [16, 2, -10], [-18, 3, 70]].map(([dx, dy, r], i) => pop(i, at(cx + dx, cy + dy, crystal(r)))).join('') + flow(`M${cx + 46} ${cy + 26} L${cx + 6} ${cy}`, 3, 2, wbc()) + `<circle class="a-pulse" cx="${cx}" cy="${cy}" r="38" fill="var(--c-bad)" opacity=".15"/>`;
    if (k === 'septic') s += flow(`M${cx - 22} ${cy} L${cx + 22} ${cy}`, 4, 2.4, germ()) + `<circle class="a-pulse" cx="${cx}" cy="${cy}" r="38" fill="var(--c-bad)" opacity=".18"/>`;
    if (k === 'normal') s += flow(`M${cx - 22} ${cy} L${cx + 22} ${cy}`, 3, 2.6, dot('f-water', 2.2));
    return s;
  };
  // spine segment: 3 vertebrae (front at left) with disks; cord on the right. o.kind: normal|hern|bulge|thin|slip|crack|sten|fused|wedge|ddd
  const spine = (cx = 190, cy = 96, o = {}) => {
    const k = o.kind || 'normal', dh = k === 'thin' || k === 'ddd' ? 4 : 9, vh = 20, w = 44;
    const ys = [cy - vh * 1.5 - dh, cy - vh / 2, cy + vh / 2 + dh];
    let s = `<path d="M${cx + 36} ${cy - 54} V${cy + 54}" stroke="var(--c-nerve)" stroke-width="${k === 'sten' ? 7 : 9}" stroke-linecap="round" ${k === 'sten' ? 'class="a-squeeze"' : ''}/>`;
    s += `<path d="M${cx + 36} ${cy + 2} Q${cx + 60} ${cy + 6} ${cx + 82} ${cy + 22}" stroke="var(--c-nerve)" stroke-width="4" fill="none"/>`;
    const vert = (y, i) => { let v = `<rect class="f-bone" x="${cx - w / 2}" y="${y}" width="${w}" height="${vh}" rx="4"/><path class="f-bone" d="M${cx + w / 2} ${y + 4} L${cx + 30} ${y + 2} L${cx + 52} ${y + 8} L${cx + 30} ${y + vh - 2} L${cx + w / 2} ${y + vh - 4} Z" opacity=".95"/>`;
      if (k === 'crack' && i === 2) v += `<path class="a-blink" d="M${cx + 30} ${y + 4} L${cx + 33} ${y + 10} L${cx + 30} ${y + 16}" stroke="var(--c-bad)" stroke-width="2.2" fill="none"/>`;
      if ((k === 'thin' || k === 'ddd') && o.spurs !== false) v += pop(i, `<path class="f-bone" d="M${cx - w / 2} ${y + (i ? 2 : vh - 2)} L${cx - w / 2 - 7} ${y + (i ? -1 : vh + 1)} L${cx - w / 2 + 4} ${y + (i ? 4 : vh - 4)} Z"/>`);
      return v; };
    const disk = (y) => `<rect class="f-white" x="${cx - w / 2 + 2}" y="${y}" width="${w - 4}" height="${dh}" rx="3"/><ellipse cx="${cx}" cy="${y + dh / 2}" rx="${dh > 5 ? 9 : 5}" ry="${dh / 2 - .8}" fill="var(--c-water)"/>`;
    s += disk(ys[0] + vh) + disk(ys[1] + vh);
    if (k === 'fused') s += `<rect class="f-bone" x="${cx - w / 2 - 3}" y="${ys[0] - 2}" width="${w + 6}" height="${ys[2] + vh - ys[0] + 4}" rx="6" opacity=".9"/>`;
    s += vert(ys[0], 0) + vert(ys[2], 2);
    if (k === 'slip') s += `<g>${vert(ys[1], 1)}<animateTransform attributeName="transform" type="translate" values="0 0;-14 0;-14 0;0 0" keyTimes="0;.35;.8;1" dur="3s" repeatCount="indefinite"/></g>`;
    else if (k === 'wedge') s += `<g>${`<path class="f-bone" d="M${cx - w / 2} ${ys[1] + 8} L${cx + w / 2} ${ys[1]} V${ys[1] + vh} H${cx - w / 2} Z"/>`}</g>` + cls('a-blink', at(cx - w / 2 - 8, ys[1] + 6, pain(), .6));
    else s += vert(ys[1], 1);
    if (k === 'hern') s += `<ellipse cx="${cx + 24}" cy="${ys[1] + vh + dh / 2}" rx="6" ry="4" fill="var(--c-water)" stroke="var(--art-line)" stroke-width="1"><animate attributeName="cx" values="${cx + 6};${cx + 30};${cx + 30};${cx + 6}" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></ellipse>` + cls('a-blink', at(cx + 46, ys[1] + vh + 4, zap(), .7));
    if (k === 'bulge') s += `<ellipse class="a-pulse" cx="${cx + w / 2}" cy="${ys[1] + vh + dh / 2}" rx="6" ry="${dh / 2 + 2}" fill="var(--c-white, #fff)" stroke="var(--art-line)" stroke-width="1"/>`;
    if (k === 'sten') s += `<path class="f-fat a-pulse" d="M${cx + 26} ${cy - 30} q6 30 0 60" opacity=".95"/><path class="f-fat a-pulse" d="M${cx + 46} ${cy - 30} q-6 30 0 60" opacity=".95"/>` + cls('a-blink', at(cx + 66, cy - 30, zap(), .7));
    return s;
  };
  // side-view spine on a little person for posture curves. kind: normal|kyph|lord|flat
  const posture = (x, y, kind = 'normal', s = 1) => {
    const curve = { normal: 'M0 -40 Q4 -28 0 -18 Q-4 -6 0 4', kyph: 'M8 -36 Q-6 -26 -2 -14 Q2 -4 0 4', lord: 'M0 -40 Q4 -28 0 -18 Q-10 -6 0 4', flat: 'M0 -40 V4' }[kind];
    const hx = kind === 'kyph' ? 12 : 2;
    return at(x, y, `<path class="f-skin" d="M-10 4 Q-14 -18 -8 -40 Q2 -46 10 -40 Q14 -18 10 4 Z" opacity=".55"/><circle class="f-skin" cx="${hx}" cy="-50" r="8"/>` +
      `<path d="${curve}" stroke="var(--c-bone)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${curve}" stroke="var(--art-line)" stroke-width="5" fill="none" stroke-dasharray="1.2 3.2"/>` +
      `<path d="M-4 4 L-6 30 M4 4 L6 30" stroke="var(--c-vein)" stroke-width="5" stroke-linecap="round"/>`, s);
  };
  // muscle sarcomere: Z lines slide in on contraction
  const sarc = (cx = 206, cy = 96, contract = true) => {
    const L = 64, dz = contract ? 16 : 0, anim = (from, to) => `<animateTransform attributeName="transform" type="translate" values="0 0;${to} 0;${to} 0;0 0" keyTimes="0;.4;.75;1" dur="2.8s" repeatCount="indefinite"/>`;
    const side = (sgn) => `<g><path d="M${cx + sgn * L} ${cy - 30} V${cy + 30}" stroke="var(--c-spleen)" stroke-width="4"/>` + [-20, -8, 4, 16].map(y => `<path d="M${cx + sgn * L} ${cy + y} H${cx + sgn * 14}" stroke="var(--c-mucus)" stroke-width="2.6"/>`).join('') + (contract ? anim(0, -sgn * dz) : '') + `</g>`;
    let s = side(-1) + side(1);
    s += [-14, -2, 10].map(y => `<rect x="${cx - 34}" y="${cy + y}" width="68" height="5" rx="2.5" class="f-muscle"/>` + [-26, -16, -6, 6, 16, 26].map(x => `<path d="M${cx + x} ${cy + y} l${x < 0 ? -3 : 3} -4" stroke="var(--c-muscle)" stroke-width="1.6"/>`).join('')).join('');
    return s;
  };
  // nerve through a tunnel, ring squeezes it
  const tunnel = (cx = 206, cy = 96, lab = '') => `<rect x="${cx - 80}" y="${cy - 6}" width="160" height="12" rx="6" class="f-nerve"/><ellipse class="a-squeeze" cx="${cx}" cy="${cy}" rx="16" ry="20" fill="none" stroke="var(--c-scar)" stroke-width="7"/>` +
    flow(`M${cx - 76} ${cy} L${cx - 18} ${cy}`, 3, 1.6, dot('f-warn', 2.6)) + cls('a-blink', at(cx + 50, cy - 20, tingle(), .8)) + (lab ? K(cx, cy + 34, lab) : '');
  // horizontal scale with a sliding marker (DEXA T-score)
  const tscale = (val, x0 = 132, y = 100) => { const w = 150, X = v => f(x0 + (v + 4) / 5 * w);
    return `<rect x="${x0}" y="${y - 6}" width="${f((1.5) / 5 * w)}" height="12" fill="var(--c-bad)"/><rect x="${X(-2.5)}" y="${y - 6}" width="${f(1.5 / 5 * w)}" height="12" fill="var(--c-warn)"/><rect x="${X(-1)}" y="${y - 6}" width="${f(2 / 5 * w)}" height="12" fill="var(--c-good)"/>` +
      `<rect x="${x0}" y="${y - 6}" width="${w}" height="12" fill="none" stroke="var(--art-line)" stroke-width="1.2"/>` + [-4, -2.5, -1, 1].map(v => K(X(v), y + 20, String(v))).join('') +
      `<g class="ansmotion"><g><path d="M0 -14 L6 -22 H-6 Z" fill="var(--pic-ink)"/><animateMotion dur="3s" repeatCount="indefinite" path="M${X(1)} ${y} L${X(val)} ${y} L${X(val)} ${y}" keyTimes="0;.6;1" keyPoints="0;1;1" calcMode="linear"/></g></g>`; };
  const riseBar = (x, base, w, h, c, dur = 2.4) => `<g class="ansmotion"><rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="3" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.3"><animate attributeName="height" values="0;${h};${h}" keyTimes="0;.5;1" dur="${dur}s" repeatCount="indefinite"/><animate attributeName="y" values="${base};${base - h};${base - h}" keyTimes="0;.5;1" dur="${dur}s" repeatCount="indefinite"/></rect></g>`;
  const bars = list => `<path class="s-ink" d="M134 134 H282" stroke-width="1.5"/>` + list.map(([x, h, c, l]) => riseBar(x, 134, 26, h, c) + K(x + 13, 145, l)).join('');
  const chip = (x, y, t, c = 'water', size = 9) => { const ww = String(t).length * size * .56 + 12;
    return `<rect x="${f(x - ww / 2)}" y="${y - 8}" width="${f(ww)}" height="16" rx="8" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1.2"/>` + T(x, y + size * .36, t, { c: 'tagtx', s: size }); };
  // row of icons that pop in, each with a chip label: items [[icon, label, color]]
  const row = (items, y = 90, s = 1) => { const n = items.length, step = 168 / n;
    return items.map(([ic, lab, c], i) => { const x = f(122 + step * (i + .5)); return pop(i, at(x, y, ic, s)) + (lab ? `<g class="a-fadein" style="--d:${i + 1}">${chip(x, y + 30, lab, c || 'white', n > 3 ? 8 : 9)}</g>` : ''); }).join(''); };
  // 2 x 2 grid of icon + chip
  const quad = items => items.map(([ic, lab, c], i) => { const x = 164 + (i % 2) * 84, y = 66 + Math.floor(i / 2) * 44; return pop(i, at(x, y, ic, .8)) + `<g class="a-fadein" style="--d:${i + 1}">${chip(x, y + 19, lab, c || 'white', 8)}</g>`; }).join('');
  // hip socket close-up: ball (femoral head) in a cup; o: shallow, out (slides out), flat (flattened head), slip
  const hipZoom = (cx = 206, cy = 92, o = {}) => {
    const cup = o.shallow ? `M${cx - 30} ${cy - 6} Q${cx} ${cy - 22} ${cx + 30} ${cy - 6}` : `M${cx - 30} ${cy + 6} Q${cx - 28} ${cy - 30} ${cx} ${cy - 30} Q${cx + 28} ${cy - 30} ${cx + 30} ${cy + 6}`;
    const ball = o.flat ? `<path class="f-bone" d="M${cx - 18} ${cy + 6} Q${cx - 18} ${cy - 10} ${cx} ${cy - 10} Q${cx + 18} ${cy - 10} ${cx + 18} ${cy + 6} Z"/><path class="a-blink" d="M${cx - 8} ${cy - 6} l4 6 l-3 5" stroke="var(--c-bad)" stroke-width="1.6" fill="none"/>` : `<circle class="f-bone" cx="${cx}" cy="${cy - 2}" r="18"/>`;
    const neck = `<path class="f-bone" d="M${cx + 8} ${cy + 12} L${cx + 40} ${cy + 52} L${cx + 56} ${cy + 44} L${cx + 16} ${cy + 2} Z"/>`;
    let head = ball + (o.dead ? `<circle cx="${cx}" cy="${cy - 2}" r="18" fill="var(--c-scar)" opacity=".55"/>` : '');
    let fem = o.slip ? neck + `<g>${head}<animateTransform attributeName="transform" type="translate" values="0 0;-8 10;-8 10;0 0" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></g>` : neck + head;
    if (o.out) fem = `<g>${fem}<animateTransform attributeName="transform" type="translate" values="0 0;22 14;22 14;0 0" keyTimes="0;.35;.75;1" dur="3s" repeatCount="indefinite"/></g>`;
    return `<path d="${cup}" stroke="var(--c-bone)" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${cup}" stroke="var(--art-line)" stroke-width="1.2" fill="none"/>` + fem + K(cx - 46, cy - 26, o.shallow ? 'shallow cup' : 'socket', 8.5);
  };
  // hand outline with a highlighted area: zone = thumb|index|ring|palm|wrist|pip|dip|mcp
  const handZoom = (cx = 206, cy = 100, zone = [], extra = '') => {
    const fingers = [[-22, -34, 10, 26, -18], [-8, -44, 9, 34, 0], [4, -46, 9, 36, 0], [16, -42, 9, 32, 0], [27, -32, 8, 24, 0]];
    let s = `<path class="f-skin" d="M${cx - 24} ${cy + 44} V${cy - 8} Q${cx - 24} ${cy - 14} ${cx - 16} ${cy - 14} H${cx + 30} Q${cx + 34} ${cy - 14} ${cx + 34} ${cy - 8} V${cy + 44} Z"/>`;
    s += fingers.map(([dx, dy, w, h, r], i) => `<rect class="f-skin" x="${cx + dx - w / 2}" y="${cy + dy}" width="${w}" height="${h}" rx="${w / 2}" ${r ? `transform="rotate(${r} ${cx + dx} ${cy + dy + h})"` : ''}/>`).join('');
    const Z = { thumb: [cx - 26, cy - 14, 8], index: [cx - 8, cy - 30, 7], middle: [cx + 4, cy - 32, 7], ring: [cx + 16, cy - 28, 7], palm: [cx + 6, cy + 12, 16], wrist: [cx + 5, cy + 42, 12],
      dip: [cx + 4, cy - 38, 5], pip: [cx + 4, cy - 26, 5], mcp: [cx + 4, cy - 12, 5], mcps: [cx + 4, cy - 12, 22], thumbside: [cx - 22, cy + 34, 9] };
    s += zone.map(z => { const [x, y, r] = Z[z]; return `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r}" fill="var(--c-bad)" fill-opacity=".35" stroke="var(--c-bad)" stroke-width="1.8"/>`; }).join('');
    return s + extra;
  };
  // knee from the side: femur, tibia, patella, patellar tendon, tubercle
  const kneeZoom = (cx = 206, cy = 92, o = {}) => `<rect class="f-bone" x="${cx - 12}" y="${cy - 54}" width="24" height="44" rx="3"/><ellipse class="f-bone" cx="${cx}" cy="${cy - 10}" rx="20" ry="11"/>` +
    `<rect class="f-bone" x="${cx - 13}" y="${cy + 8}" width="26" height="46" rx="3"/><ellipse class="f-bone" cx="${cx}" cy="${cy + 8}" rx="21" ry="8"/>` +
    `<ellipse class="f-bone" cx="${cx - 26}" cy="${cy - 6}" rx="6" ry="10"/><path d="M${cx - 26} ${cy + 4} Q${cx - 24} ${cy + 18} ${cx - 15} ${cy + 26}" stroke="var(--c-scar)" stroke-width="5" fill="none" ${o.pull ? 'class="a-squeeze"' : ''}/>` +
    (o.tub ? `<circle class="a-pulse" cx="${cx - 14}" cy="${cy + 28}" r="8" fill="var(--c-bad)" opacity=".5"/>` : '') +
    (o.acl ? `<path d="M${cx - 6} ${cy - 6} L${cx + 6} ${cy + 6}" stroke="var(--c-bad)" stroke-width="3.4"/>` : '') +
    (o.bursa ? `<ellipse class="a-pulse" cx="${cx - 34}" cy="${cy - 6}" rx="6" ry="11" fill="var(--c-bad)" opacity=".6"/>` : '');
  // vertebra wedge collapse, used for osteoporosis
  const shrink = (x, y, h1, h2, inner) => `<g transform="translate(${x} ${y})"><g>${inner}<animateTransform attributeName="transform" type="scale" values="1 1;1 ${h2 / h1};1 ${h2 / h1};1 1" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></g></g>`;

  window.M12 = { f, at, T, K, cls, pop, thick, arrowP, head, mover, fade, flow, slide, spin, grow, blinkG, dot, germ, wbc, crystal, pill, syringe, ice, heat, vial, xray, sun, milk, steak, beer, shrimp, clock, cal, moon, nope, chk, warn, zap, burst, pain, tingle,
    dumbbell, cig, gene, scaleI, kidney, heart, lungs, brain, eye, ear, tooth, sling, cast, splint, screwPlate, bed, shoe, magn, steth, needle, thermo, knob, heartEKG, person, kid, baby, elder, runner,
    POS, body, beam, scene, bone, remodel, joint, spine, posture, sarc, tunnel, tscale, riseBar, bars, chip, row, quad, hipZoom, handZoom, kneeZoom, shrink };
})();
