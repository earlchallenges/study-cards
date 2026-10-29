/* Study engine: Flashcards, Learn, Test, Match + read-aloud. Each chapter page sets window.SET before loading this. */
(function () {
  const SET = window.SET, CARDS = SET.cards, PICS = SET.pics || {};
  const $ = id => document.getElementById(id);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
                  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const KEY = 'study:' + location.pathname + ':';
  const ICON = {
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></svg>',
    starOn: '<svg viewBox="0 0 24 24" fill="#ffcd1f" stroke="#e0a800" stroke-width="1.5" stroke-linejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="m4 4 5 5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
  };

  /* ---------- read aloud ---------- */
  let voice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices().filter(v => /^en(-|_)US/i.test(v.lang));
    voice = vs.find(v => /Samantha|Google US English|Aria|Jenny|Ava|Allison/i.test(v.name)) || vs[0] || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speakText(text) {
    if (!('speechSynthesis' in window)) return Promise.resolve();
    // swap tricky medical words for spellings the voice pronounces correctly
    let t = text;
    for (const [w, s] of Object.entries(SET.speak || {})) t = t.replace(new RegExp('\\b' + w + '\\b', 'gi'), s);
    t = t.replace(/(\d+)–(\d+)%/g, '$1 to $2 percent').replace(/<\s?(\d+)%/g, 'less than $1 percent').replace(/=/g, ' means ').replace(/\//g, ' or ');
    speechSynthesis.cancel();
    return new Promise(res => {
      const u = new SpeechSynthesisUtterance(t);
      if (voice) u.voice = voice;
      u.lang = 'en-US'; u.rate = 0.92; u.onend = res; u.onerror = res;
      speechSynthesis.speak(u);
    });
  }

  // Kokoro recordings (audio/<chapter>/tNN.mp3 + dNN.mp3); falls back to the phone's voice if a file won't play
  const player = new Audio();
  let stopToken = 0;
  function stopAudio() { stopToken++; player.pause(); if ('speechSynthesis' in window) speechSynthesis.cancel(); }
  function speakCard(i, kind) {
    const c = CARDS[i], text = kind === 'd' ? c.def : c.term;
    if (!SET.audio) return speakText(text);
    stopAudio(); const token = stopToken;
    return new Promise(res => {
      player.src = `${SET.audio}/${kind}${String(i + 1).padStart(2, '0')}.mp3`;
      player.onended = res;
      player.onerror = () => { if (token === stopToken) speakText(text).then(res); else res(); };
      player.play().catch(() => { if (token === stopToken) speakText(text).then(res); else res(); });
    });
  }

  /* ---------- page skeleton ---------- */
  document.title = SET.title + ' | Study Cards';
  $('app').innerHTML = `
  <div class="wrap">
    <header>
      <a class="home-link" href="./">${ICON.left.replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px"')} All chapters</a>
      <h1>${SET.title}</h1>
      <div class="sub">${SET.chapter} · ${CARDS.length} terms</div>
    </header>
    <div class="modes" role="tablist">
      <button class="mode" role="tab" data-mode="cards"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>Flashcards</button>
      <button class="mode" role="tab" data-mode="learn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7v5l3 3"/><path d="M17 3h4v4"/></svg>Learn</button>
      <button class="mode" role="tab" data-mode="test"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 9 2 2 4-4M8 16h8"/></svg>Test</button>
      <button class="mode" role="tab" data-mode="match"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M13 7h4a2 2 0 0 1 2 2v1M11 17H7a2 2 0 0 1-2-2v-1"/></svg>Match</button>
    </div>
    <section id="view"></section>
    <h2 class="list-head">Terms in this set (${CARDS.length})</h2>
    <div class="terms" id="terms"></div>
    <footer>Tap the speaker on any card to hear it read out loud.</footer>
  </div>`;

  // term list
  $('terms').innerHTML = CARDS.map((c, i) => `
    <div class="row"><div class="t">${c.term}${c.say ? `<span class="s">${c.say}</span>` : ''}</div>
    <div class="d">${c.def}</div>
    <button class="icon-btn" data-speak="${i}" aria-label="Read ${c.term} out loud">${ICON.sound}</button></div>`).join('');
  $('terms').addEventListener('click', e => {
    const b = e.target.closest('[data-speak]'); if (!b) return;
    const i = +b.dataset.speak, t = stopToken + 1;
    speakCard(i, 't').then(() => { if (stopToken === t) return new Promise(r => setTimeout(r, 300)).then(() => stopToken === t && speakCard(i, 'd')); });
  });

  const modes = { cards: Flashcards, learn: Learn, test: Test, match: Match };
  document.querySelectorAll('.mode').forEach(b => b.onclick = () => setMode(b.dataset.mode));
  function setMode(m) {
    stopAudio(); autoplay = false;
    document.querySelectorAll('.mode').forEach(b => b.setAttribute('aria-selected', b.dataset.mode === m));
    clearInterval(matchTimer);
    modes[m]();
  }
  // mystery = the front-of-card version: answer labels hidden (.ans), "?" badges shown (.q), no animation
  const picHTML = (c, mystery) => c.pic && PICS[c.pic] ? `<div class="pic ${mystery ? 'mystery' : 'play'}" role="img" aria-label="${mystery ? 'Mystery diagram' : c.picLabel || 'Diagram'}">${PICS[c.pic]}</div>` : '';
  const progress = (n, total, label) => `<div class="bar"><div class="track"><div class="fill" style="width:${n / total * 100}%"></div></div><span>${label || `${n} / ${total}`}</span></div>`;

  /* ---------- Flashcards ---------- */
  let order = CARDS.map((_, i) => i), pos = 0, flipped = false, autoplay = false;
  const stars = new Set(store.get(KEY + 'stars', []));
  function Flashcards() {
    $('view').innerHTML = `<div class="stage">
      <div class="card" id="card" tabindex="0" role="button" aria-label="Flip card"></div>
      <div class="nav"><button class="circle" id="prev" aria-label="Previous card">${ICON.left}</button>
        <div class="counter" id="counter"></div>
        <button class="circle" id="next" aria-label="Next card">${ICON.right}</button></div>
      <div class="tools">
        <button class="chip" id="shuf">${ICON.shuffle} Shuffle</button>
        <button class="chip" id="auto">${ICON.play} Read aloud</button>
        <button class="chip" id="staronly">${ICON.star} Starred only</button>
      </div></div>`;
    pos = Math.min(pos, order.length - 1); flipped = false; drawCard();
    $('card').onclick = e => { if (e.target.closest('.icon-btn')) return; flip(); };
    $('card').onkeydown = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } };
    $('prev').onclick = () => go(-1); $('next').onclick = () => go(1);
    $('shuf').onclick = () => { order = shuffle(order); pos = 0; flipped = false; drawCard(); };
    $('staronly').onclick = () => {
      const on = !$('staronly').classList.contains('on');
      if (on && !stars.size) { $('counter').textContent = 'Star some cards first'; return; }
      $('staronly').classList.toggle('on', on);
      order = on ? CARDS.map((_, i) => i).filter(i => stars.has(i)) : CARDS.map((_, i) => i);
      pos = 0; flipped = false; drawCard();
    };
    $('auto').onclick = () => { autoplay = !autoplay; $('auto').classList.toggle('on', autoplay); if (autoplay) runAuto(); else stopAudio(); };
  }
  function drawCard() {
    const i = order[pos], c = CARDS[i];
    $('card').innerHTML = `
      <div class="card-top"><span class="tag">${flipped ? 'Definition' : 'Term'}</span>
        <span><button class="icon-btn" id="spk" aria-label="Read out loud">${ICON.sound}</button>
        <button class="icon-btn ${stars.has(i) ? 'on' : ''}" id="str" aria-label="Star this card">${stars.has(i) ? ICON.starOn : ICON.star}</button></span></div>
      ${flipped ? `${picHTML(c)}<div class="def">${c.def}</div>` : `${window.SET.mystery ? picHTML(c, true) : ''}<div class="term">${c.term}</div>${c.say ? `<div class="say">${c.say}</div>` : ''}<div class="tap">Tap to flip</div>`}`;
    $('counter').textContent = `${pos + 1} / ${order.length}`;
    $('spk').onclick = () => speakCard(i, flipped ? 'd' : 't');
    $('str').onclick = () => { stars.has(i) ? stars.delete(i) : stars.add(i); store.set(KEY + 'stars', [...stars]); drawCard(); };
  }
  function flip() {
    const card = $('card');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { flipped = !flipped; drawCard(); return; }
    card.classList.add('flipping');
    setTimeout(() => { flipped = !flipped; drawCard(); card.classList.remove('flipping'); }, 170);
  }
  function go(d) { pos = (pos + d + order.length) % order.length; flipped = false; drawCard(); }
  async function runAuto() {
    while (autoplay && $('card')) {
      const i = order[pos];
      flipped = false; drawCard(); await speakCard(i, 't'); if (!autoplay) break;
      await new Promise(r => setTimeout(r, 600)); flip(); await new Promise(r => setTimeout(r, 250));
      await speakCard(i, 'd'); if (!autoplay) break;
      await new Promise(r => setTimeout(r, 1200));
      if (pos === order.length - 1) { autoplay = false; $('auto') && $('auto').classList.remove('on'); break; }
      go(1);
    }
  }
  document.addEventListener('keydown', e => {
    if (!$('card') || e.target.closest('input,textarea')) return;
    if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
  });

  /* ---------- Learn: multiple choice, missed ones come back until all are right ---------- */
  function Learn() {
    let queue = shuffle(CARDS.map((_, i) => i)), done = 0;
    const total = CARDS.length;
    const ask = () => {
      if (!queue.length) {
        $('view').innerHTML = `<div class="panel">${progress(total, total)}<p class="big">You learned them all!</p>
          <p class="center muted">Every term answered correctly.</p><button class="btn" id="again">Learn again</button></div>`;
        $('again').onclick = Learn; return;
      }
      const idx = queue[0], c = CARDS[idx];
      const opts = shuffle([idx, ...shuffle(CARDS.map((_, i) => i).filter(i => i !== idx)).slice(0, 3)]);
      $('view').innerHTML = `<div class="panel">${progress(done, total, `${done} of ${total} learned`)}
        <div class="q-head"><span class="tag">Term</span><button class="icon-btn" id="spk" aria-label="Read out loud">${ICON.sound}</button></div>
        <p class="q">${c.term}</p>${c.say ? `<div class="say">${c.say}</div>` : ''}
        <div class="tag">Choose the matching definition</div>
        <div class="choices">${opts.map(o => `<button class="choice" data-o="${o}">${CARDS[o].short || CARDS[o].def}</button>`).join('')}</div>
        <p class="feedback" id="fb"></p><div id="after"></div></div>`;
      $('spk').onclick = () => speakCard(idx, 't');
      document.querySelectorAll('.choice').forEach(b => b.onclick = () => {
        if ($('fb').textContent) return;
        const ok = +b.dataset.o === idx;
        document.querySelectorAll('.choice').forEach(x => { if (+x.dataset.o === idx) x.classList.add('right'); });
        if (ok) { $('fb').textContent = pick(['Nice work!', 'You got it!', 'Correct!', 'Great job!']); $('fb').className = 'feedback ok'; queue.shift(); done++; }
        else { b.classList.add('wrong'); $('fb').textContent = "Not quite. You'll see this one again."; $('fb').className = 'feedback no'; queue.splice(Math.min(queue.length, 4), 0, queue.shift()); }
        $('after').innerHTML = `${ok ? '' : picHTML(c)}<button class="btn" id="cont" style="width:100%;margin-top:8px">Continue</button>`;
        $('cont').onclick = ask; $('cont').focus();
      });
    };
    ask();
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];

  /* ---------- Test: one pass, score at the end ---------- */
  function Test() {
    const qs = shuffle(CARDS.map((_, i) => i)); let qi = 0, score = 0; const missed = [];
    const show = () => {
      if (qi >= qs.length) return finish();
      const idx = qs[qi], c = CARDS[idx], flipQ = qi % 2 === 1;
      const opts = shuffle([idx, ...shuffle(CARDS.map((_, i) => i).filter(i => i !== idx)).slice(0, 3)]);
      $('view').innerHTML = `<div class="panel">${progress(qi, qs.length, `Question ${qi + 1} of ${qs.length}`)}
        <div class="q-head"><span class="tag">${flipQ ? 'Definition' : 'Term'}</span><button class="icon-btn" id="spk" aria-label="Read out loud">${ICON.sound}</button></div>
        ${flipQ ? `<p class="q" style="font-family:var(--body);font-size:20px">${c.def}</p>` : `<p class="q">${c.term}</p>`}
        <div class="tag">Choose the matching ${flipQ ? 'term' : 'definition'}</div>
        <div class="choices">${opts.map(o => `<button class="choice" data-o="${o}">${flipQ ? CARDS[o].term : (CARDS[o].short || CARDS[o].def)}</button>`).join('')}</div>
        <p class="feedback" id="fb"></p><button class="btn" id="nx" disabled>Next question</button></div>`;
      $('spk').onclick = () => speakCard(idx, flipQ ? 'd' : 't');
      document.querySelectorAll('.choice').forEach(b => b.onclick = () => {
        if (!$('nx').disabled) return;
        const ok = +b.dataset.o === idx;
        document.querySelectorAll('.choice').forEach(x => { if (+x.dataset.o === idx) x.classList.add('right'); });
        if (ok) { score++; $('fb').textContent = 'Correct!'; $('fb').className = 'feedback ok'; }
        else { b.classList.add('wrong'); missed.push(idx); $('fb').textContent = 'Not quite. The right answer is in green.'; $('fb').className = 'feedback no'; }
        $('nx').disabled = false; $('nx').focus();
      });
      $('nx').onclick = () => { qi++; show(); };
    };
    const finish = () => {
      const pct = Math.round(score / qs.length * 100), best = store.get(KEY + 'best', 0);
      if (score > best) store.set(KEY + 'best', score);
      $('view').innerHTML = `<div class="panel"><p class="big">${pct}%</p>
        <p class="center">${score} of ${qs.length} correct · ${score > best ? 'New best score!' : `Best so far: ${best} of ${qs.length}`}</p>
        ${missed.length ? `<div class="tag">Review these</div><ul class="missed">${missed.map(i => `<li><b>${CARDS[i].term}</b>${CARDS[i].def}</li>`).join('')}</ul>` : '<p class="center">Perfect score!</p>'}
        <button class="btn" id="again">Take a new test</button></div>`;
      $('again').onclick = Test;
    };
    show();
  }

  /* ---------- Match: 6 pairs, beat the clock ---------- */
  let matchTimer = null;
  function Match() {
    const best = store.get(KEY + 'match', null);
    $('view').innerHTML = `<div class="panel" style="align-items:center;text-align:center">
      <p class="q">Ready to play?</p><p class="muted center" style="max-width:40ch">Match each term to its definition as fast as you can. Wrong picks add 1 second.</p>
      ${best ? `<p class="center">Best time: <b>${best.toFixed(1)}s</b></p>` : ''}
      <button class="btn" id="go">Start game</button></div>`;
    $('go').onclick = play;
  }
  function play() {
    const pairs = shuffle(CARDS.map((_, i) => i)).slice(0, 6);
    const tiles = shuffle(pairs.flatMap(i => [{ i, text: CARDS[i].term }, { i, text: CARDS[i].short || CARDS[i].def }]));
    let sel = null, left = pairs.length, penalty = 0; const t0 = performance.now();
    $('view').innerHTML = `<div class="panel"><div class="match-head"><span>Match</span><span id="clock">0.0s</span></div>
      <div class="grid">${tiles.map((t, k) => `<button class="tile" data-k="${k}">${t.text}</button>`).join('')}</div></div>`;
    const clock = () => (performance.now() - t0) / 1000 + penalty;
    matchTimer = setInterval(() => { if ($('clock')) $('clock').textContent = clock().toFixed(1) + 's'; }, 100);
    document.querySelectorAll('.tile').forEach(b => b.onclick = () => {
      const t = tiles[+b.dataset.k];
      if (!sel) { sel = b; b.classList.add('sel'); return; }
      if (sel === b) { b.classList.remove('sel'); sel = null; return; }
      const a = tiles[+sel.dataset.k];
      if (a.i === t.i) {
        [sel, b].forEach(x => { x.classList.remove('sel'); x.classList.add('gone'); }); sel = null;
        if (--left === 0) {
          clearInterval(matchTimer); const time = clock(), best = store.get(KEY + 'match', null);
          if (!best || time < best) store.set(KEY + 'match', time);
          $('view').innerHTML = `<div class="panel" style="align-items:center;text-align:center"><p class="big">${time.toFixed(1)}s</p>
            <p class="center">${!best || time < best ? 'New record!' : `Best time: ${best.toFixed(1)}s`}</p>
            <button class="btn" id="go">Play again</button></div>`;
          $('go').onclick = play;
        }
      } else {
        penalty += 1; const s = sel; sel = null;
        [s, b].forEach(x => { x.classList.remove('sel'); x.classList.add('bad'); });
        setTimeout(() => [s, b].forEach(x => x.classList.remove('bad')), 450);
      }
    });
  }

  setMode('cards');
})();
