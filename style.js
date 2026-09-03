/* ============================================================
   SPI言語ノート — 赤ペン復習アプリ
   コンセプト: 赤ペン先生のノート。演習の原本そのままの質感で、
   採点した答案を見返すような体験にする。
   ============================================================ */

:root{
  --paper:        #FBF9F4;
  --paper-dim:     #F3EFE4;
  --ink:          #22262E;
  --ink-soft:     #565B63;
  --indigo:       #2B3A55;
  --indigo-deep:  #1C2740;
  --red:          #C23B32;
  --red-deep:     #A32E27;
  --red-wash:     #F7E4E1;
  --rule:         #DDD7C6;
  --rule-strong:  #C9C2AC;
  --green:        #3F7A5C;
  --green-wash:   #E1EEE5;
  --gold:         #D2A73B;
  --gold-wash:    #F6ECCF;
  --shadow-soft:  0 1px 2px rgba(34,38,46,.06), 0 6px 20px rgba(34,38,46,.06);
  --radius-s: 6px;
  --radius-m: 10px;
  --radius-l: 16px;
  --serif: 'Shippori Mincho', serif;
  --sans: 'Zen Kaku Gothic New', sans-serif;
}

*{ box-sizing: border-box; }
html,body{ height:100%; }
body{
  margin:0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
h1,h2,h3{ font-family: var(--serif); margin:0; }
p{ margin:0; }
button{ font-family: var(--sans); cursor:pointer; }
input{ font-family: var(--sans); }
::selection{ background: var(--gold-wash); }

@media (prefers-reduced-motion: reduce){
  *{ animation-duration: .001ms !important; transition-duration: .001ms !important; }
}

.app{
  max-width: 560px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--paper);
  position: relative;
  box-shadow: 0 0 60px rgba(0,0,0,.05);
}

.view{ animation: fade-in .25s ease; }
@keyframes fade-in{ from{ opacity:0; transform: translateY(6px);} to{ opacity:1; transform:none; } }

/* ---------------- shared ---------------- */
.back-btn{
  width:36px; height:36px; border-radius:50%;
  border:1px solid var(--rule-strong);
  background: var(--paper);
  color: var(--ink);
  font-size: 18px;
  display:flex; align-items:center; justify-content:center;
  flex-shrink:0;
}
.back-btn:active{ background: var(--paper-dim); }

.primary-btn{
  background: var(--indigo);
  color: var(--paper);
  border: none;
  padding: 14px 20px;
  border-radius: var(--radius-m);
  font-weight: 700;
  font-size: 15.5px;
  letter-spacing: .02em;
  width: 100%;
  transition: transform .12s ease, opacity .12s ease;
}
.primary-btn:active{ transform: scale(.98); }
.primary-btn:disabled{ opacity:.35; }
.primary-btn--danger{ background: var(--red); }

.secondary-btn{
  background: var(--paper);
  border: 1.5px solid var(--indigo);
  color: var(--indigo);
  padding: 13px 20px;
  border-radius: var(--radius-m);
  font-weight: 700;
  font-size: 15px;
  width: 100%;
}
.secondary-btn:active{ background: var(--paper-dim); }

.ghost-btn{
  background: transparent;
  border: none;
  color: var(--ink-soft);
  padding: 12px 16px;
  font-size: 14.5px;
  width: 100%;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--rule-strong);
}

.link-btn{
  background:none; border:none; color: var(--ink-soft);
  font-size: 13px; text-decoration: underline;
  text-underline-offset: 2px; padding: 4px 0;
}

.section-label{
  display:flex; align-items:center; gap:10px;
  margin: 30px 20px 12px;
  font-family: var(--serif);
  font-weight: 700;
  font-size: 15px;
  color: var(--indigo-deep);
}
.section-label span{ white-space: nowrap; }
.section-label::after{
  content:"";
  flex:1;
  height:1px;
  background: repeating-linear-gradient(90deg, var(--rule-strong) 0 4px, transparent 4px 8px);
}

/* ============================================================
   HOME
   ============================================================ */
.home-hero{
  position: relative;
  padding: 38px 22px 26px;
  background:
    linear-gradient(180deg, #fff 0%, var(--paper) 100%);
  border-bottom: 1px solid var(--rule);
  overflow:hidden;
}
.home-hero__ruled{
  position:absolute; inset:0;
  background-image: repeating-linear-gradient(180deg, transparent 0 27px, var(--rule) 27px 28px);
  opacity:.55;
  mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent);
}
.home-hero__kicker{
  position:relative;
  font-size: 12.5px;
  color: var(--red);
  font-weight: 700;
  letter-spacing: .14em;
  margin-bottom: 10px;
  display:inline-block;
  padding: 3px 10px;
  border: 1.4px solid var(--red);
  border-radius: 999px;
  transform: rotate(-2deg);
}
.home-hero__title{
  position:relative;
  font-size: 40px;
  line-height: 1.15;
  color: var(--indigo-deep);
  font-weight: 700;
}
.home-hero__title-sub{
  display:block;
  font-size: 22px;
  color: var(--ink-soft);
  font-weight: 500;
  margin-top: 2px;
}
.home-hero__lead{
  position:relative;
  margin-top: 12px;
  color: var(--ink-soft);
  font-size: 14.5px;
  line-height: 1.7;
}

