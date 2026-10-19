const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_API_URL = String(process.env.BOT_API_URL || '').replace(/\/$/, '');

app.disable('x-powered-by');
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  if (!BOT_API_URL) {
    return res.status(503).json({
      ok: false,
      name: 'VFX AI MINI',
      service: 'pairing-portal',
      message: 'Website is online. Set BOT_API_URL to your running Render bot service to enable pairing.'
    });
  }
  try {
    const upstream = await axios.get(BOT_API_URL + '/health', { timeout: 8000 });
    res.status(upstream.status).json({ ok: true, name: 'VFX AI MINI', backend: upstream.data });
  } catch (_) {
    res.status(502).json({ ok: false, name: 'VFX AI MINI', message: 'Bot backend is not reachable. Check Render service and BOT_API_URL.' });
  }
});

app.get('/pair', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!BOT_API_URL) {
    return res.status(503).json({ error: 'Pairing backend is not configured yet. Add BOT_API_URL in Vercel environment variables after deploying the bot on Render.' });
  }
  const number = String(req.query.number || '').replace(/\D/g, '');
  if (number.length < 8 || number.length > 15) {
    return res.status(400).json({ error: 'Enter a valid WhatsApp number with country code (8–15 digits).' });
  }
  try {
    const upstream = await axios.get(BOT_API_URL + '/pair', {
      params: { number },
      timeout: 25000,
      headers: { 'Cache-Control': 'no-store' }
    });
    res.status(upstream.status).json(upstream.data);
  } catch (err) {
    const status = err.response?.status || 502;
    const data = err.response?.data;
    res.status(status).json({
      error: data?.error || 'Could not reach the WhatsApp backend. Confirm the Render service is live and try again.'
    });
  }
});

