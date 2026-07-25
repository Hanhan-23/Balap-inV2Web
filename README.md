# 🚧 BALAP-IN V2 Web

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Django](https://img.shields.io/badge/Django-5-092E20?style=for-the-badge&logo=django)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-Background%20Task-DC382D?style=for-the-badge&logo=redis)
![License](https://img.shields.io/badge/License-Educational-blue?style=for-the-badge)

**A modern web-based platform for reporting, monitoring, and managing road infrastructure issues in Batam City.**

</div>

---

# Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Google Maps Configuration](#google-maps-configuration)
- [API Configuration](#api-configuration)
- [Authentication](#authentication)
- [MongoDB Setup](#mongodb-setup)
- [Redis Setup](#redis-setup)
- [Build for Production](#build-for-production)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

# Overview

BALAP-IN (Batam Road Infrastructure Reporting System) is a web-based platform developed to assist both citizens and administrators in reporting, monitoring, and managing road infrastructure issues throughout Batam City.

The system consists of two main components:

- **Frontend:** Built with **Next.js 15**, React, and TypeScript.
- **Backend:** Powered by **Django REST Framework**, MongoDB, Celery, and Redis.

The application provides an intuitive dashboard, interactive maps, secure authentication, report management, and analytical visualization.

---

# Features

## Citizen Features

- Submit road damage reports
- View report history
- Interactive Google Maps
- Track report status
- View report locations

## Administrator Features

- Dashboard with statistics
- Manage road reports
- Recommendation management
- User management
- JWT Authentication
- Data visualization dashboard

---

# Project Structure

```text
Balap-inV2Web/
│
├── frontend_next_web/          # Next.js Frontend
│
├── backend_django_web/         # Django REST API Backend
│
└── README.md
```

---

# Technology Stack

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
- Google Maps API

## Backend

- Django 5
- Django REST Framework
- JWT Authentication
- MongoEngine
- MongoDB
- Celery
- Redis
- Daphne (ASGI Server)

---

# Prerequisites

Before running this project, ensure the following software is installed.

## Frontend

- Node.js 20+
- npm or Yarn

Verify installation:

```bash
node -v
npm -v
```

---

## Backend

- Python 3.12+
- pip

or

- Docker Desktop (Recommended)

---

## Database

- MongoDB

Supported options:

- MongoDB Community Server
- MongoDB Atlas

---

## Redis

Redis is required for Celery background task processing.

---

# Installation

## Step 1 — Clone the Repository

```bash
git clone https://github.com/Hanhan-23/Balap-inV2Web.git
```

Navigate to the project directory.

```bash
cd Balap-inV2Web
```

Verify the folder structure.

```text
Balap-inV2Web/
│
├── frontend_next_web/
├── backend_django_web/
└── README.md
```

---

# Running the Backend

Open the first terminal.

Navigate to the backend directory.

```bash
cd backend_django_web
```

## Create a Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

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

## Start the Django Development Server

```bash
python manage.py runserver
```

The backend API will be available at:

```
http://127.0.0.1:8000
```

---

# Running Celery (Optional)

Open another terminal.

Start the Celery worker.

```bash
celery -A backend_django_web worker --loglevel=info
```

If Celery Beat is required:

```bash
celery -A backend_django_web beat --loglevel=info
```

---

# Running the Frontend

Open a second terminal.

Navigate to the frontend directory.

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

Create:

```text
frontend_next_web/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

---

## Start the Development Server

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

# Quick Start

After cloning the repository, simply run the backend and frontend in two separate terminals.

### Terminal 1

```bash
cd backend_django_web

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Terminal 2

```bash
cd frontend_next_web

npm install

npm run dev
```

Application URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://127.0.0.1:8000 |

---

# Google Maps Configuration

This project integrates Google Maps.

Generate a Google Maps API Key from the Google Cloud Console and add it to:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

Enable the following APIs:

- Maps JavaScript API
- Places API
- Geocoding API

---

# API Configuration

Configure the backend URL in:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# Authentication

The system uses **JWT Authentication**.

After login, the API returns:

- Access Token
- Refresh Token

These tokens are used for authenticated API requests.

---

# MongoDB Setup

Start MongoDB locally.

```bash
mongod
```

Or connect to MongoDB Atlas by updating your `.env` file.

---

# Redis Setup

### Windows

Run Redis using Docker Desktop or Redis for Windows.

### Linux

```bash
redis-server
```

Verify Redis is running.

```bash
redis-cli ping
```

Expected output:

```text
PONG
```

---

# Build for Production

Build the frontend.

```bash
npm run build
```

Run the production server.

```bash
npm run start
```

---

# Troubleshooting

## Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Clear Next.js Cache

Linux/macOS

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

This project was developed as part of the **BALAP-IN (Batam Road Infrastructure Reporting System)** at **Politeknik Negeri Batam**.

The source code is provided for educational and research purposes. Feel free to use and modify it in accordance with your institution's guidelines.