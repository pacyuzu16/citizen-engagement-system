# Citizen Engagement System

A web application for citizens to submit and track complaints about public services, with an admin interface to manage complaints, users, and analytics. Built for the **Tech Associates Program Software Developers Hackathon**.

## Live Demo
- **Frontend**: https://citizen-engagement-system.vercel.app
- **Backend**: [https://citizen-engagement-backend.onrender.com](https://citizen-engagement-backend.onrender.com)

## Setup (Local Development)
1. Clone the repo: `git clone https://github.com/your-username/citizen-engagement-system.git`
2. Install backend dependencies: `cd server && npm install`
3. Install frontend dependencies: `cd client && npm install`
4. Set up `server/.env`:
5. Start MongoDB: `sudo systemctl start mongodb`
6. Start backend: `cd server && npm start`
7. Start frontend: `cd client && npm start`
8. Open `http://localhost:3000` in your browser.

## Deployment Instructions
1. **Backend (Render)**:
- Deploy the `server` folder to Render.
- Set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`.
- Build Command: `npm install`
- Start Command: `npm start`
2. **Frontend (Vercel)**:
- Deploy the `client` folder to Vercel.
- Use default React settings.
- Update API URLs in frontend files to point to the Render backend.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, bcrypt, jsonwebtoken
- **Frontend**: React, React Router, Axios, Bootstrap, React-Bootstrap, Chart.js, react-chartjs-2, Font Awesome, react-toastify
- **Dependencies**: uuid, cors, nodemon

## Features
- **Authentication**: Login/signup with password visibility toggle and Stripe-inspired UI.
- **Pre-Login Homepage**: Welcoming page with login/signup CTAs.
- **Submit Complaints**: Styled form with icons for submission.
- **Auto-Categorization and Routing**: Priority-based keyword system.
- **Status Tracking**: Track complaints by ticket ID.
- **Citizen Dashboard**: View recent complaints by contact.
- **Admin Interface**: View, edit, delete complaints and users.
- **Analytics Module**: Bar charts for complaints by category, status, agency, and user.
- **Error Handling**: Custom 404 page, global backend error handling, error boundaries, and toast notifications.
- **UI/UX**: Bootstrap/React-Bootstrap with Font Awesome icons, modern colors (blue-teal gradient, light gray background), and logout confirmation.

## Testing
- Visit the live demo: [https://citizen-engagement-system-frontend.vercel.app](https://citizen-engagement-system-frontend.vercel.app)
- Sign up as a user (`testuser@example.com`) and toggle password visibility.
- Submit a complaint and track its status.
- View complaints on the citizen dashboard.
- Log in as an admin (`admin@example.com`, create via MongoDB if needed) to edit/delete complaints/users and view analytics.
- Navigate to an invalid route (e.g., `/invalid`) to see the 404 page.
- Test error handling by submitting invalid login credentials or stopping the backend.

## Technical Documentation
See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for system architecture, design decisions, and a demo walkthrough.