<div align="center">

<h1>⚔️ AI Battle Arena</h1>

<p><strong>A multi-agent AI competition platform where two AI models go head-to-head on a user prompt — and a Mistral AI judge scores them both.</strong></p>

<p>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" />
  <img src="https://img.shields.io/badge/LangGraph-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mistral_AI-FF7000?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

</div>

---

## 📌 What is AI Battle Arena?

AI Battle Arena is a **multi-agent AI competition platform** where two AI models compete simultaneously on a user-submitted problem — and a third **Mistral AI judge** scores them both.

Here's how it works:
- You submit a problem statement or prompt
- **Two AI agents** (powered by different models — OpenAI, Cohere, Google AI, Mistral) process it **in parallel** using a LangGraph concurrent execution pipeline
- Both agents generate independent solutions without seeing each other's response
- A **Mistral AI Judge Agent** evaluates both responses, scores them on logic and quality, and declares a winner with a detailed judgment

Every battle is saved to MongoDB, so users can revisit and compare results over time.

> Built to explore LangGraph multi-agent orchestration, parallel graph execution, and AI model comparison at a product level.

---

## 🎬 Demo

🌐 **Live:** [ai-battel-arena.onrender.com](https://ai-battel-arena.onrender.com)
---

## ✨ Features

- ⚔️ **Two AI models compete in parallel** — LangGraph runs both agents concurrently, eliminating sequential bottlenecks
- 🧑‍⚖️ **Mistral AI Judge** — evaluates both responses against the original prompt, scores them on logic, quality, and correctness, and explains the verdict
- 🔀 **Multi-model support** — OpenAI, Cohere, Google AI, and Mistral AI integrations — swap models easily
- 📊 **Battle history** — every arena result is persisted in MongoDB; users can view past battles and scores anytime
- 🔐 **Secure authentication** — email + password registration with email verification, plus Google OAuth 2.0 via Passport.js
- 🛡️ **Protected routes** — only authenticated users access the arena
- 📱 **Responsive UI** — React + Tailwind CSS frontend with Redux Toolkit state management

---

## 🏗️ Architecture <a name="architecture"></a>

AI Battle Arena uses a **LangGraph parallel execution graph** as its core engine — both AI agents run simultaneously in the same graph invocation, and the judge node fires only after both finish.

```
┌───────────────────────────────────────────────────────────────────┐
│                         BROWSER CLIENT                            │
│             React + Vite + Redux Toolkit + Tailwind CSS           │
└──────────────────────────┬────────────────────────────────────────┘
                           │ REST API
                           ▼
              ┌────────────────────────┐
              │    Express.js Server   │
              │     TypeScript         │
              │    JWT Middleware       │
              └────────┬───────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   ┌─────────────┐  ┌──────────┐  ┌──────────────────┐
   │ Auth Routes │  │ AI Routes│  │     MongoDB       │
   │ /api/auth   │  │ /api/ai  │  │  Users, Battles   │
   │ Passport.js │  └────┬─────┘  │  Mongoose Models  │
   │ Google OAuth│       │        └──────────────────┘
   │ JWT Cookies │       ▼
   │ Nodemailer  │  ┌──────────────────────────────────────────┐
   └─────────────┘  │       LangGraph Execution Pipeline        │
                    │                                          │
                    │   START                                  │
                    │     │                                    │
                    │     ▼                                    │
                    │  ┌──────────────────────────────────┐   │
                    │  │     PARALLEL EXECUTION NODE       │   │
                    │  │                                   │   │
                    │  │  ┌─────────────┐ ┌─────────────┐ │   │
                    │  │  │  Agent  A   │ │  Agent  B   │ │   │
                    │  │  │ (Model 1)   │ │ (Model 2)   │ │   │
                    │  │  │ OpenAI /    │ │ Cohere /    │ │   │
                    │  │  │ Google AI   │ │ Mistral AI  │ │   │
                    │  │  └──────┬──────┘ └──────┬──────┘ │   │
                    │  └─────────┼────────────────┼────────┘   │
                    │            └───────┬─────────┘            │
                    │                   ▼                       │
                    │        ┌──────────────────────┐           │
                    │        │   JUDGE AGENT NODE   │           │
                    │        │    Mistral AI         │           │
                    │        │  • Reads both outputs │           │
                    │        │  • Scores A vs B      │           │
                    │        │  • Explains verdict   │           │
                    │        │  • Declares winner    │           │
                    │        └──────────┬───────────┘           │
                    │                   ▼                       │
                    │                 END                       │
                    └──────────────────────────────────────────┘
                                       │
                                       ▼
                              Save to MongoDB
                         (battle result + scores)
```

### Why LangGraph parallel execution?

Without LangGraph, you'd run Agent A → wait → run Agent B → wait → run Judge. That's 3 sequential LLM calls. With LangGraph's parallel node execution, Agent A and Agent B run **at the same time** — cutting total inference time nearly in half before the judge even fires.

---

## 🛠️ Tech Stack

### Backend
| Technology | Usage |
|-----------|-------|
| TypeScript | Entire backend — type-safe controllers, models, services |
| Node.js + Express.js | REST API server |
| LangChain | AI model abstraction and prompt orchestration |
| LangGraph | Parallel multi-agent graph execution pipeline |
| Mistral AI | Judge Agent model (`mistral-medium-latest`) |
| OpenAI | Competitor Agent model option |
| Cohere | Competitor Agent model option |
| Google AI (Gemini) | Competitor Agent model option |
| MongoDB + Mongoose | User data, battle history, scores |
| Passport.js | Google OAuth 2.0 |
| JWT | Access + session token auth |
| Nodemailer | Email verification on registration |
| bcrypt | Password hashing |

### Frontend
| Technology | Usage |
|-----------|-------|
| React + Vite | Main UI application |
| Redux Toolkit | Global auth + battle state management |
| Tailwind CSS | Component styling |
| React Router | Protected routing |

---

## 📁 Project Structure

```
ai-battle-arena/
├── backend/
│   ├── server.ts                 # Entry point
│   └── src/
│       ├── app.ts                # Express app config + routes
│       ├── ai/                   # LangGraph + LangChain orchestration
│       │   ├── graph.ts          # LangGraph pipeline definition
│       │   ├── agents/           # Agent A, Agent B, Judge Agent
│       │   └── models/           # AI model connectors (OpenAI, Cohere, Mistral, Google)
│       ├── routes/
│       │   ├── auth.routes.ts    # Auth API routes
│       │   └── ai.routes.ts      # Arena API routes
│       ├── controller/
│       │   ├── auth.controller.ts
│       │   └── ai.controller.ts
│       ├── model/
│       │   ├── user.model.ts     # MongoDB user schema
│       │   └── battle.model.ts   # MongoDB battle + score schema
│       ├── services/
│       │   └── email.service.ts  # Nodemailer email verification
│       ├── config/
│       │   └── env.ts            # Environment variable loader
│       └── utils/                # Reusable helpers
│
└── frontend/
    └── src/
        ├── main.jsx              # React bootstrap
        ├── app/
        │   ├── App.jsx           # Top-level shell
        │   └── app.routes.jsx    # Protected route config
        └── features/
            ├── auth/             # Login, Register, Google OAuth UI
            └── ai/               # Arena page, battle results, history
```

---

## 🚀 Getting Started <a name="getting-started"></a>

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- API keys for the AI providers you want to use
- Google OAuth credentials (for social login)
- Email credentials (for verification emails)

### 1. Clone the repository

```bash
git clone https://github.com/Tushar-G-8572/AI-Battel-Arena.git
cd AI-Battel-Arena
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
# AI Provider Keys
OPENAI_API_KEY=your_openai_key
MISTRAL_API_KEY=your_mistral_key
COHERE_API_KEY=your_cohere_key
GOOGLE_API_KEY=your_google_ai_key

# Database
MONGO_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
CALLBACK_URL=http://localhost:4000/api/auth/google/callback
CLIENT_URL=http://localhost:5173

# Email (Nodemailer)
EMAIL_USER=your_email_address
REFRESH_TOKEN=your_gmail_refresh_token
```

> ⚠️ Never commit `.env` to source control. Add it to `.gitignore`.

### 4. Run the application

```bash
# Terminal 1 — Backend (port 4000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Reference

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user with email + password |
| `GET` | `/api/auth/verify-email` | Verify registered email address via token |
| `POST` | `/api/auth/login` | Authenticate user, issue JWT cookie |
| `GET` | `/api/auth/get-me` | Fetch authenticated user profile |
| `GET` | `/api/auth/logout` | Clear auth cookie |
| `GET` | `/api/auth/google` | Redirect to Google OAuth consent screen |
| `GET` | `/api/auth/google/callback` | Google OAuth callback, issue JWT |

### AI Arena (`/api/ai`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/arena` | Submit prompt → runs LangGraph pipeline → returns Agent A, Agent B, and Judge responses |
| `GET` | `/api/ai/battleHistory/:battleId` | Retrieve a single battle record by ID |
| `GET` | `/api/ai/problems` | Get recent battle history for the authenticated user |

---

## ⚙️ How a Battle Works

```
1. User submits a problem statement via the Arena page
2. Frontend → POST /api/ai/arena
3. Backend invokes the LangGraph pipeline:

   ┌── PARALLEL NODE ──────────────────────────────┐
   │  Agent A receives prompt → generates solution  │
   │  Agent B receives prompt → generates solution  │  ← both run at the same time
   └───────────────────────────────────────────────┘
                        │
                        ▼
   ┌── JUDGE NODE ─────────────────────────────────┐
   │  Mistral AI receives: prompt + A output        │
   │                              + B output        │
   │  → Scores both on logic, accuracy, quality     │
   │  → Explains strengths and weaknesses of each   │
   │  → Declares the winner                         │
   └───────────────────────────────────────────────┘
                        │
                        ▼
4. Result (Agent A response, Agent B response, scores, judge verdict)
   saved to MongoDB as a battle record
5. Response returned to frontend and displayed
6. User can view the full battle in history
```

## 👨‍💻 Author

**Tushar Gupta**
- GitHub: [@Tushar-G-8572](https://github.com/Tushar-G-8572)
- LinkedIn: [tushar-gupta-018805259](https://www.linkedin.com/in/tushar-gupta-018805259/)
- Portfolio: [portfolio-tg-3g81.onrender.com](https://portfolio-tg-3g81.onrender.com)

---

<div align="center">
  <p>If you found this project interesting, consider giving it a ⭐</p>
</div>
