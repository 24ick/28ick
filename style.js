/* ============================================================
   SPI言語対策 — style.css
   コンセプト: 採点済み答案用紙のデジタル版。
   赤ペンの丸（一発だけの大きな仕草）＋ 生成り紙にインク一色の
   静かなタイポグラフィ。カードの羅列にしない。
   ============================================================ */

:root{
  --ink:          #1B1B1E;
  --ink-soft:     #4E4C45;
  --ink-faint:    #83816F;
  --paper:        #EDE8DC;
  --paper-deep:   #E3DDCD;
  --sheet:        #FFFFFF;
  --line:         #E4DFCE;
  --line-strong:  #948C6E;
  --indigo:       #33405C;
  --red:          #BC3B2C;
  --red-soft:     #E8CFC7;
  --green:        #34664A;
  --green-soft:   #CFDCCB;
  --gold:         #A9822F;

  --radius-s: 3px;
  --radius-m: 8px;
  --radius-l: 14px;

  --serif: 'Shippori Mincho', serif;
  --sans: 'Zen Kaku Gothic New', sans-serif;

  --shadow-sheet: 0 1px 1px rgba(27,27,30,.03), 0 10px 24px -12px rgba(27,27,30,.18);
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
button{ font-family: var(--sans); cursor:pointer; background:none; border:none; color:inherit; }
input{ font-family: var(--sans); }
::selection{ background: #E6D9B8; }

@media (prefers-reduced-motion: reduce){
  *{ animation-duration: .001ms !important; transition-duration: .001ms !important; }
}

.app{
  max-width: 560px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--paper);
  position: relative;
}

.view{ animation: fade-in .3s ease; }
@keyframes fade-in{ from{ opacity:0; } to{ opacity:1; } }

/* ---------------- primitives ---------------- */

/* "sheet": the one container device used everywhere instead of
   stacks of identical shadowed cards. Rows inside are divided by
   hairlines; only the sheet itself carries elevation. */
.sheet{
  margin: 0 20px;
  background: var(--sheet);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-sheet);
  overflow: hidden;
}
.sheet--pad{ padding: 18px 20px; }

.row{
  display:flex; align-items:center; gap:14px;
  width:100%;
  padding: 18px 20px;
  text-align:left;
  border-bottom: 1px solid var(--line);
  transition: background .12s ease;
}
.row:last-child{ border-bottom:none; }
.row:active{ background: var(--paper-deep); }

.row--mode .row__main{ display:flex; flex-direction:column; gap:4px; flex:1; min-width:0; }
.row__title{ font-family: var(--serif); font-weight:700; font-size:16px; color: var(--ink); }
.row__desc{ font-size:13.5px; color: var(--ink-soft); line-height:1.55; }
.row__meta{
  flex-shrink:0;
  font-family: var(--serif); font-size:14px; color: var(--ink-faint);
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  padding: 4px 11px;
}
.row__meta--red{ color: var(--red); border-color: var(--red-soft); background: #FBF2EF; }

.row--genre{ gap:0; padding-left:0; }
.row--genre .row__tab{
  flex-shrink:0; align-self:stretch;
  width:5px; margin-right:17px;
}
.row--genre .row__main{ flex:1; min-width:0; padding: 18px 0; display:flex; flex-direction:column; gap:3px; }
.row--genre .row__title{ font-size:16px; }
.row--genre .row__desc{ font-size:13px; }
.row--genre .row__meta{ margin-right:20px; border:none; padding:0; font-size:13.5px; color: var(--ink-soft); }

.link-btn{
  background:none; border:none; color: var(--ink-soft);
  font-size: 14px; text-decoration: underline;
  text-underline-offset: 2px; padding: 10px 0 0;
}

.primary-btn{
  background: var(--ink);
  color: var(--sheet);
  padding: 18px 20px;
  border-radius: var(--radius-m);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: .02em;
  width: 100%;
  transition: transform .12s ease, opacity .12s ease;
}
.primary-btn:active{ transform: scale(.98); }
.primary-btn:disabled{ opacity:.3; }
.primary-btn--danger{ background: var(--red); }

.secondary-btn{
  background: var(--sheet);
  border: 1.5px solid var(--ink);
  color: var(--ink);
  padding: 14px 20px;
  border-radius: var(--radius-m);
  font-weight: 700;
  font-size: 15px;
  width: 100%;
}
.secondary-btn:active{ background: var(--paper-deep); }

.ghost-btn{
  color: var(--ink-soft);
  padding: 12px 16px;
  font-size: 14px;
  width: 100%;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--line-strong);
}

