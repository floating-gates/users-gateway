<script setup>
import { ref, onMounted, computed } from 'vue';
import { get_referral_details } from '../referral_handler/referral_details.js';
import { verify_referral_credentials } from '../referral_handler/login.js';
import { themeColor, themeColorOrange, themeColorLille, themeColorWhite } from "../data/items.js";

import Header from "../components/Header.vue";

const isAuthenticated = ref(false);
const error = ref('');
const referral_details = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        isAuthenticated.value = await verify_referral_credentials();
        referral_details.value = await get_referral_details();
    } catch (e) {
        error.value = e.message;
    } finally {
        isLoading.value = false;
    }
});

const copyReferralLink = () => {
    if (!referral_details.value) return;
    const referralLink = `${window.location.origin}/login?referral_code=${referral_details.value.referral_code}`;
    navigator.clipboard.writeText(referralLink);
};

// derived stats
const totalReferrals = computed(() => referral_details.value?.referred_users?.length || 0);
const activeReferrals = computed(() =>
  referral_details.value?.referred_users?.filter(u => u.subscription_status === 'active').length || 0
);
</script>

<template>
  <Header :context="'login'" />

  <div class="referral-container">
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-card">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading referral details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-card">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Error</h3>
      <p class="error-message">{{ error }}</p>
      <button class="retry-button" @click="$router.go(0)">
        Try Again
      </button>
    </div>

    <!-- Success State -->
    <div v-else-if="referral_details" class="referral-card">
      <div class="card-header">
        <h2 class="card-title">Referral Dashboard</h2>
        <p class="card-subtitle">Manage and track your referral program</p>
      </div>
      
      <div class="code-section">
        <label class="code-label">Your Referral Code</label>
        <div class="code-container">
          <div class="code-value">
            {{ referral_details.referral_code }}
          </div>
          <button @click="copyReferralLink" class="copy-code-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Copy
          </button>
        </div>
      </div>

      <!-- Referral Stats -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon total">👥</div>
          <div class="stat-content">
            <span class="stat-number">{{ totalReferrals }}</span>
            <span class="stat-label">Total Referrals</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon active">✅</div>
          <div class="stat-content">
            <span class="stat-number">{{ activeReferrals }}</span>
            <span class="stat-label">Active Users</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon discount">💰</div>
          <div class="stat-content">
            <span class="stat-number">{{ referral_details.discount || 0 }}%</span>
            <span class="stat-label">User Discount</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon compensation">💎</div>
          <div class="stat-content">
            <span class="stat-number">{{ referral_details.compensation || 0 }}%</span>
            <span class="stat-label">Your Reward</span>
          </div>
        </div>
      </div>

      <!-- Share Options -->
      <div class="share-section">
        <h3 class="section-title">Share Your Referral</h3>
        <p class="section-subtitle">Help others discover our platform and earn rewards</p>
        <div class="share-buttons">
          <button @click="copyReferralLink" class="share-btn primary">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Copy Link
          </button>
          <a :href="`https://wa.me/?text=Join%20me%20using%20my%20referral%20code:%20${referral_details.referral_code}`" 
             target="_blank" class="share-btn whatsapp">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      <!-- Referred Users -->
      <div class="users-section" v-if="referral_details.referred_users && referral_details.referred_users.length">
        <div class="section-header">
          <h3 class="section-title">Referred Users</h3>
          <span class="user-count">{{ totalReferrals }} users</span>
        </div>
        <div class="table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Subscription</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in referral_details.referred_users" :key="user.email">
                <td>
                  <div class="user-info">
                    <div class="user-avatar">
                      {{ user.full_name.charAt(0).toUpperCase() }}
                    </div>
                    <div class="user-details">
                      <div class="user-name">{{ user.full_name }}</div>
                      <div class="user-email">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="subscription-plan">{{ user.subscription_plan }}</span>
                </td>
                <td>
                  <span :class="['status-badge', user.subscription_status]">
                    {{ user.subscription_status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else class="empty-card">
      <div class="empty-icon">📊</div>
      <h3 class="empty-title">No Referral Data</h3>
      <p class="empty-message">Your referral information will appear here once available</p>
    </div>
  </div>
</template>

<style scoped>
/* Base Container */
.referral-container {
  max-width: 1200px;
  margin: 7rem auto;
  padding: 4rem auto;
}

/* Loading State */
.loading-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* Error State */
.error-card {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #ef4444;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-title {
  color: #dc2626;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.error-message {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.retry-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: #2563eb;
}

/* Main Referral Card */
.referral-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: v-bind(themeColorWhite);
  color: white;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.card-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  color: v-bind(themeColor);

}

/* Code Section */
.code-section {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.code-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.code-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.code-value {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  letter-spacing: 0.1em;
}

.copy-code-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-code-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: v-bind(themeColorLille);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  background: v-bind(themeColorLille);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin-top: 0.25rem;
}

/* Share Section */
.share-section {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  color: v-bind(themeColor);
  margin: 0 0 1.5rem 0;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.share-btn.primary {
  background: #3b82f6;
  color: white;
}

.share-btn.primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.share-btn.whatsapp {
  background: #25d366;
  color: white;
}

.share-btn.whatsapp:hover {
  background: #20ba5a;
  transform: translateY(-1px);
}

/* Users Section */
.users-section {
  padding: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.user-count {
  /* background: #e0e7ff; */
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.table-container {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  /* background: #f9fafb; */
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
}

.users-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.users-table tbody tr:hover {
  /* background: #f8fafc; */
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-name {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.user-email {
  color: #6b7280;
  font-size: 0.875rem;
}

.subscription-plan {
  /* background: #f3f4f6; */
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.active {
  /* background: #dcfce7; */
  color: #166534;
}

.status-badge.inactive {
  /* background: #fee2e2; */
  color: #991b1b;
}

.status-badge.demo {
  /* background: #fef3c7; */
  color: #92400e;
}

/* Empty State */
.empty-card {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-title {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.empty-message {
  color: #6b7280;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .referral-container {
    padding: 1rem;
  }
  
  .card-header,
  .code-section,
  .stats-section,
  .share-section,
  .users-section {
    padding: 1.5rem;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .code-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .share-buttons {
    flex-direction: column;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .users-table {
    min-width: 600px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .referral-card,
  .loading-card,
  .empty-card {
    /* background: #1f2937; */
    color: #f9fafb;
  }
  
  .code-value {
    background: v-bind(themeColor);
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .stat-card {
    /* background: #374151; */
    border-color: #4b5563;
  }
  
  .users-table th {
    /* background: #374151; */
    color: #f9fafb;
  }
  
  .users-table tbody tr:hover {
    /* background: #374151; */
  }
}
</style>
