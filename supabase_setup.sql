-- Run this script in the Supabase SQL Editor to set up your project

-- 1. Create the board_members table
create table if not exists public.board_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text unique not null,
  role text,
  major text,
  school text,
  year text,
  headshot_url text
);

-- 2. Enable Row Level Security (RLS)
alter table public.board_members enable row level security;

-- 3. Create a policy that allows everyone to read the board members
create policy "Enable read access for all users"
on public.board_members
for select
using (true);

-- 4. Create a policy that allows service role (admin) to insert/update/delete
create policy "Enable all access for service role"
on public.board_members
for all
to service_role
using (true)
with check (true);


-- 5. Create the 'public' storage bucket (if it doesn't exist)
insert into storage.buckets (id, name, public)
values ('public', 'public', true)
on conflict (id) do nothing;

-- 6. Set up storage policies for the 'public' bucket

-- Allow public read access to files
create policy "Give public access to files"
on storage.objects
for select
to public
using (bucket_id = 'public');

-- Allow service role to upload/update/delete files
create policy "Give service role full access"
on storage.objects
for all
to service_role
using (bucket_id = 'public')
with check (bucket_id = 'public');

-- 7. Create events table
create table if not exists public.events (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    full_date date not null,
    date_display text not null, -- e.g. "02 Sep"
    time text not null, -- e.g. "9:00 PM"
    location text,
    description text,
    link text,
    button_text text,
    image text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security for events
alter table public.events enable row level security;

-- Create policy to allow public read access for events
create policy "Allow public read access" on public.events
    for select using (true);

-- Create policy to allow service role to manage events
create policy "Enable all access for service role for events"
on public.events
for all
to service_role
using (true)
with check (true);
