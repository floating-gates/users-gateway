<script setup>
import Header from "../components/Header.vue"
import Hero from "../components/Hero.vue";
import HowDoesItWork from "../components/HowDoesItWork.vue";
import Pricing from "../components/Pricing.vue";
import Why from "../components/Why.vue";
import Testimonial from "../components/Testimonial.vue";
import About from "../components/About.vue";
import Blog from "../components/Blog.vue";
import Contact from "../components/Contact.vue";
</script>

<template>
    <Header :context="'landing-page'" />
    <Hero />
    <HowDoesItWork />
    <!--
    <Testimonial />
    <About />
    <Blog />
    --> 
    <Why /> 

</template>