.home-stats{
  position:relative;
  display:flex; align-items:center;
  margin-top: 26px;
  background: #fff;
  border: 1px solid var(--rule);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-soft);
  padding: 16px 8px;
}
.home-stats__item{
  flex:1; display:flex; flex-direction:column; align-items:center; gap:2px;
}
.home-stats__num{
  font-family: var(--serif); font-weight:700; font-size:24px; color: var(--indigo-deep);
}
.home-stats__label{ font-size:11.5px; color: var(--ink-soft); }
.home-stats__div{ width:1px; height:32px; background: var(--rule); }

.home-body{ padding-bottom: 40px; }

.mode-grid{ padding: 0 20px; display:flex; flex-direction:column; gap:12px; }
.mode-card{
  display:flex; align-items:center; gap:16px;
  background:#fff;
  border: 1px solid var(--rule);
  border-radius: var(--radius-l);
  padding: 16px 18px;
  text-align:left;
  box-shadow: var(--shadow-soft);
  transition: transform .12s ease;
}
.mode-card:active{ transform: scale(.985); }
.mode-card--accent{
  background: var(--indigo-deep);
  border-color: var(--indigo-deep);
}
.mode-card--accent .mode-card__title,
.mode-card--accent .mode-card__desc{ color: var(--paper); }
.mode-card--accent .mode-card__desc{ opacity:.72; }
.mode-card--accent .mode-card__mark{
  background: var(--red);
  color:#fff;
}
.mode-card__mark{
  flex-shrink:0;
  width:46px; height:46px;
  border-radius:50%;
  background: var(--paper-dim);
  color: var(--indigo-deep);
  display:flex; align-items:center; justify-content:center;
  font-family: var(--serif); font-weight:700; font-size:15px;
  border: 1.5px solid var(--rule-strong);
}
.mode-card__text{ display:flex; flex-direction:column; gap:3px; min-width:0; }
.mode-card__title{ font-weight:700; font-size:15.5px; color: var(--ink); }
.mode-card__desc{ font-size:12.5px; color: var(--ink-soft); line-height:1.5; }

.genre-grid{
  padding: 0 20px;
  display:grid; grid-template-columns: 1fr 1fr; gap:10px;
}
.genre-card{
  background:#fff;
  border:1px solid var(--rule);
  border-radius: var(--radius-m);
  padding: 14px 14px 12px;
  text-align:left;
  display:flex; flex-direction:column; gap:8px;
  box-shadow: var(--shadow-soft);
}
.genre-card:active{ transform: scale(.98); }
.genre-card__icon{
  width:30px; height:30px; border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  font-size:14px; font-weight:700; font-family: var(--serif);
  color:#fff;
}
.genre-card__name{ font-weight:700; font-size:14px; color:var(--ink); }
.genre-card__count{ font-size:11.5px; color: var(--ink-soft); }

.history-panel{
  margin: 0 20px;
  background: #fff;
  border: 1px solid var(--rule);
  border-radius: var(--radius-l);
  padding: 16px 18px;
  box-shadow: var(--shadow-soft);
}
.history-empty{ font-size:13px; color: var(--ink-soft); text-align:center; padding: 6px 0; }
.history-bars{ display:flex; flex-direction:column; gap:10px; }
.history-bar-row{ display:flex; align-items:center; gap:10px; }
.history-bar-row__label{ width:64px; flex-shrink:0; font-size:12px; color:var(--ink-soft); }
.history-bar-row__track{ flex:1; height:8px; border-radius:4px; background: var(--paper-dim); overflow:hidden; }
.history-bar-row__fill{ height:100%; border-radius:4px; background: var(--indigo); }
.history-bar-row__pct{ width:34px; text-align:right; font-size:11.5px; color:var(--ink-soft); font-variant-numeric: tabular-nums; }

.home-footer{ margin: 26px 20px 0; }
.home-footer p{ font-size:11px; color:#8b8f96; line-height:1.7; text-align:center; }

/* ============================================================
   GENRE PICKER / SUB HEADER
   ============================================================ */
.sub-header{
  display:flex; align-items:center; gap:14px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--rule);
  background: var(--paper);
  position: sticky; top:0; z-index:5;
}
.sub-header h2{ font-size:17px; color: var(--indigo-deep); }

