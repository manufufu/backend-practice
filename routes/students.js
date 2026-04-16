import express from 'express';
import mongoose from 'mongoose';

// DATABASE MODELS
import Student from '../models/Student.js';

const router = express.Router();

// CREATE - Add a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: Object.values(error.errors).map((validationError) => validationError.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A student with that email already exists',
      });
    }

    console.error('Error creating student:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// READ - Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get a single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;