import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

const ProtectedRoute = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica a sessão atual ao carregar o componente
        const fetchSession = async () => {
            const { data: { session: currentSession }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Erro ao buscar sessão:", error);
            }
            setSession(currentSession);
            setLoading(false);
        };

        fetchSession();

        // Ouve mudanças no estado de autenticação (login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        // Limpa o listener quando o componente é desmontado
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    // Enquanto verifica a sessão, não renderiza nada (ou um spinner)
    if (loading) {
        return null; // Ou <LoadingSpinner />;
    }

    // Se não há sessão (usuário não logado), redireciona para /login
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // Se há sessão, renderiza o componente filho (a página protegida)
    return <Outlet />;
};

export default ProtectedRoute;