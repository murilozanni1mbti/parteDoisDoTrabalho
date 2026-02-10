# Projeto Web 03MB

Repositório com backend e frontend para a aula.

Estrutura:
- `backend/` - servidor Express + SQLite (API)
- `frontend/` - páginas estáticas (Home, Produtos, Cadastrar)

Como rodar localmente:

1. Abra um terminal na pasta `backend`.
2. Instale dependências:

```bash
cd backend
npm install
```

3. Inicie o servidor:

```bash
npm start
```

O servidor abrirá em `http://localhost:3000` e servirá também o frontend estático.

Visite:
- `http://localhost:3000/index.html` — Home
- `http://localhost:3000/products.html` — Lista de produtos
- `http://localhost:3000/add.html` — Cadastrar produto

Banco de dados:
- O servidor usa SQLite e cria um arquivo `web_03mb.db` em `backend/` automaticamente.
- Também há um arquivo SQL de referência para MySQL em `backend/sql/init.sql`.

Publicar no GitHub (exemplo):

```bash
# na raiz do projeto
git init
git add .
git commit -m "Inicial: backend + frontend para web_03mb"
# crie um repo no GitHub via site e depois vincule:
git remote add origin https://github.com/SEU_USUARIO/NOME_REPO.git
git branch -M main
git push -u origin main
```

Após publicar, envie aqui o link do repositório (deve conter `backend/` e `frontend/`).
