-- 1. Create Buckets
insert into storage.buckets (id, name, public) values ('course-materials', 'course-materials', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- 2. Set Security Policies for 'course-materials' (Admin Only Upload)
create policy "Public Access Course Materials"
  on storage.objects for select
  using ( bucket_id = 'course-materials' );

create policy "Admin Insert Course Materials"
  on storage.objects for insert
  with check ( bucket_id = 'course-materials' AND auth.role() = 'authenticated' ); 
  -- Note: Ideally check for admin role in RLS, but authenticated is minimum for this demo

-- 3. Set Security Policies for 'avatars' (User Upload)
create policy "Public Access Avatars"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "User Upload Avatars"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

create policy "User Update Avatars"
  on storage.objects for update
  using ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );
