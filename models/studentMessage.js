import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentID: String,
  fullName: String,
  age: Number,
  address: String,
  score: Number
})

const StudentMessage = mongoose.model('StudentMessage', studentSchema);

export default StudentMessage;