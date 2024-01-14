<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <header class="wrapper">
    <nav>
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="18" height="18" />
      </RouterLink>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.wrapper {
  display: flex;
  font-size: 18px;
  column-gap: 1rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.204);
  padding: .5rem;
  border-radius: 5px;
}

nav {
  display: flex;
}

a {
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  padding-left: 1rem;
}

a.router-link-active {
  font-weight: bold;
}




</style>