<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import { updateMachineList } from "../user_handler/machine.js"
import { themeColor, themeColorOrange, themeColorWhite } from '../data/items.js';
import { default_machines } from '../data/default_machines.js'

const available_machine = ref([]) // now an array of objects { machine_tag: string }
const props = defineProps(["machines"])
const emit  = defineEmits(["update_machine"])

// Toggle machine in available_machine (stores objects)
function toggleMachine(machine_tag) {
    const index = available_machine.value.findIndex(m => m.machine_tag === machine_tag)
    if (index > -1) { available_machine.value.splice(index, 1) }
    else            { available_machine.value.push({ machine_tag })}
}

// Remove machine from available_machine
function removeMachine(machine_tag) {
    const index = available_machine.value.findIndex(m => m.machine_tag === machine_tag)
    if (index > -1) { available_machine.value.splice(index, 1)  }
}

onMounted(async () => {
    const full_machines_list = props.machines;
    full_machines_list.forEach( m => { available_machine.value.push( m ) })
})


// Send update to backend
function sendUpdate() {
    updateMachineList(available_machine.value)
    emit("update_machine", available_machine.value);
}
</script>


<template>
<div class="machine-selector-container">
  <div class="machine-selector"> 
    <div class="header-section">
      <h3 class="report-issue-title">Choose Your Manufacturing Machines</h3>
      <p class="subtitle">Choose a well established machines or create a the manufacturing method required for your production workflow</p>
    </div>
    
    <section class="machines-grid">
      <div
        v-for="machine in default_machines"
        :key="machine.machine_tag"
        class="machine-card"
        :class="{ 'selected': available_machine.some(m => m.machine_tag === machine.machine_tag) }"
        @click="toggleMachine(machine.machine_tag)" >
          <input
            type="checkbox"
            class="machine-checkbox"
            :checked="available_machine.some(m => m.machine_tag === machine.machine_tag)"
            @change.stop="toggleMachine(machine.machine_tag)"
            />
          <div class="machine-info">
            <h4 class="machine-name">{{ machine.name }}</h4>
            <p class="machine-description">{{ machine.description }}</p>
            <div class="machine-specs">
              <span class="spec-tag" v-for="spec in machine.specs" :key="spec">{{ spec }}</span>
            </div>
          </div>

        <div class="machine-inputs" @click.stop>
            <label>
              Cost (€/hour)
              <input type="number" v-model.number="machine.cost_per_hour" min="0" />
            </label>
            <label>
              Speed (cm^3/hour)
              <input type="number" v-model.number="machine.speed" min="0" />
            </label>
            <label>
              Setup cost (cost/project)
              <input type="number" v-model.number="machine.setup_cost" min="0" />
            </label>
          </div>
      </div>
    </section>
  </div>
  
  <div class="button-group">
    <a
      class="btn primary-button"
      @click="sendUpdate"
      :disabled="!available_machine.length" >
      Update Machine Fleet
    </a>
  </div>
</div>
</template>

<style scoped>
/* --- Titles & Headers --- */
.report-issue-title {
    font-size: 2rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 2rem;
}

.header-section {
    color: v-bind(themeColor);
    padding: 2.5rem 2rem 1.5rem;
    text-align: center;
}

/* --- Layout --- */
.machine-selector {
    max-width: 1200px;
    margin: 3rem auto;
    background: v-bind(themeColorWhite);
    border-radius: 20px;
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.machines-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
}

/* --- Machine Card --- */
.machine-card {
    background: v-bind(themeColorWhite);
    border-radius: 18px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.25s ease;
}

.machine-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.1);
}

.machine-card.selected {
    border-color: v-bind(themeColor);
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    box-shadow: 0 8px 20px -6px rgba(37, 99, 235, 0.25);
}

.machine-card.selected .machine-info h4,
.machine-card.selected .machine-info p,
.machine-card.selected .spec-tag {
  color: v-bind(themeColorWhite);
}

.machine-card.selected .spec-tag {
  background: rgba(255, 255, 255, 0.2);   /* so tags stay visible */
}

.machine-checkbox {  /* it hides the actual checkbox */ 
    position: absolute;
    opacity: 0;
}

.machine-info h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.machine-description {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.75rem;
    opacity: 0.85;
}

.machine-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.spec-tag {
    padding: 0.25rem 0.75rem;
    background: v-bind(themeColorWhite);
    color: v-bind(themeColor);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

/* --- Buttons --- */
.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.primary-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
}

.primary-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

/* --- Responsive --- */
@media (max-width: 768px) {
    .machine-selector-container {
        padding: 1rem;
    }
    .machines-grid {
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

/* Machine Input */
2
.machine-inputs {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.machine-inputs label {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    font-weight: 500;
    color: inherit; /* will adapt to white in selected state */
}

.machine-inputs input {
  margin-top: 0.25rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
}

.machine-card.selected .machine-inputs input {
  border-color: v-bind(themeColorWhite);
  background: rgba(255, 255, 255, 0.1);
  color: v-bind(themeColorWhite);
}

</style>
