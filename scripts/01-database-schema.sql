-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) NOT NULL, -- 'student', 'teacher', 'admin'
  profile_image_url TEXT,
  face_data JSONB, -- Store face recognition embeddings
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  college_id INT REFERENCES colleges(id),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  department_id INT REFERENCES departments(id),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  credits INT,
  semester INT,
  teacher_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES users(id),
  course_id INT REFERENCES courses(id),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES users(id),
  course_id INT REFERENCES courses(id),
  attendance_date DATE,
  status VARCHAR(20), -- 'present', 'absent', 'late'
  method VARCHAR(50), -- 'face_recognition', 'qr_code', 'manual'
  qr_code_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id, attendance_date)
);

-- QR Codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(255) UNIQUE NOT NULL,
  course_id INT REFERENCES courses(id),
  created_by INT REFERENCES users(id), -- teacher
  class_session_date DATE,
  class_session_time TIME,
  expires_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'expired', 'used'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Syllabus table
CREATE TABLE IF NOT EXISTS syllabus (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id),
  title VARCHAR(255),
  content TEXT,
  week_number INT,
  order_number INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  total_marks INT DEFAULT 100,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignment submissions table
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INT REFERENCES assignments(id),
  student_id INT REFERENCES users(id),
  file_url TEXT,
  submitted_at TIMESTAMP,
  marks_obtained INT,
  feedback TEXT,
  UNIQUE(assignment_id, student_id)
);

-- Fees table
CREATE TABLE IF NOT EXISTS fees (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES users(id),
  amount DECIMAL(10, 2),
  due_date DATE,
  paid_date DATE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'overdue'
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  exam_date DATE,
  exam_time TIME,
  duration_minutes INT,
  total_marks INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam results table
CREATE TABLE IF NOT EXISTS exam_results (
  id SERIAL PRIMARY KEY,
  exam_id INT REFERENCES exams(id),
  student_id INT REFERENCES users(id),
  marks_obtained INT,
  percentage DECIMAL(5, 2),
  grade VARCHAR(2),
  UNIQUE(exam_id, student_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(255),
  message TEXT,
  type VARCHAR(50), -- 'qr_code', 'assignment', 'exam', 'fee', 'attendance'
  related_id INT, -- ID of related entity
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_courses_teacher ON courses(teacher_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
