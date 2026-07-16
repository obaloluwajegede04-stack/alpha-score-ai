# Alpha Score AI Backend

This backend uses Node.js, Express, MongoDB Atlas, Mongoose, JWT authentication, and **free uncloseai.com AI API** (no API key required).

## Setup

1. Copy the environment example:

   ```bash
   cp server/.env.example server/.env
   ```

2. Open `server/.env` and set your values:

   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=replace_me_with_a_strong_secret
   # OPENAI_API_KEY no longer needed - using free uncloseai.com API
   PORT=4000
   ```

3. Install dependencies:

   ```bash
   cd server
   npm install
   ```

4. Start the server locally:

   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/questions/waec`
- `GET /api/questions/jamb`
- `GET /api/questions/waec/:id`
- `GET /api/questions/jamb/:id`
- `GET /api/content/subjects`
- `GET /api/content/past-questions`
- `GET /api/content/daily-quiz`
- `GET /api/content/notes`
- `POST /api/content/notes`
- `PUT /api/content/notes/:id`
- `DELETE /api/content/notes/:id`
- `GET /api/content/scores`
- `POST /api/content/scores`
- `GET /api/content/leaderboard`
- `GET /api/content/progress`
- `POST /api/content/progress`
- `POST /api/ai/tutor` (uses free uncloseai.com API)

## AI Integration

The AI tutor uses **uncloseai.com** - a free, OpenAI-compatible API with no signup required. It provides:

- Hermes AI for general conversational responses
- No API key needed
- Unlimited usage for educational purposes

This repo includes a `render.yaml` file for deploying the backend as a Node service.

- Build command: `cd server && npm install`
- Start command: `cd server && npm start`

Set the following Render environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT`
