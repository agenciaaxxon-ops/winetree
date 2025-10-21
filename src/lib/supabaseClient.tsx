import { createClient } from '@supabase/supabase-js'

// --- PEGUE ESTAS INFORMAÇÕES DO SEU PAINEL SUPABASE ---
// 1. Crie um projeto em supabase.com (se ainda não tiver)
// 2. Vá em Project Settings > API
// 3. Copie a "Project URL" e a "anon public" Key

// Use as variáveis de ambiente (MELHOR PRÁTICA)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificação para garantir que as variáveis foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL ou Anon Key não encontradas. Verifique seu arquivo .env");
}

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)