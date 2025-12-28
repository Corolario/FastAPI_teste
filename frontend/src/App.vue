<template>
  <div id="app">
    <h1>CRUD - Gerenciador de Tarefas</h1>

    <!-- Formulário -->
    <div class="form-container">
      <h2>{{ editingId ? 'Editar' : 'Adicionar' }} Tarefa</h2>
      <input v-model="form.titulo" placeholder="Título" />
      <input v-model="form.descricao" placeholder="Descrição" />
      <label>
        <input type="checkbox" v-model="form.concluido" />
        Concluído
      </label>
      <div>
        <button @click="submitForm">{{ editingId ? 'Atualizar' : 'Criar' }}</button>
        <button v-if="editingId" @click="cancelEdit">Cancelar</button>
      </div>
    </div>

    <!-- Lista de Tarefas -->
    <div class="items-container">
      <h2>Tarefas</h2>
      <div v-if="items.length === 0" class="empty">Nenhuma tarefa cadastrada</div>
      <div v-for="item in items" :key="item.id" class="item-card">
        <div class="item-info">
          <h3 :class="{ completed: item.concluido }">{{ item.titulo }}</h3>
          <p>{{ item.descricao }}</p>
          <span class="status">{{ item.concluido ? '✓ Concluído' : '○ Pendente' }}</span>
        </div>
        <div class="item-actions">
          <button @click="editItem(item)" class="btn-edit">Editar</button>
          <button @click="deleteItem(item.id)" class="btn-delete">Deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

const items = ref([])
const form = ref({
  titulo: '',
  descricao: '',
  concluido: false
})
const editingId = ref(null)

// Listar todos os itens
const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`)
    items.value = response.data
  } catch (error) {
    console.error('Erro ao buscar itens:', error)
  }
}

// Criar ou atualizar item
const submitForm = async () => {
  try {
    if (editingId.value) {
      await axios.put(`${API_URL}/items/${editingId.value}`, form.value)
    } else {
      await axios.post(`${API_URL}/items`, form.value)
    }
    resetForm()
    fetchItems()
  } catch (error) {
    console.error('Erro ao salvar item:', error)
  }
}

// Editar item
const editItem = (item) => {
  form.value = { ...item }
  editingId.value = item.id
}

// Cancelar edição
const cancelEdit = () => {
  resetForm()
}

// Deletar item
const deleteItem = async (id) => {
  if (confirm('Deseja realmente deletar esta tarefa?')) {
    try {
      await axios.delete(`${API_URL}/items/${id}`)
      fetchItems()
    } catch (error) {
      console.error('Erro ao deletar item:', error)
    }
  }
}

// Resetar formulário
const resetForm = () => {
  form.value = {
    titulo: '',
    descricao: '',
    concluido: false
  }
  editingId.value = null
}

// Carregar itens ao montar o componente
onMounted(() => {
  fetchItems()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h2 {
  color: #555;
  margin-bottom: 15px;
}

.form-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.form-container input[type="text"],
.form-container input:not([type="checkbox"]) {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-container label {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
}

.form-container input[type="checkbox"] {
  margin-right: 8px;
  cursor: pointer;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  transition: background 0.3s;
}

.form-container button:first-of-type {
  background: #4CAF50;
  color: white;
}

.form-container button:first-of-type:hover {
  background: #45a049;
}

.form-container button:last-of-type {
  background: #888;
  color: white;
}

.form-container button:last-of-type:hover {
  background: #666;
}

.items-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.empty {
  text-align: center;
  color: #999;
  padding: 20px;
}

.item-card {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s;
}

.item-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.item-info h3 {
  color: #333;
  margin-bottom: 8px;
}

.item-info h3.completed {
  text-decoration: line-through;
  color: #999;
}

.item-info p {
  color: #666;
  margin-bottom: 8px;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  background: #e3f2fd;
  color: #1976d2;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.btn-edit {
  background: #2196F3;
  color: white;
  padding: 8px 16px;
}

.btn-edit:hover {
  background: #1976D2;
}

.btn-delete {
  background: #f44336;
  color: white;
  padding: 8px 16px;
}

.btn-delete:hover {
  background: #d32f2f;
}
</style>
