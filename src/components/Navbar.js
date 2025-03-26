import React, { useState, useEffect } from 'react';
import { UserIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import '../styles/Navbar.css';
import { Bokor } from 'next/font/google';
const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
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
                <Link href="/">
                    <img src="images/logo.png" className={`logo ${isMobile ? 'logo-mobile' : ''}`} alt="Logo" />
                </Link>
            </div>
            <nav className={`navbar ${menuOpen ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}>
                <Link href="/vinil" className={bokorFont.className}>Vinil</Link>
                <Link href="/cd" className={bokorFont.className}>CD</Link>
                <Link href="/merch" className={bokorFont.className}>Merch</Link>
            </nav>
            
            <ClerkProvider>
                <header className="button-container">
                    <div className="icons flex items-center gap-4">
                        <Link href="/pagina-destino" className="icon-link">
                            <ShoppingCartIcon className="iconcart text-blue-500" />
                        </Link>
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