# 🌟 CampusVerse - College Social Platform

**🚀 [LIVE DEMO](https://campusverse.onrender.com)** ⭐ **[GitHub Repository](https://github.com/im47ak/swipe-tinder_clone)**

A modern, full-stack social networking application designed specifically for college students, featuring real-time messaging, smart connections, and seamless Google OAuth integration. Built with **React**, **Node.js**, **MongoDB**, and **Socket.io**.

> **🎯 Complete MERN Stack project showcasing full-stack development skills!**

---

## 🚀 Complete Feature Set

### � **Authentication & Security**
- **Google OAuth Integration** - Secure single sign-on for @cmrit.ac.in email addresses
- **Domain-based Access Control** - Restricted to college students only
- **JWT Token Authentication** - Secure session management
- **Protected Routes** - Role-based access control

### 👥 **Social Networking Features**
- **Smart Profile System** - Complete profile creation with preferences and photo uploads
- **Connection Algorithm** - Intelligent matching based on preferences and interests
- **Swipe Interface** - Intuitive card-based interaction system
- **Real-time Matching** - Instant connection notifications

### 💬 **Real-time Communication**
- **Live Chat System** - Instant messaging with Socket.io
- **Real-time Notifications** - Live unread message counts and alerts
- **Auto-scroll Chat** - Smooth user experience with automatic message scrolling
- **Connection Status** - Online/offline indicators

### 🎨 **User Experience**
- **Responsive Design** - Mobile-first approach, works on all devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Professional Branding** - Consistent design language throughout
- **Error Handling** - Comprehensive user feedback and error management

### ☁️ **Cloud Integration**
- **Image Upload** - Cloudinary integration for profile photos
- **Production Deployment** - Live application hosted on Render
- **Database Management** - MongoDB Atlas for data persistence
- **Environment Security** - Secure configuration management


### 📊 **Technical Complexity**
- **Backend**: RESTful APIs, JWT authentication, Socket.io server, MongoDB operations
- **Frontend**: React hooks, state management, real-time UI updates, responsive design
- **DevOps**: Environment configuration, build optimization, production deployment

---

## �🛠️ Tech Stack

### Frontend
- **React 18** + Vite (Modern build tooling)
- **TailwindCSS** + DaisyUI (Utility-first styling)
- **Zustand** (Lightweight state management)
- **React Router DOM** (Client-side routing)
- **Socket.io Client** (Real-time communication)
- **@react-oauth/google** (OAuth integration)
- **React Tinder Card** (Swipe animations)

### Backend
- **Node.js** + Express (Server framework)
- **MongoDB** + Mongoose (Database & ODM)
- **Socket.io Server** (WebSocket server)
- **JWT** (Authentication tokens)
- **Cloudinary** (Image upload service)
- **bcryptjs** (Password security)

### DevOps & Deployment
- **Render** (Cloud hosting platform)
- **MongoDB Atlas** (Cloud database)
- **Google Cloud Console** (OAuth configuration)
- **Environment Variables** (Secure configuration management)

## 🏗️ Project Structure

```
├── api/                    # Backend (Express.js)
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── socket/            # Socket.io server
│   └── config/            # Database & Cloudinary config
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── lib/           # Utilities (axios config)
│   │   └── socket/        # Socket.io client
│   └── public/            # Static assets
│
└── README.md              # Project documentation
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Google OAuth Credentials
- Cloudinary Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tinder-clone
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client && npm install
   ```

3. **Environment Setup**
   
   Create `.env` in root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

   Create `client/.env`:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

4. **Start the application**
   ```bash
   # Start backend (from root directory)
   npm run dev

   # Start frontend (in a new terminal)
   cd client && npm run dev
   ```

5. **Access the application**
   - **🌐 Live Production**: https://campusverse.onrender.com
   - **Local Frontend**: http://localhost:5173
   - **Local Backend API**: http://localhost:5000

> **💡 Tip**: Use the live demo for quick showcase, local setup for development exploration!

## 🔐 Authentication Flow

1. User visits the app and sees login/signup options
2. For Google Auth: User clicks "Sign in with Google"
3. OAuth redirects to Google consent screen
4. After approval, user is redirected back with access token
5. Backend validates the token with Google's API
6. If email domain is @cmrit.ac.in, user is authenticated
7. New users are redirected to complete their profile
8. Returning users are logged in directly

## 📱 Key Components

### Real-time Features
- **Socket Connection**: Managed globally in App.jsx
- **Live Messaging**: Instant message delivery and receipt
- **Match Notifications**: Real-time match alerts
- **Unread Counts**: Live updates without page refresh

### State Management
- **useAuthStore**: User authentication and session
- **useMatchStore**: Matches, user profiles, swipe actions
- **useMessageStore**: Chat messages and unread counts
- **useUserStore**: User profile management

## 🔧 Development Notes

### Code Quality
- Consistent error handling with try-catch blocks
- User-friendly error messages via react-hot-toast
- Defensive programming for socket operations
- Clean console logging (console.error for errors)

### Performance
- Optimized re-renders with proper useEffect dependencies
- Efficient state updates in Zustand stores
- Auto-scroll only when needed in chat
- Smart unread count updates

## 🌟 Recent Updates & Achievements

- ✅ **Production Deployment** - Successfully deployed on Render cloud platform
- ✅ **Google OAuth Integration** - Secure authentication with domain restrictions
- ✅ **Real-time Chat System** - WebSocket-based messaging with auto-scroll
- ✅ **Live Notifications** - Real-time unread message counts across the app
- ✅ **Mobile Responsive** - Optimized for all device sizes
- ✅ **Professional Branding** - Complete rebrand as "CampusVerse"
- ✅ **Error Handling** - Comprehensive error management and user feedback
- ✅ **Production Security** - Environment-based configuration and secure cookies

