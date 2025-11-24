import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import KwanzaaOverlay from '../components/KwanzaaOverlay';
import StyleGuide from '../components/StyleGuide';
import NewsletterForm from '../components/NewsletterForm';
import '../styles/Home.css';

const Home = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showStyleGuide, setShowStyleGuide] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7;
        }
    }, []);

    useEffect(() => {
        setShowOverlay(true);
    }, []);
    return (
        <div className="home">
            {/* Hero Section - Kwanza Ball */}
            <section className="hero">
                <video
                    ref={videoRef}
                    className="hero-video"
                    src="https://nclkgakontfhzstpwexb.supabase.co/storage/v1/object/public/public/videos/kwaanza-snipet.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <span className="hero-subtitle">December 5th, 2025</span>
                    <h1 className="hero-title">Kwanza Ball</h1>
                    <p className="hero-theme">Theme: Black Opulence</p>
                    <div className="hero-cta">
                        <a href="https://events.columbia.edu/cal/event/eventView.do?b=de&calPath=/public/cals/MainCal&guid=CAL-00bbdb70-9a910ed3-019a-95783ab3-00001b78events@columbia.edu&recurrenceId=" target="_blank" rel="noopener noreferrer" className="btn modal-btn">
                            Get Tickets <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                        </a>
                        <button onClick={() => setShowStyleGuide(true)} className="btn btn-outline">Style Guide</button>

                    </div>
                </div>
            </section >

            {showOverlay && <KwanzaaOverlay onClose={() => setShowOverlay(false)} />}
            {showStyleGuide && <StyleGuide onClose={() => setShowStyleGuide(false)} />}

            {/* About Section */}
            <section className="section about-section">
                <div className="container">
                    <h2 className="section-title">Who We Are</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>
                                The Columbia Black Student Organization (BSO) is dedicated to fostering a supportive community
                                for Black students at Columbia University. We strive to promote cultural awareness,
                                academic excellence, and social engagement through a variety of events and initiatives.
                            </p>
                            <p className="mt-1">
                                Since 1968, we have been a voice for change and a home for students seeking connection
                                and empowerment. Join us in building a legacy of excellence.
                            </p>
                            <Link to="/board" className="btn mt-2">Meet the Board</Link>
                        </div>
                        <div className="about-image">
                            <div className="group-photo">
                                <img src="https://nclkgakontfhzstpwexb.supabase.co/storage/v1/object/public/public/group-photos/IMG_1860.jpg" alt="BSO Community Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Preview */}
            <section className="section events-preview">
                <div className="container">
                    <h2 className="section-title">Upcoming Events</h2>
                    <div className="events-grid">
                        <div className="event-card-preview">
                            <div className="event-date">
                                <span className="day">05</span>
                                <span className="month">DEC</span>
                            </div>
                            <div className="event-details">
                                <h3>Annual Kwanza Ball</h3>
                                <p>Experience a night of elegance and celebration.</p>
                                <a href="https://events.columbia.edu/cal/event/eventView.do?b=de&calPath=/public/cals/MainCal&guid=CAL-00bbdb70-9a910ed3-019a-95783ab3-00001b78events@columbia.edu&recurrenceId=" target="_blank" rel="noopener noreferrer" className="event-link">
                                    Get Tickets <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                        {/* More event previews can be added here */}
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/calendar" className="btn btn-outline">View Full Calendar</Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="section newsletter-section">
                <div className="container text-center">
                    <h2>Stay Connected</h2>
                    <p className="mb-2">Join our newsletter to receive updates on events, opportunities, and community news.</p>
                    <NewsletterForm />
                </div>
            </section>
        </div >
    );
};

export default Home;
