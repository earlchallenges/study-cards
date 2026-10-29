/* Chapter 9 Part 4 art (a): colorful replacements for PICS, loaded after the page sets PICS. */
(() => {
const f = n => +(+n).toFixed(1);
// outlined tube: dark outline + colored core (inline style so the CSS stroke-width rule can't override it)
const T = (d, c, w = 10, ex = '') => `<path class="s-line" d="${d}" style="stroke-width:${w + 3}px"/><path d="${d}" fill="none" stroke="var(--c-${c})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const ln = (d, cls, w = 2, ex = '') => `<path class="${cls}" d="${d}" style="stroke-width:${w}px" ${ex}/>`;
const ink = (x, y, t, size = 10, cls = '', anchor = 'middle') => `<text class="ink ${cls}" x="${x}" y="${y}" text-anchor="${anchor}" style="font-size:${size}px;font-weight:700">${esc(t)}</text>`;
const drop = (x, y, s = 1, cls = 'f-water', ex = '') => `<path class="${cls}" ${ex} d="M${f(x)} ${f(y - 7 * s)} C${f(x + 5 * s)} ${f(y - s)} ${f(x + 5 * s)} ${f(y + 4 * s)} ${f(x)} ${f(y + 4 * s)} C${f(x - 5 * s)} ${f(y + 4 * s)} ${f(x - 5 * s)} ${f(y - s)} ${f(x)} ${f(y - 7 * s)} Z"/>`;
const poo = (x, y, s = 1, cls = 'f-stool', ex = '') => `<g ${ex}><ellipse class="${cls}" cx="${x}" cy="${y}" rx="${f(11 * s)}" ry="${f(4.5 * s)}"/><ellipse class="${cls}" cx="${x}" cy="${f(y - 5 * s)}" rx="${f(8 * s)}" ry="${f(3.8 * s)}"/><ellipse class="${cls}" cx="${x}" cy="${f(y - 9.5 * s)}" rx="${f(5 * s)}" ry="${f(3 * s)}"/></g>`;
const virus = (x, y, r = 7, cls = 'f-germ', ex = '') => {
  let s = '';
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4, c = Math.cos(a), n = Math.sin(a);
    s += `<path class="s-line" style="stroke-width:1.4px" d="M${f(x + c * r)} ${f(y + n * r)} L${f(x + c * (r + 3.5))} ${f(y + n * (r + 3.5))}"/><circle class="${cls}" cx="${f(x + c * (r + 4.3))}" cy="${f(y + n * (r + 4.3))}" r="1.7"/>`;
  }
  return `<g ${ex}>${s}<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="f-white noline" cx="${f(x - r * .35)}" cy="${f(y - r * .35)}" r="${f(r * .22)}" opacity=".6"/></g>`;
};
const wheel = (x, y, r = 9, ex = '') => {
  let s = '';
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += `M${x} ${y} L${f(x + Math.cos(a) * r * .8)} ${f(y + Math.sin(a) * r * .8)} `; }
  return `<g ${ex}><circle class="f-germ" cx="${x}" cy="${y}" r="${r}"/>${ln(s, 's-white', 1.6)}<circle class="f-white" cx="${x}" cy="${y}" r="${f(r * .3)}"/><circle cx="${x}" cy="${y}" r="${f(r * .8)}" fill="none" stroke="#fff" stroke-width="1.4"/></g>`;
};
const rod = (x, y, ang = 0, len = 18, fl = true, cls = 'f-germ', ex = '') => `<g transform="translate(${x} ${y}) rotate(${ang})"><g ${ex}>` +
  (fl ? ln(`M${len / 2} 0 q3 -4 6 0 t6 0 M${-len / 2} 0 q-3 4 -6 0 t-6 0 M0 -4 q-3 -4 0 -7 M0 4 q3 4 0 7`, 's-germ', 1.3) : '') +
  `<rect class="${cls}" x="${-len / 2}" y="-4.5" width="${len}" height="9" rx="4.5"/></g></g>`;
const person = (x, y, s = 1, body = 'f-immune', ex = '') => `<g ${ex}><path class="${body}" d="M${f(x - 10 * s)} ${f(y + 24 * s)} Q${f(x - 10 * s)} ${f(y + 8 * s)} ${x} ${f(y + 8 * s)} Q${f(x + 10 * s)} ${f(y + 8 * s)} ${f(x + 10 * s)} ${f(y + 24 * s)} Z"/><circle class="f-skin" cx="${x}" cy="${y}" r="${f(6.5 * s)}"/></g>`;
const pill = (x, y, ang = -30, a = 'bad', b = 'white', ex = '') => `<g transform="translate(${x} ${y}) rotate(${ang})"><g ${ex}><path class="f-${a}" d="M0 -5 H-6 A5 5 0 0 0 -6 5 H0 Z"/><path class="f-${b}" d="M0 -5 H6 A5 5 0 0 1 6 5 H0 Z"/></g></g>`;
const burst = (x, y, r = 10, cls = 'f-bad', ex = '') => {
  let p = '';
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * .5 : r; p += (i ? 'L' : 'M') + f(x + Math.cos(a) * rr) + ' ' + f(y + Math.sin(a) * rr); }
  return `<path class="${cls}" ${ex} d="${p}Z"/>`;
};
const no = (x, y, r = 9, ex = '') => `<g ${ex}><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-bad)" stroke-width="2.6"/><path d="M${f(x - r * .7)} ${f(y - r * .7)} L${f(x + r * .7)} ${f(y + r * .7)}" stroke="var(--c-bad)" stroke-width="2.6"/></g>`;
const torso = (cx, t, w, h, navel = true) => {
  const l = cx - w / 2, r = cx + w / 2, b = t + h;
  return `<path class="f-skin" d="M${l} ${t} Q${l - 8} ${f(t + h * .55)} ${l + 6} ${b} Q${cx} ${b + 12} ${r - 6} ${b} Q${r + 8} ${f(t + h * .55)} ${r} ${t} Q${cx} ${t - 10} ${l} ${t} Z"/>` +
    (navel ? ln(`M${cx - 3} ${f(t + h * .5)} q3 3.5 6 0`, 's-line', 1.6) : '');
};
const bag = (x, y, cls = 'f-water', lab = '') => `<path class="f-white" d="M${x - 11} ${y} h22 v24 q0 6 -6 6 h-10 q-6 0 -6 -6 Z"/><rect class="${cls} noline" x="${x - 9}" y="${y + 9}" width="18" height="18" rx="3"/>` +
  `<rect class="f-white" x="${x - 3}" y="${y - 5}" width="6" height="5"/>` + (lab ? `<text class="tagtx" x="${x}" y="${y + 22}" text-anchor="middle" style="font-size:9px">${lab}</text>` : '');
const heart = (x, y, s = 1, ex = '') => `<path class="f-blood" ${ex} d="M${x} ${f(y + 7 * s)} C${f(x - 12 * s)} ${f(y - 1 * s)} ${f(x - 7 * s)} ${f(y - 10 * s)} ${x} ${f(y - 4 * s)} C${f(x + 7 * s)} ${f(y - 10 * s)} ${f(x + 12 * s)} ${f(y - 1 * s)} ${x} ${f(y + 7 * s)} Z"/>`;
const pop = (d, inner) => `<g class="a-pop" style="--d:${d}">${inner}</g>`;
const thermo = (x, y) => `<rect class="f-white" x="${x - 3}" y="${y - 16}" width="6" height="20" rx="3"/><rect class="f-blood noline" x="${x - 1.5}" y="${y - 10}" width="3" height="12"/><circle class="f-blood" cx="${x}" cy="${y + 6}" r="5"/>`;
const motion = (inner, path, dur, begin = 0, ex = '') => `<g class="ansmotion">${inner.replace(/\/>$/, '')}><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}" ${ex}/></${inner.match(/^<(\w+)/)[1]}></g>`;

Object.assign(PICS, {

  /* ---------------- DIARRHEA ---------------- */
  diarType: ART((() => {
    const N = ['Secretory', 'Osmotic', 'Motility'], S = [['gut pours', 'fluid out'], ['gut can\'t', 'absorb fluid'], ['gut moves', 'too fast']];
    let s = ink(150, 18, 'Inside the gut: 3 ways to get diarrhea', 10.5);
    N.forEach((n, i) => {
      const x = 6 + i * 98;
      let top = `M${x} 50`, bot = `M${x} 102`;
      for (let k = 0; k < 9; k++) { top += ' q5 11 10 0'; bot += ' q5 -11 10 0'; }
      s += `<rect x="${x}" y="50" width="90" height="52" class="f-mucus noline" opacity=".3"/>` +
        `<rect x="${x}" y="32" width="90" height="18" class="f-small noline"/><rect x="${x}" y="102" width="90" height="18" class="f-small noline"/>` +
        `<path class="f-small" d="${top}"/><path class="f-small" d="${bot}"/>` + ln(`M${x} 32 h90 M${x} 120 h90`, 's-line', 1.5) +
        qtag(x + 45, 138, n) + `<g class="ans">${ink(x + 45, 158, S[i][0], 9.5)}${ink(x + 45, 170, S[i][1], 9.5)}</g>`;
    });
    // secretory: water pours out of the wall into the lumen
    s += '<g class="ans">' + [[18, 66, 0], [40, 66, .6], [62, 66, .3], [84, 66, .9]].map(([x, y, d]) => drop(x, y, 1.1, 'f-water a-drop', `style="animation-delay:${d}s"`)).join('') +
      [[28, 86, .2], [52, 86, .8], [76, 86, .5]].map(([x, y, d]) => drop(x, y, 1.1, 'f-water a-rise', `style="animation-delay:${d}s"`)).join('') + '</g>';
    // osmotic: unabsorbed particles hold water in the lumen; absorption blocked
    const P = [[120, 66], [178, 66], [134, 88], [170, 88]];
    s += '<g class="ans">' + ln('M150 92 V50', 's-water', 3) + no(150, 41, 7) +
      P.map(([x, y], i) => `<circle class="f-pancreas a-pulse" style="animation-delay:${i * .3}s" cx="${x}" cy="${y}" r="5"/>` + drop(x + 10, y + 3, .8, 'f-water a-bob')).join('') + '</g>';
    // motility: squeeze waves + stool racing through
    s += '<g class="ans">' + ln('M208 62 H286 M208 90 H286', 's-white a-flow', 1.5) +
      [226, 266].map(x => `<g class="a-pulse">${ln(`M${x - 6} 34 l6 8 l6 -8 M${x - 6} 118 l6 -8 l6 8`, 's-muscle', 3)}</g>`).join('') + '</g>' +
      [0, -.3, -.6].map(b => motion('<ellipse class="f-stool" cx="0" cy="0" rx="7" ry="4.5"/>', 'M206 76 H288', .9, b)).join('');
    return s;
  })()),

  diarTime: ART((() => {
    const X = d => f(20 + d * 265 / 56);
    let s = ink(150, 166, 'how long the loose stools last  →', 10);
    s += `<rect class="f-warn" x="20" y="100" width="${X(14) - 20}" height="22" rx="6"/>` +
      `<rect class="f-white" x="${X(14)}" y="104" width="${X(28) - X(14)}" height="14" opacity=".55" style="stroke-dasharray:3 3"/>` +
      `<path class="f-bad" d="M${X(28)} 100 H272 L286 111 L272 122 H${X(28)} Z"/>`;
    for (let w = 0; w <= 7; w++) s += ln(`M${X(w * 7)} 124 v6`, 's-ink', 1.5);
    s += `<g class="ans">${ink(X(14), 142, '14 days', 9.5)}${ink(X(28), 142, '4 weeks', 9.5)}</g>`;
    s += qtag(f((20 + X(14)) / 2), 111, 'Acute') + qtag(210, 111, 'Chronic');
    // acute: quick viral bout
    s += `<g class="ans">${tag(64, 34, '3+ loose stools a day', '', 9.5)}${virus(30, 66, 6, 'f-germ', 'class="a-bob"')}${wheel(58, 70, 8, 'class="a-spin"')}${tag(104, 68, 'usually viral', '', 9.5)}` +
      '</g>';
    // chronic: usually not an infection
    s += `<g class="ans">${tag(222, 34, 'usually NOT infection', '', 9.5)}` +
      pop(1, tag(186, 60, 'IBD', '', 10)) + pop(2, tag(224, 60, 'IBS', '', 10)) + pop(3, tag(266, 60, 'celiac', '', 10)) + '</g>';
    s += motion('<path class="f-white" d="M-4 -12 h8 l-4 7 Z"/>', `M20 98 H286`, 5);
    return s;
  })()),

  diarBugs: ART((() => {
    let s = '';
    [[52, 'f-lymph'], [150, 'f-fat'], [248, 'f-mucus']].forEach(([x, c]) => { s += `<rect class="${c}" x="${x - 47}" y="32" width="94" height="122" rx="12" opacity=".55"/>`; });
    s += qtag(52, 18, 'Viruses') + qtag(150, 18, 'Bacteria') + qtag(248, 18, 'Protozoa');
    // viruses: norovirus (small round) + rotavirus (wheel)
    s += virus(32, 60, 8, 'f-germ', 'class="a-bob"') + wheel(72, 60, 12, 'class="a-spin"');
    // bacteria: Salmonella (flagella), Shigella (plain rod), Campylobacter (curved), C. diff (rod + spore)
    s += `<g class="a-shake">${rod(124, 48, -15, 18, true)}</g>` + rod(176, 48, 20, 16, false) +
      `<g class="a-sway">${T('M114 76 q5 -9 10 -2 t10 -2', 'germ', 5)}</g>` +
      rod(172, 76, 0, 22, false) + `<ellipse class="f-white" cx="181" cy="76" rx="4" ry="3.5"/>`;
    // protozoa: Giardia (pear "face") + Cryptosporidium oocyst
    s += `<g class="a-sway"><path class="f-germ" d="M228 46 C239 46 239 64 228 74 C217 64 217 46 228 46 Z"/>` +
      `<circle class="f-white" cx="224.5" cy="54" r="3"/><circle class="f-white" cx="231.5" cy="54" r="3"/><circle cx="224.5" cy="54.5" r="1.3" fill="#222"/><circle cx="231.5" cy="54.5" r="1.3" fill="#222"/>` +
      ln('M226 74 q-3 6 -1 10 M230 74 q3 6 1 10 M219 60 q-6 1 -8 5 M237 60 q6 1 8 5', 's-germ', 1.3) + '</g>' +
      `<g class="a-pulse"><circle class="f-germ" cx="270" cy="60" r="11"/>${ln('M263 56 q4 -4 8 0 M266 64 q4 4 8 0 M271 53 q4 3 3 8 M262 63 q-2 -4 1 -8', 's-white', 1.6)}</g>`;
    const tg = (x, y, t) => tag(x, y, t, 'ans', 9);
    s += tg(52, 92, 'norovirus') + tg(52, 112, 'rotavirus') +
      tg(150, 92, 'Salmonella') + tg(150, 110, 'Shigella') + tg(150, 128, 'Campylobacter') + tg(150, 146, 'C. difficile') +
      tg(248, 92, 'Giardia') + tg(248, 112, 'Cryptosporidium') + `<g class="ans">${ink(150, 172, 'Most acute cases are viral', 10)}</g>`;
    return s;
  })()),

  smallLarge: ART((() => {
    let s = torso(150, 24, 100, 132, false);
    const sb = 'M160 54 C184 54 184 66 160 66 L138 66 C118 66 118 82 138 82 L162 82 C182 82 182 98 162 98 L138 98 C120 98 120 112 136 112 L148 112 C160 112 158 126 120 128';
    s += T('M114 136 L114 48 Q114 40 122 40 L178 40 Q186 40 186 48 L186 112 Q186 132 166 128 Q152 126 152 150', 'large', 10) +
      `<circle class="f-large" cx="114" cy="134" r="7"/>` + T(sb, 'small', 6) +
      `<g class="ans">${ln(sb, 's-white a-flow-slow', 1.6)}</g>`;
    s += ink(98, 170, "pt's R", 9) + ink(202, 170, "pt's L", 9);
    s += tag(46, 22, 'Small int.', '', 10) + tag(254, 22, 'Large int.', '', 10) + q(46, 46) + q(254, 46);
    // small intestine: big watery stool, RLQ pain, rarely fever/blood
    s += `<g class="ans"><g class="a-pulse"><ellipse class="f-stool" cx="46" cy="52" rx="30" ry="8"/>${drop(26, 44, .8, 'f-water')}${drop(66, 44, .8, 'f-water')}</g>` +
      `${tag(46, 74, 'large, loose', '', 9.5)}${tag(46, 96, 'pain: RLQ', '', 9.5)}${ink(46, 122, 'rarely fever', 9.5)}${ink(46, 134, 'or blood', 9.5)}` +
      `${burst(124, 116, 9, 'f-bad a-pulse')}</g>`;
    // large intestine: small frequent stools, LLQ cramps, fever, blood, mucus
    s += `<g class="ans">${pop(0, '<ellipse class="f-stool" cx="232" cy="52" rx="7" ry="5"/>')}${pop(1, '<ellipse class="f-stool" cx="254" cy="52" rx="7" ry="5"/>')}${pop(2, '<ellipse class="f-stool" cx="276" cy="52" rx="7" ry="5"/>')}` +
      `${tag(254, 74, 'small, frequent', '', 9.5)}${tag(254, 96, 'cramps: LLQ', '', 9.5)}` +
      `<g class="a-bob">${thermo(232, 120)}${drop(254, 122, 1.2, 'f-blood')}${drop(276, 122, 1.2, 'f-mucus')}</g>` +
      `${ink(254, 145, 'fever, blood, mucus', 9)}${burst(176, 120, 9, 'f-bad a-pulse')}</g>`;
    return s;
  })()),

  blood: ART((() => {
    let s = '';
    [52, 150, 248].forEach(x => { s += `<ellipse class="f-white" cx="${x}" cy="104" rx="42" ry="13"/>`; });
    s += tag(52, 20, 'Frank') + tag(150, 20, 'Occult') + tag(248, 20, 'Melena') + q(52, 78) + q(150, 78) + q(248, 78);
    // frank: bright red blood on the stool
    s += `<g class="ans">${poo(52, 102, 1.7)}${ln('M38 96 q6 -4 10 2 M56 86 q5 -3 8 2 M44 79 q4 3 9 0', 's-blood', 2.6)}` +
      `<ellipse class="f-blood" cx="76" cy="106" rx="8" ry="3"/>${drop(72, 64, 1.1, 'f-blood a-drop')}${drop(30, 70, .9, 'f-blood a-drop', 'style="animation-delay:.7s"')}` +
      `${tag(52, 132, 'bright red', '', 10)}${ink(52, 152, 'on the stool', 9.5)}</g>`;
    // occult: looks normal, a test finds it (guaiac/FIT card turns blue)
    s += `<g class="ans">${poo(140, 102, 1.5)}<rect class="f-white" x="168" y="58" width="24" height="32" rx="3"/>` +
      `<rect class="f-white" x="172" y="64" width="16" height="10"/><rect class="f-vein a-blink" x="172" y="64" width="16" height="10"/><rect class="f-white" x="172" y="77" width="16" height="10"/>` +
      `<g class="a-sway"><circle cx="130" cy="78" r="11" class="f-mucus" opacity=".55"/>${ln('M138 86 l8 8', 's-line', 3.5)}</g>` +
      `${tag(150, 132, 'hidden', '', 10)}${ink(150, 152, 'found by a test', 9.5)}</g>`;
    // melena: black, tarry stool from upper GI bleeding
    s += `<g class="ans">${poo(244, 102, 1.7, 'f-tumor')}<g style="opacity:.9">${poo(244, 102, 1.7, 'f-tumor').replace(/class="f-tumor"/g, 'class="noline" style="fill:#1d1418"')}</g>` +
      `<ellipse class="f-white noline" cx="238" cy="88" rx="4" ry="1.6" opacity=".7"/><ellipse class="f-white noline" cx="250" cy="97" rx="5" ry="1.8" opacity=".6"/>` +
      `<path class="f-stomach" d="M268 40 C276 34 290 38 290 50 C290 60 278 62 272 56 C268 52 266 46 268 40 Z"/>${burst(281, 50, 5, 'f-blood a-pulse')}` +
      `${ln('M276 60 Q272 74 262 82', 's-blood a-flow', 2)}${tag(248, 132, 'black, tarry', '', 10)}${ink(248, 152, 'upper GI bleed', 9.5)}</g>`;
    return s;
  })()),

  diarAB: ART((() => {
    let s = tag(60, 22, 'Diarrhea');
    const gut = 'M14 62 H112 Q136 62 136 84 V112';
    s += T(gut, 'large', 22) + `<g class="ans">${ln(gut, 's-water a-flow', 4)}</g>`;
    s += `<g class="ans">${[0, .5, 1].map(d => drop(136, 134, 1.1, 'f-water a-drop', `style="animation-delay:${d}s"`)).join('')}${tag(70, 96, 'HCO₃⁻ lost', '', 10)}${tag(70, 118, 'in the stool', '', 9.5)}</g>`;
    s += [0, -1, -2].map(b => motion('<circle class="f-vein" r="5"/>', gut + ' V140', 3, b)).join('');
    // pH gauge
    const cx = 222, cy = 112, r = 48;
    s += `<path d="M174 112 A48 48 0 0 1 213.7 64.7" fill="none" stroke="var(--c-bad)" stroke-width="12"/><path d="M213.7 64.7 A48 48 0 0 1 230.3 64.7" fill="none" stroke="var(--c-good)" stroke-width="12"/><path d="M230.3 64.7 A48 48 0 0 1 270 112" fill="none" stroke="var(--c-vein)" stroke-width="12"/>` +
      ln('M168 112 A54 54 0 0 1 276 112', 's-line', 1.3) + ln('M180 112 A42 42 0 0 1 264 112', 's-line', 1.3) +
      ink(184, 128, 'acid', 9.5) + ink(262, 128, 'base', 9.5) + ink(222, 52, 'pH 7.35–7.45', 9.5) + ink(222, 34, 'blood', 10);
    s += `<g class="ans"><path class="s-line" d="M${cx} ${cy} L${cx} ${cy - 40}" style="stroke-width:3.5px"><animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};-56 ${cx} ${cy};-48 ${cx} ${cy};-56 ${cx} ${cy}" dur="3s" repeatCount="indefinite"/></path></g>` +
      `<circle class="f-white" cx="${cx}" cy="${cy}" r="5"/>`;
    s += qtag(222, 146, 'Metabolic acidosis') + `<g class="ans">${tag(150, 170, 'vomiting does the opposite: alkalosis', '', 9)}</g>`;
    return s;
  })()),

  diarTest: ART((() => {
    let s = ink(150, 22, 'Who needs a stool test?', 10.5);
    // specimen cup
    s += `<rect class="f-white" x="128" y="70" width="44" height="50" rx="5"/><rect class="f-good" x="124" y="62" width="52" height="10" rx="3"/>` +
      `<path class="f-stool" d="M132 116 Q132 100 150 102 Q168 100 168 116 Z"/><rect class="f-white" x="134" y="78" width="32" height="12" rx="2"/>` + q(150, 90);
    const spot = [[56, 34], [244, 34], [56, 104], [244, 104]];
    s += '<g class="ans">' + spot.map(([x, y]) => ln(`M${x < 150 ? x + 28 : x - 28} ${y + 16} L${x < 150 ? 124 : 176} ${y < 60 ? 80 : 106}`, 's-ink a-flow-slow', 1.2)).join('') + '</g>';
    spot.forEach(([x, y]) => { s += q(x, y + 12); });
    // severe illness
    s += `<g class="ans">${pop(0, person(56, 30, 1, 'f-bad') + burst(56, 47, 5, 'f-warn') + thermo(76, 36))}${tag(56, 66, 'severe illness', '', 9.5)}</g>`;
    // immunocompromised: cracked shield
    s += `<g class="ans">${pop(1, person(236, 30, 1, 'f-immune') + '<path class="f-good" d="M256 24 L268 28 L268 38 Q268 46 256 50 Q244 46 244 38 L244 28 Z"/>' + ln('M256 26 l-3 8 l5 4 l-3 10', 's-line', 1.6))}${tag(244, 66, 'immunocompromised', '', 9.5)}</g>`;
    // elderly: cane + white hair
    s += `<g class="ans">${pop(2, person(56, 100, 1, 'f-spleen') + '<path class="f-white" d="M49.5 97 Q56 88 62.5 97 Q56 93 49.5 97 Z"/>' + ln('M72 108 V126 M72 108 q4 -3 6 1', 's-line', 2.4))}${tag(56, 138, 'elderly', '', 9.5)}</g>`;
    // food handler: chef hat
    s += `<g class="ans">${pop(3, person(244, 100, 1, 'f-white') + '<path class="f-white" d="M237 95 v-4 q-4 -6 2 -9 q5 -6 10 0 q6 3 2 9 v4 Z"/>')}${tag(244, 138, 'food handler', '', 9.5)}</g>`;
    s += `<g class="ans">${tag(150, 162, 'Most acute diarrhea needs NO test', '', 9.5)}</g>`;
    return s;
  })()),

  diarTx: ART((() => {
    let s = '';
    // big glass of fluid: the empty glass shows on the front, the water fills on the back
    s += `<path class="f-white" d="M36 52 L84 52 L78 126 L42 126 Z" opacity=".9"/>` +
      `<g class="ans"><path class="f-water" d="M38.5 70 L81.5 70 L78 126 L42 126 Z"><animate attributeName="opacity" values=".4;1;1" dur="2s" repeatCount="indefinite"/></path>` +
      `${ln('M70 40 L64 110', 's-good', 3)}<text class="on" x="60" y="104" text-anchor="middle" style="font-size:11px">Na⁺ K⁺</text>` +
      [[50, 116, 0], [66, 118, .6], [58, 112, 1.1]].map(([x, y, d]) => `<circle class="f-white a-rise" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="2.5"/>`).join('') + '</g>';
    s += qtag(60, 142, '1st: fluids') + `<g class="ans">${ink(60, 162, '+ electrolytes', 9.5)}</g>`;
    // clear liquids (broth) after a short fast
    s += q(150, 50) + `<g class="ans">${pop(0, '<path class="f-warn" d="M128 46 H172 Q170 66 150 66 Q130 66 128 46 Z"/><ellipse class="f-fat" cx="150" cy="46" rx="22" ry="4"/>')}` +
      `${ln('M140 40 q-4 -6 0 -12 M150 38 q-4 -6 0 -12 M160 40 q-4 -6 0 -12', 's-ink a-rise', 1.5)}${tag(150, 80, 'clear liquids', '', 9.5)}${ink(150, 18, 'short fast, then', 9.5)}</g>`;
    // probiotics
    s += q(248, 50) + `<g class="ans">${pop(1, pill(248, 42, -25, 'good', 'white'))}` +
      [[230, 58], [266, 56], [256, 66]].map(([x, y], i) => `<g class="a-bob" style="animation-delay:${i * .4}s">${rod(x, y, i * 40, 10, false, 'f-good')}</g>`).join('') + `${tag(248, 80, 'probiotics', '', 9.5)}</g>`;
    // skip dairy + fatty food
    s += q(150, 118) + `<g class="ans">${pop(2, '<path class="f-white" d="M126 106 h14 v-6 l-7 -6 l-7 6 Z M126 106 h14 v22 h-14 Z"/><path class="f-food" d="M152 118 Q162 104 172 118 Z"/><rect class="f-good" x="151" y="118" width="22" height="3"/><path class="f-food" d="M152 122 h20 q0 6 -10 6 q-10 0 -10 -6 Z"/>')}` +
      `${no(150, 116, 26, 'class="a-pulse"')}${tag(150, 154, 'skip dairy + fat', '', 9.5)}</g>`;
    // hold antidiarrheals
    s += q(248, 118) + `<g class="ans">${pop(3, pill(238, 116, -30, 'bad', 'white') + `<rect class="f-warn" x="252" y="104" width="22" height="22" rx="5"/><rect class="f-white noline" x="258" y="109" width="4" height="12"/><rect class="f-white noline" x="264" y="109" width="4" height="12"/>`)}` +
      `<g class="a-blink">${tag(248, 146, 'often HOLD', '', 9.5)}</g>${ink(248, 164, 'antidiarrheals', 9.5)}</g>`;
    return s;
  })()),

  hold: ART((() => {
    let s = '';
    const row = (y, lab) => ink(14, y - 22, lab, 10, '', 'start') + T(`M20 ${y} H244`, 'large', 26) +
      [60, 120, 190].map((x, i) => rod(x, y - 4 + i % 2 * 8, i * 30, 12, true)).join('');
    s += row(48, 'Gut moving fast: germs + toxins flushed out') + row(122, 'Gut slowed by an antidiarrheal');
    s += `<path class="f-white" d="M250 40 l14 8 l-14 8 Z" opacity=".9"/>` + ink(278, 52, 'out', 10);
    s += [0, -.6, -1.2, -1.8].map(b => motion('<circle class="f-bile" r="3.5"/>', 'M30 52 H262', 2.4, b)).join('');
    s += pill(272, 104, -30, 'bad', 'white', 'class="a-shake"') +
      `<rect class="f-warn" x="252" y="116" width="34" height="14" rx="4"/><text class="tagtx" x="269" y="126" text-anchor="middle" style="font-size:9px">SLOW</text>`;
    s += q(130, 122);
    s += `<g class="ans">${ln('M20 122 H244', 's-bad a-blink', 30).replace('stroke-width:30px', 'stroke-width:30px;opacity:.35')}` +
      [[40, 118], [70, 128], [96, 116], [124, 126], [150, 118], [176, 128], [204, 118], [228, 126], [84, 122], [190, 122], [140, 130], [112, 114]]
        .map(([x, y], i) => `<circle class="f-bile a-grow" style="animation-delay:${(i % 4) * .4}s" cx="${x}" cy="${y}" r="3.6"/>`).join('') +
      `${tag(84, 156, 'toxins build up', '', 10)}<path class="f-white noline" d="M150 150 l10 6 l-10 6 Z" opacity=".8"/>${tag(214, 156, 'diarrhea worse', '', 10)}</g>`;
    return s;
  })()),

  rota: ART((() => {
    const X = m => 24 + m * 21;
    let s = '';
    // baby getting oral drops
    s += `<circle class="f-skin" cx="38" cy="42" r="17"/><path class="f-food" d="M26 32 Q38 18 50 32 Q44 26 38 30 Q32 26 26 32 Z"/>` +
      `<circle cx="32" cy="41" r="1.8" fill="#222"/><circle cx="44" cy="41" r="1.8" fill="#222"/><ellipse class="f-mouth" cx="38" cy="50" rx="4" ry="3"/>` +
      `<g transform="translate(-12 16) rotate(35 62 34)"><rect class="f-white" x="58" y="8" width="8" height="26" rx="2"/><rect class="f-pancreas" x="57" y="2" width="10" height="8" rx="3"/></g>` +
      `<g class="ans">${drop(49, 44, .7, 'f-pancreas a-drop')}</g>` + ink(86, 30, 'oral drops', 9.5, '', 'start');
    s += wheel(262, 32, 13, 'class="a-spin"') + tag(262, 60, 'rotavirus', '', 9.5);
    // timeline in months
    s += `<rect class="f-white" x="${X(0)}" y="116" width="${X(12) - X(0)}" height="10" rx="5" opacity=".7"/>`;
    for (let m = 0; m <= 12; m++) s += ln(`M${X(m)} 126 v${m % 2 ? 4 : 7}`, 's-ink', 1.4) + (m % 2 ? '' : ink(X(m), 144, String(m), 10));
    s += ink(150, 162, 'baby\'s age in months', 10);
    s += `<g class="ans"><rect class="f-good" x="${X(2)}" y="114" width="${X(8) - X(2)}" height="14" rx="4"/>` +
      `<rect class="f-bad" x="${X(8)}" y="116" width="${X(12) - X(8)}" height="10" rx="3" opacity=".45"/>${ln(`M${X(8)} 104 V132`, 's-bad', 3)}` +
      [2, 4, 6].map((m, i) => pop(i, drop(X(m), 110, 1.3, 'f-pancreas'))).join('') + `${ink(X(4), 96, '2 or 3 doses', 9.5)}</g>`;
    s += qtag(X(2), 78, 'Start: 2 mo') + qtag(X(8) + 14, 78, 'Done by 8 mo');
    return s;
  })()),

  /* ---------------- CONSTIPATION ---------------- */
  constip: ART((() => {
    let s = '';
    const col = 'M120 132 L120 46 Q120 38 128 38 L172 38 Q180 38 180 46 L180 110 Q180 128 162 124 Q152 122 152 140';
    s += T(col, 'large', 14) + `<circle class="f-large" cx="120" cy="130" r="8"/>`;
    s += [[180, 72], [180, 92], [176, 112], [162, 124]].map(([x, y]) => `<circle class="f-stool a-shake" cx="${x}" cy="${y}" r="5"/>`).join('');
    s += motion('<circle class="f-stool" r="4.5"/>', 'M120 120 V46 Q120 38 128 38 H172 Q180 38 180 46 V62', 10);
    s += ink(150, 18, 'Hard, slow stool', 10);
    // icons in the middle of the colon
    s += `<g class="ans">${pop(0, '<circle class="f-good" cx="136" cy="64" r="6"/><circle class="f-good" cx="143" cy="60" r="6"/><circle class="f-good" cx="142" cy="68" r="5"/><rect class="f-good" x="137" y="70" width="4" height="10"/>' + no(140, 66, 11))}` +
      `${pop(1, pill(164, 66, -30, 'bad', 'white'))}${pop(2, '<rect class="f-spleen" x="134" y="94" width="34" height="12" rx="4"/><rect class="f-spleen" x="134" y="88" width="34" height="8" rx="3"/>')}</g>`;
    const L = ['low fiber/fluid', 'inactivity', 'ignoring urge', 'laxative overuse'], R = ['opioids, iron', 'anticholinergics', 'pregnancy, IBS', 'nerve disease'];
    L.forEach((t, i) => { s += pop(i, qtag(54, 40 + i * 34, t, 9.5)); });
    R.forEach((t, i) => { s += pop(i + 4, qtag(248, 40 + i * 34, t, 9.5)); });
    return s;
  })()),

  constipSx: ART((() => {
    let s = ln('M150 8 V172 M8 92 H292', 's-ink', 1).replace('/>', ' opacity=".3"/>');
    // calendar: no BM for 3+ days
    s += `<rect class="f-white" x="30" y="10" width="90" height="54" rx="5"/><rect class="f-bad" x="30" y="10" width="90" height="12" rx="4"/>` +
      [0, 1, 2, 3].map(i => ln(`M${30 + i * 22.5} 22 V64`, 's-line', 1)).join('') +
      [1, 2, 3, 4].map(i => `<text x="${30 + (i - .5) * 22.5}" y="34" text-anchor="middle" style="font-size:9px;fill:#555">${i}</text>`).join('') +
      `<g class="ans">${[0, 1, 2, 3].map(i => pop(i, ln(`M${36 + i * 22.5} 40 l11 16 M${47 + i * 22.5} 40 l-11 16`, 's-bad', 3))).join('')}</g>` +
      qtag(75, 78, 'no BM > 3 days');
    // stopwatch: straining over 10 minutes
    s += `<rect class="f-scar" x="220" y="6" width="10" height="7" rx="2"/><circle class="f-white" cx="225" cy="38" r="24"/>` +
      [0, 1, 2, 3].map(i => { const a = i * Math.PI / 2; return ln(`M${f(225 + Math.sin(a) * 19)} ${f(38 - Math.cos(a) * 19)} L${f(225 + Math.sin(a) * 23)} ${f(38 - Math.cos(a) * 23)}`, 's-line', 1.5); }).join('') +
      `<g class="ans"><path d="M225 38 L225 16 A22 22 0 1 1 205.9 49 Z" fill="var(--c-warn)" opacity=".6"/>` +
      `<path class="s-line" d="M225 38 L225 18" style="stroke-width:2.5px"><animateTransform attributeName="transform" type="rotate" values="0 225 38;240 225 38;250 225 38" keyTimes="0;.8;1" dur="3s" repeatCount="indefinite"/></path></g>` +
      `<circle class="f-line" cx="225" cy="38" r="2.5" style="fill:var(--art-line)"/>` + qtag(225, 78, 'straining > 10 min');
    // painful passage
    s += [[60, 118], [74, 114], [88, 120], [72, 128]].map(([x, y]) => `<circle class="f-stool" cx="${x}" cy="${y}" r="7"/>`).join('') +
      `<g class="ans">${burst(98, 112, 13, 'f-warn a-pulse')}${ln('M44 104 l-6 -6 M42 120 h-8 M46 134 l-6 6', 's-bad a-blink', 2.4)}</g>` + qtag(75, 158, 'painful passage');
    // stethoscope: hypoactive bowel sounds
    s += `<circle class="f-scar" cx="190" cy="120" r="10"/><circle class="f-white" cx="190" cy="120" r="5"/>` + ln('M190 110 Q190 98 172 100 Q160 102 166 112', 's-line', 2.5) +
      `<g class="ans">${ln('M206 120 H218 l3 -3 l3 3 H246 l3 -4 l3 4 H286', 's-good a-draw', 2.2)}${ink(246, 140, 'quiet', 9.5)}</g>` + qtag(225, 162, 'hypoactive bowel sounds', 9.5);
    return s;
  })()),

  constipCx: ART((() => {
    let s = '';
    const sig = 'M244 6 L244 54 C244 92 200 94 198 66 C196 40 150 40 150 70 L150 92';
    s += T(sig, 'large', 16);
    s += `<path class="f-large" d="M136 92 H164 V136 Q164 144 158 146 H142 Q136 144 136 136 Z"/>` + `<rect class="f-muscle" x="143" y="146" width="14" height="22" rx="4"/>` + ln('M150 148 V168', 's-line', 1.5);
    s += ink(150, 178, 'anus', 9);
    // complications
    s += `<g class="ans"><ellipse class="f-stool a-shake" cx="150" cy="118" rx="11" ry="20"/>` +
      `<circle class="f-large" cx="220" cy="92" r="5"/><circle class="f-bad a-pulse" cx="204" cy="94" r="6"/><circle class="f-large" cx="186" cy="84" r="4.5"/>` +
      `<circle class="f-stool" cx="244" cy="22" r="5"/><circle class="f-stool" cx="244" cy="36" r="5"/><circle class="f-stool" cx="242" cy="50" r="5"/>` +
      `<ellipse class="f-spleen a-pulse" cx="140" cy="164" rx="6" ry="5"/><ellipse class="f-spleen a-pulse" cx="160" cy="164" rx="6" ry="5" style="animation-delay:.4s"/>` +
      `${ln('M150 150 l-3 4 l4 3 l-3 4', 's-white', 2)}${drop(150, 176, .6, 'f-blood a-drop')}</g>`;
    const lead = 's-ink';
    s += `<g class="ans">${ln('M96 116 H136 M100 144 L145 152 M100 168 L136 164 M228 120 L206 100 M200 22 L234 30', lead, 1).replace('/>', ' style="stroke-dasharray:2 3;stroke-width:1px"/>')}</g>`;
    s += qtag(62, 116, 'Impaction') + qtag(62, 144, 'Anal fissure') + qtag(62, 168, 'Hemorrhoids') +
      qtag(250, 128, 'Diverticulitis') + qtag(166, 18, 'Obstruction');
    return s;
  })()),

  constipTx: ART((() => {
    let s = '';
    const col = 'M128 128 L128 50 Q128 42 136 42 L164 42 Q172 42 172 50 L172 110 Q172 126 158 122 Q150 120 150 136';
    s += T(col, 'large', 12) + `<circle class="f-large" cx="128" cy="126" r="7"/>`;
    s += [[172, 76], [172, 96], [164, 120]].map(([x, y]) => `<circle class="f-stool" cx="${x}" cy="${y}" r="4.5"/>`).join('');
    s += ink(150, 22, 'Keep stool soft + moving', 10);
    // soft stool sliding through on the back
    s += motion('<ellipse class="f-stool" rx="5" ry="3.5"/>', 'M128 120 V50 Q128 42 136 42 H164 Q172 42 172 50 V110 Q172 126 158 122 Q150 120 150 140', 3.5);
    s += [0, -1.75].map(b => motion('<circle class="f-water" r="3"/>', 'M128 120 V50 Q128 42 136 42 H164 Q172 42 172 50 V110 Q172 126 158 122 Q150 120 150 140', 3.5, b)).join('');
    const icons = [
      '<path class="f-good" d="M8 30 q8 -14 16 0 Z"/><rect class="f-food" x="6" y="30" width="20" height="8" rx="3"/>',
      '<path class="f-white" d="M8 66 h16 l-2 20 h-12 Z"/><path class="f-water" d="M9 72 h14 l-1.4 14 h-11.2 Z"/>',
      '<g class="a-bob"><circle class="f-skin" cx="16" cy="112" r="4.5"/>' + ln('M16 117 v12 M16 129 l-6 9 M16 129 l6 9 M16 120 l-7 6 M16 120 l7 4', 's-line', 2.6) + '</g>',
      '<circle class="f-white" cx="284" cy="34" r="10"/>' + ln('M284 34 V27 M284 34 l5 3', 's-line', 1.6) + burst(296, 26, 4, 'f-warn a-pulse'),
      pill(284, 84, -30, 'immune', 'white') + drop(292, 74, .6, 'f-water a-drop'),
      '<rect class="f-warn" x="278" y="114" width="12" height="20" rx="3"/><rect class="f-white" x="280" y="110" width="8" height="5"/>' + no(284, 124, 12)
    ];
    const tags = [[66, 34, 'more fiber'], [66, 78, 'more water'], [66, 124, 'more activity'], [232, 34, 'go at the urge'], [232, 80, 'stool softener'], [232, 124, 'limit laxatives']];
    tags.forEach(([x, y, t], i) => { s += `<g class="ans">${pop(i, icons[i])}</g>` + qtag(x, y, t, 9.5); });
    s += `<g class="ans">${ink(232, 142, '+ enemas', 9)}</g>`;
    return s;
  })()),

  /* ---------------- OBSTRUCTION ---------------- */
  obstrType: ART((() => {
    let s = tag(76, 18, 'Mechanical') + tag(224, 18, 'Functional (ileus)');
    s += `<g class="q"><rect class="f-small" x="14" y="60" width="124" height="22" rx="11"/><rect class="f-small" x="162" y="60" width="124" height="22" rx="11"/></g>` + q(76, 71) + q(224, 71);
    // mechanical: dilated before the block, collapsed after
    s += `<g class="ans"><rect class="f-small" x="14" y="46" width="80" height="50" rx="20"/><rect class="f-water noline" x="18" y="74" width="72" height="18" rx="6" opacity=".9"/>` +
      `<rect class="f-small" x="100" y="65" width="40" height="12" rx="6"/><rect class="f-tumor" x="90" y="52" width="12" height="38" rx="5"/>` +
      [[34, 66, 0], [56, 62, .6], [76, 68, 1.1]].map(([x, y, d]) => `<circle class="f-white a-rise" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="3.5"/>`).join('') +
      `${tag(76, 112, 'physical block', '', 10)}${ink(76, 132, 'adhesion, hernia,', 9.5)}${ink(76, 144, 'tumor', 9.5)}</g>`;
    s += motion('<circle class="f-food" r="4"/>', 'M20 70 H84', 2, 0, 'keyPoints="0;1;1" keyTimes="0;.6;1" calcMode="linear"');
    // functional: no block, the gut just stops moving
    s += `<g class="ans"><rect class="f-small" x="162" y="54" width="124" height="34" rx="15"/>${ln('M170 71 H278', 's-line', 1.5).replace('/>', ' style="stroke-width:1.5px;stroke-dasharray:4 4"/>')}` +
      `<g class="a-rise"><text class="ink" x="250" y="48" style="font-size:12px;font-weight:800">z</text></g><g class="a-rise" style="animation-delay:.6s"><text class="ink" x="262" y="44" style="font-size:14px;font-weight:800">Z</text></g>` +
      `${tag(224, 112, 'gut stops moving', '', 10)}${ink(224, 132, 'surgery, opioids,', 9.5)}${ink(224, 144, 'low K⁺, infection', 9.5)}</g>`;
    s += `<g class="ans">${ink(76, 168, 'gas + fluid back up', 9.5)}${ink(224, 168, 'no peristalsis', 9.5)}</g>`;
    return s;
  })()),

  sbo: ART((() => {
    let s = tag(76, 14, 'Small bowel') + tag(224, 14, 'Large bowel') + ln('M150 6 V174', 's-ink', 1).replace('/>', ' opacity=".3"/>');
    // small bowel loops
    const sb = 'M18 40 H118 Q134 40 134 54 Q134 68 118 68 H34 Q18 68 18 82 Q18 96 34 96 H118 Q134 96 134 110 Q134 124 110 124 H80';
    s += T(sb, 'small', 9);
    s += ln('M10 136 H70 M90 136 H142', 's-muscle', 4);
    s += `<g class="ans"><rect class="f-scar" x="72" y="42" width="7" height="26" rx="3" transform="rotate(10 75 55)"/>` +
      `<path class="f-skin" d="M70 136 Q70 162 80 164 Q90 162 90 136 Z" opacity=".8"/>${T('M80 124 Q72 132 76 150 Q80 158 84 150 Q88 132 80 124', 'small', 6)}` +
      `<g class="a-pulse"><text class="ink" x="14" y="166" style="font-size:15px;font-weight:800">~90%</text></g></g>`;
    s += qtag(42, 54, 'adhesions', 9.5) + qtag(118, 152, 'hernias', 9.5);
    // large bowel frame
    const col = 'M170 136 V42 Q170 32 180 32 H268 Q278 32 278 42 V104 C278 132 246 134 238 122 C230 110 214 118 214 150';
    s += T(col, 'large', 12) + `<circle class="f-large" cx="170" cy="134" r="8"/>`;
    s += `<g class="ans"><path class="f-tumor a-pulse" d="M212 24 q8 6 16 0 v6 q-8 4 -16 0 Z M212 40 q8 -6 16 0 v-6 q-8 -4 -16 0 Z"/>` +
      `<circle class="f-large" cx="288" cy="70" r="4.5"/><circle class="f-bad a-pulse" cx="288" cy="86" r="5"/><circle class="f-large" cx="288" cy="100" r="4"/>` +
      `<g class="a-spin">${ln('M236 112 a10 10 0 1 1 -2 14', 's-warn', 2.4)}<path class="f-warn" d="M231 125 l6 4 l-7 3 Z"/></g></g>`;
    s += qtag(220, 56, 'tumors', 9.5) + qtag(242, 84, 'diverticulitis', 9.5) + qtag(262, 158, 'volvulus', 9.5);
    return s;
  })()),

  intuss: ART((() => {
    let s = tag(76, 18, 'Intussusception') + tag(224, 18, 'Volvulus');
    // front: plain normal bowel
    s += `<g class="q"><rect class="f-small" x="14" y="64" width="124" height="24" rx="10"/>${T('M204 150 V70 Q204 40 224 40 Q244 40 244 70 V150', 'small', 14)}</g>`;
    // intussusception: proximal bowel slides (telescopes) into the next part
    s += `<g class="ans"><g><rect class="f-small" x="2" y="64" width="78" height="24" rx="10"/><rect class="f-small" x="64" y="66" width="24" height="20" rx="9" opacity=".9"/>` +
      `<animateTransform attributeName="transform" type="translate" values="0 0;26 0;26 0;0 0" keyTimes="0;.45;.75;1" dur="3s" repeatCount="indefinite"/></g>` +
      `<rect class="f-small" x="72" y="54" width="68" height="44" rx="14" style="fill-opacity:.4"/>${ln('M150 76 l-6 -5 M150 76 l-6 5', 's-ink', 2)}</g>`;
    s += qtag(76, 124, 'telescopes into itself') + `<g class="ans">${ink(76, 146, 'like a collapsing', 9.5)}${ink(76, 158, 'telescope', 9.5)}</g>`;
    // volvulus: loop twists around its own base
    s += `<g class="ans"><path class="f-fat" d="M210 130 L224 70 L238 130 Z" opacity=".7"/>${T('M244 150 C244 126 206 120 206 92 Q206 44 224 44 Q242 44 242 92 C242 120 204 126 204 150', 'small', 13)}` +
      `<g class="a-spin">${ln('M210 124 a16 6 0 1 0 28 0', 's-warn', 2.6)}<path class="f-warn" d="M206 122 l4 7 l5 -6 Z"/></g></g>`;
    s += qtag(224, 164, 'twists on itself');
    return s;
  })()),

  obstrPath: ART((() => {
    let s = '';
    s += `<rect class="f-small" x="16" y="48" width="178" height="58" rx="26"/>` + `<rect class="f-small" x="200" y="70" width="86" height="14" rx="7"/>` +
      `<rect class="f-scar" x="190" y="58" width="14" height="38" rx="5"/>`;
    // 1: fluid + gas pile up
    s += `<g class="ans"><rect class="f-water noline" x="22" y="78" width="166" height="24" rx="10" opacity=".9"><animate attributeName="y" values="92;78;78" dur="4s" repeatCount="indefinite"/><animate attributeName="height" values="10;24;24" dur="4s" repeatCount="indefinite"/></rect>` +
      [[40, 70, 0], [80, 66, .5], [120, 70, 1], [100, 62, 1.4]].map(([x, y, d]) => `<circle class="f-white a-rise" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="4"/>`).join('') + '</g>';
    // 2: blood supply cut off
    s += `<path class="f-fat" d="M70 106 L110 160 L150 106 Z" opacity=".6"/>` + ln('M110 160 V112 M110 140 L84 112 M110 140 L136 112', 's-blood', 3) +
      `<g class="ans">${ln('M110 160 V112 M110 140 L84 112 M110 140 L136 112', 's-white a-flow', 1.6)}${no(110, 132, 9, 'class="a-blink"')}</g>`;
    // 3: necrosis + perforation, then shock
    s += `<g class="ans"><ellipse class="f-tumor a-blink" cx="160" cy="56" rx="18" ry="8"/><circle cx="160" cy="54" r="4" fill="#111"/>` +
      [0, .5, 1].map(d => `<circle class="f-stool a-rise" style="animation-delay:${d}s" cx="${156 + d * 8}" cy="44" r="2.5"/>`).join('') +
      `${heart(250, 120, 1.3, 'class="a-beat"')}<text class="ink" x="266" y="124" style="font-size:9.5px;font-weight:800">BP↓</text></g>`;
    s += qtag(76, 28, '1 fluid + gas build up', 10) + qtag(220, 28, '3 necrosis, perforation', 10) + qtag(52, 150, '2 blood flow cut', 10) + qtag(238, 152, 'shock in hours', 10);
    return s;
  })()),

  obstrSx: ART((() => {
    let s = '';
    s += `<circle class="f-skin" cx="38" cy="28" r="13"/>` + ln('M44 22 l3 1', 's-line', 1.5);
    s += `<g class="q"><path class="f-immune" d="M28 44 Q24 90 28 124 L30 172 L46 172 L46 128 Q58 120 58 96 Q58 60 50 44 Z"/></g>`;
    s += `<g class="ans"><path class="f-immune" d="M28 44 Q24 90 28 124 L30 172 L46 172 L46 128 Q58 120 58 96 Q58 60 50 44 Z"/>` +
      `<ellipse class="f-skin a-grow" cx="56" cy="98" rx="26" ry="26"/>${burst(60, 98, 8, 'f-bad a-pulse')}` +
      [0, .5, 1].map(d => drop(56 + d * 6, 44 + d * 4, .8, 'f-bile a-drop', `style="animation-delay:${d}s"`)).join('') + '</g>';
    s += qtag(130, 38, 'vomiting', 9.5) + qtag(130, 70, 'distention', 9.5) + qtag(130, 100, 'colicky cramps', 9.5) + qtag(130, 132, 'no stool, no gas', 9.5);
    s += `<g class="ans">${no(130, 156, 9)}<ellipse class="f-stool" cx="130" cy="157" rx="5" ry="3.5"/></g>`;
    // bowel sounds over time
    s += tag(242, 14, 'bowel sounds', '', 9.5) + `<rect class="f-white" x="190" y="26" width="104" height="94" rx="8" opacity=".85"/>`;
    s += `<g class="ans"><text class="tagtx" x="196" y="44" style="font-size:9.5px">early: loud rushes</text>${ln('M196 62 l6 0 l3 -12 l4 22 l3 -16 l4 12 l3 -8 l4 4 H226 l3 -12 l4 22 l3 -16 l4 12 l3 -6 H288', 's-good a-draw', 2)}` +
      `<text class="tagtx" x="196" y="92" style="font-size:9.5px">late: quiet/absent</text>${ln('M196 108 H240 l2 -2 l2 2 H288', 's-bad a-draw', 2)}</g>` + q(242, 72);
    s += `<g class="ans">${heart(206, 146, 1.3, 'class="a-beat" style="animation-duration:.45s"')}${tag(254, 146, 'then shock', '', 9.5)}</g>` + q(206, 146);
    return s;
  })()),

  obstrDx: ART((() => {
    let s = `<rect x="58" y="4" width="184" height="172" rx="8" style="fill:#0d1016;stroke:var(--art-line)"/>` +
      `<path d="M78 14 Q150 0 222 14 L230 160 Q150 176 70 160 Z" style="fill:#4b525e"/>`;
    // ribs, spine, pelvis
    s += ln('M150 22 Q110 22 86 40 M150 34 Q112 34 84 54 M150 22 Q190 22 214 40 M150 34 Q188 34 216 54', 's-white', 2.2).replace('/>', ' opacity=".5"/>');
    for (let y = 18; y < 132; y += 12) s += `<rect class="f-bone noline" x="143" y="${y}" width="14" height="9" rx="2" opacity=".85"/>`;
    s += `<path class="f-bone noline" opacity=".85" d="M150 134 C128 132 100 132 92 146 C88 156 102 164 116 158 C126 154 134 158 140 166 L160 166 C166 158 174 154 184 158 C198 164 212 156 208 146 C200 132 172 132 150 134 Z"/>`;
    s += tag(28, 14, 'Upright', '', 9) + tag(28, 32, 'X-ray', '', 9);
    // dilated loops with air-fluid levels (step-ladder)
    const loops = [[94, 50], [176, 46], [118, 80], [196, 84], [96, 110], [170, 116]];
    s += '<g class="ans">' + loops.map(([x, y], i) => `<g class="a-pop" style="--d:${i}"><rect x="${x - 22}" y="${y - 13}" width="44" height="26" rx="12" style="fill:#07090c;stroke:#e6ecf2;stroke-width:2.5"/>` +
      `<path d="M${x - 20} ${y + 2} H${x + 20} V${y + 4} Q${x + 20} ${y + 11} ${x + 12} ${y + 11} H${x - 12} Q${x - 20} ${y + 11} ${x - 20} ${y + 4} Z" class="f-water noline" opacity=".9"/>` +
      ln(`M${x - 21} ${y + 2} H${x + 21}`, 's-white a-blink', 1.8) + ln(`M${x - 8} ${y - 12} V${y + 1} M${x + 6} ${y - 12} V${y + 1}`, 's-white', 1).replace('/>', ' opacity=".5"/>') + '</g>').join('') + '</g>';
    s += motion('<rect x="-90" y="-1" width="180" height="2" fill="#7df9ff" opacity=".7"/>', 'M150 8 V172', 3);
    s += q(150, 80) + `<g class="ans">${ln('M40 62 L68 50', 's-ink', 1)}${tag(30, 62, 'gas', '', 9.5)}${ln('M40 86 L72 82', 's-ink', 1)}${tag(30, 86, 'fluid', '', 9.5)}</g>`;
    s += qtag(150, 162, 'Air-fluid levels', 10);
    s += `<g class="ans">${ink(270, 60, 'dilated', 9.5)}${ink(270, 72, 'gas-filled', 9.5)}${ink(270, 84, 'loops', 9.5)}` +
      `<circle cx="270" cy="122" r="16" fill="none" stroke="var(--c-immune)" stroke-width="7"/><circle cx="270" cy="122" r="16" fill="none" class="s-white a-spin" style="stroke-width:2px;stroke-dasharray:8 92"/>${tag(270, 152, 'CT confirms', '', 9)}</g>`;
    return s;
  })()),

  obstrTx: ART((() => {
    let s = '';
    s += `<path class="f-immune" d="M74 70 Q74 58 92 58 H128 Q146 58 146 70 L150 176 H70 Z"/><circle class="f-skin" cx="110" cy="36" r="18"/>` +
      `<path class="f-stomach" d="M102 92 C110 84 128 86 132 98 C136 112 124 120 114 116 C106 112 100 104 102 92 Z"/>`;
    s += q(146, 26) + q(36, 70) + q(250, 30) + q(250, 86) + q(250, 140);
    // NG tube from the nose to the stomach, out to wall suction
    s += `<g class="ans">${ln('M118 38 Q124 50 118 60 L116 100', 's-line', 2.5)}${ln('M118 38 Q124 50 118 60 L116 100', 's-bile a-flow', 1.4).replace('a-flow', 'a-flow')}` +
      `${ln('M118 38 Q130 18 160 20 L174 22', 's-line', 2.5)}${ln('M174 22 L160 20 Q130 18 118 38', 's-bile a-flow', 1.4)}` +
      `<rect class="f-white" x="174" y="8" width="26" height="34" rx="4"/><rect class="f-bile noline" x="177" y="24" width="20" height="15" rx="2"/>` +
      `${tag(176, 54, 'NG to suction', '', 9)}</g>`;
    // IV bag dripping
    s += `<g class="ans">${bag(26, 14, 'f-water')}${ln('M26 44 Q26 90 76 110', 's-line', 1.5)}${drop(26, 54, .6, 'f-water a-drop')}${tag(34, 86, 'IV fluids', '', 9)}${ink(34, 102, '+ electrolytes', 9)}</g>`;
    // right column
    s += `<g class="ans">${pop(0, '<g class="a-bob"><circle class="f-skin" cx="232" cy="16" r="5"/>' + ln('M232 21 v13 M232 34 l-6 10 M232 34 l7 9 M232 25 l-7 6 M232 25 l8 3', 's-line', 2.8) + '</g>')}${tag(266, 32, 'walk', '', 9.5)}${ink(250, 60, '(helps ileus)', 9)}` +
      `${pop(1, '<rect class="f-warn" x="228" y="78" width="14" height="22" rx="3"/><rect class="f-white" x="231" y="73" width="8" height="6"/>' + no(235, 89, 13))}${tag(272, 90, 'no', '', 9.5)}${ink(250, 114, 'laxatives', 9)}` +
      `${pop(2, '<path class="f-white" d="M222 140 L250 132 L252 136 Z"/><rect class="f-scar" x="250" y="131" width="22" height="6" rx="3" transform="rotate(-16 250 134)"/>')}${tag(258, 152, 'surgery', '', 9.5)}${ink(250, 170, 'for mechanical', 9)}</g>`;
    return s;
  })()),

  /* ---------------- APPENDICITIS ---------------- */
  appy: ART((() => {
    let s = '';
    s += `<path class="f-large" d="M98 0 H146 V58 Q160 84 140 104 Q120 116 100 104 Q86 92 92 70 Z"/>` + ln('M98 20 q24 6 48 0 M98 40 q24 6 48 0', 's-line', 1.4);
    s += T('M8 84 Q50 74 94 80', 'small', 16);
    s += tag(34, 62, 'ileum', '', 9.5) + tag(122, 12, 'cecum + colon', '', 9);
    // front: normal thin appendix
    s += `<g class="q">${T('M118 108 Q122 132 112 148 Q104 160 114 166', 'large', 7)}</g>` + q(126, 136);
    // back: blocked, swollen, infected, ischemic
    s += `<g class="ans"><g class="a-pulse">${T('M118 108 Q124 132 112 148 Q104 160 116 166', 'bad', 16)}</g>` +
      `<circle class="f-stool" cx="118" cy="110" r="6"/>${ln('M115 108 l3 3 M120 107 l-2 4', 's-line', 1)}` +
      [[118, 126], [114, 140], [108, 152], [122, 134], [112, 160]].map(([x, y], i) => pop(i + 1, `<circle class="f-germ" cx="${x}" cy="${y}" r="2.6"/>`)).join('') +
      `<ellipse class="f-tumor a-blink" cx="114" cy="164" rx="7" ry="5"/>${burst(124, 172, 7, 'f-warn a-beat')}</g>`;
    s += `<g class="ans">${ln('M124 110 L168 60 M128 138 L164 96 M124 166 L164 132', 's-ink', 1).replace('/>', ' style="stroke-width:1px;stroke-dasharray:2 3"/>')}</g>`;
    s += qtag(230, 60, '1 fecalith blocks it', 9.5) + qtag(230, 96, '2 swells, bacteria grow', 9.5) + qtag(230, 132, '3 ischemia → rupture', 9.5);
    s += `<g class="ans">${tag(230, 164, 'peak age 10–19', '', 9.5)}</g>`;
    s += ink(48, 166, 'appendix ↗', 9.5);
    return s;
  })()),

  appyPain: ART((() => {
    const nx = 150, ny = 88, ax = 100, ay = 132, mx = f(ax + (nx - ax) / 3), my = f(ay + (ny - ay) / 3);
    let s = torso(150, 20, 112, 140, false);
    s += ln('M150 24 V156 M96 88 H204', 's-line', 1).replace('/>', ' style="stroke-width:1px;stroke-dasharray:3 3" opacity=".5"/>');
    s += `<circle class="f-white" cx="${nx}" cy="${ny}" r="4"/>` + ln(`M${nx - 3} ${ny} q3 3.5 6 0`, 's-line', 1.4);
    s += `<circle class="f-bone" cx="${ax}" cy="${ay}" r="4"/><circle class="f-bone" cx="200" cy="132" r="4"/>`;
    s += ln(`M${ax} ${ay} L${nx} ${ny}`, 's-ink', 1).replace('/>', ' style="stroke-width:1px;stroke-dasharray:2 3"/>');
    s += ink(150, 14, "patient's R  ←      → patient's L", 9);
    // faint cecum + appendix under McBurney point
    s += `<g class="ans" opacity=".55">${T('M112 140 V96', 'large', 9)}${T(`M110 138 Q104 150 114 154`, 'bad', 5)}</g>`;
    s += `<g class="ans"><circle cx="${mx}" cy="${my}" r="9" fill="none" stroke="var(--c-bad)" stroke-width="2.4" class="a-pulse"/>` +
      ln(`M${mx - 4} ${my - 4} l8 8 M${mx + 4} ${my - 4} l-8 8`, 's-bad', 2.2) + '</g>';
    s += `<g class="ansmotion"><g>${burst(0, 0, 9, 'f-warn')}<animateMotion dur="4s" repeatCount="indefinite" path="M${nx} ${ny} L${mx} ${my}" keyPoints="0;0;1;1" keyTimes="0;.3;.7;1" calcMode="linear"/></g></g>`;
    s += `<g class="ans">${ln(`M${nx + 6} ${ny - 4} L214 66`, 's-ink', 1)}${ln(`M${mx - 8} ${my + 2} L76 124`, 's-ink', 1)}${ln(`M${ax - 4} ${ay + 3} L66 156`, 's-ink', 1)}</g>`;
    s += qtag(254, 60, '1 starts at navel', 9.5) + qtag(42, 116, '2 McBurney', 9.5);
    s += `<g class="ans">${ink(42, 134, 'RLQ, 12–24 h', 9)}${tag(44, 158, 'ASIS', '', 9)}${ink(254, 132, 'If it ruptures:', 9)}${ink(254, 144, 'brief relief,', 9)}${ink(254, 156, 'then worse', 9)}${ink(254, 82, '⅓ from hip bone', 9).replace('⅓ from hip bone', '')}</g>`;
    s += `<g class="ans">${ink(254, 100, '1/3 of the way', 9)}${ink(254, 112, 'from ASIS to navel', 9)}</g>`;
    return s;
  })()),

  psoas: ART((() => {
    let s = `<rect class="f-white" x="8" y="40" width="284" height="96" rx="10" opacity=".45"/>`;
    s += ink(150, 24, 'view from above: patient lying on LEFT side', 9.5);
    // bottom (left) leg
    s += T('M168 94 L222 108 L278 114', 'skin', 18);
    // torso + head
    s += `<path class="f-skin" d="M48 70 C90 60 140 60 172 68 C184 78 182 100 168 106 C130 114 90 112 52 106 C42 96 42 80 48 70 Z"/>` +
      `<circle class="f-skin" cx="32" cy="88" r="15"/><path class="f-skin" d="M24 100 q4 6 10 4" />` + ln('M70 80 Q110 96 150 92', 's-line', 1).replace('/>', ' opacity=".4"/>');
    s += ink(110, 56, 'back', 9) + ink(110, 126, 'belly', 9);
    // psoas muscle + appendix
    s += T('M110 72 Q150 80 174 98', 'muscle', 6) + T('M150 98 q6 6 14 2', 'large', 5);
    s += tag(108, 86, 'psoas', '', 9);
    // front: right leg resting
    s += `<g class="q">${T('M168 86 L228 92 L282 98', 'skin', 18)}</g>`;
    // back: examiner extends the right hip (leg swings back)
    s += `<g class="ans"><g>${T('M168 86 L228 92 L282 98', 'skin', 18)}<path class="f-skin" d="M226 74 q8 -6 14 2 l-2 12 q-8 2 -12 -4 Z"/>` +
      `<animateTransform attributeName="transform" type="rotate" values="0 168 86;-16 168 86;-16 168 86;0 168 86" keyTimes="0;.4;.75;1" dur="3s" repeatCount="indefinite"/></g>` +
      `<g>${burst(158, 100, 11, 'f-bad')}<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.3;.42;.75;1" dur="3s" repeatCount="indefinite"/></g>` +
      `${ln('M262 60 Q252 46 236 48', 's-warn a-flow', 3)}</g>`;
    s += qtag(236, 156, 'extend right hip') + qtag(86, 156, 'RLQ pain = appendicitis', 10);
    return s;
  })()),

  appyDx: ART((() => {
    let s = '';
    // lavender-top tube (CBC)
    s += `<rect class="f-white" x="22" y="40" width="20" height="82" rx="9"/><rect class="f-blood noline" x="25" y="70" width="14" height="49" rx="6"/><rect class="f-spleen" x="19" y="30" width="26" height="14" rx="4"/>`;
    s += `<circle class="f-white" cx="96" cy="78" r="38"/>` + ln('M42 78 L58 78', 's-ink', 1.5) + q(96, 78);
    const rbc = [[76, 60], [112, 54], [118, 96], [80, 104], [96, 116], [70, 82]];
    s += rbc.map(([x, y]) => `<circle class="f-blood" cx="${x}" cy="${y}" r="5"/>`).join('');
    const wbc = [[92, 58, 0], [110, 76, 1], [82, 88, 2], [100, 96, 1], [76, 70, 0], [122, 66, 2]];
    s += '<g class="ans">' + wbc.map(([x, y, k], i) => pop(i, `<circle class="f-white" cx="${x}" cy="${y}" r="7.5" style="fill:#e9dcff"/>` +
      (k === 1 ? ln(`M${x - 3} ${y - 3} q-3 4 0 7 q4 2 6 -2`, 's-germ', 2.6) /* band: one curved nucleus */
        : `<circle class="f-germ noline" cx="${x - 3}" cy="${y - 1}" r="2"/><circle class="f-germ noline" cx="${x + 1}" cy="${y - 3}" r="2"/><circle class="f-germ noline" cx="${x + 3}" cy="${y + 2}" r="2"/>`))).join('') +
      `<g class="a-bob">${ln('M136 52 V30 M128 38 l8 -8 l8 8', 's-bad', 3)}</g></g>`;
    s += qtag(78, 140, 'high WBC + bands', 10);
    // CT scanner
    s += `<rect class="f-scar" x="168" y="86" width="120" height="8" rx="3"/><circle cx="226" cy="70" r="30" fill="none" stroke="var(--c-immune)" stroke-width="14"/>` +
      `<circle cx="226" cy="70" r="30" fill="none" class="s-line" style="stroke-width:1.2px"/><circle cx="226" cy="70" r="37" fill="none" class="s-line" style="stroke-width:1.2px"/>` +
      `<g class="ans"><circle cx="226" cy="70" r="30" fill="none" class="s-white a-spin" style="stroke-width:4px;stroke-dasharray:20 168"/></g>` +
      `<circle class="f-skin" cx="262" cy="82" r="5"/><rect class="f-immune" x="196" y="78" width="62" height="9" rx="4"/>`;
    s += qtag(226, 124, 'CT preferred', 10) + `<g class="ans">${tag(222, 148, 'ultrasound or MRI:', '', 9.5)}${ink(222, 168, 'kids + pregnancy', 9.5)}</g>`;
    return s;
  })()),

  appyTx: ART((() => {
    let s = torso(104, 22, 116, 136);
    s += T('M66 140 V48 Q66 40 74 40 H134 Q142 40 142 48 V112 Q142 130 120 128 Q106 126 106 150', 'large', 10).replace(/<path/g, '<path opacity=".7"');
    s += `<circle class="f-large" cx="66" cy="138" r="7"/>`;
    s += `<g class="q">${T('M64 144 Q58 154 66 160', 'bad', 9)}${burst(70, 160, 8, 'f-warn')}</g>` + q(100, 90);
    s += `<g class="ans">${ln('M60 144 l10 -2', 's-good', 3)}<g class="a-shake">${ln('M52 156 l20 -10 M52 146 l20 8', 's-line', 2)}<circle class="f-white" cx="50" cy="158" r="3"/><circle class="f-white" cx="50" cy="144" r="3"/></g>` +
      `<circle class="f-scar" cx="104" cy="92" r="3"/><circle class="f-scar" cx="86" cy="140" r="3"/><circle class="f-scar" cx="130" cy="140" r="3"/></g>`;
    s += `<g class="ans"><path class="f-white" d="M206 96 Q236 84 266 96 Q270 112 236 114 Q202 112 206 96 Z"/>` + ln('M80 140 Q150 60 230 98', 's-ink a-flow-slow', 1.4) + '</g>';
    s += `<g class="ansmotion"><g>${T('M-6 -6 Q-10 4 -2 10', 'bad', 7)}<animateMotion dur="3.2s" repeatCount="indefinite" path="M68 150 Q150 60 236 102" keyPoints="0;0;1;1" keyTimes="0;.25;.8;1" calcMode="linear"/></g></g>`;
    s += qtag(236, 44, 'Appendectomy');
    s += `<g class="ans">${tag(236, 140, 'before it ruptures', '', 9.5)}<g class="a-pulse">${burst(272, 162, 7, 'f-warn')}${no(272, 162, 10)}</g>${ink(224, 166, 'no rupture', 9)}</g>`;
    return s;
  })()),

  /* ---------------- PERITONITIS ---------------- */
  periType: ART((() => {
    let s = tag(76, 14, 'Primary') + tag(224, 14, 'Secondary') + ln('M150 6 V176', 's-ink', 1).replace('/>', ' opacity=".3"/>');
    [76, 224].forEach(cx => {
      s += torso(cx, 30, 96, 100, false) + `<path class="f-fat" d="M${cx - 50} 100 Q${cx} 110 ${cx + 50} 100 L${cx + 46} 128 Q${cx} 142 ${cx - 46} 128 Z" opacity=".75"/>` +
        T(`M${cx - 26} 80 H${cx + 20} Q${cx + 30} 80 ${cx + 30} 90 Q${cx + 30} 100 ${cx + 20} 100 H${cx - 20} Q${cx - 30} 100 ${cx - 30} 110 Q${cx - 30} 118 ${cx - 18} 118 H${cx + 22}`, 'small', 7);
    });
    // primary: cirrhotic liver, germs arrive by blood/lymph
    s += `<path class="f-liver" d="M38 44 Q40 36 52 38 Q60 34 68 40 Q80 38 84 46 Q84 56 74 58 Q64 64 54 58 Q42 60 38 52 Z"/>` +
      [[48, 46], [58, 44], [68, 48], [54, 53], [74, 51]].map(([x, y]) => `<circle class="f-scar noline" cx="${x}" cy="${y}" r="2.6"/>`).join('');
    s += `<g class="ans">${ln('M6 70 Q24 96 44 112', 's-blood', 4)}${ln('M6 70 Q24 96 44 112', 's-white a-flow', 1.4)}</g>` +
      [0, -1.2].map(b => motion('<rect class="f-germ" x="-4" y="-2.5" width="8" height="5" rx="2.5"/>', 'M6 70 Q24 96 44 112 L60 122', 2.4, b)).join('');
    s += qtag(76, 148, 'via blood / lymph') + `<g class="ans">${ink(76, 168, 'advanced cirrhosis', 9.5)}</g>`;
    // secondary: organ perforates
    s += `<g class="ans"><circle cx="242" cy="80" r="4" fill="#111"/>${burst(242, 80, 9, 'f-warn a-pulse').replace('class="', 'opacity=".6" class="')}` +
      [0, .4, .8].map(d => `<circle class="f-stool a-drop" style="animation-delay:${d}s" cx="${240 + d * 6}" cy="96" r="2.4"/>`).join('') +
      [[206, 112], [226, 122], [250, 116], [216, 104]].map(([x, y], i) => i % 2 ? virus(x, y, 3) : `<rect class="f-germ a-bob" x="${x - 4}" y="${y - 2.5}" width="8" height="5" rx="2.5"/>`).join('') + '</g>';
    s += qtag(224, 148, 'organ perforates') + `<g class="ans">${ink(224, 168, 'rupture, trauma; many germs', 9.5)}</g>`;
    return s;
  })()),

  periSx: ART((() => {
    let s = torso(150, 24, 116, 132);
    s += `<g class="ans"><rect x="96" y="38" width="108" height="104" rx="20" fill="none" class="s-bad a-blink" style="stroke-width:3px"/>` +
      `<rect class="f-food" x="102" y="58" width="96" height="58" rx="5"/>${ln('M108 70 Q130 66 150 72 T192 70 M108 86 Q140 82 160 88 T192 86 M108 102 Q130 98 150 104 T192 102', 's-line', 1).replace('/>', ' opacity=".55"/>')}` +
      `<g class="a-bob"><path class="f-skin" d="M138 30 h24 v14 q0 8 -12 8 q-12 0 -12 -8 Z"/>${ln('M144 44 v6 M150 44 v7 M156 44 v6', 's-line', 1.2)}</g></g>`;
    s += qtag(150, 88, 'board-like rigid belly', 10);
    s += q(44, 40) + q(44, 100) + q(256, 40) + q(256, 100) + q(256, 150);
    s += `<g class="ans">${pop(0, tag(44, 40, 'rebound pain', '', 9.5))}${pop(1, thermo(30, 90) + tag(56, 92, 'fever', '', 9.5))}${pop(2, tag(44, 120, 'WBC ↑', '', 9.5))}` +
      `${pop(3, drop(216, 28, 1.2, 'f-water a-drop') + tag(258, 44, 'third spacing', '', 9.5))}${pop(4, heart(232, 98, 1, 'class="a-beat"') + tag(266, 100, 'shock', '', 9.5))}` +
      `${pop(5, tag(256, 150, 'ileus', '', 9.5))}${ink(150, 176, 'hospital mortality up to 20%', 9)}</g>`;
    return s;
  })()),

  rebound: ART((() => {
    let s = '';
    s += `<rect class="f-skin" x="6" y="78" width="288" height="12"/><rect class="f-muscle" x="6" y="90" width="288" height="12"/><rect class="f-bad" x="6" y="102" width="288" height="5"/>` +
      `<rect class="f-fat" x="6" y="107" width="288" height="70" opacity=".35"/>` +
      T('M20 130 H120 Q136 130 136 144 Q136 158 120 158 H40', 'small', 10) + T('M170 128 H280 M180 156 H280', 'small', 10);
    s += tag(32, 84, 'skin', '', 9) + tag(36, 96, 'muscle', '', 9);
    // front: hand resting
    s += `<g class="q"><path class="f-skin" d="M128 40 h44 v26 q0 12 -10 12 h-24 q-10 0 -10 -12 Z"/></g>` + q(150, 112);
    // back: press slowly, release fast, pain on release
    s += `<g class="ans"><g><path class="f-skin" d="M128 40 h44 v26 q0 12 -10 12 h-24 q-10 0 -10 -12 Z"/>${ln('M140 64 v12 M150 64 v13 M160 64 v12', 's-line', 1.2)}` +
      `<animateTransform attributeName="transform" type="translate" values="0 0;0 14;0 -10;0 0" keyTimes="0;.55;.62;1" dur="3.2s" repeatCount="indefinite"/></g>` +
      `<g>${burst(150, 104, 16, 'f-warn')}<text x="150" y="108" text-anchor="middle" style="font-size:10px;font-weight:800;fill:#7a1020">OW!</text>` +
      `<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.58;.63;.85;1" dur="3.2s" repeatCount="indefinite"/></g>` +
      `<rect class="f-bad a-blink" x="6" y="102" width="288" height="5"/></g>`;
    s += `<g class="ans">${tag(60, 26, '1 press slowly', '', 9.5)}${ln('M60 38 v16', 's-ink', 1.6)}${ln('M54 48 l6 6 l6 -6', 's-ink', 1.6)}` +
      `${tag(240, 26, '2 let go fast', '', 9.5)}${ln('M240 54 v-16 M234 44 l6 -6 l6 6', 's-ink', 2.4)}</g>`;
    s += qtag(236, 64, 'pain worse on release', 9.5) + qtag(150, 170, 'inflamed parietal peritoneum', 9.5);
    return s;
  })()),

  periDx: ART((() => {
    let s = torso(84, 22, 120, 136);
    s += `<path class="f-fat" d="M26 98 Q84 110 142 98 L136 150 Q84 168 32 150 Z" opacity=".8"/>` +
      [[50, 128], [72, 140], [100, 132], [118, 120], [60, 112]].map(([x, y]) => `<circle class="f-germ noline" cx="${x}" cy="${y}" r="2"/>`).join('');
    s += T('M50 70 H110 Q120 70 120 80 Q120 90 110 90 H58', 'small', 7);
    s += ink(84, 14, "pt's R  ←   → pt's L", 9);
    s += q(126, 128);
    // needle in the lower quadrant, fluid pulled into a syringe
    s += `<g class="ans">${ln('M118 128 L170 128', 's-line', 2.4)}${ln('M120 128 L170 128', 's-warn a-flow', 1.2)}` +
      `<rect class="f-white" x="170" y="120" width="46" height="16" rx="3"/><rect class="f-fat noline" x="172" y="122" width="10" height="12"><animate attributeName="width" values="2;40;40" keyTimes="0;.8;1" dur="3s" repeatCount="indefinite"/></rect>` +
      `${ln('M216 128 H228 M228 120 V136', 's-line', 3)}</g>`;
    s += qtag(194, 154, 'Paracentesis', 10.5);
    // what the fluid is checked for
    s += `<g class="ans">${ln('M194 118 Q200 70 222 40 M194 118 Q206 80 222 66 M194 118 Q210 94 222 92', 's-ink a-flow-slow', 1)}` +
      `${pop(0, '<rect class="f-spleen" x="222" y="10" width="16" height="10" rx="2"/>' + tag(268, 16, 'Gram stain', '', 9))}` +
      `${pop(1, '<ellipse class="f-white" cx="230" cy="40" rx="9" ry="6"/><circle class="f-good noline" cx="227" cy="39" r="1.8"/><circle class="f-good noline" cx="233" cy="42" r="1.8"/>' + tag(268, 40, 'culture', '', 9))}` +
      `${pop(2, '<circle class="f-white" cx="230" cy="66" r="7"/><circle class="f-germ noline" cx="228" cy="65" r="2"/>' + tag(268, 66, 'cell count', '', 9))}` +
      `${pop(3, '<rect class="f-pancreas" x="225" y="84" width="10" height="16" rx="4"/>' + tag(268, 92, 'albumin', '', 9))}</g>`;
    return s;
  })()),

  periTx: ART((() => {
    let s = torso(150, 30, 112, 128);
    s += T('M110 72 H180 Q192 72 192 84 Q192 96 180 96 H122 Q110 96 110 108 Q110 120 122 120 H184', 'small', 9);
    s += `<path class="f-fat" d="M98 128 Q150 140 202 128 L196 150 Q150 166 104 150 Z" opacity=".7"/>`;
    // front: a leaking hole
    s += `<g class="q"><circle cx="158" cy="96" r="4" fill="#111"/>${[0, 1, 2].map(i => `<circle class="f-stool" cx="${156 + i * 5}" cy="${104 + i * 4}" r="2"/>`).join('')}</g>`;
    s += qtag(158, 82, 'fix the leak', 9.5).replace(/(<g class="q">)/, '$1');
    s += `<g class="ans">${ln('M150 92 l4 8 M156 92 l4 8 M162 92 l4 8', 's-line', 1.6)}<g class="a-pop">${ln('M148 96 H170', 's-good', 2)}</g></g>`;
    // drain to a bag
    s += `<g class="ans">${ln('M170 142 Q220 156 244 150', 's-line', 3.5)}${ln('M170 142 Q220 156 244 150', 's-fat a-flow', 2).replace('s-fat', 's-warn')}` +
      `<path class="f-white" d="M244 136 h30 v28 q0 6 -6 6 h-18 q-6 0 -6 -6 Z"/><rect class="f-fat noline" x="248" y="148" width="22" height="18" rx="3"/></g>` + qtag(256, 120, 'drain pus', 9.5);
    // IV antibiotics + fluids/TPN
    s += `<g class="ans">${bag(26, 12, 'f-water')}${virus(26, 32, 3)}${no(26, 32, 8)}${drop(26, 50, .6, 'f-water a-drop')}${ln('M26 42 Q30 90 96 96', 's-line', 1.3)}` +
      `${bag(64, 12, 'f-fat')}${drop(64, 50, .6, 'f-fat a-drop', 'style="animation-delay:.6s"')}${ln('M64 42 Q70 80 98 88', 's-line', 1.3)}</g>`;
    s += qtag(32, 66, 'antibiotics', 9.5) + qtag(40, 96, 'fluids + lytes', 9.5) + qtag(46, 126, 'TPN (nutrition)', 9.5);
    // NG suction
    s += `<g class="ans">${ln('M150 36 Q150 14 200 14 H222', 's-line', 2.5)}${ln('M150 36 Q150 14 200 14 H222', 's-white a-flow', 1)}<rect class="f-white" x="222" y="2" width="22" height="28" rx="3"/><rect class="f-bile noline" x="225" y="16" width="16" height="12" rx="2"/></g>` +
      qtag(266, 46, 'NG suction', 9.5);
    return s;
  })()),
});
})();
