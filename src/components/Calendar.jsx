
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Clock, ExternalLink } from 'lucide-react';
import '../styles/Calendar.css';

const Calendar = ({ events }) => {
    // Helper to parse dates as local time to avoid timezone shifts
    const parseDate = (dateStr) => {
        if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day);
        }
        return new Date(dateStr);
    };

    // Find the next upcoming event from current datetime
    const getInitialMonth = () => {
        const now = new Date();

        // Filter events that are in the future
        const upcomingEvents = events
            .map(event => ({
                ...event,
                dateObj: parseDate(event.fullDate)
            }))
            .filter(event => event.dateObj >= now)
            .sort((a, b) => a.dateObj - b.dateObj);

        // If there's an upcoming event, show its month
        if (upcomingEvents.length > 0) {
            const nextEvent = upcomingEvents[0];
            return new Date(nextEvent.dateObj.getFullYear(), nextEvent.dateObj.getMonth(), 1);
        }

        // Otherwise, show current month
        return new Date(now.getFullYear(), now.getMonth(), 1);
    };

    const [currentDate, setCurrentDate] = useState(getInitialMonth());
    const [selectedEvent, setSelectedEvent] = useState(null);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setSelectedEvent(null); // Close modal when changing months
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setSelectedEvent(null); // Close modal when changing months
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getEventsForDay = (day) => {
        return events.filter(event => {
            const eventDate = parseDate(event.fullDate);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
        });
    };

    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before start of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty - ${i} `} className="calendar-day empty"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = getEventsForDay(day);
            const hasEvent = dayEvents.length > 0;
            const event = hasEvent ? dayEvents[0] : null; // Only one event per day

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${hasEvent ? 'has-event' : ''}`}
                    onClick={hasEvent ? () => setSelectedEvent(event) : undefined}
                    style={{ cursor: hasEvent ? 'pointer' : 'default' }}
                >
                    <span className="day-number">{day}</span>
                    {hasEvent && (
                        <div className="event-title" title={event.title}>
                            {event.title}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={prevMonth} className="calendar-nav-btn"><ChevronLeft /></button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={nextMonth} className="calendar-nav-btn"><ChevronRight /></button>
            </div>
            <div className="calendar-grid">
                <div className="calendar-weekday">Sun</div>
                <div className="calendar-weekday">Mon</div>
                <div className="calendar-weekday">Tue</div>
                <div className="calendar-weekday">Wed</div>
                <div className="calendar-weekday">Thu</div>
                <div className="calendar-weekday">Fri</div>
                <div className="calendar-weekday">Sat</div>
                {renderCalendarDays()}
            </div>

            {selectedEvent && (
                <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedEvent(null)}><X size={24} /></button>
                        <h3 className="modal-title">{selectedEvent.title}</h3>
                        <div className="modal-meta">
                            <div className="meta-item">
                                <Clock size={16} />
                                <span>{selectedEvent.time}</span>
                            </div>
                            <div className="meta-item">
                                <MapPin size={16} />
                                <span>{selectedEvent.location}</span>
                            </div>
                            <div className="meta-item">
                                <span>{selectedEvent.date}</span>
                            </div>
                        </div>
                        <p className="modal-description">{selectedEvent.description}</p>
                        {selectedEvent.link && (
                            <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="btn modal-btn">
                                Get Tickets <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
