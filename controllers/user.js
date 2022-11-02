import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserMessage from '../models/UserMessage.js'

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserMessage.findOne({ username });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })
    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, 'test', {
      expiresIn: "1h"
    })
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." })
  }
}

export const signup = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await UserMessage.findOne({ username });
    if (existingUser) return res.status(404).json({ message: "User already exist." });
    const hasdedPassword = await bcrypt.hash(password, 12);
    const result = await UserMessage.create({ username, password: hasdedPassword })
    const token = jwt.sign({ username: result.username, id: result._id }, 'test', {
      expiresIn: "1h"
    })
    res.status(200).json({ result: result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." })
  }
}