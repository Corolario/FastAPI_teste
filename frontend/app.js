import { createApp } from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js'

const API_URL = 'http://localhost:8000'

createApp({
  items: [],
  form: {
    titulo: '',
    descricao: '',
    concluido: false
  },
  editingId: null,
  loading: false,
  message: { text: '', type: '' },

  // Mostrar mensagem temporária
  showMessage(text, type = 'success') {
    this.message = { text, type }
    setTimeout(() => {
      this.message = { text: '', type: '' }
    }, 3000)
  },

  // Listar todos os itens
  async fetchItems() {
    try {
      const response = await fetch(`${API_URL}/items`)
      this.items = await response.json()
    } catch (error) {
      console.error('Erro ao buscar itens:', error)
      this.showMessage('Erro ao carregar tarefas. O backend está rodando?', 'error')
    }
  },

  // Criar ou atualizar item
  async submitForm() {
    // Validação
    if (!this.form.titulo.trim()) {
      this.showMessage('Por favor, preencha o título', 'error')
      return
    }
    if (!this.form.descricao.trim()) {
      this.showMessage('Por favor, preencha a descrição', 'error')
      return
    }

    this.loading = true
    try {
      const options = {
        method: this.editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      }

      const url = this.editingId
        ? `${API_URL}/items/${this.editingId}`
        : `${API_URL}/items`

      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error('Erro ao salvar tarefa')
      }

      this.showMessage(
        this.editingId ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!',
        'success'
      )
      this.resetForm()
      this.fetchItems()
    } catch (error) {
      console.error('Erro ao salvar item:', error)
      this.showMessage('Erro ao salvar tarefa: ' + error.message, 'error')
    } finally {
      this.loading = false
    }
  },

  // Editar item
  editItem(item) {
    this.form = { ...item }
    this.editingId = item.id
  },

  // Cancelar edição
  cancelEdit() {
    this.resetForm()
  },

  // Deletar item
  async deleteItem(id) {
    if (!confirm('Deseja realmente deletar esta tarefa?')) return

    try {
      await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' })
      this.fetchItems()
    } catch (error) {
      console.error('Erro ao deletar item:', error)
    }
  },

  // Resetar formulário
  resetForm() {
    this.form = {
      titulo: '',
      descricao: '',
      concluido: false
    }
    this.editingId = null
  },

  // Hook de montagem
  mounted() {
    this.fetchItems()
  }
}).mount()
