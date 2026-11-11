# REALTOR – Real Estate Marketplace Web Application

> **"Find Your Place. Build Your Future."**

**REALTOR** is a complete, modern, responsive real estate web application and marketplace connecting property buyers, sellers, and owners on a single platform. Users can explore verified properties with advanced filtering, publish their own properties via a 6-step guided wizard, contact owners directly with customizable privacy controls, and communicate through an integrated real-time Socket.IO chat system.

---

## 🌟 Key Features

1. **Modern Premium UI/UX & Responsive Design**
   - Branded color palette: Deep Navy Blue (`#142B4A`), White (`#FFFFFF`), Teal Green (`#14B8A6`), Light Grey (`#F5F7FA`), and Dark Grey (`#252B36`).
   - Smooth transitions with Framer Motion, modern Plus Jakarta Sans typography, rounded cards, subtle shadows, and loading skeletons.
   - Interactive OpenStreetMap/Leaflet location maps.

2. **Secure Authentication & Role Management**
   - JWT authentication with secure password hashing (`bcryptjs`).
   - Login by email address OR mobile phone number.
   - Show/hide password toggles, form validation, and forgot-password reset workflow.
   - Role-based capabilities for buyers, property owners, and dual-role users.
   - User profile management with contact privacy controls (optionally hide phone or email from public listings).

3. **Homepage & Interactive Showcase**
   - Hero section: *"Discover Properties That Feel Like Home"*.
   - Prominent search bar filtering by Purpose (Buy/Rent), City, Property Category, and Keywords.
   - Featured properties, recently added listings, and popular location cards across **Hyderabad**, **Warangal**, **Hanamkonda**, and **Karimnagar**.

4. **Dedicated Buy / Explore Properties Page**
   - Real-time dynamic querying against backend MongoDB database.
   - Advanced filters:
     - Price Range (Min / Max)
     - Property Size (sq. ft. / acres / sq. yards)
     - City (Hyderabad, Warangal, Hanamkonda, Karimnagar, etc.)
     - Property Category (Individual Houses, Buildings with Rental Units, Land / Plots, Villas, Commercial)
     - Bedrooms (1, 2, 3, 4, 5+), Bathrooms, Floors
     - Community Classification (Gated Community vs. Individual Property)
     - Furnished Status (Furnished, Semi-Furnished, Unfurnished)
     - Condition (New, Resale, Under Construction)
     - Dedicated Parking availability
   - Multi-option sorting: Price Low-to-High, Price High-to-Low, Newest Listings, Largest Properties.
   - Pagination and dynamic query string synchronization.

5. **Dynamic Property Details Page**
   - Interactive multiple-image gallery with thumbnail selection and fullscreen lightbox modal.
   - Complete specifications, dimensions, price per sq. ft., and amenities list.
   - Availability status badges (Available, Sold, Rented).
   - Interactive map pinpointing the property coordinates.
   - Owner Information Card: Verified identity badge, Call Owner (`tel:`), Email Owner (`mailto:`), and Chat with Owner.
   - One-click **"I'm Interested"** trigger that automatically sends:
     > *"Hello, I'm interested in your property. Could you please share more details?"*
   - Save to Favorites with instant heart animation, and Share Property link to clipboard.

6. **Sell / List Property: 6-Step Submission Wizard**
   - **Step 1: Basic Information** — Title, Category, Purpose (Sale/Rent), Description.
   - **Step 2: Property Details** — Price, Size & Unit, Floors, Bedrooms, Bathrooms, Community, Furnished status, Condition, Amenities.
   - **Step 3: Location** — State, City, Area/Locality, Full Address, and Map Coordinates with city auto-calibration.
   - **Step 4: Upload Images** — Multi-file upload with Multer local disk storage (or Cloudinary), image previews, remove items, select main cover photo, or choose 1-click curated architectural photos.
   - **Step 5: Owner Information & Privacy** — Contact details and toggles to hide phone/email publicly.
   - **Step 6: Review & Publish** — Full listing preview and database persistence.

7. **Owner Management Dashboard (`/my-listings`)**
   - Track total listings, view counts, and received buyer inquiries.
   - Edit listing prices on the fly.
   - Toggle availability status between **Available**, **Sold**, and **Rented**.
   - Delete listing with confirmation and automatic database cleanup.

8. **Integrated Real-Time Chat System (Socket.IO)**
   - Buyer-to-owner and owner-to-buyer private conversations.
   - Real-time message delivery, typing indicators, read receipts (`✓` / `✓✓`), and unread badge counters.
   - Clickable Property Information Banner pinned inside each chat for immediate reference.
   - Mobile-responsive split-pane layout with deep-linking support (`/messages?conversationId=...`).

