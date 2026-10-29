/* Chapter 9 Part 6 art (a): colorful replacements for PICS, loaded after the page sets PICS.
   GI cancers. Layouts follow ACS / NCI / Cancer Research UK / Johns Hopkins style diagrams. */
(() => {
  /* ---------- small drawing helpers (local to this file) ---------- */
  const tw = (t, size = 10.5) => String(t).length * size * 0.56 + 10;
  const ltag = (x, y, t, cls = '', size = 10.5) => tag(x + tw(t, size) / 2, y, t, cls, size);
  const lqtag = (x, y, t, size = 10.5) => q(x + tw(t, size) / 2, y) + tag(x + tw(t, size) / 2, y, t, 'ans', size);
  const atag = (x, y, t, size = 10.5) => tag(x, y, t, 'ans', size);
  // outlined colored tube along a path (like the canal diagram)
  const tube = (d, color, w) => `<path class="s-line" d="${d}" stroke-width="${w + 3}"/><path d="${d}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const dash = (d, extra = '') => `<path class="s-ink" d="${d}" stroke-width="1" stroke-dasharray="2 3" ${extra}/>`;

  // organs drawn in a fixed "nominal" box, then moved/scaled
  const STOM = 'M128 40 C128 24 170 16 188 34 C208 54 206 112 182 132 C160 150 116 148 96 134 L84 128 L87 112 L100 117 C118 125 140 118 146 100 C152 84 144 62 144 44 Z';
  const RUGAE = 'M160 50 C176 66 176 96 162 114 M150 70 C160 86 156 106 140 124 M176 46 C192 70 190 104 176 124';
  const stomach = (cx, cy, s, inner = '') => `<g transform="translate(${cx - 145 * s} ${cy - 83 * s}) scale(${s})"><path class="f-stomach" vector-effect="non-scaling-stroke" d="${STOM}"/><path d="${RUGAE}" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>${inner}</g>`;
  const LIV = 'M8 30 C4 8 40 0 86 2 C126 4 156 12 168 22 C160 32 136 40 112 48 C92 58 72 74 46 76 C22 76 10 56 8 30 Z';
  const liver = (cx, cy, s, inner = '') => `<g transform="translate(${cx - 86 * s} ${cy - 38 * s}) scale(${s})"><path class="f-liver" vector-effect="non-scaling-stroke" d="${LIV}"/><path d="M100 6 C106 22 104 36 100 46" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="2"/>${inner}</g>`;
  const PANC = 'M10 26 C4 12 18 2 32 6 C52 12 84 8 108 2 C122 -2 132 4 126 12 C120 18 100 20 82 24 C64 28 50 30 44 38 C38 46 20 46 14 40 C10 36 10 30 10 26 Z';
  const pancreas = (cx, cy, s, inner = '') => `<g transform="translate(${cx - 69 * s} ${cy - 22 * s}) scale(${s})"><path class="f-pancreas" vector-effect="non-scaling-stroke" d="${PANC}"/><path d="M122 7 C100 14 70 16 48 22 C36 26 28 30 24 34" fill="none" stroke="#c99a1a" stroke-width="1.6" stroke-opacity=".7"/>${inner}</g>`;
  // large intestine as a frame (ascending on the viewer's left, like textbook front views)
  const colon = (x0, y0, x1, y1, w = 12) => {
    const mid = (x0 + x1) / 2 + 8;
    const d = `M${x0} ${y1} L${x0} ${y0 + 10} Q${x0} ${y0} ${x0 + 10} ${y0} L${x1 - 10} ${y0} Q${x1} ${y0} ${x1} ${y0 + 10} L${x1} ${y1 - 16} Q${x1} ${y1} ${x1 - 16} ${y1} L${mid + 10} ${y1} Q${mid} ${y1} ${mid} ${y1 + 10} L${mid} ${y1 + 18}`;
    let ticks = '';
    for (let y = y0 + 16; y < y1 - 4; y += 13) ticks += `M${x0 - w / 2} ${y} h${w} M${x1 - w / 2} ${y} h${w} `;
    for (let x = x0 + 16; x < x1 - 8; x += 15) ticks += `M${x} ${y0 - w / 2} v${w} `;
    return tube(d, 'var(--c-large)', w) + `<path class="s-line" d="${ticks}" stroke-width="1.2" opacity=".45"/>` +
      `<circle class="f-large" cx="${x0}" cy="${y1 + 2}" r="${w * 0.62}"/><path class="s-line" d="M${x0 + 2} ${y1 + 2 + w * 0.6} q2 5 -2 8" stroke-width="2.4"/>`;
  };
  // open mouth, front view, centered at 0,0 then moved/scaled
  const mouth = (cx, cy, s, inner = '') => `<g transform="translate(${cx} ${cy}) scale(${s})">` +
    `<ellipse class="f-mouth" cx="0" cy="0" rx="46" ry="30"/>` +
    `<ellipse cx="0" cy="1" rx="36" ry="20" fill="#5b1a2e" stroke="var(--art-line)" stroke-width="1.5"/>` +
    `<path d="M-22 15 C-24 -4 24 -4 22 15 Z" fill="#ff6f91" stroke="var(--art-line)" stroke-width="1.5"/><path d="M0 2 L0 12" stroke="#c94a6a" stroke-width="1.5"/>` +
    `<path class="f-white" d="M-29 -12 Q0 -27 29 -12 Q0 -17 -29 -12 Z"/><path class="f-white" d="M-27 15 Q0 27 27 15 Q0 19 -27 15 Z"/>` +
    `<path class="s-line" d="M-18 -16 v3 M-9 -18.5 v3.5 M0 -19.5 v3.5 M9 -18.5 v3.5 M18 -16 v3 M-15 18 v3 M-5 19.5 v3 M5 19.5 v3 M15 18 v3" stroke-width=".8"/>` +
    `${inner}</g>`;

  // tumor: a lumpy plum blob
  const blob = (x, y, r, cls = 'f-tumor', extra = '') => {
    const pts = [[0, 0, 1], [-0.55, -0.35, 0.62], [0.5, -0.45, 0.6], [0.6, 0.35, 0.6], [-0.45, 0.5, 0.6], [0, -0.7, 0.5]];
    const c = k => pts.map(([dx, dy, s]) => `<circle cx="${x + dx * r}" cy="${y + dy * r}" r="${s * r * k}" class="${cls}${k < 1 ? ' noline' : ''}"/>`).join('');
    return `<g ${extra}>${c(1)}${c(0.84)}<circle cx="${x - r * 0.3}" cy="${y - r * 0.25}" r="${r * 0.22}" fill="#9b4a6c"/><circle cx="${x + r * 0.35}" cy="${y + r * 0.2}" r="${r * 0.16}" fill="#9b4a6c"/></g>`;
  };

  /* ---------- little icons, centered on x,y (about 20-26 px) ---------- */
  const cig = (x, y) => `<g><rect class="f-white" x="${x - 13}" y="${y - 2.5}" width="26" height="5" rx="1.5"/><rect class="f-warn" x="${x - 13}" y="${y - 2.5}" width="8" height="5" rx="1.5"/><circle class="f-bad" cx="${x + 13}" cy="${y}" r="2.6"/>` +
    `<g class="a-rise"><path class="s-scar" d="M${x + 14} ${y - 5} q-4 -4 0 -8 q4 -4 0 -8" stroke-width="2"/></g></g>`;
  const glass = (x, y) => `<g><path class="f-white" d="M${x - 8} ${y - 12} L${x + 8} ${y - 12} Q${x + 9} ${y + 2} ${x} ${y + 3} Q${x - 9} ${y + 2} ${x - 8} ${y - 12} Z"/>` +
    `<path d="M${x - 8.4} ${y - 5} L${x + 8.4} ${y - 5} Q${x + 8} ${y + 2} ${x} ${y + 3} Q${x - 8} ${y + 2} ${x - 8.4} ${y - 5} Z" fill="#a4133c"/>` +
    `<path class="s-line" d="M${x} ${y + 3} L${x} ${y + 10} M${x - 6} ${y + 11} L${x + 6} ${y + 11}" stroke-width="2"/></g>`;
  const virus = (x, y, r = 8, txt = '') => {
    let sp = '';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
      sp += `<path class="s-line" d="M${x + c * r} ${y + s * r} L${x + c * (r + 3.5)} ${y + s * (r + 3.5)}" stroke-width="1.5"/><circle class="f-germ" cx="${x + c * (r + 4.5)}" cy="${y + s * (r + 4.5)}" r="1.9"/>`;
    }
    return `<g class="a-spin">${sp}<circle class="f-germ" cx="${x}" cy="${y}" r="${r}"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .25}" fill="#c9a6ff"/></g>` +
      (txt ? `<text x="${x}" y="${y + 3.4}" text-anchor="middle" class="on" style="font-size:9.5px">${txt}</text>` : '');
  };
  const sun = (x, y) => {
    let rays = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `M${x + Math.cos(a) * 8} ${y + Math.sin(a) * 8} L${x + Math.cos(a) * 12} ${y + Math.sin(a) * 12} `; }
    return `<g class="a-spin"><path class="s-warn" d="${rays}" stroke-width="2.5"/><circle class="f-nerve" cx="${x}" cy="${y}" r="6.5"/></g>`;
  };
  const nut = (x, y) => `<g><path class="f-good" d="M${x + 2} ${y - 6} C${x + 8} ${y - 16} ${x + 18} ${y - 14} ${x + 16} ${y - 10} C${x + 12} ${y - 6} ${x + 6} ${y - 6} ${x + 2} ${y - 6} Z"/>` +
    `<ellipse class="f-food" cx="${x}" cy="${y + 2}" rx="10" ry="8"/><path d="M${x - 6} ${y + 1} C${x - 2} ${y - 3} ${x + 3} ${y + 6} ${x + 7} ${y + 2}" fill="none" stroke="#7a4a2a" stroke-width="1.5"/></g>`;
  const brush = (x, y) => `<g transform="rotate(-25 ${x} ${y})"><rect class="f-immune" x="${x - 15}" y="${y - 2.5}" width="24" height="5" rx="2.5"/><rect class="f-white" x="${x + 7}" y="${y - 3.5}" width="10" height="4" rx="1"/>` +
    `<path class="s-line" d="M${x + 8.5} ${y - 4} v-5 M${x + 11.5} ${y - 4} v-5 M${x + 14.5} ${y - 4} v-5" stroke-width="1.6"/></g>`;
  const rbc = (x, y, pale = false, s = 1) => `<g><ellipse cx="${x}" cy="${y}" rx="${10 * s}" ry="${7 * s}" fill="${pale ? '#ffc8d2' : '#e63946'}" stroke="var(--art-line)" stroke-width="1.5"/><ellipse cx="${x}" cy="${y}" rx="${4.5 * s}" ry="${2.8 * s}" fill="${pale ? '#ffe3e8' : '#ff7b86'}"/></g>`;
  const scale = (x, y) => `<g><rect class="f-white" x="${x - 11}" y="${y - 9}" width="22" height="18" rx="4"/><path d="M${x - 6} ${y - 1} A6 6 0 0 1 ${x + 6} ${y - 1} Z" fill="#dff6ff" stroke="var(--art-line)" stroke-width="1"/>` +
    `<g class="a-sway"><path class="s-bad" d="M${x} ${y - 1} L${x} ${y - 6}" stroke-width="1.8"/></g><path class="s-good" d="M${x - 5} ${y + 5} h10" stroke-width="2"/></g>`;
  const bolt = (x, y, s = 1) => `<path class="f-nerve" d="M${x + 2 * s} ${y - 10 * s} L${x - 6 * s} ${y + 1 * s} L${x - 0.5 * s} ${y + 1 * s} L${x - 3 * s} ${y + 10 * s} L${x + 6 * s} ${y - 2 * s} L${x + 0.5 * s} ${y - 2 * s} Z"/>`;
  const drop = (x, y, fill = 'var(--c-blood)', s = 1) => `<path d="M${x} ${y - 7 * s} C${x + 5 * s} ${y - 1 * s} ${x + 5 * s} ${y + 5 * s} ${x} ${y + 5 * s} C${x - 5 * s} ${y + 5 * s} ${x - 5 * s} ${y - 1 * s} ${x} ${y - 7 * s} Z" fill="${fill}" stroke="var(--art-line)" stroke-width="1.2"/>`;
  const poo = (x, y, fill = 'var(--c-stool)') => `<path d="M${x - 10} ${y + 6} C${x - 12} ${y + 1} ${x - 7} ${y - 1} ${x - 5} ${y} C${x - 7} ${y - 5} ${x - 2} ${y - 8} ${x} ${y - 6} C${x} ${y - 10} ${x + 5} ${y - 9} ${x + 4} ${y - 4} C${x + 8} ${y - 4} ${x + 10} ${y} ${x + 7} ${y + 1} C${x + 12} ${y + 2} ${x + 11} ${y + 7} ${x + 7} ${y + 7} Z" fill="${fill}" stroke="var(--art-line)" stroke-width="1.2"/>`;
  const person = (x, y, fill = '#ffffff', extra = '') => `<g ${extra}><circle cx="${x}" cy="${y - 7}" r="3.3" fill="${fill}" stroke="var(--art-line)" stroke-width="1.1"/><path d="M${x - 4.6} ${y + 8} L${x - 4.6} ${y} Q${x} ${y - 4} ${x + 4.6} ${y} L${x + 4.6} ${y + 8} Z" fill="${fill}" stroke="var(--art-line)" stroke-width="1.1"/></g>`;
  const syringe = (x, y, rot = 0) => `<g transform="rotate(${rot} ${x} ${y})"><rect class="f-white" x="${x - 12}" y="${y - 3.5}" width="18" height="7" rx="1.5"/><rect x="${x - 9}" y="${y - 2}" width="10" height="4" fill="#9be1ff"/>` +
    `<path class="s-line" d="M${x - 12} ${y} h-5 M${x - 17} ${y - 4} v8 M${x + 6} ${y} h10" stroke-width="1.5"/></g>`;
  const steak = (x, y) => `<g><path class="f-bad" d="M${x - 11} ${y - 2} C${x - 12} ${y - 9} ${x - 2} ${y - 11} ${x + 4} ${y - 8} C${x + 12} ${y - 5} ${x + 13} ${y + 4} ${x + 6} ${y + 7} C${x} ${y + 10} ${x - 10} ${y + 6} ${x - 11} ${y - 2} Z"/><path d="M${x - 6} ${y - 3} C${x - 2} ${y - 6} ${x + 3} ${y - 1} ${x + 6} ${y + 2}" fill="none" stroke="#ffe8a3" stroke-width="2.4" stroke-linecap="round"/></g>`;
  const sausage = (x, y) => `<g><rect x="${x - 13}" y="${y - 5}" width="26" height="10" rx="5" fill="#b5543c" stroke="var(--art-line)" stroke-width="1.5"/><path d="M${x - 6} ${y - 1} h3 M${x + 1} ${y + 1} h3 M${x + 6} ${y - 2} h2" stroke="#ffe8a3" stroke-width="1.5" stroke-linecap="round"/></g>`;
  const broccoli = (x, y) => `<g><path class="f-good" d="M${x - 2} ${y + 9} L${x - 1} ${y} L${x + 3} ${y} L${x + 3} ${y + 9} Z"/><circle class="f-good" cx="${x - 5}" cy="${y - 2}" r="5"/><circle class="f-good" cx="${x + 6}" cy="${y - 2}" r="5"/><circle class="f-good" cx="${x + 1}" cy="${y - 6}" r="5.5"/></g>`;
  const downArrow = (x, y) => `<path class="s-bad" d="M${x} ${y - 6} L${x} ${y + 6} M${x - 4} ${y + 2} L${x} ${y + 6} L${x + 4} ${y + 2}" stroke-width="2.2"/>`;
  const couch = (x, y) => `<g><rect class="f-spleen" x="${x - 13}" y="${y - 7}" width="26" height="9" rx="3"/><rect class="f-spleen" x="${x - 15}" y="${y - 1}" width="30" height="7" rx="3"/><path class="s-line" d="M${x - 12} ${y + 6} v3 M${x + 12} ${y + 6} v3" stroke-width="2"/></g>`;
  const belly = (x, y) => `<g><circle class="f-skin" cx="${x}" cy="${y - 9}" r="4"/><ellipse class="f-skin" cx="${x}" cy="${y + 3}" rx="9" ry="8"/><path class="s-warn" d="M${x - 9} ${y + 3} Q${x} ${y + 7} ${x + 9} ${y + 3}" stroke-width="2"/></g>`;
  const hourglass = (x, y) => `<g class="a-sway"><path class="f-bone" d="M${x - 7} ${y - 10} h14 L${x + 1.5} ${y} L${x + 7} ${y + 10} h-14 L${x - 1.5} ${y} Z"/><path d="M${x - 4} ${y + 9} L${x} ${y + 4} L${x + 4} ${y + 9} Z" fill="#c68b59"/></g>`;
  const ribbon = (x, y, fill) => `<path d="M${x} ${y - 2} C${x - 9} ${y - 10} ${x - 4} ${y - 15} ${x} ${y - 13} C${x + 4} ${y - 15} ${x + 9} ${y - 10} ${x} ${y - 2} L${x + 7} ${y + 10} L${x + 3} ${y + 11} L${x} ${y + 3} L${x - 3} ${y + 11} L${x - 7} ${y + 10} Z" fill="${fill}" stroke="var(--art-line)" stroke-width="1.2"/>`;
  const lungs = (x, y) => `<g><path class="s-line" d="M${x} ${y - 11} v6 M${x} ${y - 5} l-3 4 M${x} ${y - 5} l3 4" stroke-width="2"/><path class="f-mouth" d="M${x - 3} ${y - 4} C${x - 12} ${y - 4} ${x - 13} ${y + 8} ${x - 11} ${y + 11} C${x - 7} ${y + 12} ${x - 3} ${y + 9} ${x - 3} ${y - 4} Z"/><path class="f-mouth" d="M${x + 3} ${y - 4} C${x + 12} ${y - 4} ${x + 13} ${y + 8} ${x + 11} ${y + 11} C${x + 7} ${y + 12} ${x + 3} ${y + 9} ${x + 3} ${y - 4} Z"/></g>`;
  const snow = (x, y, r = 6) => `<path d="M${x - r} ${y} h${2 * r} M${x - r / 2} ${y - r * .87} l${r} ${r * 1.73} M${x + r / 2} ${y - r * .87} l${-r} ${r * 1.73}" stroke="#4cc9f0" stroke-width="2" stroke-linecap="round"/>`;
  const noSign = (x, y, d = 0) => `<g class="a-pop" style="--d:${d}"><circle cx="${x}" cy="${y}" r="11" fill="none" stroke="var(--c-bad)" stroke-width="2.5"/><path d="M${x - 7.5} ${y + 7.5} L${x + 7.5} ${y - 7.5}" stroke="var(--c-bad)" stroke-width="2.5"/></g>`;

  Object.assign(PICS, {
    /* 1. Oral cancer risks: open mouth ringed by the six risks */
    oralRisk: ART(`
      <g class="ans"><path class="s-bad a-flow" d="M62 32 Q150 66 238 32" stroke-width="2"/></g>
      ${mouth(150, 98, 1.05)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${cig(40, 30)}</g><g class="a-pop" style="--d:1">${glass(260, 28)}</g>
        <g class="a-pop" style="--d:2">${nut(38, 86)}</g><g class="a-pop" style="--d:3">${virus(260, 86, 8)}</g>
        <g class="a-pop" style="--d:4">${brush(40, 144)}</g><g class="a-pop" style="--d:5">${sun(260, 140)}</g>
      </g>
      ${qtag(44, 52, 'Tobacco ~75%', 10)}${qtag(256, 52, 'Alcohol', 10)}
      ${qtag(44, 110, 'Areca nut', 10)}${qtag(256, 110, 'HPV', 10)}
      ${qtag(44, 166, 'Poor hygiene', 10)}${qtag(256, 166, 'Sun on lips', 10)}
      ${qtag(150, 22, 'Both together: up to 100x', 10)}${qtag(150, 154, 'Men 2x more likely', 10)}`),

    /* 2. Leukoplakia (white) vs erythroplakia (red) on the side of the tongue */
    plakia: ART(`
      ${[75, 225].map(cx => `<ellipse class="f-mouth" cx="${cx}" cy="34" rx="44" ry="24"/><ellipse cx="${cx}" cy="36" rx="34" ry="15" fill="#5b1a2e" stroke="var(--art-line)" stroke-width="1.5"/>` +
        `<path class="f-white" d="M${cx - 27} 27 Q${cx} 15 ${cx + 27} 27 Q${cx} 22 ${cx - 27} 27 Z"/>` +
        `<path d="M${cx - 25} 38 C${cx - 30} 74 ${cx - 20} 106 ${cx} 106 C${cx + 20} 106 ${cx + 30} 74 ${cx + 25} 38 Z" fill="#ff7096" stroke="var(--art-line)" stroke-width="1.5"/>` +
        `<path d="M${cx} 44 L${cx} 92" stroke="#c94a6a" stroke-width="1.6" stroke-linecap="round"/>`).join('')}
      <path transform="translate(58 72) scale(1.5) translate(-58 -72)" d="M53 62 C60 56 68 60 66 68 C70 74 64 84 58 82 C52 86 48 76 51 71 C47 67 49 62 53 62 Z" fill="none" stroke="var(--pic-ink)" stroke-width="1.3" stroke-dasharray="3 2"/>
      <path transform="translate(208 72) scale(1.5) translate(-208 -72)" d="M203 62 C210 56 218 60 216 68 C220 74 214 84 208 82 C202 86 198 76 201 71 C197 67 199 62 203 62 Z" fill="none" stroke="var(--pic-ink)" stroke-width="1.3" stroke-dasharray="3 2"/>
      <g class="ans">
        <g transform="translate(58 72) scale(1.5) translate(-58 -72)"><g class="a-pulse"><path d="M53 62 C60 56 68 60 66 68 C70 74 64 84 58 82 C52 86 48 76 51 71 C47 67 49 62 53 62 Z" fill="#fbfbf5" stroke="#cfc8b8" stroke-width="1.2"/>
          <path d="M53 68 l4 -2 M56 74 l5 -1 M54 79 l4 1" stroke="#d9d3c4" stroke-width="1.2" stroke-linecap="round"/></g></g>
        <g transform="translate(208 72) scale(1.5) translate(-208 -72)"><g class="a-pulse"><path d="M203 62 C210 56 218 60 216 68 C220 74 214 84 208 82 C202 86 198 76 201 71 C197 67 199 62 203 62 Z" fill="#d90429" stroke="#8d0a1f" stroke-width="1.2"/>
          <circle cx="206" cy="68" r="1.4" fill="#ff8fa3"/><circle cx="211" cy="74" r="1.2" fill="#ff8fa3"/><circle cx="205" cy="77" r="1.2" fill="#ff8fa3"/></g></g>
      </g>
      ${q(58, 72, 8)}${q(208, 72, 8)}
      ${qtag(75, 122, 'Leukoplakia = WHITE', 10)}${qtag(225, 122, 'Erythroplakia = RED', 10)}
      <g class="ans">
        ${['1', '2', '3'].map((n, i) => `<g class="a-pop" style="--d:${i + 1}"><rect class="f-white" x="${3 + i * 19}" y="147" width="17" height="18" rx="3"/><rect class="f-bad" x="${3 + i * 19}" y="147" width="17" height="5" rx="2"/><text x="${11.5 + i * 19}" y="161" text-anchor="middle" class="ink" style="font-size:10px;font-weight:800;fill:#1d2238">${n}</text></g>`).join('')}
        ${tag(128, 156, 'Painless, over 3 weeks', '', 9.5)}
        <path class="s-warn a-flow" d="M194 156 L206 156" stroke-width="2.5"/>
        <g class="a-bob">${syringe(222, 154, -20)}</g>
        ${tag(268, 156, 'Biopsy', '', 10.5)}
      </g>
      ${q(150, 156)}`),

    /* 3. Oral cancer signs: non-healing bleeding sore, lump, spread to neck nodes */
    oralSx: ART(`
      ${mouth(84, 72, 1.25, `<g class="ans"><ellipse cx="-12" cy="8" rx="5.5" ry="4" fill="#fff3b0" stroke="#e63946" stroke-width="2"/><circle cx="31" cy="20" r="6" fill="#e05780" stroke="var(--art-line)" stroke-width="1.2" class="a-pulse"/></g>`)}
      <g class="ans"><g class="a-drop">${drop(69, 90, 'var(--c-blood)', .8)}</g></g>
      <ellipse class="f-skin" cx="245" cy="40" rx="28" ry="33"/>
      <path class="f-skin" d="M229 64 L229 104 Q214 108 200 120 L290 120 Q276 108 261 104 L261 64 Z"/>
      <ellipse class="f-skin" cx="245" cy="40" rx="28" ry="33" style="stroke:none"/>
      <path class="s-line" d="M236 54 Q245 60 254 54" stroke-width="1.8"/><circle cx="235" cy="34" r="2.6" fill="var(--art-line)"/><circle cx="255" cy="34" r="2.6" fill="var(--art-line)"/>
      <g class="ans">
        <path class="s-warn a-flow" d="M140 70 C176 66 200 70 226 78" stroke-width="2.5"/>
        ${[[231, 72], [259, 72], [229, 86], [261, 86], [230, 99], [260, 99]].map(([x, y], i) => `<ellipse class="f-good a-pulse" style="animation-delay:${i * .15}s" cx="${x}" cy="${y}" rx="4" ry="3"/>`).join('')}
        <rect x="178" y="161" width="114" height="10" rx="5.5" class="f-white"/>
        <rect x="178" y="161" width="72" height="10" rx="5.5" class="f-good"><animate attributeName="width" values="0;72;72" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/></rect>
      </g>
      ${qtag(84, 16, "Sore that won't heal", 10)}${qtag(46, 130, 'Bleeds easily', 10)}${qtag(140, 130, 'Lump, thickening', 10)}
      ${qtag(84, 156, 'Hard to chew or swallow', 10)}${qtag(245, 130, 'To neck nodes', 10)}${qtag(232, 151, '5-yr survival ~63%', 9.5)}`),

    /* 4. Esophagus: squamous in the middle third, adenocarcinoma in the lower third (Barrett zone) */
    esoType: ART(`
      ${stomach(154, 137, .45)}
      ${tube('M150 4 L150 117', 'var(--c-esoph)', 18)}
      <path d="M137 42 h26 M137 80 h26" class="s-ink" stroke-width="1.2" stroke-dasharray="2 2"/>
      <g class="ans">
        <path d="M141.5 117 L141.5 92 L145 98 L148 86 L152 96 L155 88 L158.5 97 L158.5 117 Z" fill="#e8505b" opacity=".9"/>
        ${blob(152, 61, 8, 'f-tumor', 'class="a-pulse"')}
        ${blob(149, 104, 8, 'f-tumor', 'class="a-pulse" style="animation-delay:.8s"')}
        <g class="a-rise"><circle class="f-acid" cx="148" cy="124" r="2.6"/><circle class="f-acid" cx="153" cy="130" r="2"/></g>
        <g class="a-rise" style="animation-delay:.9s"><circle class="f-acid" cx="151" cy="122" r="2.2"/></g>
        ${dash('M126 64 L141 62')}${dash('M196 88 L159 102')}
        ${cig(30, 110)}${glass(64, 110)}${virus(96, 108, 6)}
      </g>
      ${qtag(64, 44, 'Squamous cell')}${qtag(64, 64, 'middle third', 10)}${qtag(64, 84, 'smoking, alcohol, HPV', 9.5)}
      ${qtag(242, 88, 'Adenocarcinoma')}${qtag(242, 108, 'lower third', 10)}${qtag(242, 128, 'Barrett, GERD', 10)}${qtag(242, 148, 'obesity', 10)}`),

    /* 5. Esophageal cancer signs: a narrowing tumor traps food (worsening dysphagia) */
    esoSx: ART(`
      ${stomach(67, 146, .4)}
      ${tube('M64 4 L64 130', 'var(--c-esoph)', 22)}
      <path d="M64 6 L64 128" stroke="#c45a46" stroke-width="6" stroke-linecap="round"/>
      ${blob(57, 98, 6)}${blob(71, 103, 6)}
      <g class="ansmotion"><circle class="f-food" r="6" cx="0" cy="0"><animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1;.96;1;1" keyTimes="0;.55;.65;.75;1" calcMode="linear" path="M64 8 L64 86"/></circle></g>
      <g class="ans">
        ${steak(128, 22)}<path class="s-ink" d="M142 22 h8" stroke-width="1.5"/>
        <rect class="f-fat" x="161" y="12" width="18" height="18" rx="5"/><path d="M164 16 h12" stroke="#c68b59" stroke-width="2"/>
        <path class="s-ink" d="M184 22 h8" stroke-width="1.5"/>
        <path class="f-white" d="M202 12 h20 l-3 20 h-14 Z"/><path class="f-water" d="M203.5 19 h17 l-2 12 h-13 Z"/>
        ${noSign(128, 22, 1)}${noSign(170, 22, 3)}${noSign(212, 22, 5)}
        <g>${scale(145, 72)}</g>
        <g><path d="M237 62 v18 M253 62 v18" stroke="var(--c-esoph)" stroke-width="6"/>${bolt(245, 71, .8)}</g>
        <g>${[0, 1, 2].map(i => `<path class="s-immune a-blink" style="animation-delay:${i * .25}s" d="M${149 + i * 6} ${112} q5 8 0 16" stroke-width="2"/>`).join('')}<circle class="f-skin" cx="141" cy="120" r="6"/></g>
        <g class="a-pulse">${rbc(245, 120, true)}</g>
      </g>
      ${qtag(170, 46, 'Worsening dysphagia')}${qtag(145, 94, 'Weight loss')}${qtag(245, 94, 'Painful swallow')}
      ${qtag(145, 144, 'Hoarse, cough')}${qtag(245, 144, 'Iron-def. anemia')}${qtag(190, 168, 'Usually found late')}`),

    /* 6. Gastric cancer risks: salty/smoked/pickled food (nitrates), H. pylori, and more */
    gastricRisk: ART(`
      ${tube('M144 20 L144 42', 'var(--c-esoph)', 10)}
      ${stomach(152, 90, .75, `<g class="ans"><path d="M156 60 C170 70 172 92 166 104 L178 104 C186 88 182 66 168 56 Z" fill="#ffd6e0" opacity=".9"/>
        <g class="a-sway"><path d="M176 112 q4 -6 8 0 t8 0" fill="none" stroke="#7b2cbf" stroke-width="4" stroke-linecap="round"/><path d="M192 112 l6 3 M176 112 l-6 3" stroke="#7b2cbf" stroke-width="1.2"/></g>
        <g class="a-sway" style="animation-delay:.6s"><path d="M120 128 q4 -6 8 0 t8 0" fill="none" stroke="#7b2cbf" stroke-width="4" stroke-linecap="round"/></g></g>`)}
      <g class="ans">
        <g class="a-pop" style="--d:0"><path class="f-white" d="M14 22 Q14 14 22 14 Q30 14 30 22 L30 38 L14 38 Z"/><path d="M14 22 h16" class="s-line" stroke-width="1"/><circle cx="19" cy="18" r="1" fill="var(--art-line)"/><circle cx="25" cy="18" r="1" fill="var(--art-line)"/><circle cx="22" cy="16" r="1" fill="var(--art-line)"/></g>
        <g class="a-pop" style="--d:1">${sausage(22, 72)}<g class="a-rise"><path class="s-scar" d="M16 64 q-3 -3 0 -6 q3 -3 0 -6 M28 64 q3 -3 0 -6 q-3 -3 0 -6" stroke-width="1.8"/></g></g>
        <g class="a-pop" style="--d:2"><rect x="12" y="98" width="20" height="24" rx="4" fill="#c9f2ff" stroke="var(--art-line)" stroke-width="1.4"/><rect x="11" y="95" width="22" height="5" rx="2" class="f-warn"/><path class="f-good" d="M17 104 q5 -2 5 8 q0 8 -5 7 Z"/><path class="f-good" d="M25 106 q4 0 4 6 q0 6 -4 6 Z"/></g>
        <g class="a-pop" style="--d:3"><circle class="f-warn" cx="22" cy="146" r="9"/><text x="22" y="149.5" text-anchor="middle" class="on" style="font-size:9px">NO</text></g>
        ${dash('M205 30 L186 108')}${dash('M200 56 L170 80')}
        <g class="a-pop" style="--d:4">${cig(112, 168)}</g><g class="a-pop" style="--d:5">${glass(146, 164)}</g><g class="a-pop" style="--d:6">${belly(174, 167)}</g>
        <g class="a-pulse">${rbc(282, 84, true, .8)}</g>
      </g>
      ${lqtag(36, 30, 'Salted', 10)}${lqtag(40, 72, 'Smoked, cured', 9.5)}${lqtag(38, 110, 'Pickled', 10)}${lqtag(36, 146, 'Nitrates', 10)}
      ${qtag(246, 22, 'H. pylori', 10)}${qtag(246, 48, 'Atrophic gastritis', 9.5)}${qtag(240, 106, 'Pernicious anemia', 9.5)}
      ${qtag(246, 136, 'Smoking, alcohol', 9.5)}${qtag(246, 160, 'Obesity', 9.5)}`),

    /* 7. Gastric cancer signs: silent early, then fullness, pain, weight loss, bleeding, a mass */
    gastricSx: ART(`
      ${tube('M146 24 L146 46', 'var(--c-esoph)', 10)}
      ${stomach(152, 96, .78, `${blob(118, 120, 13, 'f-tumor', 'class="a-pulse"')}`)}
      <g class="ans">
        <ellipse class="f-white" cx="38" cy="38" rx="22" ry="8"/><path class="f-food" d="M24 36 Q34 22 48 34 Q40 40 24 36 Z"/><path class="s-line" d="M64 26 v18 M61 26 v6 M67 26 v6" stroke-width="1.4"/>
        <g class="a-pop" style="--d:1"><circle cx="58" cy="20" r="8" class="f-good"/><path d="M54 20 l3 3 l5 -6" stroke="#fff" stroke-width="2" fill="none"/></g>
        <g class="a-pulse"><path class="f-warn" d="M226 40 l4 -9 l3 8 l9 -4 l-4 9 l9 3 l-9 4 l4 9 l-9 -4 l-3 9 l-4 -9 l-9 4 l4 -9 l-9 -4 l9 -3 l-4 -9 Z"/></g>
        ${scale(38, 132)}
        <g class="a-drop">${drop(232, 124)}</g><g class="a-drop" style="animation-delay:.6s">${drop(246, 120)}</g>${poo(266, 128, '#2b1d1a')}
        ${dash('M206 84 L130 112')}
      </g>
      ${qtag(150, 12, 'Often silent early', 10)}
      ${qtag(42, 60, 'Early fullness', 10)}${qtag(254, 64, 'Epigastric pain', 10)}
      ${qtag(250, 86, 'Belly mass', 10)}${qtag(42, 156, 'Weight loss', 10)}${qtag(244, 152, 'Melena, hematemesis', 9.5)}`),

    /* 8. Gastric cancer: endoscopy + biopsy to diagnose; gastrectomy to cure */
    gastricTx: ART(`
      <defs><clipPath id="c6gtxA"><rect x="150" y="0" width="150" height="180"/></clipPath>
        <clipPath id="c6gtxKeep"><path d="M164.7 0 L300 0 L300 180 L284.7 180 Z"/></clipPath>
        <clipPath id="c6gtxCut"><path d="M150 0 L164.7 0 L284.7 180 L150 180 Z"/></clipPath></defs>
      ${tag(70, 12, 'Diagnose', '', 10)}${tag(225, 12, 'Cure', '', 10)}
      <path class="s-ink" d="M150 20 V150" stroke-width="1" stroke-dasharray="3 4"/>
      ${tube('M74 22 L74 52', 'var(--c-esoph)', 9)}
      ${stomach(80, 90, .6, `${blob(108, 122, 12)}`)}
      <g class="ans">
        ${tube('M74 18 L74 56 C78 74 70 90 64 100', '#ced4da', 3)}
        <g class="a-bob"><path d="M64 100 l-5 7 M64 100 l2 8" stroke="#ced4da" stroke-width="2.4" stroke-linecap="round"/><circle cx="62" cy="106" r="2" fill="#ffd60a"/></g>
      </g>
      ${tube('M229 22 L229 52', 'var(--c-esoph)', 9)}
      <g clip-path="url(#c6gtxKeep)">${stomach(235, 90, .6)}</g>
      <g clip-path="url(#c6gtxCut)"><g class="a-bob">${stomach(235, 90, .6, `${blob(108, 122, 12)}`)}</g></g>
      <g class="ans"><path class="s-bad a-flow" d="M222 86 L258 140" stroke-width="2.4"/><path d="M262 132 l8 -4 M262 140 l8 4" stroke="#adb5bd" stroke-width="2.4" stroke-linecap="round"/><circle cx="260" cy="136" r="2" fill="#adb5bd"/></g>
      ${qtag(70, 134, 'Endoscopy + biopsy', 10)}${qtag(226, 134, 'Gastrectomy: only cure', 9.5)}
      <g class="ans">
        <g class="a-pop" style="--d:1">${tag(48, 160, 'Treat H. pylori', '', 9.5)}</g>
        <g class="a-pop" style="--d:2">${tag(116, 160, '+ B12', '', 9.5)}</g>
        <g class="a-pop" style="--d:3">${tag(162, 160, '+ iron', '', 9.5)}</g>
        <g class="a-pop" style="--d:4">${tag(240, 160, '5-yr survival ~32%', '', 9.5)}</g>
      </g>
      ${q(150, 160)}`),

    /* 9. Liver cancer: most is secondary (spread from breast, lung, GI); primary HCC from cirrhosis/hepatitis */
    liverCa: ART(`
      ${liver(100, 76, .48)}
      ${liver(226, 76, .58, `<g class="ans">${[[30, 20], [48, 36], [22, 40], [64, 22], [80, 44], [36, 52], [110, 30], [130, 22], [100, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#8e2232" opacity=".7"/>`).join('')}</g>`)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${lungs(20, 30)}</g><g class="a-pop" style="--d:1">${ribbon(20, 78, '#ff8fab')}</g>
        <g class="a-pop" style="--d:2">${tube('M12 124 L12 102 L34 102 L34 120 L26 122', 'var(--c-large)', 5)}</g>
        <path class="s-bad a-flow" d="M34 32 C48 36 58 50 72 64" stroke-width="2"/><path class="s-bad a-flow" d="M32 78 L66 78" stroke-width="2"/><path class="s-bad a-flow" d="M38 112 C52 106 62 98 74 90" stroke-width="2"/>
        ${[[80, 70, 0], [96, 82, 1], [112, 68, 2], [122, 80, 3], [88, 90, 4], [104, 74, 5]].map(([x, y, d]) => `<g class="a-pop" style="--d:${d + 3}">${blob(x, y, 4.2)}</g>`).join('')}
        ${blob(208, 78, 13, 'f-tumor', 'class="a-pulse"')}
        <g>${virus(258, 30, 7, 'B')}</g><g>${virus(286, 30, 7, 'C')}</g>
      </g>
      ${q(100, 30, 9)}
      ${qtag(84, 120, 'Secondary: MOST', 10)}${qtag(84, 140, 'from breast, lung, GI', 9)}
      ${qtag(226, 120, 'Primary (HCC)', 10)}${qtag(226, 140, 'cirrhosis, hep B or C', 9)}
      ${qtag(150, 166, 'Liver = common landing spot for spread', 9)}`),

    /* 10. Liver cancer treatments: cut it out, replace the liver, or kill it in place */
    liverTx: ART(`
      ${liver(150, 92, .9)}
      ${blob(138, 88, 11)}
      <g class="ans">
        <ellipse class="s-good a-flow" cx="137" cy="88" rx="24" ry="19" stroke-width="2.2"/>
        <g class="a-bob"><path d="M100 54 L120 70" stroke="#adb5bd" stroke-width="4" stroke-linecap="round"/><path d="M92 47 L101 55" stroke="#495057" stroke-width="5" stroke-linecap="round"/></g>
        ${liver(30, 70, .3)}<path class="s-good a-flow" d="M58 74 L78 80" stroke-width="2.5"/><circle cx="44" cy="62" r="5" class="f-good"/><path d="M41.5 62 l2 2 l3.5 -4" stroke="#fff" stroke-width="1.5" fill="none"/>
        <path class="s-blood" d="M20 150 C60 150 96 136 130 100" stroke-width="3"/><path d="M20 150 C60 150 96 136 130 100" stroke="#e9ecef" stroke-width="1.2" fill="none"/>
        <g class="a-drop">${drop(136, 94, '#9ef01a', .55)}</g>
        <path d="M236 40 L148 82" stroke="#6c757d" stroke-width="2.5" stroke-linecap="round"/><rect x="232" y="34" width="12" height="9" rx="2" fill="#4cc9f0" stroke="var(--art-line)"/>
        <g class="a-spin">${snow(150, 80, 5)}</g>
        <path d="M262 92 L150 90" stroke="#6c757d" stroke-width="2.5" stroke-linecap="round"/><rect x="256" y="86" width="12" height="11" rx="2" class="f-warn"/>
        <g class="a-pulse"><path d="M160 84 q4 6 0 12 M165 82 q5 8 0 16" class="s-warn" stroke-width="2"/></g>
        ${syringe(206, 136, -35)}<path d="M180 125 L146 96" stroke="#6c757d" stroke-width="1.2"/>
        <g class="a-drop" style="animation-delay:.5s"><circle cx="148" cy="98" r="2.5" fill="#9be1ff" stroke="var(--art-line)"/></g>
      </g>
      ${qtag(62, 22, 'Partial hepatectomy', 9.5)}${qtag(38, 100, 'Transplant', 10)}
      <text x="38" y="120" text-anchor="middle" class="ink ans" style="font-size:9px">if not spread</text>
      ${qtag(64, 166, 'Chemo into tumor', 9.5)}
      ${qtag(238, 22, 'Freeze (cryo)', 10)}${qtag(240, 112, 'Heat (RF ablation)', 9.5)}${qtag(238, 166, 'Alcohol injection', 9.5)}`),

    /* 11. Pancreatic cancer risk factors around the pancreas */
    pancCa: ART(`
      ${tube('M110 60 C72 56 58 80 60 100 C62 124 86 134 116 128', 'var(--c-small)', 10)}
      ${pancreas(150, 92, 1.25)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${cig(38, 20)}</g>
        <g class="a-pop" style="--d:1">${belly(113, 22)}</g>
        <g class="a-pop" style="--d:2"><path class="f-warn" d="M188 30 C178 28 178 16 186 8 C186 16 192 14 190 8 C198 14 200 28 188 30 Z"/><path class="f-nerve" d="M188 30 C184 28 184 22 188 18 C190 22 193 24 188 30 Z"/></g>
        <g class="a-pop" style="--d:3"><rect class="f-white" x="252" y="10" width="16" height="22" rx="3"/><rect x="255" y="13" width="10" height="7" fill="#dff6ff"/>${drop(274, 24, 'var(--c-blood)', .7)}</g>
        <g class="a-pop" style="--d:4">${liver(38, 140, .17, `${[[30, 20], [60, 16], [90, 26], [50, 40], [120, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#7d2633"/>`).join('')}`)}</g>
        <g class="a-pop" style="--d:5">${glass(113, 140)}</g>
        <g class="a-pop" style="--d:6">${person(180, 142, '#ffcf56')}${person(196, 142, '#ffcf56')}${person(188, 128, '#ffa36c')}</g>
        <g class="a-pop" style="--d:7">${drop(263, 140, 'var(--c-blood)', 1.6)}<text x="263" y="146" text-anchor="middle" class="on" style="font-size:9px">A B</text></g>
        <g class="a-pulse"><path d="M182 74 q3 -5 6 0 q3 5 6 0" class="s-bad" stroke-width="1.8"/></g>
      </g>
      ${qtag(38, 44, 'Smoking', 9.5)}${qtag(113, 44, 'Obesity', 9.5)}${qtag(188, 44, 'Pancreatitis', 9.5)}${qtag(263, 44, 'Diabetes', 9.5)}
      ${qtag(38, 164, 'Cirrhosis', 9.5)}${qtag(113, 164, 'Alcohol', 9.5)}${qtag(184, 164, 'Family history', 9.5)}${qtag(264, 164, 'Non-O blood', 9.5)}`),

    /* 12. Pancreatic cancer signs: a head tumor blocks the bile duct (jaundice) and more */
    pancSx: ART(`
      ${liver(52, 22, .55)}
      ${stomach(110, 50, .32)}
      <ellipse class="f-gall" cx="40" cy="46" rx="6" ry="10" transform="rotate(-25 40 46)"/>
      ${tube('M60 30 L62 52 L66 98', 'var(--c-gall)', 4)}${tube('M44 54 L62 52', 'var(--c-gall)', 3)}
      ${tube('M92 62 C56 60 38 76 40 100 C42 126 64 136 96 130 L132 126', 'var(--c-small)', 9)}
      ${pancreas(84, 104, .7)}
      ${blob(63, 100, 9)}
      <g class="ans">
        <path class="s-bile a-flow-slow" d="M61 34 L62 52 L65 86" stroke-width="2.5"/>
        <path d="M58 82 l10 8 M68 82 l-10 8" stroke="var(--c-bad)" stroke-width="2.6" stroke-linecap="round"/>
        <g class="a-pulse"><path d="M76 96 q4 -6 8 0 q4 6 8 0" class="s-warn" stroke-width="2"/></g>
      </g>
      <g class="ans">
        ${bolt(162, 18, .75)}
        <g><ellipse cx="162" cy="40" rx="8" ry="5" fill="#ffffff" stroke="var(--art-line)" stroke-width="1.2"><animate attributeName="fill" values="#ffffff;#ffe14d;#ffe14d;#ffffff" keyTimes="0;.4;.8;1" dur="3s" repeatCount="indefinite"/></ellipse><circle cx="162" cy="40" r="2.6" fill="#6b4226"/></g>
        <path d="M150 34 l-3 -3 M150 46 l-3 3" class="s-ink a-shake" stroke-width="1.4"/>
        <path d="M156 56 h12 l-2 14 h-8 Z" fill="#b5651d" stroke="var(--art-line)" stroke-width="1.2"/>
        ${poo(162, 86, '#e2d6bd')}
        ${scale(162, 108)}
        <g>${drop(160, 130, 'var(--c-blood)', .7)}<text x="168" y="134" class="ink" style="font-size:9px;font-weight:700">g</text></g>
        <g><path d="M152 152 h20" stroke="var(--c-vein)" stroke-width="6" stroke-linecap="round"/>${blob(162, 152, 3.6, 'f-bad', 'class="a-pulse"')}</g>
      </g>
      ${lqtag(176, 16, 'Pain to the back', 10)}${lqtag(176, 38, 'Jaundice + itching', 10)}${lqtag(176, 60, 'Dark urine', 10)}
      ${lqtag(176, 84, 'Clay-colored stool', 10)}${lqtag(176, 108, 'Weight loss', 10)}${lqtag(176, 130, 'New diabetes', 10)}${lqtag(176, 152, 'Blood clots', 10)}
      ${qtag(80, 166, 'Found late: ~10% 5-yr', 9.5)}`),

    /* 13. Whipple: remove pancreatic head + duodenum + gallbladder + bile duct end (+/- distal stomach), rejoin to jejunum */
    whipple: ART(`
      ${tube('M101 18 L101 36', 'var(--c-esoph)', 7)}
      ${liver(60, 20, .5)}
      ${stomach(106, 52, .42)}
      <ellipse class="f-gall" cx="44" cy="40" rx="5.5" ry="9" transform="rotate(-25 44 40)"/>
      ${tube('M58 30 L60 50 L62 96', 'var(--c-gall)', 3.5)}${tube('M48 48 L60 50', 'var(--c-gall)', 2.5)}
      ${tube('M80 68 C58 66 40 78 40 100 C40 124 60 134 86 130 L116 126 C126 126 130 132 130 142', 'var(--c-small)', 9)}
      ${pancreas(84, 102, .7)}
      ${blob(60, 104, 7)}
      <g class="ans">
        <path class="a-blink" d="M32 34 L60 40 L72 56 L100 56 L102 80 L92 86 L92 120 L122 118 L124 136 L60 142 L30 128 L28 90 Z" fill="#ffffff" opacity=".35"/>
        <path class="s-bad a-flow" d="M32 34 L60 40 L72 56 L100 56 L102 80 L92 86 L92 120 L122 118 L124 136 L60 142 L30 128 L28 90 Z" stroke-width="2"/>
        <path class="s-warn a-flow" d="M132 74 L170 74" stroke-width="4"/><path d="M166 68 L174 74 L166 80" fill="none" stroke="var(--c-warn)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${liver(226, 20, .5)}
        ${stomach(270, 46, .36)}
        ${tube('M220 30 L210 54', 'var(--c-gall)', 3.5)}
        <path class="f-pancreas" d="M222 96 C238 92 262 92 284 86 C294 84 297 92 290 97 C276 103 248 107 222 108 Z"/>
        ${tube('M210 52 L210 120 Q210 140 230 140 L282 140 Q296 140 296 150', 'var(--c-small)', 9)}
        ${tube('M246 60 C242 80 238 110 238 138', 'var(--c-small)', 7)}
        ${[[210, 55], [214, 102], [238, 138]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="none" stroke="var(--c-good)" stroke-width="2.4" class="a-pulse"/>`).join('')}
        ${tag(184, 54, 'bile', '', 9)}${tag(180, 100, 'pancreas', '', 9)}${tag(268, 120, 'stomach', '', 9)}
      </g>
      <g class="ansmotion">
        <circle r="3" fill="var(--c-bile)" stroke="var(--art-line)"><animateMotion dur="4s" repeatCount="indefinite" path="M220 30 L210 54 L210 120 Q210 140 230 140 L296 144"/></circle>
        <circle r="3" class="f-pancreas"><animateMotion dur="4s" begin="1.3s" repeatCount="indefinite" path="M286 92 L220 102 L210 104 L210 120 Q210 140 230 140 L296 144"/></circle>
        <circle r="3.4" class="f-food"><animateMotion dur="4s" begin="2.6s" repeatCount="indefinite" path="M260 50 L246 60 C242 80 238 110 238 138 L296 144"/></circle>
      </g>
      ${q(240, 90, 14)}
      ${qtag(74, 154, 'Pancreaticoduodenectomy', 9.5)}${qtag(234, 154, 'Rejoin to jejunum', 9.5)}
      ${qtag(150, 172, 'Chemo, radiation: often palliative', 9.5)}`),

    /* 14. Colorectal cancer risks around the colon */
    crcRisk: ART(`
      ${colon(104, 40, 196, 140, 12)}
      <g class="ans">
        <path d="M104 72 L104 128" stroke="#ff2e4d" stroke-width="7" stroke-linecap="round" opacity=".75" class="a-blink"/>
        ${[116, 128, 140, 152, 164, 176].map((x, i) => `<circle class="f-tumor a-pop" style="--d:${i}" cx="${x}" cy="${i % 2 ? 38 : 42}" r="2.6"/>`).join('')}
        ${[52, 66, 80, 94, 108].map((y, i) => `<circle class="f-tumor a-pop" style="--d:${i + 2}" cx="${i % 2 ? 194 : 198}" cy="${y}" r="2.6"/>`).join('')}
        ${dash('M134 84 L110 96')}${dash('M150 102 L170 46')}
        <g class="a-pop" style="--d:0">${steak(50, 18)}</g><g class="a-pop" style="--d:1">${sausage(50, 62)}</g>
        <g class="a-pop" style="--d:2">${broccoli(46, 104)}${downArrow(62, 104)}</g><g class="a-pop" style="--d:3"><path d="M50 140 C58 150 58 158 50 158 C42 158 42 150 50 140 Z" class="f-fat"/>${tag(64, 150, '+', '', 9)}</g>
        <g class="a-pop" style="--d:4">${glass(250, 18)}</g><g class="a-pop" style="--d:5">${cig(250, 62)}</g>
        <g class="a-pop" style="--d:6">${belly(250, 106)}</g><g class="a-pop" style="--d:7">${couch(250, 150)}</g>
        ${hourglass(112, 14)}
      </g>
      ${qtag(50, 38, 'Red meat', 10)}${qtag(50, 82, 'Processed meat', 10)}${qtag(50, 126, 'Low fiber', 10)}${qtag(50, 170, 'High fat', 10)}
      ${qtag(250, 38, 'Alcohol', 10)}${qtag(250, 82, 'Smoking', 10)}${qtag(250, 126, 'Obesity', 10)}${qtag(250, 170, 'Inactivity', 10)}
      ${qtag(152, 14, 'Older age', 10)}${qtag(150, 84, 'IBD', 10)}${qtag(150, 108, 'FAP: 100%', 10)}`),

    /* 15. Adenoma-carcinoma sequence along the colon wall over 10-15 years */
    crcPolyp: ART(`
      <rect x="0" y="118" width="300" height="12" fill="#ffb3c1" stroke="var(--art-line)" stroke-width="1.2"/>
      <rect x="0" y="130" width="300" height="12" fill="#ffe5d9" stroke="var(--art-line)" stroke-width="1.2"/>
      <rect x="0" y="142" width="300" height="12" class="f-muscle"/>
      <path d="M10 118 v6 M22 118 v6 M34 118 v6 M46 118 v6 M58 118 v6 M70 118 v6" stroke="#e87a90" stroke-width="1.4"/>
      <g class="ans">
        <path class="f-stomach a-pop" style="--d:1" d="M92 118 Q106 90 120 118 Z"/>
        <g class="a-pop" style="--d:3"><path d="M182 118 L184 94 L190 94 L192 118 Z" class="f-stomach"/>${blob(187, 82, 16, 'f-stomach')}</g>
        <g class="a-pop" style="--d:5"><path class="f-tumor" d="M242 118 L238 152 L248 128 L254 152 L258 126 L268 152 L268 118 Z"/>${blob(256, 100, 20, 'f-tumor', 'class="a-pulse"')}</g>
        <g class="a-bob">${tube('M124 74 C150 72 166 80 174 94', '#ced4da', 3.5)}
          <ellipse cx="187" cy="106" rx="11" ry="4" fill="none" stroke="#ffd60a" stroke-width="2"/><path d="M174 94 L178 104" stroke="#ffd60a" stroke-width="2"/></g>
        ${tag(150, 16, 'Remove polyps = prevent it', '', 10)}
        <path class="s-warn a-flow" d="M14 168 L278 168" stroke-width="3"/><path d="M276 162 L286 168 L276 174" fill="none" stroke="var(--c-warn)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      ${qtag(36, 52, 'Normal', 10)}${qtag(104, 52, 'Small polyp', 10)}${qtag(190, 40, 'Adenoma grows', 10)}${qtag(254, 62, 'Adenocarcinoma', 9.5)}
      ${qtag(150, 168, '10–15 years')}`),

    /* 16. Colorectal cancer signs: a narrowing tumor in the left colon */
    crcSx: ART(`
      ${colon(112, 34, 196, 132, 13)}
      ${blob(196, 104, 9)}
      <g class="ansmotion"><circle class="f-stool" r="4.5"><animateMotion dur="5s" repeatCount="indefinite" path="M112 132 L112 44 Q112 34 122 34 L186 34 Q196 34 196 44 L196 116 Q196 132 180 132 L170 132 Q162 132 162 142 L162 150"/><animate attributeName="r" values="4.5;4.5;2;2" keyTimes="0;.62;.7;1" dur="5s" repeatCount="indefinite"/></circle></g>
      <g class="ans">
        <g>${poo(50, 20)}</g><g class="a-drop">${drop(62, 14, 'var(--c-blood)', .7)}</g>
        <g class="a-spin"><path class="s-immune" d="M42 64 a8 8 0 1 1 8 8" stroke-width="2.2"/><path d="M50 68 l0 5 l-4 -1" class="s-immune" stroke-width="2"/></g>
        <g><path d="M30 114 L62 114" stroke="#ffd60a" stroke-width="6" stroke-linecap="round"/><path d="M62 111 L70 114 L62 117 Z" fill="#f6c8a8" stroke="var(--art-line)"/><path d="M30 122 L62 122" stroke="var(--c-stool)" stroke-width="4" stroke-linecap="round"/></g>
        <g class="a-pulse">${rbc(250, 20, true)}</g>
        ${scale(250, 66)}
        <path class="s-bad a-blink" d="M212 104 L234 108" stroke-width="2.5"/>
      </g>
      ${qtag(50, 40, 'Blood in stool', 10)}${qtag(52, 88, 'Bowel habit change', 9.5)}${qtag(50, 138, 'Pencil-thin stool', 9.5)}
      ${qtag(248, 40, 'Iron-def. anemia', 9.5)}${qtag(250, 88, 'Weight loss', 10)}${qtag(250, 120, 'Obstruction', 10)}`),

    /* 17. Screening start age: 45 (ACS) on an age ruler */
    crcScreen: ART(`
      <rect class="f-mouth" x="112" y="48" width="76" height="30" rx="5"/>
      <path class="f-white" d="M112 54 Q112 46 120 46 L180 46 Q188 46 188 54 Q182 62 176 54 Q170 62 164 54 Q158 62 150 54 Q142 62 136 54 Q130 62 124 54 Q118 62 112 54 Z"/>
      <rect class="f-fat" x="104" y="78" width="92" height="6" rx="3"/>
      ${q(150, 32, 11)}
      <g class="ans">
        <text x="150" y="44" text-anchor="middle" style="font-size:26px;font-weight:800;fill:var(--c-warn);stroke:var(--art-line);stroke-width:1.2px;paint-order:stroke">45</text>
        <g class="a-blink"><path d="M141 14 C137 10 140 6 141 2 C143 6 146 10 141 14 Z" class="f-acid"/><path d="M159 14 C155 10 158 6 159 2 C161 6 164 10 159 14 Z" class="f-acid"/></g>
      </g>
      <path class="s-ink" d="M30 110 L270 110" stroke-width="2"/>
      ${Array.from({ length: 16 }, (_, i) => `<path class="s-ink" d="M${30 + i * 16} 110 v${i % 5 ? 4 : 8}" stroke-width="1.4"/>`).join('')}
      ${[40, 45, 50, 55].map(a => `<text x="${30 + (a - 40) * 16}" y="130" text-anchor="middle" class="ink" style="font-size:10px;font-weight:700">${a}</text>`).join('')}
      <g class="ans">
        <path d="M190 110 L190 98" class="s-scar" stroke-width="2"/><circle cx="190" cy="96" r="4" fill="#ced4da" stroke="var(--art-line)"/>
        <g><path d="M110 110 L110 99" class="s-good" stroke-width="3"/><circle cx="110" cy="97" r="6" class="f-good"><animate attributeName="r" values="6;8;6" dur="1.6s" repeatCount="indefinite"/></circle></g>
        <circle cx="270" cy="110" r="5" class="f-warn"><animate attributeName="cx" values="270;110;110" keyTimes="0;.6;1" dur="4s" repeatCount="indefinite"/></circle>
        <path class="s-warn a-flow" d="M100 142 L40 142" stroke-width="3"/><path d="M44 136 L34 142 L44 148" fill="none" stroke="var(--c-warn)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      ${qtag(56, 94, 'Start at 45 (ACS)', 10)}${qtag(242, 94, 'USPSTF had: 50', 9.5)}
      ${qtag(170, 142, 'Earlier with risk factors', 9.5)}${qtag(150, 167, 'Found early: ~90% 5-yr survival', 10)}`),

    /* 18. Screening test intervals on a 10-year timeline */
    crcTests: ART(`
      ${Array.from({ length: 10 }, (_, i) => `<text x="${111 + i * 15}" y="14" text-anchor="middle" class="ink" style="font-size:9px">${i + 1}</text>`).join('')}
      <text x="92" y="14" text-anchor="end" class="ink" style="font-size:9px;font-weight:700">year</text>
      ${[['FIT / gFOBT', 1, 'f-warn', '1 yr'], ['FIT-DNA', 3, 'f-spleen', '3 yr'], ['Sigmoidoscopy', 5, 'f-immune', '5 yr'], ['CT colonography', 5, 'f-vein', '5 yr'], ['Colonoscopy', 10, 'f-good', '10 yr']].map(([n, every, c, a], r) => {
        const y = 36 + r * 30;
        let dots = '';
        for (let k = every; k <= 10; k += every) {
          const f = (k / 10) * 0.82;
          dots += `<circle class="${c}" cx="${96 + k * 15}" cy="${y}" r="6" opacity=".15"><animate attributeName="opacity" values=".15;.15;1;1" keyTimes="0;${f.toFixed(3)};${(f + 0.02).toFixed(3)};1" dur="6s" repeatCount="indefinite"/></circle>`;
        }
        return `<path class="s-ink" d="M100 ${y} L250 ${y}" stroke-width="1" stroke-dasharray="2 3"/>` + ltag(2, y, n, '', 9.5) +
          `<g class="ans">${dots}</g>` + qtag(274, y, a, 10);
      }).join('')}
      <text x="8" y="81" class="ink" style="font-size:9px">(Cologuard)</text>
      <g class="ans"><path class="s-bad" d="M96 22 L96 168" stroke-width="2"><animate attributeName="d" values="M96 22 L96 168;M246 22 L246 168;M246 22 L246 168" keyTimes="0;.82;1" dur="6s" repeatCount="indefinite"/></path></g>`),

    /* 19. Treatment by stage: snip at colonoscopy, resection, chemo/radiation, colostomy */
    crcTx: ART(`
      ${tag(48, 14, 'Stage 0', '', 10)}${tag(150, 14, 'Stages I–III', '', 10)}${tag(252, 14, 'Low rectal', '', 10)}
      <path class="s-ink" d="M99 26 V150 M201 26 V150" stroke-width="1" stroke-dasharray="3 4"/>
      <rect x="6" y="96" width="88" height="10" fill="#ffb3c1" stroke="var(--art-line)" stroke-width="1.2"/><rect x="6" y="106" width="88" height="10" class="f-muscle"/>
      ${blob(56, 90, 7)}
      <g class="ans"><g class="a-bob">${tube('M20 30 C26 50 36 64 44 78', '#ced4da', 3.5)}<ellipse cx="56" cy="94" rx="11" ry="4" fill="none" stroke="#ffd60a" stroke-width="2"/><path d="M44 78 L48 92" stroke="#ffd60a" stroke-width="2"/></g></g>
      ${tube('M108 64 L126 64', 'var(--c-large)', 12)}${tube('M174 64 L192 64', 'var(--c-large)', 12)}
      <g class="a-bob">${tube('M130 64 L170 64', 'var(--c-large)', 12)}${blob(150, 64, 8)}</g>
      <g class="ans">
        <path class="s-bad a-flow" d="M128 46 V82 M172 46 V82" stroke-width="2"/>
        <g class="a-fadein" style="--d:2">${tube('M114 100 L186 100', 'var(--c-large)', 12)}<circle cx="150" cy="100" r="7" fill="none" stroke="var(--c-good)" stroke-width="2.5" stroke-dasharray="3 2"/></g>
      </g>
      <path class="f-skin" d="M216 30 Q252 22 288 30 L292 120 Q252 128 212 120 Z"/>
      <circle cx="252" cy="46" r="3" fill="#c98b6b"/>
      <g class="ans"><circle cx="270" cy="92" r="5" fill="#e63946" stroke="var(--art-line)" stroke-width="1.2"/>
        <g class="a-sway"><path d="M262 96 Q262 120 274 122 Q286 120 284 96 Z" fill="#ffffff" fill-opacity=".85" stroke="var(--art-line)" stroke-width="1.2"/></g></g>
      ${qtag(50, 136, 'Colonoscopy', 10)}${qtag(150, 136, 'Colon resection', 10)}${qtag(252, 136, 'Colostomy', 10)}
      ${qtag(150, 164, '+ chemo or radiation by stage', 10)}`),

    /* 20. Deadliest GI cancers: colorectal (3rd common, 3rd deadliest) and pancreatic (4th leading death) */
    rank: ART(`
      <defs><linearGradient id="g6half"><stop offset=".5" stop-color="#06d6a0"/><stop offset=".5" stop-color="#ffffff"/></linearGradient></defs>
      <path class="s-ink" d="M150 8 V172" stroke-width="1" stroke-dasharray="3 4"/>
      ${q(75, 28, 13)}${q(225, 28, 13)}
      <g class="ans">
        <g class="a-pop" style="--d:0">${tube('M58 46 L58 18 Q58 12 64 12 L86 12 Q92 12 92 18 L92 38 Q92 42 86 42 L80 42 L80 50', 'var(--c-large)', 6)}</g>
        <g class="a-pop" style="--d:1">${pancreas(225, 28, .6)}</g>
        ${ribbon(26, 30, '#3a86ff')}${ribbon(276, 30, '#8e5ccf')}
        ${Array.from({ length: 10 }, (_, i) => person(21 + i * 12, 130, i < 6 ? '#06d6a0' : i === 6 ? 'url(#g6half)' : '#ffffff', `class="a-pop" style="--d:${i * .5 + 2}"`)).join('')}
        ${Array.from({ length: 10 }, (_, i) => person(171 + i * 12, 130, i < 1 ? '#06d6a0' : '#ffffff', `class="a-pop" style="--d:${i * .5 + 2}"`)).join('')}
      </g>
      ${qtag(75, 60, 'Colorectal')}${qtag(225, 60, 'Pancreatic')}
      ${qtag(75, 82, '3rd most common', 9.5)}${qtag(75, 102, '3rd deadliest', 9.5)}
      ${qtag(225, 92, '4th leading cancer death', 9.5)}
      ${qtag(75, 158, '65% alive at 5 yrs', 9.5)}${qtag(225, 158, '10% alive at 5 yrs', 9.5)}`),
  });
})();
