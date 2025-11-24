import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { isValidColumbiaEmail, getEmailErrorMessage } from '../lib/emailValidation';

const NewsletterForm = ({ variant = 'large' }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email domain
        if (!isValidColumbiaEmail(email)) {
            setStatus('error');
            setMessage(getEmailErrorMessage(email));
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const { data, error } = await supabase
                .from('email_subscribers')
                .insert([
                    {
                        email: email.toLowerCase().trim(),
                        is_active: true
                    }
                ]);

            if (error) {
                // Check if it's a duplicate email error
                if (error.code === '23505') {
                    setStatus('error');
                    setMessage('This email is already subscribed!');
                } else {
                    throw error;
                }
            } else {
                setStatus('success');
                setMessage('Successfully subscribed! Check your email for updates.');
                setEmail('');

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setStatus('idle');
                    setMessage('');
                }, 5000);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            setStatus('error');
            setMessage('Something went wrong. Please try again later.');
        }
    };

    const formClassName = variant === 'large' ? 'newsletter-form-large' : 'newsletter-form';

    return (
        <div className="newsletter-form-container">
            <form className={formClassName} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder={variant === 'large' ? 'Enter your email address' : 'Your email address'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                />
                <button
                    type="submit"
                    className="btn"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {message && (
                <div className={`newsletter-message ${status === 'success' ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default NewsletterForm;
