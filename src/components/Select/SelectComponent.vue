<script setup lang="ts">

type SelectProps = {
  optionValues: string[],
  placeholder?: string,
  label?: { for: string, innerText: string },
  id:string,
}

const { optionValues, label, placeholder, id } = defineProps<SelectProps>();

const vModal = defineModel<string>();

</script>

<template>
  <label v-if="label" :for="label.for">{{ label.innerText }}</label>
  <select v-model="vModal" class="base_select" :id="id">
    <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
    <option v-for="(value, index) in optionValues" :key="index" :value="value">{{ value }}</option>
  </select>
</template>

<style>
.base_select {
  padding: .2rem .5rem;
  border: 2px solid transparent;
  background-color: rgba(118, 123, 255, 0.23);
  color: black;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
}
</style>