# 🤖 Nikhila AI

A modern ChatGPT-inspired AI assistant built using **Next.js**, **TypeScript**, **PostgreSQL**, **Prisma**, and **Groq AI**. The application provides a fast, interactive chat experience with persistent conversations and intelligent memory.

---

## 🚀 Features

- 🤖 AI-powered chatbot using Groq LLM
- 💬 Real-time conversational interface
- 🧠 Conversation memory
- 📚 Persistent chat history
- 🆕 Create new conversations
- 📂 Dynamic sidebar with recent chats
- 💾 PostgreSQL database integration
- ⚡ Prisma ORM for database management
- 🎨 Modern responsive UI
- 🌙 Dark mode interface

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Groq SDK

### Database
- PostgreSQL
- Prisma ORM

### Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```
frontend/
│
├── app/
│   ├── api/
│   ├── chat/
│   └── components/
│
├── lib/
├── prisma/
├── public/
├── hooks/
├── services/
├── types/
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/nikhila249/nikhila-ai.git
```

### Navigate to the project

```bash
cd nikhila-ai/frontend
```

### Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="your_postgresql_database_url"

GROQ_API_KEY="your_groq_api_key"
```

---

## 🗄️ Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Running the Application

Start the development server

```bash
npm run dev
```

Open your browser and visit

```
http://localhost:3000/chat
```

---

## 📸 Screenshots

## 📸 Screenshots

### 🏠 Home Page

![Home Page](public/screenshots/home.png)

---

### 💬 Chat Interface

![Chat Interface](public/screenshots/chat.png)

---

### 🧠 Conversation Memory

![Conversation Memory](public/screenshots/memory.png)

---

### 📂 Sidebar

![Sidebar](public/screenshots/sidebar.png)

## 🎯 Current Features

- ✅ AI Chat
- ✅ Conversation Memory
- ✅ Persistent Chat History
- ✅ Continue Previous Conversations
- ✅ New Chat
- ✅ PostgreSQL Integration
- ✅ Prisma ORM
- ✅ Responsive UI

---

## 🚀 Upcoming Features

- 🌊 Streaming AI Responses
- 📝 Markdown Support
- 📋 Copy Messages
- 📄 File Upload (PDF, DOCX)
- 👁️ Vision AI
- 🎤 Voice Assistant
- 🔐 Authentication
- 🌍 Web Search
- ☁️ Vercel Deployment
- 🤖 AI Agents

---

## 📖 What I Learned

This project helped me gain practical experience with:

- Building full-stack applications using Next.js
- Designing relational databases with PostgreSQL
- Using Prisma ORM
- Integrating Large Language Models (LLMs)
- Managing application state in React
- Creating REST APIs
- Implementing persistent conversation memory
- Version control using Git & GitHub

---

## 👩‍💻 Author

**Nikhila Ravipati**

Computer Science Engineering Student | Full-Stack Developer | AI Enthusiast

GitHub: https://github.com/nikhila249



---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub! 