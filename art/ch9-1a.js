/* Chapter 9 Part 1 art (a): colorful replacements for PICS, loaded after the page sets PICS.
   Cards 1 and 3-23. Front view = patient's right on the viewer's left. */
(() => {
  const C = c => c[0] === '#' ? c : `var(--c-${c})`;
  // outlined tube along a path
  const T = (d, c, w = 8, more = '') =>
    `<path d="${d}" fill="none" stroke="var(--art-line)" stroke-width="${w + 3}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${C(c)}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${more}/>`;
  // thin dotted leader line
  const L = (x1, y1, x2, y2) => `<path class="s-ink" d="M${x1} ${y1} L${x2} ${y2}" style="stroke-width:1;stroke-dasharray:2 3"/>`;
  // J-shaped stomach, front view, local box about 0..96 x 0..112: cardia top middle, fundus up to the viewer's right, pylorus low on the viewer's left
  const ST = 'M36 14 C30 -2 70 -6 82 12 C96 34 96 70 78 92 C64 108 34 112 14 100 L4 98 L4 84 L14 84 C30 88 46 80 50 64 C54 48 46 30 36 14 Z';
  const stom = (tx, ty, s, inner = '', cls = 'f-stomach') => `<g transform="translate(${tx} ${ty}) scale(${s})">` +
    T('M40 -10 L41 12', 'esoph', 9) + `<path class="${cls}" d="${ST}" style="stroke-width:${(1.5 / s).toFixed(2)}"/>${inner}</g>`;
  // wavy line along a polyline (stomach rugae)
  const zig = (pts, amp, waves) => {
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = '';
    for (let k = 0; k <= 80; k++) {
      let s = k / 80 * tot, i = 0;
      while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; }
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], f = Math.min(1, s / seg[i]);
      const nx = -(y1 - y0) / seg[i], ny = (x1 - x0) / seg[i], o = amp * Math.sin(k / 80 * tot / tot * waves * 2 * Math.PI);
      d += (k ? 'L' : 'M') + (x0 + (x1 - x0) * f + nx * o).toFixed(1) + ' ' + (y0 + (y1 - y0) * f + ny * o).toFixed(1);
    }
    return d;
  };
  const RUGAE = [[[62, 6], [84, 24], [88, 52], [80, 80], [60, 98], [30, 104], [14, 96]],
    [[54, 18], [70, 34], [74, 58], [66, 80], [46, 94], [18, 94]],
    [[44, 22], [58, 42], [60, 62], [54, 78], [38, 90], [16, 92]]];
  // bumpy ring (mucosal folds)
  const bumpy = (cx, cy, r, a, n) => {
    let d = '';
    for (let i = 0; i < 96; i++) { const t = i / 96 * 2 * Math.PI, rr = r + a * Math.cos(n * t); d += (i ? 'L' : 'M') + (cx + rr * Math.cos(t)).toFixed(1) + ' ' + (cy + rr * Math.sin(t)).toFixed(1); }
    return d + 'Z';
  };
  // side-view head facing left (nose on the left), neck to y 96
  const HEAD = 'M78 6 C104 -2 136 8 138 34 C140 50 132 60 126 70 L124 96 L90 96 L88 70 C76 66 64 62 60 56 C56 52 58 48 54 46 C50 44 52 41 54 39 C50 37 46 34 44 30 L52 22 C56 12 66 8 78 6 Z';
  // a gastric gland: surface, pit, mucous neck cells, parietal cells, chief cells at the base. hi = 'p' or 'c'
  const gland = hi => {
    let s = `<rect class="f-fat" x="8" y="16" width="72" height="160" rx="6" opacity=".7"/>` +
      `<rect class="f-mucus" x="8" y="6" width="30" height="14" rx="3"/><rect class="f-mucus" x="50" y="6" width="30" height="14" rx="3"/>`;
    for (let i = 0; i < 10; i++) {
      const y = 28 + i * 14.6, type = i < 2 ? 'm' : i < 6 ? 'p' : 'c';
      const cls = type === 'm' ? 'f-mucus' : type === 'p' ? 'f-mouth' : 'f-spleen';
      const rx = type === 'p' ? 12 : 9, on = type === hi;
      [30, 58].forEach((x, j) => {
        const cx = type === 'p' ? x + (j ? 3 : -3) : x;
        s += `<g class="${on ? 'a-pulse' : ''}" style="animation-delay:${(i * 0.15).toFixed(2)}s"><ellipse class="${cls}" cx="${cx}" cy="${y}" rx="${rx}" ry="7"/>` +
          `<circle class="f-tumor noline" cx="${cx + (type === 'c' ? (j ? 4 : -4) : 0)}" cy="${y}" r="2.2"/></g>`;
      });
    }
    return s + `<path d="M44 20 L44 170" stroke="var(--art-line)" stroke-width="1.5"/>`;
  };
  // pac-man enzyme at origin, mouth facing right; open = animated jaws
  const pac = (cls, open) => open
    ? `<path class="${cls}" d="M0 0 L14 0 A14 14 0 0 0 -14 0 Z"><animateTransform attributeName="transform" type="rotate" values="-32;-4;-32" dur=".8s" repeatCount="indefinite"/></path>` +
      `<path class="${cls}" d="M0 0 L14 0 A14 14 0 0 1 -14 0 Z"><animateTransform attributeName="transform" type="rotate" values="32;4;32" dur=".8s" repeatCount="indefinite"/></path><circle cx="-3" cy="-7" r="2" fill="var(--art-line)"/>`
    : `<circle class="${cls}" r="13"/><path d="M0 0 L12 0" stroke="var(--art-line)" stroke-width="1.5"/><circle cx="-3" cy="-6" r="2" fill="var(--art-line)"/>`;

  Object.assign(PICS, {
    /* 1. the 3 jobs: take in, digest, eliminate */
    jobs: ART(`
      ${T('M14 30 H286', 'blood', 11)}<path d="M14 30 H286" class="s-white a-flow" style="stroke-width:2"/>
      ${tag(150, 30, 'nutrients, water, electrolytes → body', 'ans', 9.5)}
      <circle class="f-bad" cx="14" cy="80" r="7"/><path class="f-good" d="M14 73 q4 -6 8 -4 q-3 5 -8 4z"/>
      <ellipse class="f-mouth" cx="40" cy="100" rx="20" ry="15"/><ellipse class="f-muscle" cx="44" cy="100" rx="12" ry="8"/>
      <rect class="f-white" x="38" y="92" width="14" height="4" rx="1.5"/><rect class="f-white" x="38" y="104" width="14" height="4" rx="1.5"/>
      ${T('M60 100 L118 100', 'esoph', 9)}
      <ellipse class="f-stomach" cx="148" cy="100" rx="32" ry="24"/>
      <g class="ans"><g class="a-shake"><rect class="f-food" x="134" y="92" width="9" height="8" rx="2"/><circle class="f-food" cx="154" cy="96" r="4"/><circle class="f-food" cx="146" cy="108" r="3"/><circle class="f-food" cx="160" cy="106" r="2.5"/><path class="f-acid" d="M136 108 q3 -6 6 0 a3 3 0 0 1 -6 0z"/></g></g>
      ${T('M180 104 C196 110 204 116 212 106 C220 96 228 112 236 104 C244 96 250 112 258 104', 'small', 8)}
      ${T('M258 104 L272 104 L272 118', 'large', 9)}
      <ellipse class="f-stool a-drop" cx="272" cy="128" rx="4" ry="5"/>
      <g class="ans"><circle class="f-good a-rise" cx="138" cy="58" r="4"/><circle class="f-water a-rise" cx="156" cy="58" r="4" style="animation-delay:.6s"/>
        <circle class="f-fat a-rise" cx="212" cy="62" r="4" style="animation-delay:.3s"/><circle class="f-good a-rise" cx="230" cy="62" r="4" style="animation-delay:.9s"/><circle class="f-water a-rise" cx="248" cy="62" r="4" style="animation-delay:1.2s"/></g>
      <g class="ansmotion"><circle class="f-food" r="5"><animateMotion dur="6s" repeatCount="indefinite" path="M10 100 L118 100 C130 100 150 104 178 104 C196 110 204 116 212 106 C220 96 228 112 236 104 C244 96 250 112 258 104 L272 104 L272 124"/></circle></g>
      ${L(40, 141, 40, 116)}${L(148, 141, 148, 125)}${L(262, 141, 270, 134)}
      ${qtag(40, 150, '1 Take in')}${qtag(148, 150, '2 Digest')}${qtag(256, 150, '3 Eliminate')}`),

    /* 3. the 5 accessory organs */
    accessory: ART(`
      <path class="f-skin" d="M118 50 C80 54 70 70 70 100 L72 178 L228 178 L230 100 C230 70 220 54 182 50 Z" opacity=".35"/>
      <circle class="f-skin" cx="150" cy="26" r="20"/><circle cx="143" cy="21" r="1.8" fill="var(--art-line)"/><circle cx="157" cy="21" r="1.8" fill="var(--art-line)"/>
      <path class="s-line" d="M144 34 Q150 38 156 34" style="stroke-width:1.5"/>
      <ellipse class="f-mucus a-pulse" cx="131" cy="30" rx="5" ry="9"/><ellipse class="f-mucus a-pulse" cx="169" cy="30" rx="5" ry="9"/>
      <ellipse class="f-mucus a-pulse" cx="139" cy="44" rx="6" ry="4" style="animation-delay:.4s"/><ellipse class="f-mucus a-pulse" cx="161" cy="44" rx="6" ry="4" style="animation-delay:.4s"/>
      <g class="ans"><circle class="f-water a-drop" cx="146" cy="40" r="2"/><circle class="f-water a-drop" cx="154" cy="40" r="2" style="animation-delay:.8s"/></g>
      ${T('M150 44 L152 70', 'esoph', 6)}
      <path class="f-stomach" d="M150 68 C160 60 190 60 202 74 C212 90 204 108 186 110 C176 112 168 108 170 100 C172 92 160 84 152 80 Z"/>
      <g opacity=".35">${T('M196 120 L196 150 Q196 162 182 162 L118 162 Q104 162 104 150 L104 120 Q104 112 112 112 L188 112 Q196 112 196 120', 'large', 9)}
      ${T('M166 140 C176 130 136 130 128 140 C122 148 176 150 168 156', 'small', 6)}</g>
      ${T('M170 102 C152 102 140 106 138 118 C136 134 148 142 168 140', 'small', 8)}
      <path class="f-pancreas" d="M146 122 C150 114 172 116 190 114 C204 112 214 112 214 118 C210 124 192 126 176 128 C164 130 152 134 148 130 Z"/>
      <path d="M212 118 C190 120 166 122 142 124" stroke="var(--c-warn)" stroke-width="2" fill="none" class="a-flow" style="stroke-dasharray:4 4"/>
      <path class="f-liver" d="M84 72 C96 58 146 58 172 66 C176 70 170 74 160 78 C140 88 112 96 94 96 C84 94 80 82 84 72 Z"/>
      <path class="f-gall" d="M112 92 C108 98 108 108 114 110 C120 112 124 104 122 94 Z"/>
      ${T('M132 86 L136 98 M118 94 C124 98 132 98 136 98 L140 122', 'bile', 3)}
      <path d="M132 86 L136 98 M118 94 C124 98 132 98 136 98 L140 122" stroke="var(--c-gall)" stroke-width="1.6" fill="none" class="a-flow"/>
      <g class="ansmotion"><circle class="f-food" r="4"><animateMotion dur="6s" repeatCount="indefinite" path="M150 36 L152 70 C160 64 190 64 198 78 C204 92 196 104 172 102 C152 102 140 106 138 118 C136 134 148 142 168 140"/></circle></g>
      ${L(98, 30, 124, 30)}${L(74, 70, 100, 76)}${L(78, 104, 110, 102)}${L(76, 130, 136, 112)}${L(244, 132, 212, 122)}
      ${qtag(54, 30, 'Salivary glands', 10)}${qtag(44, 70, 'Liver')}${qtag(42, 104, 'Gallbladder')}${qtag(44, 132, 'Bile ducts')}${qtag(262, 136, 'Pancreas')}
      ${tag(150, 172, 'food goes only through the tube', 'ans', 9.5)}`),

    /* 4. hepatobiliary system */
    hepato: ART(`
      <path class="f-stomach" d="M232 52 C262 46 294 66 292 92 C290 116 262 124 232 118 C216 116 208 114 204 112 L204 100 C214 102 226 96 232 84 C236 72 232 60 232 52 Z" opacity=".55"/>
      ${T('M206 106 C172 104 152 108 148 124 C144 142 152 160 180 162 C196 163 206 158 212 150', 'small', 15)}
      <path class="f-pancreas" d="M160 132 C166 122 190 126 220 124 C250 120 278 112 288 118 C294 126 272 136 242 140 C216 142 198 148 184 152 C168 156 156 146 160 132 Z"/>
      <path d="M284 120 C250 128 210 132 186 138 C172 142 160 146 154 148" stroke="var(--c-warn)" stroke-width="2.5" fill="none" class="a-flow"/>
      <path class="f-liver" d="M14 40 C34 12 140 6 232 24 C266 30 274 46 252 58 C212 76 152 92 92 96 C46 98 14 80 14 40 Z"/>
      <path class="s-line" d="M128 30 C134 50 132 70 126 90" style="stroke-width:1;opacity:.5"/>
      <path class="f-gall a-pulse" d="M100 86 C90 96 86 120 98 124 C110 128 118 110 114 92 C112 86 104 84 100 86 Z"/>
      ${T('M112 72 L124 92 M140 72 L124 92 L130 112 M108 88 C114 96 124 104 130 112 L152 148', 'bile', 4)}
      <path d="M112 72 L124 92 M140 72 L124 92 L130 112 M108 88 C114 96 124 104 130 112 L152 148" stroke="var(--c-gall)" stroke-width="1.8" fill="none" class="a-flow"/>
      <circle class="f-muscle" cx="153" cy="149" r="3.5"/>
      <g class="ansmotion"><circle class="f-bile" r="3.5"><animateMotion dur="3s" repeatCount="indefinite" path="M126 70 L124 92 L130 112 L152 148"/></circle>
        <circle r="3" fill="var(--c-warn)" stroke="var(--art-line)"><animateMotion dur="3.4s" repeatCount="indefinite" path="M284 120 C250 128 210 132 186 138 C172 142 160 146 154 148"/></circle></g>
      ${tag(262, 86, 'stomach', '', 9)}${tag(200, 172, 'duodenum', '', 9)}
      ${L(56, 130, 92, 112)}
      ${qtag(70, 50, 'Liver', 11)}${qtag(46, 132, 'Gallbladder')}${qtag(250, 154, 'Pancreas')}
      ${tag(78, 158, 'all drain into the duodenum', 'ans', 9.5)}`),

    /* 5. the 4 layers of the GI wall */
    layers: ART(`
      <circle class="f-lymph" cx="84" cy="90" r="84"/>
      <circle class="f-muscle" cx="84" cy="90" r="79"/>
      <circle cx="84" cy="90" r="79" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="1.5 5" opacity=".55"/>
      <circle cx="84" cy="90" r="72" fill="none" stroke="var(--art-line)" stroke-width="1"/>
      <circle cx="84" cy="90" r="67" fill="none" stroke="#ffffff" stroke-width="1" opacity=".45"/>
      <circle cx="84" cy="90" r="62" fill="none" stroke="#ffffff" stroke-width="1" opacity=".45"/>
      <circle class="f-fat" cx="84" cy="90" r="57"/>
      <g class="a-blink"><circle class="f-blood" cx="84" cy="40" r="3"/><circle class="f-vein" cx="92" cy="41" r="3"/><circle class="f-blood" cx="134" cy="92" r="3"/><circle class="f-vein" cx="133" cy="101" r="3"/>
        <circle class="f-blood" cx="40" cy="120" r="3"/><circle class="f-vein" cx="47" cy="126" r="3"/><circle class="f-blood" cx="44" cy="56" r="3"/><circle class="f-vein" cx="114" cy="134" r="3"/></g>
      <g class="a-blink" style="animation-delay:.7s"><circle class="f-nerve" cx="66" cy="38" r="2.5"/><circle class="f-nerve" cx="130" cy="74" r="2.5"/><circle class="f-nerve" cx="64" cy="140" r="2.5"/></g>
      <path class="f-mouth" d="${bumpy(84, 90, 38, 6, 9)}"/>
      <circle class="f-mucus" cx="84" cy="90" r="22"/>
      <circle class="f-food a-pulse" cx="84" cy="90" r="11"/>
      ${L(108, 66, 186, 28)}${L(132, 78, 186, 64)}${L(152, 101, 186, 100)}${L(160, 128, 186, 136)}
      <g class="a-fadein" style="--d:0">${qtag(236, 28, '1 Mucosa')}</g><g class="a-fadein" style="--d:1">${qtag(236, 64, '2 Submucosa')}</g>
      <g class="a-fadein" style="--d:2">${qtag(236, 100, '3 Muscle layer')}</g><g class="a-fadein" style="--d:3">${qtag(236, 136, '4 Serosa')}</g>
      ${tag(232, 164, 'esophagus: adventitia', 'ans', 9.5)}
      ${tag(84, 90, 'food', '', 9)}`),

    /* 6. mucosa: mucus shield against acid, fast cell turnover */
    mucosa: ART(`
      <rect x="0" y="0" width="300" height="52" fill="var(--c-acid)" opacity=".18"/>
      <rect class="f-food" x="226" y="12" width="12" height="9" rx="3"/><circle class="f-food" cx="262" cy="30" r="5"/><circle class="f-good" cx="200" cy="34" r="4"/>
      ${tag(64, 14, 'stomach acid, pH 1–2', '', 9.5)}
      <g class="ans"><path class="f-acid a-drop" d="M40 38 q4 -8 8 0 a4 4 0 0 1 -8 0z"/><path class="f-acid a-drop" d="M100 36 q4 -8 8 0 a4 4 0 0 1 -8 0z" style="animation-delay:.5s"/>
        <path class="f-acid a-drop" d="M160 38 q4 -8 8 0 a4 4 0 0 1 -8 0z" style="animation-delay:1s"/><path class="f-acid a-drop" d="M280 38 q4 -8 8 0 a4 4 0 0 1 -8 0z" style="animation-delay:.25s"/></g>
      <path class="f-mucus a-bob" d="M0 50 Q18 44 36 50 T72 50 T108 50 T144 50 T180 50 T216 50 T252 50 T288 50 T324 50 L324 64 L0 64 Z"/>
      ${[...Array(10)].map((_, i) => {
        const x = 2 + i * 30, gob = i % 3 === 1, fresh = i === 7;
        return `<rect class="f-mouth${fresh ? ' a-grow' : ''}" x="${x}" y="62" width="28" height="36" rx="4"/>` +
          `<ellipse class="f-germ" cx="${x + 14}" cy="88" rx="4" ry="5"/>` +
          (gob ? `<ellipse class="f-mucus a-pulse" cx="${x + 14}" cy="72" rx="9" ry="8"/>` : '');
      }).join('')}
      <rect class="f-skin" x="0" y="98" width="300" height="14"/><path class="s-blood" d="M10 105 Q60 98 110 105 T210 105 T300 105" style="stroke-width:1.5"/>
      <rect class="f-muscle" x="0" y="112" width="300" height="4"/>
      <rect class="f-fat" x="0" y="116" width="300" height="24"/>
      <circle class="f-blood" cx="70" cy="128" r="4"/><circle class="f-vein" cx="82" cy="128" r="4"/><circle class="f-nerve" cx="196" cy="128" r="3"/>
      <rect class="f-muscle" x="0" y="140" width="300" height="28"/>
      <path d="M0 147 H300 M0 154 H300 M0 161 H300" stroke="#ffffff" stroke-width="1" opacity=".4"/>
      <rect class="f-lymph" x="0" y="168" width="300" height="12"/>
      ${tag(40, 128, 'submucosa', '', 9)}${tag(40, 154, 'muscle', '', 9)}${tag(150, 174, 'serosa', '', 9)}
      <path d="M296 50 L292 50 L292 116 L296 116" stroke="var(--art-line)" stroke-width="2" fill="none"/>
      ${qtag(246, 82, 'Mucosa (innermost)', 10)}
      ${tag(140, 58, 'mucus shield', 'ans', 9.5)}${tag(226, 108, 'cells renew fast', 'ans', 9)}`),

    /* 7. peristalsis */
    peri: ART(`
      <rect x="8" y="78" width="284" height="36" fill="var(--c-mucus)" opacity=".3"/>
      <rect class="f-esoph" x="8" y="62" width="284" height="16"/><rect class="f-esoph" x="8" y="114" width="284" height="16"/>
      <path d="${[...Array(28)].map((_, i) => `M${14 + i * 10} 66 V78 M${14 + i * 10} 114 V126`).join(' ')}" stroke="var(--art-line)" stroke-width="1" opacity=".35"/>
      <rect class="f-muscle" x="8" y="62" width="284" height="4" opacity=".8"/><rect class="f-muscle" x="8" y="126" width="284" height="4" opacity=".8"/>
      ${q(150, 46)}<g class="q"><ellipse class="f-food" cx="150" cy="96" rx="17" ry="16"/></g>
      <g class="ansmotion"><g><animateTransform attributeName="transform" type="translate" values="0 0;190 0" dur="4s" repeatCount="indefinite"/>
        <rect class="f-muscle" x="20" y="62" width="32" height="16"/><rect class="f-muscle" x="20" y="114" width="32" height="16"/>
        <path class="f-muscle" d="M18 78 Q36 100 54 78 Z"/><path class="f-muscle" d="M18 114 Q36 92 54 114 Z"/>
        <ellipse class="f-food" cx="72" cy="96" rx="17" ry="16"/>
        <path class="s-warn" d="M94 96 L108 96 M102 90 L108 96 L102 102" style="stroke-width:2.5"/>
        ${tag(36, 48, 'squeeze', '', 10)}${tag(108, 48, 'relax', '', 10)}</g></g>
      <path class="s-muscle a-flow" d="M8 148 Q23 138 38 148 T68 148 T98 148 T128 148 T158 148 T188 148 T218 148 T248 148 T278 148 T308 148" style="stroke-width:2.5;animation-direction:reverse"/>
      ${tag(150, 168, 'muscle wave pushes food along →', 'ans', 9.5)}`),

    /* 8. the 3 enteric nerve plexuses */
    plexus: ART(`
      <path class="f-mouth" d="M4 8 ${[...Array(15)].map((_, i) => `Q${12 + i * 20} -2 ${24 + i * 20} 8`).join(' ')} L296 38 L4 38 Z"/>
      <rect class="f-fat" x="4" y="38" width="292" height="34"/>
      <rect class="f-muscle" x="4" y="72" width="292" height="30"/>
      <path d="${[...Array(36)].map((_, i) => `M${8 + i * 8} 75 V99`).join(' ')}" stroke="#ffffff" stroke-width="1" opacity=".35"/>
      <rect class="f-fat" x="4" y="102" width="292" height="8"/>
      <rect class="f-muscle" x="4" y="110" width="292" height="26"/>
      <path d="M4 116 H296 M4 122 H296 M4 128 H296" stroke="#ffffff" stroke-width="1" opacity=".35"/>
      <rect class="f-fat" x="4" y="136" width="292" height="12"/>
      <rect class="f-lymph" x="4" y="148" width="292" height="10"/>
      <path class="s-nerve" d="M30 56 L30 106 M118 56 L118 106 M206 106 L206 142 M74 106 L74 142" style="stroke-width:1.5;opacity:.8"/>
      ${[[56, 0], [106, 1], [142, 2]].map(([y, k]) => {
        const xs = [...Array(7)].map((_, i) => 8 + i * 44);
        const d = xs.map((x, i) => (i ? 'L' : 'M') + x + ' ' + (y + (i % 2 ? -4 : 4))).join(' ');
        return `<path d="${d}" stroke="var(--art-line)" stroke-width="4.5" fill="none"/><path class="s-nerve a-flow" d="${d}" style="stroke-width:2.5;stroke-dasharray:8 4"/>` +
          xs.map((x, i) => `<circle class="f-nerve a-blink" cx="${x}" cy="${y + (i % 2 ? -4 : 4)}" r="4.5" style="animation-delay:${(i * 0.2 + k * 0.4).toFixed(1)}s"/>`).join('');
      }).join('')}
      <g class="ans">${tag(34, 24, 'mucosa', '', 9)}${tag(40, 46, 'submucosa', '', 9)}${tag(40, 88, 'circular m.', '', 9)}${tag(40, 124, 'longitudinal m.', '', 9)}${tag(40, 168, 'serosa', '', 9)}</g>
      ${qtag(206, 56, '1 Submucosal (Meissner)', 9.5)}${qtag(206, 106, '2 Myenteric (Auerbach)', 9.5)}${qtag(206, 168, '3 Subserosal', 9.5)}
      ${L(206, 160, 206, 146)}`),

    /* 9. parietal vs visceral peritoneum (cross-section, front at top) */
    peritoneum: ART(`
      <ellipse class="f-skin" cx="150" cy="92" rx="146" ry="86"/>
      <ellipse class="f-muscle" cx="150" cy="92" rx="136" ry="78"/>
      <circle class="f-bone" cx="150" cy="156" r="11"/><path class="f-bone" d="M150 145 L144 136 L156 136 Z"/>
      <ellipse cx="150" cy="86" rx="124" ry="60" fill="var(--c-lymph)" stroke="var(--c-immune)" stroke-width="4"/>
      <path d="M150 144 L150 128 M150 128 L112 100 M150 128 L150 82 M150 128 L190 100" stroke="var(--c-good)" stroke-width="5" fill="none"/>
      <path d="M150 144 L150 128 M150 128 L112 100 M150 128 L150 82 M150 128 L190 100" stroke="var(--c-fat)" stroke-width="2" fill="none"/>
      <g class="a-bob">
        <circle cx="106" cy="86" r="19" fill="none" stroke="var(--c-good)" stroke-width="3.5"/><circle class="f-small" cx="106" cy="86" r="16"/><circle class="f-mucus" cx="106" cy="86" r="6"/>
        <circle cx="150" cy="66" r="19" fill="none" stroke="var(--c-good)" stroke-width="3.5"/><circle class="f-small" cx="150" cy="66" r="16"/><circle class="f-mucus" cx="150" cy="66" r="6"/>
        <circle cx="194" cy="86" r="19" fill="none" stroke="var(--c-good)" stroke-width="3.5"/><circle class="f-small" cx="194" cy="86" r="16"/><circle class="f-mucus" cx="194" cy="86" r="6"/></g>
      <g class="ans">${[[62, 70], [78, 116], [236, 110], [244, 66], [196, 124], [104, 124], [184, 46], [116, 44]].map(([x, y], i) =>
        `<circle class="f-water a-blink" cx="${x}" cy="${y}" r="3" style="animation-delay:${(i * 0.2).toFixed(1)}s"/>`).join('')}</g>
      ${qtag(150, 26, 'Parietal: lines the wall', 9.5)}
      ${qtag(232, 140, 'Visceral: wraps organs', 9.5)}${L(208, 98, 222, 132)}
      ${tag(68, 140, 'fluid cuts friction', 'ans', 9.5)}`),

    /* 10. mesentery */
    mesentery: ART(`
      ${[...Array(8)].map((_, i) => `<rect class="f-bone" x="6" y="${12 + i * 20}" width="22" height="16" rx="4"/>`).join('')}
      <path d="M34 54 C110 12 210 12 252 30 C286 60 290 116 254 150 C210 172 110 168 34 126 Z" fill="var(--c-fat)" opacity=".75" stroke="var(--art-line)" stroke-width="1.5"/>
      <path d="M34 54 L34 126" stroke="var(--art-line)" stroke-width="4"/><path d="M38 56 L38 124" stroke="var(--art-line)" stroke-width="1" opacity=".6"/>
      ${['M36 90 C90 84 150 50 206 28', 'M36 90 C110 86 190 74 272 66', 'M36 90 C110 96 190 110 270 124', 'M36 90 C90 98 150 132 210 156'].map(d =>
        `<path class="s-blood" d="${d}" style="stroke-width:2.5"/><path class="s-white a-flow" d="${d}" style="stroke-width:1"/>`).join('')}
      ${['M206 34 C150 56 90 92 36 96', 'M272 72 C190 80 110 92 36 96', 'M268 130 C190 116 110 102 36 96', 'M204 160 C150 138 90 104 36 96'].map(d =>
        `<path class="s-vein" d="${d}" style="stroke-width:2.5"/>`).join('')}
      <path class="s-nerve" d="M36 92 C100 80 170 56 230 42 M36 92 C110 108 180 134 240 144" style="stroke-width:1.5"/>
      <g class="a-bob">${T('M196 22 C240 16 270 34 278 62 C286 90 282 114 270 134 C258 156 234 166 196 164', 'small', 15)}
        <path d="M212 20 l2 6 M236 22 l0 6 M256 30 l-3 5 M270 44 l-5 3 M278 62 l-6 0 M280 84 l-6 0 M278 106 l-6 -1 M272 126 l-5 -2 M258 148 l-4 -4 M238 160 l-2 -5 M216 164 l0 -6" stroke="var(--art-line)" stroke-width="1"/></g>
      ${qtag(118, 52, 'Mesentery', 11)}
      ${tag(130, 124, 'double fold: carries vessels + nerves', 'ans', 9)}
      ${tag(68, 170, 'back body wall', '', 9)}${tag(244, 174, 'small intestine', '', 9)}`),

    /* 11. upper GI tract */
    upper: ART(`
      <path class="f-skin" d="M60 182 C60 128 76 104 90 96 L124 96 C142 104 196 112 206 182 Z" opacity=".45"/>
      <path class="f-skin" d="${HEAD}"/>
      <circle cx="66" cy="22" r="2" fill="var(--art-line)"/><ellipse class="f-skin" cx="126" cy="36" rx="5" ry="8"/>
      <ellipse class="f-muscle" cx="78" cy="42" rx="22" ry="5"/>
      <path class="f-mouth" d="M60 46 C68 40 88 38 100 44 C100 50 90 52 70 51 Z"/>
      ${T('M100 64 L99 106', '#a8d8ff', 6)}
      ${T('M106 26 C110 36 111 56 111 74', 'mouth', 7)}
      ${T('M111 74 L113 98 C114 106 124 106 132 110', 'esoph', 6)}
      <g class="a-pulse">${stom(112, 110, .5)}</g>
      <g opacity=".3">${T('M162 152 C176 144 190 150 186 160 C182 170 166 166 172 158', 'small', 6)}${T('M156 172 L198 172', 'large', 7)}</g>
      <g class="ansmotion"><circle class="f-food" r="4"><animateMotion dur="4.5s" repeatCount="indefinite" path="M48 42 L74 44 L98 44 C106 46 110 52 110 64 L111 74 L113 98 C114 106 124 106 136 124"/></circle></g>
      ${L(62, 46, 198, 26)}${L(112, 52, 198, 54)}${L(113, 90, 192, 82)}${L(150, 130, 196, 112)}
      ${qtag(240, 26, '1 Mouth')}${qtag(240, 54, '2 Pharynx')}${qtag(240, 82, '3 Esophagus')}${qtag(240, 112, '4 Stomach')}
      ${tag(242, 162, 'lower GI: intestines', 'ans', 9)}`),

    /* 12. what saliva does */
    saliva: ART(`
      <g transform="translate(-59 4) scale(1.3)">
        <path class="f-skin" d="${HEAD}"/><circle cx="66" cy="22" r="2" fill="var(--art-line)"/><ellipse class="f-skin" cx="128" cy="36" rx="4" ry="7"/>
        <ellipse class="f-muscle" cx="78" cy="42" rx="22" ry="5"/>
        <path class="f-mouth" d="M60 46 C68 40 88 38 100 44 C100 50 90 52 70 51 Z"/>
        <circle class="f-food a-pulse" cx="80" cy="41" r="4"/>
        <ellipse class="f-mucus a-pulse" cx="118" cy="46" rx="6" ry="10"/><path d="M114 44 C104 40 92 40 86 40" stroke="var(--c-water)" stroke-width="1.5" fill="none" class="a-flow"/>
        <ellipse class="f-mucus a-pulse" cx="100" cy="62" rx="9" ry="5" style="animation-delay:.5s"/><ellipse class="f-mucus a-pulse" cx="80" cy="54" rx="7" ry="3" style="animation-delay:.9s"/>
        <g class="ans"><circle class="f-water a-drop" cx="74" cy="34" r="1.8"/><circle class="f-water a-drop" cx="88" cy="34" r="1.8" style="animation-delay:.6s"/></g>
      </g>
      ${tag(62, 160, 'salivary glands', '', 9.5)}${L(62, 151, 92, 86)}
      <rect x="150" y="4" width="146" height="54" rx="10" fill="var(--c-pancreas)" opacity=".18"/>
      <rect x="150" y="62" width="146" height="54" rx="10" fill="var(--c-immune)" opacity=".15"/>
      <rect x="150" y="120" width="146" height="56" rx="10" fill="var(--c-water)" opacity=".15"/>
      <g>${[0, 1, 2].map(i => `<path class="f-pancreas" d="${[0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k; return (k ? 'L' : 'M') + (178 + i * 18 + 7 * Math.cos(a)).toFixed(1) + ' ' + (22 + 7 * Math.sin(a)).toFixed(1); }).join(' ')}Z"/>`).join('')}
        <path d="M185 22 H189" stroke="var(--art-line)" stroke-width="2"/>
        <g><animateTransform attributeName="transform" type="translate" values="0 0;8 0;8 0;0 0" dur="2s" repeatCount="indefinite"/>
          ${[0, 1].map(i => `<path class="f-pancreas" d="${[0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k; return (k ? 'L' : 'M') + (232 + i * 18 + 7 * Math.cos(a)).toFixed(1) + ' ' + (22 + 7 * Math.sin(a)).toFixed(1); }).join(' ')}Z"/>`).join('')}</g>
        <g transform="translate(223 9) rotate(90) scale(.5)">${pac('f-good', true)}</g></g>
      ${qtag(223, 46, 'Amylase starts carbs', 9.5)}
      <g class="a-shake"><circle class="f-germ" cx="223" cy="82" r="9"/><path d="M223 70 V74 M223 90 V94 M211 82 H215 M231 82 H235" stroke="var(--c-germ)" stroke-width="2"/></g>
      <g class="ans"><g class="a-bob"><path class="s-immune" d="M190 90 L198 82 M198 82 L194 74 M198 82 L206 80 M198 82 L210 82" style="stroke-width:3"/>
        <path class="s-immune" d="M256 90 L248 82 M248 82 L252 74 M248 82 L240 80 M248 82 L236 82" style="stroke-width:3"/></g></g>
      ${qtag(223, 104, 'IgA fights bacteria', 9.5)}
      <circle class="f-food" cx="223" cy="144" r="10"/><path d="M216 140 q3 -3 6 0" stroke="#ffffff" stroke-width="1.5" fill="none" class="ans"/>
      <g class="ans"><path class="f-water a-drop" d="M196 130 q3 -7 6 0 a3 3 0 0 1 -6 0z"/><path class="f-water a-drop" d="M246 128 q3 -7 6 0 a3 3 0 0 1 -6 0z" style="animation-delay:.7s"/><path class="f-water a-drop" d="M208 126 q3 -7 6 0 a3 3 0 0 1 -6 0z" style="animation-delay:1.1s"/></g>
      ${qtag(223, 166, 'Moistens food', 9.5)}`),

    /* 13. when swallowing becomes involuntary */
    swallow: ART(`
      <g transform="translate(-74 -8) scale(1.6)">
        <path class="f-skin" d="M88 94 L124 94 L126 122 L88 122 Z"/>
        <path class="f-skin" d="${HEAD}"/><circle cx="66" cy="22" r="1.8" fill="var(--art-line)"/>
        <path d="M84 14 C100 8 122 14 126 30 C120 34 104 34 90 30 Z" fill="var(--c-mouth)" opacity=".35"/>
        <ellipse class="f-nerve" cx="116" cy="32" rx="3.5" ry="8" transform="rotate(12 116 32)"/>
        <path d="M70 32 C84 28 98 30 106 26" stroke="var(--art-line)" stroke-width="1" fill="none"/>
        <ellipse class="f-muscle" cx="78" cy="42" rx="22" ry="4.5"/>
        <path class="f-mouth" d="M60 46 C68 40 88 38 100 44 C102 52 92 54 70 51 Z"/>
        <path class="f-muscle" d="M94 36 C100 36 104 40 104 44 C100 42 96 40 94 36 Z"/>
        ${T('M100 64 L99 122', '#a8d8ff', 5)}
        <path class="f-mouth" d="M101 63 L106 54 L104 63 Z"/>
        ${T('M106 26 C110 36 111 56 111 74', 'mouth', 6)}
        ${T('M111 74 L113 122', 'esoph', 5)}
        <path class="s-nerve a-flow" d="M115 38 C110 42 108 46 109 52 M114 38 C104 40 96 44 90 46 M116 40 C112 50 110 60 111 70" style="stroke-width:1.3"/>
        <path d="M103 37 L104 56" stroke="var(--c-warn)" stroke-width="1.4" stroke-dasharray="2 2"/>
        <g class="ansmotion"><circle class="f-food" r="3.2"><animateMotion dur="4s" repeatCount="indefinite" path="M52 43 L74 44 L98 45 C106 46 110 52 110 62 L111 74 L113 124"/></circle></g>
      </g>
      ${L(166, 22, 116, 40)}${L(170, 48, 100, 58)}${L(186, 80, 102, 68)}
      ${tag(230, 22, 'center: medulla + pons', 'ans', 9.5)}${tag(232, 48, 'CN V, IX, X', 'ans', 9.5)}
      ${qtag(240, 80, 'Reflex starts here', 9.5)}
      ${tag(32, 104, 'voluntary', 'ans', 9.5)}${tag(160, 150, 'involuntary', 'ans', 9.5)}${L(132, 150, 110, 150)}
      ${tag(240, 120, 'bolus at back of throat', 'ans', 9)}`),

    /* 14. upper vs lower esophageal sphincter */
    ues: ART(`
      ${T('M150 2 L150 30', 'mouth', 14)}
      ${T('M146 28 C130 34 118 42 116 60 L116 104', '#a8d8ff', 10)}
      <path d="M111 64 h10 M111 72 h10 M111 80 h10 M111 88 h10 M111 96 h10" stroke="#ffffff" stroke-width="1.5"/>
      <path class="f-muscle" d="M14 126 C80 106 220 106 286 126 L286 134 C220 116 80 116 14 134 Z" opacity=".75"/>
      <path class="f-stomach" d="M144 126 C138 140 148 162 182 170 C224 178 266 162 270 140 C274 122 244 114 212 120 C192 124 172 130 156 126 Z"/>
      ${T('M150 30 L150 128', 'esoph', 12)}
      <g class="a-pulse"><rect class="f-muscle" x="141" y="36" width="18" height="9" rx="3"/></g>
      <g class="a-pulse" style="animation-delay:.8s"><rect class="f-muscle" x="141" y="116" width="18" height="10" rx="3"/></g>
      <g class="ans"><path class="f-acid a-bob" d="M170 146 q4 -8 8 0 a4 4 0 0 1 -8 0z"/><path class="f-acid a-bob" d="M190 152 q4 -8 8 0 a4 4 0 0 1 -8 0z" style="animation-delay:.6s"/>
        <path class="f-acid a-bob" d="M162 160 q4 -8 8 0 a4 4 0 0 1 -8 0z" style="animation-delay:1.1s"/>
        <path d="M110 36 l12 12 M122 36 l-12 12" stroke="var(--c-bad)" stroke-width="3.5" stroke-linecap="round"/></g>
      <g class="ansmotion"><circle class="f-food" r="4.5"><animateMotion dur="4s" repeatCount="indefinite" path="M150 2 L150 150"/></circle></g>
      ${tag(92, 112, 'airway', '', 9.5)}${tag(232, 166, 'stomach', '', 9)}
      ${L(160, 40, 186, 34)}${L(160, 121, 186, 92)}
      ${qtag(232, 30, 'Upper (UES)')}${tag(226, 50, 'voluntary; guards airway', 'ans', 9)}
      ${qtag(232, 86, 'Lower (LES)')}${tag(226, 104, 'lets food in, blocks reflux', 'ans', 9)}`),

    /* 15. what relaxes vs tightens the LES */
    les: ART(`
      <path class="f-stomach" d="M120 120 C90 130 84 172 120 178 L196 178 C230 172 226 132 186 120 Z"/>
      ${T('M150 0 L150 124', 'esoph', 24)}
      <g><animateTransform attributeName="transform" type="translate" values="0 0;-6 0;-6 0;0 0;0 0" keyTimes="0;.2;.5;.7;1" dur="3s" repeatCount="indefinite"/><rect class="f-muscle" x="136" y="98" width="13" height="16" rx="4"/></g>
      <g><animateTransform attributeName="transform" type="translate" values="0 0;6 0;6 0;0 0;0 0" keyTimes="0;.2;.5;.7;1" dur="3s" repeatCount="indefinite"/><rect class="f-muscle" x="151" y="98" width="13" height="16" rx="4"/></g>
      ${tag(150, 82, 'LES', '', 10)}
      ${tag(58, 14, 'Relaxes (opens)', '', 10)}${tag(244, 14, 'Tightens (closes)', '', 10)}
      <path class="s-good a-flow" d="M104 40 C120 50 126 80 134 100 M104 84 C116 90 124 96 134 104 M104 128 C116 120 126 112 134 108" style="stroke-width:2.5"/>
      <path class="s-bad a-flow" d="M192 40 C180 50 174 80 166 100 M192 70 C180 80 174 94 166 104" style="stroke-width:2.5"/>
      <g class="ans"><g class="a-pop" style="--d:0">${tag(58, 40, 'Vagal impulses', '', 10)}</g><g class="a-pop" style="--d:1">${tag(58, 62, 'Progesterone', '', 10)}</g>
        <g class="a-pop" style="--d:2">${tag(58, 84, 'Secretin', '', 10)}</g><g class="a-pop" style="--d:3">${tag(58, 106, 'Glucagon', '', 10)}</g>
        <g class="a-pop" style="--d:4">${tag(244, 40, 'Gastrin', '', 10)}</g><g class="a-pop" style="--d:5">${tag(244, 62, 'Cholinergic vagal', '', 10)}</g>
        ${tag(244, 80, '(ACh)', '', 9)}</g>
      ${q(58, 40)}${q(58, 62)}${q(58, 84)}${q(58, 106)}${q(244, 40)}${q(244, 62)}
      ${tag(150, 160, 'stomach', '', 9)}`),

    /* 16. rugae */
    rugae: ART(`
      <defs><clipPath id="r1a-rclip"><path transform="translate(158 12) scale(1.28)" d="${ST}"/></clipPath></defs>
      ${stom(30, 40, .9, RUGAE.map(p => `<path d="${zig(p, 3.6, 8)}" stroke="var(--c-muscle)" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`).join(''))}
      ${stom(158, 12, 1.28)}
      <g clip-path="url(#r1a-rclip)"><g class="ans"><rect x="150" y="60" width="150" height="130" fill="var(--c-water)" opacity=".45"><animate attributeName="y" values="150;40;40;150" keyTimes="0;.45;.75;1" dur="5s" repeatCount="indefinite"/></rect></g></g>
      <g transform="translate(158 12) scale(1.28)"><g opacity=".6">${RUGAE.map(p => `<path d="${zig(p, 3.6, 8)}" stroke="var(--c-muscle)" stroke-width="1.8" fill="none"/>`).join('')}
        <animate attributeName="opacity" values=".7;.12;.12;.7" keyTimes="0;.45;.75;1" dur="5s" repeatCount="indefinite"/></g></g>
      <path class="s-warn a-flow" d="M120 96 L150 96" style="stroke-width:3"/><path d="M146 90 L152 96 L146 102" stroke="var(--c-warn)" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${L(70, 30, 96, 76)}${qtag(66, 22, 'Rugae = folds')}
      ${tag(72, 160, 'empty', '', 10)}${tag(226, 170, 'full', '', 10)}
      ${tag(150, 140, 'unfold → hold up to 4 L', 'ans', 9.5)}`),

    /* 17. parietal (oxyntic) cells */
    parietal: ART(`
      ${gland('p')}
      ${L(70, 72, 108, 96)}
      <circle class="f-mouth" cx="146" cy="100" r="38"/>
      ${[[124, 92], [128, 120], [164, 120], [170, 92], [146, 128], [116, 108], [176, 108]].map(([x, y]) => `<ellipse class="f-warn" cx="${x}" cy="${y}" rx="4" ry="2.4" style="stroke-width:1"/>`).join('')}
      <circle class="f-germ" cx="146" cy="106" r="9"/>
      <path class="s-white" d="M146 62 L146 90 M146 76 L132 86 M146 80 L160 88 M140 68 L130 76 M152 68 L162 76" style="stroke-width:2.5"/>
      <g class="ans">
        <g class="a-rise"><circle class="f-acid" cx="128" cy="52" r="7.5"/><text x="128" y="55.5" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#1d2238">H+</text></g>
        <g class="a-rise" style="animation-delay:.6s"><circle class="f-acid" cx="148" cy="50" r="7.5"/><text x="148" y="53.5" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#1d2238">Cl−</text></g>
        <g class="a-rise" style="animation-delay:1.2s"><circle class="f-acid" cx="166" cy="54" r="7.5"/><text x="166" y="57.5" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#1d2238">H+</text></g>
        <path class="s-good a-flow" d="M180 86 L204 74" style="stroke-width:2.5"/>
        <g class="a-bob"><path class="f-good" d="M222 70 L232 63 A12 12 0 1 0 232 77 Z"/><circle class="f-blood" cx="231" cy="70" r="4"/></g></g>
      ${qtag(146, 18, 'HCl (acid)')}
      ${qtag(246, 98, 'Intrinsic factor', 9.5)}${tag(246, 116, 'needed for B12', 'ans', 9.5)}
      ${stom(238, 128, .3)}<g class="ans"><circle cx="262" cy="131" r="7" fill="none" stroke="var(--c-acid)" stroke-width="2.5" class="a-pulse"/></g>
      ${qtag(232, 171, 'mostly in the fundus', 9)}
      ${tag(146, 152, 'parietal cell', '', 9.5)}`),

    /* 18. chief cells */
    chief: ART(`
      ${gland('c')}
      ${L(70, 140, 92, 132)}
      <rect class="f-spleen" x="92" y="100" width="64" height="64" rx="18"/>
      <ellipse class="f-tumor" cx="124" cy="150" rx="12" ry="7"/>
      ${[[104, 110], [116, 108], [128, 110], [140, 108], [110, 120], [122, 120], [134, 120], [146, 118]].map(([x, y], i) => `<circle class="f-warn a-blink" cx="${x}" cy="${y}" r="3.5" style="animation-delay:${(i * 0.15).toFixed(2)}s"/>`).join('')}
      <g class="ans"><circle class="f-warn a-rise" cx="108" cy="92" r="3"/><circle class="f-warn a-rise" cx="140" cy="92" r="3" style="animation-delay:.9s"/></g>
      <g transform="translate(124 42)">${pac('f-scar', false)}</g>
      <g class="ans"><path class="s-warn a-flow" d="M142 42 L180 42" style="stroke-width:3"/>
        <path class="f-acid a-drop" d="M158 30 q4 -8 8 0 a4 4 0 0 1 -8 0z"/>
        ${tag(162, 14, 'acid activates', '', 9.5)}
        <g transform="translate(200 42)">${pac('f-warn', true)}</g>
        <g><animateTransform attributeName="transform" type="translate" values="0 0;-10 0" dur=".8s" repeatCount="indefinite"/>
          ${['good', 'immune', 'bad', 'germ', 'pancreas', 'water'].map((c, i) => `<circle class="f-${c}" cx="${224 + i * 12}" cy="42" r="5"/>`).join('')}</g>
        <circle class="f-good a-drop" cx="210" cy="88" r="4"/><circle class="f-bad a-drop" cx="226" cy="92" r="4" style="animation-delay:.5s"/><circle class="f-immune a-drop" cx="242" cy="88" r="4" style="animation-delay:1s"/></g>
      ${qtag(124, 70, 'Pepsinogen')}${qtag(200, 70, 'Pepsin')}
      ${qtag(240, 124, 'digests protein', 9.5)}
      ${tag(124, 172, 'chief cell', '', 9.5)}`),

    /* 19. G cells, D cells, enterochromaffin cells */
    gcells: ART(`
      <circle class="f-mouth" cx="150" cy="48" r="22"/><circle class="f-germ" cx="150" cy="52" r="7"/>
      <path class="s-white" d="M150 28 L150 42 M150 36 L142 42 M150 36 L158 42" style="stroke-width:2"/>
      <g class="ans"><path class="f-acid a-rise" d="M140 20 q3 -7 6 0 a3 3 0 0 1 -6 0z"/><path class="f-acid a-rise" d="M156 20 q3 -7 6 0 a3 3 0 0 1 -6 0z" style="animation-delay:.8s"/></g>
      ${tag(92, 22, 'parietal cell', '', 9.5)}
      ${[['M60 120 C60 76 100 56 126 54', 'good'], ['M150 120 L150 72', 'warn'], ['M240 120 C240 76 200 56 174 54', 'immune']].map(([d, c], i) =>
        `<path class="s-${c} a-flow" d="${d}" style="stroke-width:3"/>` +
        `<g class="ansmotion">${[0, 1, 2].map(k => `<circle r="3.2" fill="var(--c-${c})" stroke="var(--art-line)"><animateMotion dur="2.4s" begin="${(k * 0.8 + i * 0.2).toFixed(1)}s" repeatCount="indefinite" path="${d}"/></circle>`).join('')}</g>`).join('')}
      ${[[60, 'good'], [150, 'warn'], [240, 'immune']].map(([x, c]) =>
        `<path class="f-${c}" d="M${x - 16} 154 C${x - 20} 134 ${x - 8} 120 ${x} 120 C${x + 8} 120 ${x + 20} 134 ${x + 16} 154 Z"/><circle class="f-germ" cx="${x}" cy="144" r="5"/>` +
        `<circle cx="${x - 6}" cy="130" r="1.8" fill="var(--art-line)"/><circle cx="${x + 5}" cy="128" r="1.8" fill="var(--art-line)"/><circle cx="${x}" cy="133" r="1.8" fill="var(--art-line)"/>`).join('')}
      <g class="ans"><circle class="f-good" cx="112" cy="46" r="7"/><text x="112" y="50" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#fff">+</text>
        <circle class="f-good" cx="164" cy="80" r="7"/><text x="164" y="84" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#fff">+</text>
        <circle class="f-bad" cx="188" cy="46" r="7"/><text x="188" y="50" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#fff">−</text></g>
      ${qtag(60, 96, 'Gastrin')}${qtag(150, 100, 'Histamine')}${qtag(240, 96, 'Somatostatin')}
      ${tag(60, 168, 'G cell', '', 10)}${tag(150, 168, 'Enterochromaffin', '', 9)}${tag(240, 168, 'D cell', '', 10)}`),

    /* 20. chyme */
    chyme: ART(`
      <defs><clipPath id="r1a-cclip"><path transform="translate(118 10) scale(1.35)" d="${ST}"/></clipPath></defs>
      ${T('M122 132 C100 132 88 140 86 154 C84 168 98 174 116 172', 'small', 16)}
      ${stom(118, 10, 1.35)}
      <g clip-path="url(#r1a-cclip)">
        <g class="ans"><rect x="110" y="0" width="150" height="170" fill="var(--c-food)" opacity=".35"/></g>
        <g class="a-spin" style="animation-duration:7s">
          <rect class="f-food" x="170" y="44" width="12" height="9" rx="3"/><rect class="f-food" x="200" y="96" width="10" height="12" rx="3"/>
          <circle class="f-good" cx="214" cy="56" r="5"/><circle class="f-good" cx="162" cy="100" r="4"/><circle class="f-fat" cx="190" cy="68" r="5"/>
          <circle class="f-food" cx="150" cy="120" r="5"/><circle class="f-food" cx="226" cy="84" r="4"/><rect class="f-bad" x="178" y="114" width="9" height="7" rx="2"/>
          <g class="ans"><path class="f-acid" d="M200 30 q4 -8 8 0 a4 4 0 0 1 -8 0z"/><path class="f-acid" d="M156 72 q4 -8 8 0 a4 4 0 0 1 -8 0z"/><path class="f-acid" d="M222 112 q4 -8 8 0 a4 4 0 0 1 -8 0z"/>
            <g transform="translate(186 92) scale(.45)">${pac('f-warn', false)}</g><g transform="translate(232 66) scale(.45)">${pac('f-warn', false)}</g></g>
        </g>
      </g>
      <path class="s-white a-flow" d="M226 30 C240 54 240 94 218 122" style="stroke-width:2"/><path class="s-white a-flow" d="M200 138 C180 146 156 144 142 138" style="stroke-width:2"/>
      <g class="ansmotion">${[0, 1, 2].map(k => `<circle r="3.5" fill="var(--c-food)" stroke="var(--art-line)" opacity=".85"><animateMotion dur="3s" begin="${k}s" repeatCount="indefinite" path="M128 132 C100 132 88 140 86 154 C84 168 98 174 118 172"/></circle>`).join('')}</g>
      <g class="a-fadein" style="--d:0">${tag(46, 22, 'food', 'ans')}</g><g class="a-fadein" style="--d:1">${tag(46, 42, '+ acid', 'ans')}</g>
      <g class="a-fadein" style="--d:2">${tag(46, 62, '+ enzymes', 'ans')}</g><g class="a-fadein" style="--d:3">${tag(46, 82, '+ churning', 'ans')}</g>
      ${qtag(44, 112, '= Chyme', 11)}${tag(44, 132, 'acidic soup', 'ans', 9.5)}${L(72, 112, 92, 140)}`),

    /* 21. what the stomach absorbs */
    stomachAbs: ART(`
      ${T('M216 0 L216 180', 'blood', 14)}<path class="s-white a-flow" d="M216 0 L216 180" style="stroke-width:2"/>
      ${T('M82 124 C62 126 48 134 44 150 C42 164 56 172 74 170', 'small', 14)}
      ${stom(78, 16, 1.18)}
      <path class="s-blood" d="M192 46 L210 44 M196 80 L210 80 M188 112 L210 116" style="stroke-width:2"/>
      <g class="q"><g transform="translate(150 46)"><path class="f-water" d="M-7 -7 H7 L0 2 Z"/><path d="M0 2 V7 M-4 7 H4" stroke="var(--art-line)" stroke-width="1.5"/></g>
        <circle class="f-white" cx="156" cy="80" r="6"/><path d="M151 80 H161" stroke="var(--art-line)" stroke-width="1"/>
        <g transform="translate(150 108)"><rect class="f-bad" x="-9" y="-4" width="18" height="8" rx="4"/><path d="M0 -4 V4" stroke="var(--art-line)" stroke-width="1"/></g></g>
      <g class="ansmotion">
        <g><animateMotion dur="3s" repeatCount="indefinite" path="M150 46 L216 42"/><path class="f-water" d="M-7 -7 H7 L0 2 Z"/><path d="M0 2 V7 M-4 7 H4" stroke="var(--art-line)" stroke-width="1.5"/></g>
        <g><animateMotion dur="3s" begin=".8s" repeatCount="indefinite" path="M156 80 L216 80"/><circle class="f-white" r="6"/><path d="M-5 0 H5" stroke="var(--art-line)" stroke-width="1"/></g>
        <g><animateMotion dur="3s" begin="1.6s" repeatCount="indefinite" path="M150 108 L216 118"/><rect class="f-bad" x="-9" y="-4" width="18" height="8" rx="4"/><path d="M0 -4 V4" stroke="var(--art-line)" stroke-width="1"/></g>
        ${[['f-pancreas', 0], ['f-good', 1.2], ['f-fat', 2.4]].map(([c, b]) => `<circle class="${c}" r="4.5"><animateMotion dur="3.6s" begin="${b}s" repeatCount="indefinite" path="M136 64 C130 90 104 112 84 124 C62 126 48 134 44 150 C42 164 56 172 74 170"/></circle>`).join('')}
      </g>
      ${qtag(258, 42, 'Alcohol')}${qtag(258, 80, 'Aspirin')}${qtag(258, 118, 'NSAIDs')}
      ${tag(258, 158, 'into blood', 'ans', 9.5)}
      ${tag(50, 96, 'nutrients move on', 'ans', 9.5)}`),

    /* 22. pyloric sphincter */
    pylorus: ART(`
      <path class="f-stomach" d="M300 30 C250 30 200 50 172 78 L150 80 L150 112 L172 114 C200 142 250 162 300 162 Z"/>
      <path d="M296 54 C240 62 200 80 180 90 M296 138 C240 130 200 112 180 102" stroke="var(--c-muscle)" stroke-width="2" fill="none" opacity=".6"/>
      <ellipse class="f-food" cx="230" cy="96" rx="34" ry="20" opacity=".55"/>
      <path class="f-small" d="M152 80 L22 82 C10 82 4 90 4 96 C4 104 10 112 22 112 L152 112 Z"/>
      ${T('M70 0 L70 80', 'bile', 7)}<path d="M70 0 L70 80" stroke="var(--c-gall)" stroke-width="2" class="a-flow"/>
      <g class="ans"><path class="s-bile a-flow" d="M64 96 L24 96" style="stroke-width:3"/><path d="M30 90 L24 96 L30 102" stroke="var(--c-bile)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path class="s-bile" d="M92 104 L124 104" style="stroke-width:3;stroke-dasharray:4 3"/><path d="M128 98 l8 12 M136 98 l-8 12" stroke="var(--c-bad)" stroke-width="3.5" stroke-linecap="round"/></g>
      <g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -9;0 -9;0 0;0 0" keyTimes="0;.38;.44;.56;.62;1" dur="3s" repeatCount="indefinite"/><rect class="f-muscle" x="140" y="76" width="16" height="22" rx="6"/></g>
      <g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 9;0 9;0 0;0 0" keyTimes="0;.38;.44;.56;.62;1" dur="3s" repeatCount="indefinite"/><rect class="f-muscle" x="140" y="94" width="16" height="22" rx="6"/></g>
      <g class="ansmotion"><circle r="4.5" fill="var(--c-food)" stroke="var(--art-line)"><animateMotion dur="3s" repeatCount="indefinite" path="M220 96 L30 96" keyPoints="0;.3;.3;.5;1" keyTimes="0;.3;.44;.58;1" calcMode="linear"/></circle></g>
      ${tag(40, 30, 'bile', '', 9.5)}${tag(250, 96, 'stomach', '', 9.5)}${tag(46, 128, 'duodenum', '', 9.5)}
      ${tag(148, 18, 'pyloric sphincter', '', 9.5)}
      ${qtag(148, 44, 'out 1–3 mL at a time', 9.5)}${L(148, 53, 148, 70)}
      ${qtag(150, 150, 'stops bile backflow', 9.5)}${L(132, 141, 132, 116)}`),

    /* 23. the 3 parts of the small intestine */
    small: ART(`
      <g opacity=".35">${T('M62 160 L62 72 Q62 66 68 66 L232 66 Q238 66 238 72 L238 146 Q238 160 220 162 L178 166 Q160 168 156 176', 'large', 14)}<circle class="f-large" cx="62" cy="162" r="9"/></g>
      ${stom(152, 4, .55)}
      ${T('M154 54 C138 54 128 58 126 70 C124 84 130 92 146 92 C158 92 166 88 172 80', '#ffc7a6', 10)}
      ${T('M172 80 C190 74 214 78 222 88 C230 100 200 102 186 98 C170 94 162 104 176 110 C192 116 226 108 228 122 C230 134 196 132 180 128 C166 124 156 128 160 136', 'small', 10)}
      ${T('M160 136 C162 150 140 152 128 146 C114 140 92 150 100 158 C108 166 136 162 132 152 C128 142 96 132 86 140 C78 146 76 152 66 156', '#e8705a', 10)}
      <g class="ansmotion"><circle class="f-food" r="4"><animateMotion dur="7s" repeatCount="indefinite" path="M154 54 C138 54 128 58 126 70 C124 84 130 92 146 92 C158 92 166 88 172 80 C190 74 214 78 222 88 C230 100 200 102 186 98 C170 94 162 104 176 110 C192 116 226 108 228 122 C230 134 196 132 180 128 C166 124 156 128 160 136 C162 150 140 152 128 146 C114 140 92 150 100 158 C108 166 136 162 132 152 C128 142 96 132 86 140 C78 146 76 152 66 156"/></circle></g>
      <g class="ans">${[[200, 92], [214, 122], [118, 150], [96, 140]].map(([x, y], i) => `<circle class="f-good a-rise" cx="${x}" cy="${y - 12}" r="3" style="animation-delay:${(i * 0.45).toFixed(2)}s"/>`).join('')}</g>
      ${tag(214, 14, 'stomach', '', 9)}
      ${L(94, 34, 124, 64)}${L(266, 110, 230, 104)}${L(34, 132, 84, 142)}
      ${qtag(66, 30, '1 Duodenum')}${qtag(266, 100, '2 Jejunum')}${qtag(30, 122, '3 Ileum')}
      ${tag(74, 52, 'about 20 feet long', 'ans', 9.5)}${tag(266, 160, 'most absorbing', 'ans', 9)}`),
  });
})();
