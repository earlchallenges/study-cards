/* Chapter 9 Part 2 art (b): colorful replacements for PICS, loaded after the page sets PICS.
   Cards 26-49 of ch9-2-upper (hiatal hernia care through peptic ulcer workup). */
(() => {
  // ---------- shared drawing pieces (front view: the stomach sits on the viewer's right) ----------
  const STOM = 'M133 46 C131 64 142 92 134 104 C126 113 110 111 98 110 L98 133 C122 143 150 152 178 148 C212 142 228 112 223 80 C219 46 196 22 168 22 C152 22 144 34 147 46 Z';
  const RUGAE = 'M162 50 C172 70 164 92 176 112 M186 44 C198 70 190 96 204 122 M150 124 C162 132 178 136 196 132';
  const DUO_L = 'M100 121 C82 121 72 126 72 142 L72 178';
  const DUO_C = 'M100 121 C82 121 72 126 72 142 L72 160 C72 176 84 182 104 182 L196 182';
  // a tube with a dark outline (esophagus, duodenum, bowel)
  const pipe = (d, w, c, cap = 'round', cls = '') => `<g class="${cls}"><path d="${d}" fill="none" stroke="var(--art-line)" stroke-width="${w + 3}" stroke-linecap="${cap}" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round"/></g>`;
  // esophagus + stomach + duodenum in base coordinates (x 72-224, y top-178)
  const gut = ({ top = -4, duo = DUO_L, les = true, w = 14, extra = '', over = '' } = {}) =>
    (duo ? pipe(duo, 16, 'var(--c-small)', 'butt') : '') +
    `<path class="f-stomach" d="${STOM}"/>` + extra +
    `<path d="${RUGAE}" fill="none" stroke="var(--art-line)" stroke-width="1.5" opacity=".3" stroke-linecap="round"/>` +
    pipe(`M140 ${top} L140 52`, w, 'var(--c-esoph)', 'butt') + over +
    (duo ? `<rect class="f-muscle" x="95" y="108" width="7" height="27" rx="3"/>` : '') +
    (les ? `<rect class="f-muscle" x="${140 - w / 2 - 4}" y="38" width="5" height="12" rx="2"/><rect class="f-muscle" x="${140 + w / 2 - 1}" y="38" width="5" height="12" rx="2"/>` : '');
  const at = (x, y, s, inner, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">${inner}</g></g>`;
  // H. pylori: curved rod with a tuft of flagella at one end
  const germ = (x, y, r = 0, s = 1, cls = '') => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><g class="${cls}">` +
    `<path d="M-11 0 C-15 -4 -18 2 -23 -2 M-11 0 C-16 3 -19 -1 -24 4 M-11 0 C-15 -1 -17 -6 -21 -8" fill="none" stroke="var(--c-germ)" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M-11 0 C-7 -7 -4 7 0 0 C4 -7 7 7 11 0" fill="none" stroke="var(--art-line)" stroke-width="7.5" stroke-linecap="round"/>` +
    `<path d="M-11 0 C-7 -7 -4 7 0 0 C4 -7 7 7 11 0" fill="none" stroke="var(--c-germ)" stroke-width="5" stroke-linecap="round"/></g></g>`;
  // capsule pill
  const cap = (x, y, r = 0, c1 = 'var(--c-bad)', c2 = '#ffffff', s = 1, cls = '') => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><g class="${cls}">` +
    `<path d="M0 -6 L-9 -6 A6 6 0 0 0 -9 6 L0 6 Z" fill="${c1}" stroke="var(--art-line)" stroke-width="1.4"/>` +
    `<path d="M0 -6 L9 -6 A6 6 0 0 1 9 6 L0 6 Z" fill="${c2}" stroke="var(--art-line)" stroke-width="1.4"/></g></g>`;
  // round tablet
  const tab = (x, y, c = '#ffffff', r = 7, cls = '') => `<g class="${cls}"><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="var(--art-line)" stroke-width="1.4"/><path d="M${x - r * .6} ${y} H${x + r * .6}" stroke="var(--art-line)" stroke-width="1.2"/></g>`;
  // Y-shaped antibody
  const ab = (x, y, r = 0, s = 1) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 7 L0 0 L-5 -6 M0 0 L5 -6" fill="none" stroke="var(--c-immune)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  // teardrop
  const drop = (x, y, cls = 'f-acid', s = 1, extra = '') => `<path class="${cls}" ${extra} d="M${x} ${y - 6 * s} C${x + 2 * s} ${y - 2 * s} ${x + 4.5 * s} ${y} ${x + 4.5 * s} ${y + 2.5 * s} A${4.5 * s} ${4.5 * s} 0 0 1 ${x - 4.5 * s} ${y + 2.5 * s} C${x - 4.5 * s} ${y} ${x - 2 * s} ${y - 2 * s} ${x} ${y - 6 * s} Z"/>`;
  // ulcer crater (dark red with a raw rim and a pale fibrin base)
  const ulcer = (x, y, rx = 6, ry = 4, cls = '') => `<g class="${cls}"><ellipse cx="${x}" cy="${y}" rx="${rx + 2.5}" ry="${ry + 2.5}" fill="var(--c-bad)" stroke="none" opacity=".6"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="var(--c-tumor)" stroke="var(--art-line)" stroke-width="1.2"/><ellipse cx="${x}" cy="${y + ry * .25}" rx="${rx * .5}" ry="${ry * .45}" fill="#f4e7c8" stroke="none"/></g>`;
  // little stick person standing at (x, y = feet)
  const stand = (x, y, c = 'var(--pic-ink)', cls = '') => `<g class="${cls}"><circle cx="${x}" cy="${y - 34}" r="6" fill="var(--c-skin)" stroke="var(--art-line)" stroke-width="1.4"/>` +
    `<path d="M${x} ${y - 28} V${y - 12} M${x} ${y - 12} L${x - 6} ${y} M${x} ${y - 12} L${x + 6} ${y} M${x - 8} ${y - 22} L${x} ${y - 25} L${x + 8} ${y - 22}" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  // check and cross marks
  const ok = (x, y, cls = '', st = '') => `<g class="${cls}" style="${st}"><circle class="f-good" cx="${x}" cy="${y}" r="8"/><path d="M${x - 4} ${y} L${x - 1} ${y + 3.5} L${x + 4.5} ${y - 3.5}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const no = (x, y, cls = '', st = '') => `<g class="${cls}" style="${st}"><circle class="f-bad" cx="${x}" cy="${y}" r="8"/><path d="M${x - 3.5} ${y - 3.5} L${x + 3.5} ${y + 3.5} M${x + 3.5} ${y - 3.5} L${x - 3.5} ${y + 3.5}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>`;
  // red "not allowed" ring
  const ban = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" stroke="var(--c-bad)" stroke-width="3"/>`;
  const ink = (x, y, t, size = 10, anchor = 'middle', cls = 'ink', extra = '') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" style="font-size:${size}px;font-weight:700${extra}">${t}</text>`;
  const lead = (d, cls = '') => `<path class="${cls}" d="${d}" fill="none" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="2 2.5"/>`;
  // label pills sized for the bold font (a little wider than the shared tag helper)
  const T = (x, y, t, cls = '', size = 10, st = '') => {
    const w = String(t).length * size * 0.6 + 10, h = size + 7;
    return `<g class="${cls}" style="${st}"><rect class="tagbg" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}"/>` +
      `<text class="tagtx" x="${x}" y="${y + size * 0.36}" text-anchor="middle" style="font-size:${size}px">${esc(t)}</text></g>`;
  };
  const QT = (x, y, t, size = 10) => q(x, y) + T(x, y, t, 'ans', size);
  // flame
  const flame = (x, y, s = 1, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}"><path class="f-warn" d="M0 10 C-9 10 -10 2 -6 -4 C-5 0 -3 1 -2 0 C-4 -6 0 -12 3 -14 C2 -8 9 -4 8 3 C8 8 4 10 0 10 Z"/><path class="f-acid noline" d="M0 9 C-4 9 -5 4 -2 0 C-1 3 2 3 2 1 C4 4 4 9 0 9 Z"/></g></g>`;
  // simple front-view upper body: head, neck, torso (center x, head center y)
  const body = (x, y) => `<path class="f-skin" d="M${x - 50} 182 L${x - 46} ${y + 50} Q${x - 42} ${y + 32} ${x} ${y + 30} Q${x + 42} ${y + 32} ${x + 46} ${y + 50} L${x + 50} 182 Z"/>` +
    `<rect class="f-skin" x="${x - 8}" y="${y + 14}" width="16" height="20"/><circle class="f-skin" cx="${x}" cy="${y}" r="18"/>` +
    `<circle cx="${x - 6}" cy="${y - 3}" r="1.8" fill="var(--art-line)"/><circle cx="${x + 6}" cy="${y - 3}" r="1.8" fill="var(--art-line)"/>`;
  // stomach lining strip: lumen color above, mucus, cells; returns svg for x0..x0+w starting at y
  const cells = (x0, y, w, h, n, cls = 'f-stomach') => Array.from({ length: n }, (_, i) => {
    const cw = w / n;
    return `<rect class="${cls}" x="${x0 + i * cw + .5}" y="${y}" width="${cw - 1}" height="${h}" rx="4"/><ellipse cx="${x0 + i * cw + cw / 2}" cy="${y + h * .7}" rx="${Math.min(4, cw / 4)}" ry="${Math.min(6, h / 5)}" fill="var(--c-tumor)" opacity=".65"/>`;
  }).join('');

  Object.assign(PICS, {
    /* 26. What makes hiatal hernia symptoms worse (and what helps) */
    hiatalSx: ART(`
      <g transform="translate(69 14) scale(.55)">${gut({ top: -30, w: 16 })}</g>
      ${pipe('M92 74 Q118 46 151 51', 6, 'var(--c-muscle)')}${pipe('M185 51 Q216 46 238 74', 6, 'var(--c-muscle)')}
      ${ink(205, 38, 'diaphragm', 9)}
      <g class="ans">${[0, 1, 2].map(i => `<g class="a-rise" style="animation-delay:${i * .6}s">${drop(146, 30, 'f-acid', .7)}</g>`).join('')}</g>
      <g class="ans">
        <g class="a-pop" style="--d:0"><rect x="22" y="52" width="66" height="7" rx="2" class="f-bone"/><path d="M26 59 v9 M84 59 v9" stroke="var(--pic-ink)" stroke-width="3" stroke-linecap="round"/>
          <ellipse cx="33" cy="49" rx="9" ry="4" class="f-white"/><circle cx="34" cy="42" r="6" class="f-skin"/><rect x="41" y="42" width="45" height="10" rx="5" class="f-vein"/></g>
        <g class="a-pop" style="--d:1"><ellipse cx="55" cy="131" rx="26" ry="6" class="f-white"/><path class="f-food" d="M35 129 Q38 105 55 103 Q72 105 75 129 Z"/><circle cx="48" cy="114" r="3" class="f-good"/><circle cx="61" cy="111" r="3" class="f-bad"/><circle cx="57" cy="121" r="3" class="f-good"/></g>
        <g class="a-pop" style="--d:2"><path d="M232 72 L240 50 L247 72 M240 50 L262 44 M257 45 L260 64" fill="none" stroke="var(--pic-ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="268" cy="49" r="6" class="f-skin"/></g>
        <g class="a-pop" style="--d:3"><circle cx="236" cy="120" r="12" class="f-skin"/><circle cx="241" cy="116" r="1.6" fill="var(--art-line)"/><ellipse cx="247" cy="124" rx="2.5" ry="3" fill="var(--art-line)"/>
          ${[0, 1, 2].map(i => `<circle class="f-white a-blink" style="animation-delay:${i * .25}s" cx="${257 + i * 9}" cy="${122 - i * 4}" r="${3 + i}"/>`).join('')}</g>
        ${stand(150, 156, 'var(--c-good)', 'a-bob')}
        <path class="s-good" d="M170 150 V124 M163 131 L170 124 L177 131" stroke-width="3"/>
      </g>
      ${q(55, 50)}${q(55, 118)}${q(245, 56)}${q(245, 120)}${q(150, 136)}
      ${T(55, 80, 'Lying down', 'ans')}${T(55, 150, 'Big meals', 'ans')}${T(245, 86, 'Bending over', 'ans')}${T(245, 150, 'Coughing', 'ans')}${T(150, 170, 'Standing helps', 'ans')}`),

    /* 27. Hiatal hernia treatment */
    hiatalTx: ART(`
      <g class="ans">${[0, 1, 2, 3, 4, 5].map(i => `<g class="a-pop" style="--d:${i}"><ellipse cx="${20 + i * 21}" cy="30" rx="9" ry="3.5" class="f-white"/><path class="f-food" d="M${14 + i * 21} 29 Q${20 + i * 21} 21 ${26 + i * 21} 29 Z"/></g>`).join('')}</g>
      ${QT(73, 50, '6 small meals a day')}
      <path class="f-bone" d="M14 104 L138 126 L138 134 L14 112 Z"/>
      <ellipse cx="30" cy="100" rx="11" ry="4.5" class="f-white" transform="rotate(10 30 100)"/>
      <circle cx="32" cy="94" r="7" class="f-skin"/><path class="f-vein" d="M40 98 L132 115 L131 124 L38 107 Z"/>
      <path d="M18 112 V160 M134 133 V160" stroke="var(--pic-ink)" stroke-width="3" stroke-linecap="round"/>
      <g class="ans"><rect x="9" y="150" width="18" height="12" rx="2" class="f-warn a-pulse"/><path d="M48 146 V116 M43 121 L48 115 L53 121" class="s-good" stroke-width="2.5"/>
        <g class="a-rise">${ink(56, 86, 'z', 11)}</g><g class="a-rise" style="animation-delay:.6s">${ink(64, 80, 'z', 9)}</g></g>
      ${QT(78, 168, 'Bed head up 6 inches')}${QT(96, 142, 'Sit up after meals', 9.5)}
      <g class="ans">
        <g class="a-pop" style="--d:1"><path d="M193 14 H207 L201 24 V31 M196 31 H206" fill="none" stroke="var(--pic-ink)" stroke-width="2"/><path d="M195 16 H205 L200 22 Z" fill="var(--c-blood)"/>${ban(200, 22, 11)}</g>
        <g class="a-pop" style="--d:2"><rect x="189" y="53" width="20" height="6" rx="2" class="f-white"/><rect x="206" y="53" width="5" height="6" fill="var(--c-warn)" stroke="var(--art-line)" stroke-width="1"/><path class="a-rise" d="M212 52 q3 -4 0 -8" stroke="var(--pic-ink)" fill="none" stroke-width="1.4"/>${ban(200, 56, 11)}</g>
        <g class="a-pop" style="--d:3"><rect x="189" y="81" width="22" height="16" rx="4" class="f-immune"/><path d="M194 91 A6 6 0 0 1 206 91" fill="none" stroke="#fff" stroke-width="2"/><path d="M200 91 L203 86" stroke="#fff" stroke-width="1.6" class="a-sway"/></g>
        <g class="a-pop" style="--d:4">${cap(200, 122, -25, 'var(--c-vein)', '#ffffff')}</g>
        <g class="a-pop" style="--d:5"><path d="M200 140 V166" stroke="var(--art-line)" stroke-width="10"/><path d="M200 140 V166" stroke="var(--c-esoph)" stroke-width="7"/><path class="f-stomach" d="M188 160 Q200 154 212 160 Q218 172 200 176 Q182 172 188 160 Z"/><rect x="190" y="153" width="20" height="7" rx="3.5" class="f-stomach a-squeeze"/></g>
      </g>
      ${QT(252, 22, 'No alcohol')}${QT(252, 56, 'No smoking')}${QT(252, 89, 'Weight loss')}${QT(252, 122, 'Acid reducers')}${QT(252, 158, 'Fundoplication', 9.5)}`),

    /* 28. GERD: acid + pepsin climbing through a weak LES */
    gerd: ART(`
      <clipPath id="b2gerdc"><path d="${STOM}"/></clipPath>
      <g transform="translate(20 40) scale(.8)">${gut({ top: -55, w: 18, extra: `<g clip-path="url(#b2gerdc)"><path class="f-acid noline" d="M60 112 Q90 104 120 112 T180 112 T240 112 V170 H60 Z"/></g>` })}</g>
      <g class="ans"><rect x="128" y="2" width="8" height="64" rx="4" fill="var(--c-bad)" opacity=".45" class="a-blink"/>${flame(108, 32, .9, 'a-sway')}</g>
      <g class="ansmotion">${[0, .6, 1.2, 1.8].map(b => `<g>${drop(0, 0, 'f-acid', .9)}<animateMotion dur="2.4s" begin="${b}s" repeatCount="indefinite" path="M150 120 C150 100 134 90 132 74 L132 6"/></g>`).join('')}
        ${[.3, 1.5].map(b => `<circle r="3" fill="var(--c-warn)" stroke="var(--art-line)" stroke-width="1"><animateMotion dur="2.4s" begin="${b}s" repeatCount="indefinite" path="M160 125 C152 100 134 88 132 72 L132 10"/></circle>`).join('')}</g>
      ${lead('M141 73 H214')}${lead('M138 40 H214')}${lead('M126 30 H90')}${lead('M178 136 H214')}
      ${QT(252, 73, 'Weak LES')}${QT(252, 40, 'Acid + pepsin up')}${QT(52, 30, 'Irritated lining')}${T(252, 136, 'Stomach acid')}
      ${ink(52, 56, 'esophagus', 9.5)}${ink(232, 100, 'stomach', 9.5)}`),

    /* 29. Foods and drugs that weaken the LES */
    gerdCause: ART(`
      <g transform="translate(83 52) scale(.45)">${gut({ top: -120, w: 20 })}</g>
      <g class="ansmotion">${[0, .8].map(b => `<g>${drop(0, 0, 'f-acid', .7)}<animateMotion dur="1.6s" begin="${b}s" repeatCount="indefinite" path="M150 90 L146 64 L146 14"/></g>`).join('')}</g>
      <g class="ans a-pulse"><path d="M136 72 h-8 M164 72 h8" class="s-bad" stroke-width="2.5"/></g>
      ${T(150, 142, 'LES', '', 10)}${lead('M150 134 V78')}
      <g class="ans">
        <g class="a-pop" style="--d:0"><g transform="rotate(-12 30 16)"><rect x="18" y="7" width="24" height="17" rx="2" fill="#6b3b22" stroke="var(--art-line)" stroke-width="1.4"/><path d="M26 7 V24 M34 7 V24 M18 15.5 H42" stroke="#9a5a36" stroke-width="1.4"/></g></g>
        <g class="a-pop" style="--d:1"><path class="f-white" d="M80 8 H96 L94 25 H82 Z"/><path d="M96 12 q6 1 0 8" fill="none" stroke="var(--pic-ink)" stroke-width="2"/><rect x="82" y="10" width="12" height="4" fill="#6b3b22"/><path class="a-rise" d="M85 5 q3 -3 0 -6 M91 5 q3 -3 0 -6" stroke="var(--pic-ink)" fill="none" stroke-width="1.3"/></g>
        <g class="a-pop" style="--d:2"><path class="f-good" d="M30 70 C18 64 18 52 30 44 C42 52 42 64 30 70 Z"/><path d="M30 70 V48 M30 58 L24 53 M30 62 L36 56" stroke="#0a6b52" stroke-width="1.2" fill="none"/></g>
        <g class="a-pop" style="--d:3"><path class="f-fat" d="M76 68 L100 68 L88 44 Z"/><path d="M76 68 L100 68" stroke="#c9852c" stroke-width="4"/><circle cx="88" cy="57" r="3" class="f-bad"/><circle cx="84" cy="64" r="2.5" class="f-bad"/><circle cx="93" cy="63" r="2.5" class="f-bad"/></g>
        <g class="a-pop" style="--d:4"><path class="f-bad" d="M20 96 C28 104 40 104 44 90 C44 86 41 85 39 88 C35 96 28 96 20 96 Z"/><path d="M41 87 q2 -6 6 -6" stroke="#2a9d4b" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>
        <g class="a-pop" style="--d:5"><circle cx="88" cy="96" r="11" class="f-warn"/><path d="M88 85 V107 M77 96 H99 M80 88 L96 104 M96 88 L80 104" stroke="#ffd29a" stroke-width="1.2"/></g>
        <g class="a-pop" style="--d:6"><circle cx="30" cy="138" r="11" class="f-bad"/><path d="M24 128 L30 131 L36 128 L33 133 L30 129 L27 133 Z" fill="#2a9d4b" stroke="var(--art-line)" stroke-width="1"/></g>
        <g class="a-pop" style="--d:7"><rect x="80" y="125" width="16" height="25" rx="3" class="f-vein"/><path d="M80 131 H96 M80 144 H96" stroke="#fff" stroke-width="1.4"/><circle class="a-rise" cx="88" cy="122" r="1.8" fill="var(--c-water)"/></g>
        <g class="a-pop" style="--d:8"><path d="M204 8 Q204 24 212 24 Q220 24 220 8 Z" fill="var(--c-blood)" stroke="var(--art-line)" stroke-width="1.4"/><path d="M212 24 V36 M205 36 H219" stroke="var(--pic-ink)" stroke-width="2"/></g>
        <g class="a-pop" style="--d:9"><rect x="254" y="15" width="24" height="7" rx="2" class="f-white"/><rect x="274" y="15" width="6" height="7" fill="var(--c-warn)" stroke="var(--art-line)" stroke-width="1"/><path class="a-rise" d="M281 13 q4 -4 0 -9" stroke="var(--pic-ink)" fill="none" stroke-width="1.4"/></g>
        <g class="a-pop" style="--d:10">${tab(206, 60, '#ffffff', 7)}${tab(218, 54, '#ffffff', 5)}</g>
        <g class="a-pop" style="--d:11">${cap(270, 58, -30, 'var(--c-gall)', '#ffffff')}</g>
        <g class="a-pop" style="--d:13"><circle cx="270" cy="102" r="12" class="f-blood a-beat"/><path d="M260 102 h5 l3 -6 l4 12 l3 -6 h5" stroke="#fff" stroke-width="1.6" fill="none"/></g>
      </g>
      ${[[30, 16], [88, 16], [30, 57], [88, 57], [30, 96], [88, 96], [30, 138], [88, 138], [212, 18], [270, 18], [212, 57], [270, 57], [270, 102]].map(([x, y]) => q(x, y)).join('')}
      <g class="ans">${[['Chocolate', 30, 38], ['Caffeine', 88, 38], ['Peppermint', 30, 80], ['Fatty food', 88, 80], ['Spicy food', 30, 118], ['Citrus', 88, 118], ['Tomatoes', 30, 162], ['Soda', 88, 162],
        ['Alcohol', 212, 46], ['Smoking', 270, 38], ['Nitrates', 212, 80], ['Ca channel', 270, 78], ['blockers', 270, 89], ['Calcium ch.', 212, 124], ['Beta', 270, 124], ['blockers', 270, 135]]
        .filter(([t]) => t !== 'Calcium ch.').map(([t, x, y]) => ink(x, y, t, 9.5)).join('')}</g>
      ${T(240, 160, 'All relax the LES', 'ans', 10)}`),

    /* 30. What decides how much reflux hurts the esophagus: contact time + acidity */
    gerdInjury: ART(`
      <rect class="f-esoph" x="-2" y="104" width="304" height="34"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 26} 112 h20 M${i * 26 + 10} 121 h20 M${i * 26} 130 h20" stroke="#e07a5f" stroke-width="1.3"/>`).join('')}
      <rect class="f-muscle" x="-2" y="138" width="304" height="44"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 22 + 4} 146 q6 14 0 30" stroke="#a52d43" stroke-width="1.5" fill="none"/>`).join('')}
      ${ink(296, 174, 'esophagus wall', 9.5, 'end', '', ';fill:#ffffff')}
      <path class="f-acid" d="M70 104 Q74 90 110 92 Q150 86 190 92 Q228 90 232 104 Z"/>
      <g class="ans">${ulcer(104, 108, 8, 3.5, 'a-grow')}${ulcer(150, 110, 10, 4, 'a-grow')}${ulcer(196, 108, 7, 3, 'a-grow')}
        ${[0, 1, 2, 3].map(i => `<g class="a-drop" style="animation-delay:${i * .4}s">${drop(96 + i * 36, 70, 'f-acid', .8)}</g>`).join('')}</g>
      <circle class="f-white" cx="42" cy="42" r="22"/><rect x="38" y="14" width="8" height="6" rx="1" class="f-warn"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path transform="rotate(${i * 45} 42 42)" d="M42 23 v3" stroke="var(--art-line)" stroke-width="1.5"/>`).join('')}
      <path class="ans a-spin" d="M42 42 L42 26" stroke="var(--c-bad)" stroke-width="2.5" stroke-linecap="round" style="transform-box:view-box;transform-origin:42px 42px"/><circle cx="42" cy="42" r="2.5" fill="var(--art-line)"/>
      <rect x="236" y="20" width="44" height="40" rx="6" class="f-white"/><text x="258" y="46" text-anchor="middle" style="font-size:16px;font-weight:800;fill:var(--c-bad)">pH 2</text>
      <path d="M258 60 V78" stroke="var(--pic-ink)" stroke-width="2.5"/><circle cx="258" cy="82" r="4" class="f-acid"/>
      ${QT(42, 78, 'Contact time')}${QT(258, 12, 'Acidity')}
      ${T(150, 20, 'Damage = time x acidity', 'ans', 10.5)}${T(150, 46, 'NOT mainly extra acid made', 'ans', 9.5)}`),

    /* 31. GERD symptoms */
    gerdSx: ART(`
      ${body(150, 30)}
      <path d="M144 38 Q150 42 156 38" stroke="var(--art-line)" stroke-width="1.6" fill="none"/>
      ${pipe('M150 50 L150 128', 8, 'var(--c-esoph)', 'round')}
      <path class="f-stomach" d="M146 128 C160 122 186 126 186 146 C186 164 160 166 150 156 C146 150 146 140 146 128 Z"/>
      <g class="ans">
        ${flame(150, 98, 1.1, 'a-sway')}
        <circle cx="150" cy="62" r="5" class="f-bad a-pulse"/>
        <path class="a-blink" d="M162 58 q4 -3 0 -6 M166 61 q6 -5 0 -11" stroke="var(--c-water)" stroke-width="2" fill="none" stroke-linecap="round"/>
        ${[0, 1, 2].map(i => `<circle class="f-white a-blink" style="animation-delay:${i * .25}s" cx="${170 + i * 10}" cy="${40 - i * 4}" r="${3 + i}"/>`).join('')}
        <path class="f-blood a-beat" d="M174 104 C168 96 160 104 166 110 L174 117 L182 110 C188 104 180 96 174 104 Z"/>
        <g class="a-rise">${drop(146, 42, 'f-acid', .6)}</g><g class="a-rise" style="animation-delay:.9s">${drop(154, 44, 'f-water', .55)}</g>
      </g>
      ${lead('M95 28 H140')}${lead('M95 62 H144')}${lead('M95 100 H138')}${lead('M205 28 H184')}${lead('M205 62 H170')}${lead('M205 108 H184')}
      ${QT(52, 28, 'Sour regurgitation', 9.5)}${QT(52, 62, 'Lump in throat', 9.5)}${QT(52, 100, 'Heartburn', 10)}
      ${QT(250, 28, 'Dry cough', 10)}${QT(250, 62, 'Hoarse + water brash', 9)}${QT(250, 108, 'Mimics angina', 9.5)}
      ${T(52, 140, 'After meals', 'ans', 9.5)}${T(52, 160, 'or lying down', 'ans', 9.5)}`),

    /* 32. Barrett esophagus: squamous to columnar change at the distal esophagus */
    barrett: ART(`
      <clipPath id="b2barC"><rect x="20" y="130" width="70" height="60"><animate attributeName="y" values="132;74;74;132" keyTimes="0;.45;.85;1" dur="5s" repeatCount="indefinite"/></rect></clipPath>
      <path class="f-stomach" d="M28 136 C20 150 24 178 60 178 C96 178 100 150 92 136 Z"/>
      <path class="f-esoph" d="M38 -2 H82 V136 H38 Z"/>
      <path d="M38 -2 V136 M82 -2 V136" stroke="var(--art-line)" stroke-width="1.5"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M42 ${12 + i * 20} q9 -4 18 0 t18 0" stroke="#e98466" stroke-width="1.3" fill="none"/>`).join('')}
      <path d="M38 134 L44 128 L50 136 L56 127 L62 135 L68 128 L74 136 L82 130" stroke="var(--art-line)" stroke-width="1.3" fill="none" stroke-dasharray="2 2"/>
      <g class="ansmotion"><g clip-path="url(#b2barC)"><path fill="var(--c-stomach)" stroke="var(--art-line)" stroke-width="1.2" d="M38 136 V96 L44 80 L50 98 L55 76 L61 94 L67 72 L73 92 L78 82 L82 96 V136 Z"/></g></g>
      <g class="q"><path d="M38 136 L44 128 L50 136 L56 127 L62 135 L68 128 L74 136 L82 130 V138 H38 Z" fill="var(--c-stomach)"/></g>
      ${ink(60, 160, 'stomach', 9.5, 'middle', '', ';fill:#ffffff')}
      <circle cx="60" cy="96" r="20" fill="none" stroke="var(--pic-ink)" stroke-width="2.5"/>
      <path d="M78 88 L140 36 M78 106 L140 112" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="2 2.5"/>
      ${QT(60, 52, 'Z-line moves up', 9.5)}
      <rect x="140" y="30" width="62" height="56" rx="6" fill="#fde2d8" stroke="var(--art-line)" stroke-width="1.4"/>
      ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<ellipse cx="${152 + c * 19 + (r % 2) * 6}" cy="${38 + r * 13}" rx="9" ry="4.5" fill="#fbc4b3" stroke="#d98a73" stroke-width="1"/><ellipse cx="${152 + c * 19 + (r % 2) * 6}" cy="${38 + r * 13}" rx="2.5" ry="1.5" fill="var(--c-tumor)"/>`).join('')).join('')}
      ${T(171, 98, 'Squamous', '', 9.5)}
      <path class="s-warn a-flow" d="M206 58 H226"/><path d="M222 52 L230 58 L222 64" fill="none" stroke="var(--c-warn)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="232" y="30" width="62" height="56" rx="6" fill="none" stroke="var(--pic-ink)" stroke-width="1.4" stroke-dasharray="3 3"/>
      <g class="ans">${[0, 1, 2, 3, 4, 5].map(i => `<g class="a-pop" style="--d:${i}"><rect class="f-stomach" x="${234 + i * 10}" y="33" width="9" height="50" rx="3"/>${i === 2 || i === 4 ? `<ellipse cx="${238.5 + i * 10}" cy="46" rx="3.3" ry="7" fill="#ffffff" stroke="var(--art-line)" stroke-width="1"/>` : `<ellipse cx="${238.5 + i * 10}" cy="72" rx="2.4" ry="4" fill="var(--c-tumor)"/>`}</g>`).join('')}</g>
      ${q(263, 58)}${T(263, 98, 'Columnar', 'ans', 9.5)}
      ${T(263, 112, 'goblet cells', 'ans', 9)}
      <g class="ans"><path class="f-tumor a-pulse" d="M156 140 C150 128 166 124 170 132 C178 124 188 136 180 144 C186 154 170 160 166 152 C158 160 146 150 156 140 Z"/></g>
      ${q(168, 142)}${T(236, 144, 'Adenocarcinoma risk', 'ans', 9.5)}
      ${T(214, 168, 'after years of reflux', 'ans', 9)}`),

    /* 33. GERD red flags that need an EGD */
    alarm: ART(`
      <g transform="translate(94 66) scale(.38)">${gut({ top: -175, w: 22, duo: false })}</g>
      <path d="M147 -2 V82 Q148 96 158 100" fill="none" stroke="#2b2b2b" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="159" cy="100" r="3" fill="#2b2b2b"/>
      <g class="ans"><path class="a-blink" d="M161 101 L178 96 L176 112 Z" fill="#fff6a0" opacity=".85"/></g>
      ${T(150, 160, 'EGD (scope)', '', 10)}
      ${[[8, 22], [8, 60], [8, 98], [8, 136]].map(([x, y], i) => `<path d="M${x} ${y - 12} V${y + 12}" stroke="var(--pic-ink)" stroke-width="2"/><path class="f-bad a-sway" style="animation-delay:${i * .2}s" d="M${x} ${y - 12} L${x + 14} ${y - 7} L${x} ${y - 2} Z"/>`).join('')}
      ${[[284, 22], [284, 66], [284, 110]].map(([x, y], i) => `<path d="M${x} ${y - 12} V${y + 12}" stroke="var(--pic-ink)" stroke-width="2"/><path class="f-bad a-sway" style="animation-delay:${i * .2 + .1}s" d="M${x} ${y - 12} L${x - 14} ${y - 7} L${x} ${y - 2} Z"/>`).join('')}
      ${QT(80, 22, 'Hard/painful swallow', 9)}${QT(72, 60, 'GI bleeding')}${QT(72, 98, 'Anemia')}${QT(72, 136, 'Weight loss')}
      ${QT(226, 22, 'Keeps vomiting')}${QT(226, 66, 'New sx after 60', 9.5)}${QT(226, 110, 'Family GI cancer', 9.5)}`),

    /* 34. GERD treatment: a step-up ladder */
    gerdTx: ART(`
      <path class="f-good" d="M4 178 V128 H100 V178 Z"/><path class="f-immune" d="M100 178 V94 H196 V178 Z"/><path class="f-warn" d="M196 178 V58 H296 V178 Z"/>
      ${ink(52, 158, '1', 22, 'middle', 'on')}${ink(148, 142, '2', 22, 'middle', 'on')}${ink(246, 126, '3', 22, 'middle', 'on')}
      ${QT(52, 116, 'Lifestyle', 10)}${QT(148, 110, 'Medicines', 10)}${QT(246, 74, 'Surgery', 10)}
      <g class="ansmotion"><circle r="5" class="f-bad"><animateMotion dur="4s" repeatCount="indefinite" path="M20 122 L84 122 Q92 104 100 88 L180 88 Q188 70 196 52 L280 52" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear"/></circle></g>
      ${T(52, 14, 'Small meals', 'ans', 9.5, '')}${T(52, 34, 'None 2-3 h pre-bed', 'ans', 9)}${T(52, 54, 'Bed head up 6 in', 'ans', 9.5)}${T(52, 74, 'Lose weight', 'ans', 9.5)}${T(52, 94, 'Avoid triggers', 'ans', 9.5)}
      ${q(52, 54)}
      <g class="ans">${cap(130, 30, -20, 'var(--c-spleen)', '#ffffff', 1.1, 'a-bob')}${tab(166, 30, '#ffffff', 8)}</g>
      ${q(148, 40)}${T(148, 56, 'PPI', 'ans', 10)}${T(148, 76, 'or H2 blocker', 'ans', 9.5)}
      <g class="ans">
        <path d="M236 -2 V30" stroke="var(--art-line)" stroke-width="11"/><path d="M236 -2 V30" stroke="var(--c-esoph)" stroke-width="8"/>
        <path class="f-stomach" d="M224 32 Q236 26 250 32 Q266 40 260 50 Q248 56 232 50 Q218 42 224 32 Z" opacity=".95"/>
        <rect x="226" y="18" width="22" height="10" rx="5" class="f-stomach a-squeeze"/><path d="M231 23 h12" stroke="#fff" stroke-width="1.4" stroke-dasharray="2 2"/>
      </g>
      ${q(250, 26)}${T(275, 12, 'Nissen', 'ans', 9.5)}${T(276, 30, 'wrap', 'ans', 9.5)}`),

    /* 35. Top 3 causes of chronic cough */
    cough: ART(`
      ${body(150, 30)}
      <path d="M144 38 Q150 36 156 38" stroke="var(--art-line)" stroke-width="1.6" fill="none"/>
      <path d="M150 24 L146 32 L152 32" stroke="var(--art-line)" stroke-width="1.4" fill="none"/>
      <path d="M126 78 C112 86 108 120 114 140 C122 146 138 144 144 136 L144 84 C140 78 132 76 126 78 Z" fill="#ff9fb8" stroke="var(--art-line)" stroke-width="1.4"/>
      <path d="M174 78 C188 86 192 120 186 140 C178 146 162 144 156 136 L156 84 C160 78 168 76 174 78 Z" fill="#ff9fb8" stroke="var(--art-line)" stroke-width="1.4"/>
      <path d="M150 52 V84 M150 84 L136 100 M150 84 L164 100 M139 96 L130 108 M161 96 L170 108" stroke="#e0e4f0" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${pipe('M150 54 L150 148', 5, 'var(--c-esoph)', 'round')}
      <path class="f-stomach" d="M148 148 C160 142 182 146 182 162 C182 176 160 178 152 170 C148 164 148 156 148 148 Z"/>
      <g class="ans">
        ${[0, 1, 2].map(i => `<g class="a-drop" style="animation-delay:${i * .5}s">${drop(150, 40 + i * 4, 'f-mucus', .7)}</g>`).join('')}
        <g class="a-pulse"><path d="M114 112 q-6 -4 -12 0 M114 120 q-8 -4 -14 2 M186 112 q6 -4 12 0 M186 120 q8 -4 14 2" stroke="var(--c-immune)" stroke-width="2" fill="none" stroke-linecap="round"/></g>
        ${[0, 1, 2].map(i => `<g class="a-rise" style="animation-delay:${i * .5}s">${drop(150, 120 - i * 18, 'f-acid', .7)}</g>`).join('')}
        ${[0, 1, 2].map(i => `<circle class="f-white a-blink" style="animation-delay:${i * .25}s" cx="${170 + i * 10}" cy="${42 - i * 4}" r="${3 + i}"/>`).join('')}
      </g>
      ${lead('M100 34 H146')}${lead('M100 150 H148')}${lead('M200 104 H190')}
      ${QT(54, 34, 'Postnasal drip', 10)}${QT(246, 104, 'Asthma', 10.5)}${QT(54, 150, 'GERD', 10.5)}
      ${T(246, 20, 'Cough', '', 10)}
      ${T(52, 92, 'In a nonsmoker', 'ans', 9.5)}${T(54, 110, 'not on ACE inhibitor', 'ans', 9)}`),

    /* 36. Acute vs chronic gastritis */
    gastritis: ART(`
      ${T(76, 12, 'Acute', '', 10.5)}${T(224, 12, 'Chronic', '', 10.5)}
      <path d="M150 4 V176" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="3 3"/>
      <rect class="f-muscle" x="6" y="150" width="138" height="26" rx="4"/><rect class="f-muscle" x="156" y="150" width="138" height="26" rx="4"/>
      <rect class="f-stomach" x="6" y="88" width="138" height="62" rx="4"/>
      ${Array.from({ length: 7 }, (_, i) => `<path d="M${16 + i * 19} 90 V136" stroke="#c2405d" stroke-width="3" stroke-linecap="round"/>`).join('')}
      <g class="ans">${[24, 62, 104].map((x, i) => `<ellipse class="a-blink" style="animation-delay:${i * .3}s" cx="${x}" cy="90" rx="9" ry="4" fill="var(--c-blood)" stroke="var(--art-line)" stroke-width="1"/>`).join('')}
        ${[[30, 116], [58, 104], [86, 124], [118, 108]].map(([x, y], i) => `<g class="a-pop" style="--d:${i}"><circle cx="${x}" cy="${y}" r="8" fill="#ffffff" stroke="var(--art-line)" stroke-width="1.2"/><path d="M${x - 4} ${y - 1} q2 -4 4 0 q2 4 4 0" stroke="var(--c-germ)" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`).join('')}</g>
      <g class="ans">${germ(26, 36, 0, .7)}${cap(60, 36, -20, 'var(--c-bad)', '#fff', .8)}<path d="M88 26 Q88 40 95 40 Q102 40 102 26 Z" fill="var(--c-blood)" stroke="var(--art-line)" stroke-width="1.2"/><path d="M95 40 V48 M90 48 H100" stroke="var(--pic-ink)" stroke-width="1.6"/>
        <path class="f-acid a-blink" d="M126 24 L118 38 H125 L120 50 L134 33 H127 L132 24 Z"/></g>
      ${q(76, 38)}${QT(76, 64, 'Neutrophils, sudden', 9.5)}
      <g class="q"><rect class="f-stomach" x="156" y="88" width="138" height="62" rx="4"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${166 + i * 19} 90 V136" stroke="#c2405d" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>
      <g class="ansmotion"><rect class="f-stomach" x="156" y="88" width="138" height="62" rx="4"><animate attributeName="y" values="88;122;122;88" keyTimes="0;.5;.9;1" dur="5s" repeatCount="indefinite"/><animate attributeName="height" values="62;28;28;62" keyTimes="0;.5;.9;1" dur="5s" repeatCount="indefinite"/></rect>
        ${[0, 2, 4, 6].map(i => `<path d="M${166 + i * 19} 140 V146" stroke="#c2405d" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>
      <g class="ans">${[[176, 132], [214, 138], [256, 130]].map(([x, y], i) => `<g class="a-bob" style="animation-delay:${i * .3}s"><circle cx="${x}" cy="${y}" r="6" fill="#ffffff" stroke="var(--art-line)" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="4.3" fill="var(--c-spleen)"/></g>`).join('')}
        <path class="f-immune a-pulse" d="M232 128 C226 120 238 116 242 122 C250 118 254 128 248 134 C250 142 238 144 236 138 C228 140 226 132 232 128 Z"/>
        <rect x="190" y="26" width="34" height="28" rx="3" class="f-white"/><rect x="190" y="26" width="34" height="8" rx="2" class="f-bad"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${196 + (i % 3) * 11}" cy="${40 + Math.floor(i / 3) * 8}" r="1.8" fill="var(--art-line)"/>`).join('')}
        <path class="s-ink a-flow-slow" d="M236 40 H268"/><path d="M264 34 L271 40 L264 46" fill="none" stroke="var(--pic-ink)" stroke-width="2.5"/></g>
      ${q(224, 40)}${QT(224, 64, 'Lymphocytes + macrophages', 9)}${QT(224, 108, 'Atrophy (thins)', 9.5)}`),

    /* 37. Type A (fundus + body, autoimmune) vs type B (antrum, H. pylori) */
    typeAB: ART(`
      <clipPath id="b2abA"><path d="M120 0 L240 0 L240 170 L168 170 L134 104 L120 60 Z"/></clipPath>
      <clipPath id="b2abB"><path d="M60 80 L134 104 L168 170 L60 170 Z"/></clipPath>
      <clipPath id="b2abS"><path d="${STOM}"/></clipPath>
      <g transform="translate(14 8) scale(.92)">${gut({ top: -12, les: false, extra:
        `<g clip-path="url(#b2abS)" class="ans"><g clip-path="url(#b2abA)"><rect x="60" y="0" width="200" height="180" fill="var(--c-immune)" opacity=".3"/></g><g clip-path="url(#b2abB)"><rect x="60" y="0" width="200" height="180" fill="var(--c-germ)" opacity=".42"/></g></g>`,
        over: `<path d="M134 104 L168 149" stroke="var(--art-line)" stroke-width="1.5" stroke-dasharray="3 3"/>` })}
        <g class="ans"><g class="a-bob">${ab(168, 48, -10, 1.3)}${ab(196, 66, 15, 1.3)}${ab(176, 96, 0, 1.3)}${ab(206, 102, -20, 1.3)}${ab(156, 74, 20, 1.3)}${ab(194, 38, 10, 1.3)}</g>
        <g class="a-shake">${germ(118, 124, -15, .75)}${germ(148, 136, 10, .75)}</g></g></g>
      ${q(180, 72)}${q(128, 122)}
      ${T(258, 22, 'Type A', '', 11)}${QT(258, 50, 'Autoimmune')}${QT(258, 78, 'Fundus + body', 9.5)}${QT(258, 106, 'B12 deficiency', 9)}
      ${T(44, 22, 'Type B', '', 11)}${QT(44, 50, 'H. pylori')}${QT(44, 78, 'Antrum', 10)}${QT(44, 106, 'More common', 9.5)}`),

    /* 38. Why type A gastritis causes B12 deficiency (and tumor risk) */
    typeA: ART(`
      <path class="f-stomach" d="M22 20 Q52 6 82 20 Q92 44 82 66 Q52 78 22 66 Q12 44 22 20 Z"/>
      <ellipse cx="52" cy="44" rx="10" ry="8" fill="var(--c-tumor)" opacity=".75"/>
      <path d="M30 30 q8 6 0 12 M74 30 q-8 6 0 12 M36 60 q8 -6 16 0" stroke="#fff" stroke-width="1.6" fill="none"/>
      <g class="ans"><g class="a-shake">${ab(16, 14, 135, 1.4)}${ab(90, 14, -135, 1.4)}${ab(10, 52, 90, 1.4)}${ab(94, 56, -90, 1.4)}${ab(52, 82, 0, 1.4)}</g></g>
      ${QT(52, 96, 'Parietal cells killed', 9)}
      <path class="s-ink a-flow" d="M100 44 H118"/>
      <path d="M140 30 A16 16 0 1 0 156 50 L140 44 Z" fill="var(--c-immune)" stroke="var(--art-line)" stroke-width="1.4"/><circle cx="153" cy="38" r="6" class="f-blood"/>
      <g class="ans">${no(160, 58, 'a-pulse')}</g>
      ${QT(146, 80, 'No intrinsic factor', 9)}
      <path class="s-ink a-flow" d="M178 44 H196"/>
      ${pipe('M206 20 C230 4 250 30 236 46 C224 60 252 78 288 62', 14, 'var(--c-small)', 'round')}
      ${ink(262, 40, 'ileum', 9.5)}
      <g class="ansmotion"><circle r="4.5" class="f-blood"><animateMotion dur="3s" repeatCount="indefinite" path="M206 20 C230 4 250 30 236 46 C224 60 252 78 288 62"/></circle></g>
      ${QT(250, 96, 'B12 not absorbed', 9)}
      <path d="M8 112 H292" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="3 3"/>
      ${drop(40, 140, 'f-acid', 2.2)}<g class="ans">${no(52, 150)}</g>
      ${QT(42, 170, 'No acid', 9.5)}
      <path class="s-ink a-flow" d="M76 144 H100"/>
      <path class="f-stomach" d="M108 126 H140 V162 H108 Z" rx="4"/><ellipse cx="124" cy="152" rx="5" ry="4" fill="var(--c-tumor)" opacity=".7"/>${ink(124, 140, 'G', 12, 'middle', '', ';fill:#ffffff')}
      <g class="ans">${[0, 1, 2, 3].map(i => `<circle class="f-warn a-rise" style="animation-delay:${i * .4}s" cx="${150 + (i % 2) * 10}" cy="${150 - i * 6}" r="3.5"/>`).join('')}</g>
      ${QT(146, 170, 'Gastrin rises', 9.5)}
      <path class="s-ink a-flow" d="M178 144 H200"/>
      <g class="ans"><path class="f-tumor a-pulse" d="M228 140 C220 124 240 118 246 128 C256 118 270 134 260 144 C268 156 246 164 242 154 C232 164 218 150 228 140 Z"/></g>${q(244, 142)}
      ${T(250, 170, 'Tumor risk', 'ans', 9.5)}`),

    /* 39. H. pylori: urease cloud, flagella, mucus hideout, sticks to the lining */
    hpylori: ART(`
      <rect x="0" y="0" width="300" height="62" fill="#fff38a"/>
      <path class="f-mucus" d="M-2 62 Q25 54 50 62 T100 62 T150 62 T200 62 T250 62 T302 62 V128 H-2 Z"/>
      ${cells(0, 126, 300, 56, 10)}
      ${[[22, 22], [118, 18], [170, 40], [212, 46], [258, 44]].map(([x, y], i) => `<g class="a-drop" style="animation-delay:${i * .3}s">${ink(x, y, 'H+', 12, 'middle', '', ';fill:#a04800')}</g>`).join('')}
      ${ink(296, 13, 'stomach acid pH 1-2', 9.5, 'end', '', ';fill:#7a3a00')}${ink(296, 78, 'pH near 7 by cells', 9.5, 'end', '', ';fill:#0b4f6c')}
      ${germ(262, 118, -40, 1.15)}
      <g class="q">${germ(150, 94, 0, 1.3)}</g>
      <g class="ansmotion"><g><g transform="translate(-100 -100)"><circle cx="100" cy="100" r="24" fill="#ffffff" opacity=".45" stroke="var(--c-water)" stroke-width="1.5" stroke-dasharray="3 3"/>${ink(100, 87, 'NH3', 9, 'middle', '', ';fill:#0b4f6c')}${germ(100, 104, 0, 1.25)}</g>
        <animateMotion dur="8s" repeatCount="indefinite" path="M110 96 C130 84 160 104 190 92 C210 84 214 104 196 104 C170 106 140 108 116 102 C104 98 100 100 110 96"/></g></g>
      ${QT(72, 46, 'Urease: acid → ammonia', 9)}${QT(52, 80, 'Flagella: swims', 9.5)}${QT(52, 106, 'Hides in mucus', 9.5)}${QT(244, 154, 'Sticks to lining', 9.5)}`),

    /* 40. Tests that show active H. pylori */
    hpTest: ART(`
      <path d="M100 6 V160 M200 6 V160" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="3 3"/>
      <circle class="f-skin" cx="30" cy="50" r="16"/><circle cx="34" cy="45" r="1.8" fill="var(--art-line)"/><path d="M44 54 H54" stroke="var(--pic-ink)" stroke-width="3" stroke-linecap="round"/>
      <path class="f-mucus" d="M54 54 C60 28 92 30 92 54 C92 80 60 80 54 54 Z"/>
      <g class="ans">${[0, 1, 2].map(i => `<circle class="f-white a-rise" style="animation-delay:${i * .5}s" cx="${66 + i * 9}" cy="${62 - (i % 2) * 6}" r="3"/>`).join('')}</g>
      ${ink(74, 98, 'urea → CO2', 9.5)}
      <path class="f-white" d="M128 40 H172 L168 82 H132 Z"/><rect x="124" y="30" width="52" height="11" rx="3" class="f-warn"/>
      <path class="f-stool" d="M136 76 C134 66 144 62 150 64 C158 60 166 68 164 76 Z"/>
      <g class="ans">${ab(150, 54, 0, 1.4)}</g>
      ${ink(150, 98, 'germ protein', 9.5)}
      <rect x="240" y="20" width="20" height="66" rx="8" class="f-white"/><rect x="240" y="44" width="20" height="42" rx="8" class="f-blood"/><rect x="236" y="14" width="28" height="9" rx="3" class="f-vein"/>
      <g class="ans">${ab(250, 62, 0, 1.4)}</g>
      ${ink(250, 98, 'antibodies', 9.5)}
      ${QT(50, 116, 'Urea breath test', 9.5)}${QT(150, 116, 'Stool antigen', 9.5)}${QT(250, 116, 'Blood antibody', 9.5)}
      ${ok(50, 142, 'ans a-pop', '--d:1')}${ok(150, 142, 'ans a-pop', '--d:2')}${no(250, 142, 'ans a-pop', '--d:3')}
      ${T(50, 166, 'Active now', 'ans', 9.5)}${T(150, 166, 'Active now', 'ans', 9.5)}${T(250, 166, 'Old or new?', 'ans', 9.5)}`),

    /* 41. H. pylori treatment */
    hpTx: ART(`
      ${[38, 106, 184].map(x => `<circle cx="${x}" cy="44" r="22" fill="none" stroke="var(--pic-ink)" stroke-width="1.5" stroke-dasharray="4 3"/>`).join('')}
      ${ink(72, 52, '+', 22)}${ink(140, 52, '+', 22)}
      <g class="ans">${cap(38, 44, -30, 'var(--c-bad)', '#ffffff', 1.4, 'a-pop')}${cap(106, 44, 30, 'var(--c-gall)', '#ffffff', 1.4, 'a-pop')}
        <g class="a-pop" style="--d:2">${tab(174, 40, '#c9b8ff', 8)}<rect x="186" y="34" width="14" height="24" rx="3" fill="#ff8fc8" stroke="var(--art-line)" stroke-width="1.4"/><rect x="189" y="28" width="8" height="7" rx="1" class="f-white"/></g></g>
      ${q(38, 44)}${q(106, 44)}${q(184, 44)}
      ${T(38, 80, 'Antibiotic', 'ans', 9.5)}${T(106, 80, 'Antibiotic', 'ans', 9.5)}${T(184, 80, 'PPI or bismuth', 'ans', 9)}
      <path class="s-ink a-flow" d="M214 44 H236"/><path d="M232 37 L240 44 L232 51" fill="none" stroke="var(--pic-ink)" stroke-width="2.5"/>
      ${germ(266, 44, 0, 1.2, 'a-shake')}<g class="ans">${ban(264, 44, 20)}</g>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${44 + i * 31}" y="104" width="27" height="27" rx="4" class="f-white"/><rect x="${44 + i * 31}" y="104" width="27" height="7" rx="3" class="f-bad"/>${ok(57.5 + i * 31, 121, 'ans a-pop', `--d:${i + 2}`)}`).join('')}
      ${QT(150, 156, 'At least 1 week', 10)}`),

    /* 42. How NSAIDs damage the stomach */
    nsaid: ART(`
      <path d="M8 34 l8 -8 l8 8 l8 -8 l8 8 l8 -8" stroke="var(--c-fat)" stroke-width="3" fill="none" stroke-linejoin="round"/>
      <path class="s-ink a-flow" d="M60 30 H76"/>
      <path class="f-good" d="M104 30 L120 18 A20 20 0 1 0 120 42 Z"/><circle cx="96" cy="20" r="2" fill="var(--art-line)"/>
      ${ink(96, 40, 'COX', 9.5, 'middle', '', ';fill:#0a4a3a')}
      ${cap(132, 30, 0, '#ffffff', 'var(--c-warn)', 1.1, 'ans a-bob')}
      ${T(140, 10, 'NSAID', '', 9.5)}
      <g class="ans">${no(120, 52, 'a-pulse')}</g>
      <path class="s-ink a-flow" d="M152 30 H176"/>
      <g class="ans">${[0, 1, 2, 3].map(i => `<path transform="translate(${196 + i * 24} 30)" d="M-7 0 L-3.5 -6 H3.5 L7 0 L3.5 6 H-3.5 Z" fill="${i < 1 ? 'var(--c-good)' : 'none'}" stroke="${i < 1 ? 'var(--art-line)' : 'var(--pic-ink)'}" stroke-width="1.3" stroke-dasharray="${i < 1 ? '0' : '2 2'}"/>`).join('')}</g>
      ${q(230, 30)}
      ${QT(80, 68, 'Blocks cyclooxygenase', 9)}${QT(232, 68, 'Fewer prostaglandins', 9)}
      <rect x="0" y="84" width="300" height="34" fill="#fff38a"/>
      ${ink(296, 96, 'acid', 9.5, 'end', '', ';fill:#7a3a00')}
      <g class="q"><rect class="f-mucus" x="-2" y="108" width="304" height="20"/></g>
      <g class="ans"><rect class="f-mucus" x="-2" y="122" width="304" height="6"/></g>
      ${cells(0, 128, 300, 54, 10)}
      <g class="ans">${[0, 1, 2, 3, 4].map(i => `<g class="a-drop" style="animation-delay:${i * .3}s">${drop(30 + i * 58, 104, 'f-acid', .9)}</g>`).join('')}
        ${ulcer(75, 130, 9, 4, 'a-pulse')}${ulcer(195, 130, 9, 4, 'a-pulse')}</g>
      ${QT(140, 160, 'Thin mucus: lining exposed', 9)}`),

    /* 43. The two main causes of peptic ulcers */
    pud: ART(`
      <g transform="translate(84 10) scale(.7)">${gut({ top: -20 })}${ulcer(84, 122, 7, 5, 'a-pulse')}${ulcer(160, 96, 7, 5, 'a-pulse')}</g>
      ${germ(40, 44, -10, 1.6, 'ans a-shake')}${q(40, 44)}
      <path class="s-germ a-flow" d="M58 62 Q90 86 140 78" stroke-width="2.5"/>
      ${QT(40, 74, 'H. pylori')}
      <g class="ans a-bob">${cap(250, 34, -25, 'var(--c-bad)', '#ffffff', 1.3)}${tab(272, 52, '#ffffff', 8)}</g>${q(258, 42)}
      <path class="s-bad a-flow" d="M248 70 Q220 90 200 84" stroke-width="2.5"/>
      ${QT(258, 76, 'NSAIDs')}
      <path d="M220 166 H292" stroke="var(--pic-ink)" stroke-width="1.5"/>
      <g class="ans">${[0, 1, 2, 3, 4].map(i => `<rect class="f-warn a-pop" style="--d:${i}" x="${224 + i * 14}" y="${160 - (i + 1) * 7}" width="10" height="${(i + 1) * 7}" rx="2"/>`).join('')}</g>
      ${q(256, 148)}${T(240, 126, 'Both rise with age', 'ans', 9)}
      ${T(150, 172, 'ulcers', '', 9.5)}`),

    /* 44 + 45. Duodenal vs gastric ulcer: where they sit, pain with food, and the facts */
    duoGas: ART(`
      <g transform="translate(32 16) scale(.8)">${gut({ top: -26, les: false })}${ulcer(84, 125, 8, 5.5, 'a-pulse')}${ulcer(137, 96, 8, 5.5, 'a-pulse')}</g>
      <g class="ansmotion"><circle r="4" class="f-food"><animateMotion dur="3s" repeatCount="indefinite" path="M144 0 L144 54 C150 66 165 84 172 104"/></circle></g>
      ${lead('M99 116 L88 116')}${lead('M146 92 L216 92')}
      ${ink(150, 176, 'gastric: lesser curve | duodenal: bulb', 9)}
      ${T(43, 12, 'Duodenal', '', 10.5)}${T(258, 12, 'Gastric', '', 10.5)}
      ${QT(43, 36, 'Food helps', 9.5)}${QT(43, 58, 'Night pain', 9.5)}${QT(43, 80, '80% of ulcers', 9)}${QT(43, 134, 'Age 20-50', 9.5)}${QT(43, 156, 'No cancer risk', 9)}
      ${QT(258, 36, 'Food worsens', 9.5)}${QT(258, 58, 'Age 50-70', 9.5)}${QT(258, 114, 'Deadlier', 9.5)}${QT(258, 136, 'Often NSAIDs', 9.5)}${QT(258, 158, 'Cancer risk', 9.5)}`),

    /* 46. Curling vs Cushing stress ulcers */
    stress: ART(`
      ${T(76, 12, 'Curling', '', 10.5)}${T(224, 12, 'Cushing', '', 10.5)}
      <path d="M150 4 V128" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="3 3"/>
      ${stand(36, 94, 'var(--pic-ink)')}
      <g class="ans">${flame(30, 70, .9, 'a-sway')}${flame(44, 82, .8, 'a-sway')}${flame(36, 54, .7, 'a-sway')}</g>${q(36, 72)}
      ${QT(36, 108, 'Major burns', 9.5)}
      <path class="s-ink a-flow" d="M62 70 H80"/>
      <g transform="translate(56 34) scale(.38)">${gut({ top: 10, les: false, duo: false })}${ulcer(170, 120, 12, 8)}</g>
      <circle class="f-skin" cx="190" cy="66" r="22"/><path d="M170 60 C170 44 186 40 196 44 C206 46 212 56 208 66 Z" fill="#ff9fb8" stroke="var(--art-line)" stroke-width="1.2"/>
      <circle cx="200" cy="72" r="2" fill="var(--art-line)"/>
      <g class="ans"><path class="f-warn a-shake" d="M178 30 l4 8 l8 -4 l-2 9 l9 2 l-8 5 l4 8 l-9 -3 l-3 8 l-3 -8 l-9 3 l4 -8 l-8 -5 l9 -2 l-2 -9 l8 4 Z"/><path d="M184 46 l4 6 l-4 4 l4 6" stroke="var(--c-bad)" stroke-width="2" fill="none"/></g>${q(190, 56)}
      ${QT(190, 108, 'Head injury', 9.5)}
      <path class="s-ink a-flow" d="M216 70 H232"/>
      <g transform="translate(206 34) scale(.38)">${gut({ top: 10, les: false, duo: false })}${ulcer(170, 120, 12, 8)}</g>
      <g class="ans">${[0, 1].map(i => `<g class="a-drop" style="animation-delay:${i * .8}s">${drop(121, 96, 'f-blood', .9)}</g><g class="a-drop" style="animation-delay:${i * .8 + .4}s">${drop(271, 96, 'f-blood', .9)}</g>`).join('')}</g>
      <rect x="6" y="132" width="288" height="44" rx="10" fill="none" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="3 3"/>
      ${drop(26, 154, 'f-blood', 1.3)}${QT(90, 154, 'Bleeding: 1st sign', 9.5)}
      <g class="ans">${cap(178, 154, -20, 'var(--c-spleen)', '#ffffff', 1, 'a-bob')}</g>${q(178, 154)}
      ${T(240, 154, 'Give acid reducers', 'ans', 9)}`),

    /* 47. Zollinger-Ellison: a gastrinoma floods the stomach with acid */
    zes: ART(`
      <clipPath id="b2zesS"><path d="${STOM}"/></clipPath>
      <g transform="translate(40 4) scale(.84)">
        <path class="f-pancreas" d="M82 150 C78 136 96 130 108 140 C130 156 170 150 200 144 C220 140 232 150 226 160 C200 170 150 172 112 170 C96 170 84 164 82 150 Z"/>
        ${gut({ top: -10, duo: DUO_C, les: false, extra: `<g clip-path="url(#b2zesS)" class="ans"><path class="f-acid noline" d="M60 70 Q100 62 140 70 T240 70 V170 H60 Z"><animate attributeName="d" values="M60 120 Q100 112 140 120 T240 120 V170 H60 Z;M60 60 Q100 52 140 60 T240 60 V170 H60 Z;M60 120 Q100 112 140 120 T240 120 V170 H60 Z" dur="4s" repeatCount="indefinite"/></path></g>` })}
        <path class="f-tumor a-pulse" d="M94 150 C88 140 100 134 106 140 C114 136 118 148 112 154 C112 162 100 164 98 158 C90 160 88 152 94 150 Z"/>
        <g class="ans">${ulcer(80, 124, 6, 4)}${ulcer(72, 150, 4.5, 6)}${ulcer(120, 182, 6, 4)}</g>
        <path class="s-blood a-flow" d="M112 148 C150 120 196 128 210 100" stroke-width="2.5"/>
        <g class="ansmotion">${[0, .8, 1.6].map(b => `<circle r="4" class="f-warn"><animateMotion dur="2.4s" begin="${b}s" repeatCount="indefinite" path="M112 148 C150 120 196 128 210 100"/></circle>`).join('')}</g>
        <g class="ans">${[0, 1, 2].map(i => `<g class="a-drop" style="animation-delay:${i * .5}s">${drop(226 - 0, 186, 'f-water', .9)}</g>`).join('')}</g>
      </g>
      ${q(126, 128)}
      ${lead('M128 128 H70 V120')}${QT(50, 112, 'Gastrinoma', 10)}
      ${T(258, 30, 'Gastrin floods', 'ans', 9.5)}${T(258, 48, 'acid pours out', 'ans', 9.5)}${q(258, 40)}
      ${lead('M100 108 L84 92')}${QT(50, 84, 'Severe ulcers', 9.5)}
      ${QT(252, 146, 'Chronic diarrhea', 9.5)}
      ${QT(52, 150, 'Serum gastrin ↑', 9.5)}
      ${ink(50, 170, 'check this lab', 9)}`),

    /* 48. Peptic ulcer complications */
    pudCx: ART(`
      ${[[4, 4], [152, 4], [4, 92], [152, 92]].map(([x, y]) => `<rect x="${x}" y="${y}" width="144" height="84" rx="10" fill="none" stroke="var(--pic-ink)" stroke-width="1" stroke-dasharray="3 3"/>`).join('')}
      ${[[4, 4], [152, 4], [152, 92]].map(([x, y], k) => `<rect class="f-stomach" x="${x + 6}" y="${y + 28}" width="132" height="14"/><rect x="${x + 6}" y="${y + 42}" width="132" height="10" fill="#ffc2cf" stroke="var(--art-line)" stroke-width="1"/><rect class="f-muscle" x="${x + 6}" y="${y + 52}" width="132" height="12"/>` +
        `<path d="M${x + 58} ${y + 28} Q${x + 72} ${y + (k === 0 ? 50 : 70)} ${x + 86} ${y + 28} Z" fill="var(--c-tumor)" stroke="var(--art-line)" stroke-width="1.2"/>`).join('')}
      <g class="ans"><path d="M12 50 H142" stroke="var(--c-blood)" stroke-width="5"/>${[0, 1, 2].map(i => `<g class="a-rise" style="animation-delay:${i * .5}s">${drop(76 + (i - 1) * 5, 30, 'f-blood', .8)}</g>`).join('')}</g>
      <g class="ans">${[0, 1, 2].map(i => `<circle class="f-food a-drop" style="animation-delay:${i * .5}s" cx="${220 + (i - 1) * 6}" cy="78" r="3"/>`).join('')}<circle class="f-white a-drop" style="animation-delay:.25s" cx="226" cy="80" r="2.4"/></g>
      <g class="ans"><path d="M156 156 H296" stroke="var(--c-bad)" stroke-width="5" class="a-blink"/><ellipse cx="224" cy="172" rx="56" ry="9" fill="var(--c-bad)" opacity=".35" class="a-pulse"/></g>
      <path d="M8 112 Q60 112 76 124 V152 Q60 164 8 164" fill="none" stroke="var(--art-line)" stroke-width="2"/>
      <path class="f-stomach" d="M8 106 Q62 106 80 120 L80 156 Q62 170 8 170 V158 Q54 158 68 150 V126 Q54 118 8 118 Z"/>
      ${pipe('M84 138 H146', 18, 'var(--c-small)', 'butt')}
      <g class="q"><path class="f-muscle" d="M74 124 H88 V152 H74 Z"/></g>
      <g class="ans"><path class="f-scar" d="M70 118 C80 124 88 124 92 118 V158 C88 152 80 152 70 158 Z"/><path d="M72 136 L90 140" stroke="var(--art-line)" stroke-width="1.2"/><circle cx="56" cy="138" r="8" class="f-food a-shake"/></g>
      ${QT(76, 18, 'Bleeding', 10)}${QT(224, 18, 'Perforation', 10)}${QT(112, 106, 'Obstruction', 9.5)}${QT(224, 106, 'Peritonitis', 10)}
      ${ink(228, 168, 'belly lining', 9, 'middle', '', ';fill:#ffffff')}`),

    /* 49. How a peptic ulcer is confirmed */
    pudDx: ART(`
      <g transform="translate(-6 40) scale(.66)">${gut({ top: -64, w: 18 })}${ulcer(186, 110, 9, 6)}</g>
      <g class="ans"><path d="M86 -2 V60 Q87 76 98 84" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/><circle cx="99" cy="85" r="3.4" fill="#2b2b2b"/>
        <path class="a-blink" d="M102 86 L120 98 L110 108 Z" fill="#fff6a0" opacity=".9"/></g>
      ${q(98, 70)}
      <rect x="132" y="14" width="76" height="58" rx="8" fill="#1f2433" stroke="var(--art-line)" stroke-width="1.5"/>
      <rect x="166" y="72" width="8" height="8" fill="#1f2433"/><rect x="152" y="80" width="36" height="5" rx="2" fill="#1f2433"/>
      <g class="ans"><circle cx="170" cy="43" r="24" fill="var(--c-stomach)"/><path d="M150 36 Q170 30 190 38 M152 52 Q170 46 188 54" stroke="#c2405d" stroke-width="1.5" fill="none"/>${ulcer(170, 44, 9, 7, 'a-pulse')}</g>${q(170, 43)}
      ${QT(170, 96, 'EGD sees it', 10)}
      ${germ(256, 22, 0, .9)}
      ${QT(256, 44, 'H. pylori test', 9.5)}
      <rect x="240" y="60" width="11" height="34" rx="5" class="f-blood"/><rect x="238" y="56" width="15" height="6" rx="2" class="f-vein"/>
      <g class="ans"><text x="262" y="82" style="font-size:11px;font-weight:800" class="ink">Hgb ↓</text></g>
      ${QT(256, 106, 'CBC for anemia', 9.5)}
      <rect x="236" y="122" width="40" height="22" rx="3" class="f-white"/><circle cx="248" cy="133" r="5" fill="var(--c-stool)"/><circle cx="264" cy="133" r="5" fill="var(--c-vein)" class="ans a-blink"/>
      ${QT(256, 160, 'Stool blood test', 9.5)}`),
  });
})();
