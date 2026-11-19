/* Chapter 12 Part 2 art: fractures and injuries. Uses art/ch12-engine.js (M12). */
(() => {
const { f, at, T, K, cls, pop, thick, flow, fade, mover, grow, spin, dot, germ, wbc, pill, syringe, ice, heat, vial, xray, sun, milk, clock, cal, moon, nope, chk, warn, zap, burst, pain, tingle,
  dumbbell, cig, gene, scaleI, kidney, heart, lungs, brain, eye, tooth, sling, cast, splint, screwPlate, bed, shoe, magn, steth, needle, thermo, heartEKG, person, kid, baby, elder, runner,
  scene, bone, remodel, joint, spine, posture, sarc, tunnel, tscale, bars, chip, row, quad, hipZoom, handZoom, kneeZoom } = M12;

const BIG = (t, s = 28, y = 104) => `<text class="ink" x="206" y="${y}" text-anchor="middle" style="font-size:${s}px;font-weight:800">${t}</text>`;
const ring = (x, y, r, c = 'warn') => `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-${c})" stroke-width="2.4"/>`;
const hit = (x, y) => cls('a-shake', at(x, y, burst(12, 'f-warn')));
const limb = (cx, cy, inner = '') => `<rect class="f-skin" x="${cx - 76}" y="${cy - 22}" width="152" height="44" rx="22" opacity=".85"/>` + inner;
const fascia = (cx, cy, tight) => `<rect x="${cx - 70}" y="${cy - 30}" width="140" height="60" rx="26" fill="var(--c-muscle)" opacity=".75" stroke="var(--art-line)"/>` +
  `<rect class="${tight ? 'a-pulse' : ''}" x="${cx - 74}" y="${cy - 34}" width="148" height="68" rx="30" fill="none" stroke="var(--c-white, #fff)" stroke-width="4"/>` +
  thick(`M${cx - 70} ${cy - 10} H${cx + 70}`, 'blood', 3) + thick(`M${cx - 70} ${cy + 10} H${cx + 70}`, 'nerve', 2.4);
const shoulder = (cx, cy, out) => `<path class="f-bone" d="M${cx - 50} ${cy - 30} Q${cx - 20} ${cy - 46} ${cx + 10} ${cy - 30} L${cx + 6} ${cy - 10} Q${cx - 20} ${cy - 22} ${cx - 46} ${cy - 12} Z"/>` +
  `<path d="M${cx + 14} ${cy - 22} Q${cx + 28} ${cy - 6} ${cx + 16} ${cy + 10}" stroke="var(--c-bone)" stroke-width="9" fill="none" stroke-linecap="round"/>` +
  (out ? `<g><circle class="f-bone" cx="${cx}" cy="${cy - 6}" r="14"/><rect class="f-bone" x="${cx - 9}" y="${cy + 4}" width="18" height="44" rx="4"/><animateTransform attributeName="transform" type="translate" values="0 0;-24 14;-24 14;0 0" keyTimes="0;.35;.75;1" dur="3s" repeatCount="indefinite"/></g>`
    : `<circle class="f-bone" cx="${cx}" cy="${cy - 6}" r="14"/><rect class="f-bone" x="${cx - 9}" y="${cy + 4}" width="18" height="44" rx="4"/>`);
const ankle = (cx, cy, tear = 0) => `<path class="f-skin" d="M${cx - 16} ${cy - 50} H${cx + 12} V${cy} Q${cx + 50} ${cy + 4} ${cx + 52} ${cy + 22} H${cx - 22} Q${cx - 24} ${cy} ${cx - 16} ${cy - 50} Z"/>` +
  `<rect class="f-bone" x="${cx - 8}" y="${cy - 48}" width="12" height="42" rx="3"/><ellipse class="f-bone" cx="${cx}" cy="${cy}" rx="12" ry="8"/>` +
  thick(`M${cx + 6} ${cy - 6} L${cx + 26} ${cy + 6}`, tear ? 'bad' : 'scar', 4) + (tear ? `<path d="M${cx + 14} ${cy - 4} l4 6 l-4 4" stroke="var(--surface)" stroke-width="3" fill="none"/>` : '');
const elbowZ = (cx, cy, side = 'lat') => `<path d="M${cx - 70} ${cy - 30} L${cx} ${cy}" stroke="var(--c-skin)" stroke-width="24" stroke-linecap="round"/><path d="M${cx} ${cy} L${cx + 70} ${cy - 20}" stroke="var(--c-skin)" stroke-width="20" stroke-linecap="round"/>` +
  thick(`M${cx - 66} ${cy - 28} L${cx} ${cy}`, 'bone', 6) + thick(`M${cx} ${cy} L${cx + 66} ${cy - 18}`, 'bone', 5) + `<circle class="f-bone" cx="${cx}" cy="${cy}" r="9"/>` +
  `<circle class="a-pulse" cx="${cx + (side === 'lat' ? 6 : -4)}" cy="${cy + (side === 'lat' ? -10 : 12)}" r="9" fill="var(--c-bad)" opacity=".5"/>`;
const thumbWrist = (cx, cy) => handZoom(cx, cy, ['thumbside']);
const stamp = (t, c = 'bad') => cls('a-pop', `<rect x="166" y="80" width="80" height="26" rx="6" fill="none" stroke="var(--c-${c})" stroke-width="3" transform="rotate(-8 206 93)"/>` + `<text x="206" y="98" text-anchor="middle" transform="rotate(-8 206 93)" style="font-size:13px;font-weight:800;fill:var(--c-${c})">${t}</text>`);

Object.assign(PICS, {
  frac: scene({ t: 'When force beats bone', a: 'Fracture', hi: ['shin'], pain: 1, steps: [
    ['A fall, crash, or sports hit', at(170, 96, runner(), 1.2) + hit(236, 90)],
    ['The force is more than the|bone can take', bone(206, 100, 140) + cls('a-bob', `<path d="M206 50 V80" stroke="var(--c-warn)" stroke-width="4"/><path d="M206 86 l-6 -9 h12 Z" fill="var(--c-warn)"/>`)],
    ['The bone breaks. Weak bone|breaks with less force', bone(206, 100, 140, { fx: 'trans' }) + hit(206, 70)],
  ] }),
  kidFrac: scene({ t: 'Breaks more common in kids', a: 'Growth plate, avulsion, greenstick', hi: ['knee'], steps: [
    ['Growth plate (Salter-Harris)|breaks: kids\' weak spot', bone(206, 96, 140, { plates: true }) + ring(150, 96, 14, 'bad')],
    ['Avulsion: a tendon yanks off|a chip of bone', bone(224, 104, 110) + `<ellipse class="f-muscle a-squeeze" cx="146" cy="70" rx="24" ry="10"/>` + thick('M168 74 L178 90', 'white', 3) + mover(`<path class="f-bone" d="M-5 -3 L5 -4 L4 4 L-4 3 Z"/>`, 'M180 92 L168 78 L180 92', 2)],
    ['Greenstick: bent, cracked on|one side only', bone(206, 104, 140, { bow: 14, fx: 'green' })],
  ] }),
  fracTypes: scene({ t: 'Name the fracture line', a: 'Across, angle, twist, shatter', hi: ['femur'], steps: [
    ['Transverse: straight across', bone(206, 96, 140, { fx: 'trans' })],
    ['Oblique: at an angle', bone(206, 96, 140, { fx: 'obl' })],
    ['Spiral: twists around the bone', bone(206, 96, 140, { fx: 'spiral' }) + spin(206, 60, `<path d="M-10 0 A10 6 0 1 1 10 0" stroke="var(--c-warn)" stroke-width="2.4" fill="none"/>`, 1.6)],
    ['Comminuted: many pieces', bone(206, 96, 140, { fx: 'comm' })],
  ] }),
  green: scene({ t: 'The bend-not-snap break', a: 'Greenstick fracture', hi: ['forearm'], steps: [
    ['Kids\' bones are softer', at(206, 96, kid(), 1.5)],
    ['The bone bends', cls('a-sway', bone(206, 100, 140, { bow: 16 }))],
    ['Only the outer side cracks.|Heals fast', bone(206, 100, 140, { bow: 16, fx: 'green' }) + at(260, 64, chk())],
  ] }),
  openClosed: scene({ t: 'Is the skin broken?', a: 'Open vs. closed', hi: ['shin'], steps: [
    ['Closed: skin is intact', limb(206, 96, bone(206, 96, 130, { fx: 'trans', h: 7, r: 10 }))],
    ['Open (compound): bone breaks|through the skin', limb(206, 96, bone(206, 96, 130, { h: 7, r: 10 })) + `<path class="f-bone" d="M200 90 L214 56 L220 60 L210 92 Z"/>` + `<ellipse cx="214" cy="74" rx="10" ry="4" fill="var(--c-blood)"/>`],
    ['Open fractures carry high|infection risk', limb(206, 96, bone(206, 96, 130, { h: 7, r: 10 })) + flow('M140 50 L210 80', 4, 2, germ())],
  ] }),
  moreFrac: scene({ t: 'More fracture words', a: 'Crushed, jammed, weak', hi: ['lspine', 'femur'], beamFrom: 'lspine', steps: [
    ['Compression: bone is crushed', spine(190, 96, { kind: 'wedge' })],
    ['Impacted: one end is driven|into the other', `<g>${bone(176, 96, 80)}<animateTransform attributeName="transform" type="translate" values="0 0;12 0;12 0;0 0" keyTimes="0;.3;.8;1" dur="2.6s" repeatCount="indefinite"/></g>` + bone(250, 96, 70)],
    ['Pathologic: a tumor or|osteoporosis weakens the bone', bone(206, 96, 140, { fx: 'path', porous: true })],
  ] }),
  stress: scene({ t: 'The runner\'s break', a: 'Stress fracture', hi: ['shin', 'foot'], beamFrom: 'shin', steps: [
    ['Repeated pounding, like running', cls('a-bob', at(206, 100, runner(), 1.3))],
    ['Tiny cracks add up faster than|the bone can repair', bone(206, 96, 140, { fx: 'stress' }) + [0, 1, 2].map(i => cls('a-blink', `<path d="M${190 + i * 14} 88 l2 6" stroke="var(--c-bad)" stroke-width="1.8"/>`, `animation-delay:${i * .4}s`)).join('')],
    ['Common in the tibia, femur,|and foot bones', row([[`<rect class="f-bone" x="-4" y="-22" width="8" height="44" rx="3"/>`, 'tibia'], [`<rect class="f-bone" x="-5" y="-22" width="10" height="44" rx="3"/>`, 'femur'], [shoe(), 'metatarsals']], 84, 1)],
  ] }),
  heal: scene({ t: 'Three stages of bone healing', a: 'Clot, callus, remodel', hi: ['femur'], steps: [
    ['Inflammatory: a blood clot|(hematoma) fills the break', bone(206, 96, 140, { fx: 'trans', hema: true })],
    ['Reparative: a callus bridges|the ends in 2-6 weeks', bone(206, 96, 140, { fx: 'trans', callus: true })],
    ['Remodeling: callus turns to|solid bone, up to a year', bone(206, 96, 140) + `<ellipse cx="206" cy="96" rx="14" ry="11" fill="var(--c-bone)" opacity=".6"/>` + remodel('build', 130).slice(0, 0) + at(260, 64, chk())],
  ] }),
  union: scene({ t: 'When healing goes wrong', a: 'Delayed, mal-, nonunion', hi: ['shin'], steps: [
    ['Delayed union: not healed by|20 weeks', bone(206, 104, 140, { fx: 'trans' }) + at(206, 60, cal()) + K(240, 64, '20 wk')],
    ['Malunion: heals crooked', `<g transform="rotate(-10 206 96)">${bone(176, 96, 80)}</g>` + bone(252, 100, 70)],
    ['Nonunion: never heals. Smoking|and diabetes slow healing', bone(206, 104, 140, { fx: 'trans' }) + at(170, 62, cig()) + at(246, 60, nope(12))],
  ] }),
  comp: scene({ t: 'Pressure inside a muscle wrap', a: 'Compartment syndrome', hi: ['calf'], o: { muscle: true }, steps: [
    ['Muscle sits in a tight fascia|sleeve with nerves and vessels', fascia(206, 96)],
    ['Swelling builds pressure in|the sleeve', fascia(206, 96, true) + grow(206, 96, `<ellipse rx="50" ry="18" fill="var(--c-bad)" opacity=".35"/>`, .6, 1.1, 2)],
    ['Nerves and vessels get crushed|and tissue dies', fascia(206, 96, true) + at(206, 96, nope(18)) + flow('M136 86 L176 86', 3, 1.6, dot('f-blood', 3))],
  ] }),
  compPain: scene({ t: 'The warning sign and the fix', a: 'Pain out of proportion; fasciotomy', hi: ['calf'], pain: 1, steps: [
    ['Pain far worse than the|injury should cause', at(206, 96, burst(26, 'f-bad')) + cls('a-blink', BIG('!!!', 22, 104))],
    ['Remove the cast right away', cast(0).replace('', '') && at(206, 96, cast(0), 2.2) + cls('a-rise', at(206, 70, `<path d="M-30 0 H30" stroke="var(--c-warn)" stroke-width="3"/>`))],
    ['Fasciotomy: cut the fascia to|let the pressure out', fascia(206, 96) + `<path d="M150 62 H262" stroke="var(--c-warn)" stroke-width="3" stroke-dasharray="6 4" class="a-flow"/>` + grow(206, 96, `<ellipse rx="56" ry="24" fill="var(--c-muscle)" opacity=".4"/>`, 1, 1.15, 2)],
  ] }),
  fat: scene({ t: 'After a long bone break: 3 signs', a: 'Fat embolism', hi: ['femur', 'lungs', 'skull'], steps: [
    ['Fatty marrow leaks from a|broken femur or pelvis', bone(206, 96, 140, { fx: 'trans', marrow: 'yellow' }) + flow('M206 96 L250 54', 4, 2, dot('f-fat', 3.4))],
    ['Fat lodges in the lungs:|low oxygen', at(206, 92, lungs(), 2.4) + flow('M140 60 L196 88', 4, 2, dot('f-fat', 3))],
    ['Confusion and a pinpoint rash|on the chest and head', row([[brain(), 'confusion'], [`<rect class="f-skin" x="-16" y="-12" width="32" height="24" rx="6"/>` + [[-8, -4], [2, 2], [8, -6], [-4, 6], [6, 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="var(--c-bad)"/>`).join(''), 'petechiae']], 84, 1.2)],
  ] }),
  fatPrev: scene({ t: 'Preventing fat embolism', a: 'Immobilize early', hi: ['femur'], steps: [
    ['A long bone fracture moves', cls('a-shake', bone(206, 96, 140, { fx: 'trans' }))],
    ['Splint it early to stop the|movement', bone(206, 96, 140, { fx: 'trans' }) + at(206, 70, splint(), 2)],
    ['Care is supportive; many|recover fully', at(206, 96, bed(), 2) + at(256, 66, chk())],
  ] }),
  osteo: scene({ t: 'Infection inside bone', a: 'Osteomyelitis', hi: ['shin'], steps: [
    ['Kids: germs ride the blood to|the bone ends', bone(206, 104, 140, { plates: true }) + flow('M130 56 L150 98', 4, 2, germ())],
    ['Adults: open fractures, surgery,|or diabetic foot ulcers', bone(206, 104, 140, { fx: 'trans' }) + flow('M206 50 L206 98', 4, 2, germ())],
    ['Staph aureus is the top germ', at(206, 92, `<g class="a-pulse">${[[0, 0], [12, 4], [-10, 6], [4, 14], [-4, -10], [14, -8]].map(([x, y]) => `<circle class="f-germ" cx="${x}" cy="${y}" r="7"/>`).join('')}</g>`, 1.4)],
  ] }),
  osteoDx: scene({ t: 'Finding and treating bone infection', a: 'MRI; long antibiotics', hi: ['shin'], steps: [
    ['Blood: high WBC, ESR, and CRP', row([[vial(.8, 'f-immune'), 'WBC'], [vial(.7), 'ESR'], [vial(.75, 'f-warn'), 'CRP']], 84, 1.2)],
    ['MRI or CT beats plain X-ray', at(206, 92, `<rect class="f-white" x="-34" y="-22" width="68" height="44" rx="22"/><circle r="14" fill="var(--surface)" stroke="var(--art-line)"/>`, 1.2) + spin(206, 92, `<circle cx="20" r="3" class="f-warn"/>`, 1.4)],
    ['Weeks of IV antibiotics plus|debridement', at(180, 92, `<rect class="f-white" x="-10" y="-22" width="20" height="30" rx="4"/><path d="M0 8 V28" stroke="var(--c-water)" stroke-width="2"/>`, 1.3) + flow('M180 120 L240 100', 3, 2, dot('f-good', 3)) + at(250, 90, cal())],
  ] }),
  avn: scene({ t: 'Bone that loses its blood', a: 'Osteonecrosis (AVN)', hi: ['hip'], steps: [
    ['The femoral head has a thin|blood supply', hipZoom(206, 92) + flow('M262 140 L214 98', 4, 2, dot('f-blood', 2.6))],
    ['A fracture, steroids, or alcohol|cut it off', hipZoom(206, 92) + at(240, 120, nope(12)) + at(160, 130, pill(-20, 'f-warn'))],
    ['The bone dies and collapses', hipZoom(206, 92, { dead: true, flat: true })],
  ] }),
  jaw: scene({ t: 'A rare bisphosphonate risk', a: 'Jaw osteonecrosis', hi: ['jaw'], steps: [
    ['Bisphosphonates slow bone|turnover', remodel('clear') + at(164, 80, nope(14))],
    ['The jaw normally remodels fast', at(206, 96, `<path class="f-bone" d="M-50 -10 Q0 40 50 -10 L40 -16 Q0 22 -40 -16 Z"/>` + [-24, -10, 4, 18].map(x => tooth()).map((t, i) => at(-24 + i * 14, -14, t, .55)).join(''))],
    ['After dental work, jaw bone|can die', at(206, 96, `<path class="f-bone" d="M-50 -10 Q0 40 50 -10 L40 -16 Q0 22 -40 -16 Z"/><ellipse cx="10" cy="6" rx="12" ry="7" fill="var(--c-scar)" class="a-pulse"/>`)],
  ] }),
  fracSx: scene({ t: 'Signs of a broken bone', a: 'Deformity, swelling, crepitus', hi: ['forearm'], pain: 1, steps: [
    ['Deformity and swelling', limb(206, 96, `<g transform="rotate(14 206 96)">${bone(206, 96, 60, { h: 6, r: 8 })}</g>`) + grow(206, 96, `<ellipse rx="30" ry="22" fill="var(--c-bad)" opacity=".3"/>`, .7, 1.1)],
    ['Pain and can\'t move it', at(206, 96, burst(22, 'f-bad')) + at(206, 96, nope(30))],
    ['Crepitus (grating), numbness,|spasms', bone(206, 96, 140, { fx: 'trans' }) + cls('a-blink', at(206, 64, `<path d="M-14 0 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6" stroke="var(--c-warn)" stroke-width="2" fill="none"/>`)) + cls('a-blink', at(250, 124, tingle(), .8))],
  ] }),
  fracDx: scene({ t: 'Checking a fracture', a: 'Pulses, nerves, X-ray', hi: ['ankle'], steps: [
    ['Check pulses and nerves below', at(206, 96, ankle(196, 100)) + cls('a-beat', at(240, 120, heart(), .7))],
    ['X-ray front and side, plus the|joint above and below', row([[xray(`<path d="M-2 -12 V12" stroke="#ddd" stroke-width="4"/>`), 'front'], [xray(`<path d="M-6 -12 L4 12" stroke="#ddd" stroke-width="4"/>`), 'side']], 84, 1.3)],
    ['Nothing by mouth in case of|surgery', at(206, 92, `<path class="f-white" d="M-10 -14 H10 L8 16 H-8 Z"/>`, 1.4) + at(206, 92, nope(26))],
  ] }),
  fracTx: scene({ t: 'Treating a fracture', a: 'Immobilize, reduce, hold', hi: ['shin'], steps: [
    ['Immobilize it right away', bone(206, 96, 140, { fx: 'trans' }) + at(206, 70, splint(), 2)],
    ['Reduce: line the bone back up', `<g>${bone(170, 96, 70)}<animateTransform attributeName="transform" type="translate" values="0 10;0 10;0 0;0 0" keyTimes="0;.3;.6;1" dur="3s" repeatCount="indefinite"/></g>` + bone(240, 96, 70)],
    ['Hold it: cast, splint, or plates|and screws', bone(206, 96, 140, { fx: 'trans' }) + pop(0, at(206, 96, screwPlate(), 1.6))],
  ] }),
  disloc: scene({ t: 'The joint that pops out most', a: 'Shoulder (anterior)', hi: ['shoulder'], steps: [
    ['Ball sits in the shoulder|socket', shoulder(206, 96)],
    ['A hit forces the ball forward|out of the socket', shoulder(206, 96, true) + hit(250, 70)],
    ['Bones no longer meet; nearby|nerves can be hurt', shoulder(206, 96, true) + cls('a-blink', at(170, 130, zap(), .8))],
  ] }),
  dislocSx: scene({ t: 'Signs of a dislocation', a: 'Out of place, severe pain', hi: ['shoulder'], pain: 1, steps: [
    ['The joint looks out of place', shoulder(206, 96, true)],
    ['Intense pain, worse moving', at(206, 96, burst(24, 'f-bad')) + cls('a-blink', BIG('!', 26, 104))],
    ['Swelling, bruising, tingling|below', grow(206, 96, `<ellipse rx="40" ry="26" fill="var(--c-spleen)" opacity=".4"/>`, .7, 1.1) + cls('a-blink', at(250, 124, tingle(), .8))],
  ] }),
  dislocTx: scene({ t: 'Fixing a dislocation', a: 'Reduce, sling, rehab', hi: ['shoulder'], steps: [
    ['Sedation if needed; watch vitals,|oxygen, CO2', at(206, 92, `<rect class="f-white" x="-30" y="-20" width="60" height="40" rx="6"/>` + `<path d="M-24 0 H-12 L-8 -10 L-2 10 L4 -14 L8 0 H24" stroke="var(--c-good)" stroke-width="2" fill="none" class="a-draw"/>`, 1.2)],
    ['Reduce: guide the ball back in', shoulder(206, 96, true)],
    ['Sling for weeks, then rehab', at(206, 92, sling(), 2.4) + at(260, 64, dumbbell())],
  ] }),
  sprainStrain: scene({ t: 'Ligament or muscle?', a: 'Sprain vs. strain', hi: ['ankle', 'thigh'], o: { muscle: true }, beamFrom: 'ankle', steps: [
    ['Sprain: a ligament stretches or|tears (twisted ankle)', at(206, 96, ankle(196, 100, 1))],
    ['Strain: a muscle or tendon|tears ("pulled muscle")', at(206, 96, `<ellipse class="f-muscle" rx="60" ry="18"/>` + `<path d="M-4 -18 l6 12 l-6 10 l6 14" stroke="var(--surface)" stroke-width="3" fill="none"/>` + `<path d="M-4 -18 l6 12 l-6 10 l6 14" stroke="var(--c-bad)" stroke-width="1.6" fill="none" class="a-blink"/>`)],
    ['Both: pain, swelling, bruising', grow(206, 96, `<ellipse rx="40" ry="24" fill="var(--c-spleen)" opacity=".4"/>`, .7, 1.1) + at(206, 96, pain(), 1.4)],
  ] }),
  sprainGr: scene({ t: 'How bad is the sprain?', a: 'Grade I, II, III', hi: ['ankle'], steps: [
    ['Grade I: a few fibers torn,|stable, no bruise', thick('M140 96 H272', 'scar', 10) + `<path d="M200 90 l4 6" stroke="var(--c-bad)" stroke-width="2"/>`],
    ['Grade II: partial tear, swollen,|bruised, a bit loose', thick('M140 96 H272', 'scar', 10) + `<path d="M196 88 l4 8 l-4 8" stroke="var(--surface)" stroke-width="5"/>` + `<ellipse cx="206" cy="96" rx="34" ry="14" fill="var(--c-spleen)" opacity=".35"/>`],
    ['Grade III: complete tear,|unstable; may need surgery', `<g>${thick('M140 96 H200', 'scar', 10)}<animateTransform attributeName="transform" type="translate" values="0 0;-10 0;-10 0;0 0" keyTimes="0;.3;.8;1" dur="2.4s" repeatCount="indefinite"/></g><g>${thick('M212 96 H272', 'scar', 10)}<animateTransform attributeName="transform" type="translate" values="0 0;10 0;10 0;0 0" keyTimes="0;.3;.8;1" dur="2.4s" repeatCount="indefinite"/></g>`],
  ] }),
  kidSprain: scene({ t: 'Kids rarely sprain. Why?', a: 'Growth plate breaks first', hi: ['ankle'], steps: [
    ['A child twists an ankle', cls('a-sway', at(206, 100, kid(), 1.4))],
    ['Their ligaments are stronger|than the growth plate', bone(206, 96, 140, { plates: true }) + thick('M262 70 L282 96', 'scar', 5)],
    ['So the growth plate breaks first', bone(206, 96, 140, { plates: true }) + ring(262, 96, 14, 'bad') + cls('a-blink', `<path d="M262 82 V110" stroke="var(--c-bad)" stroke-width="2.4"/>`)],
  ] }),
  lachman: scene({ t: 'Testing the ACL', a: 'Lachman test', hi: ['knee'], steps: [
    ['Knee bent about 30 degrees', kneeZoom(206, 92)],
    ['Hold the thigh, pull the shin|forward', `<g>${kneeZoom(206, 92).split('<rect class="f-bone" x="' + (206 - 13)).join('<rect class="f-bone" x="' + (206 - 13))}</g>` + cls('a-flow', `<path d="M260 120 H230" stroke="var(--c-warn)" stroke-width="3"/>`)],
    ['Shin slides freely = ACL tear', kneeZoom(206, 92, { acl: true }) + cls('a-blink', at(260, 64, warn()))],
  ] }),
  price: scene({ t: 'First aid for sprains and strains', a: 'PRICE', hi: ['ankle'], steps: [
    ['Protect and Rest', row([[splint(), 'protect'], [bed(), 'rest']], 84, 1.3)],
    ['Ice 10-15 minutes, 4 times a|day for 48 hours', at(206, 92, ice(), 2.2) + cls('a-drop', at(206, 120, dot('f-water', 3)))],
    ['Compress and Elevate above|the heart', at(170, 96, `<rect class="f-white" x="-24" y="-12" width="48" height="24" rx="10"/>` + [-14, -4, 6, 16].map(x => `<path d="M${x} -12 l-6 24" stroke="var(--c-water)" stroke-width="2"/>`).join('')) + cls('a-rise', at(250, 100, `<path d="M0 20 V-20 M-7 -12 L0 -20 L7 -12" stroke="var(--c-good)" stroke-width="3" fill="none"/>`))],
  ] }),
  tendon: scene({ t: 'Acute vs. chronic tendon pain', a: 'Tendinitis vs. tendinopathy', hi: ['ankle'], beamFrom: 'calf', steps: [
    ['A healthy tendon is smooth', thick('M140 96 H272', 'white', 10)],
    ['Tendinitis: acute, inflamed', thick('M140 96 H272', 'white', 10) + grow(206, 96, `<ellipse rx="40" ry="14" fill="var(--c-bad)" opacity=".4"/>`, .7, 1.1)],
    ['Tendinopathy: chronic overuse,|thick and scarred', thick('M140 96 Q206 76 272 96 Q206 116 140 96', 'scar', 6) + `<ellipse cx="206" cy="96" rx="34" ry="12" class="f-scar"/>`],
  ] }),
  strainSite: scene({ t: 'Where strains happen most', a: 'Low back', hi: ['lowback', 'thigh', 'shoulder', 'elbow', 'ankle'], o: { muscle: true }, beamFrom: 'lowback', steps: [
    ['Lifting wrong strains the|low back most', at(206, 100, `<path class="f-good" d="M-20 0 Q0 -30 26 -14 L22 0 Q0 -12 -16 12 Z"/><circle class="f-skin" cx="32" cy="-14" r="7"/><rect class="f-food" x="20" y="6" width="20" height="16" rx="2"/>`) + ring(190, 88, 12, 'bad')],
    ['Hamstrings and quads: they|cross two joints', at(206, 96, `<ellipse class="f-muscle a-squeeze" rx="18" ry="44"/>`) + K(250, 96, 'hamstring')],
    ['Also rotator cuff, elbow,|Achilles', row([[`<circle class="f-bone" r="12"/>`, 'shoulder'], [`<circle class="f-bone" r="8"/>`, 'elbow'], [thick('M0 -16 V16', 'white', 5), 'Achilles']], 84, 1)],
  ] }),
  strainTx: scene({ t: 'Caring for a strain', a: 'Ice, rest, NSAIDs', hi: ['thigh'], o: { muscle: true }, steps: [
    ['Ice for 3 days, then heat or ice', row([[ice(), 'days 1-3'], [heat(), 'then']], 84, 1.3)],
    ['Rest and elevate', at(206, 96, bed(), 2.2)],
    ['NSAIDs, muscle relaxants, then|physical therapy', row([[pill(-30, 'f-good'), 'NSAID'], [pill(20, 'f-immune'), 'relaxant'], [dumbbell(), 'PT']], 84, 1)],
  ] }),
  abuse: scene({ t: 'Fractures that suggest abuse', a: 'Ribs, many ages of healing', hi: ['ribs', 'femur'], steps: [
    ['Rib and sternum fractures in|a small child', at(206, 96, [0, 1, 2, 3].map(i => thick(`M0 ${-18 + i * 12} Q-30 ${-22 + i * 12} -34 ${-8 + i * 12} M0 ${-18 + i * 12} Q30 ${-22 + i * 12} 34 ${-8 + i * 12}`, 'bone', 3)).join('')) + ring(180, 92, 8, 'bad') + ring(234, 104, 8, 'bad')],
    ['Several breaks at different|stages of healing', row([[bone(0, 0, 40, { fx: 'trans', h: 4, r: 6 }), 'new'], [bone(0, 0, 40, { callus: true, h: 4, r: 6 }), 'healing'], [bone(0, 0, 40, { h: 4, r: 6 }) + `<ellipse rx="6" ry="6" fill="var(--c-scar)" opacity=".6"/>`, 'old']], 84, 1)],
    ['A femur fracture in a baby', at(206, 96, baby(), 2) + ring(226, 106, 10, 'bad')],
  ] }),
  abuseHx: scene({ t: 'History red flags', a: 'Story does not fit', hi: ['body'], beamFrom: 'chest', steps: [
    ['The story doesn\'t match the|injury', at(170, 92, `<rect class="f-white" x="-24" y="-18" width="48" height="30" rx="8"/><path d="M-10 12 l-6 10 l14 -10" class="f-white"/>`) + at(170, 88, `<text class="tagtx" text-anchor="middle" y="4" style="font-size:16px">?</text>`) + at(246, 92, bone(0, 0, 50, { fx: 'comm', h: 5, r: 7 }))],
    ['A delay in care, or the story|keeps changing', at(206, 92, clock(), 2) + cls('a-spin', at(206, 92, `<path d="M0 0 V-16" stroke="var(--c-bad)" stroke-width="2"/>`))],
    ['Health workers must report|suspected abuse', at(206, 92, `<rect class="f-white" x="-22" y="-28" width="44" height="56" rx="4"/>` + [-14, -4, 6, 16].map(y => `<path d="M-14 ${y} H14" stroke="var(--c-scar)" stroke-width="2"/>`).join(''), 1.2) + stamp('REPORT')],
  ] }),
  burs: scene({ t: 'An inflamed cushion sac', a: 'Bursitis', hi: ['elbow', 'hip', 'knee'], beamFrom: 'elbow', steps: [
    ['Bursae are small fluid sacs|that cushion joints', joint(206, 96, { kind: 'normal' }) + `<ellipse cx="236" cy="70" rx="12" ry="7" fill="var(--c-water)" stroke="var(--art-line)"/>`],
    ['Overuse, pressure, or trauma|inflames one', joint(206, 96, { kind: 'bursa' })],
    ['Common at the elbow, hip,|and knee; also gout and RA', row([[`<circle class="f-bad a-pulse" r="10"/>`, 'elbow'], [`<circle class="f-bad a-pulse" r="10"/>`, 'hip'], [`<circle class="f-bad a-pulse" r="10"/>`, 'knee']], 84, 1)],
  ] }),
  septicBurs: scene({ t: 'An infected bursa', a: 'Septic bursitis', hi: ['elbow'], steps: [
    ['A cut or scrape over the|elbow or knee', at(206, 96, elbowZoomLite(), 1)],
    ['Germs get into the bursa:|red, hot, painful', at(206, 96, `<ellipse class="f-bad a-pulse" rx="34" ry="22"/>`) + flow('M180 96 L232 96', 4, 2, germ())],
    ['Tap the fluid to check it.|Risk: diabetes, alcohol, low immunity', at(206, 96, `<ellipse class="f-bad" rx="34" ry="22"/>`) + at(250, 70, syringe(-140), 1.4)],
  ] }),
  bursTx: scene({ t: 'Treating bursitis', a: 'NSAIDs, injection, protect', hi: ['knee'], steps: [
    ['NSAIDs and ice or heat', row([[pill(-30, 'f-good'), 'NSAID'], [ice(), 'ice'], [heat(), 'heat']], 84, 1.1)],
    ['A steroid plus numbing shot|into the bursa', kneeZoom(206, 92, { bursa: true }) + at(160, 70, syringe(30), 1.3)],
    ['Avoid the cause: knee pads for|kneeling work', kneeZoom(206, 92) + `<rect class="f-immune a-pulse" x="168" y="74" width="16" height="30" rx="6"/>`],
  ] }),
  frozen: scene({ t: 'A stiff, painful shoulder', a: 'Frozen shoulder', hi: ['shoulder'], steps: [
    ['The capsule tightens and the|shoulder barely moves', shoulder(206, 96) + `<circle cx="206" cy="90" r="28" fill="none" stroke="var(--c-mucus)" stroke-width="5" class="a-squeeze"/>`],
    ['Pain is worse at night', at(206, 92, moon(), 2) + cls('a-blink', at(250, 80, pain(), .8))],
    ['Linked to diabetes; can take|up to 2 years to thaw', row([[`<rect class="f-immune" x="-11" y="-16" width="22" height="32" rx="5"/><rect class="f-white" x="-8" y="-12" width="16" height="12" rx="2"/>`, 'diabetes'], [cal(), '2 years']], 84, 1.2)],
  ] }),
  impinge: scene({ t: 'Pain reaching overhead', a: 'Shoulder impingement', hi: ['shoulder'], steps: [
    ['Raising the arm closes the|space under the shoulder roof', `<g>${shoulder(206, 100)}</g>` + cls('a-sway', `<path d="M206 104 V60" stroke="var(--c-skin)" stroke-width="10" stroke-linecap="round"/>`)],
    ['Rotator cuff tendons get|pinched there', shoulder(206, 100) + `<path d="M180 72 Q206 84 232 72" stroke="var(--c-white, #fff)" stroke-width="5" fill="none" class="a-squeeze"/>` + cls('a-blink', at(206, 64, zap(), .8))],
    ['Worse overhead, at night, or|lying on that side', row([[`<path d="M0 16 V-16 M-8 -8 L0 -16 L8 -8" stroke="var(--c-warn)" stroke-width="3" fill="none"/>`, 'overhead'], [moon(), 'night'], [bed(), 'lying on it']], 84, 1)],
  ] }),
  epicond: scene({ t: 'Two kinds of elbow pain', a: 'Tennis vs. golfer\'s elbow', hi: ['elbow'], steps: [
    ['Tennis elbow: outer elbow,|gripping and backhand', elbowZ(206, 96, 'lat')],
    ['Golfer\'s elbow: inner elbow,|wrist flexing', elbowZ(206, 96, 'med')],
    ['The tendon is thick and|scarred, not red', thick('M140 96 Q206 80 272 96', 'scar', 7) + `<ellipse cx="206" cy="90" rx="26" ry="8" class="f-scar"/>`],
  ] }),
  carpal: scene({ t: 'Numb thumb and fingers at night', a: 'Carpal tunnel syndrome', hi: ['wrist'], zing: ['hand'], steps: [
    ['The median nerve runs through|a tunnel in the wrist', tunnel(206, 96).replace('a-squeeze', '')],
    ['Swelling squeezes the nerve', tunnel(206, 96, 'median nerve')],
    ['Thumb, index, middle, and half|the ring finger tingle', handZoom(206, 100, ['thumb', 'index', 'middle']) + cls('a-blink', at(250, 60, tingle(), .8))],
  ] }),
  carpalRisk: scene({ t: 'Who gets carpal tunnel?', a: 'Pregnancy, diabetes, hypothyroid', hi: ['wrist'], steps: [
    ['Pregnancy (fluid swelling)', at(206, 100, `<circle class="f-skin" cx="-2" cy="-34" r="8"/><path class="f-mouth" d="M-10 18 L-8 -24 Q-2 -26 2 -22 Q22 -10 18 6 Q14 16 4 16 L4 18 Z"/>`, 1.3)],
    ['Diabetes and hypothyroidism', row([[`<rect class="f-immune" x="-11" y="-16" width="22" height="32" rx="5"/><rect class="f-white" x="-8" y="-12" width="16" height="12" rx="2"/>`, 'diabetes'], [`<path class="f-mouth" d="M-2 0 C-6 -14 -18 -12 -16 2 C-15 12 -6 12 -2 6 Z M2 0 C6 -14 18 -12 16 2 C15 12 6 12 2 6 Z"/>`, 'low thyroid']], 84, 1.2)],
    ['RA, obesity, women, repetitive|work', row([[`<circle class="f-bad a-pulse" r="9"/>`, 'RA'], [scaleI(), 'obesity'], [`<rect class="f-white" x="-14" y="-8" width="28" height="16" rx="3"/>` + [-8, -2, 4].map(x => `<rect x="${x}" y="-4" width="4" height="4" fill="var(--c-scar)"/>`).join(''), 'typing']], 84, 1)],
  ] }),
  carpalTx: scene({ t: 'Treating carpal tunnel', a: 'Splint, steroids, surgery', hi: ['wrist'], steps: [
    ['A neutral wrist splint, often|at night', handZoom(206, 100, ['wrist']) + `<rect class="f-immune" x="180" y="128" width="52" height="18" rx="6" opacity=".9"/>`],
    ['Steroid injection or pills', at(206, 92, syringe(-30), 2)],
    ['Surgery cuts the ligament to|free the nerve', tunnel(206, 96).replace('a-squeeze', '') + `<path d="M206 70 V122" stroke="var(--c-warn)" stroke-width="3" stroke-dasharray="5 3" class="a-flow"/>`],
  ] }),
  dequer: scene({ t: 'Thumb-side wrist pain', a: 'de Quervain', hi: ['wristL'], beamFrom: 'wristL', steps: [
    ['Thumb tendons swell in their|sheath', handZoom(206, 100, ['thumbside'])],
    ['Finkelstein: fist over the thumb,|bend down = pain', at(206, 96, `<rect class="f-skin" x="-24" y="-20" width="44" height="34" rx="10"/><rect class="f-skin" x="-30" y="-6" width="12" height="20" rx="6"/>`) + cls('a-sway', `<path d="M226 120 q10 10 0 20" stroke="var(--c-warn)" stroke-width="3" fill="none"/>`) + cls('a-blink', at(176, 110, pain(), .8))],
    ['Common in women and pregnancy.|Thumb spica splint, NSAIDs', at(206, 96, `<rect class="f-immune" x="-30" y="-14" width="60" height="28" rx="10"/><rect class="f-immune" x="-40" y="-26" width="16" height="22" rx="7"/>`)],
  ] }),
  dupuy: scene({ t: 'Two finger problems', a: 'Dupuytren vs. trigger finger', hi: ['hand'], steps: [
    ['Dupuytren: palm tissue thickens|and pulls a finger down', handZoom(206, 100, ['palm']) + thick('M210 110 L222 76', 'scar', 5)],
    ['The ring finger can\'t|straighten', at(206, 100, `<path d="M0 30 V-10 Q0 -20 10 -24" stroke="var(--c-skin)" stroke-width="12" fill="none" stroke-linecap="round"/>`) + at(240, 70, nope(12))],
    ['Trigger finger: a thick tendon|catches and locks', thick('M140 96 H272', 'white', 6) + `<ellipse cx="200" cy="96" rx="10" ry="7" class="f-scar"/>` + `<rect x="196" y="84" width="20" height="24" rx="4" fill="none" stroke="var(--c-scar)" stroke-width="3"/>` + mover(`<ellipse class="f-scar" rx="9" ry="6"/>`, 'M180 96 L196 96 L196 96 L230 96', 2.6)],
  ] }),
  scfe: scene({ t: 'Teen hip that slips', a: 'SCFE', hi: ['hip'], pain: 1, steps: [
    ['Often an overweight teen, age|about 12 to 13', at(206, 100, person({ c: 'f-warn' }), 1.4)],
    ['The femoral head slips off the|neck at the growth plate', hipZoom(206, 92, { slip: true })],
    ['Like ice cream sliding off a cone.|Hip, thigh, or knee pain; limp', at(206, 96, `<path class="f-food" d="M-12 0 L0 40 L12 0 Z"/>`) + mover(`<circle class="f-mouth" r="14"/>`, 'M206 82 L196 90 L196 90 L206 82', 2.6)],
  ] }),
  scfeTx: scene({ t: 'Treating a slipped hip', a: 'No weight, then pins', hi: ['hip', 'hipL'], steps: [
    ['No weight on it: crutches', at(206, 100, person({ c: 'f-warn' }), 1.3) + `<path d="M182 80 L176 130 M230 80 L236 130" stroke="var(--c-scar)" stroke-width="3"/>`],
    ['Surgery pins the head in place', hipZoom(206, 92) + `<path d="M250 136 L198 86" stroke="var(--c-scar)" stroke-width="4"/>`],
    ['Both hips in up to 40%; pain may|show only in the knee', row([[`<circle class="f-bone" r="12"/>`, 'left'], [`<circle class="f-bone" r="12"/>`, 'right'], [`<circle class="f-bad a-pulse" r="10"/>`, 'knee']], 84, 1)],
  ] }),
  lcp: scene({ t: 'Young child\'s hip loses blood', a: 'Legg-Calvé-Perthes', hi: ['hip'], steps: [
    ['Ages 3-12, mostly boys:|limp and hip pain', at(206, 100, kid('f-water'), 1.6)],
    ['Blood to the femoral head|drops; the bone dies', hipZoom(206, 92, { dead: true })],
    ['It flattens, then slowly reforms.|Better outlook before age 8', hipZoom(206, 92, { flat: true })],
  ] }),
  meralgia: scene({ t: 'Burning outer thigh', a: 'Meralgia paresthetica', hi: ['thigh'], zing: ['thigh'], steps: [
    ['A skin nerve passes under the|groin ligament', thick('M140 70 Q200 72 220 100 Q240 130 260 140', 'nerve', 4) + thick('M150 90 L260 70', 'scar', 5)],
    ['Tight belts, a big belly, or|pregnancy pinch it', thick('M140 70 Q200 72 220 100 Q240 130 260 140', 'nerve', 4) + `<rect class="f-food a-squeeze" x="140" y="62" width="130" height="14" rx="4"/>`],
    ['Burning, numb outer thigh,|no weakness', at(206, 96, `<rect class="f-skin" x="-20" y="-40" width="40" height="80" rx="18"/>`) + ring(222, 90, 14, 'nerve') + cls('a-blink', at(250, 80, tingle(), .8))],
  ] }),
  osgood: scene({ t: 'Sporty teen with a sore shin bump', a: 'Osgood-Schlatter', hi: ['knee'], steps: [
    ['A growth spurt plus jumping|and running', cls('a-bob', at(206, 100, runner('f-good'), 1.3))],
    ['The kneecap tendon tugs on|the shin bump', kneeZoom(206, 92, { pull: true, tub: true })],
    ['Ice, NSAIDs, stretching; keep|playing if pain fades in a day', row([[ice(), 'ice'], [pill(-30, 'f-good'), 'NSAID'], [chk(), 'play']], 84, 1)],
  ] }),
});
function elbowZoomLite() { return `<path d="M-60 -20 L0 6 L60 -14" stroke="var(--c-skin)" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-6 0 l6 4 l6 -4" stroke="var(--c-blood)" stroke-width="2" fill="none"/>`; }
})();
