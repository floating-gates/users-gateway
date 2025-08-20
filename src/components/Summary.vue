<script setup>
import { ref, watch } from 'vue';
import { themeColor, themeColorWhite, themeColorOrange, machineTagNames } from '../data/items';

const props = defineProps(["machines", "materials"]);

const display_machines = ref([]);

function arrange_summary_display(machines, materials) {
  console.log("materials: ", materials, "\n machines:", machines);
  const result = [];

  for (const mac of machines) {
    const display_machine = {
      display_name: machineTagNames[mac.machine_tag] || mac.machine_tag,
      materials: []
    };

    for (const mat of materials) {
      if (mat.manufacturing_methods_tags?.includes(mac.machine_tag)) {
        display_machine.materials.push(mat.display_name || mat.material_tag);
      }
    }

    result.push(display_machine);
  }

  return result;
}

watch(
  [() => props.machines, () => props.materials],
  ([machines, materials]) => {
    display_machines.value = arrange_summary_display(machines, materials);
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="machine-selector-container">
    <div class="machine-selector">

      <div class="header-section">
        <h3 class="main-title">Your Manufacturing Capabilities</h3>
        <p class="subtitle">Here you see how your machines are configured</p>
      </div>

      <!-- Machines List -->
      <section class="machines-list">
        <div 
          v-for="machine in display_machines" 
          :key="machine.display_name" 
          class="machine-row"
        >
          <div class="machine-info">
            <h4 class="machine-name">{{ machine.display_name }}</h4>
            <div class="machine-stats">
              <span class="stat">
                <strong>Materials:</strong>
                <span v-if="machine.materials.length">
                  {{ machine.materials.join(', ') }}
                </span>
                <span v-else>
                  None
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.machine-selector {
  max-width: 1000px;
  margin: 3rem auto;
  background: v-bind(themeColorWhite);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  overflow: hidden;
}

.header-section {
  padding: 2.5rem 2rem 1.5rem;
  text-align: center;
  color: v-bind(themeColor);
}

.subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.machines-list {
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem;
  gap: 1rem;
}

.machine-row {
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.machine-row:hover {
  background: v-bind(themeColorWhite);
  border-color: v-bind(themeColor);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.machine-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: v-bind(themeColor);
}

.machine-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: #334155;
}

.stat strong {
  color: v-bind(themeColorOrange);
}

.main-title {
  font-size: 2rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 2.5rem;
}
</style>
