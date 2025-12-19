<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import { updateMachineList } from "../user_handler/machine.js"
import { themeColor, themeColorWhite } from '../config.js';
import { default_machines } from '../data/default_machines.js'

import NewMachine from './NewMachine.vue'

/*
///////////////////  EXAMPLE OF MACHINE STRUCTURE
{
     machine_tag: 'inj_mould',
     display_name: 'Injection Molding Machine',
     description: 'High-volume plastic part production',
     specs: ['Mass production', 'Plastics only', 'Fast cycle'],
     cost_per_hour: 0,
     speed_cm3_per_hour: 0,
     setup_cost: 0
}
*/

const props = defineProps(["machines"])
const emit  = defineEmits(["update_machine"])

const display_machines = ref([]) 

function toggleMachine(machine) {
    machine.selected = !(machine.selected)
}

function update_and_emit_machines() {
    let msg = "Are you sure you want to update your machine fleet?"
    
    const selected_machines = display_machines.value.filter(m => m.selected)

    if (selected_machines.length === 0) {
        msg = "No machine is selected, are you sure?"
    }
    
    const confirmed = window.confirm(msg);
    if (!confirmed) return;
    
    updateMachineList( selected_machines );
    emit("update_machine", selected_machines);
}

function arrange_machine_view( current_mac, default_mac ) {

    const mac = {}

    // List all, then they get overwritten by same .machine_tag in next loop
    for (const def of default_mac) {
        const m = {
            ...def,
            selected: false
        }
        mac[m.machine_tag] = m
    }

    // Inserted specs manually because it is lost in Db 
    for (const cur of current_mac) {

        const defaultEntry = mac[cur.machine_tag]

        const m = {
            ...cur,
            selected: true,
            specs: defaultEntry
                ? defaultEntry.specs
                : (cur.specs ?? [])
        }
        mac[m.machine_tag] = m
    }


    // Convert object back into an array
    return Object.values(mac)
}

function addCustomMachine( machine ) {
  display_machines.value.push( machine )
}

onMounted(async () => {
    
    display_machines.value = arrange_machine_view(
        props.machines,
        default_machines )
    
})
</script>


<template>
<div class="selector-container">
  <div class="selector-zone"> 
    <div class="header-section">
      <h3 class="selector-title">Choose Your Manufacturing Machines</h3>
      <p class="subtitle">
        Choose an established machine or create a the manufacturing method required for your production workflow
      </p>
    </div>
    
    <section class="grid">
      <div
        v-for="machine in display_machines"
        :key="machine.machine_tag"
        class="card"
        :class="{ 'selected': machine.selected }"
        @click="toggleMachine(machine)" >
        <input
          type="checkbox"
          class="machine-checkbox"
          @change.stop="toggleMachine(machine)"
          />
        <div class="machine-info">
          <h4>{{ machine.display_name }}</h4>
          <p class="machine-description">{{ machine.description }}</p>
          <div class="machine-specs">
            <span class="spec-tag" >{{ machine.kind }}</span>
            <span class="spec-tag" v-for="spec in machine.specs" :key="spec">{{ spec }}</span>
          </div>
        </div>
        
        <div class="machine-inputs" @click.stop>
          <label>
            Cost (€/hour)
            <input type="number" placeholder="0" v-model.number="machine.cost_per_hour" min="0" />
          </label>
          <label>
            Speed (cm^3/hour)
            <input type="number" placeholder="0" v-model.number="machine.speed_cm3_per_hour" min="0" />
          </label>
          <label>
            Setup cost (cost/project)
            <input type="number" placeholder="0" v-model.number="machine.setup_cost" min="0" />
          </label>
        </div>
      </div>
      <NewMachine @create="addCustomMachine" />
    </section>
    <div class="button-group">
      <a
        class="action-btn"
        @click="update_and_emit_machines">
        Update Machine Fleet
      </a>
    </div>
  </div>
</div>
</template>

<style scoped>
.card.selected {
    border-color: v-bind(themeColor);
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    box-shadow: 0 8px 20px -6px rgba(0, 0.1, 0.2, 0.5);
}

.card.selected .machine-info h4,
.card.selected .machine-info p,
.card.selected .spec-tag {
    color: v-bind(themeColorWhite);
}

.card.selected .spec-tag {
    background: rgba(255, 255, 255, 0.2);   /* so tags stay visible */
}

.machine-checkbox {  /* it hides the actual checkbox */ 
    position: absolute;
    opacity: 0;
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
    background: white;
    color: v-bind(themeColor);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.2s ease;
    text-transform: capitalize;
}

/* --- Responsive --- */
@media (max-width: 768px) {
    
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
