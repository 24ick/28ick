// ============================================================
// SPI言語ノート — app.js
// ============================================================

const GENRES = {
  vocab:    { label: "語彙・同義語",   short:"語彙",   color:"#3A4A6B", desc: "下線部の言葉と意味が最も近いものを選ぶ。" },
  usage:    { label: "語句の用法",     short:"用法",   color:"#7A5C3E", desc: "下線部と同じ使い方をしている選択肢を選ぶ。" },
  blank:    { label: "空所補充",       short:"空所",   color:"#8C4A33", desc: "文意が通るように空所を埋める。" },
  blank2:   { label: "空所補充（2箇所）", short:"空所②", color:"#9C8438", desc: "①②2つの空所の組み合わせを選ぶ。" },
  relation: { label: "二語の関係",     short:"二語",   color:"#3E6E6B", desc: "提示された2語と同じ関係の対を選ぶ。" },
  order:    { label: "文章整序",       short:"整序",   color:"#6B4368", desc: "語句を並べ替えて文を完成させる。" },
  reading:  { label: "長文読解",       short:"読解",   color:"#1B1B1E", desc: "文章を読んで設問に答える。" },
};

const STORAGE_KEY = "spinote_history_v1";

// ---------------- history (localStorage) ----------------
function loadHistory(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveHistory(h){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(h)); }catch(e){}
}
let HISTORY = loadHistory();

function recordAnswer(qid, correct){
  const key = String(qid);
  const rec = HISTORY[key] || { attempts:0, correct:0, lastWrong:false };
  rec.attempts += 1;
  if(correct){ rec.correct += 1; rec.lastWrong = false; }
  else{ rec.lastWrong = true; }
  HISTORY[key] = rec;
  saveHistory(HISTORY);
}

function getWeakQuestionIds(){
  return Object.keys(HISTORY)
    .filter(k => HISTORY[k].lastWrong)
    .map(Number);
}

function overallAccuracy(){
  let a=0,c=0;
  Object.values(HISTORY).forEach(r=>{ a+=r.attempts; c+=r.correct; });
  return a===0 ? null : Math.round(c/a*100);
}

function genreAccuracy(genre){
  const ids = new Set(QUESTIONS.filter(q=>q.genre===genre).map(q=>q.id));
  let a=0,c=0;
  Object.entries(HISTORY).forEach(([k,r])=>{
    if(ids.has(Number(k))){ a+=r.attempts; c+=r.correct; }
  });
  return a===0 ? null : Math.round(c/a*100);
}

// ---------------- helpers ----------------
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
const LETTERS = ["A","B","C","D","E","F","G"];

function byGenre(genre){ return QUESTIONS.filter(q=>q.genre===genre); }

// ============================================================
// view management
// ============================================================
const views = ["home","genre","quiz","result","review"];
function showView(name){
  views.forEach(v=>{
    document.getElementById("view-"+v).hidden = (v!==name);
  });
  window.scrollTo(0,0);
}

// ============================================================
// HOME
// ============================================================
function renderHome(){
  document.getElementById("stat-total").textContent = QUESTIONS.length;
  document.getElementById("mode-all-count").textContent = QUESTIONS.length;
  const acc = overallAccuracy();
  document.getElementById("stat-mastery").textContent = acc===null ? "–" : acc+"%";

  const weakIds = getWeakQuestionIds();
  const weakCard = document.getElementById("weak-mode-card");
  document.getElementById("weak-count").textContent = weakIds.length;
  weakCard.hidden = weakIds.length === 0;

  // genre list
  const grid = document.getElementById("genre-grid");
  grid.innerHTML = "";
  Object.entries(GENRES).forEach(([key, meta])=>{
    const count = byGenre(key).length;
    const btn = document.createElement("button");
    btn.className = "row row--genre";
    btn.dataset.genre = key;
    btn.innerHTML = `
      <span class="row__tab" style="background:${meta.color}"></span>
      <span class="row__main">
        <span class="row__title">${meta.label}</span>
        <span class="row__desc">${meta.desc}</span>
      </span>
      <span class="row__meta">${count}問</span>
    `;
    btn.addEventListener("click", ()=> openGenrePicker(key));
    grid.appendChild(btn);
  });

  // history panel
  const empty = document.getElementById("history-empty");
  const bars = document.getElementById("history-bars");
  const resetBtn = document.getElementById("reset-history-btn");
  const hasHistory = Object.keys(HISTORY).length>0;
  empty.hidden = hasHistory;
  bars.hidden = !hasHistory;
  resetBtn.hidden = !hasHistory;
  if(hasHistory){
    bars.innerHTML = "";
    Object.entries(GENRES).forEach(([key, meta])=>{
      const acc = genreAccuracy(key);
      const row = document.createElement("div");
      row.className = "history-bar-row";
      row.innerHTML = `
        <span class="history-bar-row__label">${meta.short}</span>
        <span class="history-bar-row__track"><span class="history-bar-row__fill" style="width:${acc===null?0:acc}%"></span></span>
        <span class="history-bar-row__pct">${acc===null?"–":acc+"%"}</span>
      `;
      bars.appendChild(row);
    });
  }
}

