<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { themeColor, themeColorOrange, themeColorWhite } from '../data/items.js'
import { get_logo, upload_logo, validate_logo } from '../user_handler/logo.js'

const logo = ref(null)         // always holds File object
const logoUrl = ref(null)      // preview URL
const props = defineProps(['user'])
const hasLogo = ref(false)
const error = ref("")
const isUploading = ref(false)
const isDragOver = ref(false)

const fileInput = ref(null)

function triggerFileInput() { fileInput.value.click() }

function handleLogoUpload(event) {
    const file = event.target.files[0]
    processFile(file)
}

async function processFile(file) {

    error.value = ""
    if (!file) return
    
    if ( validate_logo(file, error.value) ) {
        logo.value = file
        logoUrl.value = URL.createObjectURL(file)
        hasLogo.value = true
        
        isUploading.value = true
        const success = await upload_logo(file)
        
        if (success) {
            error.value = ""
            logoUrl.value = URL.createObjectURL(file)
            hasLogo.value = true
        } else {
            error.value = "Failed to upload logo. Please try again."
  }

  isUploading.value = false
  }
}

async function removeLogo() {
  logo.value = null
  logoUrl.value = null
  hasLogo.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Drag and drop handlers
function handleDragOver(event) {
  event.preventDefault()
  isDragOver.value = true
}

function handleDragLeave(event) {
  event.preventDefault()
  isDragOver.value = false
}

function handleDrop(event) {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

onMounted(async () => {
  const url = await get_logo(props.user.host_address)
  if (url) {
    logoUrl.value = url
    hasLogo.value = true
  }
})
</script>

<template>
  <div class="logo-manager">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
        </div>
        <h3 class="header-title">Your Brand Details</h3>
        <p class="header-description">
          Upload your company logo to personalize your customer experience. Supports PNG format up to 5MB.
        </p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-banner">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="error-icon">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Upload Area -->
    <div class="upload-section">
      <div 
        class="upload-area"
        :class="{ 'drag-over': isDragOver, 'has-logo': hasLogo }"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @click="!hasLogo && triggerFileInput()" >
        <!-- Logo Preview -->
        <div v-if="hasLogo" class="logo-preview">
          <img :src="logoUrl" alt="Company Logo" class="logo-image" />
          <div class="logo-overlay">
            <button class="overlay-button" @click.stop="triggerFileInput" title="Change logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="overlay-icon">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span class="overlay-text">Change</span>
            </button>
          </div>
        </div>

        <!-- Upload Prompt -->
        <div v-else class="upload-prompt">
          <div class="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="prompt-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17,8 12,3 7,8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <h4 class="upload-title">Upload your logo</h4>
          <p class="upload-description">
            Drag and drop your PNG file here, or click to browse
          </p>
          <div class="upload-specs">
            <span class="spec-item">PNG format</span>
            <span class="spec-divider">•</span>
            <span class="spec-item">Max 5MB</span>
            <span class="spec-divider">•</span>
            <span class="spec-item">Recommended: 200x200px</span>
          </div>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/png"
          class="file-input"
          @change="handleLogoUpload"
        />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-section">     
      <button 
        v-if="hasLogo"
        class="action-button secondary"
        @click="removeLogo"  >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="button-icon">
          <polyline points="3,6 5,6 21,6"/>
          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
        </svg>
        Remove Logo
      </button>
    </div>
  </div>
</template>

<style scoped>
.logo-manager {
  background-color: v-bind(themeColorWhite);
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  max-width: 600px;
  
  /* Center horizontally and add space on top */
  margin: 3rem auto 0 auto; /* top: 3rem, left/right: auto, bottom: 0 */
  
  padding: 2.5rem;
}


/* Header Section */
.header-section {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  text-align: center;
}


.header-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  background: v-bind(themeColorOrange);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.header-description {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
  max-width: 400px;
  margin: 0 auto;
}

/* Error Banner */
.error-banner {
  margin: 1.5rem 2rem;
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.75rem;
  color: #dc2626;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.error-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Upload Section */
.upload-section {
  padding: 2rem;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 1rem;
  background-color: #f9fafb;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-area:not(.has-logo):hover {
  border-color: v-bind(themeColorOrange);
  background-color: #fef3f2;
}

.upload-area.drag-over {
  border-color: v-bind(themeColorOrange);
  background-color: #fef3f2;
  transform: scale(1.01);
}

.upload-area.has-logo {
  border: none;
  background: none;
  cursor: default;
  padding: 0;
}

/* Logo Preview */
.logo-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.logo-image {
  max-width: 260px;
  max-height: 260px;
  border-radius: 0.8rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  object-fit: contain;
}

.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 1rem;
}

.logo-preview:hover .logo-overlay {
  opacity: 1;
}

.overlay-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: v-bind(themeColor);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.overlay-button:hover {
  background: white;
  transform: scale(1.05);
}

.overlay-icon {
  width: 1rem;
  height: 1rem;
}

.overlay-text {
  font-size: 0.875rem;
}

/* Upload Prompt */
.upload-prompt {
  padding: 3rem 2rem;
  text-align: center;
}

.upload-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  background-color: #f3f4f6;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.prompt-icon {
  width: 2rem;
  height: 2rem;
}

.upload-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: v-bind(themeColor);
  margin-bottom: 0.5rem;
}

.upload-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.upload-specs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

.spec-item {
  white-space: nowrap;
}

.spec-divider {
  color: #d1d5db;
}

.file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Action Section */
.action-section {
  padding: 1.5rem 2rem 2rem;
  background-color: #f9fafb;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
  min-width: 120px;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button.primary {
  background-color: v-bind(themeColorOrange);
  border-color: v-bind(themeColorOrange);
  color: white;
}

.action-button.secondary {
  background-color: transparent;
  border-color: #d1d5db;
  color: #6b7280;
}

.action-button.secondary:hover {
  border-color: #9ca3af;
  color: #4b5563;
}

.button-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.loading-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.action-button.loading {
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 640px) {
  .header-section {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .upload-section {
    padding: 1.5rem;
  }
  
  .upload-prompt {
    padding: 2rem 1rem;
  }
  
  .action-section {
    padding: 1.5rem;
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
  
  .upload-specs {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .spec-divider {
    display: none;
  }
}
</style>
