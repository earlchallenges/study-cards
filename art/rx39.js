/* Pharmacology rx39-adrenal art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 39 adrenal drugs. Everything lives inside one function so the little shape helpers
   below never clash with the other art files. */
(() => {
  // extra motions for this page; each class name contains "a-" so it counts as animation,
  // and the shared ".pic.mystery * { animation: none }" rule still freezes them on the card front
  const STY = `<style>
.pic .a-r39-needle{transform-box:view-box;animation:r39n 3.2s ease-in-out infinite alternate}
@keyframes r39n{0%,15%{transform:rotate(var(--a0))}75%,100%{transform:rotate(var(--a1))}}
.pic .a-r39-fill{transform-box:fill-box;transform-origin:50% 100%;animation:r39f 3s ease-in-out infinite alternate}
@keyframes r39f{0%,10%{transform:scaleY(var(--f0,.2))}80%,100%{transform:scaleY(1)}}
.pic .a-r39-wipe{transform-box:fill-box;transform-origin:0% 50%;animation:r39w 3.6s ease-in-out infinite}
@keyframes r39w{0%{transform:scaleX(0)}70%,100%{transform:scaleX(1)}}
.pic .a-r39-draw{stroke-dasharray:var(--L,600);animation:r39d 3.4s linear infinite}
@keyframes r39d{0%{stroke-dashoffset:var(--L,600)}75%,100%{stroke-dashoffset:0}}
.pic .a-r39-shrink{transform-box:fill-box;transform-origin:center;animation:r39s 3s ease-in-out infinite alternate}
@keyframes r39s{0%,15%{transform:scale(1.15)}85%,100%{transform:scale(.72)}}
.pic .a-r39-open{transform-box:fill-box;transform-origin:center;animation:r39o 3s ease-in-out infinite alternate}
@keyframes r39o{0%,15%{transform:scaleX(.35)}85%,100%{transform:scaleX(1)}}
.pic .a-r39-jawT{animation:r39jt .5s ease-in-out infinite alternate}
@keyframes r39jt{from{transform:rotate(-28deg)}to{transform:rotate(0deg)}}
.pic .a-r39-jawB{animation:r39jb .5s ease-in-out infinite alternate}
@keyframes r39jb{from{transform:rotate(28deg)}to{transform:rotate(0deg)}}
.pic .a-r39-eat{animation:r39e 1.5s linear infinite}
@keyframes r39e{0%{transform:translateX(0);opacity:1}80%{opacity:1}100%{transform:translateX(-22px);opacity:0}}
.pic .a-r39-heap{transform-box:fill-box;transform-origin:50% 100%;animation:r39h 3s ease-in-out infinite alternate}
@keyframes r39h{0%,10%{transform:scale(.5)}85%,100%{transform:scale(1)}}
</style>`;
  const A = inner => ART(STY + inner);

  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" stroke-width="1" stroke-dasharray="2 3"/>`;
  const AR = (d, c = 'warn', w = 2.5) => `<path class="s-${c} a-flow" d="${d}" stroke-width="${w}"/>`;
  const head = (x, y, rot, c = 'warn') => `<path transform="translate(${x} ${y}) rotate(${rot})" d="M-5 -5 L3 0 L-5 5 Z" fill="var(--c-${c})" stroke="var(--art-line)" stroke-width="1"/>`;

  // kidney with its adrenal "hat" (the gland sits on top of the kidney), drawn from (x, y)
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const ADR = 'M2 4 C6 -8 22 -10 28 2 C22 4 10 5 2 4 Z';
  const adrKid = (x, y, s = 1, adrCls = 'f-pancreas', extra = '') => G(x, y, s, `<path class="f-muscle" d="${KID}"/><path class="${adrCls}" d="${ADR}"/>${extra}`);
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1, cls = 'f-mouth') => G(x, y, s, `<path class="${cls}" d="${BRAIN}"/><path class="s-line" d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" stroke-width="1.2" opacity=".6"/>`);
  const STOM = 'M12 0 L20 0 C20 8 26 10 36 8 C52 6 62 18 60 32 C58 48 42 58 24 56 C14 55 8 50 10 44 C12 40 20 42 26 40 C34 36 34 28 28 24 C20 18 12 14 12 0 Z';

  // icons centered on (x, y)
  const pill = (x, y, rot = -30, c = 'f-warn', s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const check = (x, y, d = 0) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3.5} ${y} l2.5 2.6 l4.5 -5" stroke-width="2"/></g>`;
  const drop = (x, y, s = 1, c = 'f-water') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/></g>`;
  const bottle = (x, y, c = 'f-warn', s = 1) => G(x, y, s, `<rect class="${c}" x="-9" y="-12" width="18" height="26" rx="4"/><rect class="f-white" x="-11" y="-19" width="22" height="7" rx="2"/><rect class="f-white" x="-6" y="-5" width="12" height="11" rx="1.5"/>`);
  const ivbag = (x, y) => `<g transform="translate(${x} ${y})"><path class="f-white" d="M-10 -16 H10 V8 Q10 15 3 15 H-3 Q-10 15 -10 8 Z"/><rect class="f-water noline" x="-8" y="-3" width="16" height="15" rx="2" opacity=".85"/><path class="s-line" d="M0 15 V22" stroke-width="1.5"/><path class="s-line" d="M-4 -16 V-21 H4 V-16" stroke-width="1.3"/></g>`;
  const ivdrip = (x, y) => `<g class="a-drop">${drop(x, y, .45)}</g><g class="a-drop" style="animation-delay:.8s">${drop(x, y, .45)}</g>`;
  const syringe = (x, y, rot = -35, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect class="f-white" x="-11" y="-4" width="18" height="8" rx="1.5"/><rect class="f-water" x="-4" y="-3" width="10" height="6"/><path class="s-line" d="M7 0 H16 M-11 -6 V6 M-11 0 H-17 M-17 -4 V4" stroke-width="1.6"/></g>`;
  const tube = (x, y) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-5" y="-12" width="10" height="24" rx="5"/><rect class="f-blood noline" x="-4" y="0" width="8" height="11" rx="4"/><rect class="f-germ" x="-6" y="-15" width="12" height="5" rx="1.5"/></g>`;
  const clock = (x, y, r, hr) => { const a = (hr % 12) * 30 * Math.PI / 180; return `<circle class="f-white" cx="${x}" cy="${y}" r="${r}"/>` +
    `<path class="s-line" d="M${x} ${y} L${(x + r * .5 * Math.sin(a)).toFixed(1)} ${(y - r * .5 * Math.cos(a)).toFixed(1)} M${x} ${y} L${x} ${y - r * .78}" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="1.6" fill="var(--art-line)"/>`; };
  const sun = (x, y, r = 8) => `<g transform="translate(${x} ${y})"><g class="a-spin"><path class="s-warn" d="${[0, 45, 90, 135, 180, 225, 270, 315].map(t => { const a = t * Math.PI / 180; return `M${(Math.cos(a) * (r + 3)).toFixed(1)} ${(Math.sin(a) * (r + 3)).toFixed(1)} L${(Math.cos(a) * (r + 7)).toFixed(1)} ${(Math.sin(a) * (r + 7)).toFixed(1)}`; }).join(' ')}" stroke-width="2"/></g><circle class="f-pancreas" r="${r}"/></g>`;
  const moon = (x, y, s = 1) => G(x, y, s, `<path class="f-fat" d="M4 -10 A10 10 0 1 0 10 6 A8 8 0 1 1 4 -10 Z"/>`);
  const hexP = (x, y, r) => [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k + Math.PI / 6; return (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ' ' + (y + r * Math.sin(a)).toFixed(1); }).join(' ') + 'Z';
  const glu = (x, y, r = 11) => `<path class="f-pancreas" d="${hexP(x, y, r)}"/>${T(x, y + 3.2, 'Glu', { c: 'tagtx', s: 9 })}`;
  const ion = (x, y, cls, txt, r = 9) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><text class="tagtx" x="${x}" y="${y + 3.2}" text-anchor="middle" style="font-size:9px">${txt}</text>`;
  const germ = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="s-germ" d="M7 0 q3 -3 6 0 t6 0" stroke-width="1.3"/><rect class="f-germ" x="-8" y="-4" width="16" height="8" rx="4"/></g>`;
  const yeast = (x, y) => `<g transform="translate(${x} ${y})"><circle class="f-germ" cx="-6" cy="2" r="7"/><circle class="f-germ" cx="5" cy="-4" r="5"/><circle class="f-germ" cx="11" cy="4" r="3.5"/><path class="s-germ" d="M-6 9 Q-8 16 -2 20 M5 1 Q8 12 14 14" stroke-width="1.6"/></g>`;
  const boneI = (x, y, rot = -30, holes = true) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="f-bone" d="M-12 -3 H12 A4 4 0 1 1 14 -8 A4 4 0 1 1 17 0 A4 4 0 1 1 14 8 A4 4 0 1 1 12 3 H-12 A4 4 0 1 1 -14 8 A4 4 0 1 1 -17 0 A4 4 0 1 1 -14 -8 A4 4 0 1 1 -12 -3 Z"/>${holes ? '<circle cx="-5" cy="0" r="1.4" fill="var(--art-line)"/><circle cx="2" cy="-1" r="1.1" fill="var(--art-line)"/><circle cx="7" cy="1" r="1.3" fill="var(--art-line)"/>' : ''}</g>`;
  const eye = (x, y, s = 1, cloudy = false) => G(x, y, s, `<path class="f-white" d="M-16 0 Q0 -13 16 0 Q0 13 -16 0 Z"/><circle class="f-vein" r="6"/><circle r="2.6" fill="#1d2238"/>${cloudy ? '<circle r="5.4" fill="#e6e6e6" opacity=".75"/>' : '<circle r="1.2" cx="-2" cy="-2" fill="#fff"/>'}`);
  const scale = (x, y) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-14" y="-9" width="28" height="18" rx="4"/><rect class="f-water" x="-8" y="-6" width="16" height="7" rx="1.5"/><path class="s-line" d="M0 -5 L3 -2" stroke-width="1.2"/></g>`;
  const meter = (x, y, txt) => `<g transform="translate(${x} ${y})"><rect class="f-vein" x="-11" y="-14" width="22" height="28" rx="4"/><rect class="f-white" x="-9" y="-11" width="18" height="11" rx="1.5"/><rect class="f-white" x="-2" y="14" width="4" height="5"/></g>${T(x, y - 2.5, txt, { c: 'tagtx', s: 9 })}`;
  const thermo = (x, y) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-4" y="-16" width="8" height="24" rx="4"/><circle class="f-bad" cx="0" cy="11" r="6"/><rect class="f-bad noline" x="-2" y="-10" width="4" height="20" rx="2"/></g>`;
  const calendar = (x, y, w = 22, h = 20) => `<rect class="f-white" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3"/><rect class="f-bad" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="6" rx="2"/>` +
    `<path class="s-line" d="M${x - w / 4} ${y - h / 2 - 3} V${y - h / 2 + 3} M${x + w / 4} ${y - h / 2 - 3} V${y - h / 2 + 3}" stroke-width="1.6"/>` +
    [0, 1, 2].map(c => [0, 1].map(r => `<rect x="${x - w / 2 + 3 + c * (w - 6) / 3}" y="${y - h / 2 + 9 + r * (h - 11) / 2}" width="${(w - 6) / 3 - 2}" height="${(h - 11) / 2 - 2}" fill="var(--c-water)" opacity=".5"/>`).join('')).join('');
  const shaker = (x, y) => `<g transform="translate(${x} ${y})"><path class="f-white" d="M-7 -6 Q-7 -14 0 -14 Q7 -14 7 -6 L8 12 H-8 Z"/><path class="f-scar" d="M-7 -6 Q-7 -14 0 -14 Q7 -14 7 -6 Z"/></g>${T(x, y + 7, 'NaCl', { c: 'tagtx', s: 9 })}`;

  // half-circle gauge with colored zones [[from, to, color]] (0..1) and a needle that swings v0 -> v1 on the back
  const gauge = (cx, cy, r, zones, v0, v1) => {
    const P = f => { const t = Math.PI * (1 + f); return `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`; };
    const a = v => -90 + 180 * v;
    return `<path class="f-white" d="M${cx - r - 7} ${cy} A${r + 7} ${r + 7} 0 0 1 ${cx + r + 7} ${cy} Z"/>` +
      zones.map(([f, t, c]) => `<path d="M${P(f)} A${r} ${r} 0 0 1 ${P(t)}" stroke="var(--c-${c})" stroke-width="6" fill="none"/>`).join('') +
      `<g class="a-r39-needle" style="transform-origin:${cx}px ${cy}px;transform:rotate(${a(v0)}deg);--a0:${a(v0)}deg;--a1:${a(v1)}deg"><path d="M${cx} ${cy} L${cx} ${cy - r + 2}" stroke="var(--art-line)" stroke-width="2.4" stroke-linecap="round"/></g>` +
      `<circle class="f-white" cx="${cx}" cy="${cy}" r="3.4"/>`;
  };
  const BPZ = [[0, .3, 'water'], [.3, .7, 'good'], [.7, 1, 'bad']];

  // stick figures standing on (x, y)
  const POSE = {
    walk: ['M0 -28 V-12 M0 -12 L-6 0 M0 -12 L5 0 M0 -23 L-5 -15 M0 -23 L6 -16', 0, -34],
    bent: ['M6 -21 L0 -12 M0 -12 L-4 0 M0 -12 L4 0 M5 -19 L7 -10 M5 -19 L-1 -13', 10, -25],
  };
  const fig = (x, y, pose, s = 1, headCls = 'f-skin') => { const [d, hx, hy] = POSE[pose]; return G(x, y, s, `<path class="s-line" d="${d}" stroke-width="${2.6 / s * 1.4}"/><circle class="${headCls}" cx="${hx}" cy="${hy}" r="5.5"/>`); };

  // moving bubbles with text: drawn at (20, 20) and the motion path shifted back, so the text's own box stays on-frame
  const shift = d => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - 20} ${+b - 20}`);
  const bubble = (cls, txt, path, dur, begin, r = 9) => `<g><circle class="${cls}" cx="20" cy="20" r="${r}"/><text class="tagtx" x="20" y="23.2" text-anchor="middle" style="font-size:9px">${txt}</text><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path)}"/></g>`;

  // a kidney tubule strip: urine on top, tubule cells, blood below; Na goes down into blood, K goes up into urine
  const tubule = (x, y, w, moving = true) => {
    const cells = Math.floor(w / 20);
    let s = `<rect class="f-mucus" x="${x}" y="${y}" width="${w}" height="20" rx="4" opacity=".8"/>` +
      Array.from({ length: cells }, (_, i) => `<rect class="f-skin" x="${x + i * (w / cells)}" y="${y + 20}" width="${w / cells}" height="18"/>`).join('') +
      `<rect class="f-blood" x="${x}" y="${y + 38}" width="${w}" height="20" rx="4"/>`;
    if (moving) {
      const a = x + w * .3, b = x + w * .72;
      s += `<g class="ansmotion">${bubble('f-acid', 'Na', `M${a} ${y + 10} L${a} ${y + 48}`, 2.2, 0)}${bubble('f-acid', 'Na', `M${a - 22} ${y + 10} L${a - 22} ${y + 48}`, 2.2, 1.1)}${bubble('f-good', 'K', `M${b} ${y + 48} L${b} ${y + 10}`, 2.2, .5)}</g>`;
    }
    return s;
  };

  Object.assign(PICS, {

    /* 1. Two classes: cortisol-like (puts out the fire, raises sugar) vs aldosterone-like (kidney keeps Na, loses K) */
    classes: A(`
      <path class="s-ink" d="M150 8 V176" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${qtag(75, 14, 'Glucocorticoids')}${qtag(225, 14, 'Mineralocorticoids')}
      <g class="a-r39-shrink"><path class="f-warn" d="M48 96 C30 92 28 70 40 58 C42 66 46 68 48 64 C46 52 52 40 62 34 C60 46 70 52 72 64 C76 60 76 54 74 50 C86 62 86 90 66 96 Z"/><path class="f-acid" d="M54 94 C46 88 48 78 54 72 C56 78 60 78 60 74 C66 80 68 90 60 94 Z"/></g>
      ${tag(58, 108, 'Inflammation', '', 9)}
      <g class="ans"><g class="a-rise">${glu(124, 66)}</g><g class="a-rise" style="animation-delay:.9s">${glu(116, 86, 8)}</g>${tag(112, 108, 'Sugar ↑', '', 9)}</g>
      ${qtag(75, 136, 'Cortisol-like', 10)}${qtag(75, 160, 'Anti-inflammatory', 10)}
      ${tubule(162, 34, 126)}
      ${tag(272, 30, 'Urine', '', 9)}${tag(272, 98, 'Blood', '', 9)}
      ${qtag(225, 136, 'Aldosterone-like', 10)}${qtag(225, 160, 'Hold Na, lose K', 10)}`),

    /* 2. Adrenal cortex layers from the outside in: salt, sugar, sex */
    zones: A(`
      ${tag(80, 12, 'Capsule (outside)', '', 9)}
      <circle class="f-white" cx="80" cy="96" r="74"/>
      <circle class="f-pancreas" cx="80" cy="96" r="68"/>
      <circle class="f-warn" cx="80" cy="96" r="54"/>
      <circle class="f-large" cx="80" cy="96" r="38"/>
      <circle class="f-blood" cx="80" cy="96" r="22"/>
      ${T(80, 99, 'Medulla', { c: 'on', s: 9 })}
      <g class="ans">
        <g class="a-blink"><circle class="f-white" cx="19" cy="96" r="5"/></g>
        <g class="a-blink" style="animation-delay:.45s"><path class="f-pancreas" d="${hexP(34, 96, 6)}"/></g>
        <g class="a-blink" style="animation-delay:.9s"><circle class="f-germ" cx="50" cy="96" r="5"/></g>
        <path class="s-white a-flow" d="M128 52 L170 38 M126 80 L170 86 M108 116 L170 134" stroke-width="1.6"/>
      </g>
      ${L('M128 52 L170 38 M126 80 L170 86 M108 116 L170 134')}
      ${qtag(232, 30, 'Zona glomerulosa', 9.5)}${qtag(232, 48, 'Aldosterone (salt)', 9.5)}
      ${qtag(232, 80, 'Zona fasciculata', 9.5)}${qtag(232, 98, 'Cortisol (sugar)', 9.5)}
      ${qtag(232, 130, 'Zona reticularis', 9.5)}${qtag(232, 148, 'Androgens (sex)', 9.5)}
      ${tag(232, 170, 'Outside → in: G, F, R', 'ans', 9)}`),

    /* 3. Cortisol's daily rhythm: the curve peaks early morning, so the pill goes with breakfast */
    rhythm: A(`
      <g class="ans"><rect class="f-pancreas noline" x="51" y="20" width="64" height="118" opacity=".3"/></g>
      <path class="s-ink" d="M30 18 V138 H286" stroke-width="1.5"/>
      ${T(36, 14, 'Cortisol', { a: 'start', s: 9 })}
      ${[[30, '12a'], [94, '6a'], [157, '12p'], [221, '6p'], [280, '12a']].map(([x, t]) => `<path class="s-ink" d="M${x} 138 v4" stroke-width="1.2"/>${T(x, 152, t, { s: 9 })}`).join('')}
      ${moon(272, 34)}
      <g class="ans">
        <path class="s-bad a-r39-draw" style="--L:320" d="M30 124 C42 122 48 116 56 104 C68 80 78 44 100 34 C116 28 126 48 140 64 C160 86 190 104 230 116 C252 122 270 126 286 124" stroke-width="3.2"/>
        <g class="a-pop" style="--d:3">${sun(100, 18, 6)}</g>
        <g class="a-pop" style="--d:5">${pill(116, 120, -30, 'f-good', 1.2)}</g>
      </g>
      ${qtag(186, 40, 'Peak 2–8 a.m.')}${qtag(150, 170, 'Give in the morning')}`),

    /* 4. Where the HPA chain breaks: hypothalamus (tertiary), pituitary (secondary), adrenal (primary) */
    insuff: A(`
      ${brain(18, 28, 1.15)}
      <path class="s-line" d="M140 62 V48" stroke-width="2"/><circle class="f-pancreas" cx="140" cy="64" r="9"/>
      ${adrKid(232, 34, 1.2)}
      ${AR('M76 46 L126 46')}${head(128, 46, 0)}${AR('M152 64 L222 46')}${head(224, 45, -15)}
      ${tag(101, 34, 'CRH', '', 9)}${tag(188, 38, 'ACTH', '', 9)}
      ${tag(46, 82, 'Hypothalamus', '', 9)}${tag(140, 86, 'Pituitary', '', 9)}${tag(252, 96, 'Adrenal', '', 9)}
      <g class="ans">
        <g class="a-blink"><path class="s-bad" d="M238 26 l18 10 M256 26 l-18 10" stroke-width="3"/></g>
        <g class="a-blink" style="animation-delay:.5s"><path class="s-bad" d="M134 58 l12 12 M146 58 l-12 12" stroke-width="2.6"/></g>
        <g class="a-blink" style="animation-delay:1s"><path class="s-bad" d="M38 40 l14 12 M52 40 l-14 12" stroke-width="2.6"/></g>
      </g>
      ${qtag(46, 108, 'Tertiary')}${qtag(140, 108, 'Secondary')}${qtag(252, 118, 'Primary')}
      ${tag(150, 148, 'Primary: cortisol AND aldosterone low', 'ans', 9)}
      ${tag(150, 168, 'Secondary: low ACTH, mainly cortisol low', 'ans', 9)}`),

    /* 5. Signs of adrenal insufficiency around a tired patient */
    insuffSx: A(`
      <path class="s-ink" d="M118 152 H182" stroke-width="1.5"/>
      <g class="a-sway">${fig(146, 152, 'bent', 2)}</g>
      <g class="ans">
        <circle cx="166" cy="98" r="2.4" fill="var(--c-stool)"/><circle cx="172" cy="104" r="1.8" fill="var(--c-stool)"/><circle cx="160" cy="104" r="1.6" fill="var(--c-stool)"/>
        <g class="a-blink">${T(190, 86, 'z', { s: 12 })}${T(198, 78, 'z', { s: 10 })}</g>
        <g class="a-pop" style="--d:0">${T(94, 24, 'Zzz', { s: 11 })}</g>
        <g class="a-pop" style="--d:1">${shaker(94, 76)}</g>
        <g class="a-pop" style="--d:2">${scale(94, 128)}</g>
        ${gauge(214, 30, 14, BPZ, .5, .12)}
        <g class="a-pop" style="--d:3">${ion(204, 76, 'f-acid', 'Na')}<path class="s-bad" d="M204 88 v6" stroke-width="2"/>${ion(226, 76, 'f-good', 'K')}</g>
        <g class="a-pop" style="--d:4">${glu(214, 124, 10)}</g>
      </g>
      ${qtag(46, 24, 'Weak, tired', 9.5)}${qtag(46, 76, 'Salt craving', 9.5)}${qtag(46, 128, 'Weight loss', 9.5)}
      ${qtag(262, 30, 'Low BP', 9.5)}${qtag(264, 76, 'Na ↓  K ↑', 9.5)}${qtag(262, 124, 'Low sugar', 9.5)}
      ${qtag(150, 170, 'Patchy dark skin', 9.5)}`),

    /* 6. Diagnosis: morning cortisol is low; ACTH level tells the type */
    insuffDx: A(`
      ${clock(28, 36, 13, 8)}${tube(62, 36)}${tag(46, 62, '8 a.m. blood draw', '', 9)}
      <rect class="f-white" x="30" y="76" width="34" height="74" rx="4"/>
      <g class="ans"><rect class="f-bad a-r39-fill" style="--f0:2.5" x="30" y="132" width="34" height="18" rx="4"/></g>
      ${tag(47, 162, 'Cortisol', '', 9)}
      <path class="s-ink" d="M98 10 V176" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${tag(198, 14, 'ACTH tells the type', '', 10)}
      <rect class="f-white" x="138" y="40" width="34" height="96" rx="4"/>
      <rect class="f-white" x="228" y="40" width="34" height="96" rx="4"/>
      <g class="ans">
        <rect class="f-warn a-r39-fill" style="--f0:.25" x="138" y="48" width="34" height="88" rx="4"/>
        <rect class="f-water a-r39-fill" style="--f0:2" x="228" y="112" width="34" height="24" rx="4"/>
        ${tag(155, 30, 'High', '', 9)}${tag(245, 30, 'Low/normal', '', 9)}
      </g>
      ${qtag(155, 150, 'Primary')}${qtag(245, 150, 'Secondary')}
      ${tag(155, 170, 'Gland broken', 'ans', 9)}${tag(245, 170, 'Pituitary low', 'ans', 9)}
      ${qtag(47, 112, 'Low', 10)}`),

    /* 7. Addison: immune cells attack the adrenal; replace both hormones for life */
    addison: A(`
      ${adrKid(26, 56, 1.8)}
      <g class="ans">
        <g class="a-bob"><circle class="f-immune" cx="28" cy="36" r="7"/><circle class="f-white noline" cx="26" cy="34" r="2"/></g>
        <g class="a-bob" style="animation-delay:.6s"><circle class="f-immune" cx="72" cy="30" r="7"/><circle class="f-white noline" cx="70" cy="28" r="2"/></g>
        <g class="a-bob" style="animation-delay:1.2s"><circle class="f-immune" cx="88" cy="50" r="6"/><circle class="f-white noline" cx="86" cy="48" r="1.8"/></g>
        <g class="a-blink"><path class="s-bad" d="M40 46 l4 4 M56 44 l2 5 M66 48 l-3 4" stroke-width="2"/></g>
      </g>
      ${qtag(56, 150, 'Usually autoimmune', 9.5)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${pill(172, 40, -20, 'f-warn', 2)}</g>
        ${T(206, 46, '+', { s: 18 })}
        <g class="a-pop" style="--d:1">${pill(242, 40, -20, 'f-water', 2)}</g>
        <path class="s-good a-r39-draw" style="--L:200" d="M207 144 C195 130 175 130 175 144 C175 158 195 158 207 144 C219 130 239 130 239 144 C239 158 219 158 207 144 Z" stroke-width="4"/>
      </g>
      ${qtag(170, 72, 'Hydrocortisone', 9.5)}${qtag(244, 100, 'Fludrocortisone', 9.5)}
      ${tag(170, 86, 'gluco', 'ans', 9)}${tag(244, 114, 'mineralo', 'ans', 9)}
      ${qtag(207, 168, 'Lifelong')}`),

    /* 8. Adrenal crisis: steroids stopped, sleeping gland, BP crashes; IV hydrocortisone + fluids */
    crisis: A(`
      ${bottle(34, 46, 'f-warn', 1.1)}
      <g class="ans"><g class="a-pop">${nope(34, 46, 17)}</g></g>
      ${AR('M60 46 L88 46')}${head(90, 46, 0)}
      ${adrKid(104, 30, 1.1, 'f-scar')}
      <g class="ans"><g class="a-blink">${T(146, 30, 'z', { s: 11 })}${T(154, 22, 'z', { s: 9 })}</g></g>
      ${AR('M158 50 L182 50')}${head(184, 50, 0)}
      ${gauge(226, 62, 24, BPZ, .5, .04)}${T(226, 76, 'BP', { s: 9 })}
      ${qtag(52, 84, 'Stopped suddenly', 9.5)}${qtag(124, 104, 'HPA suppressed', 9.5)}${qtag(228, 96, 'Shock, collapse', 9.5)}
      <path class="s-ink" d="M10 114 H290" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${ivbag(40, 140)}<g class="ans">${ivdrip(40, 166)}</g>
      ${syringe(80, 146, -30)}
      ${qtag(190, 136, 'IV hydrocortisone + fluids')}
      ${tag(190, 160, 'Emergency: treat now', 'ans a-blink', 9.5)}`),

    /* 9. Taper: slow steps let the sleeping adrenal wake up; a sudden stop causes crisis */
    taper: A(`
      ${tag(70, 12, 'On steroids 3+ weeks', '', 9)}
      <path class="s-ink" d="M30 22 V128 H288" stroke-width="1.5"/>
      ${T(18, 76, 'Dose', { s: 9 })}${T(270, 140, 'Time', { s: 9 })}
      <g class="ans">
        <path class="s-bad a-r39-draw" style="--L:200" d="M30 40 H72 V126" stroke-width="3" stroke-dasharray="5 4"/>
        <path class="s-good a-r39-draw" style="--L:420" d="M30 40 H110 V62 H150 V84 H190 V104 H230 V124 H284" stroke-width="3.5"/>
        <g class="a-blink">${nope(72, 112, 9)}</g>
        <g class="a-grow">${adrKid(250, 24, .9)}</g>${check(282, 34, 4)}
      </g>
      ${qtag(150, 44, 'Taper slowly')}${qtag(72, 152, 'Sudden stop: crisis', 9.5)}
      ${qtag(214, 160, 'HPA axis suppressed')}`),

    /* 10. Cushing: too much cortisol body changes */
    cushing: A(`
      <g class="a-pulse">
        <ellipse class="f-skin" cx="168" cy="58" rx="13" ry="9"/>
        <ellipse class="f-skin" cx="150" cy="100" rx="32" ry="36"/>
        <circle class="f-skin" cx="150" cy="38" r="20"/>
      </g>
      <circle cx="143" cy="34" r="2" fill="var(--art-line)"/><circle cx="157" cy="34" r="2" fill="var(--art-line)"/>
      <path class="s-line" d="M144 45 Q150 49 156 45" stroke-width="1.5"/>
      <circle cx="136" cy="42" r="4" fill="var(--c-bad)" opacity=".5"/><circle cx="164" cy="42" r="4" fill="var(--c-bad)" opacity=".5"/>
      <path class="s-line" d="M120 82 L104 118 M180 82 L196 118 M140 134 L136 172 M160 134 L164 172" stroke-width="4"/>
      <g class="ans">
        <g class="a-pop" style="--d:1"><path d="M136 100 q4 8 2 18 M146 104 q4 8 2 16 M158 100 q4 8 2 18" stroke="var(--c-germ)" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>
        <g class="a-pop" style="--d:2"><ellipse cx="190" cy="104" rx="6" ry="4" fill="var(--c-germ)" opacity=".75"/></g>
        <g class="a-pop" style="--d:3">${pill(20, 168, -20, 'f-warn', 1.1)}</g>
      </g>
      ${L('M104 30 L128 34 M206 52 L182 56 M104 96 L122 96 M206 104 L196 104 M206 140 L192 118 M104 140 L130 158')}
      ${qtag(56, 30, 'Moon face', 9.5)}${qtag(248, 52, 'Buffalo hump', 9.5)}
      ${qtag(56, 96, 'Truncal obesity', 9.5)}${qtag(248, 104, 'Bruising', 9.5)}
      ${qtag(248, 140, 'Purple striae', 9.5)}${qtag(56, 140, 'Thin limbs', 9.5)}
      ${qtag(248, 168, 'High glucose + BP', 9)}
      ${tag(92, 168, 'Often steroid drugs', 'ans', 9)}`),

    /* 11. Conn: an adenoma pumps out aldosterone; kidney holds Na, dumps K; BP climbs; spironolactone blocks */
    conn: A(`
      ${adrKid(16, 44, 1.4)}
      <circle class="f-tumor" cx="38" cy="36" r="9"/>
      <g class="ans">
        <g class="a-pulse"><circle class="f-tumor" cx="38" cy="36" r="9"/></g>
        <path class="s-acid a-flow" d="M50 34 C70 26 84 30 92 40" stroke-width="3"/>
      </g>
      ${tubule(96, 30, 110)}
      <g class="ans"><g class="a-pop" style="--d:2">${pill(150, 104, 0, 'f-good', 1.3)}</g></g>
      ${gauge(254, 60, 24, BPZ, .5, .95)}${T(254, 76, 'BP', { s: 9 })}
      ${qtag(150, 14, 'Too much aldosterone', 9.5)}
      ${qtag(44, 108, 'Adenoma', 9.5)}${qtag(44, 126, 'or hyperplasia', 9.5)}
      ${qtag(254, 96, 'Hypertension', 9.5)}${qtag(254, 116, 'Often low K', 9.5)}
      ${qtag(150, 146, 'Spironolactone', 10)}${qtag(150, 168, 'or surgery', 10)}`),

    /* 12. Hydrocortisone: one pill with both actions, bigger morning dose, IV in crisis */
    hydro: A(`
      ${qtag(74, 18, 'Hydrocortisone')}
      <g class="a-pulse">
        <path class="f-warn" d="M74 50 H38 A18 18 0 0 0 38 86 H74 Z"/>
        <path class="f-water" d="M74 50 H110 A18 18 0 0 1 110 86 H74 Z"/>
      </g>
      <g class="ans">${T(52, 72, 'Gluco', { c: 'on', s: 10 })}${T(97, 72, 'Mineralo', { c: 'on', s: 10 })}</g>
      ${qtag(74, 104, 'Both effects', 9.5)}
      ${qtag(74, 128, 'Drug of choice', 9.5)}
      ${tag(74, 146, 'adrenal insufficiency', '', 9)}
      <path class="s-ink" d="M150 10 V176" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${sun(186, 24, 8)}${T(254, 28, 'Later', { s: 9 })}
      <g class="ans">
        <g class="a-pop" style="--d:1">${pill(186, 58, -25, 'f-warn', 2)}</g>
        <g class="a-pop" style="--d:2">${pill(254, 58, -25, 'f-warn', 1.1)}</g>
      </g>
      ${qtag(222, 86, 'Bigger dose in a.m.', 9.5)}
      ${ivbag(186, 134)}<g class="ans">${ivdrip(186, 160)}</g>
      ${qtag(250, 140, 'IV for crisis', 9.5)}`),

    /* 13. Duration: short, intermediate, long-acting bars grow across a 72-hour axis */
    potency: A(`
      ${[['Short', 30, 30, 'f-pancreas', 'Cortisone, hydrocortisone'], ['Intermediate', 74, 90, 'f-warn', 'Prednisone, methylpred, etc.'], ['Long', 118, 180, 'f-bad', 'Dexamethasone, betamethasone']].map(([n, y, w, c, d], i) =>
        `${tag(52, y, n, '', 9.5)}<rect class="f-white" x="104" y="${y - 7}" width="184" height="14" rx="7"/>` +
        `<g class="ans"><rect class="${c} a-r39-wipe" style="animation-delay:${i * .3}s" x="106" y="${y - 5}" width="${w - 2}" height="10" rx="5"/></g>` +
        qtag(196, y + 18, d, 9)).join('')}
      <path class="s-ink" d="M106 154 H288" stroke-width="1.2"/>
      ${[[106, '0'], [136, '12 h'], [196, '36 h'], [286, '72 h']].map(([x, t]) => `<path class="s-ink" d="M${x} 154 v4" stroke-width="1.2"/>${T(Math.min(x, 278), 168, t, { s: 9 })}`).join('')}
      ${tag(46, 160, '~30x cortisol', 'ans', 9)}${tag(46, 146, 'Dexamethasone', 'ans', 9)}`),

    /* 14. At equal anti-inflammatory doses, prednisone and dexamethasone barely hold salt, so add fludrocortisone */
    noMineral: A(`
      ${tag(134, 14, 'Glucocorticoid', '', 9)}${tag(236, 14, 'Mineralocorticoid', '', 9)}
      ${[['Hydrocortisone', 40, 1], ['Prednisone', 72, .2], ['Dexamethasone', 104, 0]].map(([n, y, m], i) =>
        `${T(10, y + 4, n, { a: 'start', s: 9.5 })}<rect class="f-white" x="94" y="${y - 7}" width="80" height="14" rx="4"/><rect class="f-white" x="196" y="${y - 7}" width="80" height="14" rx="4"/>` +
        `<rect class="f-warn" x="96" y="${y - 5}" width="76" height="10" rx="3"/>` +
        `<g class="ans">${m ? `<rect class="f-water a-r39-wipe" style="animation-delay:${i * .3}s" x="198" y="${y - 5}" width="${76 * m}" height="10" rx="3"/>` : `${T(236, y + 3.5, 'none', { c: 'tagtx', s: 9 })}`}</g>`).join('')}
      ${T(150, 128, 'Same anti-inflammatory dose', { s: 9 })}
      ${q(236, 72)}${q(236, 104)}
      <g class="ans"><g class="a-pop" style="--d:3">${pill(64, 156, -20, 'f-water', 1.6)}</g>${T(96, 161, '+', { s: 16 })}</g>
      ${qtag(186, 156, 'Add fludrocortisone')}`),

    /* 15. Fludrocortisone: the one mineralocorticoid; kidney keeps Na + water; watch BP, weight, edema */
    fludro: A(`
      ${qtag(150, 14, 'The only mineralocorticoid', 10)}
      <g class="a-pulse">${pill(36, 52, -25, 'f-water', 1.8)}</g>
      ${tag(36, 76, 'Florinef', '', 9)}
      ${tubule(76, 30, 130)}
      ${qtag(252, 50, 'Addison, CAH', 9.5)}
      ${tag(244, 70, 'with hydrocortisone', 'ans', 9)}
      <path class="s-ink" d="M10 104 H290" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${gauge(46, 140, 16, BPZ, .5, .8)}
      ${scale(108, 134)}
      <path class="f-skin" d="M162 116 V140 Q162 150 172 150 H190 Q194 146 190 140 L176 136 V116 Z"/>
      <g class="ans"><g class="a-pulse"><ellipse cx="172" cy="140" rx="10" ry="6" fill="var(--c-water)" opacity=".55"/></g></g>
      ${qtag(150, 168, 'Watch BP, weight, edema', 9.5)}
      ${tag(248, 136, 'Lower dose if BP ↑', 'ans', 9)}`),

    /* 16. Dexamethasone uses: swollen brain shrinks, airway opens, chemo nausea settles, suppression test */
    dexa: A(`
      <path class="s-ink" d="M150 6 V174 M6 90 H294" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      <circle class="f-bone" cx="36" cy="44" r="27"/>
      <g class="a-r39-shrink">${brain(14, 28, .9)}</g>
      <g class="ans"><g class="a-blink"><path class="s-water" d="M14 70 q3 -4 6 0 M54 70 q3 -4 6 0" stroke-width="2"/></g></g>
      ${qtag(105, 44, 'Cerebral edema', 9)}
      <path class="f-skin" d="M162 10 H206 V80 H162 Z" opacity=".55"/>
      <path class="f-mouth" d="M168 10 Q172 44 168 80 H200 Q196 44 200 10 Z"/>
      <rect class="f-white" x="178" y="10" width="12" height="70" rx="6"/>
      <g class="ans"><rect class="f-white a-r39-open" x="172" y="10" width="24" height="70" rx="10"/></g>
      ${qtag(252, 44, 'Airway edema', 9)}
      ${ivbag(26, 128)}${G(48, 110, .55, `<path class="f-stomach" d="${STOM}"/>`)}
      <g class="ans">${ivdrip(26, 154)}<g class="a-shake">${T(92, 116, '~', { s: 14 })}</g></g>
      ${qtag(108, 150, 'Chemo nausea', 9)}
      ${tube(176, 128)}${T(196, 134, 'Cortisol', { a: 'start', s: 9 })}
      <g class="ans"><g class="a-drop"><path class="s-bad" d="M186 110 V122 M181 117 L186 123 L191 117" stroke-width="2.2"/></g></g>
      ${qtag(234, 160, 'Suppression test', 9)}`),

    /* 17. Betamethasone shot to the mother matures the baby's lungs before an early birth */
    beta: A(`
      <circle class="f-mouth" cx="74" cy="96" r="62" opacity=".5"/>
      <circle class="f-mouth" cx="74" cy="96" r="54"/>
      <ellipse class="f-skin" cx="86" cy="112" rx="26" ry="20"/>
      <circle class="f-skin" cx="58" cy="82" r="17"/>
      <path class="s-line" d="M62 128 Q50 134 46 124 M100 126 Q110 136 116 124" stroke-width="3"/>
      <circle cx="52" cy="80" r="1.8" fill="var(--art-line)"/>
      <g class="ans"><g class="a-r39-heap"><ellipse class="f-bad" cx="80" cy="106" rx="6" ry="9"/><ellipse class="f-bad" cx="94" cy="106" rx="6" ry="9"/></g></g>
      ${syringe(150, 34, 145, 1.2)}${tag(184, 18, 'Betamethasone', '', 9)}
      <g class="ans"><g class="a-drop">${drop(130, 50, .5)}</g></g>
      ${qtag(226, 50, 'Matures fetal lungs', 9.5)}
      <rect class="f-white" x="160" y="90" width="130" height="14" rx="7"/>
      <g class="ans"><rect class="f-good a-r39-wipe" x="186" y="92" width="65" height="10" rx="5"/></g>
      ${[[160, '20'], [225, '30'], [288, '40 wk']].map(([x, t]) => T(Math.min(x, 276), 118, t, { s: 9 })).join('')}
      ${qtag(220, 136, '24–34 weeks', 9.5)}${qtag(220, 160, 'Birth within 7 days', 9.5)}`),

    /* 18. Glucocorticoid side effects around the body */
    ae: A(`
      <g class="a-bob">${fig(150, 146, 'walk', 3)}</g>
      <g class="ans">
        <g class="a-pop" style="--d:0">${glu(114, 30, 10)}</g>
        <g class="a-pop" style="--d:1">${germ(114, 88, -20)}</g>
        <g class="a-pop" style="--d:2">${boneI(122, 146, -30)}</g>
        <g class="a-pop" style="--d:3">${G(176, 18, .36, `<path class="f-stomach" d="${STOM}"/>`)}<circle class="f-bad" cx="188" cy="30" r="3"/></g>
        <g class="a-pop" style="--d:4">${moon(186, 88, .9)}</g>
        <g class="a-pop" style="--d:5">${eye(172, 150, .7, true)}</g>
      </g>
      ${qtag(52, 30, 'High glucose', 9.5)}${qtag(52, 88, 'Infection risk', 9.5)}${qtag(50, 146, 'Bone + muscle loss', 9)}
      ${qtag(248, 30, 'GI ulcers', 9.5)}${qtag(248, 88, 'Mood, insomnia', 9.5)}${qtag(248, 146, 'Cataract, glaucoma', 9)}
      ${tag(150, 170, 'Also: weight gain, fluid, low K', 'ans', 9)}`),

    /* 19. Steroid-induced diabetes: glucose spikes after each meal */
    diabetes: A(`
      ${bottle(40, 54, 'f-warn', 1.3)}
      ${qtag(50, 96, 'Corticosteroids', 9.5)}
      <rect class="f-pancreas noline" x="104" y="20" width="184" height="104" opacity=".15"/>
      <path class="s-ink" d="M104 18 V124 H288" stroke-width="1.5"/>
      ${T(112, 30, 'Glucose', { a: 'start', s: 9 })}
      <path d="M104 64 H288" stroke="var(--c-warn)" stroke-width="1.2" stroke-dasharray="4 4"/>
      <path class="s-good" d="M104 104 C124 104 130 90 140 90 C150 90 156 104 170 104 C190 104 196 90 206 90 C216 90 222 104 236 104 C256 104 262 90 272 90 C280 90 284 100 288 102" stroke-width="2" stroke-dasharray="3 3"/>
      <g class="ans"><path class="s-bad a-r39-draw" style="--L:420" d="M104 96 C124 96 128 40 140 40 C152 40 156 92 170 92 C188 92 194 34 206 34 C218 34 222 86 236 86 C254 86 260 30 272 30 C282 30 286 70 288 76" stroke-width="3.2"/></g>
      ${[140, 206, 272].map(x => `<g transform="translate(${x} 136)"><ellipse class="f-white" rx="9" ry="4"/><circle class="f-food" r="3" cy="-2"/></g>`).join('')}
      ${tag(272, 150, 'meals', '', 9)}
      ${qtag(196, 162, 'Spikes after meals', 9.5)}
      ${tag(54, 128, 'More insulin needed', 'ans', 9)}${tag(54, 150, 'Check glucose often', 'ans', 9)}
      <g class="ans"><g class="a-pop" style="--d:4">${syringe(52, 168, 0)}</g></g>`),

    /* 20. Contraindications: live vaccine, systemic fungus, uncontrolled diabetes/HTN, untreated infection */
    no: A(`
      <g class="a-pulse">${pill(150, 88, -30, 'f-warn', 2.4)}</g>
      ${tag(150, 116, 'Steroid', '', 9)}
      <g transform="translate(64 34)"><rect class="f-white" x="-8" y="-12" width="16" height="24" rx="3"/><rect class="f-germ" x="-9" y="-16" width="18" height="6" rx="2"/><rect class="f-water noline" x="-6" y="0" width="12" height="10" rx="2"/></g>
      ${yeast(232, 32)}
      ${glu(52, 128, 10)}${gauge(84, 134, 12, BPZ, .5, .95)}
      ${germ(232, 128, -20)}${germ(250, 138, 30)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${nope(64, 34, 17)}</g>
        <g class="a-pop" style="--d:1">${nope(236, 34, 17)}</g>
        <g class="a-pop" style="--d:2">${nope(68, 128, 20)}</g>
        <g class="a-pop" style="--d:3">${nope(240, 132, 17)}</g>
      </g>
      ${qtag(64, 68, 'Live vaccines', 9.5)}${qtag(234, 68, 'Systemic fungus', 9.5)}
      ${qtag(70, 164, 'Uncontrolled DM, HTN', 9)}${qtag(236, 164, 'Untreated infection', 9)}`),

    /* 21. CYP3A4: inducers make more enzyme that eats the steroid (level down); inhibitors jam it (level up) */
    cyp: A(`
      <path class="s-ink" d="M150 6 V176" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${tag(75, 12, 'CYP3A4 inducers', '', 9.5)}${tag(225, 12, 'CYP3A4 inhibitors', '', 9.5)}
      ${[[30, 44], [62, 52]].map(([x, y]) => `<g class="a-r39-jawT" style="transform-origin:${x}px ${y}px"><path class="f-good" d="M${x} ${y} L${x + 12} ${y} A12 12 0 0 0 ${x - 12} ${y} A12 12 0 0 0 ${x + 12} ${y} Z" transform="rotate(0)"/></g>` +
        `<g class="a-r39-jawB" style="transform-origin:${x}px ${y}px"><path class="f-good" d="M${x} ${y} L${x + 12} ${y} A12 12 0 0 1 ${x - 12} ${y} A12 12 0 0 1 ${x + 12} ${y} Z"/></g><circle cx="${x}" cy="${y - 6}" r="1.6" fill="var(--art-line)"/>`).join('')}
      <g class="ans"><g class="a-r39-eat">${pill(100, 46, 0, 'f-warn', .9)}</g><g class="a-r39-eat" style="animation-delay:.75s">${pill(124, 54, 0, 'f-warn', .9)}</g></g>
      <g transform="translate(196 50)"><path class="f-good" d="M0 0 L12 -6 A13 13 0 1 0 12 6 Z"/><circle cx="0" cy="-7" r="1.6" fill="var(--art-line)"/></g>
      <rect class="f-scar" x="206" y="44" width="12" height="12" rx="2"/>
      <g class="ans">
        <g class="a-r39-heap">${pill(238, 60, 0, 'f-warn', .9)}${pill(258, 60, 0, 'f-warn', .9)}${pill(278, 60, 0, 'f-warn', .9)}${pill(248, 48, 0, 'f-warn', .9)}${pill(268, 48, 0, 'f-warn', .9)}${pill(258, 36, 0, 'f-warn', .9)}</g>
      </g>
      <rect class="f-white" x="20" y="74" width="110" height="12" rx="6"/><rect class="f-white" x="170" y="74" width="110" height="12" rx="6"/>
      <g class="ans">
        <rect class="f-water a-r39-wipe" x="22" y="76" width="26" height="8" rx="4"/>
        <rect class="f-bad a-r39-wipe" x="172" y="76" width="104" height="8" rx="4"/>
      </g>
      ${qtag(75, 102, 'Steroid level ↓', 9.5)}${qtag(225, 102, 'Steroid level ↑', 9.5)}
      ${qtag(75, 126, 'Phenytoin, rifampin', 9)}${qtag(75, 146, 'Carbamazepine', 9)}${qtag(75, 166, 'Barbiturates', 9)}
      ${qtag(225, 126, 'Ketoconazole', 9)}${qtag(225, 146, 'Ritonavir', 9)}${qtag(225, 166, 'Macrolides', 9)}`),

    /* 22. Beers: older adults get delirium and GI bleeds; lowest dose, shortest time */
    beers: A(`
      ${fig(54, 150, 'bent', 2.4)}
      <path class="s-scar" d="M76 104 L80 150" stroke-width="3"/>
      <path class="s-ink" d="M20 150 H100" stroke-width="1.5"/>
      ${brain(124, 14, .7)}
      <g class="ans"><g class="a-spin"><path class="s-germ" d="M141 26 m-8 0 a8 8 0 1 1 8 8 a5 5 0 1 1 -5 -5 a2 2 0 1 1 2 2" stroke-width="2"/></g></g>
      ${G(124, 54, .52, `<path class="f-stomach" d="${STOM}"/>`)}
      <g class="ans"><g class="a-drop">${drop(140, 88, .55, 'f-blood')}</g>${pill(166, 66, -30, 'f-white', .9)}</g>
      ${qtag(228, 26, 'Delirium', 9.5)}${qtag(228, 70, 'GI bleed (+ NSAIDs)', 9.5)}
      <path class="s-ink" d="M110 104 H290" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${gauge(140, 140, 16, [[0, .35, 'good'], [.35, .7, 'warn'], [.7, 1, 'bad']], .8, .12)}
      ${calendar(140, 162, 22, 16)}
      ${qtag(222, 132, 'Lowest dose', 9.5)}${qtag(222, 156, 'Shortest time', 9.5)}
      ${tag(54, 168, 'Avoid if possible', 'ans', 9)}`),

    /* 23. Monitoring checklist tiles */
    monitor: A(`
      ${[[40, 40], [113, 40], [187, 40], [260, 40], [75, 116], [150, 116], [225, 116]].map(([x, y]) => `<rect class="f-white" x="${x - 30}" y="${y - 30}" width="60" height="52" rx="8" opacity=".7"/>`).join('')}
      ${meter(40, 34, '180')}
      ${ion(113, 34, 'f-good', 'K', 12)}
      ${gauge(187, 42, 16, BPZ, .5, .75)}
      ${scale(260, 36)}
      ${boneI(75, 108, -25, true)}
      ${eye(150, 110, .9)}
      <g transform="translate(225 110)"><rect class="f-pancreas" x="10" y="-22" width="8" height="40" rx="1"/><path class="s-line" d="M10 -16 h4 M10 -8 h4 M10 0 h4 M10 8 h4" stroke-width="1"/></g>
      <g class="a-bob">${fig(210, 128, 'walk', 1)}</g>
      <g class="ans">${[[62, 18], [135, 18], [209, 18], [282, 18], [97, 94], [172, 94], [247, 94]].map(([x, y], i) => check(x, y, i)).join('')}</g>
      ${qtag(40, 64, 'Glucose', 9.5)}${qtag(113, 64, 'Potassium', 9.5)}${qtag(187, 64, 'BP', 9.5)}${qtag(260, 64, 'Weight', 9.5)}
      ${qtag(75, 140, 'Bone density', 9.5)}${qtag(150, 140, 'Eye exams', 9.5)}${qtag(225, 140, 'Child growth', 9.5)}
      ${tag(150, 168, 'Steroid monitoring', '', 9.5)}`),

    /* 24. Patient teaching: morning with food, never stop suddenly, report infection, watch for Cushing */
    teach: A(`
      <path class="s-ink" d="M150 6 V174 M6 90 H294" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      ${sun(30, 30, 9)}
      <ellipse class="f-white" cx="78" cy="44" rx="26" ry="9"/><circle class="f-food" cx="70" cy="40" r="5"/><circle class="f-fat" cx="84" cy="41" r="4"/>
      <g class="ans"><g class="a-pop" style="--d:0">${pill(110, 30, -30, 'f-warn', 1.3)}</g></g>
      ${qtag(75, 72, 'Morning, with food', 9.5)}
      <path class="f-bad" d="${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = Math.PI / 4 * k + Math.PI / 8; return (k ? 'L' : 'M') + (190 + 18 * Math.cos(a)).toFixed(1) + ' ' + (38 + 18 * Math.sin(a)).toFixed(1); }).join(' ')}Z"/>
      ${T(190, 41.5, 'STOP', { c: 'on', s: 9 })}
      <g class="ans"><g class="a-pop" style="--d:1">${nope(190, 38, 22)}</g>
        <path class="s-good a-r39-draw" style="--L:120" d="M224 20 H240 V32 H254 V44 H268 V56 H284" stroke-width="3"/></g>
      ${qtag(225, 72, 'Never stop suddenly', 9.5)}
      ${thermo(40, 124)}
      <g class="ans"><g class="a-bob">${germ(80, 116, -10)}</g><g class="a-blink">${T(110, 122, '!', { s: 16 })}</g></g>
      ${qtag(75, 158, 'Report infection', 9.5)}
      <ellipse class="f-white" cx="200" cy="124" rx="24" ry="28"/><ellipse class="f-water noline" cx="200" cy="124" rx="19" ry="23" opacity=".35"/>
      <g class="ans"><g class="a-pulse"><circle class="f-skin" cx="200" cy="124" r="15"/><circle cx="195" cy="121" r="1.6" fill="var(--art-line)"/><circle cx="205" cy="121" r="1.6" fill="var(--art-line)"/><path class="s-line" d="M195 130 Q200 133 205 130" stroke-width="1.3"/></g></g>
      ${qtag(225, 158, 'Watch for Cushing signs', 9)}`),
  });
})();
