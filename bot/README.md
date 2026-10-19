# VFX AI MINI Bot Backend

This directory contains the persistent WhatsApp/Baileys backend used by the Vercel pairing portal.

Deploy this folder as the service root on Koyeb or Render:
- Build: `npm install`
- Start: `npm start`

After deployment, copy the service's public base URL into the Vercel project's `BOT_API_URL` environment variable. Do not include `/health` or `/pair` in the value.

The backend must stay running to maintain the WhatsApp socket. Protect the `session` directory as a secret; never commit session credentials.
