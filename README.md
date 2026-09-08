# ThynkDebtTrack Demo v2

Static clickable prototype for the ThynkDebtTrack client journey platform.

## Demo routes

- Public landing page: `/`
- Client Journey Portal: `/portal/`
- Debt Counsellor Portal: `/dc/`
- Thynkverse Super Admin: `/control/`
- Legacy admin redirect: `/admin/`

## Demo access

### Client
Use the demo client link `/portal/?t=demo-sipho-8f13` and ID number `8501015000081`.

### Debt Counsellor
Open `/dc/` and use demo password `admin`.

### Thynkverse Super Admin
Open `/control/` and use demo password `control`.

## Important

This repository currently contains a visual/demo prototype only. It uses browser-side demo data and must not be used for real client ID numbers or production Debt Review data yet.

The production version will use Supabase authentication, tenant isolation/RLS, secure invitation tokens, audit logs and the client journey/status workflow.

## Vercel

Import this repository into Vercel using **Other** as the framework preset. No build command or output directory is required for this static version.

Planned custom domain: `debttrack.thynkverse.co.za`.
