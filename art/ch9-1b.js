/* Chapter 9 Part 1 art (b): colorful replacements for PICS, loaded after the page sets PICS.
   Cards 24-46: fluid ... aging. Front = "pic mystery" (answers hidden), back = "pic play" (animated). */
(() => {
  // outlined tube (gut, duct, vessel): dark rim + colored core
  const T = (d, col, w) => `<path d="${d}" fill="none" stroke="var(--art-line)" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:${w + 3}px"/>` +
    `<path d="${d}" fill="none" stroke="var(--c-${col})" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:${w}px"/>`;
  // moving dashes on top of a tube (shows flow direction = path direction)
  const FL = (d, col = '#fff', w = 2, cls = 'a-flow') => `<path d="${d}" class="${cls}" fill="none" stroke="${col}" stroke-linecap="round" style="stroke-width:${w}px"/>`;
  // thin dotted leader line
  const LD = d => `<path d="${d}" class="s-ink" style="stroke-width:1px" stroke-dasharray="2 3"/>`;
  const DROP = (x, y, r, cls, more = '') => `<path class="${cls}" ${more} d="M${x} ${y - r * 1.7}C${x + r * .4} ${y - r} ${x + r} ${y - r * .4} ${x + r} ${y + r * .1}A${r} ${r} 0 0 1 ${x - r} ${y + r * .1}C${x - r} ${y - r * .4} ${x - r * .4} ${y - r} ${x} ${y - r * 1.7}Z"/>`;
  const TX = (x, y, t, size = 10, cls = 'ink', anchor = 'middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" style="font-size:${size}px;font-weight:700">${t}</text>`;
  const pts = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join(' ');
  const HEX = (x, y, r, cls, more = '') => `<polygon class="${cls}" ${more} points="${pts(6, i => { const a = Math.PI / 3 * i + Math.PI / 6; return (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); })}"/>`;
  const GEAR = (x, y, r, cls) => `<polygon class="${cls}" points="${pts(32, i => { const a = Math.PI / 16 * i, rr = (i % 4 < 2) ? r : r * .74; return (x + rr * Math.cos(a)).toFixed(1) + ',' + (y + rr * Math.sin(a)).toFixed(1); })}"/>`;
  // a "?" on the front that becomes a label that pops in on the back
  const QP = (x, y, t, d = 0, size = 10.5) => q(x, y) + `<g class="a-pop" style="--d:${d}">${tag(x, y, t, 'ans', size)}</g>`;
  // something that rides along a path (back side only); shape is drawn around (0,0)
  const RIDE = (shape, path, dur, begin = 0, extra = '') => `<g class="ansmotion"><g>${shape}<animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>${extra}</g></g>`;
  const fade = dur => `<animate attributeName="opacity" values="1;1;0" keyTimes="0;.75;1" dur="${dur}s" repeatCount="indefinite"/>`;
  const GERM = (x, y, d = 0) => `<g class="a-shake" style="animation-delay:-${d}s"><path class="s-line" style="stroke-width:1.3px" d="M${x - 8} ${y}H${x + 8}M${x} ${y - 8}V${y + 8}M${x - 6} ${y - 6}L${x + 6} ${y + 6}M${x + 6} ${y - 6}L${x - 6} ${y + 6}"/><circle class="f-germ" cx="${x}" cy="${y}" r="5"/></g>`;
  const BAC = (x, y, a, d = 0, cls = 'f-good') => `<g transform="translate(${x} ${y}) rotate(${a})"><g class="a-bob" style="animation-delay:-${d}s"><path d="M11 0 q4 -4 8 0 t8 0" fill="none" stroke="var(--art-line)" style="stroke-width:1.2px"/><rect class="${cls}" x="-12" y="-5" width="24" height="10" rx="5"/></g></g>`;
  const NUM = (x, y, n) => `<circle class="f-immune" cx="${x}" cy="${y}" r="7"/><text class="on" x="${x}" y="${y + 3.4}" text-anchor="middle" style="font-size:9.5px">${n}</text>`;
  const HEART = (x, y, s, cls) => `<path class="${cls}" d="M${x} ${y + 10 * s}C${x - 12 * s} ${y + 2 * s} ${x - 14 * s} ${y - 8 * s} ${x - 6 * s} ${y - 10 * s}C${x - 2 * s} ${y - 11 * s} ${x} ${y - 8 * s} ${x} ${y - 6 * s}C${x} ${y - 8 * s} ${x + 2 * s} ${y - 11 * s} ${x + 6 * s} ${y - 10 * s}C${x + 14 * s} ${y - 8 * s} ${x + 12 * s} ${y + 2 * s} ${x} ${y + 10 * s}Z"/>`;
  // front view liver (patient's right lobe on the viewer's left), spans x 30-240, y 12-92
  const LIVER = 'M30 40 C30 18 80 10 140 14 C190 17 230 24 240 36 C232 48 200 58 172 70 C140 84 100 92 70 90 C45 88 30 66 30 40 Z';
  const liverAt = (tx, ty, s, cls = 'f-liver', inner = '') => `<g transform="translate(${tx} ${ty}) scale(${s})"><g class="${inner}"><path class="${cls}" vector-effect="non-scaling-stroke" d="${LIVER}"/></g></g>`;

  // ---- pharmacogenomics: drug level after repeated doses ----
  const curve = (D, f, x0 = 80, step = 30, n = 7, k = 1.1) => {
    let c = 0, d = `M${x0 - 4} 150`;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * step, peak = c + D, trough = peak * f;
      d += ` L${x} ${(150 - c * k).toFixed(1)} L${x + 3} ${(150 - peak * k).toFixed(1)} Q${x + 9} ${(150 - trough * k).toFixed(1)} ${x + step} ${(150 - trough * k).toFixed(1)}`;
      c = trough;
    }
    return d;
  };

  // ---- upper GI scene for CCK + secretin (front view: stomach on the viewer's right, duodenum C on the left) ----
  const STOMACH = 'M232 10 C262 4 290 22 288 52 C286 84 254 98 222 94 C200 92 184 86 172 82 L172 68 C190 70 208 68 218 58 C228 48 222 30 214 22 C218 14 224 12 232 10 Z';
  const CLOOP = 'M172 75 L120 75 Q104 75 104 91 L104 140 Q104 156 120 156 L168 156';
  const PANC = 'M114 96 C126 90 146 98 160 110 C190 116 240 108 280 104 C294 104 296 118 282 124 C240 130 190 132 160 136 C146 142 124 146 116 138 C110 126 110 106 114 96 Z';
  const PDUCT = 'M282 114 C240 118 190 122 156 124 C136 125 124 124 114 122';
  const scene = () => T('M226 0 L222 18', 'esoph', 7) + `<path class="f-stomach" d="${STOMACH}"/>` +
    `<path class="f-pancreas" d="${PANC}"/>` + T(PDUCT, 'water', 2) + T(CLOOP, 'small', 16) +
    `<rect class="f-muscle" x="168" y="68" width="6" height="14" rx="2"/>`;

  Object.assign(PICS, {

    // 24 — ~10 L/day enters the gut; ~90% absorbed in the small intestine, the rest in the colon
    fluid: ART(`
      ${DROP(40, 44, 20, 'f-water')}${TX(40, 50, '10 L', 13, 'on')}
      ${tag(40, 64, 'every day', '', 9.5)}
      ${TX(40, 84, 'drinks, food,', 9)}${TX(40, 95, 'saliva, gut juices', 9)}
      ${FL('M62 40 C110 26 180 24 198 70', 'var(--c-water)', 3)}
      ${T('M110 150 L110 62 Q110 52 120 52 L208 52 Q218 52 218 62 L218 128 C218 146 196 140 186 150 C178 156 172 160 170 172', 'large', 16)}
      <ellipse class="f-large" cx="110" cy="152" rx="12" ry="11"/>
      ${T('M198 72 C170 66 132 68 134 80 C136 92 196 84 196 98 C196 112 134 104 134 118 C134 132 190 124 186 138 C182 146 150 142 122 148', 'small', 9)}
      <g class="ans">
        ${[[152, 84, 0], [176, 96, .5], [152, 110, 1], [172, 124, 1.3], [146, 134, .8]].map(([x, y, d]) => DROP(x, y, 3.5, 'f-water a-rise', `style="animation-delay:-${d}s"`)).join('')}
        ${DROP(214, 104, 3, 'f-water a-rise', 'style="animation-delay:-.6s"')}
        ${LD('M200 96 L240 80')}${LD('M228 132 L252 138')}
        <g class="a-pulse">${DROP(264, 80, 20, 'f-water')}</g>${TX(264, 86, '~9 L', 12, 'on')}
        <g class="a-pulse">${DROP(264, 140, 8, 'f-water')}</g>${TX(264, 166, '~1 L', 10)}
      </g>
      ${LD('M98 118 L132 118')}${LD('M98 152 L100 152')}
      ${qtag(52, 118, 'Small int. 90%')}${qtag(52, 152, 'Large int. 10%')}`),

    // 25 — villi (with capillary loop + lacteal) and the microvilli brush border on each cell
    villi: ART(`
      <rect class="f-small" x="4" y="128" width="184" height="34" rx="4"/>
      <rect class="f-muscle" x="4" y="158" width="184" height="18" rx="4"/>
      ${[24, 58, 92, 126, 160].map((x, i) => `<g class="a-sway" style="animation-delay:-${i * .45}s">
        <path class="f-small" d="M${x - 12} 132 L${x - 12} 56 Q${x - 12} 42 ${x} 42 Q${x + 12} 42 ${x + 12} 56 L${x + 12} 132 Z"/>
        <path d="M${x - 7} 130 L${x - 7} 56 Q${x - 7} 50 ${x} 49" fill="none" stroke="var(--c-blood)" style="stroke-width:2.2px"/>
        <path d="M${x} 49 Q${x + 7} 50 ${x + 7} 56 L${x + 7} 130" fill="none" stroke="var(--c-vein)" style="stroke-width:2.2px"/>
        <path d="M${x} 130 L${x} 60" fill="none" stroke="var(--art-line)" style="stroke-width:5px" stroke-linecap="round"/>
        <path d="M${x} 130 L${x} 60" fill="none" stroke="var(--c-lymph)" style="stroke-width:3px" stroke-linecap="round"/></g>`).join('')}
      <g class="ans">${[[24, 22, 0], [58, 18, .5], [92, 24, 1], [126, 18, .3], [160, 22, .8]].map(([x, y, d]) => `<circle class="f-food a-drop" style="animation-delay:-${d}s" cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
      ${LD('M172 52 L206 66')}
      <circle class="f-white" cx="246" cy="94" r="48"/>
      <g class="a-sway">${pts(16, i => `<rect x="${220.5 + i * 3.3}" y="61" width="2.2" height="11" rx="1.1" fill="var(--c-small)" stroke="var(--art-line)" style="stroke-width:.6px"/>`)}</g>
      ${[0, 1, 2].map(i => `<rect class="f-small" x="${219 + i * 18}" y="72" width="18" height="60" rx="3"/><ellipse class="f-germ" cx="${228 + i * 18}" cy="112" rx="4.5" ry="7"/>`).join('')}
      <g class="ans">${[[236, 50, 0], [250, 46, .6], [262, 52, 1.1]].map(([x, y, d]) => `<circle class="f-food a-drop" style="animation-delay:-${d}s" cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>
      ${tag(92, 12, 'Villi')}${tag(246, 30, 'Microvilli')}
      ${qtag(96, 145, 'Absorb nutrients')}${qtag(246, 162, 'Bigger surface')}`),

    // 26 — Peyer patch: lymphoid follicle under a villus-free dome in the ileum wall, sampling gut germs
    peyer: ART(`
      <rect class="f-small" x="4" y="92" width="292" height="70" rx="6"/>
      <rect class="f-muscle" x="4" y="158" width="292" height="18" rx="5"/>
      ${[22, 46, 70, 230, 254, 278].map((x, i) => `<path class="f-small a-sway" style="animation-delay:-${i * .4}s" d="M${x - 9} 96 L${x - 9} 54 Q${x - 9} 44 ${x} 44 Q${x + 9} 44 ${x + 9} 54 L${x + 9} 96 Z"/>`).join('')}
      <path class="f-small" d="M86 96 Q150 40 214 96 Z"/>
      <ellipse class="f-lymph" cx="150" cy="114" rx="56" ry="34"/>
      <circle cx="150" cy="112" r="17" fill="#fff" opacity=".55"/>
      ${(() => { let s = '', k = 0; for (let y = 90; y <= 138; y += 9) for (let x = 102; x <= 198; x += 10) { if ((x - 150) ** 2 / 50 ** 2 + (y - 114) ** 2 / 29 ** 2 < 1 && !((x - 124) ** 2 + (y - 112) ** 2 < 70) && !((x - 178) ** 2 + (y - 116) ** 2 < 70)) s += `<circle class="f-immune a-pulse" style="animation-delay:-${(k++ % 7) * .23}s" cx="${x + (y % 2 ? 4 : 0)}" cy="${y}" r="3.8"/>`; } return s; })()}
      <path class="f-warn a-pulse" d="M116 106 C120 100 130 102 132 108 C138 110 134 120 128 120 C124 124 114 122 116 116 C110 112 112 106 116 106 Z"/>
      <path class="f-warn a-pulse" style="animation-delay:-.8s" d="M170 110 C174 104 184 106 186 112 C192 114 188 124 182 124 C178 128 168 126 170 120 C164 116 166 110 170 110 Z"/>
      ${GERM(20, 18, 0)}${GERM(118, 28, .2)}${GERM(196, 14, .1)}${GERM(276, 26, .3)}
      ${BAC(80, 16, -10, 0)}${BAC(232, 32, 15, .7)}
      ${RIDE(`<circle class="f-germ" r="4.5"/>`, 'M150 22 L150 66 L150 100', 3, 0, fade(3))}
      ${tag(46, 34, 'Villi', '', 9.5)}${tag(150, 76, 'Peyer patch', '', 10)}
      ${qtag(150, 144, 'Immune cells')}${qtag(236, 10, 'Watch + fight germs', 10)}`),

    // 27 — large intestine: cecum (+ appendix), colon, rectum, anus; wider than the small intestine
    large: ART(`
      ${T('M80 150 C76 164 66 168 60 162', 'large', 5)}
      ${T('M85 132 L85 52 Q85 40 97 40 L203 40 Q215 40 215 52 L215 118 C215 138 190 126 172 136 C160 143 152 140 152 150 L152 164', 'large', 20)}
      <path class="s-line" style="stroke-width:1.4px" opacity=".55" d="${[60, 74, 88, 102, 116].map(y => `M76 ${y}H94`).join('')}${[112, 128, 144, 160, 176, 192].map(x => `M${x} 31V49`).join('')}${[62, 76, 90, 104].map(y => `M206 ${y}H224`).join('')}"/>
      <ellipse class="f-large" cx="85" cy="138" rx="15" ry="14"/>
      <circle class="f-muscle" cx="152" cy="168" r="5"/>
      ${T('M180 66 C150 58 112 66 120 80 C128 94 176 86 168 104 C160 120 120 112 116 128 C114 134 108 138 100 138', 'small', 8)}
      ${RIDE(`<ellipse class="f-stool" rx="6" ry="5"/>`, 'M85 140 L85 52 Q85 40 97 40 L203 40 Q215 40 215 52 L215 118 C215 138 190 126 172 136 C160 143 152 140 152 150 L152 170', 6)}
      ${tag(146, 98, 'Small int.', '', 9)}
      ${qtag(42, 140, 'Cecum')}${qtag(150, 20, 'Colon')}${qtag(196, 156, 'Rectum')}${qtag(118, 170, 'Anus')}
      ${LD('M138 170 L146 169')}
      <g class="a-pop" style="--d:1">${tag(262, 74, '~5 ft long', 'ans', 10)}</g>
      <g class="a-pop" style="--d:2">${tag(262, 96, 'Wider tube', 'ans', 10)}</g>
      <g class="a-pop" style="--d:3">${tag(262, 118, 'No villi', 'ans', 10)}</g>`),

    // 28 — haustra: pouches gathered by the teniae coli muscle band (plus fatty epiploic tags)
    haustra: ART(`
      ${[72, 124, 176, 228].map((x, i) => `<g class="a-sway" style="animation-delay:-${i * .5}s"><ellipse class="f-fat" cx="${x + 2}" cy="${142}" rx="6" ry="9"/></g>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<ellipse class="f-large a-pulse" style="animation-delay:-${i * .32}s" cx="${46 + 52 * i}" cy="92" rx="30" ry="42"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<path d="M${32 + 52 * i} 66 Q${46 + 52 * i} 56 ${60 + 52 * i} 66" fill="none" stroke="#fff" opacity=".55" style="stroke-width:2.5px" stroke-linecap="round"/>`).join('')}
      ${[72, 124, 176, 228].map(x => `<path d="M${x} 54 Q${x - 4} 92 ${x} 130" fill="none" stroke="var(--art-line)" style="stroke-width:2px"/>`).join('')}
      <rect class="f-muscle" x="10" y="85" width="280" height="14" rx="7"/>
      <path d="M16 90 H284 M16 94 H284" fill="none" stroke="#fff" opacity=".4" style="stroke-width:1px"/>
      ${[72, 124, 176, 228].map(x => `<rect x="${x - 2}" y="83" width="4" height="18" rx="2" fill="var(--art-line)"/>`).join('')}
      ${LD('M98 39 L98 52')}${LD('M152 32 L202 52')}
      ${qtag(98, 30, 'Pouches (haustra)')}${qtag(150, 92, 'Teniae coli band')}
      ${LD('M176 154 L178 148')}${tag(176, 166, 'Fatty tags (epiploic)', '', 9)}`),

    // 29 — ileocecal valve: ileal lips poke into the cecum; open briefly for chyme, block backflow
    icv: ART(`
      ${T('M66 160 C62 172 50 176 44 170', 'large', 6)}
      <path class="f-large" d="M40 -2 L40 128 Q40 162 80 162 Q120 162 120 128 L120 -2 Z"/>
      <path d="M50 -2 L50 126 Q50 152 80 152 Q110 152 110 126 L110 -2 Z" fill="#fff" opacity=".35"/>
      <path d="M50 22 Q80 30 110 22 M50 50 Q80 58 110 50" fill="none" stroke="var(--art-line)" opacity=".35" style="stroke-width:1.5px"/>
      ${T('M300 68 C250 66 220 100 150 100 L120 100', 'small', 24)}
      <path d="M300 68 C250 66 220 100 150 100 L122 100" fill="none" stroke="#fff" opacity=".3" style="stroke-width:14px"/>
      ${RIDE(`<circle class="f-food" r="5"/>`, 'M300 68 C250 66 220 100 150 100 L100 100 C88 102 80 112 78 126', 2.8, 0, fade(2.8))}
      ${RIDE(`<circle class="f-food" r="5"/>`, 'M300 68 C250 66 220 100 150 100 L100 100 C88 102 80 112 78 126', 2.8, -1.4, fade(2.8))}
      <path class="f-muscle a-squeeze" d="M124 87 C112 87 102 92 99 99 L124 99 Z"/>
      <path class="f-muscle a-squeeze" d="M124 113 C112 113 102 108 99 101 L124 101 Z"/>
      <g class="ans">
        <path d="M78 34 C68 54 76 74 92 84" fill="none" class="s-bad" stroke-dasharray="3 3" style="stroke-width:2.5px"/>
        <g class="a-blink"><circle class="f-bad" cx="88" cy="62" r="8"/><path d="M84 58 L92 66 M92 58 L84 66" fill="none" stroke="#fff" style="stroke-width:2.4px" stroke-linecap="round"/></g>
      </g>
      ${LD('M160 124 L122 108')}${tag(180, 128, 'Valve', '', 10)}
      ${qtag(220, 38, 'Ileum (small int.)')}${qtag(80, 140, 'Cecum (large int.)')}
      <g class="a-pop" style="--d:1">${tag(80, 16, 'Blocks backflow', 'ans', 9.5)}</g>
      <g class="a-pop" style="--d:2">${tag(214, 152, 'Usually closed', 'ans', 9.5)}</g>`),

    // 30 — colon sections in order; a white trace runs ascending -> transverse -> descending -> sigmoid -> rectum
    colon: ART(`
      ${T('M64 162 C60 172 52 174 46 170', 'large', 5)}
      ${T('M70 148 L70 46 Q70 32 84 32 L216 32 Q230 32 230 46 L230 118 C230 146 200 126 184 138 C170 148 160 144 160 154 L160 168', 'large', 22)}
      <path class="s-line" style="stroke-width:1.4px" opacity=".5" d="${[62, 78, 94, 110, 126].map(y => `M60 ${y}H80`).join('')}${[104, 122, 140, 158, 176, 194].map(x => `M${x} 22V42`).join('')}${[62, 78, 94, 110].map(y => `M220 ${y}H240`).join('')}"/>
      <ellipse class="f-large" cx="70" cy="150" rx="15" ry="13"/>
      <circle class="f-muscle" cx="160" cy="172" r="4.5"/>
      <g class="ans"><path d="M70 148 L70 46 Q70 32 84 32 L216 32 Q230 32 230 46 L230 118 C230 146 200 126 184 138 C170 148 160 144 160 154 L160 168" pathLength="400" class="a-draw" fill="none" stroke="#fff" opacity=".9" stroke-linecap="round" style="stroke-width:5px"/></g>
      ${RIDE(`<ellipse class="f-stool" rx="6" ry="5"/>`, 'M70 150 L70 46 Q70 32 84 32 L216 32 Q230 32 230 46 L230 118 C230 146 200 126 184 138 C170 148 160 144 160 154 L160 172', 5.2)}
      ${tag(30, 128, 'Cecum', '', 10)}${tag(118, 168, 'Rectum', '', 10)}${LD('M140 168 L148 164')}
      ${qtag(118, 104, '1 Ascending')}${qtag(150, 13, '2 Transverse')}${qtag(178, 70, '3 Descending')}${qtag(252, 160, '4 Sigmoid')}`),

    // 31 — E. coli in the colon make vitamins K, B12, B1, B2; the colon wall absorbs them into the blood
    ecoli: ART(`
      <rect x="6" y="22" width="288" height="96" rx="12" fill="var(--c-large)" opacity=".16"/>
      <path class="f-large" d="M6 112 Q30 102 54 112 T102 112 T150 112 T198 112 T246 112 T294 112 L294 140 L6 140 Z"/>
      ${T('M8 157 L292 157', 'vein', 10)}${FL('M8 157 L292 157')}
      ${BAC(30, 48, -15, 0)}${BAC(106, 92, 12, .5)}${BAC(168, 34, 20, .9)}${BAC(232, 94, -8, .3)}${BAC(270, 44, 30, 1.2)}
      ${[[70, 62, 'K', 'f-acid'], [134, 64, 'B12', 'f-mucus'], [198, 60, 'B1', 'f-mouth'], [254, 70, 'B2', 'f-fat']].map(([x, y, t, c], i) =>
        `<g class="ans"><circle class="${c} a-pop" style="--d:${i}" cx="${x}" cy="${y}" r="13"/><text class="tagtx" x="${x}" y="${y + 4}" text-anchor="middle" style="font-size:11px">${t}</text>
        ${[0, 1].map(k => `<circle class="${c} a-drop" style="animation-delay:-${k * .8 + i * .3}s" cx="${x + (k ? 6 : -6)}" cy="${y + 34}" r="3"/>`).join('')}</g>${q(x, y, 11)}`).join('')}
      ${tag(168, 14, 'E. coli', '', 10)}${tag(36, 157, 'Blood', '', 9)}
      <g class="a-pop" style="--d:4">${tag(150, 126, 'Absorbed by the large intestine', 'ans', 9.5)}</g>`),

    // 32 — defecation reflex: stretch -> nerves fire (sacral cord) -> sphincters relax, rectum pushes; Valsalva helps
    defec: ART(`
      <path class="f-large" d="M100 4 C100 24 82 38 82 70 C82 104 94 118 106 126 L106 162 L134 162 L134 126 C146 118 158 104 158 70 C158 38 140 24 140 4 Z"/>
      <path d="M110 4 C110 26 92 40 92 70 C92 100 102 112 114 120 L116 162 L124 162 L126 120 C138 112 148 100 148 70 C148 40 130 26 130 4 Z" fill="#fff" opacity=".35"/>
      <rect class="f-nerve" x="246" y="4" width="14" height="74" rx="7"/>
      ${T('M152 64 C190 60 212 50 246 48', 'nerve', 3)}${T('M246 60 C214 82 190 126 146 142', 'nerve', 2)}
      ${RIDE(`<circle class="f-warn" r="3.5"/>`, 'M152 64 C190 60 212 50 246 48 L246 60 C214 82 190 126 146 142', 2.2)}
      <g class="q"><ellipse class="f-stool" cx="120" cy="72" rx="20" ry="26"/>
        <rect class="f-mouth" x="107" y="126" width="8" height="32" rx="3"/><rect class="f-mouth" x="125" y="126" width="8" height="32" rx="3"/>
        <rect class="f-muscle" x="96" y="134" width="10" height="34" rx="3"/><rect class="f-muscle" x="134" y="134" width="10" height="34" rx="3"/></g>
      <g class="ansmotion">
        <ellipse class="f-stool" cx="120" cy="72" rx="20" ry="26"><animateTransform attributeName="transform" type="translate" values="0 0;0 4;0 58;0 58" keyTimes="0;.35;.85;1" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;1;0" keyTimes="0;.35;.85;1" dur="4s" repeatCount="indefinite"/></ellipse>
        ${[[107, 126, 8, 32, 'f-mouth', -4], [125, 126, 8, 32, 'f-mouth', 4], [96, 134, 10, 34, 'f-muscle', -6], [134, 134, 10, 34, 'f-muscle', 6]].map(([x, y, w, h, c, dx]) =>
          `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;${dx} 0;${dx} 0;0 0" keyTimes="0;.4;.55;.85;1" dur="4s" repeatCount="indefinite"/></rect>`).join('')}
      </g>
      <g class="ans">
        <path class="s-warn a-pulse" d="M76 54 Q70 70 76 86 M164 54 Q170 70 164 86"/>
        <g class="a-pulse"><path class="s-ink" style="stroke-width:2px" d="M64 104 H80 M75 99 L80 104 L75 109 M176 104 H160 M165 99 L160 104 L165 109"/></g>
        <g class="a-drop"><path class="s-ink" style="stroke-width:2px" d="M34 26 V44 M28 38 L34 44 L40 38 M56 26 V44 M50 38 L56 44 L62 38"/></g>
      </g>
      ${tag(253, 90, 'Spinal cord', '', 9)}
      ${qtag(40, 70, '1 Stretch')}${qtag(200, 30, '2 Nerves fire')}${qtag(206, 152, '3 Sphincters open')}${qtag(48, 140, '4 Rectum pushes', 9.5)}
      <g class="a-pop" style="--d:4">${tag(46, 12, 'Valsalva helps', 'ans', 9.5)}</g>`),

    // 33 — parasympathetic speeds digestion (fast peristalsis), sympathetic slows it
    ans: ART(`
      ${[[6, 'Parasympathetic', 'Speeds it up', 32, 3, 1.6, '"Rest and digest"'], [94, 'Sympathetic', 'Slows it down', 148, 1, 9, '"Fight or flight"']].map(([top, name, eff, ang, nb, dur, motto]) => {
        const cy = top + 50, gy = top + 54, tube = `M100 ${cy} C130 ${cy - 14} 160 ${cy + 14} 190 ${cy} S250 ${cy - 14} 290 ${cy}`;
        const a = ang * Math.PI / 180, nx = 44 + 18 * Math.cos(a), ny = gy - 18 * Math.sin(a);
        return `<rect x="4" y="${top}" width="292" height="80" rx="12" fill="var(--c-mucus)" opacity=".16"/>
          <path d="M22 ${gy} A22 22 0 0 1 32 ${gy - 18.5}" fill="none" stroke="var(--c-bad)" style="stroke-width:6px"/>
          <path d="M33 ${gy - 19} A22 22 0 0 1 55 ${gy - 19}" fill="none" stroke="var(--c-warn)" style="stroke-width:6px"/>
          <path d="M56 ${gy - 18.5} A22 22 0 0 1 66 ${gy}" fill="none" stroke="var(--c-good)" style="stroke-width:6px"/>
          <g class="ans"><path d="M44 ${gy} L${nx.toFixed(1)} ${ny.toFixed(1)}" class="s-ink" style="stroke-width:3px"/></g>
          <circle class="f-white" cx="44" cy="${gy}" r="3.5"/>
          ${T(tube, 'small', 16)}
          ${[130, 190, 250].map(x => `<ellipse class="a-squeeze" style="animation-duration:${dur > 3 ? 4.5 : 1}s" cx="${x}" cy="${cy}" rx="3" ry="9" fill="none" stroke="var(--c-muscle)" stroke-width="2.5"/>`).join('')}
          ${Array.from({ length: nb }, (_, i) => RIDE(`<circle class="f-food" r="4.5"/>`, tube, dur, -i * dur / nb)).join('')}
          ${tag(64, top + 13, name)}
          <g class="a-fadein">${tag(220, top + 13, motto, 'ans', 9.5)}</g>
          ${qtag(46, top + 70, eff)}`;
      }).join('')}`),

    // 34 — key liver jobs: makes, stores, detoxifies, recycles
    liverJobs: ART(`
      ${liverAt(68, 44, .62)}
      <ellipse class="f-gall" cx="114" cy="104" rx="8" ry="11" transform="rotate(-20 114 104)"/>
      <g class="ans"><circle class="f-bile a-drop" cx="116" cy="88" r="2.5"/><circle class="f-bile a-drop" style="animation-delay:-.8s" cx="110" cy="86" r="2.5"/></g>
      ${GEAR(150, 72, 11, 'f-white a-spin')}<circle class="f-liver" cx="150" cy="72" r="3.5"/>
      ${GEAR(174, 62, 7, 'f-white a-spin')}
      ${tag(46, 12, 'It makes', '', 10)}${tag(258, 12, 'It stores', '', 10)}
      ${QP(46, 34, 'Albumin', 1, 10)}${QP(46, 56, 'Clotting factors', 2, 9)}${QP(46, 78, 'Bile', 3, 10)}${QP(46, 100, 'Glucose', 4, 10)}
      ${QP(258, 34, 'Glycogen', 5, 10)}${QP(258, 56, 'Iron', 6, 10)}${QP(258, 78, 'Vitamin B12', 7, 10)}
      <g class="ans">${FL('M100 70 L90 66', 'var(--c-good)', 3, 'a-flow')}${FL('M222 56 L212 60', 'var(--c-vein)', 3, 'a-flow')}</g>
      <g class="ans"><g class="a-shake"><rect class="f-white" x="4" y="152" width="18" height="10" rx="5"/><path class="f-bad" d="M13 152 L9 152 A5 5 0 0 0 9 162 L13 162 Z"/></g></g>
      <g class="ans"><g class="a-spin"><circle class="f-blood" cx="290" cy="158" r="8"/><circle cx="290" cy="158" r="3.5" fill="#fff" opacity=".45"/></g></g>
      ${QP(90, 158, 'Detoxes drugs + alcohol', 8, 9.5)}${QP(228, 158, 'Recycles old RBCs', 9, 9.5)}`),

    // 35 — Phase 1: CYP450 oxidizes/reduces/hydrolyzes a fat-soluble drug into a more water-soluble metabolite
    phase1: ART(`
      ${HEX(34, 58, 16, 'f-fat')}${HEX(34, 58, 8, 'f-fat')}
      ${tag(48, 88, 'Fat-soluble drug', '', 9)}
      ${FL('M56 58 L110 58', 'var(--pic-ink)', 2.5)}
      <path class="f-spleen a-pulse" d="M150 58 L122 42 A32 32 0 1 1 122 74 Z"/>
      <rect class="f-blood" x="152" y="40" width="16" height="14" rx="3"/>${TX(160, 51, 'Fe', 9, 'on')}
      ${RIDE(HEX(0, 0, 9, 'f-fat'), 'M34 58 L140 58', 2.4, 0, fade(2.4))}
      ${FL('M186 58 L210 58', 'var(--pic-ink)', 2.5)}
      <rect x="212" y="28" width="84" height="62" rx="14" fill="var(--c-water)" opacity=".35"/>
      <g class="a-bob">${HEX(246, 60, 13, 'f-fat')}
        <g class="ans"><path d="M257 52 L266 46" class="s-line" style="stroke-width:2px"/><circle class="f-mucus" cx="272" cy="42" r="9"/>${TX(272, 45.5, 'OH', 9, 'tagtx')}</g></g>
      ${qtag(140, 110, 'CYP450 enzymes')}${qtag(248, 110, 'More water soluble', 9)}
      ${q(150, 138)}
      <g class="a-pop" style="--d:1">${tag(58, 138, 'Oxidize', 'ans', 10)}</g>
      <g class="a-pop" style="--d:2">${tag(150, 138, 'Reduce', 'ans', 10)}</g>
      <g class="a-pop" style="--d:3">${tag(240, 138, 'Hydrolyze', 'ans', 10)}</g>
      <g class="ans">${TX(80, 168, 'Most important:', 9.5)}</g>
      <g class="a-pop" style="--d:4">${tag(170, 164, 'CYP3A4', 'ans', 10)}</g>
      <g class="a-pop" style="--d:5">${tag(232, 164, 'CYP2D6', 'ans', 10)}</g>`),

    // 36 — Phase 2: conjugation (e.g., glucuronic acid) makes it water soluble -> urine, or bile -> stool
    phase2: ART(`
      ${HEX(30, 50, 15, 'f-warn')}${tag(30, 78, 'Drug', '', 10)}
      ${TX(64, 56, '+', 18)}
      ${HEX(98, 50, 15, 'f-mucus')}${TX(98, 54, 'O', 11, 'tagtx')}
      ${FL('M122 50 L156 50', 'var(--pic-ink)', 2.5)}
      ${RIDE(HEX(0, 0, 10, 'f-mucus'), 'M98 50 L210 50', 2.6, 0, fade(2.6))}
      <g class="a-bob">${HEX(182, 50, 14, 'f-warn')}<rect x="194" y="47" width="6" height="6" fill="var(--art-line)"/>${HEX(210, 50, 14, 'f-mucus')}${TX(210, 54, 'O', 11, 'tagtx')}
        <g class="ans">${[[168, 28], [226, 30], [234, 66], [166, 72]].map(([x, y], i) => DROP(x, y, 3.5, 'f-water a-pop', `style="--d:${i}"`)).join('')}</g></g>
      ${qtag(139, 24, 'Conjugation')}${qtag(98, 86, 'Glucuronic acid', 9.5)}${qtag(198, 86, 'Water soluble')}
      <g class="ans">${FL('M184 98 C170 112 140 118 124 126', 'var(--c-water)', 2.5, 'a-flow-slow')}${FL('M212 98 C222 106 230 112 236 118', 'var(--c-bile)', 2.5, 'a-flow-slow')}</g>
      <path class="f-muscle" d="M104 118 C90 116 84 130 86 142 C88 156 104 160 114 152 C118 148 116 142 110 140 C106 136 108 130 114 128 C120 124 114 118 104 118 Z"/>${tag(100, 108, 'Kidney', '', 9)}${tag(240, 108, 'Gallbladder', '', 9)}
      ${T('M114 148 L118 162', 'acid', 2.5)}
      <g class="ans">${[0, 1].map(k => `<circle class="f-acid a-drop" style="animation-delay:-${k * .8}s" cx="118" cy="166" r="3"/>`).join('')}</g>
      <ellipse class="f-gall" cx="240" cy="134" rx="12" ry="17" transform="rotate(-25 240 134)"/>
      <g class="ans"><circle class="f-bile a-drop" cx="256" cy="150" r="3"/><ellipse class="f-stool" cx="282" cy="150" rx="9" ry="6"/></g>
      ${qtag(58, 140, 'Urine')}${qtag(240, 166, 'Bile → stool')}`),

    // 37 — pharmacogenomics: same dose, different genes (CYP2D6) -> poor metabolizer builds up, ultra-rapid clears too fast
    pgx: ART(`
      <g class="a-bob">
        <path d="M8 18 C8 32 34 36 34 50 C34 64 8 68 8 82 C8 96 34 100 34 114 C34 128 8 132 8 146" fill="none" stroke="var(--c-blood)" style="stroke-width:3px"/>
        <path d="M34 18 C34 32 8 36 8 50 C8 64 34 68 34 82 C34 96 8 100 8 114 C8 128 34 132 34 146" fill="none" stroke="var(--c-vein)" style="stroke-width:3px"/>
        ${[24, 34, 42, 58, 66, 76, 90, 98, 108, 122, 130, 140].map((y, i) => { const w = Math.abs(13 * Math.cos((y - 18) / 32 * Math.PI)); return `<path class="a-blink" style="animation-delay:-${i * .2}s" d="M${21 - w} ${y} H${21 + w}" stroke="${['var(--c-good)', 'var(--c-acid)', 'var(--c-mouth)', 'var(--c-mucus)'][i % 4]}" style="stroke-width:3px"/>`; }).join('')}
      </g>
      ${tag(34, 166, 'CYP2D6 gene', '', 9)}
      <rect x="74" y="18" width="218" height="32" fill="var(--c-bad)" opacity=".22"/>
      <rect x="74" y="50" width="218" height="60" fill="var(--c-good)" opacity=".25"/>
      <rect x="74" y="110" width="218" height="40" fill="var(--c-warn)" opacity=".16"/>
      ${TX(70, 37, 'Toxic', 9, 'ink', 'end')}${TX(70, 83, 'Works', 9, 'ink', 'end')}${TX(70, 133, 'Too low', 9, 'ink', 'end')}
      <path class="s-ink" style="stroke-width:1.5px" d="M74 16 V150 H292"/>
      ${TX(78, 12, 'Drug level', 9, 'ink', 'start')}${TX(292, 12, 'time →', 9, 'ink', 'end')}
      <g class="ans">
        <path d="${curve(25, .8)}" pathLength="400" class="a-draw" fill="none" stroke="var(--c-bad)" stroke-linejoin="round" style="stroke-width:2.5px"/>
        <path d="${curve(40, .5)}" pathLength="400" class="a-draw" fill="none" stroke="var(--c-good)" stroke-linejoin="round" style="stroke-width:2.5px;animation-delay:.3s;stroke:#08a37b"/>
        <path d="${curve(30, .15)}" pathLength="400" class="a-draw" fill="none" stroke="var(--c-warn)" stroke-linejoin="round" style="stroke-width:2.5px;animation-delay:.6s"/>
      </g>
      ${qtag(125, 168, 'Poor → builds up', 9)}${qtag(235, 168, 'Ultra-rapid → too fast', 9)}`),

    // 38 — liver blood: hepatic artery (O2-rich, from the celiac trunk) + portal vein (nutrient-rich: splenic + superior mesenteric veins)
    blood: ART(`
      <path class="f-stomach" d="M178 66 C188 56 222 56 236 70 C250 86 240 112 214 114 C196 115 186 106 178 96 C174 88 174 74 178 66 Z"/>
      <ellipse class="f-spleen" cx="272" cy="96" rx="13" ry="24" transform="rotate(20 272 96)"/>
      <path class="f-pancreas" d="M112 124 C120 112 160 116 200 116 C230 116 250 108 262 112 C268 116 264 126 252 128 C220 132 180 132 150 136 C128 140 110 136 112 124 Z"/>
      ${T('M70 168 C70 152 108 152 108 162 C108 172 146 172 146 162 C146 152 184 152 184 166', 'small', 9)}
      ${liverAt(0, 8, 1)}
      <ellipse class="f-gall" cx="98" cy="100" rx="8" ry="11" transform="rotate(-20 98 100)"/>
      ${T('M160 98 L160 180', 'blood', 9)}
      ${T('M128 160 L128 122', 'vein', 6)}${T('M262 112 C236 120 170 120 128 120', 'vein', 6)}
      ${T('M128 122 C124 110 118 100 114 90', 'vein', 7)}
      ${T('M160 108 L134 108 Q124 108 124 98 L124 88', 'blood', 4)}
      ${FL('M128 160 L128 122 C124 110 118 100 114 92', '#fff', 2, 'a-flow-slow')}
      ${FL('M262 112 C236 120 170 120 130 120', '#fff', 2, 'a-flow-slow')}
      ${FL('M160 176 L160 108 L134 108 Q124 108 124 98 L124 90', '#fff', 1.6)}
      <g class="ans">${[[90, 50], [150, 40], [60, 60], [190, 34]].map(([x, y], i) => `<circle class="${i % 2 ? 'f-blood' : 'f-vein'} a-pop" style="--d:${i}" cx="${x}" cy="${y}" r="4"/>`).join('')}</g>
      ${HEART(284, 12, .9, 'f-blood a-beat')}
      <g class="a-pop" style="--d:2">${tag(218, 10, '25% of cardiac output', 'ans', 9)}</g>
      ${tag(268, 62, 'Spleen', '', 9)}${tag(160, 50, 'Liver', '', 10)}
      ${LD('M89 124 L124 124')}${LD('M184 146 L156 110')}
      ${qtag(52, 124, 'Portal vein')}<g class="a-pop" style="--d:3">${tag(52, 141, 'nutrient-rich', 'ans', 9)}</g>
      ${qtag(230, 148, 'Hepatic artery')}<g class="a-pop" style="--d:4">${tag(232, 166, 'oxygen-rich', 'ans', 9)}</g>`),

    // 39 — first-pass effect: gut -> portal vein -> liver destroys part of the dose; IV, patch, sublingual skip the liver
    firstpass: ART(`
      <g transform="rotate(-25 25 20)"><rect class="f-white" x="12" y="14" width="26" height="12" rx="6"/><path class="f-bad" d="M25 14 L18 14 A6 6 0 0 0 18 26 L25 26 Z"/></g>
      ${tag(26, 42, 'Swallowed', '', 9)}
      ${FL('M28 52 L36 100', 'var(--c-food)', 2.5)}
      ${T('M14 116 C14 104 60 104 60 116 C60 128 16 128 16 140 C16 152 62 152 62 140', 'small', 9)}
      ${tag(40, 166, 'Gut absorbs', '', 9)}
      ${T('M64 134 C92 132 98 100 110 66', 'vein', 7)}${FL('M64 134 C92 132 98 100 110 70', '#fff', 2, 'a-flow-slow')}
      ${tag(54, 92, 'Portal vein', '', 9)}
      ${liverAt(56, 20, .55, 'f-liver', 'a-pulse')}
      ${T('M176 48 C192 48 200 52 208 56', 'vein', 5)}
      ${HEART(222, 60, 1.5, 'f-blood a-beat')}
      ${tag(266, 60, 'To body', '', 10)}
      ${[0, 1, 2].map(i => RIDE(`<circle class="f-warn" r="3.5"/>`, 'M64 134 C92 132 98 100 110 66 L140 52', 3, -i, fade(3))).join('')}
      ${[0, 1].map(i => RIDE(`<circle class="f-warn" r="3.5"/>`, 'M64 134 C92 132 98 100 110 66 L176 48 C192 48 200 52 218 60', 3, -i * 1.5 - .5)).join('')}
      <g class="ans">${[[136, 40], [150, 56], [124, 52]].map(([x, y], i) => `<path class="f-acid a-blink" style="animation-delay:-${i * .4}s" d="M${x} ${y - 5} L${x + 1.5} ${y - 1.5} L${x + 5} ${y} L${x + 1.5} ${y + 1.5} L${x} ${y + 5} L${x - 1.5} ${y + 1.5} L${x - 5} ${y} L${x - 1.5} ${y - 1.5} Z"/>`).join('')}</g>
      ${qtag(160, 88, 'Liver breaks some down', 9.5)}
      <g class="ans">
        ${FL('M158 126 L210 80', 'var(--c-blood)', 2.5)}${FL('M205 126 L220 82', 'var(--c-blood)', 2.5)}${FL('M262 126 L232 80', 'var(--c-blood)', 2.5)}
        <g class="a-pop" style="--d:1"><rect class="f-white" x="140" y="132" width="26" height="9" rx="2"/><path class="s-line" style="stroke-width:1.5px" d="M134 136.5 H140 M166 136.5 H176"/><rect class="f-blood" x="142" y="134" width="12" height="5"/></g>
        <g class="a-pop" style="--d:2"><rect class="f-skin" x="194" y="128" width="22" height="16" rx="4"/><circle cx="205" cy="136" r="3" fill="var(--c-warn)"/></g>
        <g class="a-pop" style="--d:3"><path class="f-mouth" d="M250 132 Q262 124 274 132 Q274 146 262 146 Q250 146 250 132 Z"/><circle class="f-white" cx="262" cy="134" r="3"/></g>
        ${tag(155, 160, 'IV', '', 10)}${tag(205, 160, 'Patch', '', 10)}${tag(262, 160, 'Under tongue', '', 9)}
        <g class="a-pop" style="--d:4">${tag(236, 106, 'Skip the liver', '', 9.5)}</g>
      </g>
      ${q(155, 137)}${q(205, 137)}${q(262, 137)}`),

    // 40 — up to 75% of the liver can be lost and regrow, because hepatocytes divide
    regen: ART(`
      ${tag(50, 22, 'Healthy', '', 10)}
      ${liverAt(-4, 35, .4)}
      ${FL('M96 56 L110 56', 'var(--pic-ink)', 2.5)}
      <g transform="translate(100 35) scale(.4)"><path d="${LIVER}" fill="none" class="s-ink" vector-effect="non-scaling-stroke" stroke-dasharray="3 3" style="stroke-width:1.4px"/>
        <g class="ans"><path class="f-liver" vector-effect="non-scaling-stroke" d="M162 15.5 C195 17 230 24 240 36 C232 48 200 58 172 70 C168 72 165 73 162 74 Z"/></g></g>
      ${qtag(154, 22, 'Up to 75% lost')}
      ${FL('M200 56 L214 56', 'var(--pic-ink)', 2.5)}
      <g transform="translate(202 35) scale(.4)"><g class="a-grow"><path class="f-liver" vector-effect="non-scaling-stroke" d="${LIVER}"/></g></g>
      <g class="a-pop" style="--d:3">${tag(256, 22, 'Regrows', 'ans', 10)}</g>
      ${(() => { const cell = (x, y, d) => `<g class="a-pop" style="--d:${d}"><rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="5" fill="#d9707c" stroke="var(--art-line)" style="stroke-width:1.5px"/><circle class="f-white" cx="${x}" cy="${y}" r="3.5"/></g>`;
        return cell(30, 133, 0) + FL('M44 133 L58 133', 'var(--pic-ink)', 2) + cell(76, 121, 1) + cell(76, 145, 1) + FL('M90 133 L104 133', 'var(--pic-ink)', 2) +
          [[122, 121], [146, 121], [122, 145], [146, 145]].map(([x, y]) => cell(x, y, 2)).join(''); })()}
      ${qtag(225, 133, 'Hepatocytes divide', 9.5)}
      ${tag(150, 168, 'liver cells', '', 9)}`),

    // 41 — bile: made by hepatocytes, bile salts emulsify fat (+ A, D, E, K), recycled at the end of the ileum
    bile: ART(`
      <circle class="f-fat" cx="36" cy="52" r="24"/>${TX(36, 56, 'Fat', 11, 'tagtx')}
      ${FL('M64 52 L80 52', 'var(--pic-ink)', 2.5)}
      <g class="ans">${[[98, 34, 'A'], [126, 40, 'D'], [100, 66, 'E'], [128, 72, 'K']].map(([x, y, t], i) => `<g class="a-pop" style="--d:${i}"><circle class="f-fat" cx="${x}" cy="${y}" r="9"/>${pts(8, k => `<circle class="f-bile" style="stroke-width:.8px" cx="${(x + 11.5 * Math.cos(k * Math.PI / 4)).toFixed(1)}" cy="${(y + 11.5 * Math.sin(k * Math.PI / 4)).toFixed(1)}" r="2.3"/>`)}${TX(x, y + 3.5, t, 9.5, 'tagtx')}</g>`).join('')}</g>
      ${q(112, 54)}
      ${qtag(66, 108, 'Emulsifies fat')}${qtag(70, 132, 'Absorb fat + A, D, E, K', 10)}
      ${liverAt(158, 14, .5)}
      ${T('M205 56 L205 108', 'bile', 4)}
      <ellipse class="f-gall" cx="194" cy="76" rx="6" ry="9" transform="rotate(20 194 76)"/>
      ${T('M180 112 L286 112', 'small', 14)}
      ${T('M286 106 C296 80 284 60 262 50', 'vein', 5)}
      ${FL('M205 56 L205 108', '#fff', 1.6)}${FL('M188 112 L284 112', 'var(--c-bile)', 3, 'a-flow-slow')}${FL('M286 106 C296 80 284 60 264 52', '#fff', 1.6, 'a-flow-slow')}
      ${[0, 1, 2].map(i => RIDE(`<circle class="f-bile" r="3.5"/>`, 'M205 58 L205 112 L284 112 C296 80 284 60 262 50', 4.5, -i * 1.5)).join('')}
      ${tag(194, 140, 'Duodenum', '', 9)}${tag(240, 84, 'Portal vein', '', 9)}
      ${qtag(222, 10, 'Liver makes 600–1,200 mL/day', 9)}${qtag(226, 162, 'Most recycled at ileum end', 9)}`),

    // 42 — gallbladder: stores + concentrates bile, squeezes it down the common bile duct when fat (CCK) arrives
    gb: ART(`
      <path class="f-liver" d="M-2 -2 L302 -2 L302 18 C260 34 220 50 180 56 C150 60 110 62 80 60 C50 58 20 50 -2 44 Z"/>
      ${tag(60, 24, 'Liver', '', 10)}
      ${T('M136 56 L150 74 M164 54 L150 74', 'bile', 4)}
      ${T('M150 74 L150 96 C156 118 178 122 194 140', 'bile', 4)}
      ${T('M132 96 C140 100 146 98 150 96', 'bile', 4)}
      <path class="f-pancreas" d="M192 122 C206 120 230 124 250 130 C272 136 292 132 298 140 C298 152 280 156 252 152 C230 150 210 158 196 152 C190 144 190 130 192 122 Z"/>
      ${T('M292 144 C260 144 222 142 194 140', 'water', 2)}
      ${T('M256 112 L196 112 Q182 112 182 126 L182 152 Q182 166 196 166 L270 166', 'small', 16)}
      <rect class="f-muscle" x="254" y="105" width="6" height="14" rx="2"/>
      <g class="a-squeeze" style="animation-duration:2.4s"><path class="f-gall" d="M64 62 C52 76 58 108 82 114 C104 120 124 108 134 96 C128 86 108 70 88 62 C78 58 70 58 64 62 Z"/></g>
      <g class="ans">${[[78, 92, 0], [96, 96, .6], [112, 88, 1.1]].map(([x, y, d]) => DROP(x, y, 3, 'f-water a-rise', `style="animation-delay:-${d}s"`)).join('')}</g>
      ${FL('M132 96 C140 100 146 98 150 96 C156 118 178 122 194 140', '#fff', 1.6)}
      ${[0, 1, 2].map(i => RIDE(`<circle class="f-fat" r="3.5"/>`, 'M256 112 L196 112 Q188 112 188 126 L188 156', 3, -i)).join('')}
      <g class="ans">${FL('M184 128 C160 140 130 130 108 116', 'var(--c-germ)', 2.5)}</g>
      ${qtag(42, 134, 'Stores bile')}${qtag(80, 158, 'Concentrates (− water)')}${qtag(232, 86, 'Squeezes for fat (CCK)', 9.5)}`),

    // 43 — exocrine acini (enzymes, bicarbonate, water -> duct -> duodenum) vs. endocrine islets (insulin -> blood)
    pancreas: ART(`
      ${T('M100 76 L56 76 Q42 76 42 90 L42 144 Q42 158 56 158 L80 158', 'small', 16)}
      <path class="f-pancreas" d="M54 100 C56 92 70 92 84 98 C120 106 180 104 230 98 C262 94 286 96 290 106 C292 116 280 120 260 120 C220 122 170 126 120 128 C90 130 66 140 56 132 C50 124 52 108 54 100 Z"/>
      ${T('M282 108 C230 110 160 114 110 116 C80 117 64 118 52 122', 'water', 2.5)}
      ${FL('M282 108 C230 110 160 114 110 116 C80 117 64 118 52 122', '#fff', 1.4)}
      <circle class="f-good" cx="220" cy="106" r="3.5"/><circle class="f-good" cx="168" cy="122" r="3"/><circle class="f-good" cx="258" cy="112" r="2.5"/>
      ${LD('M110 78 L118 110')}${LD('M222 78 L220 102')}
      <circle class="f-white" cx="100" cy="46" r="32"/>
      ${pts(7, i => { const a = i * 2 * Math.PI / 7, t = Math.PI / 7 - .04, P = (r, b) => `${(100 + r * Math.cos(b)).toFixed(1)} ${(46 + r * Math.sin(b)).toFixed(1)}`;
        return `<path class="f-pancreas" d="M${P(5, a - t)} L${P(25, a - t)} A25 25 0 0 1 ${P(25, a + t)} L${P(5, a + t)} Z"/><circle class="f-germ" style="stroke-width:.8px" cx="${(100 + 18 * Math.cos(a)).toFixed(1)}" cy="${(46 + 18 * Math.sin(a)).toFixed(1)}" r="3"/><circle class="f-warn a-blink" style="stroke-width:.6px;animation-delay:-${i * .2}s" cx="${(100 + 10 * Math.cos(a)).toFixed(1)}" cy="${(46 + 10 * Math.sin(a)).toFixed(1)}" r="1.8"/>`; })}
      ${T('M100 46 L116 74', 'water', 3)}${FL('M100 46 L116 74', '#fff', 1.4)}
      <circle cx="100" cy="46" r="5" fill="var(--c-water)"/>
      <circle class="f-white" cx="226" cy="46" r="32"/>
      ${T('M198 34 C214 24 240 62 256 48', 'blood', 4)}${FL('M198 34 C214 24 240 62 256 48', '#fff', 1.4)}
      ${[[214, 40], [224, 36], [234, 40], [210, 50], [220, 47], [230, 50], [240, 50], [216, 58], [226, 58], [236, 60], [222, 26], [244, 40]].map(([x, y], i) => `<circle class="${i > 9 || i === 3 || i === 6 ? 'f-mouth' : 'f-good'}" style="stroke-width:.8px" cx="${x}" cy="${y}" r="4.6"/>`).join('')}
      <g class="ans">${[[212, 66], [238, 70], [248, 30]].map(([x, y], i) => HEX(x, y, 3, 'f-good a-rise', `style="animation-delay:-${i * .5}s"`)).join('')}</g>
      ${tag(100, 10, 'Exocrine', '', 10)}${tag(226, 10, 'Endocrine', '', 10)}
      ${qtag(138, 146, 'Enzymes + bicarb', 10)}<g class="a-pop" style="--d:2">${tag(138, 165, 'water → duodenum', 'ans', 9)}</g>
      ${qtag(246, 146, 'Hormones: insulin', 9.5)}<g class="a-pop" style="--d:3">${tag(246, 165, '→ blood sugar', 'ans', 9)}</g>`),

    // 44 — CCK (from the duodenum when fat arrives): gallbladder squeezes, pancreas releases juice, stomach empties slower
    cck: ART(`
      <path class="f-liver" d="M-2 -2 L150 -2 C140 20 110 34 70 38 C40 40 14 36 -2 32 Z"/>
      ${scene()}
      ${T('M94 66 C112 66 118 80 118 96 L116 118', 'bile', 3)}
      <g class="a-squeeze" style="animation-duration:2.2s"><path class="f-gall" d="M36 36 C26 50 32 78 54 82 C72 86 88 76 96 66 C90 56 72 42 56 36 C48 33 40 33 36 36 Z"/></g>
      ${FL('M94 66 C112 66 118 80 118 96 L116 116', '#fff', 1.5)}${FL(PDUCT, '#fff', 1.4)}
      ${[0, 1, 2].map(i => RIDE(`<circle class="f-fat" r="3.5"/>`, 'M170 75 L120 75 Q108 75 108 91 L108 146', 3, -i)).join('')}
      ${[['M112 104 C90 100 80 92 66 70', 0], ['M116 132 C150 142 200 132 240 116', -.6], ['M118 92 C150 84 190 66 226 50', -1.2]].map(([p, b]) => RIDE(HEX(0, 0, 4.5, 'f-germ'), p, 1.8, b, fade(1.8))).join('')}
      ${HEX(140, 104, 6, 'f-germ a-pulse')}${tag(140, 89, 'CCK', '', 10)}
      ${tag(60, 140, 'Duodenum', '', 9)}
      <g class="ans"><g class="a-blink">${tag(195, 64, 'slower', '', 9)}</g></g>
      ${qtag(46, 100, 'Bile out')}${qtag(240, 40, 'Slows emptying')}${qtag(236, 148, 'Pancreatic juice out', 9.5)}`),

    // 45 — secretin (from the duodenum when acid arrives): less stomach acid, more pancreatic bicarbonate -> neutral pH
    secretin: ART(`
      ${scene()}
      <g class="ans">${[[236, 30], [258, 44], [244, 62], [268, 70]].map(([x, y], i) => `<g class="a-blink" style="animation-delay:-${i * .3}s">${TX(x, y, 'H+', 9, 'tagtx')}</g>`).join('')}</g>
      ${[0, 1, 2].map(i => RIDE(`<circle class="f-acid" r="3.5"/>`, 'M170 75 L120 75 Q108 75 108 91 L108 120', 2.4, -i * .8, fade(2.4))).join('')}
      ${[0, 1, 2].map(i => RIDE(`<circle class="f-water" r="3.5"/>`, `${PDUCT} L110 122 L110 140`, 3, -i)).join('')}
      ${[['M100 112 C80 96 90 70 140 60 C180 52 200 40 230 40', 0], ['M108 136 C150 146 200 134 250 118', -.9]].map(([p, b]) => RIDE(HEX(0, 0, 4.5, 'f-mucus'), p, 2.2, b, fade(2.2))).join('')}
      <rect x="20" y="28" width="14" height="22" fill="var(--c-good)" stroke="var(--art-line)"/>
      <rect x="20" y="50" width="14" height="22" fill="var(--c-warn)" stroke="var(--art-line)"/>
      <rect x="20" y="72" width="14" height="22" fill="var(--c-bad)" stroke="var(--art-line)"/>
      ${TX(58, 42, 'pH 7', 9)}${TX(58, 88, 'pH 2', 9)}
      <g class="q"><path class="f-white" d="M36 84 L46 79 L46 89 Z"/></g>
      <g class="ansmotion"><path class="f-white" d="M36 84 L46 79 L46 89 Z"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -44;0 -44" keyTimes="0;.3;.7;1" dur="4s" repeatCount="indefinite"/></path></g>
      ${tag(140, 104, 'Secretin', '', 9.5)}${tag(150, 54, 'Acid in', '', 9)}
      <g class="a-pop" style="--d:2">${tag(46, 112, 'Neutralized', 'ans', 9)}</g>
      ${qtag(236, 40, 'Less stomach acid', 9.5)}${qtag(234, 148, 'More bicarbonate', 9.5)}`),

    // 46 — aging gut: weak LES (reflux), less acid (B12), smaller liver (slower drugs), less Ca + lactase, slow transit
    aging: ART(`
      ${T('M30 160 L30 96 Q30 86 40 86 L130 86 Q140 86 140 96 L140 150 C140 164 120 158 108 166 L104 176', 'large', 12)}
      <ellipse class="f-large" cx="30" cy="160" rx="9" ry="9"/>
      ${T('M124 100 C100 96 50 96 50 106 C50 116 122 112 122 124 C122 136 52 128 52 142 C52 150 60 154 40 158', 'small', 7)}
      ${RIDE(`<ellipse class="f-stool" rx="5" ry="4"/>`, 'M30 160 L30 96 Q30 86 40 86 L130 86 Q140 86 140 96 L140 150 C140 164 120 158 108 166 L104 176', 16)}
      ${T('M86 0 L86 36', 'esoph', 7)}
      <path class="f-stomach" d="M84 36 C88 30 104 30 118 36 C136 44 138 66 124 74 C112 80 98 74 90 64 C86 56 84 46 84 36 Z"/>
      <rect x="81" y="32" width="10" height="5" rx="2" fill="none" stroke="var(--c-muscle)" stroke-dasharray="2 2" style="stroke-width:1.5px"/>
      <g transform="translate(0 18) scale(.42)"><path d="${LIVER}" fill="none" class="s-ink a-blink" vector-effect="non-scaling-stroke" stroke-dasharray="3 3" style="stroke-width:1.3px"/></g>
      ${liverAt(8, 24, .34)}
      <g class="ans">
        ${[0, 1, 2].map(i => `<circle class="f-acid a-rise" style="animation-delay:-${i * .6}s" cx="86" cy="${26 - i * 6}" r="2.5"/>`).join('')}
        <circle class="f-acid a-blink" cx="112" cy="54" r="2.5"/>
        ${[[70, 118], [96, 108]].map(([x, y], i) => `<circle class="f-white a-blink" style="animation-delay:-${i * .6}s" cx="${x}" cy="${y}" r="2.5"/>`).join('')}
      </g>
      ${NUM(100, 22, 1)}${NUM(126, 56, 2)}${NUM(40, 40, 3)}${NUM(86, 120, 4)}${NUM(140, 140, 5)}
      ${[['Weak LES → reflux', 22], ['Less acid → low B12', 56], ['Small liver: slow drugs', 90], ['Less calcium + lactase', 124], ['Slow gut → constipation', 158]].map(([t, y], i) =>
        NUM(158, y, i + 1) + QP(234, y, t, i, 9)).join('')}`),
  });
})();
