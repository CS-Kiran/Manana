// User.js - Keep it simple
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String },
  provider: {
    type: String,
    enum: ["google", "credentials"],
    required: true,
    default: "credentials",
  },
  googleId: String,
  emailVerified: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.provider === "credentials") {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;