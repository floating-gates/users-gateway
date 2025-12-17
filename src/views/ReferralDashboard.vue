<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { get_referral_details } from '../referral_handler/referral_details.js';
import { update_referral_details } from '../referral_handler/update.js'
import { verify_referral_credentials } from '../referral_handler/login.js';
import { themeColor, themeColorOrange, themeColorLille, themeColorWhite,
         app_login_url, referral_documents, terms_and_services_url,
         faq_url, price_url, documentation_url } from "../config.js";
import { logout } from "../user_handler/logout.js"

import Header from "../components/Header.vue";

const isAuthenticated = ref(false);
const error = ref('');
const referral_details = ref(null);
const isLoading = ref(true);
const editingPayment = ref(false);

const iban = ref('');
const swift = ref('');
const ibanError = ref('');
const swiftError = ref('');

function copyReferralLink() {
    if (!referral_details.value) return;
    const referralLink = `${app_login_url}/login?referral_code=${referral_details.value.referral_code}`;
    navigator.clipboard.writeText(referralLink)
};

const totalReferrals = computed(() => referral_details.value?.referred_users?.length || 0);
const activeReferrals = computed(() =>
    referral_details.value?.referred_users?.filter(u => u.subscription_status === 'active').length || 0
);

const savePaymentDetails = async () => {
    const cleanedIban = iban.value.replace(/\s+/g, '');
    
    // IBAN format (EU/UK, etc.)
    const ibanRegex = /^([A-Z]{2}\d{2}[A-Z0-9]{1,30})$/;
    // Pakistan-style account number (10–14 digits)
    const accountRegex = /^[0-9]{10,14}$/;
    
    if (!ibanRegex.test(cleanedIban) && !accountRegex.test(cleanedIban)) {
        ibanError.value = 'Enter a valid IBAN or local account number';
        return;
    }
    ibanError.value = '';
    
    // Basic SWIFT/BIC validation (8 or 11 chars, alphanumeric)
    if (swift.value && !/^[A-Z0-9]{8}([A-Z0-9]{3})?$/.test(swift.value)) {
        swiftError.value = 'Invalid SWIFT/BIC format';
        return;
    }
    swiftError.value = '';
    
    try {
        const updated = await update_referral_details(iban.value, swift.value );
        
        editingPayment.value = false;
        
    } catch (err) {
        ibanError.value = "Could not save details, please try again";
    }
};

onMounted(async () => {
    try {
        isAuthenticated.value = await verify_referral_credentials();
        
        if (!isAuthenticated.value.is_authenticated) {
            window.location.replace("/referral-login");
            return;
        }
        
        referral_details.value = await get_referral_details();
        iban.value = referral_details.value?.iban || '';
        swift.value = referral_details.value?.swift || '';
    } catch (e) {
        error.value = e.message;
    } finally {
        isLoading.value = false;
    }
    
    // Add logout on page exit
    const handleLogout = async () => {
        try {
            await logout();
        } catch (_) {}
    };
    
    // Fires on tab close, refresh, or navigation away
    window.addEventListener("pagehide", handleLogout);
    window.addEventListener("beforeunload", handleLogout);
    
    // Clean up the listener when component unmounts
    onUnmounted(() => {
        window.removeEventListener("pagehide", handleLogout);
        window.removeEventListener("beforeunload", handleLogout);
    });
});
</script>


<template>
<Header :context="'login'" />

