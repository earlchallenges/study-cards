/* Chapter 9 Part 3 art (a): colorful replacements for PICS, loaded after the page sets PICS.
   Cards 1-27: gallstones, liver labs, viral hepatitis, acetaminophen. Helpers live inside this
   function so they never clash with the other art file loaded on the same page. */
(() => {
  // ---------- small helpers ----------
  const tw = (t, size = 10.5) => String(t).length * size * 0.56 + 10;
  const ltag = (x, y, t, cls = '', size = 10.5) => tag(x + tw(t, size) / 2, y, t, cls, size);
  const rtag = (x, y, t, cls = '', size = 10.5) => tag(x - tw(t, size) / 2, y, t, cls, size);
  const qL = (x, y, t, size = 10.5) => q(x + 9, y) + ltag(x, y, t, 'ans', size);
  const qT = (x, y, t, size = 10.5) => q(x, y) + tag(x, y, t, 'ans', size);
  const txt = (x, y, t, size = 10, cls = 'ink', anchor = 'middle', extra = '') =>
    `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" style="font-size:${size}px;font-weight:700${extra}">${esc(t)}</text>`;
  // a duct or tube: dark outline, then color on top
  const duct = (d, w = 5, cls = 's-bile', more = '') => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path class="${cls} ${more}" d="${d}" stroke-width="${w}"/>`;
  const tube = (d, w, color, more = '') => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path d="${d}" fill="none" stroke="var(--c-${color})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" class="${more}"/>`;
  const NS = 'vector-effect="non-scaling-stroke"';
  const LIVER = 'M0 26 C0 8 28 0 72 2 C116 4 162 10 180 20 C186 24 180 30 164 34 C136 42 108 48 82 62 C64 72 38 74 20 64 C6 56 0 42 0 26 Z';
  // animated classes go on a wrapper <g>, because a CSS transform animation would replace the transform attribute
  const wrapA = (more, inner) => more ? `<g class="${more}">${inner}</g>` : inner;
  const liver = (x, y, s = 1, cls = 'f-liver', more = '') => wrapA(more, `<path class="${cls}" ${NS} transform="translate(${x} ${y}) scale(${s})" d="${LIVER}"/>`);
  // gallbladder: neck at (0,0), fundus 68 below
  const GB = 'M-5 0 C-3 -4 5 -4 6 0 C14 10 20 30 18 48 C16 62 8 68 0 68 C-8 68 -16 62 -17 48 C-18 30 -12 10 -5 0 Z';
  const gb = (x, y, rot = 0, s = 1, cls = 'f-gall', more = '') => wrapA(more, `<path class="${cls}" ${NS} transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="${GB}"/>`);
  const star = (x, y, r, cls = 'f-bad', more = '', n = 8) => {
    let p = '';
    for (let i = 0; i < n * 2; i++) {
      const a = Math.PI * i / n, rr = i % 2 ? r * 0.48 : r;
      p += `${i ? 'L' : 'M'}${(x + rr * Math.sin(a)).toFixed(1)} ${(y - rr * Math.cos(a)).toFixed(1)} `;
    }
    return `<path class="${cls} ${more}" d="${p}Z"/>`;
  };
  // point on a circle, angle in degrees clockwise from straight up
  const pt = (cx, cy, r, a) => [(cx + r * Math.sin(a * Math.PI / 180)).toFixed(1), (cy - r * Math.cos(a * Math.PI / 180)).toFixed(1)];
  const arcD = (cx, cy, r, a1, a2) => { const [x1, y1] = pt(cx, cy, r, a1), [x2, y2] = pt(cx, cy, r, a2); return `M${x1} ${y1} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`; };
  // icons
  const virus = (x, y, r = 8, cls = 'f-germ', more = '') => {
    let s = '';
    for (let i = 0; i < 8; i++) { const [a, b] = pt(x, y, r, i * 45), [c, d] = pt(x, y, r + 4, i * 45); s += `<path class="s-line" d="M${a} ${b} L${c} ${d}" stroke-width="1.5"/><circle class="${cls}" cx="${c}" cy="${d}" r="1.8"/>`; }
    return `<g class="${more}">${s}<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/></g>`;
  };
  const vball = (x, y, letter, cls, r = 12) => {
    let s = '';
    for (let i = 0; i < 10; i++) { const [c, d] = pt(x, y, r + 2.5, i * 36); s += `<circle class="${cls}" cx="${c}" cy="${d}" r="2.2"/>`; }
    return s + `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>` + txt(x, y + 4.5, letter, 13, 'on');
  };
  const thermo = (x, y, hot = true, more = '') => `<rect class="f-white" x="${x - 3.5}" y="${y - 16}" width="7" height="22" rx="3.5"/>` +
    `<rect class="${hot ? 'f-blood' : 'f-vein'} noline ${more}" x="${x - 1.5}" y="${hot ? y - 13 : y - 2}" width="3" height="${hot ? 17 : 6}" rx="1.5" style="transform-origin:${x}px ${y + 4}px;transform-box:view-box"/>` +
    `<circle class="${hot ? 'f-blood' : 'f-vein'}" cx="${x}" cy="${y + 8}" r="5.5"/>`;
  const Y = (x, y, rot = 0, cls = 's-immune', w = 2.6) => `<path class="${cls}" transform="translate(${x} ${y}) rotate(${rot})" d="M0 8 L0 0 M0 0 L-5 -6 M0 0 L5 -6" stroke-width="${w}"/>`;
  const pentamer = (x, y, more = '') => `<g class="${more}">${[0, 72, 144, 216, 288].map(a => { const [px, py] = pt(x, y, 4, a); return `<path class="s-warn" transform="translate(${px} ${py}) rotate(${a})" d="M0 0 L0 -6 M0 -6 L-3.5 -10 M0 -6 L3.5 -10" stroke-width="2.2"/>`; }).join('')}<circle class="f-warn" cx="${x}" cy="${y}" r="3.5"/></g>`;
  const face = (x, y, r, skin = 'f-skin', mood = 'ok', sclera = '#ffffff') => {
    const m = mood === 'sick' ? `M${x - 6} ${y + 7} q3 -3 6 0 q3 3 6 0` : mood === 'happy' ? `M${x - 7} ${y + 4} Q${x} ${y + 12} ${x + 7} ${y + 4}` : `M${x - 5} ${y + 6} L${x + 5} ${y + 6}`;
    return `<circle class="${skin}" cx="${x}" cy="${y}" r="${r}"/>` +
      [-1, 1].map(k => `<ellipse cx="${x + k * r * 0.36}" cy="${y - r * 0.18}" rx="3.4" ry="2.6" style="fill:${sclera};stroke:var(--art-line);stroke-width:1"/><circle cx="${x + k * r * 0.36}" cy="${y - r * 0.18}" r="1.4" style="fill:var(--art-line)"/>`).join('') +
      `<path class="s-line" d="${m}" stroke-width="1.8"/>`;
  };
  const clock = (x, y, r = 13, spin = true) => `<circle class="f-white" cx="${x}" cy="${y}" r="${r}"/><circle class="f-warn noline" cx="${x}" cy="${y}" r="2"/>` +
    `<path class="s-line" d="M${x} ${y} L${x} ${y - r * 0.55}" stroke-width="2"/>` +
    `<path class="s-bad ${spin ? 'a-spin' : ''}" style="transform-box:view-box;transform-origin:${x}px ${y}px" d="M${x} ${y} L${x + r * 0.72} ${y}" stroke-width="2"/>`;
  const burger = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="f-food" ${NS} d="M-8 -1 Q0 -11 8 -1 Z"/><rect class="f-good" ${NS} x="-9" y="-1" width="18" height="2.5" rx="1"/><rect class="f-stool" ${NS} x="-8" y="1.5" width="16" height="3.5" rx="1.5"/><rect class="f-food" ${NS} x="-8" y="5" width="16" height="4" rx="2"/></g>`;
  const pill = (x, y, rot = -35, a = 'f-white', b = 'f-mouth') => `<g transform="rotate(${rot} ${x} ${y})"><rect class="${a}" x="${x - 8}" y="${y - 3.5}" width="16" height="7" rx="3.5"/><path class="${b}" d="M${x} ${y - 3.5} h4.5 a3.5 3.5 0 0 1 0 7 h-4.5 z"/></g>`;
  const drop = (x, y, s = 1, cls = 'f-blood', more = '') => `<path class="${cls} ${more}" d="M${x} ${y - 8 * s} C${x + 6 * s} ${y - s} ${x + 6 * s} ${y + 7 * s} ${x} ${y + 7 * s} C${x - 6 * s} ${y + 7 * s} ${x - 6 * s} ${y - s} ${x} ${y - 8 * s} Z"/>`;
  const bone = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="f-bone" ${NS} d="M-14 -3 L14 -3 A4.5 4.5 0 1 1 17 -8 A4.5 4.5 0 1 1 21 0 A4.5 4.5 0 1 1 17 8 A4.5 4.5 0 1 1 14 3 L-14 3 A4.5 4.5 0 1 1 -17 8 A4.5 4.5 0 1 1 -21 0 A4.5 4.5 0 1 1 -17 -8 A4.5 4.5 0 1 1 -14 -3 Z"/></g>`;
  const heart = (x, y, s = 1, more = '') => `<path class="f-blood ${more}" ${NS} transform="translate(${x} ${y}) scale(${s})" d="M0 9 C-14 0 -12 -10 -5 -10 C-2 -10 0 -7 0 -5 C0 -7 2 -10 5 -10 C12 -10 14 0 0 9 Z"/>`;
  const kidney = (x, y) => `<path class="f-muscle" d="M${x - 2} ${y - 11} C${x + 9} ${y - 12} ${x + 10} ${y + 11} ${x - 1} ${y + 11} C${x - 9} ${y + 11} ${x - 9} ${y + 3} ${x - 4} ${y + 1} C${x - 7} ${y - 2} ${x - 9} ${y - 10} ${x - 2} ${y - 11} Z"/>`;
  const brain = (x, y) => `<path class="f-mouth" d="M${x - 11} ${y + 4} C${x - 15} ${y - 2} ${x - 10} ${y - 10} ${x - 4} ${y - 9} C${x - 1} ${y - 13} ${x + 7} ${y - 12} ${x + 9} ${y - 7} C${x + 15} ${y - 5} ${x + 14} ${y + 5} ${x + 8} ${y + 6} C${x + 4} ${y + 10} ${x - 6} ${y + 10} ${x - 11} ${y + 4} Z"/><path class="s-line" d="M${x - 6} ${y - 3} q4 -3 6 1 q3 4 6 -1 M${x - 4} ${y + 3} q4 2 8 -1" stroke-width="1.2"/>`;
  const muscle = (x, y) => `<path class="f-muscle" d="M${x - 14} ${y} C${x - 8} ${y - 9} ${x + 8} ${y - 9} ${x + 14} ${y} C${x + 8} ${y + 9} ${x - 8} ${y + 9} ${x - 14} ${y} Z"/><path class="s-white" d="M${x - 8} ${y - 3} H${x + 8} M${x - 10} ${y + 1} H${x + 10} M${x - 7} ${y + 4.5} H${x + 7}" stroke-width="1" opacity=".75"/>`;
  const syringe = (x, y, rot = -30, s = 1, more = '') => `<g class="${more}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect class="f-white" ${NS} x="-14" y="-4" width="22" height="8" rx="1.5"/><rect class="f-immune noline" x="-5" y="-2.5" width="12" height="5"/><path class="s-line" ${NS} d="M-14 0 L-21 0 M-21 -5 L-21 5 M8 0 L18 0" stroke-width="1.8"/></g></g>`;
  const tubeIcon = (x, y, liquid = 'f-water') => `<rect class="f-white" x="${x - 5}" y="${y - 14}" width="10" height="28" rx="5"/><path class="${liquid} noline" d="M${x - 3.5} ${y} h7 v8 a3.5 3.5 0 0 1 -7 0 z"/><path class="s-line" d="M${x - 7} ${y - 14} h14" stroke-width="2"/>`;
  const iconBg = (x, y, cls, r = 12) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
  const ink = (d, w = 1, more = '') => `<path class="s-ink" d="${d}" stroke-width="${w}" stroke-dasharray="2 3" ${more}/>`;

  // ---------- the biliary tree scene (front view: liver + gallbladder on the viewer's left) ----------
  // liver 14-200 x 4-78; GB neck (85,60) fundus ~(45,118); cystic + common hepatic join at (116,84);
  // CBD down behind the duodenum to the ampulla of Vater (98,134) on the medial wall of part 2.
  const AMP = [98, 134];
  const PANC = 'M100 116 C100 108 112 106 124 108 C150 112 182 106 214 100 C240 94 266 94 272 102 C276 110 262 116 246 118 C214 122 184 126 158 132 C152 144 150 154 138 158 C122 162 104 156 100 146 Z';
  const PANC_HEAD = 'M100 116 C100 108 112 106 124 108 C138 110 150 116 154 124 C156 140 150 154 138 158 C122 162 104 156 100 146 Z';
  const CBD = 'M116 82 L116 122 Q116 132 100 134';
  const CYSTIC = 'M86 61 Q100 66 108 76 Q112 82 116 84';
  const tree = (o = {}) => {
    const panc = o.head ? PANC_HEAD : PANC;
    const pduct = o.head ? 'M150 124 C132 128 116 131 99 134' : 'M264 105 C236 107 200 114 168 120 C140 126 116 130 99 134';
    return liver(14, 4, 1, o.liverCls || 'f-liver') +
      `<path class="s-line" d="M120 6 Q114 30 116 52" stroke-width="1.2" opacity=".5"/>` +
      `<path class="${o.pancCls || 'f-pancreas'}" d="${panc}"/>` +
      `<path d="${pduct}" fill="none" stroke="#c98a00" stroke-width="2.4" stroke-linecap="round"/>` +
      duct(CBD, 4.5) +
      tube(`M156 98 L104 98 Q90 98 90 112 L90 152 Q90 166 104 166 L${o.head ? 168 : 176} 166 Q188 166 190 156`, 14, 'small') +
      `<circle class="f-warn" cx="${AMP[0]}" cy="${AMP[1]}" r="2.6"/>` +
      duct('M102 48 L114 64', 3.5) + duct('M132 44 L118 64', 3.5) + duct('M116 62 L116 84', 4.5) +
      gb(85, 61, 35, 1, o.gbCls || 'f-gall') + duct(CYSTIC, 3.5);
  };

  // ---------- custom keyframes used by a few cards (frozen on the front like the rest) ----------
  const ST = `<style>
    .pic .a-x-sq{transform-box:fill-box;transform-origin:50% 0;animation:x3a-sq 1.6s ease-in-out infinite}
    @keyframes x3a-sq{50%{transform:scale(.84,.86)}}
    .pic .a-x-heat{animation:x3a-heat 1.6s ease-in-out infinite}
    @keyframes x3a-heat{50%{opacity:.25}}
  </style>`;

  Object.assign(PICS, {
    /* 1. risk factors: gallbladder full of cholesterol stones, 8 risk icons around it */
    stoneRisk: (() => {
      const L = [
        ['Female, fair', 'f-bad', x => `<circle class="s-white" cx="${x}" cy="-3" r="4.5" stroke-width="2"/><path class="s-white" d="M${x} 1.5 V9 M${x - 3.5} 5.5 H${x + 3.5}" stroke-width="2"/>`],
        ['Older age', 'f-immune', x => `<path class="s-white" d="M${x} -7 L${x} 0 L${x + 5} 3" stroke-width="2.2"/><circle class="s-white" cx="${x}" cy="0" r="8" stroke-width="1.6"/>`],
        ['Obesity', 'f-warn', x => `<circle class="f-white" cx="${x}" cy="-6" r="2.8"/><ellipse class="f-white" cx="${x}" cy="3" rx="6.5" ry="5.5"/>`],
        ['High-fat diet', 'f-mucus', x => burger(x, -1, 0.8)],
      ];
      const R = [
        ['Fast wt loss', 'f-good', x => `<path class="s-white" d="M${x} -7 L${x} 6 M${x - 5} 1 L${x} 6 L${x + 5} 1" stroke-width="2.6"/>`],
        ['Pregnancy', 'f-mouth', x => `<circle class="f-white" cx="${x - 1}" cy="-7" r="2.6"/><path class="s-white" d="M${x - 3} -3 L${x - 3} 9 M${x - 3} -2 Q${x + 8} 1 ${x - 2} 7" stroke-width="2.4"/>`],
        ['Hormone tx', 'f-germ', x => pill(x, 0, -35, 'f-white', 'f-fat')],
        ['Diabetes, lipids', 'f-water', x => drop(x, 0, 1, 'f-blood') + `<circle class="f-fat" cx="${x}" cy="2" r="2"/>`],
      ];
      const ys = [24, 63, 102, 141];
      const row = (list, ix, side) => list.map(([t, bg, ic], i) => q(ix, ys[i]) +
        `<g class="ans"><g class="a-pop" style="--d:${i + (side ? 4 : 0)}">${iconBg(ix, ys[i], bg)}<g transform="translate(0 ${ys[i]})">${ic(ix)}</g></g>` +
        (side ? rtag(268, ys[i], t, 'a-fadein', 9.5) : ltag(32, ys[i], t, 'a-fadein', 9.5)) + '</g>').join('');
      return ART(`${ST}
        <g transform="translate(0 -6)">${duct('M150 22 Q152 12 156 2', 4)}
        <path class="f-gall" d="M146 20 C148 14 156 14 157 22 C166 40 172 80 170 118 C168 150 160 166 150 166 C140 166 131 150 130 120 C129 84 136 42 146 20 Z"/>
        <path class="f-bile noline" opacity=".85" d="M140 60 C150 54 160 56 163 64 C166 84 166 110 164 126 C162 150 157 160 150 160 C143 160 138 150 137 126 C135 106 136 76 140 60 Z"/>
        <g class="ans">${[[141, 140, 8], [159, 142, 7.5], [150, 125, 7], [139, 120, 5.5], [161, 122, 5.5], [150, 152, 5], [152, 106, 5]].map(([x, y, r], i) =>
          `<circle class="f-fat a-grow" style="animation-delay:-${i * 0.35}s" cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g></g>
        ${row(L, 16, 0)}${row(R, 284, 1)}
        ${tag(150, 171, '5 Fs: fat, female, forty, fertile, fair', 'ans', 9)}`);
    })(),

    /* 2. three stone types side by side */
    stoneTypes: ART(`
      ${[52, 150, 248].map(x => `<circle class="f-bile" cx="${x}" cy="58" r="40" opacity=".45"/>`).join('')}
      <polygon class="f-fat" points="32,52 44,34 66,36 76,56 68,78 44,82 30,68"/>
      <path class="s-line" d="M44 34 L52 54 L76 56 M52 54 L44 82 M52 54 L30 68" stroke-width="1" opacity=".45"/>
      <g class="ans">${[[42, 46], [62, 48], [56, 70]].map(([x, y], i) => star(x, y, 4, 'f-white noline', 'a-blink', 4).replace('a-blink"', `a-blink" style="animation-delay:-${i * 0.45}s"`)).join('')}</g>
      ${[[136, 62, 6], [152, 58, 5], [166, 66, 6], [142, 78, 5], [158, 80, 6], [148, 70, 4]].map(([x, y, r]) =>
        star(x, y, r, '', '', 6).replace('class=" "', `style="fill:#24181c;stroke:var(--art-line);stroke-width:1.2"`)).join('')}
      <g class="ans"><ellipse class="f-blood a-shake" cx="150" cy="32" rx="11" ry="7"/><ellipse class="noline" cx="150" cy="32" rx="4.5" ry="2.5" style="fill:#b3222f"/>
        <path class="s-bad a-flow" d="M150 40 L150 50" stroke-width="2"/></g>
      <circle class="f-fat" cx="248" cy="58" r="25"/>
      <circle class="f-warn" cx="248" cy="58" r="18"/>
      <circle class="f-fat" cx="248" cy="58" r="12"/>
      <circle class="f-stool a-pulse" cx="248" cy="58" r="6"/>
      <path class="s-line" d="M229 46 L236 52 M266 70 L258 64 M262 42 L256 48" stroke-width="1" opacity=".4"/>
      ${qT(52, 114, 'Cholesterol')}${qT(150, 114, 'Pigment')}${qT(248, 114, 'Mixed')}
      ${tag(52, 136, 'Most common', 'ans', 9.5)}${tag(52, 156, 'Estrogen link', 'ans', 9.5)}
      ${tag(150, 136, 'Small, black', 'ans', 9.5)}${tag(150, 156, 'Hemolysis', 'ans', 9.5)}${tag(150, 174, 'e.g. sickle cell', 'ans', 9)}
      ${tag(248, 136, 'Bilirubin core', 'ans', 9.5)}${tag(248, 156, '+ chol, calcium', 'ans', 9.5)}`),

    /* 3. biliary colic: RUQ/epigastric pain spreading to the right shoulder and back after a fatty meal */
    colic: ART(`${ST}
      <circle class="f-skin" cx="70" cy="2" r="11"/>
      <path class="f-skin" d="M30 32 Q34 18 54 16 L62 10 L78 10 L86 16 Q106 18 110 32 L116 72 Q110 112 114 180 L26 180 Q30 112 24 72 Z"/>
      ${liver(30, 60, 0.38, 'f-liver', 'noline')}
      <path class="s-line" d="M38 62 Q56 88 70 72 Q84 88 102 62" stroke-width="1.4" opacity=".5"/>
      <circle cx="70" cy="128" r="2" style="fill:var(--art-line)"/>
      ${gb(47, 78, 25, 0.38)}
      <g class="ans">
        <path class="s-bad a-flow" d="M46 80 C30 66 26 46 34 30" stroke-width="2.5"/>
        <path class="s-bad a-flow" d="M48 88 C34 96 24 104 20 118" stroke-width="2.5"/>
        ${star(36, 26, 8, 'f-warn', 'a-blink')}${star(19, 122, 6, 'f-warn', 'a-blink')}
        ${star(52, 84, 13, 'f-bad', 'a-pulse')}${star(72, 80, 8, 'f-warn', 'a-pulse')}
      </g>
      ${qT(70, 104, 'RUQ / epigastric', 10)}${qT(76, 46, 'R shoulder, back', 10)}
      <circle class="f-white" cx="168" cy="36" r="20"/>${burger(168, 35, 1.5)}
      <path class="acs a-flow" d="M190 40 L208 50"/>
      ${duct('M244 30 Q246 18 252 8', 4)}
      ${gb(244, 32, 0, 1.15, 'f-gall', 'a-x-sq')}
      <circle class="f-fat" cx="244" cy="34" r="5"/>
      ${star(262, 26, 7, 'f-bad', 'a-blink')}
      ${clock(176, 134, 15)}
      ${qT(168, 70, 'Fatty meal', 10)}${qT(244, 128, 'Squeezes on stone', 10)}${qT(214, 164, '30 min – 6 h', 10)}`),

    /* 4. biliary colic vs acute cholecystitis: a side-by-side table with icons in the middle */
    chole: ART(`${ST}
      <path class="s-ink" d="M150 4 V176" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
      ${duct('M52 34 L36 26', 3.5)}${gb(52, 34, -70, 0.85)}
      <g class="ans"><circle class="f-fat a-bob" cx="56" cy="35" r="4.5"/></g>
      ${duct('M248 34 L264 26', 3.5)}
      ${gb(248, 34, 70, 0.95)}
      <g class="ans"><path class="a-x-heat" ${NS} transform="translate(248 34) rotate(70) scale(.95)" d="${GB}" style="fill:none;stroke:var(--c-bad);stroke-width:4.5"/></g>
      <g class="ans"><circle class="f-fat" cx="245" cy="35" r="4.5"/>${star(214, 26, 6, 'f-bad', 'a-blink')}</g>
      ${qT(74, 12, 'Biliary colic', 10)}${qT(226, 12, 'Cholecystitis', 10)}
      ${[[78, clock(150, 78, 11)], [104, thermo(150, 102, true, '')], [130, `<circle class="f-immune" cx="150" cy="130" r="9"/><path class="f-germ noline" d="M146 127 q4 -4 8 0 q-4 6 -8 0 z"/>`],
        [156, `<path class="f-skin" d="M141 162 L141 152 Q141 148 144 148 L146 148 L146 144 Q146 141 149 141 Q152 141 152 144 L152 146 Q155 145 157 147 Q160 147 160 151 L160 162 Z"/>`]].map(([y, ic]) => ic).join('')}
      ${qT(74, 78, 'Shorter, < 6 h')}${qT(226, 78, 'Steady, > 4 h')}
      ${qT(74, 104, 'No fever')}${qT(226, 104, 'Fever', 10.5)}
      ${qT(74, 130, 'Normal WBC')}${qT(226, 130, 'High WBC')}
      ${qT(74, 156, 'Murphy –')}${qT(226, 156, 'Murphy +')}
      <g class="ans">${[0, 1, 2, 3].map(i => `<circle class="f-immune a-pop" style="--d:${i + 2}" cx="${266 + (i % 2) * 9}" cy="${124 + Math.floor(i / 2) * 11}" r="3.5"/>`).join('')}
        <g class="a-pulse">${star(276, 100, 6, 'f-bad', '')}</g></g>`),

    /* 5. Murphy sign: fingers under the right ribs, the breath rises then stops when the inflamed gallbladder hits them */
    murphy: (() => {
      const gbStatic = gb(52, 76, 18, 0.55, 'f-gall');
      return ART(`
        <circle class="f-skin" cx="80" cy="0" r="12"/>
        <path class="f-skin" d="M26 32 Q30 18 56 16 L66 10 L94 10 L104 16 Q130 18 134 32 L142 72 Q136 112 140 180 L20 180 Q24 112 18 72 Z"/>
        ${liver(26, 56, 0.48, 'f-liver', 'noline')}
        <path class="s-line" d="M30 60 Q56 94 80 74 Q104 94 130 60" stroke-width="1.6" opacity=".55"/>
        <path class="s-line" d="M36 40 Q56 50 74 46 M86 46 Q104 50 124 40 M34 50 Q56 62 74 58 M86 58 Q104 62 126 50" stroke-width="1" opacity=".3"/>
        <g class="q">${gbStatic}</g>
        <g class="ansmotion"><g>${gbStatic}<animateTransform attributeName="transform" type="translate" values="0 -6;0 4;0 4;0 -6" keyTimes="0;.45;.85;1" dur="3.2s" repeatCount="indefinite"/></g>
          <g opacity="0">${star(52, 104, 10, 'f-bad')}<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.42;.47;.85;1" dur="3.2s" repeatCount="indefinite"/></g></g>
        <g transform="rotate(-12 54 128)">
          <path class="f-skin" style="filter:brightness(.92)" d="M34 172 L34 128 Q34 122 40 122 L70 122 Q76 122 76 128 L76 172 Z"/>
          ${[38, 48, 58, 68].map(x => `<rect class="f-skin" style="filter:brightness(.92)" x="${x}" y="${104 + Math.abs(x - 53) / 3}" width="9" height="${24 - Math.abs(x - 53) / 3}" rx="4.5"/>`).join('')}
        </g>
        ${qT(80, 158, 'Press under R ribs', 10)}
        <path class="f-mouth" d="M192 46 C180 50 176 76 182 92 C186 100 196 98 198 90 L198 52 Q198 44 192 46 Z"/>
        <path class="f-mouth" d="M212 46 C224 50 228 76 222 92 C218 100 208 98 206 90 L206 52 Q206 44 212 46 Z"/>
        ${duct('M202 30 L202 50 M202 50 L196 58 M202 50 L208 58', 3, 's-white')}
        <rect class="f-white" x="246" y="28" width="22" height="100" rx="6"/>
        <path class="s-ink" d="M240 34 H274" stroke-width="1.5" stroke-dasharray="3 3"/>
        ${txt(257, 24, 'full breath', 9, 'ink')}
        <g class="ansmotion"><rect class="f-water noline" x="249" y="124" width="16" height="2" rx="3">
          <animate attributeName="y" values="124;76;76;124" keyTimes="0;.45;.85;1" dur="3.2s" repeatCount="indefinite"/>
          <animate attributeName="height" values="2;50;50;2" keyTimes="0;.45;.85;1" dur="3.2s" repeatCount="indefinite"/></rect>
          <g opacity="0"><path class="f-bad" d="M246 66 l8 -8 h8 l8 8 v8 l-8 8 h-8 l-8 -8 z"/>${txt(258, 73.5, 'STOP', 8.6, 'on')}
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.44;.48;.85;1" dur="3.2s" repeatCount="indefinite"/></g></g>
        <g class="ans"><g class="a-pulse"><path class="s-water" d="M180 22 Q186 14 194 18" stroke-width="2"/></g></g>
        ${qT(202, 116, 'Deep breath in', 10)}${qT(220, 148, 'Pain cuts it short', 10)}${qT(220, 170, 'Acute cholecystitis', 10)}`);
    })(),

    /* 6. acalculous cholecystitis: inflamed, sludgy gallbladder with no stone; starved of blood in a very sick patient */
    acalc: ART(`${ST}
      ${duct('M90 20 Q92 10 98 2', 4.5)}
      <g class="ans"><path class="f-bad a-x-heat" d="M78 18 C84 8 100 8 103 20 C121 42 128 84 126 116 C124 152 108 168 90 168 C72 168 56 152 54 116 C52 84 60 42 78 18 Z"/></g>
      <path class="f-gall" d="M80 22 C84 14 98 14 100 24 C116 44 124 84 122 116 C120 148 106 162 90 162 C74 162 60 148 58 116 C56 84 66 44 80 22 Z"/>
      <path class="noline" style="fill:#7fa94a" d="M70 104 C80 98 104 100 110 106 C112 124 110 146 90 152 C74 150 68 130 70 104 Z"/>
      ${[[78, 118], [92, 126], [102, 114], [86, 140], [98, 142], [80, 132]].map(([x, y]) => `<circle class="f-scar noline" cx="${x}" cy="${y}" r="2"/>`).join('')}
      <g class="ans"><circle class="s-ink a-pop" style="--d:1" cx="90" cy="70" r="14" stroke-dasharray="3 3" stroke-width="2"/>
        <path class="s-bad a-pop" style="--d:2" d="M78 58 L102 82 M102 58 L78 82" stroke-width="3.5"/></g>
      <path class="s-blood" d="M156 40 C140 40 128 34 118 40" stroke-width="2"/>
      <g class="ans"><path class="s-white a-flow-slow" d="M156 40 C140 40 128 34 118 40" stroke-width="1.6"/></g>
      ${ink('M104 70 H160')}${ink('M110 124 H160')}
      ${qL(160, 70, 'No stone', 10)}${qL(162, 40, 'Ischemia (low flow)', 10)}${qL(160, 124, 'Stasis (bile sits)', 10)}
      <rect class="f-white" x="186" y="140" width="96" height="10" rx="3"/><rect class="f-mucus" x="190" y="130" width="22" height="10" rx="4"/>
      <path class="s-line" d="M186 150 V160 M282 150 V160" stroke-width="2"/>
      <rect class="f-white" x="246" y="88" width="34" height="24" rx="3"/>
      <path class="s-good a-draw" d="M249 102 h7 l3 -8 l4 14 l3 -6 h11" stroke-width="1.8"/>
      ${qL(150, 172, 'Very sick: burns, ICU', 9.5)}
      ${tag(27, 140, 'Under 10%', 'ans', 9)}${tag(27, 157, 'of cases', 'ans', 9)}`),

    /* 7. Charcot triad: stone in the CBD, infected bile backing up, plus fever + jaundice + RUQ pain */
    charcot: ART(`
      <g transform="translate(-6 4) scale(.8)">${tree({ head: true })}
        <g class="ans"><path class="f-acid noline" opacity=".35" ${NS} transform="translate(14 4)" d="${LIVER}"/>
          <path class="s-bad a-flow" d="M116 108 L116 66 L106 52" stroke-width="2.5"/></g>
        <circle class="f-fat" cx="116" cy="112" r="5.5"/>
        <g class="ans">${[[116, 92], [112, 72], [124, 58], [104, 50]].map(([x, y], i) => virus(x, y, 2.6, 'f-germ', 'a-bob').replace('class="a-bob"', `class="a-bob" style="animation-delay:-${i * 0.4}s"`)).join('')}</g>
      </g>
      ${tag(34, 22, 'Liver', '', 9)}${tag(30, 108, 'Gallbladder', '', 9)}
      ${ink('M84 98 L44 128')}${qL(2, 134, 'Stone in CBD', 9.5)}
      <path class="s-warn a-draw" d="M226 18 L184 98 L270 98 Z" stroke-width="2" stroke-dasharray="4 4"/>
      <circle class="f-white" cx="226" cy="22" r="17"/>${thermo(226, 22)}
      <g class="ans"><g class="a-pulse">${star(240, 10, 4, 'f-warn')}</g></g>
      <circle class="f-white" cx="184" cy="98" r="17"/>
      <g class="ans"><g class="a-blink"><path d="M170 98 Q184 86 198 98 Q184 110 170 98 Z" style="fill:#ffd23f;stroke:var(--art-line);stroke-width:1.2"/></g></g>
      <circle class="f-stool" cx="184" cy="98" r="4.5"/><circle cx="184" cy="98" r="1.8" style="fill:var(--art-line)"/>
      <circle class="f-white" cx="270" cy="98" r="17"/>
      <path class="f-skin" d="M260 84 h20 v28 h-20 z" opacity=".9"/>
      ${star(266, 94, 7, 'f-bad', 'a-pulse')}
      ${qT(226, 52, 'Fever', 10)}${qT(184, 128, 'Jaundice', 10)}${qT(270, 128, 'RUQ pain', 10)}
      ${qT(150, 160, 'Infected blocked duct = cholangitis', 10)}`),

    /* 8. gallstone pancreatitis: a stone rolls down the CBD and plugs the ampulla; pancreatic juice backs up */
    gsPanc: ART(`
      ${tree()}
      <g class="ans"><path class="f-bad a-blink" d="${PANC}" opacity=".55"/>
        <path class="s-bad a-flow" d="M110 132 C130 128 150 124 168 120 C200 114 236 107 264 105" stroke-width="2.6"/>
        ${star(210, 108, 6, 'f-warn', 'a-pulse')}${star(140, 140, 5, 'f-warn', 'a-pulse')}</g>
      <g class="ansmotion"><circle class="f-fat" r="5"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.6;1" calcMode="linear"
        path="M70 80 Q80 64 86 61 Q100 66 108 76 Q112 82 116 84 L116 122 Q116 132 103 133.5"/></circle></g>
      ${q(AMP[0] + 4, AMP[1])}
      ${tag(60, 28, 'Liver', '', 9)}${tag(40, 140, 'Gallbladder', '', 9)}${tag(140, 166, 'Duodenum', '', 9)}${tag(206, 130, 'Pancreas', '', 9)}
      ${tag(134, 90, 'CBD', '', 9)}
      ${ink(`M${AMP[0] + 6} ${AMP[1]} L196 146`)}${qL(196, 146, 'Stone plugs ampulla', 9.5)}
      ${qL(206, 64, 'Juice backs up', 10)}${ink('M240 72 L236 102')}
      ${qL(196, 168, 'Acute pancreatitis', 10)}`),

    /* 9. ultrasound: probe on the RUQ, screen shows a bright stone casting a black shadow */
    usound: ART(`
      <path class="f-skin" d="M20 30 Q26 18 46 16 L74 16 Q94 18 100 30 L106 70 Q100 110 104 180 L14 180 Q18 110 12 70 Z"/>
      <path class="s-line" d="M24 60 Q42 84 58 70 Q74 84 96 60" stroke-width="1.4" opacity=".5"/>
      ${liver(18, 56, 0.34, 'f-liver', 'noline')}${gb(36, 72, 20, 0.36)}
      ${[[34, 90], [38, 86]].map(([x, y]) => `<circle class="f-fat" cx="${x}" cy="${y}" r="2.4"/>`).join('')}
      <rect x="116" y="6" width="178" height="120" rx="10" style="fill:#151821;stroke:var(--art-line);stroke-width:1.5"/>
      ${q(205, 66, 14)}
      <g class="ans">
        <path d="M205 14 L150 108 Q205 124 260 108 Z" style="fill:#4a505d"/>
        ${[[170, 92], [190, 40], [228, 96], [240, 70], [182, 106], [220, 30], [160, 100], [246, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" style="fill:#7d8494"/>`).join('')}
        <ellipse cx="205" cy="62" rx="32" ry="17" style="fill:#07080b"/>
        <path d="M198 74 L214 74 L222 114 L190 114 Z" style="fill:#07080b;opacity:.92"/>
        <path class="a-blink" d="M196 72 Q205 60 216 72 Q205 68 196 72 Z" style="fill:#ffffff;stroke:#ffffff;stroke-width:2"/>
        <path class="s-white a-sway" style="transform-box:view-box;transform-origin:205px 14px;opacity:.5" d="M205 14 L205 116" stroke-width="1.2"/>
        ${tag(256, 48, 'Bright stone', '', 9)}${tag(256, 96, 'Shadow', '', 9)}
        <g transform="rotate(30 44 76)"><rect class="f-white" x="38" y="50" width="12" height="24" rx="4"/><rect class="f-immune" x="36" y="72" width="16" height="6" rx="2"/></g>
        <path class="s-line" d="M38 52 C40 20 90 8 118 20" stroke-width="2"/>
        <path class="s-water a-flow" d="M36 86 Q42 90 48 86 M32 94 Q42 100 52 94" stroke-width="2"/>
      </g>
      ${qT(205, 138, 'Abdominal ultrasound', 10.5)}
      <rect x="116" y="150" width="40" height="28" rx="4" style="fill:#2c2f36;stroke:var(--art-line);stroke-width:1.2"/>
      <path class="s-white" d="M120 158 Q136 152 152 158 M120 166 Q136 160 152 166 M120 174 Q136 168 152 174" stroke-width="1.4" opacity=".55"/>
      ${qL(164, 164, 'X-ray: most stones hide', 9.5)}`),

    /* 10. treatment ladder on the left; the definitive fix (cholecystectomy) on the right */
    gsTx: (() => {
      const rows = [
        ['Pain control (NSAIDs)', 'f-mucus', y => `<circle class="f-white" cx="16" cy="${y}" r="6.5"/><path class="s-line" d="M11 ${y} H21" stroke-width="1.2"/>`],
        ['Low-fat diet', 'f-good', y => burger(16, y - 1, 0.75) + `<path class="s-bad" d="M8 ${y - 8} L24 ${y + 8}" stroke-width="2.4"/>`],
        ['Bile acids dissolve', 'f-pancreas', y => `<circle class="f-fat a-grow" cx="16" cy="${y}" r="6"/>` + drop(25, y - 5, 0.45, 'f-bile')],
        ['Lithotripsy', 'f-immune', y => `<circle class="f-fat a-shake" cx="18" cy="${y}" r="5"/><path class="s-white a-flow" d="M5 ${y - 6} Q9 ${y} 5 ${y + 6} M9 ${y - 7} Q13 ${y} 9 ${y + 7}" stroke-width="1.8"/>`],
        ['Antibiotics if infected', 'f-germ', y => pill(16, y, -35, 'f-white', 'f-warn')],
      ];
      return ART(`
        ${rows.map(([t, bg, ic], i) => { const y = 18 + i * 32; return q(16, y) + `<g class="ans"><g class="a-pop" style="--d:${i}">${iconBg(16, y, bg, 13)}${ic(y)}</g>${ltag(34, y, t, 'a-fadein', 9.5)}</g>`; }).join('')}
        <path class="s-ink" d="M168 8 V172" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
        <path class="f-liver" d="M176 4 L296 4 L296 44 C270 56 240 60 214 62 C192 64 178 54 176 40 Z"/>
        ${tag(270, 16, 'Liver', '', 9)}
        <g class="q">${duct('M218 62 Q215 76 214 92', 3.5)}${gb(220, 60, -45, 0.95)}</g>
        <g class="ans">
          ${duct('M214 66 Q213 78 214 92', 3.5)}
          <rect class="f-white" x="207" y="70" width="14" height="4" rx="1.5"/><rect class="f-white" x="207" y="77" width="14" height="4" rx="1.5"/>
          <path class="s-ink" d="M208 64 L222 62" stroke-width="1.4" stroke-dasharray="2 2"/>
          <g class="a-bob">${gb(258, 100, -30, 0.95)}<circle class="f-fat" cx="252" cy="120" r="3.5"/><circle class="f-fat" cx="259" cy="124" r="3"/>
            <path class="s-line" d="M262 98 L290 66" stroke-width="3"/><path class="s-line" d="M258 100 L264 94 M262 102 L266 96" stroke-width="2"/></g>
        </g>
        ${qT(232, 152, 'Cholecystectomy', 10.5)}${tag(232, 172, 'The definitive fix', 'ans', 9.5)}`);
    })(),

    /* 11. causes of hepatitis: four attackers pointed at an inflamed liver */
    hepCause: ART(`
      ${liver(76, 54, 0.8)}
      <g class="ans"><path class="f-bad a-blink noline" opacity=".45" ${NS} transform="translate(76 54) scale(.8)" d="${LIVER}"/></g>
      ${tag(140, 70, 'Liver', '', 10)}
      <path class="s-warn a-flow" d="M52 46 L92 62 M248 46 L210 60 M52 134 L104 104 M248 134 L170 96" stroke-width="2.4"/>
      ${[[34, 38], [266, 38], [34, 140], [266, 140]].map(([x, y]) => `<circle class="f-white" cx="${x}" cy="${y}" r="20"/>` + q(x, y, 10)).join('')}
      <g class="ans">
        <g class="a-spin">${virus(34, 38, 8)}</g>
        <path class="f-white" d="M258 24 h16 q0 14 -8 16 v10 h5 v3 h-14 v-3 h5 v-10 q-8 -2 -8 -16 z"/><path class="f-bad noline" d="M259.5 30 h13 q-1 8 -6.5 9 q-5.5 -1 -6.5 -9 z"/>
        <g class="a-bob"><rect class="f-white" x="24" y="128" width="18" height="24" rx="3"/><rect class="f-bad" x="22" y="124" width="22" height="6" rx="2"/>
          <circle class="f-white" cx="46" cy="148" r="4"/></g>
        ${[[-1, 0], [1, 0], [0, -1]].map(([dx, dy], i) => `<g class="a-pop" style="--d:${i + 1}">${Y(266 + dx * 9, 142 + dy * 9 + 3, dx * 50, 's-immune', 3)}</g>`).join('')}
      </g>
      ${qT(96, 14, 'Viruses (#1)', 10)}${qT(214, 14, 'Alcohol', 10)}
      ${qT(92, 168, 'Acetaminophen, drugs', 9.5)}${qT(214, 168, 'Autoimmune: lupus, RA', 9.5)}`),

    /* 12. ALT vs AST: ALT leaks from the liver only; AST from liver, heart, muscle, kidney, brain */
    altAst: ART(`
      <rect x="2" y="140" width="296" height="26" rx="13" class="f-blood" opacity=".3"/>
      ${txt(150, 177, 'bloodstream', 9, 'ink')}
      <path class="s-ink" d="M116 6 V134" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
      ${tag(58, 14, 'ALT')}${tag(207, 14, 'AST')}
      ${q(58, 56, 11)}
      <g class="ans">${liver(14, 36, 0.48)}
        ${[0, 1, 2].map(i => `<circle class="f-good a-drop" style="animation-delay:-${i * 0.5}s" cx="${44 + i * 14}" cy="${100}" r="3.5"/>`).join('')}
        ${[[20, 152], [40, 156], [60, 150], [84, 156]].map(([x, y]) => `<circle class="f-good" cx="${x}" cy="${y}" r="3.5"/>`).join('')}</g>
      ${qT(58, 122, 'Liver-specific', 10)}
      ${[136, 172, 208, 244, 280].map(x => q(x, 52)).join('')}
      <g class="ans">
        ${liver(124, 44, 0.14)}${heart(172, 52, 1)}${muscle(208, 52)}${kidney(244, 52)}${brain(280, 52)}
        ${['Liver', 'Heart', 'Muscle', 'Kidney', 'Brain'].map((t, i) => tag(136 + i * 36, i % 2 ? 90 : 76, t, '', 9)).join('')}
        ${[136, 172, 208, 244, 280].map((x, i) => `<circle class="f-immune a-drop" style="animation-delay:-${i * 0.3}s" cx="${x}" cy="108" r="3.2"/>`).join('')}
        ${[130, 160, 190, 222, 254, 284].map((x, i) => `<circle class="f-immune" cx="${x}" cy="${150 + (i % 2) * 6}" r="3.2"/>`).join('')}
      </g>
      ${qT(207, 122, 'Many organs', 10)}`),

    /* 13. ALP high: is it bone or liver? Check GGT - only the liver makes GGT rise */
    alpGgt: ART(`
      ${bone(36, 40, 1.1)}${tag(36, 60, 'Bone', '', 9)}
      ${liver(6, 116, 0.34)}${tag(36, 150, 'Liver', '', 9)}
      <path class="s-warn a-flow" d="M62 44 L100 76 M64 126 L100 104" stroke-width="2.6"/>
      ${tubeIcon(116, 90, 'f-warn')}
      ${tag(116, 124, 'ALP high', '', 10)}
      <circle class="f-white" cx="184" cy="88" r="15" opacity=".9"/><circle class="s-line" cx="184" cy="88" r="15" stroke-width="3"/>
      <path class="s-line" d="M195 99 L204 108" stroke-width="5"/>
      ${q(184, 88, 9)}
      <g class="ans">
        <g class="a-bob"><text x="184" y="92" text-anchor="middle" style="font-size:10px;font-weight:800;fill:#1d2238">GGT</text></g>
        <path class="s-good a-flow" d="M197 78 L232 44" stroke-width="2.2"/>
        ${[0, 1, 2].map(i => `<circle class="f-good a-rise" style="animation-delay:-${i * 0.6}s" cx="${20 + i * 14}" cy="${116}" r="3"/>`).join('')}${tag(60, 106, 'makes GGT', '', 9)}
        <path class="s-scar" d="M200 104 L232 132" stroke-width="2.2"/>
        ${liver(236, 16, 0.3)}${bone(262, 128, 0.8)}
      </g>
      ${qT(184, 124, 'Check GGT', 10.5)}
      ${qT(246, 50, 'GGT high = liver', 9.5)}${qT(246, 152, 'GGT normal = bone', 9.5)}
      ${tag(80, 170, 'Bone disease never raises GGT', 'ans', 9)}`),

    /* 14. bilirubin: red cells -> unconjugated (orange) -> liver conjugates -> conjugated (green) -> bile -> gut */
    bili: ART(`
      ${tag(70, 14, 'Unconjugated', '', 9.5)}${tag(232, 14, 'Conjugated', '', 9.5)}
      <ellipse class="f-blood a-shake" cx="24" cy="46" rx="16" ry="10"/><ellipse class="noline" cx="24" cy="46" rx="6" ry="3.5" style="fill:#b3222f"/>
      ${tag(24, 66, 'Old RBCs', '', 9)}
      <path class="s-warn" d="M42 46 L104 46" stroke-width="2.5" stroke-dasharray="2 4"/>
      ${liver(104, 28, 0.46)}${tag(146, 66, 'Liver', '', 9)}
      ${duct('M188 42 L250 46', 4.5)}
      ${tube('M252 46 Q266 46 270 36 Q274 26 288 30', 12, 'small')}
      <g class="ansmotion">${[0, 1, 2].map(i => `<circle class="f-warn" r="4"><animateMotion dur="3s" begin="-${i}s" repeatCount="indefinite" path="M40 46 L106 46"/></circle>`).join('')}
        ${[0, 1, 2].map(i => `<circle class="f-bile" r="4"><animateMotion dur="3s" begin="-${i}s" repeatCount="indefinite" path="M188 42 L250 46 Q266 46 270 36"/></circle>`).join('')}</g>
      <rect x="4" y="84" width="142" height="92" rx="10" class="f-warn" opacity=".18"/>
      <rect x="154" y="84" width="142" height="92" rx="10" class="f-bile" opacity=".3"/>
      ${ink('M24 76 L40 88')}${ink('M226 54 L226 88')}
      ${qT(75, 98, 'Too much made', 10)}${qT(225, 98, "Can't drain", 10)}
      ${tag(75, 120, 'Hemolysis (sickle cell)', 'ans', 9.5)}${tag(75, 140, 'Gilbert syndrome', 'ans', 9.5)}
      ${tag(225, 120, 'Blockage (stone)', 'ans', 9.5)}${tag(225, 140, 'Hepatitis', 'ans', 9.5)}
      <g class="ans">
        <circle class="f-fat a-shake" cx="226" cy="46" r="5"/>
        ${[0, 1, 2, 3].map(i => `<circle class="f-warn a-pop" style="--d:${i}" cx="${40 + i * 12}" cy="162" r="4.5"/>`).join('')}
        <path class="f-blood" d="M100 156 Q112 150 124 156 Q112 160 100 168 Q106 160 100 156 Z"/>
        ${[0, 1, 2].map(i => `<circle class="f-bile a-rise" style="animation-delay:-${i * 0.6}s" cx="${200 + i * 16}" cy="164" r="4"/>`).join('')}
        <path class="s-bile a-flow" d="M268 168 L268 152" stroke-width="2.5"/>
      </g>`),

    /* 15. liver function = what the liver MAKES: albumin, clotting factors (PT), clears bilirubin */
    synth: ART(`
      ${liver(4, 64, 0.62)}${tag(50, 86, 'Liver', '', 9.5)}
      <path class="s-immune a-flow" d="M110 70 C130 50 140 30 160 30" stroke-width="2.4"/>
      <path class="s-blood a-flow" d="M118 86 L160 88" stroke-width="2.4"/>
      <path class="s-warn a-flow" d="M104 100 C130 120 140 140 160 140" stroke-width="2.4"/>
      ${q(172, 30)}${q(172, 88)}${q(172, 140)}
      <g class="ans">
        ${tubeIcon(172, 30, 'f-immune')}
        ${clock(172, 88, 12)}
        ${drop(172, 140, 1, 'f-warn')}
        <g class="ansmotion">${[0, 1].map(i => `<circle class="f-immune" r="3.5"><animateMotion dur="2s" begin="-${i}s" repeatCount="indefinite" path="M110 70 C130 50 140 30 160 30"/></circle>`).join('')}</g>
      </g>
      ${ltag(186, 30, 'Albumin: low = poor', 'ans', 9.5)}${ltag(186, 88, 'PT: long = poor', 'ans', 9.5)}${ltag(186, 140, 'Bilirubin', 'ans', 9.5)}
      <g class="ans"><path class="f-bad" d="M10 160 Q10 144 22 144 Q34 144 34 160 Z"/><rect class="f-scar" x="7" y="160" width="30" height="5" rx="2"/>
        <path class="s-warn a-blink" d="M4 140 L0 136 M40 140 L44 136 M22 138 L22 132" stroke-width="2"/></g>
      ${q(22, 154)}
      ${ltag(44, 148, 'ALT, AST = injury,', 'ans', 9.5)}${ltag(44, 167, 'not function', 'ans', 9.5)}`),

    /* 16. how hepatitis viruses spread: A, E fecal-oral; B, C, D blood + fluids (D rides on B) */
    hepTypes: ART(`
      <rect x="4" y="30" width="140" height="126" rx="14" class="f-good" opacity=".15"/>
      <rect x="156" y="30" width="140" height="126" rx="14" class="f-bad" opacity=".15"/>
      ${qT(74, 20, 'Fecal-oral', 10.5)}${qT(226, 20, 'Blood & body fluids', 10.5)}
      <g class="q">${['A', 'B', 'C', 'D', 'E'].map((l, i) => vball(46 + i * 52, 94, l, ['f-good', 'f-bad', 'f-germ', 'f-immune', 'f-warn'][i], 11)).join('')}</g>
      <g class="ans">
        <path class="f-water" d="M18 48 h22 l-3 30 h-16 z"/><path class="noline" d="M20 58 h18 l-2 18 h-14 z" style="fill:#c9a66b"/>
        <path class="f-fat" d="M104 74 L96 54 Q112 40 128 54 L120 74 Z"/><path class="s-line" d="M112 74 L112 50 M108 74 L102 54 M116 74 L122 54" stroke-width="1.2"/><rect class="f-food" x="104" y="72" width="16" height="5" rx="2"/>
        ${tag(112, 86, 'raw shellfish', '', 9)}${tag(30, 86, 'dirty water', '', 9)}
        <g class="a-bob">${vball(46, 116, 'A', 'f-good')}</g><g class="a-bob" style="animation-delay:-.9s">${vball(104, 116, 'E', 'f-warn')}</g>
        ${syringe(196, 56, -25, 1.3)}${drop(266, 58, 1.6, 'f-blood', 'a-pulse')}
        <g class="a-bob">${vball(186, 116, 'B', 'f-bad')}${vball(204, 98, 'D', 'f-immune', 8)}</g>
        <g class="a-bob" style="animation-delay:-.9s">${vball(262, 116, 'C', 'f-germ')}</g>
      </g>
      ${qT(150, 168, 'Hep D can only infect with hep B', 10)}`),

    /* 17. phases of acute hepatitis on a timeline; a dot rides the symptom curve */
    phases: ART(`
      ${[[8, 78, 'f-scar'], [78, 148, 'f-warn'], [148, 220, 'f-acid'], [220, 292, 'f-good']].map(([a, b, c]) => `<rect class="${c}" x="${a}" y="112" width="${b - a}" height="14" rx="4"/>`).join('')}
      ${qT(43, 142, 'Incubation', 9.5)}${qT(113, 142, 'Prodromal', 9.5)}${qT(184, 142, 'Icteric', 9.5)}${qT(256, 142, 'Recovery', 9.5)}
      ${tag(43, 162, 'No symptoms', 'ans', 9)}${tag(113, 162, 'Flu-like', 'ans', 9)}${tag(184, 162, 'Jaundice', 'ans', 9)}${tag(256, 162, 'By 6–8 wk', 'ans', 9)}
      <g class="ans">
        <path class="s-bad a-draw" d="M10 104 L70 104 C90 104 96 82 116 80 C136 78 150 66 176 66 C200 66 214 96 240 102 L290 104" stroke-width="2.4"/>
        <path class="s-acid a-draw" d="M150 104 C164 104 170 72 190 72 C214 72 222 104 260 104" stroke-width="2.4" style="stroke:#e0b800"/>
        ${face(43, 40, 15)}${[0, 1, 2].map(i => `<g class="a-pop" style="--d:${i}">${virus(26 + i * 8, 64 + (i % 2) * 6, 2.2)}</g>`).join('')}
        ${face(113, 40, 15, 'f-skin', 'sick')}${thermo(136, 36)}
        ${face(184, 40, 15, 'f-acid', 'sick', '#ffe14d')}
        ${face(256, 40, 15, 'f-skin', 'happy')}<path class="s-good a-pop" style="--d:3" d="M270 22 l5 5 l9 -10" stroke-width="3.5"/>
      </g>
      <g class="ansmotion"><circle class="f-white" r="4.5" style="stroke-width:2"><animateMotion dur="6s" repeatCount="indefinite"
        path="M10 104 L70 104 C90 104 96 82 116 80 C136 78 150 66 176 66 C200 66 214 96 240 102 L290 104"/></circle></g>`),

    /* 18. icteric phase: yellow skin + eyes, itching, dark urine, pale stools, big tender liver */
    icteric: ART(`
      <path class="f-skin" d="M46 180 Q44 104 64 88 L116 88 Q136 104 134 180 Z"/>
      <rect class="f-skin" x="82" y="70" width="16" height="20"/>
      ${face(90, 44, 26)}
      <g class="ans">
        <path class="f-acid noline" opacity=".55" d="M46 180 Q44 104 64 88 L116 88 Q136 104 134 180 Z"/>
        <circle class="f-acid noline" opacity=".55" cx="90" cy="44" r="26"/>
        ${[-1, 1].map(k => `<ellipse cx="${90 + k * 9.4}" cy="${39.3}" rx="3.4" ry="2.6" style="fill:#ffd400;stroke:var(--art-line);stroke-width:1"/><circle cx="${90 + k * 9.4}" cy="39.3" r="1.4" style="fill:var(--art-line)"/>`).join('')}
        ${liver(58, 104, 0.32, 'f-liver', 'a-pulse')}
        ${star(66, 116, 5, 'f-bad', 'a-blink')}
        <g class="a-shake"><path class="s-bad" d="M118 110 l8 -8 M120 118 l8 -8 M122 126 l8 -8" stroke-width="2"/></g>
      </g>
      ${qT(196, 18, 'Jaundice (skin, eyes)', 10)}${ink('M110 30 L132 20')}
      ${qT(150, 96, 'Itching', 10)}
      ${qT(80, 150, 'Big, tender liver', 10)}
      <path class="f-white" d="M214 30 h28 l-3 40 h-22 z" opacity=".9"/>
      <g class="q"><path class="noline" d="M216.5 44 h23 l-2 24 h-19 z" style="fill:#e8e2c8"/></g>
      <g class="ans"><path class="noline a-blink" d="M216.5 44 h23 l-2 24 h-19 z" style="fill:#7a3e10"/></g>
      <ellipse class="f-white" cx="228" cy="140" rx="30" ry="8"/>
      <g class="q"><path class="f-scar" d="M210 134 q8 -10 18 -6 q12 -6 18 4 q-4 6 -18 6 q-14 2 -18 -4 z"/></g>
      <g class="ans"><path class="a-pop" d="M210 134 q8 -10 18 -6 q12 -6 18 4 q-4 6 -18 6 q-14 2 -18 -4 z" style="fill:#d9ccb0;stroke:var(--art-line);stroke-width:1.5"/></g>
      ${qT(228, 88, 'Dark tea urine', 10)}${qT(228, 164, 'Clay-colored stool', 10)}`),

    /* 19. chronic (slow, >6 months -> cirrhosis, cancer) vs fulminant (fast crash, liver failure within weeks) */
    chronic: ART(`
      <rect x="4" y="4" width="292" height="82" rx="12" class="f-immune" opacity=".14"/>
      <rect x="4" y="94" width="292" height="82" rx="12" class="f-bad" opacity=".14"/>
      ${tag(40, 18, 'Chronic')}${tag(44, 108, 'Fulminant')}
      ${q(150, 46)}${q(150, 138)}
      <g class="ans">
        <rect class="f-white" x="16" y="34" width="34" height="32" rx="4"/><rect class="f-bad" x="16" y="34" width="34" height="9" rx="3"/>${txt(33, 61, '6+ mo', 9, '', 'middle', ';fill:#1d2238')}
        ${vball(72, 50, 'B', 'f-bad', 9)}${vball(98, 50, 'C', 'f-germ', 9)}
        <g class="a-fadein" style="--d:1">${liver(122, 36, 0.24)}</g>
        <path class="acs" d="M172 44 L180 44"/>
        <g class="a-fadein" style="--d:2">${liver(184, 36, 0.24, 'f-liver')}<path class="s-scar" d="M190 42 l6 4 l6 -4 l6 4 l6 -4 M194 50 l6 3 l6 -3" stroke-width="1.6"/></g>
        <path class="acs" d="M234 44 L242 44"/>
        <g class="a-fadein" style="--d:3">${liver(246, 36, 0.24, 'f-scar')}<circle class="f-tumor a-pulse" cx="262" cy="46" r="5"/></g>
        ${tag(204, 72, 'Cirrhosis', '', 9)}${tag(262, 72, 'Cancer', '', 9)}
        <path class="f-acid a-shake" d="M30 124 L22 144 L32 144 L26 162 L42 136 L32 136 L38 124 Z"/>
        <path class="s-bad a-draw" d="M70 124 L150 128 C170 130 176 160 196 164" stroke-width="2.6"/>
        ${liver(206, 124, 0.3, 'f-scar', 'a-shake')}<path class="s-line" d="M222 128 l6 8 l-4 6 l6 6" stroke-width="1.6"/>
      </g>
      ${qT(84, 72, 'Usually hep B or C', 9.5)}${qT(110, 148, 'Rare, very fast', 9.5)}${qT(234, 162, 'Liver failure ≤ 3 wk', 9.5)}`),

    /* 20. hepatitis A antibodies: IgM (pentamer) peaks early = active; IgG (single Y) stays = past or vaccine */
    hav: ART(`
      <path class="s-ink" d="M30 14 L30 128 L292 128" stroke-width="1.6"/>
      ${txt(34, 12, 'antibody level', 9, 'ink', 'start')}${txt(292, 139, 'time →', 9, 'ink', 'end')}
      <g class="ans"><rect x="32" y="16" width="146" height="111" class="f-warn noline" opacity=".13"/></g>
      <path class="s-warn a-draw" d="M36 126 C66 126 80 34 104 34 C128 34 140 120 186 126" stroke-width="3.2"/>
      <path class="s-immune a-draw" d="M60 126 C100 126 120 60 160 56 C200 52 240 52 290 52" stroke-width="3.2"/>
      <g class="ans">${pentamer(104, 22, 'a-spin')}${tag(132, 26, 'IgM', '', 10)}
        <g class="a-bob">${Y(250, 40, 0, 's-immune', 3)}</g>${tag(274, 36, 'IgG', '', 10)}</g>
      ${qT(84, 150, 'IgM = active now', 10)}${tag(84, 168, 'acute infection', 'ans', 9.5)}${qT(226, 150, 'IgG only = past', 10)}${tag(226, 168, 'infection or vaccine', 'ans', 9.5)}
      ${q(104, 60)}${q(240, 70)}`),

    /* 21. hepatitis C: antibody + RNA => active virus; antibody without RNA => cleared, antibody for life */
    hcv: ART(`
      <path class="s-ink" d="M150 6 V176" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
      ${tag(48, 14, 'Anti-HCV +', '', 9.5)}${tag(118, 14, 'RNA +', '', 9.5)}
      ${tag(198, 14, 'Anti-HCV +', '', 9.5)}${tag(268, 14, 'RNA –', '', 9.5)}
      <rect class="f-blood" x="6" y="38" width="138" height="56" rx="28" opacity=".35"/>
      <rect class="f-blood" x="156" y="38" width="138" height="56" rx="28" opacity=".35"/>
      ${[[24, 52], [70, 80], [118, 50], [178, 54], [224, 80], [270, 52]].map(([x, y]) => `<ellipse class="f-blood" cx="${x}" cy="${y}" rx="8" ry="5"/>`).join('')}
      ${Y(48, 72, -20)}${Y(100, 64, 25)}${Y(196, 70, -20)}${Y(250, 62, 25)}${Y(222, 50, 0)}
      <g class="ansmotion">${[0, 1, 2].map(i => `<g>${virus(0, 0, 5)}<animateMotion dur="4.5s" begin="-${i * 1.5}s" repeatCount="indefinite" path="M14 64 C50 52 90 78 136 64"/></g>`).join('')}</g>
      <g class="ans"><circle class="f-good a-pop" cx="270" cy="78" r="9"/><path class="s-white a-pop" d="M265 78 l4 4 l7 -8" stroke-width="2.6"/>
        <g class="a-pulse">${Y(222, 50, 0, 's-good', 3)}</g></g>
      ${qT(75, 118, 'Active virus', 10.5)}${qT(225, 118, 'Past infection', 10.5)}
      ${tag(75, 142, 'Virus in the blood', 'ans', 9.5)}${tag(225, 142, 'Virus cleared', 'ans', 9.5)}
      ${tag(225, 162, 'Antibody stays for life', 'ans', 9.5)}`),

    /* 22. acute hep B: the Dane particle - surface antigen (first), e antigen (contagious), core (IgM anti-core) */
    hbAcute: ART(`
      ${[...Array(14)].map((_, i) => { const [a, b] = pt(70, 90, 42, i * 360 / 14), [c, d] = pt(70, 90, 52, i * 360 / 14); return `<path class="s-line" d="M${a} ${b} L${c} ${d}" stroke-width="2"/><circle class="f-bad" cx="${c}" cy="${d}" r="4"/>`; }).join('')}
      <circle class="f-mucus" cx="70" cy="90" r="42"/>
      <polygon class="f-warn" points="70,66 91,78 91,102 70,114 49,102 49,78"/>
      <path class="s-germ" d="M58 84 q6 -8 12 0 t12 0 M58 96 q6 -8 12 0 t12 0" stroke-width="2"/>
      ${tag(70, 172, 'Hepatitis B virus', '', 9.5)}
      <g class="ans">
        ${[0, 1, 2].map(i => `<path class="f-pancreas a-rise" style="animation-delay:-${i * 0.6}s" d="M${112 + i * 10} ${66 - i * 4} l4 -4 l4 4 l-4 4 z"/>`).join('')}
        <g class="a-pop" style="--d:3">${pentamer(70, 90)}</g>
      </g>
      ${ink('M118 46 L150 30')}${ink('M126 62 L150 82')}${ink('M86 94 L150 134')}
      <circle class="f-bad" cx="158" cy="30" r="4"/><path class="f-pancreas" d="M154 82 l4 -4 l4 4 l-4 4 z"/><polygon class="f-warn" points="158,128 163,131 163,137 158,140 153,137 153,131"/>
      ${qL(168, 30, 'HBsAg +')}${tag(222, 50, 'First sign of infection', 'ans', 9)}
      ${qL(168, 82, 'HBeAg +')}${tag(222, 102, 'Very contagious', 'ans', 9)}
      ${qL(168, 134, 'Anti-HBc IgM +')}${tag(222, 154, 'IgM vs core = acute', 'ans', 9)}`),

    /* 23. hep B immunity: recovered (anti-HBs + anti-HBc) vs vaccinated (anti-HBs only - vaccine has no core) */
    hbImm: (() => {
      const mini = (x, y) => [...Array(10)].map((_, i) => { const [c, d] = pt(x, y, 22, i * 36); return `<circle class="f-bad" cx="${c}" cy="${d}" r="3.2"/>`; }).join('') +
        `<circle class="f-mucus" cx="${x}" cy="${y}" r="19"/><polygon class="f-warn" points="${x},${y - 10} ${x + 9},${y - 5} ${x + 9},${y + 5} ${x},${y + 10} ${x - 9},${y + 5} ${x - 9},${y - 5}"/>`;
      return ART(`
        <path class="s-ink" d="M150 6 V150" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
        ${tag(75, 14, 'Recovered')}${tag(225, 14, 'Vaccinated')}
        ${q(75, 54, 11)}${q(225, 54, 11)}
        <g class="ans">
          <g class="a-spin" style="animation-duration:9s">${mini(75, 54)}</g>${tag(124, 62, 'Real virus', '', 9)}
          ${syringe(225, 54, -20, 1.6, 'a-bob')}
          ${[0, 1, 2].map(i => `<circle class="f-bad a-pop" style="--d:${i}" cx="${204 + i * 8}" cy="${84}" r="3.2"/>`).join('')}
          ${tag(262, 84, 'Surface only', '', 9)}
          <g class="a-pop" style="--d:3">${Y(22, 104)}<circle class="f-bad" cx="22" cy="96" r="3"/></g>
          <g class="a-pop" style="--d:4">${Y(22, 132)}<polygon class="f-warn" points="22,120 26,122 26,127 22,129 18,127 18,122"/></g>
          <g class="a-pop" style="--d:5">${Y(172, 104)}<circle class="f-bad" cx="172" cy="96" r="3"/></g>
          <g opacity=".45">${Y(172, 132, 0, 's-scar')}</g><path class="s-bad" d="M164 122 L180 140" stroke-width="2.4"/>
        </g>
        ${qL(36, 106, 'Anti-HBs +')}${qL(36, 132, 'Anti-HBc +')}
        ${qL(186, 106, 'Anti-HBs +')}${qL(186, 132, 'Anti-HBc –')}
        ${qT(150, 166, 'The vaccine has no core antigen', 10)}`);
    })(),

    /* 24. chronic hep B (carrier): HBsAg stays up past 6 months; anti-HBc and anti-HBe positive */
    hbChronic: ART(`
      <path class="s-ink" d="M30 14 L30 124 L292 124" stroke-width="1.6"/>
      ${txt(34, 12, 'level', 9, 'ink', 'start')}${txt(292, 138, 'time →', 9, 'ink', 'end')}
      <path class="s-ink" d="M130 18 V124" stroke-width="1.2" stroke-dasharray="3 3"/>${tag(130, 136, '6 months', '', 9)}
      <path class="s-bad a-draw" d="M36 122 C56 122 66 38 92 38 L290 38" stroke-width="3.2"/>
      <path class="s-immune a-draw" d="M56 122 C86 122 96 64 136 60 L290 60" stroke-width="3.2"/>
      <path class="s-warn a-draw" d="M40 122 C64 122 74 76 100 76 C150 76 170 118 210 120" stroke-width="2.6" stroke-dasharray="1 0"/>
      <path class="s-good a-draw" d="M182 122 C204 122 214 84 244 82 L290 82" stroke-width="3.2"/>
      <g class="ans"><circle class="f-bad a-pulse" cx="290" cy="38" r="4.5"/>${tag(176, 100, 'HBeAg fades', '', 9)}</g>
      ${qT(240, 30, 'HBsAg + (stays)', 10)}${qT(240, 52, 'Anti-HBc +', 10)}${qT(244, 96, 'Anti-HBe +', 10)}
      ${qT(150, 160, 'Carrier: HBsAg + over 6 months', 10)}`),

    /* 25. vaccines: hep A from age 1 (+ at-risk adults); hep B at birth (+ health workers), which also blocks hep D */
    vaccine: ART(`
      <path class="s-ink" d="M150 6 V176" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
      ${syringe(28, 16, -20, 0.8, 'a-bob')}${tag(78, 14, 'Hep A')}
      ${syringe(178, 16, -20, 0.8, 'a-bob')}${tag(228, 14, 'Hep B')}
      ${q(75, 60, 11)}${q(225, 60, 11)}
      <g class="ans">
        <rect class="f-mouth" x="46" y="56" width="40" height="18" rx="3"/><rect class="f-white" x="46" y="52" width="40" height="6" rx="3"/>
        <rect class="f-water" x="64" y="38" width="4" height="14"/><path class="f-warn a-blink" d="M66 28 q5 6 0 10 q-5 -4 0 -10 z"/>
        ${txt(66, 70, '1', 11, 'on')}
        <ellipse class="f-mucus" cx="198" cy="64" rx="18" ry="12"/>${face(186, 58, 9)}
        <circle class="f-white" cx="258" cy="60" r="14"/><path class="f-bad noline" d="M255 50 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 z"/>
        <path class="f-good a-pulse" d="M225 132 l18 -6 v14 q0 14 -18 22 q-18 -8 -18 -22 v-14 z"/>
        ${txt(225, 148, 'D', 11, 'on')}<path class="s-white" d="M216 136 L234 156" stroke-width="2.4"/>
        <g class="a-shake">${vball(270, 142, 'D', 'f-immune', 7)}</g>
      </g>
      ${qT(75, 98, 'All kids from age 1', 10)}${qT(225, 98, 'All infants at birth', 10)}
      ${tag(75, 120, '+ at-risk adults:', 'ans', 9.5)}${tag(75, 140, 'travel, IV drugs,', 'ans', 9.5)}${tag(75, 160, 'liver disease', 'ans', 9.5)}
      ${tag(225, 118, '+ health workers', 'ans', 9.5)}
      ${qT(225, 170, 'Also prevents hep D', 9.5)}`),

    /* 26. acetaminophen: dose gauge swings into the red; ~50% of acute liver failure */
    apap: (() => {
      const cx = 86, cy = 128, r = 54, ang = g => -90 + g / 16 * 180;
      const needle = a => `<g transform="rotate(${a} ${cx} ${cy})"><path class="s-line" d="M${cx} ${cy} L${cx} ${cy - r + 6}" stroke-width="3.5"/></g>`;
      return ART(`
        <path d="${arcD(cx, cy, r, -90, ang(4))}" fill="none" stroke="var(--c-good)" stroke-width="15"/>
        <path d="${arcD(cx, cy, r, ang(4), ang(12))}" fill="none" stroke="var(--c-warn)" stroke-width="15"/>
        <path d="${arcD(cx, cy, r, ang(12), 90)}" fill="none" stroke="var(--c-bad)" stroke-width="15"/>
        <g class="ans">${[[4, '4 g'], [12, '12 g']].map(([g, t]) => { const [x, y] = pt(cx, cy, r + 15, ang(g)); return tag(+x, +y, t, '', 9); }).join('')}</g>
        <g class="q">${needle(-60)}</g>
        <g class="ansmotion"><g>${needle(0)}<animateTransform attributeName="transform" type="rotate" values="-80 ${cx} ${cy};72 ${cx} ${cy};72 ${cx} ${cy};-80 ${cx} ${cy}" keyTimes="0;.5;.85;1" dur="3.5s" repeatCount="indefinite"/></g></g>
        <circle class="f-white" cx="${cx}" cy="${cy}" r="6"/>
        <rect class="f-white" x="12" y="14" width="22" height="30" rx="4"/><rect class="f-bad" x="10" y="8" width="26" height="8" rx="3"/>
        <g class="ans">${[0, 1, 2].map(i => `<circle class="f-white a-drop" style="animation-delay:-${i * 0.5}s" cx="${42 + i * 8}" cy="${30 + i * 4}" r="3.5"/>`).join('')}</g>
        ${qT(98, 22, 'Acetaminophen', 10.5)}
        ${ltag(4, 148, 'Max 4 g/day', 'ans', 9.5)}${ltag(4, 168, 'Toxic > 12 g or 250 mg/kg', 'ans', 9.5)}
        ${liver(180, 14, 0.6)}
        <g class="ans"><g class="a-blink">${[[204, 28], [232, 30], [222, 44]].map(([x, y]) => `<circle class="f-scar noline" cx="${x}" cy="${y}" r="5"/>`).join('')}</g>
          <path class="s-line" d="M246 22 l-6 8 l6 6 l-6 8" stroke-width="1.8"/></g>
        <circle class="f-white" cx="200" cy="104" r="20"/>
        <g class="ans"><path class="f-bad a-pop" d="M200 104 L200 84 A20 20 0 0 1 200 124 Z"/></g>
        ${q(200, 104)}
        ${tag(260, 88, '~50%', 'ans', 10)}${tag(260, 106, 'of acute', 'ans', 9)}${tag(260, 123, 'liver failure', 'ans', 9)}
        ${qT(232, 146, '#1 cause in U.S.', 10)}${tag(240, 168, 'Kids: 150 mg/kg', 'ans', 9.5)}`);
    })(),

    /* 27. overdose treatment: charcoal in the gut within 4 h; acetylcysteine drip shields the liver, best within 8 h */
    nac: (() => {
      const X = h => 20 + h * 11.25;
      return ART(`
        <path class="f-stomach" d="M20 18 C26 10 46 8 64 16 C92 28 96 58 78 68 C62 76 42 66 32 52 C24 42 18 30 20 18 Z"/>
        ${tube('M20 18 L14 4', 7, 'esoph')}
        ${[[44, 36], [58, 44], [70, 50]].map(([x, y]) => `<circle class="f-white" cx="${x}" cy="${y}" r="4"/>`).join('')}
        <g class="ans">${[[40, 32], [48, 40], [54, 40], [62, 48], [66, 54], [74, 46], [52, 32], [42, 42]].map(([x, y], i) =>
          `<circle class="a-pop" style="--d:${i % 4};fill:#1b1b1f;stroke:var(--art-line)" cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g>
        ${qT(60, 88, 'Activated charcoal', 10)}
        <rect class="f-white" x="140" y="6" width="26" height="34" rx="6"/><rect class="f-good noline" x="143" y="18" width="20" height="19" rx="4"/>
        ${txt(153, 33, 'NAC', 8.6, 'on')}
        <path class="s-line" d="M153 40 L153 50 Q153 58 178 52" stroke-width="1.6"/>
        <g class="ans">${drop(153, 50, 0.4, 'f-good', 'a-drop')}</g>
        ${liver(180, 26, 0.6)}
        <g class="ans"><path class="f-good a-pulse" d="M262 30 l14 -5 v12 q0 11 -14 17 q-14 -6 -14 -17 v-12 z"/>
          <path class="s-white" d="M256 38 l4 4 l8 -8" stroke-width="2.4"/></g>
        ${qT(222, 88, 'Acetylcysteine (Mucomyst)', 9.5)}
        <path class="s-ink" d="M${X(0)} 136 H${X(24)}" stroke-width="1.6"/>
        ${[0, 4, 8, 12, 24].map(h => `<path class="s-ink" d="M${X(h)} 132 V140" stroke-width="1.4"/>` + txt(X(h), 152, h + ' h', 9, 'ink')).join('')}
        <g class="ans">
          <rect x="${X(0)}" y="106" width="${X(4) - X(0)}" height="8" rx="3" style="fill:#1b1b1f;stroke:var(--art-line)"/>
          <rect class="f-good" x="${X(0)}" y="118" width="${X(8) - X(0)}" height="8" rx="3"/>
          <path class="s-good" d="M${X(8)} 122 H${X(24)}" stroke-width="2" stroke-dasharray="3 4" opacity=".7"/>
        </g>
        ${qL(X(4) + 6, 108, 'Charcoal: within 4 h', 9)}${qL(X(8) + 6, 124, 'NAC: best within 8 h', 9)}
        <g class="ansmotion"><g>${clock(0, 0, 7, false)}<animateMotion dur="6s" repeatCount="indefinite" path="M${X(0)} 168 H${X(24)}"/></g></g>
        ${tag(150, 172, 'hours since the overdose', 'q', 9)}`);
    })(),
  });
})();
