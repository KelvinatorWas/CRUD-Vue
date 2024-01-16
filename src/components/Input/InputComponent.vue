<script setup lang="ts">

type InputProps = {
  label?: {
    innerText: string,
    for: string,
  },
  input: {
    id?: string,
    type: string,
    placeholder: string,
    required: boolean,
    size?: 'big' | 'small' | 'medium' | undefined,
  }
}

const inputModal = defineModel<string>();
const { label, input } = defineProps<InputProps>();
const inputSize = !input.size ? 'medium' : input.size;

const style = ["base_input", inputSize].join(' ');

</script>

<template>
  <label v-if="label" :for="label.for">{{ label.innerText }}</label>

  <input 
    :class="style"
    :type="input.type"
    :id="input.id"
    :placeholder="input.placeholder"
    :required="input.required" 
    v-model="inputModal" 
  />
</template>


<style>
.base_input {
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

.big {
  padding: .4rem .10rem;
  color: black;
  font-size: large;
}

.medium {
  padding: .2rem .5rem;
  color: black;
  font-size: medium;
  font-weight: bold;
}

.small {
  padding: .1rem .25rem;
  color: black;
  font-size: small;
}


</style>