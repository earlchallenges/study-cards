/* Chapter 9 diagram helpers, shared by every Chapter 9 page.
   Each helper returns an <svg> string drawn in the study.css "pic" style. */
const V = inner => `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const label = (x, y, t, cls = '', size = 11.5) => `<text x="${x}" y="${y}" class="${cls}" style="font-size:${size}px">${esc(t)}</text>`;
const arrow = (x1, y1, x2, y2) => `<path class="acs" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="ac" cx="${x2}" cy="${y2}" r="3.5"/>`;

// break text into lines of at most n characters
const wrap = (t, n) => {
  const out = [];
  let line = '';
  for (const w of String(t).split(' ')) {
    if (line && (line + ' ' + w).length > n) { out.push(line); line = w; } else line = line ? line + ' ' + w : w;
  }
  if (line) out.push(line);
  return out;
};

// a rounded box with centered (wrapped) text; on = filled with the accent color
const box = (x, y, w, h, t, on = false, size = 10.5) => {
  // shrink the font until the wrapped lines fit inside the box
  let lines = wrap(t, Math.max(6, Math.floor(w / (size * 0.56))));
  while (size > 7.5 && (lines.length * (size + 1.5) > h - 4 || lines.some(l => l.length * size * 0.56 > w - 6))) {
    size -= 0.5;
    lines = wrap(t, Math.max(6, Math.floor(w / (size * 0.56))));
  }
  const top = y + h / 2 - (lines.length - 1) * (size + 1.5) / 2 + size * 0.36;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="${on ? 'ac' : 'wh'}"/>` +
    lines.map((l, i) => `<text x="${x + w / 2}" y="${top + i * (size + 1.5)}" text-anchor="middle" style="font-size:${size}px${on ? ';fill:var(--surface);font-weight:700' : ''}">${esc(l)}</text>`).join('');
};

// title + up to 6 short items as bullet chips, with an optional footer line
const listPic = (title, items, foot = '', hi = -1) => {
  const two = items.length > 3, rows = two ? Math.ceil(items.length / 2) : items.length;
  const h = Math.min(32, (foot ? 112 : 132) / rows - 6);
  return V(label(8, 18, title, 'b') + items.map((t, i) => {
    const col = two ? i % 2 : 0, row = two ? Math.floor(i / 2) : i;
    const w = two ? 140 : 284;
    return box(8 + col * 144, 30 + row * (h + 6), w, h, t, i === hi);
  }).join('') + (foot ? label(8, 172, foot, '', 10.5) : ''));
};

// a left-to-right chain of steps (wraps to a second row after 3)
const flowPic = (title, steps, foot = '', hi = -1) => {
  const per = steps.length > 3 ? Math.ceil(steps.length / 2) : steps.length;
  const w = (284 - (per - 1) * 14) / per;
  let s = label(8, 18, title, 'b');
  steps.forEach((t, i) => {
    const row = Math.floor(i / per), col = i % per, x = 8 + col * (w + 14), y = 34 + row * 62;
    s += box(x, y, w, 44, t, i === hi);
    if (col < per - 1 && i < steps.length - 1) s += arrow(x + w + 1, y + 22, x + w + 11, y + 22);
    else if (i < steps.length - 1) s += `<path class="acs" d="M${x + w / 2} ${y + 46} L${x + w / 2} ${y + 54} L${8 + w / 2} ${y + 54} L${8 + w / 2} ${y + 59}"/>`;
  });
  return V(s + (foot ? label(8, 172, foot, '', 10.5) : ''));
};

// two side-by-side columns to compare
const twoPic = (title, [lt, litems], [rt, ritems], foot = '') => {
  const n = Math.max(litems.length, ritems.length), room = (foot ? 152 : 172) - 60;
  const step = Math.min(26, room / n), ih = step - 4;
  const col = (x, head, items, on) => box(x, 28, 138, 26, head, on, 11) +
    items.map((t, i) => box(x, 60 + i * step, 138, ih, t, false, 10)).join('');
  return V(label(8, 18, title, 'b') + col(8, lt, litems, true) + col(154, rt, ritems, false) +
    (foot ? label(8, 174, foot, '', 10.5) : ''));
};

// one big fact with a short note
const factPic = (title, big, note = '') => V(label(8, 18, title, 'b') +
  `<rect x="8" y="34" width="284" height="72" rx="14" class="ac"/>` +
  wrap(big, 26).map((l, i, a) => `<text x="150" y="${74 - (a.length - 1) * 11 + i * 22}" text-anchor="middle" style="font-size:19px;font-weight:700;fill:var(--surface)">${esc(l)}</text>`).join('') +
  wrap(note, 50).map((l, i) => label(8, 128 + i * 16, l, '', 11)).join(''));

// the GI wall as stacked bands, innermost at the top
const layersPic = hi => V(label(8, 18, 'GI wall, inside (food side) to outside', 'b') +
  [['Mucosa', 'makes mucus, faces the food'], ['Submucosa', 'vessels, nerves, glands'], ['Muscle layer', 'circular + long: peristalsis'], ['Serosa', 'outer cover (adventitia on esophagus)']]
    .map(([n, d], i) => `<rect x="8" y="${30 + i * 34}" width="284" height="30" rx="6" class="${i === hi ? 'ac' : i % 2 ? 'tis' : 'wh'}"/>` +
      `<text x="18" y="${49 + i * 34}" style="font-size:11.5px;font-weight:700${i === hi ? ';fill:var(--surface)' : ''}">${n}</text>` +
      `<text x="112" y="${49 + i * 34}" style="font-size:10.5px${i === hi ? ';fill:var(--surface)' : ''}">${d}</text>`).join(''));

/* ---------- colorful art helpers (see ch9-art.css for the color and animation classes) ---------- */
// white label pill with dark text, centered on (x, y); cls adds e.g. 'ans' so it hides on the front
const tag = (x, y, t, cls = '', size = 10.5) => {
  const w = String(t).length * size * 0.56 + 10, h = size + 7;
  return `<g class="${cls}"><rect class="tagbg" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}"/>` +
    `<text class="tagtx" x="${x}" y="${y + size * 0.36}" text-anchor="middle" style="font-size:${size}px">${esc(t)}</text></g>`;
};
// orange "?" badge that only shows on the front (mystery) side
const q = (x, y, r = 9) => `<g class="q"><circle class="qbg" cx="${x}" cy="${y}" r="${r}"/>` +
  `<text class="qtx" x="${x}" y="${y + r * 0.42}" text-anchor="middle" style="font-size:${r * 1.25}px">?</text></g>`;
// a label that is a "?" on the front and the real word on the back
const qtag = (x, y, t, size = 10.5) => q(x, y) + tag(x, y, t, 'ans', size);
// the art version of V: same 300 x 180 frame
const ART = inner => `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
