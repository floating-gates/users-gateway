<script setup>
import Header from "../components/Header.vue"
import Hero from "../components/Hero.vue";
import Service1 from "../components/Service1.vue";
import Service2 from "../components/Service2.vue";
import Feature from "../components/Feature.vue";
import Pricing from "../components/Pricing.vue";
import Advantage from "../components/Advantage.vue";
import Testimonial from "../components/Testimonial.vue";
import About from "../components/About.vue";
import Blog from "../components/Blog.vue";
import Contact from "../components/Contact.vue";
</script>

<template>
    <Header :context="'landing-page'" />
    <Hero />
    <Service2 />
    <!--
    <Feature />
    <Service1 />
    <Testimonial />
    <About />
    <Blog />
    <Advantage />
    -->
    <Pricing />

</template>
