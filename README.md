# Black Student Organization (BSO) Website

This is the official website for the Black Student Organization at Columbia University. It is built with React, Vite, and Supabase.

## Features

- **Home**: Landing page with Kwanzaa overlay and featured content.
- **Events**: Upcoming events listing with Supabase integration.
- **Board**: Meet the board members.
- **Calendar**: Interactive calendar of events.
- **Newsletter**: Email subscription form.

## Tech Stack

- **Frontend**: React, Vite, CSS (Vanilla & Modules)
- **Backend/Database**: Supabase (PostgreSQL, Storage, Auth)
- **Deployment**: (Add deployment details if known, e.g., Vercel/Netlify)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd bso-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Copy `.env.example` to `.env` and fill in your Supabase credentials.
    ```bash
    cp .env.example .env
    ```
    
    Required variables:
    - `VITE_SUPABASE_URL`: Your Supabase Project URL.
    - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
    - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (required only for admin scripts in `supabase-integration/`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Admin Scripts

The `supabase-integration/` directory contains scripts for uploading data to Supabase.
- `npm run upload:video`: Uploads video assets.
- `npm run upload:board`: Uploads board member info from CSV.
- `npm run upload:events`: Uploads events data.

## License

[MIT](LICENSE) 
