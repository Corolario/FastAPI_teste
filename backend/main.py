from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="CRUD API", version="1.0.0")

# Configuração CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados
class Item(BaseModel):
    id: Optional[int] = None
    titulo: str
    descricao: str
    concluido: bool = False

# "Banco de dados" em memória
items_db: List[Item] = []
next_id = 1

@app.get("/")
def read_root():
    return {"message": "API CRUD está funcionando!"}

# CREATE - Criar novo item
@app.post("/items", response_model=Item)
def create_item(item: Item):
    global next_id
    item.id = next_id
    next_id += 1
    items_db.append(item)
    return item

# READ - Listar todos os itens
@app.get("/items", response_model=List[Item])
def read_items():
    return items_db

# READ - Obter item específico
@app.get("/items/{item_id}", response_model=Item)
def read_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item não encontrado")

# UPDATE - Atualizar item
@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, updated_item: Item):
    for index, item in enumerate(items_db):
        if item.id == item_id:
            updated_item.id = item_id
            items_db[index] = updated_item
            return updated_item
    raise HTTPException(status_code=404, detail="Item não encontrado")

# DELETE - Deletar item
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for index, item in enumerate(items_db):
        if item.id == item_id:
            items_db.pop(index)
            return {"message": "Item deletado com sucesso"}
    raise HTTPException(status_code=404, detail="Item não encontrado")
