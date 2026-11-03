// script.js - dynamic statistics, live regex validation, AJAX form submission, comments
const SAMPLE = { cases: 45000000, recovered: 44400000, deaths: 530000, active: 1500 };

async function loadStats() {
  let data = SAMPLE, label = '(sample data - API unreachable)';
  try {
    const r = await fetch('https://disease.sh/v3/covid-19/countries/india');
    if (r.ok) { data = await r.json(); label = '(live: disease.sh API)'; }
  } catch (e) { /* keep sample data */ }
  document.getElementById('source').textContent = label;
  const items = [['Total Cases', data.cases, ''], ['Recovered', data.recovered, 'green'],
                 ['Deaths', data.deaths, 'red'], ['Active', data.active, '']];
  document.getElementById('cards').innerHTML = items.map(([t, v, c]) =>
    `<div class="card ${c}"><span>${t}</span><strong>${Number(v).toLocaleString('en-IN')}</strong></div>`).join('');
}

// Live validation: compare input value with the regex named in data-rule
function check(el) {
  const ok = Validators[el.dataset.rule].test(el.value.trim());
  el.classList.toggle('bad', !ok);
  el.classList.toggle('good', ok);
  return ok;
}
document.querySelectorAll('[data-rule]').forEach(el => el.addEventListener('input', () => check(el)));

function say(form, text, ok) {
  const m = form.querySelector('.msg'); m.textContent = text; m.className = 'msg ' + (ok ? 'ok' : 'fail');
}

async function submitForm(form, url, after) {
  const fields = [...form.querySelectorAll('[data-rule]')];
  if (!fields.map(check).every(Boolean)) { say(form, 'Please correct the highlighted fields.', false); return; }
  try {
    const res = await fetch(url, { method: 'POST', body: new URLSearchParams(new FormData(form)) });
    const data = await res.json();
    say(form, data.message || data.error || 'Done', data.ok);
    if (data.ok) { form.reset(); fields.forEach(f => f.classList.remove('good')); if (after) after(); }
  } catch (e) { say(form, 'Server not reachable.', false); }
}

async function loadComments() {
  const list = document.getElementById('commentList');
  try {
    const rows = await (await fetch('comment.php')).json();
    list.innerHTML = rows.length ? rows.map(r =>
      `<li><b>${esc(r.username)}</b> <small>${esc(r.created_at)}</small><br>${esc(r.comment)}</li>`).join('')
      : '<li>No comments yet.</li>';
  } catch (e) { list.innerHTML = '<li>Comments unavailable (server not reachable).</li>'; }
}
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

[['signupForm','register.php'], ['loginForm','login.php'],
 ['vaccineForm','vaccine.php'], ['commentForm','comment.php']].forEach(([id, url]) => {
  const f = document.getElementById(id);
  f.addEventListener('submit', e => { e.preventDefault(); submitForm(f, url, id === 'commentForm' ? loadComments : null); });
});

loadStats(); loadComments();
