const mongoose = require('mongoose');

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/realtor';
  
  try {
    // Attempt connecting to the configured MongoDB URI
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Allow time for Atlas cloud connection
    });
    console.log(`[DB] Connected to MongoDB at: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.warn(`[DB] Warning: Could not connect to primary MongoDB at ${uri} (${err.message}).`);
    console.log('[DB] Initializing embedded in-memory MongoDB fallback so the app runs smoothly with zero setup...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'realtor'
        }
      });
      const memoryUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[DB] Connected to in-memory MongoDB fallback at: ${memoryUri}`);
      return conn;
    } catch (memErr) {
      console.error('[DB] Failed to start in-memory MongoDB fallback:', memErr);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};

module.exports = { connectDB, disconnectDB };

