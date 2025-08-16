<script setup>
import { ref, onMounted } from 'vue';
import { themeColor, themeColorWhite, themeColorOrange, machineTagNames } from '../data/items';
import { getMachineList } from '../user_handler/machine.js';

const machines = ref([]);

onMounted(async () => {
  const list = await getMachineList();
  // Example stats added for demonstration
  machines.value = list.map(m => ({
    ...m,
    operative_cost: (Math.random() * 0.5 + 0.1).toFixed(2) + " €/cm³",
    speed: (Math.random() * 10 + 1).toFixed(2) + " cm³/sec",
      setupCost: (Math.random() * 50 + 10).toFixed(0) + " €"
  }));
});
</script>

<template>
  <div class="machine-selector-container">
    <div class="machine-selector">

      <!-- Header -->
    <!-- Header Section -->
    <div class="header-section">
      <h3 class="main-title">Your Manufacturing Capabilities</h3>
      <p class="subtitle">Here you see how your machines are configured</p>
    </div>

      <!-- Machines List -->
      <section class="machines-list">
        <div 
          v-for="machine in machines" 
          :key="machine.machine_tag" 
          class="machine-row"
        >
          <div class="machine-info">
            <h4 class="machine-name">  {{ machineTagNames[ machine.machine_tag ] }}</h4>
            <div class="machine-stats">
              <span class="stat"><strong>Operative Cost:</strong> {{ machine.cost }}</span>
              <span class="stat"><strong>Operative Speed:</strong> {{ machine.speed }}</span>
              <span class="stat"><strong>Setup Cost:</strong> {{ machine.setupCost }}</span>
              <span class="stat"><strong>Business overhead:</strong> {{ machine.overhead }}</span>
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
    font-size: 2.0rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 2.5rem;
}

</style>

