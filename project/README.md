# MARIO SERVICE Website

Full-stack website for MARIO SERVICE, a maintenance and repair company specializing in plumbing, shutters, and locks.

## Project Structure

```
project/
├── src/                  # Frontend React application
│   ├── components/       # React components
│   ├── i18n/            # Internationalization files
│   └── services/        # API services
└── server/              # Backend Node.js application
    ├── src/
    │   ├── models/      # MongoDB models
    │   ├── routes/      # API routes
    │   └── middleware/  # Express middleware
    └── .env             # Environment variables (to be created)
```

## Setup Instructions

### Backend Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file in the `server` directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mario_service
JWT_SECRET=mario_service_secret_key_2024
ADMIN_EMAIL=admin@marioservice.com
ADMIN_PASSWORD=Admin123!@#
```

3. Install MongoDB:
- Download MongoDB Community Server from mongodb.com
- Install and start the MongoDB service

### Frontend Setup

1. Install dependencies:
```bash
cd project
npm install
```

## Features Implemented

### Frontend
- ✅ Multilanguage support (Italian/English)
- ✅ Responsive design
- ✅ Contact form
- ✅ Service showcase
- ✅ Image gallery
- ✅ Customer reviews

### Backend
- ✅ Express server setup
- ✅ MongoDB models
- ✅ Authentication middleware
- ✅ Quote submission API
- ✅ Admin authentication

## Next Steps

1. Start MongoDB service
2. Run backend server:
```bash
cd server
npm run dev
```
3. Run frontend development server:
```bash
cd project
npm run dev
```

## Pending Tasks

1. Complete ContactForm integration with backend API
2. Create admin dashboard
3. Implement quote management system
4. Add email notifications
5. Deploy application

## Environment Variables Required

### Backend (.env)
- PORT
- MONGODB_URI
- JWT_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD

## API Endpoints

### Public Endpoints
- POST /api/quotes - Submit a quote request
- POST /api/auth/login - Admin login

### Protected Endpoints (Requires Authentication)
- GET /api/quotes - Get all quotes
- GET /api/quotes/:id - Get specific quote
- PATCH /api/quotes/:id/status - Update quote status

## Notes
- Remember to never commit the .env file
- Keep MongoDB running while developing
- Backend runs on port 5000
- Frontend runs on port 5173 or 5174 