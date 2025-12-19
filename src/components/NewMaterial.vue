<script setup>
import { ref, defineEmits } from "vue"
import { themeColor } from "../config.js"

const emit  = defineEmits(["create"])
const props = defineProps(["machines"]);

const open = ref(false)

const new_material = ref({
  material_tag: Math.random().toString(36).substring(2, 10),
  denomination: "",
  display_name: "",
  cost_per_cm3: 0,
  density: 0,
  youngs_modulus: 0,
  poisson_ratio: 0,
  yield_strength: 0,
  ultimate_tensile_strength: 0,
  thermal_conductivity: 0,
  manufacturing_methods_tags: [],
  selected_machines: []
})

function toggleMachine( material, machine_tag ) {
    
    const idx = material.manufacturing_methods_tags.indexOf( machine_tag );
    
    if (idx !== -1) {
        console.log("remove: ", machine_tag, "for material: ", material.display_name)
        material.manufacturing_methods_tags.splice( idx, 1 );
    } else {
        console.log("added: ", machine_tag, "for material: ", material.display_name)
        material.manufacturing_methods_tags.push( machine_tag );
    }
};


function createMaterial() {
  if (!new_material.value.display_name) {
    alert("Material name and Machine is required")
    return
  }
  emit("create",  new_material.value )

  open.value = false
}
</script>

<template>
  <div class="card create-card" @click="open = true">

    <!-- CLOSED STATE -->
    <div v-if="!open" class="create-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           :stroke="themeColor"
           class="create-icon">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <h4>Create New Material</h4>
    </div>

    <!-- OPEN STATE -->
    <div v-else class="create-form" @click.stop>

      <label>
        Display name
        <input v-model="new_material.display_name" placeholder="Aluminum 6061" />
      </label>
      
      <div class="machine-buttons">
        <span class="assign-label">Compatible Machines:</span>
        <div class="machine-options">
          <button 
            v-for="machine in props.machines" 
            :key="machine.machine_tag"
            class="machine-btn"
            :class="{ active: new_material.manufacturing_methods_tags.includes( machine.machine_tag ) }"
            @click="toggleMachine( new_material, machine.machine_tag )">
            {{ machine.display_name }}
              </button>
        </div>
      </div>
      
      <label>
        Denomination / Standard
        <input v-model="new_material.denomination" placeholder="EN AW-6061" />
      </label>

      <label>
        Cost (€/cm³)
        <input type="number" v-model.number="new_material.cost_per_cm3" min="0" />
      </label>

      <label>
        Density (g/cm³)
        <input type="number" v-model.number="new_material.density" min="0" />
      </label>

      <label>
        Young’s modulus (Pa)
        <input type="number" v-model.number="new_material.youngs_modulus" min="0" />
      </label>

      <label>
        Poisson ratio
        <input type="number" v-model.number="new_material.poisson_ratio" step="0.01" />
      </label>

      <label>
        Yield strength (Pa)
        <input type="number" v-model.number="new_material.yield_strength" min="0" />
      </label>

      <label>
        Ultimate tensile strength (Pa)
        <input type="number" v-model.number="new_material.ultimate_tensile_strength" min="0" />
      </label>

      <label>
        Thermal conductivity (W/m·K)
        <input type="number" v-model.number="new_material.thermal_conductivity" min="0" />
      </label>

      <div class="button-row">
        <a class="action-btn" @click="createMaterial">
          Add Material
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
