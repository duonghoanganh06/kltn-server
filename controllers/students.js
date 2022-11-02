import mongoose from "mongoose";
import StudentMessage from "../models/studentMessage.js";

export const getStudents = async (req, res) => {
  try {
    const studentMessages = await StudentMessage.find();

    res.status(200).json(studentMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createStudent = async (req, res) => {
  const student = req.body

  const newStudent = new StudentMessage(student)

  try {
    await newStudent.save();

    res.status(201).json(newStudent)
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateStudent = async (req, res) => {
  const { id: _id } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No student with that id")

  const updatedStudent = await StudentMessage.findByIdAndUpdate(_id, student, { new: true });

  res.json(updatedStudent)
}

export const deleteStudent = async (req, res) => {
  const { id: _id } = req.params
  console.log(_id)
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No student with that id")
  await StudentMessage.findByIdAndRemove(_id)
  res.json({ message: 'Student deleted successfully' })
}