.genre-picker-body{ padding: 22px 20px; }
.genre-picker-desc{ color: var(--ink-soft); font-size: 13.5px; margin-bottom: 20px; line-height:1.7; }

.count-grid{ display:flex; flex-direction:column; gap:12px; }
.count-card{
  display:flex; align-items:center; justify-content:space-between;
  background:#fff; border:1px solid var(--rule); border-radius: var(--radius-l);
  padding: 18px 20px; box-shadow: var(--shadow-soft);
}
.count-card__label{ font-weight:700; font-size:15px; color:var(--ink); }
.count-card__sub{ font-size:12px; color: var(--ink-soft); margin-top:3px; }
.count-card__go{
  width:38px; height:38px; border-radius:50%;
  background: var(--indigo-deep); color:#fff;
  display:flex; align-items:center; justify-content:center; font-size:16px;
  flex-shrink:0;
}

/* ============================================================
   QUIZ
   ============================================================ */
.quiz-header{
  display:flex; align-items:center; gap:12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--rule);
  position: sticky; top:0; background: var(--paper); z-index:5;
}
.quiz-progress{ flex:1; display:flex; flex-direction:column; gap:5px; }
.quiz-progress__track{ height:5px; border-radius:3px; background: var(--paper-dim); overflow:hidden; }
.quiz-progress__fill{ height:100%; background: var(--red); border-radius:3px; transition: width .3s ease; width:0%; }
.quiz-progress__label{ font-size:11px; color: var(--ink-soft); font-variant-numeric: tabular-nums; }
.quiz-genre-tag{
  flex-shrink:0;
  font-size:11.5px; font-weight:700; color: var(--indigo);
  background: var(--paper-dim); border:1px solid var(--rule-strong);
  padding: 5px 10px; border-radius: 999px; white-space:nowrap;
}

.quiz-body{ padding: 20px 16px 190px; }

.worksheet__instruction{
  background: #EFEEEA;
  border-left: 4px solid var(--ink-soft);
  color: var(--ink);
  font-size: 13.5px;
  line-height: 1.8;
  padding: 12px 14px;
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  margin-bottom: 16px;
}

.worksheet__passage{
  background:#fff;
  border:1px solid var(--rule);
  border-radius: var(--radius-m);
  padding: 16px 16px;
  margin-bottom: 16px;
  font-family: var(--serif);
  font-size: 14px;
  line-height: 2;
  color: var(--ink);
  white-space: pre-line;
  max-height: 230px;
  overflow-y:auto;
  position:relative;
}
.worksheet__passage::before{
  content:"本文";
  position:absolute; top:-9px; left:12px;
  background: var(--paper); padding:0 8px;
  font-family: var(--sans); font-size:11px; font-weight:700; color: var(--ink-soft);
}

.worksheet__prompt{
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.85;
  color: var(--ink);
  padding: 4px 2px 20px;
  white-space: pre-line;
}
.worksheet__prompt u{ text-decoration-color: var(--red); text-decoration-thickness: 2px; text-underline-offset: 3px; }

.worksheet__choices{ display:flex; flex-direction:column; gap:10px; }

.choice{
  display:flex; align-items:flex-start; gap:12px;
  background:#fff;
  border: 1.5px solid var(--rule);
  border-radius: var(--radius-m);
  padding: 13px 14px;
  text-align:left;
  transition: border-color .12s ease, background .12s ease;
}
.choice:active{ background: var(--paper-dim); }
.choice__letter{
  flex-shrink:0;
  width:26px; height:26px; border-radius:50%;
  border: 1.5px solid var(--rule-strong);
  display:flex; align-items:center; justify-content:center;
  font-family: var(--serif); font-weight:700; font-size:12.5px;
  color: var(--ink-soft);
  margin-top:1px;
}
.choice__text{ font-size:14.5px; line-height:1.6; color: var(--ink); padding-top:2px; }

