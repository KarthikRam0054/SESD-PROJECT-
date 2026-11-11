const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');
require('dotenv').config();

const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const initChatSocket = require('./sockets/chatSocket');
const Property = require('./models/Property');
const importData = require('./seed/seeder');

// Route imports
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'REALTOR API',
    tagline: 'Find Your Place. Build Your Future.',
    timestamp: new Date()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Initialize Chat WebSockets
initChatSocket(io);

// Server startup
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Check if database is empty and auto-seed sample listings
    try {
      const propCount = await Property.countDocuments();
      if (propCount === 0) {
        console.log('[Server] Database is empty. Running initial sample data seeder...');
        // Run seed import without process.exit
        const bcrypt = require('bcryptjs');
        const User = require('./models/User');
        const Favorite = require('./models/Favorite');
        const Conversation = require('./models/Conversation');
        const Message = require('./models/Message');
        const { seedUsers, seedProperties } = require('./seed/seedData');

        const createdUsers = [];
        for (const u of seedUsers) {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(u.password, salt);
          const user = await User.create({
            fullName: u.fullName,
            email: u.email,
            phone: u.phone,
            passwordHash,
            role: u.role,
            profileImage: u.profileImage,
            bio: u.bio,
            isVerified: u.isVerified,
            hidePhone: u.hidePhone,
            hideEmail: u.hideEmail
          });
          createdUsers.push(user);
        }

        const ownerUser = createdUsers.find((u) => u.email === 'owner@realtor.com');
        const sellerUser = createdUsers.find((u) => u.email === 'seller@realtor.com');
        const buyerUser = createdUsers.find((u) => u.email === 'buyer@realtor.com');

        const insertedProperties = [];
        for (let i = 0; i < seedProperties.length; i++) {
          const propData = { ...seedProperties[i] };
          propData.owner = i % 2 === 0 ? ownerUser._id : sellerUser._id;
          if (propData.sizeUnit === 'sq ft' && propData.size > 0) {
            propData.pricePerSqFt = Math.round(propData.price / propData.size);
          }
          propData.coverImage = propData.images[0];
          const createdProp = await Property.create(propData);
          insertedProperties.push(createdProp);
        }

        if (insertedProperties.length > 2 && buyerUser) {
          await Favorite.create({ user: buyerUser._id, property: insertedProperties[0]._id });
          await Favorite.create({ user: buyerUser._id, property: insertedProperties[1]._id });
        }

        if (insertedProperties.length > 0 && buyerUser && ownerUser) {
          const sampleProp = insertedProperties[0];
          const sampleMsg = "Hello, I'm interested in your property. Could you please share more details?";
          const conversation = await Conversation.create({
            property: sampleProp._id,
            buyer: buyerUser._id,
            owner: sampleProp.owner,
            lastMessage: sampleMsg,
            lastMessageSender: buyerUser._id,
            lastMessageAt: new Date(),
            unreadOwnerCount: 1
          });
          await Message.create({
            conversation: conversation._id,
            sender: buyerUser._id,
            recipient: sampleProp.owner,
            message: sampleMsg,
            readStatus: false
          });
          await Property.findByIdAndUpdate(sampleProp._id, { $inc: { inquiriesCount: 1 } });
        }
        console.log(`[Server] Auto-seed complete with ${insertedProperties.length} properties.`);
      }
    } catch (seedErr) {
      console.warn('[Server] Auto-seed warning:', seedErr.message);
    }

    server.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`🚀 REALTOR Server running on http://localhost:${PORT}`);
      console.log(`📡 Socket.IO Real-time chat enabled`);
      console.log(`🏠 Tagline: Find Your Place. Build Your Future.`);
      console.log(`=================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// If run directly
if (require.main === module) {
  startServer();
}

module.exports = { app, server, io };
