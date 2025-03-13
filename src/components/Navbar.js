
import React, { useState, useEffect } from 'react';

import { UserIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/solid';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize(); // Verifica no carregamento
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <header className="header">
            <div className="left-section">
                {isMobile && (
                    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        <Bars3Icon className="h-8 w-8 text-white" />
                    </div>
                )}
                <img src="images/logo.png" className={`logo ${isMobile ? 'logo-mobile' : ''}`} alt="Logo" />
            </div>
            <nav className={`navbar ${menuOpen ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Portfolio</a>
                <a href="/">Services</a>
            </nav>
            <div className="icons">
                <a href="/pagina-destino" className="icon-link">
                    <ShoppingCartIcon className="iconcart text-blue-500" />
                </a>
                <a href="/pagina-destino" className="icon-link">
                    <UserIcon className="iconuser text-blue-500" />
                </a>
            </div>
        </header>
    );
}

export default Navbar;
