import { Instagram, Facebook, GitBranch, GlassWater, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // Importando o cliente Supabase

// --- SEUS ARQUIVOS DE MÍDIA ---
import backgroundImage from '@/assets/foto-1.png';
import logo from '@/assets/logo.svg';

// --- LISTA DE LINKS ---
const links = [
    { href: "https://www.instagram.com/winecupsantos/", text: "Instagram", icon: <Instagram className="w-5 h-5" /> },
    { href: "#", text: "Facebook", icon: <Facebook className="w-5 h-5" /> },
    { href: "#", text: "Grupo de Workshop", icon: <GitBranch className="w-5 h-5" /> },
    { href: "#", text: "Case aqui na Wine", icon: <GlassWater className="w-5 h-5" /> },
    { href: "https://preview--winecup-elegant-landing.lovable.app/", text: "Fazer Reserva", icon: <Calendar className="w-5 h-5" /> }
];

const LinktreePage = () => {

    // --- FUNÇÃO PARA REGISTRAR O CLIQUE ---
    const handleLinkClick = async (linkText: string, linkHref: string) => {
        try {
            // Verifica se o link já existe na tabela
            let { data: existingLink, error: selectError } = await supabase
                .from('link_clicks')
                .select('id, click_count')
                .eq('link_text', linkText)
                .single(); // .single() espera apenas um resultado ou nenhum

            if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = row not found, o que é ok
                console.error('Erro ao buscar link:', selectError);
                return; // Não impede a navegação, mas loga o erro
            }

            if (existingLink) {
                // Se existe, incrementa o contador
                const newCount = existingLink.click_count + 1;
                const { error: updateError } = await supabase
                    .from('link_clicks')
                    .update({ click_count: newCount })
                    .eq('id', existingLink.id);

                if (updateError) {
                    console.error('Erro ao atualizar contador:', updateError);
                } else {
                    console.log(`Contador para "${linkText}" atualizado para ${newCount}`);
                }
            } else {
                // Se não existe, insere um novo registro
                const { error: insertError } = await supabase
                    .from('link_clicks')
                    .insert({ link_text: linkText, click_count: 1 });

                if (insertError) {
                    console.error('Erro ao inserir novo link:', insertError);
                } else {
                    console.log(`Link "${linkText}" registrado com 1 clique.`);
                }
            }
        } catch (error) {
            console.error('Erro inesperado ao registrar clique:', error);
        } finally {
            // Garante que a navegação ocorra mesmo se houver erro no Supabase
            window.open(linkHref, '_blank');
        }
    };

    return (
        <section
            className="relative min-h-screen w-screen overflow-y-auto flex flex-col items-center justify-start pt-16 pb-8 px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/70 z-0" />
            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                <div className="mb-8 animate-fade-in-up">
                    <img src={logo} alt="Wine Cup Logo" className="h-20 w-auto drop-shadow-lg" />
                </div>
                <div className="w-full flex flex-col gap-4">
                    {links.map((link, index) => (
                        // O onClick foi movido para o <a> para garantir o registro antes da navegação
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full animate-fade-in-up"
                            style={{ animationDelay: `${100 * (index + 2)}ms` }}
                            // Chama a função de registro ao clicar
                            onClick={(e) => {
                                e.preventDefault(); // Impede a navegação padrão imediata
                                handleLinkClick(link.text, link.href);
                            }}
                        >
                            <button className="w-full h-16 glass rounded-full text-cream border border-cream/50 hover:border-cream hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium pointer-events-none"> {/* pointer-events-none para o clique ser capturado pelo <a> */}
                                {link.icon}
                                <span>{link.text}</span>
                            </button>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LinktreePage;