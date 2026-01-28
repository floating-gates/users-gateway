<script setup>
import { RouterView } from 'vue-router'
import { check_version } from './api_call/version.js'

check_version()
</script>

<template>
  <RouterView />
</template>
