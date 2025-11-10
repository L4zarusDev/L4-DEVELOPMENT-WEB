import mongoose from 'mongoose';

const NotificationSubSchema = new mongoose.Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

export const NotificationSub =
  mongoose.models.NotificationSub ||
  mongoose.model('NotificationSub', NotificationSubSchema);
