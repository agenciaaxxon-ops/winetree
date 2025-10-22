import { Instagram, CalendarCheck, Flower, Calendar, Music } from 'lucide-react';

// --- SEUS ARQUIVOS DE MÍDIA ---
import backgroundImage from '@/assets/foto-1.png';
import logo from '@/assets/logo.svg';

// --- LISTA DE LINKS FINAL ---
const links = [
    {
        id: "instagram",
        href: "https://www.instagram.com/winecupsantos/",
        text: "Instagram",
        icon: <Instagram className="w-5 h-5" />
    },
    {
        id: "workshop",
        href: "https://chat.whatsapp.com/KCC7i4kLqjILU1deeHAXj9",
        text: "Merlot Experience 27/01",
        icon: <CalendarCheck className="w-5 h-5" />
    },
    {
        id: "casamento",
        href: "https://preview--winecup-reserve-now.lovable.app/cadastro-lead",
        text: "Case-se aqui",
        icon: <Flower className="w-5 h-5" />
    },
    {
        id: "reserva",
        href: "https://preview--winecup-reserve-now.lovable.app/",
        text: "Fazer Reserva",
        icon: <Calendar className="w-5 h-5" />
    },
    {
        id: "playlist",
        href: "https://open.spotify.com/playlist/37i9dQZF1EIdgqvd8Qfc5i?si=dg7I8cGOQGOuOfh0gysE1g", // Example link
        text: "Playlist Wine",
        icon: <Music className="w-5 h-5" />
    }
];

const LinktreePage = () => {
    return (
        <section
            className="relative min-h-screen w-screen overflow-y-auto flex flex-col items-center justify-start pt-16 pb-8 px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* LARGURA DO CONTÊINER AJUSTADA PARA MOBILE (max-w-xs) E DESKTOP (sm:max-w-md) */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-xs sm:max-w-md">
                {/* Logo Responsivo */}
                <div className="mb-8 animate-fade-in-up">
                    <img src={logo} alt="Wine Cup Logo" className="h-12 md:h-16 w-auto drop-shadow-lg" />
                </div>

                {/* Lista de Botões de Link */}
                <div className="w-full flex flex-col gap-4">
                    {links.map((link, index) => {
                        const isWorkshop = link.id === 'workshop';
                        const buttonClasses = isWorkshop
                            ? "bg-burgundy text-cream hover:bg-wine" // Estilo de destaque bordô
                            : "glass text-cream border border-cream/50 hover:border-cream hover:bg-cream/10"; // Estilo padrão glass

                        return (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full animate-fade-in-up"
                                style={{ animationDelay: `${100 * (index + 2)}ms` }}
                            >
                                {/* O padding horizontal foi removido daqui pois não tinha efeito prático */}
                                <button className={`w-full h-14 md:h-16 rounded-full transition-all duration-300 flex items-center justify-center gap-3 text-base md:text-lg font-medium ${buttonClasses}`}>
                                    {link.icon}
                                    <span>{link.text}</span>
                                </button>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LinktreePage;