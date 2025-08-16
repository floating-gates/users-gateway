<script setup>
import { ref, onMounted } from 'vue'
import { getMachineList, updateMachineList } from "../user_handler/machine.js"
import { themeColor, themeColorOrange, themeColorWhite } from '../data/items.js';

const available_machine = ref([]) // now an array of objects { machine_tag: string }

const machines = [
    { tag: 'fdm_3d_printer', name: 'FDM 3D Printer', description: 'Fused Deposition Modeling for rapid prototyping and production', specs: ['PLA/ABS', '0.1mm precision', 'Multi-color'] },
    { tag: 'sls_3d_printer', name: 'SLS 3D Printer', description: 'Selective Laser Sintering for complex geometries and metal parts', specs: ['Metal/Plastic', 'High precision', 'No supports'] },
    { tag: 'sla_3d_printer', name: 'SLA 3D Printer', description: 'Stereolithography for high-resolution and smooth surface finishes', specs: ['Resin', 'Ultra-fine', 'Smooth finish'] },
    { tag: 'cnc_3_axis', name: 'CNC 3-Axis', description: 'Computer Numerical Control machining for precision parts', specs: ['±0.01mm', 'Multiple materials', 'High speed'] },
    { tag: 'cnc_5_axis', name: 'CNC 5-Axis', description: 'Advanced 5-axis machining for complex geometries', specs: ['Complex parts', 'Aerospace grade', 'Multi-angle'] },
    { tag: 'inj_mould', name: 'Injection Molding Machine', description: 'High-volume plastic part production with consistent quality', specs: ['Mass production', 'Plastic only', 'Fast cycle'] }
]

// Toggle machine in available_machine (stores objects)
function toggleMachine(machine_tag) {
    const index = available_machine.value.findIndex(m => m.machine_tag === machine_tag)
    if (index > -1) {
        available_machine.value.splice(index, 1)
    } else {
        available_machine.value.push({ machine_tag })
    }
}


// Remove machine from available_machine
function removeMachine(machine_tag) {
    const index = available_machine.value.findIndex(m => m.machine_tag === machine_tag)
    if (index > -1) {
        available_machine.value.splice(index, 1)
    }
}

// Populate available_machine on mount
onMounted(async () => {
    const full_machines_list = await getMachineList()
    full_machines_list.forEach(machine => {
        // ensure each item is an object { machine_tag }
        if (typeof machine === 'string') {
            available_machine.value.push({ machine_tag: machine })
        } else {
            available_machine.value.push(machine)
        }
    })
})

// Send update to backend
function sendUpdate() {
    updateMachineList(available_machine.value)
}
</script>


<template>
<div class="machine-selector-container">
  <div class="machine-selector"> 
    <div class="header-section">
      <h3 class="report-issue-title">Choose Your Manufacturing Machines</h3>
      <p class="subtitle">Choose a well established machines or create a the manufacturing method required for your production workflow</p>
    </div>
    
    <div class="machines-grid">
      <div
        v-for="machine in machines"
        :key="machine.tag"
        class="machine-card"
        :class="{ 'selected': available_machine.some(m => m.machine_tag === machine.tag) }"
        @click="toggleMachine(machine.tag)"
        >
        <div class="machine-card-header">
          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              class="machine-checkbox"
              :checked="available_machine.some(m => m.machine_tag === machine.tag)"
              @change.stop="toggleMachine(machine.tag)"
              />
            <div class="machine-info">
              <h4 class="machine-name">{{ machine.name }}</h4>
              <p class="machine-description">{{ machine.description }}</p>
              <div class="machine-specs">
                <span class="spec-tag" v-for="spec in machine.specs" :key="spec">{{ spec }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  
  <div class="button-group">
    <button
      class="primary-button"
      @click="updateMachineList(available_machine)"
      :disabled="!available_machine.length" >
      Confirm
    </button>
  </div>
</div>
</template>

<style scoped>

  .report-issue-title { font-size: 2.0rem; font-weight: 700; color: v-bind(themeColor); margin-bottom: 2.5rem; }
  
.machine-selector {
    max-width: 1200px;
    margin: 0 auto;
    background: v-bind(themeColorWhite);
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
    margin: 3rem auto;
    
    overflow: hidden;
}

.header-section {
    color: v-bind(themeColor);
    padding: 3rem 2.5rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(10px);
}

.machine-icon {
    width: 40px;
    height: 40px;
}

.main-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    letter-spacing: -0.025em;
}

.subtitle {
    font-size: 1.125rem;
    opacity: 0.9;
    font-weight: 400;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
}

.machines-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    padding: 2.5rem;
}

.machine-card {
    background: v-bind(themeColorWhite);
    border: 2px solid #f1f5f9;
    border-radius: 16px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.machine-card:hover {
    border-color: v-bind(themeColorLille);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.machine-card.selected {
    border-color: v-bind(themeColor);
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3);
}

.machine-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.checkbox-wrapper {
    position: relative;
}

.machine-checkbox {
    opacity: 0;
    position: absolute;
    width: 24px;
    height: 24px;
}

.custom-checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid #d1d5db;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.machine-card.selected .custom-checkbox {
    background: v-bind(themeColorWhite);
    border-color: v-bind(themeColorWhite);
}

.checkmark {
    width: 14px;
    height: 14px;
}

.machine-icon-container {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: v-bind(themeColorLille);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.machine-card.selected .machine-icon-container {
    background: rgba(255, 255, 255, 0.2);
}

.machine-type-icon {
    width: 24px;
    height: 24px;
}

.machine-info h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: inherit;
}

.machine-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    opacity: 0.8;
}

.machine-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.spec-tag {
    padding: 0.25rem 0.75rem;
    background: v-bind(themeColorLille);
    color: v-bind(themeColor);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

.machine-card.selected .spec-tag {
    background: rgba(255, 255, 255, 0.2);
    color: v-bind(themeColorWhite);
}

.action-section {
    padding: 2.5rem;
    background: #f8fafc;
    border-top: 1px solid #f1f5f9;
}

.selection-summary {
    background: v-bind(themeColorWhite);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #f1f5f9;
}

.summary-header h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
}

.selected-machines-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.selected-machine-tag {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: v-bind(themeColorLille);
    color: v-bind(themeColor);
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}

.remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

.remove-btn:hover {
    background: rgba(239, 68, 68, 0.1);
}

.remove-icon {
    width: 14px;
    height: 14px;
    fill: #ef4444;
}

.button-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
}

.secondary-button {
    padding: 0.75rem 1.5rem;
    border: 2px solid #e2e8f0;
    background: v-bind(themeColorWhite);
    color: #64748b;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.secondary-button:hover:not(:disabled) {
    border-color: #cbd5e1;
    color: #475569;
}

.secondary-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.primary-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: v-bind(themeColorOrange);
    color: v-bind(themeColor);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
}

.primary-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(37, 99, 235, 0.5);
}

.primary-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.button-icon {
    width: 16px;
    height: 16px;
}

@media (max-width: 768px) {
    .machine-selector-container {
        padding: 1rem;
    }
    
    .machines-grid {
        grid-template-columns: 1fr;
        padding: 1.5rem;
    }
    
    .header-section {
        padding: 2rem 1.5rem;
    }
    
    .main-title {
        font-size: 2rem;
    }
    
    .button-group {
        flex-direction: column;
    }
    
    .primary-button,
    .secondary-button {
        width: 100%;
        justify-content: center;
    }
}
.report-issue-title {
    font-size: 2.0rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 2.5rem;
}
</style>
