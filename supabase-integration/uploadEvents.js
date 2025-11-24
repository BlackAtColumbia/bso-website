import supabase from './supabaseClient.js';
import { events } from '../src/data/events.js';

const uploadEvents = async () => {
    console.log(`Starting upload of ${events.length} events...`);

    for (const event of events) {
        const { id, title, fullDate, date, time, location, description, link, buttonText, image } = event;

        // Map fields to snake_case for Supabase
        const eventData = {
            // We can let Supabase generate the ID, or use the existing one if it's a valid UUID.
            // The existing IDs are like 'sep2', which are NOT UUIDs. 
            // So we will NOT send the 'id' field and let Supabase generate a new UUID.
            // However, to avoid duplicates if we run this multiple times, we might want to check existence.
            // For now, we'll just insert. If we wanted to be idempotent, we'd need a unique key (like title+date).
            title,
            full_date: fullDate,
            date_display: date,
            time,
            location,
            description,
            link,
            button_text: buttonText,
            image
        };

        const { data, error } = await supabase
            .from('events')
            .insert([eventData])
            .select();

        if (error) {
            console.error(`Error uploading event "${title}":`, error.message);
        } else {
            console.log(`Successfully uploaded event "${title}"`);
        }
    }

    console.log('Upload complete!');
};

uploadEvents();
