# MiProyecto - VibeSphere (Backend + Frontend + MongoDB)

## 📂 Estructura de carpetas

├──Miproyecto/
|
|
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── app.js
│ ├── package.json
│ └── .env (desde .env.example)
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ └── pages/
│ ├── package.json
│ └── .env (desde .env.example)
├── db/
│ └── init.js (opcional: seeds/scripts)
├── docs/
│ ├── arquitectura.md
│ ├── requerimientos.md
│ ├── Guia_EstandaresCodigo.md
│ └── Git_Workflow.md
└── README.md

## 🚀 Cómo ejecutar el proyecto

### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npx nodemon src/app.js
Acceder a: http://localhost:5000

### 2. Frontend
bash
Copiar
Editar
cd frontend
cp .env.example .env
npm install
npm start
Acceder a: http://localhost:3000

⚙️ Variables de entorno
## backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/miproyecto
CORS_ORIGIN=http://localhost:3000

## frontend/.env
REACT_APP_API_URL=http://localhost:5000


## 📌 Dependencias iniciales
# Backend:
express
mongoose
cors
dotenv
nodemon (dev)

# Frontend:
react
react-dom
react-router-dom