document.querySelectorAll("[data-mode]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const mode = btn.dataset.mode;
    if(mode==="random10") startSession(shuffle(QUESTIONS).slice(0,10), "10問コース");
    else if(mode==="all") startSession(shuffle(QUESTIONS), "全問コース");
    else if(mode==="weak"){
      const ids = new Set(getWeakQuestionIds());
      const qs = QUESTIONS.filter(q=>ids.has(q.id));
      startSession(shuffle(qs), "苦手問題");
    }
  });
});

document.getElementById("reset-history-btn").addEventListener("click", ()=>{
  if(confirm("記録をすべてリセットしますか？この操作は元に戻せません。")){
    HISTORY = {};
    saveHistory(HISTORY);
    renderHome();
  }
});

// ============================================================
// GENRE PICKER
// ============================================================
let currentGenreKey = null;
function openGenrePicker(key){
  currentGenreKey = key;
  const meta = GENRES[key];
  const qs = byGenre(key);
  document.getElementById("genre-picker-title").textContent = meta.label;
  document.getElementById("genre-picker-desc").textContent = meta.desc;

  const grid = document.getElementById("count-grid");
  grid.innerHTML = "";

  const options = [];
  if(qs.length > 10) options.push({n:10, label:"10問"});
  options.push({n:qs.length, label:`全${qs.length}問`});

  options.forEach(opt=>{
    const card = document.createElement("button");
    card.className = "row row--count";
    card.innerHTML = `
      <span class="row__label-wrap">
        <span class="row__title">${opt.label}</span>
        <span class="row__desc">${meta.label}からランダムに出題</span>
      </span>
      <span class="row__go">→</span>
    `;
    card.addEventListener("click", ()=>{
      const picked = shuffle(qs).slice(0, opt.n);
      startSession(picked, meta.label);
    });
    grid.appendChild(card);
  });

  showView("genre");
}

// ============================================================
// QUIZ SESSION
// ============================================================
let session = null; // { questions, index, results: [{qid, correct, chosen}], title }

function startSession(questions, title){
  if(questions.length === 0){ alert("出題できる問題がありません。"); return; }
  session = {
    questions,
    index: 0,
    results: [],
    title,
  };
  showView("quiz");
  renderQuestion();
}

function currentQuestion(){ return session.questions[session.index]; }

function renderQuestion(){
  const q = currentQuestion();
  const meta = GENRES[q.genre];

  document.getElementById("quiz-index").textContent = session.index+1;
  document.getElementById("quiz-total").textContent = session.questions.length;
  document.getElementById("quiz-progress-fill").style.width =
    Math.round((session.index)/session.questions.length*100) + "%";
  document.getElementById("quiz-genre-tag").textContent = meta.short;

  document.getElementById("worksheet-instruction").textContent = q.instruction;

  const passageEl = document.getElementById("worksheet-passage");
  if(q.passage){
    passageEl.textContent = q.passage;
    passageEl.hidden = false;
  } else {
    passageEl.hidden = true;
  }

  document.getElementById("worksheet-prompt").textContent = q.prompt;

  const choicesEl = document.getElementById("worksheet-choices");
  const textEl = document.getElementById("worksheet-textinput");
  choicesEl.innerHTML = "";
  choicesEl.hidden = false;
  textEl.hidden = true;

  const feedbackStrip = document.getElementById("feedback-strip");
  feedbackStrip.hidden = true;
  feedbackStrip.className = "feedback-strip";

  const actionBtn = document.getElementById("quiz-action-btn");
  actionBtn.textContent = "決定";
  actionBtn.disabled = true;
  actionBtn.onclick = onDecide;

  if(q.type === "text"){
    choicesEl.hidden = true;
    textEl.hidden = false;
    const input = document.getElementById("text-answer-input");
    input.value = "";
    input.disabled = false;
    input.focus();
    input.oninput = ()=>{ actionBtn.disabled = input.value.trim().length===0; };
    input.onkeydown = (e)=>{ if(e.key==="Enter" && !actionBtn.disabled) actionBtn.onclick(); };
  } else {
    const multi = q.type === "multi";
    q.choices.forEach((choiceText, i)=>{
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.dataset.index = i;
      btn.innerHTML = `<span class="choice__letter">${LETTERS[i]}</span><span class="choice__text">${choiceText}</span>`;
      btn.addEventListener("click", ()=> onChoiceClick(i, multi));
      choicesEl.appendChild(btn);
    });
  }

  session._selected = multiSelectInit(q);
}

