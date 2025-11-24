import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    Columbia <span className="text-gold">BSO</span>
                </Link>

                <div className="navbar-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/board" className={isActive('/board')} onClick={() => setIsOpen(false)}>Board</Link>
                    </li>
                    <li>
                        <Link to="/events" className={isActive('/events')} onClick={() => setIsOpen(false)}>Events</Link>
                    </li>
                    <li>
                        <Link to="/calendar" className={isActive('/calendar')} onClick={() => setIsOpen(false)}>Calendar</Link>
                    </li>
                    <li>
                        <a href="https://instagram.com/columbiabso" style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpen(false)}>
                            <Instagram size={22} />
                        </a>
                    </li>
                    <li>
                        <a href="#newsletter" className="btn-nav" onClick={() => setIsOpen(false)}>Join Us</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
