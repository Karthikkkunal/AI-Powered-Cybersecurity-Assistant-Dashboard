/*
  # Initial Schema Setup for Cybersecurity Assistant

  1. New Tables
    - scan_results
      - id (uuid, primary key)
      - type (text) - warning/error/info
      - message (text)
      - severity (text)
      - timestamp (timestamptz)
    - chat_history
      - id (uuid, primary key)
      - user_message (text)
      - ai_response (text)
      - timestamp (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Scan Results Table
CREATE TABLE IF NOT EXISTS scan_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  severity text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE scan_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to view scan results"
  ON scan_results
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert scan results"
  ON scan_results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Chat History Table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_message text NOT NULL,
  ai_response text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to view chat history"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert chat messages"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);