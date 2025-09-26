<script setup>
import { ref, onMounted } from 'vue'
import { themeColor, themeColorWhite, themeColorOrange } from '../data/items.js'
import { get_models, update_model, delete_model } from '../param-model-handler/model.js'
import ParametricModelDetails from './ParametricModelDetails.vue'

// --------------------
// Reactive state
// --------------------
const available_models = ref([])
const error_message = ref('')
const loading = ref(false)

const model_in_scope = ref({
    name: '',
    model: ''
})

// --------------------
// Functions
// --------------------
async function add_model() {
    const model = model_in_scope.value

    if (!model.name) {
        error_message.value = 'Model name cannot be empty.'
        return
    }

    try {
        const response = await update_model(model)

        if (response.ok) {
            const inserted_model = await model_inserted_response.json()
            available_models.value.push(inserted_model)
            model_in_scope.value.name = ''
            model_in_scope.value.model = ''
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
            available_models.value = available_models.value.filter(m => m.name !== name)
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
<div class="parametric-container">
  <h2>Available Parametric Models</h2>

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
          Delete
        </button>
      </div>
    </div>

    <div class="add-model-container">
    <h3> New parametric model: </h3>
    <div class="add-model">
      <input
        v-model="model_in_scope.name"
        placeholder="Model Name"
        type="text" />
      <button @click="add_model">Add</button>
    </div>
    </div>
  </div>
</div>
</template>


<style scoped>
.parametric-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
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

.add-model {
    display: flex;
    gap: 0.5rem;
    margin: 2 rem;
    padding: 2 rem;
    justify-content: center;
}

.add-model-container {
  margin: 4rem;
}


.add-model input {
  flex: 1;
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

</style>
