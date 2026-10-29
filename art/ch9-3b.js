/* Chapter 9 Part 3 art (b): colorful replacements for PICS, loaded after the page sets PICS.
   Cards 28-53: cirrhosis through pancreatitis. Everything lives inside one function so the
   little shape helpers below never clash with the other art files. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const L = d => `<path class="s-ink" d="${d}" stroke-width="1" stroke-dasharray="2 3"/>`;
  const thick = (d, color, w = 7) => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path d="${d}" stroke="var(--c-${color})" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

  // organs, drawn at their own origin (front view: liver on the viewer's left)
  const LIVER = 'M4 14 C20 2 70 0 100 6 C114 9 122 14 120 20 C116 28 96 34 78 44 C60 56 30 64 14 56 C2 48 0 30 4 14 Z';
  const liver = (x, y, s = 1) => G(x, y, s, `<path class="f-liver" d="${LIVER}"/><path class="s-line" d="M72 5 Q68 24 62 44" stroke-width="1" opacity=".45"/>`);
  const NODS = [[18, 22, 8], [36, 14, 7], [56, 12, 7], [78, 12, 7], [100, 14, 6], [20, 40, 8], [40, 31, 8], [62, 27, 8], [84, 25, 6], [32, 50, 7], [52, 44, 6]];
  const nodules = (x, y, s = 1) => G(x, y, s, NODS.map(([a, b, r]) => `<circle class="f-liver" cx="${a}" cy="${b}" r="${r}" style="stroke:var(--c-scar);stroke-width:2.6"/>`).join(''));
  const cirr = (x, y, s = 1) => liver(x, y, s) + nodules(x, y, s);
  const KID = 'M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z';
  const kidney = (x, y, s = 1, flip = false, cls = 'f-muscle') => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path class="${cls}" d="${KID}"/></g>`;
  const SPLEEN = 'M4 8 C12 -2 34 0 38 12 C42 26 34 42 20 46 C12 48 14 36 10 30 C6 24 -2 18 4 8 Z';
  const STOM = 'M12 0 L20 0 C20 8 26 10 36 8 C52 6 62 18 60 32 C58 48 42 58 24 56 C14 55 8 50 10 44 C12 40 20 42 26 40 C34 36 34 28 28 24 C20 18 12 14 12 0 Z';
  const PANC = 'M6 10 C2 22 10 32 22 30 C30 28 34 22 44 20 C62 18 82 16 100 10 C108 7 112 2 106 0 C90 -2 66 4 46 6 C34 7 26 2 18 2 C10 2 8 6 6 10 Z';
  const panc = (x, y, s = 1, cls = 'f-pancreas') => G(x, y, s, `<path class="${cls}" d="${PANC}"/>`);
  const BRAIN = 'M0 14 C-2 4 8 -2 16 2 C20 -4 32 -4 36 2 C44 0 50 8 46 16 C50 24 42 32 34 30 C30 36 18 36 14 30 C4 32 -2 24 0 14 Z';
  const brain = (x, y, s = 1) => G(x, y, s, `<path class="f-mouth" d="${BRAIN}"/><path class="s-line" d="M10 10 Q16 14 12 20 M22 4 Q20 12 26 16 M34 8 Q30 16 38 20 M20 24 Q26 22 30 26" stroke-width="1.2" opacity=".6"/>`);

  // little icons, centered on (x, y)
  const pill = (x, y, rot = -30, c = 'f-warn') => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const germ = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="s-germ" d="M7 0 q3 -3 6 0 t6 0" stroke-width="1.3"/><rect class="f-germ" x="-8" y="-4" width="16" height="8" rx="4"/></g>`;
  const virus = (x, y, r = 11) => `<g transform="translate(${x} ${y})">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<g transform="rotate(${a})"><path class="s-germ" d="M0 ${-r} V${-r - 5}" stroke-width="2"/><circle class="f-germ" cx="0" cy="${-r - 6}" r="2.2"/></g>`).join('')}<circle class="f-germ" r="${r}"/><circle class="f-white noline" cx="-3" cy="-3" r="2.5" opacity=".6"/></g>`;
  const drop = (x, y, s = 1, c = 'f-blood') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/></g>`;
  const bottle = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="f-good" d="M-3 -20 H3 V-10 C8 -7 8 -3 8 2 V18 H-8 V2 C-8 -3 -8 -7 -3 -10 Z"/><rect class="f-white" x="-6" y="2" width="12" height="9" rx="1.5"/></g>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const check = (x, y, d = 0) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="7"/><path class="s-white" d="M${x - 3.5} ${y} l2.5 2.6 l4.5 -5" stroke-width="2"/></g>`;
  const syringe = (x, y, rot = -35) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="f-white" x="-11" y="-4" width="18" height="8" rx="1.5"/><rect class="f-water" x="-4" y="-3" width="10" height="6"/><path class="s-line" d="M7 0 H16 M-11 -6 V6 M-11 0 H-17 M-17 -4 V4" stroke-width="1.6"/></g>`;
  const ivbag = (x, y) => `<g transform="translate(${x} ${y})"><path class="f-white" d="M-9 -14 H9 V8 Q9 14 3 14 H-3 Q-9 14 -9 8 Z"/><rect class="f-water noline" x="-7" y="-2" width="14" height="13" rx="2" opacity=".8"/><path class="s-line" d="M0 14 V20" stroke-width="1.5"/></g>`;
  const stent = (x, y, w = 26) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="${-w / 2}" y="-5" width="${w}" height="10" rx="5"/><path class="s-line" d="${Array.from({ length: Math.floor(w / 5) }, (_, i) => `M${-w / 2 + 3 + i * 5} -5 l4 10 M${-w / 2 + 7 + i * 5} -5 l-4 10`).join(' ')}" stroke-width=".9"/></g>`;

  // moving bubbles with text: draw them at (20, 20) and shift the motion path back, so the text's own box stays on-frame
  const shift = d => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, a, b) => `${+a - 20} ${+b - 20}`);
  const bubble = (cls, txt, path, dur, begin, r = 10) => `<g><circle class="${cls}" cx="20" cy="20" r="${r}"/><text class="tagtx" x="20" y="23.5" text-anchor="middle" style="font-size:9px">${txt}</text><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${shift(path)}"/></g>`;

  Object.assign(PICS, {

    /* 28. Cirrhosis: bumpy liver + zoom on scar walls, nodules, stellate cell */
    cirrhosis: ART(`
      ${T(70, 30, 'Whole liver')}
      ${liver(12, 44, 1.05)}
      <g class="ans">${nodules(12, 44, 1.05)}</g>
      <circle cx="96" cy="70" r="9" fill="none" class="s-ink" stroke-width="1.5"/>
      ${L('M104 64 L180 40 M104 76 L180 136')}
      <circle class="f-liver" cx="222" cy="88" r="56"/>
      <path class="s-line" d="M180 70 L264 70 M180 106 L264 106 M206 34 L206 142 M240 34 L240 142" stroke-width="1" opacity=".3"/>
      <g class="ans">
        <circle class="f-scar" cx="222" cy="88" r="56"/>
        <circle class="f-liver a-pop" style="--d:0" cx="200" cy="66" r="18"/>
        <circle class="f-liver a-pop" style="--d:1" cx="246" cy="64" r="17"/>
        <circle class="f-liver a-pop" style="--d:2" cx="196" cy="110" r="18"/>
        <circle class="f-liver a-pop" style="--d:3" cx="244" cy="112" r="18"/>
        <path class="s-line a-flow-slow" d="M222 88 L222 34 M222 88 L168 88 M222 88 L276 88 M222 88 L222 142" stroke-width="1.6"/>
        <path class="f-nerve a-pulse" d="M222 79 L225 85 L231 86 L226 90 L228 97 L222 93 L216 97 L218 90 L213 86 L219 85 Z"/>
        ${tag(66, 122, 'Blocks blood + bile', 'ans', 9.5)}
      </g>
      ${qtag(66, 146, 'Bumpy, shrunken')}${qtag(196, 162, 'Scar walls')}${qtag(262, 162, 'Nodules')}
      ${L('M222 30 L222 76')}${qtag(222, 20, 'Stellate cell', 9.5)}`),

    /* 29. Main causes of cirrhosis */
    cirrCause: ART(`
      <path class="s-warn a-flow" d="M58 44 L104 70 M240 44 L196 70 M64 136 L106 110 M236 136 L194 110" stroke-width="2.5"/>
      ${cirr(96, 64, .9)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${virus(36, 32)}</g>
        <g class="a-pop" style="--d:1">${bottle(262, 30, 12)}</g>
        <g class="a-pop" style="--d:2"><circle class="f-fat" cx="30" cy="136" r="9"/><circle class="f-fat" cx="46" cy="130" r="6"/><circle class="f-fat" cx="44" cy="146" r="5"/></g>
        <g class="a-pop" style="--d:3"><circle class="f-large" cx="262" cy="134" r="12"/>${T(262, 138, 'Fe', { c: 'on', s: 11 })}</g>
        ${tag(150, 24, 'Hep C + alcohol lead in U.S.', 'ans', 9.5)}
      </g>
      ${qtag(48, 60, 'Hepatitis C')}${qtag(254, 60, 'Alcohol')}
      ${qtag(64, 164, 'Fatty liver (NASH)', 9.5)}${qtag(244, 164, 'Hemochromatosis', 9.5)}`),

    /* 30. Portal hypertension: anatomy, backed-up pressure, three results */
    portalHtn: ART(`
      ${thick('M178 6 L180 30', 'esoph', 7)}
      ${G(168, 28, .9, `<path class="f-stomach" d="${STOM}"/>`)}
      <g class="ans a-pulse"><circle class="f-vein" cx="176" cy="18" r="3.2"/><circle class="f-vein" cx="183" cy="24" r="3"/><circle class="f-vein" cx="175" cy="28" r="2.8"/></g>
      <g class="a-pulse">${G(236, 44, 1, `<path class="f-spleen" d="${SPLEEN}"/>`)}</g>
      <path d="M150 170 C150 150 150 132 150 118" class="s-line" stroke-width="10"/>
      <path d="M244 84 C220 100 190 114 150 118 L96 82" class="s-line" stroke-width="10"/>
      <path d="M150 170 C150 150 150 132 150 118 M244 84 C220 100 190 114 150 118 L96 82" stroke="var(--c-vein)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="s-white a-flow" d="M98 84 L150 118 C190 114 220 100 244 84 M98 84 L150 118 L150 168" stroke-width="1.8"/>
      ${G(108, 150, 1, `<path class="f-small" d="M0 6 C8 -6 26 -2 30 6 C40 -4 62 0 60 12 C72 14 76 30 60 30 L4 30 C-8 30 -10 14 0 6 Z"/>`)}
      ${cirr(12, 22, 1.08)}
      <g class="ans">
        <g class="a-drop"><circle class="f-water" cx="40" cy="132" r="3"/></g>
        <g class="a-drop" style="animation-delay:.6s"><circle class="f-water" cx="62" cy="128" r="3"/></g>
        <path class="f-water a-pulse" d="M14 170 Q52 156 96 170 L96 177 L14 177 Z" opacity=".85"/>
      </g>
      <circle class="f-white" cx="124" cy="101" r="10"/><path class="s-bad" d="M117 105 A8 8 0 0 1 131 96" stroke-width="2.5" opacity=".8"/>
      <path class="s-line a-sway" d="M124 103 L124 94" stroke-width="2"/>
      ${tag(124, 136, 'Portal vein', '', 9.5)}${L('M124 128 L124 112')}
      ${qtag(54, 12, 'Scar resists flow', 9.5)}${qtag(100, 116, 'Pressure ↑', 9.5)}
      ${qtag(224, 12, 'Varices', 9.5)}${qtag(268, 104, 'Big spleen', 9.5)}${qtag(54, 150, 'Ascites', 9.5)}`),

    /* 31. Where varices form */
    varices: ART(`
      <path class="f-skin" d="M104 2 Q150 -6 196 2 L208 70 Q214 120 204 178 L96 178 Q86 120 92 70 Z" opacity=".4"/>
      ${thick('M150 4 L150 32 Q151 42 158 47', 'esoph', 7)}
      ${G(146, 44, .85, `<path class="f-stomach" d="${STOM}"/>`)}
      <path d="M150 112 L122 76" class="s-line" stroke-width="8"/><path d="M150 112 L122 76" stroke="var(--c-vein)" stroke-width="5" stroke-linecap="round"/>
      ${liver(84, 40, .62)}
      ${thick('M150 140 L150 168', 'large', 8)}<circle class="f-muscle" cx="150" cy="172" r="3.5"/>
      <circle class="f-skin" cx="150" cy="120" r="3.5"/>
      <g class="ans">
        <path class="s-vein a-flow-slow" d="M140 100 C160 84 162 60 152 36 M140 100 C146 108 148 112 150 117 M150 112 C170 130 168 150 156 164" stroke-width="2"/>
        <g class="a-pulse"><path class="s-vein" d="M145 16 q-4 4 0 8 q4 4 0 8 q-4 4 0 8 M155 16 q4 4 0 8 q-4 4 0 8 q4 4 0 8" stroke-width="3.2"/></g>
        <g class="a-pulse"><circle class="f-vein" cx="164" cy="50" r="3"/><circle class="f-vein" cx="171" cy="47" r="2.6"/><circle class="f-vein" cx="168" cy="55" r="2.4"/></g>
        <g class="a-pulse"><path class="s-vein" d="M150 116 q-2 -6 2 -10 q4 -4 2 -10 M155 119 q6 -2 10 2 q4 4 10 2 M155 123 q4 4 2 10 q-2 6 4 10 M146 123 q-4 4 -2 10 q2 6 -4 10 M145 119 q-6 -2 -10 2 q-4 4 -10 2" stroke-width="2.4"/></g>
        <g class="a-pulse"><circle class="f-vein" cx="144" cy="168" r="4"/><circle class="f-vein" cx="156" cy="168" r="4"/></g>
        ${tag(250, 136, 'caput medusae', 'ans', 9.5)}${tag(52, 180 - 6, 'hemorrhoids', 'ans', 9.5)}
      </g>
      ${tag(62, 92, 'Portal vein', '', 9.5)}${L('M96 92 L132 92')}
      ${L('M104 30 L142 30 M206 52 L170 52 M214 120 L172 120 M98 160 L140 168')}
      ${qtag(54, 30, 'Esophagus: worst', 9.5)}${qtag(248, 52, 'Stomach', 9.5)}
      ${qtag(248, 118, 'Belly wall', 9.5)}${qtag(60, 156, 'Rectum', 9.5)}`),

    /* 32. Esophageal varices treatment */
    varTx: ART(`
      ${tag(58, 12, 'Prevent', '', 10)}${tag(234, 12, 'Bleeding now', '', 10)}
      <path class="s-ink" d="M118 22 V172 M164 22 V172" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      <path class="f-stomach" d="M128 128 L152 128 C176 128 194 140 192 158 C190 176 160 180 140 178 C114 176 100 164 108 148 C112 140 120 136 128 128 Z"/>
      <rect class="f-esoph" x="128" y="20" width="24" height="112" rx="4"/>
      <circle class="f-vein" cx="131" cy="48" r="5"/><circle class="f-vein" cx="149" cy="64" r="5.5"/><circle class="f-vein" cx="131" cy="104" r="5.5"/><circle class="f-vein" cx="149" cy="96" r="4.5"/>
      <g class="ans">
        <g class="a-drop"><circle class="f-blood" cx="156" cy="70" r="2.6"/></g>
        <g class="a-drop" style="animation-delay:.8s"><circle class="f-blood" cx="157" cy="74" r="2.2"/></g>
        <g class="a-pop" style="--d:1"><circle cx="131" cy="104" r="6.5" fill="none" stroke="#2b2b2b" stroke-width="3"/></g>
        <path class="s-line" d="M140 6 V150" stroke-width="2.2"/>
        <ellipse class="f-water" cx="140" cy="86" rx="7" ry="16" opacity=".75"><animate attributeName="rx" values="4;9;4" dur="2.6s" repeatCount="indefinite"/></ellipse>
        <ellipse class="f-water" cx="140" cy="148" rx="12" ry="8" opacity=".75"/>
        <g class="a-pop" style="--d:0">${pill(22, 46)}</g>
        <g class="a-pop" style="--d:2"><circle cx="22" cy="104" r="6" fill="none" stroke="#2b2b2b" stroke-width="3"/><circle class="f-vein" cx="22" cy="104" r="3"/></g>
        <g class="a-pop" style="--d:3">${syringe(180, 38)}</g>
        <g class="a-pop" style="--d:4"><circle class="f-water" cx="180" cy="80" r="6" opacity=".8"/></g>
        <g class="a-pop" style="--d:5"><circle cx="180" cy="112" r="5" fill="none" stroke="#2b2b2b" stroke-width="2.6"/></g>
        <g class="a-pop" style="--d:6">${stent(180, 150, 20)}</g>
        ${T(70, 64, 'nonselective', { s: 9 })}${T(236, 64, 'or terlipressin', { s: 9 })}
      </g>
      ${L('M104 104 L124 104 M194 80 L132 82')}
      ${qtag(70, 46, 'β-blocker')}${qtag(70, 104, 'Band ligation', 9.5)}
      ${qtag(236, 46, 'Octreotide', 9.5)}${qtag(242, 80, 'Balloon tamponade', 9.5)}
      ${qtag(236, 112, 'Banding', 9.5)}${qtag(242, 150, 'TIPS: last resort', 9.5)}`),

    /* 33. Why ascites forms: vessel leaks, albumin too low, kidneys hold sodium */
    ascites: ART(`
      <path class="s-ink" d="M16 76 V162 Q16 175 29 175 H211 Q224 175 224 162 V76" fill="none" stroke-width="1.5" stroke-dasharray="4 3"/>
      <rect class="f-vein" x="10" y="38" width="214" height="26" rx="13"/>
      <path class="s-white a-flow" d="M24 51 H210" stroke-width="1.5" opacity=".7"/>
      <circle class="f-pancreas" cx="70" cy="51" r="4"/><circle class="f-pancreas" cx="150" cy="47" r="4"/>
      ${kidney(240, 66, 1)}
      <g class="ans">
        <rect class="f-water noline" x="18" y="140" width="204" height="34" rx="6" opacity=".75">
          <animate attributeName="y" values="160;132;160" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="height" values="14;42;14" dur="5s" repeatCount="indefinite"/>
        </rect>
        <path class="s-bad" d="M44 30 V36 M84 30 V36 M124 30 V36" stroke-width="2.5"/>
        <path class="s-bad" d="M40 24 L44 30 L48 24 M80 24 L84 30 L88 24 M120 24 L124 30 L128 24" stroke-width="2"/>
        ${[36, 74, 112, 150, 188].map((x, i) => `<g class="a-drop" style="animation-delay:${i * .32}s">${drop(x, 82, .9, 'f-water')}</g>`).join('')}
        <path class="s-water a-flow" d="M246 74 C238 70 232 62 226 56" stroke-width="2.5"/>
        ${T(258, 128, 'Na⁺ + water', { s: 9 })}
        <g class="a-bob"><path class="f-small" d="M70 112 q10 -10 22 0 q12 10 22 0 q10 -8 20 0" style="fill:none;stroke:var(--c-small);stroke-width:7"/></g>
      </g>
      ${qtag(68, 14, 'Pressure pushes out', 9.5)}${qtag(184, 14, 'Low albumin', 9.5)}
      ${qtag(256, 146, 'Kidneys keep Na⁺', 9.5)}${qtag(120, 152, 'Fluid fills belly', 9.5)}`),

    /* 34. Ascites treatment: drain it, diuretics, low salt, TIPS */
    ascTx: ART(`
      <ellipse class="f-skin" cx="140" cy="96" rx="62" ry="56"/>
      <path class="f-small" d="M100 74 q10 -12 22 0 t22 0 t22 0 t14 4" style="fill:none;stroke:var(--c-small);stroke-width:7"/>
      <g class="q"><path class="f-water noline" opacity=".8" d="M80.6 112 Q140 120 199.4 112 A62 56 0 0 1 80.6 112 Z"/></g><g class="ansmotion"><path class="f-water noline" opacity=".8" d="M80.6 112 Q140 120 199.4 112 A62 56 0 0 1 80.6 112 Z"><animate attributeName="d" values="M80.6 112 Q140 120 199.4 112 A62 56 0 0 1 80.6 112 Z;M101.6 140 Q140 146 178.4 140 A62 56 0 0 1 101.6 140 Z;M80.6 112 Q140 120 199.4 112 A62 56 0 0 1 80.6 112 Z" dur="6s" repeatCount="indefinite"/></path></g>
      <circle class="f-skin" cx="140" cy="100" r="3"/>
      <g class="ans">
        <path class="s-line" d="M190 128 L216 140" stroke-width="2.2"/>
        <path class="s-water a-flow" d="M214 139 C232 148 236 130 254 140" stroke-width="3"/>
        <rect class="f-white" x="248" y="138" width="34" height="34" rx="6"/>
        <rect class="f-water noline" x="251" y="156" width="28" height="13" rx="3" opacity=".85"/>
        <g class="a-pop" style="--d:0">${pill(26, 40)}${pill(58, 40, 20, 'f-good')}</g>
        <g class="a-pop" style="--d:1"><path class="f-white" d="M36 98 h16 l2 30 h-20 Z"/><rect class="f-scar" x="36" y="92" width="16" height="7" rx="2"/>${T(44, 120, 'Na', { s: 9, c: 'tagtx' })}${nope(44, 110, 17)}</g>
        <g class="a-pop" style="--d:2">${stent(250, 44, 30)}</g>
        ${T(42, 64, 'spironolactone', { s: 9 })}${T(42, 75, '+ furosemide', { s: 9 })}
      </g>
      ${qtag(42, 18, 'Diuretics')}${qtag(42, 150, 'Low sodium')}
      ${qtag(254, 122, 'Paracentesis', 9.5)}${qtag(250, 24, 'TIPS')}${T(140, 172, 'belly full of fluid', { s: 9 })}`),

    /* 35. Hypersplenism: big spleen traps platelets */
    spleen: ART(`
      ${cirr(6, 18, .75)}
      <path class="s-line" d="M60 56 C100 60 150 84 200 90" stroke-width="11"/>
      <path d="M60 56 C100 60 150 84 200 90" stroke="var(--c-vein)" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path class="s-line" d="M214 128 C200 150 160 160 120 162" stroke-width="9"/>
      <path d="M214 128 C200 150 160 160 120 162" stroke="var(--c-blood)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <g class="a-grow">${G(188, 38, 2.1, `<path class="f-spleen" d="${SPLEEN}"/>`)}</g>
      <path class="s-white a-flow" d="M64 56 C100 60 150 84 196 90" stroke-width="1.6"/>
      <g class="ans">
        ${[[222, 70], [240, 82], [214, 96], [236, 104], [256, 66], [228, 120], [250, 92]].map(([x, y], i) => `<ellipse class="f-warn a-pop" style="--d:${i}" cx="${x}" cy="${y}" rx="4.5" ry="2.6"/>`).join('')}
        <g class="ansmotion">${[0, 1.2, 2.4].map(b => `<ellipse class="f-warn" rx="4.5" ry="2.6"><animateMotion dur="3.6s" begin="${b}s" repeatCount="indefinite" path="M64 56 C100 60 150 84 220 92"/></ellipse>`).join('')}</g>
        <ellipse class="f-warn" cx="160" cy="157" rx="4" ry="2.4"/>
        <g class="a-drop">${drop(94, 150, .9)}</g>
      </g>
      ${qtag(76, 104, 'Portal pressure ↑', 9.5)}${qtag(232, 166, 'Spleen traps platelets', 9.5)}
      ${qtag(72, 128, 'Few platelets → bleed', 9.5)}`),

    /* 36. Hepatic encephalopathy: ammonia gut → past liver → brain; asterixis */
    he: ART(`
      ${G(14, 128, 1, `<path class="f-small" d="M0 10 C10 -4 30 0 34 8 C44 -2 66 2 64 14 C76 16 80 34 64 34 L4 34 C-8 34 -10 18 0 10 Z"/>`)}
      ${cirr(10, 46, .72)}
      ${brain(206, 14, 1.4)}
      <path class="s-ink" d="M50 130 C46 110 46 96 52 84 C80 60 150 50 210 40" stroke-width="1.2" stroke-dasharray="3 4" opacity=".7"/>
      <g class="ans">
        <path class="s-bad a-blink" d="M40 62 L62 82 M62 62 L40 82" stroke-width="4"/>
        <g class="ansmotion">${[0, 1.4, 2.8].map(b => bubble('f-bile', 'NH₃', 'M50 136 C46 110 46 96 52 84 C80 60 150 50 214 40', 4.2, b)).join('')}</g>
        <g class="a-spin"><path class="s-warn" d="M240 6 a5 5 0 1 1 5 5 a8 8 0 1 1 -8 -8" stroke-width="2.2" transform="translate(-2 0)"/></g>
        ${T(276, 14, 'z', { s: 11, c: 'ink a-rise' })}
      </g>
      <path class="f-skin" d="M170 128 L222 124 L224 140 L170 142 Z"/>
      <g class="a-sway" style="transform-origin:left bottom;animation-duration:1.1s">
        <path class="f-skin" d="M222 124 C230 112 236 100 244 98 C250 97 252 102 248 108 L256 100 C260 96 266 100 262 106 L254 116 L262 110 C266 108 270 112 266 116 L250 132 C244 140 232 142 224 140 Z"/>
      </g>
      ${qtag(48, 112, "Can't clear it", 9.5)}${qtag(128, 66, 'Ammonia (NH₃)', 9.5)}
      ${qtag(240, 80, 'Confused, sleepy', 9.5)}${qtag(210, 160, 'Asterixis (flap)', 9.5)}`),

    /* 37. Hepatic encephalopathy treatment */
    heTx: ART(`
      ${thick('M10 92 L236 92 Q266 92 266 120 L266 172', 'large', 30)}
      <path d="M40 78 v-6 M80 78 v-6 M120 78 v-6 M160 78 v-6 M200 78 v-6" class="s-line" stroke-width="1.5"/>
      ${germ(54, 92)}${germ(92, 96, 20)}${germ(128, 88, -15)}
      <g class="ans">
        <g class="a-shake"><circle class="f-bile" cx="76" cy="84" r="5"/><circle class="f-bile" cx="110" cy="100" r="5"/></g>
        <g class="a-blink">${nope(92, 96, 15)}</g>
        <g class="a-bob">${pill(92, 50, -20, 'f-good')}</g>
        <path class="s-warn" d="M92 58 L88 66 L95 68 L90 77" stroke-width="2"/>
        <g class="a-bob">${bottle(186, 42, 30)}</g>
        <g class="a-drop"><circle class="f-water" cx="178" cy="66" r="3"/></g>
        <g class="ansmotion">${[0, 1.5, 3].map(b => bubble('f-water', 'NH₄⁺', 'M170 92 L236 92 Q266 92 266 120 L266 182', 4.5, b, 11)).join('')}</g>
        ${drop(28, 30, 1.2)}<g class="a-pop">${check(40, 22)}</g>
      </g>
      ${qtag(84, 16, 'Fix trigger: GI bleed', 9.5)}
      ${qtag(214, 16, 'Lactulose', 9.5)}${qtag(74, 134, 'Rifaximin: kills NH₃ makers', 9.5)}
      ${qtag(170, 158, 'NH₄⁺ flushed out', 9.5)}`),

    /* 38. Hormone effects: estrogen not cleared */
    estrogen: ART(`
      ${cirr(8, 38, .8)}
      <path class="s-ink" d="M100 66 L140 66" stroke-width="1.2" stroke-dasharray="3 4"/>
      <g class="ans">
        <g class="ansmotion">${[0, 1, 2].map(i => `<g><path class="f-mouth" d="M20 12 L27 16 L27 24 L20 28 L13 24 L13 16 Z"/><text class="tagtx" x="20" y="23.2" text-anchor="middle" style="font-size:9px">E</text><animateMotion dur="3s" begin="${i}s" repeatCount="indefinite" path="M20 44 L130 44"/></g>`).join('')}</g>
        ${[[24, 20], [44, 14], [64, 22]].map(([x, y], i) => `<g class="a-pop" style="--d:${i}"><path class="f-mouth" d="M${x} ${y - 8} L${x + 7} ${y - 4} L${x + 7} ${y + 4} L${x} ${y + 8} L${x - 7} ${y + 4} L${x - 7} ${y - 4} Z"/>${T(x, y + 3.2, 'E', { s: 9, c: 'tagtx' })}</g>`).join('')}
      </g>
      <circle class="f-skin" cx="180" cy="26" r="13"/><path class="f-vein" d="M160 44 Q180 38 200 44 L204 106 L156 106 Z"/>
      <circle class="f-skin" cx="256" cy="26" r="13"/><path class="f-mouth" d="M240 44 Q256 38 272 44 L284 106 L228 106 Z"/>
      <g class="ans">
        <g class="a-pulse"><path class="f-skin" d="M164 60 Q170 72 179 62 M181 62 Q190 72 196 60" style="stroke-width:1.5"/></g>
        <g class="a-pulse"><circle class="f-skin" cx="174" cy="100" r="3"/><circle class="f-skin" cx="186" cy="100" r="3"/></g>
        <rect class="f-white" x="240" y="62" width="32" height="28" rx="3"/><rect class="f-bad" x="240" y="62" width="32" height="7" rx="2"/>
        <circle class="f-blood a-blink" cx="246" cy="76" r="2.4"/><circle class="f-blood" cx="263" cy="82" r="2.4"/><circle class="f-blood a-blink" style="animation-delay:.7s" cx="256" cy="74" r="2.4"/>
        ${T(180, 140, 'impotence, infertility', { s: 9 })}
      </g>
      ${qtag(56, 120, 'Estrogen not cleared', 9.5)}
      ${qtag(180, 124, 'Breasts, small testes', 9.5)}${qtag(244, 160, 'Irregular periods', 9.5)}
      ${T(180, 9, 'Men', { s: 9.5 })}${T(256, 9, 'Women', { s: 9.5 })}`),

    /* 39. Bile backing up: jaundice, itch, dark urine, clay stools, poor fat absorption */
    cirrSx: ART(`
      ${cirr(4, 20, .7)}
      ${G(46, 52, .6, `<path class="f-gall" d="M10 0 C20 -2 26 8 22 20 C18 30 4 30 2 20 C0 12 2 2 10 0 Z"/>`)}
      <path class="s-bile" d="M58 70 C66 84 80 92 96 96" stroke-width="3"/>
      <circle class="f-skin" cx="140" cy="74" r="30"/>
      <ellipse class="f-white" cx="129" cy="68" rx="6" ry="4"/><ellipse class="f-white" cx="151" cy="68" rx="6" ry="4"/>
      <circle cx="129" cy="68" r="2" fill="#333"/><circle cx="151" cy="68" r="2" fill="#333"/>
      <path class="s-line" d="M132 88 Q140 84 148 88" stroke-width="1.6"/>
      <path class="f-white" d="M232 22 h22 l-2 32 h-18 Z"/>
      <ellipse class="f-white" cx="244" cy="98" rx="16" ry="7"/>
      <g class="ans">
        <path class="s-bile a-flow" d="M60 72 C66 84 80 92 108 92" stroke-width="2"/>
        <circle class="f-pancreas a-pulse" cx="140" cy="74" r="30" opacity=".55"/>
        <ellipse class="f-pancreas" cx="129" cy="68" rx="6" ry="4" opacity=".7"/><ellipse class="f-pancreas" cx="151" cy="68" rx="6" ry="4" opacity=".7"/>
        <circle cx="129" cy="68" r="2" fill="#333"/><circle cx="151" cy="68" r="2" fill="#333"/>
        <g class="a-shake"><path class="s-bad" d="M178 60 l8 -6 M180 70 l9 -5 M180 80 l8 -6" stroke-width="2"/></g>
        <rect class="f-large noline" x="235" y="30" width="16" height="22" opacity=".95"/>
        <path class="f-bone" d="M232 98 q4 -10 12 -10 q8 0 12 10 Z"/>
        ${['A', 'D', 'E', 'K'].map((l, i) => `<g class="a-pop" style="--d:${i}"><circle class="f-fat" cx="${218 + i * 18}" cy="140" r="7"/>${T(218 + i * 18, 143.5, l, { s: 9, c: 'tagtx' })}</g>`).join('')}
        <path class="s-bad" d="M206 140 H286" stroke-width="2" opacity=".8"/>
      </g>
      ${qtag(140, 118, 'Jaundice')}${qtag(196, 38, 'Itch', 9.5)}
      ${qtag(244, 66, 'Dark urine', 9.5)}${qtag(244, 118, 'Clay stools', 9.5)}
      ${qtag(246, 164, 'Poor fat + ADEK', 9.5)}${T(60, 152, 'bile backs up', { s: 9.5 })}${T(60, 164, 'into the blood', { s: 9.5 })}`),

    /* 40. Spontaneous bacterial peritonitis */
    sbp: ART(`
      <ellipse class="f-skin" cx="120" cy="96" rx="104" ry="70" opacity=".5"/>
      <path class="f-water noline" opacity=".75" d="M18 104 Q120 112 222 104 Q218 160 120 166 Q22 160 18 104 Z"/>
      <path d="M48 62 q18 -18 36 0 t36 0 t36 0 t30 0" fill="none" stroke="var(--c-small)" stroke-width="14" stroke-linecap="round"/>
      <path d="M48 62 q18 -18 36 0 t36 0 t36 0 t30 0" fill="none" class="s-line" stroke-width="1" opacity=".4"/>
      <g class="ans">
        ${germ(80, 62)}${germ(140, 58, 20)}
        <g class="ansmotion">${[0, 1.3, 2.6].map((b, i) => `<g>${germ(0, 0, 90)}<animateMotion dur="3.9s" begin="${b}s" repeatCount="indefinite" path="M${84 + i * 36} 66 L${78 + i * 40} 130"/></g>`).join('')}</g>
        ${[[60, 140], [104, 150], [150, 136], [184, 146]].map(([x, y], i) => `<g class="a-pop" style="--d:${i}">${germ(x, y, i * 40)}</g>`).join('')}
        <rect class="f-white" x="262" y="22" width="12" height="66" rx="6"/><circle class="f-white" cx="268" cy="94" r="10"/>
        <circle class="f-blood" cx="268" cy="94" r="7"/>
        <rect class="f-blood noline" x="265" y="40" width="6" height="52"><animate attributeName="y" values="80;34;80" dur="3s" repeatCount="indefinite"/><animate attributeName="height" values="12;58;12" dur="3s" repeatCount="indefinite"/></rect>
        ${T(70, 20, 'often E. coli', { s: 9 })}
        <g class="a-bob">${pill(262, 132, -25, 'f-good')}</g>
      </g>
      ${qtag(70, 34, 'Gut bacteria cross over', 9.5)}${qtag(120, 172, 'Infect ascites fluid', 9.5)}
      ${qtag(232, 112, 'Fever, pain, confusion', 9.5)}${qtag(262, 154, 'Antibiotics', 9.5)}`),

    /* 41. Hepatorenal syndrome */
    hrs: ART(`
      ${cirr(4, 30, .82)}
      <path class="s-bad a-flow" d="M104 56 L148 56" stroke-width="3.5"/><path class="f-bad" d="M146 50 L156 56 L146 62 Z"/>
      ${kidney(190, 30, 1, true)}${kidney(200, 30, 1)}
      <rect class="f-white" x="250" y="18" width="30" height="76" rx="4"/>
      <path class="s-line" d="M250 42 H280" stroke-width="1" stroke-dasharray="2 2"/>
      <g class="ans">
        <g class="a-blink">${kidney(190, 30, 1, true, 'f-scar')}${kidney(200, 30, 1, false, 'f-scar')}</g>
        <path class="s-bad" d="M168 84 l8 8 M176 84 l-8 8 M214 84 l8 8 M222 84 l-8 8" stroke-width="2.4"/>
        <rect class="f-bad noline" x="254" y="30" width="22" height="60"><animate attributeName="y" values="80;26;80" dur="3.5s" repeatCount="indefinite"/><animate attributeName="height" values="10;64;10" dur="3.5s" repeatCount="indefinite"/></rect>
        <g class="a-pop" style="--d:0">${ivbag(30, 126)}</g>
        <g class="a-pop" style="--d:1">${pill(102, 128, -20, 'f-immune')}</g>
        <g class="a-pop" style="--d:2">${syringe(176, 128)}</g>
        <g class="a-pop" style="--d:3">${liver(238, 118, .34)}</g>
        ${T(176, 168, 'or terlipressin', { s: 9 })}
      </g>
      ${qtag(126, 76, 'Liver disease', 9.5)}${qtag(198, 96, 'Kidneys fail', 9.5)}${qtag(264, 108, 'Creatinine ↑', 9.5)}
      ${qtag(32, 154, 'Albumin', 9.5)}${qtag(102, 154, 'Midodrine', 9.5)}${qtag(176, 154, 'Octreotide', 9.5)}${qtag(258, 154, 'Transplant', 9.5)}`),

    /* 42. Liver transplant */
    transplant: ART(`
      ${cirr(8, 30, .9)}
      <path class="s-good a-flow" d="M126 58 L168 58" stroke-width="4"/><path class="f-good" d="M166 51 L178 58 L166 65 Z"/>
      ${T(62, 98, 'old, scarred', { s: 9.5 })}${T(240, 98, 'new, healthy', { s: 9.5 })}
      <g class="a-bob">${liver(184, 30, .9)}</g>
      <g class="ans">
        <path class="s-bad" d="M18 38 L108 82 M108 38 L18 82" stroke-width="3" opacity=".7"/>
        <g class="a-blink"><path class="f-acid" d="M270 22 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z"/><path class="f-acid" d="M188 26 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 Z"/></g>
        ${check(14, 122, 1)}${check(162, 122, 2)}${check(14, 154, 3)}${check(150, 154, 4)}
      </g>
      ${qtag(76, 122, 'Best outcome', 9.5)}${qtag(226, 122, 'Alcohol-free 6+ mo', 9.5)}
      ${qtag(76, 154, 'No cancer', 9.5)}${qtag(224, 154, 'Top U.S. reason: hep C', 9.5)}`),

    /* 43. Simple fatty liver vs NASH */
    nafld: ART(`
      ${[[70, 76], [230, 76]].map(([cx, cy]) => `<circle class="f-liver" cx="${cx}" cy="${cy}" r="54"/>` +
        `<path class="s-line" d="M${cx - 50} ${cy - 18} H${cx + 50} M${cx - 52} ${cy + 18} H${cx + 52} M${cx - 18} ${cy - 50} V${cy + 50} M${cx + 18} ${cy - 50} V${cy + 50}" stroke-width="1" opacity=".3"/>` +
        [[-36, -36], [0, -36], [36, -36], [-36, 0], [0, 0], [36, 0], [-36, 36], [0, 36], [36, 36]].map(([a, b]) => `<circle cx="${cx + a + 8}" cy="${cy + b + 8}" r="2.2" fill="#3b1820"/>`).join('')).join('')}
      <path class="s-ink" d="M128 76 L172 76" stroke-width="2"/><path class="s-ink" d="M164 70 L172 76 L164 82" stroke-width="2"/>
      <g class="ans">
        ${[[50, 52, 9], [86, 56, 7], [60, 90, 10], [96, 96, 6], [36, 80, 5], [76, 74, 5]].map(([x, y, r], i) => `<circle class="f-fat a-pop" style="--d:${i}" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
        ${[[212, 54, 8], [250, 62, 6], [222, 96, 8], [258, 98, 5]].map(([x, y, r], i) => `<circle class="f-fat a-pop" style="--d:${i}" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
        ${[[236, 82], [204, 76], [262, 80], [240, 108]].map(([x, y], i) => `<circle class="f-immune a-pulse" style="animation-delay:${i * .3}s" cx="${x}" cy="${y}" r="5"/>`).join('')}
        <path class="s-scar a-draw" d="M190 40 Q214 70 200 112 M260 38 Q236 60 252 120" stroke-width="2.6"/>
        <g class="a-blink"><path class="f-bad" d="M230 44 q6 6 2 12 q8 -2 6 -10 q6 6 2 14 q-6 6 -12 0 q-2 -8 2 -16 Z"/></g>
        ${tag(150, 64, '~20%', 'ans', 9.5)}
        ${T(70, 172, 'fat only, stays put', { s: 9.5 })}${T(230, 172, '→ cirrhosis, cancer', { s: 9.5 })}
      </g>
      ${qtag(70, 154, 'Simple fatty liver', 9.5)}${qtag(230, 154, 'NASH: + inflamed', 9.5)}`),

    /* 44. NAFLD risk factors */
    nafldRisk: ART(`
      ${liver(90, 58, 1)}
      <g class="ans">
        ${[[110, 72, 6], [130, 66, 5], [152, 70, 7], [176, 70, 5], [118, 94, 6], [140, 90, 5], [194, 74, 4]].map(([x, y, r], i) => `<circle class="f-fat a-pulse" style="animation-delay:${i * .2}s" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
        <g class="a-pop" style="--d:0"><circle class="f-skin" cx="40" cy="12" r="6"/><ellipse class="f-skin" cx="40" cy="27" rx="13" ry="10"/></g>
        <g class="a-pop" style="--d:1">${drop(260, 24, 1.4)}${T(260, 30, 'G', { s: 9, c: 'on' })}</g>
        <g class="a-pop" style="--d:2"><circle class="f-warn" cx="30" cy="84" r="6"/><rect class="f-warn" x="35" y="82" width="18" height="4"/>${nope(40, 84, 13)}</g>
        <g class="a-pop" style="--d:3"><rect class="f-blood" x="242" y="76" width="36" height="16" rx="8"/><ellipse class="f-fat" cx="260" cy="79" rx="10" ry="4"/></g>
        <g class="a-pop" style="--d:4"><circle class="f-skin" cx="30" cy="142" r="5"/><circle class="f-skin" cx="42" cy="138" r="5"/><circle class="f-skin" cx="54" cy="142" r="5"/><path class="f-warn" d="M22 156 q8 -10 16 0 q8 -12 16 0 q4 -6 8 0 Z"/></g>
        <g class="a-pop" style="--d:5">${pill(250, 140, -25, 'f-immune')}</g>
        ${tag(150, 130, '#1 liver disease in kids', 'ans', 9.5)}
      </g>
      ${qtag(40, 48, 'Obesity', 9.5)}${qtag(250, 48, 'Type 2 diabetes', 9.5)}
      ${qtag(50, 108, 'Insulin resistance', 9.5)}${qtag(260, 108, 'High lipids', 9.5)}
      ${qtag(42, 168, 'Hispanic', 9.5)}${qtag(240, 168, 'Steroids, HIV drugs', 9.5)}`),

    /* 45. NAFLD treatment */
    nafldTx: ART(`
      ${liver(90, 58, 1)}
      <g class="ans">
        ${[[110, 72, 6], [130, 66, 5], [152, 70, 7], [176, 70, 5], [118, 94, 6], [140, 90, 5]].map(([x, y, r], i) => `<circle class="f-fat a-blink" style="animation-delay:${i * .2}s;animation-duration:2.4s" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
        <g class="a-pop" style="--d:0"><rect class="f-white" x="24" y="16" width="32" height="20" rx="4"/><path class="s-bad" d="M40 20 V30 M35 26 L40 31 L45 26" stroke-width="2"/></g>
        <g class="a-pop" style="--d:1"><circle class="f-bad" cx="254" cy="26" r="11"/><path class="s-good" d="M254 15 q2 -6 8 -8" stroke-width="3"/></g>
        <g class="a-pop" style="--d:2"><circle class="f-skin" cx="44" cy="70" r="5"/><path class="s-line" d="M42 76 L38 90 L30 100 M38 90 L46 100 M41 80 L32 84 M41 80 L50 76" stroke-width="2.5"/></g>
        <g class="a-pop" style="--d:3">${bottle(258, 84, 0)}${nope(258, 84, 15)}</g>
        <g class="a-pop" style="--d:4"><rect class="f-white" x="28" y="128" width="24" height="30" rx="4"/><rect class="f-good" x="31" y="132" width="18" height="10" rx="2"/>${drop(40, 152, .6)}</g>
        <g class="a-pop" style="--d:5">${pill(244, 140, -20, 'f-immune')}<circle class="f-warn" cx="272" cy="140" r="6"/>${T(272, 143.5, 'E', { s: 9, c: 'tagtx' })}</g>
      </g>
      ${qtag(40, 48, 'Lose weight', 9.5)}${qtag(240, 48, 'Healthy diet', 9.5)}
      ${qtag(52, 112, 'Exercise', 9.5)}${qtag(258, 112, 'No alcohol', 9.5)}
      ${qtag(64, 168, 'Control sugar, lipids', 9.5)}${qtag(225, 168, 'NASH: pioglitazone + vit E', 9)}`),

    /* 46. Pancreatitis: enzymes switch on early and digest the pancreas */
    panc: ART(`
      <path d="M58 40 C22 40 10 70 14 100 C18 130 46 144 80 140" fill="none" class="s-line" stroke-width="20"/>
      <path d="M58 40 C22 40 10 70 14 100 C18 130 46 144 80 140" fill="none" stroke="var(--c-small)" stroke-width="17" stroke-linecap="round"/>
      ${panc(26, 58, 2.36)}
      <path class="s-line" d="M262 66 C240 70 160 80 96 92 C70 96 50 98 26 100" stroke-width="1.5" opacity=".5"/>
      ${[[90, 100], [140, 88], [190, 80], [236, 72], [120, 112], [176, 100]].map(([x, y]) => `<circle class="f-scar" cx="${x}" cy="${y}" r="2.6"/>`).join('')}
      <g class="ans">
        <g class="a-blink">${panc(26, 58, 2.36, 'f-bad').replace('class="f-bad"', 'class="f-bad" opacity=".35"')}</g>
        <circle class="f-tumor" cx="164" cy="74" r="7"/><circle class="f-tumor" cx="110" cy="108" r="6"/><circle class="f-tumor" cx="226" cy="80" r="5"/>
        ${[[150, 76], [98, 104], [214, 80]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path class="f-warn" d="M0 0 L9 -6 A11 11 0 1 0 9 6 Z"><animate attributeName="d" values="M0 0 L9 -6 A11 11 0 1 0 9 6 Z;M0 0 L11 -1 A11 11 0 1 0 11 1 Z;M0 0 L9 -6 A11 11 0 1 0 9 6 Z" dur=".6s" repeatCount="indefinite"/></path><circle cx="-2" cy="-5" r="1.6" fill="#222"/></g>`).join('')}
        <g class="a-drop">${drop(130, 128, .9)}</g><g class="a-drop" style="animation-delay:.8s">${drop(200, 118, .8)}</g>
        ${tag(96, 128, 'trypsin', 'ans', 9)}
      </g>
      ${qtag(72, 22, 'Enzymes switch on early', 9.5)}${qtag(216, 22, 'Pancreas digests itself', 9.5)}
      ${qtag(178, 160, 'Swelling, bleeding, necrosis', 9.5)}${T(44, 168, 'duodenum', { s: 9 })}`),

    /* 47. Acute vs chronic pancreatitis: top causes */
    pancCause: ART(`
      ${tag(76, 12, 'Acute')}${tag(226, 12, 'Chronic')}
      <path class="s-ink" d="M152 22 V150" stroke-width="1" stroke-dasharray="3 4" opacity=".6"/>
      <path d="M78 40 C38 40 22 70 24 100 C26 130 54 140 90 136" fill="none" class="s-line" stroke-width="15"/>
      <path d="M78 40 C38 40 22 70 24 100 C26 130 54 140 90 136" fill="none" stroke="var(--c-small)" stroke-width="12" stroke-linecap="round"/>
      ${panc(34, 92, 1.04)}
      ${G(96, 24, .9, `<path class="f-gall" d="M10 0 C22 -2 28 10 24 22 C20 32 6 32 3 22 C0 14 2 2 10 0 Z"/>`)}
      <path class="s-bile" d="M100 50 C90 64 60 84 34 104" stroke-width="3"/>
      <path class="s-line" d="M140 98 C110 100 70 102 34 104" stroke-width="1.6"/>
      <g class="ans">
        <g class="a-shake"><circle class="f-food" cx="38" cy="103" r="6"/></g>
        <path class="s-warn a-flow" d="M44 103 C70 101 110 100 140 98" stroke-width="2.2"/>
        <g transform="rotate(-40 206 52)"><g class="a-bob">${bottle(206, 52, 0)}</g></g>
        ${[0, .5, 1].map(d => `<g class="a-drop" style="animation-delay:${d}s"><circle class="f-acid" cx="${224 + d * 6}" cy="78" r="2.4"/></g>`).join('')}
        ${T(150, 176, 'also: high triglycerides, drugs, trauma', { s: 9 })}
      </g>
      ${panc(178, 100, .9, 'f-scar')}
      ${[[196, 106], [214, 104], [232, 100], [250, 96]].map(([x, y]) => `<circle class="f-white" cx="${x}" cy="${y}" r="1.8"/>`).join('')}
      ${qtag(80, 158, '#1 Gallstones')}${qtag(226, 158, '#1 Alcohol')}`),

    /* 48. Acute pancreatitis pain */
    pancPain: ART(`
      <circle class="f-skin" cx="64" cy="22" r="13"/>
      <path class="f-skin" d="M46 38 Q64 32 84 38 Q96 60 92 88 Q90 108 84 118 L50 118 Q44 90 46 38 Z"/>
      <path class="s-line" d="M56 118 L54 170 M78 118 L82 170" stroke-width="9"/><path d="M56 118 L54 170 M78 118 L82 170" stroke="var(--c-skin)" stroke-width="6" stroke-linecap="round"/>
      ${T(98, 108, 'front', { s: 9, a: 'start' })}${T(30, 108, 'back', { s: 9 })}
      <g class="ans">
        <path class="f-bad a-pulse" d="M84 66 l4 -8 l2 8 l8 -2 l-6 6 l6 6 l-8 -1 l-2 8 l-4 -7 l-7 4 l3 -7 l-6 -4 Z"/>
        <path class="s-bad a-flow" d="M80 72 L28 72" stroke-width="3"/><path class="f-bad" d="M32 66 L22 72 L32 78 Z"/>
        <g class="a-pop" style="--d:1"><ellipse class="f-white" cx="150" cy="40" rx="20" ry="6"/><path class="f-food" d="M136 36 q14 -14 28 0 Z"/><path class="s-bad" d="M122 42 V26 M117 32 L122 26 L127 32" stroke-width="2.2"/></g>
        <g class="a-shake"><circle class="f-good" cx="150" cy="100" r="12"/><path class="s-line" d="M144 104 q3 -3 6 0 t6 0" stroke-width="1.5"/><circle cx="146" cy="96" r="1.5" fill="#222"/><circle cx="154" cy="96" r="1.5" fill="#222"/></g>
      </g>
      <circle class="f-skin" cx="256" cy="74" r="12"/>
      <path class="s-line" d="M208 136 L240 86" stroke-width="22"/><path d="M208 136 L240 86" stroke="var(--c-skin)" stroke-width="19" stroke-linecap="round"/>
      <path class="s-line" d="M208 140 L250 120 L254 162" stroke-width="12"/><path d="M208 140 L250 120 L254 162" stroke="var(--c-skin)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path class="s-line" d="M238 92 L254 112 L250 120" stroke-width="7"/><path d="M238 92 L254 112 L250 120" stroke="var(--c-skin)" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path class="s-ink" d="M196 164 H276" stroke-width="2"/>
      <g class="ans"><g class="a-bob">${check(276, 92, 0)}</g></g>
      ${qtag(68, 152, 'Epigastric → back', 9.5)}${qtag(156, 66, 'Worse after eating', 9.5)}
      ${qtag(150, 128, 'Nausea, vomit, fever', 9.5)}${qtag(240, 30, 'Eases leaning forward', 9.5)}`),

    /* 49. Cullen vs Grey Turner */
    cullen: ART(`
      <path class="f-skin" d="M88 4 Q150 -2 212 4 Q232 8 236 26 L228 70 Q220 104 224 128 Q232 156 236 180 L64 180 Q68 156 76 128 Q80 104 72 70 L64 26 Q68 8 88 4 Z"/>
      <path class="s-line" d="M100 34 Q150 46 200 34" stroke-width="1.2" opacity=".35"/>
      <path class="f-pancreas" d="M112 80 C112 74 120 70 130 72 C150 74 170 70 186 66 C192 66 192 74 186 76 C170 82 150 86 130 88 C120 88 112 86 112 80 Z" opacity=".55" style="stroke-dasharray:3 3"/>
      ${T(150, 64, 'pancreas (behind)', { s: 9, c: 'tagtx' })}
      <circle class="f-skin" cx="150" cy="118" r="3.5"/>
      <g class="ans">
        <path class="s-blood a-flow" d="M120 86 C100 96 90 104 86 114 M182 80 C202 92 210 104 214 114 M150 88 L150 108" stroke-width="2.4"/>
        <g class="a-pulse"><circle cx="150" cy="118" r="16" fill="var(--c-germ)" opacity=".55"/><circle cx="150" cy="118" r="9" fill="#4d7a5a" opacity=".5"/></g>
        <g class="a-pulse" style="animation-delay:.5s"><ellipse cx="86" cy="128" rx="10" ry="22" fill="var(--c-germ)" opacity=".55"/><ellipse cx="214" cy="128" rx="10" ry="22" fill="var(--c-germ)" opacity=".55"/>
          <ellipse cx="84" cy="132" rx="5" ry="12" fill="#4d7a5a" opacity=".5"/><ellipse cx="216" cy="132" rx="5" ry="12" fill="#4d7a5a" opacity=".5"/></g>
        ${tag(150, 18, 'Bleeding behind the belly', 'ans', 9.5)}
      </g>
      ${L('M150 150 L150 136 M58 116 L76 126 M242 116 L224 126')}
      ${qtag(150, 158, 'Cullen: navel')}${qtag(40, 106, 'Grey Turner', 9.5)}${qtag(262, 106, 'Grey Turner', 9.5)}
      ${T(40, 124, 'flank', { s: 9.5, c: 'ink ans' })}${T(262, 124, 'flank', { s: 9.5, c: 'ink ans' })}`),

    /* 50. Lipase vs amylase over time */
    lipase: ART(`
      <path class="s-ink" d="M36 18 V150 H290" stroke-width="1.5"/>
      ${T(50, 13, '× normal', { s: 9 }).replace('<text', '<text transform="translate(18 84) rotate(-90) translate(-50 -10)"')}
      ${T(40, 162, '0', { s: 9 })}${T(127.5, 162, 'day 5', { s: 9 })}${T(276, 162, 'day 14', { s: 9 })}
      ${T(163, 176, 'time after pain starts', { s: 9 })}
      <path class="s-ink" d="M127.5 150 v4 M285 150 v4" stroke-width="1.5"/>
      <path class="s-warn" d="M36 75 H290" stroke-width="1.5" stroke-dasharray="5 4"/>${tag(262, 75, '3× normal', '', 9)}
      <path class="s-ink" d="M36 125 H290" stroke-width="1" stroke-dasharray="2 4" opacity=".6"/>${T(268, 138, 'normal', { s: 9 })}
      <g class="ans">
        <path class="s-bad a-draw" d="M40 125 C46 125 48 40 62 40 C120 40 200 66 285 125" stroke-width="3.5" style="animation-duration:3.5s"/>
        <path class="s-immune a-draw" d="M40 125 C50 125 54 52 68 54 C90 58 108 118 127.5 125" stroke-width="3.5" style="animation-duration:3.5s"/>
        ${T(180, 26, 'up by 8 h, stays ~14 d', { s: 9 })}${T(192, 112, 'up by 12 h, normal by 5 d', { s: 9 })}${L('M140 98 L104 98')}
        ${tag(258, 54, '★ more reliable', 'ans', 9)}
      </g>
      ${qtag(180, 40, 'Lipase')}${qtag(166, 98, 'Amylase')}`),

    /* 51. Complications of acute pancreatitis */
    pancCx: ART(`
      <path class="s-bad a-flow" d="M120 82 L62 36 M180 82 L238 36 M110 96 L64 96 M190 96 L236 96 M150 110 L150 124 M122 104 L66 142" stroke-width="2.4"/>
      <g class="a-pulse">${panc(96, 80, 1)}</g>
      <g class="ans">
        <g class="a-pop" style="--d:0"><path class="f-mouth" d="M38 14 C28 16 24 34 28 44 C32 50 40 48 40 40 Z"/><path class="f-mouth" d="M48 14 C58 16 62 34 58 44 C54 50 46 48 46 40 Z"/><path class="s-line" d="M43 4 V22 M43 22 L40 30 M43 22 L46 30" stroke-width="2"/></g>
        <g class="a-pop" style="--d:1">${kidney(244, 10, .85, true)}${kidney(252, 10, .85)}</g>
        <g class="a-pop" style="--d:2">${drop(28, 92, 1.1)}${drop(44, 98, .9)}<circle class="f-tumor" cx="36" cy="80" r="3"/></g>
        <g class="a-pop" style="--d:3">${germ(256, 90, 20)}${germ(276, 100, -30)}</g>
        <g class="a-pop" style="--d:4"><circle class="f-water a-pulse" cx="150" cy="134" r="12" opacity=".85"/></g>
        <g class="a-pop" style="--d:5"><circle class="f-bone" cx="40" cy="146" r="10"/>${T(40, 149.5, 'Ca', { s: 9, c: 'tagtx' })}<path class="s-bad" d="M56 140 V154 M52 150 L56 155 L60 150" stroke-width="2"/></g>
        ${tag(256, 152, 'Death ~15%', 'ans', 9.5)}
      </g>
      ${qtag(44, 60, 'ARDS (lungs)', 9.5)}${qtag(256, 60, 'Kidney failure', 9.5)}
      ${qtag(42, 116, 'DIC', 9.5)}${qtag(264, 120, 'Sepsis', 9.5)}
      ${qtag(150, 164, 'Pseudocyst / abscess', 9.5)}${qtag(44, 170, 'Low calcium', 9.5)}`),

    /* 52. Chronic pancreatitis */
    chronicPanc: ART(`
      ${panc(64, 18, 1.6, 'f-pancreas')}
      <g class="ans">
        <g class="a-blink">${panc(64, 18, 1.6, 'f-scar')}</g>
        <path class="s-white" d="M234 30 C200 38 160 46 120 52 C104 54 92 56 74 60" stroke-width="2.5"/>
        ${[[96, 56], [140, 49], [180, 42], [214, 35]].map(([x, y]) => `<ellipse class="f-white" cx="${x}" cy="${y}" rx="4.5" ry="3"/>`).join('')}
        ${[[110, 44], [160, 54], [200, 32], [84, 66], [130, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#fff"/>`).join('')}
      </g>
      <path class="s-warn a-flow" d="M90 74 L44 100 M130 74 L116 100 M170 68 L188 100 M210 60 L258 100" stroke-width="2.2"/>
      <g class="ans">
        <g class="a-pop" style="--d:0"><path class="f-stool" d="M28 120 q14 -16 28 0 q2 8 -14 8 q-16 0 -14 -8 Z"/><g class="a-bob"><circle class="f-fat" cx="34" cy="110" r="3.5"/><circle class="f-fat" cx="48" cy="108" r="3"/></g></g>
        <g class="a-pop" style="--d:1"><rect class="f-white" x="100" y="106" width="32" height="20" rx="4"/><path class="s-bad" d="M116 110 V120 M111 116 L116 121 L121 116" stroke-width="2"/></g>
        <g class="a-pop" style="--d:2">${drop(188, 118, 1.3)}<path class="s-bad" d="M204 124 V110 M199 115 L204 109 L209 115" stroke-width="2"/></g>
        <g class="a-pop" style="--d:3"><path class="f-warn" d="M262 104 L276 128 L248 128 Z"/>${T(262, 125, '!', { s: 12, c: 'tagtx' })}</g>
        ${T(42, 170, 'no lipase', { s: 9 })}${T(188, 170, 'insulin cells lost', { s: 9 })}
      </g>
      ${qtag(42, 150, 'Steatorrhea')}${qtag(116, 150, 'Weight loss')}${qtag(188, 150, 'Diabetes')}${qtag(262, 150, 'Cancer risk')}`),

    /* 53. Pancreatitis treatment */
    pancTx: ART(`
      ${tag(30, 12, 'First', '', 10)}${tag(250, 12, 'Then', '', 10)}
      <path class="s-ink" d="M199 22 V140" stroke-width="1" stroke-dasharray="3 4" opacity=".6"/>
      ${panc(48, 78, 1.0)}
      <path class="s-line" d="M58 84 q4 3 8 0 M76 82 q4 3 8 0" stroke-width="1.5"/>
      <g class="ans">
        ${['z', 'z', 'Z'].map((z, i) => `<text class="ink a-rise" x="${150 + i * 9}" y="${80 - i * 8}" style="font-size:${9 + i * 2}px;font-weight:700;animation-delay:${i * .5}s">${z}</text>`).join('')}
        <g class="a-pop" style="--d:0"><circle class="f-white" cx="26" cy="38" r="11"/><path class="s-line" d="M22 32 V44 M30 32 V44" stroke-width="1.5"/>${nope(26, 38, 14)}</g>
        <g class="a-pop" style="--d:1">${ivbag(100, 36)}</g>
        <g class="a-drop" style="animation-duration:1.2s"><circle class="f-water" cx="100" cy="60" r="2"/></g>
        <g class="a-pop" style="--d:2">${syringe(168, 36)}</g>
        <g class="a-pop" style="--d:3"><path class="s-line" d="M30 126 C30 110 40 110 40 120 L40 150" stroke-width="2"/><path class="s-water a-flow" d="M40 150 V122 C40 112 30 112 30 126" stroke-width="2"/><path class="f-stomach" d="M32 148 C44 144 60 150 58 162 C56 172 38 172 32 164 Z"/></g>
        <g class="a-pop" style="--d:4"><rect class="f-pancreas" x="226" y="34" width="22" height="10" rx="5"/><rect class="f-white" x="237" y="34" width="11" height="10" rx="5"/><circle class="f-good" cx="268" cy="40" r="9"/>${T(268, 43, 'low', { s: 9, c: 'tagtx' })}</g>
        <g class="a-pop" style="--d:5">${bottle(234, 120)}<rect class="f-white" x="254" y="118" width="22" height="5" rx="1"/><rect class="f-warn" x="272" y="118" width="4" height="5"/>${nope(234, 120, 16)}${nope(265, 120, 14)}</g>
      </g>
      ${qtag(26, 62, 'NPO', 9.5)}${qtag(100, 18 + 2, 'IV fluids', 9.5)}${qtag(160, 58, 'IV pain meds', 9.5)}
      ${qtag(122, 150, 'NG suction for vomiting', 9.5)}
      ${qtag(250, 64, 'Low-fat + enzymes', 9.5)}${qtag(246, 154, 'No alcohol, smoking', 9)}`),
  });
})();
