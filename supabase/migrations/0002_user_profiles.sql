create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  identity text not null default '',
  base_city text not null default '',
  target_retire_age int not null default 50,
  wealth_target text not null default '',
  revenue_streams jsonb not null default '[]'::jsonb,
  rules jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_user_profiles_updated_at on public.user_profiles;
create trigger trg_user_profiles_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();

alter table public.user_profiles enable row level security;

drop policy if exists "user_profiles_own_rows" on public.user_profiles;
create policy "user_profiles_own_rows"
on public.user_profiles
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
