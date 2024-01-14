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
  <label v-if="label" :for="label.for">{{ label.innerText }}</label>
  <input 
    :type="input.type"
    :id="input.id"
    v-model="inputModal"
    :placeholder="input.placeholder"
    :required="input.required"
  />
</template>