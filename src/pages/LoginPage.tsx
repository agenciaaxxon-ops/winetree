import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logo from '@/assets/logo.svg';
import backgroundImage from '@/assets/foto-1.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (signInError) {
                throw signInError;
            }

            // Se o login for bem-sucedido, redireciona para /admin
            window.location.href = '/admin'; // Ou use useNavigate() se preferir

        } catch (err: any) {
            console.error("Erro no login:", err);
            setError("Email ou senha inválidos."); // Mensagem genérica por segurança
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="relative min-h-screen w-screen overflow-hidden flex flex-col items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/80 z-0" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
                <div className="mb-8 animate-fade-in-up">
                    <img src={logo} alt="Wine Cup Logo" className="h-16 w-auto drop-shadow-lg" />
                </div>

                <div className="w-full glass rounded-3xl p-8 animate-fade-in-up animation-delay-200">
                    <h1 className="text-2xl font-bold text-cream text-center mb-6">
                        Acesso Administrativo
                    </h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-cream/80">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/10 text-cream border-cream/20 focus:border-cream focus:ring-cream"
                                placeholder="seuemail@exemplo.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-cream/80">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/10 text-cream border-cream/20 focus:border-cream focus:ring-cream"
                                placeholder="********"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cream text-burgundy hover:bg-cream/90 font-semibold"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;