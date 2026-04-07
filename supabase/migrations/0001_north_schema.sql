create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.north_star (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  mission text not null default '',
  vision_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.life_layers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.layer_goals (
  id uuid primary key default gen_random_uuid(),
  layer_id uuid not null references public.life_layers(id) on delete cascade,
  title text not null,
  description text not null default '',
  target_date date,
  status text not null default 'Not started',
  created_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  timeframe text not null check (timeframe in ('weekly','monthly','yearly')),
  linked_layer_id uuid references public.life_layers(id) on delete set null,
  status text not null default 'Not started',
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.metric_entries (
  id uuid primary key default gen_random_uuid(),
  metric_id uuid not null references public.metrics(id) on delete cascade,
  value numeric not null,
  date date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  description text not null,
  time_cost numeric not null,
  expected_return numeric not null,
  alignment_score int not null,
  recommendation text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  content text not null default '',
  category text not null default 'General',
  created_at timestamptz not null default now()
);

drop trigger if exists trg_north_star_updated_at on public.north_star;
create trigger trg_north_star_updated_at before update on public.north_star for each row execute function public.set_updated_at();
drop trigger if exists trg_goals_updated_at on public.goals;
create trigger trg_goals_updated_at before update on public.goals for each row execute function public.set_updated_at();

alter table public.north_star enable row level security;
alter table public.life_layers enable row level security;
alter table public.layer_goals enable row level security;
alter table public.goals enable row level security;
alter table public.metrics enable row level security;
alter table public.metric_entries enable row level security;
alter table public.decisions enable row level security;
alter table public.notes enable row level security;

create policy "north_star_own_rows" on public.north_star for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "life_layers_own_rows" on public.life_layers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "goals_own_rows" on public.goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "metrics_own_rows" on public.metrics for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "decisions_own_rows" on public.decisions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notes_own_rows" on public.notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "layer_goals_owner" on public.layer_goals
for all using (exists (select 1 from public.life_layers ll where ll.id = layer_id and ll.user_id = auth.uid()))
with check (exists (select 1 from public.life_layers ll where ll.id = layer_id and ll.user_id = auth.uid()));

create policy "metric_entries_owner" on public.metric_entries
for all using (exists (select 1 from public.metrics m where m.id = metric_id and m.user_id = auth.uid()))
with check (exists (select 1 from public.metrics m where m.id = metric_id and m.user_id = auth.uid()));

create index if not exists idx_life_layers_user_id on public.life_layers(user_id);
create index if not exists idx_goals_user_id on public.goals(user_id);
create index if not exists idx_metrics_user_id on public.metrics(user_id);
create index if not exists idx_notes_user_id on public.notes(user_id);
create index if not exists idx_decisions_user_id on public.decisions(user_id);

insert into public.life_layers (user_id, name)
select auth.uid(), x.name
from (values ('Knowledge'), ('Credentials'), ('Skills'), ('Business'), ('Wealth')) as x(name)
where auth.uid() is not null;
