<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import { themeColor, themeColorWhite, themeColorLille,
         themeColorOrange } from '../config.js';
import { default_materials } from '../data/default_materials.js'
import { updateMaterials } from "../user_handler/materials.js"

const props = defineProps(["machines", "materials"]);
const emit  = defineEmits(["update_materials"]);

const display_materials = ref([])


// Merge CURRENT materials &  defaults - no duplications
function arrange_materials_view( materials, default_materials ) {
   
    // Collect tags of actual materials
    const current_mat_tags = materials.map( m => m.material_tag );
    
    // Filter defaults that are not already in current materials
    const missing_defaults = default_materials
          .filter( dm => !current_mat_tags.includes( dm.material_tag ));

    return [
        ...materials,
        ...missing_defaults
    ];
}

function update_and_emit_materials() {

    const confirmed = window.confirm("Are you sure you want to update your materials?");
    if (!confirmed) return;
    
    const materials = []
    
    for (const mat of display_materials.value) {
        if (mat.manufacturing_methods_tags.length > 0) {
            materials.push(mat)
        }
    }
    
    updateMaterials( materials );
    emit("update_materials", materials);
}

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

onMounted(() => {
    
    if ( props.materials.length > 0 ){
        display_materials.value = arrange_materials_view( props.materials, default_materials );
    } else {
        display_materials.value = default_materials;
    }
    
});
</script>

<template>
<div class="selector-container">
  <div class="selector-zone"> 
    <div class="header-section">
      <h3 class="selector-title">Select Available Materials</h3>
      <p class="subtitle">
        Assign each material to compatible machines and set cost per cm³
      </p>
    </div>
    
    <!-- Materials Grid -->
    <section class="grid">
      <div
        v-for="material in display_materials" 
        :key="material.denomination"
        class="card"
        :class="{ 'selected': material.manufacturing_methods_tags.length > 0 }">
        
        <div class="material-info">
          <h4> {{ material.display_name }} </h4>          
          <!-- Assign Machines -->
          <div class="machine-buttons">
            <span class="assign-label">Compatible Machines:</span>
            <div class="machine-options">
              <button 
                v-for="machine in props.machines" 
                :key="machine.machine_tag"
                class="machine-btn"
                :class="{ active: material.manufacturing_methods_tags.includes( machine.machine_tag ) }"
                @click="toggleMachine( material, machine.machine_tag )">
                {{ machine.display_name }}
              </button>
            </div>
          </div>
          
          <!-- Cost -->
          <div class="cost-section">
            <label>
              Cost per cm³
              <input 
                type="number" 
                step="0.01" 
                v-model.number="material.cost_per_cm3"
                :placeholder="material.cost_per_cm3"
                class="cost-input" />
            </label>
          </div>
          
          <!-- Stats -->
          <div class="material-stats">
            <span class="stat"><strong>Density:</strong> {{ material.density }} g/cm³</span>
            <span class="stat"><strong>Young's Modulus:</strong> {{ (material.youngs_modulus/1e9).toFixed(1) }} GPa</span>
            <span class="stat"><strong>Yield Strength:</strong> {{ (material.yield_strength/1e6).toFixed(0) }} MPa</span>
            <span class="stat"><strong>UTS:</strong> {{ (material.ultimate_tensile_strength/1e6).toFixed(0) }} MPa</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Update button -->
    <div class="button-group">
      <a
        class="action-btn"
        @click="update_and_emit_materials"
        >
        Update Materials
      </a>
    </div>
  </div>
</div>
</template>

<style scoped>
.card.selected {
    border-color: v-bind(themeColor);
    background: v-bind(themeColorWhite);
    border: 6px solid v-bind(themeColor);
    box-shadow: 0 8px 20px -6px rgba(0, 0.1, 0.2, 0.5);
}

/* --- Material Info --- */
.machine-buttons {
    margin: 1rem 0;
}

.assign-label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.machine-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.machine-btn {
    border: 1px solid #cbd5e1;
    background: white;
    padding: 0.4rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.machine-btn:hover {
    background: #e2e8f0;
}

.machine-btn.active {
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    border-color: v-bind(themeColor);
}

/* --- Inputs --- */
.cost-section {
    margin-top: 1rem;
}

.cost-section label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    font-weight: 500;
}

.cost-input {
    margin-top: 0.25rem;
    padding: 0.4rem 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    width: 140px;
    font-size: 0.9rem;
}

/* --- Stats --- */
.material-stats {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #475569;
}

.stat strong {
    color: v-bind(themeColor);
}

/* --- Responsive --- */
@media (max-width: 768px) {

    .grid {
        grid-template-columns: 1fr;
        padding: 1.25rem;
    }
    .header-section {
        padding: 2rem 1rem;
    }
    .report-issue-title {
        font-size: 1.75rem;
    }
    .button-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    .primary-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
