-- Execute no SQL Editor do Supabase depois de criar o bucket privado
-- "projetos-privados" (Storage > New bucket > Public: OFF).

create policy "authenticated_read_private_projects"
on storage.objects
for select
to authenticated
using (bucket_id = 'projetos-privados');
