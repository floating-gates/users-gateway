<script setup>
import { ref, computed } from 'vue';
import { themeColor, themeColorWhite, themeColorOrange } from '../config.js';

const props = defineProps({
  machines: {
    type: Array,
    required: true,
    default: () => []
  },
  materials: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(["go_to_machines"])

const displayMachines = computed(() => {
  return props.machines.map(machine => {
    const displayMachine = {
      displayName: machine.display_name || machine.machine_tag,
      materials: [],
      costPerHour: machine.cost_per_hour,
        setupCost: machine.setup_cost,
        speed_cm3_per_hour: machine.speed_cm3_per_hour
    };
    
    displayMachine.materials = props.materials
      .filter(material => material.manufacturing_methods_tags?.includes(machine.machine_tag))
      .map(material => ({
        displayName: material.display_name || material.material_tag,
        costPerCm3: material.cost_per_cm3
      }));
      
    return displayMachine;
  });
});

const formatCurrency = (value) => {
  return `€${parseFloat(value).toFixed(2)}`;
};
</script>

<template>
  <div class="manufacturing-container">
    <div class="header-section">
      <h2 class="main-title">Manufacturing Capabilities</h2>
      <p class="subtitle">
        See how your machines are configured
      </p>
    </div>

    <div class="machines-grid">

      <div v-if="props.machines.length === 0" class="materials-grid">
        <button class="btn btn-primary" @click="emit('go_to_machines')">
          Select machines and materials
        </button>

      </div>
      <div 
        v-for="machine in displayMachines" 
        :key="machine.displayName"
        class="machine-card"
      >
        <div class="machine-header">
          <h3 class="machine-name">{{ machine.displayName }}</h3>
          <div class="cost-info">
            <div class="cost-item">
              <span class="cost-label">Hourly Rate</span>
              <span class="cost-value">{{ formatCurrency(machine.costPerHour) }}</span>
            </div>
            <div class="cost-separator">•</div>
            <div class="cost-item">
              <span class="cost-label">Setup Fee</span>
              <span class="cost-value">{{ formatCurrency(machine.setupCost) }}</span>
            </div>
            <div class="cost-separator">•</div>
            <div class="cost-item">
              <span class="cost-label">Machine Velocity</span>
              <span class="cost-value">{{ machine.speed_cm3_per_hour }} cm<sup>3</sup>/hour </span>
            </div>
          </div>
        </div>

        <div class="materials-section">
          <h4 class="materials-title">Compatible Materials</h4>
          <div v-if="machine.materials.length > 0" class="materials-grid">
            <div 
              v-for="material in machine.materials" 
              :key="material.displayName"
              class="material-card"
            >
              <div class="material-name">{{ material.displayName }}</div>
              <div class="material-cost">{{ formatCurrency(material.costPerCm3) }}/cm³</div>
            </div>
          </div>
          <div v-else class="no-materials">
            <span class="no-materials-text">No compatible materials available</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manufacturing-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.main-title {
    font-size: 2rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.machines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
}

.machine-card {
  background: v-bind(themeColorWhite);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.machine-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: v-bind(themeColor);
}

.machine-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: v-bind(themeColor);
}

.machine-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.machine-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.cost-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cost-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cost-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.cost-value {
  font-size: 1.125rem;
  color: v-bind(themeColorOrange);
  font-weight: 700;
}

.cost-separator {
  color: #cbd5e1;
  font-weight: bold;
  font-size: 1.5rem;
}

.materials-section {
  margin-top: 1.5rem;
}

.materials-title {
  font-size: 1rem;
  font-weight: 600;
  color: v-bind(themeColor);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.material-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.2s ease;
}

.material-card:hover {
  background: #f1f5f9;
  border-color: v-bind(themeColor);
  transform: translateY(-1px);
}

.material-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.material-cost {
  font-size: 0.75rem;
  color: v-bind(themeColorOrange);
  font-weight: 700;
  background: rgba(251, 146, 60, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  display: inline-block;
}

.no-materials {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
}

.no-materials-text {
  color: #64748b;
  font-style: italic;
  font-size: 0.875rem;
}

.manufacturing-container {
    padding: 1.5rem;
    margin: 3rem;
    border-radius: 18px;

                        
  }

@media (max-width: 768px) {

  .main-title {
    font-size: 2rem;
  }

  .machines-grid {
    grid-template-columns: 1fr;
    gap: 1.0rem;
  }

  .machine-card {
    padding: 1.0rem;
  }

  .cost-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .cost-separator {
    display: none;
  }

  .materials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .machine-card {
    padding: 0.4rem;
  }
}
</style>
