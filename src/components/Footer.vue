w<script setup>
import { contactInfo, themeColorOrange } from "../data/items";
import iconGithub from "../assets/images/github-logo.svg";
import iconSubstack from "../assets/images/substack-logo.png";


const copyrightText = "Copyright 2025, All rights reserved.";
const column1Heading = "About us";
const column1Text = "We a team focused on building a bridge between unused production capacity and customer abundance. Our mission is to enable makers and innovators to utilise the idle machinery in the territory, through a platform that combines customised production with scalable manufacturing."

const connectHeading = "Connect with us";

const socialItems = [
    {
        link: "https://github.com/floating-gates/",
        icon: iconGithub,
    },
    {
        link: "https://floatinggates.substack.com/profile/posts",
        icon: iconSubstack,
    },

];
</script>

<template>
  <div class="site-footer" id="footer">
    <div class="footer-dots"></div>
    <div class="container">
      <div class="row justify-content-between">
        
        <!-- Left grouped columns -->
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-6">
              <div class="widget">
                <h3>{{ column1Heading }}</h3>
                <p>{{ column1Text }}</p>
              </div>
              <div class="widget">
                <h3>{{ connectHeading }}</h3>
                <ul class="list-unstyled social">
                  <li>
                    <a :href="socialItems[0].link">
                      <img :src="socialItems[0].icon"
                           alt="Go to Github" class="img-fluid" />
                    </a>
                  </li>
                  <li>
                    <a :href="socialItems[1].link">
                      <img :src="socialItems[1].icon"
                           alt="Go to Substack" class="img-fluid" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Right column -->
            <div class="col-lg-6">
              <div class="widget">
                <a href="/services" class="footer-link">
                  <h3 >
                    Enterprise Services
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="none"
                         :stroke="themeColorOrange"
                         stroke-width="4"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="footer-arrow">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </h3>
                </a>
                <p>List of additional services we work on specifically for Enterprise customer</p>
              </div>
              
              <div class="widget">
                <a href="/referral-login" class="footer-link">
                  <h3>
                    Become a Partner
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="none"
                         :stroke="themeColorOrange"
                         stroke-width="4"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="footer-arrow">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </h3>
                </a>
                <p>Get your hands dirty and come join us, it is going to be a rollercoaster.</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Detached Contact column -->
        <div class="col-lg-3">
          <div class="widget">
            <h3>Contacts</h3>
            <address>Loc: {{ contactInfo.address }}</address>
            <ul class="list-unstyled links mb-4">
              <li>
                <a :href="'tel://' + contactInfo.phone1"> Tel:{{ contactInfo.phone }}</a>
              </li>
              <li>
                <a :href="'mailto:' + contactInfo.email">
                  <span> Email: {{ contactInfo.email }}</span>
                </a>
              </li>
              <li>
                <a><span>VAT: {{ contactInfo.vat }}</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Footer copyright -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <p class="mb-0">
            {{ copyrightText }}
            &nbsp;|&nbsp;
            <a href="/terms_and_services">Terms and Services</a>
            and 
          <a href="/privacy-policy"> Privacy Policy</a>
          apply
        </p>
      </div>
    </div>
  </div>
</div>
</template>



<style scoped>
.footer-arrow {
  height: 1em;       /* same height as text */
  width: auto;       /* keep aspect ratio */
  color: var(--themeColorOrange); /* use your theme variable */
  flex-shrink: 0;    /* prevent squishing */
}

.social {
  display: flex;
  gap: 1rem; /* adjust space as needed */
  padding: 0;
  margin: 0;
  list-style: none;
}

.social li img {
  height: 32px; /* keep consistent size */
  width: auto;
}
</style>
