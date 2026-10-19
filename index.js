const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    name: 'VFX AI MINI',
    service: 'website',
    message: 'Website is online. WhatsApp bot runtime must run on a persistent Node.js host.'
  });
});

app.get('/health', (_req, res) => res.redirect(307, '/api/health'));

app.get('*', (_req, res) => {
  res.status(200).type('html').send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#070b14">
<title>VFX AI MINI</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#070b14;color:#f8fafc;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;overflow:hidden}
body:before,body:after{content:"";position:fixed;width:280px;height:280px;border-radius:50%;filter:blur(110px);opacity:.22;pointer-events:none}body:before{background:#06b6d4;top:-70px;left:-60px}body:after{background:#7c3aed;right:-60px;bottom:-80px}
main{position:relative;width:min(100%,520px);padding:clamp(26px,7vw,46px);border:1px solid #38bdf844;border-radius:30px;background:linear-gradient(145deg,#111827ed,#0b1220f5);box-shadow:0 30px 100px #0008,0 0 55px #0891b222;text-align:center}
.logo{display:inline-flex;align-items:center;gap:9px;padding:10px 15px;border:1px solid #38bdf866;border-radius:99px;background:#0ea5e91a;color:#7dd3fc;font-weight:900;letter-spacing:1.5px;font-size:12px}
.status{margin:28px 0 12px;color:#86efac;font-size:11px;letter-spacing:2px;font-weight:800}.status:before{content:"";display:inline-block;width:7px;height:7px;margin-right:9px;border-radius:50%;background:#4ade80;box-shadow:0 0 12px #4ade80}
h1{margin:0;font-size:clamp(36px,9vw,58px);letter-spacing:-2px;line-height:1.05}h1 span{color:#38bdf8}.lead{color:#a5b4c8;line-height:1.8;font-size:14px;max-width:370px;margin:18px auto 26px}
.pills{display:flex;justify-content:center;gap:8px;flex-wrap:wrap}.pill{padding:9px 12px;border-radius:99px;border:1px solid #334155;background:#0b1423;color:#cbd5e1;font-size:11px}
a{display:inline-block;margin-top:27px;padding:14px 20px;border-radius:13px;background:linear-gradient(110deg,#0284c7,#4f46e5);color:white;text-decoration:none;font-weight:800;font-size:13px;box-shadow:0 10px 28px #2563eb33}
footer{margin-top:26px;color:#64748b;font-size:10px;letter-spacing:1.4px}
</style>
</head>
<body><main>
<div class="logo">✦ VFX AI MINI</div>
<div class="status">WEBSITE ONLINE</div>
<h1>Smart. Fast.<br><span>VFX AI MINI.</span></h1>
<p class="lead">A clean home for your AI and WhatsApp bot project. The website runs on Vercel; the WhatsApp bot needs a separate persistent Node.js host.</p>
<div class="pills"><span class="pill">⚡ Neon Interface</span><span class="pill">🤖 AI Bot Project</span><span class="pill">🔒 Secure Setup</span></div>
<a href="/api/health">Check System Status ↗</a>
<footer>VFX AI MINI · POWERED BY SOURajit VFX</footer>
</main></body></html>`);
});

module.exports = app;