function multiSelectInit(q){
  return q.type === "multi" ? new Set() : null;
}

function onChoiceClick(i, multi){
  const q = currentQuestion();
  const choicesEl = document.getElementById("worksheet-choices");
  const btns = [...choicesEl.querySelectorAll(".choice")];
  const actionBtn = document.getElementById("quiz-action-btn");

  if(multi){
    if(session._selected.has(i)) session._selected.delete(i);
    else session._selected.add(i);
    btns.forEach((b,idx)=> b.classList.toggle("is-selected", session._selected.has(idx)));
    actionBtn.disabled = session._selected.size === 0;
  } else {
    session._selected = i;
    btns.forEach((b,idx)=> b.classList.toggle("is-selected", idx===i));
    actionBtn.disabled = false;
  }
}

function normalizeText(s){
  return s.trim().replace(/\s+/g,"").toLowerCase();
}

function onDecide(){
  const q = currentQuestion();
  const actionBtn = document.getElementById("quiz-action-btn");
  const choicesEl = document.getElementById("worksheet-choices");
  const btns = [...choicesEl.querySelectorAll(".choice")];

  let correct, chosenLabel;

  if(q.type === "text"){
    const input = document.getElementById("text-answer-input");
    const val = input.value;
    correct = normalizeText(val) === normalizeText(q.answer);
    chosenLabel = val.trim();
    input.disabled = true;
  } else if(q.type === "multi"){
    const chosen = [...session._selected].sort((a,b)=>a-b);
    const answer = [...q.answer].sort((a,b)=>a-b);
    correct = chosen.length===answer.length && chosen.every((v,idx)=>v===answer[idx]);
    chosenLabel = chosen.map(i=>LETTERS[i]).join("・") || "（未選択）";
    btns.forEach((b,idx)=>{
      b.disabled = true;
      b.classList.remove("is-selected");
      if(q.answer.includes(idx)) b.classList.add("is-correct");
      else if(chosen.includes(idx)) b.classList.add("is-wrong");
      else b.classList.add("is-dim");
    });
  } else {
    const chosen = session._selected;
    correct = chosen === q.answer;
    chosenLabel = LETTERS[chosen];
    btns.forEach((b,idx)=>{
      b.disabled = true;
      b.classList.remove("is-selected");
      if(idx===q.answer) b.classList.add("is-correct");
      else if(idx===chosen) b.classList.add("is-wrong");
      else b.classList.add("is-dim");
    });
  }

  recordAnswer(q.id, correct);
  session.results.push({
    qid: q.id, correct, chosenLabel,
    genre: q.genre, prompt: q.prompt,
    correctLabel: answerLabel(q),
  });

  // feedback strip
  const strip = document.getElementById("feedback-strip");
  const mark = document.getElementById("feedback-mark");
  const text = document.getElementById("feedback-text");
  strip.hidden = false;
  strip.classList.add(correct ? "is-correct" : "is-wrong");
  mark.textContent = correct ? "◯" : "✗";
  text.innerHTML = correct ? "正解。" : `不正解。 正解は <b>${answerLabel(q)}</b>`;

  const isLast = session.index === session.questions.length-1;
  actionBtn.textContent = isLast ? "結果を見る" : "つぎへ";
  actionBtn.disabled = false;
  actionBtn.onclick = onNext;

  document.getElementById("quiz-progress-fill").style.width =
    Math.round((session.index+1)/session.questions.length*100) + "%";
}

function answerLabel(q){
  if(q.type==="text") return q.answer;
  if(q.type==="multi") return q.answer.map(i=>LETTERS[i]+" "+q.choices[i]).join(" / ");
  return LETTERS[q.answer]+" "+q.choices[q.answer];
}

function onNext(){
  if(session.index < session.questions.length-1){
    session.index += 1;
    renderQuestion();
  } else {
    finishSession();
  }
}

// exit confirm
document.querySelectorAll('[data-back="confirm-exit"]').forEach(b=>{
  b.addEventListener("click", ()=>{
    document.getElementById("confirm-dialog").hidden = false;
  });
});
document.getElementById("confirm-cancel").addEventListener("click", ()=>{
  document.getElementById("confirm-dialog").hidden = true;
});
document.getElementById("confirm-exit").addEventListener("click", ()=>{
  document.getElementById("confirm-dialog").hidden = true;
  session = null;
  renderHome();
  showView("home");
});

