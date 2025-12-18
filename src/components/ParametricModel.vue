<script setup>
import { ref, reactive, onMounted } from 'vue'
import { themeColor, themeColorWhite,
         themeColorOrange } from '../config.js'
import { get_models, update_model,
         delete_model } from '../param-model-handler/model.js'
import ParametricModelDetails from './ParametricModelDetails.vue'

const available_models = ref([])
const error_message = ref('')
const loading = ref(false)

const model_in_scope = ref({
    name: '',
    model: ''
})

async function add_model() {
    const model = model_in_scope.value
    
    if (!model.name) {
        error_message.value = 'Model name cannot be empty.'
        return
    }
    
    try {
        const response = await update_model(model)
        
        if (response.ok) {
            const inserted_model = await response.json()
            available_models.value.push(inserted_model)
            
            // Reset input fields
            model_in_scope.value = { name: '', model: '' }
        } else {
            const err_json = await response.json()
            error_message.value = err_json.message || 'Failed to add model.'
        }
    } catch (err) {
        error_message.value = err?.message || 'Failed to add model.'
    }
}


async function handleDelete(name) {
    try {
        const res = await delete_model(name)
        if (res.ok) {
            // Remove from local list
            available_models.value = available_models.value
                .filter(m => m.name !== name)
        } else {
            const err = await res.json()
            error_message.value = err?.message || `Failed to delete model: ${name}`
        }
    } catch (err) {
        error_message.value = err?.message || `Error deleting model: ${name}`
    }
}


onMounted(async () => {
    loading.value = true
    error_message.value = ''
    
    try {
        const models_response = await get_models()
        if (models_response.ok) {
            const models = await models_response.json()
            available_models.value = models
        } else if (models_response.status === 404) {
            available_models.value = []
        } else {
            error_message.value = 'Error fetching models'
        }
    } catch (err) {
        error_message.value = err?.message || 'Failed to fetch parametric models.'
    } finally {
        loading.value = false
    }
})
</script>


<template>
<div class="selector-container">
  <div class="selector-zone"> 
    <div class="header-section">
      <h3 class="selector-title">Parametric Models</h3>

      <div v-if="loading">Loading models...</div>

      <div v-else-if="error_message" class="error-box">
        {{ error_message }}
      </div>

      <div v-else>
        <div class="model-list">
          <div v-for="(model, index) in available_models" :key="model.name || index">
            <ParametricModelDetails :model_name="model.name"
                                    :model_body="model.model"/>
            <button class="delete-btn" @click="handleDelete(model.name)">
              Delete Model
            </button>
          </div>
        </div>
  
        <div class="add-model-container">
          <h3>Add a new Model</h3>
          <div class="add-model">
            <input v-model="model_in_scope.name"
                   placeholder="Model Name"
                   type="text" />
            <button class="action-btn" @click="add_model">Add Model</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped>
.parametric-container {
    background-color: v-bind(themeColorWhite);
    border-radius: 25px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    padding: 2rem;
    margin: 3rem;
    max-width: 1400px;
    text-align: center;
}

.parametric-container h2 {
    font-size: 2rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 2rem;
}

.model-list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.model-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.delete-btn {
    background-color: v-bind(themeColorOrange);
    color: v-bind(themeColor);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}


.add-model-container {
    background: #fff;
    border: 2px dashed v-bind(themeColor);
    border-radius: 20px;
    padding: 2rem;
    margin-top: 3rem;
    text-align: center;
    transition: all 0.3s ease;
}

.add-model-container:hover {
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.add-model-container h3 {
    color: v-bind(themeColor);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.add-model {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}

.add-model input {
    flex: 1;
    max-width: 300px;
    padding: 0.6rem 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s ease;
}

.add-model input:focus {
    border-color: v-bind(themeColor);
    box-shadow: 0 0 6px rgba(0,0,0,0.1);
}

.add-btn {
    background-color: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.15s ease, background-color 0.2s ease;
}

.add-btn:hover {
    background-color: #005bb5; /* slightly darker shade of themeColor */
    transform: translateY(-2px);
}

.add-btn:active {
  transform: scale(0.97);
}
</style>
