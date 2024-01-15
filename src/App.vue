<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header/HeaderComponent.vue'
import "toastify-js/src/toastify.css"

</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style scoped>

.wrapper {
  display: flex;
}

a {
  text-decoration: none;
}
</style>
