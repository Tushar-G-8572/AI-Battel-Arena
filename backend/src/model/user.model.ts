import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Interface for the document fields
interface IUser {
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  googleId?: string;
  authProvider: "local" | "google" | "both";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2. Interface that extends Document and adds custom methods
interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

// 3. Interface for the Model (needed if you add static methods later)
interface IUserModel extends Model<IUserDocument> { }

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 3,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email"],
    },
    password: {
      type: String,
      select: false,
      minLength:[6,"Password must has 6 characters"]
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,  // allows multiple null values (only unique when set)
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "both"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// TS now knows this method exists and its signature
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model<IUserDocument, IUserModel>("user", userSchema);
export default userModel;