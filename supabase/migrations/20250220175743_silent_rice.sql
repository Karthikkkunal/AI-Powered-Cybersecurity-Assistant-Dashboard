/*
  # Update Security Policies

  1. Changes
    - Update RLS policies to allow public access for demo purposes
    - Add policies for anonymous access to tables
*/

-- Update scan_results policies
DROP POLICY IF EXISTS "Allow authenticated users to view scan results" ON scan_results;
DROP POLICY IF EXISTS "Allow authenticated users to insert scan results" ON scan_results;

CREATE POLICY "Allow public access to scan results"
  ON scan_results
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Update chat_history policies
DROP POLICY IF EXISTS "Allow authenticated users to view chat history" ON chat_history;
DROP POLICY IF EXISTS "Allow authenticated users to insert chat messages" ON chat_history;

CREATE POLICY "Allow public access to chat history"
  ON chat_history
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);