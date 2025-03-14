import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /@(gmail|outlook|yahoo)\.com$/.test(v);
      },
      message: props => `${props.value} is not a valid email domain!`
    }
  },
  password: { type: String },
  googleId: { type: String },
  verified: { type: Boolean, default: false }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);