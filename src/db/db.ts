import mongoose from 'mongoose';

export const dbConnect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('MongoDB url is missing');
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};
