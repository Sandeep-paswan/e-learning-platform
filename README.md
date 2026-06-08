# E-Learning Platform

This is a full-stack E-Learning Platform project developed for BCA final year. The project provides user registration, login, course listing, free and paid course filtering, embedded video learning, profile management, dashboard, projects section, and admin overview features.

## Project Overview

The purpose of this project is to create a modern web-based learning system where users can explore courses, watch free learning videos, and access educational content through a structured interface. The platform is designed with separate frontend and backend modules and follows a MERN-oriented development approach.

## Main Features

- User Registration and Login
- Student and Admin Role Support
- Course Listing and Search
- Free and Paid Course Filter
- Embedded Video Learning for Free Courses
- Profile Page
- Dashboard
- Admin Panel
- Projects Section

## Technologies Used

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB-ready architecture
- Mongoose
- CORS
- dotenv

## Project Structure

```text
New project/
|-- client/
|-- server/
|-- docs/
|-- package.json
|-- README.md
```

## Important Pages

- Home Page
- Login Page
- Register Page
- Courses Page
- Course Details Page
- Dashboard
- Profile Page
- Projects Page
- Admin Panel

## API Routes

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Courses

- `GET /api/courses`
- `GET /api/courses/:slug`
- `GET /api/courses/dashboard/overview`
- `GET /api/courses/my-courses/list`
- `POST /api/courses/:slug/enroll`

### Admin

- `GET /api/admin/overview`

## Run the Project

### Backend

```powershell
cd server
npm install
npm run dev
```

### Frontend

```powershell
cd client
npm install --include=dev
npm run dev
```

### Open in Browser

```text
http://localhost:5173
```

## Demo Login

### Student

- Email: `student@learnhub.dev`
- Password: `student123`

### Admin

- Email: `admin@learnhub.dev`
- Password: `admin123`

## Notes

- The backend supports fallback sample data if MongoDB is not connected.
- Free courses can display embedded learning videos directly on the website.
- The project also contains documentation and presentation material in the `docs` folder.

## Author

**Sandeep Paswan**  
BCA Final Year Project
