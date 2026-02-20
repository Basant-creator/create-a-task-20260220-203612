# TaskMaster Pro: Your Ultimate Task Management Solution

TaskMaster Pro is a production-ready, full-stack web application designed to help users efficiently manage their tasks. It features robust user authentication, a clean and responsive user interface, and is built to be easily deployed on platforms like Render.

## Branding

*   **Company Name:** TaskMaster Pro
*   **Tagline:** Master Your Day, Every Day.
*   **Primary Color:** `#6366f1` (Indigo 500)
*   **Secondary Color:** `#8b5cf6` (Purple 500)

## Features

*   **User Authentication:** Secure login and signup with JWT (JSON Web Tokens) and bcrypt for password hashing.
*   **Dashboard:** A personalized dashboard greeting the user, with placeholders for task statistics and upcoming deadlines.
*   **Responsive Design:** Optimized for mobile, tablet, and desktop devices using a mobile-first approach.
*   **Consistent Navigation:** A unified header with company logo and navigation links across all pages, including a responsive hamburger menu for mobile.
*   **Modern UI:** Clean, intuitive forms and layouts with smooth transitions and hover effects.
*   **Client-Side Validation:** Real-time form validation for better user experience.
*   **Server-Side API:** RESTful API endpoints for user authentication and profile management.
*   **MongoDB Integration:** Uses Mongoose for database interactions, connected to MongoDB Atlas.

## Tech Stack

*   **Frontend:** HTML5, CSS3 (Vanilla CSS with variables, Flexbox, Grid), Vanilla JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Authentication:** JWT (JSON Web Tokens), bcryptjs

## File Structure


## Setup and Installation

### Prerequisites

*   Node.js (LTS recommended)
*   npm (comes with Node.js)
*   MongoDB Atlas account (for `MONGO_URI`)

### Steps

1.  **Clone the repository:**

2.  **Install Backend Dependencies:**

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the root directory (where `package.json` is located).
    *   Copy the contents from `.env.example` into your new `.env` file.
    *   Replace placeholder values:
        *   `MONGO_URI`: Your MongoDB Atlas connection string. Example: `mongodb+srv://youruser:yourpassword@clustername.mongodb.net/taskmasterpro-db?retryWrites=true&w=majority`
        *   `JWT_SECRET`: A strong, random string for signing JWTs. You can generate one online.
        *   `PORT`: The port your server will run on (e.g., `5000`).

4.  **Run the Application:**
    The server should start on the specified `PORT` (default 5000).

5.  **Access the Frontend:**
    Open your web browser and navigate to `http://localhost:5000`.

## API Endpoints

All API endpoints return JSON responses with `{"success": true/false, "data": {}, "message": ""}` structure.

*   `POST /api/auth/signup`: Register a new user.
    *   **Request Body:** `{ "name": "...", "email": "...", "password": "..." }`
    *   **Response:** `{ "success": true, "message": "...", "data": { "token": "...", "user": { "id": "...", "name": "...", "email": "..." } } }`

*   `POST /api/auth/login`: Authenticate a user and receive a JWT.
    *   **Request Body:** `{ "email": "...", "password": "..." }`
    *   **Response:** `{ "success": true, "message": "...", "data": { "token": "...", "user": { "id": "...", "name": "...", "email": "..." } } }`

*   `GET /api/auth/me`: Get the profile of the currently authenticated user.
    *   **Authentication:** Requires `Authorization: Bearer <token>` header.
    *   **Response:** `{ "success": true, "data": { "user": { "id": "...", "name": "...", "email": "..." } } }`

*   `PUT /api/users/:id`: Update a user's profile.
    *   **Authentication:** Requires `Authorization: Bearer <token>` header.
    *   **Request Body:** `{ "name": "...", "email": "...", "password": "..." }` (fields are optional)
    *   **Response:** `{ "success": true, "message": "...", "data": { "user": { "id": "...", "name": "...", "email": "..." } } }`

## Deployment on Render

This application is designed for easy deployment on Render.

1.  **Create a new Web Service on Render.**
2.  **Connect your GitHub repository.**
3.  **Configure Build & Start Commands:**
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
4.  **Add Environment Variables:**
    *   Add `MONGO_URI`, `JWT_SECRET`, and `PORT` (e.g., `5000`) as environment variables in Render. Make sure these match your `.env` file in development.
5.  **Deploy:** Click "Create Web Service" or "Deploy latest commit". Render will automatically build and deploy your application.

## Development Notes

*   **Frontend Frameworks:** No complex frontend frameworks (React, Vue, Angular) were used to meet the vanilla JS requirement, making it lightweight and fast.
*   **CSS:** A mobile-first approach is used, with media queries for tablet and desktop layouts.
*   **Error Handling:** Basic client-side and server-side error handling are implemented to provide a smoother user experience.
*   **Task Management:** While the dashboard UI hints at task management, the full CRUD operations for tasks themselves are not implemented within the specified API endpoints and file constraints. The focus for this project was on robust user authentication and a clean, deployable setup. Expanding task management would typically involve additional models, routes, and extensive frontend JS.