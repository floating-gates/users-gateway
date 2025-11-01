<script setup>
import { ref, defineProps } from 'vue'
import { delete_subscription } from '../user_handler/subscription.js'
import { themeColor, themeColorOrange, themeColorWhite } from '../config.js'

import githubLogo from '../data/images/github-logo.svg'
import f6sLogo from '../data/images/f6s-logo.svg'
import mailLogo from '../data/images/mail-logo.svg'

const props = defineProps(['user'])
const error = ref('')

async function handleDeleteSubscription() {
  if (!window.confirm('Are you sure you want to suspend this subscription?')) {
    return
  }

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
  }
}
</script>

<template>
  <div class="subscription-container">
    <!-- Subscription Management -->
    <div class="header">
      <h3 class="title">Subscription Management</h3>
      <p class="description">
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
              <th>Suspend/Activate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  :href="props.user.host_address"
                  class="hub-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ props.user.host_address }}
                </a>
              </td>
              <td class="plan-cell">{{ props.user.subscription_plan }}</td>
              <td class="status-cell">
                <span class="status-badge">
                  {{ props.user.subscription_status }}
                </span>
              </td>
              <td>
                <button class="btn btn-suspend" @click="handleDeleteSubscription">
                  Suspend
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>

    <!-- Support Section -->
    <div class="header">
      <!-- <h2 class="title" :style="{ color: themeColor }">Need Help?</h2> -->
      <p class="description">
        If you've encountered any problems or unexpected behavior while using
        the platform, we're here to help! Here are the ways you can reach us:
      </p>
    </div>

    <div class="support-table-wrapper">
      <table class="support-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img :src="githubLogo" alt="GitHub" class="icon" />
            </td>
            <td>
              <a
                href="https://github.com/floating-gates/users-gateway/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                class="support-link"
              >
                Report an Issue
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <img :src="mailLogo" alt="Email" class="icon" />
            </td>
            <td>
              <a href="mailto:contact@floating-gates.com" class="support-link">
                Send an Email
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <img :src="f6sLogo" alt="Review" class="icon" />
            </td>
            <td>
              <a
                href="https://www.f6s.com/software/review?product=floating-gates"
                target="_blank"
                rel="noopener noreferrer"
                class="support-link"
              >
                Leave a Review
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.subscription-container {
  background-color: v-bind(themeColorWhite);
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 3rem 2rem;
  margin: 3rem auto;
  max-width: 1200px;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 0.5rem;
  margin-top: 2.0rem;
}

.description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

/* Subscription Table */
.subscription-table-wrapper {
  margin-bottom: 2rem;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

/* Actions */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 50px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-3px);
}

.btn-suspend {
  background-color: v-bind(themeColorOrange);
  border-color: v-bind(themeColorOrange);
  color: v-bind(themeColor);
}

/* Support Table */
.support-table-wrapper {
  margin: 2rem auto;
  max-width: 700px;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.support-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 1rem;
}

.support-table th {
  padding: 1rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fafafa;
}

.support-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.support-link {
  color: v-bind(themeColor);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.support-link:hover {
  color: v-bind(themeColorOrange);
  text-decoration: underline;
}

.icon {
  width: 2.2rem;
  height: 2.2rem;
  display: block;
  margin: 0 auto;
}

/* Error */
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
