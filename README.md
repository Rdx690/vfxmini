# VFX AI MINI — All-in-one repository

This repository contains both parts of the project:

- `/` — Vercel pairing website and API proxy.
- `/bot` — persistent Node.js + Baileys WhatsApp bot backend.

## Important hosting detail

The files are together in one GitHub repository, but the two processes must be deployed as separate services. Vercel serverless functions cannot keep a Baileys WhatsApp socket alive or reliably store the bot's session directory.

## 1. Deploy the website on Vercel

Import this repository into Vercel and deploy the `main` branch with the project root set to `/`.

In Vercel → Project → Settings → Environment Variables, set:

- Key: `BOT_API_URL`
- Value: the public base URL of the bot service (no trailing slash), e.g. `https://your-bot-service.koyeb.app`

Redeploy after adding the variable. Test `https://YOUR-VERCEL-DOMAIN/api/health`.

## 2. Deploy the bot from this same repository

Create a Node.js web service on Koyeb or Render connected to this same repository. Set the service's **root directory / working directory** to `bot`.

- Build command: `npm install`
- Start command: `npm start`
- Port: use the platform-provided `PORT` environment variable.
- Keep the service running as a persistent web process.
- Configure persistent storage for the `bot/session` directory if the host supports it; otherwise a restart may require pairing again.

The bot exposes `GET /health` and `GET /pair?number=COUNTRYCODEPHONENUMBER`. The website forwards pairing requests to these endpoints.

## Troubleshooting

- Website says `BOT_API_URL` is missing: add it in Vercel and redeploy.
- `/api/health` fails: confirm the bot service is deployed and its public URL is correct.
- Pairing code fails: inspect the bot host logs and verify the WhatsApp socket is running.
- Do not upload or share the `session` directory; it contains account authentication credentials.
