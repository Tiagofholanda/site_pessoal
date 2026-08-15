# THGIS — Tiago Holanda Geospatial

Site institucional de consultoria GIS, cadastro territorial e WebGIS. Visual e deploy no mesmo modelo do [sogis-page](https://silasogis.github.io/sogis-page/pt): Next.js estático no GitHub Pages, bilíngue PT/EN.

Conteúdo baseado no portfólio [tiagofholanda.streamlit.app](https://tiagofholanda.streamlit.app/).

## Rodar local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — o endereço `/` redireciona para `/pt`.

## Publicar no GitHub Pages

1. Crie o repositório (por exemplo `site_pessoal`) e envie este código para a branch `main`.
2. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
3. O workflow `.github/workflows/deploy.yml` gera o site estático e publica em:

`https://<seu-usuario>.github.io/<nome-do-repo>/pt`

O `basePath` é o nome do repositório, igual ao site do Silas.

## Estrutura

- `src/app/[locale]/page.tsx` — landing (hero, desafio, SIGTER, pilares, portfólio, contato)
- `src/app/[locale]/curriculo/page.tsx` — histórico profissional e acadêmico (ATOS + Lattes)
- `src/messages/pt.json` e `en.json` — textos
- `src/components/` — navbar, rodapé, seletor de idioma

## Contato no site

- E-mail: tfholanda@gmail.com
- WhatsApp: +55 81 99667-4681
