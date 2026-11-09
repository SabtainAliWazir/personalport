begin;

create table if not exists public.portfolio_request_windows (
  bucket text not null,
  subject text not null,
  window_start timestamptz not null,
  hits integer not null,
  primary key (bucket, subject)
);
create index if not exists portfolio_request_windows_expiry
  on public.portfolio_request_windows (window_start);

create table if not exists public.portfolio_events (
  event text not null check (event in (
    'case_study_contact_click', 'service_contact_click', 'whatsapp_click',
    'inquiry_accepted', 'inquiry_provider_error'
  )),
  event_id uuid not null,
  day date not null default (now() at time zone 'utc')::date,
  primary key (event, event_id)
);

alter table public.portfolio_request_windows enable row level security;
alter table public.portfolio_events enable row level security;
revoke all on public.portfolio_request_windows, public.portfolio_events from public, anon, authenticated;
grant select, insert on public.portfolio_events to service_role;

create or replace function public.portfolio_consume_quota(
  p_bucket text, p_subject text, p_limit integer, p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_window timestamptz := date_bin(
    make_interval(secs => p_window_seconds),
    statement_timestamp(),
    timestamptz '2020-01-01 00:00:00+00'
  );
  accepted integer;
begin
  delete from public.portfolio_request_windows
  where window_start < statement_timestamp() - interval '1 day';

  insert into public.portfolio_request_windows as quota (bucket, subject, window_start, hits)
  values (p_bucket, p_subject, current_window, 1)
  on conflict (bucket, subject) do update
  set window_start = greatest(quota.window_start, excluded.window_start),
      hits = case when quota.window_start < excluded.window_start then 1 else quota.hits + 1 end
  where quota.window_start < excluded.window_start or quota.hits < p_limit
  returning hits into accepted;

  return accepted is not null;
end;
$$;

revoke all on function public.portfolio_consume_quota(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.portfolio_consume_quota(text, text, integer, integer) to service_role;

commit;
