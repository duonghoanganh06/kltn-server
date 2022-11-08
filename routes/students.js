import express from 'express';

import { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from '../controllers/students.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getStudents)
router.get('/:id', getStudent)
router.post('/', auth, createStudent)
router.patch('/:id', auth, updateStudent)
router.put('/:id', auth, updateStudent)
router.delete('/:id', auth, deleteStudent)

export default router;