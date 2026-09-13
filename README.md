# GreenGrow

React + Firebase implementation of the GreenGrow app: a public homepage,
sign up / login, then dashboard, topics/lessons/quizzes, leaderboard,
progress tracking, community feed, and a rule-based AI advisor — fully
in English, Hindi, and Marathi. Responsive throughout: sidebar nav on
desktop, bottom tab bar on mobile, same codebase for both.

## Routing

- `/` — public homepage (marketing/intro + Sign Up / Login)
- `/login`, `/signup` — public auth pages
- `/dashboard` and everything under it (`/dashboard/topics`,
  `/dashboard/advisor`, `/dashboard/leaderboard`, `/dashboard/progress`,
  `/dashboard/community`, `/dashboard/profile`) — the authenticated app

Visiting `/`, `/login`, or `/signup` while already signed in redirects
straight to `/dashboard` (see `RedirectIfAuthed.jsx`); visiting anything
under `/dashboard` while signed out redirects to `/login`
(`ProtectedRoute.jsx`).

## 1. Create the Firebase project (free — no card needed)

1. Go to https://console.firebase.google.com → **Add project** → name it
   `greengrow` (or anything) → you can skip Google Analytics.
2. Once created, stay on the **Spark plan** (it's selected by default —
   don't click "Upgrade").
3. In the left sidebar: **Build → Authentication → Get started** →
   enable the **Email/Password** sign-in provider.
4. In the left sidebar: **Build → Firestore Database → Create database**
   → start in **production mode** → pick a region close to your users.
5. In the left sidebar: **Project settings** (gear icon) → scroll to
   **Your apps** → click the **</>** (web) icon → register an app
   (nickname anything, skip Hosting setup here) → copy the `firebaseConfig`
   values shown.

## 2. Configure the project locally

```bash
npm install
cp .env.example .env
```

Paste the values from step 1.5 into `.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 3. Deploy Firestore security rules

The rules in `firestore.rules` stop other users from editing your points
or impersonating you in posts — deploy them before you go live:

```bash
npm install -g firebase-tools   # one-time
firebase login
firebase use --add               # pick the project you created, alias "default"
firebase deploy --only firestore:rules
```

## 4. Run it

```bash
npm run dev
```

Open the printed local URL. Sign up, and a `users/{uid}` document is
created for you automatically in Firestore (check the Firestore console
to see it appear).

## 5. Deploy to Firebase Hosting (free, on Spark)

```bash
firebase init hosting   # if you skipped it above; point "public" dir to "dist"
npm run build
firebase deploy --only hosting
```

You'll get a live `https://<project-id>.web.app` URL — works on desktop
and mobile out of the box since the layout is responsive.

## Staying on the free (Spark) plan

- **No Cloud Storage, no Cloud Functions** are used anywhere in this app
  — both now require the paid Blaze plan (Storage since Feb 2026).
  Avatars use initials instead of uploaded photos for that reason.
- **Firestore reads** are the thing to watch: Spark gives you 50,000
  reads/day. `fetchLeaderboard()` and `fetchCommunityPosts()` both cap
  their queries with `limit()` — don't remove that cap.
- If you outgrow Spark, Firebase will simply stop serving requests for
  the day rather than silently charge you — nothing bills you
  unexpectedly unless you manually upgrade to Blaze.

## Language switcher (English / Hindi / Marathi)

Every screen is translated — Homepage, Login, Signup, the top bar, both
nav layouts, Dashboard, Topics, Quiz, Leaderboard, Progress, Community,
AI Advisor, and Profile. `src/i18n/translations.js` holds one flat
key → string dictionary per language; `src/i18n/LanguageContext.jsx`
exposes the current language, `setLanguage()`, and a `t(key, params?)`
function via `useLanguage()` (the `params` argument fills placeholders
like `{count}` — see `t('quiz.progress', { current, total })` in
`Quiz.jsx`). The choice is saved to `localStorage` on the device (not
synced across devices — see below) and detected from the browser's
language on first visit.

Topic/lesson/quiz content (`src/data/topics.js`) is translated
separately, as `{ en, hi, mr }` objects read through the `localize()`
helper exported from that file — this content is long-form educational
text rather than short UI strings, so it doesn't go through
`translations.js`. Both approaches feed the same `language` from
`useLanguage()`, so switching language updates everything on screen at
once, including a recommendation already showing on the AI Advisor page.

**To add a 4th language:** add it to `LANGUAGES` in `translations.js`,
copy the `en` block, and translate each value; then add the matching
language to every `{ en, hi, mr }` object in `data/topics.js`. Every
screen picks it up automatically.

**To sync language across devices instead of per-device:** store it as
a field on the `users/{uid}` document (in `AuthContext`'s `newProfile`)
and have `LanguageContext` read it once `profile` loads, falling back
to the local/browser detection only when signed out.

## What's stubbed vs. real

Real and wired to Firestore: auth, dashboard stats, topics/lessons,
quizzes (scored, written to Firestore), leaderboard (live query),
progress bars, community posts (create/read/like), rule-based AI
advisor. Also real: the public homepage and full English/Hindi/Marathi
translation across every screen, described above.

Not built yet (say the word and I'll add any of these): a 4th/5th
language, badges logic, streak/days-active tracking, push
notifications, an admin panel for editing topic content without
redeploying, syncing the language choice to the user's account instead
of the device.
