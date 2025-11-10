import mongoose from 'mongoose';

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGODB_URI!;
  if (!uri) throw new Error('MONGODB_URI no está definida');
  await mongoose.connect(uri);
}
