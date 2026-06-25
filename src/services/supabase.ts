import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl as string, supabaseAnonKey as string) 
  : null;

if (!isSupabaseConfigured) {
  console.warn("Supabase não configurado com variáveis de ambiente. Utilizando modo simulado/mock.");
}

export const useMockMode = () => !isSupabaseConfigured || !supabase;
