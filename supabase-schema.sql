-- Execute no SQL Editor do Supabase.
-- 1) Crie o usuário admin em Authentication > Users.
-- 2) Copie o UUID desse usuário e substitua COLE_UUID_DO_ADMIN abaixo.
create table if not exists public.site_settings (
  id integer primary key check (id = 1),
  config jsonb not null default '{}'::jsonb,
  admin_uid uuid not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.page_stats (
  id integer primary key check (id = 1),
  views bigint not null default 0
);
insert into public.site_settings (id, config, admin_uid)
values (1, '{"site_name":"nosso canto","headline":"gente que é casa.","subtitle":"um cantinho nosso na internet.","footer_text":"feito entre amigos ♡","background_url":"","music_url":"","profiles":[{"name":"amigo 01","handle":"@discord","avatar":"","discord_url":"https://discord.com/users/"},{"name":"amigo 02","handle":"@discord","avatar":"","discord_url":"https://discord.com/users/"},{"name":"amigo 03","handle":"@discord","avatar":"","discord_url":"https://discord.com/users/"}]}', 'COLE_UUID_DO_ADMIN')
on conflict (id) do nothing;
insert into public.page_stats(id,views) values(1,0) on conflict(id) do nothing;
alter table public.site_settings enable row level security;
alter table public.page_stats enable row level security;
drop policy if exists "Public can read site config" on public.site_settings;
create policy "Public can read site config" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "Only admin can update config" on public.site_settings;
create policy "Only admin can update config" on public.site_settings for update to authenticated using (auth.uid() = admin_uid) with check (auth.uid() = admin_uid);
drop policy if exists "Public can read page stats" on public.page_stats;
create policy "Public can read page stats" on public.page_stats for select to anon, authenticated using (true);
create or replace function public.increment_page_views()
returns void language sql security definer set search_path = public as $$
  update public.page_stats set views = views + 1 where id = 1;
$$;
revoke all on function public.increment_page_views() from public;
grant execute on function public.increment_page_views() to anon, authenticated;
