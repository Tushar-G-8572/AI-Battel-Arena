import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Interface for the document fields
interface IUser {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
}

// 2. Interface that extends Document and adds custom methods
interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

// 3. Interface for the Model (needed if you add static methods later)
interface IUserModel extends Model<IUserDocument> {}

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
      required: [true, "Password is required"],
      select: false,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// TS now knows this method exists and its signature
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model<IUserDocument, IUserModel>("user", userSchema);
export default userModel;