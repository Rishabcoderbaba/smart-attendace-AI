-- Insert sample system settings
INSERT INTO system_settings (key, value) VALUES
  ('face_recognition_threshold', '0.6'),
  ('late_arrival_minutes', '10'),
  ('notification_low_attendance_percent', '75');

-- Note: Actual users will be created through Supabase Auth
-- These are placeholder records for development
-- In production, users are created via auth.users table integration
