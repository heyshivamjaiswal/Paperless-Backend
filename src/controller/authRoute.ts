import express, { type Request, type Response } from 'express';
import User from '../models/userModel';
import { compare, hash } from 'bcrypt-ts';
import { generatedToken } from '../utils/generateToken';

const router = express.Router();

//SIGNUP ROUTE
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, username, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ error: 'Invalid Email format' });
    }

    //check if user email and username already exists

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const exisitngEmail = await User.findOne({ email });

    if (exisitngEmail) {
      return res.status(400).json({ error: 'Email already taken' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be alteast 6 character long ',
      });
    }

    //hash the password
    const hashedPassword = await hash(password, 10);

    //create the new user
    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err, 'Signup error');
    res.status(500).json({ err: 'Server Error' });
  }
};

//SIGNIN ROUTE

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid username or passowrd' });
    }

    const token = generatedToken(user.id);

    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    res.json({ message: 'user logged in' });
  } catch (err) {
    console.error(err, 'Signin Error');
    res.status(500).json({ message: 'Server error' });
  }
};

//Logout Route

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.json({ message: 'Logged out successfully' });
};

export default router;
