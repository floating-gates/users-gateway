<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Cost & Multipliers Configuration</h2>
    
    <form @submit.prevent="saveConfig" class="space-y-4">
      <!-- Tolerance Multipliers -->
      <div>
        <label class="font-semibold">Tolerance Multipliers</label>
        <div v-for="(value, key) in config.toleranceMultipliers" :key="key" class="flex gap-2 items-center mt-1">
          <span>{{ key }} mm:</span>
          <input type="number" step="0.01" v-model.number="config.toleranceMultipliers[key]" class="border p-1 w-20" />
        </div>
      </div>

      <!-- Material Costs -->
      <div>
        <label class="font-semibold">Material Costs (per cm³)</label>
        <div v-for="(value, key) in config.materialCosts" :key="key" class="flex gap-2 items-center mt-1">
          <span class="w-40">{{ key }}:</span>
          <input type="number" step="0.01" v-model.number="config.materialCosts[key]" class="border p-1 w-24" />
        </div>
      </div>

      <!-- Machine Data -->
      <div>
        <label class="font-semibold">Machine Data</label>
        <div v-for="(value, key) in config.machineData" :key="key" class="mt-2">
          <span class="font-medium">{{ key }}</span>
          <div class="ml-4 flex gap-2 items-center">
            <span>Hourly Rate:</span>
            <input type="number" step="0.01" v-model.number="config.machineData[key].hourlyRate" class="border p-1 w-20" />
            <span>Speed (cm³/hr):</span>
            <input type="number" step="0.01" v-model.number="config.machineData[key].speedCm3PerHour" class="border p-1 w-20" />
          </div>
        </div>
      </div>

      <!-- Finish Costs -->
      <div>
        <label class="font-semibold">Surface Finish Costs</label>
        <div v-for="(value, key) in config.finishCosts" :key="key" class="flex gap-2 items-center mt-1">
          <span class="w-40">{{ key }}:</span>
          <input type="number" step="0.01" v-model.number="config.finishCosts[key]" class="border p-1 w-24" />
        </div>
      </div>

      <!-- Overhead and Minimum -->
      <div>
        <label class="font-semibold">Overhead (%)</label>
        <input type="number" step="0.01" v-model.number="config.overheadPercent" class="border p-1 w-24" />
      </div>
      <div>
        <label class="font-semibold">Minimum Order Value ($)</label>
        <input type="number" step="0.01" v-model.number="config.minimumOrderValue" class="border p-1 w-24" />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Save Configuration</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const config = reactive({
  materialCosts: {
    'pla': 0.08,
    'abs': 0.12,
    'resin_standard': 0.25,
    'pa12': 0.45,
    'aluminum_6061': 2.80,
    'aluminum_7075': 3.20,
    'stainless_steel_304': 4.50,
    'pbt': 0.35
  },
  machineData: {
    'fdm_3d_printer': { hourlyRate: 8, speedCm3PerHour: 15 },
    'sls_3d_printer': { hourlyRate: 25, speedCm3PerHour: 8 },
    'sla_3d_printer': { hourlyRate: 18, speedCm3PerHour: 12 },
    'cnc_3_axis': { hourlyRate: 45, speedCm3PerHour: 5 },
    'cnc_5_axis': { hourlyRate: 75, speedCm3PerHour: 3 },
    'inj_mould': { hourlyRate: 35, speedCm3PerHour: 100 }
  },
  toleranceMultipliers: {
    0.2: 1.0,
    0.1: 1.3,
    0.05: 1.6,
    0.01: 2.2
  },
  finishCosts: {
    'as_machined': 0,
    'bead_blasted': 15,
    'anodized': 25,
    'polished': 35,
    'painted': 20
  },
  overheadPercent: 30,
  minimumOrderValue: 10
})

function saveConfig() {
  console.log('Saved configuration:', JSON.parse(JSON.stringify(config)))
  // This could also emit to a parent: emit('update:config', config)
}
</script>
