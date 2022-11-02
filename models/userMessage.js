import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
})

const UserMessage = mongoose.model('UserMessage', userSchema);

export default UserMessage;