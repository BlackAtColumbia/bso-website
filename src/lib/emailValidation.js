// Email validation utilities for Columbia domain checking

const ALLOWED_DOMAINS = [
    '@columbia.edu',
    '@cumc.columbia.edu',
    '@barnard.edu',
    '@tc.columbia.edu',
    '@uts.columbia.edu'
];

/**
 * Validates if an email belongs to an allowed Columbia domain
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email is from an allowed domain
 */
export const isValidColumbiaEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }

    const normalizedEmail = email.toLowerCase().trim();

    return ALLOWED_DOMAINS.some(domain => normalizedEmail.endsWith(domain));
};

/**
 * Gets a user-friendly error message for invalid emails
 * @param {string} email - The email address that was invalid
 * @returns {string} - Error message
 */
export const getEmailErrorMessage = (email) => {
    if (!email) {
        return 'Please enter an email address';
    }

    if (!email.includes('@')) {
        return 'Please enter a valid email address';
    }

    return 'Please use a Columbia University email address (@columbia.edu, @cumc.columbia.edu, @barnard.edu, @tc.columbia.edu, or @uts.columbia.edu)';
};

/**
 * Extracts the username from a Columbia email
 * This can be used in the future to look up the user in the Columbia database
 * @param {string} email - The email address
 * @returns {string} - The username portion of the email
 */
export const extractUsername = (email) => {
    if (!email || typeof email !== 'string') {
        return '';
    }

    return email.split('@')[0];
};
