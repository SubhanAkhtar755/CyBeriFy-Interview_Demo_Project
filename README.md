#  MERN Startup Template (React + Node + MongoDB)

A complete **MERN stack starter project** built with **React + Vite + TailwindCSS** on the frontend and **Node.js + Express + MongoDB** on the backend — already integrated with **JWT authentication**, **Cloudinary image upload**, and **Stripe payment setup**.

This template is perfect for quickly starting new full-stack apps without repeating initial setup.

---

##  Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React 19, Vite 6, TailwindCSS 4, React Router v7 | Fast, modern, and optimized UI setup |
| **Backend** | Node.js, Express.js | Handles API logic, routing, and middleware |
| **Database** | MongoDB + Mongoose | For structured NoSQL storage |
| **Cloud Storage** | Cloudinary | User images upload & deletion |
| **Authentication** | JWT | Secure login, register, and profile APIs |
| **Payment** | Stripe | (Integrated — add your test key in `.env`) |

---

##  Project Structure

###  Frontend (`/client`)
Built with **React + Vite + TailwindCSS**

src/
- ├── components/
- │ ├── Header.jsx
- │ └── Footer.jsx
- ├── pages/
- │ ├── Home/
- │ │ └── Home.jsx
- └── main.jsx

pgsql
Copy code

✅ Just run `npm i` and start the frontend using Vite — everything is ready.

### ⚙️ Backend (`/server` or `/src`)
Built with **Node + Express + MongoDB**

src/
- ├── modules/
- │ └── user/
- │ ├── user.controller.js
- │ ├── user.service.js
- │ ├── user.model.js
- │ └── user.routes.js
- ├── db/
- ├── constants/
- └── routes/

yaml
Copy code

 Includes complete **User Module**:  
- Register  
- Login  
- Update  
- Delete (removes image from Cloudinary too)  
- Get Profile  
- Get All Users  

---

##  Installation & Setup

### 1️ Clone the repository
```bash
git clone https://github.com/YourUsername/MERN-Startup-Template.git
cd MERN-Startup-Template
2️⃣ Install frontend dependencies
bash
Copy code
cd client
npm install
npm run dev
3️⃣ Install backend dependencies
bash
Copy code
cd server
npm install
4️⃣ Create .env file inside the backend folder
env
Copy code
PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
CLOUD_NAME=
API_KEY=
API_SECRET=
JWT_SECRET=
5️⃣ Start the backend
bash
Copy code
npm run dev
```
🔑 API Overview
Endpoint	Method	Description
- /api/user/register	POST	Register a new user
- /api/user/login	POST	Login with credentials
- /api/user/update	PUT	Update user profile
- /api/user/delete/:id	DELETE	Delete user and Cloudinary image
- /api/user/me	GET	Get logged-in user info
- /api/user/all	GET	Get all users (admin)

🧠 Features
- ✅ React + Vite frontend ready with TailwindCSS
- ✅ Node + Express backend with Mongoose setup
- ✅ Secure JWT authentication
- ✅ Cloudinary integration for image upload/delete
- ✅ Stripe payment ready (just add test key)
- ✅ Modular folder structure (scalable for any app)
- ✅ .env environment support

💡 Purpose
This repo is designed as a starter boilerplate for quickly spinning up new MERN applications —
whether for E-commerce, Portfolio CMS, or custom dashboards.

You can clone, modify, and extend this to fit your project goals.

📬 Contact Me

💼 Muhammad Subhan Akhtar

📧 muhammadsubhan192128@gmail.com

🌐 Portfolio: [https://m-subhan-portfolio.web.app/](https://m-subhan-portfolio.web.app/)

💬 Open for collaboration & freelance MERN projects.
