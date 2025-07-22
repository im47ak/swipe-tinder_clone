# CampusVerse

A modern dating application designed specifically for college students, featuring real-time messaging, smart matching, and seamless Google OAuth integration.

## 🚀 Features

### Core Features
- **Google OAuth Authentication** - Secure login for @cmrit.ac.in email addresses only
- **Smart Profile System** - Complete profile creation with preferences
- **Real-time Matching** - Instant match notifications via WebSocket
- **Live Chat** - Real-time messaging with auto-scroll
- **Unread Message Counts** - Live notification badges in sidebar
- **Responsive Design** - Works seamlessly on desktop and mobile

### Technical Features
- **Modern React 18** with Hooks and Context
- **Real-time Communication** via Socket.io
- **State Management** with Zustand
- **Secure Authentication** with JWT tokens
- **Cloud Storage** via Cloudinary
- **MongoDB** for data persistence

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS + DaisyUI
- Zustand (State Management)
- React Router DOM
- Socket.io Client
- @react-oauth/google
- React Tinder Card

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io Server
- JWT Authentication
- Cloudinary (Image Upload)
- bcryptjs (Password Hashing)

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
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

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

## 🌟 Recent Updates

- ✅ Auto-scroll in chat conversations
- ✅ Real-time unread message counts
- ✅ Improved error handling and user feedback
- ✅ Branded as "CampusVerse" throughout the app
- ✅ Enhanced user experience with better messaging
- ✅ Socket connection safety and cleanup

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ for college connections
