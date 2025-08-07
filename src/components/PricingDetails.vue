<script setup>
import { ref, reactive, watch, computed,
         defineEmits, defineProps } from 'vue';
import { themeColor, themeColorOrange, MAX_MB_PDF } from "../data/items.js";
import { post_payment_information } from "../payment_handler/payment.js"; 

const props = defineProps(['proj']);
const emit  = defineEmits(['close']);

const paymentMethod = ref('');
const showBankDetails = ref(false);
const showInvoiceInput = ref(false);
const submitted = ref(false);

const payment_details = reactive({
    iban: '',
    iban_holder_name: '',
    invoice: null
})

const errors = reactive({
    iban: '',
    iban_holder_name: '',
    invoice: '',
})

function handle_invoice_upload(event) {
    const file = event.target.files[0]
    errors.invoice = ''

    if (!file) return

    if (!file.type.includes('pdf')) {
        errors.invoice = 'Only PDF files are allowed.'
        payment_details.invoice = null
        return
    }

    if (file.size > MAX_MB_PDF * 1024 * 1024) {
        errors.invoice = `File size must be less than ${MAX_MB_PDF}MB.`
        payment_details.invoice = null
        return
    }

    payment_details.invoice = file
}

const invoiceFile = computed(() => payment_details.invoice)

watch(paymentMethod, (val) => {
    showBankDetails.value = val === 'bank_info'
    showInvoiceInput.value = val === 'invoice'
})

async function handleSubmit() {
    submitted.value = true

    try {
        const formData = new FormData()
        Object.entries(payment_details).forEach(([key, value]) => { formData.append(key, value) })

        const response = await post_payment_information(formData, props.proj.id)

        if (!response.ok) {
            const error = await response.json()
            console.error('Failed to post payment info:', error.message)
            alert('Submission failed: ' + error.message)
            return
        }

        alert("Payment information submitted successfully.")
        emit('close')

    } catch (error) {
        console.error('Payment submission error:', error)
        alert('Something went wrong. Please try again.')
    } finally {
        submitted.value = false
    }
}
</script>


<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Payment Details</h2>

      <div class="form-group">
        <label for="paymentMethod">Payment Method</label>
        <select id="paymentMethod" v-model="paymentMethod" required>
          <option value="">Select...</option>
          <option value="bank_info">Send Bank Info</option>
          <option value="invoice">Send Invoice</option>
        </select>
      </div>

      <form @submit.prevent="handleSubmit">
        <div v-if="showBankDetails">
          <div class="form-group">
            <label for="name_iban_holder">Name of IBAN Holder</label>
            <input
              id="name_iban_holder"
              type="text"
              v-model="payment_details.iban_holder_name"
              placeholder="Enter account holder's name"
              required
            />
          </div>

          <div class="form-group">
            <label for="iban">IBAN</label>
            <input
              id="iban"
              type="text"
              v-model="payment_details.iban"
              placeholder="Enter IBAN"
              required
            />
          </div>
        </div>

        <div v-if="showInvoiceInput" class="form-group">
          <label for="invoiceFile">Upload Invoice File (PDF)</label>
          <input
            id="invoiceFile"
            type="file"
            @change="handle_invoice_upload"
            accept=".pdf"
            required
          />
          <p v-if="invoiceFile">Selected: {{ invoiceFile.name }}</p>
        </div>

        <div class="modal-actions">
          <button
            type="button"
            class="btn"
            @click="$emit('close')"
            :style="{ borderColor: themeColor, color: themeColor }"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn"
            :style="{
              borderColor: themeColorOrange,
              backgroundColor: themeColorOrange,
              color: 'white'
            }"
          >
            Send Payment Info
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
}

.modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  width: 400px;
  max-width: 95%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
