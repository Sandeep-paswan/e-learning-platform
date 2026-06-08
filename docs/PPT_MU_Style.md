# E-Learning Platform
## Mangalayatan University Style PPT

Prepared for: **Sandeep Paswan**  
Enrollment No.: **20231224**

---

# Slide 1: Title Slide

**Project Title:** E-Learning Platform  
**Presented By:** Sandeep Paswan  
**Enrollment No.:** 20231224  
**Course:** Bachelor of Computer Applications  
**Department:** DCEA, FET, Mangalayatan University  
**Guide:** Ms. Shanu Gupta

**Speaking lines:**
- Good morning/afternoon.
- I am Sandeep Paswan.
- Today I am presenting my BCA final year project, E-Learning Platform.

---

# Slide 2: Index

## Index

1. Introduction  
2. Objective / Aim  
3. Existing System vs Proposed System  
4. Modules Description  
5. Use Case Diagram  
6. ER Diagram / Database Design  
7. Technology Used  
8. Project Pages and Outputs  
9. Advantages & Future Scope  
10. Conclusion  

---

# Slide 3: Introduction

## Introduction

- E-learning is a web-based method of providing education through digital platforms.
- It helps students access courses, videos, and study materials anytime and anywhere.
- My project is an educational website that provides course browsing, user login, and free video learning.
- The project is designed for simple and structured online learning.

**Speaking lines:**
- This project is based on the idea of digital education.
- It is useful for students who want a simple platform to access learning content.

---

# Slide 4: Objective / Aim

## Objective / Aim

- To build a modern web-based E-Learning Platform.
- To provide user registration and login.
- To display free and paid courses.
- To show detailed course information.
- To support embedded free course videos.
- To provide student profile and dashboard.
- To create an admin overview panel.

**Speaking lines:**
- The main aim is to create a simple and user-friendly online learning system.

---

# Slide 5: Existing System vs Proposed System

## Existing System

- Learning materials are scattered across YouTube, notes, and messaging apps.
- Students do not get one central platform.
- Existing platforms can be costly or complex.

## Proposed System

- Centralized course browsing
- Login and registration
- Free and paid course filtering
- Video learning inside the website
- Student and admin role support

| Existing System | Proposed System |
|---|---|
| Scattered resources | Centralized platform |
| No proper user module | Registration and login |
| External video dependency | Embedded video support |
| Weak organization | Structured course library |

---

# Slide 6: Modules Description

## Modules Description

- **User Module**: Registration, login, session handling
- **Admin Module**: Admin overview and statistics
- **Course Module**: Course list, search, filter, detail page
- **Video Learning Module**: Embedded free course videos
- **Dashboard Module**: Learning summary and activity
- **Profile Module**: User details and image preview
- **Projects Module**: Practice project cards and details

**Speaking lines:**
- The project is divided into modules for better management and implementation.

---

# Slide 7: Use Case Diagram

## Use Case Diagram (Text Form)

```text
Student
  -> Register
  -> Login
  -> View Home Page
  -> Search Courses
  -> Open Course Details
  -> Watch Free Video
  -> Open Profile

Admin
  -> Login
  -> Open Admin Panel
  -> View Statistics
```

**Speaking lines:**
- Student and admin are the two main actors in the system.

---

# Slide 8: ER Diagram / Database Design

## ER Diagram / Database Design

### User Entity
- id
- name
- email
- phone
- passwordHash
- role
- enrolledCourses

### Course Entity
- id
- slug
- title
- description
- instructor
- category
- level
- price
- rating
- lessons
- videoUrl

### Relationship

```text
User  ---- enrolls in ----  Course
```

**Speaking lines:**
- The project mainly uses two entities: User and Course.

---

# Slide 9: Technology Used

## Technology Used

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Extra
- localStorage for auth session
- Sample fallback data

---

# Slide 10: Home Page

## Home Page

- Attractive landing page
- Hero section with featured learning tracks
- Navigation bar
- Popular courses section
- Entry point of the platform

**Suggested screenshot:** Home page

---

# Slide 11: Login / Register / Courses

## Login and Register

- User can create a new account
- Existing user can log in
- Role-based redirect after login

## Courses Page

- Shows all courses
- Search support
- Free and paid filter
- Course cards with details

**Suggested screenshot:** Login page or courses page

---

# Slide 12: Course Detail and Video Learning

## Course Detail Page

- Course title, instructor, duration, category
- Course highlights and modules
- Free and paid course handling

## Video Learning

- Free courses open embedded video inside website
- User does not need to leave the platform

**Free courses used:**
- React Interview Prep
- Freelancing Career Starter
- AI Tools for Productivity

**Suggested screenshot:** Free course video page

---

# Slide 13: Dashboard / Profile / Admin Panel

## Dashboard

- Welcome section
- Stats cards
- Recent activity
- Test series visual section

## Profile

- Name, email, phone, role
- Image preview upload

## Admin Panel

- Total courses
- Total users
- Total admins

**Suggested screenshot:** Profile or admin page

---

# Slide 14: Advantages & Future Scope

## Advantages

- Attractive UI
- Centralized course library
- Free and paid course separation
- Embedded free videos
- Student and admin role support
- MongoDB-ready structure

## Future Scope

- Payment gateway
- Quiz module
- Certificate generation
- Live classes
- Teacher dashboard
- Cloud deployment

---

# Slide 15: Conclusion

## Conclusion

- E-Learning Platform is a successful BCA final year project.
- It solves a practical educational problem.
- It combines frontend and backend development.
- It provides modern learning experience through courses and free videos.
- It can be extended into a more advanced educational system in future.

**Speaking lines:**
- This project helped me understand real web development in a practical way.

---

# Slide 16: Thank You

## Thank You

**Any Questions?**

---

# Best Demo Order

1. Home page
2. Login page
3. Register page
4. Courses page
5. Free course video
6. Profile page
7. Admin panel

---

# Viva Short Answers

## Why did you choose this project?
I chose this project because online learning is an important and practical problem, and I wanted to build a useful educational website.

## What technologies did you use?
I used React, Tailwind CSS, Axios, Node.js, Express.js, MongoDB, and Mongoose.

## What is the main feature of your project?
The main feature is structured course browsing with embedded free video learning inside the platform.

## What is the future scope?
Future scope includes payments, quizzes, certificates, live classes, and teacher dashboard.
