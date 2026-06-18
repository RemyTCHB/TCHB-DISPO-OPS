<div align="center">

<img src="icon.svg" alt="TCHB Dispo Ops" width="120" height="120" />

# TCHB Dispo Ops

### Real-time dispositions workflow tracker for the Total Cash Home Buyers team

A secure, collaborative, installable command center that keeps every property in the pipeline moving — with live sync, online presence, weighted SOP progress, and intelligent push notifications.

<br/>

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/Firestore-FF8F00?style=for-the-badge&logo=firebase&logoColor=white)
![Cloud Functions](https://img.shields.io/badge/Cloud%20Functions-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

</div>

---

## 📌 Overview

**TCHB Dispo Ops** is a single-purpose internal tool built for the Total Cash Home Buyers (TCHB) Dispositions team. Each property in the pipeline is broken down into a weighted Standard Operating Procedure (SOP), assigned to the right team members, and tracked to completion in real time. The moment anyone checks off a task, adds a comment, or drops in a draft, every other team member sees it instantly — and the people who need to act get a push notification.

The app is a **Progressive Web App**: it installs to the home screen, works in standalone mode, and delivers native-style push notifications on desktop and Android.

---

## ✨ Features

### Live collaboration
- **Real-time Firestore sync** — task check-offs, assignments, comments, and drafts propagate to every open session with no refresh.
- **Live presence** — see exactly which team members are online and active right now.
- **Per-property comment threads** with deep-linking straight to the referenced comment.

### Weighted SOP engine
- **Two exit-strategy blueprints** ship built in — **Wholesale** and **Novation** — each with its own phases, sections, weighted tasks, and default agent assignments.
- **Auto-calculating progress bars** roll weighted task completion up into phase, section, and overall asset percentages.
- **Scope of Work (SOW) CSV upload** to spin up custom subtasks per deal.
- **Unlimited custom subtasks** that never distort the main workflow weighting.
- Smart auto-collapsing task sections keep the workspace clean.

### Intelligent notifications
A Firebase Cloud Functions backend listens to the pipeline and dispatches targeted alerts, each written to an in-app notification history **and** delivered via Firebase Cloud Messaging:

- 🚀 **New asset deployed** — broadcast to the team, plus a tailored "here are your tasks" alert to each assigned agent.
- ✅ **Granular completions** — separate alerts for finishing a subtask, task, section, phase, or the entire asset (100%).
- 🎯 **Task turns** — the next agent in the chain is pinged when it becomes their turn.
- 💬 **Offline comments** and 📝 **draft / link updates**.
- ⚠️ **Hourly overdue reminders** on a per-agent, configurable interval.
- ☀️ **Daily 10 AM briefing** — a personalized digest of every pending task, grouped by property.

Every user gets **role-based default preferences** (dispo agents, transaction coordinators, admins, super admin) and can fine-tune which alerts they receive.

### Immersive UI/UX
Dark-mode glassmorphism design, custom cursor with an animated mouse glow, a canvas spark/grid background, jelly-pop and rocket micro-animations, and floating contextual tooltips.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, Vanilla JavaScript (single-file app) |
| **Styling** | Tailwind CSS (CDN), Font Awesome 6, Plus Jakarta Sans |
| **Database** | Firebase Firestore (real-time NoSQL) |
| **Auth** | Firebase Auth — Google provider, domain-restricted |
| **Backend** | Firebase Cloud Functions (Node.js 20) |
| **Push** | Firebase Cloud Messaging (FCM) + service worker |
| **App shell** | Progressive Web App (Web App Manifest) |
| **Hosting** | Static host (e.g. Vercel) for the frontend · Firebase for Functions |

---

## 📁 Project Structure

```
.
├── index.html                 # The entire frontend application (UI + client logic)
├── firebase-messaging-sw.js   # FCM service worker for background push notifications
├── manifest.json              # PWA manifest (installable app metadata)
├── icon.svg / icon.png        # App icons
├── logo.svg / google.svg      # Brand + auth assets
├── firebase.json              # Firebase deploy config (functions codebase)
├── .firebaserc                # Firebase project alias
└── functions/
    ├── index.js               # Cloud Functions: watcher + scheduled jobs + FCM engine
    └── package.json           # Functions dependencies (firebase-admin, firebase-functions)
```

### Cloud Functions at a glance

| Function | Trigger | Responsibility |
|----------|---------|----------------|
| `propertyWatcher` | Firestore `onWrite` | New assets, completions, comments, drafts/links, task turns |
| `hourlyReminders` | Pub/Sub schedule (hourly) | Overdue-task reminders on each agent's interval |
| `dailyBriefing` | Pub/Sub schedule (10 AM ET) | Personalized morning digest of pending tasks |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **20**
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- A Firebase project with **Firestore**, **Authentication**, and **Cloud Messaging** enabled

### 1. Clone the repository
```bash
git clone https://github.com/RemyTCHB/TCHB-DISPO-OPS.git
cd TCHB-DISPO-OPS
```

### 2. Configure Firebase
Drop your own Firebase web config into `firebase-messaging-sw.js` and the client config block in `index.html`:
```js
const firebaseConfig = {
  apiKey: "…",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "…",
  appId: "…"
};
```
> The Firebase web API key is **not** a secret — your data is protected by Firestore Security Rules and the auth domain restriction (see below).

### 3. Deploy the Cloud Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### 4. Host the frontend
Serve `index.html` and its assets from any static host (Vercel, Firebase Hosting, etc.). On Vercel, connecting the GitHub repo auto-deploys on every push to `main`.

> ⚠️ **Important:** add your final production domain (and `localhost` for testing) to **Firebase Console → Authentication → Settings → Authorized Domains**, or the Google Sign-in popup will be blocked.

---

## 🔒 Security

Security is enforced on **both** the frontend and the backend, so the database stays locked down even if the client code is inspected.

**1. Domain-restricted Google OAuth.** Sign-in uses the Google provider with the `hd` hosted-domain hint, and the client only admits emails ending in your company domain.

**2. Firestore Security Rules.** Read/write is granted only to authenticated users whose token email matches your company domain:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null
        && request.auth.token.email.matches('.*@YOUR_DOMAIN[.]com');
    }
  }
}
```

**3. Destructive-action guard.** Permanently removing an asset requires an authorization password before the deletion is committed.

---

## 📋 SOP Blueprint Reference

The SOP is hard-coded per exit strategy, with each task carrying a weight and a default assignee. The **Wholesale** flow is organized into three phases:

| Phase | Focus | Weight |
|-------|-------|--------|
| **Phase I** | Deal Intake | 10% |
| **Phase II** | Marketing Prep | 40% |
| **Phase III** | Marketing Execution | 50% |

A separate **Novation** blueprint covers retail viability, pricing, and closing. Tasks are auto-assigned to default agents on asset creation and can be reassigned live inside the tracker.

---

## 👥 Roles

| Role | Members | Default notification profile |
|------|---------|------------------------------|
| **Dispo Agents** | Carlos, Yanna, Moe, Sara | Full alerts (completions, turns, reminders, daily brief) |
| **Transaction Coordinators** | Monz, Chris | Full alerts |
| **Admins** | Brandy, Luke, Info | Oversight alerts (new assets, completions, drafts) |
| **Super Admin** | Systems | Silent by default (manage / monitor) |

---

## 📄 License

Internal proprietary tool — © Total Cash Home Buyers. All rights reserved.

<div align="center">
<br/>
<sub>Built for the TCHB Dispositions team ⚡</sub>
</div>
