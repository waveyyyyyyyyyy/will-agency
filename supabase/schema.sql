-- Supernova — client registrations
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- after creating your project. Safe to re-run — every statement is guarded.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  username text,
  email text not null,
  phone text not null,
  privacy_consent_at timestamptz not null,
  medical_consent_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

-- Each client can read only their own row.
drop policy if exists "clients can read their own row" on public.clients;
create policy "clients can read their own row"
  on public.clients for select
  using (auth.uid() = user_id);

-- Each client can create only their own row, at signup.
drop policy if exists "clients can insert their own row" on public.clients;
create policy "clients can insert their own row"
  on public.clients for insert
  with check (auth.uid() = user_id);

-- No update/delete policy for clients on purpose — the RLS policies above
-- are the only door open from the app. The project owner manages every row
-- (view, edit, export, delete) from the Supabase dashboard's Table Editor,
-- which authenticates as you, not as any client, and bypasses RLS — that
-- dashboard *is* the "gestionale" (client management view) asked for; no
-- separate admin panel needs to be built.
