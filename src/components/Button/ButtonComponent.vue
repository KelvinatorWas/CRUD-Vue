<script setup lang="ts">

type ButtonProp = {
  style?: string;
  label: string;
}

const { style, label } = defineProps<ButtonProp>();
const emit = defineEmits(['onClick']);

const onClick = () => {
  emit("onClick");
}

</script>

<template>
  <button :class="['base-btn', !style ? '' : style].join(' ')" :on-click="onClick">
    {{ !label ? "Button" : label }}
  </button>
</template>

<style>
.base-btn {
  border-radius: 5px;
  font-weight: bold;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  outline: none;
}

.red {
  background-color: red;
  border: 1px solid black;
  transition: all .2s;
}

.red:hover {
  background-color: rgb(151, 3, 3);
  border: 1px solid rgb(255, 255, 255);
  color: white;
}

.green {
  background-color: green;
  border: 1px solid rgb(0, 0, 0);
  transition: all .2s;
  color: white;

}

.green:hover {
  background-color: rgb(2, 255, 2);
  border: 1px solid rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

.ui-select {
  border: 1px solid black;
  border-bottom: none;
  transition: all 0.5s;
}

.ui-active {
  background-color: rgb(233, 233, 233);
  border: 1px solid rgb(0, 128, 255);
  border-bottom: none;
}
</style>