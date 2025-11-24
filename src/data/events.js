import { supabase } from '../lib/supabaseClient';

export const fetchEvents = async () => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('full_date', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }

    return data.map(event => ({
        id: event.id,
        title: event.title,
        fullDate: event.full_date,
        date: event.date_display,
        time: event.time,
        location: event.location,
        description: event.description,
        link: event.link,
        buttonText: event.button_text,
        image: event.image
    }));
};

// Keep an empty array or initial state if needed, but we'll primarily use fetchEvents
export const events = []; 
