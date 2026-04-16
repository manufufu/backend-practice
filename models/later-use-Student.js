import mongoose from 'mongoose';

const COURSES = [
  'BS Information Technology',
  'BS Computer Science',
  'BS Business Administration',
  'BS Accountancy',
  'BS Tourism Management',
  'BS Hospitality Management',
];

const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const SUBJECT_NAMES = [
  'Understanding the Self',
  'Readings in Philippine History',
  'Introduction to Computing',
  'Computer Programming 1',
  'Mathematics in the Modern World',
  'Komunikasyon sa Filipino',
  'Purposive Communication',
  'Physical Education 1',
  'National Service Training Program',
  'Data Structures and Algorithms',
];

const SEMESTERS = ['1st Semester', '2nd Semester', 'Summer'];
const SUBJECT_STATUSES = ['Passed', 'Failed', 'Incomplete', 'Ongoing'];

const subjectSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: true,
      trim: true,
    },
    subjectName: {
      type: String,
      required: true,
      trim: true,
      enum: SUBJECT_NAMES,
    },
    units: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    semester: {
      type: String,
      enum: SEMESTERS,
      required: true,
    },
    schoolYear: {
      type: String,
      required: true,
      trim: true,
      match: /^\d{4}-\d{4}$/,
    },
    finalGrade: {
      type: Number,
      min: 1.0,
      max: 5.0,
    },
    status: {
      type: String,
      enum: SUBJECT_STATUSES,
      default: 'Ongoing',
    },
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    contactNumber: {
      type: String,
      trim: true,
      match: /^(\+63|0)\d{10}$/,
    },
    address: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      enum: COURSES,
      required: true,
      trim: true,
    },
    yearLevel: {
      type: String,
      enum: YEAR_LEVELS,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      trim: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
