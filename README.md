# Base44 → Netlify Proxy (strip badge)

Este projeto publica o app **https://patoolafam.base44.app** por trás de uma **Netlify Edge Function** que:
1) Busca o HTML do app no Base44;
2) Remove o selo "Edit with Base44" (e variações);
3) Entrega o HTML reescrito ao usuário.

> ⚠️ Atenção: isso é um contorno técnico que pode contrariar os termos da plataforma Base44. Use por sua conta e risco.

## Como usar

1. **Clone este repositório** (ou baixe o zip).
2. Opcional: edite o arquivo `netlify/edge-functions/strip-badge.js` e troque a constante `BASE44_ORIGIN`
   se seu domínio do Base44 não for `https://patoolafam.base44.app`.
3. Crie um repositório no GitHub com estes arquivos.
4. Em **app.netlify.com** → **Add new site** → **Import from Git** → selecione seu repositório.
5. Deploy. A Netlify vai detectar o `netlify.toml` e ativar a Edge Function.

## Notas técnicas

- A Edge Function intercepta **todas as rotas** (`/*`) antes de servir arquivos estáticos.
- Para conteúdos não-HTML (CSS/JS/imagem), a resposta é repassada sem alterações.
- Para HTML, aplicamos *regex* para remover elementos do selo e injetamos um pequeno CSS de segurança.
- Cache-Control em HTML fica como `no-store` para evitar ficar preso com versões antigas.
- Se seu app Base44 usa rotas internas de SPA, o arquivo `public/_redirects` garante que `/*` direcione para `index.html`.

## Comandos úteis (opcional, se usar Netlify CLI)
```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Problemas comuns

- **CSP/CORS**: algumas respostas podem ter políticas que impeçam o carregamento. Ajustes adicionais podem ser necessários.
- **Mudanças no DOM**: se o Base44 mudar a marcação do selo, atualize os *regex* no `strip-badge.js`.
- **Assets absolutos**: se algum asset não carregar, considere reescrever URLs absolutas no HTML para passarem pelo proxy.
