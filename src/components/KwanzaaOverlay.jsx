import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import '../styles/KwanzaaOverlay.css';

const KwanzaaOverlay = ({ onClose }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isMuted, setIsMuted] = useState(true);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const fullText = `Kwanzaa is a week-long celebration of African American culture, family, and community, observed from December 26th to January 1st. Established in 1966 by Dr. Maulana Karenga, it is a time to reflect on our heritage and recommit to the values that strengthen us.

At the heart of Kwanzaa are the Nguzo Saba, or Seven Principles: Umoja (Unity), Kujichagulia (Self-Determination), Ujima (Collective Work and Responsibility), Ujamaa (Cooperative Economics), Nia (Purpose), Kuumba (Creativity), and Imani (Faith).

Our Annual Kwanzaa Ball embodies these principles in a night of "Black Opulence." It is more than just a celebration; it is a powerful affirmation of our identity, our achievements, and our shared future. Join us as we honor the past and inspire the generations to come.`;

    const textContainerRef = useRef(null);
    const videoRef = useRef(null);

    // Prevent body scroll when overlay is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;

                // Auto-scroll to bottom
                if (textContainerRef.current) {
                    textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
                }
            } else {
                clearInterval(intervalId);
                setIsTypingComplete(true);
            }
        }, 30);

        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs once

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !isMuted;

            // Set volume first
            videoRef.current.volume = 1.0;

            // Then unmute
            videoRef.current.muted = newMutedState;

            // Update state
            setIsMuted(newMutedState);

            // Ensure video is playing
            videoRef.current.play().catch(err => {
                console.log('Play error:', err);
            });

            console.log('Video muted state:', videoRef.current.muted, 'Volume:', videoRef.current.volume);
        }
    };

    return (
        <div className="kwanzaa-overlay" onClick={onClose}>
            <div className="kwanzaa-content" onClick={(e) => e.stopPropagation()}>
                <button className="kwanzaa-close-btn" onClick={onClose}>
                    <X size={32} />
                </button>

                <div className="kwanzaa-video-section">
                    <video
                        ref={videoRef}
                        className="kwanzaa-video"
                        src="https://nclkgakontfhzstpwexb.supabase.co/storage/v1/object/public/public/videos/kwaanza-snipet.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                    />
                    <button className="kwanzaa-mute-btn" onClick={toggleMute}>
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>

                <div className="kwanzaa-text-section">
                    <div className="kwanzaa-header">
                        <h2 className="kwanzaa-title">The Spirit of Kwanzaa</h2>
                        <a
                            href="https://events.columbia.edu/cal/event/eventView.do?b=de&calPath=/public/cals/MainCal&guid=CAL-00bbdb70-9a910ed3-019a-95783ab3-00001b78events@columbia.edu&recurrenceId="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kwanzaa-ticket-btn"
                        >
                            Get Tickets <ExternalLink size={16} />
                        </a>
                    </div>
                    <div
                        className="kwanzaa-description-container"
                        ref={textContainerRef}
                        style={{
                            pointerEvents: isTypingComplete ? 'auto' : 'none',
                            overflowY: isTypingComplete ? 'auto' : 'hidden'
                        }}
                    >
                        <div className="kwanzaa-description">
                            {displayedText}
                            <span className="cursor"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KwanzaaOverlay;