9. **Sample Database Seeder (18 Realistic Listings)**
   - 18 high-quality sample listings spanning Hyderabad (Jubilee Hills, Gachibowli, Madhapur, Mokila, Banjara Hills, Kondapur, Hitec City), Warangal (Kazipet, Naimnagar, Hunter Road), Hanamkonda (Subedari, Balasamudram, Waddepally), and Karimnagar (Mankammathota, Collectorate, Kothapalli, Mukarampura).
   - Clear disclosure tags distinguishing demo listings.

---

## 🛠️ Technology Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Tailwind CSS, Framer Motion, Lucide React, Axios, Socket.IO Client |
| **Backend** | Node.js, Express.js, Socket.IO, Multer, Morgan, CORS, Dotenv |
| **Database** | MongoDB with Mongoose (with embedded `mongodb-memory-server` zero-setup fallback) |
| **Authentication** | JWT (JSON Web Tokens) with `bcryptjs` password hashing |
| **Image Storage** | Local Multer storage (`/uploads/`) with optional Cloudinary support |

---

## 📁 Repository Structure

```
realtor/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection with memory-server fallback
│   ├── controllers/
│   │   ├── authController.js     # Register, login, profile, forgot/reset password
│   │   ├── propertyController.js # CRUD, advanced filters, sorting, homepage showcase
│   │   ├── favoriteController.js # Add, remove, list saved properties
│   │   ├── conversationController.js # Conversations & messages REST endpoints
│   │   └── uploadController.js   # Multer local image storage + Cloudinary adapter
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & optional auth
│   │   └── errorMiddleware.js    # Centralized error handler
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt methods & privacy fields
│   │   ├── Property.js           # Full property schema with indexes & text search
│   │   ├── Conversation.js       # Conversation schema linking property & participants
│   │   ├── Message.js            # Message schema with read receipts
│   │   └── Favorite.js           # User saved favorites with compound index
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── favoriteRoutes.js
│   │   ├── conversationRoutes.js
│   │   └── uploadRoutes.js
│   ├── seed/
│   │   ├── seedData.js           # 18 realistic listings & 3 demo accounts
│   │   └── seeder.js             # CLI database importer (npm run seed)
│   ├── sockets/
│   │   └── chatSocket.js         # Socket.IO real-time chat, typing, and read events
│   ├── uploads/                  # Uploaded property images directory
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── server.js                 # Server entry point & auto-seed check
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer, LoadingSkeleton, EmptyState
│   │   │   ├── property/         # PropertyCard, PropertyFilter, Gallery, Map, OwnerContactCard
│   │   │   ├── sell/             # Step1Basic through Step6Preview wizard
│   │   │   └── chat/             # ConversationList, ChatWindow
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication state & actions
│   │   │   ├── SocketContext.jsx # Socket.IO connection & notifications
│   │   │   └── ToastContext.jsx  # Animated toast notifications
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── BuyPage.jsx
│   │   │   ├── PropertyDetailPage.jsx
│   │   │   ├── SellPage.jsx
│   │   │   ├── MyListingsPage.jsx
│   │   │   ├── MessagesPage.jsx
│   │   │   ├── FavoritesPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── services/             # Axios API service wrappers
│   │   ├── utils/                # Formatters (INR Lakhs/Crores) & constants
│   │   ├── App.jsx               # Routes & providers
│   │   ├── index.css             # Tailwind base & custom scrollbars
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── .env.example
├── .gitignore
├── package.json                  # Root orchestration (concurrently dev runner)
└── README.md
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB** *(Optional)*: If you have a local MongoDB daemon running on port 27017 or a MongoDB Atlas URI, the app connects directly. If not, the built-in **in-memory MongoDB fallback** automatically activates so the app runs immediately with zero external setup!

### Step 1: Install Dependencies

From the project root:

```bash
# 1. Install root dependencies (concurrently)
npm install

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

---

### Step 2: Environment Configuration

