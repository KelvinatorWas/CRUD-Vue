<script setup lang="ts">

type ButtonProp = {
  label: string;
  style?: string;
  size?: "big" | "medium" | 'small';
}

// Button Props & Emits
const { style, label, size } = defineProps<ButtonProp>();
const emit = defineEmits(['onClick']);

// Button Functions
const onClick = () => {
  emit("onClick");
}

// Button Style Variables
const btnSize = !size ? "btn-medium" : `btn-${size}`;

</script>

<template>
  <button :class="['base-btn', btnSize, !style ? '' : style].join(' ')" :on-click="onClick">
    {{ !label ? "Button" : label }}
  </button>
</template>

<style>
.base-btn {
  border-radius: 5px;
  font-weight: bold;
  background-color: transparent;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  outline: none;
}

.danger {
  background-color: red;
  border: 1px solid black;
  transition: all .2s;
}

.danger:hover {
  background-color: rgb(151, 3, 3);
  border: 1px solid rgb(255, 255, 255);
  color: white;
}

.success {
  background-color: green;
  border: 1px solid rgb(0, 0, 0);
  transition: all .2s;
  color: white;
}

.success:hover {
  background-color: rgb(2, 255, 2);
  border: 1px solid rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

.warning {
  background-color: yellow;
  border: 1px solid rgb(0, 0, 0);
  transition: all .2s;
  color: black;
}

.warning:hover {
  background-color: rgb(229, 198, 0);
  border: 1px solid rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

.btn-big {
  padding: 16px 32px;
  font-size: large;
  font-weight: bold;
}

.btn-medium {
  padding: 8px 16px;
  font-size: medium;
}

.btn-small {
  padding: 4px 8px;
  font-size: small;
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