document.querySelectorAll('[data-back="home"]').forEach(b=> b.addEventListener("click", ()=>{ renderHome(); showView("home"); }));
document.querySelectorAll('[data-back="result"]').forEach(b=> b.addEventListener("click", ()=> showView("result")));

// ============================================================
// RESULT
// ============================================================
function finishSession(){
  const total = session.results.length;
  const correctCount = session.results.filter(r=>r.correct).length;
  const pct = Math.round(correctCount/total*100);

  document.getElementById("result-score").textContent = correctCount;
  document.getElementById("result-max").textContent = total;

  const circumference = 2*Math.PI*52;
  const fg = document.getElementById("result-ring-fg");
  fg.style.strokeDasharray = circumference;
  requestAnimationFrame(()=>{
    fg.style.strokeDashoffset = circumference * (1 - correctCount/total);
  });

  let headline, sub;
  if(pct===100){ headline="満点！お見事。"; }
  else if(pct>=80){ headline="いい調子。"; }
  else if(pct>=50){ headline="あと一歩。"; }
  else{ headline="ここから伸ばそう。"; }
  sub = `${session.title}の正答率は${pct}%でした`;
  document.getElementById("result-headline").textContent = headline;
  document.getElementById("result-sub").textContent = sub;

  // genre breakdown
  const byG = {};
  session.results.forEach(r=>{
    byG[r.genre] = byG[r.genre] || {a:0,c:0};
    byG[r.genre].a += 1;
    if(r.correct) byG[r.genre].c += 1;
  });
  const bd = document.getElementById("result-genre-breakdown");
  bd.innerHTML = "";
  Object.entries(byG).forEach(([g, v])=>{
    const meta = GENRES[g];
    const p = Math.round(v.c/v.a*100);
    const row = document.createElement("div");
    row.className = "history-bar-row";
    row.innerHTML = `
      <span class="history-bar-row__label">${meta.short}</span>
      <span class="history-bar-row__track"><span class="history-bar-row__fill" style="width:${p}%;background:${meta.color}"></span></span>
      <span class="history-bar-row__pct">${v.c}/${v.a}</span>
    `;
    bd.appendChild(row);
  });

  const retryBtn = document.getElementById("retry-wrong-btn");
  const wrongCount = total - correctCount;
  retryBtn.hidden = wrongCount === 0;
  retryBtn.textContent = `間違えた${wrongCount}問だけ再挑戦`;

  showView("result");
}

document.getElementById("home-btn").addEventListener("click", ()=>{ renderHome(); showView("home"); });
document.getElementById("review-home-btn").addEventListener("click", ()=>{ renderHome(); showView("home"); });

document.getElementById("retry-wrong-btn").addEventListener("click", ()=>{
  const wrongIds = new Set(session.results.filter(r=>!r.correct).map(r=>r.qid));
  const qs = QUESTIONS.filter(q=>wrongIds.has(q.id));
  startSession(shuffle(qs), "間違え直し");
});

// ============================================================
// REVIEW
// ============================================================
document.getElementById("review-btn").addEventListener("click", ()=>{
  const list = document.getElementById("review-list");
  list.innerHTML = "";
  session.results.forEach(r=>{
    const meta = GENRES[r.genre];
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-item__top">
        <span class="review-item__badge ${r.correct?'correct':'wrong'}">${r.correct?'正解':'不正解'}</span>
        <span class="review-item__genre">${meta.label}</span>
      </div>
      <p class="review-item__prompt">${r.prompt}</p>
      ${r.correct ? "" : `<p class="review-item__row review-item__your"><b>あなたの解答：</b>${r.chosenLabel}</p>`}
      <p class="review-item__row review-item__correct"><b>正解：</b>${r.correctLabel}</p>
    `;
    list.appendChild(item);
  });
  showView("review");
});

// keyboard shortcuts (desktop convenience): 1-7 select choice, Enter = decide/next
document.addEventListener("keydown", (e)=>{
  const quizVisible = !document.getElementById("view-quiz").hidden;
  if(!quizVisible || !session) return;
  const active = document.activeElement;
  if(active && active.tagName === "INPUT") return;

  const q = currentQuestion();
  if(q.type !== "text" && /^[1-7]$/.test(e.key)){
    const i = Number(e.key)-1;
    if(i < q.choices.length){
      const choicesEl = document.getElementById("worksheet-choices");
      const btn = choicesEl.querySelectorAll(".choice")[i];
      if(btn && !btn.disabled) btn.click();
    }
  }
  if(e.key === "Enter"){
    const actionBtn = document.getElementById("quiz-action-btn");
    if(!actionBtn.disabled) actionBtn.click();
  }
});

// ============================================================
// init
// ============================================================
renderHome();
showView("home");
