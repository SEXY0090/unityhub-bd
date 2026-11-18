# UnityHub BD

A deployable Next.js + Supabase foundation for a public developer identity and portfolio platform.

## Included
- Premium responsive landing page
- Email/password registration and login (Supabase Auth)
- Authenticated developer dashboard
- Public profile editor
- Public portfolio route: `/u/username`
- GitHub-backed verification registry integration
- Automatic Developer ID assignment by database trigger
- Row Level Security SQL

## 1. Create Supabase project
Create a project at https://supabase.com. In **SQL Editor**, run `supabase/schema.sql`.

In **Authentication → URL Configuration**, add:
- Site URL: your deployed site URL
- Redirect URL: `http://localhost:3000/**` and your deployed domain `/**`

Project URL and Publishable key are prefilled in `.env.local` for the supplied Supabase project. For Vercel, add these as Environment Variables manually. Never use a secret/service-role key in the browser.

## 2. Configure environment
Copy `.env.example` to `.env.local` and fill:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

Do not put the Supabase service-role key in any `NEXT_PUBLIC_` variable or browser code.

## 3. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## 4. Deploy to Vercel
Push this folder to a GitHub repository, import it in https://vercel.com/new, and add the same environment variables in Vercel → Project Settings → Environment Variables. Deploy.

## 5. Verification
The app reads:
`https://raw.githubusercontent.com/SEXY0090/LOL/refs/heads/main/Verified`

Expected format:
```json
{
  "verified": [
    {
      "username": "meithun",
      "name": "Meithun Hossain",
      "developerId": "UHB-2026-00001",
      "status": "verified"
    }
  ]
}
```
A badge is shown only when username matches and status is exactly `verified`. Keep write access to this registry restricted to trusted administrators.

## Important production notes
- This is the first deployable MVP foundation, not a fully audited production service.
- Add email rate limits, CAPTCHA, username reservation checks, project CRUD, image storage, admin-only verification management, moderation/reporting, backups and monitoring before broad public launch.
- Public profile data is intentionally readable. Authenticated users can only insert/update their own profile due to RLS.
- User portfolio content is text/link based in this MVP; project cards and media upload can be added next.