.choice.is-selected{ border-color: var(--indigo); background: #F2F4F8; }
.choice.is-selected .choice__letter{ background: var(--indigo); border-color: var(--indigo); color:#fff; }

.choice.is-correct{ border-color: var(--green); background: var(--green-wash); }
.choice.is-correct .choice__letter{ background: var(--green); border-color: var(--green); color:#fff; }
.choice.is-wrong{ border-color: var(--red); background: var(--red-wash); }
.choice.is-wrong .choice__letter{ background: var(--red); border-color: var(--red); color:#fff; }
.choice[disabled]{ opacity: .92; }

.worksheet__textinput input{
  width:100%;
  border: 1.5px solid var(--rule-strong);
  border-radius: var(--radius-m);
  padding: 14px 14px;
  font-size: 16px;
  color: var(--ink);
  background:#fff;
}
.worksheet__textinput input:focus{ outline:none; border-color: var(--indigo); }

.quiz-footer{
  position: fixed;
  bottom:0; left:50%; transform: translateX(-50%);
  width:100%; max-width:560px;
  background: var(--paper);
  border-top: 1px solid var(--rule);
  padding: 12px 16px calc(14px + env(safe-area-inset-bottom));
  z-index: 6;
}
.feedback-strip{
  display:flex; align-items:center; gap:10px;
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-m);
  animation: pop-in .22s ease;
}
@keyframes pop-in{ from{ opacity:0; transform: scale(.92);} to{ opacity:1; transform:none; } }
.feedback-strip.is-correct{ background: var(--green-wash); }
.feedback-strip.is-wrong{ background: var(--red-wash); }
.feedback-mark{
  font-family: var(--serif); font-weight:700; font-size: 22px; flex-shrink:0;
}
.feedback-strip.is-correct .feedback-mark{ color: var(--green); }
.feedback-strip.is-wrong .feedback-mark{ color: var(--red); }
.feedback-text{ font-size:13px; line-height:1.6; color: var(--ink); }

/* ============================================================
   RESULT
   ============================================================ */
.result-body{ padding: 44px 24px 40px; text-align:center; }
.result-ring-wrap{ position:relative; width:150px; height:150px; margin: 0 auto 22px; }
.result-ring{ width:100%; height:100%; transform: rotate(-90deg); }
.result-ring__bg{ fill:none; stroke: var(--paper-dim); stroke-width:10; }
.result-ring__fg{ fill:none; stroke: var(--red); stroke-width:10; stroke-linecap:round;
  stroke-dasharray: 327; stroke-dashoffset: 327; transition: stroke-dashoffset 1s ease .1s; }
.result-ring__center{
  position:absolute; inset:0; display:flex; align-items:baseline; justify-content:center; gap:3px;
  font-family: var(--serif);
}
.result-ring__score{ font-size:38px; font-weight:700; color: var(--indigo-deep); }
.result-ring__slash{ font-size:18px; color: var(--ink-soft); }
.result-ring__max{ font-size:18px; color: var(--ink-soft); }

.result-headline{ font-family: var(--serif); font-size:20px; font-weight:700; color: var(--ink); margin-bottom:6px; }
.result-sub{ font-size:13.5px; color: var(--ink-soft); line-height:1.7; }

.result-genre-breakdown{ margin-top:28px; display:flex; flex-direction:column; gap:10px; text-align:left; }

.result-actions{ margin-top:30px; display:flex; flex-direction:column; gap:10px; }

/* ============================================================
   REVIEW
   ============================================================ */
.review-list{ padding: 16px 16px 100px; display:flex; flex-direction:column; gap:14px; }
.review-item{
  background:#fff; border:1px solid var(--rule); border-radius: var(--radius-l);
  padding:16px; box-shadow: var(--shadow-soft);
}
.review-item__top{ display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.review-item__badge{
  font-size:11px; font-weight:700; padding:3px 9px; border-radius:999px;
}
.review-item__badge.correct{ background: var(--green-wash); color: var(--green); }
.review-item__badge.wrong{ background: var(--red-wash); color: var(--red); }
.review-item__genre{ font-size:11px; color: var(--ink-soft); }
.review-item__prompt{ font-family: var(--serif); font-size:14.5px; line-height:1.7; margin-bottom:10px; white-space:pre-line; }
.review-item__row{ font-size:13px; line-height:1.8; padding:3px 0; }
.review-item__row b{ font-weight:700; }
.review-item__your{ color: var(--red); }
.review-item__correct{ color: var(--green); }
.review-footer{ position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:560px;
  background: var(--paper); border-top:1px solid var(--rule); padding: 10px 16px calc(12px + env(safe-area-inset-bottom)); }

/* ============================================================
   DIALOG
   ============================================================ */
.dialog-overlay{
  position: fixed; inset:0; background: rgba(20,22,26,.45);
  display:flex; align-items:center; justify-content:center; z-index:50;
  padding: 20px;
}
.dialog{
  background:#fff; border-radius: var(--radius-l); padding:22px 20px; max-width:340px; width:100%;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
}
.dialog__text{ font-size:14px; line-height:1.7; color: var(--ink); margin-bottom:18px; }
.dialog__actions{ display:flex; flex-direction:column; gap:8px; }

/* utility */
[hidden]{ display:none !important; }

@media (min-width: 561px){
  body{ background: var(--paper-dim); }
  .app{ min-height: 100dvh; }
}
