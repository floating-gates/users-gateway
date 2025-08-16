<script setup>
import { ref, defineProps } from 'vue'
import { delete_subscription } from '../user_handler/subscription.js'
import { themeColor, themeColorOrange, themeColorWhite } from '../data/items.js';

const props = defineProps(['user'])
const error = ref('')
const isLoading = ref(false)

async function handleDeleteSubscription() {

    if (!window.confirm('Are you sure you want to suspend this subscription?')) {
    return
  }
  
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await delete_subscription()
    
    if (response.status !== 204) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to suspend subscription')
    }
    
    location.reload()
  } catch (exception) {
    error.value = exception.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="subscription-container">
    <div class="subscription-header">
      <h3 class="subscription-title">Subscription Management</h3>
      <p class="subscription-description">
        Manage your current subscription and access your hub dashboard.
      </p>
    </div>

    <div class="subscription-content">
      <div class="subscription-table-wrapper">
        <table class="subscription-table">
          <thead>
            <tr>
              <th>Hub URL</th>
              <th>Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a :href="props.user.host_address" 
                   class="hub-link"
                   target="_blank"
                   rel="noopener noreferrer">
                  {{ props.user.host_address }}
                </a>
              </td>
              <td class="plan-cell">{{ props.user.subscription_plan }}</td>
              <td class="status-cell">
                <span class="status-badge">
                  {{ props.user.subscription_status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="subscription-actions">
        <button 
          class="btn btn-suspend"
          :disabled="isLoading"
          @click="handleDeleteSubscription"
        >
          {{ isLoading ? 'Processing...' : 'Suspend Subscription' }}
        </button>
        <!-- <a  -->
        <!--   :href="props.user.host_address"  -->
        <!--   class="btn btn-hub" -->
        <!--   target="_blank" -->
        <!--   rel="noopener noreferrer" -->
        <!-- > -->
        <!--   Access Hub -->
        <!-- </a> -->
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.subscription-container {
  background-color: v-bind(themeColorWhite);
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  padding: 3rem 2rem;
  margin: 3rem auto;
  max-width: 800px;
}

.subscription-header {
  text-align: center;
  margin-bottom: 2rem;
}

.subscription-title {
  font-size: 2rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 0.5rem;
}

.subscription-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.subscription-content {
  padding: 0;
}

.subscription-table-wrapper {
  margin-bottom: 2rem;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.subscription-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  text-align: center;
}

.subscription-table th {
  padding: 1rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fafafa;
}

.subscription-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.hub-link {
  color: v-bind(themeColorOrange);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.hub-link:hover {
  text-decoration: underline;
}

.plan-cell {
  font-weight: 500;
  color: #374151;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 50px;
}

.subscription-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: none;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-suspend {
  background-color: v-bind(themeColorOrange);
  border-color: v-bind(themeColorOrange);
  color: v-bind(themeColor);
}

.btn-hub {
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
}

.error-message {
  margin-top: 1.5rem;
  padding: 0.8rem 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  font-size: 0.95rem;
}
</style>
