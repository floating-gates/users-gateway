<template>
  <div class="guide-container">
    <h1 class="guide-title">Manufacturing Hub Publisher guide</h1>
    <p class="guide-intro">
      You're about to launch your personal manufacturing hub at:
    </p>
    <div class="host-url">
      <strong>YOURNAME.floating-gates.com</strong>
    </div>

    <section class="guide-section">
      <h2>🛠️ How to Get Started</h2>
      <ol class="steps-list">
        <li><strong>Log in</strong> with your email, password, and upload your company logo</li>
        <li>Go to the <strong>Profile</strong> section and select your plan:<br />
            <code>Basic</code>, <code>Standard</code>, or <code>Enterprise</code>
        </li>
        <li><strong>Pay</strong> for your subscription – your hub will be online within a few hours</li>
        <li>Start receiving orders from your customers 24/7</li>
      </ol>
    </section>

    <section class="guide-section">
      <h2>1. Customize Your Hub Address</h2>
      <p>
        Choose a unique name (e.g. <em>milan-makers</em>) to claim your site: <br />
        <code>milan-makers.floating-gates.com</code>
      </p>
    </section>

    <section class="guide-section">
      <h2>2. Invite Customers</h2>
      <p>
        Share your link so customers can:
      </p>
      <ul>
        <li>Upload <code>.stl</code> files</li>
        <li>Request instant quotations</li>
        <li>Receive pricing from you directly</li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>3. Manage Quotation Requests</h2>
      <p>
        On your dashboard, new requests will appear automatically:
      </p>
      <ul>
        <li>Review uploaded STL files</li>
        <li>Set a price or refuse the request</li>
        <li>Customers will be notified and can proceed with payment</li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>4. Start Manufacturing</h2>
      <p>
        Once a customer accepts a quote, you'll see the shipping details and can start production.
      </p>
    </section>

    <div class="guide-footer">
      <p>You're in control of your pricing, your orders, and your hub.</p>
      <strong>Ready to go? Set your hub name and invite your first customer!</strong>
    </div>
  </div>
</template>

<script setup>
// Static informational component, no logic needed
</script>

<style scoped>
.guide-container {
  max-width: 800px;
  margin: 40px auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  font-family: 'Inter', sans-serif;
}

.guide-title {
  font-size: 28px;
  margin-bottom: 10px;
  color: #222;
}

.guide-intro {
  font-size: 16px;
  margin-bottom: 20px;
}

.host-url {
  background-color: #f3f4f6;
  border-left: 4px solid #3b82f6;
  padding: 10px 15px;
  font-family: monospace;
  margin-bottom: 30px;
}

.guide-section {
  margin-bottom: 30px;
}

.guide-section h2 {
  font-size: 20px;
  color: #1f2937;
  margin-bottom: 10px;
}

.guide-section ul,
.steps-list {
  padding-left: 20px;
  list-style: disc;
}

.steps-list {
  list-style: decimal;
}

.guide-section li {
  margin-bottom: 6px;
}

.guide-footer {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}
</style>
