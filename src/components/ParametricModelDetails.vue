<script setup>
import { ref, watch } from 'vue'
import { get_complete_model } from '../param-model-handler/model.js'
import { get_model_parameters, update_params, delete_parameter } from '../param-model-handler/params.js'
import { themeColor, themeColorWhite, themeColorOrange } from '../data/items.js'

const props = defineProps({
    model_name: String,
    model_body: String
})

// local editable copy of model_body
const editableModelBody = ref(props.model_body)

// keep editableModelBody in sync if parent updates the prop
watch(() => props.model_body, (newVal) => {
    editableModelBody.value = newVal
})

const expanded = ref(false)
const loading = ref(false)
const error_message = ref('')
const model_details = ref(null)
const params = ref([])
const params_loading = ref(false)
const params_error = ref('')
const newParam = ref({ name: '', value: 0 })

// Toggle details view
async function toggleDetails() {
    expanded.value = !expanded.value

    if (expanded.value && !model_details.value) {
        loading.value = true
        error_message.value = ''

        try {
            const response = await get_complete_model(props.model_name)
            if (response.ok) {
                model_details.value = await response.json()
            } else {
                const err = await response.json()
                error_message.value = err?.message || 'Failed to load model details.'
            }
        } catch (err) {
            error_message.value = err?.message || 'Failed to load model details.'
        } finally {
            loading.value = false
        }

        await loadParameters()
    }
}

// Load model parameters
async function loadParameters() {
    params_loading.value = true
    params_error.value = ''
    try {
        const res = await get_model_parameters(props.model_name)
        if (res.ok) {
            params.value = await res.json()
        } else {
            const err = await res.json()
            params_error.value = err?.message || 'Failed to load parameters.'
        }
    } catch (err) {
        params_error.value = err?.message || 'Failed to load parameters.'
    } finally {
        params_loading.value = false
    }
}

// Update both model body + parameters
async function updateModel() {
    try {
        const payload = {
            model_name: props.model_name,
            model_body: editableModelBody.value, // updated body
            vec: params.value                   // updated params
        }
        const res = await update_params(payload)
        if (!res.ok) {
            const err = await res.json()
            error_message.value = err?.message || 'Failed to update model.'
        } else {
            // refresh everything so UI matches backend
            await Promise.all([loadParameters(), toggleDetails(), toggleDetails(          )])
        }
    } catch (err) {
        error_message.value = err?.message || 'Failed to update model.'
    }
}

// Add new parameter (only local, persisted on update)
function addParameter() {
    if (!newParam.value.name.trim()) {
        params_error.value = "Parameter name cannot be empty"
        return
    }
    params.value.push({ name: newParam.value.name.trim(), value: newParam.value.value })
    newParam.value.name = ''
    newParam.value.value = 0
    params_error.value = ''
}

// Delete a parameter (persisted immediately)
async function removeParameter(paramName) {
    try {
        const res = await delete_parameter(props.model_name, paramName)
        if (res.ok) {
            params.value = params.value.filter(p => p.name !== paramName)
        } else {
            const err = await res.json()
            params_error.value = err?.message || `Failed to delete parameter ${paramName}.`
        }
    } catch (err) {
        params_error.value = err?.message || `Failed to delete parameter ${paramName}.`
    }
}
</script>

<template>
<div class="complete-model">
    <div class="model-header" @click="toggleDetails">
        <strong>{{ props.model_name }}</strong>
        <span>{{ expanded ? "▲" : "▼" }}</span>
    </div>

    <div v-if="expanded" class="model-details">
        <div v-if="loading">Loading model...</div>
        <div v-else-if="error_message" class="error-box">{{ error_message }}</div>
        <div v-else>
            <pre>{{ model_details?.model_header }}</pre>

            <!-- Editable body -->
            <textarea rows="10" cols="50" v-model="editableModelBody"></textarea>

            <h3>Parameters</h3>
            <div v-if="params_loading">Loading parameters...</div>
            <div v-else-if="params_error" class="error-box">{{ params_error }}</div>
            <div v-else>
                <div v-for="(param, index) in params" :key="index" class="param-item">
                    <label>{{ param.name }}:</label>
                    <input type="number" v-model="params[index].value" />
                    <button class="delete-btn" @click="removeParameter(param.name)">Delete</button>
                </div>

                <!-- Add new parameter -->
                <div class="param-add">
                    <input type="text" v-model="newParam.name" placeholder="Parameter name" />
                    <input type="number" v-model="newParam.value" placeholder="Value" />
                    <button @click="addParameter">Add Parameter</button>
                </div>
            </div>

            <button @click="updateModel">Update Model</button>
        </div>
    </div>
</div>
</template>

<style scoped>
.complete-model {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
}

.model-header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

.model-details {
    margin-top: 10px;
}

.error-box {
    color: red;
    margin-top: 5px;
}

.param-item {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    align-items: center;
}

.param-item button {
    padding: 2px 6px;
    font-size: 0.9rem;
    color: white;
    background: red;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.param-item button:hover {
    background: darkred;
}

.param-add {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.param-add input {
    padding: 3px;
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
