import { useState, useEffect } from 'react';
import logo from '@/assets/logo.svg';
import backgroundImage from '@/assets/foto-1.png';
import { supabase } from '@/lib/supabaseClient';

interface LinkMetric {
    id: number;
    link_text: string;
    click_count: number;
}

const AdminMetricsPage = () => {
    const [metrics, setMetrics] = useState<LinkMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            setLoading(true);
            setError(null);
            try {
                let { data, error: fetchError } = await supabase
                    .from('link_clicks')
                    .select('id, link_text, click_count')
                    .order('link_text', { ascending: true });

                if (fetchError) throw fetchError;
                if (data) setMetrics(data);

            } catch (err: any) {
                console.error("Erro ao buscar métricas:", err);
                setError("Não foi possível carregar as métricas.");
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <section
            className="relative min-h-screen w-screen overflow-y-auto flex flex-col items-center justify-start pt-16 pb-8 px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/80 z-0" />

            {/* LARGURA DO CONTÊINER AJUSTADA */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-xs sm:max-w-2xl">
                {/* Logo Responsivo */}
                <div className="mb-8 animate-fade-in-up">
                    {/* Tamanho ajustado: h-12 no mobile, md:h-16 no desktop */}
                    <img src={logo} alt="Wine Cup Logo" className="h-12 md:h-16 w-auto drop-shadow-lg" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-cream text-shadow mb-8 animate-fade-in-up">
                    Métricas de Cliques
                </h1>

                <div className="w-full glass rounded-3xl p-6 md:p-8 animate-fade-in-up animation-delay-200">
                    {loading && <p className="text-center text-cream/70">Carregando métricas...</p>}
                    {error && <p className="text-center text-red-400">{error}</p>}

                    {!loading && !error && (
                        <table className="w-full text-left text-cream">
                            <thead>
                            <tr className="border-b border-cream/20">
                                <th className="py-3 pr-4 font-semibold">Link</th>
                                <th className="py-3 pl-4 font-semibold text-right">Cliques</th>
                            </tr>
                            </thead>
                            <tbody>
                            {metrics.length > 0 ? (
                                metrics.map((metric) => (
                                    <tr key={metric.id} className="border-b border-cream/10 last:border-b-0">
                                        <td className="py-3 pr-4">{metric.link_text}</td>
                                        <td className="py-3 pl-4 text-right font-semibold">{metric.click_count}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="py-4 text-center text-cream/70">Nenhum clique registrado ainda.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminMetricsPage;