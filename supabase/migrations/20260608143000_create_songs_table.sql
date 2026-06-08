create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  sections jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.songs disable row level security;

grant select, insert, update on table public.songs to anon;
grant select, insert, update on table public.songs to authenticated;
