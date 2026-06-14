TCHB Dispositions Team Dashboard
A real-time, secure, and collaborative workflow tracking application custom-built for the Total Cash Home Buyers (TCHB) Dispositions team.
🌟 Key Features
Real-Time Data Sync: Powered by Firebase Firestore, any changes made to property pipelines (checking off tasks, adding subtasks, assigning agents) are instantly synced across all active users' screens without refreshing.
Enterprise-Grade Security:
Google OAuth Authentication.
Strict Domain Restriction: Only users with a valid @[YOUR_DOMAIN].com email address can access the portal.
Backend Firestore Security Rules prevent unauthorized read/write access.
Live User Presence: Tracks and displays which team members are currently online and actively viewing the dashboard in real-time.
Dynamic Asset Tracking:
Deploy new asset protocols in one click.
Auto-calculating progress bars and percentage weights based on SOP completion.
Smart auto-collapsing task sections to keep the workspace clean.
Unlimited custom sub-tasks that do not interfere with main workflow weighting.
Immersive UI/UX: Features a dark-mode glassmorphism design, custom cursors, background canvas spark animations, and deep-linking tooltips.
🛠️ Technology Stack
Frontend: HTML5, Vanilla JavaScript
Styling: Tailwind CSS (via CDN), FontAwesome Icons
Backend / Database: Firebase Firestore (NoSQL Document Database)
Authentication: Firebase Auth (Google Provider)
Hosting: Vercel (Continuous Deployment via GitHub)
🔒 Security & Firebase Configuration
To ensure the safety of company data, this application relies on both frontend routing and backend database rules.
1. Authorized Domains (Frontend Security)
To allow the Google Sign-in popup to function, the hosting domains must be whitelisted in the Firebase Console:
Navigate to Firebase Console -> Authentication -> Settings -> Authorized Domains.
Add your live domains (e.g., app.[YOUR_DOMAIN].com, localhost).
2. Firestore Security Rules (Backend Security)
Even if the frontend code is inspected, the database is physically locked down. The following rules are deployed in Firestore to guarantee only authorized personnel can read or modify data:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // ONLY allow access if logged in WITH an authorized company email address
      allow read, write: if request.auth != null && request.auth.token.email.matches('.*@[YOUR_DOMAIN][.]com');
    }
  }
}


🚀 Deployment (Vercel)
This application is designed to be hosted seamlessly on Vercel.
Connect your GitHub repository to Vercel.
Ensure the primary HTML file is named index.html in the root directory.
Vercel will automatically deploy on every push to the main branch.
Note: Ensure the final production domain provided by Vercel (or your custom domain) is added to the Firebase Authorized Domains list.
📋 SOP Blueprint Structure
The application hard-codes the standard operating procedure (SOP) into three main phases:
Phase I: Deal Intake (10%)
Phase II: Marketing Prep (40%)
Phase III: Marketing Execution (50%)
Tasks are automatically assigned to default agents (Carlos, Sarah, Moe, Yanna) upon asset creation, but can be dynamically reassigned live within the active tracker.
🗑️ Asset Deletion
To permanently remove an asset from the pipeline, users must click the deletion button at the bottom of the Active Deal Tracker and enter the required authorization password ([REDACTED_PASSWORD]).
