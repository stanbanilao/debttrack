-- ThynkDebtTrack starter schema (architecture draft, not a finished production migration)
create extension if not exists pgcrypto;

create table if not exists counsellor_orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  whatsapp_number text,
  created_at timestamptz not null default now()
);

create table if not exists admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid not null references counsellor_orgs(id) on delete cascade,
  role text not null default 'admin' check (role in ('owner','admin','counsellor'))
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references counsellor_orgs(id) on delete cascade,
  portal_user_id uuid references auth.users(id) on delete set null,
  external_ref text,
  full_name text not null,
  mobile text,
  id_hash text not null,
  id_last4 text,
  assigned_counsellor text,
  current_stage text not null default 'Application Received',
  update_requested boolean not null default false,
  last_updated timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists clients_org_idx on clients(org_id);
create index if not exists clients_portal_user_idx on clients(portal_user_id);

create table if not exists client_invites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  token_hash text not null unique,
  channel text check (channel in ('sms','whatsapp','manual')),
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists journey_events (
  id bigint generated always as identity primary key,
  client_id uuid not null references clients(id) on delete cascade,
  stage text not null,
  note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists journey_events_client_idx on journey_events(client_id,created_at desc);

alter table counsellor_orgs enable row level security;
alter table admin_profiles enable row level security;
alter table clients enable row level security;
alter table client_invites enable row level security;
alter table journey_events enable row level security;

create policy "admins read own profile" on admin_profiles for select to authenticated using (user_id = auth.uid());

create policy "org admins read clients" on clients for select to authenticated using (
  org_id in (select org_id from admin_profiles where user_id = auth.uid())
  or portal_user_id = auth.uid()
);
create policy "org admins update clients" on clients for update to authenticated using (
  org_id in (select org_id from admin_profiles where user_id = auth.uid())
) with check (
  org_id in (select org_id from admin_profiles where user_id = auth.uid())
);

create policy "client reads own journey" on journey_events for select to authenticated using (
  client_id in (select id from clients where portal_user_id = auth.uid())
  or client_id in (select c.id from clients c join admin_profiles a on a.org_id=c.org_id where a.user_id=auth.uid())
);

-- IMPORTANT: token verification, ID-HMAC comparison, anonymous-session binding, invite creation,
-- and admin spreadsheet import should happen in Supabase Edge Functions using the service role.
-- Never expose service_role keys in the browser and never store raw invitation tokens here.