<div class="referral-container">  
  <!-- Loading State -->
  <div v-if="isLoading" class="loading-card">
    <div class="loading-spinner"></div>
    <p class="loading-text">Loading referral details...</p>
  </div>
  
  <!-- Success State -->
  <div v-else-if="referral_details" class="referral-card">
    <div class="card-header">
      <h2 class="card-title">Referral Dashboard</h2>
      <p class="card-subtitle">Manage and track your referral program</p>
    </div>
    
    <!-- Affiliation Explanation + Documents -->
    <div class="affiliation-info">
      <div class="info-section">
        <h3 class="affiliation-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" width="32" height="32">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          How the Partnership Programme Works
        </h3>
          <ul>
          <li v-for="item in [
                     'Share your personal referral code with your network',
                     'Explain to your network what is Gates (A proxy CAD for digital manufacturing)',
                     'Users who subscribe through your link receive an exclusive discount',
                     'You earn a commission on their paid subscriptions (77% of the deal value after removing 22% VAT and 1% fees from GoCardless)',
                     'Your commission rate (10–30%) depends on your agreement with us'
                     ]"
              :key="item"
              :style="{ color: themeColor }">
            {{ item }}
          </li>
        </ul>
        <div class="payment-info">
          <strong :style="{ color: themeColor }">Payment Schedule: </strong>
          <span :style="{ color: themeColor }"> Rewards are issued on the 1st of each month.</span>
          <a :href="terms_and_services_url + '#partnership'" target="_blank"> View full terms</a>
        </div>
        <div class="contact-info">
          <strong :style="{ color: themeColor }">No agreement yet? </strong>
          <a href="mailto:contact@floating-gates.com"> contact@floating-gates.com</a>
        </div>
      </div>
      
      <div class="info-section">
        <h3 class="affiliation-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" width="32" height="32">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          Target Audience
        </h3>
        <p :style="{ color: themeColor }">
          <strong :style="{ color: themeColor }">Primary targets:</strong>
          Businesses with manufacturing operations including:
        </p>
        
        <ul>
          <li v-for="item in [
                     'Plastic manufacturing',
                     '3D printing labs',
                     'Manufacturing Cooperative like FABLABS',
                     'Metal fabrication',
                     'Engine parts production',
                     'Bolts manufacturing',
                     'Aerospace manufacturing (flanges, nozzles etc)',
                     'Wood working materials (doors, panels)',
                     'Any industrial manufacturing operations'
                     ]"
              :key="item"
              :style="{ color: themeColor }">
            {{ item }}
          </li>
        </ul>

        <p :style="{ color: themeColor }">
          <strong :style="{ color: themeColor }">
            Second target (Most money possible):</strong>
          Machines producer:
        </p>
        
        <ul>
          <li v-for="item in [
                     'CNC machine producer i.g. HAAS',
                     '3D printer producer i.g. Bambu Lab  ',
                     'Laser cutting Machine'
                     ]"
              :key="item"
              :style="{ color: themeColor }">
            {{ item }}
          </li>
        </ul>

        
        <p :style="{ color: themeColor }">
          <strong :style="{ color: themeColor }">Third targets:</strong>
          Privates with manufacturing capabilities:
        </p>
        
        <ul>
          <li v-for="item in [
                     'Owners of 3D printers',
                     'Artisans',
                     'Woodworkers'
                     ]"
              :key="item"
              :style="{ color: themeColor }">
            {{ item }}
          </li>
        </ul>

        
        <p :style="{ color: themeColor }">
          <strong :style="{ color: themeColor }">Pro tip:</strong>
          Experimentation is key—try different approaches.
        </p>
      </div>
      
      
      <div class="info-section">
        <h3 class="affiliation-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" width="32" height="32">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Sales Resources
        </h3>

        <div class="download-section">
          <p :style="{ color: themeColor }">Few important resources:</p>

          <div class="download-buttons">
            <a :href="faq_url" target="_blank" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              Frequently Asked Questions
            </a>

            <a :href="price_url" target="_blank" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Price Book
            </a>

            <a :href="documentation_url" target="_blank" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
              Learning Material
            </a>
          </div>
          <div class="download-section">
            <h3 class="affiliation-title">          
              Resources to Download
            </h3>
            <p :style="{ color: themeColor }">Download materials to support your outreach:</p>
          </div>
          <div class="download-buttons">
              <a :href="referral_documents.pitch_deck_pdf_url" target="_blank" class="download-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Pitch Deck
              </a>
              <a :href="referral_documents.business_card_pdf_url" target="_blank" class="download-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Business Card
              </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="code-section">
      <h3>Your Referral Code</h3>
      <div class="code-container">
        <div class="code-value">
          {{ referral_details.referral_code }}
        </div>
        <!-- <a href="/value-proposition" class="share-btn primary">Check the Value Proposition</a> -->
      </div>
    </div>
    
    <!-- Payment Details Section -->
    <div class="code-section">
      <h3> Payment details </h3>
      <label class="code-label">Your IBAN (preferred) or Account code  and SWIFT code</label>
      
      <div class="code-container" v-if="!editingPayment">
        <div class="code-value">{{ iban || '-' }}</div>
        <div class="code-value">{{ swift || '-' }}</div>
        <button class="share-btn primary" @click="editingPayment = true">Modify</button>
      </div>
      
      <div class="code-container" v-else>
        <input type="text" v-model="iban" placeholder="Enter your IBAN or Code account" class="iban-input" />
        <p v-if="ibanError" class="error-message">{{ ibanError }}</p>
        
        <label class="code-label">Your SWIFT/BIC</label>
        <input type="text" v-model="swift" placeholder="Enter your SWIFT/BIC code" class="iban-input" />
        <p v-if="swiftError" class="error-message">{{ swiftError }}</p>
        
        <button @click="savePaymentDetails" class="share-btn primary">Save Payment Details</button>
      </div>
    </div>
    
    <!-- Referral Stats -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon total">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
          </svg>
          
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ totalReferrals }}</span>
          <span class="stat-label">Total Referrals</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon active">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
          </svg>
          
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ activeReferrals }}</span>
          <span class="stat-label">Active Users</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon discount">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
          </svg>
          
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ referral_details.discount || 0 }}%</span>
          <span class="stat-label">User Discount</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon compensation">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          
        </div>
        <div class="stat-content">
          <span class="stat-number">
            {{ referral_details.compensation || 0 }}%</span>
          <span class="stat-label">Your Reward</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon compensation">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">
            {{ referral_details.next_check }} €</span>
          <span class="stat-label">Next Check Out (1st of month)</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon compensation">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">
            {{ referral_details.tot_money_due }} €</span>
          <span class="stat-label">Total Money Due</span>
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
.referral-container {
    padding-top: 120px;
    padding-bottom: 80px;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
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

.download-section {
    margin-top: 1rem;
}

.retry-button:hover {
    background: #2563eb;
}

/* Main Referral Card */
.referral-card {
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
}

.card-header {
    padding: 2rem;
    border-bottom: 1px solid #e5e7eb;
    background: v-bind( themeColor );
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
    color: v-bind(themeColorWhite);
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
    background: v-bind(themeColorOrange);
    color: white;
}

.share-btn.primary.whatsapp:hover {
    transform: translateY(-1px);
}

.share-btn.whatsapp {
    background: #25d366;
    color: white;
}

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

.affiliation-info {
  padding: 20px;
  background: #ffffff;
}

.affiliation-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.info-section {
    margin: 2rem 0; /* Changed from 1 rem to 2rem, and fixed syntax */
    padding: 1.0rem; /* Increased padding and fixed syntax */
    border-radius: 20px; /* Optional: adds rounded corners */
    background: #f9fafb; /* Optional: subtle background */
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
}

.download-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.download-btn {
  padding: 10px 16px;
  background: v-bind(themeColor);
  color: white;
  border-radius: 7px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s ease;
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
