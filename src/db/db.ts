import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) throw new Error('MongoDB url is missing');

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};
