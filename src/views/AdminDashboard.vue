<script setup>
import { ref, onMounted, computed } from 'vue';
import Header from "../components/Header.vue";
import { get_users_list } from "../user_handler/list_user.js";
import { verify_user_credentials } from "../user_handler/login.js";

const error = ref('');
const user_list = ref([]);

const users = computed(() => user_list.value.filter(u => u.user_type === "user"));
const referrals = computed(() => user_list.value.filter(u => u.user_type === "referral"));

onMounted(async () => {
  const credentials = await verify_user_credentials();
  
  // Redirect if not admin
  if (!credentials.is_admin) {
    window.location.replace("/dashboard");
    return;
  }

  try {
    const res = await get_users_list();
    if (!res.ok) throw new Error("Failed to fetch users");
    user_list.value = await res.json();
  } catch (e) {
    error.value = e.message;
  }
});
</script>

<template>
  <Header :context="'user-dashboard'" />
  <div class="dashboard-section" id="dashboard-section">
    <div class="container">
      <div class="dashboard-header" data-aos="fade-up">
        <h1 class="heading">Admin Page</h1>
      </div>

      <div class="dashboard-main-content" data-aos="fade-up" data-aos-delay="300">
        <!-- Users Section -->
        <div class="data-card">
          <h2 class="section-title">Platform Users</h2>
          <div class="user-list" v-if="users.length">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Host Address</th>
                  <th>Referral Code</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="'u-' + user.id">
                  <td>{{ user.full_name }}</td>
                  <td>{{ user.company || '-' }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phone_number || '-' }}</td>
                  <td>{{ user.host_address || '-' }}</td>
                  <td>{{ user.referral_code || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else class="empty-text">No users found.</p>
        </div>

        <!-- Referrals Section -->
        <div class="data-card mt-5">
          <h2 class="section-title">Referrals</h2>
          <div class="user-list" v-if="referrals.length">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Referral Code</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ref in referrals" :key="'r-' + ref.id">
                  <td>{{ ref.full_name }}</td>
                  <td>{{ ref.company || '-' }}</td>
                  <td>{{ ref.email }}</td>
                  <td>{{ ref.phone_number || '-' }}</td>
                  <td>{{ ref.referral_code || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else class="empty-text">No referrals found.</p>
        </div>

        <!-- Error message -->
        <p v-if="error" class="error-text">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-section {
  background-color: #f9fafc;
  padding: 40px 0;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 30px;
  text-align: center;
}

.heading {
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.dashboard-main-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.data-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
  border-left: 4px solid #007bff;
  padding-left: 10px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.styled-table th, 
.styled-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e6e6e6;
  text-align: left;
}

.styled-table th {
  background-color: #f0f4f8;
  font-weight: 600;
  color: #333;
}

.styled-table tbody tr:hover {
  background-color: #f9f9f9;
}

.empty-text {
  font-size: 14px;
  color: #888;
  margin-top: 10px;
}

.error-text {
  margin-top: 20px;
  font-size: 15px;
  color: #dc3545;
  text-align: center;
}
</style>
