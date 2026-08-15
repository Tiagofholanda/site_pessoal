# Projetos privados — como administrar

O site público fica no GitHub Pages. Login e imagens confidenciais ficam no **Supabase**, fora do repositório.

## 1. Criar o projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com) e crie um projeto.
2. Em **Project Settings > API**, copie:
   - Project URL
   - `anon` / public key
3. Crie o arquivo `.env.local` na raiz do site (não commitar):

```
NEXT_PUBLIC_BASE_PATH=/site_pessoal
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

4. Em **Authentication > Providers**, deixe **Email** ligado.
5. Em **Authentication > Providers > Email**, desligue **Confirm email** se você for criar os usuários à mão (senão o cliente precisa confirmar o e-mail antes de entrar).

## 2. Bucket privado

1. Abra **Storage > New bucket**.
2. Nome: `projetos-privados`
3. **Public bucket: desligado**
4. No **SQL Editor**, rode o arquivo `supabase/storage.sql`.

## 3. Enviar as imagens

Faça upload no bucket `projetos-privados` com estes nomes exatos:

- `webgis-municipal.jpg`
- `webgis-devgis.jpg`
- `webgis-audit.jpg`
- `webgis-epi.jpg`
- `spatial-db.jpg`
- `aero.jpg`

Sem esses arquivos, a área logada mostra o título e a descrição, mas não a captura.

## 4. Criar login e senha para um cliente

1. **Authentication > Users > Add user > Create new user**
2. Informe o e-mail da pessoa e uma senha forte.
3. Envie o e-mail e a senha por um canal privado (WhatsApp ou e-mail).
4. A pessoa entra em `/pt/login/` e, depois do acesso, vê `/pt/projetos-privados/`.

Para encerrar o acesso, delete ou desative o usuário no painel do Supabase.

## 5. Publicar o site com as chaves

O GitHub Pages é estático: as variáveis `NEXT_PUBLIC_*` entram no build.

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/site_pessoal"
$env:NEXT_PUBLIC_SUPABASE_URL="https://SEU-PROJETO.supabase.co"
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-anon-key"
npm run build
```

Depois publique a pasta `out/` na branch `gh-pages`, como já é feito hoje.

Sem essas variáveis, o site continua no ar: a área pública funciona e a restrita pede contato pelo WhatsApp.

## 6. O que já saiu da internet pública

As capturas que estavam em `public/portfolio/` foram removidas do código e da publicação atual.

Elas ainda podem existir no **histórico** do GitHub (`main` e `gh-pages` antigos). Isso não é o mesmo que estar no site ao vivo, mas o arquivo já foi público. Se precisar apagar o histórico, faça isso depois, com cuidado, e avise quem eventualmente baixou o repositório.
