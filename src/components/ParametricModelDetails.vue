<script setup>
import { ref, watch } from 'vue'
import { get_complete_model } from '../param-model-handler/model.js'
import { get_model_parameters, update_params, delete_parameter } from '../param-model-handler/params.js'
import { themeColor, themeColorWhite, themeColorOrange } from '../config.js'

const props = defineProps({
    model_name: String,
    model_body: String
})

const editableModelBody = ref(props.model_body)
watch(() => props.model_body, (newVal) => editableModelBody.value = newVal)

const expanded = ref(false)
const loading = ref(false)
const error = ref('')
const model_details = ref(null)
const params = ref([])
const newParam = ref({ name: '', value: 0 })

async function toggleDetails() {
    expanded.value = !expanded.value
    if (expanded.value && !model_details.value) {
        await loadModelData()
    }
}

async function loadModelData() {
    loading.value = true
    error.value = ''
    try {
        const [modelRes, paramsRes] = await Promise.all([
            get_complete_model(props.model_name),
            get_model_parameters(props.model_name)
        ])
        
        if (modelRes.ok) model_details.value = await modelRes.json()
        if (paramsRes.ok) params.value = await paramsRes.json()
        
        if (!modelRes.ok || !paramsRes.ok) {
            error.value = 'Failed to load data'
        }
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

async function updateModel() {
    loading.value = true
    error.value = ''
    try {
        const res = await update_params({
            model_name: props.model_name,
            model_body: editableModelBody.value,
            vec: params.value
        })
        if (!res.ok) error.value = 'Failed to update'
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

async function addParameter() {
    if (!newParam.value.name.trim()) return
    
    params.value.push({ ...newParam.value, name: newParam.value.name.trim() })
    await updateModel()
    newParam.value = { name: '', value: 0 }
}

async function removeParameter(paramName) {
    loading.value = true
    try {
        const res = await delete_parameter(props.model_name, paramName)
        if (res.ok) params.value = params.value.filter(p => p.name !== paramName)
        else error.value = 'Failed to delete'
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
<div class="complete-model">
  <div class="model-header" @click="toggleDetails">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>

    <h3>{{ props.model_name }}</h3>
    <span>{{ expanded ? "▲" : "▼" }}</span>
  </div>

    <div v-if="expanded" class="model-details">
        <div v-if="loading">Loading model...</div>
        <div v-else-if="error_message" class="error-box">{{ error_message }}</div>
        <div v-else>
            <pre>{{ model_details?.model_header }}</pre>

            <!-- Editable body -->
            <textarea class="code-editor" rows="20" cols="80" v-model="editableModelBody"></textarea>

            <h3>Parameters</h3>
            <div v-if="params_loading">Loading parameters...</div>
            <div v-else-if="params_error" class="error-box">{{ params_error }}</div>
            <div v-else>
                <div v-for="param in params" :key="param.name" class="param-item">
                    <label>{{ param.name }}:</label>
                    <input type="number" v-model="param.value" />
                    <button class="delete-btn" @click="removeParameter(param.name)">Delete</button>
                </div>

                <!-- Add new parameter -->
                <div class="param-add">
                    <input type="text" v-model="newParam.name" placeholder="Parameter name" />
                    <input type="number" v-model="newParam.value" placeholder="Value" />
                    <button class="primary-btn" @click="addParameter" :disabled="params_loading">Add Parameter</button>
                </div>
            </div>

            <button class="primary-btn" @click="updateModel" :disabled="loading || params_loading">
                Update Model
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
.complete-model {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.complete-model:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
}

.model-header {
  display: flex;
  color: v-bind(themeColor);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f2f2f2;
  padding-bottom: 0.5rem;
}

.model-header h3 {
    padding: 0rem 1rem 1rem 0rem ;
}

.model-header svg {
  height: 2rem;       /* match the font-size of the header text */
  width: auto;       /* scale proportionally */
  flex-shrink: 0;    /* don’t shrink when flex container squeezes */
  margin-right: 0.5rem; /* optional spacing from text */
}

/* Model content */
.model-details {
  margin-top: 1rem;
}

.code-editor {
  width: 100%;
  min-height: 200px;
  resize: vertical;
  padding: 10px;
  margin-bottom: 1rem;
  font-family: monospace;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

/* Error box */
.error-box {
  background: #ffecec;
  border: 1px solid #f5a5a5;
  color: #d9534f;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 1rem;
}

/* Parameter list */
.param-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid #f5f5f5;
}

.param-item label {
  font-weight: 600;
  min-width: 100px;
}

.param-add {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
}

.param-add input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Buttons */
.primary-btn {
  background-color: v-bind(themeColor);
  color: v-bind(themeColorWhite);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s ease, transform 0.15s ease;
}

.primary-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.delete-btn {
  background-color: v-bind(themeColorOrange);
  color: v-bind(themeColorWhite);
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  min-width: 90px;
  text-align: center;
  transition: opacity 0.2s ease;
}

.delete-btn:hover {
  opacity: 0.85;
}

</style>
