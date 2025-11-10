import mongoose, { Schema, models } from 'mongoose';

const PushSubscriptionSchema = new Schema(
  {
    endpoint: { type: String, required: true, unique: true },
    expirationTime: { type: Number, required: false },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const PushSubscription =
  (models.PushSubscription as mongoose.Model<any>) ||
  mongoose.model('PushSubscription', PushSubscriptionSchema);

export default PushSubscription;
