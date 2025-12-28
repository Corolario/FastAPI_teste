# CRUD Básico - FastAPI + Vue

Aplicação CRUD simples usando FastAPI no backend com **duas opções de frontend**.

## 📋 Sobre o Projeto

Este projeto demonstra um CRUD básico (Create, Read, Update, Delete) de tarefas com:
- **Backend**: FastAPI (Python) rodando na porta 8000
- **Frontend**: Duas opções disponíveis
  - 🟢 **Petite-Vue** (Recomendado): Versão minimalista (6kb), sem build, arquivo HTML único
  - 🔵 **Vue 3 + Vite**: Versão completa com build process e componentes

As aplicações rodam em servidores separados e se comunicam via HTTP.

## 🚀 Tecnologias Utilizadas

### Backend
- Python 3.8+
- FastAPI 0.115.6
- Uvicorn 0.34.0
- Pydantic 2.10.4

### Frontend - Opção 1: Petite-Vue (Recomendado) ⭐
- Petite-Vue 0.4.1 (6kb via CDN)
- Fetch API nativa
- Zero dependências, zero build

### Frontend - Opção 2: Vue 3 Completo
- Vue 3.5.13
- Vite 6.0.5
- Axios 1.7.9

## 📁 Estrutura do Projeto

```
FastAPI_teste/
├── backend/
│   ├── main.py              # API FastAPI com endpoints CRUD
│   └── requirements.txt     # Dependências Python
├── frontend/
│   ├── index-petite.html   # 🟢 Versão Petite-Vue (arquivo único)
│   ├── src/                # 🔵 Versão Vue3 completa
│   │   ├── App.vue         # Componente principal Vue
│   │   └── main.js         # Entry point do Vue
│   ├── index.html          # HTML Vue3
│   ├── package.json        # Dependências Node.js
│   └── vite.config.js      # Configuração do Vite
└── README.md               # Este arquivo
```

## ⚙️ Instalação e Execução

### 1️⃣ Backend (FastAPI)

```bash
# Navegue até a pasta do backend
cd backend

# Crie um ambiente virtual (opcional, mas recomendado)
python -m venv venv

# Ative o ambiente virtual
# No Linux/Mac:
source venv/bin/activate
# No Windows:
venv\Scripts\activate

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
uvicorn main:app --reload

# O backend estará rodando em: http://localhost:8000
```

### 2️⃣ Frontend - Escolha uma opção

#### 🟢 Opção A: Petite-Vue (Mais Simples - Recomendado)

**Em outro terminal:**

```bash
# Navegue até a pasta do frontend
cd frontend

# Inicie um servidor HTTP simples
python -m http.server 5173

# O frontend estará rodando em: http://localhost:5173/index-petite.html
```

**Vantagens:**
- ✅ Sem instalação de dependências (npm)
- ✅ Sem build process
- ✅ Arquivo HTML único
- ✅ Apenas 6kb (via CDN)
- ✅ Código mais simples e direto

#### 🔵 Opção B: Vue 3 + Vite (Build Completo)

**Em outro terminal:**

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# O frontend estará rodando em: http://localhost:5173
```

**Vantagens:**
- ✅ Hot Module Replacement (HMR)
- ✅ TypeScript support
- ✅ Component splitting
- ✅ Build otimizado para produção

## 🎯 Como Usar

1. Acesse o frontend no navegador:
   - **Petite-Vue**: http://localhost:5173/index-petite.html
   - **Vue3 + Vite**: http://localhost:5173
2. Use o formulário para adicionar novas tarefas
3. Visualize todas as tarefas na lista abaixo
4. Clique em "Editar" para modificar uma tarefa
5. Clique em "Deletar" para remover uma tarefa

## 🔌 Endpoints da API

A API possui os seguintes endpoints:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Mensagem de boas-vindas |
| GET | `/items` | Lista todos os itens |
| GET | `/items/{id}` | Busca um item específico |
| POST | `/items` | Cria um novo item |
| PUT | `/items/{id}` | Atualiza um item |
| DELETE | `/items/{id}` | Deleta um item |

### Documentação Interativa

Acesse http://localhost:8000/docs para ver a documentação interativa (Swagger UI) gerada automaticamente pelo FastAPI.

## 📝 Modelo de Dados

```json
{
  "id": 1,
  "titulo": "Minha Tarefa",
  "descricao": "Descrição da tarefa",
  "concluido": false
}
```

## 🔒 CORS

O backend está configurado para aceitar requisições de qualquer origem (`allow_origins=["*"]`). Em produção, altere para aceitar apenas o domínio do seu frontend.

## 📦 Build para Produção

### Frontend

```bash
cd frontend
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🛠️ Troubleshooting

### Backend não inicia
- Verifique se o Python 3.8+ está instalado: `python --version`
- Verifique se a porta 8000 não está em uso

### Frontend não inicia
- Verifique se o Node.js está instalado: `node --version`
- Verifique se a porta 5173 não está em uso
- Delete `node_modules` e rode `npm install` novamente

### Erro de CORS
- Certifique-se de que o backend está rodando
- Verifique se a URL da API no frontend (`http://localhost:8000`) está correta

## 📄 Licença

Projeto de teste/demonstração - use livremente.