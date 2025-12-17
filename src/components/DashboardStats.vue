<script setup>
import { ref, computed, defineProps, onMounted } from 'vue'
import { themeColor, themeColorWhite, themeColorOrange,
         price_status } from "../config.js"
import { getMachineList } from "../user_handler/machine.js";
import { getMaterials } from "../user_handler/materials.js"


const machineList = ref([])
const materialList = ref([])

const props = defineProps({
    proj_list: {
        type: Array,
        required: true
    },
    is_admin: Boolean
})

const goTo = (link) => {
    if (!link || link === '#') return
    window.location.href = link
}

const stats = computed(() => ({
    active: props.proj_list.length,
    pending: props.proj_list.filter(
        p => p.price_status === price_status[2]
    ).length,
    completed: props.proj_list.filter(
        p => p.price_status === price_status[3] ||
            p.price_status === price_status[7]
    ).length
}))

const rawStats = computed(() => [
    {
        number: stats.value.active,
        label: 'Active Orders',
        functional_to_cad: false, 
        link: "#"
    },
    {
        number: stats.value.pending,
        label: 'Waiting Customer Decision',
        functional_to_cad: false,
        link: "#"
    },
    {
        number: stats.value.completed,
        label: 'Orders Completed',
        functional_to_cad: false,
        link: "#"
    },
    {
        number: machineList.value.length,
        label: 'Machines',
        functional_to_cad: true, 
        link: "/profile#machines"
    },
    {
        number: materialList.value.length,
        label: 'Materials',
        functional_to_cad: true,
        link: "/profile#materials"
    }
])


const statItems = computed(() =>
    rawStats.value.map(stat => ({
        ...stat,
        cad_is_good: stat.functional_to_cad ? stat.number >= 1 : true
    }))
)

onMounted(async () => {
  const [machines, materials] = await Promise.all([
    getMachineList(),
    getMaterials()
  ])
  machineList.value = machines
  materialList.value = materials
})
</script>

<template>
<div class="stats-grid">
  <div
    v-for="(stat, i) in statItems"
    :key="i"
    :data-aos-delay="i * 100"
    data-aos="fade-up"
    >
    <div
      class="stats-card"
      :class="[
              stat.cad_is_good ? 'stats-card--good' : 'stats-card--bad stats-card--attention'
              ]"
      :role="!stat.cad_is_good ? 'button' : undefined"
      @click="!stat.cad_is_good && goTo(stat.link)"
      >
      <h3 class="stats-number">{{ stat.number }}</h3>
      <p class="stats-label">{{ stat.label }}</p>
    </div>
  </div>
  <div v-if="props.is_admin" class="stats-card" >
    <a class="stats-label" href="/admin-dashboard">Admin Dashboard</a>
  </div>
</div>

</template>


<style scoped>
.stats-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
}

.stats-card {
    backgroundColor: v-bind(themeColorWhite);
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0.1, 0, 0.3);
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}


.stats-card:hover {
    transform: translateY(-5px);
}

.stats-card--good {
    border: 4px solid transparent;
}

.stats-card--bad {
    border: 4px solid v-bind(themeColorOrange);
}

.stats-number {
    font-size: 38px;
    font-weight: bold;
    color: v-bind(themeColor);
    margin-bottom: 8px;
}

.stats-label {
    font-size: 16px;
    color: #666;
    text-align: center;
}

@keyframes nudge {
    0%   { transform: translateX(0); }
    20%  { transform: translateX(-2px); }
    40%  { transform: translateX(2px); }
    60%  { transform: translateX(-1px); }
    80%  { transform: translateX(1px); }
    100% { transform: translateX(0); }
}

.stats-card--attention {
  cursor: pointer;
  animation: nudge 1.2s ease-in-out infinite;
}

.stats-card--attention:hover {
  animation: none;
  transform: scale(1.04);
}
</style>
