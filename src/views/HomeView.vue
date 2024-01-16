<script setup lang="ts">
import AnimalList from '@/components/AnimalList/AnimalListComponent.vue'
</script>

<template>
  <main class="main-container">
    <AnimalList></AnimalList>
  </main>
</template>

<style>
.main-container {
  display: flex;
  justify-content: center;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 5px;
}
</style>