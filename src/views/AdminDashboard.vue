<script setup>
import { ref, onMounted } from 'vue';
import Header from "../components/Header.vue"
import { themeColorOrange } from "../data/items.js";
import { get_users_list } from "../user_handler/list_user.js";
import { verify_admin } from "../user_handler/login.js"

const isAdmin = ref(false);
const error = ref('');
const user_list = ref([]);


onMounted(async () => {

    isAdmin.value = await verify_admin();
    
    if (!isAdmin.value) {
        window.location.replace("/dashboard");
    }
    
    try {
        const res = await get_users_list();
        if (!res.ok) {
            throw new Error("Failed to fetch users");
        }
        user_list.value = await res.json();
    } catch (e) {
        error.value = e.message;
    }
});
</script>

<template>
  <Header :context="'user-dashboard'" />
  <div class="untree_co-hero dashboard-section" id="dashboard-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="dashboard-header" data-aos="fade-up">
            <h1 class="heading">Admin Page</h1>
          </div>

          <div class="col-12" data-aos="fade-up" data-aos-delay="400">
            <div class="dashboard-main-content">
              <h2 class="section-title">All Users</h2>
              <div class="user-list">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in user_list" :key="user.id">
                      <td>{{ user.full_name }}</td>
                      <td>{{ user.company }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.phone_number }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-if="error" class="text-danger mt-3">{{ error }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-section {
  background-color: #f9f9f9;
  padding-top: 40px;
}

.dashboard-header {
  margin-bottom: 30px;
}

.welcome-message {
  font-size: 18px;
}

.dashboard-main-content {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 22px;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f0f0f0;
}
</style>
