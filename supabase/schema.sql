-- Run this in Supabase SQL Editor.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-zA-Z0-9_-]{3,30}$'),
  full_name text not null,
  developer_id text unique,
  role text default '',
  location text default '',
  bio text default '',
  skills text[] not null default '{}',
  website text default '',
  github text default '',
  linkedin text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users can create their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create or replace function public.assign_developer_id()
returns trigger language plpgsql security definer set search_path = public as $$
begin
 if new.developer_id is null then
   new.developer_id := 'UHB-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.developer_id_seq')::text,5,'0');
 end if;
 new.updated_at := now();
 return new;
end; $$;
create sequence if not exists public.developer_id_seq start 1;
drop trigger if exists set_developer_id on public.profiles;
create trigger set_developer_id before insert on public.profiles for each row execute function public.assign_developer_id();


-- Automatically create a profile from signup metadata. This works even when
-- email confirmation is enabled and the browser has no authenticated session yet.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  requested_username text;
  requested_name text;
begin
  requested_username := lower(coalesce(new.raw_user_meta_data->>'username',''));
  requested_name := coalesce(new.raw_user_meta_data->>'full_name','New Developer');
  if requested_username !~ '^[a-z0-9_-]{3,30}$' then
    requested_username := 'user_' || substr(replace(new.id::text,'-',''),1,12);
  end if;
  insert into public.profiles (id, username, full_name)
  values (new.id, requested_username, requested_name)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
