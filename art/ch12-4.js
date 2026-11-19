/* Chapter 12 Part 4 art: arthritis, muscle disorders, tumors. Uses art/ch12-engine.js (M12). */
(() => {
const { f, at, T, K, cls, pop, thick, flow, fade, mover, grow, spin, dot, germ, wbc, crystal, pill, syringe, ice, heat, vial, xray, sun, milk, steak, beer, shrimp, clock, cal, moon, nope, chk, warn, zap, burst, pain, tingle,
  dumbbell, cig, gene, scaleI, kidney, heart, lungs, brain, eye, ear, tooth, sling, cast, splint, screwPlate, bed, shoe, magn, steth, needle, thermo, heartEKG, person, kid, baby, elder, runner,
  scene, bone, remodel, joint, spine, posture, sarc, tunnel, tscale, bars, chip, row, quad, hipZoom, handZoom, kneeZoom, shrink } = M12;

const BIG = (t, s = 28, y = 104) => `<text class="ink" x="206" y="${y}" text-anchor="middle" style="font-size:${s}px;font-weight:800">${t}</text>`;
const ring = (x, y, r, c = 'warn') => `<circle class="a-pulse" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--c-${c})" stroke-width="2.4"/>`;
const toe = (hot) => at(206, 100, `<path class="f-skin" d="M-60 20 Q-60 -6 -30 -10 L30 -14 Q52 -16 56 0 Q58 16 40 20 Z"/>` + `<ellipse class="f-skin" cx="44" cy="0" rx="14" ry="12"/>` + (hot ? `<circle class="a-pulse" cx="34" cy="2" r="16" fill="var(--c-bad)" opacity=".55"/>` : ''));
const fingerJ = (zone) => handZoom(206, 100, zone);
const swan = () => at(206, 96, `<path d="M-50 20 L-10 10 L20 -16 L46 -6" stroke="var(--c-skin)" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + [[-10, 10], [20, -16]].map(([x, y]) => `<circle class="f-bad" cx="${x}" cy="${y}" r="4"/>`).join(''));
const ulnar = () => at(206, 100, `<path class="f-skin" d="M-30 40 V0 H30 V40 Z"/>` + [-22, -8, 6, 20].map((x, i) => `<rect class="f-skin" x="${x}" y="-36" width="10" height="36" rx="5" transform="rotate(${18} ${x + 5} 0)"/>`).join(''));
const bamboo = () => at(206, 96, [...Array(7)].map((_, i) => `<rect class="f-bone" x="-14" y="${-48 + i * 14}" width="28" height="12" rx="1"/>`).join('') + `<path d="M-16 -48 V50 M16 -48 V50" stroke="var(--c-bone)" stroke-width="4"/>`);
const nodule = (x, y, r = 9, c = 'f-white') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
const gowersSeq = () => at(206, 100, `<g><path class="f-good" d="M-4 0 L-2 -24 Q2 -28 6 -24 L8 0 Z"/><circle class="f-skin" cx="2" cy="-32" r="6"/><path d="M-2 0 L-4 26 M6 0 L8 26" stroke="var(--c-vein)" stroke-width="5"/><path d="M-2 -20 L-8 6 M6 -20 L10 8" stroke="var(--c-skin)" stroke-width="4"/><animateTransform attributeName="transform" type="rotate" values="70 0 26;40 0 26;10 0 26;0 0 26;70 0 26" keyTimes="0;.3;.6;.85;1" dur="4s" repeatCount="indefinite"/></g>`, 1.2);
const bodyMap = (n = 6) => at(206, 96, `<circle class="f-skin" cy="-36" r="8"/><path class="f-skin" d="M-12 -26 H12 L14 10 H-14 Z"/><path d="M-12 -24 L-24 4 M12 -24 L24 4 M-6 10 L-8 44 M6 10 L8 44" stroke="var(--c-skin)" stroke-width="6" stroke-linecap="round"/>` +
  [[-20, -6], [20, -6], [0, -14], [-8, 30], [8, 30], [0, 2], [-14, -22], [14, -22]].slice(0, n).map(([x, y], i) => `<circle class="a-blink" cx="${x}" cy="${y}" r="4" fill="var(--c-bad)" style="animation-delay:${i * .2}s"/>`).join(''));
const tumorBone = (cx = 206, near = 'mid', c = 'f-tumor') => bone(cx, 96, 140) + grow(near === 'end' ? cx + 60 : cx, near === 'end' ? 82 : 96, `<circle class="${c}" r="16" opacity=".92"/>`, .5, 1.1);
const urine = (c = 'stool') => at(206, 92, `<path class="f-white" d="M-14 -24 H14 L10 24 H-10 Z"/><path d="M-12 -6 H12 L9 22 H-9 Z" fill="var(--c-${c})"/>`, 1.3);

Object.assign(PICS, {
  oa: scene({ t: 'Wear-and-tear arthritis', a: 'Osteoarthritis', hi: ['knee', 'hip', 'hand'], steps: [
    ['A healthy joint glides on|smooth cartilage', joint(206, 96)],
    ['Cartilage frays and wears away', joint(206, 96, { kind: 'oa', spurs: false })],
    ['Bone thickens, spurs form, the|joint space narrows', joint(206, 96, { kind: 'oa' })],
  ] }),
  oaHall: scene({ t: 'Where OA damage starts', a: 'Cartilage proteoglycan loss', hi: ['knee'], steps: [
    ['Cartilage is full of water-holding|proteoglycans', joint(206, 96) + flow('M180 80 L232 80', 4, 2, dot('f-water', 2.4))],
    ['They break down first', joint(206, 96) + flow('M206 80 L206 50', 4, 1.6, dot('f-mucus', 2.6))],
    ['Inflammation joins in, but it|doesn\'t start OA', joint(206, 96, { kind: 'oa' }) + grow(206, 96, `<circle r="34" fill="var(--c-bad)" opacity=".15"/>`, .8, 1.1)],
  ] }),
  oaJoints: scene({ t: 'Joints OA hits most', a: 'Hands, knees, hips, spine', hi: ['hand', 'knee', 'hip', 'lspine'], beamFrom: 'knee', steps: [
    ['Hands often first', fingerJ(['dip', 'pip'])],
    ['Then knees, hips, and spine', row([[`<circle class="f-bone" r="10"/>`, 'knee'], [`<circle class="f-bone" r="12"/>`, 'hip'], [`<rect class="f-bone" x="-6" y="-12" width="12" height="24" rx="3"/>`, 'spine']], 84, 1.1)],
    ['Obesity raises risk, even in|the hands (fat makes cytokines)', at(206, 96, scaleI(), 2) + flow('M240 96 L284 80', 3, 1.8, dot('f-fat', 3))],
  ] }),
  oaSx: scene({ t: 'How OA feels', a: 'Pain with use, short stiffness', hi: ['knee'], pain: 1, steps: [
    ['Pain with use, better with rest', cls('a-bob', at(180, 100, person(), 1.1)) + at(250, 96, bed(), 1.2)],
    ['Morning stiffness under 30|minutes', at(206, 92, clock(), 2) + K(250, 96, '<30 min')],
    ['Crepitus and hard, bony joints', joint(206, 96, { kind: 'oa' }) + cls('a-blink', at(262, 70, `<path d="M-10 0 l3 -5 l3 5 l3 -5 l3 5" stroke="var(--c-warn)" stroke-width="2" fill="none"/>`))],
  ] }),
  nodes: scene({ t: 'Bony finger bumps in OA', a: 'Heberden DIP, Bouchard PIP', hi: ['finger'], steps: [
    ['OA grows bony knobs on finger|joints', fingerJ([])],
    ['Heberden nodes: at the DIP|(fingertip end)', fingerJ(['dip'])],
    ['Bouchard nodes: at the PIP|(middle knuckle)', fingerJ(['pip'])],
  ] }),
  oaDx: scene({ t: 'Diagnosing OA', a: 'Clinical; labs normal', hi: ['knee'], steps: [
    ['History and exam are usually|enough', at(206, 92, steth(), 2.2)],
    ['ESR and CRP are normal', row([[vial(.2), 'ESR'], [vial(.2, 'f-warn'), 'CRP']], 84, 1.2) + at(256, 70, chk())],
    ['Image only if something is|unusual', at(206, 92, xray(`<path d="M-4 -12 V-2 M-4 2 V12" stroke="#ddd" stroke-width="5"/>`), 2)],
  ] }),
  oaTx: scene({ t: 'Treating OA', a: 'Exercise, weight loss, NSAIDs', hi: ['knee'], steps: [
    ['Exercise, PT, and weight loss', row([[runner('f-good'), 'exercise'], [scaleI(), 'weight']], 88, 1)],
    ['NSAIDs and creams; joint shots.|Acetaminophen works poorly', row([[pill(-30, 'f-good'), 'NSAID'], [syringe(-40), 'injection'], [`<g>${pill(10, 'f-white')}</g>` + nope(12), 'APAP']], 84, 1)],
    ['Joint replacement for bad cases', joint(206, 96, { kind: 'fused' }).replace(/f-bone" x="(\d+)" y="(\d+)" width="36"/, 'f-scar" x="$1" y="$2" width="36"') + at(260, 64, chk())],
  ] }),
  septic: scene({ t: 'A hot, swollen joint with fever', a: 'Septic arthritis', hi: ['knee'], glow: 'bad', steps: [
    ['Germs reach the joint, usually|Staph aureus', joint(206, 96, { kind: 'septic' })],
    ['Red, hot, swollen, fever', joint(206, 96, { kind: 'septic' }) + at(262, 64, thermo(), 1.2)],
    ['Tap and culture BEFORE|antibiotics, then drain', joint(206, 96) + at(258, 80, syringe(-150), 1.4) + flow('M206 96 L250 80', 3, 1.6, dot('f-pancreas', 3))],
  ] }),
  ra: scene({ t: 'The immune system attacks joints', a: 'Rheumatoid arthritis', hi: ['hand', 'handL', 'wrist', 'wristL'], beamFrom: 'hand', steps: [
    ['An autoimmune attack on the|joint lining (synovium)', joint(206, 96) + flow('M140 140 L190 100', 4, 2.2, wbc())],
    ['The lining swells and thickens', joint(206, 96, { kind: 'ra' })],
    ['It\'s systemic: heart, lungs, eyes.|More in women and smokers', row([[heart(), 'heart'], [lungs(), 'lungs'], [eye(), 'eyes']], 84, 1)],
  ] }),
  raPath: scene({ t: 'How RA wrecks a joint', a: 'Synovitis, pannus, fusion', hi: ['hand'], steps: [
    ['Synovitis: inflamed lining', joint(206, 96) + grow(206, 96, `<path d="M-30 -30 Q-40 0 -30 30 M30 -30 Q40 0 30 30" stroke="var(--c-bad)" stroke-width="6" fill="none"/>`, .9, 1.05)],
    ['Pannus: thick tissue that eats|cartilage and bone', joint(206, 96, { kind: 'ra' })],
    ['Fibrosis, then fused joint|(ankylosis)', joint(206, 96, { kind: 'fused' })],
  ] }),
  raSx: scene({ t: 'How RA shows up', a: 'Symmetric, stiff over 1 hr', hi: ['hand', 'handL', 'wrist', 'wristL'], beamFrom: 'hand', steps: [
    ['The same joints on both sides', row([[`<circle class="f-bad a-pulse" r="10"/>`, 'left'], [`<circle class="f-bad a-pulse" r="10"/>`, 'right']], 84, 1.2)],
    ['Knuckles (MCP), PIP, wrists;|spares the DIP', fingerJ(['mcps', 'pip', 'wrist'])],
    ['Morning stiffness over 1 hour;|boggy, not red', at(206, 92, clock(), 2) + K(250, 96, '>1 hr')],
  ] }),
  raDef: scene({ t: 'Late RA hand changes', a: 'Ulnar drift, swan neck', hi: ['hand'], steps: [
    ['Ulnar drift: fingers lean toward|the pinky', ulnar()],
    ['Swan neck and boutonnière|finger shapes', swan()],
    ['Rheumatoid nodules, often at|the elbows', at(206, 96, `<path d="M-60 -20 L0 6 L60 -14" stroke="var(--c-skin)" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) + pop(0, nodule(208, 110, 8))],
  ] }),
  raOther: scene({ t: 'RA beyond the joints', a: 'Anemia, eyes, lungs, Sjögren', hi: ['eye', 'lungs', 'heart'], beamFrom: 'lungs', steps: [
    ['Anemia, fatigue, weight loss', row([[`<circle class="f-blood" r="11" opacity=".55"/>`, 'anemia'], [bed(), 'fatigue']], 84, 1.2)],
    ['Inflamed lung and heart linings,|scleritis, vasculitis', row([[lungs(), 'pleura'], [heart(), 'pericardium'], [eye('f-bad'), 'sclera']], 84, 1)],
    ['Sjögren: dry eyes and dry mouth', row([[eye(), 'dry eyes'], [`<path class="f-mouth" d="M-14 0 Q-7 -7 0 -3 Q7 -7 14 0 Q7 8 0 8 Q-7 8 -14 0 Z"/>`, 'dry mouth']], 84, 1.2)],
  ] }),
  raLab: scene({ t: 'Blood tests for RA', a: 'RF, anti-CCP, high ESR', hi: ['hand'], steps: [
    ['Rheumatoid factor positive', at(206, 92, vial(.8, 'f-bad'), 2) + K(250, 96, 'RF +')],
    ['Anti-CCP positive: most specific.|Both can be negative early', at(206, 92, vial(.85, 'f-spleen'), 2) + K(254, 96, 'anti-CCP')],
    ['High ESR and CRP; ANA usually|negative', row([[vial(.9), 'ESR'], [vial(.9, 'f-warn'), 'CRP'], [vial(.15, 'f-immune'), 'ANA']], 84, 1)],
  ] }),
  oaRa: scene({ t: 'OA or RA?', a: 'Wear vs. autoimmune', hi: ['hand', 'handL'], steps: [
    ['OA: wear and tear, stiff under|30 min, DIP joints', fingerJ(['dip'])],
    ['RA: autoimmune, stiff over 1 hour,|MCP and PIP, both sides', fingerJ(['mcps', 'pip'])],
    ['Labs: normal in OA, inflamed|in RA', bars([[150, 24, 'good', 'OA'], [222, 86, 'bad', 'RA']])],
  ] }),
  raTx: scene({ t: 'First drug for RA', a: 'Methotrexate', hi: ['hand'], steps: [
    ['Start a DMARD early to stop|damage', at(206, 92, pill(-30, 'f-warn'), 2.4)],
    ['Methotrexate calms the immune|attack', joint(206, 96, { kind: 'ra' }) + at(170, 128, nope(12))],
    ['The joint is protected', joint(206, 96) + at(262, 64, chk())],
  ] }),
  raRx: scene({ t: 'More RA drugs', a: 'HCQ, biologics', hi: ['hand'], steps: [
    ['Hydroxychloroquine', at(206, 92, pill(-20, 'f-water'), 2.4)],
    ['Biologics like infliximab and|adalimumab block TNF', at(180, 92, syringe(-30), 1.8) + at(250, 92, `<rect class="f-bad" x="-10" y="-10" width="20" height="20" rx="4"/>` + nope(16))],
    ['NSAIDs or steroids alongside', row([[pill(-30, 'f-good'), 'NSAID'], [pill(20, 'f-warn'), 'steroid']], 84, 1.3)],
  ] }),
  jia: scene({ t: 'Arthritis in a child', a: 'Juvenile idiopathic arthritis', hi: ['knee'], steps: [
    ['Under 16, arthritis over 6 weeks', at(206, 100, kid(), 1.6) + K(256, 70, '6+ wk')],
    ['Oligoarticular: 4 or fewer joints', row([1, 2, 3, 4].map(() => [`<circle class="f-bad a-pulse" r="8"/>`, '']), 90, 1)],
    ['Polyarticular: 5 or more', row([1, 2, 3, 4, 5, 6].map(() => [`<circle class="f-bad a-pulse" r="7"/>`, '']), 90, 1)],
  ] }),
  jiaRisk: scene({ t: 'Clues to the JIA type', a: 'Fever + rash vs. uveitis', hi: ['eye'], steps: [
    ['Systemic: daily fever spikes', bars([[136, 80, 'bad', 'am'], [174, 20, 'bad', 'pm'], [212, 84, 'bad', 'am'], [250, 22, 'bad', 'pm']])],
    ['Pink rash, big liver and spleen', at(206, 96, `<rect class="f-skin" x="-30" y="-20" width="60" height="40" rx="10"/>` + [[-12, -6], [8, 4], [-2, 10], [16, -8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="var(--c-mouth)" class="a-blink"/>`).join(''))],
    ['Oligoarticular: watch the eyes|for uveitis', at(206, 92, eye('f-white'), 3) + grow(206, 92, `<circle r="12" fill="var(--c-bad)" opacity=".35"/>`, .7, 1.1)],
  ] }),
  gout: scene({ t: 'Crystals in a joint', a: 'Gout', hi: ['toe'], glow: 'bad', steps: [
    ['Too much uric acid in the blood', thick('M130 96 H282', 'blood', 14) + flow('M132 96 L280 96', 6, 2.4, crystal(30))],
    ['It forms needle crystals in the|joint', joint(206, 96, { kind: 'gout' }).split('<path class="a-pulse"')[0]],
    ['White cells attack them: red,|hot, swollen joint', joint(206, 96, { kind: 'gout' })],
  ] }),
  goutRisk: scene({ t: 'What sets off gout?', a: 'Beer, meat, diuretics', hi: ['toe'], steps: [
    ['Beer and spirits', row([[beer(), 'beer'], [`<path class="f-white" d="M-6 -14 H6 L4 14 H-4 Z"/><rect x="-5" y="2" width="10" height="10" fill="var(--c-pancreas)"/>`, 'spirits']], 84, 1.3)],
    ['Red meat, organ meat, shellfish', row([[steak(), 'red meat'], [shrimp(), 'shellfish']], 84, 1.3)],
    ['Thiazide and loop diuretics,|obesity, kidney disease', row([[pill(-30, 'f-water'), 'diuretic'], [scaleI(), 'obesity'], [kidney(), 'kidneys']], 84, 1)],
  ] }),
  podagra: scene({ t: 'The classic first gout attack', a: 'Podagra (big toe)', hi: ['toe'], glow: 'bad', steps: [
    ['It often starts at night', at(206, 92, moon(), 2.2)],
    ['The big toe joint gets red, hot,|swollen', toe(true)],
    ['Even a bed sheet hurts', toe(true) + cls('a-bob', `<path d="M140 70 Q206 60 272 70" stroke="var(--c-white, #fff)" stroke-width="4" fill="none"/>`) + cls('a-blink', at(240, 70, pain(), .8))],
  ] }),
  goutPhase: scene({ t: 'The four phases of gout', a: 'Silent, flare, quiet, chronic', hi: ['toe'], steps: [
    ['Silent high uric acid', thick('M130 96 H282', 'blood', 14) + flow('M132 96 L280 96', 4, 2.4, crystal(30))],
    ['An acute flare', toe(true)],
    ['Quiet periods that get shorter', bars([[134, 20, 'good', '1'], [174, 50, 'warn', '2'], [214, 76, 'bad', '3'], [254, 90, 'bad', '4']])],
    ['Chronic gout with tophi', toe(false) + pop(0, nodule(236, 96, 9, 'f-white')) + pop(1, nodule(206, 104, 7, 'f-white'))],
  ] }),
  tophi: scene({ t: 'Chalky lumps in chronic gout', a: 'Tophi', hi: ['toe', 'ear', 'elbow'], beamFrom: 'ear', steps: [
    ['Urate builds up in cool spots', row([[ear(), 'ears'], [`<circle class="f-skin" r="10"/>`, 'elbows'], [`<ellipse class="f-skin" rx="12" ry="8"/>`, 'toes']], 84, 1.1)],
    ['Hard white lumps form', at(206, 96, ear(), 3.4) + pop(0, nodule(214, 72, 6)) + pop(1, nodule(200, 84, 5))],
    ['Uric acid kidney stones too', at(206, 96, kidney(), 2.4) + pop(0, `<circle class="f-white" cx="206" cy="104" r="5"/>`)],
  ] }),
  goutDx: scene({ t: 'The best test for gout', a: 'Crystals in joint fluid', hi: ['toe'], steps: [
    ['Tap the joint with a needle', joint(206, 96) + at(258, 80, syringe(-150), 1.4)],
    ['Look under the microscope', at(206, 92, magn(), 2.2)],
    ['Needle urate crystals = gout.|They form above 6.8 mg/dL', at(206, 96, `<circle r="40" fill="var(--c-white, #fff)" stroke="var(--art-line)"/>` + [[-14, -10, 30], [10, 6, -40], [-4, 16, 70], [16, -14, 10], [-20, 8, -20]].map(([x, y, r], i) => pop(i, at(x, y, crystal(r)))).join(''))],
  ] }),
  goutAcute: scene({ t: 'Stopping a gout flare', a: 'NSAIDs, colchicine, steroids', hi: ['toe'], steps: [
    ['High-dose NSAIDs', at(206, 92, pill(-30, 'f-good'), 2.4)],
    ['Colchicine', at(206, 92, pill(20, 'f-spleen'), 2.4)],
    ['Steroids by mouth or into|the joint', at(180, 92, pill(-20, 'f-warn'), 2) + at(246, 92, syringe(-30), 1.6)],
  ] }),
  goutLong: scene({ t: 'Lowering uric acid for good', a: 'Allopurinol, probenecid', hi: ['kidney'], beamFrom: 'kidney', steps: [
    ['Allopurinol: the body makes|less uric acid', at(170, 96, `<rect class="f-liver" x="-24" y="-16" width="48" height="32" rx="12"/>`) + flow('M196 96 L282 96', 2, 2.4, crystal(20)) + at(240, 70, nope(10))],
    ['Probenecid: kidneys pee out more', at(206, 92, kidney(), 2.2) + flow('M206 112 L206 146', 4, 1.6, crystal(80))],
    ['Pegloticase breaks it down.|Goal: under 6 mg/dL', BIG('< 6', 30) + K(206, 124, 'mg/dL')],
  ] }),
  goutStart: scene({ t: 'Starting allopurinol safely', a: 'Add colchicine, fluids', hi: ['toe'], steps: [
    ['Dropping uric acid can trigger|a flare', toe(true)],
    ['Give colchicine with it', row([[pill(-30, 'f-white'), 'allopurinol'], [pill(20, 'f-spleen'), 'colchicine']], 84, 1.3)],
    ['Drink 2+ liters a day to prevent|kidney stones', at(206, 92, `<path class="f-white" d="M-12 -20 H12 L9 20 H-9 Z"/><path d="M-10 -6 H10 L8 18 H-8 Z" fill="var(--c-water)"/>`, 1.6) + cls('a-drop', at(206, 60, dot('f-water', 3)))],
  ] }),
  as: scene({ t: 'Spine that fuses from the bottom up', a: 'Ankylosing spondylitis', hi: ['sij', 'spine'], o: { spine: 'fused' }, steps: [
    ['Inflammation starts at the|sacroiliac joints', at(206, 96, `<path class="f-bone" d="M-40 -20 Q-20 -40 0 -20 L0 30 Q-20 34 -36 20 Z M40 -20 Q20 -40 0 -20 L0 30 Q20 34 36 20 Z"/>`) + ring(196, 86, 10, 'bad') + ring(216, 86, 10, 'bad')],
    ['It climbs up the spine', spine(190, 96) + cls('a-rise', `<path d="M160 136 V60" stroke="var(--c-bad)" stroke-width="3"/>`)],
    ['Joints fuse into a stiff|"bamboo spine"', bamboo()],
  ] }),
  asWho: scene({ t: 'Who gets ankylosing spondylitis?', a: 'HLA-B27, young men', hi: ['sij'], steps: [
    ['People with the HLA-B27 gene', at(206, 92, gene(), 2.2) + K(250, 96, 'B27')],
    ['Mostly men, ages 20-40', at(206, 100, person(), 1.4) + K(256, 70, '20-40')],
    ['Linked to psoriasis and IBD;|uveitis and kyphosis follow', row([[`<rect class="f-skin" x="-12" y="-10" width="24" height="20" rx="4"/><ellipse cx="0" cy="0" rx="7" ry="5" fill="var(--c-bad)" opacity=".7"/>`, 'psoriasis'], [eye('f-bad'), 'uveitis'], [posture(0, 14, 'kyph', .5), 'kyphosis']], 84, 1)],
  ] }),
  inflBack: scene({ t: 'Inflammatory or mechanical back pain?', a: 'Exercise helps vs. rest helps', hi: ['lowback'], steps: [
    ['Inflammatory (AS): starts before|40, slowly', at(206, 100, person(), 1.3) + K(256, 70, '<40')],
    ['Better with exercise, worse with|rest, pain at night', row([[runner('f-good'), 'better'], [bed(), 'worse']], 88, 1)],
    ['Mechanical: better with rest,|worse with use', row([[bed(), 'better'], [`<rect class="f-food" x="-10" y="-8" width="20" height="16" rx="2"/>`, 'worse']], 84, 1.2)],
  ] }),
  asTx: scene({ t: 'Treating ankylosing spondylitis', a: 'NSAIDs, then TNF blockers', hi: ['spine'], steps: [
    ['NSAIDs first', at(206, 92, pill(-30, 'f-good'), 2.4)],
    ['TNF inhibitors if needed', at(206, 92, syringe(-30), 2)],
    ['PT and stretching keep the spine|moving; stop smoking', cls('a-sway', posture(206, 112, 'normal', 1.2))],
  ] }),
  md: scene({ t: 'Inherited muscle wasting', a: 'Muscular dystrophy', hi: ['thigh', 'calf'], o: { muscle: true }, steps: [
    ['A faulty dystrophin gene', at(206, 92, gene(), 2.2)],
    ['Without dystrophin the fiber|membrane tears and breaks down', at(206, 96, `<rect class="f-muscle" x="-60" y="-14" width="120" height="28" rx="14"/>`) + [0, 1, 2].map(i => cls('a-blink', `<path d="M${180 + i * 24} 82 l4 8 l-4 6" stroke="var(--surface)" stroke-width="2.6" fill="none"/>`, `animation-delay:${i * .3}s`)).join('')],
    ['Fat and scar replace muscle', at(206, 96, `<rect class="f-muscle" x="-60" y="-14" width="120" height="28" rx="14"/>`) + [0, 1, 2, 3].map(i => pop(i, `<circle class="f-fat" cx="${170 + i * 24}" cy="96" r="9"/>`)).join('')],
  ] }),
  duch: scene({ t: 'The most common severe dystrophy', a: 'Duchenne', hi: ['calf', 'heart', 'lungs'], o: { muscle: true }, beamFrom: 'calf', steps: [
    ['X-linked recessive: boys', at(206, 100, kid('f-water'), 1.6) + K(254, 70, 'X')],
    ['Weakness spreads from hips and|legs; big calves', at(206, 96, `<ellipse class="f-muscle a-pulse" rx="18" ry="34"/>`)],
    ['Heart and breathing failure|can be fatal', row([[heart(), 'heart'], [lungs(), 'lungs']], 84, 1.3)],
  ] }),
  gowers: scene({ t: 'Climbing up his own legs', a: 'Gowers sign', hi: ['hips', 'thigh'], o: { muscle: true }, steps: [
    ['Weak hip and thigh muscles', at(206, 96, `<ellipse class="f-muscle" rx="22" ry="40" opacity=".5"/>`) + at(206, 96, nope(16))],
    ['To stand, the child walks his|hands up his legs', gowersSeq()],
    ['Also big calves and frequent|falls', at(206, 96, `<ellipse class="f-muscle a-pulse" rx="16" ry="30"/>`) + cls('a-sway', at(250, 110, kid(), .8))],
  ] }),
  mdDx: scene({ t: 'Diagnosing and treating MD', a: 'High CK; no cure', hi: ['thigh'], o: { muscle: true }, steps: [
    ['Very high creatine kinase', at(206, 92, vial(.95, 'f-muscle'), 2) + K(250, 96, 'CK')],
    ['Muscle biopsy and genetic tests', row([[needle(), 'biopsy'], [gene(), 'genes']], 84, 1.3)],
    ['No cure: steroids, PT, braces,|support', row([[pill(-30, 'f-warn'), 'steroids'], [dumbbell(), 'PT'], [splint(), 'braces']], 84, 1)],
  ] }),
  fibro: scene({ t: 'Pain everywhere, no damage', a: 'Fibromyalgia', hi: ['shoulder', 'shoulderL', 'lowback', 'thigh', 'thighL'], beamFrom: 'shoulder', o: { muscle: true }, steps: [
    ['Widespread aching muscles', bodyMap(8)],
    ['No inflammation, no joint damage', joint(206, 96) + at(262, 64, chk())],
    ['The nerves turn pain signals up:|a lower pain threshold', thick('M140 110 H200', 'nerve', 4) + at(206, 92, brain(), 1.6) + flow('M140 110 L196 96', 4, 1.4, dot('f-bad', 3)) + cls('a-pulse', at(250, 80, `<path d="M-12 10 V-10 M0 10 V-16 M12 10 V-22" stroke="var(--c-bad)" stroke-width="4"/>`))],
  ] }),
  fibroSx: scene({ t: 'What fibromyalgia feels like', a: 'Ache, fatigue, bad sleep', hi: ['body'], beamFrom: 'chest', steps: [
    ['A constant dull ache', bodyMap(6)],
    ['Fatigue and unrefreshing sleep', row([[bed(), 'poor sleep'], [moon(), 'tired']], 84, 1.3)],
    ['Brain fog, IBS, headaches,|depression', row([[brain(), 'fog'], [`<path d="M-14 0 Q-7 -10 0 0 T14 0" stroke="var(--c-small)" stroke-width="6" fill="none"/>`, 'IBS'], [burst(10, 'f-warn'), 'headache']], 84, 1)],
  ] }),
  fibroDx: scene({ t: 'Diagnosing fibromyalgia', a: '4+ regions, 3+ months', hi: ['body'], beamFrom: 'chest', steps: [
    ['Pain in at least 4 body regions', bodyMap(4)],
    ['For at least 3 months', at(206, 92, cal(), 2) + K(250, 96, '3 mo')],
    ['Labs are normal; they rule out|other causes', row([[vial(.3), 'ESR'], [vial(.4, 'f-immune'), 'CBC']], 84, 1.2) + at(256, 70, chk())],
  ] }),
  fibroTx: scene({ t: 'Treating fibromyalgia', a: 'Exercise, duloxetine', hi: ['body'], beamFrom: 'chest', steps: [
    ['Exercise, sleep, stress care', row([[runner('f-good'), 'exercise'], [bed(), 'sleep']], 88, 1)],
    ['Duloxetine, amitriptyline,|pregabalin, gabapentin', row([[pill(-30, 'f-water'), 'duloxetine'], [pill(10, 'f-spleen'), 'pregabalin']], 84, 1.3)],
    ['NSAIDs don\'t help', at(206, 92, pill(-30, 'f-good'), 2.2) + at(206, 92, nope(26))],
  ] }),
  statin: scene({ t: 'Achy muscles on a cholesterol pill', a: 'Statin myopathy', hi: ['thigh', 'thighL', 'arm'], o: { muscle: true }, beamFrom: 'thigh', steps: [
    ['Weeks to months after starting|a statin', at(180, 92, pill(-30, 'f-pancreas'), 2) + at(246, 92, cal())],
    ['Thighs and upper arms ache or|feel weak, both sides', at(206, 96, `<ellipse class="f-muscle a-pulse" cx="-20" rx="14" ry="34"/><ellipse class="f-muscle a-pulse" cx="20" rx="14" ry="34"/>`)],
    ['Stop the statin; it clears in|days to weeks', at(206, 92, pill(-30, 'f-pancreas'), 2) + at(206, 92, nope(24))],
  ] }),
  rhabdo: scene({ t: 'Muscle breakdown: 3 signs', a: 'Rhabdomyolysis', hi: ['thigh', 'kidney'], o: { muscle: true }, glow: 'bad', steps: [
    ['Crush, extreme exercise, heat,|or long immobility', row([[cls('a-shake', burst(12, 'f-warn')), 'crush'], [runner(), 'overdo'], [sun(), 'heat']], 84, 1)],
    ['Muscle cells burst and spill|into the blood', at(206, 96, `<rect class="f-muscle" x="-60" y="-14" width="120" height="28" rx="14"/>`) + flow('M206 96 L250 56', 5, 1.6, dot('f-stool', 3))],
    ['Pain, weakness, dark tea urine.|CK 5x normal or more', urine('stool')],
  ] }),
  rhabdoLab: scene({ t: 'Dangers of rhabdomyolysis', a: 'Kidney injury, high K', hi: ['kidney', 'heart'], glow: 'bad', steps: [
    ['Myoglobin clogs the kidneys', at(206, 92, kidney(), 2.4) + flow('M140 92 L196 92', 5, 1.6, dot('f-stool', 3))],
    ['High potassium: heart rhythm|danger', at(206, 92, heartEKG(), 2.6) + K(206, 124, 'K+')],
    ['Compartment syndrome, rarely|DIC', at(206, 96, `<rect x="-60" y="-24" width="120" height="48" rx="22" fill="var(--c-muscle)" opacity=".75" stroke="var(--art-line)"/>`) + `<rect class="a-pulse" x="142" y="68" width="128" height="56" rx="26" fill="none" stroke="#fff" stroke-width="4"/>`],
  ] }),
  osteosarc: scene({ t: 'Most common primary bone cancer', a: 'Osteosarcoma', hi: ['knee', 'femur'], steps: [
    ['Kids and young adults (and again|after 65)', row([[kid(), 'teens'], [elder(), '65+']], 92, .9)],
    ['Grows near the knee: femur,|tibia, or humerus', tumorBone(206, 'end')],
    ['Pain that keeps getting worse,|swelling', tumorBone(206, 'end') + cls('a-blink', at(262, 60, pain(), .8))],
  ] }),
  chondroma: scene({ t: 'Two cartilage tumors', a: 'Osteochondroma vs. chondrosarcoma', hi: ['knee'], steps: [
    ['Osteochondroma: benign bony|bump near a joint, ages 10-20', bone(206, 104, 140) + pop(0, `<path class="f-bone" d="M246 96 L254 70 Q262 62 268 72 L258 96 Z"/>`)],
    ['Usually painless', bone(206, 104, 140) + `<path class="f-bone" d="M246 96 L254 70 Q262 62 268 72 L258 96 Z"/>` + at(206, 64, chk())],
    ['Chondrosarcoma: slow cartilage|cancer in older adults', tumorBone(206, 'end', 'f-mucus') + at(160, 64, elder(), .7)],
  ] }),
  ewing: scene({ t: 'Aggressive bone tumor with fever', a: 'Ewing sarcoma', hi: ['femur', 'pelvis'], steps: [
    ['Ages 10-20, in a growth spurt', at(206, 100, kid('f-good'), 1.6)],
    ['Pain and a mass', tumorBone(206)],
    ['Fever and malaise; spreads|within a year', row([[thermo(), 'fever'], [bed(), 'malaise'], [lungs(), 'spread']], 84, 1)],
  ] }),
  giant: scene({ t: 'A bone tumor that favors women', a: 'Giant cell tumor', hi: ['knee'], steps: [
    ['Usually benign', tumorBone(206, 'end', 'f-spleen')],
    ['Ages 20-40', at(206, 100, person({ c: 'f-mouth' }), 1.4) + K(256, 70, '20-40')],
    ['More common in women; most|bone tumors favor men', bars([[150, 80, 'mouth', 'women'], [222, 40, 'water', 'men']])],
  ] }),
  boneMets: scene({ t: 'Cancers that spread to bone', a: 'Breast, lung, prostate', hi: ['spine', 'pelvis', 'femur'], beamFrom: 'spine', steps: [
    ['Breast, lung, and prostate', row([[`<circle class="f-mouth" r="11"/>`, 'breast'], [lungs(), 'lung'], [`<circle class="f-water" r="9"/>`, 'prostate']], 84, 1)],
    ['Cells travel in the blood to|the spine, pelvis, and femur', thick('M130 96 H282', 'blood', 12) + flow('M132 96 L280 96', 5, 2, dot('f-tumor', 3.6))],
    ['Spread tumors are far more common|than ones that start in bone', spine(190, 96) + grow(186, 70, `<circle class="f-tumor" r="8"/>`, .5, 1.1) + grow(186, 122, `<circle class="f-tumor" r="7"/>`, .5, 1.1)],
  ] }),
  rhabdoSarc: scene({ t: 'Cancer of skeletal muscle', a: 'Rhabdomyosarcoma', hi: ['skull', 'thigh'], o: { muscle: true }, beamFrom: 'thigh', steps: [
    ['Children and teens', at(206, 100, kid(), 1.6)],
    ['Head and neck, GU tract, or|limbs', at(206, 96, `<rect class="f-muscle" x="-60" y="-14" width="120" height="28" rx="14"/>`) + grow(206, 96, `<circle class="f-tumor" r="14"/>`, .5, 1.1)],
    ['Spreads fast', at(206, 96, `<circle class="f-tumor" r="12"/>`) + flow('M206 96 L140 56', 3, 1.6, dot('f-tumor', 4)) + flow('M206 96 L272 56', 3, 1.6, dot('f-tumor', 4)) + flow('M206 96 L206 146', 3, 1.6, dot('f-tumor', 4))],
  ] }),
});
})();
