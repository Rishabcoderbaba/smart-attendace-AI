-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE face_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE correction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Users RLS Policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Teachers can read their class students" ON users
  FOR SELECT USING (
    role = 'student' AND class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM users WHERE id = auth.uid()));

-- Classes RLS Policies
CREATE POLICY "Teachers can read own classes" ON classes
  FOR SELECT USING (teacher_id = auth.uid());

CREATE POLICY "Students can read enrolled classes" ON classes
  FOR SELECT USING (
    id IN (SELECT class_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can read all classes" ON classes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Attendance RLS Policies
CREATE POLICY "Teachers can read class attendance" ON attendance
  FOR SELECT USING (
    class_id IN (SELECT id FROM classes WHERE teacher_id = auth.uid())
  );

CREATE POLICY "Students can read own attendance" ON attendance
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can read all attendance" ON attendance
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Teachers can insert attendance" ON attendance
  FOR INSERT WITH CHECK (
    class_id IN (SELECT id FROM classes WHERE teacher_id = auth.uid())
  );

-- Face Embeddings RLS Policies
CREATE POLICY "Users can read own embedding" ON face_embeddings
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can read all embeddings" ON face_embeddings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can insert own embedding" ON face_embeddings
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own embedding" ON face_embeddings
  FOR UPDATE USING (user_id = auth.uid());

-- Correction Requests RLS Policies
CREATE POLICY "Users can read own requests" ON correction_requests
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Teachers can read class requests" ON correction_requests
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM users WHERE class_id IN (
        SELECT id FROM classes WHERE teacher_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can read all requests" ON correction_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can insert correction request" ON correction_requests
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Notifications RLS Policies
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- System Settings (Admin only)
CREATE POLICY "Admins can read settings" ON system_settings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
