import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import '../styles/EventCard.css';

const EventCard = ({ title, date, time, location, image, description, link, buttonText }) => {
    return (
        <div className="event-card">
            <div className="event-card-image">
                {image ? (
                    <img src={image} alt={title} />
                ) : (
                    <div className="event-placeholder-image">
                        <span>Event Image</span>
                    </div>
                )}
                <div className="event-date-badge">
                    <span className="event-day">{date.split(' ')[0]}</span>
                    <span className="event-month">{date.split(' ')[1]}</span>
                </div>
            </div>
            <div className="event-card-content">
                <h3 className="event-title">{title}</h3>
                <div className="event-meta">
                    <div className="meta-item">
                        <Clock size={16} />
                        <span>{time}</span>
                    </div>
                    <div className="meta-item">
                        <MapPin size={16} />
                        <span>{location}</span>
                    </div>
                </div>
                <p className="event-description">{description}</p>
                {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="btn-text">
                        {buttonText || "View Details"}
                    </a>
                ) : (
                    <button className="btn-text">View Details</button>
                )}
            </div>
        </div>
    );
};

export default EventCard;
