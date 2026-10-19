# VFX AI MINI

Neon mobile-friendly WhatsApp pairing portal. This repository contains the **website frontend/proxy**; it does not run the persistent WhatsApp/Baileys bot itself.

## Deploy the website

1. Import this repository into Vercel and deploy the `main` branch.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `BOT_API_URL` = the public base URL of your running bot service, for example `https://your-service.koyeb.app` (no trailing slash).
3. Redeploy after saving the variable.
4. Open `/api/health`. A successful response confirms the website can reach the bot service.

## Bot backend (required for real pairing codes)

Deploy the `RAHUL-AI-MINI` Node.js/Baileys bot as a persistent web service on a host such as Koyeb or Render. The backend must expose:

- `GET /health` — returns a successful JSON health response.
- `GET /pair?number=COUNTRYCODEPHONENUMBER` — returns JSON containing `code` when pairing-code generation succeeds.

The bot service must keep the WhatsApp socket running and persist its session/auth files. Vercel serverless functions cannot keep the Baileys socket alive or persist its session directory, so this website cannot generate a real pairing code by itself.

## Troubleshooting

- `Set BOT_API_URL...`: the environment variable is missing from Vercel.
- `Bot backend is not reachable`: check the bot service is deployed/running and that `BOT_API_URL` is the exact public base URL.
- Pairing code fails: inspect the bot host's runtime logs. Do not expose WhatsApp session files or credentials publicly.