.back-btn{
  width:34px; height:34px; border-radius:50%;
  border:1px solid var(--line-strong);
  background: var(--sheet);
  color: var(--ink);
  font-size: 17px;
  display:flex; align-items:center; justify-content:center;
  flex-shrink:0;
}
.back-btn:active{ background: var(--paper-deep); }

.section-label{
  margin: 34px 20px 12px;
  font-family: var(--serif);
  font-weight: 700;
  font-size: 14.5px;
  color: var(--ink);
  padding-left: 12px;
  border-left: 2px solid var(--red);
}

/* ============================================================
   HOME
   ============================================================ */
.home-hero{
  position: relative;
  padding: 40px 24px 30px;
  background: var(--paper);
  overflow:hidden;
}
.home-hero__grain{
  position:absolute; inset:0;
  opacity:.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events:none;
}

.home-hero__title-mark{
  position:relative;
  display:inline-block;
}
.mark-svg{
  position:absolute;
  left:-16%; right:-16%; top:-42%; bottom:-42%;
  width:132%; height:184%;
  overflow:visible;
  pointer-events:none;
}
.mark-svg__circle{
  fill:none;
  stroke: var(--red);
  stroke-width: 2.2;
  stroke-linecap: round;
  opacity: .88;
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: draw-circle 1s cubic-bezier(.65,0,.35,1) .3s forwards;
}
@keyframes draw-circle{ to{ stroke-dashoffset: 0; } }

.home-hero__label{
  position:relative;
  font-size: 12px;
  color: var(--ink-soft);
  font-family: var(--serif);
  margin-bottom: 14px;
}
.home-hero__title{
  position:relative;
  font-size: 46px;
  line-height: 1.08;
  color: var(--ink);
  font-weight: 700;
  letter-spacing: .01em;
}
.home-hero__lead{
  position:relative;
  margin-top: 16px;
  color: var(--ink-soft);
  font-size: 15.5px;
  line-height: 1.7;
  max-width: 30ch;
}

