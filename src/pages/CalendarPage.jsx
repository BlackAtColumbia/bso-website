import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import { fetchEvents } from '../data/events';
import '../styles/Events.css'; // Reusing Events styles for consistency

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            const data = await fetchEvents();
            setEvents(data);
            setLoading(false);
        };
        loadEvents();
    }, []);

    return (
        <div className="events-page">
            <header className="events-header">
                <div className="container text-center">
                    <h1 className="section-title">Event Calendar</h1>
                    <p className="events-intro">
                        View all our upcoming events and important dates.
                    </p>
                </div>
            </header>

            <section className="section calendar-section">
                <div className="container">
                    {loading ? (
                        <div className="text-center">Loading calendar...</div>
                    ) : (
                        <Calendar events={events} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default CalendarPage;