app.get('*', (_req, res) => {
  res.status(200).type('html').send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070b14"><title>VFX AI MINI · WhatsApp Pairing</title>
<style>
:root{color-scheme:dark;--cyan:#38bdf8;--green:#4ade80;--muted:#94a3b8}*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:22px;background:#070b14;color:#f8fafc;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;overflow-x:hidden}
body:before,body:after{content:"";position:fixed;width:290px;height:290px;border-radius:50%;filter:blur(110px);opacity:.22;pointer-events:none;z-index:-1}body:before{background:#06b6d4;top:-80px;left:-70px}body:after{background:#7c3aed;right:-70px;bottom:-80px}
main{width:min(100%,470px);padding:clamp(24px,6vw,36px);border:1px solid #38bdf844;border-radius:28px;background:linear-gradient(145deg,#111827f5,#0b1220f5);box-shadow:0 30px 100px #0008,0 0 55px #0891b222}
.brand{text-align:center}.logo{display:inline-flex;padding:10px 15px;border:1px solid #38bdf866;border-radius:99px;background:#0ea5e91a;color:#7dd3fc;font-weight:900;letter-spacing:1.5px;font-size:12px}
.status{text-align:center;margin:23px 0 10px;color:#86efac;font-size:10px;letter-spacing:2px;font-weight:900}.status:before{content:"";display:inline-block;width:7px;height:7px;margin-right:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 12px #4ade80}
h1{text-align:center;margin:0;font-size:clamp(29px,8vw,38px);letter-spacing:-1.2px}h1 span{color:var(--cyan)}.lead{text-align:center;color:var(--muted);line-height:1.75;font-size:13px;margin:12px auto 25px;max-width:340px}
label{display:block;margin:0 0 8px 3px;color:#cbd5e1;font-size:12px;font-weight:800}input{width:100%;padding:15px;border-radius:13px;border:1px solid #334155;background:#081323;color:white;font-size:16px;text-align:center;outline:none}input:focus{border-color:var(--cyan);box-shadow:0 0 0 3px #38bdf81c}
.hint{margin:8px 0 17px 3px;color:#64748b;font-size:11px}button{width:100%;border:0;border-radius:13px;padding:15px;background:linear-gradient(110deg,#0369a1,#4f46e5,#0ea5e9);color:white;font-size:14px;font-weight:900;cursor:pointer;box-shadow:0 9px 25px #0284c73d}button:disabled{opacity:.6;cursor:wait}
.error{display:none;margin-top:13px;padding:12px;border:1px solid #f8717155;border-radius:12px;background:#7f1d1d30;color:#fecaca;font-size:12px;line-height:1.6}
.code{display:none;margin-top:16px;padding:17px;border:1px dashed #4ade8080;border-radius:15px;background:#081323;text-align:center}.code small{display:block;color:#7dd3fc;font-size:10px;font-weight:900;letter-spacing:1.5px;margin-bottom:10px}#pairCode{font-size:28px;color:#4ade80;letter-spacing:5px;cursor:pointer;overflow-wrap:anywhere}.code p{color:var(--muted);font-size:11px;line-height:1.6}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:20px}.step{padding:11px 7px;border:1px solid #334155;border-radius:12px;background:#0b1423}.step b{display:block;color:#7dd3fc;font-size:10px;margin-bottom:5px}.step span{display:block;color:#94a3b8;font-size:10px;line-height:1.5}
#backendStatus{text-align:center;margin-top:18px;color:#94a3b8;font-size:11px;line-height:1.5}footer{text-align:center;margin-top:21px;color:#64748b;font-size:10px;letter-spacing:1.2px}
</style></head><body><main>
<div class="brand"><div class="logo">✦ VFX AI MINI</div></div>
<div class="status">WHATSAPP LINKING PORTAL</div><h1>Pair your <span>device.</span></h1>
<p class="lead">Generate a secure pairing code and link your WhatsApp as a companion device.</p>
<label for="phone">WhatsApp number with country code</label>
<input id="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="Example: 91XXXXXXXXXX">
<div class="hint">Digits only · Include country calling code · 8–15 digits</div>
<button id="pairButton" type="button">⚡ Generate pairing code</button>
<div id="error" class="error" role="alert"></div>
<div id="codeBox" class="code" aria-live="polite"><small>YOUR PAIRING CODE · TAP TO COPY</small><div id="pairCode">--------</div><p>WhatsApp → Linked devices → Link a device → Link with phone number instead.</p></div>
<div class="steps"><div class="step"><b>01 / NUMBER</b><span>Enter full number</span></div><div class="step"><b>02 / CODE</b><span>Generate code</span></div><div class="step"><b>03 / LINK</b><span>Enter in WhatsApp</span></div></div>
<div id="backendStatus">Checking backend status…</div><footer>VFX AI MINI · POWERED BY SOURAJIT VFX</footer>
</main>
<script>
const input=document.getElementById('phone'),btn=document.getElementById('pairButton'),errorBox=document.getElementById('error'),codeBox=document.getElementById('codeBox'),code=document.getElementById('pairCode'),statusBox=document.getElementById('backendStatus');
async function checkHealth(){try{const r=await fetch('/api/health',{cache:'no-store'}),d=await r.json();statusBox.textContent=d.ok?'🟢 Bot backend connected':'🟠 Website online · '+(d.message||'Bot backend needs configuration')}catch(_){statusBox.textContent='🟠 Backend status unavailable'}}
checkHealth();
btn.addEventListener('click',async()=>{const number=input.value.trim().replace(/\D/g,'');errorBox.style.display='none';codeBox.style.display='none';if(number.length<8||number.length>15){errorBox.textContent='Enter a valid number with country code (8–15 digits).';errorBox.style.display='block';return}btn.disabled=true;btn.textContent='⏳ Requesting code…';try{const r=await fetch('/pair?number='+encodeURIComponent(number),{cache:'no-store',headers:{Accept:'application/json'}});const d=await r.json();if(!r.ok||!d.code)throw new Error(d.error||'Pairing failed. Check the backend and try again.');code.textContent=d.code;codeBox.style.display='block'}catch(e){errorBox.textContent=e.message||'Connection failed. Please retry.';errorBox.style.display='block'}finally{btn.disabled=false;btn.textContent='⚡ Generate pairing code'}});
code.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.textContent);statusBox.textContent='✅ Pairing code copied'}catch(_){statusBox.textContent='Select and copy the pairing code manually'}});
</script></body></html>`);
});

module.exports = app;