Backend configuration (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/realtor_db
JWT_SECRET=realtor_super_secret_jwt_key_2026_modern_marketplace
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Optional: Cloudinary Cloud Image Storage (Leave blank for local upload)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend configuration (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

### Step 3: Seed Database with Sample Listings

Populate 18 realistic property listings across Hyderabad, Warangal, Hanamkonda, and Karimnagar:

```bash
# From the root directory:
npm run seed

# Or directly in the backend folder:
cd backend && npm run seed
```

*(Note: The server also includes an auto-seed check: if the database has 0 listings when started, it automatically populates the sample data!)*

---

### Step 4: Run the Application

You can run both Frontend and Backend concurrently from the root directory:

```bash
npm run dev
```

Or run them in separate terminal windows:

**Terminal 1 (Backend API & Socket.IO):**
```bash
cd backend
npm run dev
# Server will run on: http://localhost:5000
```

**Terminal 2 (Frontend React + Vite):**
```bash
cd frontend
npm run dev
# Application will run on: http://localhost:5173
```

Open your browser and navigate to **`http://localhost:5173`**.

---

## 👥 Demo User Credentials

For immediate evaluation, the application provides pre-configured demo users and convenient **1-Click Demo Login** buttons on the login page:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Buyer** | `buyer@realtor.com` | `password123` | Pre-loaded with saved favorites and active inquiries |
| **Owner / Seller** | `owner@realtor.com` | `password123` | Licensed investor managing Hyderabad & Karimnagar villas |
| **Builder / Seller** | `seller@realtor.com` | `password123` | Developer with properties in Warangal & Hanamkonda |

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user (`fullName`, `email`, `phone`, `password`, `confirmPassword`, `role`) |
| `POST` | `/api/auth/login` | Public | Sign in via email OR phone (`identifier`, `password`) |
| `GET` | `/api/auth/profile` | Private | Retrieve logged-in user profile |
| `PUT` | `/api/auth/profile` | Private | Update profile, bio, avatar, and contact privacy toggles |
| `POST` | `/api/auth/forgot-password`| Public | Request 6-digit password reset code |
| `POST` | `/api/auth/reset-password` | Public | Reset password using verified code |

### Properties (`/api/properties`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Public | List properties with filters (`search`, `category`, `listingType`, `minPrice`, `maxPrice`, `city`, `bedrooms`, `sort`, `page`, `limit`) |
| `GET` | `/api/properties/home-showcase` | Public | Featured listings, recent properties, and city aggregation |
| `GET` | `/api/properties/user/my-listings` | Private | Retrieve all properties owned by current user with stats |
| `GET` | `/api/properties/:id` | Public | Get single property details (increments view count, checks favorite status) |
| `POST` | `/api/properties` | Private | Publish new property listing |
| `PUT` | `/api/properties/:id` | Private (Owner) | Update property details |
| `PATCH` | `/api/properties/:id/status` | Private (Owner) | Update status (`Available`, `Sold`, `Rented`) |
| `DELETE` | `/api/properties/:id` | Private (Owner) | Permanently delete listing |

### Favorites (`/api/favorites`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/favorites` | Private | List all bookmarked properties for logged-in user |
| `POST` | `/api/favorites/:propertyId` | Private | Save property to favorites |
| `DELETE` | `/api/favorites/:propertyId` | Private | Remove property from favorites |

### Conversations & Messages (`/api/conversations`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/conversations` | Private | List all active buyer/owner conversations |
| `POST` | `/api/conversations` | Private | Create or fetch conversation for a property (supports automatic initial message) |
| `GET` | `/api/conversations/:conversationId/messages` | Private | Fetch chat history & mark recipient messages as read |
| `POST` | `/api/conversations/messages` | Private | Send a new message |

### Media Upload (`/api/upload`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/upload/single` | Private | Upload single property image (`image` file) |
| `POST` | `/api/upload/multiple` | Private | Upload up to 10 property images (`images` files) |

---

## 💬 Real-Time Chat (Socket.IO Events)

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `register_user` | Client → Server | `userId` | Registers socket connection with user room |
| `join_conversation` | Client → Server | `conversationId` | Joins room `conv_${conversationId}` |
| `leave_conversation`| Client → Server | `conversationId` | Leaves room `conv_${conversationId}` |
| `send_message` | Client → Server | `{ conversationId, senderId, recipientId, message }` | Saves message to MongoDB and broadcasts |
| `new_message` | Server → Room | `Message` object | Delivers message in real-time |
| `typing` | Client → Server | `{ conversationId, userId, isTyping }` | Broadcasts live typing indicator |
| `mark_read` | Client → Server | `{ conversationId, userId }` | Marks unread messages as read |
| `conversation_updated` | Server → Recipient | `{ conversationId, lastMessage, senderId }` | Triggers push badge updates |

---

## 🔒 Privacy & Security Features

- **Password Hashing**: Salted bcrypt hashing with 10 rounds.
- **JWT Authorization**: Cryptographically signed tokens verified via Bearer header middleware.
- **Contact Privacy Shield**: Property owners can independently choose to hide their phone number or email address. When hidden, the public contact card displays *"Hidden by Owner"* and routes inquiries exclusively through the in-app chat.
- **Authorization Guard**: Users cannot view or delete listings or chat messages belonging to other parties.

---

## 📄 License & Attribution

Developed for the **REALTOR** Real Estate Marketplace project.  
Tagline: *"Find Your Place. Build Your Future."*

