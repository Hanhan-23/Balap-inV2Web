# 🚧 BALAP-IN V2 Web

BALAP-IN (Batam Road Infrastructure Reporting System) is a web-based platform designed to assist citizens and administrators in reporting, monitoring, and managing road infrastructure issues in Batam City.

The application consists of a modern **Next.js frontend** and a **Django REST API backend**, providing an intuitive dashboard, authentication system, interactive maps, and road damage management.

---

# Features

## Citizen Features

- Submit road damage reports
- View report history
- Interactive Google Maps
- Report status tracking

## Administrator Features

- Dashboard with statistics
- Manage reports
- Recommendation management
- User management
- Authentication using JWT
- Data visualization

---

# Project Structure

```text
Balap-inV2Web/
│
├── frontend_next_web/         # Next.js Frontend
│
├── backend_django_web/        # Django REST API
│
└── README.md
```

---

# Tech Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Radix UI
- Recharts
- Google Maps

## Backend

- Django 5
- Django REST Framework
- JWT Authentication
- MongoEngine
- MongoDB
- Celery
- Redis
- Daphne (ASGI)

---

# Prerequisites

Install the following software before running the project.

## Frontend

- Node.js 20+
- npm or yarn

Check installation

```bash
node -v
npm -v
```

---

## Backend

- Python 3.12+
- pip

or

- Docker Desktop (recommended)

---

## Database

- MongoDB

You may use:

- Local MongoDB
- MongoDB Atlas

---

## Redis

Redis is required for Celery background tasks.

---

# Clone the Repository

```bash
git clone https://github.com/<your-username>/Balap-inV2Web.git

cd Balap-inV2Web
```

---

# Running the Backend

Navigate to the backend directory.

```bash
cd backend_django_web
```

## Create a Virtual Environment

Windows

```bash
python -m venv venv

venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside:

```text
backend_django_web/
```

Example:

```env
SECRET_KEY=your-secret-key

DEBUG=True

MONGO_URI=mongodb://localhost:27017/balapin

JWT_SECRET_KEY=your-jwt-secret
```

Configure all required environment variables according to your environment.

---

## Run Database Migration

```bash
python manage.py migrate
```

---

## Start the Django Server

```bash
python manage.py runserver
```

The backend will be available at

```
http://127.0.0.1:8000
```

---

# Running Celery (Optional)

Open another terminal.

```bash
celery -A backend_django_web worker --loglevel=info
```

If Celery Beat is used:

```bash
celery -A backend_django_web beat --loglevel=info
```

---

# Running the Frontend

Navigate to the frontend folder.

```bash
cd frontend_next_web
```

Install dependencies.

```bash
npm install
```

or

```bash
yarn
```

---

## Configure Environment Variables

Create

```text
frontend_next_web/.env.local
```

Example

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

---

## Start Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

Open your browser.

```
http://localhost:3000
```

---

# Build for Production

Build the Next.js application.

```bash
npm run build
```

Start production server.

```bash
npm run start
```

---

# Google Maps Configuration

This project integrates Google Maps.

Create a Google Maps API Key from Google Cloud Console and add it to:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

Enable the following APIs:

- Maps JavaScript API
- Places API
- Geocoding API

---

# API Configuration

The frontend communicates with the Django backend using REST APIs.

Configure the backend URL inside:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# Authentication

The system uses JWT Authentication.

Login returns:

- Access Token
- Refresh Token

These tokens are used for authenticated API requests.

---

# Running MongoDB

Local MongoDB

```bash
mongod
```

or connect to MongoDB Atlas by updating your `.env` configuration.

---

# Running Redis

Windows

Start Redis using Docker or Redis for Windows.

Linux

```bash
redis-server
```

Verify Redis

```bash
redis-cli ping
```

Expected output

```text
PONG
```

---

# Troubleshooting

## Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## Frontend Dependencies

```bash
npm install
```

---

## Clear Next.js Cache

```bash
rm -rf .next

npm run dev
```

Windows

```cmd
rmdir /s /q .next

npm run dev
```

---

## Port Already in Use

Backend

```bash
python manage.py runserver 8001
```

Frontend

```bash
npm run dev -- -p 3001
```

---

# Contributors

- Farhan Ramadhan
- Yulia Pipka Ziliwu
- M. Iskandar Dinata
- Michael Lee

---

# License

This project was developed as part of the **BALAP-IN** road infrastructure reporting system for academic purposes at **Politeknik Negeri Batam**.

The source code is intended for educational and research purposes.