.home-stats{
  position:relative;
  display:flex;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--line-strong);
}
.home-stats__item{
  flex:1;
  display:flex; flex-direction:column; gap:3px;
  padding-right: 14px;
}
.home-stats__num{
  font-family: var(--serif); font-weight:700; font-size:26px; color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.home-stats__label{ font-size:12.5px; color: var(--ink-soft); }

.home-body{ padding-bottom: 44px; }

.history-empty{ font-size:14.5px; color: var(--ink-soft); text-align:center; padding: 4px 0; }
.history-bars{ display:flex; flex-direction:column; gap:14px; }
.history-bar-row{ display:flex; align-items:center; gap:12px; }
.history-bar-row__label{ width:66px; flex-shrink:0; font-size:13.5px; color:var(--ink-soft); font-family: var(--serif); }
.history-bar-row__track{ flex:1; height:2px; background: var(--line); position:relative; }
.history-bar-row__fill{ position:absolute; left:0; top:-2px; height:2px; background: var(--ink); }
.history-bar-row__fill::after{
  content:""; position:absolute; right:-3px; top:-3px; width:7px; height:7px; border-radius:50%; background: var(--red);
}
.history-bar-row__pct{ width:36px; text-align:right; font-size:13px; color:var(--ink-soft); font-variant-numeric: tabular-nums; }

.home-footer{ margin: 30px 20px 0; }
.home-footer p{ font-size:12px; color: var(--ink-faint); line-height:1.7; text-align:center; }

/* ============================================================
   SUB HEADER / GENRE PICKER
   ============================================================ */
.sub-header{
  display:flex; align-items:center; gap:14px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
  position: sticky; top:0; z-index:5;
}
.sub-header h2{ font-size:17px; color: var(--ink); font-weight:700; }

.genre-picker-body{ padding: 24px 0 30px; }
.genre-picker-desc{ color: var(--ink-soft); font-size: 14.5px; margin: 0 20px 20px; line-height:1.7; }

.row--count{ justify-content:space-between; }
.row--count .row__label-wrap{ display:flex; flex-direction:column; gap:3px; }
.row--count .row__title{ font-size:16px; }
.row--count .row__desc{ font-size:13.5px; }
.row__go{
  width:30px; height:30px; border-radius:50%;
  border: 1px solid var(--line-strong);
  display:flex; align-items:center; justify-content:center; font-size:14px;
  color: var(--ink-soft);
  flex-shrink:0;
}

/* ============================================================
   QUIZ
   ============================================================ */
.quiz-header{
  display:flex; align-items:center; gap:12px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
  position: sticky; top:0; background: var(--paper); z-index:5;
}
.quiz-progress{ flex:1; display:flex; flex-direction:column; gap:6px; }
.quiz-progress__track{ height:2px; background: var(--line); position:relative; }
.quiz-progress__fill{ position:absolute; left:0; top:-1.5px; height:3px; background: var(--red); transition: width .3s ease; width:0%; }
.quiz-progress__label{ font-size:12.5px; color: var(--ink-soft); font-variant-numeric: tabular-nums; font-family: var(--serif); }
.quiz-genre-tag{
  flex-shrink:0;
  font-family: var(--serif);
  font-size:14px; color: var(--ink-soft);
  padding: 4px 2px; white-space:nowrap;
  border-bottom: 1.5px solid var(--red);
}

.quiz-body{ padding: 20px 14px 210px; }

.worksheet{
  background: var(--sheet);
  border: 1px solid var(--line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-sheet);
  padding: 26px 22px 8px;
}

.worksheet__instruction{
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.85;
  padding: 0 0 18px;
  border-bottom: 1px dashed var(--line-strong);
  margin-bottom: 20px;
}

.worksheet__passage{
  background: var(--paper);
  border:1px solid var(--line);
  border-radius: var(--radius-m);
  padding: 18px 16px;
  margin-bottom: 22px;
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.95;
  color: var(--ink);
  white-space: pre-line;
  max-height: 240px;
  overflow-y:auto;
  position:relative;
}
.worksheet__passage::before{
  content:"本文";
  position:sticky; top:0; float:right;
  background: var(--paper);
  margin: -18px -16px 8px 8px;
  padding: 6px 10px 4px;
  font-family: var(--sans); font-size:11.5px; font-weight:700; color: var(--ink-faint);
  border-bottom: 1px solid var(--line-strong);
}

.worksheet__prompt{
  font-family: var(--sans);
  font-weight: 700;
  font-size: 21px;
  line-height: 1.75;
  color: var(--ink);
  padding: 4px 0 26px;
  white-space: pre-line;
  letter-spacing: .01em;
}

.worksheet__choices{ display:flex; flex-direction:column; }

.choice{
  display:flex; align-items:center; gap:18px;
  width:100%;
  min-height: 34px;
  padding: 26px 6px;
  text-align:left;
  border-bottom: 1px solid var(--line);
  position:relative;
}
.choice:first-child{ border-top: 1px solid var(--line); }
.choice:active{ background: var(--paper-deep); }

.choice__letter{
  flex-shrink:0;
  width:40px; height:40px; border-radius:50%;
  border: 2px solid var(--line-strong);
  background: var(--sheet);
  display:flex; align-items:center; justify-content:center;
  font-family: var(--serif); font-weight:700; font-size:16px;
  color: var(--ink-soft);
  position:relative;
}
.choice__text{ font-size:19px; line-height:1.55; color: var(--ink); font-weight:600; }

.choice.is-selected .choice__letter{ background: var(--ink); border-color: var(--ink); color: var(--sheet); }
.choice.is-selected .choice__text{ color: var(--ink); font-weight:700; }

.choice.is-dim{ opacity: .42; }

.choice.is-correct .choice__letter{ border-color: var(--green); color: var(--green); background: var(--sheet); }
.choice.is-correct .choice__text{ color: var(--ink); font-weight:700; }
.choice.is-correct .choice__letter::after{
  content:"";
  position:absolute; inset:-7px;
  border: 2.2px solid var(--green);
  border-radius:50%;
  border-top-color: transparent;
  transform: rotate(-18deg);
}

.choice.is-wrong .choice__letter{ border-color: var(--red); color: var(--red); background: var(--sheet); }
.choice.is-wrong .choice__text{ text-decoration: line-through; text-decoration-color: var(--red); text-decoration-thickness: 1.6px; color: var(--ink-soft); font-weight:500; }

.worksheet__textinput{ padding-bottom: 14px; }
.worksheet__textinput input{
  width:100%;
  border: none;
  border-bottom: 2px solid var(--ink);
  border-radius: 0;
  background: none;
  padding: 12px 4px;
  font-size: 17px;
  font-family: var(--sans);
  font-weight: 700;
  color: var(--ink);
}
.worksheet__textinput input:focus{ outline:none; }
.worksheet__textinput input::placeholder{ font-family: var(--sans); color: var(--ink-faint); font-size:15px; }

.quiz-footer{
  position: fixed;
  bottom:0; left:50%; transform: translateX(-50%);
  width:100%; max-width:560px;
  background: var(--paper);
  border-top: 1px solid var(--line);
  padding: 14px 18px calc(16px + env(safe-area-inset-bottom));
  z-index: 6;
}
.feedback-strip{
  display:flex; align-items:center; gap:12px;
  margin-bottom: 12px;
  padding: 4px 2px 12px;
  border-bottom: 1px dashed var(--line-strong);
}
.feedback-mark{
  font-family: var(--serif); font-weight:700; font-size: 24px; flex-shrink:0;
  width:34px; height:34px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
}
.feedback-strip.is-correct .feedback-mark{ color: var(--green); }
.feedback-strip.is-wrong .feedback-mark{ color: var(--red); }
.feedback-text{ font-size:14px; line-height:1.65; color: var(--ink-soft); }
.feedback-text b{ color: var(--ink); font-weight:700; }

/* ============================================================
   RESULT
   ============================================================ */
.result-body{ padding: 50px 26px 40px; text-align:center; }
.result-ring-wrap{ position:relative; width:156px; height:156px; margin: 0 auto 26px; }
.result-ring{ width:100%; height:100%; transform: rotate(-90deg); }
.result-ring__bg{ fill:none; stroke: var(--line); stroke-width:1.4; }
.result-ring__fg{ fill:none; stroke: var(--red); stroke-width:2.4; stroke-linecap:round;
  stroke-dasharray: 327; stroke-dashoffset: 327; transition: stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1) .15s; }
