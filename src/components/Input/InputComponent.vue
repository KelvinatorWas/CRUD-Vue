<script setup lang="ts">

type InputProps = {
  label?:{
    innerText:string,
    for:string,
  },
  input: {
    id?:string,
    type:string,
    placeholder:string,
    required:boolean,
  }
}

const inputModal = defineModel<string>();
const {label, input} = defineProps<InputProps>();

</script>

<template>
  <label 
    v-if="label"
    :for="label.for"
  >{{ label.innerText }}</label>
  
  <input
    class="base_input"
    :type="input.type"
    :id="input.id"
    v-model="inputModal"
    :placeholder="input.placeholder"
    :required="input.required"
  />
</template>


<style>
.base_input {
  padding: .2rem .5rem;
  border: 2px solid transparent;
  background-color: rgba(118, 123, 255, 0.23);
  color: black;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
}
.base_input::placeholder {
  color: black;
  font-weight: bold;
}
</style>