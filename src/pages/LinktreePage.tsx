
// Importando os ícones atualizados
import { Instagram, Facebook, GitBranch, GlassWater, Calendar, Music } from 'lucide-react';

// --- SEUS ARQUIVOS DE MÍDIA ---
import backgroundImage from '@/assets/foto-1.png';
import logo from '@/assets/logo.svg';

// --- LISTA DE LINKS FINAL ---
const links = [
    {
        href: "https://www.instagram.com/winecupsantos/", // Instagram voltou para a lista
        text: "Instagram",
        icon: <Instagram className="w-5 h-5" />
    },
    // Facebook foi removido
    {
        href: "https://chat.whatsapp.com/KCC7i4kLqjILU1deeHAXj9",
        text: "Merlot Experience 27/01",
        icon: <CalendarCheck className="w-5 h-5" /> // Ícone corrigido que faltava no import
    },
    {
        href: "#", // Coloque o link para "Case aqui na Wine"
        text: "Case-se aqui",
        icon: <Flower className="w-5 h-5" /> // Ícone corrigido que faltava no import
    },
    {
        href: "https://preview--winecup-elegant-landing.lovable.app/",
        text: "Fazer Reserva",
        icon: <Calendar className="w-5 h-5" />
    },
    {
        href: "#", // <-- COLOQUE O LINK DA PLAYLIST AQUI DEPOIS
        text: "Playlist Wine",
        icon: <Music className="w-5 h-5" /> // Novo ícone
    }
];

// Importações corrigidas para incluir os ícones que faltavam
import { CalendarCheck, Flower } from 'lucide-react';

const LinktreePage = () => {
    return (
        <section
            className="relative min-h-screen w-screen overflow-y-auto flex flex-col items-center justify-start pt-16 pb-8 px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/70 z-0" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 animate-fade-in-up">
                    <img src={logo} alt="Wine Cup Logo" className="h-20 w-auto drop-shadow-lg" />
                </div>

                {/* Lista de Botões de Link */}
                <div className="w-full flex flex-col gap-4">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full animate-fade-in-up"
                            style={{ animationDelay: `${100 * (index + 2)}ms` }}
                        >
                            <button className="w-full h-16 glass rounded-full text-cream border border-cream/50 hover:border-cream hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium">
                                {link.icon}
                                <span>{link.text}</span>
                            </button>
                        </a>
                    ))}
                </div>
                {/* O ícone do Instagram separado foi removido */}
            </div>
        </section>
    );
};

export default LinktreePage;