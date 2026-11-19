/* Chapter 12 Part 3 art: low back pain and metabolic bone disease. Uses art/ch12-engine.js (M12). */
(() => {
const { f, at, T, K, cls, pop, thick, flow, fade, mover, grow, spin, dot, germ, wbc, pill, syringe, ice, heat, vial, xray, sun, milk, clock, cal, moon, nope, chk, warn, zap, burst, pain, tingle,
  dumbbell, cig, gene, scaleI, kidney, heart, lungs, brain, eye, ear, tooth, sling, cast, splint, screwPlate, bed, shoe, magn, steth, needle, thermo, heartEKG, person, kid, baby, elder, runner,
  scene, bone, remodel, joint, spine, posture, sarc, tunnel, tscale, bars, chip, row, quad, hipZoom, handZoom, kneeZoom, shrink } = M12;

const BIG = (t, s = 28, y = 104) => `<text class="ink" x="206" y="${y}" text-anchor="middle" style="font-size:${s}px;font-weight:800">${t}</text>`;
const ring = (x, y, r, c = 'warn') => `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-${c})" stroke-width="2.4"/>`;
const lifter = (ok = false) => ok ? at(206, 104, `<path class="f-good" d="M-6 0 V-30 Q-6 -36 2 -36 Q10 -36 10 -30 V0 Z"/><circle class="f-skin" cx="2" cy="-44" r="7"/><path d="M-4 0 L-12 14 L-4 28 M6 0 L14 14 L6 28" stroke="var(--c-vein)" stroke-width="5" fill="none"/><rect class="f-food" x="12" y="-8" width="20" height="16" rx="2"/>`, 1.1)
  : at(206, 104, `<path class="f-good" d="M-20 0 Q0 -30 26 -14 L22 0 Q0 -12 -16 12 Z"/><circle class="f-skin" cx="32" cy="-14" r="7"/><path d="M-16 8 L-18 34 M-8 4 L-6 34" stroke="var(--c-vein)" stroke-width="5"/><rect class="f-food" x="22" y="4" width="20" height="16" rx="2"/>`, 1.1);
const legNerve = (lit) => at(206, 96, `<path class="f-skin" d="M-14 -48 H14 L18 40 H4 L0 -10 L-4 40 H-18 Z" opacity=".75"/>` + `<path d="M6 -46 Q10 -10 12 38" stroke="var(--c-nerve)" stroke-width="3" fill="none" ${lit ? 'class="a-blink"' : ''}/>`, 1.1);
const saddle = () => at(206, 96, `<path class="f-skin" d="M-30 -30 H30 L34 20 Q0 40 -34 20 Z" opacity=".8"/><path class="a-pulse" d="M-16 4 Q0 24 16 4 Q0 14 -16 4 Z" fill="var(--c-bad)" opacity=".7"/>`);
const bladderI = (c = 'f-pancreas') => `<path class="${c}" d="M-13 -5 Q-13 -15 0 -15 Q13 -15 13 -5 Q13 8 3 10 V15 H-3 V10 Q-13 8 -13 -5 Z"/>`;
const dexaMachine = () => at(206, 96, `<rect class="f-white" x="-60" y="10" width="120" height="12" rx="4"/><path class="f-white" d="M-60 10 V-30 H-40 V10"/><rect class="f-immune" x="-48" y="-30" width="96" height="10" rx="3"/>`) + mover(`<rect x="-4" y="-2" width="8" height="34" fill="var(--c-warn)" opacity=".4"/>`, 'M160 66 L252 66 L160 66', 3);
const legsBow = () => at(206, 96, `<path d="M-14 -40 Q-34 0 -14 40 M14 -40 Q34 0 14 40" stroke="var(--c-skin)" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-14 -40 Q-34 0 -14 40 M14 -40 Q34 0 14 40" stroke="var(--c-bone)" stroke-width="4" fill="none"/>`);
const skullBig = () => at(206, 96, `<ellipse class="f-bone" rx="38" ry="32"/><path class="f-bone" d="M-20 20 Q0 42 20 20 Z"/>`) ;

Object.assign(PICS, {
  lbp: scene({ t: 'Most common cause of low back pain', a: 'Strains', hi: ['lowback'], o: { muscle: true }, pain: 1, steps: [
    ['About 80% of adults get it', BIG('80%', 32)],
    ['Usually a strained muscle or|tendon from lifting or twisting', lifter() + ring(196, 90, 12, 'bad')],
    ['Most clear in weeks. Chronic|means over 3 months', at(206, 92, cal(), 2) + K(250, 96, '3 mo')],
  ] }),
  mech: scene({ t: 'Two kinds of low back pain', a: 'Mechanical vs. not', hi: ['lowback'], steps: [
    ['Mechanical: strain, disks, joints,|stenosis, fracture', spine(190, 96, { kind: 'hern' })],
    ['Nonmechanical: cancer spreading|to the spine', spine(190, 96) + grow(190, 96, `<circle class="f-tumor" r="10" opacity=".9"/>`, .5, 1.1)],
    ['Or infection, or inflammation|like ankylosing spondylitis', spine(190, 96, { kind: 'fused' }) + flow('M130 60 L170 90', 3, 2, germ())],
  ] }),
  ddd: scene({ t: 'Disks that wear thin', a: 'Degenerative disk disease', hi: ['lspine'], steps: [
    ['Healthy disks are plump and wet', spine(190, 96)],
    ['With age they dry out and thin', spine(190, 96, { kind: 'thin', spurs: false }) + flow('M174 70 L130 56', 3, 2, dot('f-water', 2.6))],
    ['Bones get closer with spurs.|Narrow space = spondylosis', spine(190, 96, { kind: 'thin' })],
  ] }),
  hern: scene({ t: 'Gel pushes out of a disk', a: 'Herniated vs. bulging', hi: ['lspine'], zing: ['thigh'], steps: [
    ['A healthy disk: gel inside a|tough ring', spine(190, 96)],
    ['Herniated: the gel breaks|through the ring', spine(190, 96, { kind: 'hern' })],
    ['Bulging: the disk bulges but stays|in. Both can pinch a nerve', spine(190, 96, { kind: 'bulge' })],
  ] }),
  lysis: scene({ t: 'Crack vs. slip', a: 'Spondylolysis vs. -listhesis', hi: ['lspine'], steps: [
    ['Spondylolysis: a stress crack in|the pars, often at L5', spine(190, 96, { kind: 'crack' })],
    ['Spondylolisthesis: a vertebra|slides forward', spine(190, 96, { kind: 'slip' })],
    ['Most often L4-L5 or L5-S1; can|pinch nerves', spine(190, 96, { kind: 'slip' }) + cls('a-blink', at(268, 116, zap(), .7))],
  ] }),
  gym: scene({ t: 'Who gets a pars crack?', a: 'Gymnasts, weightlifters', hi: ['lspine'], steps: [
    ['Back-bending sports like|gymnastics', at(206, 110, `<path d="M-30 20 Q-30 -30 0 -30 Q30 -30 30 20" stroke="var(--c-mouth)" stroke-width="10" fill="none" stroke-linecap="round"/><circle class="f-skin" cx="-30" cy="22" r="7"/>`)],
    ['Heavy loads like weightlifting', cls('a-bob', at(206, 90, dumbbell(), 2.6))],
    ['The thin pars bone cracks', spine(190, 96, { kind: 'crack' })],
  ] }),
  sten: scene({ t: 'A narrowed spinal canal', a: 'Spinal stenosis', hi: ['lspine'], steps: [
    ['The spinal canal holds the|nerves', spine(190, 96)],
    ['Bone spurs, slips, and a thick|ligament narrow it', spine(190, 96, { kind: 'sten' })],
    ['Usually over 60. Legs hurt,|tingle, and weaken on walking', at(206, 100, elder(), 1.3) + cls('a-blink', at(214, 132, pain(), .7))],
  ] }),
  claud: scene({ t: 'Calf pain on walking: which kind?', a: 'Neurogenic vs. vascular', hi: ['calf', 'lspine'], beamFrom: 'calf', steps: [
    ['Both cause calf pain on walking', cls('a-bob', at(206, 100, person(), 1.3)) + cls('a-blink', at(214, 132, pain(), .7))],
    ['Spinal stenosis: eases by sitting|or leaning forward (slowly)', at(206, 104, `<path class="f-good" d="M-10 0 Q0 -26 18 -22 L14 -8 Q2 -10 -2 8 Z"/><circle class="f-skin" cx="22" cy="-26" r="7"/><path d="M-6 6 L-4 30 M2 4 L6 30" stroke="var(--c-vein)" stroke-width="5"/><rect class="f-food" x="18" y="-10" width="18" height="28" rx="3"/>`, 1.1)],
    ['Vascular: eases right away when|you stop and stand still', at(206, 100, person({ c: 'f-bad' }), 1.3) + at(254, 70, chk())],
  ] }),
  radic: scene({ t: 'A pinched nerve root', a: 'Radiculopathy', hi: ['lspine'], zing: ['thigh', 'calf'], steps: [
    ['A disk or spur presses a|nerve root', spine(190, 96, { kind: 'hern' })],
    ['Pain shoots along that nerve', legNerve(true) + flow('M212 50 L224 134', 3, 1.4, dot('f-warn', 3))],
    ['L5/S1: sciatica down the back|of the leg, numbness, weakness', legNerve(true) + cls('a-blink', at(250, 120, tingle(), .8))],
  ] }),
  vcf: scene({ t: 'Spine break with no fall', a: 'Compression fracture', hi: ['tspine'], steps: [
    ['Osteoporosis or long-term|steroids weaken a vertebra', bone(206, 96, 130, { porous: true })],
    ['It collapses with little or|no injury', spine(190, 96, { kind: 'wedge' })],
    ['Pain right over the spot,|or none at all', spine(190, 96, { kind: 'wedge' }) + ring(166, 92, 10, 'bad')],
  ] }),
  cauda: scene({ t: 'A back-pain emergency', a: 'Cauda equina syndrome', hi: ['lowback', 'bladder'], glow: 'bad', steps: [
    ['A big disk crushes the nerve|roots at the bottom of the spine', spine(190, 96, { kind: 'hern' }) + flow('M226 140 L262 140', 3, 1.4, dot('f-bad', 2.6))],
    ['Bladder retention or leaking,|bowel loss of control', row([[bladderI(), 'bladder'], [`<path d="M-14 0 Q0 -16 14 0 T-14 0" stroke="var(--c-stool)" stroke-width="6" fill="none"/>`, 'bowel']], 84, 1.3)],
    ['Saddle numbness. Needs emergency|surgery', saddle()],
  ] }),
  red: scene({ t: 'Back pain red flags', a: 'Cancer, fever, bladder', hi: ['lowback'], glow: 'bad', steps: [
    ['History of cancer: it may have|spread to the spine', spine(190, 96) + grow(184, 74, `<circle class="f-tumor" r="9"/>`, .5, 1.1)],
    ['Fever, IV drug use, or a recent|spinal procedure: infection', row([[thermo(), 'fever'], [syringe(-30), 'IV drugs'], [germ(), 'germs']], 84, 1)],
    ['Bowel or bladder changes, or|sudden severe pain', row([[bladderI(), 'bladder'], [burst(14, 'f-bad'), 'sudden']], 84, 1.2)],
  ] }),
  slr: scene({ t: 'A simple disk test', a: 'Straight leg raise', hi: ['lspine', 'thigh'], zing: ['calf'], steps: [
    ['Patient lies flat on the back', at(206, 110, `<rect class="f-skin" x="-60" y="-8" width="100" height="16" rx="8"/><circle class="f-skin" cx="-68" cy="0" r="9"/>`)],
    ['Lift the straight leg at the hip', at(206, 110, `<rect class="f-skin" x="-60" y="-8" width="60" height="16" rx="8"/><circle class="f-skin" cx="-68" cy="0" r="9"/>`) + `<g transform="translate(206 110)"><g><rect class="f-vein" x="0" y="-5" width="64" height="11" rx="5"/><animateTransform attributeName="transform" type="rotate" values="0;-40;-40;0" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></g></g>`],
    ['Leg pain before 45 degrees =|disk or nerve root', at(206, 110, `<rect class="f-skin" x="-60" y="-8" width="60" height="16" rx="8"/><g transform="rotate(-38)"><rect class="f-vein" x="0" y="-5" width="64" height="11" rx="5"/><path class="a-blink" d="M10 -12 l40 0" stroke="var(--c-nerve)" stroke-width="3"/></g>`) + K(258, 140, '< 45°')],
  ] }),
  lbpTx: scene({ t: 'Treating low back pain', a: 'NSAIDs, relaxants, PT', hi: ['lowback'], o: { muscle: true }, steps: [
    ['NSAIDs and muscle relaxants', row([[pill(-30, 'f-good'), 'NSAID'], [pill(20, 'f-immune'), 'relaxant']], 84, 1.3)],
    ['Physical therapy and heat or|cold', row([[dumbbell(), 'PT'], [heat(), 'heat'], [ice(), 'cold']], 84, 1)],
    ['Lift with the legs; lose weight|if needed', lifter(true) + at(256, 66, chk())],
  ] }),
  op: scene({ t: 'Weak, porous bones', a: 'Osteoporosis', hi: ['hip', 'lspine', 'wrist'], steps: [
    ['Healthy bone: thick struts', bone(206, 96, 140)],
    ['Osteoporosis: less bone, poorer|quality, full of holes', bone(206, 96, 140, { porous: true, thin: true })],
    ['1 in 2 women and 1 in 4 men', row([[person({ c: 'f-mouth' }), '1 in 2'], [person({ c: 'f-water' }), '1 in 4']], 92, .9)],
  ] }),
  opCause: scene({ t: 'Why bone thins', a: 'Aging + low estrogen', hi: ['hips', 'lspine'], steps: [
    ['Aging and low estrogen', row([[elder(), 'aging'], [`<circle class="f-mouth" r="12"/>` + `<text class="tagtx" text-anchor="middle" y="4" style="font-size:11px">E</text>`, 'estrogen down']], 88, 1)],
    ['Osteoclasts outwork osteoblasts', remodel('clear')],
    ['More bone removed than made', bars([[150, 70, 'germ', 'removed'], [222, 34, 'immune', 'made']])],
  ] }),
  opWhere: scene({ t: 'Where osteoporosis breaks', a: 'Spine <65, hip >65', hi: ['lspine', 'hip', 'wrist'], beamFrom: 'hip', steps: [
    ['Under 65: vertebrae (spongy|bone) break first', spine(190, 96, { kind: 'wedge' })],
    ['Over 65: the hip (more cortical|bone)', hipZoom(206, 92) + `<path class="a-blink" d="M236 112 l6 8 l-4 6" stroke="var(--c-bad)" stroke-width="2.4" fill="none"/>`],
    ['The wrist is common too', handZoom(206, 100, ['wrist'])],
  ] }),
  opRisk: scene({ t: 'Osteoporosis risk factors', a: 'Steroids, smoking, thin', hi: ['hip'], steps: [
    ['Steroids, smoking, alcohol', row([[pill(-30, 'f-warn'), 'steroids'], [cig(), 'smoking'], [beerI(), 'alcohol']], 84, 1)],
    ['Thin frame, low calcium or|vitamin D', row([[kid('f-mouth'), 'thin'], [milk(), 'low Ca'], [sun(), 'low D']], 84, 1)],
    ['Gastric bypass, family history', row([[`<path class="f-stomach" d="M-10 -14 Q14 -14 12 4 Q8 16 -6 12 Z"/>`, 'bypass'], [gene(), 'family']], 84, 1.2)],
  ] }),
  peak: scene({ t: 'When bone mass peaks', a: 'By about age 30', hi: ['femur'], steps: [
    ['Bone builds through childhood|and the teens', bars([[134, 30, 'bone', '5'], [174, 60, 'bone', '15'], [214, 90, 'bone', '30'], [254, 70, 'bone', '60']])],
    ['Peak by about 30', BIG('30', 34) + spin(206, 92, `<circle r="36" fill="none" stroke="var(--c-good)" stroke-width="3" stroke-dasharray="5 6"/>`, 8)],
    ['Calcium, vitamin D, and weight-|bearing exercise when young', row([[milk(), 'calcium'], [sun(), 'vit D'], [runner('f-good'), 'exercise']], 84, 1)],
  ] }),
  opSx: scene({ t: 'How osteoporosis shows up', a: 'Silent until a fracture', hi: ['tspine'], steps: [
    ['No symptoms at first', at(206, 96, elder(), 1.3) + at(250, 66, `<text class="ink" style="font-size:16px">...</text>`)],
    ['A fracture is often the first|sign', hipZoom(206, 92) + `<path class="a-blink" d="M236 112 l6 8 l-4 6" stroke="var(--c-bad)" stroke-width="2.4" fill="none"/>`],
    ['Lost height (up to 6 in) and|a rounded back', `<g>${posture(180, 116, 'normal', 1)}</g>` + posture(244, 120, 'kyph', .9) + `<path d="M210 60 H270" stroke="var(--c-warn)" stroke-dasharray="3 3"/>`],
  ] }),
  dexa: scene({ t: 'Reading a bone density T-score', a: '-2.5 or lower', hi: ['hip', 'lspine'], steps: [
    ['A DEXA scan measures hip and|spine density', dexaMachine()],
    ['-1 or above is normal; -1 to -2.5|is osteopenia', tscale(-1.8)],
    ['-2.5 or lower is osteoporosis', tscale(-3.2)],
  ] }),
  zfrax: scene({ t: 'Two other bone scores', a: 'Z-score vs. FRAX', hi: ['hip'], steps: [
    ['Z-score compares you to people|your own age', row([[person(), 'you'], [person({ c: 'f-good' }), 'same age']], 92, .9)],
    ['A low Z-score: look for another|cause', at(206, 92, magn(), 2.2)],
    ['FRAX: 10-year fracture risk,|ages 40-90', bars([[150, 40, 'good', 'low'], [222, 86, 'bad', 'high']])],
  ] }),
  screen: scene({ t: 'Who gets a bone density scan?', a: 'Women 65+', hi: ['hip'], steps: [
    ['All women 65 and older', at(206, 100, elder('f-mouth'), 1.3) + K(256, 70, '65+')],
    ['A DEXA scan', dexaMachine()],
    ['Usually not repeated sooner than|2 years', at(206, 92, cal(), 2) + K(250, 96, '2 yr')],
  ] }),
  opLabs: scene({ t: 'Labs for osteoporosis', a: 'Ca, vitamin D, alk phos', hi: ['hip'], steps: [
    ['Calcium, phosphorus, vitamin D', row([[vial(.5, 'f-nerve'), 'Ca'], [vial(.5, 'f-water'), 'phos'], [vial(.4, 'f-warn'), 'vit D']], 84, 1.1)],
    ['Alkaline phosphatase, CBC,|chemistry', row([[vial(.6, 'f-good'), 'alk phos'], [vial(.7), 'CBC']], 84, 1.2)],
    ['X-ray shows it only after over|25% is lost', at(206, 92, xray(`<rect x="-10" y="-10" width="20" height="20" fill="#ccc" opacity=".35"/>`), 2.2) + K(256, 66, '25%')],
  ] }),
  opTx: scene({ t: 'Living with osteoporosis', a: 'Calcium, exercise, safety', hi: ['hip'], steps: [
    ['Calcium and vitamin D', row([[milk(), 'calcium'], [sun(), 'vitamin D']], 84, 1.3)],
    ['Weight-bearing exercise; stop|smoking; less alcohol', row([[runner('f-good'), 'exercise'], [`<g>${cig()}</g>` + nope(14), 'no smoking']], 88, 1)],
    ['Fall-proof the home: rails,|lights, no clutter', at(206, 96, `<path d="M-50 30 H50 M-40 30 V-20 H40" stroke="var(--c-scar)" stroke-width="4" fill="none"/><path d="M-40 -6 H40" stroke="var(--c-good)" stroke-width="4"/>`) + at(206, 70, chk())],
  ] }),
  opRx: scene({ t: 'Osteoporosis drugs', a: 'Bisphosphonates first', hi: ['hip'], steps: [
    ['Bisphosphonates slow osteoclasts', remodel('clear') + at(164, 80, nope(14))],
    ['A PTH analog builds bone', remodel('build') + at(160, 70, syringe(-20), 1.3)],
    ['Denosumab blocks RANKL; SERMs|act like estrogen', row([[syringe(-30), 'denosumab'], [pill(-20, 'f-mouth'), 'SERM']], 84, 1.3)],
  ] }),
  rickets: scene({ t: 'Bones that won\'t harden', a: 'Rickets vs. osteomalacia', hi: ['femur', 'knees'], steps: [
    ['Bone isn\'t mineralized: soft', cls('a-sway', bone(206, 96, 140, { bow: 14 }))],
    ['Rickets: children, open|growth plates', at(206, 100, kid(), 1.4) + legsBow().replace('translate(206 96)', 'translate(250 104) scale(.5)')],
    ['Osteomalacia: soft bone matrix;|the only form in adults', at(206, 100, person({ c: 'f-spleen' }), 1.3)],
  ] }),
  ricketsCause: scene({ t: 'What causes rickets?', a: 'Low vitamin D', hi: ['femur'], steps: [
    ['Little sun or dark skin', at(206, 92, sun(), 2.2) + at(206, 92, nope(28))],
    ['Breast milk alone has little|vitamin D', at(206, 100, baby(), 1.8)],
    ['Gut can\'t absorb (celiac, CF), or|kidneys waste phosphate', row([[`<path class="f-small" d="M-16 0 Q-8 -14 0 0 T16 0" stroke="var(--c-small)" stroke-width="6" fill="none"/>`, 'gut'], [kidney(), 'kidneys']], 84, 1.3)],
  ] }),
  ricketsSx: scene({ t: 'Signs of rickets', a: 'Bowed legs, soft skull', hi: ['knees', 'skull'], beamFrom: 'knees', steps: [
    ['Bowed legs', legsBow()],
    ['Soft skull, late fontanelle|closing, bad teeth', skullBig() + `<path class="a-pulse" d="M206 70 l8 8 l-8 8 l-8 -8 Z" fill="var(--c-mucus)"/>`],
    ['Bone pain, cramps, slow growth,|waddling walk', cls('a-sway', at(206, 100, kid(), 1.4))],
  ] }),
  ricketsLab: scene({ t: 'Labs when vitamin D is low', a: 'Low Ca, D; high PTH', hi: ['neck'], steps: [
    ['Low vitamin D, calcium, and|phosphate', row([[vial(.15, 'f-warn'), 'vit D'], [vial(.2, 'f-nerve'), 'Ca'], [vial(.2, 'f-water'), 'phos']], 84, 1.1)],
    ['The parathyroids push out PTH', at(206, 92, `<path class="f-mouth" d="M-2 0 C-6 -14 -18 -12 -16 2 C-15 12 -6 12 -2 6 Z M2 0 C6 -14 18 -12 16 2 C15 12 6 12 2 6 Z"/>`, 2) + flow('M206 106 L206 146', 4, 1.6, dot('f-mouth', 3))],
    ['High PTH and alkaline|phosphatase', row([[vial(.9, 'f-mouth'), 'PTH'], [vial(.9, 'f-good'), 'alk phos']], 84, 1.2)],
  ] }),
  ricketsTx: scene({ t: 'Fixing severe low vitamin D', a: '50,000 units weekly', hi: ['femur'], steps: [
    ['High dose: 50,000 units a week', BIG('50,000', 26) + K(206, 124, 'units / week')],
    ['For about 2 months', at(206, 92, cal(), 2) + K(250, 96, '8 wk')],
    ['Then about 800 units a day', BIG('800', 30) + K(206, 124, 'units / day')],
  ] }),
  paget: scene({ t: 'Bone that remodels too fast', a: 'Paget disease', hi: ['pelvis', 'skull', 'femur'], beamFrom: 'femur', steps: [
    ['Huge, overactive osteoclasts', remodel('clear') + grow(164, 92, `<circle class="f-germ" r="12" opacity=".6"/>`, .8, 1.3)],
    ['Bone turns over 20 times faster', remodel('both') + BIG('20x', 18, 66)],
    ['New bone is big, full of vessels,|weak, and bent', bone(206, 96, 140, { bow: 16, h: 12, marrow: 'red' })],
  ] }),
  pagetWho: scene({ t: 'Who gets Paget disease?', a: 'Men over 40', hi: ['pelvis', 'skull', 'lspine'], beamFrom: 'pelvis', steps: [
    ['Usually over 40, more often men', at(206, 100, person({ c: 'f-water' }), 1.4) + K(256, 70, '40+')],
    ['Pelvis, femur, tibia, skull,|and spine', row([[`<path class="f-bone" d="M-16 -6 Q0 -16 16 -6 L12 8 H-12 Z"/>`, 'pelvis'], [`<circle class="f-bone" r="12"/>`, 'skull'], [`<rect class="f-bone" x="-5" y="-16" width="10" height="32" rx="3"/>`, 'femur']], 84, 1)],
    ['Some have an SQSTM1 gene change', at(206, 92, gene(), 2.2)],
  ] }),
  pagetSx: scene({ t: 'Signs of Paget disease', a: 'Night bone pain, big skull', hi: ['skull', 'shin'], beamFrom: 'skull', steps: [
    ['Bone pain, worse at night', at(206, 92, moon(), 2) + cls('a-blink', at(250, 80, pain(), .8))],
    ['A bigger skull with headaches|and hearing loss', grow(206, 96, `<ellipse class="f-bone" rx="34" ry="28"/>`, .85, 1.12, 3)],
    ['Bowed legs, warm skin over the|bone, easy fractures', bone(206, 96, 140, { bow: 16 }) + cls('a-blink', at(206, 64, heat()))],
  ] }),
  pagetCx: scene({ t: 'Paget complications', a: 'Fractures, HF, sarcoma', hi: ['femur', 'heart'], steps: [
    ['Fractures and arthritis', bone(206, 96, 140, { bow: 12, fx: 'trans' })],
    ['Heart failure: the heart pumps|extra blood to the bone', cls('a-beat', at(206, 92, heart(), 2.4)) + flow('M240 92 L284 92', 3, 1.4, dot('f-blood', 3))],
    ['Osteosarcoma and pinched nerves', bone(206, 96, 140, { bow: 12 }) + grow(206, 96, `<circle class="f-tumor" r="14"/>`, .5, 1.1)],
  ] }),
  pagetTx: scene({ t: 'Testing and treating Paget disease', a: 'High alk phos; bisphosphonates', hi: ['pelvis'], steps: [
    ['High alkaline phosphatase', at(206, 92, vial(.95, 'f-good'), 2)],
    ['X-ray and bone scan show the|spread', at(206, 92, xray(`<path d="M-8 -12 Q-14 0 -8 12" stroke="#ddd" stroke-width="5" fill="none"/>`), 2.2) + cls('a-blink', `<circle cx="196" cy="92" r="6" fill="var(--c-warn)" opacity=".7"/>`)],
    ['Bisphosphonates, NSAIDs, calcium|and vitamin D', row([[pill(-30, 'f-good'), 'bisphos'], [pill(20, 'f-white'), 'NSAID'], [milk(), 'Ca + D']], 84, 1)],
  ] }),
});
function beerI() { return M12.beer(); }
})();
