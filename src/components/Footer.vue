<script setup>
import { contactInfo } from "../data/items";

const copyrightText = "Copyright 2025, All rights reserved.";
const column1Heading = "About us";
const column1Text =
      "We're building the bridge between advanced manufacturing and seamless digital integration. Our mission is to empower makers, engineers, and innovators by providing a platform where custom 3D solutions meet scalable production.";
const column3Heading = "Services";
const column4Heading = "Contact";

const connectHeading = "Connect with us";

const socialItems = [
  {
    link: "https://github.com/floating-gates/",
    icon: "icon-github",
  },
];
</script>

<template>
<div class="site-footer">
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
                <li style="margin-right: 4px">
                  <a :href="socialItems[0].link"
                     ><span :class="socialItems[0].icon"></span
                                                           ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="widget">
              <h3>{{ column3Heading }}</h3>
              <ul class="list-unstyled float-left links">
                <li><a href="/services">Scientific Software Dev.</a></li>
                <li><a href="/services">Mechanical Design</a></li>
                <li><a href="/services">Data Pipeline</a></li>
                <li><a href="/services">Physics with Machine Learning</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Detached Contact column -->
      <div class="col-lg-3">
        <div class="widget">
          <h3>{{ column4Heading }}</h3>
          <address>{{ contactInfo.address }}</address>
          <ul class="list-unstyled links mb-4">
            <li>
              <a :href="'tel://' + contactInfo.phone1">{{ contactInfo.phone }}</a>
            </li>
            <li>
              <a :href="'mailto:' + contactInfo.email">
                <span>{{ contactInfo.email }}</span>
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
          <a href="/terms_and_services">Terms and Services apply</a>
        </p>
      </div>
    </div>
    
  </div>
</div>
</template>
