import React from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3 className="footer-logo">Columbia <span className="text-gold">BSO</span></h3>
                    <p>Empowering Black students at Columbia University since 1968.</p>
                </div>

                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="https://www.instagram.com/columbiabso/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} />
                        </a>
                        <a href="mailto:bso@columbia.edu">
                            <Mail size={20} />
                        </a>
                    </div>
                    <div className="location">
                        <MapPin size={16} />
                        <span> 627 W 115th St, New York, NY</span>
                    </div>
                </div>

                <div className="footer-section" id="newsletter">
                    <h4>Newsletter</h4>
                    <p>Stay updated with our latest events and news.</p>
                    <NewsletterForm variant="small" />
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Columbia Black Student Organization. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
