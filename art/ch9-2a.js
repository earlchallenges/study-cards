/* Chapter 9 Part 2 art (a): colorful replacements for PICS, loaded after the page sets PICS.
   Cards 1-25 (upper GI). Wrapped in a function so helper names never clash with ch9-2b.js. */
(() => {
  // ---------- small helpers ----------
  // outlined tube (dark edge + colored core); c = organ color name from ch9-art.css
  const T = (d, c, w = 8, cls = '') => `<path class="s-line ${cls}" d="${d}" style="stroke-width:${w + 3}px"/>` +
    `<path class="${cls}" d="${d}" fill="none" style="stroke:var(--c-${c});stroke-width:${w}px;stroke-linecap:round;stroke-linejoin:round"/>`;
  // stomach, front view (patient's left = viewer's right): GE junction at (x, y); pylorus ends near (x-35k, y+49k)
  const ST = (x, y, k = 1, cls = 'f-stomach', more = '') => `<path class="${cls}" ${more} vector-effect="non-scaling-stroke" transform="translate(${x} ${y}) scale(${k})" d="M5 0 C10 -14 32 -16 42 -2 C52 14 48 44 34 56 C20 68 -10 68 -26 58 L-36 54 L-34 44 C-20 48 -8 44 -4 34 C0 24 -6 8 -5 0 Z"/>`;
  // free text in the theme ink color
  const ink = (x, y, t, s = 9.5, cls = '', anchor = 'middle', bold = false) =>
    `<text class="ink ${cls}" x="${x}" y="${y}" text-anchor="${anchor}" style="font-size:${s}px${bold ? ';font-weight:700' : ''}">${esc(t)}</text>`;
  const dk = (x, y, t, s = 9.5) => `<text x="${x}" y="${y}" text-anchor="middle" style="font-size:${s}px;font-weight:700;fill:#1d2238">${esc(t)}</text>`;
  const ains = (x, y, t, s = 9.5) => ink(x, y, t, s, 'ans');
  const at = (x, y, t, s = 9.5) => tag(x, y, t, 'ans', s);
  const qt = (x, y, t, s = 9.5) => qtag(x, y, t, s);
  // dotted leader line
  const LD = (d, cls = '') => `<path class="s-ink ${cls}" d="${d}" style="stroke-width:1px" stroke-dasharray="2 3"/>`;
  // side-view head facing LEFT, drawn in a 0..116 x 0..120 box (nose at x 3, neck at the bottom)
  const HEAD = (o = {}) => `
    <path class="f-skin" d="M50 4 C24 4 10 22 10 42 L3 56 L11 60 L9 67 L13 71 L10 77 C11 88 20 93 30 93 L32 120 L84 120 L86 92 C108 80 116 50 104 28 C94 10 72 4 50 4 Z"/>
    <path d="M12 57 C22 50 46 50 60 54 L61 63 C46 61 26 62 14 63 Z" fill="#8a4a5a" opacity=".5"/>
    ${T('M60 58 C64 70 65 84 65 96 L66 121', 'esoph', 8)}
    ${T('M50 100 L50 121', 'mucus', 8)}
    <path class="f-mouth" d="M14 72 C26 66 44 66 54 72 C59 80 57 88 50 92 C40 94 24 88 16 80 Z"/>
    <path class="s-line" d="M13 66 L46 66 Q56 66 60 72" style="stroke-width:2.5px"/>
    <path d="M54 94 Q60 92 58 100" class="s-line" style="stroke-width:2px"/>
    ${o.noEar ? '' : '<path class="f-skin" d="M80 44 C90 40 97 50 93 60 C91 67 84 67 82 62 Z"/>'}
    ${o.eye || '<circle cx="30" cy="36" r="2.6" fill="#3b2430"/>'}`;
  // shared keyframes for a few custom motions (frozen on the front like all the others)
  const CSS = `<style>
    .pic .a-slide2a{animation:x2a-slide 4.5s ease-in-out infinite}
    @keyframes x2a-slide{0%,12%{transform:translateY(22px)}42%,82%{transform:translateY(0)}100%{transform:translateY(22px)}}
    .pic .a-wave2a{animation:x2a-wave 1.8s linear infinite}
    @keyframes x2a-wave{0%{transform:translateX(0);opacity:0}20%,75%{opacity:1}100%{transform:translateX(-46px);opacity:0}}
    .pic .a-needle2a{transform-box:view-box;animation:x2a-needle 3.2s ease-in-out infinite}
    @keyframes x2a-needle{0%,8%{transform:rotate(0deg)}45%,85%{transform:rotate(58deg)}100%{transform:rotate(0deg)}}
    .pic .a-ooze2a{animation:x2a-ooze 3s ease-in infinite}
    @keyframes x2a-ooze{0%{transform:translateY(-4px);opacity:0}25%{opacity:1}100%{transform:translateY(16px);opacity:0}}
  </style>`;
  // teeth around the upper arch for the palate view
  const teeth = (cx, top) => [-1.38, -1.12, -.86, -.6, -.36, -.12, .12, .36, .6, .86, 1.12, 1.38]
    .map(t => `<ellipse class="f-white" cx="${(cx + 36 * Math.sin(t)).toFixed(1)}" cy="${(top + 74 * (1 - Math.cos(t))).toFixed(1)}" rx="${Math.abs(t) > .9 ? 6 : 4.6}" ry="${Math.abs(t) > .9 ? 5.2 : 4.4}"/>`).join('');

  Object.assign(PICS, {
    /* 1. Two big problems: whole canal, upper part glows green (nutrition), colon glows orange (elimination) */
    twoIssues: ART(`
      <g class="ans">
        <path d="M150 14 L150 54 C160 48 190 50 196 68 C200 82 190 86 186 84 C176 100 130 96 128 108 C126 120 176 112 174 124 C172 136 126 128 126 140" fill="none" stroke="var(--c-good)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity=".3"/>
        <path d="M106 152 L106 92 Q106 86 112 86 L190 86 Q196 86 196 92 L196 140 Q196 156 176 158 L160 160 Q152 162 152 172" fill="none" stroke="var(--c-warn)" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/>
      </g>
      <ellipse class="f-mouth" cx="150" cy="14" rx="16" ry="7"/><path class="s-line" d="M137 14 Q150 19 163 14" style="stroke-width:1.5px"/>
      ${T('M150 22 L150 54', 'esoph', 7)}
      <path class="f-stomach" d="M146 52 C150 46 166 44 182 50 C202 58 204 80 188 86 C174 91 160 84 152 74 C148 68 146 60 146 52 Z"/>
      ${T('M106 152 L106 92 Q106 86 112 86 L190 86 Q196 86 196 92 L196 140 Q196 156 176 158 L160 160', 'large', 12)}
      <path d="M106 98 h-6 M106 112 h-6 M106 126 h-6 M106 140 h-6 M122 86 v-6 M142 86 v-6 M162 86 v-6 M182 86 v-6 M196 104 h6 M196 118 h6 M196 132 h6" class="s-line" style="stroke-width:1.5px"/>
      ${T('M160 160 Q152 162 152 170', 'large', 7)}
      <circle class="f-muscle" cx="152" cy="172" r="4"/>
      ${T('M186 84 C176 100 130 96 128 108 C126 120 176 112 174 124 C172 136 126 128 126 140 C126 150 116 152 110 150', 'small', 7)}
      <g class="ans">
        <circle class="f-good a-rise" cx="140" cy="112" r="3"/><circle class="f-good a-rise" cx="160" cy="120" r="3" style="animation-delay:.6s"/><circle class="f-good a-rise" cx="150" cy="134" r="3" style="animation-delay:1.2s"/>
        <ellipse class="f-stool a-drop" cx="152" cy="168" rx="3.5" ry="4.5"/>
      </g>
      <g class="ansmotion"><circle class="f-food" r="4.5"><animateMotion dur="7s" repeatCount="indefinite" path="M150 16 L150 54 C160 50 190 52 194 70 C196 82 190 84 186 84 C176 100 130 96 128 108 C126 120 176 112 174 124 C172 136 126 128 126 140 C126 150 116 152 106 150 L106 92 L190 86 L196 92 L196 140 Q196 156 176 158 L160 160 Q152 162 152 172"/></circle></g>
      ${LD('M104 34 L146 34 M104 34 L104 46 L144 64')}
      ${qt(56, 34, 'Altered nutrition', 10)}
      ${ains(56, 54, 'trouble eating,')}${ains(56, 66, 'digesting, or absorbing')}
      ${LD('M244 158 L244 172 L158 172')}
      ${qt(244, 146, 'Impaired elimination', 9.5)}
      ${ains(250, 118, 'constipation')}${ains(250, 130, 'or diarrhea')}`),

    /* 2 + 5. Cleft lip (face, gap up into the nostril) vs cleft palate (roof of mouth split, milk escapes to the nose) */
    cleft: ART(`
      <path class="s-ink" d="M150 8 L150 150" style="stroke-width:1px" stroke-dasharray="3 4"/>
      <ellipse class="f-skin" cx="75" cy="84" rx="50" ry="54"/>
      <path class="s-line" d="M50 64 Q58 69 66 64 M84 64 Q92 69 100 64" style="stroke-width:2px"/>
      <ellipse class="f-mouth noline" cx="50" cy="88" rx="8" ry="5" opacity=".6"/><ellipse class="f-mouth noline" cx="100" cy="88" rx="8" ry="5" opacity=".6"/>
      <path class="f-skin" d="M66 100 C66 86 70 78 75 78 C80 78 84 86 84 100 Z"/>
      <ellipse cx="69" cy="101" rx="4" ry="2.4" fill="#5a2a35"/><ellipse cx="82" cy="101" rx="4" ry="2.4" fill="#5a2a35"/>
      <path class="f-mouth" d="M54 118 Q62 110 70 112 Q74 111 77 112 L79 120 Q66 124 54 118 Z"/>
      <path class="f-mouth" d="M88 113 Q94 111 98 118 Q93 121 87 121 Z"/>
      <path d="M77 112 L82 101 L88 113 L87 122 L79 121 Z" fill="#5a2a35"/>
      <path class="f-mouth" d="M58 122 Q75 136 94 122 Q76 128 58 122 Z"/>
      <g class="ans">
        <path class="s-bad a-blink" d="M77 112 L82 101 L88 113 L87 122 L79 121 Z" style="stroke-width:2px"/>
        <g class="a-pulse"><path class="s-good" d="M66 92 L76 108 M98 92 L89 108" style="stroke-width:2.5px"/><path class="f-good" d="M76 108 l-6 -2 l4 -4 Z M89 108 l6 -2 l-4 -4 Z" style="stroke-width:1px"/></g>
      </g>
      <path class="f-mouth" d="M183 124 C176 70 196 36 225 36 C254 36 274 70 267 124 Q225 136 183 124 Z"/>
      <path class="s-line" d="M206 62 Q214 58 222 62 M228 62 Q236 58 244 62 M208 74 Q215 70 222 74 M228 74 Q235 70 242 74" style="stroke-width:1.2px" opacity=".55"/>
      ${teeth(225, 40)}
      <path d="M219 134 L220 66 Q225 56 230 66 L231 134 Z" fill="#5a2a35"/>
      <ellipse class="f-mouth" cx="216" cy="136" rx="4" ry="6"/><ellipse class="f-mouth" cx="234" cy="136" rx="4" ry="6"/>
      <g class="ans">
        <circle class="f-white a-rise" cx="225" cy="104" r="3.2"/><circle class="f-white a-rise" cx="225" cy="92" r="2.6" style="animation-delay:.6s"/><circle class="f-white a-rise" cx="225" cy="118" r="2.6" style="animation-delay:1.2s"/>
      </g>
      ${qt(75, 16, 'Cleft lip', 10.5)}${qt(225, 16, 'Cleft palate', 10.5)}
      ${at(75, 154, 'Males 2×')}${at(75, 172, 'Repair before 3 months')}
      ${at(225, 154, 'Females 2×')}${at(225, 172, 'Repair by 18 months')}`),

    /* 3. Cleft risk factors around an early embryo; face forms in weeks 4-9 */
    cleftRisk: ART(`
      <path class="f-mouth" d="M150 22 C188 22 200 50 196 84 C192 118 172 134 150 134 C128 134 108 118 104 84 C100 50 112 22 150 22 Z" opacity=".75"/>
      <ellipse class="f-water noline" cx="150" cy="80" rx="36" ry="42" opacity=".35"/>
      <path class="f-skin" d="M146 98 C128 98 122 80 130 68 C134 60 142 56 150 58 C160 46 178 52 176 68 C175 80 166 84 162 88 C166 98 162 110 152 112 C146 112 144 106 146 98 Z"/>
      <circle cx="164" cy="64" r="2" fill="#3b2430"/><path class="s-line" d="M170 72 Q172 76 168 78" style="stroke-width:1.5px"/>
      <path class="s-blood" d="M146 104 Q138 118 150 128" style="stroke-width:2.5px"/>
      ${q(150, 40)}
      <g class="ans"><g class="a-pulse">${tag(150, 150, 'Forms weeks 4–9', '', 9.5)}</g></g>
      <g class="ans">
        <g class="a-pop" style="--d:0"><path class="s-good" d="M40 18 C52 24 28 32 40 38 C52 44 28 50 40 56" style="stroke-width:2.5px"/><path class="s-vein" d="M60 18 C48 24 72 32 60 38 C48 44 72 50 60 56" style="stroke-width:2.5px"/><path class="s-line" d="M44 24 H56 M44 37 H56 M44 50 H56" style="stroke-width:1.2px"/></g>
        <g class="a-pop" style="--d:1"><path class="f-blood" d="M50 78 C42 90 40 96 40 100 C40 106 45 110 50 110 C55 110 60 106 60 100 C60 96 58 90 50 78 Z"/><rect x="45" y="96" width="10" height="9" rx="2" class="f-white"/></g>
        <g class="a-pop" style="--d:2"><g transform="translate(0 6) rotate(-30 50 134)"><rect x="36" y="128" width="14" height="12" rx="6" class="f-germ" style="rx:6"/><rect x="48" y="128" width="16" height="12" rx="0" class="f-white"/><path class="f-white" d="M48 128 h10 a6 6 0 0 1 0 12 h-10 Z"/></g></g>
        <g class="a-pop" style="--d:3"><rect x="236" y="32" width="44" height="8" rx="2" class="f-white"/><rect x="270" y="32" width="10" height="8" rx="1" class="f-warn"/><path class="s-scar a-rise" d="M240 28 C236 22 244 18 240 12" style="stroke-width:2px"/></g>
        <g class="a-pop" style="--d:4"><path class="f-bad" d="M250 74 L270 74 C270 86 266 92 260 92 C254 92 250 86 250 74 Z"/><path class="s-line" d="M260 92 L260 106 M252 106 H268" style="stroke-width:2px"/></g>
        <g class="a-pop" style="--d:5"><rect x="250" y="130" width="22" height="20" rx="4" class="f-warn"/><rect x="253" y="125" width="16" height="6" rx="2" class="f-white"/><path class="s-bad" d="M246 126 L276 152" style="stroke-width:2.5px"/></g>
      </g>
      ${qt(50, 66, 'Genes', 10)}${qt(50, 120, 'Maternal diabetes', 9.5)}${qt(50, 160, 'Anticonvulsants', 9.5)}
      ${qt(258, 52, 'Smoking', 10)}${qt(260, 114, 'Alcohol', 10)}${qt(258, 166, 'Low vitamins', 9.5)}`),

    /* 4. Problems from a cleft: weak suck, milk up into the nose / down the airway, ear infections, speech */
    cleftProb: ART(`
      <g transform="translate(66 26)">${HEAD()}
        <path d="M44 66 L49 66 L50 72 L45 72 Z" fill="#5a2a35"/>
        <circle class="f-bad a-pulse" cx="80" cy="54" r="5"/>
        <path class="s-line" d="M62 60 Q72 58 78 55" style="stroke-width:1.5px" stroke-dasharray="2 2"/>
      </g>
      <g transform="rotate(-8 40 98)"><rect x="8" y="88" width="46" height="20" rx="6" class="f-white"/><rect x="10" y="91" width="26" height="14" rx="4" class="f-white" style="fill:#fff7e6"/><rect x="52" y="90" width="7" height="16" rx="2" class="f-warn"/><path class="f-scar" d="M59 94 Q70 96 74 98 Q70 100 59 102 Z"/></g>
      <g class="ans">
        <path class="s-white a-flow" d="M76 98 C90 96 106 96 112 92 C114 86 112 84 110 82 L82 82" style="stroke-width:2.5px"/>
        <circle class="f-white a-drop" cx="70" cy="88" r="2.6"/>
        <path class="s-bad a-flow" d="M126 108 C124 116 118 122 116 136" style="stroke-width:2.5px"/>
      </g>
      <g class="ans a-bob"><path class="f-white" d="M200 14 h70 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-50 l-10 8 l2 -8 h-12 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 Z"/>${dk(235, 33, 'ba... ga...?', 10)}</g>
      ${LD('M60 54 L72 72')}${qt(58, 46, 'Milk out the nose', 9.5)}
      ${LD('M40 116 L40 132')}${qt(40, 140, 'Weak suck', 9.5)}
      ${LD('M118 138 L150 160')}${qt(196, 162, 'Aspiration', 9.5)}
      ${LD('M152 80 L196 86')}${qt(236, 88, 'Ear infections', 9.5)}${at(236, 108, 'hearing loss')}
      ${qt(236, 60, 'Speech delay', 9.5)}`),

    /* 6. Esophageal atresia type C: blind upper pouch + lower esophagus joined to the trachea (fistula) */
    ea: ART(`
      <rect x="102" y="12" width="18" height="14" rx="5" class="f-white"/>
      <rect x="104" y="24" width="14" height="96" rx="5" class="f-mucus"/>
      <path class="s-line" d="M104 32 H118 M104 40 H118 M104 48 H118 M104 56 H118 M104 64 H118 M104 72 H118 M104 80 H118 M104 88 H118 M104 96 H118 M104 104 H118 M104 112 H118" style="stroke-width:1px" opacity=".6"/>
      ${T('M111 118 Q104 132 86 150', 'mucus', 11)}${T('M111 118 Q118 132 136 150', 'mucus', 11)}
      <g class="a-pulse">${ST(172, 128, .6)}</g>
      ${T('M172 132 L172 100', 'esoph', 14)}
      <rect x="152" y="8" width="20" height="56" rx="10" class="f-esoph"/>
      ${T('M166 100 C150 94 136 92 118 92', 'esoph', 6)}
      <path class="s-bad" d="M162 68 L172 92" style="stroke-width:2px" stroke-dasharray="3 3"/>
      <g class="ans">
        <ellipse class="f-white" cx="162" cy="56" rx="7" ry="4" opacity=".9"/>
        <circle class="f-white a-drop" cx="162" cy="22" r="2.6"/><circle class="f-white a-drop" cx="162" cy="30" r="2.2" style="animation-delay:.8s"/>
      </g>
      <g class="ansmotion">${[0, 1.1, 2.2].map(b => `<circle class="f-white" r="3"><animateMotion dur="3.3s" begin="${b}s" repeatCount="indefinite" path="M111 26 L111 90 C130 90 150 94 166 100 L172 130 L182 146"/></circle>`).join('')}</g>
      ${tag(58, 20, 'Trachea', '', 9.5)}${LD('M80 20 L102 22')}
      ${qt(238, 22, 'Blind upper pouch', 9.5)}${LD('M190 22 L172 26')}
      ${q(181, 80, 7)}${at(214, 80, 'Gap', 9.5)}
      ${qt(70, 92, 'Fistula', 10)}${LD('M90 92 L104 92')}
      ${at(242, 120, 'Lower esophagus', 9.5)}${LD('M194 120 L180 120', 'ans')}
      ${tag(250, 160, 'Stomach', '', 9.5)}
      ${at(48, 160, 'Type C', 10)}${ains(48, 176, 'most common')}`),

    /* 7. Signs of esophageal atresia: drooling, choking, catheter coils in the pouch; polyhydramnios before birth */
    eaSigns: ART(`
      <rect x="40" y="56" width="72" height="122" rx="22" class="f-skin"/>
      <circle class="f-skin" cx="76" cy="34" r="22"/>
      <path class="s-line" d="M66 30 Q69 32 72 30 M80 30 Q83 32 86 30" style="stroke-width:1.5px"/>
      <ellipse cx="76" cy="45" rx="5" ry="3.5" fill="#5a2a35"/>
      <rect x="69" y="56" width="14" height="38" rx="7" class="f-esoph"/>
      ${ST(80, 136, .55, 'f-stomach', 'opacity=".55"')}
      ${T('M80 140 L80 122', 'esoph', 8)}
      <g class="ans">
        <path class="s-warn a-draw" d="M76 47 L76 68 C76 90 68 90 70 80 C72 70 82 72 80 84 C78 92 70 88 73 82" style="stroke-width:2.5px"/>
        <circle class="f-water a-drop" cx="68" cy="50" r="2.6"/><circle class="f-water a-drop" cx="72" cy="51" r="2.2" style="animation-delay:.8s"/>
        <path class="s-ink a-shake" d="M48 34 l-6 -3 M47 42 l-7 0 M48 50 l-6 3" style="stroke-width:1.5px"/>
        <path class="s-bad a-blink" d="M70 104 l12 10 M82 104 l-12 10" style="stroke-width:3px"/>
      </g>
      <circle cx="246" cy="52" r="40" class="f-water a-pulse" opacity=".85"/>
      <path class="f-skin" d="M244 70 C226 70 222 52 230 42 C234 34 242 32 248 34 C256 24 270 30 268 42 C267 52 260 56 256 60 C260 68 256 78 248 78 C242 78 240 74 244 70 Z"/>
      ${ink(246, 104, 'before birth', 9.5)}
      ${qt(246, 118, 'Polyhydramnios', 10)}
      ${LD('M128 30 L84 42')}${qt(160, 30, 'Drooling', 10)}
      ${LD('M130 56 L100 50')}${qt(162, 56, 'Choking', 10)}${at(162, 74, 'hard to breathe')}
      ${LD('M110 140 L86 100')}${qt(212, 146, "Catheter can't reach", 9.5)}${at(212, 164, 'the stomach (coils)')}`),

    /* 8. First treatment: continuous suction of the pouch, then surgery to join the ends + close the fistula */
    eaTx: ART(`
      <rect x="44" y="34" width="14" height="96" rx="5" class="f-mucus"/>
      <path class="s-line" d="M44 44 H58 M44 54 H58 M44 64 H58 M44 74 H58 M44 84 H58 M44 94 H58 M44 104 H58 M44 114 H58" style="stroke-width:1px" opacity=".6"/>
      <rect x="76" y="40" width="18" height="46" rx="9" class="f-esoph"/>
      ${ST(88, 122, .4)}
      ${T('M88 124 L88 100', 'esoph', 12)}${T('M84 104 C72 100 66 98 58 98', 'esoph', 5)}
      <g class="ans">
        <path class="s-line" d="M85 80 L85 30 Q85 18 100 18 L122 18 Q130 18 130 30 L130 44" style="stroke-width:6px"/>
        <path class="s-white" d="M85 80 L85 30 Q85 18 100 18 L122 18 Q130 18 130 30 L130 44" style="stroke-width:3.5px"/>
        <path class="s-water a-flow" d="M85 78 L85 30 Q85 18 100 18 L122 18 Q130 18 130 30 L130 44" style="stroke-width:2px"/>
        <rect x="114" y="44" width="32" height="40" rx="6" class="f-white"/>
        <rect x="117" y="64" width="26" height="17" rx="3" class="f-water a-pulse"/>
      </g>
      ${qt(76, 152, 'Continuous suction', 9.5)}${at(76, 170, 'no choking or pneumonia')}
      <path class="s-ink a-flow" d="M150 96 L170 96" style="stroke-width:2.5px"/><path class="f-white" d="M170 90 L178 96 L170 102 Z" style="stroke-width:1px"/>
      <rect x="196" y="20" width="14" height="96" rx="5" class="f-mucus"/>
      <path class="s-line" d="M196 30 H210 M196 40 H210 M196 50 H210 M196 60 H210 M196 70 H210 M196 80 H210 M196 90 H210 M196 100 H210" style="stroke-width:1px" opacity=".6"/>
      ${ST(244, 118, .4)}
      ${T('M244 14 L244 120', 'esoph', 12)}
      <g class="ans">
        <path class="s-line" d="M238 62 l12 4 M238 70 l12 -4 M238 66 h12" style="stroke-width:1.5px"/>
        <circle class="f-good a-pop" cx="236" cy="66" r="2" style="--d:1"/><circle class="f-good a-pop" cx="252" cy="66" r="2" style="--d:2"/>
        <path d="M210 100 L218 100" style="stroke:var(--c-esoph);stroke-width:5px"/>
        <rect x="216" y="94" width="5" height="12" rx="1" class="f-bad a-blink"/>
      </g>
      ${q(226, 152)}${at(226, 152, 'Then surgery', 10)}${at(226, 170, 'join ends, tie fistula')}`),

    /* 9. Pyloric stenosis: thick pyloric muscle, tiny channel, stomach can't empty */
    pyloric: ART(CSS + `
      ${T('M126 4 L126 34', 'esoph', 10)}
      ${ST(126, 36, 1.55)}
      <g class="ans">
        <path class="s-white a-wave2a" d="M168 60 Q174 80 166 102" style="stroke-width:2px" opacity=".8"/>
        <path class="s-white a-wave2a" d="M168 60 Q174 80 166 102" style="stroke-width:2px;animation-delay:.9s" opacity=".8"/>
      </g>
      ${T('M54 112 C40 112 30 118 30 134 L32 178', 'small', 11)}
      <ellipse class="f-muscle" cx="66" cy="112" rx="20" ry="13" transform="rotate(-12 66 112)"/>
      <path class="s-line" d="M86 108 L46 116" style="stroke-width:1.5px"/>
      <path d="M50 105 Q66 100 82 103 M50 120 Q66 124 82 118" class="s-white" style="stroke-width:1px" opacity=".6"/>
      <g class="ansmotion">${[0, 1.3].map(b => `<circle class="f-food" r="4.5"><animateMotion dur="2.6s" begin="${b}s" repeatCount="indefinite" keyPoints="0;1;0.55" keyTimes="0;0.55;1" calcMode="linear" path="M150 80 C130 96 106 104 88 108"/></circle>`).join('')}</g>
      <circle cx="244" cy="62" r="30" class="f-muscle a-pulse"/>
      <circle cx="244" cy="62" r="5" class="f-mouth"/>
      ${ink(244, 18, 'cross-section', 9.5)}
      ${tag(150, 74, 'Stomach', '', 10)}
      ${LD('M66 126 L66 140')}${qt(100, 150, 'Thick pyloric muscle', 9.5)}
      ${at(244, 110, "Can't empty", 10)}
      ${at(244, 140, 'Starts at 3–6 weeks', 9.5)}
      ${tag(30, 94, 'R', '', 9)}`),

    /* 10. Classic signs: RUQ olive, projectile vomiting, hungry after, visible stomach waves (left to right), alkalosis */
    pyloricSigns: ART(CSS + `
      <rect x="28" y="50" width="96" height="126" rx="30" class="f-skin"/>
      <circle class="f-skin" cx="76" cy="28" r="22"/>
      <path class="s-line" d="M66 24 Q69 26 72 24 M80 24 Q83 26 86 24" style="stroke-width:1.5px"/>
      <ellipse cx="78" cy="38" rx="4" ry="3" fill="#5a2a35"/>
      ${ST(84, 64, .78, 'f-stomach', 'opacity=".5"')}
      <g class="a-pulse"><ellipse class="f-muscle" cx="56" cy="102" rx="9" ry="6.5" transform="rotate(-20 56 102)"/></g>
      <g class="ans a-bob"><rect x="150" y="54" width="10" height="18" rx="3" class="f-white"/><rect x="152" y="48" width="6" height="7" rx="2" class="f-warn"/></g>
      ${ink(36, 70, 'R', 9.5, '', 'middle', true)}${ink(116, 70, 'L', 9.5, '', 'middle', true)}
      <g class="ans">
        <path class="s-line a-wave2a" d="M106 72 Q112 84 104 96" style="stroke-width:2px"/>
        <path class="s-line a-wave2a" d="M106 72 Q112 84 104 96" style="stroke-width:2px;animation-delay:.9s"/>
        <path class="s-white a-draw" d="M82 38 C110 0 150 0 160 64" style="stroke-width:5px"/>
        <circle class="f-white a-drop" cx="160" cy="70" r="3"/><circle class="f-white a-drop" cx="154" cy="72" r="2.4" style="animation-delay:.5s"/>
      </g>
      ${LD('M66 104 L176 120')}${LD('M112 84 L176 92')}${LD('M162 62 L176 62', 'ans')}${LD('M150 30 L176 34')}
      ${qt(234, 34, 'Projectile vomiting', 9.5)}
      ${qt(234, 62, 'Hungry right after', 9.5)}
      ${qt(234, 92, 'Stomach waves', 9.5)}
      ${qt(234, 120, 'Olive mass (RUQ)', 9.5)}
      ${qt(234, 150, 'Metabolic alkalosis', 9.5)}
      ${at(234, 170, 'pH up · Cl and K down', 9)}`),

    /* 11. Risk factors: family history, early erythromycin, male, White */
    pyloricRisk: ART(`
      <path class="s-ink" d="M150 10 L150 170 M10 92 L290 92" style="stroke-width:1px" stroke-dasharray="3 4"/>
      <g class="ans">
        <g class="a-pop" style="--d:0"><path class="s-ink" d="M62 26 H92 M77 26 V44 M60 44 H94 M60 44 V50 M94 44 V50" style="stroke-width:1.5px"/>
          <rect x="50" y="16" width="20" height="20" class="f-bad"/><circle cx="102" cy="26" r="10" class="f-white"/>
          <rect x="50" y="50" width="20" height="20" class="f-bad a-blink"/><circle cx="94" cy="60" r="10" class="f-white"/></g>
        <g class="a-pop" style="--d:1"><rect x="208" y="26" width="30" height="40" rx="6" class="f-warn"/><rect x="214" y="16" width="18" height="11" rx="2" class="f-white"/>
          <rect x="211" y="38" width="24" height="14" rx="2" class="f-white"/>${dk(223, 49, 'Ery', 9)}
          <path class="s-water" d="M248 40 L262 30" style="stroke-width:3px"/><circle class="f-water a-drop" cx="262" cy="38" r="2.5"/></g>
        <g class="a-pop" style="--d:2"><circle cx="70" cy="128" r="16" class="s-vein" style="stroke-width:5px"/><path class="s-vein" d="M82 116 L96 102 M84 102 H96 V114" style="stroke-width:5px"/></g>
        <g class="a-pop" style="--d:3"><circle class="f-skin" cx="224" cy="114" r="11" style="fill:#fde2d0"/><path class="f-skin" d="M206 150 C206 132 214 126 224 126 C234 126 242 132 242 150 Z" style="fill:#fde2d0"/></g>
      </g>
      <circle cx="150" cy="124" r="18" class="f-white"/>${ST(156, 112, .32)}<ellipse class="f-muscle a-pulse" cx="143" cy="128" rx="5" ry="3.5"/>
      ${q(76, 44)}${q(225, 44)}${q(76, 128)}${q(225, 128)}
      ${tag(76, 80, 'Parent or sibling had it', 'ans', 9.5)}
      ${tag(225, 80, 'Erythromycin early on', 'ans', 9.5)}
      ${tag(76, 164, 'Male', 'ans', 10)}
      ${tag(225, 164, 'White', 'ans', 10)}`),

    /* 12. Pyloromyotomy: fix fluids first, slit the thick muscle lengthwise, lining bulges through intact */
    pyloricTx: ART(`
      <rect x="22" y="14" width="40" height="52" rx="8" class="f-water" opacity=".85"/>
      <rect x="28" y="24" width="28" height="18" rx="3" class="f-white"/>${dk(42, 37, 'IV', 10)}
      <rect x="37" y="66" width="10" height="16" rx="3" class="f-white"/>
      <path class="s-water" d="M42 82 C42 110 52 110 52 128" style="stroke-width:2.5px"/>
      <circle class="f-water a-drop" cx="42" cy="72" r="2.4"/>
      ${q(42, 140)}${at(42, 140, 'Fluids +', 10)}${at(42, 158, 'electrolytes', 9.5)}${ains(42, 176, 'first')}
      <path class="s-ink a-flow" d="M66 74 L84 74" style="stroke-width:2.5px"/><path class="f-white" d="M84 69 L90 74 L84 79 Z" style="stroke-width:1px"/>
      <rect x="92" y="54" width="80" height="40" rx="20" class="f-muscle"/>
      <rect x="92" y="71" width="80" height="6" rx="3" class="f-mouth"/>
      <g class="ans"><path class="s-white a-draw" d="M100 56 L164 56" style="stroke-width:2.5px"/>
        <g class="a-bob"><path class="f-white" d="M150 30 L176 22 L178 28 Z"/><rect x="176" y="20" width="22" height="7" rx="3" class="f-scar" transform="rotate(-16 176 22)"/></g></g>
      ${tag(132, 108, 'Thick muscle', '', 9.5)}
      <path class="s-ink a-flow" d="M176 74 L192 74" style="stroke-width:2.5px"/><path class="f-white" d="M192 69 L198 74 L192 79 Z" style="stroke-width:1px"/>
      <path class="f-muscle" d="M202 64 Q202 52 222 52 L230 52 Q232 66 236 76 Q232 86 230 96 L222 96 Q202 96 202 84 Z"/>
      <path class="f-muscle" d="M290 64 Q290 52 270 52 L262 52 Q260 66 256 76 Q260 86 262 96 L270 96 Q290 96 290 84 Z"/>
      <ellipse class="f-mouth a-grow" cx="246" cy="64" rx="13" ry="12"/>
      <rect x="202" y="70" width="88" height="10" rx="5" class="f-mouth"/>
      ${q(246, 122)}${at(246, 122, 'Pyloromyotomy', 10.5)}
      ${ains(246, 142, 'muscle cut open,')}${ains(246, 154, 'lining left intact')}`),

    /* 13. Oropharyngeal (can't start the swallow, coughs) vs esophageal (food sticks lower down) */
    dysType: ART(`
      <g transform="translate(10 6) scale(.92)">${HEAD()}</g>
      ${T('M71 116 L72 172', 'esoph', 8)}
      ${T('M56 98 L56 132', 'mucus', 7)}
      <g class="ans">
        <circle cx="62" cy="80" r="26" class="f-warn noline" opacity=".28"/>
        <rect x="62" y="124" width="20" height="50" rx="10" class="f-vein noline" opacity=".25"/>
        <circle class="f-food a-shake" cx="58" cy="78" r="5"/>
        <path class="s-ink a-blink" d="M8 70 l-5 -3 M8 76 h-6 M8 82 l-5 3" style="stroke-width:1.5px"/>
      </g>
      <g class="ansmotion"><circle class="f-food" r="5"><animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.45;1" calcMode="linear" path="M66 96 L71 116 L72 146"/></circle></g>
      ${LD('M90 80 L150 50')}${qt(212, 46, 'Oropharyngeal', 10.5)}
      ${ains(212, 66, 'trouble STARTING')}${ains(212, 78, 'a swallow')}
      ${LD('M84 146 L150 130')}${qt(212, 126, 'Esophageal', 10.5)}
      ${ains(212, 146, 'food STICKS after')}${ains(212, 158, 'the swallow starts')}`),

    /* 14. Causes of dysphagia, grouped around the esophagus */
    dysCause: ART(`
      ${ST(150, 150, .5)}
      ${T('M150 6 L150 152', 'esoph', 14)}
      <path class="f-esoph" d="M157 26 C172 24 176 40 166 44 C160 46 157 40 157 36 Z"/>
      <path class="f-tumor" d="M143 76 C136 72 136 90 143 92 Z"/>
      <path class="f-scar" d="M143 108 h4 v8 h-4 Z M157 108 h-4 v8 h4 Z"/>
      <ellipse class="f-muscle a-pulse" cx="150" cy="146" rx="11" ry="4"/>
      <path class="f-nerve" d="M18 34 C18 18 36 12 46 18 C56 10 76 16 74 30 C80 40 70 52 58 50 C50 58 30 56 26 48 C14 48 12 40 18 34 Z" style="fill:#f6b8c8"/>
      <path class="s-line" d="M30 30 Q38 24 44 32 M50 24 Q58 32 64 26 M36 42 Q46 38 54 44" style="stroke-width:1.2px" opacity=".6"/>
      <g class="ans"><path class="s-nerve a-flow" d="M70 44 C100 60 120 50 140 62" style="stroke-width:3px"/><path class="f-nerve a-blink" d="M58 46 L52 58 L60 58 L54 70 L68 54 L60 54 L66 46 Z" style="stroke-width:1px"/></g>
      <path class="s-muscle" d="M20 118 C30 110 46 110 56 118 M20 126 C30 118 46 118 56 126 M20 134 C30 126 46 126 56 134" style="stroke-width:4px"/>
      <g class="ans a-bob"><rect x="236" y="104" width="22" height="10" rx="5" class="f-good" transform="rotate(-20 247 109)"/><circle cx="270" cy="116" r="7" class="f-white"/><rect x="246" y="122" width="26" height="9" rx="4.5" class="f-warn"/></g>
      ${LD('M70 58 L44 66')}${qt(46, 72, 'Nerve', 10)}${ains(46, 88, 'stroke, Parkinson,')}${ains(46, 99, 'ALS, MS')}
      ${qt(46, 150, 'Muscle disease', 9.5)}
      ${LD('M168 36 L204 36 M146 84 L204 52 M156 112 L204 64')}${qt(244, 22, 'Blockage', 10)}
      ${ains(244, 40, 'diverticulum')}${ains(244, 52, 'tumor')}${ains(244, 64, 'stricture')}
      ${qt(250, 92, 'Drugs', 10)}${ains(256, 146, 'sedatives, NSAIDs,')}${ains(256, 157, 'potassium (KCl)')}
      ${LD('M162 146 L190 168')}${qt(232, 172, 'Achalasia', 10)}`),

    /* 15. Achalasia: LES stays shut (nerves lost), dilated esophagus full of food above a "bird's beak" */
    achalasia: ART(`
      <path class="f-esoph" d="M120 4 L136 4 C138 28 180 40 182 80 C184 108 156 120 146 134 L136 134 C126 120 92 108 94 80 C96 40 116 28 120 4 Z"/>
      <path class="f-food" d="M95 90 L181 90 C181 108 156 120 146 134 L136 134 C126 120 96 108 95 90 Z" opacity=".95"/>
      <path class="s-white" d="M100 90 H176" style="stroke-width:1.5px"/>
      <circle class="f-food" cx="120" cy="100" r="3" style="fill:#e0b07f"/><circle class="f-food" cx="156" cy="106" r="3.5" style="fill:#e0b07f"/><circle class="f-food" cx="138" cy="116" r="2.5" style="fill:#e0b07f"/>
      ${T('M141 134 L141 146', 'esoph', 4)}
      ${ST(141, 148, .5)}
      <ellipse class="f-muscle a-pulse" cx="141" cy="138" rx="14" ry="5"/>
      <g class="ans">
        <circle class="f-food a-drop" cx="128" cy="30" r="4.5"/><circle class="f-food a-drop" cx="128" cy="44" r="4" style="animation-delay:.8s"/>
        <g class="a-blink">${[[122, 124], [160, 124], [114, 112], [168, 112]].map(([x, y]) => `<circle class="f-nerve" cx="${x}" cy="${y}" r="4" style="fill:#c9c2a0"/><path class="s-bad" d="M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8" style="stroke-width:2px"/>`).join('')}</g>
      </g>
      ${LD('M155 138 L196 138')}${qt(246, 138, "LES won't relax", 10)}
      ${LD('M172 118 L196 108')}${qt(246, 106, 'Nerves lost', 10)}
      ${at(246, 72, 'Food pools above', 9.5)}
      ${at(52, 132, "Bird's beak", 10)}${LD('M84 132 L134 134', 'ans')}
      ${at(52, 60, 'Huge, floppy', 9.5)}${ains(52, 76, 'esophagus')}
      ${tag(194, 164, 'Stomach', '', 9.5)}`),

    /* 16. Solids only = narrowing (stricture); solids AND liquids = motility problem */
    solids: ART(`
      ${tag(76, 12, 'Solids only', '', 10.5)}${tag(224, 12, 'Solids + liquids', '', 10.5)}
      <path class="s-ink" d="M150 4 L150 176" style="stroke-width:1px" stroke-dasharray="3 4"/>
      ${ST(76, 124, .42)}${T('M76 36 L76 124', 'esoph', 24)}
      ${ST(224, 124, .42)}${T('M224 36 L224 124', 'esoph', 24)}
      <g class="ans">
        <path class="f-scar" d="M64 80 Q75 92 64 104 Z M88 80 Q77 92 88 104 Z"/>
        <circle class="f-food a-shake" cx="76" cy="74" r="8"/>
        <path class="s-line" d="M210 60 q4 6 0 12 q-4 6 0 12 q4 6 0 12 M238 60 q-4 6 0 12 q4 6 0 12 q-4 6 0 12" style="stroke-width:1.5px" opacity=".6"/>
        <circle class="f-food a-bob" cx="224" cy="68" r="8"/>
        <circle class="f-water a-bob" cx="224" cy="96" r="5" style="animation-delay:.5s"/><circle class="f-water a-bob" cx="220" cy="108" r="4" style="animation-delay:.9s"/>
      </g>
      <g class="ansmotion">${[0, 1].map(b => `<circle class="f-water" r="4"><animateMotion dur="2s" begin="${b}s" repeatCount="indefinite" path="M76 36 L76 132"/></circle>`).join('')}</g>
      ${qt(76, 168, 'Stricture (narrowing)', 9.5)}
      ${qt(224, 168, 'Motility problem', 9.5)}
      ${at(118, 92, 'stuck', 9)}${at(260, 100, 'all stall', 9)}`),

    /* 17. Odynophagia = PAINFUL swallowing (pain flashes travel with the bite) */
    odyno: ART(`
      <g transform="translate(26 6) scale(.95)">${HEAD({ eye: '<path class="s-line" d="M25 34 L31 37 L25 40" style="stroke-width:2px"/><path class="s-line" d="M22 28 L34 31" style="stroke-width:2px"/>' })}</g>
      ${T('M89 120 L89 176', 'esoph', 8)}
      <g class="ans">
        <path class="f-water a-drop" d="M44 20 C40 26 40 30 44 30 C48 30 48 26 44 20 Z"/>
        <path class="s-line" d="M30 78 Q36 74 42 78" style="stroke-width:2px"/>
      </g>
      <g class="ansmotion"><g><circle class="f-food" r="5"/><path class="f-warn" d="M0 -14 L3 -6 L11 -9 L6 -2 L14 2 L5 4 L8 12 L1 6 L-4 13 L-4 5 L-13 6 L-6 0 L-12 -7 L-3 -5 Z" opacity=".9"/><circle class="f-food" r="5"/>
        <animateMotion dur="3s" repeatCount="indefinite" path="M84 96 L88 116 L89 172"/></g></g>
      ${qt(214, 54, 'Painful swallowing', 10.5)}
      <g class="ans"><g class="a-beat" style="transform-origin:center">${ink(214, 28, 'OUCH!', 13, '', 'middle', true)}</g></g>
      ${at(214, 96, 'odyno- = pain', 10)}
      ${at(214, 120, 'dysphagia = difficulty', 9.5)}
      ${ains(214, 146, 'two different words,')}${ains(214, 158, 'often seen together')}`),

    /* 18. Tests for dysphagia: barium swallow, manometry, EGD, video swallow study */
    dysTests: ART(`
      <path class="s-ink" d="M150 6 L150 174 M8 90 L292 90" style="stroke-width:1px" stroke-dasharray="3 4"/>
      <rect x="44" y="8" width="62" height="58" rx="6" style="fill:#1d2238;stroke:#3b2430;stroke-width:1.5"/>
      <path class="s-white a-draw" d="M72 10 L72 38" style="stroke-width:6px"/><g class="a-blink">${ST(72, 36, .38, 'f-white')}</g>
      ${qt(75, 78, 'Barium swallow', 9.5)}
      ${T('M184 10 L184 66', 'esoph', 12)}
      <path class="s-line" d="M184 6 L184 70" style="stroke-width:2px"/>
      ${[20, 34, 48, 62].map(y => `<circle class="f-nerve" cx="184" cy="${y}" r="3" style="stroke-width:1px"/>`).join('')}
      <rect x="204" y="12" width="76" height="52" rx="5" class="f-white"/>
      <path class="s-blood a-draw" d="M208 52 L220 52 Q226 22 232 52 L244 52 Q250 30 256 52 L276 52" style="stroke-width:2px"/>
      ${qt(232, 78, 'Manometry', 9.5)}${at(232, 78, 'Manometry (pressures)', 9)}
      ${ST(82, 116, .62)}
      ${T('M82 96 L82 116', 'esoph', 8)}
      <path class="s-line" d="M30 96 C40 94 76 92 82 104 C86 112 88 122 92 128" style="stroke-width:3.5px"/>
      <path class="f-acid a-blink" d="M92 128 L82 144 L104 140 Z" opacity=".8"/>
      ${qt(75, 164, 'EGD (scope)', 9.5)}
      <rect x="186" y="98" width="90" height="56" rx="6" class="f-white"/><rect x="190" y="102" width="82" height="48" rx="3" style="fill:#1d2238"/>
      <path class="s-white" d="M228 108 C214 108 210 118 212 124 L208 130 L213 132 L212 140 L226 142 L228 150 M228 108 C240 108 246 118 244 130 L240 150" style="stroke-width:1.5px"/>
      <path class="s-white" d="M228 124 L232 150" style="stroke-width:1.5px" opacity=".6"/>
      <circle class="f-bad a-blink" cx="264" cy="110" r="3.5"/>
      <g class="ansmotion"><circle class="f-white" r="3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M216 128 L226 128 L232 150"/></circle></g>
      ${qt(231, 166, 'Video swallow study', 9.5)}`),

    /* 19. Care with dysphagia: soft food, thick liquids, small bites, no straws; treat the cause */
    dysTx: ART(`
      <g class="ans">
        <g class="a-pop" style="--d:0"><path class="f-white" d="M20 26 H64 C64 44 54 52 42 52 C30 52 20 44 20 26 Z"/><path class="f-good" d="M24 28 Q42 20 60 28 Z"/></g>
        <g class="a-pop" style="--d:1"><path class="f-white" d="M106 16 L138 16 L134 52 L110 52 Z"/><rect x="108" y="18" width="28" height="12" class="f-warn noline"/><path class="f-warn a-ooze2a" d="M110 30 Q109 38 112 40 Q115 38 113 30 Z"/></g>
        <g class="a-pop" style="--d:2"><ellipse class="f-white" cx="34" cy="104" rx="11" ry="7"/><rect x="44" y="102" width="26" height="4" rx="2" class="f-white"/><circle class="f-good" cx="34" cy="103" r="3.5"/></g>
        <g class="a-pop" style="--d:3"><rect x="108" y="88" width="8" height="34" rx="2" class="f-water" transform="rotate(20 112 105)"/><circle cx="122" cy="105" r="17" class="s-bad a-blink" style="stroke-width:3.5px"/><path class="s-bad a-blink" d="M110 93 L134 117" style="stroke-width:3.5px"/></g>
      </g>
      ${q(42, 38)}${q(122, 38)}${q(42, 104)}${q(122, 104)}
      ${at(42, 66, 'Soft, pureed', 9.5)}${at(122, 66, 'Thick liquids', 9.5)}
      ${at(42, 136, 'Small bites', 9.5)}${at(122, 136, 'No straws', 9.5)}
      ${at(82, 166, 'Goal: no aspiration', 10)}
      <path class="s-ink" d="M164 8 L164 174" style="stroke-width:1px" stroke-dasharray="3 4"/>
      ${T('M234 6 L234 102', 'esoph', 14)}${ST(234, 104, .46)}
      <g class="ans"><ellipse class="f-mucus a-grow" cx="234" cy="92" rx="10" ry="14"/><path class="s-line" d="M234 10 L234 78" style="stroke-width:2px"/></g>
      <g class="ans a-bob"><rect x="176" y="40" width="30" height="9" rx="2" class="f-white"/><rect x="206" y="42" width="6" height="5" class="f-scar"/><path class="s-line" d="M212 44.5 H224" style="stroke-width:1.5px"/><path class="s-line" d="M176 44.5 H170" style="stroke-width:3px"/></g>
      ${q(274, 40)}${at(270, 40, 'Botox', 9.5)}${at(274, 92, 'Dilation', 9.5)}
      ${qt(234, 156, 'Treat the cause', 10)}${ains(234, 174, 'dilation, myotomy, Botox')}`),

    /* 20. Hematemesis: bleeding ulcer/varices, acid turns blood brown -> coffee-ground vomit */
    hema: ART(`
      ${T('M80 4 L80 50', 'esoph', 12)}
      <path class="s-vein" d="M74 20 q-4 6 0 12 q4 6 0 12 M86 16 q4 6 0 12 q-4 6 0 12 q4 4 0 8" style="stroke-width:2.5px"/>
      ${ST(80, 52, 1.25)}
      <path class="f-tumor" d="M64 96 C60 90 72 88 74 94 C76 100 66 102 64 96 Z"/>
      <g class="ans">
        <circle class="f-blood a-drop" cx="69" cy="104" r="3"/><circle class="f-blood a-drop" cx="72" cy="106" r="2.5" style="animation-delay:.7s"/>
        <circle class="f-acid" cx="100" cy="76" r="2.5"/><circle class="f-acid" cx="112" cy="90" r="2.5"/><circle class="f-acid" cx="92" cy="108" r="2.5"/>
        ${[[88, 92], [98, 100], [108, 104], [84, 112], [104, 80], [118, 70]].map(([x, y]) => `<circle class="f-stool" cx="${x}" cy="${y}" r="2.2" style="stroke-width:.8px"/>`).join('')}
        <path class="s-food a-flow" d="M84 4 C120 -8 200 10 222 102" style="stroke-width:3.5px"/>
      </g>
      <path class="f-white" d="M186 112 C186 104 200 104 210 110 C220 104 240 102 254 106 C268 110 268 130 254 134 C240 138 220 134 210 130 C200 136 186 134 186 124 Z"/>
      <path d="M196 116 C204 112 214 118 224 114 C236 110 250 114 254 120 C250 128 234 128 222 126 C210 124 200 128 196 122 Z" style="fill:var(--c-stool)" opacity=".55"/>
      ${[[202, 118], [212, 121], [222, 117], [232, 122], [242, 117], [248, 123], [216, 125], [236, 126]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#3b1e12"/>`).join('')}
      ${at(30, 30, 'Varices', 9.5)}${LD('M50 30 L72 30', 'ans')}
      ${qt(40, 154, 'Bleeding ulcer', 9.5)}${LD('M50 146 L64 102')}
      ${at(108, 174, 'acid + blood = brown', 9.5)}
      ${qt(226, 158, 'Coffee-ground vomit', 9.5)}
      ${at(250, 44, 'Upper GI bleed', 9.5)}`),

    /* 21. Vomit color: bile (blockage just past the bile duct) vs fecal (low blockage) */
    vomitColor: ART(`
      <path class="f-liver" d="M54 20 C80 10 114 12 116 22 C112 34 90 40 62 42 C48 42 44 26 54 20 Z"/>
      <ellipse class="f-gall" cx="96" cy="44" rx="6" ry="8"/>
      ${ST(150, 24, .75)}
      ${T('M124 60 L104 62 L102 82 Q102 92 116 92', 'small', 8)}
      ${T('M116 92 C150 92 156 100 132 104 C110 108 112 118 140 118 C168 118 168 128 142 132', 'small', 7)}
      ${T('M142 132 L196 132 L196 70 L232 70', 'large', 10)}
      <path class="s-bile" d="M96 50 L102 76" style="stroke-width:2.5px"/>
      <path class="s-bad" d="M117 86 l8 10 M125 86 l-8 10" style="stroke-width:3px"/>
      <path class="s-bad" d="M190 104 l12 10 M202 104 l-12 10" style="stroke-width:3px"/>
      <g class="ans">
        <path class="s-bile a-flow" d="M98 52 L102 76" style="stroke-width:2.5px"/>
        <path class="s-bile a-flow" d="M112 88 C80 96 60 110 50 124" style="stroke-width:2.5px"/>
        <path class="s-food a-flow" d="M190 116 C190 130 230 110 250 124" style="stroke-width:2.5px"/>
      </g>
      <path class="f-white" d="M20 132 C20 124 34 124 44 128 C54 124 74 122 84 126 C94 130 94 146 84 150 C74 154 54 152 44 148 C34 154 20 152 20 142 Z"/>
      <path class="f-bile" d="M28 134 C40 130 60 134 80 132 C86 136 86 142 80 146 C60 148 40 146 28 142 Z" style="fill:#c8d93a"/>
      <path class="f-white" d="M216 132 C216 124 230 124 240 128 C250 124 270 122 280 126 C290 130 290 146 280 150 C270 154 250 152 240 148 C230 154 216 152 216 142 Z"/>
      <path class="f-stool" d="M224 134 C236 130 256 134 276 132 C282 136 282 142 276 146 C256 148 236 146 224 142 Z"/>
      ${tag(56, 112, 'Yellow-green', '', 9.5)}${tag(250, 112, 'Deep brown', '', 9.5)}
      ${qt(56, 166, 'Bile', 10)}${at(56, 166, 'Bile: high blockage', 9.5)}
      ${qt(250, 166, 'Fecal', 10)}${at(246, 166, 'Fecal: low blockage', 9.5)}
      ${tag(258, 54, 'Colon', '', 9)}`),

    /* 22. Projectile vomiting: forceful arc, often no nausea; causes listed on the right */
    projectile: ART(`
      <g transform="translate(96 28) scale(-.62 .62)">${HEAD()}</g>
      <path d="M86 72 Q90 75 86 78" class="s-line" style="stroke-width:2px"/>
      <g class="ans">
        <path class="s-food a-draw" d="M92 74 C120 40 150 50 168 150" style="stroke-width:6px"/>
        <ellipse class="f-food a-pop" cx="170" cy="160" rx="16" ry="4" style="--d:4"/>
      </g>
      <g class="ansmotion">${[0, .4, .8].map(b => `<circle class="f-food" r="3"><animateMotion dur="1.4s" begin="${b}s" repeatCount="indefinite" path="M92 74 C120 40 150 50 168 156"/></circle>`).join('')}</g>
      ${at(70, 14, 'Forceful', 10)}${at(60, 128, 'often no nausea', 9.5)}
      ${q(130, 98)}
      ${[['Obstruction', 24], ['Raised ICP', 56], ['Slow emptying', 88], ['Poisoning', 120], ['Overeating', 152]].map(([t, y]) => qt(248, y, t, 9.5)).join('')}
      <g class="ans">
        <g class="a-pop" style="--d:0">${T('M192 24 L206 24', 'small', 7)}<path class="s-bad" d="M196 18 l6 12 M202 18 l-6 12" style="stroke-width:2px"/></g>
        <g class="a-pop" style="--d:1"><path d="M188 60 C188 48 208 46 208 58 C210 64 202 66 198 64 C192 66 188 64 188 60 Z" style="fill:#f6b8c8;stroke:#3b2430;stroke-width:1.2"/><path class="s-bad" d="M198 44 v-4 M190 46 l-3 -3 M206 46 l3 -3" style="stroke-width:1.5px"/></g>
        <g class="a-pop" style="--d:2">${ST(196, 84, .25)}<circle class="f-white" cx="206" cy="92" r="5" style="stroke-width:1px"/><path class="s-line" d="M206 92 V89 M206 92 h2" style="stroke-width:1px"/></g>
        <g class="a-pop" style="--d:3"><rect x="191" y="114" width="14" height="16" rx="3" class="f-good"/><rect x="194" y="110" width="8" height="5" class="f-white"/><path class="s-white" d="M194 122 h8 M198 118 v8" style="stroke-width:1.5px"/></g>
        <g class="a-pop" style="--d:4"><path class="f-warn" d="M188 150 Q198 140 208 150 Z"/><rect x="188" y="151" width="20" height="3" class="f-good"/><rect x="188" y="155" width="20" height="4" rx="2" class="f-food"/></g>
      </g>`),

    /* 23. Repeated vomiting -> lose HCl -> metabolic alkalosis; treat with fluids, electrolytes, ondansetron */
    vomitAB: ART(CSS + `
      ${T('M60 6 L60 56', 'esoph', 12)}
      ${ST(60, 58, 1.05)}
      <g class="ans">
        ${[[60, 44, 0, 'H⁺'], [60, 30, .6, 'Cl⁻'], [60, 16, 1.2, 'H⁺']].map(([x, y, d, t]) => `<g class="a-rise" style="animation-delay:${d}s"><circle class="f-acid" cx="${x}" cy="${y}" r="8"/><text x="${x}" y="${y + 3.4}" text-anchor="middle" style="font-size:9.5px;font-weight:700;fill:#3b2430">${t}</text></g>`).join('')}
      </g>
      ${[[52, 84, 'H⁺'], [74, 92, 'Cl⁻'], [84, 74, 'H⁺']].map(([x, y, t]) => `<circle class="f-acid" cx="${x}" cy="${y}" r="7.5" style="stroke-width:1px"/><text x="${x}" y="${y + 3.4}" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#3b2430">${t}</text>`).join('')}
      ${at(56, 140, 'Lose stomach acid', 9.5)}
      <path d="M128 100 A44 44 0 0 1 150 62" fill="none" stroke="var(--c-bad)" stroke-width="10"/>
      <path d="M150 62 A44 44 0 0 1 194 62" fill="none" stroke="var(--c-good)" stroke-width="10"/>
      <path d="M194 62 A44 44 0 0 1 216 100" fill="none" stroke="var(--c-vein)" stroke-width="10"/>
      ${ink(128, 114, 'acid', 9.5)}${ink(216, 114, 'base', 9.5)}${ink(172, 44, '7.35–7.45', 9)}
      <g class="a-needle2a" style="transform-origin:172px 100px"><path class="f-white" d="M169 100 L172 64 L175 100 Z"/></g>
      <circle class="f-white" cx="172" cy="100" r="5"/>
      ${qt(172, 124, 'Metabolic alkalosis', 10)}
      <rect x="250" y="8" width="32" height="40" rx="6" class="f-water" opacity=".85"/>
      <rect x="262" y="48" width="8" height="12" rx="2" class="f-white"/><path class="s-water" d="M266 60 L266 84" style="stroke-width:2.5px"/>
      <circle class="f-water a-drop" cx="266" cy="66" r="2.2"/>
      ${at(172, 150, 'Treat: fluids, K⁺, Cl⁻', 9.5)}${at(172, 170, 'Antiemetic: ondansetron', 9.5)}`),

    /* 24. Sliding (GE junction slides above the diaphragm, ~95%) vs paraesophageal (fundus rolls up beside it) */
    hiatal: ART(CSS + `
      <path class="s-ink" d="M150 4 L150 176" style="stroke-width:1px" stroke-dasharray="3 4"/>
      <g class="a-slide2a">
        ${ST(70, 64, 1.05)}
        ${T('M70 4 L70 66', 'esoph', 10)}
        <circle class="f-warn a-blink" cx="70" cy="66" r="4"/>
      </g>
      <path class="f-muscle" d="M6 98 Q30 84 58 90 L58 98 Q30 94 6 106 Z"/><path class="f-muscle" d="M144 98 Q120 84 88 90 L88 98 Q120 94 144 106 Z"/>
      ${T('M232 4 L232 104', 'esoph', 10)}
      ${ST(232, 104, .95)}
      <path class="f-stomach a-pulse" d="M240 102 C236 82 238 64 256 58 C276 52 284 72 278 88 C274 98 262 100 256 104 Z"/>
      ${T('M232 4 L232 104', 'esoph', 10)}
      <circle class="f-warn" cx="232" cy="106" r="4"/>
      <path class="f-muscle" d="M156 98 Q190 84 226 90 L226 98 Q190 94 156 106 Z"/><path class="f-muscle" d="M294 98 Q280 86 266 90 L264 98 Q280 96 294 106 Z"/>
      <g class="ans"><circle class="s-bad a-blink" cx="262" cy="78" r="22" style="stroke-width:2.5px" stroke-dasharray="4 3"/></g>
      ${tag(30, 112, 'Diaphragm', '', 9)}
      ${tag(110, 34, 'GE junction', 'ans', 9)}${LD('M84 34 L74 46', 'ans')}
      ${qt(75, 152, 'Sliding (type I)', 10)}${at(75, 170, '~95% · GE junction up', 9)}
      ${qt(225, 152, 'Paraesophageal', 10)}${at(225, 170, 'fundus up · can strangulate', 9)}`),

    /* 25. Risk factors: anything that pushes up on the diaphragm or weakens the hiatus */
    hiatalRisk: ART(`
      <rect x="104" y="14" width="92" height="162" rx="30" class="f-skin" style="fill:#fde2d0" opacity=".9"/>
      ${T('M150 6 L150 88', 'esoph', 9)}
      ${ST(150, 84, .9)}
      <path class="f-muscle" d="M106 108 Q122 82 144 92 L144 100 Q124 92 110 116 Z"/><path class="f-muscle" d="M194 108 Q178 82 158 92 L158 100 Q176 92 190 116 Z"/>
      <g class="ans">${[124, 176].map((x, i) => `<g class="a-rise" style="animation-delay:${i * .5}s"><path class="s-warn" d="M${x} 168 L${x} 142" style="stroke-width:4px"/><path class="f-warn" d="M${x - 7} 144 L${x} 132 L${x + 7} 144 Z" style="stroke-width:1px"/></g>`).join('')}</g>
      ${tag(150, 48, 'Hiatus', '', 9)}
      <g class="ans">
        <g class="a-pop" style="--d:0"><circle class="f-white" cx="34" cy="26" r="11"/><path class="s-scar" d="M24 22 Q34 10 44 22" style="stroke-width:3px"/><path class="s-line" d="M58 14 L54 44 M58 14 Q64 12 64 18" style="stroke-width:2.5px"/></g>
        <g class="a-pop" style="--d:1"><rect x="20" y="78" width="40" height="7" rx="2" class="f-white"/><rect x="52" y="78" width="8" height="7" rx="1" class="f-warn"/><path class="s-scar a-rise" d="M24 74 C20 68 28 64 24 58" style="stroke-width:2px"/></g>
        <g class="a-pop" style="--d:2"><circle class="f-skin" cx="40" cy="124" r="7"/><ellipse class="f-skin" cx="40" cy="146" rx="16" ry="14"/></g>
        <g class="a-pop" style="--d:3"><circle class="f-skin" cx="248" cy="24" r="7"/><path class="f-skin" d="M242 32 L254 32 C266 40 266 56 254 60 L242 60 Z"/><path class="f-skin" d="M244 60 L252 60 L252 74 L244 74 Z"/></g>
        <g class="a-pop a-shake" style="--d:4"><circle class="f-skin" cx="232" cy="118" r="10"/><path class="f-white" d="M246 112 C252 104 264 108 262 114 C270 114 270 124 262 124 C262 130 250 130 248 124 C242 124 242 114 246 112 Z"/></g>
      </g>
      ${qt(40, 48, 'Older age', 10)}
      ${qt(40, 100, 'Smoking', 10)}
      ${qt(56, 172, 'Obesity', 10)}
      ${qt(250, 90, 'Pregnancy', 10)}
      ${qt(248, 150, 'Cough, straining', 9.5)}
      ${at(150, 158, 'belly pressure', 9)}`),
  });
})();
