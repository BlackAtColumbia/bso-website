import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import '../styles/StyleGuide.css';

const StyleGuide = ({ onClose }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    // Prevent body scroll when overlay is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            const newMutedState = !isMuted;
            videoRef.current.volume = 1.0;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
            if (newMutedState === false && videoRef.current.paused) {
                videoRef.current.play().catch(err => console.log('Play error:', err));
                setIsPlaying(true);
            }
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(err => console.log('Play error:', err));
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className="style-guide-overlay" onClick={onClose}>
            <div className="style-guide-content" onClick={(e) => e.stopPropagation()}>
                <button className="style-guide-close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                    <X size={32} />
                </button>

                <div className="style-guide-video-section" onClick={togglePlay}>
                    <video
                        ref={videoRef}
                        className="style-guide-video"
                        src="https://nclkgakontfhzstpwexb.supabase.co/storage/v1/object/public/public/videos/style-guide.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                    />

                    {!isPlaying && (
                        <div className="style-guide-play-overlay">
                            <Play size={64} fill="currentColor" />
                        </div>
                    )}

                    <button className="style-guide-mute-btn" onClick={toggleMute}>
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StyleGuide;
