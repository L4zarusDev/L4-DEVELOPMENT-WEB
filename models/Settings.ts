import mongoose, { Schema, models } from 'mongoose';

const SettingsSchema = new Schema({
  maintenance: { type: Boolean, default: false },
  notification: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

const Settings = models.Settings || mongoose.model('Settings', SettingsSchema);
export default Settings;
