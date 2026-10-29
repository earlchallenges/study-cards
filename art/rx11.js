/* Pharmacology rx11-chd art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 11 coronary heart disease: plaque, MI, coronaries, aspirin, beta blockers, CCBs, nitrates, ranolazine. */
(() => {
  const C = c => c[0] === '#' ? c : `var(--c-${c})`;
  // outlined tube along a path
  const T = (d, c, w = 8, more = '') =>
    `<path d="${d}" fill="none" stroke="var(--art-line)" stroke-width="${w + 3}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${C(c)}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${more}/>`;
  // thin dotted leader line
  const L = (x1, y1, x2, y2) => `<path class="s-ink" d="M${x1} ${y1} L${x2} ${y2}" style="stroke-width:1;stroke-dasharray:2 3"/>`;
  // plain text (not a tag)
  const tx = (x, y, t, size = 10, cls = 'tagtx', more = '') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" style="font-size:${size}px;font-weight:700${more}">${esc(t)}</text>`;
  // red "no" sign
  const NO = (x, y, r) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/>` +
    `<path d="M${(x - r * .7).toFixed(1)} ${(y - r * .7).toFixed(1)} L${(x + r * .7).toFixed(1)} ${(y + r * .7).toFixed(1)}" stroke="var(--c-bad)" stroke-width="3" stroke-linecap="round"/></g>`;
  // green check mark
  const CHECK = (x, y, s = 1) => `<path d="M${x - 9 * s} ${y} L${x - 3 * s} ${y + 7 * s} L${x + 10 * s} ${y - 8 * s}" fill="none" stroke="var(--art-line)" stroke-width="${7 * s}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M${x - 9 * s} ${y} L${x - 3 * s} ${y + 7 * s} L${x + 10 * s} ${y - 8 * s}" fill="none" stroke="var(--c-good)" stroke-width="${4 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // valentine heart centered on (x, y); about 56 x 54 at s = 1
  const heart = (x, y, s = 1, cls = 'f-stomach', extra = '') => `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<path class="${cls}" style="stroke-width:${(1.5 / s).toFixed(2)}" d="M0 -12 C-6 -26 -28 -24 -28 -6 C-28 10 -10 20 0 30 C10 20 28 10 28 -6 C28 -24 6 -26 0 -12 Z"/>` +
    `<path d="M-19 -10 Q-17 -17 -10 -18" stroke="#ffffff" stroke-width="${(3 / s).toFixed(2)}" fill="none" stroke-linecap="round" opacity=".7"/>${extra}</g>`;
  // round tablet with a score line
  const tab = (x, y, r = 9, cls = 'f-white', score = true) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>` + (score ? '' : '<!--') + `<path d="M${x - r * .6} ${y} H${x + r * .6}" stroke="var(--art-line)" stroke-width="1.2" opacity=".55"/>` + (score ? '' : '-->');
  // two-color capsule
  const caps = (x, y, c1, c2, rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">` +
    `<path class="f-${c1}" style="stroke-width:${(1.5 / s).toFixed(2)}" d="M0 -6 H-8 A6 6 0 0 0 -8 6 H0 Z"/><path class="f-${c2}" style="stroke-width:${(1.5 / s).toFixed(2)}" d="M0 -6 H8 A6 6 0 0 1 8 6 H0 Z"/>` +
    `<path d="M-11 -3 H-5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".7"/></g>`;
  // dial gauge (low blue, normal green, high red); needle swings from -> to on the back
  const pt = (cx, cy, r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)].map(v => v.toFixed(1));
  const arc = (cx, cy, r, a, b) => `M${pt(cx, cy, r, a).join(' ')} A${r} ${r} 0 0 1 ${pt(cx, cy, r, b).join(' ')}`;
  const gauge = (cx, cy, r, from, to, dur = 3) => {
    const nd = `M${cx} ${cy + 3} L${cx} ${cy - r + 5}`;
    const needle = `<path d="${nd}" stroke="var(--art-line)" stroke-width="2.5" stroke-linecap="round"/>`;
    return `<path class="f-white" d="${arc(cx, cy, r + 4, -90, 90)} Z"/>` +
      `<path d="${arc(cx, cy, r - 2, -88, -32)}" stroke="var(--c-vein)" stroke-width="6" fill="none"/>` +
      `<path d="${arc(cx, cy, r - 2, -28, 28)}" stroke="var(--c-good)" stroke-width="6" fill="none"/>` +
      `<path d="${arc(cx, cy, r - 2, 32, 88)}" stroke="var(--c-bad)" stroke-width="6" fill="none"/>` +
      `<g class="q"><g transform="rotate(${from} ${cx} ${cy})">${needle}</g></g>` +
      `<g class="ansmotion"><g>${needle}<animateTransform attributeName="transform" type="rotate" dur="${dur}s" repeatCount="indefinite" keyTimes="0;.45;.85;1" values="${from} ${cx} ${cy};${to} ${cx} ${cy};${to} ${cx} ${cy};${from} ${cx} ${cy}"/></g></g>` +
      `<circle class="f-tumor" cx="${cx}" cy="${cy}" r="3"/>`;
  };
  // one ECG beat starting at bx on baseline y; st = ST elevation, qt = extra QT length
  const beat = (bx, y, st = 0, qt = 0) => `L${bx} ${y} Q${bx + 4} ${y - 5} ${bx + 8} ${y} L${bx + 12} ${y} L${bx + 14} ${y + 3} L${bx + 17} ${y - 20} L${bx + 20} ${y + 6} L${bx + 23} ${y - st} ` +
    `L${bx + 30 + qt} ${y - st} Q${bx + 36 + qt} ${y - 10 - st} ${bx + 42 + qt} ${y}`;
  const ecg = (x0, x1, y, starts, st = 0, qt = 0) => `M${x0} ${y} ` + starts.map(b => beat(b, y, st, qt)).join(' ') + ` L${x1} ${y}`;
  // ECG paper behind a strip
  const paper = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff4f4" stroke="var(--art-line)" stroke-width="1.2"/>` +
    `<path d="${[...Array(Math.floor(w / 10))].map((_, i) => `M${x + 10 + i * 10} ${y} V${y + h}`).join(' ')} ${[...Array(Math.floor(h / 10))].map((_, i) => `M${x} ${y + 10 + i * 10} H${x + w}`).join(' ')}" stroke="#f7b2b2" stroke-width=".6"/>`;
  // stick figure helpers
  const runner = (x, y, cls = 's-line') => `<g transform="translate(${x} ${y})"><circle class="f-skin" cx="2" cy="-22" r="5"/>` +
    `<path class="${cls}" d="M1 -16 L-3 -2 M-1 -12 L8 -8 L12 -14 M-1 -12 L-9 -8 L-12 -2 M-3 -2 L6 4 L4 12 M-3 -2 L-8 6 L-15 6" style="stroke-width:2.5"/></g>`;
  // liver silhouette (front view)
  const LIVER = 'M0 14 C6 2 40 -2 64 4 C74 7 76 14 68 18 C54 26 34 32 18 32 C6 32 -2 24 0 14 Z';
  // kidney bean
  const KID = 'M12 0 C26 -2 32 14 26 22 C22 26 22 30 26 34 C32 42 24 56 12 54 C0 52 -4 40 -2 26 C0 12 2 2 12 0 Z';
  // horizontal artery segment: walls from y0 to y1 (lumen inside), x from xa to xb
  const artery = (xa, xb, y0, y1, w = 14) =>
    `<rect class="f-lymph" x="${xa}" y="${y0 - w}" width="${xb - xa}" height="${w}"/><rect class="f-muscle" x="${xa}" y="${y0 - w + 3}" width="${xb - xa}" height="${w - 6}"/>` +
    `<rect class="f-lymph" x="${xa}" y="${y1}" width="${xb - xa}" height="${w}"/><rect class="f-muscle" x="${xa}" y="${y1 + 3}" width="${xb - xa}" height="${w - 6}"/>` +
    `<rect x="${xa}" y="${y0}" width="${xb - xa}" height="${y1 - y0}" fill="var(--c-blood)" opacity=".2"/>` +
    `<path d="M${xa} ${y0} H${xb} M${xa} ${y1} H${xb}" stroke="var(--c-mouth)" stroke-width="2.5"/>`;
  const rbc = (r = 4.5) => `<ellipse class="f-blood" rx="${r}" ry="${r * .7}"/>`;
  const flow = (path, n, dur, el = rbc()) => [...Array(n)].map((_, i) =>
    `<g>${el}<animateMotion dur="${dur}s" begin="${(-i * dur / n).toFixed(2)}s" repeatCount="indefinite" path="${path}"/></g>`).join('');
  // pop-in wrapper
  const pop = (d, inner) => `<g class="a-pop" style="--d:${d}">${inner}</g>`;
  // brain blob
  const brain = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="f-mouth" style="stroke-width:${(1.5 / s).toFixed(2)}" d="M-16 6 C-22 4 -22 -6 -16 -8 C-16 -16 -6 -18 -2 -14 C2 -18 14 -18 16 -10 C22 -8 22 4 16 6 C14 12 4 12 0 10 C-4 12 -14 12 -16 6 Z"/>` +
    `<path d="M-10 -6 Q-6 -2 -10 2 M0 -10 Q4 -4 0 2 Q-2 6 2 8 M8 -6 Q12 0 8 4" stroke="var(--art-line)" stroke-width="${(1.2 / s).toFixed(2)}" fill="none"/></g>`;

  Object.assign(PICS, {
    /* atherosclerosis: injured intima, foam cells + lipid + calcium build a plaque, lumen narrows */
    athero: ART(`
      ${tag(150, 10, 'coronary artery, side cut', '', 9)}
      ${artery(6, 294, 40, 104, 18)}
      <g class="a-grow" style="transform-origin:50% 100%;animation-duration:3.2s">
        <path class="f-fat" d="M96 104 C116 104 126 66 160 64 C194 62 204 104 224 104 Z"/>
        <circle class="f-immune" cx="140" cy="90" r="6"/><circle class="f-fat noline" cx="138" cy="89" r="1.8"/><circle class="f-fat noline" cx="142" cy="92" r="1.6"/>
        <circle class="f-immune" cx="168" cy="78" r="6"/><circle class="f-fat noline" cx="166" cy="77" r="1.8"/><circle class="f-fat noline" cx="170" cy="80" r="1.6"/>
        <circle class="f-immune" cx="194" cy="92" r="6"/><circle class="f-fat noline" cx="192" cy="91" r="1.8"/>
        <rect class="f-white" x="154" y="94" width="5" height="4" rx="1"/><rect class="f-white" x="178" y="96" width="5" height="4" rx="1"/><rect class="f-white" x="126" y="98" width="4" height="3" rx="1"/>
        <path d="M96 104 C116 104 126 66 160 64 C194 62 204 104 224 104" fill="none" stroke="var(--c-mouth)" stroke-width="2.5"/>
      </g>
      <g class="a-blink"><path d="M78 104 L82 99 L86 105 L90 99 L94 104" fill="none" stroke="var(--c-bad)" stroke-width="2.5" stroke-linejoin="round"/></g>
      <g class="ansmotion">${flow('M0 76 L100 76 C126 76 134 54 160 54 C186 54 196 76 222 76 L300 76', 5, 4)}
        <g><circle class="f-fat" r="3.5"/><animateMotion dur="3s" repeatCount="indefinite" path="M60 60 C90 66 120 80 140 90"/></g>
        <g><circle class="f-immune" r="4"/><animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M110 52 C140 56 160 66 168 78"/></g></g>
      ${L(86, 108, 70, 132)}${L(164, 104, 164, 152)}${L(214, 60, 240, 132)}
      ${qtag(62, 140, '1 Endothelium damaged', 9.5)}
      ${qtag(164, 162, '2 Lipids, macrophages, Ca', 9.5)}
      ${qtag(244, 140, '3 Lumen narrows', 9.5)}`),

    /* causes of endothelial injury raining onto the lining */
    damage: ART(`
      <rect x="0" y="110" width="300" height="18" fill="var(--c-blood)" opacity=".15"/>
      ${[...Array(15)].map((_, i) => `<rect class="f-mouth" x="${i * 20}" y="126" width="20" height="14" rx="4"/><ellipse class="f-germ" cx="${i * 20 + 10}" cy="133" rx="3" ry="2.5"/>`).join('')}
      <rect class="f-muscle" x="0" y="140" width="300" height="22"/>
      <path d="M0 147 H300 M0 154 H300" stroke="#ffffff" stroke-width="1" opacity=".4"/>
      ${tag(150, 172, 'endothelium (inner lining)', '', 9)}
      <!-- 1 high BP -->
      <g transform="translate(52 22)">${gauge(0, 4, 13, 20, 80, 2)}</g>
      <!-- 2 smoking -->
      <rect class="f-white" x="132" y="16" width="30" height="8" rx="2"/><rect class="f-food" x="126" y="16" width="8" height="8" rx="2"/><rect class="f-warn" x="161" y="16" width="5" height="8" rx="1"/>
      <g class="a-rise"><path d="M168 12 q4 -4 0 -8 q-4 -4 0 -8" stroke="var(--c-scar)" stroke-width="2" fill="none"/></g>
      <!-- 3 lipids -->
      <circle class="f-fat" cx="240" cy="20" r="7"/><circle class="f-fat" cx="254" cy="16" r="5"/><circle class="f-fat" cx="256" cy="28" r="4"/>
      <!-- 4 diabetes -->
      <rect class="f-white" x="38" y="66" width="13" height="13" rx="2"/><rect class="f-white" x="53" y="70" width="11" height="11" rx="2"/><path class="f-water" d="M70 62 q5 8 5 11 a5 5 0 0 1 -10 0 q0 -3 5 -11z"/>
      <!-- 5 homocysteine -->
      <path class="f-good" d="M140 64 L152 64 L150 70 L156 82 L136 82 L142 70 Z"/><path class="f-white noline" d="M141 76 L151 76 L154 81 L138 81 Z"/>
      <!-- 6 virus / immune -->
      <circle class="f-germ" cx="250" cy="72" r="8"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${pt(250, 72, 8, a).join(' ')} L${pt(250, 72, 12, a).join(' ')}" stroke="var(--c-germ)" stroke-width="2.5" stroke-linecap="round"/>`).join('')}
      <g class="ans">
        ${[52, 150, 250].map((x, i) => `<g class="a-drop" style="animation-delay:${i * .4}s"><path class="f-bad" d="M${x} 104 l5 6 l-5 6 l-5 -6z"/></g>`).join('')}
        <g class="a-shake">${[2, 7, 12].map(i => `<path d="M${i * 20 + 4} 127 L${i * 20 + 10} 133 L${i * 20 + 6} 139" fill="none" stroke="var(--c-bad)" stroke-width="2"/>`).join('')}</g>
      </g>
      ${qtag(52, 46, 'Hypertension', 9.5)}${qtag(150, 46, 'Smoking', 9.5)}${qtag(250, 46, 'High lipids', 9.5)}
      ${qtag(52, 96, 'Diabetes (sugar)', 9.5)}${qtag(150, 96, 'Homocysteine', 9.5)}${qtag(250, 96, 'Toxins, viruses', 9.5)}`),

    /* plaque rupture -> thrombus -> blocked artery -> STEMI */
    rupture: ART(`
      ${artery(6, 196, 42, 112, 14)}
      <path class="f-fat" d="M40 112 C60 112 70 74 104 72 C138 70 148 112 168 112 Z"/>
      <circle class="f-immune" cx="96" cy="96" r="5"/><circle class="f-immune" cx="122" cy="98" r="5"/>
      <path d="M40 112 C60 112 70 74 104 72 C138 70 148 112 168 112" fill="none" stroke="var(--c-mouth)" stroke-width="3"/>
      <path d="M96 74 L100 80 L104 72 L108 80 L112 73" fill="none" stroke="var(--c-bad)" stroke-width="2.5"/>
      <g class="ans">
        <g class="a-grow" style="transform-origin:50% 100%;animation-duration:3s">
          <path class="f-blood" d="M78 78 C80 56 92 44 104 43 C118 43 130 56 132 80 C120 74 112 72 104 72 C94 72 86 74 78 78 Z"/>
          <path d="M84 70 L126 52 M88 56 L124 76 M98 46 L112 74 M118 46 L94 74" stroke="#ffe08a" stroke-width="1.2" opacity=".9"/>
          ${[[92, 64], [104, 54], [118, 64], [108, 66]].map(([x, y]) => `<ellipse class="f-pancreas" cx="${x}" cy="${y}" rx="4" ry="2.6"/>`).join('')}
        </g>
        <g class="ansmotion">${[0, 1, 2].map(i => `<g>${rbc()}<animateMotion dur="2s" begin="${i * .66}s" repeatCount="indefinite" keyTimes="0;.6;1" keyPoints="0;1;1" calcMode="linear" path="M4 64 L70 64"/></g>`).join('')}</g>
      </g>
      ${heart(250, 46, .95)}
      <g class="ans"><g class="a-blink"><path class="f-tumor" d="M256 50 C266 46 272 54 266 62 C260 68 252 62 256 50 Z" opacity=".85"/></g></g>
      ${paper(206, 88, 88, 34)}
      <path class="s-bad a-draw ans" pathLength="400" d="${ecg(208, 292, 110, [214, 254], 9)}" style="stroke-width:2"/>
      <path class="s-line q" d="M208 110 H292" style="stroke-width:1.5"/>
      ${qtag(250, 136, 'STEMI', 10)}
      ${tag(244, 158, 'time = heart muscle', 'ans', 9)}
      ${L(108, 80, 68, 128)}
      ${qtag(60, 140, '1 Plaque ruptures', 9.5)}${qtag(104, 16, '2 Thrombus forms', 9.5)}
      ${qtag(100, 164, '3 Blocked → MI', 9.5)}`),

    /* left vs right coronary artery on a front-view heart */
    coronary: ART(`
      <g class="a-beat" style="animation-duration:1.4s">
        ${T('M140 70 C136 42 150 24 172 24 C188 24 196 36 196 52', 'blood', 15)}
        ${T('M166 74 C170 56 184 46 204 46', 'vein', 11)}
        <path class="f-stomach" d="M112 64 C88 72 78 102 92 128 C106 154 150 170 178 158 C204 146 214 110 202 82 C192 62 150 52 112 64 Z"/>
        <path class="f-muscle" d="M168 68 C188 64 208 82 205 110 C203 134 192 150 176 158 C170 130 166 100 168 68 Z" opacity=".85"/>
        ${T('M139 70 C120 74 102 92 100 116 C100 134 112 148 128 156', 'blood', 4.5)}
        ${T('M154 70 L166 76 C168 102 168 130 174 158 M166 76 C186 72 202 82 206 98', 'blood', 4.5)}
        <path class="s-white a-flow" d="M139 70 C120 74 102 92 100 116 C100 134 112 148 128 156" style="stroke-width:1.6"/>
        <path class="s-white a-flow" d="M154 70 L166 76 C168 102 168 130 174 158 M166 76 C186 72 202 82 206 98" style="stroke-width:1.6"/>
      </g>
      ${tag(170, 12, 'aorta', '', 9)}
      ${tag(150, 118, 'RV', '', 9)}${tag(190, 120, 'LV', '', 9)}
      ${L(98, 104, 76, 90)}${L(194, 82, 230, 92)}
      ${qtag(48, 80, 'Right (RCA)', 10)}${tag(50, 102, 'RV + back of LV', 'ans', 9)}
      ${qtag(246, 82, 'Left (LAD, LCx)', 10)}${tag(244, 104, 'front + side of LV', 'ans', 9)}
      ${tag(150, 172, 'coronary flow mainly in diastole', 'ans', 9.5)}`),

    /* ABCDE prevention tiles */
    abcde: ART(`
      ${[['A', 'bad'], ['B', 'warn'], ['C', 'pancreas'], ['D', 'good'], ['E', 'immune']].map(([l, c], i) => {
        const x = 6 + i * 58;
        return `<rect x="${x}" y="8" width="54" height="164" rx="10" fill="${C(c)}" opacity=".22" stroke="var(--art-line)" stroke-width="1.2"/>` +
          `<circle class="f-${c}" cx="${x + 27}" cy="30" r="15"/>${tx(x + 27, 38, l, 21, 'on')}`;
      }).join('')}
      <g class="ans">
        ${pop(0, tab(33, 80, 12))}
        ${pop(1, `<g transform="translate(91 82)">${gauge(0, 4, 14, -40, 10, 3)}</g>`)}
        ${pop(2, caps(149, 72, 'pancreas', 'white', -20) + `<rect class="f-white" x="136" y="88" width="20" height="5" rx="1"/><rect class="f-warn" x="156" y="88" width="4" height="5" rx="1"/>` + NO(148, 90, 9))}
        ${pop(3, `<circle class="f-bad" cx="207" cy="82" r="11"/><path class="f-good" d="M207 71 q6 -8 12 -6 q-4 7 -12 6z"/><path d="M207 71 v-5" stroke="var(--c-stool)" stroke-width="2"/>`)}
        ${pop(4, `<g class="a-bob">${runner(265, 88)}</g>`)}
      </g>
      ${[['Aspirin', 'assess risk'], ['BP', '< 130/80'], ['Cholest.', 'no smoking'], ['Diabetes', 'diet, weight'], ['Exercise', '150 min/wk']].map(([a, b], i) =>
        qtag(33 + i * 58, 128, a, 9) + tag(33 + i * 58, i % 2 ? 166 : 148, b, 'ans', 9)).join('')}`),

    /* the drug classes orbiting the heart */
    classes: ART(`
      <g class="a-beat" style="animation-duration:1.2s">${heart(150, 88, 1.25)}</g>
      ${tx(150, 92, 'CHD', 12, 'on')}
      ${[[30, 'white', 'white'], [64, 'pancreas', 'pancreas'], [98, 'immune', 'white'], [132, 'good', 'white']].map(([y, a, b]) => caps(18, y, a, b)).join('')}
      ${[[40, 'germ', 'white'], [88, 'warn', 'warn'], [136, 'mouth', 'white']].map(([y, a, b]) => caps(282, y, a, b)).join('')}
      <g class="ans">
        ${[[34, 30], [34, 64], [34, 98], [34, 132]].map(([x, y], i) => `<path class="s-warn a-flow" d="M112 ${y} Q124 ${(y + 88) / 2} 128 88" style="stroke-width:1.5;opacity:.7"/>`).join('')}
        ${[40, 88, 136].map(y => `<path class="s-warn a-flow" d="M190 ${y} Q178 ${(y + 88) / 2} 172 88" style="stroke-width:1.5;opacity:.7"/>`).join('')}
      </g>
      ${qtag(66, 30, 'Aspirin', 10)}${qtag(66, 64, 'Statin', 10)}${qtag(74, 98, 'Beta blocker', 10)}${qtag(64, 132, 'CCB', 10)}
      ${qtag(232, 40, 'ACE-I / ARB', 10)}${qtag(234, 88, 'Nitrates', 10)}${qtag(230, 136, 'Ranolazine', 10)}
      ${tag(150, 168, 'drugs for coronary heart disease', '', 9)}`),

    /* aspirin: yes for known CHD, rarely for primary prevention */
    aspirin: ART(`
      <path d="M150 8 V172" stroke="var(--art-line)" stroke-width="1.2" stroke-dasharray="3 4" opacity=".5"/>
      ${tag(75, 14, 'Known CHD (secondary)', '', 9.5)}${tag(225, 14, 'No CHD (primary)', '', 9.5)}
      ${heart(62, 66, .95)}
      <path d="M44 62 L80 74" stroke="var(--c-scar)" stroke-width="6" stroke-linecap="round"/><path d="M48 60 L50 68 M56 62 L58 71 M64 65 L66 73 M72 68 L74 76" stroke="var(--art-line)" stroke-width="1"/>
      <g class="ans">
        <g class="a-bob">${tab(112, 50, 12, 'f-white', false)}${tx(112, 53.5, 'ASA', 9)}</g>
        ${pop(1, CHECK(116, 86, 1.1))}
        <g class="a-shake">${[[22, 104], [36, 112], [100, 108]].map(([x, y]) => `<ellipse class="f-pancreas" cx="${x}" cy="${y}" rx="5" ry="3"/>`).join('')}</g>
      </g>
      <path d="M225 46 V112 M205 112 H245" stroke="var(--art-line)" stroke-width="3" stroke-linecap="round"/>
      <g class="a-sway" style="transform-box:view-box;transform-origin:225px 46px;animation-duration:2.6s">
        <path d="M181 46 H269" stroke="var(--art-line)" stroke-width="3" stroke-linecap="round"/>
        <path d="M181 46 L171 76 M181 46 L191 76 M269 46 L259 76 M269 46 L279 76" stroke="var(--art-line)" stroke-width="1"/>
        <path class="f-white" d="M167 76 H195 Q181 88 167 76 Z"/><path class="f-white" d="M255 76 H283 Q269 88 255 76 Z"/>
        ${heart(181, 66, .3, 'f-good')}
        <path class="f-blood" d="M269 56 q6 8 6 12 a6 6 0 0 1 -12 0 q0 -4 6 -12z"/>
      </g>
      ${tag(181, 100, 'benefit', '', 9)}${tag(269, 100, 'bleeding', '', 9)}
      ${qtag(75, 140, 'Yes: daily aspirin', 9.5)}${tag(75, 162, '75–162 mg', 'ans', 10)}
      ${qtag(225, 140, 'Only high risk, low bleed', 9.5)}${tag(225, 162, 'ages 40–70; not routine', 'ans', 9.5)}`),

    /* beta blocker in the beta-1 receptor -> slower heart -> less O2 demand */
    bb: ART(`
      <rect x="6" y="96" width="138" height="16" fill="var(--c-fat)" stroke="var(--art-line)" stroke-width="1.2"/>
      ${[...Array(14)].map((_, i) => `<circle class="f-fat" cx="${11 + i * 10}" cy="98" r="3"/><circle class="f-fat" cx="${11 + i * 10}" cy="110" r="3"/>`).join('')}
      <path class="f-good" d="M60 112 L60 70 L68 70 L68 86 L82 86 L82 70 L90 70 L90 112 Z"/>
      ${tx(75, 108, 'β1', 10, 'on')}
      ${tag(40, 126, 'heart cell', '', 9)}
      <g class="ans">${pop(0, `<rect class="f-immune" x="68" y="72" width="14" height="16" rx="3"/>`)}</g>
      <path class="f-warn" d="M28 40 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1z"/>
      ${tag(30, 18, 'adrenaline', '', 9)}
      <g class="ansmotion"><g><path class="f-warn" d="M0 -12 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1z"/><animateMotion dur="2s" repeatCount="indefinite" keyTimes="0;.5;1" keyPoints="0;1;0" calcMode="linear" path="M30 52 Q60 40 74 62"/></g></g>
      ${qtag(75, 146, 'Blocks beta-1', 10)}
      ${tag(75, 164, 'metoprolol, atenolol...', 'ans', 9)}
      <g class="a-beat" style="animation-duration:1.9s">${heart(226, 42, .85)}</g>
      ${paper(162, 70, 130, 30)}
      <path class="s-bad a-draw" pathLength="400" d="${ecg(164, 290, 92, [176, 246])}" style="stroke-width:1.8;animation-duration:3.8s"/>
      ${qtag(226, 114, 'Slower HR, less force', 9.5)}
      <g transform="translate(184 160)">${gauge(0, 0, 16, 55, -35, 3.8)}</g>
      ${qtag(252, 152, 'O₂ demand ↓', 9.5)}`),

    /* beta blockers after MI lower mortality */
    bbMI: ART(`
      ${tag(66, 14, 'after a heart attack', '', 9.5)}
      ${heart(62, 64, 1.15)}
      <path class="f-scar" d="M66 72 C76 66 84 72 80 82 C76 90 64 86 66 72 Z" opacity=".9"/>
      <g class="a-pulse"><path class="f-immune" d="M92 76 L112 70 L132 76 C132 96 124 106 112 112 C100 106 92 96 92 76 Z"/>${tx(112, 94, 'BB', 11, 'on')}</g>
      <path d="M160 24 V118 H292" stroke="var(--art-line)" stroke-width="2" fill="none"/>
      ${tag(226, 132, 'deaths over time', '', 9)}
      <g class="ans">
        <path class="s-bad a-draw" pathLength="400" d="M162 114 C190 100 220 72 286 38" style="stroke-width:3.5"/>
        <path class="s-good a-draw" pathLength="400" d="M162 114 C200 108 240 94 286 78" style="stroke-width:3.5;animation-delay:.4s"/>
        ${tag(258, 28, 'no BB', '', 9)}${tag(262, 96, 'on BB', '', 9)}
      </g>
      ${q(226, 70)}
      ${tag(70, 126, 'carvedilol if LV weak', 'ans', 9)}
      ${qtag(150, 150, 'Lower CV mortality', 10.5)}
      ${tag(150, 170, 'atenolol, metoprolol, carvedilol, propranolol, timolol', 'ans', 9)}`),

    /* beta-1 selective vs nonselective: heart vs lungs */
    card: ART(`
      ${heart(52, 86, .8)}${tag(52, 126, 'beta-1: heart', '', 9)}
      <path class="f-mouth" d="M240 62 C226 60 220 76 220 94 C220 108 228 114 236 110 C242 106 242 86 240 62 Z"/>
      <path class="f-mouth" d="M256 62 C270 60 276 76 276 94 C276 108 268 114 260 110 C254 106 254 86 256 62 Z"/>
      ${tag(248, 126, 'beta-2: lungs', '', 9)}
      <g class="a-squeeze" style="animation-duration:1.6s;transform-origin:50% 0%">${T('M248 48 L248 68 M248 68 L238 82 M248 68 L258 82', 'white', 4)}</g>
      ${tag(150, 14, 'Cardioselective (β1)', '', 9.5)}${caps(150, 32, 'good', 'white')}
      ${tag(150, 96, 'Nonselective (β1 + β2)', '', 9.5)}${caps(150, 114, 'warn', 'white')}
      <g class="ans">
        <path class="s-good a-flow" d="M136 36 Q100 46 78 70" style="stroke-width:2"/>
        <path class="s-warn a-flow" d="M136 118 Q100 112 78 96" style="stroke-width:2"/>
        <path class="s-warn a-flow" d="M164 118 Q200 114 222 100" style="stroke-width:2"/>
        <g class="a-blink"><path d="M282 70 q6 -4 0 -8 M286 80 q6 -4 0 -8" stroke="var(--c-warn)" stroke-width="2" fill="none"/></g>
      </g>
      ${qtag(150, 56, 'Preferred: metoprolol, atenolol', 9)}
      ${qtag(150, 140, 'Propranolol, nadolol', 9.5)}
      ${tag(150, 164, 'caution in asthma', 'ans', 9.5)}`),

    /* stopping a beta blocker: taper over 1-2 weeks */
    bbStop: ART(`
      <rect class="f-white" x="8" y="24" width="160" height="88" rx="6"/>
      <rect class="f-bad" x="8" y="24" width="160" height="14" rx="6"/>
      ${tx(88, 35, '2 weeks', 9.5, 'on')}
      ${[...Array(14)].map((_, i) => `<rect x="${12 + (i % 7) * 22}" y="${42 + Math.floor(i / 7) * 34}" width="20" height="31" rx="3" fill="none" stroke="var(--art-line)" stroke-width=".8" opacity=".5"/>`).join('')}
      <g class="ans">${[...Array(14)].map((_, i) => pop(i * .5, `<circle class="f-immune" cx="${22 + (i % 7) * 22}" cy="${58 + Math.floor(i / 7) * 34}" r="${(8 - i * .45).toFixed(1)}"/>`)).join('')}</g>
      ${qtag(88, 128, 'Taper over 1–2 weeks', 10)}
      ${tag(234, 14, 'stop suddenly?', '', 9.5)}
      <g class="a-shake">${heart(234, 64, 1)}</g>
      <g class="ans"><g class="a-blink"><path class="f-acid" d="M240 34 L226 62 L236 62 L228 86 L248 56 L238 56 L246 34 Z"/></g></g>
      ${qtag(234, 128, 'Angina or MI', 10)}
      ${tag(150, 160, 'never stop a beta blocker cold', 'ans', 9.5)}`),

    /* calcium channel blocker plugging the L-type channel -> artery relaxes */
    ccb: ART(`
      <circle class="f-lymph" cx="70" cy="66" r="48"/>
      <circle class="f-muscle" cx="70" cy="66" r="43"/>
      <circle cx="70" cy="66" r="43" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="1.5 6" opacity=".5"/>
      <g class="a-grow" style="animation-duration:2.6s"><circle class="f-blood" cx="70" cy="66" r="26"/><circle cx="62" cy="58" r="5" fill="#ffffff" opacity=".35"/></g>
      ${tag(70, 126, 'artery relaxes, widens', 'ans', 9)}
      ${tag(70, 10, 'coronary artery', '', 9)}
      <rect x="148" y="72" width="146" height="18" fill="var(--c-fat)" stroke="var(--art-line)" stroke-width="1.2"/>
      ${[...Array(15)].map((_, i) => `<circle class="f-fat" cx="${152 + i * 10}" cy="74" r="3"/><circle class="f-fat" cx="${152 + i * 10}" cy="88" r="3"/>`).join('')}
      <rect class="f-good" x="206" y="60" width="11" height="42" rx="4"/><rect class="f-good" x="231" y="60" width="11" height="42" rx="4"/>
      <rect x="217" y="60" width="14" height="42" fill="var(--c-lymph)" opacity=".6"/>
      ${tag(224, 112, 'L-type Ca channel', '', 9)}
      <g class="ans">${pop(0, `<rect class="f-immune" x="215" y="64" width="18" height="18" rx="4"/>`)}${tag(272, 56, 'CCB', '', 10)}</g>
      ${[[170, 30], [190, 44], [270, 24]].map(([x, y]) => `<g><circle class="f-nerve" cx="${x}" cy="${y}" r="8"/>${tx(x, y + 3.2, 'Ca', 9)}</g>`).join('')}
      <g class="ansmotion">${[0, .9].map(b => `<g><circle class="f-nerve" cx="224" cy="22" r="8"/>${tx(224, 25.2, 'Ca', 9)}<animateMotion dur="1.8s" begin="${b}s" repeatCount="indefinite" keyTimes="0;.5;1" keyPoints="0;1;0" calcMode="linear" path="M0 0 L0 30"/></g>`).join('')}</g>
      ${tag(150, 144, 'amlodipine, nifedipine, diltiazem, verapamil', 'ans', 9)}
      ${qtag(80, 166, 'Stable angina', 10)}${qtag(220, 166, 'Variant (spasm) angina', 10)}`),

    /* stable (fixed plaque, exertion) vs variant (spasm at rest, CCB) */
    angina: ART(`
      <path d="M150 6 V174" stroke="var(--art-line)" stroke-width="1.2" stroke-dasharray="3 4" opacity=".5"/>
      ${tag(76, 14, 'Stable', '', 10.5)}${tag(224, 14, 'Variant (Prinzmetal)', '', 10)}
      ${artery(10, 142, 44, 74, 10)}
      <path class="f-fat" d="M44 74 C56 74 62 56 78 56 C94 56 100 74 112 74 Z"/>
      <g class="ansmotion">${flow('M10 62 L44 62 C58 62 64 50 78 50 C92 50 98 62 112 62 L142 62', 3, 3, rbc(3.5))}</g>
      <g class="a-squeeze" style="animation-duration:2.2s">${artery(158, 290, 44, 74, 10)}</g>
      <g class="ans"><g class="a-blink">${[176, 208, 240, 272].map(x => `<path d="M${x} 28 v6 M${x - 3} 31 l3 3 l3 -3 M${x} 90 v-6 M${x - 3} 87 l3 -3 l3 3" stroke="var(--c-bad)" stroke-width="1.8" fill="none"/>`).join('')}</g></g>
      ${qtag(76, 100, 'With exertion', 10)}
      ${tag(76, 122, 'relief: rest or NTG', 'ans', 9)}
      ${qtag(224, 100, 'Spasm, often at rest', 9.5)}
      ${qtag(224, 122, 'Best drug: CCB', 10)}
      <g class="ans">
        <path d="M30 176 H50 V170 H64 V164 H78 V158 H92 V152 H106" fill="none" stroke="var(--art-line)" stroke-width="2.5"/>
        <g class="a-bob">${runner(70, 160)}</g>
        <path class="f-pancreas a-pulse" d="M190 146 A12 12 0 1 0 202 166 A9 9 0 1 1 190 146 Z"/>
        <g class="a-rise">${tx(214, 154, 'z', 11, 'ink')}${tx(222, 146, 'z', 9, 'ink')}</g>
        ${caps(256, 158, 'immune', 'white', -20, 1.1)}
      </g>`),

    /* ACE inhibitors block ACE; ARBs block the AT1 receptor */
    acei: ART(`
      ${tag(40, 24, 'Ang I', '', 9.5)}${tag(176, 24, 'Ang II', '', 9.5)}
      ${[0, 1, 2, 3].map(i => `<circle class="f-warn" cx="${22 + i * 12}" cy="48" r="6"/>`).join('')}
      <g transform="translate(108 48)"><path class="f-germ" d="M0 0 L14 -6 A15 15 0 1 0 14 6 Z"/><circle cx="-3" cy="-7" r="2" fill="var(--art-line)"/></g>
      ${tag(104, 72, 'ACE', '', 9)}
      ${[0, 1, 2].map(i => `<circle class="f-bad" cx="${164 + i * 12}" cy="48" r="6"/>`).join('')}
      <path class="s-ink" d="M74 48 H86 M134 48 H150 M198 48 H222" style="stroke-width:1.5;stroke-dasharray:3 3"/>
      <rect class="f-muscle" x="214" y="60" width="80" height="12"/>
      <path class="f-good" d="M232 60 L232 36 L240 36 L240 48 L252 48 L252 36 L260 36 L260 60 Z"/>
      ${tag(276, 50, 'AT1', '', 9)}
      <g class="ans">
        <g class="a-blink">${NO(108, 48, 17)}</g>
        ${pop(1, `<rect class="f-immune" x="240" y="38" width="12" height="12" rx="3"/>`)}
        <g class="ansmotion"><g><circle class="f-warn" r="6"/><animateMotion dur="1.6s" repeatCount="indefinite" keyTimes="0;.5;1" keyPoints="0;1;0" calcMode="linear" path="M62 48 L84 48"/></g></g>
      </g>
      ${tag(104, 94, 'ACE inhibitors', '', 9.5)}${tag(250, 94, 'ARBs', '', 9.5)}
      ${qtag(104, 114, 'Ramipril', 10)}${qtag(104, 134, 'Perindopril', 10)}
      ${qtag(250, 114, 'Telmisartan', 10)}${qtag(250, 134, 'Valsartan', 10)}
      ${tag(150, 154, 'telmisartan: if ACE-I not tolerated', 'ans', 9)}
      ${tag(150, 171, 'valsartan: after MI with LV dysfunction', 'ans', 9)}`),

    /* nitroglycerin: NO -> cGMP -> vein relaxes -> less preload */
    ntg: ART(`
      ${tab(32, 60, 13, 'f-white', false)}${tx(32, 63.5, 'NTG', 9)}
      <g class="ans">${[0, .6, 1.2].map((d, i) => `<g class="a-rise" style="animation-delay:${d}s"><circle class="f-water" cx="${52 + i * 6}" cy="${48 + i * 4}" r="3.5"/><circle class="f-water" cx="${58 + i * 6}" cy="${48 + i * 4}" r="3.5"/></g>`).join('')}</g>
      <g class="q">${T('M76 40 H212', 'vein', 9)}${T('M76 80 H212', 'vein', 9)}</g>
      <rect x="76" y="44" width="136" height="32" fill="var(--c-vein)" opacity=".2"/>
      <g class="ansmotion">
        <g>${T('M76 40 H212', 'vein', 9)}<animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 -8;0 0" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></g>
        <g>${T('M76 80 H212', 'vein', 9)}<animateTransform attributeName="transform" type="translate" values="0 0;0 8;0 8;0 0" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></g>
        ${flow('M78 60 H212', 4, 4, `<ellipse class="f-vein" rx="4" ry="3"/>`)}
      </g>
      ${tag(144, 60, 'vein', '', 9)}
      <path class="s-vein a-flow-slow" d="M214 60 C226 60 228 56 232 54" style="stroke-width:2.5"/>
      <g class="a-beat" style="animation-duration:1.6s">${heart(256, 54, .8)}</g>
      ${qtag(40, 110, 'Nitric oxide', 9.5)}${qtag(144, 110, 'cGMP relaxes muscle', 9.5)}${qtag(254, 110, 'Less preload', 9.5)}
      ${tag(150, 140, 'mostly veins widen → heart works less', 'ans', 9.5)}
      ${tag(150, 162, '+ some coronary dilation', 'ans', 9.5)}`),

    /* sublingual NTG timeline: 1 tab, 911 at 5 min, max 3 in 15 min */
    ntgUse: ART(`
      <path d="M30 90 H270" stroke="var(--art-line)" stroke-width="3" stroke-linecap="round"/>
      ${[[30, '0'], [110, '5 min'], [190, '10 min'], [270, '15 min']].map(([x, t]) => `<path d="M${x} 84 V96" stroke="var(--art-line)" stroke-width="2"/>${tag(x, 106, t, '', 9)}`).join('')}
      <g class="ans">
        ${[30, 110, 190].map((x, i) => pop(i * 2, tab(x, 68, 9, 'f-white', false) + tx(x, 71.5, String(i + 1), 9)))}
        <g class="a-pulse"><rect class="f-immune" x="146" y="118" width="22" height="34" rx="4"/><rect class="f-white" x="149" y="122" width="16" height="22" rx="2"/>${tx(157, 136, '911', 9)}</g>
        <g class="a-blink">${NO(270, 68, 11)}</g>
      </g>
      <g class="ansmotion"><g><circle class="f-warn" r="5"/><animateMotion dur="6s" repeatCount="indefinite" path="M30 90 H270"/></g></g>
      ${qtag(80, 22, '1 tablet under tongue', 9.5)}${qtag(222, 22, 'Max 3 in 15 min', 9.5)}
      ${qtag(78, 132, 'No better at 5 min?', 9.5)}${tag(78, 152, 'call 911', 'ans', 10)}
      ${tag(230, 140, 'repeat every 5 min', 'ans', 9.5)}`),

    /* NTG routes: onset bars on a 0-60 minute scale */
    ntgRoutes: ART(`
      ${tag(196, 12, 'onset after a dose (minutes)', '', 9)}
      <path d="M100 26 V150 H292" stroke="var(--art-line)" stroke-width="1.5" fill="none"/>
      ${[[0, '0'], [30, '30'], [60, '60']].map(([m, t]) => `<path d="M${100 + m * 3.15} 150 v5" stroke="var(--art-line)" stroke-width="1.5"/>${tx(100 + m * 3.15 - (m === 60 ? 6 : 0), 167, t, 9, 'ink')}`).join('')}
      ${tab(14, 40, 7)}${tag(56, 40, 'Sublingual', '', 9)}
      <rect class="f-water" x="8" y="64" width="12" height="16" rx="3"/><rect class="f-white" x="11" y="59" width="6" height="6" rx="1"/>${tag(56, 72, 'Spray', '', 9)}
      <path class="f-warn" d="M6 98 H20 L24 104 L20 110 H6 Z"/>${tag(56, 104, 'Ointment', '', 9)}
      <rect class="f-skin" x="6" y="128" width="18" height="16" rx="3"/><rect class="f-fat" x="10" y="132" width="10" height="8" rx="2"/>${tag(56, 136, 'Patch', '', 9)}
      <g class="ans">
        ${[[40, 1, 3, 'good'], [72, 2, 4, 'good'], [104, 20, 60, 'warn'], [136, 40, 60, 'bad']].map(([y, a, b, c], i) =>
          `<path class="s-${c} a-draw" pathLength="400" d="M${100 + a * 3.15} ${y} H${100 + b * 3.15}" style="stroke-width:12;stroke-linecap:butt;animation-delay:${i * .3}s"/>`).join('')}
      </g>
      ${qtag(170, 40, 'Fastest: 1–3 min', 9.5)}${qtag(150, 72, '2–4 min', 9.5)}
      ${qtag(128, 104, '20–60 min', 9.5)}${qtag(178, 136, 'Slowest: 40–60', 9)}`),

    /* nitrate-free period on a 24-hour clock */
    tolerance: ART(`
      <circle class="f-white" cx="90" cy="92" r="62"/>
      ${[0, 6, 12, 18].map(h => { const [x, y] = pt(90, 92, 48, h * 15); return tx(x, +y + 3.5, String(h), 10); }).join('')}
      ${[...Array(24)].map((_, h) => `<path d="M${pt(90, 92, 62, h * 15).join(' ')} L${pt(90, 92, 57, h * 15).join(' ')}" stroke="var(--art-line)" stroke-width="1"/>`).join('')}
      ${tag(40, 14, '24-hour day', '', 9)}
      <g class="ans">
        <path d="${arc(90, 92, 68, 120, 315)}" stroke="var(--c-warn)" stroke-width="9" fill="none" class="a-fadein"/>
        <path d="${arc(90, 92, 68, 315, 480)}" stroke="var(--c-vein)" stroke-width="9" fill="none" class="a-fadein" style="--d:1"/>
        ${tag(38, 164, 'ON 12–14 h', '', 9)}${tag(150, 18, 'OFF 10–12 h', '', 9)}
      </g>
      <g class="a-spin" style="transform-box:view-box;transform-origin:90px 92px;animation-duration:8s"><path d="M90 92 L90 46" stroke="var(--c-bad)" stroke-width="3" stroke-linecap="round"/></g>
      <circle class="f-tumor" cx="90" cy="92" r="4"/>
      <rect class="f-skin" x="198" y="30" width="56" height="28" rx="12"/>
      <g class="a-pulse"><rect class="f-fat" x="214" y="34" width="24" height="20" rx="4"/></g>
      ${tag(226, 70, 'nitrate patch', '', 9)}
      ${qtag(226, 100, 'Nitrate-free 10–14 h', 10)}
      ${tag(226, 124, 'every day, e.g., at night', 'ans', 9)}
      ${tag(226, 146, 'keeps the drug working', 'ans', 9)}`),

    /* never combine nitrates with PDE-5 inhibitors */
    pde5: ART(`
      ${tab(40, 52, 14, 'f-white', false)}${tx(40, 55.5, 'NTG', 9)}${tag(40, 82, 'nitrate', '', 9)}
      <path d="M72 52 H88 M80 44 V60" stroke="var(--art-line)" stroke-width="3" stroke-linecap="round"/>
      <path class="f-vein" d="M122 34 L140 52 L122 70 L104 52 Z"/>
      ${q(122, 52, 8)}
      <g class="ans"><g class="a-pulse">${NO(80, 52, 15)}</g></g>
      ${qtag(104, 106, 'PDE-5 inhibitors', 10)}
      ${tag(104, 128, 'sildenafil, vardenafil, tadalafil', 'ans', 9)}
      <g transform="translate(234 70)">${gauge(0, 0, 38, 15, -82, 3)}</g>
      ${tag(234, 84, 'blood pressure', '', 9)}
      <g class="ans"><g class="a-sway" style="animation-duration:1.2s">${tx(282, 34, '!', 18, '', ';fill:var(--c-bad)')}</g></g>
      ${qtag(234, 150, 'Severe hypotension', 9.5)}
      ${tag(234, 170, 'syncope, MI, death', 'ans', 9)}`),

    /* nitrate side effects on a face */
    ntgAE: ART(`
      <circle class="f-skin" cx="150" cy="84" r="38"/>
      <circle cx="137" cy="78" r="3" fill="var(--art-line)"/><circle cx="163" cy="78" r="3" fill="var(--art-line)"/>
      <path d="M138 100 Q150 94 162 100" stroke="var(--art-line)" stroke-width="2" fill="none"/>
      <g class="ans">
        <g class="a-pulse" style="animation-duration:.8s"><path class="f-acid" d="M134 36 L126 50 L134 50 L128 62 L142 46 L134 46 L140 36 Z"/><path class="f-acid" d="M166 36 L158 50 L166 50 L160 62 L174 46 L166 46 L172 36 Z"/></g>
        <g class="a-blink"><ellipse cx="128" cy="92" rx="8" ry="5" fill="var(--c-bad)" opacity=".5"/><ellipse cx="172" cy="92" rx="8" ry="5" fill="var(--c-bad)" opacity=".5"/></g>
        <g class="a-spin" style="animation-duration:2s"><path d="M212 44 a6 6 0 1 1 6 6 a10 10 0 1 1 -10 -10" stroke="var(--c-germ)" stroke-width="2.5" fill="none"/></g>
        <path class="s-vein a-drop" d="M150 128 V142 M144 136 L150 142 L156 136" style="stroke-width:2.5"/>
      </g>
      <g class="a-beat" style="animation-duration:.45s">${heart(248, 76, .5)}</g>
      ${qtag(62, 22, 'Throbbing headache', 9.5)}${tag(62, 40, '#1 most common', 'ans', 9)}
      ${qtag(250, 22, 'Dizziness', 9.5)}
      ${qtag(54, 92, 'Flushing', 9.5)}
      ${qtag(246, 108, 'Reflex tachycardia', 9)}
      ${qtag(150, 154, 'Orthostatic hypotension', 9.5)}${qtag(150, 172, 'Syncope', 9.5)}`),

    /* nitrate contraindications around the tablet */
    ntgNo: ART(`
      ${tab(150, 84, 20, 'f-white', false)}${tx(150, 87.5, 'nitrate', 9)}
      <g class="ans">
        ${[[52, 30], [248, 30], [44, 108], [256, 108], [150, 136]].map(([x, y]) => `<path class="s-bad a-flow" d="M150 84 L${x} ${y}" style="stroke-width:1.5;opacity:.6"/>`).join('')}
        ${tab(150, 84, 20, 'f-white', false)}${tx(150, 87.5, 'nitrate', 9)}
        ${pop(0, `<path class="f-vein" d="M52 18 L64 30 L52 42 L40 30 Z"/>` + NO(52, 30, 15))}
        ${pop(1, brain(248, 30, 1) + `<path d="M222 30 h6 M274 30 h-6 M248 12 v4" stroke="var(--c-bad)" stroke-width="2.5" stroke-linecap="round"/>`)}
        ${pop(2, `<path d="M44 94 q9 12 9 18 a9 9 0 0 1 -18 0 q0 -6 9 -18z" fill="#ffd6dc" stroke="var(--art-line)" stroke-width="1.5"/>`)}
        ${pop(3, heart(256, 106, .55) + `<path class="f-tumor" d="M256 101 C250 92 242 94 242 103 C242 110 250 116 256 121 Z" opacity=".9"/>`)}
        ${pop(4, `<path class="f-white" d="M132 138 Q150 124 168 138 Q150 152 132 138 Z"/><circle class="f-water" cx="150" cy="138" r="6"/><circle cx="150" cy="138" r="2.5" fill="var(--art-line)"/>`)}
      </g>
      ${qtag(52, 58, 'PDE-5 inhibitor', 9.5)}${qtag(248, 58, 'High ICP', 9.5)}
      ${qtag(52, 132, 'Severe anemia', 9.5)}${qtag(250, 132, 'RV infarct', 9.5)}
      ${qtag(150, 166, 'Closed-angle glaucoma', 9.5)}`),

    /* isosorbide mononitrate passes the liver; dinitrate is mostly lost first pass */
    isosorbide: ART(`
      <g transform="translate(98 60) scale(1.3)"><path class="f-liver" style="stroke-width:1.15" d="${LIVER}"/></g>
      ${tag(146, 80, 'liver: first pass', '', 9)}
      ${caps(18, 40, 'warn', 'white')}${tag(66, 40, 'Mononitrate', '', 9)}
      ${caps(18, 128, 'immune', 'white')}${tag(64, 128, 'Dinitrate', '', 9)}
      <path class="s-ink" d="M102 40 H186 M102 128 H186" style="stroke-width:1.2;stroke-dasharray:3 4"/>
      <path class="s-ink" d="M140 48 V64 M140 120 V100" style="stroke-width:1.2;stroke-dasharray:3 4"/>
      <g class="ansmotion">
        ${[0, .7, 1.4].map(b => `<g><circle class="f-warn" r="4.5"/><animateMotion dur="2.1s" begin="${b}s" repeatCount="indefinite" path="M104 40 H186"/></g>`).join('')}
        ${[0, .7, 1.4].map(b => `<g><circle class="f-immune" r="4.5"/><animateMotion dur="2.1s" begin="${b}s" repeatCount="indefinite" path="M104 128 H130 L140 100"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.7;1" dur="2.1s" begin="${b}s" repeatCount="indefinite"/></g>`).join('')}
        <g><circle class="f-immune" r="4.5"/><animateMotion dur="2.1s" begin=".35s" repeatCount="indefinite" path="M104 128 H186"/></g>
      </g>
      ${qtag(240, 40, '~100% gets through', 9.5)}${tag(240, 60, 'chronic angina only', 'ans', 9)}
      ${qtag(240, 128, 'Big first-pass loss', 9.5)}${tag(240, 148, 'prevent or treat', 'ans', 9)}
      ${tag(150, 170, 'mono: not for acute; never stop either suddenly', 'ans', 9)}`),

    /* ranolazine: long QT, no HR/BP change, CYP3A4, not for acute */
    ranolazine: ART(`
      ${paper(8, 8, 284, 52)}
      <path class="s-bad a-draw" pathLength="400" d="${ecg(10, 290, 42, [22, 118, 214], 0, 16)}" style="stroke-width:2"/>
      <g class="ans">
        <path d="M136 54 V60 M136 57 H190 M190 54 V60" stroke="var(--c-germ)" stroke-width="2" fill="none"/>
      </g>
      ${qtag(163, 72, 'QT prolonged', 9.5)}
      <g transform="translate(36 112)">${gauge(0, 0, 15, 0, 0, 3)}</g>${tx(36, 128, 'HR', 9, 'ink')}
      <g transform="translate(78 112)">${gauge(0, 0, 15, 0, 0, 3)}</g>${tx(78, 128, 'BP', 9, 'ink')}
      <circle class="f-warn" cx="160" cy="104" r="15"/><circle cx="160" cy="104" r="11" fill="#ffb3a0" stroke="var(--art-line)" stroke-width="1"/>
      <path d="M160 93 V115 M149 104 H171 M152 96 L168 112 M168 96 L152 112" stroke="#ffffff" stroke-width="1" opacity=".8"/>
      <path class="f-acid" d="M258 86 L246 106 L256 106 L248 124 L268 100 L258 100 L266 86 Z"/>
      <g class="ans"><g class="a-blink">${NO(160, 104, 19)}${NO(257, 105, 19)}</g></g>
      ${qtag(57, 142, 'HR, BP unchanged', 9.5)}${qtag(160, 142, 'CYP3A4 (grapefruit)', 9)}${qtag(257, 142, 'Not for acute', 9.5)}
      ${qtag(150, 166, 'Add-on: chronic stable angina', 9.5)}`),

    /* ranolazine contraindications */
    ranoNo: ART(`
      ${caps(150, 90, 'mouth', 'white', 0, 1.4)}${tag(150, 108, 'ranolazine', '', 9)}
      <g class="ans">
        ${pop(0, `<g transform="translate(46 22) scale(.85)"><path class="f-liver" style="stroke-width:1.8" d="${LIVER}"/></g>` +
          [[62, 32], [78, 28], [88, 38], [70, 42], [56, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#e9b0a0" stroke="var(--art-line)" stroke-width=".8"/>`).join('') + NO(102, 26, 9))}
        ${pop(1, `<g transform="translate(196 18) scale(.7)"><path class="f-liver" style="stroke-width:2.1" d="${KID}"/></g>` +
          `<rect class="f-white" x="226" y="22" width="22" height="26" rx="3"/><path d="M230 30 H244 M230 36 H240" stroke="var(--art-line)" stroke-width="1.5"/>` +
          `<path class="s-vein a-flow" d="M218 34 H226" style="stroke-width:2"/>`)}
        ${pop(2, `<g class="a-spin" style="animation-duration:5s"><path class="f-germ" d="M75 102 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0"/><path d="M75 90 v-4 M75 114 v4 M63 102 h-4 M87 102 h4" stroke="var(--c-germ)" stroke-width="4"/></g>` +
          tx(75, 105.5, '3A4', 9, 'on') + NO(104, 96, 9))}
        ${pop(3, `<rect class="f-white" x="208" y="88" width="34" height="28" rx="4"/><rect class="f-bad" x="208" y="88" width="34" height="8" rx="3"/>` + tx(225, 110, '500', 10) +
          tx(258, 108, '×2', 11, 'ink'))}
      </g>
      ${qtag(75, 66, 'Liver cirrhosis', 9.5)}${qtag(225, 66, 'Dialysis / CrCl < 30', 9.5)}
      ${qtag(75, 142, 'Strong CYP3A4 drugs', 9.5)}${tag(75, 162, 'inhibitors or inducers', 'ans', 9)}
      ${qtag(225, 142, 'Max 500 mg BID', 9.5)}${tag(225, 162, 'with diltiazem, verapamil', 'ans', 9)}`),

    /* lifestyle teaching */
    lifestyle: ART(`
      ${[[52, 38, 'bad'], [150, 38, 'good'], [248, 38, 'gall'], [52, 116, 'pancreas'], [150, 116, 'warn'], [248, 116, 'immune']].map(([x, y, c]) =>
        `<circle cx="${x}" cy="${y}" r="24" fill="${C(c)}" opacity=".25" stroke="var(--art-line)" stroke-width="1.2"/>`).join('')}
      <g class="ans">
        ${pop(0, `<rect class="f-white" x="34" y="34" width="30" height="8" rx="2"/><rect class="f-food" x="28" y="34" width="8" height="8" rx="2"/><rect class="f-warn" x="64" y="34" width="5" height="8" rx="1"/>` + NO(50, 38, 18))}
        ${pop(1, `<g class="a-bob">${runner(150, 48)}</g>`)}
        ${pop(2, `<ellipse class="f-white" cx="248" cy="40" rx="20" ry="13"/><circle class="f-gall" cx="240" cy="36" r="5"/><circle class="f-bad" cx="252" cy="34" r="4"/><circle class="f-food" cx="244" cy="45" r="2.5"/><circle class="f-food" cx="249" cy="46" r="2.5"/><path class="f-vein" d="M252 42 Q258 38 264 42 L268 38 L268 46 L264 42 Q258 47 252 42 Z"/>`)}
        ${pop(3, caps(52, 116, 'pancreas', 'white', -25, 1.3))}
        ${pop(4, `<g transform="translate(150 122)">${gauge(0, 0, 15, 50, -10, 3)}</g>`)}
        ${pop(5, `<rect class="f-white" x="236" y="100" width="22" height="32" rx="4"/><rect x="240" y="104" width="14" height="10" rx="2" fill="var(--c-good)"/><path class="f-blood" d="M264 102 q4 6 4 9 a4 4 0 0 1 -8 0 q0 -3 4 -9z"/>`)}
      </g>
      ${qtag(52, 74, 'Stop smoking', 9.5)}${qtag(150, 74, '150+ min/week', 9.5)}${qtag(248, 74, 'Veg, fruit, fish', 9.5)}
      ${qtag(52, 152, 'Statin (ASCVD)', 9.5)}${qtag(150, 152, 'BP < 130/80', 9.5)}${qtag(248, 152, 'Screen diabetes', 9.5)}
      ${tag(248, 92, '+ legumes', 'ans', 9)}`),

    /* supplements: bottles on a shelf */
    supplements: ART(`
      <rect class="f-food" x="4" y="104" width="292" height="8" rx="2"/>
      ${[['fat', 34], ['good', 92], ['food', 150], ['white', 208], ['warn', 266]].map(([c, x]) =>
        `<rect class="f-${c}" x="${x - 17}" y="48" width="34" height="56" rx="7"/><rect class="f-white" x="${x - 10}" y="38" width="20" height="12" rx="3"/><rect x="${x - 13}" y="62" width="26" height="28" rx="3" fill="#ffffff" stroke="var(--art-line)" stroke-width="1"/>`).join('')}
      <g class="ans">
        ${pop(0, `<ellipse class="f-fat" cx="34" cy="76" rx="9" ry="6"/><path class="f-vein" d="M28 76 Q32 72 36 76 L40 72 L40 80 L36 76 Q32 80 28 76 Z" transform="translate(0 -1) scale(1)"/>`)}
        ${pop(1, `<path class="f-good" d="M84 84 Q84 66 100 66 Q100 84 84 84 Z"/><path d="M84 84 L96 70" stroke="var(--art-line)" stroke-width="1"/>`)}
        ${pop(2, `<path d="M150 88 V64" stroke="var(--c-food)" stroke-width="2"/>${[66, 72, 78].map(y => `<ellipse class="f-fat" cx="146" cy="${y}" rx="3" ry="2"/><ellipse class="f-fat" cx="154" cy="${y}" rx="3" ry="2"/>`).join('')}`)}
        ${pop(3, `<path class="f-white" d="M208 66 C214 72 220 76 218 82 C216 88 200 88 198 82 C196 76 202 72 208 66 Z"/><path d="M208 70 V86 M203 76 Q205 82 204 86 M213 76 Q211 82 212 86" stroke="var(--art-line)" stroke-width=".8" fill="none"/>`)}
        ${pop(4, caps(266, 76, 'bad', 'warn', 0, .9))}
      </g>
      ${qtag(34, 22, 'Fish oil', 9.5)}${qtag(92, 22, 'Sterols', 9.5)}${qtag(150, 22, 'Fiber', 9.5)}${qtag(208, 22, 'Garlic', 9.5)}${qtag(266, 22, 'CoQ10', 9.5)}
      <g class="a-blink"><path class="f-acid" d="M40 124 L58 156 L22 156 Z"/>${tx(40, 152, '!', 14)}</g>
      ${qtag(168, 132, 'Evidence limited', 10)}
      ${tag(168, 156, 'check for drug interactions', 'ans', 9.5)}`),
  });
})();
