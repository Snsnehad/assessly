# Assessly Frontend Demo

Frontend-only Phase 1 Questionnaire Assessment Platform built with React, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Framer Motion, Recharts, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Demo routes

- `/`
- `/login`
- `/signup`
- `/dashboard`
- `/assessment`
- `/report`
- `/profile`
- `/admin`
- `/admin/questions`
- `/admin/users`
- `/admin/responses`

## Demo access

- User login: `aarav@example.com`
- Admin login: `admin@assessly.io`
- Password: any value for demo mode

## Notes

- All data is mocked from local JSON-style modules in `src/data`.
- The app is centered on one long-form written assessment and one final report.
- Fake API calls are wrapped in `src/utils/mockApi.js`.
- Route-level lazy loading is enabled for a lighter initial bundle.
- Dark mode support is wired in through the theme provider.
