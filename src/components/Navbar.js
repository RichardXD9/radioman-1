import React, { useState, useEffect } from 'react';
import { UserIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Bokor } from 'next/font/google';
const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        // Update cart count from localStorage
        const updateCartCount = () => {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            setCartItemCount(cartItems.length);
        };
        
        // Initial count
        updateCartCount();
        
        // Set up event listener for storage changes
        window.addEventListener('storage', updateCartCount);
        
        // Custom event for cart updates within the same window
        window.addEventListener('cartUpdated', updateCartCount);
        
        return () => {
            window.removeEventListener('resize', checkScreenSize);
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
        };
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
                    <img src="/images/logo.png" className={`logo ${isMobile ? 'logo-mobile' : ''}`} alt="Logo" />
                </Link>
            </div>
            <nav className={`navbar ${menuOpen ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}>
                <Link href="/vinil" className={bokorFont.className}>Vinil</Link>
                <Link href="/cd" className={bokorFont.className}>CD</Link>
                <Link href="/merch" className={bokorFont.className}>Merch</Link>
            </nav>
            
            <header className="button-container">
                <div className="icons flex items-center gap-4">
                    <Link href="/shoppingcart" className="icon-link relative">
                        <ShoppingCartIcon className="iconcart text-blue-500" />
                        {cartItemCount > 0 && (
                            <span className="cart-badge">{cartItemCount}</span>
                        )}
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
        </header>
    );
}

export default Navbar;