.result-ring__center{
  position:absolute; inset:0; display:flex; align-items:baseline; justify-content:center; gap:4px;
  font-family: var(--serif);
}
.result-ring__score{ font-size:44px; font-weight:700; color: var(--ink); }
.result-ring__slash{ font-size:18px; color: var(--ink-faint); }
.result-ring__max{ font-size:18px; color: var(--ink-faint); }

.result-headline{ font-family: var(--serif); font-size:21px; font-weight:700; color: var(--ink); margin-bottom:8px; }
.result-sub{ font-size:14.5px; color: var(--ink-soft); line-height:1.7; }

.result-genre-breakdown{ margin-top:34px; display:flex; flex-direction:column; gap:14px; text-align:left; padding: 22px 22px 4px; background: var(--sheet); border:1px solid var(--line); border-radius: var(--radius-l); }

.result-actions{ margin-top:32px; display:flex; flex-direction:column; gap:10px; }

/* ============================================================
   REVIEW
   ============================================================ */
.review-list{ padding: 20px 18px 110px; display:flex; flex-direction:column; gap:0; }
.review-item{
  padding: 20px 2px;
  border-bottom: 1px solid var(--line);
}
.review-item:first-child{ border-top: 1px solid var(--line); }
.review-item__top{ display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.review-item__badge{
  font-size:12.5px; font-weight:700;
}
.review-item__badge.correct{ color: var(--green); }
.review-item__badge.wrong{ color: var(--red); }
.review-item__genre{ font-size:12.5px; color: var(--ink-faint); }
.review-item__prompt{ font-family: var(--sans); font-weight:700; font-size:16.5px; line-height:1.65; margin-bottom:10px; white-space:pre-line; }
.review-item__row{ font-size:14px; line-height:1.75; padding:2px 0; color: var(--ink-soft); }
.review-item__row b{ font-weight:700; color: var(--ink); }
.review-item__your{ color: var(--red); }
.review-item__correct{ color: var(--green); }
.review-footer{ position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:560px;
  background: var(--paper); border-top:1px solid var(--line); padding: 12px 18px calc(14px + env(safe-area-inset-bottom)); }

/* ============================================================
   DIALOG
   ============================================================ */
.dialog-overlay{
  position: fixed; inset:0; background: rgba(20,18,15,.5);
  display:flex; align-items:center; justify-content:center; z-index:50;
  padding: 20px;
}
.dialog{
  background: var(--sheet); border-radius: var(--radius-l); padding:24px 22px; max-width:340px; width:100%;
  box-shadow: 0 24px 60px rgba(0,0,0,.3);
  border: 1px solid var(--line);
}
.dialog__text{ font-size:16px; line-height:1.7; color: var(--ink); margin-bottom:20px; font-family: var(--serif); }
.dialog__actions{ display:flex; flex-direction:column; gap:8px; }

/* utility */
[hidden]{ display:none !important; }

@media (min-width: 561px){
  body{ background: var(--paper-deep); }
  .app{ min-height: 100dvh; box-shadow: 0 0 80px rgba(0,0,0,.08); }
}
