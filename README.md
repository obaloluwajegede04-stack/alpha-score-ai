# Alpha Score Tutorial AI

A React + Vite starter app for an AI study companion focused on WAEC, JAMB, NECO, and GCE.

## What’s included

- React application scaffold
- Navigation placeholders for AI Tutor, Daily Questionnaire, Past Questions, and Study Notes
- Simple responsive UI with modern styling

## Setup

1. Run `npm install`
2. Run `npm run dev`

## Backend setup

1. Change into the backend folder:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file with:
   ```env
   JWT_SECRET=your_jwt_secret_here
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=4000
   ```
3. Start the backend:
   ```bash
   npm run dev
   ```

## Next steps

- Add AI question generation and review flows
- Create JSON or API-backed data for past questions and notes
- Build user progress tracking and personalized study plans
- Connect the frontend to `/api/*` endpoints for auth and content
