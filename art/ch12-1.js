/* Chapter 12 Part 1 art: bones, joints, muscles, congenital. Uses art/ch12-engine.js (M12). */
(() => {
const { at, K, T, cls, pop, thick, flow, fade, mover, grow, spin, dot, germ, wbc, pill, syringe, vial, xray, sun, milk, clock, cal, nope, chk, warn, zap, pain, tingle, gene, heart, lungs, brain, eye, ear, tooth,
  person, kid, baby, elder, runner, scene, bone, remodel, joint, spine, posture, sarc, row, quad, chip, bars, hipZoom, handZoom, kneeZoom, dumbbell, magn, steth, cast, splint, bed, scaleI, heat, ice, burst, tscale, shrink, kidney, f, cig, beer, steak, shrimp, moon, thermo, needle, screwPlate, sling, shoe, heartEKG, xray: xr } = M12;

const BIG = (t, s = 30) => `<text class="ink" x="206" y="104" text-anchor="middle" style="font-size:${s}px;font-weight:800">${t}</text>`;
const ring = (x, y, r, c = 'warn') => `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-${c})" stroke-width="2.4"/>`;
const arrowR = (x1, y, x2, c = 'warn') => `<path class="a-flow" d="M${x1} ${y} L${x2} ${y}" stroke="var(--c-${c})" stroke-width="2.6"/><path d="M${x2 + 6} ${y} l-7 -4 v8 Z" fill="var(--c-${c})"/>`;
const skullTop = (cx, cy, open = true) => `<ellipse class="f-bone" cx="${cx}" cy="${cy}" rx="40" ry="34"/>` + `<path d="M${cx} ${cy - 34} V${cy + 34} M${cx - 40} ${cy + 4} H${cx + 40}" stroke="var(--art-line)" stroke-width="1.6" stroke-dasharray="3 2"/>` +
  (open ? `<path class="a-pulse" d="M${cx} ${cy - 22} l8 8 l-8 8 l-8 -8 Z" fill="var(--c-mucus)" stroke="var(--art-line)"/><path class="a-pulse" d="M${cx} ${cy + 24} l5 5 l-5 5 l-5 -5 Z" fill="var(--c-mucus)" stroke="var(--art-line)"/>` : '');
const fiber = (cx, cy, w = 120, h = 14, c = 'f-muscle') => `<rect class="${c}" x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}"/>` + [...Array(Math.floor(w / 8))].map((_, i) => `<path d="M${cx - w / 2 + 6 + i * 8} ${cy - h / 2 + 2} V${cy + h / 2 - 2}" stroke="var(--art-line)" stroke-width=".8" opacity=".35"/>`).join('');
const pelvisZ = (cx, cy, wide = 0) => `<g><path class="f-bone" d="M${cx - 50} ${cy - 20} Q${cx - 30} ${cy - 40} ${cx - 8} ${cy - 18} L${cx - 10} ${cy + 18} Q${cx - 30} ${cy + 22} ${cx - 44} ${cy + 6} Z"/><path class="f-bone" d="M${cx + 50} ${cy - 20} Q${cx + 30} ${cy - 40} ${cx + 8} ${cy - 18} L${cx + 10} ${cy + 18} Q${cx + 30} ${cy + 22} ${cx + 44} ${cy + 6} Z"/>${wide ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 0" dur="1s"/>` : ''}</g>`;

Object.assign(PICS, {
  ligTen: scene({ t: 'Which band joins which?', a: 'Ligament vs. tendon', hi: ['knee'], o: { muscle: true }, steps: [
    ['Two bones meet at a joint', joint(206, 96)],
    ['Ligaments strap bone to bone|to keep the joint stable', joint(206, 96) + thick('M186 60 Q174 96 186 132', 'scar', 5) + thick('M226 60 Q238 96 226 132', 'scar', 5) + K(152, 96, 'ligament')],
    ['Tendons tie muscle to bone|so the muscle can pull it', `<ellipse class="f-muscle a-squeeze" cx="160" cy="70" rx="30" ry="14"/>` + thick('M188 74 L214 94', 'white', 4) + bone(244, 104, 70, { h: 7, r: 10 }) + K(204, 70, 'tendon')],
  ] }),
  skel: scene({ t: 'The two parts of the skeleton', a: 'Axial vs. appendicular', hi: ['skull', 'spine', 'ribs'], steps: [
    ['The skull, spine, and rib cage|form the center line', at(176, 98, `<circle class="f-bone" cy="-34" r="12"/>` + [...Array(9)].map((_, i) => `<rect class="f-bone" x="-4" y="${-20 + i * 7}" width="8" height="5" rx="1.5"/>`).join('') + [0, 1, 2, 3].map(i => thick(`M0 ${-10 + i * 8} Q-18 ${-12 + i * 8} -20 ${-2 + i * 8} M0 ${-10 + i * 8} Q18 ${-12 + i * 8} 20 ${-2 + i * 8}`, 'bone', 1.6)).join('')) + K(246, 96, 'axial')],
    ['Arms, shoulders, pelvis, and|legs hang off it', at(206, 92, thick('M-30 -30 L-44 6 L-48 30 M30 -30 L44 6 L48 30 M-12 22 L-16 52 M12 22 L16 52', 'bone', 4) + `<path class="f-bone" d="M-18 14 Q0 8 18 14 L14 26 H-14 Z"/>`) + cls('a-blink', K(206, 140, 'appendicular'))],
    ['206 bones in all', BIG('206', 34) + spin(206, 92, `<circle r="40" fill="none" stroke="var(--c-bone)" stroke-width="3" stroke-dasharray="6 6"/>`, 8)],
  ] }),
  boneTypes: scene({ t: 'The 5 bone shapes', a: 'Long, short, flat, +2', hi: ['femur', 'wrist', 'skull', 'spine', 'knee'], beamFrom: 'femur', steps: [
    ['Long bones like the femur|are longer than wide', bone(206, 96, 140, { cart: true })],
    ['Short bones (wrist, ankle)|and flat bones (skull, ribs)', row([[`<rect class="f-bone" x="-10" y="-10" width="20" height="20" rx="6"/>`, 'short'], [`<path class="f-bone" d="M-22 -8 Q0 -18 22 -8 V6 Q0 -4 -22 6 Z"/>`, 'flat']], 88, 1.4)],
    ['Irregular (vertebra) and|sesamoid (kneecap in a tendon)', row([[`<path class="f-bone" d="M-12 -8 H12 V8 H-12 Z M12 -2 L26 -6 L26 2 Z M-4 8 L-8 18 M4 8 L8 18"/>`, 'irregular'], [`<path d="M0 -24 V24" stroke="var(--c-scar)" stroke-width="7"/><ellipse class="f-bone" rx="8" ry="11"/>`, 'sesamoid']], 88, 1.3)],
  ] }),
  longBone: scene({ t: 'Name the parts of a long bone', a: 'Shaft, ends, growth plate', hi: ['femur'], steps: [
    ['A long bone, end to end', bone(206, 96, 140, { cart: true, plates: true })],
    ['The shaft is the diaphysis', bone(206, 96, 140, { cart: true, plates: true }) + ring(206, 96, 26) + K(206, 66, 'diaphysis')],
    ['Ends are epiphyses; growth plates|sit between, capped by cartilage', bone(206, 96, 140, { cart: true, plates: true }) + ring(141, 96, 14, 'spleen') + ring(271, 96, 14, 'spleen') + K(150, 72, 'epiphysis') + K(262, 124, 'growth plate')],
  ] }),
  flatRbc: scene({ t: 'Where adults make red cells', a: 'Flat bones', hi: ['pelvis', 'ribs', 'skull'], beamFrom: 'pelvis', steps: [
    ['Babies: red marrow fills|almost every bone', bone(206, 96, 140, { marrow: 'red' }) + flow('M150 96 L262 96', 4, 2.2, dot('f-blood', 3))],
    ['With age, long bones fill|with fatty yellow marrow', bone(206, 96, 140, { marrow: 'yellow' }) + K(206, 66, 'yellow marrow')],
    ['Adults: red cells come from flat|bones, vertebrae, and pelvis', pelvisZ(206, 96) + flow('M170 96 L120 60', 3, 2, dot('f-blood', 3)) + flow('M242 96 L290 60', 3, 2, dot('f-blood', 3))],
  ] }),
  periost: scene({ t: 'The covering on bone', a: 'Periosteum', hi: ['femur'], steps: [
    ['Bone has a tough outer coat', bone(206, 96, 140) + `<path d="M140 84 H272 M140 108 H272" stroke="var(--c-spleen)" stroke-width="3" class="a-blink"/>`],
    ['Vessels and nerves run in it', bone(206, 96, 140) + `<path d="M140 84 H272" stroke="var(--c-spleen)" stroke-width="3"/>` + flow('M150 80 L270 80', 4, 2.4, dot('f-blood', 2.6)) + thick('M196 50 L196 82', 'blood', 2)],
    ['Tendons attach to it and its|osteoblasts repair breaks', bone(206, 96, 140) + `<ellipse class="f-muscle a-squeeze" cx="200" cy="60" rx="34" ry="11"/>` + thick('M232 64 L252 84', 'white', 3.5) + [0, 1, 2].map(i => pop(i, `<rect class="f-immune" x="${166 + i * 14}" y="${108}" width="10" height="9" rx="2.5"/>`)).join('')],
  ] }),
  boneCells: scene({ t: 'The three bone cells', a: 'Blast, clast, cyte', hi: ['femur'], steps: [
    ['Osteoblasts build new bone', remodel('build')],
    ['Osteoclasts dig away old bone|(resorption)', remodel('clear')],
    ['Osteocytes: mature cells inside|the matrix that keep it up', `<rect class="f-bone" x="128" y="56" width="156" height="80" rx="8"/>` + [[160, 80], [200, 110], [244, 76], [256, 116]].map(([x, y], i) => pop(i, `<ellipse class="f-immune" cx="${x}" cy="${y}" rx="8" ry="5"/>`) + `<path d="M${x + 8} ${y} l12 4 M${x - 8} ${y} l-10 -5" stroke="var(--c-immune)" stroke-width="1.4"/>`).join('') + flow('M160 80 L200 110 L244 76', 3, 2.6, dot('f-nerve', 2))],
  ] }),
  remodel: scene({ t: 'How bone renews itself', a: 'Remodeling', hi: ['femur'], steps: [
    ['Osteoclasts clear old bone', remodel('clear')],
    ['Osteoblasts lay osteoid', remodel('build')],
    ['Calcium phosphate hardens it.|The cycle never stops', remodel('build') + flow('M140 60 L240 108', 4, 2.4, dot('f-nerve', 2.6)) + spin(150, 64, `<path d="M-10 0 A10 10 0 1 1 0 10" stroke="var(--c-warn)" stroke-width="2.4" fill="none"/>`, 2)],
  ] }),
  matrix: scene({ t: 'What bone needs to be strong', a: 'Minerals + collagen', hi: ['femur'], steps: [
    ['Healthy bone bends a little|and stays hard', bone(206, 96, 140, { bow: 0 })],
    ['Too few minerals: brittle,|snaps', bone(206, 96, 140, { fx: 'trans' }) + cls('a-shake', at(206, 60, burst(10, 'f-bad')))],
    ['Too little collagen: too bendy', cls('a-sway', bone(206, 96, 140, { bow: 22 }))],
  ] }),
  rankl: scene({ t: 'The bone on-off switch', a: 'RANKL vs. OPG', hi: ['femur'], steps: [
    ['RANKL plugs into osteoclasts|and turns them on', `<path class="f-germ" d="M190 108 Q186 76 214 76 Q242 76 238 108 Z"/>` + mover(`<path class="f-bad" d="M-6 -4 H6 V4 H-6 Z"/>`, 'M140 60 L206 88', 2) + K(150, 52, 'RANKL') + remodel('clear', 116).slice(0, 0)],
    ['More bone gets broken down', remodel('clear')],
    ['OPG is a decoy that catches|RANKL. Denosumab does too', `<circle class="f-good a-pulse" cx="180" cy="80" r="14"/>` + mover(`<path class="f-bad" d="M-6 -4 H6 V4 H-6 Z"/>`, 'M260 60 L194 80', 2) + K(180, 106, 'OPG') + at(250, 116, syringe(-20)) + K(250, 136, 'denosumab')],
  ] }),
  estro: scene({ t: 'Why bone thins after menopause', a: 'Less estrogen, more RANKL', hi: ['pelvis', 'lspine'], beamFrom: 'pelvis', steps: [
    ['Estrogen keeps RANKL in check', `<circle class="f-mouth" cx="170" cy="88" r="16"/>` + K(170, 92, 'E') + at(240, 88, nope(14)) + K(240, 116, 'RANKL blocked')],
    ['At menopause estrogen falls', bars([[150, 80, 'mouth', 'before'], [222, 20, 'mouth', 'after']])],
    ['Osteoclasts speed up and|bone gets porous', bone(206, 96, 140, { porous: true }) + flow('M150 60 L260 60', 3, 2, dot('f-germ', 4))],
  ] }),
  steroid: scene({ t: 'How steroids hurt bone', a: 'More RANKL, fewer blasts', hi: ['hip', 'lspine'], steps: [
    ['Long-term glucocorticoids', row([[pill(-30, 'f-warn'), ''], [pill(20, 'f-warn'), ''], [cal(), '3+ months']], 88, 1.3)],
    ['They raise RANKL and slow|osteoblasts', remodel('clear') + at(250, 70, nope(12))],
    ['Bone thins and can break', bone(206, 96, 140, { porous: true, fx: 'trans' })],
  ] }),
  calcHorm: scene({ t: 'Two hormones, blood calcium', a: 'PTH vs. calcitonin', hi: ['neck'], steps: [
    ['PTH from the parathyroids|wakes osteoclasts', at(170, 80, `<path class="f-mouth" d="M-14 -8 Q0 -16 14 -8 Q16 8 0 10 Q-16 8 -14 -8 Z"/>`) + remodel('clear', 118).replace('', '') ],
    ['Calcium leaves bone: blood|calcium goes UP', bone(206, 110, 130) + flow('M206 104 L206 54', 4, 1.8, dot('f-nerve', 3)) + K(250, 60, 'Ca up')],
    ['Calcitonin calms osteoclasts:|calcium goes INTO bone', bone(206, 110, 130) + flow('M206 54 L206 104', 4, 1.8, dot('f-nerve', 3)) + K(250, 60, 'Ca down')],
  ] }),
  vitD: scene({ t: 'Vitamin D\'s job', a: 'Absorbs calcium', hi: ['gut', 'kidney'], beamFrom: 'gut', steps: [
    ['Sun and food make vitamin D', row([[sun(), 'sun'], [milk(), 'food']], 86, 1.3)],
    ['It pulls calcium in from|the gut', thick('M130 96 Q170 76 206 96 T282 96', 'small', 12) + flow('M206 92 L206 52', 4, 1.8, dot('f-nerve', 3))],
    ['Kidneys keep calcium and|phosphate; bone gets built', at(170, 96, kidney(), 1.8) + at(240, 96, kidney(), 1.8) + flow('M170 96 L206 60', 3, 2, dot('f-nerve', 3))],
  ] }),
  growth: scene({ t: 'Two ways bones grow', a: 'Wider vs. longer', hi: ['femur', 'knee'], steps: [
    ['Appositional: new layers on|the outside make it wider', grow(206, 96, bone(0, 0, 120, { h: 9 }), .85, 1.1, 2.8)],
    ['Endochondral: growth plate|cartilage turns to bone', bone(206, 96, 120, { plates: true }) + flow('M262 96 L280 96', 3, 1.6, dot('f-mucus', 3))],
    ['Growth hormone and thyroid|drive growth', at(206, 92, kid(), 1.1) + cls('a-rise', `<path d="M240 120 V60" stroke="var(--c-good)" stroke-width="3"/>`)],
  ] }),
  cart: scene({ t: 'The three kinds of cartilage', a: 'Hyaline, elastic, fibro', hi: ['knee', 'ear', 'lspine'], beamFrom: 'knee', steps: [
    ['Hyaline: most common, weakest,|on joint surfaces', joint(206, 96) + ring(206, 82, 20, 'mucus')],
    ['Elastic: bends, like the|outer ear', cls('a-sway', at(206, 92, ear(), 3))],
    ['Fibrocartilage: strongest, in|disks and pubic symphysis', spine(190, 96)],
  ] }),
  noVessel: scene({ t: 'Why cartilage heals poorly', a: 'No blood supply', hi: ['knee'], steps: [
    ['Bone is full of vessels', bone(206, 96, 140) + flow('M140 96 L270 96', 4, 2.2, dot('f-blood', 3))],
    ['Cartilage has none: no vessels,|no nerves', `<rect class="f-mucus" x="140" y="76" width="132" height="40" rx="10"/>` + at(206, 96, nope(16))],
    ['Food only seeps in slowly', `<rect class="f-mucus" x="140" y="76" width="132" height="40" rx="10"/>` + flow('M206 50 L206 92', 3, 3.4, dot('f-water', 2.4)) + at(250, 64, clock())],
  ] }),
  joints: scene({ t: 'Joints by how much they move', a: 'Free, slight, none', hi: ['shoulder', 'spine', 'skull'], beamFrom: 'shoulder', steps: [
    ['Synovial joints move freely,|like the shoulder', at(206, 96, `<circle class="f-bone" r="16"/>`) + spin(206, 96, thick('M0 0 L44 0', 'bone', 8), 3)],
    ['Amphiarthroses move a little,|like the spine', cls('a-sway', spine(190, 96))],
    ['Synarthroses don\'t move:|skull sutures', skullTop(206, 96, false)],
  ] }),
  synov: scene({ t: 'Parts of a synovial joint', a: 'Cartilage, fluid, capsule', hi: ['hip'], steps: [
    ['Cartilage caps the bone ends', joint(206, 96) + ring(206, 80, 18, 'mucus')],
    ['Slippery fluid with hyaluronic|acid lets them glide', joint(206, 96) + flow('M176 96 L236 96', 4, 1.8, dot('f-water', 3))],
    ['A capsule and ligaments|hold it together', joint(206, 96) + `<path class="a-blink" d="M178 62 Q166 96 178 130 M234 62 Q246 96 234 130" stroke="var(--c-warn)" stroke-width="3" fill="none"/>`],
  ] }),
  disk: scene({ t: 'Inside an intervertebral disk', a: 'Gel center, tough ring', hi: ['lspine'], steps: [
    ['Disks sit between vertebrae', spine(190, 96)],
    ['The gel center is the nucleus|pulposus: a shock absorber', at(206, 96, `<ellipse class="f-white" rx="50" ry="30"/>` + grow(0, 0, `<ellipse fill="var(--c-water)" rx="22" ry="12" stroke="var(--art-line)"/>`, .8, 1.1, 1.6))],
    ['The tough outer ring is the|annulus fibrosus', at(206, 96, `<ellipse class="f-white" rx="50" ry="30"/>` + [44, 38, 32].map(r => `<ellipse rx="${r}" ry="${r * .6}" fill="none" stroke="var(--c-scar)" stroke-width="1.6"/>`).join('') + `<ellipse fill="var(--c-water)" rx="22" ry="12"/>`) + ring(206, 96, 50)],
  ] }),
  font: scene({ t: 'Soft spots on a baby\'s skull', a: 'Back 2 mo, front 2 yr', hi: ['skull'], steps: [
    ['A newborn skull has two|soft spots', skullTop(206, 96)],
    ['The back one closes by|about 2 months', skullTop(206, 96) + ring(206, 125, 10) + K(256, 128, '2 months')],
    ['The front one closes by|about 2 years', skullTop(206, 96) + ring(206, 70, 12) + K(256, 70, '2 years')],
  ] }),
  preg: scene({ t: 'Pregnancy and the pelvis', a: 'Loose ligaments, wider pelvis', hi: ['pelvis', 'lowback'], steps: [
    ['Relaxin and estrogen loosen|ligaments', pelvisZ(206, 96) + flow('M150 56 L200 90', 3, 2, dot('f-mouth', 3))],
    ['The pubic and SI joints widen', `<g>${pelvisZ(206, 96)}</g>` + `<path d="M196 112 H216" stroke="var(--c-warn)" stroke-width="3" class="a-pulse"/>` + `<path d="M188 120 l-8 0 M224 120 l8 0" stroke="var(--c-warn)" stroke-width="3" class="a-flow"/>`],
    ['The pelvis tips forward: low|back pain, carpal tunnel', posture(206, 112, 'lord', 1.1) + cls('a-blink', at(222, 82, pain(), .7))],
  ] }),
  muscleTypes: scene({ t: 'The three muscle types', a: 'Skeletal, smooth, cardiac', hi: ['thigh', 'heart'], o: { muscle: true }, beamFrom: 'thigh', steps: [
    ['Skeletal: you control it,|striped fibers', cls('a-squeeze', fiber(206, 96))],
    ['Smooth: automatic, in organ|walls', thick('M130 96 Q170 70 206 96 T282 96', 'stomach', 14) + `<path class="a-flow" d="M130 96 Q170 70 206 96 T282 96" stroke="#fff" stroke-width="2" fill="none"/>`],
    ['Cardiac: automatic, the heart', cls('a-beat', at(206, 92, heart(), 2.4))],
  ] }),
  sarc: scene({ t: 'The two muscle filaments', a: 'Actin thin, myosin thick', hi: ['thigh'], o: { muscle: true }, steps: [
    ['A muscle fiber has bands', fiber(206, 96, 150, 30)],
    ['Thin actin and thick myosin|line up in sarcomeres', sarc(206, 96, false)],
    ['Myosin pulls actin to shorten', sarc(206, 96, true)],
  ] }),
  contract: scene({ t: 'How a muscle contracts', a: 'ACh, calcium, ATP', hi: ['arm'], o: { muscle: true }, steps: [
    ['A nerve releases acetylcholine', thick('M130 70 H190', 'nerve', 5) + flow('M190 72 L230 92', 4, 1.6, dot('f-good', 2.6)) + fiber(240, 104, 90, 18)],
    ['Calcium floods out and moves|tropomyosin off actin', sarc(206, 96, false) + flow('M206 50 L206 96', 5, 1.6, dot('f-nerve', 2.6))],
    ['Myosin grabs actin and ATP|powers the pull', sarc(206, 96, true) + cls('a-blink', K(206, 140, 'ATP'))],
  ] }),
  relax: scene({ t: 'How a muscle relaxes', a: 'Calcium pumped back', hi: ['arm'], o: { muscle: true }, steps: [
    ['The nerve signal stops', thick('M130 70 H190', 'scar', 5) + at(210, 70, nope(12))],
    ['Calcium is pumped back into|the sarcoplasmic reticulum', `<rect class="f-mucus" x="140" y="54" width="132" height="22" rx="10"/>` + flow('M206 120 L206 70', 5, 1.6, dot('f-nerve', 2.6))],
    ['Tropomyosin covers actin and|the fiber lengthens', sarc(206, 100, false)],
  ] }),
  wrap: scene({ t: 'Muscle wrappings, in to out', a: 'Endo, peri, epi', hi: ['thigh'], o: { muscle: true }, steps: [
    ['Endomysium wraps each fiber', at(206, 96, [...Array(7)].map((_, i) => `<circle class="f-muscle" cx="${f2(i)[0]}" cy="${f2(i)[1]}" r="7"/>`).join('')) + ring(206, 96, 9, 'mucus')],
    ['Perimysium wraps bundles', at(206, 96, [...Array(7)].map((_, i) => `<circle class="f-muscle" cx="${f2(i)[0]}" cy="${f2(i)[1]}" r="7"/>`).join('') + `<circle r="24" fill="none" stroke="var(--c-mucus)" stroke-width="3" class="a-pulse"/>`)],
    ['Epimysium and fascia wrap the|whole muscle', at(206, 96, `<circle r="44" fill="none" stroke="var(--c-white, #fff)" stroke-width="4" class="a-pulse"/>` + [[-16, -10], [14, -12], [0, 16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" class="f-muscle"/>`).join(''))],
  ] }),
  bigger: scene({ t: 'How exercise builds muscle', a: 'Bigger fibers, not more', hi: ['arm', 'thigh'], o: { muscle: true }, steps: [
    ['Lifting works the fibers', cls('a-bob', at(206, 90, dumbbell(), 2.4))],
    ['Each fiber gets thicker; the|count stays the same', [0, 1, 2].map(i => grow(160 + i * 46, 96, `<circle class="f-muscle" r="14"/>`, .7, 1.15, 2.6)).join('')],
    ['Stop for 2 weeks: about half|the gain is gone', bars([[150, 80, 'muscle', 'trained'], [222, 40, 'muscle', '2 weeks off']])],
  ] }),
  sarco: scene({ t: 'Muscle loss with age', a: 'Sarcopenia', hi: ['thigh', 'arm'], o: { muscle: true }, steps: [
    ['After 50, about 10% of muscle|is lost', bars([[136, 90, 'muscle', '30'], [184, 80, 'muscle', '50'], [232, 62, 'muscle', '80']])],
    ['Fibers shrink and fat moves in', grow(206, 96, `<circle class="f-muscle" r="26"/>`, 1, .7, 3) + [0, 1, 2].map(i => pop(i, `<circle class="f-fat" cx="${180 + i * 24}" cy="${120}" r="6"/>`)).join('')],
    ['Strength drops faster than size.|Exercise slows it', at(206, 96, elder(), 1.3) + at(256, 80, dumbbell())],
  ] }),
  ddh: scene({ t: 'Baby hip that won\'t stay put', a: 'Hip dysplasia (DDH)', hi: ['hipL'], steps: [
    ['A normal hip: deep socket|holds the ball', hipZoom(206, 92)],
    ['In DDH the socket is shallow', hipZoom(206, 92, { shallow: true })],
    ['The ball slips partly or fully out', hipZoom(206, 92, { shallow: true, out: true })],
  ] }),
  ddhRisk: scene({ t: 'Who is at risk for DDH?', a: 'Girls, breech, tight swaddle', hi: ['hips'], steps: [
    ['Girls (up to 3 times more)', at(206, 92, kid('f-mouth'), 1.4) + K(250, 70, '3x')],
    ['Breech position late in|pregnancy', at(206, 96, `<ellipse class="f-mouth" rx="40" ry="34" opacity=".5"/>` + at(0, 6, baby(), 1, 180))],
    ['Swaddling legs straight and|together (cradleboards)', at(206, 96, `<rect class="f-white" x="-36" y="-12" width="72" height="24" rx="12"/>` + `<circle class="f-skin" cx="-44" cy="0" r="9"/>`) + at(206, 96, nope(30))],
  ] }),
  barlow: scene({ t: 'Two newborn hip tests', a: 'Barlow out, Ortolani in', hi: ['hipL', 'hip'], steps: [
    ['Both are done with the hips|and knees bent', at(206, 100, baby(), 2)],
    ['Barlow: push back; an unstable|hip slips OUT', hipZoom(206, 92, { shallow: true, out: true }) + K(260, 136, 'out')],
    ['Ortolani: lift and spread; the|hip clunks back IN', hipZoom(206, 92, { shallow: true }) + cls('a-blink', K(260, 136, 'clunk')) + cls('a-shake', at(206, 90, `<circle r="20" fill="none" stroke="var(--c-good)" stroke-width="3"/>`))],
  ] }),
  ddhSigns: scene({ t: 'Signs of hip dysplasia', a: 'Uneven creases, Galeazzi', hi: ['thighL'], steps: [
    ['Thigh and buttock creases|don\'t match', at(206, 96, `<rect class="f-skin" x="-32" y="-30" width="26" height="62" rx="12"/><rect class="f-skin" x="6" y="-30" width="26" height="62" rx="12"/><path d="M-30 -6 q6 4 22 0 M-30 6 q6 4 22 0 M8 0 q6 4 22 0" stroke="var(--c-bad)" stroke-width="2" fill="none" class="a-blink"/>`)],
    ['Galeazzi: knees bent, one knee|sits lower', at(206, 96, `<path d="M-40 30 L-14 -10 L6 30 M14 30 L36 -2 L56 30" stroke="var(--c-skin)" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-20 -10 H50" stroke="var(--c-warn)" stroke-width="1.6" stroke-dasharray="4 3"/>`) + cls('a-blink', at(242, 92, `<path d="M0 0 V10" stroke="var(--c-bad)" stroke-width="2.6"/>`))],
    ['Limited abduction; walkers|limp (Trendelenburg)', at(206, 96, person({ c: 'f-good' }), 1.3) + cls('a-sway', at(206, 96, `<path d="M-20 -8 H20" stroke="var(--c-warn)" stroke-width="2.6"/>`))],
  ] }),
  ddhTx: scene({ t: 'Testing and treating DDH', a: 'Ultrasound; Pavlik harness', hi: ['hips'], steps: [
    ['Young babies: ultrasound', at(206, 92, `<path class="f-white" d="M-14 -20 H14 L8 10 H-8 Z"/>`) + flow('M206 104 L206 140', 3, 1.6, `<path d="M-8 0 Q0 4 8 0" stroke="var(--c-water)" stroke-width="2" fill="none"/>`)],
    ['After 4-6 months: X-ray', at(206, 96, xray(thick('M-10 -8 Q0 -14 10 -8', 'white', 2) + `<circle cx="0" cy="0" r="5" fill="#fff"/>`), 1.6)],
    ['Pavlik harness holds hips bent|and spread for 2-3 months', at(206, 100, baby(), 2) + `<path d="M180 76 L236 120 M232 76 L176 120" stroke="var(--c-immune)" stroke-width="4" class="a-pulse"/>`],
  ] }),
  oi: scene({ t: 'Brittle bone disease', a: 'Osteogenesis imperfecta', hi: ['femur', 'arm', 'ribs'], pain: 1, steps: [
    ['A gene for type I collagen|is faulty', at(206, 94, gene(), 2.2)],
    ['The bone frame is weak', bone(206, 96, 140, { porous: true })],
    ['Bones break easily, sometimes|over 100 times', bone(206, 96, 140, { fx: 'comm' })],
  ] }),
  oiTypes: scene({ t: 'The main OI types', a: 'I mild, II lethal', hi: ['body'], beamFrom: 'ribs', steps: [
    ['Type I: mildest, normal height', bars([[150, 30, 'good', 'I']])],
    ['Type II: lethal at birth;|type III: severe but survives', bars([[150, 30, 'good', 'I'], [190, 90, 'bad', 'II'], [230, 72, 'warn', 'III']])],
    ['Type IV: moderate', bars([[134, 30, 'good', 'I'], [174, 90, 'bad', 'II'], [214, 72, 'warn', 'III'], [254, 50, 'pancreas', 'IV']])],
  ] }),
  oiSigns: scene({ t: 'Classic signs of OI', a: 'Blue sclera, hearing loss', hi: ['eye', 'ear'], beamFrom: 'eye', steps: [
    ['Blue whites of the eyes', at(206, 94, eye('f-mucus'), 3)],
    ['Hearing loss (tiny ear bones|break)', at(180, 94, ear(), 2.6) + cls('a-blink', at(244, 90, `<path d="M-10 -10 q8 10 0 20 M0 -16 q12 16 0 32" stroke="var(--c-scar)" stroke-width="2.4" fill="none"/>`)) + at(244, 90, nope(18))],
    ['Brittle teeth, short stature,|loose joints, bruising', row([[tooth(), 'teeth'], [kid('f-good'), 'short'], [`<circle class="f-spleen" r="9" opacity=".8"/>`, 'bruise']], 84, 1)],
  ] }),
  oiTx: scene({ t: 'Main drug for OI', a: 'Bisphosphonates', hi: ['femur'], steps: [
    ['Osteoclasts keep eating bone', remodel('clear')],
    ['Bisphosphonates slow them', remodel('clear') + at(164, 80, nope(14)) + at(250, 70, pill(-30, 'f-good'), 1.6)],
    ['Fewer breaks, plus PT and OT|on a care team', bars([[150, 84, 'bad', 'before'], [222, 34, 'good', 'after']])],
  ] }),
  curves: scene({ t: 'Three bad spine curves', a: 'Kyph, lord, scoliosis', hi: ['spine'], o: { spine: 'scol' }, steps: [
    ['Kyphosis: upper back rounds out|(hunchback)', posture(206, 112, 'kyph', 1.2)],
    ['Lordosis: low back sways in', posture(206, 112, 'lord', 1.2)],
    ['Scoliosis: spine curves sideways', at(206, 96, [...Array(10)].map((_, i) => `<rect class="f-bone" x="${-5 + 12 * Math.sin(i / 9 * Math.PI * 2)}" y="${-46 + i * 9.5}" width="10" height="7" rx="2"/>`).join(''))],
  ] }),
  scheu: scene({ t: 'Teen round back: posture or not?', a: 'Scheuermann stays curved', hi: ['tspine'], steps: [
    ['A teen in a growth spurt|has a rounded back', posture(206, 112, 'kyph', 1.2)],
    ['Poor posture straightens out|lying flat', at(206, 104, `<rect class="f-skin" x="-50" y="-8" width="90" height="16" rx="8"/><circle class="f-skin" cx="50" cy="0" r="9"/>`) + at(206, 70, chk())],
    ['Scheuermann kyphosis stays|curved, even lying down', at(206, 104, `<path class="f-skin" d="M-50 8 Q0 -26 40 8 Z"/><circle class="f-skin" cx="50" cy="4" r="9"/>`) + cls('a-blink', at(206, 66, warn()))],
  ] }),
  adultKyph: scene({ t: 'Why adults get hunched', a: 'Osteoporosis, fractures', hi: ['tspine'], steps: [
    ['Weak vertebrae', bone(206, 96, 130, { porous: true })],
    ['Front edges collapse into|wedges', spine(190, 96, { kind: 'wedge' })],
    ['The back rounds; a bad curve|limits breathing', posture(180, 112, 'kyph', 1.2) + at(250, 84, lungs(), 1.4) + at(250, 84, nope(18))],
  ] }),
  scol: scene({ t: 'Sideways spine basics', a: 'Scoliosis', hi: ['spine'], o: { spine: 'scol' }, steps: [
    ['Usually no known cause', at(206, 92, `<text class="ink" text-anchor="middle" y="10" style="font-size:36px;font-weight:800">?</text>`)],
    ['More common in girls; worsens|in growth spurts', at(206, 96, kid('f-mouth'), 1.4) + cls('a-rise', `<path d="M250 120 V64" stroke="var(--c-good)" stroke-width="3"/>`)],
    ['The curve bends and twists|the vertebrae', at(206, 96, [...Array(10)].map((_, i) => `<rect class="f-bone" x="${-5 + 14 * Math.sin(i / 9 * Math.PI * 2)}" y="${-46 + i * 9.5}" width="10" height="7" rx="2" transform="rotate(${18 * Math.cos(i / 9 * Math.PI * 2)} 0 ${-42 + i * 9.5})"/>`).join(''))],
  ] }),
  adams: scene({ t: 'The bend-forward screening test', a: 'Adams forward bend test', hi: ['ribs'], o: { spine: 'scol' }, steps: [
    ['The patient bends at the waist', at(206, 104, `<path class="f-good" d="M-30 0 Q0 -30 34 -10 L30 4 Q0 -14 -26 12 Z"/><circle class="f-skin" cx="40" cy="6" r="8"/><path d="M-26 6 L-30 40 M-16 6 L-14 40" stroke="var(--c-vein)" stroke-width="6"/>`)],
    ['Look along the back from|behind', at(206, 100, `<path class="f-skin" d="M-44 10 Q0 -12 44 10 Z"/>`) + at(164, 60, magn(), 1.3)],
    ['A rib hump on one side means|scoliosis', at(206, 100, `<path class="f-skin" d="M-44 10 Q-20 -24 0 -6 Q20 -4 44 10 Z"/>`) + ring(186, 84, 12, 'bad')],
  ] }),
  cobb: scene({ t: 'Measuring a spine curve', a: 'Cobb angle', hi: ['spine'], o: { spine: 'scol' }, steps: [
    ['Take an X-ray of the spine', at(206, 96, xray([...Array(7)].map((_, i) => `<rect x="${-3 + 6 * Math.sin(i / 6 * Math.PI)}" y="${-14 + i * 4.2}" width="6" height="3" fill="#ddd"/>`).join('')), 2.2)],
    ['Draw lines off the most tilted|vertebrae and measure', at(206, 96, xray(`<path d="M-14 -12 L10 -6 M-12 12 L12 4" stroke="var(--c-warn)" stroke-width="1.4"/>`), 2.2)],
    ['Over 10 degrees = scoliosis', BIG('>10°', 30)],
  ] }),
});
function f2(i) { const a = i / 7 * Math.PI * 2; return i === 0 ? [0, 0] : [Math.round(16 * Math.cos(a)), Math.round(16 * Math.sin(a))]; }
})();
