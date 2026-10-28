# Site de amigos — guia rápido

Este é um modelo de site responsivo inspirado na imagem enviada: perfis lado a lado, fundo em vídeo, música, contador de visitas e painel de administrador com login.

## Arquivos
- `index.html`: página pública
- `admin.html`: painel privado
- `app.js` e `admin.js`: comportamento e configuração
- `style.css`: visual
- `supabase-schema.sql`: tabelas e regras de segurança

## Para funcionar online com painel seguro
1. Crie um projeto grátis em https://supabase.com/
2. Em **Authentication > Users**, crie o usuário administrador com seu e-mail e senha. Desative o cadastro público (sign ups) em Authentication, para ninguém criar conta por conta própria.
3. Copie o UUID do usuário criado. Abra `supabase-schema.sql`, substitua `COLE_UUID_DO_ADMIN` pelo UUID real e execute o arquivo no SQL Editor do Supabase.
4. Em Project Settings > API, copie Project URL e a chave pública **anon/publishable**. Cole em `app.js` e `admin.js` nas constantes `SUPABASE_URL` e `SUPABASE_ANON_KEY`. Nunca coloque a chave `service_role` no navegador.
5. Publique a pasta em https://pages.cloudflare.com/ ou https://www.netlify.com/ (ambos têm opções gratuitas). Você pode arrastar os arquivos para o serviço escolhido, se ele oferecer deploy manual.
6. A página pública fica em `index.html`; o painel fica em `admin.html`. Entre com o e-mail e a senha criados no Supabase.

## Personalizar
No painel, coloque URLs diretas de arquivos acessíveis publicamente:
- Vídeo: MP4 ou WebM. Use um arquivo hospedado que permita hotlink/CORS.
- Música: MP3 ou OGG.
- Fotos: URLs de imagem.
- Discord: link de perfil, normalmente `https://discord.com/users/ID_DO_USUARIO`.

## Observações importantes
- Navegadores normalmente bloqueiam música com som automático; o visitante pode precisar clicar no botão ♫. O botão é discreto, mas não totalmente invisível, para permitir ligar/desligar.
- O contador usa uma chamada ao banco e conta carregamentos da página; não é um contador de visitantes únicos e pode ser afetado por bots/refreshes.
- O painel usa e-mail/senha do Supabase, não um usuário textual separado.
- Não compartilhe a senha do administrador. Confirme que o UUID inserido no SQL é o seu usuário.
- O modelo usa URLs de mídia; não faz upload de arquivos dentro do painel.
