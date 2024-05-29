import { Schema, Model, model, Document, CallbackError } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export const User: Model<IUser> = model<IUser>("User", UserSchema);
