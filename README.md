# Mudário

Controle do frag tank: parâmetros da água com faixas-alvo, corais com fotos 1:1 (luz azul e branca), mudas, contagem de pólipos e vitrine.

- Página estática no GitHub Pages; dados e fotos no Supabase (plano gratuito).
- Só a conta dona do mudário lê e edita os dados (regras de acesso no banco). A chave no código é a chave pública do Supabase.
- Instalável na tela inicial do celular (PWA).
- `.github/workflows/keepalive.yml` consulta o banco a cada 3 dias para o projeto gratuito não pausar.
