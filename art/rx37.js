/* Pharmacology rx37-antipsychotics art: colorful replacements for PICS, loaded after the page sets PICS.
   Chapter 37 antipsychotics. Everything lives inside one function so the helpers never clash. */
(() => {
  // place a shape: never put an a-* animation class on this same <g> (CSS transform would override it)
  const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const T = (x, y, t, o = {}) => `<text class="${o.c || 'ink'}" x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="font-size:${o.s || 10}px;font-weight:${o.w || 700}">${esc(t)}</text>`;
  const ln = (d, c = 'var(--art-line)', w = 2, extra = '') => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${extra}"/>`;
  const dash = d => ln(d, 'var(--pic-ink)', 1, ';stroke-dasharray:2 3');
  const arr = (d, c = 'var(--pic-ink)', cls = '', w = 2) => `<path class="${cls}" d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round" marker-end="url(#rx37a)"/>`;
  const STYLE = `<style>
.pic .rx37-rot{transform-box:view-box;animation:rx37rot 3.2s ease-in-out infinite}
@keyframes rx37rot{0%,12%{transform:rotate(0)}55%,85%{transform:rotate(var(--r,120deg))}100%{transform:rotate(0)}}
.pic .rx37-swing{transform-box:view-box;animation:rx37swing 1.4s ease-in-out infinite}
@keyframes rx37swing{50%{transform:rotate(var(--r,100deg))}}
.pic .rx37-fill{transform-box:fill-box;transform-origin:50% 100%;animation:rx37fill 3.2s ease-in-out infinite}
@keyframes rx37fill{0%,10%{transform:scaleY(.12)}60%,88%{transform:scaleY(1)}100%{transform:scaleY(.12)}}
.pic .rx37-gx{transform-box:fill-box;transform-origin:0 50%;animation:rx37gx 3s ease-out infinite}
@keyframes rx37gx{0%{transform:scaleX(0)}45%,100%{transform:scaleX(1)}}
.pic .rx37-drain{transform-box:fill-box;transform-origin:50% 100%;animation:rx37drain 3.2s ease-in-out infinite}
@keyframes rx37drain{0%,12%{transform:scaleY(1)}60%,88%{transform:scaleY(.25)}100%{transform:scaleY(1)}}
.pic .rx37-pace{animation:rx37pace 2.6s ease-in-out infinite}
@keyframes rx37pace{50%{transform:translateX(var(--dx,90px))}}
.pic .rx37-dim{animation:rx37dim 3s ease-in-out infinite}
@keyframes rx37dim{0%,15%{opacity:1}55%,85%{opacity:.4}100%{opacity:1}}
.pic .rx37-lit{animation:rx37lit 3s ease-in-out infinite}
@keyframes rx37lit{0%,15%{opacity:.06}55%,85%{opacity:.45}100%{opacity:.06}}
.pic .rx37-rock{transform-box:view-box;animation:rx37rock 2.6s ease-in-out infinite}
@keyframes rx37rock{25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
.pic .rx37-tongue{transform-box:fill-box;transform-origin:0 50%;animation:rx37tongue 1s ease-in-out infinite}
@keyframes rx37tongue{0%,100%{transform:scaleX(.2)}50%{transform:scaleX(1)}}
</style>`;
  const DEFS = `<defs><marker id="rx37a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" style="fill:var(--pic-ink)"/></marker></defs>` + STYLE;
  const A = inner => ART(DEFS + inner);
  const soft = (x, y, w, h, c, o = .16) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${c};opacity:${o}"/>`;

  /* ---------- icons ---------- */
  const pill = (x, y, rot = -30, c = 'f-warn', s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path class="${c}" d="M0 -5 H-8 A5 5 0 0 0 -8 5 H0 Z"/><path class="f-white" d="M0 -5 H8 A5 5 0 0 1 8 5 H0 Z"/></g>`;
  const nope = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:var(--c-bad);stroke-width:3"/><path d="M${x - r * .7} ${y - r * .7} L${x + r * .7} ${y + r * .7}" style="stroke:var(--c-bad);stroke-width:3"/>`;
  const check = (x, y, d = 0, r = 7) => `<g class="a-pop" style="--d:${d}"><circle class="f-good" cx="${x}" cy="${y}" r="${r}"/><path class="s-white" d="M${x - r / 2} ${y} l${r * .36} ${r * .38} l${r * .64} ${-r * .72}" style="stroke-width:2"/></g>`;
  const cross = (x, y, r = 7) => `<circle class="f-bad" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .45} ${y - r * .45} L${x + r * .45} ${y + r * .45} M${x + r * .45} ${y - r * .45} L${x - r * .45} ${y + r * .45}" style="stroke:#fff;stroke-width:2.2;stroke-linecap:round"/>`;
  const warn = (x, y, s = 1) => G(x, y, s, `<path class="f-warn" d="M0 -11 L11 9 L-11 9 Z"/><path d="M0 -4 V3 M0 5.5 V6" style="stroke:var(--art-line);stroke-width:2.2;stroke-linecap:round"/>`);
  const drop = (x, y, s = 1, c = 'f-water') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 -8 C3 -3 6 1 6 4 A6 6 0 0 1 -6 4 C-6 1 -3 -3 0 -8 Z"/></g>`;
  const zzz = (x, y) => `<g class="a-rise">${T(x, y, 'z', { s: 10 })}${T(x + 7, y - 7, 'z', { s: 12 })}${T(x + 15, y - 15, 'Z', { s: 14 })}</g>`;
  const cal = (x, y, txt, s = 1) => G(x, y, s, `<rect class="f-white" x="-17" y="-13" width="34" height="29" rx="3"/><rect class="f-bad" x="-17" y="-13" width="34" height="8" rx="2"/><path d="M-9 -16 V-10 M9 -16 V-10" style="stroke:var(--art-line);stroke-width:2"/>`) + (txt ? T(x, y + 10 * s, txt, { s: 9, c: 'tagtx' }) : '');
  const vial = (x, y, c = 'var(--c-blood)', lvl = .6) => `<g transform="translate(${x} ${y})"><rect class="f-white" x="-6" y="-16" width="12" height="32" rx="6"/><rect x="-4.5" y="${-14 + 28 * (1 - lvl)}" width="9" height="${28 * lvl}" rx="4" style="fill:${c}"/><rect class="f-scar" x="-7" y="-20" width="14" height="6" rx="1.5"/></g>`;
  const syringe = (x, y, rot = -35, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect class="f-white" x="-13" y="-5" width="22" height="10" rx="1.5"/><rect class="f-water" x="-5" y="-3.5" width="13" height="7"/><path class="s-line" d="M9 0 H20 M-13 -7 V7 M-13 0 H-20 M-20 -5 V5" style="stroke-width:1.8"/></g>`;
  const clock = (x, y, r = 13, hand = 90) => `<circle class="f-white" cx="${x}" cy="${y}" r="${r}"/><path d="M${x} ${y} V${y - r * .7}" style="stroke:var(--art-line);stroke-width:2;stroke-linecap:round"/><g class="a-spin" style="animation-duration:4s"><path d="M${x} ${y - r * .55} L${x} ${y} L${x} ${y + r * .55}" style="stroke:none;fill:none"/><path d="M${x} ${y} L${x} ${y - r * .55}" transform="rotate(${hand} ${x} ${y})" style="stroke:var(--c-bad);stroke-width:2;stroke-linecap:round"/></g><circle cx="${x}" cy="${y}" r="1.8" style="fill:var(--art-line)"/>`;
  const heart = (x, y, s = 1, c = 'f-blood') => G(x, y, s, `<path class="${c}" d="M0 12 C-14 2 -16 -8 -9 -12 C-4 -15 0 -11 0 -7 C0 -11 4 -15 9 -12 C16 -8 14 2 0 12 Z"/>`);
  const scaleIcon = (x, y, s = 1) => G(x, y, s, `<rect class="f-white" x="-18" y="-11" width="36" height="22" rx="5"/><path d="M-9 -3 A9 9 0 0 1 9 -3" style="fill:none;stroke:var(--art-line);stroke-width:1.5"/>`);
  const neut = (x, y, r = 8) => `<circle class="f-immune" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .5} ${y + r * .1} q${r * .25} ${-r * .55} ${r * .5} 0 q${r * .25} ${-r * .55} ${r * .5} 0" style="fill:none;stroke:var(--c-germ);stroke-width:${r * .32};stroke-linecap:round"/>`;
  const clip = (x, y, w, h) => `<rect class="f-food" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="f-white" x="${x + 4}" y="${y + 7}" width="${w - 8}" height="${h - 11}" rx="2"/><rect class="f-scar" x="${x + w / 2 - 11}" y="${y - 3}" width="22" height="8" rx="2"/>`;
  const da = (x, y, r = 4) => `<circle class="f-nerve" cx="${x}" cy="${y}" r="${r}"/>`;
  // a person: feet at (x, y)
  const person = (x, y, s = 1, c = 'var(--pic-ink)', head = 'f-skin') => G(x, y, s, ln('M0 -24 V-8 M0 -8 L-6 4 M0 -8 L6 4 M0 -20 L-7 -11 M0 -20 L7 -11', c, 2.6) + `<circle class="${head}" cx="0" cy="-29" r="5.5"/>`);
  // a receptor sitting on a membrane at (x, y) with a pocket on top
  const rec = (x, y, c = 'f-vein', s = 1) => G(x, y, s, `<path class="${c}" d="M-11 2 V-15 Q-11 -20 -6 -20 V-8 H6 V-20 Q11 -20 11 -15 V2 Z"/>`);
  const plug = (x, y, c = 'f-bad', s = 1) => G(x, y, s, `<rect class="${c}" x="-5" y="-7" width="10" height="14" rx="4"/>`);
  // gauge: needle starts pointing low, swings up on the back
  const gauge = (x, y, r, deg = 120, label = '') => {
    const pt = a => [x + r * Math.cos(a * Math.PI / 180), y - r * Math.sin(a * Math.PI / 180)].map(v => v.toFixed(1)).join(' ');
    const arc = (a1, a2, col) => `<path d="M${pt(a1)} A${r} ${r} 0 0 1 ${pt(a2)}" style="fill:none;stroke:${col};stroke-width:${r * .28}"/>`;
    return `<path d="M${x - r - 4} ${y + 3} A${r + 4} ${r + 4} 0 0 1 ${x + r + 4} ${y + 3} Z" class="f-white"/>` +
      arc(180, 120, 'var(--c-good)') + arc(120, 60, 'var(--c-nerve)') + arc(60, 0, 'var(--c-bad)') +
      `<g class="rx37-rot" style="transform-origin:${x}px ${y}px;--r:${deg}deg"><path d="M${x} ${y} L${pt(155).split(' ').map((v, i) => i ? y - (y - v) * .8 : x + (v - x) * .8).join(' ')}" style="stroke:var(--art-line);stroke-width:2.6;stroke-linecap:round"/></g>` +
      `<circle cx="${x}" cy="${y}" r="3" style="fill:var(--art-line)"/>` + (label ? T(x, y + 13, label, { s: 9 }) : '');
  };
  // thermometer with a static low level and (back) a rising red column
  const thermo = (x, y, h) => `<rect class="f-white" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><circle class="f-white" cx="${x}" cy="${y + h + 4}" r="10"/>` +
    `<rect class="f-blood noline" x="${x - 3}" y="${y + h - 16}" width="6" height="18"/><circle class="f-blood noline" cx="${x}" cy="${y + h + 4}" r="7"/>` +
    `<g class="ans"><rect class="f-blood noline rx37-fill" x="${x - 3}" y="${y + 6}" width="6" height="${h - 4}"/></g>` +
    [0, 1, 2, 3].map(i => `<path d="M${x + 6} ${y + 10 + i * (h - 20) / 3} h4" style="stroke:var(--art-line);stroke-width:1.2"/>`).join('');
  const ecg = (x0, y, qt = 1) => {
    let d = `M${x0} ${y}`, x = x0;
    for (let i = 0; i < 2; i++) {
      d += ` h8 q4 -6 8 0 h6 l3 4 l4 -30 l4 34 l3 -8 h${10 * qt} q8 -14 ${14 + 4 * qt} 0 h${18 - 4 * qt}`;
    }
    return d;
  };

  /* ---------- brain (side view, face to the left), local coords about 0..222 x 0..142 ---------- */
  const BRAIN = 'M24 96 C0 80 0 34 36 16 C70 -2 134 -2 172 14 C206 28 222 58 210 84 C202 100 182 104 166 100 C162 102 158 104 156 106 L154 134 C153 142 141 142 140 134 L138 108 C116 110 86 110 62 106 C46 104 32 102 24 96 Z';
  const brainBase = () => `<ellipse class="f-esoph" cx="186" cy="106" rx="26" ry="14"/><path class="f-mouth" d="${BRAIN}"/>` +
    `<path class="s-line" d="M60 30 Q70 44 62 58 M100 14 Q96 30 108 40 M150 22 Q140 36 156 48 M184 44 Q172 58 190 70 M44 74 Q58 70 66 82" style="stroke-width:1.2;opacity:.45"/>` +
    `<path d="M144 100 Q150 104 152 108 L150 134" style="fill:none;stroke:var(--art-line);stroke-width:1;opacity:.4"/>`;
  const STRI = `<path class="f-pancreas" d="M112 44 C122 30 146 32 150 46 C152 56 142 62 136 58 C130 54 132 48 126 50 C120 52 118 62 112 64 C106 62 106 52 112 44 Z"/>`;
  const NAC = `<ellipse class="f-small" cx="90" cy="84" rx="9" ry="6"/>`;
  const PFC = `<path d="M10 64 C6 40 20 22 46 16 L54 44 C40 50 30 60 26 74 Z" style="fill:var(--c-gall);opacity:.55"/>`;
  const PIT = `<path d="M110 106 L106 118" style="stroke:var(--art-line);stroke-width:2"/><circle class="f-spleen" cx="105" cy="122" r="6"/>`;

  Object.assign(PICS, {

    /* 1. Psychosis: a set of symptoms with many causes */
    psychosis: A(`
      <path class="s-warn a-flow" d="M112 50 L128 72 M112 95 L120 95 M112 140 L128 118 M188 50 L172 72 M188 95 L180 95 M188 140 L172 118" style="stroke-width:2.5"/>
      <circle class="f-skin" cx="150" cy="95" r="30"/>
      <path class="f-skin" d="M176 92 L186 100 L176 104 Z"/><circle cx="166" cy="86" r="2.5" style="fill:var(--art-line)"/>
      <g transform="translate(144 92)"><g class="a-spin"><path d="M0 0 m-2 0 a2 2 0 1 1 4 0 a5 5 0 1 1 -10 0 a8 8 0 1 1 16 0 a11 11 0 1 1 -22 0" style="fill:none;stroke:var(--c-germ);stroke-width:2.6;stroke-linecap:round"/></g></g>
      <g class="a-bob"><path class="f-white" d="M188 22 h40 a6 6 0 0 1 6 6 v12 a6 6 0 0 1 -6 6 h-28 l-8 7 v-7 h-4 a6 6 0 0 1 -6 -6 v-12 a6 6 0 0 1 6 -6 Z"/>${T(209, 38, '!?', { s: 12 })}</g>
      ${qtag(150, 18, 'Loss of reality')}
      ${qtag(62, 50, 'Schizophrenia', 9)}${qtag(62, 95, 'Psychotic depression', 9)}${qtag(62, 140, 'Drugs, alcohol w/d', 9)}
      ${qtag(240, 72, 'Bipolar mania', 9)}${qtag(240, 117, 'Brain injury', 9)}${qtag(240, 147, 'Alzheimer, Parkinson', 9)}
      ${tag(150, 168, 'Symptoms, not a diagnosis', 'ans', 9.5)}`),

    /* 2. Schizophrenia basics: rare, disabling, starts late teens / early 20s, chronic */
    sz: A(`
      ${Array.from({ length: 20 }, (_, i) => `<circle cx="${22 + (i % 10) * 10}" cy="${32 + Math.floor(i / 10) * 14}" r="3.5" style="fill:var(--c-scar)"/>`).join('')}
      <g class="ans"><circle class="f-bad a-pulse" cx="112" cy="46" r="4.5"/></g>
      ${qtag(70, 68, '0.32% of people', 9.5)}
      <g class="a-bob"><circle class="f-warn" cx="236" cy="38" r="15"/><path class="f-bad" d="M228 50 L224 64 L232 60 L236 66 L236 52 Z"/><path class="f-bad" d="M244 50 L248 64 L240 60 L236 66 L236 52 Z"/>${T(236, 42, '15', { s: 11, c: 'tagtx' })}</g>
      ${qtag(236, 80, 'Top-15 disability', 9.5)}
      <path d="M20 128 H262" style="stroke:var(--pic-ink);stroke-width:3;stroke-linecap:round"/>
      ${[0, 10, 20, 30, 40].map(a => `<path d="M${20 + a * 6} 123 V133" style="stroke:var(--pic-ink);stroke-width:1.5"/>${T(20 + a * 6, 115, a ? a + ' y' : 'age 0', { s: 9 })}`).join('')}
      <g class="ans"><rect class="f-warn a-pulse" x="${20 + 16 * 6}" y="122" width="${9 * 6}" height="12" rx="4" style="opacity:.9"/>
        <path class="s-warn a-flow" d="M266 128 H290" style="stroke-width:3"/>
        <circle class="f-vein" cx="${20 + 18 * 6}" cy="145" r="5"/>${T(20 + 18 * 6, 148.5, 'M', { s: 9, c: 'on' })}
        <circle class="f-mouth" cx="${20 + 23 * 6}" cy="145" r="5"/>${T(20 + 23 * 6, 148.5, 'F', { s: 9, c: 'tagtx' })}</g>
      ${qtag(118, 98, 'Late teens to early 20s', 9.5)}
      ${tag(70, 166, 'Males a bit earlier', 'ans', 9.5)}${qtag(256, 152, 'Chronic', 9.5)}`),

    /* 3. Four symptom groups */
    groups: A(`
      ${soft(6, 6, 142, 82, 'var(--c-bad)', .2)}${soft(152, 6, 142, 82, 'var(--c-vein)', .2)}${soft(6, 92, 142, 82, 'var(--c-nerve)', .25)}${soft(152, 92, 142, 82, 'var(--c-germ)', .2)}
      <circle class="f-skin" cx="48" cy="46" r="17"/><circle cx="54" cy="42" r="2" style="fill:var(--art-line)"/>
      <g class="a-bob"><path class="f-white" d="M76 26 h44 a5 5 0 0 1 5 5 v14 a5 5 0 0 1 -5 5 h-30 l-8 7 v-7 h-6 a5 5 0 0 1 -5 -5 v-14 a5 5 0 0 1 5 -5 Z"/><path d="M84 38 q4 -6 8 0 t8 0 t8 0" style="fill:none;stroke:var(--c-germ);stroke-width:2"/></g>
      <circle class="f-skin" cx="196" cy="44" r="17"/><circle cx="190" cy="40" r="2" style="fill:var(--art-line)"/><circle cx="202" cy="40" r="2" style="fill:var(--art-line)"/><path d="M189 51 H203" style="stroke:var(--art-line);stroke-width:2"/>
      <rect class="f-white" x="226" y="32" width="38" height="20" rx="3"/><rect x="264" y="38" width="4" height="8" style="fill:var(--art-line)"/><g class="a-blink"><rect class="f-bad noline" x="229" y="35" width="8" height="14" rx="1"/></g>
      <g transform="translate(76 130)"><g class="a-spin"><circle class="f-scar" r="13"/>${[0, 45, 90, 135].map(a => `<rect class="f-scar" x="-3" y="-17" width="6" height="34" transform="rotate(${a})"/>`).join('')}<circle class="f-white" r="5"/></g></g>
      <path d="M100 118 l8 6 l-6 4 l8 6" style="fill:none;stroke:var(--c-bad);stroke-width:2.2"/>
      <g class="a-drop"><path class="f-white" d="M196 116 a10 10 0 0 1 18 -6 a9 9 0 0 1 16 6 a7 7 0 0 1 -2 14 h-30 a7 7 0 0 1 -2 -14 Z"/></g>
      <g class="a-drop" style="animation-delay:.5s">${drop(206, 140, .8)}${drop(222, 146, .8)}</g>
      ${qtag(77, 76, 'Positive', 10)}${tag(77, 18, 'Hallucinations, delusions', 'ans', 9)}
      ${qtag(223, 76, 'Negative', 10)}${tag(223, 18, 'Flat affect, apathy', 'ans', 9)}
      ${qtag(77, 162, 'Cognitive', 10)}${tag(77, 104, 'Poor judgment', 'ans', 9)}
      ${qtag(223, 162, 'Affective', 10)}${tag(223, 104, 'Depression, suicidality', 'ans', 9)}`),

    /* 4. Dopamine hypothesis: mesolimbic too much, mesocortical too little */
    pathways: A(`
      ${G(6, 20, .8, brainBase() + PFC + NAC +
        `<circle class="f-tumor" cx="146" cy="100" r="5"/>` +
        `<g class="ans"><path class="a-flow" d="M146 100 Q120 98 92 84" style="fill:none;stroke:var(--c-bad);stroke-width:6;stroke-linecap:round"/>
          <path class="a-flow-slow" d="M146 98 C130 60 90 44 42 46" style="fill:none;stroke:var(--c-vein);stroke-width:2.5;stroke-linecap:round"/></g>` +
        `<path d="M146 100 Q120 98 92 84 M146 98 C130 60 90 44 42 46" style="fill:none;stroke:var(--art-line);stroke-width:1.5;stroke-dasharray:3 3;opacity:.6"/>`)}
      <g class="ansmotion">${[0, .4, .8, 1.2].map(b => `<circle class="f-nerve" r="3.5"><animateMotion dur="1.6s" begin="${b}s" repeatCount="indefinite" path="M123 100 Q102 98 80 87"/></circle>`).join('')}
        <circle class="f-nerve" r="2.5"><animateMotion dur="3.2s" repeatCount="indefinite" path="M123 98 C110 68 78 55 40 57"/></circle></g>
      ${T(123, 124, 'VTA', { s: 9 })}
      ${soft(194, 22, 102, 66, 'var(--c-bad)', .2)}${soft(194, 98, 102, 66, 'var(--c-vein)', .2)}
      ${qtag(245, 36, 'Mesolimbic', 9.5)}${qtag(245, 112, 'Mesocortical', 9.5)}
      <g class="ans">${T(245, 58, 'TOO MUCH DA', { s: 10, c: 'ink' })}${T(245, 76, '→ Positive sx', { s: 10 })}
        ${T(245, 134, 'TOO LITTLE DA', { s: 10 })}${T(245, 148, '→ Negative +', { s: 9.5 })}${T(245, 160, 'cognitive sx', { s: 9.5 })}</g>
      ${qtag(60, 160, 'To limbic', 9)}${qtag(36, 26, 'To prefrontal', 9)}`),

    /* 5. Side-effect pathways: nigrostriatal (EPS) and tuberoinfundibular (prolactin) */
    sideways: A(`
      ${G(4, 22, .8, brainBase() + STRI + PIT +
        `<circle class="f-tumor" cx="152" cy="94" r="5"/>` +
        `<path d="M152 94 Q150 66 132 52" style="fill:none;stroke:var(--c-warn);stroke-width:5;stroke-linecap:round"/>` +
        `<path d="M112 104 L107 116" style="fill:none;stroke:var(--c-germ);stroke-width:4;stroke-linecap:round"/>` +
        `<g class="ans"><g class="a-pop" style="--d:1">${nope(144, 70, 11)}</g><g class="a-pop" style="--d:2">${nope(96, 112, 11)}</g></g>`)}
      ${qtag(84, 28, 'Nigrostriatal', 9.5)}${qtag(52, 132, 'Tuberoinfundibular', 9)}
      ${T(118, 160, 'pituitary', { s: 9 })}
      ${soft(194, 12, 102, 76, 'var(--c-warn)', .22)}${soft(194, 94, 102, 80, 'var(--c-germ)', .2)}
      ${person(232, 66, 1)}<g class="ans"><g class="a-shake">${person(232, 66, 1)}</g></g>
      ${T(268, 46, 'D2', { s: 10 })}${G(268, 60, .8, '<g class="ans">' + nope(0, 0, 10) + '</g>')}
      ${qtag(245, 80, 'Movement (EPS)', 9.5)}
      ${gauge(245, 136, 22, 120)}${T(245, 110, 'prolactin', { s: 9 })}
      ${qtag(245, 162, 'High prolactin', 9.5)}`),

    /* 6. Glutamate (NMDA) hypothesis */
    glut: A(`
      <rect x="6" y="94" width="288" height="14" style="fill:var(--c-fat);stroke:var(--art-line);stroke-width:1"/>
      <path class="f-good" d="M60 86 h12 v30 h-12 Z M86 86 h12 v30 h-12 Z"/>
      <path class="f-good" d="M200 86 h12 v30 h-12 Z M226 86 h12 v30 h-12 Z"/>
      ${T(79, 140, 'Normal NMDA', { s: 10 })}
      <circle class="f-gall" cx="58" cy="78" r="4.5"/><circle class="f-gall" cx="100" cy="78" r="4.5"/>
      <circle class="f-gall" cx="198" cy="78" r="4.5"/><circle class="f-gall" cx="240" cy="78" r="4.5"/>
      ${T(46, 70, 'glutamate', { s: 9, a: 'end' })}
      <path class="s-water a-flow" d="M79 62 V124" style="stroke-width:3"/>
      <path class="s-water" d="M219 62 V84" style="stroke-width:3;stroke-dasharray:6 8"/>
      <g class="ans"><g class="a-pop" style="--d:1"><rect class="f-bad" x="212" y="88" width="14" height="22" rx="5"/></g>${G(240, 146, .9, '<g class="a-pulse">' + cross(0, 0, 7) + '</g>')}</g>
      ${qtag(219, 134, 'PCP, ketamine', 9.5)}
      ${qtag(220, 165, 'Positive + negative sx', 9)}
      ${pill(40, 34, -20, 'f-spleen', 1.3)}${T(40, 20, 'clozapine', { s: 9 })}
      <g class="ans"><g class="a-bob">${arr('M62 40 L72 54', 'var(--c-good)')}</g></g>
      ${qtag(120, 26, 'May boost NMDA', 9.5)}
      ${qtag(86, 165, 'Blocked NMDA mimics SZ', 9)}`),

    /* 7. Three groups: FGA / SGA / TGA (also: other TGAs) */
    classes: A(`
      ${soft(4, 4, 94, 172, 'var(--c-bad)', .14)}${soft(103, 4, 94, 172, 'var(--c-germ)', .14)}${soft(202, 4, 94, 172, 'var(--c-good)', .16)}
      ${[51, 150, 249].map(x => `<rect x="${x - 44}" y="82" width="88" height="7" style="fill:var(--c-fat);stroke:var(--art-line);stroke-width:1"/>`).join('')}
      ${rec(51, 84, 'f-vein')}${T(51, 98, 'D2', { s: 9 })}
      <g class="ans"><g class="a-pulse">${plug(51, 70, 'f-bad')}</g></g>
      ${rec(134, 84, 'f-germ')}${T(134, 98, '5-HT2A', { s: 9 })}${rec(170, 84, 'f-vein')}${T(170, 98, 'D2', { s: 9 })}
      <g class="ans"><g class="a-pulse">${plug(134, 70, 'f-bad')}</g><g class="a-bob">${plug(170, 58, 'f-bad', .85)}</g></g>
      ${rec(249, 84, 'f-vein')}${T(225, 98, 'D2', { s: 9 })}
      <g class="ans">${plug(249, 70, 'f-nerve')}<path d="M244 64 h10 v12 h-10 Z" class="noline" style="fill:var(--c-scar)"/>
        <circle class="f-nerve rx37-lit noline" cx="272" cy="40" r="14"/></g>
      <path class="f-white" d="M266 46 a8 8 0 1 1 12 0 v5 h-12 Z"/><rect class="f-scar" x="267" y="52" width="10" height="5" rx="1"/>
      ${qtag(51, 20, 'FGA (typical)', 9.5)}${qtag(150, 20, 'SGA (atypical)', 9.5)}${qtag(236, 20, 'TGA', 9.5)}
      <g class="ans">
        ${T(51, 116, 'Block D2', { s: 9.5 })}${T(150, 116, '5-HT2A ≫ D2', { s: 9.5 })}${T(249, 116, 'D2 partial', { s: 9.5 })}${T(249, 127, 'agonist', { s: 9.5 })}
        ${T(51, 140, 'Haloperidol', { s: 9, w: 600 })}${T(51, 152, 'Chlorpromazine', { s: 9, w: 600 })}
        ${T(150, 140, 'Risperidone', { s: 9, w: 600 })}${T(150, 152, 'Olanzapine', { s: 9, w: 600 })}${T(150, 164, 'Clozapine', { s: 9, w: 600 })}
        ${T(249, 142, 'Aripiprazole', { s: 9, w: 600 })}${T(249, 154, 'Brexpiprazole', { s: 9, w: 600 })}${T(249, 166, 'Cariprazine', { s: 9, w: 600 })}</g>`),

    /* 8. FGA vs SGA: no winner, except clozapine */
    noWinner: A(`
      <path class="f-scar" d="M140 118 L160 118 L154 64 L146 64 Z"/><circle class="f-scar" cx="150" cy="60" r="5"/>
      <g class="rx37-rock" style="transform-origin:150px 60px">
        <path d="M70 60 H230" style="stroke:var(--art-line);stroke-width:4;stroke-linecap:round"/>
        <path d="M70 60 L54 92 M70 60 L86 92 M230 60 L214 92 M230 60 L246 92" style="stroke:var(--art-line);stroke-width:1.5"/>
        <path class="f-bad" d="M50 92 H90 Q86 104 70 104 Q54 104 50 92 Z"/><path class="f-germ" d="M210 92 H250 Q246 104 230 104 Q214 104 210 92 Z"/>
        ${pill(64, 86, -20, 'f-bad')}${pill(78, 86, 20, 'f-bad')}${pill(224, 86, -20, 'f-germ')}${pill(238, 86, 20, 'f-germ')}
        ${T(70, 48, 'FGA', { s: 11 })}${T(230, 48, 'SGA', { s: 11 })}</g>
      <rect class="f-scar" x="122" y="118" width="56" height="8" rx="3"/>
      ${qtag(150, 140, 'Neither proven better', 9.5)}
      <g class="ans"><g class="a-bob"><path class="f-nerve" d="M232 120 h28 v6 a14 14 0 0 1 -28 0 Z"/><rect class="f-nerve" x="242" y="138" width="8" height="8"/><rect class="f-nerve" x="236" y="146" width="20" height="5" rx="1"/>${pill(246, 128, -15, 'f-spleen', .8)}</g></g>
      ${qtag(246, 166, 'Except clozapine', 9.5)}
      ${tag(86, 166, 'Pick by side effects, age', 'ans', 9)}`),

    /* 9. Clozapine: treatment-resistant SZ, lowers suicide, REMS with ANC (also: REMS card) */
    clozapine: A(`
      ${[30, 58, 86].map((x, i) => pill(x, 40, -20, ['f-bad', 'f-gall', 'f-vein'][i], 1.1)).join('')}
      <g class="ans">${[30, 58, 86].map((x, i) => `<g class="a-pop" style="--d:${i}">${cross(x + 8, 28, 6)}</g>`).join('')}</g>
      ${T(58, 62, 'Other drugs tried', { s: 9 })}
      <g class="a-pulse">${pill(58, 92, -20, 'f-spleen', 1.8)}</g>${T(58, 116, 'Clozapine', { s: 10 })}
      <g class="ans">${check(86, 82, 3, 8)}</g>
      ${qtag(58, 138, 'Treatment-resistant SZ', 9)}
      ${qtag(58, 164, 'Lowers suicide risk', 9)}
      <path class="f-good" d="M150 26 L176 34 V58 C176 74 164 84 150 90 C136 84 124 74 124 58 V34 Z"/>${T(150, 62, 'REMS', { s: 11, c: 'on' })}
      ${vial(200, 60, 'var(--c-blood)', .7)}
      <g class="ans">${[0, 1, 2, 3, 4].map(i => `<g class="a-pop" style="--d:${i + 1}">${neut(226 + (i % 3) * 22, 42 + Math.floor(i / 3) * 24, 8)}</g>`).join('')}</g>
      ${qtag(220, 104, 'Check ANC (neutrophils)', 9)}
      ${tag(214, 130, 'Certified prescriber + pharmacy', 'ans', 9)}
      ${tag(214, 154, 'Very low EPS; sedating', 'ans', 9)}`),

    /* 10. First-generation: block D2 plus ACh, H1, alpha-1 */
    fga: A(`
      <rect x="4" y="84" width="292" height="8" style="fill:var(--c-fat);stroke:var(--art-line);stroke-width:1"/>
      ${[['D2', 'f-vein'], ['ACh (M)', 'f-gall'], ['H1', 'f-small'], ['α1', 'f-spleen']].map(([n, c], i) => rec(40 + i * 73, 86, c) + T(40 + i * 73, 104, n, { s: 10 })).join('')}
      <g class="ans">${[0, 1, 2, 3].map(i => `<g class="a-drop" style="animation-duration:2s;animation-delay:${i * .25}s">${plug(40 + i * 73, 66, 'f-bad')}</g>`).join('')}</g>
      ${pill(150, 26, -15, 'f-bad', 1.6)}${T(150, 14, 'FGA', { s: 10 })}
      ${qtag(40, 122, 'Positive sx ↓', 9)}${qtag(113, 122, 'Dry mouth', 9)}${qtag(186, 122, 'Sedation', 9)}${qtag(259, 122, 'Low BP', 9)}
      <g class="ans">${T(40, 144, 'Most EPS', { s: 9 })}${T(40, 155, 'prolactin ↑', { s: 9 })}${T(113, 144, 'constipation', { s: 9 })}${T(113, 155, 'urine retention', { s: 9 })}
        ${T(186, 144, 'weight gain', { s: 9 })}${T(259, 144, 'dizzy on', { s: 9 })}${T(259, 155, 'standing', { s: 9 })}</g>
      ${zzz(206, 50)}`),

    /* 11. FGA examples: phenothiazines vs others */
    fgaList: A(`
      ${soft(6, 6, 160, 168, 'var(--c-warn)', .2)}${soft(172, 6, 122, 168, 'var(--c-vein)', .18)}
      <g transform="translate(30 30)">${[0, 1, 2].map(i => `<path class="${i === 1 ? 'f-nerve' : 'f-white'}" transform="translate(${i * 17.3} 0)" d="M0 -10 L8.7 -5 L8.7 5 L0 10 L-8.7 5 L-8.7 -5 Z"/>`).join('')}</g>${T(47.3, 33.5, 'S', { s: 9, c: 'tagtx' })}
      ${qtag(118, 30, 'Phenothiazines', 9.5)}
      <g class="ans">${['Chlorpromazine', 'Fluphenazine', 'Perphenazine', 'Trifluoperazine', 'Thioridazine'].map((n, i) => `<g class="a-fadein" style="--d:${i}">${pill(24, 62 + i * 23, -20, 'f-warn', .8)}${T(38, 66 + i * 23, n, { s: 10, a: 'start' })}</g>`).join('')}</g>
      ${qtag(233, 30, 'Not phenothiazine', 9)}
      <g class="ans"><g class="a-fadein" style="--d:1">${pill(190, 64, -20, 'f-vein', .8)}${T(202, 68, 'Haloperidol', { s: 10, a: 'start' })}${T(233, 84, '(butyrophenone)', { s: 9, w: 600 })}</g>
        <g class="a-fadein" style="--d:3">${pill(190, 112, -20, 'f-vein', .8)}${T(202, 116, 'Thiothixene', { s: 10, a: 'start' })}${T(233, 132, '(thioxanthene)', { s: 9, w: 600 })}</g></g>`),

    /* 12. High- vs low-potency FGAs */
    highLow: A(`
      ${soft(4, 4, 144, 172, 'var(--c-bad)', .16)}${soft(152, 4, 144, 172, 'var(--c-vein)', .16)}
      ${qtag(76, 18, 'High potency', 10)}${qtag(224, 18, 'Low potency', 10)}
      <g class="ans"><g class="a-fadein">${T(76, 38, 'Haloperidol,', { s: 9.5 })}${T(76, 50, 'fluphenazine', { s: 9.5 })}${T(224, 38, 'Chlorpromazine,', { s: 9.5 })}${T(224, 50, 'thioridazine', { s: 9.5 })}</g></g>
      ${[['EPS', 74, 22], ['NMS', 50, 16], ['Sedation', 16, 70], ['Low BP', 14, 66], ['Anti-ACh', 14, 62]].map(([n, hv, lv], i) => {
        const y = 66 + i * 22;
        return [[8, hv, 'var(--c-bad)'], [156, lv, 'var(--c-vein)']].map(([x, v, col]) =>
          T(x + 4, y + 11, n, { s: 9, a: 'start' }) + `<rect x="${x + 54}" y="${y + 2}" width="80" height="12" rx="3" style="fill:none;stroke:var(--pic-ink);stroke-width:1;opacity:.5"/>` +
          `<g class="ans"><rect class="rx37-gx" x="${x + 54}" y="${y + 2}" width="${v}" height="12" rx="3" style="fill:${col};animation-delay:${i * .15}s"/></g>`).join('');
      }).join('')}`),

    /* 13. Second-generation: strong 5-HT2A, weaker D2 */
    sga: A(`
      <rect x="4" y="96" width="150" height="8" style="fill:var(--c-fat);stroke:var(--art-line);stroke-width:1"/>
      ${rec(40, 98, 'f-germ', 1.2)}${rec(118, 98, 'f-vein', 1.2)}${T(40, 118, '5-HT2A', { s: 10 })}${T(118, 118, 'D2', { s: 10 })}
      <g class="ans"><g class="a-pulse">${plug(40, 82, 'f-bad', 1.2)}</g><g class="a-bob" style="animation-duration:1.2s">${plug(118, 66, 'f-bad', 1)}</g></g>
      ${pill(80, 30, -15, 'f-germ', 1.5)}${T(80, 16, 'SGA', { s: 10 })}
      ${qtag(40, 142, 'Strong block', 9)}${qtag(118, 142, 'Weaker block', 9)}
      ${soft(160, 8, 136, 166, 'var(--c-good)', .14)}
      <circle class="f-skin" cx="176" cy="40" r="10"/><path d="M171 42 q5 5 10 0" style="fill:none;stroke:var(--art-line);stroke-width:1.6"/>
      ${person(176, 98, .85)}
      ${scaleIcon(176, 140, .8)}<g class="ans"><g class="a-bob">${arr('M176 130 V114', 'var(--c-bad)', '', 2.5)}</g></g>
      ${qtag(240, 40, '+ and − symptoms', 9)}${qtag(240, 88, 'Fewer EPS', 9.5)}${qtag(240, 140, 'More metabolic', 9.5)}`),

    /* 14. Metabolic syndrome from SGAs */
    metabolic: A(`
      ${gauge(60, 58, 30, 125)}${T(60, 18, 'weight', { s: 9 })}
      ${qtag(60, 82, 'Weight gain', 9.5)}
      <g transform="translate(30 116)"><g class="a-bob">${drop(0, 0, 1.4, 'f-blood')}</g></g>${T(30, 122, 'A1c', { s: 9, c: 'on' })}
      <g transform="translate(88 116)"><g class="a-pulse"><circle class="f-fat" r="10"/><circle class="f-fat" cx="10" cy="6" r="6"/></g></g>
      ${qtag(30, 146, 'Diabetes', 9)}${qtag(92, 146, 'High lipids', 9)}
      ${tag(62, 168, 'Heart risk ↑', 'ans', 9.5)}
      ${soft(130, 8, 166, 118, 'var(--c-warn)', .18)}
      ${T(212, 22, 'Risk by drug', { s: 10 })}
      ${[['Clozapine', 92, 'var(--c-bad)'], ['Olanzapine', 92, 'var(--c-bad)'], ['Quetiapine', 52, 'var(--c-warn)'], ['Risperidone', 46, 'var(--c-warn)']].map(([n, v, c], i) =>
        T(136, 46 + i * 21, n, { s: 9.5, a: 'start' }) + `<rect x="196" y="${36 + i * 21}" width="94" height="13" rx="3" style="fill:none;stroke:var(--pic-ink);stroke-width:1;opacity:.5"/>` +
        `<g class="ans"><rect class="rx37-gx" x="196" y="${36 + i * 21}" width="${v}" height="13" rx="3" style="fill:${c};animation-delay:${i * .2}s"/></g>`).join('')}
      ${qtag(212, 146, 'Worst: clozapine, olanzapine', 9)}`),

    /* 15. Drug-induced movement disorders on a timeline */
    dimd: A(`
      <path d="M14 104 H286" style="stroke:var(--pic-ink);stroke-width:3;stroke-linecap:round"/>
      ${[['hours', 40], ['days', 100], ['weeks', 170], ['months–years', 245]].map(([t, x]) => `<path d="M${x} 99 V109" style="stroke:var(--pic-ink);stroke-width:1.5"/>${T(x, 95, t, { s: 9 })}`).join('')}
      <g class="ansmotion"><circle class="f-warn" r="6"><animateMotion dur="4s" repeatCount="indefinite" path="M14 104 H286"/></circle></g>
      <g class="a-sway">${G(48, 58, 1, `<circle class="f-skin" cx="0" cy="0" r="12" transform="rotate(-25)"/><circle cx="-4" cy="-6" r="1.8" style="fill:var(--art-line)"/><circle cx="4" cy="-6" r="1.8" style="fill:var(--art-line)"/><path d="M0 12 Q6 20 2 26" style="fill:none;stroke:var(--c-skin);stroke-width:6"/>`)}</g>
      <g class="a-shake">${person(110, 80, 1.1)}</g>
      <g class="rx37-pace" style="--dx:16px">${person(164, 80, 1.1)}</g>
      <circle class="f-skin" cx="246" cy="58" r="15"/><path class="f-mouth" d="M238 64 q8 6 16 0 q-8 3 -16 0 Z"/><g class="a-squeeze"><path class="f-stomach" d="M248 66 q8 0 10 4 q-6 2 -10 -1 Z"/></g>
      <g class="ans">${tag(105, 18, 'Early: EPS', '', 9.5)}${tag(245, 18, 'Late', '', 9.5)}</g>
      ${qtag(50, 126, 'Acute dystonia', 9)}${qtag(172, 126, 'Akathisia', 9)}
      ${qtag(110, 152, 'Parkinsonism', 9)}${qtag(244, 152, 'Tardive dyskinesia', 9)}
      ${tag(46, 170, 'More with FGAs', 'ans', 9)}`),

    /* 16. Acute dystonia */
    dystonia: A(`
      <g class="a-sway" style="animation-duration:1.6s">
        <path class="f-skin" d="M96 150 Q100 128 110 116 L124 116 Q126 130 132 150 Z"/>
        <g transform="rotate(-24 112 80)"><circle class="f-skin" cx="112" cy="80" r="32"/>
          <circle class="f-white" cx="100" cy="74" r="7"/><circle class="f-white" cx="124" cy="74" r="7"/>
          <circle cx="100" cy="74" r="3" style="fill:var(--art-line)"/><circle cx="124" cy="74" r="3" style="fill:var(--art-line)"/>
          <g class="ans"><circle class="f-white noline" cx="100" cy="74" r="6"/><circle class="f-white noline" cx="124" cy="74" r="6"/><circle cx="100" cy="68.5" r="3" style="fill:var(--art-line)"/><circle cx="124" cy="68.5" r="3" style="fill:var(--art-line)"/>
            <ellipse class="f-mouth" cx="112" cy="96" rx="8" ry="5"/><path class="f-stomach" d="M106 98 q6 16 12 0 Z"/></g></g></g>
      ${qtag(112, 20, 'Eyes roll up', 9.5)}${qtag(54, 146, 'Twisted neck', 9.5)}${qtag(150, 122, 'Tongue out', 9.5)}
      ${clock(238, 34, 15, 200)}
      ${qtag(238, 66, '24–96 hours', 9.5)}
      ${warn(208, 106, 1.1)}<g class="ans"><g class="a-blink">${ln('M230 96 v20 M236 96 v20', 'var(--c-bad)', 3)}</g></g>
      ${qtag(238, 134, 'Laryngeal = emergency', 9)}
      ${tag(238, 160, 'Young males at risk', 'ans', 9)}`),

    /* 17. Akathisia */
    akathisia: A(`
      <path d="M8 122 H292" style="stroke:var(--pic-ink);stroke-width:2"/>
      <path class="f-food" d="M18 94 h30 v6 h-30 Z M20 100 v22 M46 100 v22 M44 94 V64 h4 v30" style="stroke:var(--art-line);stroke-width:2"/>
      <g class="rx37-pace" style="--dx:170px"><g class="a-shake">${person(76, 120, 1.5)}</g></g>
      <g class="ans">${[110, 140, 170, 200, 230].map((x, i) => `<ellipse cx="${x}" cy="${i % 2 ? 128 : 132}" rx="5" ry="2.5" class="a-blink" style="fill:var(--c-scar);animation-delay:${i * .2}s"/>`).join('')}
        <path class="s-warn a-flow" d="M64 54 q6 -8 12 0 t12 0" style="stroke-width:2.5"/></g>
      ${qtag(150, 22, 'Inner restlessness', 9.5)}
      ${qtag(230, 60, 'Pacing, rocking', 9.5)}
      ${qtag(66, 146, 'Within weeks', 9.5)}${qtag(214, 146, 'Looks like anxiety', 9.5)}
      ${tag(150, 168, 'Fix: lower dose or switch', 'ans', 9.5)}`),

    /* 18. Pseudoparkinsonism */
    parkinson: A(`
      <path d="M8 146 H190" style="stroke:var(--pic-ink);stroke-width:2"/>
      <g class="a-bob" style="animation-duration:1s">
        <path d="M86 60 Q98 84 96 108 M96 108 L90 144 M96 108 L104 144" style="fill:none;stroke:var(--pic-ink);stroke-width:4;stroke-linecap:round"/>
        <path d="M90 74 L108 96 L118 100" style="fill:none;stroke:var(--pic-ink);stroke-width:4;stroke-linecap:round"/>
        <circle class="f-skin" cx="80" cy="50" r="13"/><circle cx="74" cy="48" r="1.8" style="fill:var(--art-line)"/><path d="M70 56 H78" style="stroke:var(--art-line);stroke-width:1.6"/></g>
      <g class="a-shake" style="animation-duration:.25s"><circle class="f-skin" cx="122" cy="101" r="5"/></g>
      <g transform="translate(106 96)"><g class="a-spin" style="animation-duration:2s;animation-timing-function:steps(8)">${[0, 45, 90, 135].map(a => `<rect class="f-scar" x="-2" y="-9" width="4" height="18" transform="rotate(${a})"/>`).join('')}<circle class="f-scar" r="6"/></g></g>
      ${qtag(80, 22, 'Mask face', 9.5)}${qtag(156, 84, 'Tremor', 9.5)}${qtag(150, 118, 'Rigid, cogwheel', 9)}
      ${qtag(70, 164, 'Shuffling, stooped', 9.5)}
      ${cal(246, 52, '', 1.3)}<g class="ans">${T(246, 66, '5–30', { s: 11, c: 'tagtx' })}</g>
      ${qtag(246, 92, '5–30 days', 9.5)}
      ${tag(246, 130, 'More with FGAs', 'ans', 9.5)}${tag(246, 156, 'Switch to low EPS', 'ans', 9.5)}`),

    /* 19. Tardive dyskinesia */
    td: A(`
      <circle class="f-skin" cx="80" cy="84" r="54"/>
      <circle cx="62" cy="68" r="3" style="fill:var(--art-line)"/><circle cx="98" cy="68" r="3" style="fill:var(--art-line)"/>
      <g class="a-squeeze" style="animation-duration:.8s"><path class="f-mouth" d="M58 108 Q80 98 102 108 Q80 120 58 108 Z"/></g>
      <g class="ans"><rect class="f-stomach rx37-tongue" x="96" y="104" width="20" height="8" rx="4"/>
        <path class="s-warn a-flow" d="M44 116 q-8 8 0 16 M116 116 q8 8 0 16" style="stroke-width:2.2"/></g>
      ${qtag(80, 18, 'Lip smacking, grimacing', 9)}${qtag(80, 160, 'Tongue, jaw, chewing', 9)}
      ${cal(240, 44, '', 1.3)}<g class="ans"><g class="a-blink">${T(240, 58, 'yrs', { s: 11, c: 'tagtx' })}</g></g>
      ${qtag(240, 84, 'Months to years', 9.5)}
      <g class="a-sway">${person(180, 150, 1)}</g>
      ${qtag(246, 124, 'Trunk, limbs twist', 9)}
      ${qtag(244, 162, 'May be permanent', 9)}`),

    /* 20. AIMS */
    aims: A(`
      ${clip(14, 26, 156, 146)}
      ${['Face', 'Lips, jaw', 'Tongue', 'Arms, legs', 'Trunk'].map((n, i) => T(24, 52 + i * 23, n, { s: 9.5, a: 'start', c: 'tagtx' }) +
        [0, 1, 2, 3, 4].map(k => `<circle cx="${92 + k * 15}" cy="${48 + i * 23}" r="5" style="fill:none;stroke:var(--art-line);stroke-width:1.2"/>`).join('')).join('')}
      ${[0, 1, 2, 3, 4].map(k => T(92 + k * 15, 38, String(k), { s: 9, c: 'tagtx' })).join('')}
      <g class="ans">${[2, 1, 3, 0, 1].map((k, i) => `<circle class="f-bad a-pop" style="--d:${i}" cx="${92 + k * 15}" cy="${48 + i * 23}" r="4.5"/>`).join('')}</g>
      ${qtag(234, 40, 'AIMS', 12)}
      ${tag(234, 66, 'Abnormal Involuntary', 'ans', 9)}${tag(234, 84, 'Movement Scale', 'ans', 9)}
      ${T(234, 110, 'none → severe', { s: 9 })}
      ${cal(212, 144, '', .9)}${cal(258, 144, '', .9)}
      <g class="ans">${check(212, 146, 6, 6)}${check(258, 146, 7, 6)}</g>
      ${qtag(234, 168, 'Baseline + follow-up', 9)}`),

    /* 21. VMAT2 inhibitors for TD */
    vmat2: A(`
      <path class="f-nerve" d="M20 8 H160 V90 Q160 116 134 116 H46 Q20 116 20 90 Z" style="opacity:.55"/>
      <circle class="f-white" cx="60" cy="66" r="22"/><circle class="f-white" cx="120" cy="66" r="22"/>
      ${[[52, 60], [64, 58], [58, 72], [68, 70], [50, 72]].map(([x, y]) => da(x, y, 3.5)).join('')}
      <g class="ans"><g class="rx37-dim">${[[112, 60], [124, 58], [118, 72]].map(([x, y]) => da(x, y, 3.5)).join('')}</g></g>
      ${[[52, 60], [124, 58], [118, 72]].map(() => '').join('')}
      <rect class="f-good" x="134" y="44" width="10" height="16" rx="3"/>
      <g class="ans"><g class="a-pop" style="--d:1"><rect class="f-bad" x="132" y="40" width="14" height="9" rx="3"/></g></g>
      <path class="s-nerve a-flow" d="M156 30 Q148 44 142 50" style="stroke-width:2"/>${da(158, 26, 3)}
      ${qtag(170, 60, 'VMAT2', 9.5)}
      <path d="M8 140 H172" style="stroke:var(--c-fat);stroke-width:8"/>${rec(60, 140, 'f-vein')}${rec(120, 140, 'f-vein')}
      <g class="ansmotion">${[0, 1].map(b => `<circle class="f-nerve" r="3"><animateMotion dur="2s" begin="${b}s" repeatCount="indefinite" path="M90 116 L90 132"/></circle>`).join('')}</g>
      ${qtag(234, 24, 'VMAT2 inhibitors', 9.5)}
      ${qtag(234, 56, 'Valbenazine', 9.5)}${qtag(234, 82, 'Deutetrabenazine', 9.5)}
      ${qtag(234, 118, 'Less DA released', 9.5)}
      ${tag(234, 148, 'For severe, disabling TD', 'ans', 9)}${tag(234, 168, 'Valbenazine: QT, sleepy', 'ans', 9)}`),

    /* 22. Neuroleptic malignant syndrome */
    nms: A(`
      ${thermo(28, 22, 108)}${T(48, 30, '41°C', { s: 9.5, a: 'start' })}
      ${qtag(30, 168, 'High fever', 9)}
      <rect class="f-scar" x="74" y="34" width="62" height="16" rx="3"/><path class="f-scar" d="M74 30 h10 v24 h-10 Z M126 30 h10 v24 h-10 Z"/>
      <g class="ans"><g class="a-shake" style="animation-duration:.3s">${ln('M76 62 h56', 'var(--c-bad)', 2)}</g></g>
      ${qtag(106, 76, 'Lead-pipe rigidity', 9)}
      <path d="M180 54 a20 20 0 0 1 40 0 Z" class="f-white"/><path d="M180 54 a20 20 0 0 1 40 0" style="fill:none;stroke:var(--c-warn);stroke-width:5"/>
      <g class="rx37-swing" style="transform-origin:200px 54px;--r:110deg"><path d="M200 54 L184 46" style="stroke:var(--art-line);stroke-width:2.6;stroke-linecap:round"/></g>${T(200, 66, 'BP', { s: 9 })}
      ${qtag(200, 82, 'Unstable BP', 9)}
      <g class="a-sway">${G(264, 40, 1, `<circle class="f-skin" r="14"/><path d="M-6 -4 l4 4 m0 -4 l-4 4 M2 -4 l4 4 m0 -4 l-4 4" style="stroke:var(--art-line);stroke-width:1.5"/><path d="M-5 7 q5 -3 10 0" style="fill:none;stroke:var(--art-line);stroke-width:1.5"/>`)}</g>
      ${qtag(262, 76, 'Confusion', 9)}
      ${vial(100, 118, 'var(--c-blood)', .8)}${T(122, 116, 'CK', { s: 10, a: 'start' })}${T(122, 128, 'WBC', { s: 10, a: 'start' })}
      <g class="ans"><g class="a-bob">${arr('M156 128 V108', 'var(--c-bad)', '', 2.5)}</g></g>
      ${qtag(124, 150, 'High CK, WBC', 9)}
      <g class="a-pulse">${G(226, 120, 1, `<path class="f-muscle" d="M14 0 C26 0 32 12 30 24 C28 36 22 44 12 43 C4 42 0 34 5 28 C9 24 9 19 5 15 C1 9 4 0 14 0 Z" transform="scale(.7)"/>`)}</g>
      ${qtag(240, 150, 'Kidney failure', 9)}
      ${tag(170, 170, 'Emergency', 'ans', 9.5)}`),

    /* 23. Black box: dementia-related psychosis */
    dementia: A(`
      <rect x="4" y="4" width="292" height="172" rx="6" style="fill:none;stroke:var(--pic-ink);stroke-width:5"/>
      <rect x="4" y="4" width="292" height="22" rx="4" style="fill:var(--pic-ink)"/>
      <text x="150" y="19.5" text-anchor="middle" style="font-size:11px;font-weight:800;fill:var(--surface)">BLACK BOX WARNING</text>
      ${person(52, 140, 2)}<path d="M66 102 Q72 100 72 106 V140" style="fill:none;stroke:var(--c-food);stroke-width:3;stroke-linecap:round"/>
      <circle class="f-scar noline" cx="52" cy="78" r="9" style="opacity:.8"/>
      ${G(118, 46, .5, brainBase())}
      <g class="ans"><g class="a-blink"><circle class="f-tumor" cx="180" cy="60" r="7"/></g>
        <path class="s-bad a-flow" d="M160 60 H172" style="stroke-width:3"/></g>
      ${pill(150, 120, -15, 'f-germ', 1.5)}<g class="ans"><g class="a-pulse">${nope(150, 120, 16)}</g></g>
      ${qtag(240, 48, 'Stroke, TIA', 9.5)}${qtag(240, 80, 'Higher death risk', 9.5)}
      ${qtag(214, 118, 'Not approved for', 9.5)}${tag(214, 140, 'dementia psychosis', 'ans', 9.5)}
      ${T(52, 166, 'older adult with dementia', { s: 9, a: 'start' }).replace('x="52"', 'x="18"')}`),

    /* 24. Haloperidol */
    haldol: A(`
      ${pill(34, 30, -20, 'f-vein', 1.5)}${T(64, 34, 'Haloperidol', { s: 10, a: 'start' })}
      ${qtag(70, 58, 'High-potency FGA', 9.5)}
      ${syringe(40, 98, -30, 1.3)}<g class="ans"><g class="a-drop">${drop(66, 104, .7, 'f-water')}</g></g>
      ${qtag(46, 128, 'Agitation: IM', 9.5)}
      ${cal(128, 98, '', 1.3)}<g class="ans">${T(128, 112, '4 wk', { s: 10, c: 'tagtx' })}</g>
      ${qtag(133, 128, 'Decanoate q4 wk', 9)}
      ${gauge(230, 52, 26, 140)}${T(230, 66, 'EPS', { s: 9 })}
      ${qtag(230, 84, 'Very high EPS', 9.5)}
      <g class="ans"><g class="a-pulse">${nope(212, 120, 13)}</g></g>${person(212, 132, .8)}
      ${qtag(236, 150, 'Avoid: Parkinson, Lewy', 9)}
      ${tag(80, 160, 'Check AIMS q3–6 mo, eyes', 'ans', 9)}`),

    /* 25. Fluphenazine */
    fluph: A(`
      ${pill(34, 30, -20, 'f-warn', 1.5)}${T(64, 34, 'Fluphenazine', { s: 10, a: 'start' })}
      ${qtag(80, 58, 'High-potency phenothiazine', 9)}
      ${syringe(40, 102, -30, 1.3)}
      ${cal(110, 100, '', 1.3)}<g class="ans">${T(110, 114, '2 wk', { s: 10, c: 'tagtx' })}<g class="a-blink"><circle cx="110" cy="85" r="4" class="f-bad"/></g></g>
      ${qtag(76, 132, 'Decanoate q2 wk', 9.5)}
      ${vial(200, 40, 'var(--c-blood)', .7)}<g class="ans">${[0, 1, 2].map(i => `<g class="a-pop" style="--d:${i}">${neut(222 + i * 20, 36, 7)}</g>`).join('')}</g>
      ${qtag(236, 70, 'CBC, prolactin, EPS', 9)}
      <g class="ans"><g class="a-pulse">${nope(196, 110, 12)}${nope(238, 110, 12)}${nope(278, 110, 12)}</g></g>
      ${T(196, 114, 'BPH', { s: 9 })}${T(238, 114, 'eye', { s: 9 })}${T(278, 114, '<12', { s: 9 })}
      ${qtag(236, 140, 'Avoid: BPH, glaucoma', 9)}
      ${tag(236, 162, 'Not under age 12', 'ans', 9)}`),

    /* 26. Clozapine serious risks */
    cloBox: A(`
      <path d="M14 18 V118 H124" style="fill:none;stroke:var(--pic-ink);stroke-width:1.5"/>${T(16, 14, 'ANC', { s: 9, a: 'start' })}
      <path d="M14 96 H124" style="stroke:var(--c-bad);stroke-width:1.5;stroke-dasharray:4 3"/>${T(122, 92, '500', { s: 9, a: 'end' })}
      ${ln('M16 34 C40 34 50 40 60 50', 'var(--c-good)', 3)}
      <g class="ans"><path class="a-draw" d="M60 50 C72 66 80 104 96 108 C108 110 116 108 122 110" style="fill:none;stroke:var(--c-bad);stroke-width:3;stroke-linecap:round"/></g>
      ${T(68, 130, 'first 18 weeks', { s: 9 })}
      ${qtag(68, 150, 'Severe neutropenia', 9.5)}
      <g class="a-beat">${heart(180, 40, 1.4, 'f-blood')}</g><g class="ans"><g class="a-blink"><path class="f-warn" d="M172 34 q4 -10 8 -2 q4 -10 8 2 q-8 8 -16 0 Z"/></g></g>
      ${qtag(180, 74, 'Myocarditis', 9.5)}${tag(180, 92, '1st month', 'ans', 9)}
      <path class="f-large" d="M240 26 h26 a8 8 0 0 1 0 16 h-20 a8 8 0 0 0 0 16 h22" style="fill:none;stroke:var(--c-large);stroke-width:9;stroke-linecap:round"/>
      <g class="ans"><circle class="f-stool a-pulse" cx="248" cy="58" r="5"/></g>
      ${qtag(254, 82, 'Constipation', 9.5)}
      <circle class="f-skin" cx="180" cy="130" r="16"/><path d="M172 136 q8 5 16 0" style="fill:none;stroke:var(--art-line);stroke-width:1.6"/>
      <g class="ans"><g class="a-drop">${drop(186, 152, .7, 'f-water')}</g></g>
      ${qtag(180, 166, 'Drooling', 9.5)}
      ${G(232, 132, .8, `<path d="M0 0 h8 l3 -12 l4 20 l3 -8 h20 q6 -10 12 0 h6" style="fill:none;stroke:var(--c-bad);stroke-width:2.5"/>`)}
      ${qtag(260, 156, 'QT, seizures', 9.5)}`),

    /* 27. Risperidone */
    risp: A(`
      ${pill(30, 26, -20, 'f-germ', 1.4)}${T(56, 30, 'Risperidone', { s: 10, a: 'start' })}
      ${gauge(70, 84, 32, 135)}${T(70, 100, 'prolactin', { s: 9 })}
      ${qtag(70, 118, 'High prolactin', 9.5)}
      ${tag(70, 140, 'Gynecomastia', 'ans', 9.5)}
      ${soft(146, 8, 150, 82, 'var(--c-warn)', .18)}
      ${[0, 1, 2, 3].map(i => `<rect x="${160 + i * 20}" y="${70 - i * 12}" width="14" height="${8 + i * 12}" rx="2" style="fill:var(--c-scar);opacity:${.5 + i * .15}"/>`).join('')}${T(190, 88, 'dose', { s: 9 })}
      <g class="ans"><g class="a-shake">${person(260, 74, 1)}</g></g>
      ${qtag(250, 24, 'EPS at high dose', 9)}
      ${syringe(170, 124, -30, 1.1)}
      ${cal(222, 126, '', .9)}<g class="ans">${T(222, 136, '2 wk', { s: 9, c: 'tagtx' })}</g>${cal(268, 126, '', .9)}<g class="ans">${T(268, 136, '1 mo', { s: 9, c: 'tagtx' })}</g>
      ${qtag(222, 158, 'Consta 2 wk; Perseris', 9)}
      ${tag(60, 166, 'SZ, bipolar I, autism', 'ans', 9)}`),

    /* 28. Olanzapine */
    olanz: A(`
      ${pill(28, 22, -20, 'f-gall', 1.3)}${T(52, 26, 'Olanzapine', { s: 10, a: 'start' })}
      ${gauge(64, 82, 34, 150)}${T(64, 98, 'weight', { s: 9 })}
      ${qtag(64, 118, 'Most weight gain', 9.5)}
      ${tag(64, 140, 'Highest metabolic risk', 'ans', 9)}
      <rect class="f-white" x="150" y="36" width="44" height="9" rx="2"/><rect class="f-large" x="194" y="36" width="14" height="9" rx="2"/>
      <g class="ans"><g class="a-rise">${ln('M146 34 q-6 -8 0 -14 q6 -6 0 -14', 'var(--c-scar)', 2.5)}</g></g>
      <rect x="226" y="20" width="16" height="40" rx="3" style="fill:none;stroke:var(--pic-ink);stroke-width:1.2"/>
      <rect class="f-gall rx37-drain" x="228" y="22" width="12" height="36" rx="2"/>${T(234, 72, 'level', { s: 9 })}
      ${qtag(200, 88, 'Smoking lowers it', 9.5)}
      ${syringe(160, 130, -30, 1.1)}${clock(214, 128, 14, 90)}
      <g class="ans">${T(214, 156, '3 hr', { s: 10 })}</g>
      ${qtag(234, 168, 'Relprevv: 3-hr watch', 9)}`),

    /* 29. Quetiapine */
    quet: A(`
      ${[52, 150, 248].map(x => soft(x - 47, 6, 94, 80, 'var(--c-vein)', .14) + soft(x - 47, 94, 94, 80, 'var(--c-germ)', .14)).join('')}
      ${gauge(52, 50, 22, 30)}${T(52, 64, 'EPS', { s: 9 })}
      <path class="f-nerve" d="M144 22 a18 18 0 1 0 18 24 a14 14 0 1 1 -18 -24 Z"/>${zzz(166, 46)}
      ${person(232, 66, 1)}<g class="ans"><g class="a-sway">${ln('M250 30 l4 4 m-4 0 l4 -4 M258 26 l4 4 m-4 0 l4 -4', 'var(--c-warn)', 2)}</g><g class="a-bob">${arr('M270 30 V54', 'var(--c-vein)', '', 2.5)}</g></g>
      ${scaleIcon(52, 132, .9)}<g class="ans"><g class="a-bob">${arr('M52 122 V108', 'var(--c-bad)', '', 2.5)}</g></g>
      <path class="a-draw" d="M106 132 h10 l3 -14 l4 22 l3 -8 h18 q8 -12 16 0 h12" style="fill:none;stroke:var(--c-bad);stroke-width:2.5"/>
      ${G(248, 132, 1, `<rect class="f-white" x="-14" y="-16" width="28" height="28" rx="4"/>${ln('M-8 -8 h16 M-8 -2 h16 M-8 4 h10', 'var(--art-line)', 1.4)}`)}
      ${qtag(52, 76, 'Very low EPS', 9)}${qtag(150, 76, 'Sedating', 9.5)}${qtag(248, 76, 'Orthostatic BP', 9)}
      ${qtag(52, 164, 'Weight gain', 9.5)}${qtag(150, 164, 'QT longer', 9.5)}${qtag(248, 164, 'Report suicidality', 9)}`),

    /* 30. Antipsychotics that prolong QT */
    qt: A(`
      ${soft(6, 6, 288, 74, 'var(--c-good)', .12)}
      <path d="${ecg(14, 60, 2.2)}" class="a-draw" style="fill:none;stroke:var(--c-bad);stroke-width:2.4;stroke-linejoin:round"/>
      <g class="ans"><path d="M39 72 V76 H95 V72" style="fill:none;stroke:var(--pic-ink);stroke-width:1.5"/></g>
      ${qtag(84, 20, 'Long QT', 9.5)}
      ${tag(222, 20, 'Check ECG + other QT drugs', 'ans', 9)}
      ${qtag(52, 102, 'Ziprasidone', 9.5)}${qtag(150, 102, 'Quetiapine', 9.5)}${qtag(248, 102, 'Haloperidol', 9.5)}
      ${qtag(52, 130, 'Paliperidone', 9.5)}${qtag(150, 130, 'Iloperidone', 9.5)}${qtag(248, 130, 'Asenapine', 9.5)}
      ${qtag(52, 158, 'Chlorpromazine', 9)}${qtag(150, 158, 'Thioridazine', 9.5)}${qtag(248, 158, 'Pimozide', 9.5)}`),

    /* 31. Aripiprazole: D2 partial agonist ("dimmer") */
    ari: A(`
      ${soft(4, 28, 144, 96, 'var(--c-bad)', .14)}${soft(152, 28, 144, 96, 'var(--c-vein)', .14)}
      ${T(76, 44, 'Dopamine HIGH', { s: 10 })}${T(224, 44, 'Dopamine LOW', { s: 10 })}
      ${[[40, 62], [56, 56], [30, 74], [60, 76]].map(([x, y]) => da(x, y, 3.5)).join('')}${da(206, 66, 3.5)}
      <rect x="10" y="96" width="132" height="7" style="fill:var(--c-fat);stroke:var(--art-line);stroke-width:1"/><rect x="158" y="96" width="132" height="7" style="fill:var(--c-fat);stroke:var(--art-line);stroke-width:1"/>
      ${rec(50, 98, 'f-vein')}${rec(198, 98, 'f-vein')}
      <g class="ans"><g class="a-pop">${plug(50, 84, 'f-good')}</g><g class="a-pop" style="--d:1">${plug(198, 84, 'f-good')}</g></g>
      <path class="f-white" d="M98 72 a12 12 0 1 1 18 0 v8 h-18 Z"/><rect class="f-scar" x="99" y="80" width="16" height="6" rx="1"/>
      <circle class="f-nerve noline rx37-dim" cx="107" cy="66" r="15" style="opacity:.9"/>
      <path class="f-white" d="M246 72 a12 12 0 1 1 18 0 v8 h-18 Z"/><rect class="f-scar" x="247" y="80" width="16" height="6" rx="1"/>
      <circle class="f-nerve noline rx37-lit" cx="255" cy="66" r="15" style="opacity:.06"/>
      ${qtag(76, 116, 'Turns signal down', 9)}${qtag(224, 116, 'Turns signal up', 9)}
      ${qtag(150, 14, 'D2 partial agonist (TGA)', 9.5)}
      ${qtag(76, 144, 'Low weight, prolactin', 9)}${qtag(224, 144, 'Akathisia', 9.5)}
      ${tag(150, 168, 'FDA: impulse control (gambling, binge eating)', 'ans', 9)}`),

    /* 32. Take with food: lurasidone, ziprasidone */
    food: A(`
      <ellipse class="f-white" cx="74" cy="92" rx="56" ry="20"/><ellipse cx="74" cy="90" rx="42" ry="13" style="fill:none;stroke:var(--c-scar);stroke-width:1.2"/>
      <path class="f-food" d="M50 86 q24 -26 48 0 Z"/><rect class="f-gall" x="48" y="86" width="52" height="6" rx="2"/><path class="f-food" d="M50 92 h48 q0 8 -24 8 q-24 0 -24 -8 Z"/>
      ${pill(28, 40, -20, 'f-vein', 1.4)}${T(28, 24, 'lurasidone', { s: 9, a: 'start' }).replace('x="28"', 'x="12"')}
      <path class="f-nerve" d="M126 22 a14 14 0 1 0 14 18 a11 11 0 1 1 -14 -18 Z"/>
      ${qtag(74, 128, '350+ calories', 10)}${tag(74, 150, 'Often at dinner', 'ans', 9.5)}
      ${pill(232, 40, -20, 'f-warn', 1.4)}${T(232, 24, 'ziprasidone', { s: 9 })}
      <ellipse class="f-white" cx="232" cy="92" rx="44" ry="16"/><path class="f-food" d="M210 88 q22 -18 44 0 Z"/>
      ${qtag(232, 128, 'With food', 10)}
      <path d="M150 160 H292" style="stroke:var(--c-blood);stroke-width:10;stroke-linecap:round"/>
      <g class="ans"><path class="s-white a-flow" d="M272 104 Q290 130 282 152 M100 106 Q130 140 160 154" style="stroke-width:2.5;stroke:var(--c-warn)"/></g>
      ${tag(222, 160, 'Better absorption', 'ans', 9.5)}`),

    /* 33. Long-acting injectables */
    lai: A(`
      ${T(8, 18, 'Daily pills', { s: 10, a: 'start' })}
      ${Array.from({ length: 14 }, (_, i) => pill(16 + i * 20, 34, -20, 'f-germ', .75)).join('')}
      <g class="ans">${[2, 5, 6, 9, 12].map((i, k) => `<g class="a-pop" style="--d:${k}">${cross(16 + i * 20, 34, 6)}</g>`).join('')}</g>
      ${qtag(150, 56, 'Poor adherence', 10)}
      ${syringe(30, 96, -30, 1.4)}
      <path d="M58 104 H292" style="stroke:var(--pic-ink);stroke-width:1;opacity:.5"/>
      <g class="ans"><path class="a-draw" d="M58 88 C80 80 120 82 160 86 S240 88 292 86" style="fill:none;stroke:var(--c-good);stroke-width:3"/></g>
      ${T(174, 100, 'steady level for weeks', { s: 9 })}
      ${tag(60, 128, 'Stable on oral first', 'ans', 9)}
      ${qtag(186, 128, 'Haloperidol decanoate', 9)}
      ${qtag(64, 152, 'Fluphenazine dec.', 9)}${qtag(180, 152, 'Risperdal Consta', 9)}
      ${qtag(80, 170, 'Invega Sustenna', 9)}${qtag(210, 170, 'Abilify Maintena', 9)}`),

    /* 34. Never stop suddenly: taper */
    stop: A(`
      ${soft(4, 4, 140, 172, 'var(--c-bad)', .14)}${soft(152, 4, 144, 172, 'var(--c-good)', .14)}
      <path class="f-scar" d="M8 40 H70 V170 H8 Z"/>
      ${pill(52, 32, -15, 'f-germ', 1.2)}
      <g class="ans"><g class="a-drop" style="animation-duration:1.2s">${pill(84, 70, 60, 'f-germ', 1.2)}</g></g>
      ${qtag(104, 24, 'Stop suddenly?', 9)}
      <g class="ans">${warn(100, 100, 1)}${T(76, 126, 'withdrawal', { s: 9, a: 'start' })}${T(76, 137, 'dyskinesia,', { s: 9, a: 'start' })}${T(76, 148, 'nausea, sweats,', { s: 9, a: 'start' })}${T(76, 159, 'relapse, NMS', { s: 9, a: 'start' })}</g>
      <path class="f-good" d="M160 40 H196 V70 H226 V100 H256 V130 H290 V170 H160 Z" style="opacity:.9"/>
      <g class="ansmotion"><g>${pill(0, 0, -15, 'f-germ', 1)}<animateMotion dur="4s" repeatCount="indefinite" path="M178 32 H200 V62 H230 V92 H260 V122 H284"/></g></g>
      ${qtag(225, 150, 'Taper slowly', 10)}
      ${tag(225, 24, 'Watch for symptoms', 'ans', 9)}`),

    /* 35. Monitoring */
    monitor: A(`
      ${[[50, 30], [150, 30], [250, 30], [50, 100], [150, 100], [250, 100]].map(([x, y]) => soft(x - 46, y - 24, 92, 64, 'var(--c-vein)', .13)).join('')}
      ${scaleIcon(50, 22, .9)}${drop(150, 22, 1.4, 'f-blood')}<circle class="f-fat" cx="244" cy="22" r="9"/><circle class="f-fat" cx="258" cy="18" r="6"/>
      ${gauge(50, 98, 16, 120)}
      <path class="a-draw" d="M112 92 h8 l3 -12 l4 18 l3 -6 h14 q6 -10 12 0 h14" style="fill:none;stroke:var(--c-bad);stroke-width:2.2"/>
      ${clip(234, 74, 32, 32)}${ln('M240 88 h20 M240 94 h20 M240 100 h14', 'var(--art-line)', 1.2)}
      <g class="ans">${[[76, 14], [176, 14], [276, 14], [76, 84], [176, 84], [276, 84]].map(([x, y], i) => check(x, y, i, 6)).join('')}</g>
      ${qtag(50, 46, 'Weight, BMI', 9)}${qtag(150, 46, 'Glucose, A1c', 9)}${qtag(250, 46, 'Lipids', 9.5)}
      ${qtag(50, 116, 'Prolactin', 9.5)}${qtag(150, 116, 'ECG (QT)', 9.5)}${qtag(250, 116, 'AIMS', 9.5)}
      ${tag(150, 160, 'Also: fall risk, suicide risk', 'ans', 9.5)}`),

    /* 36. Smoking speeds clearance of clozapine and olanzapine */
    smoke: A(`
      <rect class="f-white" x="10" y="80" width="46" height="10" rx="2"/><rect class="f-large" x="56" y="80" width="14" height="10" rx="2"/><circle class="f-bad" cx="12" cy="85" r="3"/>
      <g class="a-rise">${ln('M14 76 q-6 -8 0 -14 q6 -6 0 -14', 'var(--c-scar)', 2.5)}</g>
      ${arr('M76 85 H98', 'var(--pic-ink)', 'a-flow')}
      <path class="f-liver" d="M104 70 C116 60 160 58 176 64 C186 68 186 76 178 82 C164 94 136 106 116 102 C104 98 100 82 104 70 Z"/>
      <g transform="translate(142 80)"><g class="a-spin" style="animation-duration:1s">${[0, 45, 90, 135].map(a => `<rect class="f-nerve" x="-2.5" y="-12" width="5" height="24" transform="rotate(${a})"/>`).join('')}<circle class="f-nerve" r="8"/></g></g>
      ${T(142, 120, 'CYP1A2 sped up', { s: 9 })}
      ${pill(218, 40, -20, 'f-spleen', 1.2)}${pill(254, 40, -20, 'f-gall', 1.2)}
      <rect x="226" y="62" width="20" height="54" rx="3" style="fill:none;stroke:var(--pic-ink);stroke-width:1.2"/>
      <rect class="f-spleen rx37-drain" x="228" y="64" width="16" height="50" rx="2"/>${T(236, 128, 'blood level', { s: 9 })}
      ${qtag(64, 24, 'Speeds clearance', 9.5)}${qtag(236, 18, 'Clozapine, olanzapine', 9)}
      ${qtag(80, 146, 'Lower levels', 9.5)}${qtag(220, 150, 'May need higher dose', 9)}
      ${tag(150, 170, 'Refer to smoking cessation', 'ans', 9.5)}`),

    /* 37. Schizophrenia and suicide risk */
    suicide: A(`
      ${Array.from({ length: 10 }, (_, i) => i === 9 ? `<g class="ans"><g class="a-pulse">${person(24 + i * 26, 64, 1, 'var(--c-warn)', 'f-warn')}</g></g>` + person(24 + i * 26, 64, 1, 'var(--c-scar)', 'f-scar').replace('<g ', '<g class="q" ') : person(24 + i * 26, 64, 1, 'var(--c-scar)', 'f-scar')).join('')}
      ${qtag(150, 88, 'Up to 1 in 10', 10)}
      ${tag(150, 110, 'Young males, early illness', 'ans', 9.5)}
      ${clip(40, 124, 34, 46)}<g class="ans">${check(57, 148, 1, 8)}</g>
      ${qtag(170, 148, 'Screen at every visit', 10)}`),
  });
})();
