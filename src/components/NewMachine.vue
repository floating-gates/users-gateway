<script setup>
import { ref, defineEmits } from "vue"
import { themeColor, themeColorWhite,
         allowed_manufacturing_kind } from "../config.js"

const emit = defineEmits(["create"])

const open = ref(false)

const newMachine = ref({
    // TODO: fix the randomization - not really necessary
    machine_tag: Math.random().toString(36).substring(7),
    display_name: "",
    description: "",
    kind: "artisan",
    specs: [],
    cost_per_hour: 0,
    speed_cm3_per_hour: 0,
    setup_cost: 0,
    selected: true
})

function createMachine() {
  if (!newMachine.value.machine_tag || !newMachine.value.display_name) {
    alert("Machine tag and name are required")
    return
  }

  emit("create", {
    ...newMachine.value,
    specs: newMachine.value.specs.filter(s => s.length > 0)
  })

  open.value = false
}
</script>

<template>
  <div class="card create-card" @click="open = true">
    <div v-if="!open" class="create-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="create-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <h4>Create New Machine</h4>
    </div>

    <div v-else class="create-form" @click.stop>

      <label>
        Display name
        <input v-model="newMachine.display_name" />
      </label>

      <label>
        Description
        <textarea v-model="newMachine.description" />
      </label>

      <label>
        Specs (comma separated)
        <input
          placeholder="Fast, Metal only"
          @change="e => newMachine.specs = e.target.value.split(',').map(s => s.trim())"
        />
      </label>

      <label>
        Manufacturing kind
        <select v-model="newMachine.kind" class="dropdown">
          <option
            v-for="kind in allowed_manufacturing_kind"
            :key="kind"
            :value="kind"
            >
            {{ kind }}
          </option>
        </select>
      </label>

      <div class="machine-inputs">
        <label>
          Cost €/h
          <input type="number" v-model.number="newMachine.cost_per_hour" />
        </label>

        <label>
          Speed cm³/h
          <input type="number" v-model.number="newMachine.speed_cm3_per_hour" />
        </label>

        <label>
          Setup cost
          <input type="number" v-model.number="newMachine.setup_cost" />
        </label>
      </div>

    <div >
      <a
        class="action-btn"
        @click="createMachine">
        Add a Machine
      </a>
    </div>
      
    </div>
  </div>
</template>

<style scoped>
.dropdown {
    text-transform: capitalize;
}

textarea {
  resize: vertical;
}
</style>
