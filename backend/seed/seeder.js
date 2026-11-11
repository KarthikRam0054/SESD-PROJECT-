require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDB, disconnectDB } = require('../config/db');
const User = require('../models/User');
const Property = require('../models/Property');
const Favorite = require('../models/Favorite');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { seedUsers, seedProperties } = require('./seedData');

const importData = async () => {
  try {
    await connectDB();
    console.log('[Seeder] Connected to database. Purging existing collections...');

    await User.deleteMany({});
    await Property.deleteMany({});
    await Favorite.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});

    console.log('[Seeder] Creating users with secure bcrypt hashes...');
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
    console.log(`[Seeder] Created ${createdUsers.length} users successfully.`);

    const ownerUser = createdUsers.find((u) => u.email === 'owner@realtor.com');
    const sellerUser = createdUsers.find((u) => u.email === 'seller@realtor.com');
    const buyerUser = createdUsers.find((u) => u.email === 'buyer@realtor.com');

    console.log('[Seeder] Seeding 18 realistic properties across Hyderabad, Warangal, Hanamkonda & Karimnagar...');
    const insertedProperties = [];

    for (let i = 0; i < seedProperties.length; i++) {
      const propData = { ...seedProperties[i] };
      // Distribute owners
      propData.owner = i % 2 === 0 ? ownerUser._id : sellerUser._id;
      if (propData.sizeUnit === 'sq ft' && propData.size > 0) {
        propData.pricePerSqFt = Math.round(propData.price / propData.size);
      }
      propData.coverImage = propData.images[0];
      const createdProp = await Property.create(propData);
      insertedProperties.push(createdProp);
    }
    console.log(`[Seeder] Created ${insertedProperties.length} properties successfully.`);

    // Seed sample favorites for buyer
    if (insertedProperties.length > 2 && buyerUser) {
      console.log('[Seeder] Seeding initial favorites for demo buyer...');
      await Favorite.create({ user: buyerUser._id, property: insertedProperties[0]._id });
      await Favorite.create({ user: buyerUser._id, property: insertedProperties[1]._id });
    }

    // Seed sample conversation with "I'm Interested" message
    if (insertedProperties.length > 0 && buyerUser && ownerUser) {
      console.log('[Seeder] Seeding initial chat conversation with "I\'m Interested" message...');
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

      // Increment property inquiries count
      await Property.findByIdAndUpdate(sampleProp._id, { $inc: { inquiriesCount: 1 } });
    }

    console.log('====================================================');
    console.log('✅ REALTOR database seeded successfully!');
    console.log('Demo Credentials:');
    console.log('  Buyer : buyer@realtor.com / password123');
    console.log('  Owner : owner@realtor.com / password123');
    console.log('  Seller: seller@realtor.com / password123');
    console.log('====================================================');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  importData();
}

module.exports = importData;

