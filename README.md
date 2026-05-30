# 📚 Book Library

A full-stack web application for managing your personal book collection. Built with Flask, PostgreSQL, and React.

![Book Library](https://img.shields.io/badge/Flask-Backend-black?style=flat&logo=flask)
![React](https://img.shields.io/badge/React-Frontend-blue?style=flat&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat&logo=postgresql)
![Railway](https://img.shields.io/badge/Backend-Railway-purple?style=flat)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)

## 🌐 Live Demo

- **Frontend:** [book-library-api-five.vercel.app](https://book-library-api-five.vercel.app)
- **Backend API:** [book-library-api.up.railway.app/api](https://book-library-api.up.railway.app/api)

---

## ✨ Features

- 🔐 JWT-based authentication (register, login, logout)
- 📖 Full CRUD for books (create, read, update, delete)
- 🎨 Bold dark UI with Tailwind CSS
- 📊 Live stats — total books, genres, added this month
- 🏷️ Color-coded genre pills
- 🔒 Protected routes — only logged-in users can modify books
- 📱 Responsive layout

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Flask, Flask-JWT-Extended, Flask-Bcrypt |
| Database | PostgreSQL, SQLAlchemy, Flask-Migrate |
| Auth | JWT Tokens |
| Deployment | Vercel (frontend), Railway (backend + DB) |

---

## 🗂️ Project Structure

```
book-library/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py       # Register & login routes
│   │   │   └── books.py      # CRUD routes
│   │   ├── __init__.py       # App factory
│   │   └── models.py         # User & Book models
│   ├── migrations/           # Database migrations
│   ├── wsgi.py               # Entry point
│   ├── config.py             # App configuration
│   ├── Procfile              # Railway deployment
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Axios instance with JWT interceptor
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Books.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── App.jsx
│   └── vercel.json           # Vercel SPA routing fix
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/booklibrary
JWT_SECRET_KEY=your-secret-key
```

Run migrations and start server:

```bash
flask --app wsgi db upgrade
python wsgi.py
```

Backend runs at `http://127.0.0.1:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and get token | No |

### Books
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/books` | Get all books | No |
| GET | `/api/books/:id` | Get single book | No |
| POST | `/api/books` | Create book | ✅ Yes |
| PUT | `/api/books/:id` | Update book | ✅ Yes |
| DELETE | `/api/books/:id` | Delete book | ✅ Yes |

---

## 🔐 Environment Variables

### Backend
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET_KEY` | Secret key for signing JWT tokens |

---

## 📸 Screenshots

> Login page, Books dashboard with stats, Edit modal

---

## 🧠 What I Learned

- Flask Application Factory pattern
- SQLAlchemy ORM and database migrations
- JWT authentication flow
- React controlled components and hooks
- Axios interceptors for automatic token attachment
- Protected routes in React Router
- Full-stack deployment with Railway and Vercel

---

## 👤 Author

**Alsanad** — [@Alsanad-Opium](https://github.com/Alsanad-Opium)