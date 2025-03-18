import React, { useState, useEffect } from 'react';
import { UserIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/solid';
import '../styles/Navbar.css';
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
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
            
            <ClerkProvider>
                
                <header className="button-container">
                <div className="icons flex items-center gap-4">
                <a href="/pagina-destino" className="icon-link">
                    <ShoppingCartIcon className="iconcart text-blue-500" />
                </a>

            </div>
        
            <SignedOut>
              <SignInButton className="logincarai"/>
              <SignUpButton className="registecarai"/>
            </SignedOut>
            <SignedIn>
              <UserButton  />
            </SignedIn>
          </header>
          </ClerkProvider>

        </header>

        
    );
}

export default Navbar;
