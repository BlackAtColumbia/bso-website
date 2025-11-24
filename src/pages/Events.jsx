import React from 'react';
import EventCard from '../components/EventCard';
import InstagramFeed from '../components/InstagramFeed';
import '../styles/Events.css';

import { fetchEvents } from '../data/events';

const Events = () => {
    const [upcomingEvents, setUpcomingEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadEvents = async () => {
            try {
                const allEvents = await fetchEvents();
                // Filter for upcoming events (today or later)
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const futureEvents = allEvents.filter(event => {
                    const eventDate = new Date(event.fullDate);
                    return eventDate >= today;
                });

                setUpcomingEvents(futureEvents);
            } catch (error) {
                console.error('Error loading events:', error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    return (
        <div className="events-page">
            <header className="events-header">
                <div className="container text-center">
                    <h1 className="section-title">Events & Community</h1>
                    <p className="events-intro">
                        Stay connected with everything happening in the BSO community.
                    </p>
                </div>
            </header>

            {/* 1. Upcoming Events List */}
            <section className="section upcoming-events-section mt-4">
                <div className="container">
                    <h2 className="text-center mb-4">Upcoming Events</h2>
                    {loading ? (
                        <div className="text-center">Loading events...</div>
                    ) : upcomingEvents.length > 0 ? (
                        <div className="events-grid">
                            {upcomingEvents.map(event => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p>No upcoming events scheduled at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 2. Instagram Feed */}
            <section className="section instagram-section">
                <div className="container">
                    <h2 className="text-center mb-2">Latest from Instagram</h2>
                    <InstagramFeed />
                </div>
            </section>
        </div>
    );
};

export default Events;
