import { Schema, model } from 'mongoose';

interface IUser {
  fullName: string;
  email: string;
  password: string;
  username: string;
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 12,
  },
});

const User = model<IUser>('User', userSchema);

export default User;
