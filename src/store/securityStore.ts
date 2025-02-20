import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface SecurityState {
  isScanning: boolean;
  scanResults: any[];
  chatMessages: { role: 'user' | 'assistant'; content: string }[];
  startScan: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  isScanning: false,
  scanResults: [],
  chatMessages: [],

  startScan: async () => {
    try {
      set({ isScanning: true });
      
      // First ensure we have an authenticated session
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (!session) {
        // If no session, sign in with default test account
        await supabase.auth.signInWithPassword({
          email: 'test@example.com',
          password: 'testpassword123'
        });
      }

      // Simulate network scan
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newResults = [
        { type: 'warning', message: 'Port 22 (SSH) is open', severity: 'medium' },
        { type: 'error', message: 'Outdated SSL certificate detected', severity: 'high' },
        { type: 'info', message: 'Web server running on port 80', severity: 'low' }
      ];
      
      // Store scan results in Supabase
      const { error } = await supabase.from('scan_results').insert(
        newResults.map(result => ({
          type: result.type,
          message: result.message,
          severity: result.severity,
          timestamp: new Date().toISOString()
        }))
      );

      if (error) throw error;
      
      set({ scanResults: newResults, isScanning: false });
    } catch (error) {
      console.error('Error during scan:', error);
      set({ isScanning: false });
      throw error;
    }
  },

  sendMessage: async (message: string) => {
    try {
      const messages = [...get().chatMessages, { role: 'user', content: message }];
      set({ chatMessages: messages });

      // Ensure we have an authenticated session
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (!session) {
        // If no session, sign in with default test account
        await supabase.auth.signInWithPassword({
          email: 'test@example.com',
          password: 'testpassword123'
        });
      }

      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = {
        role: 'assistant' as const,
        content: `I've analyzed your security concern about "${message}". Based on our current security posture, I recommend implementing additional firewall rules and enabling two-factor authentication for all admin accounts.`
      };
      
      // Store chat history in Supabase
      const { error } = await supabase.from('chat_history').insert({
        user_message: message,
        ai_response: aiResponse.content,
        timestamp: new Date().toISOString()
      });

      if (error) throw error;
      
      set({ chatMessages: [...messages, aiResponse] });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}));